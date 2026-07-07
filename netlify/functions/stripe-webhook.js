/* ============================================================
   Fonction serveur Netlify — Webhook Stripe
   ------------------------------------------------------------
   Stripe appelle cette fonction quand un paiement est CONFIRMÉ.
   1) Vérifie la signature (STRIPE_WEBHOOK_SECRET) : sécurité
   2) Crédite les points fidélité via Supabase (SERVICE_ROLE)
      Barème : 1 $ payé = 1 point (moins les points utilisés)
   3) ENVOIE UN COURRIEL RÉCAP au marchand (produit, quantité,
      adresse de livraison, montant) — via Resend.
   Clés (dans Netlify) : STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET,
                         SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY
   ============================================================ */
const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://tebiftnvbkpzzwqxcsvz.supabase.co';
const POINTS_PER_DOLLAR = 1;

// Où recevoir les courriels de commande (modifiable via Netlify) :
const MERCHANT_EMAIL = process.env.MERCHANT_EMAIL || 'arkyry100@gmail.com';
// Expéditeur Resend : onboarding@resend.dev fonctionne sans domaine vérifié
const NOTIFY_FROM = 'BJMordix <onboarding@resend.dev>';

exports.handler = async function (event) {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = event.headers['stripe-signature'];

  const rawBody = event.isBase64Encoded
    ? Buffer.from(event.body, 'base64').toString('utf8')
    : event.body;

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(rawBody, sig, whSecret);
  } catch (e) {
    return { statusCode: 400, body: 'Signature invalide : ' + (e && e.message ? e.message : '') };
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    const userId = session.metadata && session.metadata.user_id;
    const amount = session.amount_total || 0; // montant payé, en cents
    const isDonation = !!(session.metadata && session.metadata.donation === 'true');

    // 1) Points fidélité (uniquement pour une vraie commande d'un client connecté)
    if (userId && amount > 0 && !isDonation) {
      const earned = Math.floor(amount / 100) * POINTS_PER_DOLLAR;
      const redeemed = parseInt((session.metadata && session.metadata.points_redeemed) || '0', 10) || 0;
      const delta = earned - redeemed;
      try {
        const admin = createClient(SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
        const { error } = await admin.rpc('add_points', { uid: userId, delta: delta });
        if (error) return { statusCode: 500, body: 'Erreur points : ' + error.message };
      } catch (e) {
        return { statusCode: 500, body: 'Erreur base de donnees : ' + (e && e.message ? e.message : '') };
      }
    }

    // 2) Courriel récap au marchand (ne bloque jamais le paiement en cas d'échec)
    try {
      await sendOrderEmail(stripe, session, isDonation);
    } catch (e) {
      console.log('Envoi du courriel echoue : ' + (e && e.message ? e.message : e));
    }
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};

/* --------- Construction + envoi du courriel via Resend --------- */
async function sendOrderEmail(stripe, session, isDonation) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) { console.log('RESEND_API_KEY absente : courriel ignore.'); return; }

  const money = function (cents) { return '$' + ((cents || 0) / 100).toFixed(2) + ' CAD'; };
  const esc = function (s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };

  const cust = session.customer_details || {};
  const customerEmail = cust.email || '(non fourni)';
  const totalTxt = money(session.amount_total);

  // Articles achetés
  let itemsHtml = '';
  try {
    const li = await stripe.checkout.sessions.listLineItems(session.id, { limit: 50 });
    itemsHtml = (li.data || []).map(function (it) {
      return '<tr><td style="padding:6px 10px;border-bottom:1px solid #eee">' + esc(it.description) +
        '</td><td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:center">' + (it.quantity || 1) +
        '</td><td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:right">' + money(it.amount_total) +
        '</td></tr>';
    }).join('');
  } catch (e) {
    itemsHtml = '<tr><td colspan="3" style="padding:6px 10px">(articles indisponibles — voir Stripe)</td></tr>';
  }

  // Adresse de livraison (selon la version de l'API Stripe)
  const ship = session.shipping_details
    || (session.collected_information && session.collected_information.shipping_details)
    || (cust.address ? { name: cust.name, address: cust.address } : null);
  let addrHtml = '<p style="color:#888">Aucune adresse (don ou non collectée).</p>';
  if (ship && ship.address) {
    const a = ship.address;
    const parts = [
      esc(ship.name || cust.name || ''),
      esc(a.line1 || ''),
      esc(a.line2 || ''),
      esc([a.postal_code, a.city, a.state].filter(Boolean).join(' ')),
      esc(a.country || '')
    ].filter(function (x) { return x; });
    addrHtml = '<p style="line-height:1.6;margin:0">' + parts.join('<br>') + '</p>';
  }

  const kind = isDonation ? '💛 Nouveau DON reçu' : '🎣 Nouvelle COMMANDE';
  const subject = (isDonation ? 'Don reçu' : 'Nouvelle commande') + ' — ' + totalTxt + ' — BJMordix';

  const html =
    '<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#0b1f33">' +
    '<h2 style="color:#0e7c86">' + kind + '</h2>' +
    '<p><b>Montant payé :</b> ' + totalTxt + '<br>' +
    '<b>Courriel du client :</b> ' + esc(customerEmail) + '</p>' +
    (isDonation ? '' :
      '<h3 style="margin:18px 0 6px">Articles à commander sur CJdropshipping</h3>' +
      '<table style="border-collapse:collapse;width:100%;font-size:14px">' +
      '<tr style="background:#f2f6f7"><th style="padding:6px 10px;text-align:left">Produit</th>' +
      '<th style="padding:6px 10px">Qté</th><th style="padding:6px 10px;text-align:right">Total</th></tr>' +
      itemsHtml + '</table>' +
      '<h3 style="margin:18px 0 6px">Adresse de livraison</h3>' + addrHtml +
      '<p style="margin-top:18px;color:#555;font-size:13px">➡️ Passe cette commande sur CJdropshipping avec cette adresse, ' +
      'puis renvoie le numéro de suivi au client.</p>') +
    '<hr style="border:none;border-top:1px solid #eee;margin:22px 0">' +
    '<p style="color:#999;font-size:12px">Courriel automatique — BJMordix</p>' +
    '</div>';

  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: NOTIFY_FROM, to: [MERCHANT_EMAIL], subject: subject, html: html })
  });
  if (!resp.ok) {
    const txt = await resp.text();
    console.log('Resend a repondu ' + resp.status + ' : ' + txt);
  }
}
