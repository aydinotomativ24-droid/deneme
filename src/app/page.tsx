import Link from "next/link";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";
import { CATEGORIES, PRODUCTS } from "@/lib/products";

const CATEGORY_COLORS: Record<string, string> = {
  "climatiseur-mobile": "#0ea5e9",
  "climatiseur-split": "#2563eb",
  "climatiseur-reversible": "#7c3aed",
  "climatiseur-multi-split": "#0d9488",
};

export default function Home() {
  const featured = PRODUCTS.filter((p) => p.oldPrice).slice(0, 4);

  return (
    <div>
      <Hero />

      {/* Trust bar */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 text-sm md:grid-cols-4">
          {[
            ["🚚", "Livraison rapide", "Partout en France"],
            ["🔒", "Paiement sécurisé", "Via Stripe"],
            ["🛠️", "SAV & installation", "Réseau de techniciens"],
            ["✅", "Garantie constructeur", "Jusqu'à 5 ans"],
          ].map(([icon, title, sub]) => (
            <div key={title} className="flex items-center gap-3">
              <span className="text-2xl">{icon}</span>
              <div>
                <div className="font-semibold text-slate-800">{title}</div>
                <div className="text-xs text-slate-500">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-extrabold text-slate-900">
          Choisissez votre type de climatiseur
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/climatiseurs?categorie=${c.slug}`}
              className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:border-brand hover:shadow-md"
            >
              <ProductImage
                color={CATEGORY_COLORS[c.slug]}
                className="h-32 w-full"
              />
              <h3 className="mt-3 font-semibold text-slate-800 group-hover:text-brand">
                {c.name}
              </h3>
              <p className="mt-1 text-xs text-slate-500">{c.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured / promotions */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Nos promotions du moment
          </h2>
          <Link
            href="/climatiseurs"
            className="text-sm font-semibold text-brand hover:underline"
          >
            Voir tout →
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
