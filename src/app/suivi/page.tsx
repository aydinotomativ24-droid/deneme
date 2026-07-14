"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { formatEUR } from "@/lib/format";
import { ORDER_STEPS, type Order } from "@/lib/orders";

function statusIndex(order: Order): number {
  return ORDER_STEPS.findIndex((s) => s.status === order.status);
}

function TrackingContent() {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("order") ?? "");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function lookup(number: string) {
    const trimmed = number.trim();
    if (!trimmed) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(trimmed)}`);
      if (res.ok) {
        const data = (await res.json()) as { order: Order };
        setOrder(data.order);
      } else {
        setOrder(null);
      }
    } catch {
      setOrder(null);
    } finally {
      setLoading(false);
    }
  }

  /* eslint-disable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */
  useEffect(() => {
    const initial = params.get("order");
    if (initial) lookup(initial);
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    lookup(query);
  }

  const currentStep = order ? statusIndex(order) : -1;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-extrabold text-slate-900">
        Suivi de commande
      </h1>
      <p className="mt-2 text-slate-600">
        Saisissez votre numéro de commande (ex. AF-123456) pour suivre son état.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="AF-123456"
          className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-800 outline-none focus:border-brand"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-accent px-6 py-2 font-semibold text-white hover:bg-accent-dark disabled:opacity-60"
        >
          {loading ? "..." : "Suivre"}
        </button>
      </form>

      {searched && !loading && !order && (
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 text-center">
          <p className="text-slate-700">
            Aucune commande trouvée pour ce numéro.
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Vérifiez le numéro saisi dans votre e-mail de confirmation.
          </p>
        </div>
      )}

      {order && (
        <div className="mt-8 space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm text-slate-500">Commande</p>
                <p className="text-xl font-extrabold text-slate-900">
                  {order.number}
                </p>
              </div>
              <p className="text-sm text-slate-500">
                Passée le{" "}
                {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <ol className="mt-6 space-y-4">
              {ORDER_STEPS.map((step, i) => {
                const done = i <= currentStep;
                return (
                  <li key={step.status} className="flex items-center gap-3">
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold ${
                        done
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {done ? "✓" : i + 1}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        done ? "text-slate-900" : "text-slate-400"
                      }`}
                    >
                      {step.label}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-bold text-slate-900">Articles</h2>
            <div className="mt-4 space-y-2 text-sm">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-slate-700">
                    {item.quantity} × {item.name}
                  </span>
                  <span className="font-semibold">
                    {formatEUR(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between border-t border-slate-200 pt-3 text-sm">
              <span className="text-slate-600">Livraison</span>
              <span className="font-semibold">
                {order.shipping === 0 ? "Offerte" : formatEUR(order.shipping)}
              </span>
            </div>
            <div className="mt-2 flex justify-between text-lg">
              <span className="font-bold">Total TTC</span>
              <span className="font-extrabold">{formatEUR(order.total)}</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-bold text-slate-900">Livraison</h2>
            <p className="mt-3 text-sm text-slate-700">
              {order.address.firstName} {order.address.lastName}
              <br />
              {order.address.address}
              <br />
              {order.address.postalCode} {order.address.city}
              <br />
              {order.address.country}
            </p>
          </div>
        </div>
      )}

      <Link
        href="/climatiseurs"
        className="mt-8 inline-block text-sm text-slate-500 hover:text-brand"
      >
        ← Retour à la boutique
      </Link>
    </div>
  );
}

export default function TrackingPage() {
  return (
    <Suspense fallback={null}>
      <TrackingContent />
    </Suspense>
  );
}
