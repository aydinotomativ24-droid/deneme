"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatEUR } from "@/lib/format";
import ProductImage from "@/components/ProductImage";

const FREE_SHIPPING_THRESHOLD = 500;

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart();

  const shipping = totalPrice >= FREE_SHIPPING_THRESHOLD || totalPrice === 0 ? 0 : 29.99;
  const grandTotal = totalPrice + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="text-5xl">🛒</div>
        <h1 className="mt-4 text-2xl font-extrabold text-slate-900">
          Votre panier est vide
        </h1>
        <p className="mt-2 text-slate-600">
          Découvrez nos climatiseurs et trouvez le modèle idéal.
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-extrabold text-slate-900">
        Votre panier ({totalItems})
      </h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4"
            >
              <Link
                href={`/produit/${item.slug}`}
                className="shrink-0 rounded-lg bg-slate-50"
              >
                <ProductImage
                  color={item.color}
                  src={item.image}
                  label={item.name}
                  className="h-24 w-28 object-contain"
                />
              </Link>
              <div className="flex flex-1 flex-col">
                <Link
                  href={`/produit/${item.slug}`}
                  className="font-semibold text-slate-800 hover:text-brand"
                >
                  {item.name}
                </Link>
                <span className="text-sm text-slate-500">
                  {formatEUR(item.price)} l&apos;unité
                </span>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-slate-300">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 text-lg text-slate-600 hover:bg-slate-100"
                      aria-label="Diminuer la quantité"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 text-lg text-slate-600 hover:bg-slate-100"
                      aria-label="Augmenter la quantité"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-sm text-slate-400 hover:text-red-600"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
              <div className="text-right font-bold text-slate-900">
                {formatEUR(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold text-slate-900">Récapitulatif</h2>
          <div className="mt-4 space-y-2 text-sm">
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
            {shipping > 0 && (
              <p className="text-xs text-slate-500">
                Livraison offerte dès {formatEUR(FREE_SHIPPING_THRESHOLD)} d&apos;achat.
              </p>
            )}
          </div>
          <div className="mt-4 flex justify-between border-t border-slate-200 pt-4 text-lg">
            <span className="font-bold">Total TTC</span>
            <span className="font-extrabold">{formatEUR(grandTotal)}</span>
          </div>

          <Link
            href="/commande"
            className="mt-5 block w-full rounded-lg bg-accent px-4 py-3 text-center font-semibold text-white hover:bg-accent-dark"
          >
            Passer la commande
          </Link>
          <p className="mt-3 text-center text-xs text-slate-500">
            🔒 Paiement sécurisé
          </p>
        </aside>
      </div>
    </div>
  );
}
