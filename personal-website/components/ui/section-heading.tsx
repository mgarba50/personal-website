type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  copy?: string;
  light?: boolean;
};

export function SectionHeading({ eyebrow, title, copy, light = false }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${light ? "text-gold" : "text-burgundy"}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`display mt-3 text-4xl font-semibold leading-tight md:text-5xl ${light ? "text-vellum" : "text-deep"}`}>
        {title}
      </h2>
      {copy ? <p className={`mt-5 text-base leading-8 ${light ? "text-vellum/75" : "text-muted"}`}>{copy}</p> : null}
    </div>
  );
}
