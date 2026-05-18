import Link from "next/link";

type Tier = {
  title: string;
  slug: string;
  price: string;
  description: string;
  audience: string;
  benefits: string[];
};

export function TierCard({ tier }: { tier: Tier }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-line bg-white/80 p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">Membership Circle</p>
      <h3 className="display mt-3 text-3xl font-semibold text-deep">{tier.title}</h3>
      <p className="mt-3 text-sm leading-7 text-muted">{tier.description}</p>
      <p className="mt-4 text-sm font-semibold text-deep">{tier.price}</p>
      <ul className="mt-5 space-y-3 text-sm leading-6 text-charcoal">
        {tier.benefits.map((benefit) => (
          <li key={benefit}>{benefit}</li>
        ))}
      </ul>
      <Link
        className="mt-auto inline-flex justify-center rounded-md border border-gold bg-deep px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-vellum transition hover:bg-navy"
        data-conversion="apply_membership"
        data-conversion-label={tier.title}
        href={`/membership/${tier.slug}`}
      >
        Apply / Join
      </Link>
    </article>
  );
}
