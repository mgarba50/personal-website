import type { TimelineEvent } from "@/lib/types";

export function Timeline({ items }: { items: TimelineEvent[] }) {
  return (
    <ol className="grid gap-6">
      {items.map((item, index) => (
        <li key={item.year + item.title} className="grid gap-4 rounded-[28px] border border-line bg-white p-6 shadow-card md:grid-cols-[120px_1fr]">
          <div className="flex items-start gap-3">
            <span className="mt-2 h-3 w-3 rounded-full bg-accent" />
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-accent">Phase {index + 1}</p>
              <p className="mt-2 font-serif text-2xl text-text">{item.year}</p>
            </div>
          </div>
          <div>
            <h3 className="font-serif text-2xl text-text">{item.title}</h3>
            <p className="mt-3 text-base leading-8 text-muted">{item.summary}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
