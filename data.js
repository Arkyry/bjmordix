/* ============================================================
   BJMordix — Données produits  (CATALOGUE RÉEL — CJdropshipping)
   ------------------------------------------------------------
   Prix : cost = coût fournisseur EN CAD (converti depuis l'USD au
   taux USD_TO_CAD). Prix de vente affiché = cost x MARKUP (3).
   Chaque produit a un tableau `photos` (galerie) ; la 1ʳᵉ photo
   sert d'image principale (carte + panier). Photos dans  photos/.
   reviews:null partout (aucun avis inventé) ; rating = présentation.
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

/* --- Produits réels ---  photos[0] = image principale --- */
const PRODUCTS = [
  /* ════════ CANNES ════════ */
  {
    id: 'rod-sougayilang-carbon', category: 'rods', cost: usd(20.30), usd: 20.30, rating: 4.8, reviews: null, badge: 'best',
    photos: ['1618906629566.webp','4080552827474.webp','1618906629564.webp'],
    name: { fr: 'Canne Sougayilang fibre de carbone', en: 'Sougayilang Carbon Fibre Rod', es: 'Caña Sougayilang de fibra de carbono' },
    desc: { fr: 'Légère, nerveuse, spinning ou casting.', en: 'Light, responsive, spinning or casting.', es: 'Ligera, nerviosa, spinning o casting.' },
    long: {
      fr: "La référence de notre rayon cannes. Blank en fibre de carbone haute densité, à la fois léger (tu peux pêcher toute la journée sans fatigue) et incroyablement sensible : tu sens la moindre touche au bout des doigts. Anneaux de qualité qui laissent filer le fil sans accroc, poignée EVA antidérapante et porte-moulinet renforcé. Disponible en versions spinning et casting, elle excelle à la pêche du carnassier au leurre (brochet, sandre, perche, black-bass). Un rapport performance-prix qui rivalise avec des cannes bien plus chères.",
      en: "The star of our rod range. A high-density carbon-fibre blank that's both light (fish all day without fatigue) and incredibly sensitive — you feel the smallest bite at your fingertips. Quality guides that let the line flow smoothly, a non-slip EVA grip and a reinforced reel seat. Available in spinning and casting versions, it shines for lure fishing for predators (pike, zander, perch, bass). Performance that rivals far pricier rods.",
      es: "La estrella de nuestra sección de cañas. Blank de fibra de carbono de alta densidad, ligero (pescas todo el día sin cansarte) e increíblemente sensible: notas la mínima picada en los dedos. Anillas de calidad que dejan correr el hilo sin enganches, mango EVA antideslizante y porta-carrete reforzado. Disponible en versiones spinning y casting, brilla en la pesca a señuelo de depredadores (lucio, lucioperca, perca, black-bass). Una relación calidad-precio que rivaliza con cañas mucho más caras." }
  },
  {
    id: 'rod-mh-carbon-telescopic', category: 'rods', cost: usd(5.33), usd: 5.33, rating: 4.5, reviews: null, badge: 'new',
    photos: ['29ee51ac-e911-4cf8-8f2d-50ae320da2c7.webp','72c76faf-ea15-44db-9df5-8d28bf3ebde4.webp'],
    name: { fr: 'Canne télescopique carbone MH', en: 'MH Carbon Telescopic Rod', es: 'Caña telescópica de carbono MH' },
    desc: { fr: 'Puissance Medium-Heavy, ultra-compacte.', en: 'Medium-Heavy power, ultra-compact.', es: 'Potencia Medium-Heavy, ultracompacta.' },
    long: {
      fr: "Toute la puissance d'une canne d'action Medium-Heavy… qui tient dans un sac. Les brins en carbone coulissent et se bloquent fermement, sans jeu, pour encaisser les départs des poissons combatifs. Anneaux renforcés et finition rouge/carbone du plus bel effet. Idéale si tu veux une canne solide à emporter partout : rando-pêche, vacances, ou simplement gagner de la place dans le coffre. Se déploie et se range en quelques secondes.",
      en: "All the power of a Medium-Heavy action rod… that fits in a bag. The carbon sections slide and lock firmly, with no play, to absorb the runs of hard-fighting fish. Reinforced guides and a sharp red/carbon finish. Ideal if you want a tough rod to take anywhere — hike-fishing, holidays, or simply saving space in the trunk. Deploys and packs away in seconds.",
      es: "Toda la potencia de una caña de acción Medium-Heavy… que cabe en una bolsa. Los tramos de carbono deslizan y se bloquean con firmeza, sin holgura, para aguantar los arranques de los peces combativos. Anillas reforzadas y acabado rojo/carbono muy vistoso. Ideal si quieres una caña resistente para llevar a todas partes: pesca de montaña, vacaciones o simplemente ganar espacio en el maletero. Se despliega y se recoge en segundos." }
  },
  {
    id: 'rod-telescopic-travel', category: 'rods', cost: usd(5.29), usd: 5.29, rating: 4.6, reviews: null, badge: null,
    photos: ['3612771332414.jpg','212410674988.webp'],
    name: { fr: 'Canne télescopique de voyage', en: 'Telescopic Travel Rod', es: 'Caña telescópica de viaje' },
    desc: { fr: 'Se replie pour tenir dans un sac à dos.', en: 'Folds to fit in a backpack.', es: 'Se pliega para caber en una mochila.' },
    long: {
      fr: "La canne « toujours dans le sac ». Repliée, elle ne mesure que quelques dizaines de centimètres et se glisse dans un sac à dos ou une valise. Déployée, elle offre une action de lancer léger polyvalente, parfaite pour taquiner truites et perches au gré des spots. Légère, équilibrée et sans prise de tête : tu la sors, tu pêches. Le compagnon idéal des pêcheurs nomades et des sorties improvisées au bord de l'eau.",
      en: "The 'always-in-the-bag' rod. Folded, it's just a few dozen centimetres and slips into a backpack or suitcase. Extended, it offers a versatile light-casting action, perfect for tempting trout and perch wherever you roam. Light, balanced and hassle-free — pull it out and fish. The ideal companion for nomad anglers and spur-of-the-moment trips to the water.",
      es: "La caña «siempre en la mochila». Plegada mide solo unas decenas de centímetros y cabe en una mochila o maleta. Desplegada ofrece una acción de lanzado ligero versátil, perfecta para tentar truchas y percas allá donde vayas. Ligera, equilibrada y sin complicaciones: la sacas y pescas. La compañera ideal del pescador nómada y de las salidas improvisadas a la orilla." }
  },
  {
    id: 'rod-carbon-set', category: 'rods', cost: usd(6.10), usd: 6.10, rating: 4.5, reviews: null, badge: null,
    photos: ['789b22f3-9165-463a-b915-5fb4d1c8fd7c.webp','23bfc7c4-7627-4f32-b040-5d94f354a322.webp'],
    name: { fr: 'Ensemble canne carbone (action vibrante)', en: 'Carbon Rod Combo (vibration tuned)', es: 'Conjunto de caña de carbono' },
    desc: { fr: 'Carbone réglé pour la sensibilité.', en: 'Carbon tuned for sensitivity.', es: 'Carbono afinado para la sensibilidad.' },
    long: {
      fr: "Un ensemble carbone pensé pour les pêcheurs qui veulent tout sentir. L'action « vibrante » du blank transmet la moindre vibration jusqu'à ta main : touches discrètes, contact avec le fond, nage du leurre… rien ne t'échappe. Léger et bien équilibré, il fatigue moins le poignet sur les longues sessions au leurre. Une valeur sûre pour progresser en pêche fine sans exploser ton budget.",
      en: "A carbon combo built for anglers who want to feel everything. The blank's 'vibration' action transmits the slightest pulse to your hand — subtle bites, bottom contact, the lure's action… nothing escapes you. Light and well balanced, it tires the wrist less on long lure sessions. A safe bet to progress in finesse fishing without blowing your budget.",
      es: "Un conjunto de carbono pensado para quienes quieren sentirlo todo. La acción «vibrante» del blank transmite el menor impulso a tu mano: picadas sutiles, contacto con el fondo, el nado del señuelo… nada se te escapa. Ligero y equilibrado, cansa menos la muñeca en sesiones largas a señuelo. Una apuesta segura para progresar en pesca fina sin disparar el presupuesto." }
  },

  /* ════════ MOULINETS ════════ */
  {
    id: 'reel-metal-sea', category: 'reels', cost: usd(49.33), usd: 49.33, rating: 4.8, reviews: null, badge: 'best',
    photos: ['1620609320769.webp','1620609320765.webp','784699245819.webp','a74315a3-639b-4936-9d30-e2313b5d36e5.webp'],
    name: { fr: 'Moulinet de mer tout métal', en: 'All-Metal Sea Fishing Reel', es: 'Carrete de mar todo metal' },
    desc: { fr: 'Corps métal, frein puissant, anti-corrosion.', en: 'Metal body, strong drag, anti-corrosion.', es: 'Cuerpo metálico, freno potente, anticorrosión.' },
    long: {
      fr: "Le moulinet costaud de la boutique, conçu pour la mer et les gros poissons. Corps et rotor entièrement métalliques traités contre la corrosion saline, multiples roulements pour une rotation soyeuse, et un frein avant puissant capable de tenir tête aux combats musclés. Grande capacité de fil pour le surfcasting et la pêche en bateau. Si tu vises le bar, la bonite ou les prédateurs marins, c'est lui qu'il te faut.",
      en: "The workhorse reel of the store, built for the sea and big fish. Fully metal body and rotor treated against salt corrosion, multiple bearings for silky rotation, and a powerful front drag that holds its own in heavy fights. Large line capacity for surfcasting and boat fishing. If you're after bass, bonito or marine predators, this is the one.",
      es: "El carrete robusto de la tienda, diseñado para el mar y los peces grandes. Cuerpo y rotor totalmente metálicos tratados contra la corrosión salina, múltiples rodamientos para una rotación sedosa y un freno frontal potente capaz de plantar cara a combates fuertes. Gran capacidad de hilo para surfcasting y pesca en barco. Si buscas lubina, bonito o depredadores marinos, este es el tuyo." }
  },
  {
    id: 'reel-fullmetal-spin', category: 'reels', cost: usd(4.69), usd: 4.69, rating: 4.6, reviews: null, badge: 'new',
    photos: ['400843ee-c378-45bb-bc95-77a8378f1a45.webp','1620609320776.webp','63947ba8-9c0f-4e3c-9922-74762f1bfb11.webp'],
    name: { fr: 'Moulinet spinning tête métal', en: 'Metal-Head Spinning Reel', es: 'Carrete spinning cabezal metálico' },
    desc: { fr: 'Lancer longue distance, frein réglable.', en: 'Long-distance casting, adjustable drag.', es: 'Lanzado largo, freno ajustable.' },
    long: {
      fr: "Le petit prix qui en fait beaucoup. Tête entièrement métallique et bobine profilée pour des lancers longue distance, récupération fluide et frein avant réglable au plus juste. Léger et polyvalent, il se monte aussi bien sur une canne spinning eau douce que pour la pêche au leurre (Luya) en bord de mer. Le moulinet parfait pour débuter ou pour avoir un second ensemble fiable sans se ruiner.",
      en: "The budget pick that punches above its weight. Fully metal head and a profiled spool for long-distance casts, smooth retrieve and a finely adjustable front drag. Light and versatile, it pairs just as well with a freshwater spinning rod as for lure (Luya) fishing along the coast. The perfect reel to start out, or to keep a reliable second setup without breaking the bank.",
      es: "El precio bajo que rinde mucho. Cabezal totalmente metálico y bobina perfilada para lanzados a larga distancia, recogida suave y freno frontal ajustable con precisión. Ligero y versátil, se monta igual de bien en una caña spinning de agua dulce que para la pesca a señuelo (Luya) en la costa. El carrete perfecto para empezar o para tener un segundo equipo fiable sin arruinarte." }
  },

  /* ════════ LEURRES ════════ */
  {
    id: 'lure-swimbait-jointed', category: 'lures', cost: usd(11.61), usd: 11.61, rating: 4.7, reviews: null, badge: 'best',
    photos: ['6b0baab7-2883-4557-b0a5-de6b3b438249.webp','4b57dd92-1fdb-4c7a-a2eb-b421839c1322.webp'],
    name: { fr: 'Leurre nageur articulé multi-sections', en: 'Multi-Section Jointed Swimbait', es: 'Señuelo nadador articulado multisección' },
    desc: { fr: 'Nage ondulante ultra réaliste.', en: 'Ultra-realistic undulating swim.', es: 'Nado ondulante ultrarrealista.' },
    long: {
      fr: "L'arme fatale contre les gros carnassiers méfiants. Ses multiples segments articulés reproduisent l'ondulation d'un vrai poisson : à la récupération, on jurerait un poisson blessé qui fuit. Finition holographique ultra-détaillée qui accroche la lumière, yeux 3D et hameçons triples affûtés montés sur anneaux renforcés. Brochet, black-bass, sandre : peu résistent à un swimbait nageant aussi naturellement. À lancer là où se cachent les plus beaux poissons.",
      en: "The deadly weapon against big, wary predators. Its multiple jointed segments reproduce the undulation of a real fish — on the retrieve, it looks just like a fleeing, wounded baitfish. Ultra-detailed holographic finish that catches the light, 3D eyes and sharp treble hooks on reinforced split rings. Pike, bass, zander: few resist a swimbait that swims this naturally. Cast it where the biggest fish hide.",
      es: "El arma letal contra los grandes depredadores desconfiados. Sus múltiples segmentos articulados reproducen la ondulación de un pez real: al recoger, parece un pez herido que huye. Acabado holográfico ultradetallado que capta la luz, ojos 3D y anzuelos triples afilados en anillas reforzadas. Lucio, black-bass, lucioperca: pocos resisten un swimbait que nada tan natural. Lánzalo donde se esconden los peces más grandes." }
  },
  {
    id: 'lure-squid-luminous', category: 'lures', cost: usd(1.57), usd: 1.57, rating: 4.6, reviews: null, badge: 'new',
    photos: ['257012264793.webp','4167901215107.webp'],
    name: { fr: 'Turlutte à calamar lumineuse', en: 'Luminous Squid Jig', es: 'Señuelo de calamar luminoso' },
    desc: { fr: 'Phosphorescente, redoutable de nuit.', en: 'Glow-in-the-dark, deadly at night.', es: 'Fosforescente, temible de noche.' },
    long: {
      fr: "La turlutte qui brille pour faire la différence quand la lumière manque. Son corps phosphorescent se recharge en quelques secondes (lampe ou soleil) puis luit longuement sous l'eau, irrésistible pour les calamars et les seiches. Couronne d'aiguilles fine, piquante et anti-décrochage, équilibrage parfait pour une nage piquée du nez réaliste. Imbattable de nuit, à l'aube ou en eau profonde et trouble. À ce prix, on en garde toujours quelques-unes d'avance.",
      en: "The jig that glows to make the difference when light is scarce. Its phosphorescent body charges in seconds (lamp or sun) then glows long underwater, irresistible to squid and cuttlefish. Fine, sharp, anti-release spike crown and perfect balance for a realistic nose-down action. Unbeatable at night, at dawn or in deep, murky water. At this price, you'll always keep a few spare.",
      es: "El señuelo que brilla para marcar la diferencia cuando falta luz. Su cuerpo fosforescente se carga en segundos (lámpara o sol) y luego luce largo rato bajo el agua, irresistible para calamares y sepias. Corona de agujas fina, punzante y anti-desenganche, y equilibrio perfecto para un nado picado realista. Imbatible de noche, al amanecer o en aguas profundas y turbias. A este precio, siempre conviene tener algunos de reserva." }
  },
  {
    id: 'lure-wooden-popper', category: 'lures', cost: 8.82, usd: 6.44, rating: 4.6, reviews: null, badge: null, sku: 'CJYE121985603CX',
    photos: ['9aaaefc8-bd31-413f-bf52-331d8b4774ad.webp'],
    name: { fr: 'Popper de surface mer 20,5 cm', en: 'Sea Topwater Popper 20.5 cm', es: 'Popper de superficie mar 20,5 cm' },
    desc: { fr: 'Éclaboussures et « ploc » qui font mouche.', en: 'Spray and a popping sound that triggers.', es: 'Salpicaduras y un «ploc» que provoca.' },
    long: {
      fr: "Pour les sensations fortes de la pêche en surface. Sa large tête concave creuse l'eau à chaque coup de scion : éclaboussures et « ploc » sonore imitent une proie en panique et provoquent des attaques explosives en pleine surface. Corps de 20,5 cm bien lesté pour des lancers longue distance face au vent, anneaux brisés renforcés et hameçons triples prêts à encaisser les gros prédateurs marins (bar, bonite, liche). Plusieurs coloris pour s'adapter à la luminosité.",
      en: "For the thrill of topwater fishing. Its wide concave mouth digs into the water on every twitch — spray and a popping sound mimic a panicking prey and trigger explosive surface strikes. A well-weighted 20.5 cm body for long casts into the wind, reinforced split rings and treble hooks ready to take on big marine predators (bass, bonito, leerfish). Several colours to match the light.",
      es: "Para la emoción de la pesca en superficie. Su amplia boca cóncava cava el agua en cada tirón: salpicaduras y un sonido «ploc» imitan a una presa en pánico y provocan ataques explosivos en plena superficie. Cuerpo de 20,5 cm bien lastrado para lanzados largos contra el viento, anillas reforzadas y anzuelos triples listos para grandes depredadores marinos (lubina, bonito, pez limón). Varios colores para adaptarse a la luz." }
  },

  /* ════════ ACCESSOIRES ════════ */
  {
    id: 'gear-lure-box', category: 'gear', cost: usd(8.68), usd: 8.68, rating: 4.7, reviews: null, badge: null,
    photos: ['2021836171896.jpg','b266ef14-dabd-4c4f-8bd0-616e68e67047.webp','224077949605.webp'],
    name: { fr: 'Boîte à leurres portable multi-plateaux', en: 'Portable Multi-Tray Lure Box', es: 'Caja de señuelos portátil multibandeja' },
    desc: { fr: 'Tout ranger, tout retrouver d\'un coup d\'œil.', en: 'Store it all, find it at a glance.', es: 'Guárdalo todo, encuéntralo de un vistazo.' },
    long: {
      fr: "Fini le fouillis dans le sac de pêche. Cette mallette à poignée embarque plusieurs plateaux à compartiments amovibles : tu organises leurres, hameçons, plombs et petits accessoires, et tu retrouves tout en un coup d'œil. Coque robuste, fermeture à clips solides et format compact qui se cale facilement dans un sac ou sur le bateau. L'indispensable pour la pêche aux rochers, en bord de mer ou en sortie itinérante.",
      en: "No more mess in the tackle bag. This carry case packs several removable-compartment trays: organise lures, hooks, sinkers and small accessories, and find everything at a glance. Tough shell, strong clip closures and a compact size that tucks easily into a bag or on the boat. A must for rock fishing, the seaside or a roving session.",
      es: "Se acabó el desorden en la bolsa de pesca. Este maletín con asa lleva varias bandejas de compartimentos extraíbles: organizas señuelos, anzuelos, plomos y accesorios pequeños, y encuentras todo de un vistazo. Carcasa resistente, cierres de clip sólidos y formato compacto que se acomoda fácil en una bolsa o en el barco. Imprescindible para la pesca a roca, la costa o una salida itinerante." }
  },
  {
    id: 'gear-measure-mat', category: 'gear', cost: usd(6.30), usd: 6.30, rating: 4.5, reviews: null, badge: null,
    photos: ['47f4e8fe-f439-4b65-a8a8-29789b4bae50.jpg','c398941c-9a7f-4911-9b27-3ee46c37222b.webp','12a62eba-c2ac-496b-89a9-a8b73321c15d.jpg'],
    name: { fr: 'Tapis de mesure & relâche', en: 'Measure & Release Mat', es: 'Tapete de medición y suelta' },
    desc: { fr: 'Mesure, photographie, relâche en douceur.', en: 'Measure, photograph, release gently.', es: 'Mide, fotografía, suelta con cuidado.' },
    long: {
      fr: "Le geste responsable, bien fait. Ce tapis de réception à règle intégrée te permet de mesurer ta prise en une seconde et de la photographier proprement avant de la relâcher. La matière souple et humide protège le mucus et les écailles du poisson pour un no-kill respectueux. Pliable, léger et muni de poignées, il se transporte et se nettoie sans effort. Indispensable pour les amateurs de belles prises… qui retournent à l'eau.",
      en: "The responsible move, done right. This landing mat with a built-in ruler lets you measure your catch in a second and photograph it cleanly before release. The soft, wettable material protects the fish's slime coat and scales for respectful catch-and-release. Foldable, light and fitted with handles, it carries and cleans effortlessly. A must for fans of fine catches… that go back in the water.",
      es: "El gesto responsable, bien hecho. Este tapete de recepción con regla integrada te permite medir tu captura en un segundo y fotografiarla limpiamente antes de soltarla. El material blando y humedecible protege el mucus y las escamas del pez para una suelta respetuosa. Plegable, ligero y con asas, se transporta y se limpia sin esfuerzo. Imprescindible para los amantes de las buenas capturas… que vuelven al agua." }
  },
  {
    id: 'gear-line-fluoro', category: 'gear', cost: usd(1.96), usd: 1.96, rating: 4.6, reviews: null, badge: null,
    photos: ['1274158266157.webp','ac3e91c0-a614-4b68-956f-a4879805f47f.webp'],
    name: { fr: 'Fil fluorocarbone', en: 'Fluorocarbon Line', es: 'Hilo de fluorocarbono' },
    desc: { fr: 'Quasi invisible, ultra résistant à l\'abrasion.', en: 'Near-invisible, abrasion-resistant.', es: 'Casi invisible, resistente a la abrasión.' },
    long: {
      fr: "L'arme secrète face aux poissons éduqués. L'indice de réfraction du fluorocarbone le rend quasiment invisible dans l'eau : les poissons méfiants ne voient plus le piège. Dense, il coule et transmet bien les touches, et sa résistance à l'abrasion encaisse les roches, branches et dents acérées. Faible mémoire pour des lancers réguliers. Parfait en bas de ligne discret, ou en corps de ligne pour la pêche fine.",
      en: "The secret weapon against educated fish. Fluorocarbon's refractive index makes it nearly invisible underwater — wary fish no longer see the trap. Dense, it sinks and transmits bites well, and its abrasion resistance shrugs off rocks, branches and sharp teeth. Low memory for consistent casts. Perfect as a discreet leader, or as a main line for finesse fishing.",
      es: "El arma secreta frente a peces educados. El índice de refracción del fluorocarbono lo hace casi invisible bajo el agua: los peces desconfiados ya no ven la trampa. Denso, se hunde y transmite bien las picadas, y su resistencia a la abrasión aguanta rocas, ramas y dientes afilados. Poca memoria para lanzados regulares. Perfecto como bajo de línea discreto o como línea madre para pesca fina." }
  },
  {
    id: 'gear-rod-holder', category: 'gear', cost: usd(2.80), usd: 2.80, rating: 4.4, reviews: null, badge: null,
    photos: ['2223383064093.webp'],
    name: { fr: 'Support de canne (lot)', en: 'Rod Holder (set)', es: 'Soporte de caña (juego)' },
    desc: { fr: 'Mains libres pendant que ça mord.', en: 'Hands free while it bites.', es: 'Manos libres mientras pica.' },
    long: {
      fr: "Le petit accessoire qui change la sortie. Plante-le sur la berge ou fixe-le au bateau, pose ta canne, et garde les mains libres pour ferrer au bon moment, préparer un autre montage ou simplement souffler. Plastique robuste, léger et compact, compatible avec la plupart des cannes. À ce prix, on en prend deux ou trois pour pêcher à plusieurs cannes en même temps.",
      en: "The little accessory that changes the trip. Stick it in the bank or clip it to the boat, rest your rod, and keep your hands free to strike at the right moment, rig another setup or simply take a break. Sturdy plastic, light and compact, compatible with most rods. At this price, grab two or three to fish several rods at once.",
      es: "El pequeño accesorio que cambia la salida. Clávalo en la orilla o fíjalo al barco, apoya tu caña y mantén las manos libres para clavar en el momento justo, preparar otro montaje o simplemente descansar. Plástico resistente, ligero y compacto, compatible con la mayoría de cañas. A este precio, llévate dos o tres para pescar con varias cañas a la vez." }
  },
  {
    id: 'gear-line-nylon', category: 'gear', cost: usd(1.11), usd: 1.11, rating: 4.4, reviews: null, badge: null,
    photos: ['1783466296726.webp','df5e8b91-2e7c-4838-9425-70c214887fdf.webp'],
    name: { fr: 'Fil nylon multicolore', en: 'Multicolor Nylon Line', es: 'Hilo de nailon multicolor' },
    desc: { fr: 'Monofilament polyvalent, plusieurs diamètres.', en: 'Versatile mono, several diameters.', es: 'Monofilamento versátil, varios diámetros.' },
    long: {
      fr: "Le fil à tout faire, au meilleur prix. Ce monofilament nylon résistant et légèrement élastique amortit les rushes du poisson et pardonne les erreurs de frein — idéal quand on débute. Disponible en plusieurs diamètres et couleurs pour s'adapter à chaque pêche, de la truite au gros poisson. De quoi garnir plusieurs moulinets pour une bouchée de pain, en eau douce comme en mer.",
      en: "The do-it-all line, at the best price. This strong, slightly stretchy nylon monofilament cushions the fish's runs and forgives drag mistakes — ideal when starting out. Available in several diameters and colours to suit every style, from trout to big fish. Enough to spool several reels for next to nothing, in freshwater or at sea.",
      es: "El hilo para todo, al mejor precio. Este monofilamento de nailon resistente y algo elástico amortigua los arranques del pez y perdona errores de freno: ideal para empezar. Disponible en varios diámetros y colores para adaptarse a cada pesca, de la trucha al pez grande. Suficiente para llenar varios carretes por muy poco, en agua dulce o en el mar." }
  },
  {
    id: 'gear-sinkers', category: 'gear', cost: usd(0.20), usd: 0.20, rating: 4.3, reviews: null, badge: null,
    photos: ['61913089-3d71-41e3-9a57-e835c825460e.jpg','00ea5a30-6356-4a1b-86cd-7722f3563ae9.webp'],
    name: { fr: 'Plombs goutte d\'eau (lot)', en: 'Teardrop Sinkers (set)', es: 'Plomos gota de agua (juego)' },
    desc: { fr: 'Pour lester ta ligne et atteindre le fond.', en: 'To weight your line and reach the bottom.', es: 'Para lastrar tu línea y llegar al fondo.' },
    long: {
      fr: "La base de toute boîte à pêche. Ces plombs en forme de goutte d'eau, montés sur émerillon, lestent ta ligne pour atteindre le fond et la maintenir en place malgré le courant. Profil hydrodynamique qui s'accroche peu dans les roches. Plusieurs poids pour t'adapter à la profondeur et au débit. Indispensables et tellement bon marché qu'on en a toujours dans la poche.",
      en: "The backbone of any tackle box. These teardrop sinkers, mounted on a swivel, weight your line to reach the bottom and hold it in place against the current. A hydrodynamic profile that snags little in the rocks. Several weights to match depth and flow. Essential — and so cheap you'll always keep some in your pocket.",
      es: "La base de cualquier caja de pesca. Estos plomos en forma de gota de agua, montados sobre destorcedor, lastran tu línea para llegar al fondo y mantenerla en su sitio pese a la corriente. Perfil hidrodinámico que se engancha poco en las rocas. Varios pesos para adaptarte a la profundidad y al caudal. Imprescindibles y tan baratos que siempre llevas algunos en el bolsillo." }
  },
];

/* Image principale = 1ʳᵉ photo de la galerie */
PRODUCTS.forEach(p => { p.image = photo(p.photos[0], p.name.fr); });

/* Prix de vente = cost (CAD) x MARKUP. */
function salePrice(cost) {
  return Math.round(cost * MARKUP * 100) / 100;
}
