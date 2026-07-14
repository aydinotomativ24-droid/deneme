export type CategorySlug =
  | "climatiseur-mobile"
  | "climatiseur-split"
  | "climatiseur-reversible"
  | "climatiseur-multi-split";

export type Category = {
  slug: CategorySlug;
  name: string;
  description: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: CategorySlug;
  price: number; // EUR, TTC
  oldPrice?: number; // EUR, TTC
  rating: number; // 0-5
  reviews: number;
  color: string; // used for the generated illustration
  image?: string; // real product photo (falls back to generated illustration)
  inStock: boolean;
  shortDescription: string;
  description: string;
  specs: {
    puissanceBtu: number;
    surfaceMax: number; // m²
    classeEnergetique: "A" | "A+" | "A++" | "A+++";
    niveauSonore: number; // dB
    reversible: boolean;
    fluide: string;
    garantieAns: number;
  };
  features: string[];
};

export const CATEGORIES: Category[] = [
  {
    slug: "climatiseur-mobile",
    name: "Climatiseurs mobiles",
    description:
      "Faciles à déplacer de pièce en pièce, sans installation. Idéals pour rafraîchir ponctuellement.",
  },
  {
    slug: "climatiseur-split",
    name: "Climatiseurs split",
    description:
      "Une unité intérieure et une unité extérieure pour un refroidissement silencieux et performant.",
  },
  {
    slug: "climatiseur-reversible",
    name: "Climatiseurs réversibles",
    description:
      "Chauffent en hiver et rafraîchissent en été : le confort toute l'année en une seule solution.",
  },
  {
    slug: "climatiseur-multi-split",
    name: "Multi-split",
    description:
      "Une unité extérieure raccordée à plusieurs unités intérieures pour équiper toute la maison.",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "airfroid-cool-9000-mobile",
    name: "AirFroid Cool 9000",
    brand: "AirFroid",
    category: "climatiseur-mobile",
    price: 299.99,
    oldPrice: 349.99,
    rating: 4.5,
    reviews: 128,
    color: "#0ea5e9",
    inStock: true,
    shortDescription: "Climatiseur mobile 9000 BTU pour pièces jusqu'à 25 m².",
    description:
      "Le climatiseur mobile AirFroid Cool 9000 rafraîchit rapidement vos pièces sans installation. Sa télécommande, son minuteur 24 h et son mode nuit vous garantissent un confort optimal. Roulettes multidirectionnelles pour le déplacer facilement.",
    specs: {
      puissanceBtu: 9000,
      surfaceMax: 25,
      classeEnergetique: "A",
      niveauSonore: 65,
      reversible: false,
      fluide: "R290",
      garantieAns: 2,
    },
    features: [
      "Installation sans travaux",
      "Télécommande incluse",
      "Minuteur 24 heures",
      "Mode nuit silencieux",
      "Roulettes multidirectionnelles",
    ],
  },
  {
    id: "2",
    slug: "airfroid-cool-12000-mobile",
    name: "AirFroid Cool 12000",
    brand: "AirFroid",
    category: "climatiseur-mobile",
    price: 379.99,
    rating: 4.3,
    reviews: 86,
    color: "#38bdf8",
    inStock: true,
    shortDescription: "Climatiseur mobile 12000 BTU pour pièces jusqu'à 35 m².",
    description:
      "Puissant et compact, le AirFroid Cool 12000 refroidit les grandes pièces jusqu'à 35 m². Fonction déshumidificateur et filtre lavable pour un air sain.",
    specs: {
      puissanceBtu: 12000,
      surfaceMax: 35,
      classeEnergetique: "A+",
      niveauSonore: 63,
      reversible: false,
      fluide: "R290",
      garantieAns: 2,
    },
    features: [
      "Fonction déshumidificateur",
      "Filtre lavable",
      "Écran LED tactile",
      "3 vitesses de ventilation",
      "Écoulement automatique",
    ],
  },
  {
    id: "3",
    slug: "airfroid-inverter-split-12000",
    name: "AirFroid Inverter Split 12000",
    brand: "AirFroid",
    category: "climatiseur-split",
    price: 549.99,
    oldPrice: 629.99,
    rating: 4.7,
    reviews: 214,
    color: "#2563eb",
    inStock: true,
    shortDescription: "Split mural inverter 12000 BTU, classe A++, ultra silencieux.",
    description:
      "Le split mural AirFroid Inverter 12000 combine performance et discrétion. Sa technologie Inverter réduit la consommation jusqu'à 30 % et maintient une température stable, avec un niveau sonore de seulement 22 dB.",
    specs: {
      puissanceBtu: 12000,
      surfaceMax: 40,
      classeEnergetique: "A++",
      niveauSonore: 22,
      reversible: false,
      fluide: "R32",
      garantieAns: 3,
    },
    features: [
      "Technologie Inverter",
      "Ultra silencieux 22 dB",
      "Wi-Fi intégré",
      "Filtre anti-bactérien",
      "Kit d'installation inclus",
    ],
  },
  {
    id: "4",
    slug: "airfroid-clim-reversible-18000",
    name: "AirFroid Réversible 18000",
    brand: "AirFroid",
    category: "climatiseur-reversible",
    price: 799.99,
    oldPrice: 899.99,
    rating: 4.8,
    reviews: 342,
    color: "#7c3aed",
    inStock: true,
    shortDescription: "Réversible chaud/froid 18000 BTU, classe A+++, pour 55 m².",
    description:
      "Chauffage en hiver, climatisation en été : le AirFroid Réversible 18000 vous offre le confort toute l'année. Classe énergétique A+++ pour des économies maximales et pilotage depuis votre smartphone.",
    specs: {
      puissanceBtu: 18000,
      surfaceMax: 55,
      classeEnergetique: "A+++",
      niveauSonore: 24,
      reversible: true,
      fluide: "R32",
      garantieAns: 5,
    },
    features: [
      "Chauffe et refroidit",
      "Classe A+++",
      "Pilotage Wi-Fi / application",
      "Mode Éco intelligent",
      "Auto-diagnostic",
      "Garantie 5 ans",
    ],
  },
  {
    id: "5",
    slug: "airfroid-clim-reversible-9000",
    name: "AirFroid Réversible 9000",
    brand: "AirFroid",
    category: "climatiseur-reversible",
    price: 499.99,
    rating: 4.6,
    reviews: 176,
    color: "#a855f7",
    inStock: true,
    shortDescription: "Réversible chaud/froid 9000 BTU pour chambre jusqu'à 25 m².",
    description:
      "Idéal pour les chambres, le AirFroid Réversible 9000 assure un confort silencieux toute l'année. Mode nuit et minuterie programmable pour un sommeil paisible.",
    specs: {
      puissanceBtu: 9000,
      surfaceMax: 25,
      classeEnergetique: "A++",
      niveauSonore: 20,
      reversible: true,
      fluide: "R32",
      garantieAns: 3,
    },
    features: [
      "Chauffe et refroidit",
      "Mode nuit 20 dB",
      "Minuterie programmable",
      "Filtre à poussière",
      "Kit d'installation inclus",
    ],
  },
  {
    id: "6",
    slug: "airfroid-multi-split-bi-split",
    name: "AirFroid Multi-Split Bi-split",
    brand: "AirFroid",
    category: "climatiseur-multi-split",
    price: 1299.99,
    oldPrice: 1499.99,
    rating: 4.9,
    reviews: 97,
    color: "#0891b2",
    inStock: true,
    shortDescription: "1 unité extérieure + 2 unités intérieures, réversible A++.",
    description:
      "Équipez deux pièces avec une seule unité extérieure. Le AirFroid Multi-Split Bi-split est réversible, silencieux et connecté, parfait pour un salon et une chambre.",
    specs: {
      puissanceBtu: 18000,
      surfaceMax: 60,
      classeEnergetique: "A++",
      niveauSonore: 23,
      reversible: true,
      fluide: "R32",
      garantieAns: 5,
    },
    features: [
      "1 extérieur + 2 intérieurs",
      "Réversible chaud/froid",
      "Wi-Fi intégré",
      "Installation professionnelle recommandée",
      "Garantie 5 ans",
    ],
  },
  {
    id: "7",
    slug: "airfroid-multi-split-tri-split",
    name: "AirFroid Multi-Split Tri-split",
    brand: "AirFroid",
    category: "climatiseur-multi-split",
    price: 1899.99,
    rating: 4.7,
    reviews: 54,
    color: "#0d9488",
    inStock: false,
    shortDescription: "1 unité extérieure + 3 unités intérieures pour toute la maison.",
    description:
      "La solution complète pour équiper trois pièces. Le AirFroid Multi-Split Tri-split combine puissance, silence et connectivité pour un confort dans toute la maison.",
    specs: {
      puissanceBtu: 27000,
      surfaceMax: 90,
      classeEnergetique: "A++",
      niveauSonore: 24,
      reversible: true,
      fluide: "R32",
      garantieAns: 5,
    },
    features: [
      "1 extérieur + 3 intérieurs",
      "Réversible chaud/froid",
      "Wi-Fi intégré",
      "Idéal maison entière",
      "Garantie 5 ans",
    ],
  },
  {
    id: "8",
    slug: "airfroid-cool-7000-mobile",
    name: "AirFroid Cool 7000",
    brand: "AirFroid",
    category: "climatiseur-mobile",
    price: 229.99,
    oldPrice: 269.99,
    rating: 4.1,
    reviews: 61,
    color: "#06b6d4",
    inStock: true,
    shortDescription: "Climatiseur mobile compact 7000 BTU pour petites pièces.",
    description:
      "Compact et économique, le AirFroid Cool 7000 est parfait pour les petites pièces jusqu'à 18 m². Léger et silencieux, il se déplace au gré de vos besoins.",
    specs: {
      puissanceBtu: 7000,
      surfaceMax: 18,
      classeEnergetique: "A",
      niveauSonore: 62,
      reversible: false,
      fluide: "R290",
      garantieAns: 2,
    },
    features: [
      "Format compact",
      "Léger et mobile",
      "Télécommande incluse",
      "Minuteur programmable",
      "Filtre lavable",
    ],
  },
  {
    id: "9",
    slug: "htw-monobloc-aam35da-r290",
    name: "HTW Monobloc AAM35DA-R290",
    brand: "HTW",
    category: "climatiseur-reversible",
    price: 458,
    rating: 4.4,
    reviews: 37,
    color: "#0ea5e9",
    image: "/products/htw-aam35da-r290.avif",
    inStock: true,
    shortDescription:
      "Climatiseur monobloc réversible sans unité extérieure, pour pièces jusqu'à 30 m².",
    description:
      "Le HTW AAM35DA-R290 est un climatiseur monobloc mural réversible qui ne nécessite aucune unité extérieure : idéal lorsque l'installation d'un split n'est pas possible. Puissance froid de 3,5 kW et chaud de 2,9 kW pour couvrir des pièces jusqu'à 30 m², avec le fluide écologique R290.",
    specs: {
      puissanceBtu: 12000,
      surfaceMax: 30,
      classeEnergetique: "A",
      niveauSonore: 60,
      reversible: true,
      fluide: "R290",
      garantieAns: 2,
    },
    features: [
      "Monobloc sans unité extérieure",
      "Réversible chaud/froid (3,5 kW froid · 2,9 kW chaud)",
      "Fluide écologique R290",
      "Classe froid A / chaud A+",
      "Installation simplifiée",
    ],
  },
  {
    id: "10",
    slug: "airfroid-cool-10000-mobile",
    name: "AirFroid Cool 10000",
    brand: "AirFroid",
    category: "climatiseur-mobile",
    price: 329.99,
    rating: 4.4,
    reviews: 73,
    color: "#22d3ee",
    inStock: true,
    shortDescription: "Climatiseur mobile 10000 BTU avec fonction déshumidificateur.",
    description:
      "Le AirFroid Cool 10000 rafraîchit les pièces jusqu'à 30 m² sans installation. Mode déshumidificateur, ventilation 3 vitesses et écran LED pour un pilotage simple au quotidien.",
    specs: {
      puissanceBtu: 10000,
      surfaceMax: 30,
      classeEnergetique: "A+",
      niveauSonore: 64,
      reversible: false,
      fluide: "R290",
      garantieAns: 2,
    },
    features: [
      "Installation sans travaux",
      "Mode déshumidificateur",
      "3 vitesses de ventilation",
      "Écran LED + télécommande",
      "Roulettes multidirectionnelles",
    ],
  },
  {
    id: "11",
    slug: "airfroid-inverter-split-9000",
    name: "AirFroid Inverter Split 9000",
    brand: "AirFroid",
    category: "climatiseur-split",
    price: 449.99,
    rating: 4.6,
    reviews: 138,
    color: "#3b82f6",
    inStock: true,
    shortDescription: "Split mural inverter 9000 BTU, classe A++, Wi-Fi.",
    description:
      "Compact et discret, le AirFroid Inverter Split 9000 rafraîchit les chambres et bureaux jusqu'à 25 m². Sa technologie Inverter stabilise la température tout en réduisant la consommation, avec pilotage Wi-Fi depuis l'application.",
    specs: {
      puissanceBtu: 9000,
      surfaceMax: 25,
      classeEnergetique: "A++",
      niveauSonore: 21,
      reversible: false,
      fluide: "R32",
      garantieAns: 3,
    },
    features: [
      "Technologie Inverter",
      "Silencieux 21 dB",
      "Wi-Fi intégré",
      "Filtre anti-bactérien",
      "Kit d'installation inclus",
    ],
  },
  {
    id: "12",
    slug: "airfroid-inverter-split-18000",
    name: "AirFroid Inverter Split 18000",
    brand: "AirFroid",
    category: "climatiseur-split",
    price: 749.99,
    oldPrice: 849.99,
    rating: 4.7,
    reviews: 91,
    color: "#1d4ed8",
    inStock: true,
    shortDescription: "Split mural inverter 18000 BTU pour grandes pièces jusqu'à 55 m².",
    description:
      "Puissant et silencieux, le AirFroid Inverter Split 18000 équipe les salons et grands espaces jusqu'à 55 m². Technologie Inverter pour des économies d'énergie et un confort constant.",
    specs: {
      puissanceBtu: 18000,
      surfaceMax: 55,
      classeEnergetique: "A++",
      niveauSonore: 25,
      reversible: false,
      fluide: "R32",
      garantieAns: 3,
    },
    features: [
      "Technologie Inverter",
      "Grandes pièces jusqu'à 55 m²",
      "Wi-Fi intégré",
      "Mode Éco",
      "Kit d'installation inclus",
    ],
  },
  {
    id: "13",
    slug: "airfroid-clim-reversible-12000",
    name: "AirFroid Réversible 12000",
    brand: "AirFroid",
    category: "climatiseur-reversible",
    price: 599.99,
    rating: 4.7,
    reviews: 205,
    color: "#8b5cf6",
    inStock: true,
    shortDescription: "Réversible chaud/froid 12000 BTU pour pièces jusqu'à 40 m².",
    description:
      "Le AirFroid Réversible 12000 chauffe en hiver et rafraîchit en été. Classe A++, pilotage Wi-Fi et mode nuit silencieux pour un confort toute l'année dans les pièces jusqu'à 40 m².",
    specs: {
      puissanceBtu: 12000,
      surfaceMax: 40,
      classeEnergetique: "A++",
      niveauSonore: 22,
      reversible: true,
      fluide: "R32",
      garantieAns: 3,
    },
    features: [
      "Chauffe et refroidit",
      "Classe A++",
      "Pilotage Wi-Fi",
      "Mode nuit silencieux",
      "Kit d'installation inclus",
    ],
  },
  {
    id: "14",
    slug: "airfroid-clim-reversible-24000",
    name: "AirFroid Réversible 24000",
    brand: "AirFroid",
    category: "climatiseur-reversible",
    price: 999.99,
    oldPrice: 1149.99,
    rating: 4.8,
    reviews: 118,
    color: "#6d28d9",
    inStock: true,
    shortDescription: "Réversible chaud/froid 24000 BTU, classe A+++, pour 70 m².",
    description:
      "La solution puissante pour les grands espaces jusqu'à 70 m². Le AirFroid Réversible 24000 offre chauffage et climatisation en classe A+++, avec pilotage intelligent et mode Éco pour des économies maximales.",
    specs: {
      puissanceBtu: 24000,
      surfaceMax: 70,
      classeEnergetique: "A+++",
      niveauSonore: 26,
      reversible: true,
      fluide: "R32",
      garantieAns: 5,
    },
    features: [
      "Chauffe et refroidit",
      "Classe A+++",
      "Grandes pièces jusqu'à 70 m²",
      "Pilotage Wi-Fi / application",
      "Garantie 5 ans",
    ],
  },
  {
    id: "15",
    slug: "airfroid-multi-split-quadri",
    name: "AirFroid Multi-Split Quadri-split",
    brand: "AirFroid",
    category: "climatiseur-multi-split",
    price: 2499.99,
    rating: 4.8,
    reviews: 42,
    color: "#0ea5a5",
    inStock: true,
    shortDescription: "1 unité extérieure + 4 unités intérieures pour toute la maison.",
    description:
      "Équipez jusqu'à quatre pièces avec une seule unité extérieure. Le AirFroid Multi-Split Quadri-split est réversible, connecté et silencieux, idéal pour les grandes maisons.",
    specs: {
      puissanceBtu: 36000,
      surfaceMax: 110,
      classeEnergetique: "A++",
      niveauSonore: 25,
      reversible: true,
      fluide: "R32",
      garantieAns: 5,
    },
    features: [
      "1 extérieur + 4 intérieurs",
      "Réversible chaud/froid",
      "Wi-Fi intégré",
      "Idéal grande maison",
      "Garantie 5 ans",
    ],
  },
  {
    id: "16",
    slug: "essentielb-ecmr12b-r290",
    name: "Essentielb ECMR12b R290",
    brand: "Essentielb",
    category: "climatiseur-mobile",
    price: 458,
    rating: 4.3,
    reviews: 24,
    color: "#e2e8f0",
    image: "/products/essentielb-ecmr12b-r290.webp",
    inStock: true,
    shortDescription:
      "Climatiseur mobile réversible 4-en-1 (froid, chaud, déshumidificateur, ventilateur) au fluide R290.",
    description:
      "Le climatiseur mobile Essentielb ECMR12b est un appareil 4-en-1 : climatisation, chauffage, déshumidification et ventilation. Puissance froid de 3,5 kW et chaud de 3,2 kW pour les pièces jusqu'à 35 m², sans installation, avec le fluide écologique R290.",
    specs: {
      puissanceBtu: 12000,
      surfaceMax: 35,
      classeEnergetique: "A",
      niveauSonore: 65,
      reversible: true,
      fluide: "R290",
      garantieAns: 2,
    },
    features: [
      "4-en-1 : froid, chaud, déshumidificateur, ventilateur",
      "Réversible chaud/froid (3,5 kW froid · 3,2 kW chaud)",
      "Installation sans travaux",
      "Fluide écologique R290",
      "Écran tactile + télécommande",
    ],
  },
  {
    id: "17",
    slug: "dreame-p-wind-9k-black-gold",
    name: "Dreame P-Wind 9K Black Gold",
    brand: "Dreame",
    category: "climatiseur-mobile",
    price: 398,
    rating: 4.5,
    reviews: 31,
    color: "#4b5563",
    image: "/products/dreame-p-wind-9k-black-gold.webp",
    inStock: true,
    shortDescription:
      "Climatiseur mobile 9000 BTU au design Black Gold, pour pièces jusqu'à 25 m².",
    description:
      "Le climatiseur mobile Dreame P-Wind 9K allie performance et design avec sa finition Black Gold. 9000 BTU pour rafraîchir les pièces jusqu'à 25 m² sans installation, avec déshumidificateur, ventilateur et roulettes pour un déplacement facile.",
    specs: {
      puissanceBtu: 9000,
      surfaceMax: 25,
      classeEnergetique: "A",
      niveauSonore: 65,
      reversible: false,
      fluide: "R290",
      garantieAns: 2,
    },
    features: [
      "Design Black Gold",
      "Installation sans travaux",
      "Fonction déshumidificateur + ventilateur",
      "Fluide écologique R290",
      "Roulettes multidirectionnelles + télécommande",
    ],
  },
  {
    id: "18",
    slug: "ecoflow-wave-3",
    name: "EcoFlow Wave 3",
    brand: "EcoFlow",
    category: "climatiseur-mobile",
    price: 1198,
    rating: 4.6,
    reviews: 48,
    color: "#334155",
    image: "/products/ecoflow-wave-3.webp",
    inStock: true,
    shortDescription:
      "Climatiseur portable réversible froid/chaud, compatible batterie, idéal petits espaces et plein air.",
    description:
      "L'EcoFlow Wave 3 est un climatiseur portable réversible qui refroidit et chauffe. Compact et compatible avec une batterie additionnelle, il est idéal pour les petites pièces, bureaux, van et espaces sans installation fixe. Refroidissement rapide et pilotage via application.",
    specs: {
      puissanceBtu: 6100,
      surfaceMax: 15,
      classeEnergetique: "A",
      niveauSonore: 55,
      reversible: true,
      fluide: "R290",
      garantieAns: 2,
    },
    features: [
      "Portable froid + chaud (réversible)",
      "Compatible batterie additionnelle",
      "Refroidissement rapide",
      "Pilotage via application",
      "Idéal van, bureau, petits espaces",
    ],
  },
  {
    id: "19",
    slug: "bosch-cool-2000",
    name: "Bosch Cool 2000",
    brand: "Bosch",
    category: "climatiseur-mobile",
    price: 598,
    rating: 4.5,
    reviews: 64,
    color: "#f1f5f9",
    image: "/products/bosch-cool-2000.webp",
    inStock: true,
    shortDescription:
      "Climatiseur mobile Bosch pour pièces moyennes, avec déshumidificateur et minuteur.",
    description:
      "Le climatiseur mobile Bosch Cool 2000 rafraîchit efficacement les pièces moyennes sans installation. Fonction déshumidificateur, ventilation multi-vitesses et minuteur programmable pour un confort maîtrisé, le tout dans un design blanc épuré signé Bosch.",
    specs: {
      puissanceBtu: 12000,
      surfaceMax: 34,
      classeEnergetique: "A",
      niveauSonore: 65,
      reversible: false,
      fluide: "R290",
      garantieAns: 2,
    },
    features: [
      "Installation sans travaux",
      "Fonction déshumidificateur",
      "Ventilation multi-vitesses",
      "Minuteur programmable",
      "Roulettes multidirectionnelles + télécommande",
    ],
  },
  {
    id: "20",
    slug: "tcl-p07f5csw0f-7000-btu",
    name: "TCL P07F5CSW0F 7000 BTU",
    brand: "TCL",
    category: "climatiseur-mobile",
    price: 398,
    rating: 4.2,
    reviews: 52,
    color: "#f8fafc",
    image: "/products/tcl-p07f5csw0f.webp",
    inStock: true,
    shortDescription:
      "Climatiseur mobile 7000 BTU compact pour petites pièces jusqu'à 20 m².",
    description:
      "Le climatiseur mobile TCL P07F5CSW0F offre 7000 BTU pour rafraîchir les petites pièces jusqu'à 20 m² sans installation. Compact et léger, il intègre un déshumidificateur, un minuteur et une télécommande pour un usage simple au quotidien.",
    specs: {
      puissanceBtu: 7000,
      surfaceMax: 20,
      classeEnergetique: "A",
      niveauSonore: 63,
      reversible: false,
      fluide: "R290",
      garantieAns: 2,
    },
    features: [
      "Format compact et léger",
      "Installation sans travaux",
      "Fonction déshumidificateur",
      "Minuteur programmable",
      "Télécommande incluse",
    ],
  },
];

// Promotion appliquée à tout le catalogue.
export const PROMO = {
  active: true,
  rate: 0.5, // -50 %
  label: "-50 %",
  message: "Offre de lancement : -50 % sur tout le catalogue pendant 1 mois",
  endsAt: "2026-08-14", // ~1 mois
};

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(slug: string): Product[] {
  return PRODUCTS.filter((p) => p.category === slug);
}
