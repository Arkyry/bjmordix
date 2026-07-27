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
  {
    id: 'ali-2', category: 'lures', rating: 4.7, reviews: 815, badge: 'best', sku: '',
    /* Prix de base CAD ÷1.37 ; port 2,87 $ CAD = 2.09 USD */
    variants: [
      { label: '7g — 90mm',   usd: 1.85, ship: 2.09 },
      { label: '14g — 110mm', usd: 2.18, ship: 2.09 },
      { label: '40g — 160mm', usd: 3.37, ship: 2.09 },
    ],
    photos: ['ali2-1.webp','ali2-2.webp','ali2-3.webp','ali2-4.webp','ali2-5.webp','ali2-6.webp','ali2-7.webp','ali2-8.webp','ali2-9.webp','ali2-10.webp','ali2-11.avif'],
    name: {
      fr: 'Poisson-nageur méné lumineux — swimbait flottant',
      en: 'Luminous Minnow Jerkbait — floating swimbait',
      es: 'Pez nadador luminoso — swimbait flotante'
    },
    desc: {
      fr: 'Leurre dur longue distance à billes bruiteuses — 3 tailles.',
      en: 'Long-cast hard bait with rattling balls — 3 sizes.',
      es: 'Señuelo duro de largo alcance con bolas sonoras — 3 tamaños.'
    },
    long: {
      fr: "Poisson-nageur « bionique » au corps lumineux et au fini laser ultra réaliste. Ses billes internes se déplacent de la tête vers la queue au lancer : équilibre parfait, distances de lancer impressionnantes et vibrations sonores qui attirent les carnassiers de loin. Flottant, armé de 2 hameçons triples, il nage avec une action vive idéale pour le brochet, l'achigan et le doré. Trois tailles au choix : 7 g / 90 mm, 14 g / 110 mm et 40 g / 160 mm. Coloris réalistes variés (livré selon l'arrivage).",
      en: "'Bionic' minnow with a luminous body and ultra-realistic laser finish. Internal balls shift from head to tail on the cast: perfect balance, impressive casting distance and noisy vibrations that call predators from afar. Floating, armed with 2 treble hooks, it swims with a lively action ideal for pike, bass and walleye. Three sizes: 7 g / 90 mm, 14 g / 110 mm and 40 g / 160 mm. Assorted realistic colors (shipped according to stock).",
      es: "Pez nadador « biónico » con cuerpo luminoso y acabado láser ultra realista. Sus bolas internas se desplazan de la cabeza a la cola al lanzar: equilibrio perfecto, gran distancia de lanzado y vibraciones sonoras que atraen a los depredadores. Flotante, armado con 2 anzuelos triples, nada con una acción viva ideal para lucio, perca y lucioperca. Tres tamaños: 7 g / 90 mm, 14 g / 110 mm y 40 g / 160 mm. Colores realistas variados (según disponibilidad)."
    },
  },
  {
    id: 'ali-3', category: 'lures', rating: 4.6, reviews: 462, badge: null, sku: '',
    /* 1,87 $ CAD base ÷1.37 ; port supposé 2,87 $ CAD (à confirmer) */
    variants: [
      { label: 'Style A', usd: 1.36, ship: 2.09 },
      { label: 'Style B', usd: 1.36, ship: 2.09 },
      { label: 'Style C', usd: 1.36, ship: 2.09 },
      { label: 'Style D', usd: 1.36, ship: 2.09 },
      { label: 'Style E', usd: 1.36, ship: 2.09 },
      { label: 'Style F', usd: 1.36, ship: 2.09 },
      { label: 'Style G', usd: 1.36, ship: 2.09 },
      { label: 'Style H', usd: 1.36, ship: 2.09 },
      { label: 'Style I', usd: 1.36, ship: 2.09 },
      { label: 'Style J', usd: 1.36, ship: 2.09 },
      { label: 'Style K', usd: 1.36, ship: 2.09 },
      { label: 'Style L', usd: 1.36, ship: 2.09 },
    ],
    photos: ['ali3-1.webp','ali3-2.webp','ali3-3.webp','ali3-4.webp','ali3-5.webp','ali3-6.webp','ali3-7.webp','ali3-8.webp','ali3-9.webp','ali3-10.webp','ali3-11.webp','ali3-12.webp','ali3-13.webp','ali3-14.webp','ali3-15.webp','ali3-16.webp','ali3-17.webp','ali3-18.webp','ali3-19.webp','ali3-20.webp','ali3-21.webp'],
    name: {
      fr: 'Leurre souple queue en T 75-85 mm — tête plombée',
      en: 'Soft Swimbait T-Tail 75-85 mm — jig head',
      es: 'Señuelo blando cola en T 75-85 mm — cabeza plomada'
    },
    desc: {
      fr: 'Souple armé prêt à pêcher — nage ondulante irrésistible.',
      en: 'Rigged soft bait ready to fish — irresistible wobbling action.',
      es: 'Señuelo montado listo para pescar — nado ondulante irresistible.'
    },
    long: {
      fr: "Leurre souple en caoutchouc à queue en T, monté sur tête plombée avec hameçon simple : prêt à pêcher dès la sortie de l'emballage. Sa nage ondulante et vibrante imite un petit poisson blessé — un déclencheur redoutable pour le bar, le brochet et la perche. Corps souple et résistant de 75-85 mm (~9,5 g), œil 3D réaliste et coloris variés du blanc nacré au vert fluo. Douze styles au choix : pêche-le en linéaire, en verticale ou en traction près du fond.",
      en: "Rubber soft bait with a T-tail, rigged on a jig head with a single hook: ready to fish right out of the pack. Its wobbling, vibrating swim mimics a small wounded fish — a deadly trigger for bass, pike and perch. Tough 75-85 mm soft body (~9.5 g), realistic 3D eye and colors from pearl white to fluo green. Twelve styles to choose from: fish it steady, vertical or hopping near the bottom.",
      es: "Señuelo blando de caucho con cola en T, montado en cabeza plomada con anzuelo simple: listo para pescar. Su nado ondulante y vibrante imita un pececillo herido — un desencadenante mortal para perca, lucio y bass. Cuerpo resistente de 75-85 mm (~9,5 g), ojo 3D realista y colores del blanco nacarado al verde flúor. Doce estilos a elegir: úsalo en lineal, vertical o a tirones cerca del fondo."
    },
  },
  {
    id: 'ali-4', category: 'gear', rating: 4.7, reviews: 510, badge: null, sku: '',
    /* Prix de base CAD ÷1.37 ; port 2,87 $ (gratuit pour 100 pcs) */
    variants: [
      { label: '15 pièces',  usd: 2.64,  ship: 2.09 },
      { label: '25 pièces',  usd: 3.88,  ship: 2.09 },
      { label: '50 pièces',  usd: 7.34,  ship: 2.09 },
      { label: '100 pièces', usd: 15.71, ship: 0 },
    ],
    photos: ['ali4-1.webp','ali4-2.webp','ali4-3.webp','ali4-4.webp','ali4-5.webp','ali4-6.webp','ali4-7.webp','ali4-8.webp','ali4-9.webp','ali4-10.webp','ali4-11.webp','ali4-12.webp','ali4-13.webp','ali4-14.webp','ali4-15.webp','ali4-16.webp','ali4-17.webp','ali4-18.webp','ali4-19.webp'],
    name: {
      fr: 'Émerillons à 3 voies en acier inoxydable (taille 8)',
      en: 'Three-Way Stainless Steel Swivels (size 8)',
      es: 'Esmerillones de 3 vías de acero inoxidable (talla 8)'
    },
    desc: {
      fr: 'Connecteurs anti-vrillage pour montages à 2 lignes — lots de 15 à 100.',
      en: 'Anti-twist connectors for two-line rigs — packs of 15 to 100.',
      es: 'Conectores antigiro para montajes de 2 líneas — lotes de 15 a 100.'
    },
    long: {
      fr: "Émerillons à trois voies à joint triangulaire en acier inoxydable : le connecteur indispensable pour les montages à empile (ligne principale + bas de ligne + plomb). Rotation fluide qui élimine le vrillage, résistance éprouvée pour la pêche au poisson-chat, au jigging de fond et aux montages dérivants. Taille 8, finition anticorrosion pour l'eau douce et salée. Offerts en lots de 15, 25, 50 ou 100 pièces — le format 100 pièces est le plus économique.",
      en: "Three-way triangle-joint swivels in stainless steel: the must-have connector for dropper rigs (main line + leader + sinker). Smooth rotation that kills line twist, proven strength for catfishing, bottom jigging and drift rigs. Size 8, corrosion-resistant finish for fresh and salt water. Available in packs of 15, 25, 50 or 100 — the 100-piece pack is the best value.",
      es: "Esmerillones de tres vías con unión triangular en acero inoxidable: el conector imprescindible para montajes con bajos (línea madre + bajo + plomo). Rotación fluida que elimina el retorcido, resistencia probada para el siluro, el jigging de fondo y los montajes a la deriva. Talla 8, acabado anticorrosión para agua dulce y salada. En lotes de 15, 25, 50 o 100 piezas — el de 100 es el más económico."
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
