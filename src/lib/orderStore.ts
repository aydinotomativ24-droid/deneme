import { promises as fs } from "fs";
import path from "path";
import type { Order, OrderStatus } from "./orders";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "orders.json");

async function readAll(): Promise<Order[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
}

async function writeAll(orders: Order[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(orders, null, 2), "utf8");
}

export async function addOrder(order: Order): Promise<void> {
  const all = await readAll();
  all.unshift(order);
  await writeAll(all);
}

export async function listOrders(): Promise<Order[]> {
  return readAll();
}

export async function findOrder(orderNumber: string): Promise<Order | undefined> {
  const normalized = orderNumber.trim().toUpperCase();
  const all = await readAll();
  return all.find((o) => o.number.toUpperCase() === normalized);
}

export async function updateOrderStatus(
  orderNumber: string,
  status: OrderStatus,
): Promise<Order | undefined> {
  const normalized = orderNumber.trim().toUpperCase();
  const all = await readAll();
  const idx = all.findIndex((o) => o.number.toUpperCase() === normalized);
  if (idx === -1) return undefined;
  all[idx] = { ...all[idx], status };
  await writeAll(all);
  return all[idx];
}
