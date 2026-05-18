import Link from "next/link";
import { notFound } from "next/navigation";
import { BookCard } from "@/components/cards/book-card";
import { ConversionStrip } from "@/components/commerce/conversion-strip";
import { PaymentPanel } from "@/components/commerce/payment-panel";
import { SalesSection } from "@/components/commerce/sales-section";
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
  const checkoutHref = `/checkout?type=book&slug=${book.slug}`;
  const isAgroLogistics = book.slug === "agro-logistics-across-the-great-divide";

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
        primaryCta={{ label: "Buy book", href: checkoutHref, action: "buy_book" }}
        secondaryCta={{ label: "Join membership", href: "/membership", action: "apply_membership" }}
      />
      <ConversionStrip title="This sales page should convert readers into buyers, members, or advisory clients." />

      <section className="px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_360px]">
          <article>
            {isAgroLogistics ? (
              <div className="mb-6 grid gap-6 md:grid-cols-2">
                <SalesSection
                  action="buy_book"
                  actionHref={checkoutHref}
                  actionLabel="Buy Agro Logistics"
                  eyebrow="The problem"
                  points={[
                    "Importers lose money when supplier communication, inspection expectations, and shipping details are vague.",
                    "Agrochemical operators need practical language, procurement discipline, and distribution judgment.",
                    "Field supply chains break when trade decisions are separated from farmer realities.",
                  ]}
                  title="Agro trade fails where language, logistics, and field intelligence do not meet."
                />
                <SalesSection
                  action="book_advisory"
                  actionHref="/advisory/china-sourcing"
                  actionLabel="Book sourcing advisory"
                  eyebrow="The commercial promise"
                  points={[
                    "Build a sharper procurement checklist before committing capital.",
                    "Understand supplier verification, product specification, and shipment communication as one operating system.",
                    "Use the book as a practical bridge into advisory, training, or institutional procurement support.",
                  ]}
                  title="A field manual for serious agrochemical and agricultural procurement operators."
                />
              </div>
            ) : null}

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

            <section className="mt-6 rounded-lg border border-line bg-deep p-7 text-vellum">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Next action</p>
              <h2 className="display mt-3 text-3xl font-semibold">Buy, bundle, or continue into advisory.</h2>
              <p className="mt-4 text-sm leading-7 text-vellum/72">
                This page routes commercial readers into direct purchase, related books, membership access, or private
                advisory where the topic requires applied support.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  className="rounded-md bg-gold px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-deep"
                  data-conversion="buy_book"
                  data-conversion-label={book.title}
                  href={checkoutHref}
                >
                  Buy this book
                </Link>
                <Link
                  className="rounded-md border border-gold px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-gold"
                  data-conversion="book_advisory"
                  data-conversion-label={`Advisory from ${book.title}`}
                  href="/advisory"
                >
                  Discuss advisory
                </Link>
              </div>
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
