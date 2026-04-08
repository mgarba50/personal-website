import { articles } from "@/content/collections/articles";
import { HeroBlock } from "@/components/ui/hero-block";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardEyebrow, CardTitle } from "@/components/ui/card";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Living Library | Musa Allama",
  path: "/library"
});

export default function LibraryPage() {
  return (
    <main className="mx-auto max-w-shell space-y-16 px-4 py-8 md:px-6 md:py-10">
      <HeroBlock
        eyebrow="Living Library"
        title="An institutional archive of thinking, not a disposable blog."
        summary="The library is organized around strategic papers, agro-industrial architecture, systems analysis, diplomacy, philosophical strategy, technology reflections, and educational essays."
      >
        <Card>
          <CardEyebrow>Reading experience</CardEyebrow>
          <CardTitle>Distraction-free, typographically disciplined, and multilingual-ready.</CardTitle>
          <p className="mt-4 text-sm leading-7 text-muted">
            The reading layer is structured for long-form reflection, PDF dossier support, and future semantic discovery.
          </p>
        </Card>
      </HeroBlock>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Archive"
          title="Selected papers and essays"
          description="The collection is seeded with typed records so the archive can scale without losing metadata discipline."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {articles.map((article) => (
            <Card key={article.slug}>
              <img src={article.cover} alt={`${article.title} cover placeholder`} className="h-56 w-full rounded-[22px] border border-line object-cover" />
              <CardEyebrow>{article.category}</CardEyebrow>
              <CardTitle>{article.title}</CardTitle>
              <p className="mt-3 text-sm text-muted">
                {article.date} | {article.readingTime}
              </p>
              <p className="mt-4 text-sm leading-7 text-muted">{article.summary}</p>
              <a href={`/library/${article.slug}`} className="mt-6 inline-flex text-sm uppercase tracking-[0.18em] text-accent">
                Open article
              </a>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
