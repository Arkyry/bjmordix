/* ============================================================
   Fonction serveur Netlify — crée un paiement Stripe (Checkout)
   ------------------------------------------------------------
   - Reçoit le panier du navigateur : [{ id, variant, qty }, ...]
   - RECALCULE les prix côté serveur avec salePrice() (impossible à truquer)
   - Crée une session Stripe et renvoie l'URL de la page de paiement
   - Utilise la clé SECRÈTE via process.env.STRIPE_SECRET_KEY
     (définie dans Netlify → Site settings → Environment variables ;
      JAMAIS écrite dans le code ni sur GitHub)
   ============================================================ */
const Stripe = require('stripe');
const { PRODUCTS, salePrice } = require('../../data.js');

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
