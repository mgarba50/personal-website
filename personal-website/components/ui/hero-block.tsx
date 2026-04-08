import type { ActionLink } from "@/lib/types";
import { ButtonLink } from "@/components/ui/button";

export function HeroBlock({
  eyebrow,
  title,
  summary,
  actions,
  children
}: {
  eyebrow: string;
  title: string;
  summary: string;
  actions?: ActionLink[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden rounded-shell border border-line bg-[radial-gradient(circle_at_top_left,rgba(196,156,74,0.15),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-6 py-10 shadow-glow md:px-10 md:py-14">
      <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-accent">{eyebrow}</p>
          <h1 className="mt-6 max-w-4xl font-serif text-4xl leading-tight text-text md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-muted md:text-lg">{summary}</p>
          {actions ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {actions.map((action) => (
                <ButtonLink key={action.href + action.label} href={action.href} variant={action.variant}>
                  {action.label}
                </ButtonLink>
              ))}
            </div>
          ) : null}
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}
