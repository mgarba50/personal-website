const filters = ["All", "Book", "Article", "Poetry", "Course", "Service", "Product", "Media", "Initiative"];

export function SearchPanel({
  query,
  type
}: {
  query?: string;
  type?: string;
}) {
  return (
    <form action="/search" className="rounded-[28px] border border-line bg-white p-6 shadow-card">
      <div className="grid gap-4 md:grid-cols-[1fr_220px_auto]">
        <label className="grid gap-2 text-sm text-muted">
          Search
          <input
            name="q"
            defaultValue={query}
            placeholder="Search books, essays, poetry, courses, media, and services"
            className="rounded-2xl border border-line bg-surface-strong px-4 py-3 text-text outline-none transition focus:border-accent"
          />
        </label>
        <label className="grid gap-2 text-sm text-muted">
          Content type
          <select
            name="type"
            defaultValue={type || "All"}
            className="rounded-2xl border border-line bg-surface-strong px-4 py-3 text-text outline-none transition focus:border-accent"
          >
            {filters.map((filter) => (
              <option key={filter} value={filter}>
                {filter}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="self-end rounded-full border border-accent bg-accent px-5 py-3 text-sm font-medium uppercase tracking-[0.16em] text-white transition hover:-translate-y-0.5"
        >
          Search
        </button>
      </div>
    </form>
  );
}
