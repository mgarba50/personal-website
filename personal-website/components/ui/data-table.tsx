export function DataTable({
  rows
}: {
  rows: Array<{ label: string; value: string | string[] }>;
}) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-line">
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid gap-3 border-b border-line bg-white px-5 py-4 last:border-none md:grid-cols-[220px_1fr]"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-muted">{row.label}</p>
          <p className="text-sm leading-7 text-text">
            {Array.isArray(row.value) ? row.value.join(", ") : row.value}
          </p>
        </div>
      ))}
    </div>
  );
}
