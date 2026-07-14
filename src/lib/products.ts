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
    id: "16",
    slug: "essentielb-ecmr12b-r290",
    name: "Essentielb ECMR12b R290",
    brand: "Essentielb",
    category: "climatiseur-mobile",
    price: 600,
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
    price: 600,
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
    price: 600,
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
    price: 600,
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
    price: 600,
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
  {
    id: "21",
    slug: "hisense-apc12qc",
    name: "Hisense APC12QC",
    brand: "Hisense",
    category: "climatiseur-mobile",
    price: 600,
    rating: 4.4,
    reviews: 77,
    color: "#f8fafc",
    image: "/products/hisense-apc12qc.webp",
    inStock: true,
    shortDescription:
      "Climatiseur mobile 12000 BTU pour pièces jusqu'à 35 m², avec déshumidificateur.",
    description:
      "Le climatiseur mobile Hisense APC12QC délivre 12000 BTU pour rafraîchir les pièces jusqu'à 35 m² sans installation. Fonction déshumidificateur, mode ventilateur, minuteur et télécommande pour un confort maîtrisé au quotidien.",
    specs: {
      puissanceBtu: 12000,
      surfaceMax: 35,
      classeEnergetique: "A",
      niveauSonore: 65,
      reversible: false,
      fluide: "R290",
      garantieAns: 2,
    },
    features: [
      "Installation sans travaux",
      "Fonction déshumidificateur + ventilateur",
      "Minuteur programmable",
      "Fluide écologique R290",
      "Roulettes multidirectionnelles + télécommande",
    ],
  },
  {
    id: "22",
    slug: "optimea-opc-b01-120",
    name: "Optimea OPC-B01-120",
    brand: "Optimea",
    category: "climatiseur-mobile",
    price: 600,
    rating: 4.3,
    reviews: 39,
    color: "#f8fafc",
    image: "/products/optimea-mobile.webp",
    inStock: true,
    shortDescription:
      "Climatiseur mobile 12000 BTU pour pièces jusqu'à 35 m², avec déshumidificateur.",
    description:
      "Le climatiseur mobile Optimea OPC-B01-120 délivre 12000 BTU pour rafraîchir les pièces jusqu'à 35 m² sans installation. Fonction déshumidificateur, mode ventilateur, minuteur et télécommande pour un confort simple et efficace.",
    specs: {
      puissanceBtu: 12000,
      surfaceMax: 35,
      classeEnergetique: "A",
      niveauSonore: 65,
      reversible: false,
      fluide: "R290",
      garantieAns: 2,
    },
    features: [
      "Installation sans travaux",
      "Fonction déshumidificateur + ventilateur",
      "Minuteur programmable",
      "Fluide écologique R290",
      "Roulettes multidirectionnelles + télécommande",
    ],
  },
  {
    id: "23",
    slug: "duux-north-dxma12-18000-btu",
    name: "Duux North DXMA12 18000 BTU connecté",
    brand: "Duux",
    category: "climatiseur-mobile",
    price: 1400,
    rating: 4.6,
    reviews: 58,
    color: "#1f2937",
    image: "/products/duux-north-dxma12.webp",
    inStock: true,
    shortDescription:
      "Climatiseur mobile connecté 18000 BTU, pilotage Wi-Fi via application, pour grandes pièces.",
    description:
      "Le Duux North DXMA12 est un climatiseur mobile connecté de 18000 BTU, pilotable depuis l'application via Wi-Fi. Puissant pour les grandes pièces, il combine climatisation, déshumidification et ventilation avec un design élégant et un fonctionnement silencieux.",
    specs: {
      puissanceBtu: 18000,
      surfaceMax: 45,
      classeEnergetique: "A",
      niveauSonore: 65,
      reversible: false,
      fluide: "R290",
      garantieAns: 2,
    },
    features: [
      "Connecté Wi-Fi + application",
      "18000 BTU pour grandes pièces",
      "Déshumidificateur + ventilateur",
      "Installation sans travaux",
      "Roulettes multidirectionnelles + télécommande",
    ],
  },
  {
    id: "24",
    slug: "taurus-alpatec-b4507-cdp-ac205rvkt",
    name: "Taurus Alpatec B4507 CDP-AC205RVKT réversible",
    brand: "Taurus Alpatec",
    category: "climatiseur-reversible",
    price: 2000,
    rating: 4.4,
    reviews: 45,
    color: "#f8fafc",
    image: "/products/taurus-alpatec-cdp-ac205rvkt.jpg",
    inStock: true,
    shortDescription:
      "Climatiseur mobile monobloc réversible froid/chaud, kit fenêtre inclus, sans installation.",
    description:
      "Le Taurus Alpatec B4507 CDP-AC205RVKT est un climatiseur mobile monobloc réversible : il rafraîchit en été et chauffe en hiver, sans installation fixe. Livré avec kit d'étanchéité pour fenêtre, il intègre déshumidificateur, ventilateur, minuteur et télécommande.",
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
      "Monobloc réversible chaud/froid",
      "Kit d'étanchéité fenêtre inclus",
      "Déshumidificateur + ventilateur",
      "Installation sans travaux",
      "Roulettes multidirectionnelles + télécommande",
    ],
  },
  {
    id: "25",
    slug: "airline-split-b2119",
    name: "airLINE Split B2119",
    brand: "airLINE",
    category: "climatiseur-split",
    price: 1598,
    rating: 4.5,
    reviews: 41,
    color: "#f8fafc",
    image: "/products/airline-split-b2119.jpg",
    inStock: true,
    shortDescription:
      "Climatiseur split mural pour un refroidissement silencieux et performant.",
    description:
      "Le climatiseur split airLINE B2119 assure un refroidissement silencieux et performant grâce à son unité murale au design épuré. Idéal pour les pièces à vivre, il combine efficacité, discrétion et facilité d'utilisation.",
    specs: {
      puissanceBtu: 12000,
      surfaceMax: 40,
      classeEnergetique: "A++",
      niveauSonore: 24,
      reversible: false,
      fluide: "R32",
      garantieAns: 3,
    },
    features: [
      "Unité murale silencieuse",
      "Design épuré",
      "Ventilation multi-vitesses",
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
