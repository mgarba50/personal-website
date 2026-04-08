import { ButtonLink } from "@/components/ui/button";

export function CtaStrip({
  eyebrow,
  title,
  summary,
  href,
  label
}: {
  eyebrow: string;
  title: string;
  summary: string;
  href: string;
  label: string;
}) {
  return (
    <section className="rounded-shell border border-accent/30 bg-[linear-gradient(135deg,rgba(196,156,74,0.16),rgba(255,255,255,0.04))] px-6 py-8 md:px-10">
      <p className="text-xs uppercase tracking-[0.28em] text-accent">{eyebrow}</p>
      <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl text-text">{title}</h2>
          <p className="mt-4 text-base leading-8 text-muted">{summary}</p>
        </div>
        <ButtonLink href={href}>{label}</ButtonLink>
      </div>
    </section>
  );
}
