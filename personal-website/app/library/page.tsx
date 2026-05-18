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
    "The SEO archive of essays, research briefs, field reports, language lessons, case studies, and strategic notes.",
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

export default function LibraryPage() {
  return (
    <>
      <PageHero
        eyebrow="Living Library"
        title="Essays, field notes, language lessons, and research briefs."
        copy="The authority archive for agriculture, agrochemicals, hydroponics, languages, publishing, AI, automation, strategy, and reflective thought."
        primaryCta={{ label: "Read briefs", href: "#articles", action: "read_library" }}
        secondaryCta={{ label: "Get free resource", href: "#resources", action: "subscribe_dispatch" }}
      />
      <ConversionStrip title="SEO traffic should become subscribers, buyers, or advisory leads." />

      <section className="px-5 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                className="rounded-md border border-line bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-charcoal hover:border-gold"
                data-conversion="filter_library"
                data-conversion-label={category}
                href={`/library?category=${encodeURIComponent(category)}`}
                key={category}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="articles" className="px-5 pb-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="SEO archive"
            title="Initial article and brief library"
            copy="Every article includes related products, newsletter capture, and internal links into books, courses, advisory, and membership."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard article={article} key={article.slug} />
            ))}
          </div>
        </div>
      </section>

      <section id="resources" className="bg-white/60 px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Lead magnets" title="Downloadable resources after email capture" />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {leadMagnets.map((resource) => (
              <article className="rounded-lg border border-line bg-white/75 p-5" key={resource.slug}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald">{resource.category}</p>
                <h3 className="display mt-3 text-2xl font-semibold text-deep">{resource.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{resource.description}</p>
                <a
                  className="mt-4 inline-flex text-sm font-semibold uppercase tracking-[0.14em] text-burgundy hover:text-deep"
                  data-conversion="subscribe_dispatch"
                  data-conversion-label={resource.title}
                  href="#resources"
                >
                  Request resource
                </a>
              </article>
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-3xl">
            <NewsletterForm compact />
          </div>
        </div>
      </section>
    </>
  );
}
