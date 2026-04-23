import type { Metric } from "@/lib/types";

export function StatsStrip({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid gap-4 rounded-[28px] border border-line bg-white p-6 shadow-card md:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="rounded-3xl border border-line bg-surface-strong p-4">
          <p className="font-serif text-3xl text-text">{metric.value}</p>
          <p className="mt-2 text-sm leading-6 text-muted">{metric.label}</p>
        </div>
      ))}
    </div>
  );
}
