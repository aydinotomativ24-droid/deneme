import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getProductById } from "@/lib/products";

const FREE_SHIPPING_THRESHOLD = 500;
const SHIPPING_FEE = 29.99;

type CheckoutItem = { id: string; quantity: number };

function getOrigin(request: Request): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl) return envUrl.replace(/\/$/, "");
  const origin = request.headers.get("origin");
  if (origin) return origin;
  const host = request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") ?? "http";
  return host ? `${proto}://${host}` : "http://localhost:3000";
}

export async function POST(request: Request) {
  let body: { items?: CheckoutItem[] };
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

  const origin = getOrigin(request);
  const subtotal = lineItems.reduce(
    (sum, li) => sum + li.product.price * li.quantity,
    0,
  );
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

  const secretKey = process.env.STRIPE_SECRET_KEY;

  // Demo mode: allows testing the full flow locally without a Stripe key.
  if (!secretKey) {
    return NextResponse.json({
      url: `${origin}/commande/succes?demo=1`,
    });
  }

  try {
    const stripe = new Stripe(secretKey);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "fr",
      line_items: [
        ...lineItems.map((li) => ({
          quantity: li.quantity,
          price_data: {
            currency: "eur",
            unit_amount: Math.round(li.product.price * 100),
            product_data: {
              name: li.product.name,
              description: li.product.shortDescription,
            },
          },
        })),
        ...(shipping > 0
          ? [
              {
                quantity: 1,
                price_data: {
                  currency: "eur",
                  unit_amount: Math.round(shipping * 100),
                  product_data: { name: "Livraison" },
                },
              },
            ]
          : []),
      ],
      shipping_address_collection: { allowed_countries: ["FR", "BE", "LU", "MC"] },
      success_url: `${origin}/commande/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/panier`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Session de paiement invalide." },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Erreur de paiement.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
