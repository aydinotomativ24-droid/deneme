import { PROMO, type Product } from "./products";

export function isPromoActive(): boolean {
  if (!PROMO.active) return false;
  const ends = new Date(PROMO.endsAt).getTime();
  return Number.isNaN(ends) ? true : Date.now() <= ends;
}

// Sale price after the active promotion, rounded to the cent.
export function salePrice(product: Product): number {
  if (!isPromoActive()) return product.price;
  return Math.round(product.price * (1 - PROMO.rate) * 100) / 100;
}

// Reference (crossed-out) price shown next to the sale price.
export function referencePrice(product: Product): number | undefined {
  if (isPromoActive()) return product.price;
  return product.oldPrice;
}

// Discount percentage between the reference price and the current sale price.
export function discountPercent(product: Product): number {
  const ref = referencePrice(product);
  const price = salePrice(product);
  if (!ref || ref <= price) return 0;
  return Math.round((1 - price / ref) * 100);
}
