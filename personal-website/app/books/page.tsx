import Link from "next/link";
import { BookCard } from "@/components/cards/book-card";
import { ConversionStrip } from "@/components/commerce/conversion-strip";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { books } from "@/lib/canon-books";
import { completedManuscriptSlugs } from "@/lib/completed-books";
import { extendedDiwanCanon, mainDiwanCanon } from "@/lib/diwan-canon";
import { bundleOffers } from "@/lib/revenue";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "The Canon",
  description:
    "The general publishing Canon of MusaAllama.com: live commercial books, verified completed manuscripts, developing publications, bundles, and collector editions. The Arabic Diwan corpus is housed separately in Al-Maqam.",
  path: "/books",
});

const categories = [
  "Agriculture",
  "Agrochemical Sales",
  "Chinese Language",
  "Strategy",
  "Languages",
  "Technology",
  "Philosophy",
  "Publishing",
  "Business",
  "Engineering / Memoir",
  "Islamic Scholarship / Language",
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
        title="Books, manuals, strategic publications, and developing works."
        copy="The general publishing house of MusaAllama.com: live commercial books, verified completed manuscripts, approved previews, developing editions, and collector projects. The Diwan corpus now has its own dedicated home in Al-Maqam."
        primaryCta={{ label: "Browse books", href: "#book-grid", action: "view_book_catalog" }}
        secondaryCta={{ label: "Open Al-Maqam", href: "/al-maqam", action: "view_diwan_canon" }}
      />
      <ConversionStrip title="Commercial titles lead to purchase; completed or developing unpriced manuscripts remain inquiry-only until release terms are approved." />

      <section className="border-b border-line bg-deep px-5 py-12 text-vellum">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Correct collection placement</p>
            <h2 className="display mt-3 text-4xl font-semibold md:text-5xl">Arabic Diwans now live in Al-Maqam.</h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-vellum/72">
              The Diwan corpus is no longer mixed into the general commercial Books shelf. Al-Maqam now carries {mainDiwanCanon.length} Main Canon records and {extendedDiwanCanon.length} verified Extended Canon works, with archive evidence preserved separately from confirmed titles.
            </p>
          </div>
          <div className="rounded-lg border border-gold/25 p-6">
            <p className="display text-5xl font-semibold text-gold">{mainDiwanCanon.length + extendedDiwanCanon.length}</p>
            <p className="mt-2 text-sm text-vellum/70">controlled Diwan records in the dedicated collection</p>
            <Link className="mt-6 inline-flex rounded-md bg-gold px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-deep" href="/al-maqam">
              Enter Al-Maqam
            </Link>
          </div>
        </div>
      </section>

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
          <h2 className="display mt-3 text-4xl font-semibold md:text-5xl">Finished general books recovered into the MusaAllama Canon.</h2>
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
            copy="Existing bundle offers remain unchanged. No recovered or developing manuscript is inserted into a paid bundle without an approved price."
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
            title="Forthcoming, developing, and packaging-stage publications"
            copy="These legitimate Musa Allama works are now accounted for in Git rather than being invisible. Their cards state the actual evidence level; no developing work is falsely represented as commercially released."
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
