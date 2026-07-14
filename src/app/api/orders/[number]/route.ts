import { NextResponse } from "next/server";
import { ORDER_STEPS, type OrderStatus } from "@/lib/orders";
import { findOrder, updateOrderStatus } from "@/lib/orderStore";
import { isAuthorized } from "@/lib/adminAuth";

const VALID_STATUSES = ORDER_STEPS.map((s) => s.status);

type Ctx = { params: Promise<{ number: string }> };

export async function GET(_request: Request, { params }: Ctx) {
  const { number } = await params;
  const order = await findOrder(number);
  if (!order) {
    return NextResponse.json({ error: "Commande introuvable." }, { status: 404 });
  }
  return NextResponse.json({ order });
}

export async function PATCH(request: Request, { params }: Ctx) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { number } = await params;
  let body: { status?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const status = body.status as OrderStatus;
  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
  }

  const updated = await updateOrderStatus(number, status);
  if (!updated) {
    return NextResponse.json({ error: "Commande introuvable." }, { status: 404 });
  }
  return NextResponse.json({ order: updated });
}
