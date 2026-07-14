type Props = {
  rating: number;
  reviews?: number;
  className?: string;
};

export default function Rating({ rating, reviews, className }: Props) {
  const full = Math.round(rating);
  return (
    <div className={`flex items-center gap-1 ${className ?? ""}`}>
      <span className="text-amber-500 text-sm leading-none" aria-hidden>
        {"★".repeat(full)}
        <span className="text-slate-300">{"★".repeat(5 - full)}</span>
      </span>
      <span className="text-xs text-slate-500">
        {rating.toFixed(1)}
        {typeof reviews === "number" ? ` (${reviews} avis)` : ""}
      </span>
    </div>
  );
}
