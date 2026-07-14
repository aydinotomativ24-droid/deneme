export type ShippingAddress = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
};

export type OrderStatus =
  | "confirmee"
  | "en_preparation"
  | "expediee"
  | "livree";

export type OrderItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
};

// Démo uniquement : on ne stocke jamais le numéro complet ni le CVC.
export type PaymentInfo = {
  cardName: string;
  last4: string;
  expiry: string;
};

export type Order = {
  number: string;
  createdAt: string; // ISO date
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  address: ShippingAddress;
  payment?: PaymentInfo;
  status: OrderStatus;
};

export const ORDER_STEPS: { status: OrderStatus; label: string }[] = [
  { status: "confirmee", label: "Commande confirmée" },
  { status: "en_preparation", label: "En préparation" },
  { status: "expediee", label: "Expédiée" },
  { status: "livree", label: "Livrée" },
];

export function orderStatusLabel(status: OrderStatus): string {
  return ORDER_STEPS.find((s) => s.status === status)?.label ?? status;
}

export function generateOrderNumber(): string {
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `AF-${rand}`;
}
