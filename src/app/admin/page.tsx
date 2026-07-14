"use client";

import { useState } from "react";
import { formatEUR } from "@/lib/format";
import { ORDER_STEPS, type Order, type OrderStatus } from "@/lib/orders";

const STORAGE_KEY = "airfroid-admin-pw";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function load(pw: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/orders", {
        headers: { "x-admin-password": pw },
      });
      if (res.status === 401) {
        setError("Mot de passe incorrect.");
        setAuthed(false);
        return;
      }
      const data = (await res.json()) as { orders: Order[] };
      setOrders(data.orders);
      setAuthed(true);
      sessionStorage.setItem(STORAGE_KEY, pw);
    } catch {
      setError("Erreur de chargement.");
    } finally {
      setLoading(false);
    }
  }

  async function changeStatus(number: string, status: OrderStatus) {
    const pw = sessionStorage.getItem(STORAGE_KEY) ?? password;
    const res = await fetch(`/api/orders/${encodeURIComponent(number)}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": pw,
      },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const data = (await res.json()) as { order: Order };
      setOrders((prev) =>
        prev.map((o) => (o.number === data.order.number ? data.order : o)),
      );
    }
  }

  if (!authed) {
    return (
      <div className="mx-auto max-w-sm px-4 py-20">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Espace administrateur
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Connectez-vous pour consulter les commandes.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            load(password);
          }}
          className="mt-6 space-y-3"
        >
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-800 outline-none focus:border-brand"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-accent px-4 py-2.5 font-semibold text-white hover:bg-accent-dark disabled:opacity-60"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Commandes ({orders.length})
        </h1>
        <button
          onClick={() => load(sessionStorage.getItem(STORAGE_KEY) ?? password)}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Rafraîchir
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="mt-8 text-slate-600">Aucune commande pour l&apos;instant.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((o) => (
            <div
              key={o.number}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-extrabold text-slate-900">
                    {o.number}
                  </p>
                  <p className="text-xs text-slate-500">
                    {new Date(o.createdAt).toLocaleString("fr-FR")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium text-slate-500">
                    Statut
                  </label>
                  <select
                    value={o.status}
                    onChange={(e) =>
                      changeStatus(o.number, e.target.value as OrderStatus)
                    }
                    className="rounded-lg border border-slate-300 px-2 py-1.5 text-sm"
                  >
                    {ORDER_STEPS.map((s) => (
                      <option key={s.status} value={s.status}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="text-sm">
                  <p className="font-semibold text-slate-700">Client</p>
                  <p className="mt-1 text-slate-600">
                    {o.address.firstName} {o.address.lastName}
                    <br />
                    {o.address.email}
                    <br />
                    {o.address.phone}
                  </p>
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-slate-700">Livraison</p>
                  <p className="mt-1 text-slate-600">
                    {o.address.address}
                    <br />
                    {o.address.postalCode} {o.address.city}
                    <br />
                    {o.address.country}
                  </p>
                </div>
              </div>

              <div className="mt-4 border-t border-slate-200 pt-3 text-sm">
                {o.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-slate-700">
                      {item.quantity} × {item.name}
                    </span>
                    <span className="font-semibold">
                      {formatEUR(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
                <div className="mt-2 flex justify-between border-t border-slate-100 pt-2">
                  <span className="text-slate-600">Livraison</span>
                  <span className="font-semibold">
                    {o.shipping === 0 ? "Offerte" : formatEUR(o.shipping)}
                  </span>
                </div>
                <div className="mt-1 flex justify-between text-base">
                  <span className="font-bold">Total TTC</span>
                  <span className="font-extrabold">{formatEUR(o.total)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
