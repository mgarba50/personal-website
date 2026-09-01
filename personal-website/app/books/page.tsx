import Link from "next/link";
import { BookCard } from "@/components/cards/book-card";
import { ConversionStrip } from "@/components/commerce/conversion-strip";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { books } from "@/lib/canon-books";
import { completedManuscriptSlugs } from "@/lib/completed-books";
import { bundleOffers } from "@/lib/revenue";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "The Canon",
  description:
    "The publishing division of MusaAllama.com: live books, verified completed manuscripts, diwans, bundles, collector editions, and forthcoming publications.",
  path: "/books",
});

const categories = [
  "Agriculture",
  "Agrochemical Sales",
  "Chinese Language",
  "Strategy",
  "Languages",
  "Technology",
  "Poetry / Diwan",
  "Philosophy",
  "Publishing",
  "Business",
];

export default function BooksPage() {
  const flagshipBooks = books
    .filter((book) => book.isFlagship)
    .sort((first, second) => (first.salesOrder ?? 99) - (second.salesOrder ?? 99));
  const completedBooks = books.filter(
    (book) => !book.isFlagship && completedManuscriptSlugs.has(book.slug),
  );
  const widerBooks = books.filter(
    (book) => !book.isFlagship && !completedManuscriptSlugs.has(book.slug),
  );

  return (
    <>
      <PageHero
        eyebrow="The Canon"
        title="Books, manuals, diwans, and strategic publications."
        copy="The publishing house of MusaAllama.com: live commercial books, verified completed manuscripts, approved previews, future releases, and collector-edition projects."
        primaryCta={{ label: "Browse books", href: "#book-grid", action: "view_book_catalog" }}
        secondaryCta={{ label: "Publishing advisory", href: "/advisory/publishing-system", action: "book_advisory" }}
      />
      <ConversionStrip title="Commercial titles lead to purchase; completed but unpriced manuscripts remain inquiry-only until release terms are approved." />

      <section className="px-5 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                className="rounded-md border border-line bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-charcoal hover:border-gold"
                data-conversion="filter_books"
                data-conversion-label={category}
                href={`/books?category=${encodeURIComponent(category)}`}
                key={category}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="book-grid" className="px-5 pb-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Flagship Commercial Canon"
            title="Phase 1 revenue books"
            copy="These three premium digital books remain the Canon titles open for manual bank-transfer orders, approved previews, print requests, and course waitlists."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {flagshipBooks.map((book) => (
              <BookCard book={book} key={book.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-deep px-5 py-16 text-vellum">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Verified completed manuscripts</p>
          <h2 className="display mt-3 text-4xl font-semibold md:text-5xl">Finished books recovered into the MusaAllama Canon.</h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-vellum/72">
            These books were verified from complete private masters or complete multi-part manuscript packages. Their full manuscripts remain outside public GitHub and public download paths. Where no approved price or preview exists, the release remains inquiry-only.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {completedBooks.map((book) => (
              <div className="[&>article]:bg-vellum" key={book.slug}>
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/60 px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Product bundles"
            title="Manual order bundles"
            copy="Existing bundle offers remain unchanged. No newly recovered manuscript has been inserted into a paid bundle without an approved price."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {bundleOffers.map((bundle) => (
              <article className="rounded-lg border border-line bg-white/80 p-6" key={bundle.slug}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">{bundle.note}</p>
                <h3 className="display mt-3 text-3xl font-semibold text-deep">{bundle.title}</h3>
                <p className="mt-4 text-lg font-semibold text-deep">{bundle.price}</p>
                <ul className="mt-5 grid gap-2 text-sm leading-7 text-muted">
                  {bundle.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link
                  className="mt-6 inline-flex rounded-md bg-deep px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-vellum transition hover:bg-navy"
                  data-conversion="bundle_inquiry"
                  data-conversion-label={bundle.title}
                  href={`/checkout?type=bundle&slug=${bundle.slug}&provider=manual`}
                >
                  Manual order
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Wider Canon"
            title="Forthcoming and developing publications"
            copy="These titles remain visible with approved previews or inquiry routes where available, but were not promoted to verified-complete status in this manuscript audit."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {widerBooks.map((book) => (
              <BookCard book={book} key={book.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/60 px-5 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-burgundy">Collector Edition</p>
            <h2 className="display mt-3 text-4xl font-semibold text-deep md:text-5xl">Premium editions and bundles.</h2>
            <p className="mt-5 text-sm leading-7 text-muted">
              Collector editions, institutional bundles, and private reading packs can be released only through an approved direct checkout, manual bank-transfer, or membership-access path.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
