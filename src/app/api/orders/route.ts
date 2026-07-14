import { NextResponse } from "next/server";
import { getProductById } from "@/lib/products";
import { salePrice } from "@/lib/pricing";
import {
  generateOrderNumber,
  type Order,
  type PaymentInfo,
  type ShippingAddress,
} from "@/lib/orders";
import { addOrder, listOrders } from "@/lib/orderStore";
import { isAuthorized } from "@/lib/adminAuth";

const FREE_SHIPPING_THRESHOLD = 500;
const SHIPPING_FEE = 29.99;

type IncomingItem = { id: string; quantity: number };

type Body = {
  items?: IncomingItem[];
  address?: Partial<ShippingAddress>;
  payment?: {
    cardName?: string;
    last4?: string;
    expiry?: string;
    cvcProvided?: boolean;
  };
};

function sanitizePayment(
  raw: Body["payment"],
): PaymentInfo | undefined {
  if (!raw) return undefined;
  const cardName = String(raw.cardName ?? "").trim();
  // On ne conserve QUE les 4 derniers chiffres (jamais le PAN complet / CVC).
  const last4 = String(raw.last4 ?? "").replace(/\D/g, "").slice(-4);
  const expiry = String(raw.expiry ?? "").trim();
  const cvcProvided = Boolean(raw.cvcProvided);
  if (!cardName && !last4) return undefined;
  return { cardName, last4, expiry, cvcProvided };
}

const REQUIRED_ADDRESS_FIELDS: (keyof ShippingAddress)[] = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "address",
  "postalCode",
  "city",
  "country",
];

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const rawItems = Array.isArray(body.items) ? body.items : [];
  const lineItems = rawItems
    .map((entry) => {
      const product = getProductById(entry.id);
      const quantity = Math.max(1, Math.floor(Number(entry.quantity) || 0));
      if (!product || !product.inStock) return null;
      return { product, quantity };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  if (lineItems.length === 0) {
    return NextResponse.json({ error: "Votre panier est vide." }, { status: 400 });
  }

  const addr = body.address ?? {};
  const missing = REQUIRED_ADDRESS_FIELDS.filter(
    (f) => !String(addr[f] ?? "").trim(),
  );
  if (missing.length > 0) {
    return NextResponse.json(
      { error: "Informations de livraison incomplètes." },
      { status: 400 },
    );
  }

  const subtotal =
    Math.round(
      lineItems.reduce((sum, li) => sum + salePrice(li.product) * li.quantity, 0) *
        100,
    ) / 100;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = Math.round((subtotal + shipping) * 100) / 100;

  const order: Order = {
    number: generateOrderNumber(),
    createdAt: new Date().toISOString(),
    items: lineItems.map((li) => ({
      id: li.product.id,
      slug: li.product.slug,
      name: li.product.name,
      price: salePrice(li.product),
      quantity: li.quantity,
    })),
    subtotal,
    shipping,
    total,
    address: {
      firstName: String(addr.firstName).trim(),
      lastName: String(addr.lastName).trim(),
      email: String(addr.email).trim(),
      phone: String(addr.phone).trim(),
      address: String(addr.address).trim(),
      postalCode: String(addr.postalCode).trim(),
      city: String(addr.city).trim(),
      country: String(addr.country).trim(),
    },
    payment: sanitizePayment(body.payment),
    status: "confirmee",
  };

  await addOrder(order);

  return NextResponse.json({ number: order.number });
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  const orders = await listOrders();
  return NextResponse.json({ orders });
}
