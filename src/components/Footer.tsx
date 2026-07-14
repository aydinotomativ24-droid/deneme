import Link from "next/link";
import { CATEGORIES } from "@/lib/products";

export default function Footer() {
  return (
    <footer className="mt-16 bg-brand-dark text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent font-black text-white">
              A
            </span>
            <span className="text-lg font-extrabold text-white">
              Air<span className="text-accent">Froid</span>
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-400">
            Spécialiste de la climatisation en France. Livraison rapide et
            garantie constructeur.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
            Nos climatiseurs
          </h4>
          <ul className="space-y-2 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/climatiseurs?categorie=${c.slug}`}
                  className="text-slate-400 hover:text-accent"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
            Aide & service
          </h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>Livraison &amp; retours</li>
            <li>Guide d&apos;achat climatiseur</li>
            <li>Installation &amp; entretien</li>
            <li>Contact &amp; SAV</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
            Paiement sécurisé
          </h4>
          <p className="text-sm text-slate-400">
            Paiement 100 % sécurisé par carte bancaire via Stripe. Vos données
            ne sont jamais stockées sur nos serveurs.
          </p>
          <div className="mt-3 flex gap-2 text-xs">
            <span className="rounded bg-white/10 px-2 py-1">Visa</span>
            <span className="rounded bg-white/10 px-2 py-1">Mastercard</span>
            <span className="rounded bg-white/10 px-2 py-1">CB</span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} AirFroid — Tous droits réservés.
      </div>
    </footer>
  );
}
