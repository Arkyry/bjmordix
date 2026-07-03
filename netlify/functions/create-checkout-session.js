/* ============================================================
   Fonction serveur Netlify — crée un paiement Stripe (Checkout)
   ------------------------------------------------------------
   - Reçoit le panier + (si connecté) le jeton du client
   - RECALCULE les prix côté serveur avec salePrice() (impossible à truquer)
   - Identifie le client via Supabase (pour créditer ses points après paiement)
   - Crée une session Stripe et renvoie l'URL de la page de paiement
   Clés : STRIPE_SECRET_KEY (Netlify). URL + clé publique Supabase = publiques.
   ============================================================ */
const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');
const { PRODUCTS, salePrice } = require('../../data.js');

const SUPABASE_URL = 'https://tebiftnvbkpzzwqxcsvz.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_TTMWz_KUWjVjAXJ-GbKSeA_y814ZEGA';

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
    const items = Array.isArray(payload.items) ? payload.items : [];

    // Identifier le client connecté (facultatif) pour lui créditer les points
    let userId = null;
    if (payload.accessToken) {
      try {
        const supa = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        const { data } = await supa.auth.getUser(payload.accessToken);
        if (data && data.user) userId = data.user.id;
      } catch (e) { /* jeton invalide : on continue en invité (sans points) */ }
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
          product_data: { name: name }
        }
      });
    }

    if (!line_items.length) {
      return { statusCode: 400, body: 'Panier vide ou articles invalides.' };
    }

    const proto = event.headers['x-forwarded-proto'] || 'https';
    const host = event.headers['host'];
    const origin = proto + '://' + host;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: line_items,
      locale: 'fr',
      shipping_address_collection: { allowed_countries: ['CA', 'US'] },
      metadata: userId ? { user_id: userId } : {},
      success_url: origin + '/?checkout=success',
      cancel_url: origin + '/?checkout=cancel'
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: session.url })
    };
  } catch (e) {
    return { statusCode: 500, body: 'Erreur de paiement : ' + (e && e.message ? e.message : 'inconnue') };
  }
};
