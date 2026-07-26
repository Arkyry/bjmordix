/* ============================================================
   BJMordix — Données produits
   ------------------------------------------------------------
   Prix : usd = coût du produit en USD, ship = frais de port en USD.
   Prix de vente = (usd x MARKUP + ship) x taux. La marge x3 ne touche
   QUE le produit, jamais les frais de port.
   Chaque produit a un tableau `photos` (galerie) ; la 1ʳᵉ photo
   sert d'image principale. Mets tes photos dans le dossier  photos/.
   ============================================================ */

const MARKUP = 3;        // marge par défaut (rétrocompat)
const USD_TO_CAD = 1.37; // taux USD -> CAD (à ajuster)

/* Marge dégressive selon le coût du produit en USD :
   - moins de 20 $  -> x3
   - de 20 à 60 $   -> x2
   - plus de 60 $   -> x1.6
   (la marge s'applique AU PRODUIT seulement, jamais aux frais de port) */
function markupFor(costUSD) {
  if (costUSD < 20) return 3;
  if (costUSD <= 60) return 2;
  return 1.6;
}

const photo = (file, alt) => `<img src="photos/${file}" alt="${alt}" loading="lazy">`;
function usd(v){ return Math.round(v * USD_TO_CAD * 100) / 100; }

/* --- Illustrations SVG (icônes de catégories + secours) --- */
const IMAGES = {
  rod: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Canne">
    <ellipse cx="100" cy="176" rx="70" ry="9" fill="#0b1f33" opacity=".08"/>
    <g stroke-linecap="round">
      <line x1="36" y1="158" x2="172" y2="34" stroke="#16384d" stroke-width="9"/>
      <line x1="36" y1="158" x2="172" y2="34" stroke="#1f5066" stroke-width="4"/>
      <g stroke="#0e7c86" stroke-width="3" fill="none"><circle cx="150" cy="55" r="6"/><circle cx="120" cy="82" r="7"/><circle cx="88" cy="111" r="8"/></g>
      <rect x="24" y="150" width="34" height="16" rx="8" transform="rotate(-42 41 158)" fill="#0e7c86"/>
    </g></svg>`,
  reel: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Moulinet">
    <ellipse cx="100" cy="178" rx="64" ry="8" fill="#0b1f33" opacity=".08"/>
    <rect x="86" y="40" width="28" height="26" rx="6" fill="#16384d"/>
    <ellipse cx="100" cy="118" rx="52" ry="50" fill="#1f5066"/><ellipse cx="100" cy="118" rx="40" ry="38" fill="#0e7c86"/>
    <ellipse cx="100" cy="118" rx="22" ry="21" fill="#0b1f33"/><ellipse cx="100" cy="118" rx="9" ry="9" fill="#18b4c4"/>
    <rect x="40" y="112" width="40" height="12" rx="6" fill="#16384d"/><circle cx="40" cy="118" r="11" fill="#0e7c86"/></svg>`,
  hardlure: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Leurre">
    <ellipse cx="100" cy="176" rx="66" ry="8" fill="#0b1f33" opacity=".08"/>
    <path d="M30 100 q44 -34 100 -16 q26 8 42 16 q-16 8 -42 16 q-56 18 -100 -16z" fill="#1f5066"/>
    <path d="M30 100 q44 -30 92 -18 q-6 18 0 36 q-48 12 -92 -18z" fill="#18b4c4"/>
    <circle cx="118" cy="92" r="6" fill="#fff"/><circle cx="118" cy="92" r="3" fill="#0b1f33"/></svg>`,
  box: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Boîte">
    <ellipse cx="100" cy="178" rx="66" ry="8" fill="#0b1f33" opacity=".08"/>
    <rect x="40" y="92" width="120" height="74" rx="10" fill="#16384d"/><rect x="40" y="92" width="120" height="22" rx="10" fill="#0e7c86"/>
    <rect x="84" y="80" width="32" height="16" rx="6" fill="#0b1f33"/>
    <g fill="#1f5066"><rect x="50" y="122" width="44" height="16" rx="4"/><rect x="106" y="122" width="44" height="16" rx="4"/>
      <rect x="50" y="144" width="44" height="16" rx="4"/><rect x="106" y="144" width="44" height="16" rx="4"/></g></svg>`,
};

const CATEGORIES = [
  { id: 'rods',  icon: IMAGES.rod  },
  { id: 'reels', icon: IMAGES.reel },
  { id: 'lures', icon: IMAGES.hardlure },
  { id: 'gear',  icon: IMAGES.box  },
];

/* ──────────────────────────────────────────────────────────
   CATALOGUE VIDÉ — prêt pour TES produits.

   Pour ajouter un produit, copie ce modèle À L'INTÉRIEUR des
   crochets [ ] ci-dessous (et n'oublie pas la virgule à la fin) :

   {
     id: 'mon-produit',          // identifiant unique, sans espace ni accent
     category: 'lures',          // rods | reels | lures | gear
     usd: 9.99,                  // coût du PRODUIT en USD
     ship: 5.20,                 // frais de port en USD (mets 0 s'il n'y en a pas)
     rating: 4.6, reviews: null, badge: 'new',   // badge: 'best' | 'new' | null
     photos: ['ma-photo.webp'],  // fichier(s) du dossier photos/  (le 1er = image principale)
     name: { fr: 'Mon produit', en: 'My product', es: 'Mi producto' },
     desc: { fr: 'Phrase courte.', en: 'Short line.', es: 'Frase corta.' },
     long: { fr: 'Description longue…', en: 'Long description…', es: 'Descripción larga…' },
   },
   ────────────────────────────────────────────────────────── */
const PRODUCTS = [
  /* ---- Catalogue AliExpress (port gratuit inclus dans les coûts) ---- */
  {
    id: 'ali-1', category: 'rods', rating: 4.7, reviews: 3048, badge: 'best', sku: '',
    /* Coûts = PRIX DE BASE AliExpress (hors promo), relevés en CAD puis
       convertis en USD (÷1.37) ; port gratuit. Base plein tarif = marge
       protégée même quand la promo se termine. */
    variants: [
      { label: 'Spinning 1.8m 5-25g',  usd: 25.90, ship: 0 },
      { label: 'Spinning 2.1m 5-30g',  usd: 28.15, ship: 0 },
      { label: 'Spinning 2.28m 5-30g', usd: 32.47, ship: 0 },
      { label: 'Spinning 2.4m 5-30g',  usd: 33.88, ship: 0 },
      { label: 'Casting 1.8m 5-25g',   usd: 26.44, ship: 0 },
      { label: 'Casting 2.1m 5-30g',   usd: 28.60, ship: 0 },
      { label: 'Casting 2.28m 5-30g',  usd: 32.51, ship: 0 },
      { label: 'Casting 2.4m 5-30g',   usd: 34.28, ship: 0 },
    ],
    photos: ['ali1-1.avif','ali1-2.avif','ali1-3.avif','ali1-4.avif','ali1-5.avif','ali1-6.avif'],
    name: {
      fr: 'Canne de voyage carbone mini — spinning ou casting',
      en: 'Mini Carbon Travel Rod — spinning or casting',
      es: 'Caña de viaje de carbono mini — spinning o casting'
    },
    desc: {
      fr: 'Ultra-compacte, action rapide, 4 sections — sac de transport inclus.',
      en: 'Ultra-compact, fast action, 4 sections — cloth bag included.',
      es: 'Ultracompacta, acción rápida, 4 secciones — bolsa incluida.'
    },
    long: {
      fr: "Canne de voyage en carbone à 4 sections qui se glisse partout : sac à dos, valise, coffre d'auto. Action rapide (F) et pointe fine de 2 mm pour des lancers précis de 5 à 30 g (5-25 g en 1,8 m) — parfaite pour la truite, la perche et le doré au leurre. Offerte en version spinning ou casting et en 4 longueurs (1,80 m à 2,40 m) pour s'adapter à ton style. Puissance 10-14 lb, anneaux guides de qualité et sac de transport en tissu inclus. La compagne idéale des pêcheurs nomades : légère, nerveuse et toujours prête à partir.",
      en: "Four-section carbon travel rod that fits anywhere: backpack, suitcase, car trunk. Fast (F) action with a fine 2 mm tip for precise 5-30 g casts (5-25 g in the 1.8 m model) — perfect for trout, perch and walleye on lures. Available in spinning or casting versions and 4 lengths (1.8 m to 2.4 m) to match your style. 10-14 lb power, quality guide rings, cloth carry bag included. The ideal companion for anglers on the move: light, crisp and always ready to go.",
      es: "Caña de viaje de carbono de 4 secciones que cabe en cualquier parte: mochila, maleta o maletero. Acción rápida (F) con puntera fina de 2 mm para lanzados precisos de 5 a 30 g (5-25 g en el modelo de 1,8 m) — perfecta para trucha, perca y lucioperca con señuelos. Disponible en versión spinning o casting y en 4 longitudes (1,80 m a 2,40 m). Potencia 10-14 lb, anillas de calidad y bolsa de transporte incluida. La compañera ideal del pescador viajero: ligera, nerviosa y siempre lista."
    },
  },
];

/* Image principale = 1ʳᵉ photo de la galerie */
PRODUCTS.forEach(p => { p.image = photo(p.photos[0], p.name.fr); });

/* Prix de vente final en CAD.
   ⚠️ La marge (x MARKUP) s'applique AU PRODUIT seulement, PAS aux frais de port.
   Formule : ( coûtProduit_USD x MARKUP  +  frais_port_USD ) x taux_USD_CAD
   - usd  = coût du produit en USD (obligatoire)
   - ship = frais de port en USD (optionnel, 0 si absent) */
function salePrice(p, variant) {
  if (typeof p === 'number') return Math.round(p * markupFor(p) * 100) / 100; // rétrocompat
  let prodUSD, shipUSD;
  if (p.variants && p.variants.length) {
    const v = (variant != null && p.variants.find(x => x.label === variant)) || p.variants[0];
    prodUSD = v.usd;                                       // coût de la variante choisie
    shipUSD = (v.ship != null) ? v.ship : (p.ship || 0);  // port de la variante, sinon du produit
  } else {
    prodUSD = (p.usd != null) ? p.usd : (p.cost / USD_TO_CAD);
    shipUSD = p.ship || 0;
  }
  return Math.round((prodUSD * markupFor(prodUSD) + shipUSD) * USD_TO_CAD * 100) / 100;
}

/* Prix le plus bas parmi les variantes (pour l'affichage « dès … » sur les cartes). */
function minSalePrice(p) {
  if (!p.variants || !p.variants.length) return salePrice(p);
  return p.variants.reduce(function(m, v){ var s = salePrice(p, v.label); return s < m ? s : m; }, Infinity);
}

/* Rend ces données/fonctions disponibles côté serveur (Netlify Functions) pour
   recalculer les prix de façon sûre. Sans effet côté navigateur (pas de `module`). */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PRODUCTS, salePrice, minSalePrice, markupFor, MARKUP, USD_TO_CAD };
}
