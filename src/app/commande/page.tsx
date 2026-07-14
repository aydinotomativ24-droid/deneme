"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatEUR } from "@/lib/format";
import ProductImage from "@/components/ProductImage";
import type { ShippingAddress } from "@/lib/orders";
import { apiUrl } from "@/lib/apiUrl";

const FREE_SHIPPING_THRESHOLD = 500;

type FormState = ShippingAddress & {
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
};

const EMPTY: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  postalCode: "",
  city: "",
  country: "France",
  cardName: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvc: "",
};

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function CheckoutPage() {
  const { items, totalPrice, totalItems, clear } = useCart();
  const router = useRouter();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shipping =
    totalPrice >= FREE_SHIPPING_THRESHOLD || totalPrice === 0 ? 0 : 29.99;
  const grandTotal = totalPrice + shipping;

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(apiUrl("/api/orders"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, quantity: i.quantity })),
          address: {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            address: form.address,
            postalCode: form.postalCode,
            city: form.city,
            country: form.country,
          },
          // Démo : on n'envoie que le titulaire, les 4 derniers chiffres et
          // l'expiration. Jamais le numéro complet ni le CVC.
          payment: {
            cardName: form.cardName,
            last4: form.cardNumber.replace(/\D/g, "").slice(-4),
            expiry: form.cardExpiry,
            cvcProvided: form.cardCvc.trim().length > 0,
          },
        }),
      });
      const data = (await res.json()) as { number?: string; error?: string };
      if (!res.ok || !data.number) {
        throw new Error(data.error ?? "Impossible d'enregistrer la commande.");
      }
      clear();
      router.push(`/commande/succes?order=${data.number}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue lors de la commande.",
      );
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="text-5xl">🛒</div>
        <h1 className="mt-4 text-2xl font-extrabold text-slate-900">
          Votre panier est vide
        </h1>
        <p className="mt-2 text-slate-600">
          Ajoutez un climatiseur avant de passer commande.
        </p>
        <Link
          href="/climatiseurs"
          className="mt-6 inline-block rounded-lg bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-dark"
        >
          Voir les climatiseurs
        </Link>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none focus:border-brand";
  const labelClass = "mb-1 block text-sm font-medium text-slate-700";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-extrabold text-slate-900">
        Finaliser la commande
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]"
      >
        <div className="space-y-8">
          {/* Adresse de livraison */}
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-bold text-slate-900">
              Adresse de livraison
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="firstName">
                  Prénom
                </label>
                <input
                  id="firstName"
                  required
                  className={inputClass}
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="lastName">
                  Nom
                </label>
                <input
                  id="lastName"
                  required
                  className={inputClass}
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="email">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className={inputClass}
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="phone">
                  Téléphone
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  className={inputClass}
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="address">
                  Adresse
                </label>
                <input
                  id="address"
                  required
                  placeholder="N° et nom de rue"
                  className={inputClass}
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="postalCode">
                  Code postal
                </label>
                <input
                  id="postalCode"
                  required
                  className={inputClass}
                  value={form.postalCode}
                  onChange={(e) => update("postalCode", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="city">
                  Ville
                </label>
                <input
                  id="city"
                  required
                  className={inputClass}
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="country">
                  Pays
                </label>
                <input
                  id="country"
                  required
                  className={inputClass}
                  value={form.country}
                  onChange={(e) => update("country", e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Paiement (démo) */}
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Paiement par carte
              </h2>
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                Mode démo
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Aucune carte n&apos;est débitée : le paiement réel sera activé avec
              Stripe. Vous pouvez saisir des informations fictives.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="cardName">
                  Titulaire de la carte
                </label>
                <input
                  id="cardName"
                  required
                  className={inputClass}
                  value={form.cardName}
                  onChange={(e) => update("cardName", e.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="cardNumber">
                  Numéro de carte
                </label>
                <input
                  id="cardNumber"
                  required
                  inputMode="numeric"
                  placeholder="4242 4242 4242 4242"
                  className={inputClass}
                  value={form.cardNumber}
                  onChange={(e) =>
                    update("cardNumber", formatCardNumber(e.target.value))
                  }
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="cardExpiry">
                  Expiration (MM/AA)
                </label>
                <input
                  id="cardExpiry"
                  required
                  inputMode="numeric"
                  placeholder="12/28"
                  className={inputClass}
                  value={form.cardExpiry}
                  onChange={(e) =>
                    update("cardExpiry", formatExpiry(e.target.value))
                  }
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="cardCvc">
                  CVC
                </label>
                <input
                  id="cardCvc"
                  required
                  inputMode="numeric"
                  placeholder="123"
                  maxLength={4}
                  className={inputClass}
                  value={form.cardCvc}
                  onChange={(e) =>
                    update("cardCvc", e.target.value.replace(/\D/g, "").slice(0, 4))
                  }
                />
              </div>
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold text-slate-900">
            Votre commande ({totalItems})
          </h2>
          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="shrink-0 rounded-lg bg-slate-50">
                  <ProductImage
                    color={item.color}
                    src={item.image}
                    label={item.name}
                    className="h-12 w-14 object-contain"
                  />
                </div>
                <div className="flex-1 text-sm">
                  <p className="font-medium text-slate-800">{item.name}</p>
                  <p className="text-slate-500">
                    {item.quantity} × {formatEUR(item.price)}
                  </p>
                </div>
                <span className="text-sm font-semibold">
                  {formatEUR(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2 border-t border-slate-200 pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Sous-total</span>
              <span className="font-semibold">{formatEUR(totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Livraison</span>
              <span className="font-semibold">
                {shipping === 0 ? "Offerte" : formatEUR(shipping)}
              </span>
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-slate-200 pt-4 text-lg">
            <span className="font-bold">Total TTC</span>
            <span className="font-extrabold">{formatEUR(grandTotal)}</span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-5 w-full rounded-lg bg-accent px-4 py-3 font-semibold text-white hover:bg-accent-dark disabled:opacity-60"
          >
            {submitting
              ? "Validation..."
              : `Payer ${formatEUR(grandTotal)}`}
          </button>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          <Link
            href="/panier"
            className="mt-3 block text-center text-sm text-slate-500 hover:text-brand"
          >
            Retour au panier
          </Link>
        </aside>
      </form>
    </div>
  );
}
