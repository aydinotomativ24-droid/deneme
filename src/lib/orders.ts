import type { CartItem } from "@/context/CartContext";

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

export type Order = {
  number: string;
  createdAt: string; // ISO date
  items: Pick<CartItem, "id" | "slug" | "name" | "price" | "quantity">[];
  subtotal: number;
  shipping: number;
  total: number;
  address: ShippingAddress;
  status: OrderStatus;
};

export const ORDER_STEPS: { status: OrderStatus; label: string }[] = [
  { status: "confirmee", label: "Commande confirmée" },
  { status: "en_preparation", label: "En préparation" },
  { status: "expediee", label: "Expédiée" },
  { status: "livree", label: "Livrée" },
];

const STORAGE_KEY = "airfroid-orders";

export function generateOrderNumber(): string {
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `AF-${rand}`;
}

function readAll(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: Order): void {
  if (typeof window === "undefined") return;
  const all = readAll();
  all.unshift(order);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function getOrder(orderNumber: string): Order | undefined {
  const normalized = orderNumber.trim().toUpperCase();
  return readAll().find((o) => o.number.toUpperCase() === normalized);
}

export function getAllOrders(): Order[] {
  return readAll();
}
