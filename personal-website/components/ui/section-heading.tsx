export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left"
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-xs uppercase tracking-[0.32em] text-accent">{eyebrow}</p>
      <h2 className="mt-4 font-serif text-3xl text-text md:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-8 text-muted md:text-lg">{description}</p>
    </div>
  );
}
