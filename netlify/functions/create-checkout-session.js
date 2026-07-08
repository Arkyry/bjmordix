/* ============================================================
   Fonction serveur Netlify — crée un paiement Stripe (Checkout)
   ------------------------------------------------------------
   - Reçoit le panier + (si connecté) le jeton du client + option "redeem"
   - RECALCULE les prix côté serveur (impossible à truquer)
   - Identifie le client via Supabase (pour créditer/débiter ses points)
   - Si demandé, applique une réduction "points fidélité" APRÈS avoir
     vérifié le vrai solde côté serveur (125 points = 1 $), puis met
     points_redeemed en metadata (le webhook débitera ces points).
   Clés (Netlify) : STRIPE_SECRET_KEY, SUPABASE_SERVICE_ROLE_KEY
   ============================================================ */
const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');
const { PRODUCTS, salePrice } = require('../../data.js');

const SUPABASE_URL = 'https://tebiftnvbkpzzwqxcsvz.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_TTMWz_KUWjVjAXJ-GbKSeA_y814ZEGA';
const POINTS_FOR_ONE = 125;   // 125 points = 1 $

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return { statusCode: 500, body: 'Configuration manquante : STRIPE_SECRET_KEY non definie sur Netlify.' };
  }
  const stripe = Stripe(key);

  try {
    const payload = JSON.parse(event.body || '{}');

    const proto0 = event.headers['x-forwarded-proto'] || 'https';
    const origin0 = proto0 + '://' + event.headers['host'];

    // --- DON LIBRE : le donateur choisit son montant ------------------
    // Pas de livraison, pas de points fidélité : simple contribution.
    if (payload.donation != null) {
      let cents = parseInt(payload.donation, 10);
      if (!(cents >= 100)) {
        return { statusCode: 400, body: 'Montant de don invalide (minimum 1 $).' };
      }
      if (cents > 1000000) cents = 1000000;   // plafond de sécurité : 10 000 $
      const donSession = await stripe.checkout.sessions.create({
        mode: 'payment',
        locale: 'fr',
        line_items: [{
          quantity: 1,
          price_data: { currency: 'cad', unit_amount: cents, product_data: { name: 'Don a BJMordix' } }
        }],
        metadata: { donation: 'true' },
        success_url: origin0 + '/?don=success',
        cancel_url: origin0 + '/?don=cancel'
      });
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: donSession.url })
      };
    }

    const items = Array.isArray(payload.items) ? payload.items : [];

    // Identifier le client connecté (facultatif) pour ses points
    let userId = null;
    if (payload.accessToken) {
      try {
        const supa = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        const { data } = await supa.auth.getUser(payload.accessToken);
        if (data && data.user) userId = data.user.id;
      } catch (e) { /* jeton invalide : on continue en invité */ }
    }

    const line_items = [];
    for (const it of items) {
      const p = PRODUCTS.find(function (x) { return x.id === it.id; });
      if (!p) continue;
      const qty = Math.max(1, Math.min(99, parseInt(it.qty, 10) || 1));
      const priceCad = salePrice(p, it.variant || null);   // prix officiel (serveur)
      const unit_amount = Math.round(priceCad * 100);       // en cents
      if (!(unit_amount > 0)) continue;
      const name = (p.name && p.name.fr ? p.name.fr : 'Article') + (it.variant ? ' - ' + it.variant : '');
      line_items.push({
        quantity: qty,
        price_data: {
          currency: 'cad',
          unit_amount: unit_amount,
          // SKU + id stockés pour le courriel de commande (achat sur CJ)
          product_data: { name: name, metadata: { sku: p.sku || '', pid: p.id } }
        }
      });
    }
    if (!line_items.length) {
      return { statusCode: 400, body: 'Panier vide ou articles invalides.' };
    }

    // Réduction par points (validée avec le VRAI solde, côté serveur)
    let discountCents = 0, pointsRedeemed = 0;
    if (userId && payload.redeem) {
      try {
        const admin = createClient(SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
        const { data: bal } = await admin.from('loyalty').select('points').eq('id', userId).maybeSingle();
        const balance = bal ? bal.points : 0;
        const totalCents = line_items.reduce(function (s, li) { return s + li.price_data.unit_amount * li.quantity; }, 0);
        const availDollars = Math.floor(balance / POINTS_FOR_ONE);        // $ finançables en points
        const maxDollars = Math.floor((totalCents - 50) / 100);           // laisser >= 0,50 $ (min Stripe)
        const d = Math.max(0, Math.min(availDollars, maxDollars));
        if (d > 0) { discountCents = d * 100; pointsRedeemed = d * POINTS_FOR_ONE; }
      } catch (e) { /* si erreur : pas de réduction, le paiement continue */ }
    }

    const proto = event.headers['x-forwarded-proto'] || 'https';
    const host = event.headers['host'];
    const origin = proto + '://' + host;

    const params = {
      mode: 'payment',
      line_items: line_items,
      locale: 'fr',
      shipping_address_collection: { allowed_countries: ['CA', 'US'] },
      metadata: userId ? { user_id: userId, points_redeemed: String(pointsRedeemed) } : {},
      success_url: origin + '/?checkout=success',
      cancel_url: origin + '/?checkout=cancel'
    };
    if (discountCents > 0) {
      const coupon = await stripe.coupons.create({
        amount_off: discountCents, currency: 'cad', duration: 'once', name: 'Points fidelite'
      });
      params.discounts = [{ coupon: coupon.id }];
    }

    const session = await stripe.checkout.sessions.create(params);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: session.url })
    };
  } catch (e) {
    return { statusCode: 500, body: 'Erreur de paiement : ' + (e && e.message ? e.message : 'inconnue') };
  }
};
