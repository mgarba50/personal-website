export function EmptyState({
  title,
  summary
}: {
  title: string;
  summary: string;
}) {
  return (
    <div className="rounded-[28px] border border-dashed border-line bg-surface/40 px-6 py-10 text-center">
      <h3 className="font-serif text-2xl text-text">{title}</h3>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted">{summary}</p>
    </div>
  );
}
