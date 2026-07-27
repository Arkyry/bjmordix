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
  {
    id: 'ali-5', category: 'gear', rating: 4.7, reviews: 237, badge: null, sku: '',
    /* Prix de base CAD ÷1.37 ; port gratuit (lots de 50) */
    variants: [
      { label: 'Taille 14 (13 lb / 16 mm) — 50 pcs', usd: 5.01,  ship: 0 },
      { label: 'Taille 10 (20 lb / 19 mm) — 50 pcs', usd: 4.92,  ship: 0 },
      { label: 'Taille 7 (24 lb / 23 mm) — 50 pcs',  usd: 4.85,  ship: 0 },
      { label: 'Taille 5 (29 lb / 29 mm) — 50 pcs',  usd: 6.29,  ship: 0 },
      { label: 'Taille 3 (37 lb / 36 mm) — 50 pcs',  usd: 6.34,  ship: 0 },
      { label: 'Taille 1 (51 lb / 42 mm) — 50 pcs',  usd: 7.07,  ship: 0 },
      { label: 'Taille 2/0 (88 lb / 52 mm) — 50 pcs', usd: 13.20, ship: 0 },
      { label: 'Taille 3/0 (88 lb / 55 mm) — 50 pcs', usd: 20.94, ship: 0 },
      { label: 'Taille 4/0 (126 lb / 66 mm) — 50 pcs', usd: 24.01, ship: 0 },
    ],
    photos: ['ali5-1.webp','ali5-2.webp','ali5-3.webp','ali5-4.webp','ali5-5.webp','ali5-6.webp','ali5-7.webp','ali5-8.webp','ali5-9.webp','ali5-10.webp','ali5-11.webp','ali5-12.webp','ali5-13.webp','ali5-14.webp','ali5-15.webp'],
    name: {
      fr: 'Agrafes à émerillon rouleau inox — lot de 50',
      en: 'Stainless Interlock Snaps with Rolling Swivel — 50 pack',
      es: 'Grapas con esmerillón de rodillo inox — lote de 50'
    },
    desc: {
      fr: 'Connecteurs verrouillage croisé anti-vrillage — 9 tailles, 13 à 126 lb.',
      en: 'Cross-lock anti-twist connectors — 9 sizes, 13 to 126 lb.',
      es: 'Conectores de cierre cruzado antigiro — 9 tallas, 13 a 126 lb.'
    },
    long: {
      fr: "Agrafes interlock à verrouillage croisé montées sur émerillon rouleau, en acier inoxydable résistant à la corrosion — conçues pour la pêche en mer comme en eau douce. Change de leurre en quelques secondes tout en éliminant le vrillage de la ligne. Neuf tailles au choix, de la taille 14 (13 lb / 16 mm, finesse) à la taille 4/0 (126 lb / 66 mm, gros brochets et poissons de mer). Vendues en lot de 50 pièces : de quoi équiper toutes tes boîtes.",
      en: "Cross-lock interlock snaps mounted on rolling swivels, in corrosion-resistant stainless steel — built for salt and fresh water. Swap lures in seconds while killing line twist. Nine sizes, from size 14 (13 lb / 16 mm, finesse) to size 4/0 (126 lb / 66 mm, big pike and saltwater fish). Sold in packs of 50: enough to stock every box you own.",
      es: "Grapas interlock de cierre cruzado montadas sobre esmerillón de rodillo, en acero inoxidable anticorrosión — para mar y agua dulce. Cambia de señuelo en segundos eliminando el retorcido de la línea. Nueve tallas, desde la 14 (13 lb / 16 mm) hasta la 4/0 (126 lb / 66 mm, grandes lucios y peces de mar). En lotes de 50 piezas: para llenar todas tus cajas."
    },
  },
  {
    id: 'ali-6', category: 'lures', rating: 4.6, reviews: 781, badge: null, sku: '',
    /* Prix de base CAD ÷1.37 ; port gratuit ; couleurs aléatoires */
    variants: [
      { label: '10 pcs — 5,5 cm',  usd: 2.15,  ship: 0 },
      { label: '50 pcs — 5,5 cm',  usd: 4.38,  ship: 0 },
      { label: '100 pcs — 5,5 cm', usd: 6.77,  ship: 0 },
      { label: '50 pcs — 6,5 cm',  usd: 5.01,  ship: 0 },
      { label: '100 pcs — 6,5 cm', usd: 8.41,  ship: 0 },
      { label: '50 pcs — 7 cm',    usd: 5.39,  ship: 0 },
      { label: '100 pcs — 7 cm',   usd: 10.01, ship: 0 },
    ],
    photos: ['ali6-1.webp','ali6-2.webp','ali6-3.webp','ali6-4.webp','ali6-5.webp','ali6-6.webp','ali6-7.webp','ali6-8.webp','ali6-9.webp'],
    name: {
      fr: 'Leurres souples queue battante 5,5-7 cm — en lot',
      en: 'Paddle-Tail Soft Lures 5.5-7 cm — value packs',
      es: 'Señuelos blandos cola de paleta 5,5-7 cm — en lote'
    },
    desc: {
      fr: 'Swimbaits silicone souples — lots de 10 à 100 pièces.',
      en: 'Soft silicone swimbaits — packs of 10 to 100.',
      es: 'Swimbaits de silicona blanda — lotes de 10 a 100.'
    },
    long: {
      fr: "Leurres souples en silicone à queue battante (paddle tail) : la nage vibrante qui déclenche perche, brochet, doré et truite. Trois longueurs (5,5 / 6,5 / 7 cm) à monter sur tête plombée, montage texan ou hameçon simple. Vendus en lots économiques de 10, 50 ou 100 pièces en coloris assortis — parfaits pour remplir la boîte sans se ruiner et toujours avoir la bonne couleur sous la main.",
      en: "Soft silicone paddle-tail lures: the vibrating swim that triggers perch, pike, walleye and trout. Three lengths (5.5 / 6.5 / 7 cm) to rig on a jig head, Texas rig or single hook. Sold in value packs of 10, 50 or 100 pieces in assorted colors — perfect to fill the box without breaking the bank.",
      es: "Señuelos blandos de silicona con cola de paleta: el nado vibrante que provoca a perca, lucio, lucioperca y trucha. Tres longitudes (5,5 / 6,5 / 7 cm) para montar en cabeza plomada, texas o anzuelo simple. En lotes económicos de 10, 50 o 100 piezas en colores surtidos."
    },
  },
  {
    id: 'ali-9', category: 'lures', rating: 4.5, reviews: 120, badge: null, sku: '',
    /* Prix de base CAD ÷1.37 (max des coloris) ; port 2,85 $ CAD ; 5 coloris assortis */
    variants: [
      { label: '5 cm — 3,6 g (lot de 3)',   usd: 3.47, ship: 2.08 },
      { label: '8 cm — 9,5 g (lot de 3)',   usd: 4.26, ship: 2.08 },
      { label: '11 cm — 24,6 g (lot de 3)', usd: 8.23, ship: 2.08 },
    ],
    photos: ['ali9-1.webp','ali9-2.webp','ali9-3.webp','ali9-4.webp','ali9-5.webp','ali9-6.webp','ali9-7.webp','ali9-8.webp','ali9-9.webp','ali9-10.webp','ali9-11.webp'],
    name: {
      fr: 'Lot de 3 shads silicone armés — brochet et achigan',
      en: '3-Pack Rigged Silicone Shads — pike and bass',
      es: 'Lote de 3 shads de silicona montados — lucio y bass'
    },
    desc: {
      fr: 'Leurres souples avec hameçons montés, prêts à pêcher.',
      en: 'Soft lures with hooks fitted, ready to fish.',
      es: 'Señuelos blandos con anzuelos montados, listos para pescar.'
    },
    long: {
      fr: "Lot de trois leurres souples en silicone avec hameçons déjà montés : tu attaches, tu lances, tu pêches. Nage souple et naturelle qui cible le brochet et l'achigan (black-bass). Trois formats selon le poste : 5 cm / 3,6 g pour la finesse, 8 cm / 9,5 g le polyvalent, et 11 cm / 24,6 g pour aller chercher les gros. Coloris réalistes assortis (selon l'arrivage).",
      en: "Three-pack of silicone soft lures with hooks already rigged: tie on, cast, fish. Soft natural swim that targets pike and bass. Three formats: 5 cm / 3.6 g for finesse, 8 cm / 9.5 g all-round, and 11 cm / 24.6 g to reach the big ones. Assorted realistic colors (by stock).",
      es: "Lote de tres señuelos blandos de silicona con anzuelos ya montados: ata, lanza y pesca. Nado suave y natural para lucio y bass. Tres formatos: 5 cm / 3,6 g, 8 cm / 9,5 g y 11 cm / 24,6 g. Colores realistas surtidos."
    },
  },
  {
    id: 'ali-10', category: 'lures', rating: 4.6, reviews: 332, badge: null, sku: '',
    /* Prix de base CAD ÷1.37 ; port gratuit ; couleur aléatoire */
    variants: [
      { label: '1 pièce',   usd: 3.83,  ship: 0 },
      { label: 'Lot de 3',  usd: 7.59,  ship: 0 },
      { label: 'Lot de 5',  usd: 12.72, ship: 0 },
    ],
    photos: ['ali10-1.webp','ali10-2.webp','ali10-3.webp','ali10-4.webp','ali10-5.webp'],
    name: {
      fr: 'Leurre multi-articulé 10 cm — coulée lente',
      en: 'Multi-Jointed Swimbait 10 cm — slow sinking',
      es: 'Señuelo multiarticulado 10 cm — hundimiento lento'
    },
    desc: {
      fr: 'Nage segmentée ultra réaliste — eau douce et salée.',
      en: 'Ultra-realistic segmented swim — fresh and salt water.',
      es: 'Nado segmentado ultra realista — agua dulce y salada.'
    },
    long: {
      fr: "Leurre multi-articulé « bionique » de 10 cm / 12,4 g à coulée lente : ses segments ondulent comme un vrai poisson à la moindre traction. Une arme redoutable en récupération lente pour le brochet, l'achigan et le doré, en lac comme en rivière — et il tient aussi l'eau salée. Coloris réaliste aléatoire, offert à l'unité ou en lots de 3 et 5 pièces.",
      en: "10 cm / 12.4 g slow-sinking 'bionic' multi-jointed swimbait: its segments wave like a real fish at the slightest pull. Deadly on slow retrieves for pike, bass and walleye, in lakes and rivers — and it handles salt water too. Random realistic color, sold single or in 3- and 5-packs.",
      es: "Señuelo multiarticulado « biónico » de 10 cm / 12,4 g de hundimiento lento: sus segmentos ondulan como un pez real. Mortal en recuperaciones lentas para lucio, bass y lucioperca — también en agua salada. Color realista aleatorio, en unidad o lotes de 3 y 5."
    },
  },
  {
    id: 'ali-11', category: 'gear', rating: 4.7, reviews: 142, badge: null, sku: '', markup: 1.5,
    /* Prix de base CAD ÷1.37 ; port 2,85 $ CAD */
    variants: [
      { label: '50 pièces',  usd: 5.58, ship: 2.08 },
      { label: '100 pièces', usd: 7.39, ship: 2.08 },
    ],
    photos: ['ali11-1.webp','ali11-2.webp','ali11-3.webp','ali11-4.webp','ali11-5.webp','ali11-6.webp','ali11-7.webp','ali11-8.webp'],
    name: {
      fr: 'Kit de plombs fendus réglables — 5 tailles',
      en: 'Adjustable Split-Shot Sinker Kit — 5 sizes',
      es: 'Kit de plomos de presión ajustables — 5 tallas'
    },
    desc: {
      fr: 'Plombs ronds amovibles en boîte — 50 ou 100 pièces.',
      en: 'Removable round sinkers in a box — 50 or 100 pieces.',
      es: 'Plomos redondos amovibles en caja — 50 o 100 piezas.'
    },
    long: {
      fr: "Kit de plombs ronds fendus à pincer sur la ligne, avec 5 tailles assorties dans une boîte compartimentée. Leur conception fendue amovible permet d'ajuster ou de retirer le lestage sans couper la ligne — idéal pour équilibrer un flotteur ou alourdir une dérive. Pour l'eau douce et l'eau salée. Offert en 50 ou 100 pièces.",
      en: "Kit of round split-shot sinkers to pinch on the line, with 5 assorted sizes in a compartment box. The removable split design lets you adjust or remove weight without cutting the line — ideal to balance a float or weight a drift. Fresh and salt water. 50 or 100 pieces.",
      es: "Kit de plomos redondos de presión con 5 tallas surtidas en caja con compartimentos. Su diseño amovible permite ajustar o quitar el lastre sin cortar la línea. Agua dulce y salada. 50 o 100 piezas."
    },
  },
  {
    id: 'ali-12', category: 'lures', rating: 4.7, reviews: 1125, badge: null, sku: '', markup: 1.5,
    /* Prix de base CAD ÷1.37 ; port 3,09 $ CAD ; 11 coloris */
    variants: [
      { label: 'Couleur A', usd: 12.47, ship: 2.26 },
      { label: 'Couleur B', usd: 12.01, ship: 2.26 },
      { label: 'Couleur C', usd: 11.96, ship: 2.26 },
      { label: 'Couleur D', usd: 12.09, ship: 2.26 },
      { label: 'Couleur E', usd: 12.42, ship: 2.26 },
      { label: 'Couleur F', usd: 8.02,  ship: 2.26 },
      { label: 'Couleur G', usd: 7.99,  ship: 2.26 },
      { label: 'Couleur H', usd: 8.02,  ship: 2.26 },
      { label: 'Couleur I', usd: 8.02,  ship: 2.26 },
      { label: 'Couleur J', usd: 8.02,  ship: 2.26 },
      { label: 'Couleur K', usd: 8.07,  ship: 2.26 },
    ],
    photos: ['ali12-1.webp','ali12-2.webp','ali12-3.webp','ali12-4.webp','ali12-5.webp','ali12-6.webp','ali12-7.webp','ali12-8.webp','ali12-9.webp','ali12-10.webp','ali12-11.webp','ali12-12.webp','ali12-13.webp','ali12-14.webp','ali12-15.webp','ali12-16.webp','ali12-17.webp'],
    name: {
      fr: 'Leurre souris flottant 15,5 cm — pêche de surface',
      en: 'Floating Mouse Lure 15.5 cm — topwater fishing',
      es: 'Señuelo ratón flotante 15,5 cm — pesca de superficie'
    },
    desc: {
      fr: 'Imitation souris avec queue — le déclencheur du gros brochet.',
      en: 'Mouse imitation with tail — the big-pike trigger.',
      es: 'Imitación de ratón con cola — el detonante del gran lucio.'
    },
    long: {
      fr: "Leurre de surface en forme de souris de 15,5 cm, queue souple incluse : ramené par à-coups en surface, il imite un rongeur qui traverse — un déclencheur spectaculaire pour le gros brochet, le maskinongé et l'achigan. Corps flottant en plastique dur, finition réaliste, 11 coloris au choix. Les attaques en surface sont les plus belles émotions de la pêche : celui-là les provoque.",
      en: "15.5 cm topwater mouse lure with a soft tail: twitched across the surface, it mimics a swimming rodent — a spectacular trigger for big pike, musky and bass. Floating hard-plastic body, realistic finish, 11 colors to choose from. Topwater strikes are fishing's biggest thrill: this one provokes them.",
      es: "Señuelo de superficie con forma de ratón de 15,5 cm con cola blanda: recuperado a tirones imita a un roedor nadando — un detonante espectacular para grandes lucios y bass. Cuerpo flotante de plástico duro, acabado realista, 11 colores."
    },
  },
  {
    id: 'ali-13', category: 'lures', rating: 4.6, reviews: 703, badge: null, sku: '',
    /* Prix de base CAD ÷1.37 (aligné sur le coloris le plus cher) ; port 2,85 $ CAD */
    variants: [
      { label: 'Couleur A', usd: 2.58, ship: 2.08 },
      { label: 'Couleur B', usd: 2.58, ship: 2.08 },
      { label: 'Couleur C', usd: 2.58, ship: 2.08 },
      { label: 'Couleur D', usd: 2.58, ship: 2.08 },
      { label: 'Couleur E', usd: 2.58, ship: 2.08 },
      { label: 'Couleur F', usd: 2.58, ship: 2.08 },
      { label: 'Couleur G', usd: 2.58, ship: 2.08 },
      { label: 'Couleur H', usd: 2.58, ship: 2.08 },
      { label: 'Couleur I', usd: 2.58, ship: 2.08 },
      { label: 'Couleur J', usd: 2.58, ship: 2.08 },
      { label: 'Couleur K', usd: 2.58, ship: 2.08 },
      { label: 'Couleur L', usd: 2.58, ship: 2.08 },
      { label: 'Couleur M', usd: 2.58, ship: 2.08 },
      { label: 'Couleur O', usd: 2.58, ship: 2.08 },
      { label: 'Couleur P', usd: 2.58, ship: 2.08 },
      { label: 'Couleur Q', usd: 2.58, ship: 2.08 },
    ],
    photos: ['ali13-1.webp','ali13-2.webp','ali13-3.webp','ali13-4.webp','ali13-5.webp','ali13-6.webp','ali13-7.webp','ali13-8.webp','ali13-9.webp','ali13-10.webp','ali13-11.webp','ali13-12.webp','ali13-13.webp','ali13-14.webp','ali13-15.webp','ali13-16.webp','ali13-17.webp','ali13-18.webp','ali13-19.webp','ali13-20.webp','ali13-21.webp','ali13-22.webp','ali13-23.webp'],
    name: {
      fr: 'Mini méné coulant 38 mm — truite et perche',
      en: 'Mini Sinking Minnow 38 mm — trout and perch',
      es: 'Mini pez nadador hundido 38 mm — trucha y perca'
    },
    desc: {
      fr: 'Micro jerkbait 3,2 g — 16 coloris réalistes.',
      en: 'Micro jerkbait 3.2 g — 16 realistic colors.',
      es: 'Micro jerkbait 3,2 g — 16 colores realistas.'
    },
    long: {
      fr: "Micro poisson-nageur coulant de 38 mm / 3,2 g : la bouchée parfaite pour la truite, la perche et tous les poissons méfiants des eaux claires. Sa petite taille passe partout — ruisseaux, rivières, bordures de lac — et sa nage serrée en jerkbait imite un vairon paniqué. Seize coloris réalistes au choix pour matcher l'eau et la lumière du jour.",
      en: "38 mm / 3.2 g sinking micro minnow: the perfect bite for trout, perch and every wary clear-water fish. Its small size goes anywhere — creeks, rivers, lake edges — and its tight jerkbait swim mimics a panicked baitfish. Sixteen realistic colors to match water and light.",
      es: "Micro pez nadador hundido de 38 mm / 3,2 g: el bocado perfecto para trucha, perca y peces desconfiados de aguas claras. Su tamaño pasa por todas partes y su nado imita un alevín en pánico. Dieciséis colores realistas."
    },
  },
  {
    id: 'ali-14', category: 'gear', rating: 4.9, reviews: 3040, badge: 'best', sku: '', markup: 1.5,
    /* Prix de base CAD ÷1.37 ; port 3,09 $ CAD ; tailles 2.0-3.0 épuisées chez le fournisseur */
    variants: [
      { label: 'PE 0.8 (12 lb)', usd: 19.20, ship: 2.26 },
      { label: 'PE 1.0 (16 lb)', usd: 19.29, ship: 2.26 },
      { label: 'PE 1.2 (20 lb)', usd: 19.24, ship: 2.26 },
      { label: 'PE 1.5 (22 lb)', usd: 19.24, ship: 2.26 },
      { label: 'PE 4.0 (40 lb)', usd: 19.93, ship: 2.26 },
      { label: 'PE 5.0 (50 lb)', usd: 20.23, ship: 2.26 },
    ],
    photos: ['ali14-1.webp','ali14-2.webp','ali14-3.webp','ali14-4.webp','ali14-5.webp','ali14-6.webp'],
    name: {
      fr: 'Tresse PE 8 brins 150 m — 12 à 50 lb',
      en: 'PE Braided Line 8 strands 150 m — 12 to 50 lb',
      es: 'Trenzado PE 8 hebras 150 m — 12 a 50 lb'
    },
    desc: {
      fr: 'Multifilament haute résistance qualité japon.',
      en: 'High-strength Japan-quality multifilament.',
      es: 'Multifilamento de alta resistencia calidad Japón.'
    },
    long: {
      fr: "Ligne tressée PE à 8 brins de qualité japonaise : glisse soyeuse dans les anneaux, lancers plus longs et une résistance remarquable pour son diamètre. Bobine de 150 m, disponible du PE 0.8 (12 lb, finesse) au PE 5.0 (50 lb, gros carnassiers). Zéro élasticité : tu sens chaque touche et chaque contact avec le fond. La ligne principale de confiance des pêcheurs au leurre.",
      en: "Japan-quality 8-strand PE braid: silky through the guides, longer casts and remarkable strength for its diameter. 150 m spool, from PE 0.8 (12 lb, finesse) to PE 5.0 (50 lb, big predators). Zero stretch: you feel every bite and every touch of the bottom.",
      es: "Trenzado PE de 8 hebras calidad Japón: deslizamiento sedoso, lanzados más largos y resistencia notable para su diámetro. Bobina de 150 m, del PE 0.8 (12 lb) al PE 5.0 (50 lb). Cero elasticidad: sientes cada picada."
    },
  },
  {
    id: 'ali-15', category: 'gear', rating: 4.7, reviews: 2251, badge: 'best', sku: '', markup: 1.5,
    /* Prix de base CAD ÷1.37 ; port 3,09 $ CAD */
    variants: [
      { label: '0,2 g — 50 pcs', usd: 11.30, ship: 2.26 },
      { label: '0,3 g — 50 pcs', usd: 11.59, ship: 2.26 },
      { label: '0,4 g — 50 pcs', usd: 12.64, ship: 2.26 },
      { label: '0,5 g — 50 pcs', usd: 12.72, ship: 2.26 },
      { label: '0,6 g — 50 pcs', usd: 13.16, ship: 2.26 },
      { label: '0,8 g — 50 pcs', usd: 14.07, ship: 2.26 },
      { label: '1,0 g — 50 pcs', usd: 15.02, ship: 2.26 },
      { label: '1,5 g — 50 pcs', usd: 16.87, ship: 2.26 },
      { label: '1,7 g — 50 pcs', usd: 18.50, ship: 2.26 },
    ],
    photos: ['ali15-1.webp','ali15-2.webp','ali15-3.webp','ali15-4.webp','ali15-5.webp','ali15-6.webp','ali15-7.webp','ali15-8.webp','ali15-9.webp','ali15-10.webp','ali15-11.webp','ali15-12.webp','ali15-13.webp','ali15-14.webp','ali15-15.webp'],
    name: {
      fr: 'Plombs ronds fendus — lot de 50',
      en: 'Round Split-Shot Sinkers — 50 pack',
      es: 'Plomos redondos de presión — lote de 50'
    },
    desc: {
      fr: 'Grammages précis de 0,2 à 1,7 g pour un lestage fin.',
      en: 'Precise weights from 0.2 to 1.7 g for fine rigging.',
      es: 'Pesos precisos de 0,2 a 1,7 g para un lastre fino.'
    },
    long: {
      fr: "Plombs ronds fendus vendus par lot de 50, dans un grammage précis de ton choix (0,2 à 1,7 g). Se pincent sur la ligne en une seconde pour équilibrer un flotteur, ralentir une dérive ou faire couler une esche à la vitesse exacte voulue. L'accessoire de base que tout pêcheur au coup et à la truite use en quantité.",
      en: "Round split-shot sinkers sold in packs of 50, in the precise weight you choose (0.2 to 1.7 g). Pinch onto the line in a second to balance a float, slow a drift or sink a bait at the exact speed you want. The basic accessory every float and trout angler burns through.",
      es: "Plomos redondos de presión en lotes de 50, en el gramaje exacto que elijas (0,2 a 1,7 g). Se fijan en un segundo para equilibrar un flotador o hundir el cebo a la velocidad deseada."
    },
  },
  {
    id: 'ali-16', category: 'gear', rating: 4.8, reviews: 673, badge: null, sku: '',
    /* Prix de base CAD ÷1.37 ; port 2,85 $ CAD */
    variants: [
      { label: 'Pince orange',  usd: 3.34, ship: 2.08 },
      { label: 'Pince bleue',   usd: 3.39, ship: 2.08 },
      { label: 'Pince noire',   usd: 3.37, ship: 2.08 },
      { label: 'Ciseaux verts', usd: 2.55, ship: 2.08 },
    ],
    photos: ['ali16-1.webp','ali16-2.webp','ali16-3.webp','ali16-4.webp','ali16-5.webp','ali16-6.webp','ali16-7.webp','ali16-8.webp','ali16-9.webp','ali16-10.webp','ali16-11.webp','ali16-12.webp','ali16-13.webp','ali16-14.webp','ali16-15.webp','ali16-16.webp'],
    name: {
      fr: 'Pince multifonction / ciseaux à tresse',
      en: 'Multifunction Pliers / Braid Scissors',
      es: 'Alicates multifunción / tijeras para trenzado'
    },
    desc: {
      fr: 'Coupe la tresse net, décroche les hameçons — l\'outil à tout faire.',
      en: 'Cuts braid clean, removes hooks — the do-it-all tool.',
      es: 'Corta el trenzado, quita anzuelos — la herramienta para todo.'
    },
    long: {
      fr: "L'outil qui manque à ta poche : pince multifonction de pêche qui coupe net la ligne tressée (ce que les coupe-ongles massacrent), décroche les hameçons profonds, écrase les ardillons et sertit tes montages. Version pince (orange, bleue ou noire) ou ciseaux compacts (verts), avec étui et cordon selon le modèle. Un petit prix pour un outil qu'on utilise à chaque sortie.",
      en: "The tool your pocket is missing: multifunction fishing pliers that cut braided line clean, remove deep hooks, crush barbs and crimp your rigs. Pliers version (orange, blue or black) or compact scissors (green), with sheath and lanyard depending on the model. A small price for a tool you'll use every single trip.",
      es: "La herramienta que falta en tu bolsillo: alicates multifunción que cortan el trenzado limpio, quitan anzuelos profundos y aplastan rebabas. Versión alicates (naranja, azul o negro) o tijeras compactas (verdes). Pequeño precio para una herramienta de cada salida."
    },
  },
  {
    id: 'ali-17', category: 'lures', rating: 4.7, reviews: 782, badge: null, sku: '',
    /* Prix de base CAD ÷1.37 ; port 2,85 $ CAD ; couleurs aléatoires */
    variants: [
      { label: 'Lot de 5',  usd: 5.85,  ship: 2.08 },
      { label: 'Lot de 10', usd: 10.82, ship: 2.08 },
    ],
    photos: ['ali17-1.webp','ali17-2.webp','ali17-3.webp','ali17-4.webp','ali17-5.webp','ali17-6.webp'],
    name: {
      fr: 'Wobbler bionique 11,5 cm / 14 g — lot de 5 ou 10',
      en: 'Bionic Wobbler 11.5 cm / 14 g — 5 or 10 pack',
      es: 'Wobbler biónico 11,5 cm / 14 g — lote de 5 o 10'
    },
    desc: {
      fr: 'Leurre dur à bavette, yeux 3D — bar et brochet.',
      en: 'Lipped hard bait with 3D eyes — bass and pike.',
      es: 'Señuelo duro con babero y ojos 3D — bass y lucio.'
    },
    long: {
      fr: "Poisson-nageur à bavette de 11,5 cm / 14 g à l'action de nage « balançoire » très roulante : un wobbler classique qui prend du poisson partout, du bar au brochet en passant par le doré. Yeux 3D, finitions réalistes, coloris assortis. Vendu en lot de 5 ou 10 pièces — de quoi garnir la boîte et en laisser un dans chaque coffre.",
      en: "11.5 cm / 14 g lipped minnow with a rolling 'swing' action: a classic wobbler that catches fish everywhere, from bass to pike to walleye. 3D eyes, realistic finishes, assorted colors. Sold in 5- or 10-packs — enough to stock the box and stash spares everywhere.",
      es: "Pez nadador con babero de 11,5 cm / 14 g con acción balanceante: un wobbler clásico que pesca en todas partes, del bass al lucio. Ojos 3D, acabados realistas, colores surtidos. En lotes de 5 o 10."
    },
  },
  {
    id: 'ali-18', category: 'lures', rating: 4.6, reviews: 1216, badge: null, sku: '',
    /* Prix de base CAD ÷1.37 ; port 3,09 $ CAD */
    variants: [
      { label: '10 cm — 20 pcs',             usd: 6.21, ship: 2.26 },
      { label: '8 cm — 20 pcs',              usd: 5.96, ship: 2.26 },
      { label: '3,5 cm — 50 pcs (rouge)',    usd: 5.82, ship: 2.26 },
      { label: '3,5 cm — 50 pcs (orange)',   usd: 5.97, ship: 2.26 },
      { label: '3,5 cm — 50 pcs (lumineux)', usd: 5.90, ship: 2.26 },
    ],
    photos: ['ali18-1.webp','ali18-2.webp','ali18-3.webp','ali18-4.webp','ali18-5.webp','ali18-6.webp','ali18-7.webp','ali18-8.webp','ali18-9.webp'],
    name: {
      fr: 'Vers souples parfumés — imitation ver de terre',
      en: 'Scented Soft Worms — earthworm imitation',
      es: 'Gusanos blandos aromatizados — imitación lombriz'
    },
    desc: {
      fr: 'Odeur attractive, en lots de 20 ou 50 — truite et perche.',
      en: 'Attractive scent, packs of 20 or 50 — trout and perch.',
      es: 'Aroma atractivo, en lotes de 20 o 50 — trucha y perca.'
    },
    long: {
      fr: "Vers souples ultra réalistes imprégnés d'une odeur de poisson attractive : l'imitation de ver de terre qui remplace l'appât vivant, sortie après sortie. Trois formats — 3,5 cm en lot de 50 (rouge, orange ou version lumineuse pour la pêche de nuit), 8 cm et 10 cm en lot de 20. Truite, perche, crapet, doré : quand ça ne mord pas, c'est souvent lui qui sauve la journée.",
      en: "Ultra-realistic soft worms infused with an attractive fish scent: the earthworm imitation that replaces live bait, trip after trip. Three formats — 3.5 cm in packs of 50 (red, orange or luminous for night fishing), 8 cm and 10 cm in packs of 20. Trout, perch, panfish, walleye: when nothing bites, this one often saves the day.",
      es: "Gusanos blandos ultra realistas con aroma atractivo: la imitación de lombriz que sustituye al cebo vivo. Tres formatos — 3,5 cm en lotes de 50 (rojo, naranja o luminoso), 8 y 10 cm en lotes de 20. Trucha, perca, lucioperca: a menudo salva el día."
    },
  },
  {
    id: 'ali-20', category: 'lures', rating: 4.8, reviews: 581, badge: null, sku: '',
    /* Prix de base CAD ÷1.37 ; port 2,87 $ CAD */
    variants: [
      { label: 'Assortiment A (3 pcs)', usd: 5.07, ship: 2.09 },
      { label: 'Assortiment B (3 pcs)', usd: 4.94, ship: 2.09 },
      { label: 'Assortiment C (3 pcs)', usd: 4.95, ship: 2.09 },
      { label: 'Coloris aléatoires (3 pcs)', usd: 3.61, ship: 2.09 },
    ],
    photos: ['ali20-1.webp','ali20-2.webp','ali20-3.webp','ali20-4.webp','ali20-5.webp','ali20-6.webp','ali20-7.webp','ali20-8.webp','ali20-9.webp','ali20-10.webp'],
    name: {
      fr: 'Jerkbait coulée lente 12 cm — boîte de 3',
      en: 'Slow-Sinking Jerkbait 12 cm — box of 3',
      es: 'Jerkbait de hundimiento lento 12 cm — caja de 3'
    },
    desc: {
      fr: 'Ménés 14 g style japonais — bar et brochet.',
      en: 'Japan-style 14 g minnows — bass and pike.',
      es: 'Peces nadadores 14 g estilo japonés — bass y lucio.'
    },
    long: {
      fr: "Boîte de trois poissons-nageurs de 12 cm / 14 g à coulée lente, inspirés des jerkbaits japonais : ils descendent doucement dans la colonne d'eau et restent dans la zone de frappe plus longtemps. Animation en petites secousses (jerks) pour un effet vairon blessé irrésistible sur le bar, le brochet et le doré. Trois assortiments de coloris au choix, ou l'option surprise à prix doux.",
      en: "Box of three 12 cm / 14 g slow-sinking minnows inspired by Japanese jerkbaits: they fall gently through the water column and stay in the strike zone longer. Twitch them for a wounded-baitfish action irresistible to bass, pike and walleye. Three color assortments, or the budget surprise option.",
      es: "Caja de tres peces nadadores de 12 cm / 14 g de hundimiento lento, inspirados en los jerkbaits japoneses: caen suavemente y permanecen más tiempo en la zona de ataque. Anímalos a tirones para imitar un alevín herido. Tres surtidos de colores o la opción sorpresa."
    },
  },
  {
    id: 'ali-21', category: 'gear', rating: 4.8, reviews: 760, badge: null, sku: '', markup: 1.5,
    /* Prix de base CAD ÷1.37 ; port 2,85 $ CAD ; marge 1.5 (prix barrés gonflés) */
    variants: [
      { label: '10 g — lot de 5', usd: 3.36, ship: 2.08 },
      { label: '20 g — lot de 5', usd: 4.81, ship: 2.08 },
      { label: '30 g — lot de 5', usd: 6.30, ship: 2.08 },
      { label: '50 g — lot de 5', usd: 9.50, ship: 2.08 },
    ],
    photos: ['ali21-1.webp','ali21-2.webp','ali21-3.webp','ali21-4.webp','ali21-5.webp','ali21-6.webp','ali21-7.webp','ali21-8.webp','ali21-9.webp','ali21-10.webp','ali21-11.webp','ali21-12.webp','ali21-13.webp','ali21-14.webp'],
    name: {
      fr: 'Plombs de fond profilés avec connecteur — lot de 5',
      en: 'Tapered Bottom Sinkers with Connector — 5 pack',
      es: 'Plomos de fondo perfilados con conector — lote de 5'
    },
    desc: {
      fr: 'Plombs concaves anti-accroc 10 à 50 g, émerillon intégré.',
      en: 'Snag-resistant concave sinkers 10-50 g, built-in swivel.',
      es: 'Plomos cóncavos antienganche 10-50 g, esmerillón integrado.'
    },
    long: {
      fr: "Plombs de fond profilés à face concave avec connecteur émerillon intégré : ils tiennent le fond dans le courant, décollent proprement au ferrage et réduisent le vrillage. Leur forme effilée limite les accrocs entre les roches. Vendus par lot de 5, en 10, 20, 30 ou 50 g — de la pêche fine en rivière aux montages de fond musclés.",
      en: "Tapered concave-face bottom sinkers with a built-in swivel connector: they hold bottom in current, lift cleanly on the strike and reduce line twist. The streamlined shape limits snags between rocks. Sold in packs of 5, in 10, 20, 30 or 50 g — from fine river fishing to heavy bottom rigs.",
      es: "Plomos de fondo perfilados de cara cóncava con esmerillón integrado: aguantan el fondo en la corriente y reducen el retorcido. Su forma limita los enganches entre rocas. En lotes de 5, de 10, 20, 30 o 50 g."
    },
  },
  {
    id: 'ali-22', category: 'gear', rating: 4.4, reviews: 1637, badge: null, sku: '', markup: 1.5,
    /* Prix de base CAD ÷1.37 ; port 3,09 $ CAD ; marge 1.5 (prix barrés gonflés) */
    variants: [
      { label: 'D20 — traction 9 kg',  usd: 8.79,  ship: 2.26 },
      { label: 'D25 — traction 19 kg', usd: 9.56,  ship: 2.26 },
      { label: 'D32 — traction 32 kg', usd: 10.58, ship: 2.26 },
      { label: 'D42 — traction 61 kg', usd: 12.36, ship: 2.26 },
    ],
    photos: ['ali22-1.webp','ali22-2.webp','ali22-3.webp','ali22-4.webp','ali22-5.webp','ali22-6.webp','ali22-7.webp','ali22-8.webp','ali22-9.webp','ali22-10.webp','ali22-11.webp','ali22-12.webp'],
    name: {
      fr: 'Aimant néodyme N52 avec anneau — pêche à l\'aimant',
      en: 'N52 Neodymium Magnet with Eyebolt — magnet fishing',
      es: 'Imán de neodimio N52 con argolla — pesca magnética'
    },
    desc: {
      fr: 'Traction de 9 à 61 kg — récupère tout ce qui est en métal.',
      en: '9 to 61 kg pull — retrieves anything metal.',
      es: 'Tracción de 9 a 61 kg — recupera todo lo metálico.'
    },
    long: {
      fr: "Aimant néodyme de grade N52 (le plus puissant du marché) avec anneau de levage : attache une corde et pars à la pêche… à l'aimant ! Retrouve un moulinet tombé à l'eau, récupère des objets métalliques ou explore les quais et les ponts. Quatre diamètres, de D20 (9 kg de traction) à D42 (61 kg). Un accessoire fascinant qui double ta sortie de pêche d'une chasse au trésor.",
      en: "N52-grade neodymium magnet (the strongest on the market) with a lifting eyebolt: tie on a rope and go magnet fishing! Retrieve a reel dropped overboard, recover metal objects or explore docks and bridges. Four diameters, from D20 (9 kg pull) to D42 (61 kg). A fascinating add-on that turns any fishing trip into a treasure hunt.",
      es: "Imán de neodimio grado N52 (el más potente del mercado) con argolla de izado: ata una cuerda y ¡a pescar imanes! Recupera un carrete caído al agua u objetos metálicos. Cuatro diámetros, de D20 (9 kg) a D42 (61 kg). Convierte la salida de pesca en una búsqueda del tesoro."
    },
  },
  {
    id: 'ali-23', category: 'reels', rating: 4.7, reviews: 539, badge: 'new', sku: '',
    /* Prix de base CAD ÷1.37 ; port gratuit ; marge auto (x1.6 au-dessus de 60 USD) */
    variants: [
      { label: 'Coloris A', usd: 67.78, ship: 0 },
      { label: 'Coloris B', usd: 67.75, ship: 0 },
      { label: 'Coloris C', usd: 67.75, ship: 0 },
      { label: 'Coloris D', usd: 68.65, ship: 0 },
    ],
    photos: ['ali23-1.webp','ali23-2.webp','ali23-3.webp','ali23-4.webp','ali23-5.webp','ali23-6.webp','ali23-7.webp','ali23-8.webp','ali23-9.webp','ali23-10.webp'],
    name: {
      fr: 'Moulinet baitcasting électronique — compteur LED',
      en: 'Electronic Baitcasting Reel — LED line counter',
      es: 'Carrete de baitcasting electrónico — contador LED'
    },
    desc: {
      fr: 'Écran LED compteur de ligne, ratio 7.2:1, frein 10 kg, étanche.',
      en: 'LED line-counter display, 7.2:1 ratio, 10 kg drag, waterproof.',
      es: 'Pantalla LED cuentalíneas, ratio 7.2:1, freno 10 kg, estanco.'
    },
    long: {
      fr: "Moulinet baitcasting nouvelle génération avec grand écran LED : il compte les mètres de ligne sortis en temps réel — un atout précieux pour la pêche à la traîne, sur glace ou en profondeur, où revenir exactement à la bonne profondeur change tout. Ratio rapide 7.2:1, frein puissant de 10 kg, construction étanche compatible eau salée, batterie remplaçable et câble de recharge USB inclus. Quatre coloris au choix.",
      en: "New-generation baitcasting reel with a large LED display: it counts line out in real time — a precious edge for trolling, ice fishing or deep water, where returning to the exact depth changes everything. Fast 7.2:1 ratio, powerful 10 kg drag, waterproof saltwater-ready build, replaceable battery and USB charging cable included. Four colors available.",
      es: "Carrete de baitcasting de nueva generación con gran pantalla LED: cuenta los metros de línea en tiempo real — una ventaja clave para curricán, pesca en hielo o aguas profundas. Ratio rápido 7.2:1, freno de 10 kg, construcción estanca apta para agua salada, batería reemplazable y cable USB incluido. Cuatro colores."
    },
  },
  {
    id: 'ali-24', category: 'gear', rating: 4.8, reviews: 1518, badge: null, sku: '',
    /* Prix de base CAD ÷1.37 ; port 2,85 $ CAD */
    variants: [
      { label: '15 cm — 20 pcs', usd: 3.56, ship: 2.08 },
      { label: '20 cm — 20 pcs', usd: 3.54, ship: 2.08 },
      { label: '25 cm — 20 pcs', usd: 3.49, ship: 2.08 },
      { label: '30 cm — 20 pcs', usd: 3.64, ship: 2.08 },
    ],
    photos: ['ali24-1.webp','ali24-2.webp','ali24-3.webp','ali24-4.webp','ali24-5.webp','ali24-6.webp','ali24-7.webp','ali24-8.webp','ali24-9.webp','ali24-10.webp'],
    name: {
      fr: 'Bas de ligne acier anti-morsure — lot de 20',
      en: 'Anti-Bite Steel Leaders — 20 pack',
      es: 'Bajos de línea de acero antimordida — lote de 20'
    },
    desc: {
      fr: 'Avants en acier avec agrafe et émerillon — spécial brochet.',
      en: 'Steel traces with snap and swivel — pike special.',
      es: 'Bajos de acero con grapa y esmerillón — especial lucio.'
    },
    long: {
      fr: "Bas de ligne en fil d'acier ultra résistant avec émerillon d'un côté et agrafe rotative de l'autre : la protection indispensable contre les dents du brochet et du maskinongé, qui tranchent net les lignes classiques. Montage en 2 secondes, rotation anti-vrillage. Quatre longueurs au choix (15, 20, 25 ou 30 cm), vendus par lot de 20 — tu en auras toujours un d'avance.",
      en: "Ultra-strong steel wire leaders with a swivel on one end and a rotating snap on the other: essential protection against pike and musky teeth that slice ordinary lines clean through. Rigged in 2 seconds, anti-twist rotation. Four lengths (15, 20, 25 or 30 cm), sold in packs of 20 — you'll always have a spare.",
      es: "Bajos de línea de acero ultrarresistente con esmerillón y grapa giratoria: la protección imprescindible contra los dientes del lucio, que cortan las líneas normales. Montaje en 2 segundos, rotación antigiro. Cuatro longitudes (15-30 cm), en lotes de 20."
    },
  },
  {
    id: 'ali-25', category: 'lures', rating: 4.6, reviews: 2231, badge: 'best', sku: '', markup: 1.5,
    /* Prix de base CAD ÷1.37 ; port gratuit ; marge 1.5 (prix barrés gonflés) */
    variants: [
      { label: 'Kit 86 pièces',  usd: 13.50, ship: 0 },
      { label: 'Kit 136 pièces', usd: 25.87, ship: 0 },
      { label: 'Kit 366 pièces', usd: 57.40, ship: 0 },
    ],
    photos: ['ali25-1.webp','ali25-2.webp','ali25-3.webp','ali25-4.webp','ali25-5.webp','ali25-6.webp','ali25-7.webp','ali25-8.webp','ali25-9.webp','ali25-10.webp'],
    name: {
      fr: 'Kit de leurres complet avec boîte — 86 à 366 pièces',
      en: 'Complete Lure Kit with Box — 86 to 366 pieces',
      es: 'Kit completo de señuelos con caja — 86 a 366 piezas'
    },
    desc: {
      fr: 'L\'arsenal du pêcheur : leurres durs, souples et accessoires.',
      en: 'The angler\'s arsenal: hard baits, soft baits and accessories.',
      es: 'El arsenal del pescador: señuelos duros, blandos y accesorios.'
    },
    long: {
      fr: "Le kit qui équipe un pêcheur au complet : poissons-nageurs, cuillers, leurres souples, jigs, hameçons, émerillons et accessoires, rangés dans une boîte compartimentée. Trois formats — 86 pièces pour débuter, 136 pour élargir la gamme, 366 pour l'arsenal complet. Ciblé truite, doré et achigan. Le cadeau parfait pour un débutant… ou pour soi.",
      en: "The kit that outfits an angler completely: minnows, spoons, soft baits, jigs, hooks, swivels and accessories, organized in a compartment box. Three formats — 86 pieces to start, 136 to expand, 366 for the full arsenal. Aimed at trout, walleye and bass. The perfect gift for a beginner… or yourself.",
      es: "El kit que equipa a un pescador al completo: peces nadadores, cucharillas, señuelos blandos, jigs, anzuelos y accesorios en caja con compartimentos. Tres formatos — 86, 136 o 366 piezas. Para trucha, lucioperca y bass. El regalo perfecto."
    },
  },
  {
    id: 'ali-26', category: 'gear', rating: 4.7, reviews: 1410, badge: 'best', sku: '',
    /* Prix de base CAD ÷1.37 ; port 2,87 $ CAD */
    variants: [
      { label: '0,14 mm — 4 lb',  usd: 3.93, ship: 2.09 },
      { label: '0,20 mm — 7 lb',  usd: 4.11, ship: 2.09 },
      { label: '0,26 mm — 12 lb', usd: 4.09, ship: 2.09 },
      { label: '0,35 mm — 21 lb', usd: 4.25, ship: 2.09 },
      { label: '0,50 mm — 34 lb', usd: 4.45, ship: 2.09 },
    ],
    photos: ['ali26-1.webp','ali26-2.webp','ali26-3.webp','ali26-4.webp','ali26-5.webp','ali26-6.webp','ali26-7.webp'],
    name: {
      fr: 'Fluorocarbone 100 m — bas de ligne discret',
      en: 'Fluorocarbon Line 100 m — stealth leader',
      es: 'Fluorocarbono 100 m — bajo de línea invisible'
    },
    desc: {
      fr: 'Quasi invisible sous l\'eau, souple et résistant à l\'abrasion.',
      en: 'Nearly invisible underwater, supple and abrasion-resistant.',
      es: 'Casi invisible bajo el agua, flexible y resistente a la abrasión.'
    },
    long: {
      fr: "Ligne fluorocarbone super souple de 100 m : son indice de réfraction proche de l'eau la rend quasi invisible pour les poissons méfiants — le complément parfait d'une tresse en bas de ligne. Coule naturellement, excellente résistance à l'abrasion sur les roches. Cinq diamètres au choix, de 0,14 mm (4 lb, truite en eau claire) à 0,50 mm (34 lb, brochet et gros carnassiers).",
      en: "Super-supple 100 m fluorocarbon line: its refraction index close to water makes it nearly invisible to wary fish — the perfect leader companion to braid. Sinks naturally, excellent abrasion resistance on rocks. Five diameters, from 0.14 mm (4 lb, clear-water trout) to 0.50 mm (34 lb, pike and big predators).",
      es: "Línea de fluorocarbono súper flexible de 100 m: su índice de refracción cercano al agua la hace casi invisible — el complemento perfecto del trenzado. Se hunde de forma natural y resiste la abrasión. Cinco diámetros, de 0,14 mm (4 lb) a 0,50 mm (34 lb)."
    },
  },
  {
    id: 'ali-27', category: 'gear', rating: 4.7, reviews: 738, badge: null, sku: '',
    /* Prix de base CAD ÷1.37 ; port 2,87 $ CAD */
    variants: [
      { label: 'Doré — 100 pcs',    usd: 2.28, ship: 2.09 },
      { label: 'Argenté — 100 pcs', usd: 2.34, ship: 2.09 },
      { label: 'Noir — 100 pcs',    usd: 2.22, ship: 2.09 },
    ],
    photos: ['ali27-1.webp','ali27-2.webp','ali27-3.webp','ali27-4.webp','ali27-5.webp','ali27-6.webp','ali27-7.webp','ali27-8.webp','ali27-9.webp'],
    name: {
      fr: 'Hameçons acier carbone avec ardillon — boîte de 100',
      en: 'Carbon Steel Barbed Hooks — box of 100',
      es: 'Anzuelos de acero al carbono con rebaba — caja de 100'
    },
    desc: {
      fr: '100 hameçons à œillet en boîte de rangement — 3 finitions.',
      en: '100 eyed hooks in a storage box — 3 finishes.',
      es: '100 anzuelos con ojal en caja — 3 acabados.'
    },
    long: {
      fr: "Boîte de 100 hameçons à œillet en acier au carbone, avec ardillon pour bien tenir l'esche et le poisson. Tailles assorties dans la boîte de rangement : de quoi couvrir la pêche au coup, la carpe, la mouche et les montages de mer. Trois finitions au choix — dorée, argentée ou noire discrète. La base de toute boîte de pêche, à petit prix.",
      en: "Box of 100 eyed carbon-steel hooks with barbs to hold bait and fish securely. Assorted sizes in a storage box: covers float fishing, carp, fly and saltwater rigs. Three finishes — gold, silver or stealth black. The foundation of every tackle box, at a small price.",
      es: "Caja de 100 anzuelos con ojal de acero al carbono, con rebaba para sujetar bien el cebo. Tallas surtidas en caja organizadora: para coup, carpa, mosca y mar. Tres acabados — dorado, plateado o negro. La base de toda caja de pesca."
    },
  },
  {
    id: 'ali-31', category: 'gear', rating: 4.8, reviews: 362, badge: null, sku: '', markup: 1.5,
    /* Prix de base CAD ÷1.37 ; port 3,09 $ CAD ; marge 1.5 (prix barrés gonflés) */
    variants: [
      { label: '60 ml',  usd: 12.53, ship: 2.26 },
      { label: '120 ml', usd: 20.30, ship: 2.26 },
    ],
    photos: ['ali31-1.webp','ali31-2.webp','ali31-3.webp','ali31-4.webp','ali31-5.webp','ali31-6.webp','ali31-7.webp','ali31-8.webp'],
    name: {
      fr: 'Huile de précision pour moulinet',
      en: 'Precision Reel Oil',
      es: 'Aceite de precisión para carrete'
    },
    desc: {
      fr: 'Aiguille applicatrice, anticorrosion — eau douce et salée.',
      en: 'Needle applicator, anti-corrosion — fresh and salt water.',
      es: 'Aguja aplicadora, anticorrosión — agua dulce y salada.'
    },
    long: {
      fr: "Huile lubrifiante pour moulinet avec aiguille de précision : une goutte exactement où il faut — roulements, pignons, axe de manivelle — sans en mettre partout. Récupérations plus fluides, protection anticorrosion pour l'eau douce comme l'eau salée. L'entretien qui double la durée de vie d'un moulinet, en flacon de 60 ou 120 ml.",
      en: "Reel lubricating oil with a precision needle: one drop exactly where it's needed — bearings, gears, handle shaft — without mess. Smoother retrieves and corrosion protection for fresh and salt water. The maintenance that doubles a reel's life, in 60 or 120 ml bottles.",
      es: "Aceite lubricante para carrete con aguja de precisión: una gota exactamente donde hace falta — rodamientos, engranajes, eje. Recuperaciones más suaves y protección anticorrosión. El mantenimiento que duplica la vida del carrete, en 60 o 120 ml."
    },
  },
  {
    id: 'ali-33', category: 'reels', rating: 4.7, reviews: 664, badge: null, sku: '', markup: 1.5,
    /* Prix de base CAD ÷1.37 ; port gratuit ; marge 1.5 (prix barrés gonflés) */
    variants: [
      { label: 'Série 2000', usd: 32.20, ship: 0 },
      { label: 'Série 3000', usd: 32.89, ship: 0 },
      { label: 'Série 5000', usd: 35.68, ship: 0 },
      { label: 'Série 7000', usd: 42.85, ship: 0 },
    ],
    photos: ['ali33-1.webp','ali33-2.webp','ali33-3.webp','ali33-4.webp','ali33-5.webp','ali33-6.webp','ali33-7.webp'],
    name: {
      fr: 'Moulinet spinning frein 12 kg — bobine métal',
      en: 'Spinning Reel 12 kg drag — metal spool',
      es: 'Carrete spinning freno 12 kg — bobina metálica'
    },
    desc: {
      fr: 'Du léger au costaud : séries 2000 à 7000.',
      en: 'From light to heavy: 2000 to 7000 series.',
      es: 'De ligero a potente: series 2000 a 7000.'
    },
    long: {
      fr: "Moulinet spinning polyvalent à bobine métal et frein puissant de 12 kg. Quatre tailles pour couvrir toutes tes pêches : série 2000 pour la truite et la perche, 3000 pour le doré, 5000 pour le brochet et 7000 pour les gros combats en eau profonde. Récupération fluide, construction robuste — le rapport qualité-prix solide pour monter une deuxième canne ou débuter sérieusement.",
      en: "Versatile spinning reel with a metal spool and a strong 12 kg drag. Four sizes to cover all your fishing: 2000 series for trout and perch, 3000 for walleye, 5000 for pike and 7000 for heavy deep-water battles. Smooth retrieve, sturdy build — solid value to rig a second rod or start fishing seriously.",
      es: "Carrete spinning polivalente con bobina metálica y freno potente de 12 kg. Cuatro tallas: 2000 para trucha y perca, 3000 para lucioperca, 5000 para lucio y 7000 para combates fuertes. Recuperación fluida y construcción robusta."
    },
  },
  {
    id: 'ali-34', category: 'reels', rating: 4.7, reviews: 395, badge: null, sku: '', markup: 1.5,
    /* Prix de base CAD ÷1.37 ; port gratuit ; marge 1.5 (prix barrés gonflés) */
    variants: [
      { label: 'Main droite', usd: 44.39, ship: 0 },
      { label: 'Main gauche', usd: 44.73, ship: 0 },
    ],
    photos: ['ali34-1.webp','ali34-2.webp','ali34-3.webp','ali34-4.webp','ali34-5.webp','ali34-6.webp','ali34-7.webp','ali34-8.webp'],
    name: {
      fr: 'Moulinet baitcasting 7.2:1 — eau salée',
      en: 'Baitcasting Reel 7.2:1 — saltwater ready',
      es: 'Carrete baitcasting 7.2:1 — apto agua salada'
    },
    desc: {
      fr: 'Ultraléger, 6+1 roulements, longue portée, clicker de frein.',
      en: 'Ultralight, 6+1 bearings, long cast, drag clicker.',
      es: 'Ultraligero, 6+1 rodamientos, largo alcance, clicker.'
    },
    long: {
      fr: "Moulinet baitcasting ultraléger au ratio rapide 7.2:1 : récupère vite entre deux lancers et attaque plus de postes. Six roulements + un anti-retour pour une fluidité constante, clicker de frein sonore et construction pensée pour résister à l'eau salée. Offert en version main droite ou main gauche — choisis ton côté de manivelle.",
      en: "Ultralight baitcasting reel with a fast 7.2:1 ratio: pick up line quickly between casts and cover more water. Six bearings plus anti-reverse for constant smoothness, audible drag clicker and a build made to shrug off salt water. Right- or left-hand versions — pick your crank side.",
      es: "Carrete baitcasting ultraligero con ratio rápido 7.2:1. Seis rodamientos más antirretorno, clicker de freno sonoro y construcción resistente al agua salada. Versión mano derecha o izquierda."
    },
  },
  {
    id: 'ali-35', category: 'reels', rating: 4.5, reviews: 299, badge: null, sku: '',
    /* Prix de base CAD ÷1.37 (prix réel, promo faible) ; port 2,85 $ CAD ; marge auto */
    variants: [
      { label: 'Noir — main gauche',        usd: 11.82, ship: 2.08 },
      { label: 'Rouge/noir — main gauche',  usd: 11.78, ship: 2.08 },
      { label: 'Bleu/noir — main gauche',   usd: 11.78, ship: 2.08 },
      { label: 'Or/noir — main droite',     usd: 12.85, ship: 2.08 },
      { label: 'Rose/noir — main gauche',   usd: 12.91, ship: 2.08 },
    ],
    photos: ['ali35-1.webp','ali35-2.webp','ali35-3.webp','ali35-4.webp','ali35-5.webp','ali35-6.webp','ali35-7.webp','ali35-8.webp','ali35-9.webp','ali35-10.webp','ali35-11.webp','ali35-12.webp','ali35-13.webp','ali35-14.webp','ali35-15.webp','ali35-16.webp','ali35-17.webp'],
    name: {
      fr: 'Moulinet baitcasting compact 7.2:1 — anti-perruque',
      en: 'Compact Baitcasting Reel 7.2:1 — anti-backlash',
      es: 'Carrete baitcasting compacto 7.2:1 — antienredos'
    },
    desc: {
      fr: 'Le baitcasting abordable pour débuter — 5 coloris.',
      en: 'The affordable baitcaster to get started — 5 colors.',
      es: 'El baitcasting asequible para empezar — 5 colores.'
    },
    long: {
      fr: "Envie d'essayer le baitcasting sans te ruiner ? Ce moulinet compact au ratio 7.2:1 est fait pour ça : système anti-emmêlement qui pardonne les erreurs de débutant, lancers longs et précis, et il tient l'eau douce comme la salée. Cinq coloris au choix, majoritairement en main gauche (l'or/noir en main droite). Le premier pas idéal vers la pêche au lancer léger.",
      en: "Want to try baitcasting without breaking the bank? This compact 7.2:1 reel is built for it: an anti-backlash system that forgives beginner mistakes, long accurate casts, and it handles fresh and salt water. Five colors, mostly left-hand (gold/black in right-hand). The ideal first step into casting.",
      es: "¿Quieres probar el baitcasting sin arruinarte? Este carrete compacto 7.2:1 tiene sistema antienredos que perdona errores, lanzados largos y precisos, y aguanta agua dulce y salada. Cinco colores. El primer paso ideal."
    },
  },
  {
    id: 'ali-36', category: 'reels', rating: 4.8, reviews: 1747, badge: 'best', sku: '', markup: 1.5,
    /* Prix de base CAD ÷1.37 ; port gratuit ; marge 1.5 (prix barrés gonflés) */
    variants: [
      { label: 'Série 3000', usd: 44.27, ship: 0 },
      { label: 'Série 5000', usd: 46.50, ship: 0 },
      { label: 'Série 7000', usd: 55.09, ship: 0 },
    ],
    photos: ['ali36-1.webp','ali36-2.webp','ali36-3.webp','ali36-4.webp','ali36-5.webp','ali36-6.webp'],
    name: {
      fr: 'Moulinet spinning surfcasting — frein 15 kg',
      en: 'Surfcasting Spinning Reel — 15 kg drag',
      es: 'Carrete spinning surfcasting — freno 15 kg'
    },
    desc: {
      fr: 'Ultraléger et costaud — jigging et pêche du bord en mer.',
      en: 'Ultralight and strong — jigging and shore fishing.',
      es: 'Ultraligero y potente — jigging y pesca desde orilla.'
    },
    long: {
      fr: "Moulinet spinning taillé pour le surfcasting et le jigging : frein surpuissant de 15 kg pour encaisser les rushs, corps ultraléger pour lancer des heures sans fatigue, et traitement pensé pour l'eau salée. Trois tailles — 3000 polyvalente, 5000 pour les beaux poissons, 7000 pour les monstres du large. Plus de 10 000 pêcheurs conquis (4.8★).",
      en: "Spinning reel built for surfcasting and jigging: an overpowered 15 kg drag to absorb the runs, an ultralight body to cast for hours without fatigue, and saltwater-minded construction. Three sizes — versatile 3000, 5000 for big fish, 7000 for offshore monsters. Over 10,000 anglers convinced (4.8★).",
      es: "Carrete spinning para surfcasting y jigging: freno de 15 kg, cuerpo ultraligero y construcción pensada para el agua salada. Tres tallas — 3000, 5000 y 7000. Más de 10 000 pescadores convencidos (4.8★)."
    },
  },
  {
    id: 'ali-37', category: 'reels', rating: 4.8, reviews: 1234, badge: null, sku: '', markup: 1.5,
    /* Prix de base CAD ÷1.37 ; port gratuit ; marge 1.5 (prix barrés gonflés) ; série 4000 écartée (prix incohérent) */
    variants: [
      { label: 'Série 500',  usd: 59.24, ship: 0 },
      { label: 'Série 3000', usd: 67.14, ship: 0 },
      { label: 'Série 5000', usd: 78.04, ship: 0 },
    ],
    photos: ['ali37-1.webp','ali37-2.webp','ali37-3.webp','ali37-4.webp','ali37-5.webp','ali37-6.webp','ali37-7.webp','ali37-8.webp'],
    name: {
      fr: 'Moulinet spinning premium 9+1 roulements',
      en: 'Premium Spinning Reel 9+1 bearings',
      es: 'Carrete spinning premium 9+1 rodamientos'
    },
    desc: {
      fr: 'Fluidité haut de gamme, frein 12 kg — perche, bar, brochet.',
      en: 'High-end smoothness, 12 kg drag — perch, bass, pike.',
      es: 'Suavidad de gama alta, freno 12 kg — perca, bass, lucio.'
    },
    long: {
      fr: "Le haut du panier : 9 roulements + 1 anti-retour pour une fluidité de récupération exceptionnelle, frein de 12 kg et ratio 5.2:1 coupleux qui ne faiblit pas sous la charge. Série 500 pour l'ultra-léger et la pêche hivernale, 3000 pour la polyvalence, 5000 pour les gros brochets. Un moulinet qu'on sent monter en gamme dès le premier tour de manivelle (4.8★, 1200+ avis).",
      en: "Top of the class: 9 bearings plus anti-reverse for exceptionally smooth retrieves, a 12 kg drag and a torquey 5.2:1 ratio that doesn't fade under load. 500 series for ultralight and winter fishing, 3000 for versatility, 5000 for big pike. A reel that feels premium from the first crank (4.8★, 1200+ reviews).",
      es: "Lo mejor de su clase: 9 rodamientos más antirretorno, freno de 12 kg y ratio 5.2:1 con par que no cede bajo carga. Serie 500 para ultraligero, 3000 polivalente, 5000 para grandes lucios. Se siente premium desde la primera vuelta (4.8★)."
    },
  },
  {
    id: 'ali-38', category: 'reels', rating: 4.6, reviews: 1590, badge: null, sku: '', markup: 1.5,
    /* Prix de base CAD ÷1.37 ; port 3,09 $ CAD ; marge 1.5 (prix barrés gonflés) */
    variants: [
      { label: 'Série 1000', usd: 24.45, ship: 2.26 },
      { label: 'Série 3000', usd: 30.11, ship: 2.26 },
      { label: 'Série 5000', usd: 38.55, ship: 2.26 },
      { label: 'Série 7000', usd: 40.21, ship: 2.26 },
    ],
    photos: ['ali38-1.webp','ali38-2.webp','ali38-3.webp','ali38-4.webp','ali38-5.webp','ali38-6.webp'],
    name: {
      fr: 'Moulinet spinning bobine CNC — frein 26 lb',
      en: 'Spinning Reel CNC spool — 26 lb drag',
      es: 'Carrete spinning bobina CNC — freno 26 lb'
    },
    desc: {
      fr: 'Finition métal usinée, ratio 5.2:1 — eau douce et salée.',
      en: 'Machined metal finish, 5.2:1 ratio — fresh and salt water.',
      es: 'Acabado metálico mecanizado, ratio 5.2:1 — dulce y salada.'
    },
    long: {
      fr: "Moulinet spinning à la bobine métal usinée CNC : équilibrage parfait, sorties de ligne régulières et une allure racée tout en métal. Frein de 26 lb (~12 kg), ratio 5.2:1 coupleux, à l'aise en eau douce comme en mer. Quatre tailles de la série 1000 (truite, perche) à la 7000 (gros brochets, pêche du bord en mer).",
      en: "Spinning reel with a CNC-machined metal spool: perfect balance, consistent line flow and a sharp all-metal look. 26 lb (~12 kg) drag, torquey 5.2:1 ratio, at home in fresh water and salt. Four sizes from the 1000 series (trout, perch) to the 7000 (big pike, shore fishing).",
      es: "Carrete spinning con bobina de metal mecanizada CNC: equilibrio perfecto y salida de línea regular. Freno de 26 lb, ratio 5.2:1, para agua dulce y mar. Cuatro tallas de la serie 1000 a la 7000."
    },
  },
  {
    id: 'ali-39', category: 'reels', rating: 4.8, reviews: 1774, badge: null, sku: '', markup: 1.5,
    /* Prix de base CAD ÷1.37 ; port gratuit ; marge 1.5 (prix barrés gonflés) */
    variants: [
      { label: 'Main gauche', usd: 61.87, ship: 0 },
      { label: 'Main droite', usd: 62.80, ship: 0 },
    ],
    photos: ['ali39-1.webp','ali39-2.webp','ali39-3.webp','ali39-4.webp','ali39-5.webp','ali39-6.webp','ali39-7.webp'],
    name: {
      fr: 'Moulinet baitcasting céramique — frein magnétique',
      en: 'Ceramic Baitcasting Reel — magnetic brake',
      es: 'Carrete baitcasting cerámico — freno magnético'
    },
    desc: {
      fr: 'Roulements céramique hybrides, frein magnétique, ratio 7.3:1.',
      en: 'Hybrid ceramic bearings, magnetic brake, 7.3:1 ratio.',
      es: 'Rodamientos cerámicos híbridos, freno magnético, ratio 7.3:1.'
    },
    long: {
      fr: "Baitcasting de performance : roulements en céramique hybride pour une bobine qui tourne plus longtemps (= lancers plus loin), frein magnétique à aimants puissants qui dompte la perruque, rondelles de frein en fibre de carbone et ratio rapide 7.3:1. En version main gauche ou main droite. Le choix des pêcheurs au leurre exigeants (4.8★, 1700+ avis).",
      en: "Performance baitcasting: hybrid ceramic bearings for a longer-spinning spool (= longer casts), a strong-magnet brake that tames backlash, carbon-fiber drag washers and a fast 7.3:1 ratio. Left- or right-hand versions. The pick of demanding lure anglers (4.8★, 1700+ reviews).",
      es: "Baitcasting de rendimiento: rodamientos cerámicos híbridos (lanzados más largos), freno magnético potente, arandelas de fibra de carbono y ratio rápido 7.3:1. Mano izquierda o derecha. La elección de los exigentes (4.8★)."
    },
  },
  {
    id: 'ali-40', category: 'reels', rating: 4.7, reviews: 2450, badge: 'best', sku: '', markup: 1.5,
    /* Prix de base CAD ÷1.37 ; port 3,09 $ CAD ; marge 1.5 (prix barrés gonflés) */
    variants: [
      { label: 'Série 1000', usd: 27.20, ship: 2.26 },
      { label: 'Série 3000', usd: 29.14, ship: 2.26 },
      { label: 'Série 5000', usd: 32.59, ship: 2.26 },
      { label: 'Série 7000', usd: 37.95, ship: 2.26 },
    ],
    photos: ['ali40-1.webp','ali40-2.webp','ali40-3.webp','ali40-4.webp','ali40-5.webp','ali40-6.webp','ali40-7.webp'],
    name: {
      fr: 'Moulinet spinning ultra léger — séries 1000 à 7000',
      en: 'Ultralight Spinning Reel — 1000 to 7000 series',
      es: 'Carrete spinning ultraligero — series 1000 a 7000'
    },
    desc: {
      fr: 'Le best-seller : frein 26 lb, bobine CNC, gris furtif.',
      en: 'The best-seller: 26 lb drag, CNC spool, stealth grey.',
      es: 'El superventas: freno 26 lb, bobina CNC, gris furtivo.'
    },
    long: {
      fr: "Notre moulinet le plus populaire (4.7★, 2400+ avis, 10 000+ vendus) : ultra léger pour pêcher toute la journée, frein max de 26 lb, bobine métal usinée CNC et finition gris foncé furtive. Quatre tailles pour tout couvrir — 1000 pour l'ultraléger truite, 3000 le passe-partout, 5000 et 7000 pour le brochet et la mer. Fiable, fluide, sans fioritures : il fait le travail, sortie après sortie.",
      en: "Our most popular reel (4.7★, 2400+ reviews, 10,000+ sold): ultralight for all-day fishing, 26 lb max drag, CNC-machined metal spool and a stealthy dark-grey finish. Four sizes to cover everything — 1000 for ultralight trout, 3000 the all-rounder, 5000 and 7000 for pike and salt water. Reliable, smooth, no frills: it does the job, trip after trip.",
      es: "Nuestro carrete más popular (4.7★, 2400+ opiniones, 10 000+ vendidos): ultraligero, freno máx. de 26 lb, bobina CNC y acabado gris oscuro. Cuatro tallas — 1000 para trucha, 3000 todoterreno, 5000 y 7000 para lucio y mar. Fiable y suave: cumple, salida tras salida."
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
  const m = p.markup || markupFor(prodUSD);  // marge personnalisée du produit, sinon dégressive
  return Math.round((prodUSD * m + shipUSD) * USD_TO_CAD * 100) / 100;
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
