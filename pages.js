/* ============================================================
   Pages d'information / légales (Livraison, Retours, CGV,
   Confidentialité). Contenu trilingue FR / EN / ES.
   ------------------------------------------------------------
   ⚠️  MODÈLES DE DÉPART — à faire relire par un comptable /
   l'Office de la protection du consommateur avant gros volume.
   ============================================================ */

/* Une seule adresse à changer pour tout le site : */
const CONTACT_EMAIL = 'arkyry100@gmail.com';

const PAGES = {

  /* -------------------- LIVRAISON -------------------- */
  shipping: {
    title: { fr: 'Livraison', en: 'Shipping', es: 'Envío' },
    body: {
      fr: `
        <p>Chez BJMordix, chaque commande est préparée avec soin puis expédiée directement depuis nos fournisseurs partenaires.</p>
        <h2>Délais de traitement</h2>
        <p>Votre commande est préparée dans un délai de 1 à 3 jours ouvrables suivant le paiement.</p>
        <h2>Délais de livraison</h2>
        <p>La livraison prend généralement de 10 à 25 jours ouvrables selon votre région. Certains articles expédiés depuis l'international peuvent demander un délai supplémentaire.</p>
        <h2>Zones desservies</h2>
        <p>Nous livrons au Canada et aux États-Unis. L'adresse de livraison est demandée au moment du paiement.</p>
        <h2>Frais de livraison</h2>
        <p>Les frais de livraison sont déjà inclus dans le prix affiché des produits — aucun frais surprise à la caisse.</p>
        <h2>Suivi</h2>
        <p>Un numéro de suivi vous est transmis dès que votre colis est expédié. Pour toute question, écrivez-nous à <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>`,
      en: `
        <p>At BJMordix, every order is carefully prepared and shipped directly from our partner suppliers.</p>
        <h2>Processing time</h2>
        <p>Your order is prepared within 1 to 3 business days after payment.</p>
        <h2>Delivery time</h2>
        <p>Delivery usually takes 10 to 25 business days depending on your region. Some internationally shipped items may require additional time.</p>
        <h2>Delivery areas</h2>
        <p>We ship to Canada and the United States. The delivery address is requested at checkout.</p>
        <h2>Shipping fees</h2>
        <p>Shipping is already included in the displayed product price — no surprise fees at checkout.</p>
        <h2>Tracking</h2>
        <p>A tracking number is sent as soon as your parcel ships. For any question, email us at <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>`,
      es: `
        <p>En BJMordix, cada pedido se prepara con cuidado y se envía directamente desde nuestros proveedores asociados.</p>
        <h2>Plazo de preparación</h2>
        <p>Tu pedido se prepara en un plazo de 1 a 3 días hábiles tras el pago.</p>
        <h2>Plazo de entrega</h2>
        <p>La entrega suele tardar de 10 a 25 días hábiles según tu región. Algunos artículos enviados desde el extranjero pueden requerir más tiempo.</p>
        <h2>Zonas cubiertas</h2>
        <p>Enviamos a Canadá y a Estados Unidos. La dirección de entrega se solicita al pagar.</p>
        <h2>Gastos de envío</h2>
        <p>Los gastos de envío ya están incluidos en el precio mostrado — sin sorpresas al pagar.</p>
        <h2>Seguimiento</h2>
        <p>Recibirás un número de seguimiento en cuanto se envíe tu paquete. Para cualquier duda, escríbenos a <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>`
    }
  },

  /* -------------------- RETOURS / REMBOURSEMENT -------------------- */
  returns: {
    title: { fr: 'Retours et remboursements', en: 'Returns & refunds', es: 'Devoluciones y reembolsos' },
    body: {
      fr: `
        <p>Votre satisfaction compte. Si un article ne vous convient pas, voici comment procéder.</p>
        <h2>Délai pour un retour</h2>
        <p>Vous disposez de 14 jours suivant la réception de votre commande pour nous signaler un problème et demander un retour ou un remboursement.</p>
        <h2>Article défectueux ou non conforme</h2>
        <p>Si un article arrive endommagé, défectueux ou différent de sa description, contactez-nous à <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> avec une photo. Nous vous offrons un remplacement ou un remboursement complet, sans frais de retour à votre charge.</p>
        <h2>Changement d'avis</h2>
        <p>Pour un retour lié à un changement d'avis, l'article doit être neuf, inutilisé et dans son emballage d'origine. Les frais de retour sont alors à la charge du client.</p>
        <h2>Remboursement</h2>
        <p>Une fois le retour approuvé, le remboursement est effectué sur le mode de paiement d'origine dans un délai de 5 à 10 jours ouvrables.</p>
        <h2>Comment faire une demande</h2>
        <p>Écrivez-nous à <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> en indiquant votre numéro de commande et le motif. Nous vous répondons rapidement.</p>`,
      en: `
        <p>Your satisfaction matters. If an item isn't right for you, here's how to proceed.</p>
        <h2>Return window</h2>
        <p>You have 14 days from receiving your order to report an issue and request a return or refund.</p>
        <h2>Defective or non-conforming item</h2>
        <p>If an item arrives damaged, defective or different from its description, contact us at <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> with a photo. We'll offer a replacement or a full refund, with no return shipping cost to you.</p>
        <h2>Change of mind</h2>
        <p>For a change-of-mind return, the item must be new, unused and in its original packaging. Return shipping is then the customer's responsibility.</p>
        <h2>Refund</h2>
        <p>Once the return is approved, the refund is issued to the original payment method within 5 to 10 business days.</p>
        <h2>How to request</h2>
        <p>Email us at <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> with your order number and the reason. We'll reply quickly.</p>`,
      es: `
        <p>Tu satisfacción es importante. Si un artículo no te conviene, así puedes proceder.</p>
        <h2>Plazo de devolución</h2>
        <p>Dispones de 14 días desde la recepción de tu pedido para informarnos de un problema y solicitar una devolución o reembolso.</p>
        <h2>Artículo defectuoso o no conforme</h2>
        <p>Si un artículo llega dañado, defectuoso o distinto a su descripción, contáctanos en <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> con una foto. Te ofrecemos un reemplazo o un reembolso completo, sin gastos de devolución a tu cargo.</p>
        <h2>Cambio de opinión</h2>
        <p>Para una devolución por cambio de opinión, el artículo debe estar nuevo, sin usar y en su embalaje original. Los gastos de devolución corren entonces por cuenta del cliente.</p>
        <h2>Reembolso</h2>
        <p>Una vez aprobada la devolución, el reembolso se realiza al medio de pago original en un plazo de 5 a 10 días hábiles.</p>
        <h2>Cómo solicitarlo</h2>
        <p>Escríbenos a <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> indicando tu número de pedido y el motivo. Te responderemos rápidamente.</p>`
    }
  },

  /* -------------------- CONDITIONS GÉNÉRALES DE VENTE -------------------- */
  cgv: {
    title: { fr: 'Conditions générales de vente', en: 'Terms of sale', es: 'Condiciones de venta' },
    body: {
      fr: `
        <h2>1. Objet</h2>
        <p>Les présentes conditions régissent la vente des produits proposés sur le site BJMordix.</p>
        <h2>2. Prix</h2>
        <p>Les prix sont affichés en dollars canadiens (CAD). Les taxes applicables, le cas échéant, sont indiquées au moment du paiement. BJMordix se réserve le droit de modifier ses prix à tout moment; le prix applicable est celui affiché lors de la commande.</p>
        <h2>3. Commande</h2>
        <p>Toute commande vaut acceptation des présentes conditions. Une confirmation vous est transmise après le paiement.</p>
        <h2>4. Paiement</h2>
        <p>Les paiements sont traités de façon sécurisée par Stripe. BJMordix ne conserve aucune donnée de carte bancaire.</p>
        <h2>5. Programme de fidélité</h2>
        <p>Chaque dollar payé rapporte 1 point, à condition de posséder un compte. 125 points équivalent à 1 $ de réduction, utilisable lors d'une commande future. Les points n'ont aucune valeur monétaire hors du site et ne sont pas transférables.</p>
        <h2>6. Livraison et retours</h2>
        <p>Les modalités de livraison et de retour sont détaillées dans les pages correspondantes.</p>
        <h2>7. Responsabilité</h2>
        <p>Les photos et descriptions sont fournies à titre indicatif. BJMordix ne saurait être tenue responsable d'un usage inapproprié des produits.</p>
        <h2>8. Contact</h2>
        <p>Pour toute question : <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>`,
      en: `
        <h2>1. Purpose</h2>
        <p>These terms govern the sale of products offered on the BJMordix website.</p>
        <h2>2. Prices</h2>
        <p>Prices are shown in Canadian dollars (CAD). Applicable taxes, if any, are shown at checkout. BJMordix reserves the right to change its prices at any time; the applicable price is the one displayed at the time of order.</p>
        <h2>3. Orders</h2>
        <p>Any order implies acceptance of these terms. A confirmation is sent after payment.</p>
        <h2>4. Payment</h2>
        <p>Payments are securely processed by Stripe. BJMordix does not store any card data.</p>
        <h2>5. Loyalty program</h2>
        <p>Each dollar paid earns 1 point, provided you have an account. 125 points equal $1 in discount, usable on a future order. Points have no monetary value outside the site and are non-transferable.</p>
        <h2>6. Shipping and returns</h2>
        <p>Shipping and return terms are detailed on the corresponding pages.</p>
        <h2>7. Liability</h2>
        <p>Photos and descriptions are provided for information only. BJMordix cannot be held liable for improper use of products.</p>
        <h2>8. Contact</h2>
        <p>For any question: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>`,
      es: `
        <h2>1. Objeto</h2>
        <p>Estas condiciones rigen la venta de los productos ofrecidos en el sitio BJMordix.</p>
        <h2>2. Precios</h2>
        <p>Los precios se muestran en dólares canadienses (CAD). Los impuestos aplicables, si corresponden, se indican al pagar. BJMordix se reserva el derecho de modificar sus precios en cualquier momento; el precio aplicable es el mostrado al realizar el pedido.</p>
        <h2>3. Pedido</h2>
        <p>Todo pedido implica la aceptación de estas condiciones. Recibirás una confirmación tras el pago.</p>
        <h2>4. Pago</h2>
        <p>Los pagos son procesados de forma segura por Stripe. BJMordix no conserva ningún dato de tarjeta.</p>
        <h2>5. Programa de fidelidad</h2>
        <p>Cada dólar pagado otorga 1 punto, siempre que tengas una cuenta. 125 puntos equivalen a 1 $ de descuento, utilizable en un pedido futuro. Los puntos no tienen valor monetario fuera del sitio y no son transferibles.</p>
        <h2>6. Envío y devoluciones</h2>
        <p>Las condiciones de envío y devolución se detallan en las páginas correspondientes.</p>
        <h2>7. Responsabilidad</h2>
        <p>Las fotos y descripciones son orientativas. BJMordix no se hace responsable de un uso inadecuado de los productos.</p>
        <h2>8. Contacto</h2>
        <p>Para cualquier duda: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>`
    }
  },

  /* -------------------- CONFIDENTIALITÉ -------------------- */
  privacy: {
    title: { fr: 'Politique de confidentialité', en: 'Privacy policy', es: 'Política de privacidad' },
    body: {
      fr: `
        <p>BJMordix respecte votre vie privée. Cette page explique quelles données nous recueillons et comment elles sont utilisées.</p>
        <h2>Données recueillies</h2>
        <p>Lorsque vous créez un compte : votre nom et votre adresse courriel. Lorsque vous passez commande : votre adresse de livraison. Le solde de vos points de fidélité est associé à votre compte.</p>
        <h2>Paiement</h2>
        <p>Les paiements sont traités par Stripe. Vos informations de carte ne transitent jamais par nos serveurs et ne sont pas conservées par BJMordix.</p>
        <h2>Hébergement des comptes</h2>
        <p>Les comptes et les points de fidélité sont gérés de façon sécurisée via Supabase.</p>
        <h2>Témoins (cookies) et stockage local</h2>
        <p>Nous utilisons le stockage local de votre navigateur pour mémoriser votre panier et votre langue. Aucune donnée n'est vendue à des tiers.</p>
        <h2>Vos droits</h2>
        <p>Vous pouvez demander l'accès, la correction ou la suppression de vos données personnelles en écrivant à <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>`,
      en: `
        <p>BJMordix respects your privacy. This page explains what data we collect and how it is used.</p>
        <h2>Data we collect</h2>
        <p>When you create an account: your name and email address. When you place an order: your delivery address. Your loyalty point balance is linked to your account.</p>
        <h2>Payment</h2>
        <p>Payments are processed by Stripe. Your card information never passes through our servers and is not stored by BJMordix.</p>
        <h2>Account hosting</h2>
        <p>Accounts and loyalty points are securely managed through Supabase.</p>
        <h2>Cookies and local storage</h2>
        <p>We use your browser's local storage to remember your cart and language. No data is sold to third parties.</p>
        <h2>Your rights</h2>
        <p>You may request access, correction or deletion of your personal data by emailing <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>`,
      es: `
        <p>BJMordix respeta tu privacidad. Esta página explica qué datos recopilamos y cómo se utilizan.</p>
        <h2>Datos que recopilamos</h2>
        <p>Al crear una cuenta: tu nombre y tu correo electrónico. Al realizar un pedido: tu dirección de entrega. El saldo de tus puntos de fidelidad se asocia a tu cuenta.</p>
        <h2>Pago</h2>
        <p>Los pagos son procesados por Stripe. Los datos de tu tarjeta nunca pasan por nuestros servidores ni son conservados por BJMordix.</p>
        <h2>Alojamiento de las cuentas</h2>
        <p>Las cuentas y los puntos de fidelidad se gestionan de forma segura mediante Supabase.</p>
        <h2>Cookies y almacenamiento local</h2>
        <p>Usamos el almacenamiento local de tu navegador para recordar tu carrito y tu idioma. Ningún dato se vende a terceros.</p>
        <h2>Tus derechos</h2>
        <p>Puedes solicitar el acceso, la corrección o la eliminación de tus datos personales escribiendo a <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>`
    }
  },

  /* -------------------- FAQ -------------------- */
  faq: {
    title: { fr: 'Foire aux questions', en: 'FAQ', es: 'Preguntas frecuentes' },
    body: {
      fr: `
        <h2>Combien de temps prend la livraison ?</h2>
        <p>La commande est préparée en 1 à 3 jours ouvrables, puis livrée en 10 à 25 jours ouvrables selon votre région. Voir la page <a data-nav="page:shipping">Livraison</a>.</p>
        <h2>D'où sont expédiés les produits ?</h2>
        <p>Nos articles proviennent de fournisseurs partenaires et sont expédiés directement vers vous, ce qui nous permet d'offrir de bons prix.</p>
        <h2>Comment suivre ma commande ?</h2>
        <p>Un numéro de suivi vous est envoyé par courriel dès l'expédition de votre colis.</p>
        <h2>Le paiement est-il sécurisé ?</h2>
        <p>Oui. Les paiements sont traités par Stripe. Aucune donnée de carte n'est conservée par BJMordix.</p>
        <h2>Comment fonctionnent les points de fidélité ?</h2>
        <p>Avec un compte, chaque dollar payé rapporte 1 point. 125 points = 1 $ de réduction sur une commande future.</p>
        <h2>Puis-je retourner un article ?</h2>
        <p>Oui, sous 14 jours après réception. Détails sur la page <a data-nav="page:returns">Retours</a>.</p>
        <h2>Dans quelles langues et devise ?</h2>
        <p>Le site est offert en français, anglais et espagnol. Les prix sont en dollars canadiens (CAD).</p>
        <h2>Une autre question ?</h2>
        <p>Écrivez-nous à <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>, nous serons ravis de vous aider.</p>`,
      en: `
        <h2>How long does delivery take?</h2>
        <p>Orders are prepared within 1 to 3 business days, then delivered in 10 to 25 business days depending on your region. See the <a data-nav="page:shipping">Shipping</a> page.</p>
        <h2>Where do the products ship from?</h2>
        <p>Our items come from partner suppliers and ship directly to you, which lets us offer great prices.</p>
        <h2>How do I track my order?</h2>
        <p>A tracking number is emailed to you as soon as your parcel ships.</p>
        <h2>Is payment secure?</h2>
        <p>Yes. Payments are processed by Stripe. No card data is stored by BJMordix.</p>
        <h2>How do loyalty points work?</h2>
        <p>With an account, each dollar paid earns 1 point. 125 points = $1 discount on a future order.</p>
        <h2>Can I return an item?</h2>
        <p>Yes, within 14 days of receipt. Details on the <a data-nav="page:returns">Returns</a> page.</p>
        <h2>Which languages and currency?</h2>
        <p>The site is available in French, English and Spanish. Prices are in Canadian dollars (CAD).</p>
        <h2>Another question?</h2>
        <p>Email us at <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> — we're happy to help.</p>`,
      es: `
        <h2>¿Cuánto tarda la entrega?</h2>
        <p>El pedido se prepara en 1 a 3 días hábiles y se entrega en 10 a 25 días hábiles según tu región. Consulta la página <a data-nav="page:shipping">Envío</a>.</p>
        <h2>¿Desde dónde se envían los productos?</h2>
        <p>Nuestros artículos provienen de proveedores asociados y se envían directamente a ti, lo que nos permite ofrecer buenos precios.</p>
        <h2>¿Cómo sigo mi pedido?</h2>
        <p>Recibirás un número de seguimiento por correo en cuanto se envíe tu paquete.</p>
        <h2>¿El pago es seguro?</h2>
        <p>Sí. Los pagos son procesados por Stripe. BJMordix no conserva ningún dato de tarjeta.</p>
        <h2>¿Cómo funcionan los puntos de fidelidad?</h2>
        <p>Con una cuenta, cada dólar pagado otorga 1 punto. 125 puntos = 1 $ de descuento en un pedido futuro.</p>
        <h2>¿Puedo devolver un artículo?</h2>
        <p>Sí, dentro de los 14 días tras la recepción. Detalles en la página <a data-nav="page:returns">Devoluciones</a>.</p>
        <h2>¿En qué idiomas y moneda?</h2>
        <p>El sitio está disponible en francés, inglés y español. Los precios están en dólares canadienses (CAD).</p>
        <h2>¿Otra pregunta?</h2>
        <p>Escríbenos a <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>, estaremos encantados de ayudarte.</p>`
    }
  },

  /* -------------------- CONTACT -------------------- */
  contact: {
    title: { fr: 'Nous joindre', en: 'Contact us', es: 'Contáctanos' },
    body: {
      fr: `
        <p>Une question sur une commande, un produit ou le programme de fidélité ? Nous sommes là pour vous aider.</p>
        <h2>Par courriel</h2>
        <p>Écrivez-nous à <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>. Nous répondons généralement sous 24 à 48 heures (jours ouvrables).</p>
        <h2>Pour un suivi de commande</h2>
        <p>Indiquez votre numéro de commande dans votre message pour un traitement plus rapide.</p>
        <p style="margin-top:22px"><a class="btn btn-primary" href="mailto:${CONTACT_EMAIL}">Nous écrire</a></p>`,
      en: `
        <p>A question about an order, a product or the loyalty program? We're here to help.</p>
        <h2>By email</h2>
        <p>Email us at <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>. We usually reply within 24 to 48 hours (business days).</p>
        <h2>For order tracking</h2>
        <p>Include your order number in your message for faster handling.</p>
        <p style="margin-top:22px"><a class="btn btn-primary" href="mailto:${CONTACT_EMAIL}">Email us</a></p>`,
      es: `
        <p>¿Una pregunta sobre un pedido, un producto o el programa de fidelidad? Estamos aquí para ayudarte.</p>
        <h2>Por correo</h2>
        <p>Escríbenos a <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>. Solemos responder en 24 a 48 horas (días hábiles).</p>
        <h2>Para el seguimiento de un pedido</h2>
        <p>Incluye tu número de pedido en tu mensaje para una gestión más rápida.</p>
        <p style="margin-top:22px"><a class="btn btn-primary" href="mailto:${CONTACT_EMAIL}">Escríbenos</a></p>`
    }
  },

  /* -------------------- NOTRE HISTOIRE -------------------- */
  story: {
    title: { fr: 'Notre histoire', en: 'Our story', es: 'Nuestra historia' },
    body: {
      fr: `
        <p>Pour moi, la pêche, c'est d'abord une histoire de famille.</p>
        <p>Tout a commencé au bord du lac, près de la maison, où mon cousin et moi passions des heures à taquiner le poisson. De ces journées sont nés une foule de souvenirs merveilleux — les premières prises, les fous rires, la patience récompensée et le plaisir tout simple d'être dehors, ensemble.</p>
        <p>C'est cette passion que j'ai eu envie de partager en créant BJMordix. Je voulais un endroit où les pêcheurs, débutants comme passionnés, trouvent du bon matériel à prix juste, sans compromis sur la qualité.</p>
        <h2>Notre mission</h2>
        <p>Vous offrir de l'équipement de pêche fiable, choisi avec soin, et vous donner l'envie de créer vos propres souvenirs au bord de l'eau.</p>
        <p>Merci de faire partie de l'aventure. 🎣</p>`,
      en: `
        <p>For me, fishing is first and foremost a family story.</p>
        <p>It all began by the lake, near the house, where my cousin and I spent hours after the fish. Those days gave us a wealth of wonderful memories — the first catches, the laughter, patience rewarded, and the simple joy of being outdoors, together.</p>
        <p>That's the passion I wanted to share by creating BJMordix. I wanted a place where anglers, beginners and enthusiasts alike, could find good gear at a fair price, with no compromise on quality.</p>
        <h2>Our mission</h2>
        <p>To offer you reliable, carefully chosen fishing gear — and to inspire you to create your own memories by the water.</p>
        <p>Thank you for being part of the adventure. 🎣</p>`,
      es: `
        <p>Para mí, la pesca es ante todo una historia de familia.</p>
        <p>Todo empezó a orillas del lago, cerca de casa, donde mi primo y yo pasábamos horas tras los peces. De aquellos días nacieron un montón de recuerdos maravillosos — las primeras capturas, las risas, la paciencia recompensada y el simple placer de estar al aire libre, juntos.</p>
        <p>Es esa pasión la que quise compartir al crear BJMordix. Quería un lugar donde los pescadores, principiantes y aficionados, encontraran buen material a un precio justo, sin renunciar a la calidad.</p>
        <h2>Nuestra misión</h2>
        <p>Ofrecerte equipo de pesca fiable, elegido con cuidado, e inspirarte a crear tus propios recuerdos a orillas del agua.</p>
        <p>Gracias por ser parte de la aventura. 🎣</p>`
    }
  }

};
