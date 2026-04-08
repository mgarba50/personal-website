import Link from "next/link";
import { SearchPanel } from "@/components/ui/search-panel";
import { EmptyState } from "@/components/ui/empty-state";
import { Card, CardEyebrow, CardTitle } from "@/components/ui/card";
import { HeroBlock } from "@/components/ui/hero-block";
import { filterSearchRecords } from "@/lib/search";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Search | Musa Allama",
  path: "/search"
});

export default async function SearchPage({
  searchParams
}: {
  searchParams?: Promise<{ q?: string; type?: string }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const query = resolvedSearchParams?.q || "";
  const type = resolvedSearchParams?.type || "All";
  const results = filterSearchRecords(query, type);

  return (
    <main className="mx-auto max-w-shell space-y-12 px-4 py-8 md:px-6 md:py-10">
      <HeroBlock
        eyebrow="Search"
        title="Find books, essays, poetry, services, courses, and institutional pathways from one discovery layer."
        summary="Phase one search covers keyword, type, and tag-based discovery with a clear route toward future semantic and recommendation upgrades."
      />
      <SearchPanel query={query} type={type} />
      {results.length ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {results.map((result) => (
            <Card key={result.href + result.title}>
              <CardEyebrow>{result.type}</CardEyebrow>
              <CardTitle>{result.title}</CardTitle>
              <p className="mt-4 text-sm leading-7 text-muted">{result.summary}</p>
              <p className="mt-4 text-sm text-text">{result.tags.join(" | ")}</p>
              <Link href={result.href} className="mt-6 inline-flex text-sm uppercase tracking-[0.18em] text-accent">
                Open result
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No matching records yet"
          summary="Try a broader keyword, switch the content type filter, or explore the main corridors directly while the archive continues to grow."
        />
      )}
    </main>
  );
}
