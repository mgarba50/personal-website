import { CtaButton } from "@/components/ui/cta-button";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  copy: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function PageHero({ eyebrow, title, copy, primaryCta, secondaryCta }: PageHeroProps) {
  return (
    <section className="institutional-shell px-5 py-20 text-vellum md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">{eyebrow}</p>
        <h1 className="display mt-5 max-w-4xl text-5xl font-semibold leading-none md:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-vellum/78">{copy}</p>
        {(primaryCta || secondaryCta) ? (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {primaryCta ? <CtaButton href={primaryCta.href}>{primaryCta.label}</CtaButton> : null}
            {secondaryCta ? (
              <CtaButton href={secondaryCta.href} variant="secondary">
                {secondaryCta.label}
              </CtaButton>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
