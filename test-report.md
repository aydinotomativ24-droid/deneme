# Test Report — AirFroid climatiseur store (PR #1)

**App:** Next.js store at `http://localhost:3000` (local dev, demo Stripe mode)
**PR:** https://github.com/aydinotomativ24-droid/deneme/pull/1

## Summary
Tested the store end-to-end through the browser (home → catalog filters/sort → product → cart → demo checkout). During the first pass I found a real bug: **the cart was not cleared after checkout**. I fixed it (commit on the PR branch) and re-tested — the cart now clears correctly.

## Bug found & fixed
- **Symptom:** After a successful "Payer maintenant" → `/commande/succes`, the header cart badge stayed and `/panier` still showed the items.
- **Root cause:** `ClearCartOnMount`'s effect ran *before* `CartProvider`'s localStorage-hydration effect (React runs child effects before parent effects), so hydration restored the just-cleared cart.
- **Fix:** `CartContext` now exposes `hydrated`; `ClearCartOnMount` clears only after hydration completes.

## Results

| # | Test | Result |
|---|------|--------|
| 1 | Home page renders in French with EUR pricing | PASS |
| 2 | Catalog filter by category (réversibles → 2) | PASS |
| 3 | Catalog filter by budget (< 400 € → 3) | PASS |
| 4 | Sort by price (asc/desc) | PASS |
| 5 | Product detail specs + add to cart + badge | PASS |
| 6 | Cart quantity update + totals + free shipping | PASS |
| 7 | Demo checkout → confirmation | PASS |
| 8 | **Cart cleared after checkout (the fix)** | PASS |

---

## Evidence

### 1. Home page (FR / EUR)
Hero, trust bar, 4 category tiles, promotions with EUR prices.

![Home](/tmp/t/01-home.png)

### 2–3. Catalog budget filter (« Moins de 400 € » → 3 products, all ≤ 400 €)
![Budget filter](/tmp/t/02-budget-filter.png)

### 5. Product detail — specs table (12 000 BTU, A++, 22 dB) + 549,99 €
![Product detail](/tmp/t/03-product.png)

### 7. Demo checkout confirmation — « Merci pour votre commande ! »
Note: header cart badge is gone.

![Success](/tmp/t/06-success.png)

### 8. Cart cleared after checkout — « Votre panier est vide » (the fix)
![Empty cart](/tmp/t/07-cart-empty.png)

---

## Notes / caveats
- Checkout ran in **demo mode** because no `STRIPE_SECRET_KEY` is set locally; it redirects to `/commande/succes?demo=1` by design. The real Stripe Checkout path (with a `sk_test_...` key) was **not** exercised.
- No error overlays or broken renders were observed during any flow. There is no persistent dev-server log file, so runtime-error checking was based on the rendered pages, not on captured server logs.
