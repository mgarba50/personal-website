import Link from "next/link";
import { notFound } from "next/navigation";
import { BookCard } from "@/components/cards/book-card";
import { PaymentPanel } from "@/components/commerce/payment-panel";
import { PageHero } from "@/components/ui/page-hero";
import { books } from "@/lib/content";
import { jsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = books.find((item) => item.slug === slug);
  if (!book) return {};
  return pageMetadata({
    title: book.title,
    description: book.description,
    path: `/books/${book.slug}`,
  });
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = books.find((item) => item.slug === slug);
  if (!book) notFound();

  const related = books.filter((item) => book.related.includes(item.slug));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "Book",
          name: book.title,
          description: book.description,
          author: "Musa Allama",
          offers: {
            "@type": "Offer",
            price: book.price,
            priceCurrency: "NGN",
            availability: "https://schema.org/PreOrder",
          },
        })}
      />
      <PageHero
        eyebrow={book.category}
        title={book.title}
        copy={book.subtitle}
        primaryCta={{ label: "Buy book", href: `/checkout?type=book&slug=${book.slug}` }}
        secondaryCta={{ label: "Join membership", href: "/membership" }}
      />

      <section className="px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_360px]">
          <article>
            <div className="rounded-lg border border-line bg-white/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">Description</p>
              <p className="mt-4 text-lg leading-8 text-muted">{book.description}</p>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <section className="rounded-lg border border-line bg-white/80 p-7">
                <h2 className="display text-3xl font-semibold text-deep">Who should read it</h2>
                <p className="mt-4 text-sm leading-7 text-muted">{book.audience}</p>
              </section>
              <section className="rounded-lg border border-line bg-white/80 p-7">
                <h2 className="display text-3xl font-semibold text-deep">Formats</h2>
                <ul className="mt-4 grid gap-2 text-sm text-charcoal">
                  {book.formats.map((format) => (
                    <li key={format}>{format}</li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="mt-6 rounded-lg border border-line bg-white/80 p-7">
              <h2 className="display text-3xl font-semibold text-deep">What the reader will learn</h2>
              <ul className="mt-4 grid gap-3 text-sm leading-7 text-charcoal">
                {book.learn.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mt-6 rounded-lg border border-line bg-white/80 p-7">
              <h2 className="display text-3xl font-semibold text-deep">Table of contents</h2>
              <ol className="mt-4 grid gap-3 text-sm leading-7 text-charcoal">
                {book.contents.map((item, index) => (
                  <li key={item}>
                    {index + 1}. {item}
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-6 rounded-lg border border-line bg-white/80 p-7">
              <h2 className="display text-3xl font-semibold text-deep">Author note</h2>
              <p className="mt-4 text-sm leading-7 text-muted">{book.authorNote}</p>
            </section>
          </article>
          <PaymentPanel title={book.title} productType="book" slug={book.slug} price={book.price} />
        </div>
      </section>

      <section className="bg-white/55 px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">Bundle offer</p>
              <h2 className="display mt-3 text-4xl font-semibold text-deep">Related reading path</h2>
            </div>
            <Link className="text-sm font-semibold uppercase tracking-[0.14em] text-burgundy hover:text-deep" href="/books">
              Return to Canon
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <BookCard book={item} key={item.slug} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
