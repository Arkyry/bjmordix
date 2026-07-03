/* ============================================================
   Fonction serveur Netlify — Webhook Stripe (crédit des points)
   ------------------------------------------------------------
   Stripe appelle cette fonction quand un paiement est CONFIRMÉ.
   - Vérifie la signature (STRIPE_WEBHOOK_SECRET) : sécurité
   - Lit le montant payé + l'id du client (metadata de la session)
   - Crédite les points via Supabase (clé SERVICE_ROLE = admin)
     Barème : 1 $ payé = 1 point (moins les points utilisés en réduction)
   Clés (dans Netlify) : STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET,
                         SUPABASE_SERVICE_ROLE_KEY
   ============================================================ */
const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://tebiftnvbkpzzwqxcsvz.supabase.co';
const POINTS_PER_DOLLAR = 1;

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

    if (userId && amount > 0) {
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
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
