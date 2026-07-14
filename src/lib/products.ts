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
