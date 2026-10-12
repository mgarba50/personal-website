type SectionPlaceholderProps = {
  index: string;
  title: string;
  description?: string;
  compact?: boolean;
};

export function SectionPlaceholder({
  index,
  title,
  description = "Reserved for verified institutional content.",
  compact = false,
}: SectionPlaceholderProps) {
  return (
    <section className={compact ? "sa-slot sa-slot--compact" : "sa-slot"}>
      <div className="sa-slot__index">{index}</div>
      <div>
        <p className="sa-slot__label">Content module</p>
        <h2 className="sa-slot__title">{title}</h2>
        <p className="sa-slot__description">{description}</p>
      </div>
      <div className="sa-slot__rail" aria-hidden="true" />
    </section>
  );
}
