import Link from "next/link";
import { ArticleCard } from "@/components/cards/article-card";
import { ConversionStrip } from "@/components/commerce/conversion-strip";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { articles, leadMagnets } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Living Library",
  description:
    "Essays, research briefs, field reports, language lessons, case studies, and strategic notes from MusaAllama.com.",
  path: "/library",
});

const categories = [
  "Agriculture",
  "Agrochemicals",
  "Hydroponics",
  "Chinese language",
  "Arabic language",
  "Publishing",
  "AI and automation",
  "Strategy",
  "Poetry and thought",
];

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; resource?: string }>;
}) {
  const { category, resource } = await searchParams;
  const activeCategory = categories.includes(category ?? "") ? category : undefined;
  const filteredArticles = activeCategory
    ? articles.filter((article) => article.category === activeCategory)
    : articles;
  const selectedResource = leadMagnets.find((item) => item.slug === resource);

  const filterClass = (selected: boolean) =>
    `rounded-md border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
      selected
        ? "border-gold bg-deep text-vellum"
        : "border-line bg-white/70 text-charcoal hover:border-gold"
    }`;

  return (
    <>
      <PageHero
        eyebrow="Living Library"
        title="Essays, field notes, language lessons, and research briefs."
        copy="Explore writing on agriculture, agrochemicals, hydroponics, languages, publishing, AI, automation, strategy, and reflective thought."
        primaryCta={{ label: "Read the library", href: "#articles", action: "read_library" }}
        secondaryCta={{ label: "Get a free resource", href: "#resources", action: "subscribe_dispatch" }}
      />
      <ConversionStrip title="Read practical notes, explore related books and courses, or request a free resource." />

      <section className="px-5 py-12">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">
            Browse by category {activeCategory ? `· ${activeCategory}` : "· All categories"}
          </p>
          <div className="flex flex-wrap gap-2">
            <Link className={filterClass(!activeCategory)} href="/library#articles">
              All
            </Link>
            {categories.map((categoryName) => (
              <Link
                aria-current={activeCategory === categoryName ? "page" : undefined}
                className={filterClass(activeCategory === categoryName)}
                data-conversion="filter_library"
                data-conversion-label={categoryName}
                href={`/library?category=${encodeURIComponent(categoryName)}#articles`}
                key={categoryName}
              >
                {categoryName}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="articles" className="scroll-mt-20 px-5 pb-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Articles & Briefs"
            title="Writing from the Living Library"
            copy="Read field notes, essays, lessons, research briefs, and practical reflections across the main areas of work."
          />
          {filteredArticles.length ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <ArticleCard article={article} key={article.slug} />
              ))}
            </div>
          ) : (
            <p className="mt-8 rounded-lg border border-line bg-white/70 p-6 text-sm text-muted">
              No published brief is currently listed under this category.
            </p>
          )}
        </div>
      </section>

      <section id="resources" className="scroll-mt-20 bg-white/60 px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Free Resources" title="Guides, checklists, and practical downloads" copy="Choose a resource and submit your details to request a copy." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {leadMagnets.map((resourceItem) => (
              <article
                className="rounded-lg border border-line bg-white/75 p-5 transition hover:-translate-y-1 hover:border-gold hover:shadow-md"
                key={resourceItem.slug}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald">{resourceItem.category}</p>
                <h3 className="display mt-3 text-2xl font-semibold text-deep">{resourceItem.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{resourceItem.description}</p>
                <Link
                  className="mt-4 inline-flex rounded-md border border-line px-3 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-burgundy transition hover:border-gold hover:text-deep"
                  data-conversion="subscribe_dispatch"
                  data-conversion-label={resourceItem.title}
                  href={`/library?resource=${encodeURIComponent(resourceItem.slug)}#resource-request`}
                >
                  Request resource
                </Link>
              </article>
            ))}
          </div>
          <div id="resource-request" className="mx-auto mt-10 scroll-mt-20 max-w-3xl rounded-lg border border-line bg-white/80 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">Resource request</p>
            <h3 className="display mt-3 text-3xl font-semibold text-deep">
              {selectedResource ? `Request: ${selectedResource.title}` : "Choose a free resource"}
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              {selectedResource
                ? "Submit your details below and we will follow up with the selected resource."
                : "Choose any resource above, then submit your details here for delivery or follow-up."}
            </p>
            <div className="mt-6">
              <NewsletterForm compact />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
