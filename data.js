/* ============================================================
   BJMordix — Données produits
   ------------------------------------------------------------
   Prix : usd = coût du produit en USD, ship = frais de port en USD.
   Prix de vente = (usd x MARKUP + ship) x taux. La marge x3 ne touche
   QUE le produit, jamais les frais de port.
   Chaque produit a un tableau `photos` (galerie) ; la 1ʳᵉ photo
   sert d'image principale. Mets tes photos dans le dossier  photos/.
   ============================================================ */

const MARKUP = 3;        // tous les prix x3
const USD_TO_CAD = 1.37; // taux USD -> CAD (à ajuster)

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
    id: 'cj-01', category: 'gear', usd: 0.40, ship: 6.02, rating: 4.6, reviews: null, badge: null, sku: 'CJDY111663101AZ',
    photos: ['1-1.jpg','1-2.jpg','1-3.jpg','1-4.jpg','1-5.jpg'],
    name: { fr: 'Hameçon automatique « Magic Hook »', en: 'Automatic Fishing Hook (Magic Hook)', es: 'Anzuelo automático «Magic Hook»' },
    desc: { fr: 'Se ferme tout seul à la touche.', en: 'Sets the hook on its own.', es: 'Se clava solo en la picada.' },
    long: {
      fr: "Hameçon « magique » à ressort qui se referme automatiquement dès qu'un poisson mord — plus besoin de ferrer au bon moment. En métal inoxydable, idéal pour la pêche posée à plusieurs cannes ou quand on s'éloigne un instant. Un petit gadget malin et redoutablement efficace.",
      en: "Spring-loaded 'magic' hook that closes automatically the moment a fish bites — no need to time your strike. Stainless metal, ideal for still fishing with several rods or when you step away. A clever, deadly-effective little gadget.",
      es: "Anzuelo «mágico» con resorte que se cierra automáticamente en cuanto un pez muerde — sin necesidad de clavar en el momento justo. Metal inoxidable, ideal para la pesca al fondo con varias cañas o cuando te alejas un momento. Un accesorio ingenioso y muy eficaz." }
  },
  {
    id: 'cj-02', category: 'lures', usd: 0.59, ship: 5.20, rating: 4.5, reviews: null, badge: 'new', sku: 'CJYE107522801AZ',
    variants: [
      { label: 'N°10', usd: 0.59 }, { label: 'N°12', usd: 0.59 }, { label: 'N°14', usd: 0.59 },
      { label: 'N°16', usd: 0.59 }, { label: 'N°18', usd: 0.59 }, { label: 'N°20', usd: 0.59 }
    ],
    photos: ['2-1.jpg','2-2.jpg','2-3.jpg','2-4.jpg','2-5.jpg'],
    name: { fr: 'Leurre mouche larve / asticot', en: 'Maggot / Grub Fly Lure', es: 'Señuelo mosca larva / gusano' },
    desc: { fr: 'Imitation d\'asticot, plusieurs tailles d\'hameçon.', en: 'Maggot imitation, several hook sizes.', es: 'Imitación de gusano, varias tallas de anzuelo.' },
    long: {
      fr: "Imitation ultra-réaliste d'asticot/larve montée sur hameçon, parfaite pour la truite, le gardon et la pêche fine en mouche. Sa silhouette et sa souplesse déclenchent les touches même sur les poissons méfiants. Disponible en plusieurs tailles d'hameçon (10 à 20).",
      en: "Ultra-realistic maggot/grub imitation tied on a hook, perfect for trout, roach and finesse fly fishing. Its lifelike shape and softness trigger bites even from wary fish. Available in several hook sizes (10 to 20).",
      es: "Imitación ultrarrealista de gusano/larva montada en anzuelo, perfecta para trucha, gobio y pesca fina con mosca. Su silueta y flexibilidad provocan picadas incluso en peces desconfiados. Disponible en varias tallas de anzuelo (10 a 20)." }
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
    id: 'cj-06', category: 'reels', usd: 6.77, ship: 6.92, rating: 4.6, reviews: null, badge: null, sku: 'CJDY110078303CX',
    photos: ['6-1.jpg','6-2.jpg','6-4.jpg','6-5.jpg','6-6.jpg'],
    name: { fr: 'Moulinet rond Leiqiang AM2000', en: 'Leiqiang Round Reel AM2000', es: 'Carrete redondo Leiqiang AM2000' },
    desc: { fr: 'Moulinet rond métal, gaucher/droitier.', en: 'Round metal reel, left/right hand.', es: 'Carrete redondo metálico, zurdo/diestro.' },
    long: {
      fr: "Moulinet rond robuste au corps métallique, à la mécanique fluide et au frein progressif. Sa conception ronde offre une grande capacité de fil et une récupération régulière, idéale pour la traîne et la pêche au posé. Disponible en versions gaucher et droitier.",
      en: "Sturdy round reel with a metal body, smooth mechanics and a progressive drag. Its round design offers high line capacity and a steady retrieve, ideal for trolling and still fishing. Available in left- and right-hand versions.",
      es: "Carrete redondo robusto con cuerpo metálico, mecánica suave y freno progresivo. Su diseño redondo ofrece gran capacidad de hilo y recogida regular, ideal para curricán y pesca al fondo. Disponible en versiones zurda y diestra." }
  },
  {
    id: 'cj-07', category: 'gear', usd: 1.26, ship: 5.25, rating: 4.6, reviews: null, badge: null, sku: 'CJYD271797702BY',
    variants: [
      { label: '0.4', usd: 1.26 }, { label: '0.6', usd: 1.26 }, { label: '1.0', usd: 1.26 }, { label: '2.0', usd: 1.26 },
      { label: '3.0', usd: 1.26 }, { label: '4.0', usd: 1.26 }, { label: '5.0', usd: 1.26 }
    ],
    photos: ['7-1.jpeg','7-2.jpeg','7-3.jpeg','7-4.jpeg','7-5.jpeg'],
    name: { fr: 'Tresse PE « Power Strong » (300 m)', en: 'PE Braided Line "Power Strong" (300 m)', es: 'Trenzado PE «Power Strong» (300 m)' },
    desc: { fr: 'Tresse fine et ultra-résistante, plusieurs diamètres.', en: 'Thin, ultra-strong braid, several diameters.', es: 'Trenzado fino y ultrarresistente, varios diámetros.' },
    long: {
      fr: "Tresse de pêche en fibres PE, fine et ultra-résistante pour une sensibilité maximale et des lancers longue distance. Quasiment sans élasticité : tu sens la moindre touche et le ferrage est instantané. Disponible en plusieurs diamètres (0,4 à 5,0). Idéale au leurre comme à la carpe.",
      en: "PE-fibre braided line, thin and ultra-strong for maximum sensitivity and long-distance casts. Almost no stretch: you feel the smallest bite and the hookset is instant. Available in several diameters (0.4 to 5.0). Great for lure and carp fishing.",
      es: "Trenzado de pesca de fibras PE, fino y ultrarresistente para máxima sensibilidad y lanzados a larga distancia. Casi sin elasticidad: notas la mínima picada y la clavada es instantánea. Disponible en varios diámetros (0,4 a 5,0). Ideal para señuelo y carpa." }
  },
  {
    id: 'cj-08', category: 'gear', usd: 2.46, ship: 6.62, rating: 4.5, reviews: null, badge: null, sku: 'CJYD191237403CX',
    photos: ['8-1.jpg','8-2.jpg','8-3.jpg','8-4.jpg','8-5.jpg'],
    name: { fr: 'Support de canne pliable (pêche sur glace)', en: 'Foldable Rod Bracket (ice fishing)', es: 'Soporte de caña plegable (pesca en hielo)' },
    desc: { fr: 'Trépied pliable, garde les mains libres.', en: 'Foldable tripod, keeps hands free.', es: 'Trípode plegable, manos libres.' },
    long: {
      fr: "Support de canne pliable à trépied, pensé pour la pêche sur glace et la pêche au posé. Léger et stable, il maintient ta canne prête à ferrer pendant que tu gardes les mains libres. Se replie en un instant pour tenir dans le sac. Plusieurs formats disponibles.",
      en: "Foldable tripod rod bracket, designed for ice fishing and still fishing. Light and stable, it holds your rod ready to strike while keeping your hands free. Folds away in a second to fit in your bag. Several formats available.",
      es: "Soporte de caña plegable tipo trípode, pensado para la pesca en hielo y al fondo. Ligero y estable, sujeta tu caña lista para clavar mientras tienes las manos libres. Se pliega en un instante para caber en la bolsa. Varios formatos disponibles." }
  },
  {
    id: 'cj-09', category: 'reels', usd: 12.82, ship: 7.05, rating: 4.7, reviews: null, badge: 'best', sku: 'CJYD189446803CX',
    variants: [
      { label: 'Gaucher jaune', usd: 12.82 }, { label: 'Droitier gris', usd: 12.82 }, { label: 'Droitier jaune', usd: 12.82 }
    ],
    photos: ['9-1.jpg','9-2.jpg','9-3.jpg','9-4.jpg','9-5.jpg'],
    name: { fr: 'Moulinet casting frein magnétique 2000', en: 'Magnetic Brake Baitcasting Reel 2000', es: 'Carrete casting freno magnético 2000' },
    desc: { fr: 'Casting basse profile, frein magnétique réglable.', en: 'Low-profile baitcaster, adjustable magnetic brake.', es: 'Casting bajo perfil, freno magnético ajustable.' },
    long: {
      fr: "Moulinet casting (baitcasting) basse profile à frein magnétique réglable pour des lancers précis et sans perruque. Mécanique fluide, récupération rapide, idéal pour la pêche du carnassier au leurre dur et en bord de mer. Disponible gaucher ou droitier, coloris jaune ou gris.",
      en: "Low-profile baitcasting reel with an adjustable magnetic brake for precise, backlash-free casts. Smooth mechanics, fast retrieve, ideal for hard-lure predator fishing and the coast. Available left- or right-hand, in yellow or grey.",
      es: "Carrete casting (baitcasting) de perfil bajo con freno magnético ajustable para lanzados precisos y sin cabelleras. Mecánica suave, recogida rápida, ideal para la pesca de depredadores a señuelo duro y en la costa. Disponible zurdo o diestro, en amarillo o gris." }
  },
  {
    id: 'cj-11', category: 'lures', usd: 9.68, ship: 6.54, rating: 4.7, reviews: null, badge: null, sku: 'CJYD180552909IR',
    photos: ['11-1.jpg','11-2.jpg','11-3.jpg','11-4.jpg','11-5.jpg'],
    name: { fr: 'Stickbait coulant NBL9062 180 mm', en: 'Sinking Pencil Stickbait NBL9062 180 mm', es: 'Stickbait hundido NBL9062 180 mm' },
    desc: { fr: 'Lesté, lancer très longue distance, mer.', en: 'Weighted, very long casts, sea.', es: 'Lastrado, lanzados muy largos, mar.' },
    long: {
      fr: "Stickbait (pencil) coulant de 180 mm au lest interne décentré, conçu pour des lancers à très longue distance face au vent. Sa nage piquée et erratique imite un poisson en fuite et déclenche les chasses en mer (bar, bonite, pélagiques). Hameçons triples renforcés. De nombreux coloris au choix.",
      en: "180 mm sinking pencil stickbait with an offset internal weight, built for very long casts into the wind. Its darting, erratic action mimics a fleeing baitfish and triggers feeding frenzies at sea (bass, bonito, pelagics). Reinforced treble hooks. Many colours to choose from.",
      es: "Stickbait (pencil) hundido de 180 mm con lastre interno descentrado, diseñado para lanzados muy largos contra el viento. Su nado errático imita a un pez en fuga y desata las cacerías en el mar (lubina, bonito, pelágicos). Anzuelos triples reforzados. Muchos colores a elegir." }
  },
  {
    id: 'cj-12', category: 'lures', usd: 0.63, ship: 5.20, rating: 4.6, reviews: null, badge: 'new', sku: 'CJYD176812901AZ',
    photos: ['12-1.jpg','12-2.jpg','12-3.jpg','12-4.jpg','12-5.jpg'],
    name: { fr: 'Poisson nageur Minnow 165 mm (multi-coloris)', en: 'Minnow Hard Lure 165 mm (multi-colour)', es: 'Pez nadador Minnow 165 mm (multicolor)' },
    desc: { fr: 'Nage réaliste, nombreux coloris.', en: 'Realistic swim, many colours.', es: 'Nado realista, muchos colores.' },
    long: {
      fr: "Poisson nageur (minnow) de 165 mm à la nage roulante très réaliste. Bavette plongeante, finition détaillée et hameçons triples affûtés pour ferrer les carnassiers (brochet, perche, bar). Disponible dans une large gamme de coloris flashy ou naturels.",
      en: "165 mm minnow hard lure with a very realistic rolling swim. Diving lip, detailed finish and sharp treble hooks to hook predators (pike, perch, bass). Available in a wide range of bright or natural colours.",
      es: "Pez nadador (minnow) de 165 mm con un nado rodante muy realista. Babero buceador, acabado detallado y anzuelos triples afilados para clavar depredadores (lucio, perca, lubina). Disponible en una amplia gama de colores llamativos o naturales." }
  },
  {
    id: 'cj-13', category: 'gear', usd: 0.75, ship: 5.20, rating: 4.4, reviews: null, badge: null, sku: 'CJDY186971501AZ',
    photos: ['13-1.jpg','13-2.jpg','13-3.jpg','13-4.jpg','13-5.jpg'],
    name: { fr: 'Planchettes range-bas-de-ligne (mousse)', en: 'Foam Rig / Line Winding Boards', es: 'Tablillas enrolla-líneas (espuma)' },
    desc: { fr: 'Range fils et bas de ligne sans nœuds.', en: 'Store rigs and line tangle-free.', es: 'Guarda líneas y bajos sin enredos.' },
    long: {
      fr: "Planchettes en mousse EVA crantées pour enrouler et ranger tes bas de ligne, montages et fils sans les emmêler. Légères, flottantes et increvables, elles se glissent dans la boîte ou la poche. Indispensables pour garder des montages prêts à l'emploi. Coloris assortis envoyés au hasard.",
      en: "Notched EVA-foam boards to wind and store your rigs, leaders and line without tangles. Light, floating and indestructible, they slip into a box or pocket. A must to keep ready-to-use rigs. Assorted colours sent at random.",
      es: "Tablillas de espuma EVA con muescas para enrollar y guardar tus bajos de línea, montajes e hilos sin enredos. Ligeras, flotantes e indestructibles, caben en una caja o bolsillo. Imprescindibles para tener montajes listos. Colores surtidos al azar." }
  },
  {
    id: 'cj-14', category: 'lures', usd: 3.51, ship: 6.78, rating: 4.6, reviews: null, badge: 'new', sku: 'CJDY180598007GT',
    photos: ['14-1.jpg','14-2.jpg','14-3.jpg','14-4.jpg','14-5.jpg'],
    name: { fr: 'Lot de leurres durs 85 mm (assortiment)', en: 'Hard Lure Set 85 mm (assortment)', es: 'Lote de señuelos duros 85 mm (surtido)' },
    desc: { fr: 'Assortiment de poissons nageurs colorés.', en: 'Assortment of colourful hard lures.', es: 'Surtido de peces nadadores de colores.' },
    long: {
      fr: "Lot de poissons nageurs (crankbaits/minnows) de 85 mm dans un assortiment de coloris variés, naturels et flashy. De quoi couvrir toutes les conditions et toutes les humeurs du poisson avec une seule boîte. Hameçons triples montés. Idéal pour débuter ou compléter sa boîte à carnassiers.",
      en: "Set of 85 mm hard lures (crankbaits/minnows) in an assortment of natural and bright colours. Enough to cover every condition and mood with a single box. Treble hooks fitted. Ideal to start out or round out your predator box.",
      es: "Lote de peces nadadores (crankbaits/minnows) de 85 mm en un surtido de colores naturales y llamativos. Suficiente para cubrir todas las condiciones con una sola caja. Anzuelos triples montados. Ideal para empezar o completar tu caja de depredadores." }
  },
  {
    id: 'cj-15', category: 'reels', usd: 4.56, ship: 7.71, rating: 4.5, reviews: null, badge: null, sku: 'CJYD153761701AZ',
    photos: ['15-2.jpg','15-3.jpg','15-4.jpg','15-5.jpg','15-6.jpg'],
    name: { fr: 'Moulinet spinning métal AC (2000-7000)', en: 'Metal Spinning Reel AC (2000-7000)', es: 'Carrete spinning metal AC (2000-7000)' },
    desc: { fr: 'Tout métal, fluide, plusieurs tailles.', en: 'All-metal, smooth, several sizes.', es: 'Todo metal, suave, varias tallas.' },
    long: {
      fr: "Moulinet spinning au corps et aux engrenages métalliques, robuste et fluide. Bobine métal, anti-retour instantané et frein avant réglable. Polyvalent du coup au leurre, en eau douce comme en mer. Disponible en plusieurs tailles (AC2000 à AC7000) selon la pêche visée.",
      en: "Spinning reel with a metal body and gears, sturdy and smooth. Metal spool, instant anti-reverse and adjustable front drag. Versatile from float to lure fishing, in fresh or salt water. Available in several sizes (AC2000 to AC7000) to match your target.",
      es: "Carrete spinning con cuerpo y engranajes metálicos, robusto y suave. Bobina de metal, antirretorno instantáneo y freno frontal ajustable. Versátil del corcho al señuelo, en agua dulce o salada. Disponible en varias tallas (AC2000 a AC7000) según la pesca." }
  },
  {
    id: 'cj-16', category: 'gear', usd: 0.78, ship: 6.32, rating: 4.4, reviews: null, badge: null, sku: 'CJDY109223101AZ',
    variants: [
      { label: '0.4', usd: 0.78 }, { label: '0.6', usd: 0.78 }, { label: '0.8', usd: 0.78 }, { label: '1.0', usd: 0.78 },
      { label: '1.2', usd: 0.78 }, { label: '1.5', usd: 0.78 }, { label: '2.0', usd: 0.78 }, { label: '2.5', usd: 0.78 },
      { label: '3.0', usd: 0.78 }, { label: '4.0', usd: 0.78 }, { label: '5.0', usd: 0.78 }, { label: '6.0', usd: 0.78 }
    ],
    photos: ['16-1.jpg','16-2.jpg','16-3.jpg','16-4.jpg','16-5.jpg'],
    name: { fr: 'Fil nylon « Super » (revêtement fluoro)', en: 'Nylon "Super" Line (fluoro-coated)', es: 'Hilo nailon «Super» (recubrimiento fluoro)' },
    desc: { fr: 'Monofilament résistant, nombreux diamètres.', en: 'Strong mono, many diameters.', es: 'Monofilamento resistente, muchos diámetros.' },
    long: {
      fr: "Fil monofilament nylon « Super » à revêtement fluorocarbone, résistant et discret dans l'eau. Bonne tenue à l'abrasion et au nœud, élasticité maîtrisée pour amortir les coups de tête. Disponible dans de très nombreux diamètres. Polyvalent en eau douce comme en mer.",
      en: "'Super' nylon monofilament with a fluorocarbon coating, strong and discreet in the water. Good abrasion and knot strength, controlled stretch to cushion head-shakes. Available in many diameters. Versatile for fresh and salt water.",
      es: "Hilo monofilamento de nailon «Super» con recubrimiento de fluorocarbono, resistente y discreto en el agua. Buena resistencia a la abrasión y al nudo, elasticidad controlada. Disponible en muchos diámetros. Versátil en agua dulce y salada." }
  },
  {
    id: 'cj-17', category: 'rods', usd: 3.60, ship: 6.02, rating: 4.6, reviews: null, badge: null, sku: 'CJDY165866901AZ',
    photos: ['17-1.jpg','17-2.jpg','17-3.jpg','17-4.jpg','17-5.jpg'],
    name: { fr: 'Mini canne à glace bois (30-60 cm)', en: 'Wooden Ice Fishing Rod (30-60 cm)', es: 'Mini caña de hielo de madera (30-60 cm)' },
    desc: { fr: 'Compacte, poignée bois, plusieurs longueurs.', en: 'Compact, wood handle, several lengths.', es: 'Compacta, mango de madera, varias longitudes.' },
    long: {
      fr: "Petite canne à pêche sur glace à poignée en bois verni, élégante et chaleureuse en main même par grand froid. Légère et sensible pour détecter les touches discrètes sous la glace. Compacte, elle se range partout. Disponible en plusieurs longueurs (30 à 60 cm).",
      en: "Small ice fishing rod with a varnished wooden handle, elegant and warm to hold even in the cold. Light and sensitive to detect subtle bites under the ice. Compact and easy to store. Available in several lengths (30 to 60 cm).",
      es: "Pequeña caña de pesca en hielo con mango de madera barnizada, elegante y cálida en la mano incluso con frío. Ligera y sensible para detectar picadas sutiles bajo el hielo. Compacta y fácil de guardar. Disponible en varias longitudes (30 a 60 cm)." }
  },
  {
    id: 'cj-18', category: 'gear', usd: 3.92, ship: 6.99, rating: 4.6, reviews: null, badge: null, sku: 'CJDY176523302BY',
    photos: ['18-1.jpg','18-2.jpg','18-3.jpg','18-4.jpg','18-5.jpg'],
    name: { fr: 'Pince coupe-fil de pêche X45D', en: 'Fishing Cable Cutter Pliers X45D', es: 'Alicate cortahílos de pesca X45D' },
    desc: { fr: 'Coupe tresse et câble, poignée antidérapante.', en: 'Cuts braid and cable, non-slip grip.', es: 'Corta trenzado y cable, mango antideslizante.' },
    long: {
      fr: "Pince de pêche robuste qui tranche net la tresse, le nylon et même le câble acier. Mâchoires renforcées, poignée caoutchoutée antidérapante et ressort de rappel pour une prise en main confortable. L'outil costaud à garder dans le gilet pour décrocher, sertir et couper en mer.",
      en: "Sturdy fishing pliers that cleanly cut braid, nylon and even steel cable. Reinforced jaws, non-slip rubberised grip and a return spring for comfortable handling. The tough tool to keep in your vest to unhook, crimp and cut at sea.",
      es: "Alicate de pesca robusto que corta limpio el trenzado, el nailon e incluso el cable de acero. Mandíbulas reforzadas, mango engomado antideslizante y muelle de retorno para un manejo cómodo. La herramienta resistente para desanzuelar, engarzar y cortar en el mar." }
  },
  {
    id: 'cj-19', category: 'reels', usd: 13.42, ship: 8.37, rating: 4.6, reviews: null, badge: null, sku: 'CJYD201751601AZ',
    photos: ['19-1.jpg','19-2.jpg','19-3.jpg','19-4.jpg','19-5.jpg'],
    name: { fr: 'Moulinet spinning tout métal (2000-5000)', en: 'All-Metal Spinning Reel (2000-5000)', es: 'Carrete spinning todo metal (2000-5000)' },
    desc: { fr: 'Corps métal, frein puissant, plusieurs tailles.', en: 'Metal body, strong drag, several sizes.', es: 'Cuerpo metálico, freno potente, varias tallas.' },
    long: {
      fr: "Moulinet spinning entièrement métallique, robuste et fluide, à la rotation soyeuse et au frein avant puissant. Grande capacité de fil et anti-retour instantané pour ne rien laisser passer. Polyvalent du leurre à la pêche au posé, en eau douce comme en mer. Plusieurs tailles disponibles (2000 à 5000 Series).",
      en: "Fully metal spinning reel, sturdy and smooth, with silky rotation and a powerful front drag. Large line capacity and instant anti-reverse so nothing gets away. Versatile from lure to still fishing, fresh or salt water. Available in several sizes (2000 to 5000 Series).",
      es: "Carrete spinning totalmente metálico, robusto y suave, con rotación sedosa y freno frontal potente. Gran capacidad de hilo y antirretorno instantáneo. Versátil del señuelo a la pesca al fondo, en agua dulce o salada. Disponible en varias tallas (2000 a 5000 Series)." }
  },
  {
    id: 'cj-20', category: 'gear', usd: 0.75, ship: 5.37, rating: 4.4, reviews: null, badge: null, sku: 'CJYD155659501AZ',
    photos: ['20-2.jpg','20-3.jpg','20-4.jpg','20-5.jpg','20-6.jpg'],
    name: { fr: 'Attractant à poissons en spray (30 ml)', en: 'Fish Attractant Spray (30 ml)', es: 'Atrayente de peces en spray (30 ml)' },
    desc: { fr: 'Booster d\'appât pour plus de touches.', en: 'Bait booster for more bites.', es: 'Potenciador de cebo para más picadas.' },
    long: {
      fr: "Spray attractant concentré à pulvériser sur tes leurres, appâts ou amorces pour décupler leur pouvoir attractif. Sa formule stimule l'appétit du poisson et déclenche les touches, même les jours difficiles. Flacon pratique de 30 ml à garder dans le gilet. Pour toutes les pêches, eau douce et mer.",
      en: "Concentrated attractant spray to mist onto your lures, baits or groundbait to boost their pulling power. Its formula stimulates the fish's appetite and triggers bites, even on tough days. Handy 30 ml bottle to keep in your vest. For all kinds of fishing, fresh and salt water.",
      es: "Spray atrayente concentrado para pulverizar sobre señuelos, cebos o engodo y multiplicar su poder de atracción. Su fórmula estimula el apetito del pez y provoca picadas, incluso en días difíciles. Práctico frasco de 30 ml para llevar en el chaleco. Para todo tipo de pesca, agua dulce y mar." }
  },
  {
    id: 'cj-21', category: 'lures', usd: 5.79, ship: 6.17, rating: 4.7, reviews: null, badge: 'best', sku: 'CJYE121976529CX',
    photos: ['21-1.jpg','21-2.jpg','21-3.jpg','21-4.jpg','21-5.jpg'],
    name: { fr: 'Stickbait bois fait main 120 g (mer)', en: 'Handmade Wood Pencil Stickbait 120 g', es: 'Stickbait de madera artesanal 120 g' },
    desc: { fr: 'Gros leurre de surface en bois, plusieurs poids.', en: 'Big wooden topwater lure, several weights.', es: 'Gran señuelo de superficie de madera, varios pesos.' },
    long: {
      fr: "Stickbait (pencil) en bois sculpté à la main, conçu pour la pêche au gros en mer (GT, thon, liche…). Son poids (90 à 140 g) autorise des lancers très longs et une nage glissée « walking the dog » irrésistible en surface. Finition soignée, anneaux et hameçons renforcés pour les combats musclés. Nombreux coloris.",
      en: "Hand-carved wooden pencil stickbait, built for big-game sea fishing (GT, tuna, leerfish…). Its weight (90 to 140 g) allows very long casts and an irresistible 'walking the dog' surface action. Polished finish, reinforced rings and hooks for tough fights. Many colours.",
      es: "Stickbait (pencil) de madera tallado a mano, diseñado para la pesca de altura en el mar (GT, atún, pez limón…). Su peso (90 a 140 g) permite lanzados muy largos y un nado «walking the dog» irresistible en superficie. Acabado cuidado, anillas y anzuelos reforzados. Muchos colores." }
  },
  {
    id: 'cj-22', category: 'gear', usd: 1.19, ship: 5.20, rating: 4.5, reviews: null, badge: null, sku: 'CJDY184328802BY',
    photos: ['22-1.jpg','22-2.jpg','22-3.jpg','22-4.jpg','22-5.jpg'],
    name: { fr: 'Agrafe de largage (pêche à la traîne)', en: 'Downrigger Release Clip (trolling)', es: 'Pinza de suelta (curricán)' },
    desc: { fr: 'Libère la ligne net à la touche.', en: 'Releases the line cleanly on the bite.', es: 'Suelta la línea limpia en la picada.' },
    long: {
      fr: "Agrafe de largage à ressort pour la pêche à la traîne et au downrigger : elle tient ta ligne tendue et la libère net dès qu'un poisson frappe, pour un ferrage direct. Tension réglable, corps plastique résistant à l'eau salée. Disponible par lot de 1, 2 ou 4 pièces.",
      en: "Spring release clip for trolling and downrigger fishing: it holds your line under tension and releases it cleanly the moment a fish strikes, for a direct hookset. Adjustable tension, saltwater-resistant plastic body. Available in packs of 1, 2 or 4.",
      es: "Pinza de suelta con resorte para curricán y downrigger: mantiene tu línea en tensión y la suelta limpiamente en cuanto un pez golpea, para una clavada directa. Tensión ajustable, cuerpo de plástico resistente al agua salada. Disponible en packs de 1, 2 o 4." }
  },
  {
    id: 'cj-23', category: 'gear', usd: 5.34, ship: 13.46, rating: 4.6, reviews: null, badge: null, sku: 'CJYD194424102BY',
    photos: ['23-1.jpg','23-2.jpg','23-3.jpg','23-4.jpg','23-5.jpg'],
    name: { fr: 'Housse / fourreau à cannes (1,16 m)', en: 'Rod Carry Bag / Tube (1.16 m)', es: 'Funda / tubo para cañas (1,16 m)' },
    desc: { fr: 'Transporte et protège tes cannes montées.', en: 'Carry and protect your rigged rods.', es: 'Transporta y protege tus cañas montadas.' },
    long: {
      fr: "Housse cylindrique robuste pour transporter et protéger plusieurs cannes — même montées avec leur moulinet. Tissu épais déperlant, poignées et bandoulière réglable pour l'emporter facilement. Poches pour ranger aussi le petit matériel. Format 1,16 m, coloris vert armée.",
      en: "Sturdy cylindrical bag to carry and protect several rods — even rigged with their reels. Thick water-repellent fabric, handles and an adjustable shoulder strap for easy carrying. Pockets to store small gear too. 1.16 m size, army-green colour.",
      es: "Funda cilíndrica robusta para transportar y proteger varias cañas — incluso montadas con su carrete. Tejido grueso repelente al agua, asas y bandolera ajustable para llevarla fácil. Bolsillos para guardar también material pequeño. Tamaño 1,16 m, color verde militar." }
  },
  {
    id: 'cj-25', category: 'gear', usd: 1.36, ship: 6.13, rating: 4.5, reviews: null, badge: null, sku: 'CJYE258236401AZ',
    photos: ['25-1.jpg'],
    name: { fr: 'Attractant de pêche Kriath (60 ml)', en: 'Kriath Fishing Attractant (60 ml)', es: 'Atrayente de pesca Kriath (60 ml)' },
    desc: { fr: 'Concentré toutes pêches, plus de touches.', en: 'All-purpose concentrate, more bites.', es: 'Concentrado multiusos, más picadas.' },
    long: {
      fr: "Attractant de pêche concentré « toutes pêches » à ajouter sur tes leurres, appâts ou amorces. Son arôme puissant stimule l'appétit du poisson et multiplie les touches, en eau douce comme en mer. Flacon de 60 ml économique : quelques gouttes suffisent. Un coup de pouce simple qui fait souvent la différence.",
      en: "All-purpose concentrated fishing attractant to add to your lures, baits or groundbait. Its powerful scent stimulates the fish's appetite and multiplies bites, in fresh and salt water. Economical 60 ml bottle: a few drops are enough. A simple boost that often makes the difference.",
      es: "Atrayente de pesca concentrado «multiusos» para añadir a tus señuelos, cebos o engodo. Su potente aroma estimula el apetito del pez y multiplica las picadas, en agua dulce y salada. Frasco económico de 60 ml: bastan unas gotas. Un empujón sencillo que muchas veces marca la diferencia." }
  },
  {
    id: 'cj-26', category: 'gear', usd: 16.02, ship: 0, rating: 4.7, reviews: null, badge: 'best', sku: 'CJYE29492970001',
    photos: ['26-1.jpg','26-2.jpg','26-3.jpg','26-4.jpg','26-5.jpg'],
    name: { fr: 'Coffret carpe 328 pièces (expédié USA)', en: 'Carp Tackle Kit 328 pcs (US warehouse)', es: 'Kit de carpa 328 piezas (almacén USA)' },
    desc: { fr: 'Kit carpe complet, livraison rapide & offerte.', en: 'Complete carp kit, fast free shipping.', es: 'Kit de carpa completo, envío rápido y gratis.' },
    long: {
      fr: "Coffret carpe ultra-complet de 328 pièces : émerillons, perles, stop-floats, plombs, aiguilles à bouillette, hameçons et plus encore, triés dans une boîte à compartiments. Expédié depuis un entrepôt aux États-Unis : livraison rapide et offerte ! Idéal pour monter tous tes montages carpe sans rien acheter d'autre.",
      en: "Ultra-complete 328-piece carp kit: swivels, beads, float stops, sinkers, boilie needles, hooks and more, sorted in a compartment box. Shipped from a US warehouse: fast and free delivery! Ideal to tie every carp rig without buying anything else.",
      es: "Kit de carpa ultracompleto de 328 piezas: destorcedores, perlas, topes, plomos, agujas para boilies, anzuelos y más, ordenados en una caja con compartimentos. Enviado desde un almacén en EE. UU.: ¡entrega rápida y gratuita! Ideal para montar todos tus aparejos de carpa sin comprar nada más." }
  },
  {
    id: 'cj-27', category: 'reels', usd: 26.72, ship: 7.27, rating: 4.7, reviews: null, badge: null, sku: 'CJDY166233704DW',
    photos: ['27-1.jpg','27-2.jpg','27-3.jpg','27-4.jpg','27-5.jpg'],
    name: { fr: 'Moulinet spinning longue distance (mer/rocher)', en: 'Long-Throw Spinning Reel (sea/rock)', es: 'Carrete spinning de largo lanzamiento (mar/roca)' },
    desc: { fr: 'Lancer longue distance, robuste.', en: 'Long-distance casting, sturdy.', es: 'Lanzado a larga distancia, robusto.' },
    long: {
      fr: "Moulinet spinning conçu pour le lancer longue distance en mer et en pêche aux rochers (rockfishing). Bobine longue à lèvre profilée, mécanique fluide et frein puissant pour brider les poissons combatifs. Construction robuste qui résiste aux embruns. Plusieurs tailles disponibles.",
      en: "Spinning reel built for long-distance casting at sea and rock fishing. Long, profiled-lip spool, smooth mechanics and a powerful drag to tame hard-fighting fish. Sturdy build that resists sea spray. Several sizes available.",
      es: "Carrete spinning diseñado para el lanzado a larga distancia en el mar y la pesca a roca (rockfishing). Bobina larga de labio perfilado, mecánica suave y freno potente para frenar peces combativos. Construcción robusta que resiste el salitre. Varias tallas disponibles." }
  },
  {
    id: 'cj-28', category: 'gear', usd: 5.34, ship: 7.13, rating: 4.6, reviews: null, badge: null, sku: 'CJYE112273801AZ',
    photos: ['28-1.jpg','28-2.jpg','28-3.jpg','28-4.jpg','28-5.jpg'],
    name: { fr: 'Coffret accessoires carpe 277 pièces', en: 'Carp Accessory Kit 277 pcs', es: 'Kit de accesorios de carpa 277 piezas' },
    desc: { fr: 'Montages carpe à l\'européenne, tout-en-un.', en: 'European carp rigs, all-in-one.', es: 'Aparejos de carpa europeos, todo en uno.' },
    long: {
      fr: "Coffret de 277 pièces pour la pêche de la carpe à l'européenne : émerillons rapides, stop-floats, plombs, manchons anti-emmêlement, hameçons et accessoires de montage. Tout est trié dans une boîte compacte pour monter tes lignes au bord de l'eau. L'essentiel du carpiste dans une seule boîte.",
      en: "277-piece kit for European-style carp fishing: quick swivels, float stops, sinkers, anti-tangle sleeves, hooks and rigging accessories. Everything sorted in a compact box to tie your rigs at the water's edge. The carp angler's essentials in a single box.",
      es: "Kit de 277 piezas para la pesca de la carpa al estilo europeo: destorcedores rápidos, topes, plomos, fundas antienredo, anzuelos y accesorios de montaje. Todo ordenado en una caja compacta para montar tus líneas en la orilla. Lo esencial del carpista en una sola caja." }
  },
  {
    id: 'cj-29', category: 'lures', usd: 0.91, ship: 5.35, rating: 4.4, reviews: null, badge: 'new', sku: 'CJYE124717303CX',
    photos: ['29-1.jpg','29-2.jpg','29-3.jpg','29-4.jpg','29-5.jpg'],
    name: { fr: 'Leurre « avion » de surface (multi-coloris)', en: 'Aircraft Surface Lure (multi-colour)', es: 'Señuelo «avión» de superficie (multicolor)' },
    desc: { fr: 'Leurre original en forme d\'avion, très visible.', en: 'Original aircraft-shaped lure, very visible.', es: 'Señuelo original en forma de avión, muy visible.' },
    long: {
      fr: "Leurre de surface original en forme d'avion, ultra-coloré et très visible de loin. Sa forme crée des remous et des vibrations qui attirent les chasseurs en mer. Plastique flottant résistant, à monter avec un hameçon. Un leurre amusant et accrocheur qui sort de l'ordinaire.",
      en: "Original aircraft-shaped surface lure, ultra-colourful and visible from afar. Its shape creates swirls and vibrations that attract hunting fish at sea. Tough floating plastic, to rig with a hook. A fun, eye-catching lure that stands out from the crowd.",
      es: "Señuelo de superficie original en forma de avión, ultracolorido y muy visible de lejos. Su forma crea remolinos y vibraciones que atraen a los cazadores en el mar. Plástico flotante resistente, para montar con anzuelo. Un señuelo divertido y llamativo que sale de lo común." }
  },
  {
    id: 'cj-30', category: 'gear', usd: 0.66, ship: 5.20, rating: 4.5, reviews: null, badge: null, sku: 'CJDY193119402BY',
    photos: ['30-1.jpg','30-2.jpg','30-3.jpg','30-4.jpg','30-5.jpg'],
    name: { fr: 'Cages à amorce ressort (carpe, 21 cm)', en: 'Spring Bait Feeders (carp, 21 cm)', es: 'Cestas de cebo de muelle (carpa, 21 cm)' },
    desc: { fr: 'Diffusent l\'amorce autour de l\'hameçon.', en: 'Release groundbait around the hook.', es: 'Liberan engodo alrededor del anzuelo.' },
    long: {
      fr: "Cages à amorce à ressort (feeders) de 21 cm pour la pêche de la carpe et de la brème à l'européenne. Le ressort retient l'amorce et la libère doucement au fond, créant un nuage attractif autour de ton hameçon. Lestées et faciles à monter. Parfaites au feeder et au plomb plat.",
      en: "21 cm spring bait feeders for European-style carp and bream fishing. The spring holds groundbait and releases it gently on the bottom, creating an attractive cloud around your hook. Weighted and easy to rig. Perfect for feeder and flat-lead fishing.",
      es: "Cestas de cebo de muelle de 21 cm para la pesca de la carpa y la brema al estilo europeo. El muelle retiene el engodo y lo libera suavemente en el fondo, creando una nube atractiva alrededor de tu anzuelo. Lastradas y fáciles de montar. Perfectas para feeder y plomo plano." }
  },
  {
    id: 'cj-31', category: 'lures', usd: 2.70, ship: 5.20, rating: 4.5, reviews: null, badge: null, sku: 'CJYE134759903CX',
    photos: ['31-1.jpg','31-2.jpg','31-3.jpg','31-4.jpg','31-5.jpg'],
    name: { fr: 'Leurres souples bioniques (silicone)', en: 'Bionic Silicone Soft Baits', es: 'Señuelos blandos biónicos (silicona)' },
    desc: { fr: 'Imitations souples, nage réaliste.', en: 'Soft imitations, realistic swim.', es: 'Imitaciones blandas, nado realista.' },
    long: {
      fr: "Leurres souples en silicone bionique à la nage et au toucher ultra-réalistes. Leur matière molle et leur forme imitant une proie blessée déclenchent l'attaque des carnassiers, même les plus méfiants. À monter sur tête plombée ou hameçon texan. Plusieurs coloris (blanc, doré, noir).",
      en: "Bionic silicone soft baits with an ultra-realistic swim and feel. Their soft material and wounded-prey shape trigger strikes from predators, even the wariest. Rig on a jig head or Texas hook. Several colours (white, gold, black).",
      es: "Señuelos blandos de silicona biónica con un nado y un tacto ultrarrealistas. Su material blando y su forma de presa herida provocan el ataque de los depredadores, incluso los más desconfiados. Para montar en cabeza plomada o anzuelo texano. Varios colores (blanco, dorado, negro)." }
  },
  {
    id: 'cj-32', category: 'gear', usd: 0.21, ship: 5.20, rating: 4.4, reviews: null, badge: null, sku: 'CJYE174315205EV',
    photos: ['32-1.jpg','32-2.jpg','32-3.jpg','32-4.jpg','32-5.jpg'],
    name: { fr: 'Plomb cheburashka à clips (plusieurs poids)', en: 'Cheburashka Clip Sinker (several weights)', es: 'Plomo cheburashka con clips (varios pesos)' },
    desc: { fr: 'Tête ronde à changement rapide de leurre.', en: 'Round head, quick lure change.', es: 'Cabeza redonda, cambio rápido de señuelo.' },
    long: {
      fr: "Plomb « cheburashka » à tête ronde et anneaux à clips pour changer de leurre souple en un instant, sans recouper le fil. Idéal pour la pêche du carnassier en linéaire ou à gratter le fond. Disponible en plusieurs poids (2 à 18 g) selon la profondeur et le courant.",
      en: "'Cheburashka' round-head sinker with clip rings to swap soft baits in an instant, without re-cutting the line. Ideal for predator fishing on the retrieve or scratching the bottom. Available in several weights (2 to 18 g) to match depth and current.",
      es: "Plomo «cheburashka» de cabeza redonda con anillas de clip para cambiar de señuelo blando en un instante, sin recortar el hilo. Ideal para la pesca de depredadores al lineal o rascando el fondo. Disponible en varios pesos (2 a 18 g) según la profundidad y la corriente." }
  },
  {
    id: 'cj-33', category: 'rods', usd: 18.82, ship: 7.64, rating: 4.6, reviews: null, badge: 'new', sku: 'CJDY161210801AZ',
    photos: ['33-1.jpg','33-2.jpg','33-3.jpg','33-4.jpg','33-5.jpg'],
    name: { fr: 'Mini canne « stylo » + moulinet (compacte)', en: 'Pocket Pen Rod + Reel (compact)', es: 'Mini caña «bolígrafo» + carrete (compacta)' },
    desc: { fr: 'Canne télescopique format stylo, kit complet.', en: 'Pen-size telescopic rod, complete kit.', es: 'Caña telescópica tamaño bolígrafo, kit completo.' },
    long: {
      fr: "Étonnante mini canne télescopique format « stylo » livrée avec son moulinet : repliée, elle se glisse dans une poche ou un sac. Déployée, c'est un vrai petit ensemble de pêche pour taquiner truites et perches partout, en voyage ou en sortie improvisée. Kit complet canne + moulinet, idéal aussi en cadeau.",
      en: "A surprising pen-sized telescopic mini rod that comes with its reel: folded, it slips into a pocket or bag. Extended, it's a real little fishing combo to tempt trout and perch anywhere, travelling or on the spur of the moment. Complete rod + reel kit, a great gift too.",
      es: "Una sorprendente mini caña telescópica tamaño «bolígrafo» que viene con su carrete: plegada, cabe en un bolsillo o bolsa. Desplegada, es un pequeño equipo de pesca real para tentar truchas y percas en cualquier lugar. Kit completo caña + carrete, ideal también como regalo." }
  },
  {
    id: 'cj-34', category: 'gear', usd: 2.44, ship: 5.50, rating: 4.6, reviews: null, badge: null, sku: 'CJDY272858111KP',
    variants: [ { label: '300M 6.0', usd: 2.44 }, { label: '300M 8.0', usd: 2.44 } ],
    photos: ['34-1.jpg','34-2.jpg','34-3.jpg','34-4.jpg','34-5.jpg'],
    name: { fr: 'Tresse PE « Power Strong » 300 m (6.0/8.0)', en: 'PE Braid "Power Strong" 300 m (6.0/8.0)', es: 'Trenzado PE «Power Strong» 300 m (6.0/8.0)' },
    desc: { fr: 'Grosse tresse 300 m, très résistante.', en: 'Heavy 300 m braid, very strong.', es: 'Trenzado grueso 300 m, muy resistente.' },
    long: {
      fr: "Grande bobine de 300 m de tresse PE « Power Strong », fine, ronde et ultra-résistante pour le carnassier et la mer. Quasiment sans élasticité pour une sensibilité maximale et un ferrage instantané. Disponible en fort diamètre (6.0 et 8.0) pour les gros poissons. Plusieurs coloris.",
      en: "Large 300 m spool of 'Power Strong' PE braid, thin, round and ultra-strong for predators and the sea. Almost no stretch for maximum sensitivity and an instant hookset. Available in heavy diameters (6.0 and 8.0) for big fish. Several colours.",
      es: "Gran bobina de 300 m de trenzado PE «Power Strong», fino, redondo y ultrarresistente para depredadores y mar. Casi sin elasticidad para máxima sensibilidad y clavada instantánea. Disponible en diámetros gruesos (6.0 y 8.0) para peces grandes. Varios colores." }
  },
  {
    id: 'cj-35', category: 'gear', usd: 5.31, ship: 9.38, rating: 4.6, reviews: null, badge: 'new', sku: 'CJYD218783802BY',
    photos: ['35-2.jpg','35-3.jpg','35-4.jpg','35-5.jpg','35-6.jpg'],
    name: { fr: 'Coffret cadeau pêche (24 pièces)', en: 'Fishing Gift Set (24 pieces)', es: 'Set regalo de pesca (24 piezas)' },
    desc: { fr: 'Accessoires de pêche en boîte cadeau festive.', en: 'Fishing accessories in a festive gift box.', es: 'Accesorios de pesca en caja regalo festiva.' },
    long: {
      fr: "Coffret cadeau idéal pour les passionnés de pêche : un assortiment de 24 accessoires utiles présentés dans une jolie boîte festive. Leurres, outils et petit matériel réunis pour faire plaisir à coup sûr. Le cadeau parfait pour un pêcheur, à Noël ou toute l'année.",
      en: "The ideal gift box for fishing lovers: an assortment of 24 useful accessories presented in a nice festive box. Lures, tools and small gear together to please for sure. The perfect gift for an angler, at Christmas or all year round.",
      es: "La caja regalo ideal para los aficionados a la pesca: un surtido de 24 accesorios útiles en una bonita caja festiva. Señuelos, herramientas y material pequeño juntos para acertar seguro. El regalo perfecto para un pescador, en Navidad o todo el año." }
  },
  {
    id: 'cj-36', category: 'gear', usd: 1.74, ship: 9.89, rating: 4.5, reviews: null, badge: null, sku: 'CJYD247337702BY',
    photos: ['36-1.jpeg','36-2.jpeg','36-3.jpeg','36-4.jpeg','36-5.jpeg'],
    name: { fr: 'Étui rigide à cannes (imperméable, 1,25 m)', en: 'Hard-Shell Rod Tube Bag (waterproof, 1.25 m)', es: 'Funda rígida para cañas (impermeable, 1,25 m)' },
    desc: { fr: 'Coque rigide, protège tes cannes en transport.', en: 'Hard shell, protects rods in transit.', es: 'Carcasa rígida, protege las cañas al transportarlas.' },
    long: {
      fr: "Étui à cannes à coque semi-rigide et imperméable pour transporter et protéger 3 à 4 cannes des chocs et de l'humidité. Bandoulière réglable et fermeture solide. Compact et léger, il accompagne tous tes déplacements. Disponible en 1,2 m et 1,25 m.",
      en: "Semi-rigid, waterproof rod tube bag to carry and protect 3 to 4 rods from knocks and moisture. Adjustable shoulder strap and sturdy closure. Compact and light, it goes everywhere with you. Available in 1.2 m and 1.25 m.",
      es: "Funda para cañas con carcasa semirrígida e impermeable para transportar y proteger 3 o 4 cañas de golpes y humedad. Bandolera ajustable y cierre sólido. Compacta y ligera, te acompaña a todas partes. Disponible en 1,2 m y 1,25 m." }
  },
  {
    id: 'cj-37', category: 'reels', usd: 6.30, ship: 6.85, rating: 4.5, reviews: null, badge: null, sku: 'CJDY111366801AZ',
    photos: ['37-1.jpg','37-2.jpg','37-3.jpg','37-4.jpg','37-5.jpg'],
    name: { fr: 'Moulinet spinning tête métal DX (1000-7000)', en: 'Metal-Head Spinning Reel DX (1000-7000)', es: 'Carrete spinning cabeza metal DX (1000-7000)' },
    desc: { fr: 'Tête métal, poignée bois, plusieurs tailles.', en: 'Metal head, wood knob, several sizes.', es: 'Cabeza metálica, pomo de madera, varias tallas.' },
    long: {
      fr: "Moulinet spinning à tête métallique et poignée en bois élégante. Rotation fluide, bobine alu et frein avant réglable pour une pêche polyvalente, du leurre léger au posé. Construction soignée et fiable à petit prix. Disponible de la taille 1000 (pêche fine) à 7000 (gros poissons et mer).",
      en: "Spinning reel with a metal head and an elegant wooden knob. Smooth rotation, aluminium spool and adjustable front drag for versatile fishing, from light lures to still fishing. Tidy, reliable build at a low price. Available from size 1000 (finesse) to 7000 (big fish and sea).",
      es: "Carrete spinning con cabeza metálica y elegante pomo de madera. Rotación suave, bobina de aluminio y freno frontal ajustable para una pesca versátil, del señuelo ligero al fondo. Construcción cuidada y fiable a buen precio. Disponible de la talla 1000 (fina) a 7000 (peces grandes y mar)." }
  },
  {
    id: 'cj-38', category: 'lures', usd: 3.70, ship: 5.20, rating: 4.6, reviews: null, badge: 'new', sku: 'CJYE176445901AZ',
    photos: ['38-1.jpg','38-2.jpg','38-3.jpg','38-4.jpg','38-5.jpg'],
    name: { fr: 'Leurre minnow lumineux longue distance', en: 'Luminous Long-Cast Minnow Lure', es: 'Señuelo minnow luminoso de largo lanzamiento' },
    desc: { fr: 'Lesté longue distance, phosphorescent.', en: 'Weighted long-cast, glow-in-the-dark.', es: 'Lastrado, fosforescente, largo lanzamiento.' },
    long: {
      fr: "Poisson nageur (minnow) lesté pour le lancer longue distance en mer, avec finition phosphorescente qui brille sous l'eau pour attirer le poisson dans la pénombre. Nage piquée réaliste et hameçons triples affûtés. Idéal au lever du jour, à la tombée de la nuit et en eau profonde. Nombreux coloris.",
      en: "Weighted minnow lure for long-distance casting at sea, with a phosphorescent finish that glows underwater to draw fish in low light. Realistic darting swim and sharp treble hooks. Ideal at dawn, dusk and in deep water. Many colours.",
      es: "Señuelo minnow lastrado para el lanzado a larga distancia en el mar, con acabado fosforescente que brilla bajo el agua para atraer al pez con poca luz. Nado errático realista y anzuelos triples afilados. Ideal al amanecer, al anochecer y en aguas profundas. Muchos colores." }
  },
  {
    id: 'cj-39', category: 'gear', usd: 0.73, ship: 5.28, rating: 4.4, reviews: null, badge: null, sku: 'CJDY107831501AZ',
    photos: ['39-1.jpg','39-2.jpg','39-3.jpg','39-4.jpg','39-5.jpg'],
    name: { fr: 'Capuchon protège-canne (caoutchouc)', en: 'Rubber Rod Protective Cap', es: 'Capuchón protector de caña (goma)' },
    desc: { fr: 'Protège scion et talon de la canne.', en: 'Protects rod tip and butt.', es: 'Protege la puntera y el talón de la caña.' },
    long: {
      fr: "Capuchon en caoutchouc souple (41 mm) qui protège le scion ou le talon de ta canne des chocs pendant le transport et le rangement. Évite aussi d'abîmer les anneaux et le porte-moulinet. S'enfile et se retire en un geste. Un petit accessoire malin pour faire durer ton matériel.",
      en: "Soft rubber cap (41 mm) that protects your rod's tip or butt from knocks during transport and storage. Also helps prevent damage to the guides and reel seat. Slips on and off in a second. A clever little accessory to make your gear last.",
      es: "Capuchón de goma blanda (41 mm) que protege la puntera o el talón de tu caña de los golpes durante el transporte y el almacenaje. Evita también dañar las anillas y el porta-carrete. Se pone y se quita en un gesto. Un accesorio ingenioso para que tu equipo dure más." }
  },
  {
    id: 'cj-40', category: 'reels', usd: 28.36, ship: 12.07, rating: 4.8, reviews: null, badge: 'best', sku: 'CJDY106033001AZ',
    photos: ['40-1.jpg','40-2.jpg','40-3.jpg','40-4.jpg','40-5.jpg'],
    name: { fr: 'Moulinet spinning haut de gamme tout métal', en: 'Premium All-Metal Spinning Reel', es: 'Carrete spinning premium todo metal' },
    desc: { fr: 'Corps métal usiné, roulements inox, design iridescent.', en: 'Machined metal body, steel bearings, iridescent.', es: 'Cuerpo metálico mecanizado, rodamientos inox, iridiscente.' },
    long: {
      fr: "Moulinet spinning haut de gamme au corps entièrement métallique usiné et aux roulements en acier inoxydable, pour une rotation d'une fluidité remarquable. Frein avant puissant et progressif, design iridescent du plus bel effet. Conçu pour la pêche exigeante du carnassier et en mer. Plusieurs coloris.",
      en: "Premium spinning reel with a fully machined metal body and stainless-steel bearings, for remarkably smooth rotation. Powerful, progressive front drag and a stunning iridescent design. Built for demanding predator and sea fishing. Several colours.",
      es: "Carrete spinning premium con cuerpo totalmente metálico mecanizado y rodamientos de acero inoxidable, para una rotación notablemente suave. Freno frontal potente y progresivo, diseño iridiscente espectacular. Diseñado para la pesca exigente de depredadores y en el mar. Varios colores." }
  },
  {
    id: 'cj-41', category: 'rods', usd: 4.18, ship: 7.48, rating: 4.6, reviews: null, badge: 'new', sku: 'CJYD241061505EV',
    photos: ['41-1.jpeg','41-2.jpeg','41-3.jpeg','41-4.jpeg','41-5.jpeg'],
    name: { fr: 'Ensemble canne enfant « pistolet » (165 cm)', en: "Kids' Gun-Type Rod Combo (165 cm)", es: 'Conjunto de caña infantil «pistola» (165 cm)' },
    desc: { fr: 'Canne + moulinet faciles, parfaits pour débuter.', en: 'Easy rod + reel, perfect to start.', es: 'Caña + carrete fáciles, perfectos para empezar.' },
    long: {
      fr: "Ensemble de pêche pour enfant à poignée « pistolet » et moulinet à tambour fermé (spincast) très facile à utiliser : on appuie sur le bouton pour lancer, sans perruque. Canne télescopique de 165 cm, légère et colorée. Le cadeau idéal pour initier un enfant à la pêche. Plusieurs coloris.",
      en: "Children's fishing combo with a gun-type grip and an easy closed-face spincast reel: just press the button to cast, no backlash. 165 cm telescopic rod, light and colourful. The ideal gift to introduce a child to fishing. Several colours.",
      es: "Conjunto de pesca infantil con empuñadura tipo «pistola» y carrete de tambor cerrado (spincast) muy fácil de usar: basta con pulsar el botón para lanzar, sin cabelleras. Caña telescópica de 165 cm, ligera y colorida. El regalo ideal para iniciar a un niño en la pesca. Varios colores." }
  },
  {
    id: 'cj-42', category: 'gear', usd: 0.66, ship: 5.20, rating: 4.5, reviews: null, badge: null, sku: 'CJYD215151704DW',
    photos: ['42-2.jpg','42-3.jpeg','42-4.jpg','42-5.jpg','42-6.jpg'],
    name: { fr: 'Flotteur de pêche au coup (européen)', en: 'European Match Fishing Float', es: 'Flotador de pesca al coup (europeo)' },
    desc: { fr: 'Flotteur sensible, plusieurs grammages.', en: 'Sensitive float, several weights.', es: 'Flotador sensible, varios gramajes.' },
    long: {
      fr: "Flotteur (waggler) de pêche au coup à l'européenne, sensible et bien visible avec son antenne colorée. Stable même par petit vent, il détecte les touches les plus fines de la brème, du gardon ou de la carpe. Disponible en plusieurs grammages (3 à 15 g) selon la profondeur et le courant.",
      en: "European-style match fishing float (waggler), sensitive and clearly visible with its coloured tip. Stable even in a light breeze, it shows the faintest bites from bream, roach or carp. Available in several weights (3 to 15 g) to match depth and current.",
      es: "Flotador (waggler) de pesca al coup al estilo europeo, sensible y bien visible con su antena de color. Estable incluso con brisa ligera, detecta las picadas más finas de brema, gobio o carpa. Disponible en varios gramajes (3 a 15 g) según la profundidad y la corriente." }
  },
  {
    id: 'cj-43', category: 'gear', usd: 6.52, ship: 10.49, rating: 4.5, reviews: null, badge: null, sku: 'CJDY176908201AZ',
    photos: ['43-1.jpg','43-2.jpg','43-3.jpg','43-4.jpg','43-5.jpg'],
    name: { fr: 'Râtelier mural pour cannes (rangement)', en: 'Wall Rod Rack (storage)', es: 'Soporte de pared para cañas' },
    desc: { fr: 'Range plusieurs cannes au mur, garage/atelier.', en: 'Stores several rods on the wall.', es: 'Guarda varias cañas en la pared.' },
    long: {
      fr: "Râtelier mural en plastique robuste pour ranger et exposer plusieurs cannes (jusqu'à 6) bien alignées, à la verticale. Parfait pour le garage, l'atelier ou la maison : tes cannes restent organisées, protégées et hors du sol. Fixation simple au mur, pinces qui maintiennent fermement chaque canne.",
      en: "Sturdy plastic wall rack to store and display several rods (up to 6) neatly upright. Perfect for the garage, workshop or home: your rods stay organised, protected and off the floor. Easy wall mounting, clips that hold each rod firmly.",
      es: "Soporte de pared de plástico resistente para guardar y exponer varias cañas (hasta 6) bien alineadas en vertical. Perfecto para el garaje, taller o casa: tus cañas quedan ordenadas, protegidas y lejos del suelo. Fijación sencilla a la pared, pinzas que sujetan firmemente cada caña." }
  },
  {
    id: 'cj-44', category: 'lures', usd: 9.68, ship: 5.56, rating: 4.7, reviews: null, badge: 'new', sku: 'CJYE173687401AZ',
    photos: ['44-1.jpg','44-2.jpg','44-3.jpg','44-4.jpg','44-5.jpg'],
    name: { fr: 'Popper de surface NOEBY 150 mm (mer)', en: 'NOEBY Topwater Popper 150 mm', es: 'Popper de superficie NOEBY 150 mm' },
    desc: { fr: 'Popper de marque, mer, nombreux coloris.', en: 'Branded popper, sea, many colours.', es: 'Popper de marca, mar, muchos colores.' },
    long: {
      fr: "Popper de surface de la marque NOEBY (150 mm), conçu pour la pêche en mer des prédateurs. Sa tête concave creuse l'eau et projette des éclaboussures sonores qui déclenchent des attaques explosives. Finition réaliste, anneaux et hameçons triples renforcés. Disponible en de nombreux coloris.",
      en: "NOEBY-brand topwater popper (150 mm), built for sea predator fishing. Its concave mouth digs into the water and throws noisy spray that triggers explosive strikes. Realistic finish, reinforced rings and treble hooks. Available in many colours.",
      es: "Popper de superficie de la marca NOEBY (150 mm), diseñado para la pesca en el mar de depredadores. Su boca cóncava cava el agua y lanza salpicaduras sonoras que provocan ataques explosivos. Acabado realista, anillas y anzuelos triples reforzados. Disponible en muchos colores." }
  },
  {
    id: 'cj-45', category: 'lures', usd: 1.67, ship: 5.87, rating: 4.6, reviews: null, badge: null, sku: 'CJYE121902316PK',
    photos: ['45-1.jpg','45-2.jpg','45-3.jpg','45-4.jpg','45-5.jpg'],
    name: { fr: 'Jig métal casting longue distance (40-100 g)', en: 'Metal Casting Jig (40-100 g)', es: 'Jig metálico de casting (40-100 g)' },
    desc: { fr: 'Lance loin, coule vite, plusieurs poids.', en: 'Casts far, sinks fast, several weights.', es: 'Lanza lejos, se hunde rápido, varios pesos.' },
    long: {
      fr: "Jig métallique profilé pour le lancer longue distance et la pêche verticale en mer. Son corps lesté file loin et coule vite pour atteindre les poissons en chasse ou près du fond. Reflets métalliques irrésistibles, hameçon affûté. Disponible en plusieurs poids (40 à 100 g) selon la profondeur.",
      en: "Streamlined metal jig for long-distance casting and vertical sea fishing. Its weighted body casts far and sinks fast to reach hunting fish or the bottom. Irresistible metallic flash, sharp hook. Available in several weights (40 to 100 g) to match the depth.",
      es: "Jig metálico perfilado para el lanzado a larga distancia y la pesca vertical en el mar. Su cuerpo lastrado lanza lejos y se hunde rápido para alcanzar a los peces o el fondo. Destello metálico irresistible, anzuelo afilado. Disponible en varios pesos (40 a 100 g) según la profundidad." }
  },
  {
    id: 'cj-46', category: 'lures', usd: 2.82, ship: 7.53, rating: 4.6, reviews: null, badge: 'new', sku: 'CJYE121914020TG',
    photos: ['46-1.jpg','46-2.jpg','46-3.jpg','46-4.jpg','46-5.jpg'],
    name: { fr: 'Jig lumineux à plumes (mer, 40-100 g)', en: 'Luminous Jig with Assist Hooks (40-100 g)', es: 'Jig luminoso con plumas (40-100 g)' },
    desc: { fr: 'Ventre phosphorescent, hameçons assist.', en: 'Glowing belly, assist hooks.', es: 'Vientre fosforescente, anzuelos assist.' },
    long: {
      fr: "Jig métallique à ventre phosphorescent qui brille sous l'eau pour attirer les prédateurs dans la pénombre et les profondeurs. Équipé d'hameçons « assist » montés sur tresse et d'un pompon coloré qui déclenche l'attaque. Idéal en pêche verticale (slow jigging) en mer. Plusieurs poids et coloris.",
      en: "Metal jig with a phosphorescent belly that glows underwater to attract predators in low light and the depths. Fitted with braid-mounted assist hooks and a coloured tuft that triggers strikes. Ideal for vertical slow-jigging at sea. Several weights and colours.",
      es: "Jig metálico con vientre fosforescente que brilla bajo el agua para atraer a los depredadores con poca luz y en profundidad. Equipado con anzuelos «assist» montados en trenzado y un pompón de color que provoca el ataque. Ideal para pesca vertical (slow jigging) en el mar. Varios pesos y colores." }
  },
  {
    id: 'cj-47', category: 'lures', usd: 0.58, ship: 5.95, rating: 4.5, reviews: null, badge: null, sku: 'CJYE140621901AZ',
    photos: ['47-1.jpg','47-2.jpg','47-3.jpg','47-4.jpg','47-5.jpg'],
    name: { fr: 'Petit poisson nageur bionique (multi-coloris)', en: 'Small Bionic Minnow Lure (multi-colour)', es: 'Pequeño minnow biónico (multicolor)' },
    desc: { fr: 'Minnow plongeant réaliste, nombreux coloris.', en: 'Realistic diving minnow, many colours.', es: 'Minnow buceador realista, muchos colores.' },
    long: {
      fr: "Petit poisson nageur (minnow) à bavette plongeante et nage roulante réaliste, parfait pour la truite, la perche et le chevesne. Sa taille fine passe inaperçue auprès des poissons méfiants. Hameçons triples affûtés. Disponible dans une douzaine de coloris naturels et flashy. Imbattable à ce prix.",
      en: "Small minnow with a diving lip and a realistic rolling swim, perfect for trout, perch and chub. Its slim size slips past wary fish. Sharp treble hooks. Available in a dozen natural and bright colours. Unbeatable at this price.",
      es: "Pequeño minnow con babero buceador y nado rodante realista, perfecto para trucha, perca y cacho. Su tamaño fino pasa desapercibido ante peces desconfiados. Anzuelos triples afilados. Disponible en una docena de colores naturales y llamativos. Imbatible a este precio." }
  },
  {
    id: 'cj-48', category: 'rods', usd: 5.06, ship: 11.34, rating: 4.6, reviews: null, badge: 'best', sku: 'CJDY138932401AZ',
    photos: ['48-1.jpg','48-2.jpg','48-3.jpg','48-4.jpg','48-5.jpg'],
    name: { fr: 'Canne de mer auto-ferrante (2,1-2,7 m)', en: 'Self-Striking Sea Rod (2.1-2.7 m)', es: 'Caña de mar auto-clavante (2,1-2,7 m)' },
    desc: { fr: 'Ferre toute seule à la touche, plusieurs longueurs.', en: 'Sets the hook on its own.', es: 'Se clava sola en la picada.' },
    long: {
      fr: "Canne de mer télescopique équipée d'un mécanisme « auto-ferrant » à ressort : dès qu'un poisson mord, le scion se redresse et ferre tout seul, même si tu ne tiens pas la canne. Idéale pour la pêche posée au surfcasting à plusieurs cannes. Livrée prête à pêcher. Disponible en 2,1 / 2,4 / 2,7 m.",
      en: "Telescopic sea rod fitted with a spring 'self-striking' mechanism: the moment a fish bites, the tip snaps up and sets the hook on its own, even if you're not holding the rod. Ideal for surfcasting with several rods. Comes ready to fish. Available in 2.1 / 2.4 / 2.7 m.",
      es: "Caña de mar telescópica con mecanismo «auto-clavante» de resorte: en cuanto un pez muerde, la puntera se endereza y clava sola, aunque no sujetes la caña. Ideal para surfcasting con varias cañas. Lista para pescar. Disponible en 2,1 / 2,4 / 2,7 m." }
  },
  {
    id: 'cj-49', category: 'reels', usd: 11.11, ship: 7.05, rating: 4.6, reviews: null, badge: null, sku: 'CJDY170334401AZ',
    photos: ['49-1.jpg','49-2.jpg','49-3.jpg','49-4.jpg','49-5.jpg'],
    name: { fr: 'Moulinet spinning fin HES1500 (light game)', en: 'Finesse Spinning Reel HES1500', es: 'Carrete spinning fino HES1500' },
    desc: { fr: 'Léger, pour pêche fine et micro-leurre.', en: 'Light, for finesse and micro-lure.', es: 'Ligero, para pesca fina y micro-señuelo.' },
    long: {
      fr: "Moulinet spinning léger et fin (taille 1500), pensé pour la pêche fine, le micro-leurre (light game) et la pêche au raft. Rotation soyeuse, frein avant précis et faible poids pour pêcher en finesse toute la journée. Bobine peu profonde idéale pour les tresses fines. Plusieurs coloris.",
      en: "Light, compact spinning reel (size 1500) made for finesse fishing, micro-lure (light game) and raft fishing. Silky rotation, precise front drag and low weight to fish finesse all day. Shallow spool ideal for thin braids. Several colours.",
      es: "Carrete spinning ligero y fino (talla 1500), pensado para la pesca fina, el micro-señuelo (light game) y la pesca al raft. Rotación sedosa, freno frontal preciso y poco peso para pescar en finesse todo el día. Bobina poco profunda ideal para trenzados finos. Varios colores." }
  },
  {
    id: 'cj-50', category: 'rods', usd: 3.10, ship: 13.38, rating: 4.6, reviews: null, badge: 'best', sku: 'CJDY245207705EV',
    photos: ['50-1.jpg','50-2.jpg','50-3.jpg','50-4.jpg','50-5.jpg'],
    name: { fr: 'Ensemble canne + moulinet télescopique (1,5-1,8 m)', en: 'Telescopic Rod + Reel Combo (1.5-1.8 m)', es: 'Conjunto caña + carrete telescópico (1,5-1,8 m)' },
    desc: { fr: 'Kit complet prêt à pêcher, plusieurs coloris.', en: 'Complete ready-to-fish kit, several colours.', es: 'Kit completo listo para pescar, varios colores.' },
    long: {
      fr: "Ensemble de pêche complet : canne télescopique légère + moulinet spinning assorti, prêt à pêcher dès la sortie de la boîte. Compact une fois replié, idéal pour débuter, voyager ou avoir un ensemble de secours. Disponible en 1,5 m et 1,8 m, et en plusieurs coloris (bleu, vert, rouge…). Le combo parfait à petit prix.",
      en: "Complete fishing combo: a light telescopic rod plus a matching spinning reel, ready to fish out of the box. Compact once folded, ideal to start out, travel or keep as a backup. Available in 1.5 m and 1.8 m, and in several colours (blue, green, red…). The perfect budget combo.",
      es: "Conjunto de pesca completo: caña telescópica ligera y carrete spinning a juego, listo para pescar nada más sacarlo de la caja. Compacto una vez plegado, ideal para empezar, viajar o tener de repuesto. Disponible en 1,5 m y 1,8 m, y en varios colores (azul, verde, rojo…). El combo perfecto a buen precio." }
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
  if (typeof p === 'number') return Math.round(p * MARKUP * 100) / 100; // rétrocompat
  let prodUSD, shipUSD;
  if (p.variants && p.variants.length) {
    const v = (variant != null && p.variants.find(x => x.label === variant)) || p.variants[0];
    prodUSD = v.usd;                                       // coût de la variante choisie
    shipUSD = (v.ship != null) ? v.ship : (p.ship || 0);  // port de la variante, sinon du produit
  } else {
    prodUSD = (p.usd != null) ? p.usd : (p.cost / USD_TO_CAD);
    shipUSD = p.ship || 0;
  }
  return Math.round((prodUSD * MARKUP + shipUSD) * USD_TO_CAD * 100) / 100;
}

/* Prix le plus bas parmi les variantes (pour l'affichage « dès … » sur les cartes). */
function minSalePrice(p) {
  if (!p.variants || !p.variants.length) return salePrice(p);
  return p.variants.reduce(function(m, v){ var s = salePrice(p, v.label); return s < m ? s : m; }, Infinity);
}
