import Link from "next/link";
import { notFound } from "next/navigation";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { PageHero } from "@/components/ui/page-hero";
import { articles } from "@/lib/content";
import { jsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) return {};
  return pageMetadata({
    title: article.seoTitle,
    description: article.metaDescription,
    path: `/library/${article.slug}`,
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.metaDescription,
          datePublished: article.publishedAt,
          author: {
            "@type": "Person",
            name: "Musa Allama",
          },
        })}
      />
      <PageHero
        eyebrow={article.category}
        title={article.title}
        copy={article.excerpt}
        primaryCta={{ label: "Subscribe", href: "#dispatch", action: "subscribe_dispatch" }}
        secondaryCta={{ label: "Related products", href: "#related", action: "view_related_products" }}
      />

      <section className="px-5 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_320px]">
          <article className="content rounded-lg border border-line bg-white/80 p-7 text-muted">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-burgundy">{article.readingTime}</p>
            {article.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
          <aside className="space-y-5">
            <section id="related" className="rounded-lg border border-line bg-white/80 p-6">
              <h2 className="display text-3xl font-semibold text-deep">Related products</h2>
              <ul className="mt-4 grid gap-3 text-sm leading-7 text-charcoal">
                {article.relatedProducts.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-5 grid gap-3">
                <Link
                  className="rounded-md bg-deep px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-vellum"
                  data-conversion="buy_book"
                  data-conversion-label={`Books from ${article.title}`}
                  href="/books"
                >
                  Explore books
                </Link>
                <Link
                  className="rounded-md border border-gold px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-deep"
                  data-conversion="enroll_course"
                  data-conversion-label={`Courses from ${article.title}`}
                  href="/courses"
                >
                  View courses
                </Link>
              </div>
            </section>
            <section id="dispatch" className="rounded-lg border border-line bg-white/80 p-6">
              <h2 className="display text-3xl font-semibold text-deep">Institutional Dispatch</h2>
              <p className="mt-3 text-sm leading-7 text-muted">Receive practical notes and free resources by interest.</p>
              <div className="mt-5">
                <NewsletterForm compact />
              </div>
            </section>
          </aside>
        </div>
      </section>
    </>
  );
}
