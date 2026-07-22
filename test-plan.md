# Test Plan — AirFroid climatiseur store (PR #1)

App: Next.js store at http://localhost:3000 (dev server running). Frontend + demo Stripe.
Code refs: `src/app/page.tsx`, `src/app/climatiseurs/page.tsx`, `src/components/CatalogClient.tsx`,
`src/app/produit/[slug]/page.tsx`, `src/app/panier/page.tsx`, `src/app/api/checkout/route.ts:60`
(demo redirect), `src/context/CartContext.tsx`.

## T1 — Catalog filter reduces results (core)
1. Go to `/climatiseurs`. Expect header "8 produits".
2. Check "Climatiseurs réversibles" checkbox in left filter.
   - PASS: count drops to "2 produits"; only "AirFroid Réversible 18000" and "AirFroid Réversible 9000" shown.
   - FAIL if count stays 8 or unrelated products appear.
3. Uncheck; add budget radio "Moins de 400 €".
   - PASS: only products ≤ 400 € (Cool 7000 229,99 €, Cool 12000 379,99 €, Cool 9000 299,99 €); no 549,99 €+ items.

## T2 — Category chip pre-selects filter (URL param)
1. From `/climatiseurs` click chip "Multi-split".
   - PASS: URL has `?categorie=climatiseur-multi-split`; "Multi-split" checkbox checked; 2 products (Bi-split, Tri-split). Tri-split shows "Rupture" badge + disabled "Indisponible" button.

## T3 — Sort reorders
1. On full catalog set sort = "Prix croissant".
   - PASS: first card is cheapest = "AirFroid Cool 7000" 229,99 €. Switch to "Prix décroissant" → first card = "AirFroid Multi-Split Tri-split" 1 899,99 €.

## T4 — Add to cart + badge + cart page (core)
1. Open product `/produit/airfroid-inverter-split-12000`. Verify specs table shows "12 000 BTU", "22 dB", price "549,99 €".
2. Click "Ajouter au panier". PASS: button turns green "Ajouté au panier ✓"; header cart badge = "1".
3. Go to `/panier`. PASS: line item "AirFroid Inverter Split 12000", qty 1, subtotal 549,99 €, shipping "Offerte" (≥500), Total TTC 549,99 €.
4. Click "−" once. PASS: item removed (qty→0), cart empties → "Votre panier est vide".

## T5 — Free-shipping threshold boundary
1. Add a product under 500 € only (e.g. Cool 9000 299,99 €) → `/panier`.
   - PASS: shipping shows "29,99 €" (not offered); Total TTC = 329,98 €. Notice "Livraison offerte dès 500,00 €".

## T6 — Checkout demo mode → confirmation (core)
1. With a non-empty cart on `/panier`, click "Payer maintenant".
   - PASS: redirect to `/commande/succes` showing "Merci pour votre commande !"; header cart badge disappears (cart cleared).
   - FAIL if error banner shown or stays on /panier.

## Cross-cutting assertions
- All visible copy in French; all prices formatted "x xxx,xx €".
- No uncaught console/runtime errors during flows (check terminal/devtools).
