import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatEUR } from "@/lib/format";
import { salePrice, referencePrice, discountPercent } from "@/lib/pricing";
import ProductImage from "./ProductImage";
import Rating from "./Rating";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  const price = salePrice(product);
  const oldPrice = referencePrice(product);
  const discount = discountPercent(product);

  return (
    <div className="group flex flex-col rounded-xl border border-slate-200 bg-white overflow-hidden transition hover:shadow-lg">
      <Link
        href={`/produit/${product.slug}`}
        className="relative block bg-slate-50"
      >
        {discount > 0 && (
          <span className="absolute left-3 top-3 z-10 rounded-md bg-accent px-2 py-1 text-xs font-bold text-white">
            -{discount}%
          </span>
        )}
        {!product.inStock && (
          <span className="absolute right-3 top-3 z-10 rounded-md bg-slate-700 px-2 py-1 text-xs font-semibold text-white">
            Rupture
          </span>
        )}
        <ProductImage
          color={product.color}
          src={product.image}
          label={product.name}
          className="h-48 w-full object-contain p-2 transition group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand">
          {product.brand}
        </span>
        <Link href={`/produit/${product.slug}`} className="mt-1">
          <h3 className="line-clamp-2 text-sm font-semibold text-slate-800 hover:text-brand">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-xs text-slate-500">
          {product.shortDescription}
        </p>

        <div className="mt-2">
          <Rating rating={product.rating} reviews={product.reviews} />
        </div>

        <div className="mt-3 flex items-end gap-2">
          <span className="text-xl font-extrabold text-slate-900">
            {formatEUR(price)}
          </span>
          {oldPrice && (
            <span className="mb-0.5 text-sm text-slate-400 line-through">
              {formatEUR(oldPrice)}
            </span>
          )}
        </div>
        <p className="text-[11px] text-slate-400">Prix TTC</p>

        <div className="mt-4 flex-1" />
        <AddToCartButton product={product} compact />
      </div>
    </div>
  );
}
