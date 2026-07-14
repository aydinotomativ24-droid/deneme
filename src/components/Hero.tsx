import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-brand to-brand-dark text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 lg:grid-cols-2">
        <div>
          <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide">
            Offres d&apos;été
          </span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
            Gardez votre intérieur au frais tout l&apos;été
          </h1>
          <p className="mt-4 max-w-lg text-lg text-white/85">
            Climatiseurs mobiles, splits et réversibles au meilleur prix.
            Livraison rapide partout en France et paiement 100 % sécurisé.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/climatiseurs"
              className="rounded-lg bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-dark"
            >
              Découvrir les climatiseurs
            </Link>
            <Link
              href="/climatiseurs?categorie=climatiseur-reversible"
              className="rounded-lg border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              Modèles réversibles
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { big: "-30%", small: "jusqu'à sur une sélection" },
            { big: "24/48h", small: "livraison en France" },
            { big: "5 ans", small: "de garantie constructeur" },
          ].map((s) => (
            <div
              key={s.big}
              className="rounded-xl bg-white/10 p-4 backdrop-blur"
            >
              <div className="text-2xl font-extrabold text-accent">{s.big}</div>
              <div className="mt-1 text-xs text-white/80">{s.small}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
