"use client";

import { useMemo, useState } from "react";
import type { CategorySlug, Product } from "@/lib/products";
import { CATEGORIES } from "@/lib/products";
import ProductCard from "./ProductCard";

type SortKey = "populaire" | "prix-asc" | "prix-desc";

type Props = {
  products: Product[];
  initialCategory?: CategorySlug;
  initialQuery?: string;
};

export default function CatalogClient({
  products,
  initialCategory,
  initialQuery,
}: Props) {
  const [categories, setCategories] = useState<CategorySlug[]>(
    initialCategory ? [initialCategory] : [],
  );
  const [query, setQuery] = useState(initialQuery ?? "");
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [reversibleOnly, setReversibleOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("populaire");

  function toggleCategory(slug: CategorySlug) {
    setCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug],
    );
  }

  const filtered = useMemo(() => {
    let list = products.slice();
    if (categories.length) {
      list = list.filter((p) => categories.includes(p.category));
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q),
      );
    }
    if (maxPrice != null) list = list.filter((p) => p.price <= maxPrice);
    if (reversibleOnly) list = list.filter((p) => p.specs.reversible);
    if (inStockOnly) list = list.filter((p) => p.inStock);

    switch (sort) {
      case "prix-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "prix-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      default:
        list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [products, categories, query, maxPrice, reversibleOnly, inStockOnly, sort]);

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* Filters */}
      <aside className="space-y-6">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <label className="mb-2 block text-sm font-semibold text-slate-800">
            Recherche
          </label>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex : split, réversible..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-800">
            Type de climatiseur
          </h3>
          <div className="space-y-2">
            {CATEGORIES.map((c) => (
              <label
                key={c.slug}
                className="flex cursor-pointer items-center gap-2 text-sm text-slate-600"
              >
                <input
                  type="checkbox"
                  checked={categories.includes(c.slug)}
                  onChange={() => toggleCategory(c.slug)}
                  className="h-4 w-4 accent-[var(--color-brand)]"
                />
                {c.name}
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-800">
            Budget maximum
          </h3>
          <div className="space-y-2">
            {[
              { label: "Tous les prix", value: null },
              { label: "Moins de 400 €", value: 400 },
              { label: "Moins de 800 €", value: 800 },
              { label: "Moins de 1500 €", value: 1500 },
            ].map((opt) => (
              <label
                key={opt.label}
                className="flex cursor-pointer items-center gap-2 text-sm text-slate-600"
              >
                <input
                  type="radio"
                  name="maxprice"
                  checked={maxPrice === opt.value}
                  onChange={() => setMaxPrice(opt.value)}
                  className="h-4 w-4 accent-[var(--color-brand)]"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-800">Options</h3>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={reversibleOnly}
              onChange={(e) => setReversibleOnly(e.target.checked)}
              className="h-4 w-4 accent-[var(--color-brand)]"
            />
            Réversible (chaud/froid)
          </label>
          <label className="mt-2 flex cursor-pointer items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="h-4 w-4 accent-[var(--color-brand)]"
            />
            En stock uniquement
          </label>
        </div>
      </aside>

      {/* Results */}
      <div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-slate-900">
              {filtered.length}
            </span>{" "}
            produit{filtered.length > 1 ? "s" : ""}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <label className="text-slate-600">Trier par :</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand"
            >
              <option value="populaire">Popularité</option>
              <option value="prix-asc">Prix croissant</option>
              <option value="prix-desc">Prix décroissant</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">
            Aucun produit ne correspond à vos critères.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
