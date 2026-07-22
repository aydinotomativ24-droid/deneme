import { PROMO } from "@/lib/products";
import { isPromoActive } from "@/lib/pricing";

export default function PromoBanner() {
  if (!isPromoActive()) return null;
  return (
    <div className="bg-accent text-white">
      <p className="mx-auto max-w-7xl px-4 py-2 text-center text-sm font-semibold">
        {PROMO.message}
      </p>
    </div>
  );
}
