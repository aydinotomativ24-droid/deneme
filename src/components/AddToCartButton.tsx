"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { salePrice } from "@/lib/pricing";
import { useCart } from "@/context/CartContext";

type Props = {
  product: Product;
  compact?: boolean;
};

export default function AddToCartButton({ product, compact }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (!product.inStock) {
    return (
      <button
        disabled
        className="w-full cursor-not-allowed rounded-lg bg-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-500"
      >
        Indisponible
      </button>
    );
  }

  function handleAdd() {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: salePrice(product),
      color: product.color,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      onClick={handleAdd}
      className={`w-full rounded-lg px-4 font-semibold text-white transition ${
        compact ? "py-2.5 text-sm" : "py-3 text-base"
      } ${added ? "bg-emerald-600" : "bg-accent hover:bg-accent-dark"}`}
    >
      {added ? "Ajouté au panier ✓" : "Ajouter au panier"}
    </button>
  );
}
