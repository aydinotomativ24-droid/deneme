import Link from "next/link";
import ClearCartOnMount from "@/components/ClearCartOnMount";

export const metadata = { title: "Commande confirmée" };

export default function SuccessPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <ClearCartOnMount />
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-3xl text-emerald-600">
        ✓
      </div>
      <h1 className="mt-6 text-3xl font-extrabold text-slate-900">
        Merci pour votre commande !
      </h1>
      <p className="mt-3 text-slate-600">
        Votre paiement a bien été enregistré. Vous recevrez un e-mail de
        confirmation avec le suivi de votre livraison.
      </p>
      <Link
        href="/climatiseurs"
        className="mt-8 inline-block rounded-lg bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-dark"
      >
        Continuer mes achats
      </Link>
    </div>
  );
}
