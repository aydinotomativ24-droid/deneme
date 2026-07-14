"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ClearCartOnMount from "@/components/ClearCartOnMount";

function SuccessContent() {
  const params = useSearchParams();
  const orderNumber = params.get("order");

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <ClearCartOnMount />
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-3xl text-emerald-600">
        ✓
      </div>
      <h1 className="mt-6 text-3xl font-extrabold text-slate-900">
        Merci pour votre commande !
      </h1>
      <p className="mt-3 text-slate-600">
        Votre commande a bien été enregistrée. Vous recevrez un e-mail de
        confirmation avec le suivi de votre livraison.
      </p>

      {orderNumber && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Numéro de commande</p>
          <p className="mt-1 text-2xl font-extrabold tracking-wide text-slate-900">
            {orderNumber}
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Conservez ce numéro pour suivre votre commande.
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {orderNumber && (
          <Link
            href={`/suivi?order=${orderNumber}`}
            className="rounded-lg bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-dark"
          >
            Suivre ma commande
          </Link>
        )}
        <Link
          href="/climatiseurs"
          className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
        >
          Continuer mes achats
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}
