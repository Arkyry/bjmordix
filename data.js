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
   - de 20 à 60 $   -> x2.5
   - plus de 60 $   -> x1.6
   (la marge s'applique AU PRODUIT seulement, jamais aux frais de port) */
function markupFor(costUSD) {
  if (costUSD < 20) return 3;
  if (costUSD <= 60) return 2.5;
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
  {
    id: 'lure-squid-luminous', category: 'lures', usd: 1.57, ship: 5.20, rating: 4.6, reviews: null, badge: 'best',
    photos: ['squid-luminous-1.webp','squid-luminous-2.webp','squid-luminous-3.webp'],
    name: { fr: 'Turlutte à calamar lumineuse', en: 'Luminous Squid Bait', es: 'Señuelo de calamar luminoso' },
    desc: { fr: 'Brille dans le noir — eau douce et salée.', en: 'Glows in the dark — fresh and salt water.', es: 'Brilla en la oscuridad — agua dulce y salada.' },
    long: {
      fr: "Turlutte à calamar « bionique » en plastique souple vert clair (105 mm, 8,5 g) qui se recharge à la lumière et brille longuement sous l'eau. Son corps imitation et sa couronne d'aiguilles fines déclenchent l'attaque des calamars et des seiches. Polyvalente en eau douce comme en mer — idéale aussi comme appât pour le saumon, le bar ou le marlin — elle se pêche à la traîne, en dandine ou en saut. L'arme secrète des pêcheurs, redoutable de nuit et en eau profonde.",
      en: "Soft-plastic 'bionic' luminous squid jig in light green (105 mm, 8.5 g) that charges in light and glows long underwater. Its lifelike body and fine spike crown trigger strikes from squid and cuttlefish. Versatile in fresh and salt water — also great as bait for salmon, bass or marlin — fished trolling, jigging or jumping. The fishermen's secret weapon, deadly at night and in deep water.",
      es: "Señuelo de calamar «biónico» de plástico blando verde claro (105 mm, 8,5 g) que se carga con la luz y brilla largo rato bajo el agua. Su cuerpo imitación y su corona de agujas finas provocan el ataque de calamares y sepias. Versátil en agua dulce y salada — también ideal como cebo para salmón, lubina o marlín — se pesca al curricán, a jigging o a salto. El arma secreta de los pescadores, temible de noche y en aguas profundas." }
  },
  {
    id: 'lure-popper-surface', category: 'lures', usd: 6.44, ship: 6.10, rating: 4.7, reviews: null, badge: 'new', sku: 'CJYE121985603CX',
    photos: ['popper-1.webp','popper-2.webp','popper-3.webp','popper-4.webp','popper-5.webp'],
    name: { fr: 'Popper de surface en bois 20,5 cm', en: 'Wooden Topwater Popper 20.5 cm', es: 'Popper de superficie de madera 20,5 cm' },
    desc: { fr: 'Éclaboussures et « ploc » qui déclenchent l\'attaque.', en: 'Spray and a pop that trigger strikes.', es: 'Salpicaduras y un «ploc» que provocan el ataque.' },
    long: {
      fr: "Popper de surface en bois massif de 20,5 cm (135 g) pour la pêche en mer des gros prédateurs (bar, bonite, liche, pélagiques…). Sa large tête concave creuse l'eau à chaque animation : éclaboussures et « ploc » sonore imitent une proie en fuite et provoquent des attaques explosives en pleine surface. Leurre « bionique » bien lesté pour des lancers longue distance face au vent, anneaux brisés renforcés et hameçons triples solides. Disponible en 4 coloris flashy : rouge, jaune, noir et bleu.",
      en: "Solid wooden topwater popper, 20.5 cm and 135 g, for sea fishing of large predators (bass, bonito, leerfish, pelagics…). Its wide concave mouth digs into the water on every twitch — spray and a popping sound mimic a fleeing prey and trigger explosive surface strikes. A well-weighted 'bionic' lure for long casts into the wind, reinforced split rings and strong treble hooks. Available in 4 bright colours: red, yellow, black and blue.",
      es: "Popper de superficie de madera maciza, 20,5 cm y 135 g, para la pesca en el mar de grandes depredadores (lubina, bonito, pez limón, pelágicos…). Su amplia boca cóncava cava el agua en cada animación: salpicaduras y un sonido «ploc» imitan a una presa en fuga y provocan ataques explosivos en plena superficie. Señuelo «biónico» bien lastrado para lanzados largos contra el viento, anillas reforzadas y anzuelos triples resistentes. Disponible en 4 colores llamativos: rojo, amarillo, negro y azul." }
  },
  {
    id: 'rod-ice-fishing', category: 'rods', usd: 1.71, ship: 5.65, rating: 4.5, reviews: null, badge: 'new', sku: 'CJYD234727601AZ',
    photos: ['ice-rod-1.webp','ice-rod-2.webp','ice-rod-3.webp','ice-rod-4.webp','ice-rod-5.webp'],
    name: { fr: 'Canne à pêche sur glace télescopique 0,6 m', en: 'Telescopic Ice Fishing Rod 0.6 m', es: 'Caña de pesca en hielo telescópica 0,6 m' },
    desc: { fr: 'Mini canne compacte, poignée en liège.', en: 'Compact mini rod, cork grip.', es: 'Mini caña compacta, mango de corcho.' },
    long: {
      fr: "Petite canne à pêche sur glace de 0,6 m, télescopique et ultra-compacte (80 g). Blank en carbone enduit, léger et sensible pour détecter les touches les plus fines sous la glace. Poignée en liège agréable et antidérapante même par grand froid, avec une élégante finition « grain de bois ». Idéale pour la pêche au trou, en float tube, pour les enfants ou les petits espaces — elle se range partout.",
      en: "Compact 0.6 m telescopic ice fishing rod (80 g). Carbon-coated blank, light and sensitive to detect the faintest bites under the ice. Comfortable cork handle that stays grippy even in the cold, with an elegant wood-grain finish. Ideal for hole fishing, float-tube sessions, kids or tight spaces — it packs away anywhere.",
      es: "Pequeña caña de pesca en hielo de 0,6 m, telescópica y ultracompacta (80 g). Blank con recubrimiento de carbono, ligero y sensible para detectar las picadas más finas bajo el hielo. Mango de corcho cómodo y antideslizante incluso con frío, con un elegante acabado «grano de madera». Ideal para la pesca en agujero, float-tube, niños o espacios reducidos — se guarda en cualquier sitio." }
  },
  {
    id: 'reel-sw-spinning', category: 'reels', ship: 11.50, rating: 4.7, reviews: null, badge: 'best', sku: 'CJYDDYDY00122-SW50',
    variants: [
      { label: 'SW50', usd: 9.20 },
      { label: 'SW60', usd: 9.54 },
    ],
    photos: ['reel-sw-1.webp','reel-sw-2.webp','reel-sw-3.webp','reel-sw-4.webp'],
    name: { fr: 'Moulinet spinning métal SW50 / SW60', en: 'Metal Spinning Reel SW50 / SW60', es: 'Carrete spinning metal SW50 / SW60' },
    desc: { fr: 'Tout métal, frein avant + arrière, 5.2:1.', en: 'All-metal, front + rear drag, 5.2:1.', es: 'Todo metal, freno delantero + trasero, 5.2:1.' },
    long: {
      fr: "Moulinet spinning robuste au corps entièrement métallique, avec double frein (avant et arrière façon baitrunner) pour laisser filer le poisson sans décrocher la canne. Ratio rapide 5,2:1, rotation fluide et grande capacité de fil — idéal pour le carnassier, la carpe et la pêche en bord de mer. Deux tailles au choix : SW50 (470 g) ou SW60 (515 g), plus puissant pour les gros poissons. Manivelle à poignée bois, finition noir et or du plus bel effet.",
      en: "Sturdy all-metal spinning reel with a dual drag (front + rear baitrunner-style) so you can let a fish run without lifting the rod. Fast 5.2:1 ratio, smooth rotation and large line capacity — ideal for predators, carp and shore fishing. Two sizes to choose from: SW50 (470 g) or SW60 (515 g), more powerful for big fish. Wooden-knob handle, sharp black-and-gold finish.",
      es: "Carrete spinning robusto de cuerpo totalmente metálico, con doble freno (delantero + trasero tipo baitrunner) para dejar correr al pez sin levantar la caña. Ratio rápido 5,2:1, rotación suave y gran capacidad de hilo — ideal para depredadores, carpa y pesca en la costa. Dos tallas a elegir: SW50 (470 g) o SW60 (515 g), más potente para peces grandes. Manivela con pomo de madera, acabado negro y oro." }
  },
  {
    id: 'gear-line-fish-king', category: 'gear', ship: 6.32, rating: 4.6, reviews: null, badge: 'new', sku: 'CJYDDYDY00211',
    variants: [
      { label: '0.30 mm', usd: 1.96 },
      { label: '0.35 mm', usd: 1.96 },
      { label: '0.40 mm', usd: 1.96 },
      { label: '0.45 mm', usd: 1.96 },
      { label: '0.50 mm', usd: 1.96 },
    ],
    photos: ['fluoro-line-1.png','fluoro-line-2.webp','fluoro-line-3.webp','fluoro-line-4.webp'],
    name: { fr: 'Fil fluorocarbone Fish King 300 m', en: 'Fish King Fluorocarbon Line 300 m', es: 'Hilo de fluorocarbono Fish King 300 m' },
    desc: { fr: 'Fluorocarbone enduit, quasi invisible, 5 diamètres.', en: 'Coated fluorocarbon, near-invisible, 5 diameters.', es: 'Fluorocarbono recubierto, casi invisible, 5 diámetros.' },
    long: {
      fr: "Fil fluorocarbone enduit (FISH KING) en bobine de 300 m, quasi invisible dans l'eau pour ne pas alerter les poissons méfiants. Faible mémoire, anti-vrille, résistant à l'abrasion et très souple pour des lancers fluides. Disponible en 5 diamètres — de 0,30 mm (13,5 kg) à 0,50 mm (20,3 kg) — pour s'adapter à toutes les pêches, de la truite au gros poisson. Parfait en corps de ligne ou en bas de ligne discret.",
      en: "Coated fluorocarbon line (FISH KING) on a 300 m spool, nearly invisible in water so it won't alert wary fish. Low memory, anti-curl, abrasion-resistant and very supple for smooth casts. Available in 5 diameters — from 0.30 mm (13.5 kg) to 0.50 mm (20.3 kg) — to suit every style, from trout to big fish. Perfect as a main line or a discreet leader.",
      es: "Hilo de fluorocarbono con recubrimiento (FISH KING) en bobina de 300 m, casi invisible en el agua para no alertar a los peces desconfiados. Poca memoria, anti-rizos, resistente a la abrasión y muy flexible para lanzados suaves. Disponible en 5 diámetros — de 0,30 mm (13,5 kg) a 0,50 mm (20,3 kg) — para adaptarse a cada pesca, de la trucha al pez grande. Perfecto como línea madre o bajo de línea discreto." }
  },
  {
    id: 'lure-metal-jig', category: 'lures', usd: 2.19, ship: 6.41, rating: 4.7, reviews: null, badge: 'new', sku: 'CJYE232814101AZ',
    photos: ['jig-metal-1.webp','jig-metal-2.webp','jig-metal-3.webp','jig-metal-4.webp','jig-metal-5.webp','jig-metal-6.webp'],
    name: { fr: 'Lot de 5 jigs métal argenté 15 g', en: 'Pack of 5 Silver Metal Jigs 15 g', es: 'Pack de 5 jigs de metal plateado 15 g' },
    desc: { fr: 'Lot de 5 jigs brillants, lancer longue distance.', en: 'Pack of 5 flashy jigs, long-distance casting.', es: 'Pack de 5 jigs brillantes, lanzado a larga distancia.' },
    long: {
      fr: "Lot de 5 jigs (leurres métalliques) de 15 g au placage argenté ultra-brillant, conçus pour la pêche en mer. Leur corps lesté file loin au lancer et coule vite pour atteindre les poissons actifs, tandis que les reflets métalliques et la plume colorée imitent un petit poisson en fuite. Équipés d'un hameçon de tête et d'un triple de queue affûtés. Redoutables sur le bar, la bonite, le maquereau et tous les chasseurs. Livrés dans une pochette de rangement.",
      en: "Pack of 5 metal jigs (15 g) with an ultra-bright silver plating, made for sea fishing. Their weighted body casts far and sinks fast to reach active fish, while the metallic flash and coloured feather mimic a fleeing baitfish. Fitted with a sharp head hook and tail treble. Deadly on bass, bonito, mackerel and all hunters. Delivered in a storage pouch.",
      es: "Pack de 5 jigs metálicos (15 g) con un plateado ultrabrillante, diseñados para la pesca en el mar. Su cuerpo lastrado lanza lejos y se hunde rápido para alcanzar a los peces activos, mientras que el destello metálico y la pluma de color imitan a un pez en fuga. Equipados con un anzuelo de cabeza y un triple de cola afilados. Temibles para la lubina, el bonito, la caballa y todos los cazadores. Entregados en una bolsa de almacenaje." }
  },
  {
    id: 'gear-tackle-kit', category: 'gear', usd: 3.08, ship: 7.05, rating: 4.6, reviews: null, badge: 'new', sku: 'CJDY197388601AZ',
    photos: ['tackle-kit-1.webp','tackle-kit-2.webp','tackle-kit-3.webp','tackle-kit-4.webp','tackle-kit-5.webp','tackle-kit-6.webp'],
    name: { fr: 'Coffret accessoires pêche aux rochers (184 pièces)', en: 'Rock Fishing Accessory Kit (184 pieces)', es: 'Kit de accesorios de pesca a roca (184 piezas)' },
    desc: { fr: '184 pièces : hameçons, perles, plombs, émerillons…', en: '184 pieces: hooks, beads, sinkers, swivels…', es: '184 piezas: anzuelos, perlas, plomos, destorcedores…' },
    long: {
      fr: "Le coffret « tout-en-un » du pêcheur. Cette boîte compacte à double face réunit 184 pièces réparties en 24 types d'accessoires indispensables : hameçons, émerillons, perles, stop-floats, plombs, connecteurs marins et bien plus. Fini de courir après une pièce manquante au bord de l'eau — tout est trié et à portée de main. Idéal pour la pêche aux rochers, en mer et la pêche fine. Boîte robuste à compartiments amovibles.",
      en: "The angler's all-in-one kit. This compact double-sided box brings together 184 pieces across 24 types of essential accessories: hooks, swivels, beads, float stops, sinkers, marine connectors and much more. No more hunting for a missing part at the water's edge — everything is sorted and within reach. Ideal for rock, sea and finesse fishing. Sturdy box with removable compartments.",
      es: "El kit todo en uno del pescador. Esta caja compacta de doble cara reúne 184 piezas en 24 tipos de accesorios imprescindibles: anzuelos, destorcedores, perlas, topes, plomos, conectores marinos y mucho más. Se acabó buscar una pieza que falta a la orilla del agua: todo está ordenado y a mano. Ideal para la pesca a roca, en el mar y la pesca fina. Caja resistente con compartimentos extraíbles." }
  },
  {
    id: 'cj-04', category: 'lures', rating: 4.7, reviews: null, badge: 'best', sku: 'CJYE114859201AZ',
    variants: [
      { label: 'Style A', usd: 2.28, ship: 5.20 },
      { label: 'Style B', usd: 1.19, ship: 5.20 }, { label: 'Style C', usd: 1.19, ship: 5.20 },
      { label: 'Style D', usd: 1.19, ship: 5.20 }, { label: 'Style E', usd: 1.19, ship: 5.20 },
      { label: 'Style F', usd: 1.19, ship: 5.20 }, { label: 'Style G', usd: 1.19, ship: 5.20 },
      { label: 'Style H', usd: 1.19, ship: 5.20 }, { label: 'Style I', usd: 1.19, ship: 5.20 },
      { label: 'Style J', usd: 1.19, ship: 5.20 }, { label: 'Style K', usd: 1.19, ship: 5.20 },
      { label: 'Style L', usd: 1.55, ship: 5.20 },
      { label: 'Set', usd: 2.77, ship: 6.05 }, { label: 'Set A', usd: 2.77, ship: 6.05 },
      { label: 'Set B', usd: 2.77, ship: 6.05 }, { label: 'Set C', usd: 2.77, ship: 6.05 },
      { label: 'Set D', usd: 2.77, ship: 6.05 }
    ],
    photos: ['cj04-1.webp','cj04-2.webp','cj04-3.webp','cj04-4.webp','cj04-5.webp','cj04-6.webp','cj04-7.webp','cj04-8.webp','cj04-9.webp','cj04-10.webp','cj04-11.webp','cj04-12.webp','cj04-13.webp','cj04-14.webp','cj04-15.webp','cj04-16.webp','cj04-17.webp'],
    name: { fr: 'Leurre nageur articulé 13 cm / 19 g', en: 'Jointed Swimbait 13 cm / 19 g', es: 'Señuelo articulado 13 cm / 19 g' },
    desc: { fr: 'Swimbait articulé 13 cm — 12 coloris ou lot (Set).', en: 'Jointed swimbait 13 cm — 12 colours or Set.', es: 'Swimbait articulado 13 cm — 12 colores o lote (Set).' },
    long: {
      fr: "Poisson nageur articulé en plusieurs sections (13,3 cm, 19 g) à la nage ondulante ultra-réaliste qui imite un poisson blessé. Astuce maline : une bille d'acier mobile glisse vers la queue au moment du lancer pour des lancers plus longs et plus stables, tandis que des billes internes créent un bruit de hochet qui attire le poisson de loin. Corps en ABS résistant aux chocs, finition réfléchissante qui capte la lumière sous tous les angles, hameçons triples (taille 6). Idéal pour le carnassier (brochet, sandre, perche, black-bass). Au choix : 12 coloris à l'unité (Style A à L) ou en lot « Set » (coloris G + F + L).",
      en: "Multi-section jointed swimbait (13.3 cm, 19 g) with an ultra-realistic undulating swim that mimics a wounded baitfish. Clever design: a moving steel ball slides to the tail on the cast for longer, more stable casts, while internal balls create a rattle that draws fish from afar. Impact-resistant ABS body, light-reflecting finish that catches light from every angle, treble hooks (size 6). Ideal for predators (pike, zander, perch, bass). Choose from 12 single colours (Style A to L) or a Set (colours G + F + L).",
      es: "Pez nadador articulado en varias secciones (13,3 cm, 19 g) con un nado ondulante ultrarrealista que imita a un pez herido. Diseño ingenioso: una bola de acero móvil se desliza hacia la cola al lanzar para lanzados más largos y estables, mientras que unas bolas internas crean un sonajero que atrae al pez de lejos. Cuerpo de ABS resistente a los golpes, acabado reflectante que capta la luz desde todos los ángulos, anzuelos triples (talla 6). Ideal para depredadores (lucio, lucioperca, perca, black-bass). A elegir: 12 colores por unidad (Style A a L) o en lote «Set» (colores G + F + L)." }
  },
  {
    id: 'cj-201', category: 'lures', usd: 0.63, ship: 5.20, rating: 4.6, reviews: null, badge: null, sku: 'CJDY1768129',
    photos: ['201-1.jpg','201-2.jpg','201-3.jpg','201-4.jpg','201-5.jpg'],
    name: { fr: 'Leurre nageur minnow 16,5 cm (21 g)', en: 'Minnow Lure 16.5 cm (21 g)', es: 'Señuelo minnow 16,5 cm (21 g)' },
    desc: { fr: 'Grand minnow à bavette, nombreux coloris.', en: 'Large diving minnow, many colours.', es: 'Gran minnow con babero, muchos colores.' },
    long: {
      fr: "Grand leurre nageur minnow de 16,5 cm (21 g) à bavette pour la pêche des carnassiers et en mer. À la récupération, il nage en sub-surface en imitant un poisson fourrage, déclenchant brochet, sandre, bar et silure. Yeux 3D réalistes et hameçons triples. Disponible dans de nombreux coloris pour s'adapter à l'eau et à la luminosité.",
      en: "Large 16.5 cm (21 g) minnow lure with a diving lip for predator and sea fishing. On the retrieve it swims sub-surface like a baitfish, triggering pike, zander, bass and catfish. Realistic 3D eyes and treble hooks. Available in many colours to match the water and light.",
      es: "Gran señuelo minnow de 16,5 cm (21 g) con babero para la pesca de depredadores y en mar. En la recogida nada en subsuperficie imitando a un pez forraje, provocando lucio, lucioperca, lubina y siluro. Ojos 3D realistas y anzuelos triples. Disponible en muchos colores para adaptarse al agua y la luz." }
  },
  {
    id: 'cj-202', category: 'lures', usd: 9.68, ship: 6.54, rating: 4.6, reviews: null, badge: null, sku: 'CJDY1805529',
    photos: ['202-1.jpg','202-2.jpg','202-3.jpg','202-4.jpg','202-5.jpg'],
    name: { fr: 'Stickbait coulant mer 18 cm', en: 'Sinking Stickbait 18 cm', es: 'Stickbait hundido 18 cm' },
    desc: { fr: 'Gros leurre mer, lance loin, nombreux coloris.', en: 'Big sea lure, long casts, many colours.', es: 'Gran señuelo de mar, lanza lejos, muchos colores.' },
    long: {
      fr: "Stickbait coulant de 18 cm pour la pêche en mer des prédateurs (bar, bonite, sériole, thon). Dense, il se lance très loin et descend dans la couche d'eau ; animé en dents de scie, il imite un poisson blessé en fuite. Hameçons triples renforcés. Disponible dans de nombreux coloris marins (style NS003).",
      en: "18 cm sinking stickbait for sea fishing of predators (bass, bonito, amberjack, tuna). Dense, it casts very far and drops through the water column; worked in a zig-zag it mimics a fleeing wounded fish. Reinforced treble hooks. Available in many saltwater colours (NS003 style).",
      es: "Stickbait hundido de 18 cm para la pesca en mar de depredadores (lubina, bonito, medregal, atún). Denso, se lanza muy lejos y baja por la capa de agua; animado en zigzag imita a un pez herido en fuga. Anzuelos triples reforzados. Disponible en muchos colores marinos (estilo NS003)." }
  },
  {
    id: 'cj-203', category: 'lures', rating: 4.6, reviews: null, badge: null, sku: 'CJDY1805980',
    variants: [
      { label: 'À l’unité', usd: 0.63, ship: 5.20 },
      { label: 'Lot 10 couleurs', usd: 3.51, ship: 5.20 }
    ],
    photos: ['203-1.jpg','203-2.jpg','203-3.jpg','203-4.jpg','203-5.jpg'],
    name: { fr: 'Crankbait 8,5 cm (à l’unité ou lot 10)', en: 'Crankbait 8.5 cm (single or 10-pack)', es: 'Crankbait 8,5 cm (unidad o lote 10)' },
    desc: { fr: 'Leurre plongeant, à l’unité ou coffret 10 coloris.', en: 'Diving lure, single or 10-colour set.', es: 'Señuelo buceador, unidad o set 10 colores.' },
    long: {
      fr: "Leurre crankbait plongeant de 8,5 cm à la nage roulante et vibrante qui déclenche perche, brochet et black-bass. Bavette pour explorer la couche d'eau à la récupération. Hameçons triples. Au choix : à l'unité dans le coloris voulu, ou en lot de 10 coloris assortis pour tout avoir sous la main.",
      en: "8.5 cm diving crankbait with a rolling, vibrating swim that triggers perch, pike and bass. Diving lip to explore the water column on the retrieve. Treble hooks. Choose a single lure in the colour you want, or a 10-colour assorted pack to have everything on hand.",
      es: "Señuelo crankbait buceador de 8,5 cm con un nado rodante y vibrante que provoca perca, lucio y black-bass. Babero para explorar la capa de agua en la recogida. Anzuelos triples. A elegir: por unidad en el color deseado, o en lote de 10 colores surtidos para tenerlo todo a mano." }
  },
  {
    id: 'cj-204', category: 'gear', usd: 0.75, ship: 5.20, rating: 4.5, reviews: null, badge: null, sku: 'CJDY186971501AZ',
    photos: ['204-1.jpg','204-2.jpg','204-3.jpg','204-4.jpg','204-5.jpg'],
    name: { fr: 'Enrouleurs de ligne en mousse (lot)', en: 'Foam Line Winders (set)', es: 'Enrolladores de línea en espuma (lote)' },
    desc: { fr: 'Range tes bas de ligne sans emmêler.', en: 'Store your rigs tangle-free.', es: 'Guarda tus bajos de línea sin enredos.' },
    long: {
      fr: "Lot de planchettes-enrouleurs en mousse EVA pour ranger proprement tes bas de ligne, montages et hameçons montés sans qu'ils s'emmêlent. Encoches sur les bords pour bloquer le fil, mousse légère qui flotte. Coloris assortis pour repérer tes montages d'un coup d'œil. Pratique dans la boîte ou le gilet de pêche.",
      en: "Set of EVA foam winder boards to neatly store your rigs, leaders and pre-tied hooks tangle-free. Notched edges to lock the line, light foam that floats. Assorted colours to spot your rigs at a glance. Handy in your tackle box or fishing vest.",
      es: "Lote de tablillas-enrolladoras de espuma EVA para guardar limpiamente tus bajos de línea, montajes y anzuelos montados sin que se enreden. Bordes con muescas para bloquear el hilo, espuma ligera que flota. Colores surtidos para localizar tus montajes de un vistazo. Práctico en la caja o el chaleco de pesca." }
  },
  {
    id: 'cj-205', category: 'reels', rating: 4.6, reviews: null, badge: null, sku: 'CJYD153761701AZ',
    variants: [
      { label: 'AC2000', usd: 4.56, ship: 7.71 }, { label: 'AC3000', usd: 4.91, ship: 7.71 },
      { label: 'AC4000', usd: 5.25, ship: 7.71 }, { label: 'AC5000', usd: 5.53, ship: 7.71 },
      { label: 'AC6000', usd: 5.87, ship: 7.71 }, { label: 'AC7000', usd: 6.21, ship: 7.71 }
    ],
    photos: ['205-1.jpg','205-2.jpg','205-3.jpg','205-4.jpg','205-5.jpg'],
    name: { fr: 'Moulinet spinning métal (AC2000 à AC7000)', en: 'Metal Spinning Reel (AC2000 to AC7000)', es: 'Carrete spinning metal (AC2000 a AC7000)' },
    desc: { fr: 'Corps métal, récup douce, 6 tailles.', en: 'Metal body, smooth retrieve, 6 sizes.', es: 'Cuerpo metal, recogida suave, 6 tallas.' },
    long: {
      fr: "Moulinet spinning à corps métal, robuste et fluide, pour les cannes télescopiques et le lancer. Récupération douce, frein avant progressif et bobine pré-équipée. Disponible en 6 tailles, de l'AC2000 (pêche fine) à l'AC7000 (mer, gros poissons) : choisis la puissance adaptée à ta pêche. Excellent rapport qualité-prix.",
      en: "Metal-body spinning reel, sturdy and smooth, for telescopic rods and casting. Smooth retrieve, progressive front drag and pre-spooled. Available in 6 sizes, from AC2000 (finesse) to AC7000 (sea, big fish): pick the power that fits your fishing. Great value for money.",
      es: "Carrete spinning con cuerpo de metal, robusto y suave, para cañas telescópicas y lanzado. Recogida suave, freno delantero progresivo y bobina pre-equipada. Disponible en 6 tallas, del AC2000 (pesca fina) al AC7000 (mar, peces grandes): elige la potencia adecuada a tu pesca. Excelente relación calidad-precio." }
  },
  {
    id: 'cj-206', category: 'gear', usd: 0.78, ship: 6.32, rating: 4.5, reviews: null, badge: null, sku: 'CJDY109223119SH',
    photos: ['206-1.jpg','206-2.jpg','206-3.jpg','206-4.jpg','206-5.jpg'],
    name: { fr: 'Fil nylon enduit fluoro (300 / 500 m)', en: 'Fluoro-coated Nylon Line (300 / 500 m)', es: 'Hilo nailon fluoro (300 / 500 m)' },
    desc: { fr: 'Solide et discret, nombreux diamètres.', en: 'Strong and discreet, many diameters.', es: 'Resistente y discreto, muchos diámetros.' },
    long: {
      fr: "Fil nylon à revêtement fluorocarbone en grande bobine (300 ou 500 m). Souple pour de bons lancers, résistant et discret dans l'eau pour ne pas alerter le poisson. Bonne tenue au nœud. Disponible dans de nombreux diamètres (0,4 à 8,0) et longueurs. Polyvalent en corps de ligne pour la mer et le gros poisson.",
      en: "Fluorocarbon-coated nylon line on a large spool (300 or 500 m). Supple for good casts, strong and discreet in the water so it won't spook fish. Good knot strength. Available in many diameters (0.4 to 8.0) and lengths. Versatile as a main line for the sea and big fish.",
      es: "Hilo de nailon con recubrimiento de fluorocarbono en bobina grande (300 o 500 m). Flexible para buenos lanzados, resistente y discreto en el agua para no alertar al pez. Buena resistencia al nudo. Disponible en muchos diámetros (0,4 a 8,0) y longitudes. Versátil como línea madre para el mar y peces grandes." }
  },
  {
    id: 'cj-207', category: 'rods', rating: 4.5, reviews: null, badge: null, sku: 'CJDY165866904DW',
    variants: [
      { label: '30 cm', usd: 3.10, ship: 6.97 }, { label: '40 cm', usd: 3.43, ship: 6.97 },
      { label: '50 cm', usd: 3.60, ship: 6.97 }, { label: '60 cm', usd: 3.76, ship: 6.97 }
    ],
    photos: ['207-1.jpg','207-2.jpg','207-3.jpg','207-4.jpg','207-5.jpg'],
    name: { fr: 'Canne à glace courte (bois, 30 à 60 cm)', en: 'Short Ice Fishing Rod (wood, 30 to 60 cm)', es: 'Caña corta de hielo (madera, 30 a 60 cm)' },
    desc: { fr: 'Mini canne pour la pêche sous la glace.', en: 'Mini rod for under-ice fishing.', es: 'Mini caña para la pesca bajo el hielo.' },
    long: {
      fr: "Petite canne à glace au manche en bois confortable, sensible pour détecter les touches les plus discrètes sous la glace. Légère et maniable au-dessus du trou, anneaux résistants au froid. Disponible en plusieurs longueurs (30 à 60 cm) selon ta technique. Parfaite pour la perche, la truite et le doré l'hiver.",
      en: "Small ice fishing rod with a comfortable wooden handle, sensitive enough to detect the subtlest bites under the ice. Light and easy to handle over the hole, cold-resistant guides. Available in several lengths (30 to 60 cm) to match your technique. Perfect for perch, trout and walleye in winter.",
      es: "Pequeña caña de hielo con mango de madera cómodo, sensible para detectar las picadas más discretas bajo el hielo. Ligera y manejable sobre el agujero, anillas resistentes al frío. Disponible en varias longitudes (30 a 60 cm) según tu técnica. Perfecta para perca, trucha y lucioperca en invierno." }
  },
  {
    id: 'cj-208', category: 'gear', usd: 3.92, ship: 6.99, rating: 4.6, reviews: null, badge: null, sku: 'CJDY176523302BY',
    photos: ['208-1.jpg','208-2.jpg','208-3.jpg','208-4.jpg','208-5.jpg'],
    name: { fr: 'Pince de pêche multifonction X45D', en: 'Multi-function Fishing Pliers X45D', es: 'Alicate de pesca multifunción X45D' },
    desc: { fr: 'Coupe-fil, dégorge, sertit — tout-en-un.', en: 'Cuts line, unhooks, crimps — all-in-one.', es: 'Corta hilo, desanzuela, engarza — todo en uno.' },
    long: {
      fr: "Pince de pêche multifonction robuste : becs fins pour décrocher l'hameçon, coupe-fil tranchant (tresse et nylon), encoches pour sertir les sleeves et fendre les anneaux brisés. Manches caoutchoutés antidérapants, ressort de rappel. Résistante à la corrosion marine. L'outil à toujours avoir dans le gilet ou la boîte.",
      en: "Sturdy multi-function fishing pliers: fine jaws to unhook fish, sharp cutter (braid and mono), notches to crimp sleeves and open split rings. Non-slip rubber handles, return spring. Resistant to marine corrosion. The tool to always keep in your vest or tackle box.",
      es: "Alicate de pesca multifunción resistente: puntas finas para desanzuelar, corta-hilo afilado (trenzado y nailon), muescas para engarzar casquillos y abrir anillas partidas. Mangos de goma antideslizantes, muelle de retorno. Resistente a la corrosión marina. La herramienta que siempre hay que llevar en el chaleco o la caja." }
  },
  {
    id: 'cj-209', category: 'reels', rating: 4.6, reviews: null, badge: null, sku: 'CJYD201751601AZ',
    variants: [
      { label: '2000', usd: 13.42, ship: 8.37 }, { label: '3000', usd: 13.42, ship: 8.37 },
      { label: '4000', usd: 13.42, ship: 8.37 }, { label: '5000', usd: 13.42, ship: 8.37 }
    ],
    photos: ['209-1.jpg','209-2.jpg','209-3.jpg','209-4.jpg','209-5.jpg'],
    name: { fr: 'Moulinet spinning tout métal (2000 à 5000)', en: 'All-Metal Spinning Reel (2000 to 5000)', es: 'Carrete spinning todo metal (2000 a 5000)' },
    desc: { fr: 'Corps métal solide, récupération fluide.', en: 'Solid metal body, smooth retrieve.', es: 'Cuerpo de metal sólido, recogida fluida.' },
    long: {
      fr: "Moulinet spinning tout métal, solide et fluide, pour la pêche aux leurres et au posé en eau douce comme en mer. Plusieurs roulements pour une récupération douce, frein avant progressif et puissant, bobine pré-équipée. Disponible en 4 tailles (2000 à 5000) selon la puissance recherchée. Robuste et fiable dans la durée.",
      en: "All-metal spinning reel, solid and smooth, for lure and bait fishing in fresh or salt water. Several bearings for a smooth retrieve, powerful progressive front drag, pre-spooled. Available in 4 sizes (2000 to 5000) depending on the power you need. Sturdy and reliable over time.",
      es: "Carrete spinning todo metal, sólido y fluido, para la pesca con señuelos y al fondo en agua dulce o mar. Varios rodamientos para una recogida suave, freno delantero progresivo y potente, bobina pre-equipada. Disponible en 4 tallas (2000 a 5000) según la potencia buscada. Robusto y fiable con el tiempo." }
  },
  {
    id: 'cj-210', category: 'gear', usd: 0.75, ship: 7.80, rating: 4.4, reviews: null, badge: null, sku: 'CJYD155659501AZ',
    photos: ['210-1.jpg','210-2.jpg','210-3.jpg','210-4.jpg','210-5.jpg'],
    name: { fr: 'Spray attractant à poisson (30 ml)', en: 'Fish Attractant Spray (30 ml)', es: 'Spray atrayente de peces (30 ml)' },
    desc: { fr: 'Booste l’attractivité des leurres et appâts.', en: 'Boosts lure and bait attractiveness.', es: 'Potencia el atractivo de señuelos y cebos.' },
    long: {
      fr: "Spray attractant à pulvériser sur tes leurres et appâts : il libère un nuage d'odeur qui stimule le poisson et le fait mordre plus longtemps. Efficace sur de nombreuses espèces, en eau douce comme en mer. Flacon pratique de 30 ml. Disponible en plusieurs formules/formats.",
      en: "Attractant spray to apply on your lures and baits: it releases a scent cloud that stimulates fish and makes them hold on longer. Effective on many species, in fresh or salt water. Handy 30 ml bottle. Available in several formulas/sizes.",
      es: "Spray atrayente para rociar sobre tus señuelos y cebos: libera una nube de olor que estimula al pez y le hace morder más tiempo. Eficaz en muchas especies, en agua dulce o mar. Práctico frasco de 30 ml. Disponible en varias fórmulas/formatos." }
  },
  {
    id: 'cj-211', category: 'gear', usd: 5.34, ship: 13.46, rating: 4.6, reviews: null, badge: null, sku: 'CJYD1944241',
    photos: ['211-1.jpg','211-2.jpg','211-3.jpg','211-4.jpg','211-5.jpg'],
    name: { fr: 'Sac fourreau cylindrique à cannes (bandoulière)', en: 'Cylindrical Rod Bag (shoulder strap)', es: 'Bolsa cilíndrica para cañas (bandolera)' },
    desc: { fr: 'Transporte cannes montées + matériel.', en: 'Carries rigged rods + gear.', es: 'Transporta cañas montadas + equipo.' },
    long: {
      fr: "Sac-fourreau cylindrique pour transporter tes cannes, même montées avec le moulinet, et ton matériel. Poches latérales pour les accessoires, intérieur rembourré qui protège les blanks et bandoulière réglable. Tissu robuste et déperlant. Idéal pour partir au bord de l'eau avec tout dans un seul sac.",
      en: "Cylindrical rod bag to carry your rods, even rigged with the reel, and your gear. Side pockets for accessories, padded interior that protects the blanks and an adjustable shoulder strap. Sturdy, water-repellent fabric. Ideal to head to the water with everything in one bag.",
      es: "Bolsa-funda cilíndrica para transportar tus cañas, incluso montadas con el carrete, y tu equipo. Bolsillos laterales para accesorios, interior acolchado que protege los blanks y bandolera ajustable. Tejido robusto y repelente al agua. Ideal para ir a la orilla con todo en una sola bolsa." }
  },
  {
    id: 'cj-212', category: 'gear', rating: 4.5, reviews: null, badge: null, sku: 'CJDY184328804DW',
    variants: [
      { label: '1 pièce', usd: 1.19, ship: 5.20 }, { label: '2 pièces', usd: 2.10, ship: 5.20 },
      { label: '4 pièces', usd: 4.00, ship: 5.20 }
    ],
    photos: ['212-1.jpg','212-2.jpg','212-3.jpg','212-4.jpg','212-5.jpg'],
    name: { fr: 'Agrafes de largage (release clips)', en: 'Line Release Clips', es: 'Clips de suelta (release)' },
    desc: { fr: 'Largue la ligne à la touche, traîne/downrigger.', en: 'Releases the line on a bite, trolling/downrigger.', es: 'Suelta la línea en la picada, curricán/downrigger.' },
    long: {
      fr: "Agrafes de largage (release clips) pour la pêche à la traîne et au downrigger : la ligne est pincée pendant la traîne, puis se libère d'un coup à la touche pour ferrer directement avec la canne. Tension réglable, plastique résistant. Vendu par lot (1, 2 ou 4 pièces). Indispensable pour traîner plusieurs lignes proprement.",
      en: "Line release clips for trolling and downrigger fishing: the line is held while trolling, then snaps free on a bite so you fight directly with the rod. Adjustable tension, tough plastic. Sold in packs (1, 2 or 4 pieces). Essential to troll several lines cleanly.",
      es: "Clips de suelta (release) para la pesca al curricán y con downrigger: la línea queda sujeta durante el arrastre y se libera de golpe en la picada para clavar directamente con la caña. Tensión ajustable, plástico resistente. Vendido en lotes (1, 2 o 4 piezas). Imprescindible para arrastrar varias líneas limpiamente." }
  },
  {
    id: 'cj-213', category: 'lures', rating: 4.6, reviews: null, badge: null, sku: 'CJYE121976528BY',
    variants: [
      { label: '90 g', usd: 5.58, ship: 6.17 }, { label: '120 g', usd: 5.79, ship: 6.17 },
      { label: '140 g', usd: 5.79, ship: 6.17 }
    ],
    photos: ['213-1.jpg','213-2.jpg','213-3.jpg','213-4.jpg','213-5.jpg'],
    name: { fr: 'Stickbait bois fait main (90 à 140 g, mer)', en: 'Handmade Wood Pencil Lure (90 to 140 g)', es: 'Stickbait de madera artesanal (90 a 140 g)' },
    desc: { fr: 'Gros leurre mer en bois, lance très loin.', en: 'Big wooden sea lure, casts very far.', es: 'Gran señuelo de mar en madera, lanza muy lejos.' },
    long: {
      fr: "Gros stickbait en bois fabriqué à la main pour la pêche au gros en mer (thon, sériole, bonite, carangue). Dense et lourd (90 à 140 g), il se lance très loin et nage en surface ou juste dessous selon l'animation. Finition réaliste effet écaille et hameçons triples forts. Disponible en plusieurs poids et coloris.",
      en: "Big handmade wooden stickbait for big-game sea fishing (tuna, amberjack, bonito, trevally). Dense and heavy (90 to 140 g), it casts very far and swims on or just under the surface depending on the action. Realistic scale finish and strong treble hooks. Available in several weights and colours.",
      es: "Gran stickbait de madera hecho a mano para la pesca de altura en mar (atún, medregal, bonito, jurel). Denso y pesado (90 a 140 g), se lanza muy lejos y nada en superficie o justo debajo según la animación. Acabado realista efecto escama y anzuelos triples fuertes. Disponible en varios pesos y colores." }
  },
  {
    id: 'cj-215', category: 'gear', usd: 1.36, ship: 6.04, rating: 4.4, reviews: null, badge: null, sku: 'CJYE258236401AZ',
    photos: ['215-1.jpg'],
    name: { fr: 'Attractant de pêche Kriath (60 ml)', en: 'Kriath Fishing Attractant (60 ml)', es: 'Atrayente de pesca Kriath (60 ml)' },
    desc: { fr: 'Liquide concentré, tous poissons.', en: 'Concentrated liquid, all fish.', es: 'Líquido concentrado, todos los peces.' },
    long: {
      fr: "Attractant de pêche liquide concentré « Kriath », à appliquer sur tes leurres, appâts ou amorces. Il diffuse une odeur puissante qui attire le poisson et prolonge les touches. Polyvalent (carpe, carnassiers, poissons de mer). Flacon de 60 ml facile à doser. Un coup de pouce simple pour améliorer tes prises.",
      en: "Concentrated liquid fishing attractant 'Kriath', to apply on your lures, baits or groundbait. It releases a powerful scent that draws fish and prolongs the bites. Versatile (carp, predators, sea fish). Easy-to-dose 60 ml bottle. A simple boost to improve your catches.",
      es: "Atrayente de pesca líquido concentrado «Kriath», para aplicar en tus señuelos, cebos o engodos. Difunde un olor potente que atrae al pez y prolonga las picadas. Versátil (carpa, depredadores, peces de mar). Frasco de 60 ml fácil de dosificar. Un empujón simple para mejorar tus capturas." }
  },
  {
    id: 'cj-217', category: 'gear', usd: 5.34, ship: 7.13, rating: 4.6, reviews: null, badge: null, sku: 'CJYE112273801AZ',
    photos: ['217-1.jpg','217-2.jpg','217-3.jpg','217-4.jpg','217-5.jpg'],
    name: { fr: 'Coffret accessoires carpe 277 pièces', en: 'Carp Terminal Tackle Kit (277 pcs)', es: 'Kit accesorios carpa 277 piezas' },
    desc: { fr: 'Tout le montage carpe dans une boîte.', en: 'All your carp rigging in one box.', es: 'Todo el montaje de carpa en una caja.' },
    long: {
      fr: "Coffret complet de 277 pièces pour la pêche de la carpe à l'européenne : émerillons, agrafes, perles, stop-floats, plombs, gaines anti-emmêlement, tubes, aiguilles et plus. Tout est trié dans une boîte compartimentée pour monter tes lignes au bord de l'eau sans rien oublier. Idéal pour débuter ou compléter ton matériel.",
      en: "Complete 277-piece kit for European-style carp fishing: swivels, clips, beads, float stops, sinkers, anti-tangle sleeves, tubing, needles and more. Everything is sorted in a compartment box so you can rig your lines at the water's edge without forgetting anything. Ideal to start out or round out your gear.",
      es: "Kit completo de 277 piezas para la pesca de carpa al estilo europeo: emerillones, grapas, perlas, topes, plomos, fundas anti-enredos, tubos, agujas y más. Todo ordenado en una caja con compartimentos para montar tus líneas a la orilla sin olvidar nada. Ideal para empezar o completar tu equipo." }
  },
  {
    id: 'cj-218', category: 'gear', usd: 2.44, ship: 5.57, rating: 4.5, reviews: null, badge: null, sku: 'CJDY272858112LO',
    photos: ['218-1.jpg','218-2.jpg','218-3.jpg','218-4.jpg','218-5.jpg'],
    name: { fr: 'Tresse PE multibrins 300 m', en: 'PE Braided Line 300 m', es: 'Trenzado PE 300 m' },
    desc: { fr: 'Solide, fine, sans élasticité.', en: 'Strong, thin, no stretch.', es: 'Resistente, fina, sin elasticidad.' },
    long: {
      fr: "Tresse PE multibrins de 300 m, très résistante et fine pour des lancers longs et une sensibilité maximale. Aucune élasticité : tu sens la moindre touche et le contact avec le fond ou le leurre. Idéale au lancer de leurres, au jig et pour la carpe. Disponible en plusieurs diamètres (numéros) et coloris.",
      en: "300 m multi-strand PE braid, very strong and thin for long casts and maximum sensitivity. No stretch: you feel the slightest bite and the contact with the bottom or lure. Ideal for lure casting, jigging and carp. Available in several diameters (numbers) and colours.",
      es: "Trenzado PE multifilamento de 300 m, muy resistente y fino para lanzados largos y máxima sensibilidad. Sin elasticidad: sientes la mínima picada y el contacto con el fondo o el señuelo. Ideal para lanzar señuelos, jigging y carpa. Disponible en varios diámetros (números) y colores." }
  },
  {
    id: 'cj-219', category: 'rods', usd: 18.82, ship: 7.64, rating: 4.5, reviews: null, badge: null, sku: 'CJDY161210801AZ',
    photos: ['219-1.jpg','219-2.jpg','219-3.jpg','219-4.jpg','219-5.jpg'],
    name: { fr: 'Canne stylo + moulinet (ensemble compact)', en: 'Pen Rod + Reel Combo (compact)', es: 'Caña bolígrafo + carrete (compacto)' },
    desc: { fr: 'Kit nomade format stylo, prêt à pêcher.', en: 'Pocket-size travel kit, ready to fish.', es: 'Kit de viaje formato bolígrafo, listo para pescar.' },
    long: {
      fr: "Ensemble de pêche compact façon « stylo » : canne télescopique, petit moulinet et même un leurre, le tout très court une fois replié pour tenir dans un sac ou une poche. Idéal en voyage, en randonnée, pour la glace ou comme cadeau original. Léger mais suffisant pour taquiner perche, truite et petits carnassiers.",
      en: "Compact 'pen-style' fishing set: telescopic rod, small reel and even a lure, all very short when folded to fit in a bag or pocket. Ideal for travel, hiking, ice fishing or as an original gift. Light but enough to tease perch, trout and small predators.",
      es: "Equipo de pesca compacto tipo «bolígrafo»: caña telescópica, pequeño carrete e incluso un señuelo, todo muy corto al plegarse para caber en una bolsa o bolsillo. Ideal para viajar, hacer senderismo, pesca en hielo o como regalo original. Ligero pero suficiente para perca, trucha y pequeños depredadores." }
  },
  {
    id: 'cj-220', category: 'lures', rating: 4.7, reviews: null, badge: 'new', sku: 'CJYD218783802BY',
    variants: [
      { label: 'Coffret 24 pièces', usd: 7.25, ship: 10.95 },
      { label: 'Modèle 03', usd: 6.38, ship: 10.95 }
    ],
    photos: ['220-1.jpg','220-2.jpg','220-3.jpg','220-4.jpg','220-5.jpg'],
    name: { fr: 'Coffret cadeau de Noël pêche (calendrier 24 leurres)', en: 'Christmas Fishing Gift Box (24-piece advent)', es: 'Caja regalo de Navidad pesca (24 piezas)' },
    desc: { fr: 'Calendrier de l’avent : 24 surprises pêche.', en: 'Advent calendar: 24 fishing surprises.', es: 'Calendario de adviento: 24 sorpresas de pesca.' },
    long: {
      fr: "Coffret cadeau type calendrier de l'avent pour les passionnés de pêche : 24 cases à ouvrir une par une contenant leurres, accessoires et petites surprises. Présentation festive « Merry Christmas » prête à offrir, parfaite pour Noël ou un anniversaire. Disponible en coffret 24 pièces ou en version « Modèle 03 ».",
      en: "Advent-calendar-style gift box for fishing lovers: 24 windows to open one by one with lures, accessories and little surprises. Festive 'Merry Christmas' presentation ready to give, perfect for Christmas or a birthday. Available as a 24-piece set or a 'Model 03' version.",
      es: "Caja regalo tipo calendario de adviento para los apasionados de la pesca: 24 casillas para abrir una a una con señuelos, accesorios y pequeñas sorpresas. Presentación festiva «Merry Christmas» lista para regalar, perfecta para Navidad o un cumpleaños. Disponible en set de 24 piezas o versión «Modelo 03»." }
  },
  {
    id: 'cj-221', category: 'gear', usd: 0.21, ship: 5.20, rating: 4.5, reviews: null, badge: null, sku: 'CJYE174315205EV',
    photos: ['221-1.jpg','221-2.jpg','221-3.jpg','221-4.jpg','221-5.jpg'],
    name: { fr: 'Plombs ronds (cheburashka, 2 à 18 g)', en: 'Round Sinkers (cheburashka, 2 to 18 g)', es: 'Plomos redondos (cheburashka, 2 a 18 g)' },
    desc: { fr: 'Plombs à œillet, montage interchangeable.', en: 'Eyed sinkers, swappable rig.', es: 'Plomos con anilla, montaje intercambiable.' },
    long: {
      fr: "Plombs ronds type « cheburashka » à double œillet : ils se clipsent entre le leurre souple et l'hameçon pour un montage articulé qu'on change en quelques secondes sans recouper la ligne. Forme ronde qui glisse sur le fond et limite les accrocs. Disponibles dans de nombreux grammages (2 à 18 g) selon la profondeur et le courant.",
      en: "Round 'cheburashka' sinkers with a double eye: they clip between the soft bait and the hook for an articulated rig you can swap in seconds without recutting the line. Round shape that slides over the bottom and limits snags. Available in many weights (2 to 18 g) to match depth and current.",
      es: "Plomos redondos tipo «cheburashka» con doble anilla: se enganchan entre el vinilo y el anzuelo para un montaje articulado que se cambia en segundos sin recortar la línea. Forma redonda que se desliza por el fondo y limita los enganches. Disponibles en muchos gramajes (2 a 18 g) según la profundidad y la corriente." }
  },
  {
    id: 'cj-222', category: 'gear', usd: 16.02, ship: 0, rating: 4.7, reviews: null, badge: 'best', sku: 'CJYE29492970001',
    photos: ['222-1.jpg','222-2.jpg','222-3.jpg','222-4.jpg','222-5.jpg'],
    name: { fr: 'Coffret carpe 328 pièces (expédié USA)', en: '328-Piece Carp Tackle Kit (US warehouse)', es: 'Kit carpa 328 piezas (USA)' },
    desc: { fr: 'Montage carpe complet, port offert (USA).', en: 'Complete carp rigging, free shipping (US).', es: 'Montaje completo de carpa, envío gratis (USA).' },
    long: {
      fr: "Coffret très complet de 328 pièces pour la pêche moderne de la carpe : émerillons, agrafes, perles, stop-floats, plombs, gaines, tubes anti-emmêlement, aiguilles à bouillette et plus. Tout est trié dans une boîte compartimentée. Expédié depuis un entrepôt aux États-Unis : livraison rapide et offerte ! Idéal pour s'équiper d'un coup.",
      en: "Very complete 328-piece kit for modern carp fishing: swivels, clips, beads, float stops, sinkers, sleeves, anti-tangle tubing, boilie needles and more. Everything sorted in a compartment box. Shipped from a US warehouse: fast and free delivery! Ideal to gear up in one go.",
      es: "Kit muy completo de 328 piezas para la pesca moderna de carpa: emerillones, grapas, perlas, topes, plomos, fundas, tubos anti-enredos, agujas para boilies y más. Todo ordenado en una caja con compartimentos. Enviado desde un almacén en EE. UU.: ¡entrega rápida y gratis! Ideal para equiparte de golpe." }
  },
  {
    id: 'cj-223', category: 'lures', usd: 0.91, ship: 5.35, rating: 4.5, reviews: null, badge: null, sku: 'CJYE124717303CX',
    photos: ['223-1.jpg','223-2.jpg','223-3.jpg','223-4.jpg','223-5.jpg'],
    name: { fr: 'Leurre « avion » pour la traîne', en: 'Aircraft Trolling Lure', es: 'Señuelo «avión» para curricán' },
    desc: { fr: 'Plonge et nage stable à la traîne.', en: 'Dives and tracks stably when trolled.', es: 'Bucea y nada estable al curricán.' },
    long: {
      fr: "Leurre plongeant en forme d'« avion » (diving planer) pour la pêche à la traîne : tracté derrière le bateau, ses ailes le font descendre en profondeur et garder une nage stable, idéal pour présenter un autre leurre ou une cuiller en aval. Robuste et simple d'emploi. Disponible en plusieurs coloris.",
      en: "Aircraft-shaped diving lure (diving planer) for trolling: pulled behind the boat, its wings take it down deep and keep a stable track, ideal to present another lure or spoon behind it. Sturdy and simple to use. Available in several colours.",
      es: "Señuelo buceador en forma de «avión» (diving planer) para la pesca al curricán: remolcado tras el barco, sus alas lo hacen bajar en profundidad y mantener un nado estable, ideal para presentar otro señuelo o cucharilla detrás. Robusto y sencillo de usar. Disponible en varios colores." }
  },
  {
    id: 'cj-224', category: 'lures', usd: 2.70, ship: 5.20, rating: 4.5, reviews: null, badge: null, sku: 'CJYE134759903CX',
    photos: ['224-1.jpg','224-2.jpg','224-3.jpg','224-4.jpg','224-5.jpg'],
    name: { fr: 'Leurre souple silicone bionique', en: 'Bionic Silicone Soft Bait', es: 'Señuelo blando de silicona biónico' },
    desc: { fr: 'Souple et réaliste, nage naturelle.', en: 'Soft and realistic, natural action.', es: 'Blando y realista, nado natural.' },
    long: {
      fr: "Leurre souple en silicone au profil bionique très réaliste : sa matière souple et sa nage naturelle imitent une proie vivante et déclenchent les carnassiers méfiants (brochet, sandre, perche, bar). À monter sur tête plombée ou hameçon texan. Résistant aux dents. Disponible en plusieurs coloris.",
      en: "Soft silicone lure with a very realistic bionic profile: its soft material and natural action imitate live prey and trigger wary predators (pike, zander, perch, bass). Rig it on a jig head or a Texas hook. Tear-resistant. Available in several colours.",
      es: "Señuelo blando de silicona con perfil biónico muy realista: su material flexible y su nado natural imitan a una presa viva y provocan a los depredadores desconfiados (lucio, lucioperca, perca, lubina). Para montar en cabeza plomada o anzuelo texas. Resistente a los dientes. Disponible en varios colores." }
  },
  {
    id: 'cj-225', category: 'gear', usd: 0.66, ship: 5.20, rating: 4.5, reviews: null, badge: null, sku: 'CJDY193119402BY',
    photos: ['225-1.jpg','225-2.jpg','225-3.jpg','225-4.jpg','225-5.jpg'],
    name: { fr: 'Amorçoir à ressort (feeder carpe)', en: 'Spring Feeder / Method Coil (carp)', es: 'Cebador de muelle (carpa)' },
    desc: { fr: 'Retient l’amorce près de l’hameçon.', en: 'Holds groundbait near the hook.', es: 'Retiene el cebo cerca del anzuelo.' },
    long: {
      fr: "Amorçoir à ressort (feeder) pour la pêche de la carpe et des poissons blancs : tu garnis la spirale d'amorce ou de pâte, qui se libère lentement au fond et concentre le poisson autour de ton hameçon. Tige métallique et émerillon anti-vrillage. Léger et facile à recharger. Idéal en method feeder.",
      en: "Spring feeder for carp and silver fish: pack the coil with groundbait or paste, which releases slowly on the bottom and gathers fish around your hook. Metal stem and anti-twist swivel. Light and easy to refill. Ideal for method feeder fishing.",
      es: "Cebador de muelle (feeder) para la pesca de carpa y peces blancos: rellenas la espiral con engodo o pasta, que se libera lentamente en el fondo y concentra al pez alrededor de tu anzuelo. Varilla metálica y emerillón anti-torsión. Ligero y fácil de recargar. Ideal en method feeder." }
  },
  {
    id: 'cj-226', category: 'lures', usd: 3.70, ship: 5.20, rating: 4.6, reviews: null, badge: null, sku: 'CJYE176445901AZ',
    photos: ['226-1.jpg','226-2.jpg','226-3.jpg','226-4.jpg','226-5.jpg'],
    name: { fr: 'Leurre coulant lumineux longue distance', en: 'Luminous Long-Cast Sinking Lure', es: 'Señuelo hundido luminoso largo alcance' },
    desc: { fr: 'Brille dans le noir, lance loin, 10 motifs.', en: 'Glows in the dark, casts far, 10 patterns.', es: 'Brilla en la oscuridad, lanza lejos, 10 motivos.' },
    long: {
      fr: "Leurre coulant à effet lumineux (phosphorescent + UV) pour la pêche en mer du bord et la nuit. Dense, il se lance très loin et descend dans la couche d'eau ; son corps brille dans le noir pour attirer le poisson même en eau sombre. Hameçons triples. Disponible en 10 motifs/coloris très pêchants.",
      en: "Sinking lure with a luminous effect (glow + UV) for shore and night sea fishing. Dense, it casts very far and drops through the water column; its body glows in the dark to draw fish even in dark water. Treble hooks. Available in 10 very effective patterns/colours.",
      es: "Señuelo hundido con efecto luminoso (fosforescente + UV) para la pesca en mar desde costa y de noche. Denso, se lanza muy lejos y baja por la capa de agua; su cuerpo brilla en la oscuridad para atraer al pez incluso en agua oscura. Anzuelos triples. Disponible en 10 motivos/colores muy efectivos." }
  },
  {
    id: 'cj-228', category: 'reels', rating: 4.6, reviews: null, badge: null, sku: 'CJDY111366801AZ',
    variants: [
      { label: '1000', usd: 6.30, ship: 9.15 }, { label: '2000', usd: 6.67, ship: 9.15 },
      { label: '3000', usd: 7.04, ship: 9.15 }, { label: '4000', usd: 7.41, ship: 9.15 },
      { label: '5000', usd: 7.78, ship: 9.15 }, { label: '6000', usd: 8.15, ship: 9.15 },
      { label: '7000', usd: 8.52, ship: 9.15 }
    ],
    photos: ['228-1.jpg','228-2.jpg','228-3.jpg','228-4.jpg','228-5.jpg'],
    name: { fr: 'Moulinet spinning tête métal (1000 à 7000)', en: 'Metal-Head Spinning Reel (1000 to 7000)', es: 'Carrete spinning cabeza metal (1000 a 7000)' },
    desc: { fr: 'Robuste, fluide, 7 tailles douce/mer.', en: 'Sturdy, smooth, 7 sizes fresh/salt.', es: 'Robusto, fluido, 7 tallas dulce/mar.' },
    long: {
      fr: "Moulinet spinning à tête et manivelle métal, robuste et fluide, pour la pêche aux leurres et au posé en eau douce comme en mer. Récupération douce sur roulements, frein avant progressif et bobine pré-équipée. Décliné en 7 tailles (1000 à 7000) : choisis la puissance adaptée, de la pêche fine au gros poisson de mer.",
      en: "Spinning reel with a metal head and handle, sturdy and smooth, for lure and bait fishing in fresh or salt water. Smooth retrieve on bearings, progressive front drag and pre-spooled. Available in 7 sizes (1000 to 7000): pick the power you need, from finesse to big sea fish.",
      es: "Carrete spinning con cabeza y manivela de metal, robusto y fluido, para la pesca con señuelos y al fondo en agua dulce o mar. Recogida suave sobre rodamientos, freno delantero progresivo y bobina pre-equipada. Disponible en 7 tallas (1000 a 7000): elige la potencia adecuada, de la pesca fina al gran pez de mar." }
  },
  {
    id: 'cj-230', category: 'gear', usd: 0.73, ship: 5.28, rating: 4.5, reviews: null, badge: null, sku: 'CJDY107831501AZ',
    photos: ['230-1.jpg','230-2.jpg','230-3.jpg','230-4.jpg','230-5.jpg'],
    name: { fr: 'Capuchon caoutchouc de protection (talon de canne)', en: 'Rubber Rod Butt Protective Cap', es: 'Capuchón de goma protector (talón de caña)' },
    desc: { fr: 'Protège le talon, antidérapant.', en: 'Protects the butt, non-slip.', es: 'Protege el talón, antideslizante.' },
    long: {
      fr: "Capuchon en caoutchouc à enfiler sur le talon (bas) de ta canne pour le protéger des chocs, de l'usure et de la corrosion, et éviter qu'il glisse sur le sol ou dans le porte-canne. Souple et résistant, il s'adapte aux tubes d'environ 50 mm de diamètre. Petit accessoire bien pratique pour préserver ton matériel.",
      en: "Rubber cap to slip over the butt (bottom) of your rod to protect it from knocks, wear and corrosion, and stop it slipping on the ground or in the rod holder. Flexible and tough, it fits tubes around 50 mm in diameter. A handy little accessory to look after your gear.",
      es: "Capuchón de goma para colocar en el talón (parte baja) de tu caña y protegerlo de golpes, desgaste y corrosión, y evitar que resbale en el suelo o en el portacañas. Flexible y resistente, se adapta a tubos de unos 50 mm de diámetro. Un pequeño accesorio muy práctico para cuidar tu equipo." }
  },
  {
    id: 'cj-231', category: 'reels', rating: 4.7, reviews: null, badge: null, sku: 'CJDY106033001AZ',
    variants: [
      { label: 'SG1000', usd: 28.36, ship: 12.07 }, { label: 'SG2000', usd: 29.93, ship: 12.07 },
      { label: 'SG3000', usd: 31.51, ship: 12.07 }, { label: 'SG4000', usd: 33.08, ship: 12.07 }
    ],
    photos: ['231-1.jpg','231-2.jpg','231-3.jpg','231-4.jpg','231-5.jpg'],
    name: { fr: 'Moulinet spinning mer tout métal (SG1000-4000)', en: 'All-Metal Sea Spinning Reel (SG1000-4000)', es: 'Carrete spinning mar todo metal (SG1000-4000)' },
    desc: { fr: 'Corps métal, roulements inox, finition colorée.', en: 'Metal body, stainless bearings, colourful finish.', es: 'Cuerpo metal, rodamientos inox, acabado colorido.' },
    long: {
      fr: "Moulinet spinning de mer entièrement métallique avec roulements en acier inoxydable pour une récupération douce et durable face à l'eau salée. Frein avant puissant, rotor équilibré et finition anodisée colorée du plus bel effet. Disponible en 4 tailles (SG1000 à SG4000) selon la puissance recherchée. Solide pour la pêche aux leurres en mer.",
      en: "All-metal sea spinning reel with stainless-steel bearings for a smooth, long-lasting retrieve against salt water. Powerful front drag, balanced rotor and a striking colourful anodised finish. Available in 4 sizes (SG1000 to SG4000) depending on the power you need. Solid for lure fishing at sea.",
      es: "Carrete spinning de mar totalmente metálico con rodamientos de acero inoxidable para una recogida suave y duradera frente al agua salada. Freno delantero potente, rotor equilibrado y un vistoso acabado anodizado de colores. Disponible en 4 tallas (SG1000 a SG4000) según la potencia buscada. Sólido para la pesca con señuelos en mar." }
  },
  {
    id: 'cj-232', category: 'gear', usd: 0.40, ship: 6.02, rating: 4.5, reviews: null, badge: null, sku: 'CJDY111663101AZ',
    photos: ['232-1.jpg','232-2.jpg','232-3.jpg','232-4.jpg','232-5.jpg'],
    name: { fr: 'Hameçon automatique « Magic Hook »', en: 'Automatic Fishing Hook (Magic Hook)', es: 'Anzuelo automático «Magic Hook»' },
    desc: { fr: 'Se referme seul à la touche.', en: 'Snaps shut on the bite.', es: 'Se cierra solo en la picada.' },
    long: {
      fr: "Hameçon automatique « Magic Hook » à ressort : armé, il se referme tout seul dès que le poisson tire sur l'appât, ce qui ferre à ta place. Idéal pour la pêche au posé, quand tu surveilles plusieurs lignes ou que tu débutes. En acier inoxydable, réutilisable. Se monte facilement sur le bas de ligne. Vendu à l'unité.",
      en: "Spring-loaded 'Magic Hook' automatic hook: once set, it snaps shut as soon as the fish pulls on the bait, setting the hook for you. Ideal for ledgering, when watching several rods or when starting out. Stainless steel and reusable. Easy to rig on the leader. Sold individually.",
      es: "Anzuelo automático «Magic Hook» con resorte: una vez armado, se cierra solo en cuanto el pez tira del cebo, clavando por ti. Ideal para la pesca al fondo, al vigilar varias cañas o al empezar. En acero inoxidable, reutilizable. Fácil de montar en el bajo de línea. Vendido por unidad." }
  },
  {
    id: 'cj-233', category: 'lures', usd: 0.59, ship: 5.20, rating: 4.5, reviews: null, badge: null, sku: 'CJYE107522806FU',
    photos: ['233-1.jpg','233-2.jpg','233-3.jpg','233-4.jpg','233-5.jpg'],
    name: { fr: 'Mouche imitation larve / asticot (sur hameçon)', en: 'Maggot / Grub Imitation Fly', es: 'Mosca imitación larva / gusano' },
    desc: { fr: 'Appât artificiel réaliste, pêche fine.', en: 'Realistic artificial bait, finesse.', es: 'Cebo artificial realista, pesca fina.' },
    long: {
      fr: "Imitation ultra-réaliste d'asticot/larve montée sur hameçon, parfaite pour la truite, le gardon et la pêche fine à la mouche ou au toc. Sa forme et sa souplesse déclenchent les touches même chez les poissons méfiants, sans avoir à manipuler d'appâts vivants. Disponible en plusieurs tailles d'hameçon (10 à 20).",
      en: "Ultra-realistic maggot/grub imitation tied on a hook, perfect for trout, roach and finesse fly or trotting fishing. Its shape and softness trigger bites even from wary fish, with no live bait to handle. Available in several hook sizes (10 to 20).",
      es: "Imitación ultrarrealista de gusano/larva montada en anzuelo, perfecta para trucha, gobio y pesca fina con mosca o al toque. Su forma y flexibilidad provocan picadas incluso en peces desconfiados, sin manipular cebos vivos. Disponible en varias tallas de anzuelo (10 a 20)." }
  },
  {
    id: 'cj-234', category: 'gear', rating: 4.5, reviews: null, badge: null, sku: 'CJDY164363013MN',
    variants: [
      { label: 'À l’unité', usd: 1.40, ship: 6.72 },
      { label: 'Lot 3 pièces', usd: 5.72, ship: 6.72 }
    ],
    photos: ['234-1.jpg','234-2.jpg','234-3.jpg','234-4.jpg','234-5.jpg'],
    name: { fr: 'Ciseau à fil rétractable (zinger)', en: 'Retractable Line Scissors (zinger)', es: 'Tijera de hilo retráctil (zinger)' },
    desc: { fr: 'Coupe la tresse, revient tout seul.', en: 'Cuts braid, retracts by itself.', es: 'Corta el trenzado, se recoge solo.' },
    long: {
      fr: "Petit ciseau coupe-fil monté sur un enrouleur rétractable (zinger) à clipser sur ton gilet ou ta musette : tu tires, tu coupes la tresse ou le nylon, et le cordon le ramène tout seul. Lames inox tranchantes et mousqueton. Fini de chercher tes ciseaux au fond de la boîte. À l'unité ou en lot de 3.",
      en: "Small line-cutting scissors on a retractable reel (zinger) to clip on your vest or bag: pull it out, cut braid or mono, and the cord pulls it back by itself. Sharp stainless blades and a carabiner. No more digging for your scissors in the box. Sold singly or in a 3-pack.",
      es: "Pequeña tijera corta-hilo montada en un recogedor retráctil (zinger) para enganchar en tu chaleco o bolsa: tiras, cortas el trenzado o nailon, y el cordón la recoge sola. Cuchillas inox afiladas y mosquetón. Se acabó buscar las tijeras en la caja. Por unidad o en lote de 3." }
  },
  {
    id: 'cj-236', category: 'lures', usd: 6.44, ship: 6.10, rating: 4.6, reviews: null, badge: null, sku: 'CJYE1219856',
    photos: ['236-1.jpg','236-2.jpg','236-3.jpg','236-4.jpg','236-5.jpg'],
    name: { fr: 'Popper en bois 20,5 cm (mer)', en: 'Wooden Popper 20.5 cm (sea)', es: 'Popper de madera 20,5 cm (mar)' },
    desc: { fr: 'Gros popper de surface pour le gros poisson.', en: 'Big surface popper for big fish.', es: 'Gran popper de superficie para peces grandes.' },
    long: {
      fr: "Gros popper en bois de 20,5 cm fabriqué pour la pêche au gros en surface (thon, GT, sériole, gros bar). Sa bouche creuse projette de grandes gerbes d'eau et un « ploc » puissant qui provoque des attaques explosives. Bois dense verni, anneaux traversants et hameçons triples forts pour encaisser les grosses tractions. Disponible en plusieurs coloris.",
      en: "Big 20.5 cm wooden popper built for big-game topwater fishing (tuna, GT, amberjack, big bass). Its cupped mouth throws large sprays of water and a powerful 'ploc' that triggers explosive strikes. Dense varnished wood, through-wire construction and strong treble hooks to take big pulls. Available in several colours.",
      es: "Gran popper de madera de 20,5 cm fabricado para la pesca de altura en superficie (atún, GT, medregal, gran lubina). Su boca cóncava proyecta grandes chorros de agua y un «ploc» potente que provoca ataques explosivos. Madera densa barnizada, montaje pasante y anzuelos triples fuertes para aguantar grandes tracciones. Disponible en varios colores." }
  },
  {
    id: 'cj-237', category: 'reels', rating: 4.6, reviews: null, badge: null, sku: 'CJDY110078303CX',
    variants: [
      { label: 'AM2000', usd: 6.77, ship: 6.92 },
      { label: 'AM3000', usd: 8.65, ship: 6.92 }
    ],
    photos: ['237-1.jpg','237-2.jpg','237-3.jpg','237-4.jpg','237-5.jpg'],
    name: { fr: 'Moulinet casting rond (AM2000 / AM3000)', en: 'Round Baitcasting Reel (AM2000 / AM3000)', es: 'Carrete casting redondo (AM2000 / AM3000)' },
    desc: { fr: 'Casting puissant, gaucher ou droitier.', en: 'Powerful baitcaster, left or right hand.', es: 'Casting potente, zurdo o diestro.' },
    long: {
      fr: "Moulinet casting (baitcasting) rond et robuste pour le lancer de leurres lourds et le combat avec de beaux poissons. Frein réglable, récupération puissante et boutons confortables. Disponible en plusieurs tailles (AM2000 / AM3000) et en version main gauche ou main droite — à préciser à la commande. Idéal pour le brochet, le silure et la pêche en mer.",
      en: "Round, sturdy baitcasting reel for casting heavy lures and fighting good fish. Adjustable drag, powerful retrieve and comfortable knobs. Available in several sizes (AM2000 / AM3000) and in left- or right-hand versions — to specify at order. Ideal for pike, catfish and sea fishing.",
      es: "Carrete casting (baitcasting) redondo y robusto para lanzar señuelos pesados y pelear con buenos peces. Freno ajustable, recogida potente y pomos cómodos. Disponible en varias tallas (AM2000 / AM3000) y en versión zurda o diestra — a especificar al pedir. Ideal para lucio, siluro y pesca en mar." }
  },
  {
    id: 'cj-239', category: 'gear', rating: 4.5, reviews: null, badge: null, sku: 'CJYD191237402BY',
    variants: [
      { label: 'Roue à eau (drip)', usd: 2.28, ship: 6.62 },
      { label: 'Double usage', usd: 2.81, ship: 6.62 }
    ],
    photos: ['239-1.jpg','239-2.jpg','239-3.jpg','239-4.jpg','239-5.jpg'],
    name: { fr: 'Support de canne à glace pliable (trépied)', en: 'Foldable Ice Fishing Rod Holder (tripod)', es: 'Soporte plegable para caña de hielo (trípode)' },
    desc: { fr: 'Tient ta canne au-dessus du trou, repliable.', en: 'Holds your rod over the hole, folds away.', es: 'Sujeta tu caña sobre el agujero, plegable.' },
    long: {
      fr: "Support pliable à trépied pour la pêche sur glace : il tient ta canne stable au-dessus du trou pendant que tu attends la touche, et se replie à plat pour le transport. Pieds antidérapants sur la glace, berceau réglable. Plusieurs versions disponibles (roue à eau, double usage). Pratique pour pêcher plusieurs trous à la fois.",
      en: "Foldable tripod stand for ice fishing: it holds your rod steady over the hole while you wait for a bite, and folds flat for transport. Non-slip feet on the ice, adjustable cradle. Several versions available (drip wheel, dual use). Handy to fish several holes at once.",
      es: "Soporte plegable de trípode para la pesca en hielo: mantiene tu caña estable sobre el agujero mientras esperas la picada, y se pliega plano para el transporte. Patas antideslizantes sobre el hielo, cuna ajustable. Varias versiones disponibles (rueda de agua, doble uso). Práctico para pescar varios agujeros a la vez." }
  },
  {
    id: 'cj-240', category: 'reels', usd: 12.82, ship: 7.05, rating: 4.6, reviews: null, badge: null, sku: 'CJYD189446803CX',
    photos: ['240-1.jpg','240-2.jpg','240-3.jpg','240-4.jpg','240-5.jpg'],
    name: { fr: 'Moulinet casting frein magnétique (gaucher/droitier)', en: 'Baitcasting Reel, Magnetic Brake (left/right)', es: 'Carrete casting freno magnético (zurdo/diestro)' },
    desc: { fr: 'Frein anti-perruque, lancers maîtrisés.', en: 'Anti-backlash brake, controlled casts.', es: 'Freno anti-cabellera, lanzados controlados.' },
    long: {
      fr: "Moulinet casting (baitcasting) à frein magnétique réglable qui limite les « perruques » et te donne des lancers précis, même avec des leurres légers. Récupération douce, étoile de frein puissante et carter compact. Idéal pour la pêche aux leurres des carnassiers. Disponible en main gauche ou main droite — à préciser à la commande.",
      en: "Baitcasting reel with an adjustable magnetic brake that limits backlash and gives you accurate casts, even with light lures. Smooth retrieve, powerful star drag and a compact frame. Ideal for lure fishing for predators. Available in left- or right-hand — to specify at order.",
      es: "Carrete casting (baitcasting) con freno magnético ajustable que limita las «cabelleras» y da lanzados precisos, incluso con señuelos ligeros. Recogida suave, freno de estrella potente y carcasa compacta. Ideal para la pesca con señuelos de depredadores. Disponible en zurdo o diestro — a especificar al pedir." }
  },
  {
    id: 'cj-242', category: 'rods', rating: 4.5, reviews: null, badge: null, sku: 'CJDY138932401AZ',
    variants: [
      { label: '2,1 m', usd: 5.06, ship: 11.34 }, { label: '2,4 m', usd: 5.62, ship: 11.34 },
      { label: '2,7 m', usd: 6.11, ship: 11.34 }
    ],
    photos: ['242-1.jpg','242-2.jpg','242-3.jpg','242-4.jpg','242-5.jpg'],
    name: { fr: 'Canne auto-ferrante télescopique (2,1 à 2,7 m)', en: 'Self-Striking Telescopic Rod (2.1 to 2.7 m)', es: 'Caña de auto-clavado telescópica (2,1 a 2,7 m)' },
    desc: { fr: 'Ferre toute seule à la touche.', en: 'Sets the hook by itself on a bite.', es: 'Clava sola en la picada.' },
    long: {
      fr: "Canne télescopique à système auto-ferrant : armé d'un ressort, le scion se relève tout seul dès que le poisson mord, ce qui ferre à ta place. Idéale pour la pêche au posé quand tu surveilles plusieurs cannes ou que tu débutes. Se replie court pour le transport. Disponible en plusieurs longueurs (2,1 à 2,7 m).",
      en: "Telescopic rod with a self-striking system: spring-loaded, the tip flips up by itself as soon as a fish bites, setting the hook for you. Ideal for ledgering when watching several rods or when starting out. Collapses short for transport. Available in several lengths (2.1 to 2.7 m).",
      es: "Caña telescópica con sistema de auto-clavado: con un resorte, la puntera se levanta sola en cuanto el pez muerde, clavando por ti. Ideal para la pesca al fondo al vigilar varias cañas o al empezar. Se pliega corta para el transporte. Disponible en varias longitudes (2,1 a 2,7 m)." }
  },
  {
    id: 'cj-244', category: 'gear', usd: 6.52, ship: 10.68, rating: 4.5, reviews: null, badge: null, sku: 'CJDY176908201AZ',
    photos: ['244-1.jpg','244-2.jpg','244-3.jpg','244-4.jpg','244-5.jpg'],
    name: { fr: 'Râtelier porte-cannes (plastique)', en: 'Rod Rack Holder (plastic)', es: 'Soporte / perchero para cañas (plástico)' },
    desc: { fr: 'Range plusieurs cannes, mural ou bateau.', en: 'Holds several rods, wall or boat.', es: 'Guarda varias cañas, pared o barco.' },
    long: {
      fr: "Râtelier en plastique résistant pour ranger et exposer plusieurs cannes à pêche, à fixer au mur du garage, dans le bateau ou sur le ponton. Encoches qui maintiennent les talons et logements pour les scions, sans abîmer le matériel. Gain de place et cannes toujours prêtes. Plusieurs coloris disponibles.",
      en: "Sturdy plastic rack to store and display several fishing rods, to mount on the garage wall, in the boat or on the dock. Notches that hold the butts and slots for the tips, without damaging your gear. Saves space and keeps rods ready to go. Several colours available.",
      es: "Perchero de plástico resistente para guardar y exponer varias cañas de pescar, para fijar en la pared del garaje, en el barco o en el pantalán. Muescas que sujetan los talones y alojamientos para las punteras, sin dañar el equipo. Ahorra espacio y mantiene las cañas listas. Varios colores disponibles." }
  },
  {
    id: 'cj-245', category: 'gear', rating: 4.5, reviews: null, badge: null, sku: 'CJDY206696505EV',
    variants: [
      { label: '1 pièce', usd: 2.59, ship: 5.00 },
      { label: '2 pièces', usd: 5.17, ship: 5.00 }
    ],
    photos: ['245-1.jpg','245-2.jpg','245-3.jpg','245-4.jpg','245-5.jpg'],
    name: { fr: 'Détecteur de touche lumineux (clip de canne)', en: 'Light-up Bite Indicator (rod clip)', es: 'Avisador de picada luminoso (clip de caña)' },
    desc: { fr: 'S’allume au mouvement, idéal de nuit.', en: 'Lights up on movement, ideal at night.', es: 'Se ilumina con el movimiento, ideal de noche.' },
    long: {
      fr: "Détecteur de touche lumineux à clipser sur le scion de ta canne : dès que la pointe bouge, il s'allume pour signaler la touche, parfait pour la pêche de nuit au posé. Pince souple qui ne marque pas le blank, témoin LED bien visible, pile incluse. Léger et facile à poser. Disponible à l'unité ou en lot de 2.",
      en: "Light-up bite indicator that clips on your rod tip: as soon as the tip moves, it lights up to signal the bite, perfect for night ledgering. Soft clip that won't mark the blank, bright LED, battery included. Light and easy to fit. Available singly or in a 2-pack.",
      es: "Avisador de picada luminoso para enganchar en la puntera de tu caña: en cuanto la punta se mueve, se ilumina para señalar la picada, perfecto para la pesca nocturna al fondo. Pinza blanda que no marca el blank, LED bien visible, pila incluida. Ligero y fácil de colocar. Disponible por unidad o en lote de 2." }
  },
  {
    id: 'cj-247', category: 'rods', usd: 6.80, ship: 5.65, rating: 4.5, reviews: null, badge: null, sku: 'CJYD244092701AZ',
    photos: ['247-1.jpg','247-2.jpg','247-3.jpg','247-4.jpg','247-5.jpg'],
    name: { fr: 'Canne courte hiver carbone (2 brins, 67 cm)', en: 'Short Winter Carbon Rod (2-piece, 67 cm)', es: 'Caña corta invierno carbono (2 tramos, 67 cm)' },
    desc: { fr: 'Compacte et sensible, pêche fine hiver.', en: 'Compact and sensitive, winter finesse.', es: 'Compacta y sensible, pesca fina invierno.' },
    long: {
      fr: "Petite canne d'hiver en carbone en deux brins emboîtables (67 cm), sensible et nerveuse pour la pêche fine des petits leurres, sur glace ou en bateau. Très compacte une fois démontée, elle se glisse partout. Anneaux résistants au froid et poignée confortable. Idéale pour la perche, le doré et la truite par temps froid.",
      en: "Small two-piece carbon winter rod (67 cm), sensitive and lively for finesse fishing with small lures, on the ice or from a boat. Very compact once taken apart, it fits anywhere. Cold-resistant guides and a comfortable grip. Ideal for perch, walleye and trout in cold weather.",
      es: "Pequeña caña de invierno en carbono de dos tramos encajables (67 cm), sensible y nerviosa para la pesca fina con señuelos pequeños, en hielo o desde barco. Muy compacta una vez desmontada, cabe en cualquier sitio. Anillas resistentes al frío y mango cómodo. Ideal para perca, lucioperca y trucha con frío." }
  },
  {
    id: 'cj-248', category: 'gear', usd: 0.91, ship: 7.34, rating: 4.5, reviews: null, badge: null, sku: 'CJDY111628614NM',
    photos: ['248-1.jpg'],
    name: { fr: 'Fil nylon JUSTRON 500 m (mer)', en: 'JUSTRON Nylon Line 500 m (sea)', es: 'Hilo nailon JUSTRON 500 m (mar)' },
    desc: { fr: 'Souple et résistant, grande bobine.', en: 'Supple and strong, large spool.', es: 'Flexible y resistente, bobina grande.' },
    long: {
      fr: "Fil nylon « JUSTRON » en grande bobine de 500 m, souple et élastique pour amortir les coups de tête du poisson et bien lancer. Bonne tenue au nœud et résistance à l'abrasion pour la pêche en mer et du gros poisson. Disponible en plusieurs diamètres (0,4 à 6,0) et coloris, dont un jaune fluo bien visible.",
      en: "'JUSTRON' nylon line on a large 500 m spool, supple and stretchy to cushion the fish's head-shakes and cast well. Good knot strength and abrasion resistance for sea and big-fish fishing. Available in several diameters (0.4 to 6.0) and colours, including a highly visible fluo yellow.",
      es: "Hilo de nailon «JUSTRON» en bobina grande de 500 m, flexible y elástico para amortiguar los tirones del pez y lanzar bien. Buena resistencia al nudo y a la abrasión para la pesca en mar y de peces grandes. Disponible en varios diámetros (0,4 a 6,0) y colores, incluido un amarillo flúor bien visible." }
  },
  {
    id: 'cj-249', category: 'gear', usd: 4.94, ship: 5.72, rating: 4.5, reviews: null, badge: null, sku: 'CJDY119574401AZ',
    photos: ['249-1.jpg'],
    name: { fr: 'Compteur de fil 0-999 m (mesureur)', en: 'Line Counter 0-999 m (depth gauge)', es: 'Cuentametros de hilo 0-999 m' },
    desc: { fr: 'Mesure la longueur de fil sortie.', en: 'Measures the line let out.', es: 'Mide el hilo soltado.' },
    long: {
      fr: "Compteur mécanique de fil (0 à 999 m) à fixer sur la canne : le fil passe sur sa roulette et le cadran affiche la longueur sortie, pour pêcher pile à la bonne profondeur ou distance et reproduire un poste qui marche. Pratique en traîne, à la verticale ou pour bobiner une longueur précise. Remise à zéro rapide.",
      en: "Mechanical line counter (0 to 999 m) that clamps on the rod: the line runs over its wheel and the dial shows the length let out, so you fish at exactly the right depth or distance and repeat a productive spot. Handy for trolling, vertical fishing or spooling a precise length. Quick reset.",
      es: "Cuentametros mecánico de hilo (0 a 999 m) para fijar en la caña: el hilo pasa por su rueda y el dial muestra la longitud soltada, para pescar justo a la profundidad o distancia correcta y repetir un puesto que funciona. Práctico en curricán, pesca vertical o para bobinar una longitud precisa. Puesta a cero rápida." }
  },
  {
    id: 'cj-250', category: 'gear', usd: 0.45, ship: 5.20, rating: 4.5, reviews: null, badge: null, sku: 'CJDY1110392',
    photos: ['250-1.jpg','250-2.jpg','250-3.jpg','250-4.jpg','250-5.jpg'],
    name: { fr: 'Outil à nœuds rapide (monte-hameçon)', en: 'Quick Knot Tool (hook tyer)', es: 'Herramienta de nudos rápida (ata-anzuelos)' },
    desc: { fr: 'Monte tes hameçons en quelques secondes.', en: 'Ties your hooks in seconds.', es: 'Ata tus anzuelos en segundos.' },
    long: {
      fr: "Petit outil pour réaliser tes nœuds de pêche et monter tes hameçons en quelques secondes, même par temps froid ou avec une vue fatiguée. Il enroule le fil et serre le nœud proprement, et sert aussi à resserrer les nœuds et dégager les hameçons. Compact (41×26×10 mm), il se glisse dans la poche. Indispensable au bord de l'eau.",
      en: "Small tool to make your fishing knots and tie on hooks in seconds, even in cold weather or with tired eyesight. It wraps the line and tightens the knot neatly, and also helps cinch knots and remove hooks. Compact (41×26×10 mm), it slips into your pocket. A must at the water's edge.",
      es: "Pequeña herramienta para hacer tus nudos de pesca y atar anzuelos en segundos, incluso con frío o vista cansada. Enrolla el hilo y aprieta el nudo limpiamente, y también sirve para apretar nudos y soltar anzuelos. Compacta (41×26×10 mm), cabe en el bolsillo. Imprescindible a la orilla del agua." }
  },
  {
    id: 'cj-252', category: 'lures', rating: 4.6, reviews: null, badge: null, sku: 'CJYE176167203CX',
    variants: [
      { label: 'À l’unité', usd: 1.18, ship: 5.20 },
      { label: 'Lot', usd: 4.70, ship: 5.20 }
    ],
    photos: ['252-1.jpg','252-2.jpg','252-3.jpg','252-4.jpg','252-5.jpg'],
    name: { fr: 'Leurre nageur minnow flottant (unité ou lot)', en: 'Floating Minnow Lure (single or set)', es: 'Señuelo minnow flotante (unidad o lote)' },
    desc: { fr: 'Nage en surface/sub-surface, réaliste.', en: 'Surface/sub-surface swim, realistic.', es: 'Nado superficie/subsuperficie, realista.' },
    long: {
      fr: "Leurre nageur minnow flottant au profil réaliste pour la pêche des carnassiers en surface et juste dessous (black-bass, perche, brochet, bar). Bavette pour une nage roulante à la récupération, yeux 3D et hameçons triples piquants. Au choix : à l'unité dans le coloris voulu, ou en lot pour varier les présentations.",
      en: "Floating minnow lure with a realistic profile for predator fishing on and just under the surface (bass, perch, pike, seabass). Diving lip for a rolling swim on the retrieve, 3D eyes and sharp treble hooks. Choose a single lure in the colour you want, or a set to vary your presentations.",
      es: "Señuelo minnow flotante con perfil realista para la pesca de depredadores en superficie y justo debajo (black-bass, perca, lucio, lubina). Babero para un nado rodante en la recogida, ojos 3D y anzuelos triples afilados. A elegir: por unidad en el color deseado, o en lote para variar las presentaciones." }
  },
  {
    id: 'cj-253', category: 'gear', usd: 1.36, ship: 5.35, rating: 4.4, reviews: null, badge: null, sku: 'CJYE210332801AZ',
    photos: ['253-1.jpg'],
    name: { fr: 'Attractant à poisson HozoneX (28 g)', en: 'HozoneX Fish Attractant (28 g)', es: 'Atrayente de peces HozoneX (28 g)' },
    desc: { fr: 'Booste l’attractivité de tes appâts.', en: 'Boosts your baits’ attractiveness.', es: 'Potencia el atractivo de tus cebos.' },
    long: {
      fr: "Attractant à poisson « HozoneX » à mélanger ou appliquer sur tes appâts, amorces et leurres : il diffuse une odeur qui stimule l'appétit du poisson et prolonge les touches. Polyvalent (carpe, carnassiers, poissons de mer). Pot pratique de 28 g. Un petit plus pour transformer une journée difficile.",
      en: "'HozoneX' fish attractant to mix into or apply on your baits, groundbait and lures: it releases a scent that stimulates the fish's appetite and prolongs the bites. Versatile (carp, predators, sea fish). Handy 28 g pot. A little extra to turn around a tough day.",
      es: "Atrayente de peces «HozoneX» para mezclar o aplicar en tus cebos, engodos y señuelos: difunde un olor que estimula el apetito del pez y prolonga las picadas. Versátil (carpa, depredadores, peces de mar). Práctico bote de 28 g. Un plus para darle la vuelta a un día difícil." }
  },
  {
    id: 'cj-255', category: 'gear', usd: 2.19, ship: 6.77, rating: 4.6, reviews: null, badge: null, sku: 'CJDY202091107GT',
    photos: ['255-1.jpg','255-2.jpg','255-3.jpg','255-4.jpg','255-5.jpg'],
    name: { fr: 'Boîte à leurres étanche (2 tailles)', en: 'Waterproof Lure Tackle Box (2 sizes)', es: 'Caja de señuelos estanca (2 tallas)' },
    desc: { fr: 'Joint étanche, compartiments réglables.', en: 'Waterproof seal, adjustable dividers.', es: 'Junta estanca, divisores ajustables.' },
    long: {
      fr: "Boîte de rangement à leurres multifonction avec joint d'étanchéité : tes leurres, hameçons et accessoires restent au sec même sous la pluie ou les embruns. Compartiments réglables par cloisons amovibles, clips de fermeture solides et coque résistante. Disponible en deux tailles (225 ou 275 mm). Indispensable dans le sac de pêche.",
      en: "Multi-function lure box with a waterproof seal: your lures, hooks and accessories stay dry even in rain or sea spray. Adjustable compartments with removable dividers, strong closure clips and a tough shell. Available in two sizes (225 or 275 mm). A must in the tackle bag.",
      es: "Caja de señuelos multifunción con junta estanca: tus señuelos, anzuelos y accesorios quedan secos incluso bajo la lluvia o el salitre. Compartimentos ajustables con divisores extraíbles, clips de cierre resistentes y carcasa robusta. Disponible en dos tallas (225 o 275 mm). Imprescindible en la bolsa de pesca." }
  },
  {
    id: 'cj-256', category: 'gear', usd: 0.22, ship: 6.02, rating: 4.5, reviews: null, badge: null, sku: 'CJYD193077101AZ',
    photos: ['256-1.jpg','256-2.jpg','256-3.jpg','256-4.jpg','256-5.jpg'],
    name: { fr: 'Ruban de plomb auto-adhésif (lestage)', en: 'Adhesive Lead Tape Roll (weighting)', es: 'Cinta de plomo adhesiva (lastrado)' },
    desc: { fr: 'Se découpe et se colle pour lester.', en: 'Cut and stick to add weight.', es: 'Se corta y pega para lastrar.' },
    long: {
      fr: "Rouleau de ruban de plomb fin (0,4 mm) à découper et coller pour ajuster le poids et l'équilibre de tes leurres, plombs ou montages. Pratique pour faire couler un peu plus un leurre, régler l'assiette ou ajouter du lest sans recouper la ligne. Plomb souple, facile à enrouler. Plusieurs formats au choix.",
      en: "Roll of thin lead tape (0.4 mm) to cut and stick on to adjust the weight and balance of your lures, sinkers or rigs. Handy to make a lure sink a little more, trim its attitude or add weight without recutting the line. Soft, easy-to-wrap lead. Several formats to choose from.",
      es: "Rollo de cinta de plomo fina (0,4 mm) para cortar y pegar y ajustar el peso y el equilibrio de tus señuelos, plomos o montajes. Práctico para hacer hundir un poco más un señuelo, ajustar su postura o añadir lastre sin recortar la línea. Plomo blando, fácil de enrollar. Varios formatos a elegir." }
  },
  {
    id: 'cj-257', category: 'rods', usd: 3.89, ship: 6.17, rating: 4.5, reviews: null, badge: null, sku: 'CJYD1961509',
    photos: ['257-1.jpg','257-2.jpg','257-3.jpg','257-4.jpg','257-5.jpg'],
    name: { fr: 'Kit canne stylo de poche (canne + moulinet + leurres)', en: 'Pocket Pen Rod Kit (rod + reel + lures)', es: 'Kit caña bolígrafo (caña + carrete + señuelos)' },
    desc: { fr: 'Format stylo, ensemble nomade complet.', en: 'Pen format, complete travel set.', es: 'Formato bolígrafo, set de viaje completo.' },
    long: {
      fr: "Kit de pêche complet format « stylo » : mini canne télescopique, petit moulinet, fil et boîte de leurres, le tout très compact une fois replié pour tenir dans une poche ou un sac à dos. Parfait en voyage, en randonnée, pour la glace ou comme cadeau. Suffisant pour taquiner perche, truite et petits carnassiers.",
      en: "Complete 'pen-style' fishing kit: mini telescopic rod, small reel, line and a lure box, all very compact when folded to fit in a pocket or backpack. Perfect for travel, hiking, ice fishing or as a gift. Enough to tease perch, trout and small predators.",
      es: "Kit de pesca completo formato «bolígrafo»: mini caña telescópica, pequeño carrete, hilo y caja de señuelos, todo muy compacto al plegarse para caber en un bolsillo o mochila. Perfecto para viajar, hacer senderismo, pesca en hielo o como regalo. Suficiente para perca, trucha y pequeños depredadores." }
  },
  {
    id: 'cj-259', category: 'rods', usd: 6.11, ship: 14.47, rating: 4.5, reviews: null, badge: null, sku: 'CJDY116534801AZ',
    photos: ['259-1.jpg','259-2.jpg','259-3.jpg','259-4.jpg','259-5.jpg'],
    name: { fr: 'Combo canne-pistolet télescopique (4 pièces)', en: 'Pistol-Grip Telescopic Rod Combo (4-piece)', es: 'Combo caña pistola telescópica (4 piezas)' },
    desc: { fr: 'Canne + moulinet + leurres + sac.', en: 'Rod + reel + lures + bag.', es: 'Caña + carrete + señuelos + bolsa.' },
    long: {
      fr: "Ensemble de pêche aux leurres prêt à pêcher : canne télescopique à poignée pistolet, moulinet à tambour avec gâchette, jeu de leurres souples et durs, et sac de transport. Idéal pour débuter ou comme kit d'appoint à garder dans la voiture. La poignée pistolet rend le lancer très intuitif. Disponible en plusieurs coloris.",
      en: "Ready-to-fish lure combo: pistol-grip telescopic rod, trigger drum reel, a set of soft and hard lures, and a carry bag. Ideal to start out or as a backup kit to keep in the car. The pistol grip makes casting very intuitive. Available in several colours.",
      es: "Equipo de pesca con señuelos listo para pescar: caña telescópica con empuñadura de pistola, carrete de tambor con gatillo, juego de señuelos blandos y duros, y bolsa de transporte. Ideal para empezar o como kit de repuesto para el coche. La empuñadura de pistola hace el lanzado muy intuitivo. Disponible en varios colores." }
  },
  {
    id: 'cj-260', category: 'lures', usd: 37.37, ship: 10.75, rating: 4.7, reviews: null, badge: 'best', sku: 'CJYE163735301AZ',
    photos: ['260-1.jpg','260-2.jpg','260-3.jpg','260-4.jpg','260-5.jpg'],
    name: { fr: 'Coffret 84 leurres durs (minnows / crankbaits)', en: '84-Piece Hard Lure Set', es: 'Set de 84 señuelos duros' },
    desc: { fr: 'Énorme assortiment, toutes situations.', en: 'Huge assortment, every situation.', es: 'Enorme surtido, todas las situaciones.' },
    long: {
      fr: "Énorme coffret de 84 leurres durs (minnows, crankbaits, poppers) de tailles, coloris et profondeurs de nage variés. De quoi t'adapter à toutes les eaux, toutes les espèces et toutes les conditions, et remplacer un leurre perdu sans souci. Hameçons triples montés. Le pack idéal pour bien démarrer la pêche aux leurres.",
      en: "Huge 84-piece hard lure set (minnows, crankbaits, poppers) in varied sizes, colours and diving depths. Enough to adapt to every water, species and condition, and replace a lost lure with no worries. Treble hooks fitted. The ideal pack to get started with lure fishing.",
      es: "Enorme set de 84 señuelos duros (minnows, crankbaits, poppers) en tamaños, colores y profundidades de nado variados. Suficiente para adaptarte a todas las aguas, especies y condiciones, y reemplazar un señuelo perdido sin problema. Anzuelos triples montados. El pack ideal para empezar con la pesca con señuelos." }
  },
  {
    id: 'cj-261', category: 'lures', rating: 4.6, reviews: null, badge: null, sku: 'CJYD193600101AZ',
    variants: [
      { label: '85 g', usd: 5.64, ship: 5.65 }, { label: '100 g', usd: 5.97, ship: 5.65 },
      { label: '120 g', usd: 6.30, ship: 5.65 }, { label: '150 g', usd: 6.63, ship: 5.65 }
    ],
    photos: ['261-1.jpg','261-2.jpg','261-3.jpg','261-4.jpg','261-5.jpg'],
    name: { fr: 'Turlutte calmar lumineuse UV (85 à 150 g)', en: 'UV Luminous Squid Jig (85 to 150 g)', es: 'Potera de calamar luminosa UV (85 a 150 g)' },
    desc: { fr: 'Brille sous UV, plombée, pour le calmar.', en: 'Glows under UV, weighted, for squid.', es: 'Brilla bajo UV, lastrada, para calamar.' },
    long: {
      fr: "Turlutte (egi) en forme de calmar à corps lumineux UV pour la pêche du calmar et de la seiche en bateau, de jour comme de nuit. Lestée pour descendre vite et tenir le fond, elle est équipée d'une couronne de piques inversées et d'un plomb d'insertion. Le corps phosphorescent attire les céphalopodes en eau profonde. Disponible en plusieurs poids (85 à 150 g).",
      en: "Squid-shaped jig (egi) with a UV-luminous body for squid and cuttlefish fishing from a boat, day or night. Weighted to sink fast and hold the bottom, it has a crown of inverted spikes and an insert sinker. The glow body draws cephalopods in deep water. Available in several weights (85 to 150 g).",
      es: "Potera (egi) en forma de calamar con cuerpo luminoso UV para la pesca de calamar y sepia desde barco, de día y de noche. Lastrada para bajar rápido y mantener el fondo, lleva una corona de púas invertidas y un plomo de inserción. El cuerpo fosforescente atrae a los cefalópodos en agua profunda. Disponible en varios pesos (85 a 150 g)." }
  },
  {
    id: 'cj-263', category: 'gear', rating: 4.5, reviews: null, badge: null, sku: 'CJDY179246602BY',
    variants: [
      { label: 'À l’unité', usd: 0.08, ship: 5.20 },
      { label: 'Lot', usd: 2.18, ship: 5.20 }
    ],
    photos: ['263-1.jpg','263-2.jpg','263-3.jpg','263-4.jpg','263-5.jpg'],
    name: { fr: 'Tube silicone anti-emmêlement (carpe / silure)', en: 'Silicone Anti-Tangle Tubing (carp / catfish)', es: 'Tubo de silicona anti-enredos (carpa / siluro)' },
    desc: { fr: 'Protège le bas de ligne des emmêlements.', en: 'Protects the leader from tangles.', es: 'Protege el bajo de línea de enredos.' },
    long: {
      fr: "Tube (gaine) en silicone souple à enfiler sur le bas de ligne pour les montages carpe et silure : il évite que le fil s'emmêle au lancer et plaque le bas de ligne au fond pour ne pas effrayer le poisson. Discret et résistant. Vendu à l'unité ou en lot. Un petit accessoire qui fait gagner beaucoup de touches.",
      en: "Soft silicone tubing to slide over the leader for carp and catfish rigs: it stops the line tangling on the cast and pins the leader to the bottom so it won't spook fish. Discreet and tough. Sold singly or in a pack. A small accessory that wins you a lot of bites.",
      es: "Tubo (funda) de silicona blanda para pasar por el bajo de línea en montajes de carpa y siluro: evita que el hilo se enrede al lanzar y pega el bajo de línea al fondo para no asustar al pez. Discreto y resistente. Vendido por unidad o en lote. Un pequeño accesorio que gana muchas picadas." }
  },
  {
    id: 'cj-264', category: 'lures', usd: 12.35, ship: 5.62, rating: 4.6, reviews: null, badge: null, sku: 'CJDY180215901AZ',
    photos: ['264-1.jpg','264-2.jpg','264-3.jpg','264-4.jpg','264-5.jpg'],
    name: { fr: 'Coffret de mouches Anmuka (assortiment)', en: 'Anmuka Fly Assortment Box', es: 'Set de moscas Anmuka (surtido)' },
    desc: { fr: 'Mouches sèches/noyées dans un étui.', en: 'Dry/wet flies in a case.', es: 'Moscas secas/ahogadas en estuche.' },
    long: {
      fr: "Grand coffret de mouches de pêche « Anmuka » : un large assortiment de mouches sèches, noyées et nymphes aux coloris vifs, rangées dans une boîte à mousse qui les protège et les présente bien. De quoi t'adapter à toutes les éclosions et toutes les truites. Idéal pour débuter la pêche à la mouche ou compléter ta collection.",
      en: "Large 'Anmuka' fishing fly box: a wide assortment of dry flies, wet flies and nymphs in bright colours, stored in a foam box that protects and displays them. Enough to match every hatch and every trout. Ideal to start fly fishing or round out your collection.",
      es: "Gran set de moscas de pesca «Anmuka»: un amplio surtido de moscas secas, ahogadas y ninfas en colores vivos, guardadas en una caja de espuma que las protege y las presenta bien. Suficiente para adaptarte a toda eclosión y toda trucha. Ideal para empezar la pesca con mosca o completar tu colección." }
  },
  {
    id: 'cj-265', category: 'gear', usd: 4.24, ship: 11.07, rating: 4.5, reviews: null, badge: null, sku: 'CJYJ105275601AZ',
    photos: ['265-1.jpg','265-2.jpg','265-3.jpg','265-4.jpg','265-5.jpg'],
    name: { fr: 'Étui rigide pour cannes (54 cm)', en: 'Hard Rod Case (54 cm)', es: 'Estuche rígido para cañas (54 cm)' },
    desc: { fr: 'Protège cannes démontées et moulinets.', en: 'Protects taken-down rods and reels.', es: 'Protege cañas desmontadas y carretes.' },
    long: {
      fr: "Étui rigide en mousse EVA (54 cm) pour transporter et protéger tes cannes démontées, moulinets et accessoires des chocs et de l'humidité. Intérieur matelassé, fermeture zippée solide et poignée. Coque semi-rigide qui garde sa forme dans le coffre ou en voyage. Idéal pour les cannes télescopiques et les ensembles compacts.",
      en: "Hard EVA foam case (54 cm) to carry and protect your taken-down rods, reels and accessories from knocks and moisture. Padded interior, sturdy zip closure and a handle. Semi-rigid shell that keeps its shape in the trunk or while travelling. Ideal for telescopic rods and compact combos.",
      es: "Estuche rígido de espuma EVA (54 cm) para transportar y proteger tus cañas desmontadas, carretes y accesorios de golpes y humedad. Interior acolchado, cierre de cremallera resistente y asa. Carcasa semirrígida que mantiene su forma en el maletero o de viaje. Ideal para cañas telescópicas y combos compactos." }
  },
  {
    id: 'cj-266', category: 'lures', usd: 4.90, ship: 5.44, rating: 4.6, reviews: null, badge: null, sku: 'CJYE1736571',
    photos: ['266-1.jpg','266-2.jpg','266-3.jpg','266-4.jpg','266-5.jpg'],
    name: { fr: 'Stickbait coulant longue distance 11 cm', en: 'Long-Cast Sinking Pencil 11 cm', es: 'Pencil hundido largo alcance 11 cm' },
    desc: { fr: 'Lance loin, coule, mer & carnassiers.', en: 'Casts far, sinks, sea & predators.', es: 'Lanza lejos, se hunde, mar y depredadores.' },
    long: {
      fr: "Leurre coulant type stickbait/pencil de 11 cm pour la pêche en mer du bord et des carnassiers. Dense et profilé, il se lance très loin et descend dans la couche d'eau ; animé en dents de scie, il imite un poisson blessé. Tête rouge et flancs réfléchissants. Hameçons triples. Disponible en de nombreux coloris (style NHH016).",
      en: "11 cm sinking stickbait/pencil for shore sea fishing and predators. Dense and streamlined, it casts very far and drops through the water column; worked in a zig-zag it mimics a wounded fish. Red head and reflective flanks. Treble hooks. Available in many colours (NHH016 style).",
      es: "Señuelo hundido tipo stickbait/pencil de 11 cm para la pesca en mar desde costa y depredadores. Denso y perfilado, se lanza muy lejos y baja por la capa de agua; animado en zigzag imita a un pez herido. Cabeza roja y flancos reflectantes. Anzuelos triples. Disponible en muchos colores (estilo NHH016)." }
  },
  {
    id: 'cj-268', category: 'rods', rating: 4.5, reviews: null, badge: null, sku: 'CJDY136972802BY',
    variants: [
      { label: '1 ensemble', usd: 7.70, ship: 12.34 },
      { label: '2 ensembles', usd: 15.59, ship: 12.34 }
    ],
    photos: ['268-1.jpg','268-2.jpg','268-3.jpg','268-4.jpg','268-5.jpg'],
    name: { fr: 'Combo canne-pistolet + moulinet fermé (LEO)', en: 'Pistol-Grip Rod + Spincast Reel Combo', es: 'Combo caña pistola + carrete cerrado' },
    desc: { fr: 'Prêt à pêcher, avec sac de transport.', en: 'Ready to fish, with carry bag.', es: 'Listo para pescar, con bolsa.' },
    long: {
      fr: "Ensemble de pêche compact à poignée pistolet avec moulinet fermé (spincast) intégré : facile à lancer même pour les débutants et les enfants, sans risque de perruque. Canne télescopique, sac de transport et accessoires inclus. Idéal en voyage, pour la glace ou comme kit d'initiation. Disponible en lot de 1 ou 2 ensembles.",
      en: "Compact pistol-grip fishing combo with a built-in closed (spincast) reel: easy to cast even for beginners and kids, with no risk of backlash. Telescopic rod, carry bag and accessories included. Ideal for travel, ice fishing or as a starter kit. Available in a 1- or 2-combo pack.",
      es: "Equipo de pesca compacto con empuñadura de pistola y carrete cerrado (spincast) integrado: fácil de lanzar incluso para principiantes y niños, sin riesgo de cabellera. Caña telescópica, bolsa de transporte y accesorios incluidos. Ideal para viajar, pesca en hielo o como kit de iniciación. Disponible en lote de 1 o 2 equipos." }
  },
  {
    id: 'cj-270', category: 'gear', rating: 4.5, reviews: null, badge: null, sku: 'CJDY116860602BY',
    variants: [
      { label: 'Standard', usd: 3.08, ship: 10.87 },
      { label: 'Double renforcé', usd: 5.93, ship: 10.87 }
    ],
    photos: ['270-1.jpg','270-2.jpg','270-3.jpg','270-4.jpg','270-5.jpg'],
    name: { fr: 'Support de canne sur pique 360° (berge)', en: 'Adjustable 360° Bank Rod Holder', es: 'Soporte de caña 360° (orilla)' },
    desc: { fr: 'Se plante au sol, tête orientable 360°.', en: 'Sticks in the ground, 360° head.', es: 'Se clava en el suelo, cabeza 360°.' },
    long: {
      fr: "Support de canne à planter dans la berge, à fourche double pour bien caler ta canne et tête orientable à 360° : tu positionnes le scion exactement à l'angle voulu pendant l'attente. Pointe double qui s'enfonce bien dans la terre ou le sable, construction pliable et résistante. Disponible en version standard ou double renforcée. Indispensable pour la pêche au posé.",
      en: "Bank stick rod holder with a double fork to cradle your rod and a 360° swivelling head: set the tip at exactly the angle you want while waiting. Double point that sinks well into soil or sand, foldable and sturdy build. Available in standard or reinforced-double version. A must for ledgering.",
      es: "Soporte de caña para clavar en la orilla, con horquilla doble para asentar bien tu caña y cabeza orientable 360°: colocas la puntera en el ángulo exacto deseado durante la espera. Punta doble que se hunde bien en tierra o arena, construcción plegable y resistente. Disponible en versión estándar o doble reforzada. Imprescindible para la pesca al fondo." }
  },
  {
    id: 'cj-271', category: 'rods', rating: 4.6, reviews: null, badge: null, sku: 'CJDY125106401AZ',
    variants: [
      { label: 'Canne nue 2,4-3,6 m', usd: 4.24, ship: 7.08 },
      { label: '4,5-5,4 m', usd: 8.24, ship: 7.08 },
      { label: '6,3-7,2 m', usd: 18.41, ship: 7.08 }
    ],
    photos: ['271-1.jpg','271-2.jpg','271-3.jpg','271-4.jpg','271-5.jpg'],
    name: { fr: 'Canne télescopique carbone au coup / rockfishing (2,4 à 7,2 m)', en: 'Telescopic Carbon Coarse / Rock Pole (2.4 to 7.2 m)', es: 'Caña telescópica carbono coup / rock (2,4 a 7,2 m)' },
    desc: { fr: 'Légère et rigide, eau douce & mer.', en: 'Light and stiff, fresh & salt.', es: 'Ligera y rígida, dulce y mar.' },
    long: {
      fr: "Longue canne télescopique en carbone dur, polyvalente eau douce et mer (pêche au coup, pêche sur les rochers). Légère et rigide pour bien ferrer et brider le poisson malgré la longueur, elle se replie très court pour le transport. Disponible dans de nombreuses longueurs (2,4 à 7,2 m) : le tarif augmente avec la longueur et la finition (canne nue ou montée).",
      en: "Long hard-carbon telescopic pole, versatile for fresh and salt water (coarse and rock fishing). Light and stiff to set and control fish despite the length, it collapses very short for transport. Available in many lengths (2.4 to 7.2 m): the price rises with length and finish (bare or fitted pole).",
      es: "Larga caña telescópica de carbono duro, versátil para agua dulce y mar (pesca al coup, pesca en rocas). Ligera y rígida para clavar y dominar el pez pese a la longitud, se pliega muy corta para el transporte. Disponible en muchas longitudes (2,4 a 7,2 m): el precio sube con la longitud y el acabado (caña desnuda o montada)." }
  },
  {
    id: 'cj-272', category: 'lures', usd: 0.88, ship: 4.81, rating: 4.6, reviews: null, badge: null, sku: 'CJYE121511701AZ',
    photos: ['272-1.jpg','272-2.jpg','272-3.jpg','272-4.jpg','272-5.jpg'],
    name: { fr: 'Leurres crevette articulés (lot 4 coloris)', en: 'Jointed Shrimp Lures (4-colour set)', es: 'Señuelos camarón articulados (4 colores)' },
    desc: { fr: 'Imitation crevette réaliste, 4 coloris.', en: 'Realistic shrimp imitation, 4 colours.', es: 'Imitación de camarón realista, 4 colores.' },
    long: {
      fr: "Lot de 4 leurres durs imitant une crevette, au corps translucide articulé et aux longues antennes très réalistes. À la récupération par petites tirées, ils sautillent comme une vraie crevette en fuite et déclenchent bar, dorade, truite et perche. Hameçons fins. Coloris variés (clair, rose, vert, orange) pour s'adapter à l'eau.",
      en: "Set of 4 hard lures imitating a shrimp, with a translucent jointed body and long, very realistic antennae. Worked in short hops, they dart like a real fleeing shrimp and trigger bass, bream, trout and perch. Fine hooks. Varied colours (clear, pink, green, orange) to match the water.",
      es: "Lote de 4 señuelos duros que imitan a un camarón, con cuerpo translúcido articulado y largas antenas muy realistas. Animados a pequeños tirones, saltan como un camarón real en fuga y provocan lubina, dorada, trucha y perca. Anzuelos finos. Colores variados (claro, rosa, verde, naranja) para adaptarse al agua." }
  },
  {
    id: 'cj-273', category: 'lures', usd: 2.69, ship: 5.95, rating: 4.6, reviews: null, badge: null, sku: 'CJYE126716801AZ',
    photos: ['273-1.jpg','273-2.jpg','273-3.jpg','273-4.jpg','273-5.jpg'],
    name: { fr: 'Leurre nageur articulé multi-sections (longue distance)', en: 'Multi-Jointed Swimbait (long-cast)', es: 'Señuelo articulado multisección (largo alcance)' },
    desc: { fr: 'Nage ultra-réaliste, nombreux coloris.', en: 'Ultra-realistic swim, many colours.', es: 'Nado ultrarrealista, muchos colores.' },
    long: {
      fr: "Leurre nageur articulé en plusieurs sections : à la récupération, son corps ondule comme un vrai poisson et déclenche les gros carnassiers (brochet, sandre, bar, silure). Profil élancé qui se lance loin. Hameçons triples piquants et yeux 3D réalistes. Disponible dans un très grand choix de coloris (styles A à R).",
      en: "Multi-section jointed swimbait: on the retrieve its body waves like a real fish and triggers big predators (pike, zander, bass, catfish). Slim profile that casts far. Sharp treble hooks and realistic 3D eyes. Available in a huge choice of colours (styles A to R).",
      es: "Señuelo articulado de varias secciones: en la recogida su cuerpo ondula como un pez real y provoca a los grandes depredadores (lucio, lucioperca, lubina, siluro). Perfil esbelto que se lanza lejos. Anzuelos triples afilados y ojos 3D realistas. Disponible en una enorme variedad de colores (estilos A a R)." }
  },
  {
    id: 'cj-274', category: 'lures', usd: 2.34, ship: 5.95, rating: 4.6, reviews: null, badge: null, sku: 'CJYE125107803CX',
    photos: ['274-1.jpg','274-2.jpg','274-3.jpg','274-4.jpg','274-5.jpg'],
    name: { fr: 'Tai rubber / jig à jupe (madai)', en: 'Tai Rubber Skirt Jig (madai)', es: 'Tai rubber / jig con falda (madai)' },
    desc: { fr: 'Tête plombée + jupe ondulante, mer.', en: 'Jig head + waving skirt, sea.', es: 'Cabeza plomada + falda ondulante, mar.' },
    long: {
      fr: "Tai rubber (jig madai) : une tête plombée colorée suivie d'une jupe souple et de filaments qui ondulent à la moindre tension, imitant un calmar ou une crevette. Pêché en dérive lente près du fond, il déclenche dorades, pagres, bars et autres poissons de roche. Hameçons assist montés sur cordage. Disponible en plusieurs coloris.",
      en: "Tai rubber (madai jig): a coloured jig head followed by a soft skirt and tentacle filaments that wave at the slightest tension, imitating a squid or shrimp. Fished on a slow drift near the bottom, it triggers bream, snapper, bass and other rock fish. Assist hooks on cord. Available in several colours.",
      es: "Tai rubber (jig madai): una cabeza plomada de color seguida de una falda blanda y filamentos que ondulan a la mínima tensión, imitando un calamar o un camarón. Pescado a la deriva lenta cerca del fondo, provoca doradas, pargos, lubinas y otros peces de roca. Anzuelos assist en cordón. Disponible en varios colores." }
  },
  {
    id: 'cj-275', category: 'reels', usd: 1.64, ship: 5.20, rating: 4.5, reviews: null, badge: null, sku: 'CJDY117292201AZ',
    photos: ['275-1.jpg','275-2.jpg','275-3.jpg','275-4.jpg','275-5.jpg'],
    name: { fr: 'Moulinet à glace (tambour, frein)', en: 'Ice Fishing Reel (drum, drag)', es: 'Carrete de hielo (tambor, freno)' },
    desc: { fr: 'Léger, simple, pour la pêche sous glace.', en: 'Light, simple, for under-ice fishing.', es: 'Ligero, simple, para pesca bajo hielo.' },
    long: {
      fr: "Petit moulinet à tambour pour la pêche sur glace : léger et simple, avec un frein doux pour amortir les départs et laisser filer le poisson sous la glace. Plastique résistant au froid, montage rapide sur la canne. Disponible en plusieurs versions (petit/gros tambour, avec ou sans roulements) selon ta pêche. Idéal pour la perche et la truite l'hiver.",
      en: "Small drum reel for ice fishing: light and simple, with a smooth drag to cushion runs and let the fish take line under the ice. Cold-resistant plastic, quick mounting on the rod. Available in several versions (small/large drum, with or without bearings) to match your fishing. Ideal for perch and trout in winter.",
      es: "Pequeño carrete de tambor para la pesca en hielo: ligero y simple, con un freno suave para amortiguar las salidas y dejar correr al pez bajo el hielo. Plástico resistente al frío, montaje rápido en la caña. Disponible en varias versiones (tambor pequeño/grande, con o sin rodamientos) según tu pesca. Ideal para perca y trucha en invierno." }
  },
  {
    id: 'cj-276', category: 'gear', usd: 1.01, ship: 14.52, rating: 4.5, reviews: null, badge: null, sku: 'CJDY102495501AZ',
    photos: ['276-1.jpg','276-2.jpg','276-3.jpg','276-4.jpg','276-5.jpg'],
    name: { fr: 'Tip-up à drapeau pour pêche sur glace (lot 6)', en: 'Ice Fishing Tip-Up with Flag (6-pack)', es: 'Tip-up con bandera para hielo (6)' },
    desc: { fr: 'Drapeau qui se lève à la touche.', en: 'Flag pops up on a bite.', es: 'Bandera que se levanta en la picada.' },
    long: {
      fr: "Lot de 6 tip-ups en ABS pour la pêche sur glace : posé sur le trou (avec couvercle), chaque appareil tient ta ligne sous la glace et son drapeau orange se lève dès qu'un poisson mord, même à distance. Tu peux ainsi surveiller plusieurs trous d'un coup d'œil. Robuste et résistant au froid. ⚠️ Colis volumineux (port plus élevé).",
      en: "Set of 6 ABS tip-ups for ice fishing: set over the hole (with a cover), each unit holds your line under the ice and its orange flag pops up as soon as a fish bites, even from a distance. You can watch several holes at a glance. Sturdy and cold-resistant. ⚠️ Bulky parcel (higher shipping).",
      es: "Lote de 6 tip-ups de ABS para la pesca en hielo: colocado sobre el agujero (con tapa), cada aparato sujeta tu línea bajo el hielo y su bandera naranja se levanta en cuanto un pez muerde, incluso a distancia. Así puedes vigilar varios agujeros de un vistazo. Robusto y resistente al frío. ⚠️ Paquete voluminoso (envío más alto)." }
  },
  {
    id: 'cj-277', category: 'lures', usd: 20.99, ship: 0, rating: 4.7, reviews: null, badge: 'best', sku: 'CJYE275892701AZ',
    photos: ['277-1.jpg','277-2.jpg','277-3.jpg','277-4.jpg','277-5.jpg'],
    name: { fr: 'Coffret 383 leurres complet (expédié USA)', en: '383-Piece Complete Lure Kit (US warehouse)', es: 'Kit completo 383 señuelos (USA)' },
    desc: { fr: 'Énorme kit tout-en-un, port offert (USA).', en: 'Huge all-in-one kit, free shipping (US).', es: 'Enorme kit todo en uno, envío gratis (USA).' },
    long: {
      fr: "Énorme coffret de 383 pièces pour la pêche aux leurres : crankbaits, spinnerbaits, leurres souples (worms), jig heads, hameçons, émerillons, plombs et accessoires, le tout rangé dans une grande boîte. De quoi pêcher tous les carnassiers en eau douce comme en mer et t'adapter à chaque situation. Expédié depuis un entrepôt aux États-Unis : livraison rapide et offerte !",
      en: "Huge 383-piece lure fishing kit: crankbaits, spinnerbaits, soft worms, jig heads, hooks, swivels, sinkers and accessories, all in a large box. Enough to fish every predator in fresh or salt water and adapt to any situation. Shipped from a US warehouse: fast and free delivery!",
      es: "Enorme kit de 383 piezas para la pesca con señuelos: crankbaits, spinnerbaits, vinilos (worms), cabezas plomadas, anzuelos, emerillones, plomos y accesorios, todo en una caja grande. Suficiente para pescar todos los depredadores en agua dulce o mar y adaptarte a cada situación. Enviado desde un almacén en EE. UU.: ¡entrega rápida y gratis!" }
  },
  {
    id: 'cj-278', category: 'gear', usd: 1.95, ship: 6.47, rating: 4.5, reviews: null, badge: null, sku: 'CJDY115031404DW',
    photos: ['278-1.jpg','278-2.jpg','278-3.jpg','278-4.jpg','278-5.jpg'],
    name: { fr: 'Bas de ligne acier anti-morsure (lot de 20)', en: 'Steel Wire Leaders, Anti-Bite (20-pack)', es: 'Bajos de línea de acero anti-mordida (20)' },
    desc: { fr: 'Empêche les dents de couper le fil.', en: 'Stops teeth cutting the line.', es: 'Evita que los dientes corten el hilo.' },
    long: {
      fr: "Lot de 20 bas de ligne en acier gainé avec émerillon et agrafe, indispensables face aux poissons à dents (brochet, silure, barracuda, requin-bord). Le fil d'acier résiste aux coupures là où le nylon casse. Montage rapide grâce à l'agrafe. Disponible en plusieurs longueurs (15 à 50 cm). Tu sécurises tes leurres et tu perds moins de poissons.",
      en: "Set of 20 coated steel wire leaders with a swivel and snap, essential against toothy fish (pike, catfish, barracuda, shark). The steel wire resists cuts where mono would break. Quick to clip on. Available in several lengths (15 to 50 cm). You protect your lures and lose fewer fish.",
      es: "Lote de 20 bajos de línea de acero recubierto con emerillón y grapa, imprescindibles frente a peces con dientes (lucio, siluro, barracuda, tiburón). El hilo de acero resiste los cortes donde el nailon se rompe. Montaje rápido con la grapa. Disponible en varias longitudes (15 a 50 cm). Proteges tus señuelos y pierdes menos peces." }
  },
  {
    id: 'cj-279', category: 'rods', usd: 4.34, ship: 6.32, rating: 4.5, reviews: null, badge: null, sku: 'CJDY105229905EV',
    photos: ['279-1.jpg','279-2.jpg','279-3.jpg','279-4.jpg'],
    name: { fr: 'Mini canne stylo de poche (cadeau)', en: 'Mini Pocket Pen Rod (gift)', es: 'Mini caña bolígrafo de bolsillo (regalo)' },
    desc: { fr: 'Format stylo, idée cadeau originale.', en: 'Pen format, original gift idea.', es: 'Formato bolígrafo, idea de regalo original.' },
    long: {
      fr: "Mini canne télescopique au format « stylo » avec son petit moulinet : repliée, elle ressemble à un gros stylo et tient dans une poche ; déployée, c'est une vraie petite canne d'appoint. Finition soignée noir et or, idéale comme cadeau original pour un pêcheur, ou comme kit de secours à garder partout. Parfaite en voyage ou pour la glace.",
      en: "Pen-sized telescopic mini rod with its small reel: folded, it looks like a fat pen and fits in a pocket; extended, it's a real little backup rod. Smart black-and-gold finish, ideal as an original gift for an angler, or as a backup kit to keep anywhere. Perfect for travel or ice fishing.",
      es: "Mini caña telescópica en formato «bolígrafo» con su pequeño carrete: plegada parece un bolígrafo grueso y cabe en un bolsillo; desplegada es una pequeña caña de repuesto de verdad. Acabado cuidado negro y oro, ideal como regalo original para un pescador, o como kit de repuesto para llevar a cualquier sitio. Perfecta para viajar o la pesca en hielo." }
  },
  {
    id: 'cj-280', category: 'gear', usd: 1.74, ship: 5.35, rating: 4.5, reviews: null, badge: null, sku: 'CJDY2158687',
    photos: ['280-1.jpg','280-2.jpg','280-3.jpg','280-4.jpg','280-5.jpg'],
    name: { fr: 'Indicateur de touche carpe (swinger)', en: 'Carp Bite Indicator (swinger)', es: 'Indicador de picada carpa (swinger)' },
    desc: { fr: 'Tend la ligne et signale la touche.', en: 'Keeps the line tight and shows the bite.', es: 'Mantiene la línea tensa y señala la picada.' },
    long: {
      fr: "Indicateur de touche type « swinger » pour la pêche de la carpe au posé. Suspendu sous la canne par sa chaînette, il garde la ligne tendue et signale aussitôt départs et touches en avalée, de jour comme de nuit (corps translucide bien visible). Bras et chaîne réglables. Disponible en plusieurs coloris. Idéal sur rod pod avec détecteur.",
      en: "'Swinger' bite indicator for ledgering carp. Hung under the rod by its chain, it keeps the line tight and instantly shows runs and drop-back bites, day or night (clearly visible translucent body). Adjustable arm and chain. Available in several colours. Ideal on a rod pod with an alarm.",
      es: "Indicador de picada tipo «swinger» para la pesca de carpa al fondo. Colgado bajo la caña por su cadena, mantiene la línea tensa y señala al instante salidas y picadas en caída, de día y de noche (cuerpo translúcido bien visible). Brazo y cadena ajustables. Disponible en varios colores. Ideal en rod pod con avisador." }
  },
  {
    id: 'cj-281', category: 'lures', usd: 0.60, ship: 5.20, rating: 4.5, reviews: null, badge: null, sku: 'CJDY1911313',
    photos: ['281-1.jpg','281-2.jpg','281-3.jpg','281-4.jpg','281-5.jpg'],
    name: { fr: 'Cuiller tournante à plumes (6,5 cm)', en: 'Spinner with Feather Tail (6.5 cm)', es: 'Cucharilla giratoria con plumas (6,5 cm)' },
    desc: { fr: 'Palette brillante + plumes, nombreux modèles.', en: 'Shiny blade + feathers, many models.', es: 'Pala brillante + plumas, muchos modelos.' },
    long: {
      fr: "Cuiller tournante de 6,5 cm (5,3 g) : sa palette brillante vibre et accroche la lumière, tandis que le panache de plumes déclenche l'attaque des carnassiers (truite, perche, brochet, chevesne). Hameçon triple garni rouge. Vibration forte qui se sent dans la canne. Disponible dans de très nombreux modèles et coloris.",
      en: "6.5 cm (5.3 g) spinner: its shiny blade flashes and vibrates while the feather tail triggers strikes from predators (trout, perch, pike, chub). Dressed red treble hook. Strong vibration you feel in the rod. Available in many models and colours.",
      es: "Cucharilla giratoria de 6,5 cm (5,3 g): su pala brillante destella y vibra mientras el penacho de plumas provoca el ataque de los depredadores (trucha, perca, lucio, cacho). Anzuelo triple vestido rojo. Vibración fuerte que se siente en la caña. Disponible en muchos modelos y colores." }
  },
  {
    id: 'cj-282', category: 'gear', usd: 0.51, ship: 5.20, rating: 4.5, reviews: null, badge: null, sku: 'CJYD202241706FU',
    photos: ['282-1.jpg','282-2.jpg','282-3.jpg','282-4.jpg'],
    name: { fr: 'Fil nylon Red Wolf 100 m', en: 'Red Wolf Nylon Line 100 m', es: 'Hilo nailon Red Wolf 100 m' },
    desc: { fr: 'Monofilament résistant, plusieurs diamètres.', en: 'Strong mono, several diameters.', es: 'Monofilamento resistente, varios diámetros.' },
    long: {
      fr: "Fil monofilament nylon « Red Wolf » de 100 m, résistant et élastique pour amortir les coups de tête du poisson. Bonne tenue au nœud et discrétion dans l'eau. Disponible en plusieurs diamètres (numéros 3.0 à 8.0). Idéal en corps de ligne pour la mer et le gros poisson, ou en bas de ligne.",
      en: "100 m 'Red Wolf' nylon monofilament, strong and stretchy to cushion the fish's head-shakes. Good knot strength and discretion in the water. Available in several diameters (numbers 3.0 to 8.0). Ideal as a main line for the sea and big fish, or as a leader.",
      es: "Hilo monofilamento de nailon «Red Wolf» de 100 m, resistente y elástico para amortiguar los tirones del pez. Buena resistencia al nudo y discreción en el agua. Disponible en varios diámetros (números 3.0 a 8.0). Ideal como línea madre para el mar y peces grandes, o como bajo de línea." }
  },
  {
    id: 'cj-283', category: 'gear', usd: 0.74, ship: 5.65, rating: 4.5, reviews: null, badge: null, sku: 'CJDY174365130DW',
    photos: ['283-1.jpg','283-2.jpg','283-3.jpg','283-4.jpg','283-5.jpg'],
    name: { fr: 'Fil nylon enduit fluoro 120 m (anti-vrille)', en: 'Fluoro-coated Nylon Line 120 m (anti-roll)', es: 'Hilo nailon fluoro 120 m (anti-torsión)' },
    desc: { fr: 'Souple, discret, traité anti-vrille.', en: 'Supple, discreet, anti-roll treated.', es: 'Flexible, discreto, tratado anti-torsión.' },
    long: {
      fr: "Fil nylon à revêtement fluorocarbone de 120 m, traité « anti-roll » pour limiter le vrillage et les emmêlements. Souple pour de bons lancers, résistant et discret dans l'eau pour ne pas alerter le poisson. Disponible en de nombreux diamètres (0,4 à 8,0). Polyvalent en corps de ligne pour la mer comme l'eau douce.",
      en: "120 m fluorocarbon-coated nylon line, 'anti-roll' treated to limit twist and tangles. Supple for good casts, strong and discreet in the water so it won't spook fish. Available in many diameters (0.4 to 8.0). Versatile as a main line for salt or fresh water.",
      es: "Hilo de nailon con recubrimiento de fluorocarbono de 120 m, tratado «anti-roll» para limitar la torsión y los enredos. Flexible para buenos lanzados, resistente y discreto en el agua para no alertar al pez. Disponible en muchos diámetros (0,4 a 8,0). Versátil como línea madre para mar o agua dulce." }
  },
  {
    id: 'cj-284', category: 'gear', usd: 17.48, ship: 0, rating: 4.7, reviews: null, badge: 'best', sku: 'CJDY26015070001',
    photos: ['284-1.jpg','284-2.jpg','284-3.jpg','284-4.jpg','284-5.jpg'],
    name: { fr: 'Nasse pliable à appâts (crevettes, vairons, crabes)', en: 'Folding Bait Trap Net (shrimp, minnow, crab)', es: 'Nasa plegable para cebos (gambas, alevines, cangrejos)' },
    desc: { fr: 'Se replie à plat, port offert (USA).', en: 'Folds flat, free shipping (US).', es: 'Se pliega plana, envío gratis (USA).' },
    long: {
      fr: "Nasse-piège pliable type parapluie pour capturer facilement tes appâts vivants : crevettes, vairons, écrevisses, petits crabes. Plusieurs entrées en entonnoir, se déploie en un geste et se replie à plat pour le transport. Expédiée depuis un entrepôt aux États-Unis : livraison rapide et offerte !",
      en: "Folding umbrella-style trap net to easily catch your live bait: shrimp, minnows, crayfish, small crabs. Several funnel entrances, opens in one move and folds flat for transport. Shipped from a US warehouse: fast and free delivery!",
      es: "Nasa-trampa plegable tipo paraguas para capturar fácilmente tus cebos vivos: gambas, alevines, cangrejos de río, cangrejos pequeños. Varias entradas en embudo, se despliega en un gesto y se pliega plana para el transporte. Enviada desde un almacén en EE. UU.: ¡entrega rápida y gratis!" }
  },
  {
    id: 'cj-285', category: 'lures', rating: 4.5, reviews: null, badge: null, sku: 'CJYD212943005EV',
    variants: [
      { label: 'À l’unité', usd: 0.64, ship: 5.59 },
      { label: 'Lot', usd: 3.52, ship: 5.59 }
    ],
    photos: ['285-1.jpg','285-2.jpg','285-3.jpg','285-4.jpg','285-5.jpg'],
    name: { fr: 'Cuiller tournante à grelot (unité ou lot)', en: 'Spinner with Bell (single or set)', es: 'Cucharilla con cascabel (unidad o lote)' },
    desc: { fr: 'Palette + grelot sonore + plumes.', en: 'Blade + sound bell + feathers.', es: 'Pala + cascabel sonoro + plumas.' },
    long: {
      fr: "Cuiller tournante équipée d'un grelot en cuivre : en plus de la vibration et des reflets de la palette, le grelot émet un cliquetis qui attire les carnassiers de plus loin, même en eau trouble. Hameçon triple garni de plumes. Disponible à l'unité dans le coloris voulu ou en lot assorti pour tout avoir sous la main.",
      en: "Spinner fitted with a copper bell: on top of the blade's flash and vibration, the bell makes a tinkling sound that draws predators from further away, even in murky water. Feather-dressed treble hook. Available singly in the colour you want, or in an assorted set to have everything on hand.",
      es: "Cucharilla giratoria equipada con un cascabel de cobre: además del destello y la vibración de la pala, el cascabel emite un tintineo que atrae a los depredadores desde más lejos, incluso en agua turbia. Anzuelo triple vestido con plumas. Disponible por unidad en el color deseado o en lote surtido para tenerlo todo a mano." }
  },
  {
    id: 'cj-286', category: 'reels', usd: 13.31, ship: 11.37, rating: 4.6, reviews: null, badge: null, sku: 'CJDY122208401AZ',
    photos: ['286-1.jpg','286-2.jpg','286-3.jpg','286-4.jpg','286-5.jpg'],
    name: { fr: 'Moulinet de traîne mer (conventionnel, droitier)', en: 'Trolling Conventional Reel (right hand)', es: 'Carrete de curricán mar (convencional, diestro)' },
    desc: { fr: 'Tambour puissant pour la traîne et le fond.', en: 'Powerful drum for trolling and bottom.', es: 'Tambor potente para curricán y fondo.' },
    long: {
      fr: "Moulinet de traîne (conventionnel) à tambour pour la pêche en mer : traîne, pêche au gros et pêche profonde. Roulements inox, frein puissant et carter renforcé pour encaisser les gros poissons et l'eau salée. Récupération directe et solide. Disponible en plusieurs tailles (TSSD3000 / 4000). Version main droite.",
      en: "Conventional trolling drum reel for sea fishing: trolling, big-game and deep dropping. Stainless bearings, powerful drag and a reinforced frame to take big fish and salt water. Direct, sturdy retrieve. Available in several sizes (TSSD3000 / 4000). Right-hand version.",
      es: "Carrete de curricán (convencional) de tambor para la pesca en mar: curricán, pesca de altura y pesca profunda. Rodamientos inox, freno potente y carcasa reforzada para aguantar grandes peces y el agua salada. Recogida directa y sólida. Disponible en varias tallas (TSSD3000 / 4000). Versión mano derecha." }
  },
  {
    id: 'cj-287', category: 'gear', usd: 0.67, ship: 5.35, rating: 4.5, reviews: null, badge: null, sku: 'CJDY125401555CX',
    photos: ['287-1.jpg','287-2.jpg','287-3.jpg','287-4.jpg','287-5.jpg'],
    name: { fr: 'Fil nylon FTK enduit fluoro 120 m', en: 'FTK Fluoro-coated Nylon Line 120 m', es: 'Hilo nailon FTK fluoro 120 m' },
    desc: { fr: 'Bon lancer, discret, nombreux diamètres.', en: 'Good casting, discreet, many diameters.', es: 'Buen lanzado, discreto, muchos diámetros.' },
    long: {
      fr: "Fil nylon FTK à revêtement fluorocarbone, en bobine de 120 m. Souple pour de bons lancers, résistant et discret dans l'eau pour ne pas alerter le poisson. Disponible dans de nombreux diamètres (0,8 à 8,0) et plusieurs teintes mouchetées (bleu, vert, café) qui se fondent dans l'eau. Polyvalent en corps ou en bas de ligne.",
      en: "FTK fluorocarbon-coated nylon line on a 120 m spool. Supple for good casts, strong and discreet in the water so it won't spook fish. Available in many diameters (0.8 to 8.0) and several speckled shades (blue, green, coffee) that blend into the water. Versatile as a main line or leader.",
      es: "Hilo de nailon FTK con recubrimiento de fluorocarbono, en bobina de 120 m. Flexible para buenos lanzados, resistente y discreto en el agua para no alertar al pez. Disponible en muchos diámetros (0,8 a 8,0) y varios tonos moteados (azul, verde, café) que se funden con el agua. Versátil como línea madre o bajo de línea." }
  },
  {
    id: 'cj-289', category: 'gear', usd: 5.51, ship: 12.07, rating: 4.5, reviews: null, badge: null, sku: 'CJDY125189201AZ',
    photos: ['289-1.jpg','289-2.jpg','289-3.jpg','289-4.jpg','289-5.jpg'],
    name: { fr: 'Support de canne à pince (rail de bateau)', en: 'Clamp Rod Holder (boat rail)', es: 'Soporte de caña con pinza (barco)' },
    desc: { fr: 'Se serre sur le bord, berceau orientable.', en: 'Clamps to the edge, swivelling cradle.', es: 'Se aprieta al borde, cuna orientable.' },
    long: {
      fr: "Support de canne en nylon renforcé à fixer par pince (étau) sur le rail, le plat-bord ou le ponton. Berceau orientable et inclinable pour positionner ta canne à l'angle voulu pendant la traîne ou l'attente. Vis de serrage solide, matière résistante à l'eau salée. Pratique pour pêcher plusieurs cannes depuis le bateau.",
      en: "Reinforced nylon rod holder that clamps onto the rail, gunwale or dock. Swivelling, tilting cradle to set your rod at the angle you want while trolling or waiting. Strong clamp screw, saltwater-resistant material. Handy to fish several rods from the boat.",
      es: "Soporte de caña en nailon reforzado que se fija con pinza (mordaza) al riel, la borda o el pantalán. Cuna orientable e inclinable para colocar tu caña en el ángulo deseado durante el curricán o la espera. Tornillo de apriete sólido, material resistente al agua salada. Práctico para pescar varias cañas desde el barco." }
  },
  {
    id: 'cj-290', category: 'rods', usd: 5.24, ship: 12.00, rating: 4.5, reviews: null, badge: null, sku: 'CJDY139744801AZ',
    photos: ['290-1.jpg','290-2.jpg','290-3.jpg','290-4.jpg','290-5.jpg'],
    name: { fr: 'Canne à glace 2 scions (hiver)', en: 'Double-Tip Ice Fishing Rod', es: 'Caña de hielo 2 punteras (invierno)' },
    desc: { fr: 'Deux scions de sensibilité différente.', en: 'Two tips of different sensitivity.', es: 'Dos punteras de distinta sensibilidad.' },
    long: {
      fr: "Canne à glace livrée avec deux scions interchangeables de sensibilité différente : un fin pour détecter les touches les plus discrètes, un plus puissant pour les poissons plus combatifs. Manche liège confortable, scions colorés bien visibles sur la glace. Compacte et légère. Idéale pour la perche, le doré et la truite l'hiver.",
      en: "Ice fishing rod supplied with two interchangeable tips of different sensitivity: a fine one to detect the subtlest bites, a stronger one for harder-fighting fish. Comfortable cork handle, brightly coloured tips easy to see on the ice. Compact and light. Ideal for perch, walleye and trout in winter.",
      es: "Caña de hielo con dos punteras intercambiables de distinta sensibilidad: una fina para detectar las picadas más discretas, otra más potente para peces más combativos. Mango de corcho cómodo, punteras de colores bien visibles sobre el hielo. Compacta y ligera. Ideal para perca, lucioperca y trucha en invierno." }
  },
  {
    id: 'cj-291', category: 'rods', rating: 4.6, reviews: null, badge: null, sku: 'CJDY165791301AZ',
    variants: [
      { label: '2,7-3,6 m', usd: 10.25, ship: 5.72 }, { label: '4,5-5,4 m', usd: 16.17, ship: 5.72 },
      { label: '6,3-7,2 m', usd: 23.60, ship: 5.72 }, { label: '8,1-9,0 m', usd: 31.02, ship: 5.72 }
    ],
    photos: ['291-1.jpg','291-2.jpg','291-3.jpg','291-4.jpg','291-5.jpg'],
    name: { fr: 'Canne télescopique carbone super-rigide 28T (au coup)', en: 'Super-Hard Carbon Telescopic Pole 28T', es: 'Caña telescópica carbono super rígida 28T' },
    desc: { fr: 'Très rigide et légère, plusieurs longueurs.', en: 'Very stiff and light, several lengths.', es: 'Muy rígida y ligera, varias longitudes.' },
    long: {
      fr: "Canne télescopique en carbone super-rigide (action 28 brins) pour la pêche au coup des poissons puissants. Très légère et nerveuse, elle bride vite le poisson malgré la longueur et se replie très court pour le transport. Disponible dans de nombreuses longueurs (2,7 à 9,0 m) : le tarif augmente avec la longueur.",
      en: "Super-hard carbon telescopic pole (28-section action) for coarse fishing of powerful fish. Very light and crisp, it quickly turns the fish despite the length and collapses very short for transport. Available in many lengths (2.7 to 9.0 m): the price rises with length.",
      es: "Caña telescópica de carbono super rígido (acción 28 tramos) para la pesca al coup de peces potentes. Muy ligera y nerviosa, domina rápido al pez pese a la longitud y se pliega muy corta para el transporte. Disponible en muchas longitudes (2,7 a 9,0 m): el precio sube con la longitud." }
  },
  {
    id: 'cj-292', category: 'lures', usd: 9.99, ship: 7.24, rating: 4.6, reviews: null, badge: null, sku: 'CJYE130014202BY',
    photos: ['292-1.jpg','292-2.jpg','292-3.jpg','292-4.jpg','292-5.jpg'],
    name: { fr: 'Coffret 100 mouches (20 coloris)', en: '100-Fly Box (20 colours)', es: 'Set de 100 moscas (20 colores)' },
    desc: { fr: '100 mouches assorties dans une boîte.', en: '100 assorted flies in a box.', es: '100 moscas surtidas en una caja.' },
    long: {
      fr: "Grand coffret de 100 mouches de pêche en 20 coloris : mouches sèches, noyées et imitations papillon aux teintes vives, rangées dans une boîte aimantée qui les protège et les présente bien. De quoi t'adapter à toutes les éclosions et toutes les truites. Idéal pour débuter la pêche à la mouche ou enrichir ta collection à petit prix.",
      en: "Large box of 100 fishing flies in 20 colours: dry flies, wet flies and butterfly imitations in bright shades, stored in a magnetic box that protects and displays them. Enough to match every hatch and every trout. Ideal to start fly fishing or grow your collection cheaply.",
      es: "Gran set de 100 moscas de pesca en 20 colores: moscas secas, ahogadas e imitaciones de mariposa en tonos vivos, guardadas en una caja magnética que las protege y las presenta bien. Suficiente para adaptarte a toda eclosión y toda trucha. Ideal para empezar la pesca con mosca o ampliar tu colección a bajo precio." }
  },
  {
    id: 'cj-294', category: 'reels', usd: 23.55, ship: 8.18, rating: 4.7, reviews: null, badge: null, sku: 'CJDY173109601AZ',
    photos: ['294-1.jpg','294-2.jpg','294-3.jpg','294-4.jpg','294-5.jpg'],
    name: { fr: 'Moulinet casting bas profil carbone (gaucher/droitier)', en: 'Low-Profile Carbon Baitcasting Reel (left/right)', es: 'Carrete casting bajo perfil carbono (zurdo/diestro)' },
    desc: { fr: 'Léger, puissant, frein anti-perruque.', en: 'Light, powerful, anti-backlash brake.', es: 'Ligero, potente, freno anti-cabellera.' },
    long: {
      fr: "Moulinet casting (baitcasting) bas profil à carter carbone, léger et confortable en main pour pêcher aux leurres toute la journée. Frein double (magnétique + centrifuge) qui limite les « perruques » et donne des lancers précis. Récupération rapide et puissante, parfait pour le brochet, le black-bass et le silure. Disponible en main gauche ou main droite.",
      en: "Low-profile baitcasting reel with a carbon frame, light and comfortable in hand for all-day lure fishing. Dual brake (magnetic + centrifugal) that limits backlash and gives accurate casts. Fast, powerful retrieve, perfect for pike, bass and catfish. Available in left- or right-hand.",
      es: "Carrete casting (baitcasting) de bajo perfil con carcasa de carbono, ligero y cómodo en mano para pescar con señuelos todo el día. Freno doble (magnético + centrífugo) que limita las «cabelleras» y da lanzados precisos. Recogida rápida y potente, perfecto para lucio, black-bass y siluro. Disponible en zurdo o diestro." }
  },
  {
    id: 'cj-295', category: 'gear', usd: 1.65, ship: 5.20, rating: 4.5, reviews: null, badge: null, sku: 'CJDY1932181',
    photos: ['295-1.jpg','295-2.jpg','295-3.jpg','295-4.jpg','295-5.jpg'],
    name: { fr: 'Outil carpe multifonction (perçoir + aiguille)', en: 'Carp Bait Drill & Needle Tool', es: 'Herramienta carpa (taladro + aguja)' },
    desc: { fr: 'Perce les bouillettes et passe le fil.', en: 'Drills boilies and threads the line.', es: 'Perfora boilies y pasa el hilo.' },
    long: {
      fr: "Petit outil multifonction pour la pêche de la carpe : une pointe pour percer les bouillettes et appâts durs, un crochet/aiguille pour enfiler le cheveu, le tout sur une poignée ergonomique antidérapante. Compact et léger, il se glisse dans la boîte à accessoires. Indispensable pour préparer tes montages au cheveu.",
      en: "Small multi-tool for carp fishing: a point to drill boilies and hard baits, a hook/needle to thread the hair rig, all on an ergonomic non-slip handle. Compact and light, it slips into your tackle box. A must to prepare your hair rigs.",
      es: "Pequeña herramienta multifunción para la pesca de carpa: una punta para perforar boilies y cebos duros, un gancho/aguja para pasar el pelo del montaje, todo en un mango ergonómico antideslizante. Compacta y ligera, cabe en tu caja de accesorios. Imprescindible para preparar tus montajes al pelo." }
  },
  {
    id: 'cj-296', category: 'rods', usd: 5.95, ship: 6.78, rating: 4.6, reviews: null, badge: 'best', sku: 'CJYD193150201AZ',
    photos: ['296-1.jpg','296-2.jpg','296-3.jpg','296-4.jpg','296-5.jpg'],
    name: { fr: 'Ensemble pêche au radeau (canne + moulinet + leurres + sac)', en: 'Raft Fishing Combo (rod + reel + lures + bag)', es: 'Combo pesca en balsa (caña + carrete + señuelos + bolsa)' },
    desc: { fr: 'Kit complet prêt à pêcher, avec housse.', en: 'Complete ready-to-fish kit, with bag.', es: 'Kit completo listo para pescar, con bolsa.' },
    long: {
      fr: "Ensemble complet de pêche au radeau / au coup léger : canne courte, petit moulinet à tambour frontal, jeu de leurres souples et housse de transport. Idéal pour la pêche fine des petits carnassiers et poissons blancs depuis un ponton, une barque ou la berge. Parfait pour débuter avec tout en main.",
      en: "Complete raft / light fishing set: short rod, small front-wheel drum reel, a set of soft lures and a carry bag. Ideal for finesse fishing of small predators and silver fish from a dock, a dinghy or the bank. Perfect to start out with everything in one kit.",
      es: "Equipo completo de pesca en balsa / pesca ligera: caña corta, pequeño carrete de tambor frontal, juego de vinilos y bolsa de transporte. Ideal para la pesca fina de pequeños depredadores y peces blancos desde un pantalán, una barca o la orilla. Perfecto para empezar con todo a mano." }
  },
  {
    id: 'cj-297', category: 'lures', usd: 0.52, ship: 5.95, rating: 4.6, reviews: null, badge: null, sku: 'CJYE121946211KP',
    photos: ['297-1.jpg','297-2.jpg','297-3.jpg','297-4.jpg','297-5.jpg'],
    name: { fr: 'Jig casting métal lamé (7-30 g)', en: 'Metal Casting Jig (7-30 g)', es: 'Jig metálico casting (7-30 g)' },
    desc: { fr: 'Lance loin, descend vite, coloris flashy.', en: 'Casts far, sinks fast, flashy colours.', es: 'Lanza lejos, baja rápido, colores flashy.' },
    long: {
      fr: "Jig métallique lamé pour la pêche en mer du bord ou en bateau. Compact et dense, il se lance très loin et coule vite vers les poissons actifs (maquereau, bar, lieu). Reflets brillants façon poisson fourrage qui déclenchent l'attaque. Disponible en plusieurs poids (7 à 30 g) et coloris, monté ou à équiper.",
      en: "Lamé metal jig for sea fishing from shore or boat. Compact and dense, it casts very far and sinks fast to active fish (mackerel, bass, pollock). Bright baitfish-style flash that triggers strikes. Available in several weights (7 to 30 g) and colours, rigged or to set up.",
      es: "Jig metálico para la pesca en mar desde costa o barco. Compacto y denso, se lanza muy lejos y baja rápido hacia los peces activos (caballa, lubina, abadejo). Destellos brillantes tipo pez forraje que provocan el ataque. Disponible en varios pesos (7 a 30 g) y colores, montado o por equipar." }
  },
  {
    id: 'cj-298', category: 'gear', usd: 4.00, ship: 6.32, rating: 4.5, reviews: null, badge: null, sku: 'CJDY154898601AZ',
    photos: ['298-1.jpg','298-2.jpg','298-3.jpg','298-4.jpg','298-5.jpg'],
    name: { fr: 'Coffret 80 anneaux de canne (réparation)', en: 'Rod Guide Ring Repair Kit (80 pcs)', es: 'Kit 80 anillas de caña (reparación)' },
    desc: { fr: 'Anneaux de rechange toutes tailles, en boîte.', en: 'Spare guides, all sizes, boxed.', es: 'Anillas de repuesto, todas las tallas, en caja.' },
    long: {
      fr: "Coffret de 80 anneaux (guides) de canne de différentes tailles (Ø 1,5 à 3,5) pour réparer ou monter tes cannes à pêche. Cadre inox et insert qui préserve le fil. Rangés dans une boîte compartimentée bien pratique. De quoi dépanner toutes tes cannes en mer comme en eau douce.",
      en: "Boxed set of 80 rod guides in various sizes (Ø 1.5 to 3.5) to repair or build your fishing rods. Stainless frame and insert that protects the line. Stored in a handy compartment box. Everything to fix all your rods, in salt or fresh water.",
      es: "Estuche de 80 anillas (guías) de caña de diferentes tallas (Ø 1,5 a 3,5) para reparar o montar tus cañas de pescar. Marco inox e inserto que protege el hilo. Guardadas en una práctica caja con compartimentos. Para arreglar todas tus cañas en mar y agua dulce." }
  },
  {
    id: 'cj-299', category: 'reels', rating: 4.5, reviews: null, badge: null, sku: 'CJYD177930501AZ',
    variants: [
      { label: 'GX1000', usd: 6.52, ship: 10.40 }, { label: 'GX2000', usd: 6.80, ship: 10.40 },
      { label: 'GX3000', usd: 7.09, ship: 10.40 }, { label: 'GX4000', usd: 7.38, ship: 10.40 },
      { label: 'GX5000', usd: 7.67, ship: 10.40 }, { label: 'GX6000', usd: 7.96, ship: 10.40 },
      { label: 'GX7000', usd: 8.25, ship: 10.40 }
    ],
    photos: ['299-1.jpg','299-2.jpg','299-3.jpg','299-4.jpg','299-5.jpg'],
    name: { fr: 'Moulinet spinning métal GX (1000 à 7000)', en: 'Metal Spinning Reel GX (1000 to 7000)', es: 'Carrete spinning metal GX (1000 a 7000)' },
    desc: { fr: 'Corps métal + carbone, double roulement.', en: 'Metal + carbon body, double bearing.', es: 'Cuerpo metal + carbono, doble rodamiento.' },
    long: {
      fr: "Moulinet spinning à corps métal et pièces carbone, double roulement pour une récupération douce. Frein avant progressif et bobine de rechange. Polyvalent, il se décline du GX1000 (pêche fine) au GX7000 (mer, gros poissons). Solide et fiable, un excellent choix pour t'équiper sans te ruiner.",
      en: "Spinning reel with a metal body and carbon parts, double bearing for a smooth retrieve. Progressive front drag and spare spool. Versatile, it ranges from GX1000 (finesse) to GX7000 (sea, big fish). Solid and reliable, a great choice to gear up without breaking the bank.",
      es: "Carrete spinning con cuerpo de metal y piezas de carbono, doble rodamiento para una recogida suave. Freno delantero progresivo y bobina de repuesto. Versátil, va del GX1000 (pesca fina) al GX7000 (mar, peces grandes). Sólido y fiable, una excelente opción para equiparte sin arruinarte." }
  },
  {
    id: 'cj-300', category: 'lures', usd: 1.89, ship: 6.30, rating: 4.5, reviews: null, badge: null, sku: 'CJYE140827701AZ',
    photos: ['300-1.jpg','300-2.jpg','300-3.jpg','300-4.jpg','300-5.jpg'],
    name: { fr: 'Lot de 5 leurres de surface (poppers/stickbaits)', en: 'Set of 5 Topwater Lures', es: 'Lote de 5 señuelos de superficie' },
    desc: { fr: '5 leurres flottants prêts à pêcher.', en: '5 floating lures, ready to fish.', es: '5 señuelos flotantes listos para pescar.' },
    long: {
      fr: "Lot de 5 leurres de surface durs (poppers / stickbaits) aux coloris variés. Flottants, ils créent des éclaboussures et un bruit qui attirent les carnassiers en chasse près de la surface (perche, brochet, bar). Équipés d'hameçons triples. Un assortiment complet pour varier les animations.",
      en: "Set of 5 hard topwater lures (poppers / stickbaits) in assorted colours. Floating, they create splashes and noise that draw predators hunting near the surface (perch, pike, bass). Fitted with treble hooks. A complete assortment to vary your retrieves.",
      es: "Lote de 5 señuelos de superficie duros (poppers / stickbaits) en colores variados. Flotantes, crean salpicaduras y ruido que atraen a los depredadores que cazan cerca de la superficie (perca, lucio, lubina). Equipados con anzuelos triples. Un surtido completo para variar las animaciones." }
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
