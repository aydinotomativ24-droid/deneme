"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { formatEUR } from "@/lib/format";
import { getOrder, ORDER_STEPS, type Order } from "@/lib/orders";

function statusIndex(order: Order): number {
  return ORDER_STEPS.findIndex((s) => s.status === order.status);
}

type LookupResult = { order: Order | null; searched: boolean };

function TrackingContent() {
  const params = useSearchParams();
  const initial = params.get("order") ?? "";
  const [query, setQuery] = useState(initial);
  const [result, setResult] = useState<LookupResult>(() =>
    initial ? { order: getOrder(initial) ?? null, searched: true } : { order: null, searched: false },
  );

  const { order, searched } = result;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      setResult({ order: getOrder(query) ?? null, searched: true });
    }
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
          className="rounded-lg bg-accent px-6 py-2 font-semibold text-white hover:bg-accent-dark"
        >
          Suivre
        </button>
      </form>

      {searched && !order && (
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 text-center">
          <p className="text-slate-700">
            Aucune commande trouvée pour ce numéro.
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Vérifiez le numéro saisi. Le suivi n&apos;est disponible que sur
            l&apos;appareil utilisé pour la commande.
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

            {/* Timeline */}
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
