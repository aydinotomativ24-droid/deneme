"use client";

import Link from "next/link";
import { CATEGORIES } from "@/lib/products";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-brand text-white shadow">
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-lg font-black">
              A
            </span>
            <span className="text-xl font-extrabold tracking-tight">
              Air<span className="text-accent">Froid</span>
            </span>
          </Link>

          <form
            action="/climatiseurs"
            className="hidden flex-1 max-w-xl md:block"
          >
            <div className="flex overflow-hidden rounded-lg bg-white">
              <input
                type="search"
                name="q"
                placeholder="Rechercher un climatiseur..."
                className="w-full px-4 py-2 text-sm text-slate-800 outline-none"
              />
              <button
                type="submit"
                className="bg-accent px-4 text-sm font-semibold hover:bg-accent-dark"
              >
                Rechercher
              </button>
            </div>
          </form>

          <div className="flex items-center gap-4">
            <Link href="/panier" className="relative flex items-center gap-2">
              <span className="text-2xl leading-none" aria-hidden>
                🛒
              </span>
              <span className="hidden text-sm font-medium sm:inline">Panier</span>
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-xs font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      <nav className="mx-auto hidden max-w-7xl items-center gap-6 px-4 py-2 text-sm font-medium md:flex">
        <Link href="/climatiseurs" className="hover:text-accent">
          Tous les climatiseurs
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/climatiseurs?categorie=${c.slug}`}
            className="text-white/90 hover:text-accent"
          >
            {c.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
