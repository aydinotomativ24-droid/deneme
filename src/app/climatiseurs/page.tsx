import type { Metadata } from "next";
import Link from "next/link";
import CatalogClient from "@/components/CatalogClient";
import { CATEGORIES, PRODUCTS, getCategory } from "@/lib/products";
import type { CategorySlug } from "@/lib/products";

export const metadata: Metadata = {
  title: "Tous les climatiseurs",
  description:
    "Découvrez notre gamme complète de climatiseurs : mobiles, splits, réversibles et multi-splits. Filtrez par type, prix et options.",
};

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string; q?: string }>;
}) {
  const { categorie, q } = await searchParams;
  const category = categorie ? getCategory(categorie) : undefined;
  const initialCategory = category?.slug as CategorySlug | undefined;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="mb-4 text-sm text-slate-500">
        <Link href="/" className="hover:text-brand">
          Accueil
        </Link>{" "}
        / <span className="text-slate-700">Climatiseurs</span>
        {category ? (
          <>
            {" "}
            / <span className="text-slate-700">{category.name}</span>
          </>
        ) : null}
      </nav>

      <h1 className="text-2xl font-extrabold text-slate-900">
        {category ? category.name : "Tous les climatiseurs"}
      </h1>
      <p className="mt-1 max-w-2xl text-sm text-slate-600">
        {category
          ? category.description
          : "Trouvez le climatiseur idéal pour votre logement grâce à nos filtres par type, budget et options."}
      </p>

      {!category && (
        <div className="mt-4 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/climatiseurs?categorie=${c.slug}`}
              className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm text-slate-700 hover:border-brand hover:text-brand"
            >
              {c.name}
            </Link>
          ))}
        </div>
      )}

      <div className="mt-8">
        <CatalogClient
          products={PRODUCTS}
          initialCategory={initialCategory}
          initialQuery={q}
        />
      </div>
    </div>
  );
}
