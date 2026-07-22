import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductImage from "@/components/ProductImage";
import ProductCard from "@/components/ProductCard";
import Rating from "@/components/Rating";
import AddToCartButton from "@/components/AddToCartButton";
import { formatEUR } from "@/lib/format";
import { salePrice, referencePrice, discountPercent } from "@/lib/pricing";
import {
  PRODUCTS,
  getCategory,
  getProduct,
  getProductsByCategory,
} from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Produit introuvable" };
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const price = salePrice(product);
  const oldPrice = referencePrice(product);
  const discount = discountPercent(product);

  const specRows: [string, string][] = [
    ["Puissance frigorifique", `${product.specs.puissanceBtu.toLocaleString("fr-FR")} BTU`],
    ["Surface recommandée", `Jusqu'à ${product.specs.surfaceMax} m²`],
    ["Classe énergétique", product.specs.classeEnergetique],
    ["Niveau sonore", `${product.specs.niveauSonore} dB`],
    ["Réversible", product.specs.reversible ? "Oui (chaud/froid)" : "Non"],
    ["Fluide frigorigène", product.specs.fluide],
    ["Garantie", `${product.specs.garantieAns} ans`],
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-brand">
          Accueil
        </Link>{" "}
        /{" "}
        <Link href="/climatiseurs" className="hover:text-brand">
          Climatiseurs
        </Link>{" "}
        /{" "}
        {category && (
          <Link
            href={`/climatiseurs?categorie=${category.slug}`}
            className="hover:text-brand"
          >
            {category.name}
          </Link>
        )}{" "}
        / <span className="text-slate-700">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative rounded-2xl border border-slate-200 bg-white p-6">
          {discount > 0 && (
            <span className="absolute left-4 top-4 rounded-md bg-accent px-2 py-1 text-sm font-bold text-white">
              -{discount}%
            </span>
          )}
          <ProductImage
            color={product.color}
            src={product.image}
            label={product.name}
            className="h-80 w-full object-contain"
          />
        </div>

        <div>
          <span className="text-sm font-semibold uppercase tracking-wide text-brand">
            {product.brand}
          </span>
          <h1 className="mt-1 text-3xl font-extrabold text-slate-900">
            {product.name}
          </h1>
          <div className="mt-2">
            <Rating rating={product.rating} reviews={product.reviews} />
          </div>

          <p className="mt-4 text-slate-600">{product.description}</p>

          <div className="mt-6 flex items-end gap-3">
            <span className="text-4xl font-extrabold text-slate-900">
              {formatEUR(price)}
            </span>
            {oldPrice && (
              <span className="mb-1 text-lg text-slate-400 line-through">
                {formatEUR(oldPrice)}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500">Prix TTC, éco-participation incluse</p>

          <div className="mt-4 flex items-center gap-2 text-sm">
            <span
              className={`inline-block h-2.5 w-2.5 rounded-full ${
                product.inStock ? "bg-emerald-500" : "bg-slate-400"
              }`}
            />
            <span className={product.inStock ? "text-emerald-700" : "text-slate-500"}>
              {product.inStock ? "En stock — expédié sous 24/48h" : "Actuellement en rupture"}
            </span>
          </div>

          <div className="mt-6 max-w-xs">
            <AddToCartButton product={product} />
          </div>

          <p className="mt-4 flex items-start gap-2 rounded-lg bg-brand/5 px-3 py-2 text-sm text-slate-700">
            <span>🚚</span>
            <span>
              Livraison et <strong>installation par nos techniciens</strong> sous
              3 à 7 jours ouvrés.
            </span>
          </p>

          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="text-emerald-600">✓</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Specs */}
      <section className="mt-12">
        <h2 className="text-xl font-extrabold text-slate-900">
          Caractéristiques techniques
        </h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <tbody>
              {specRows.map(([label, value], i) => (
                <tr
                  key={label}
                  className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}
                >
                  <th className="w-1/2 px-4 py-3 text-left font-medium text-slate-600">
                    {label}
                  </th>
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-extrabold text-slate-900">
            Produits similaires
          </h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
