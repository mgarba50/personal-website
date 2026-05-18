import Link from "next/link";

type SalesSectionProps = {
  eyebrow: string;
  title: string;
  points: string[];
  actionLabel: string;
  actionHref: string;
  action: string;
};

export function SalesSection({ eyebrow, title, points, actionLabel, actionHref, action }: SalesSectionProps) {
  return (
    <section className="rounded-lg border border-line bg-white/80 p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">{eyebrow}</p>
      <h2 className="display mt-3 text-3xl font-semibold text-deep">{title}</h2>
      <ul className="mt-5 grid gap-3 text-sm leading-7 text-charcoal">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <Link
        className="mt-6 inline-flex rounded-md bg-deep px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-vellum transition hover:bg-navy"
        data-conversion={action}
        data-conversion-label={title}
        href={actionHref}
      >
        {actionLabel}
      </Link>
    </section>
  );
}
