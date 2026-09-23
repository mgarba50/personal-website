import Link from "next/link";
import { BookCard } from "@/components/cards/book-card";
import { ConversionStrip } from "@/components/commerce/conversion-strip";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { books } from "@/lib/canon-books";
import { completedManuscriptSlugs } from "@/lib/completed-books";
import { extendedDiwanCanon, mainDiwanCanon } from "@/lib/diwan-canon";
import { publicationArchive } from "@/lib/publication-archive";
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

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = categories.includes(category ?? "") ? category : undefined;
  const matchesCategory = (book: (typeof books)[number]) =>
    !activeCategory || book.category === activeCategory;

  const flagshipBooks = books
    .filter((book) => book.isFlagship)
    .filter(matchesCategory)
    .sort((first, second) => (first.salesOrder ?? 99) - (second.salesOrder ?? 99));
  const completedBooks = books.filter(
    (book) => !book.isFlagship && completedManuscriptSlugs.has(book.slug) && matchesCategory(book),
  );
  const widerBooks = books.filter(
    (book) => !book.isFlagship && !completedManuscriptSlugs.has(book.slug) && matchesCategory(book),
  );

  const filterClass = (selected: boolean) =>
    `rounded-md border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
      selected
        ? "border-gold bg-deep text-vellum"
        : "border-line bg-white/70 text-charcoal hover:border-gold"
    }`;

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
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">
            Filter the Canon {activeCategory ? `· ${activeCategory}` : "· All categories"}
          </p>
          <div className="flex flex-wrap gap-2">
            <Link className={filterClass(!activeCategory)} href="/books#book-grid">
              All
            </Link>
            {categories.map((categoryName) => (
              <Link
                aria-current={activeCategory === categoryName ? "page" : undefined}
                className={filterClass(activeCategory === categoryName)}
                data-conversion="filter_books"
                data-conversion-label={categoryName}
                href={`/books?category=${encodeURIComponent(categoryName)}#book-grid`}
                key={categoryName}
              >
                {categoryName}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="book-grid" className="scroll-mt-20 px-5 pb-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Flagship Commercial Canon"
            title="Phase 1 revenue books"
            copy="These three premium digital books remain the Canon titles open for manual bank-transfer orders, approved previews, print requests, and course waitlists."
          />
          {flagshipBooks.length ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {flagshipBooks.map((book) => (
                <BookCard book={book} key={book.slug} />
              ))}
            </div>
          ) : (
            <p className="mt-8 rounded-lg border border-line bg-white/70 p-6 text-sm text-muted">
              No flagship commercial title is currently filed under this category.
            </p>
          )}
        </div>
      </section>

      <section className="border-y border-line bg-deep px-5 py-16 text-vellum">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Verified completed manuscripts</p>
          <h2 className="display mt-3 text-4xl font-semibold md:text-5xl">Finished general books recovered into the MusaAllama Canon.</h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-vellum/72">
            These books were verified from complete private masters or complete multi-part manuscript packages. Their full manuscripts remain outside public GitHub and public download paths. Where no approved price or preview exists, the release remains inquiry-only.
          </p>
          {completedBooks.length ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {completedBooks.map((book) => (
                <div className="[&>article]:bg-vellum" key={book.slug}>
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-8 rounded-lg border border-gold/25 p-6 text-sm text-vellum/70">
              No verified completed manuscript is currently filed under this category.
            </p>
          )}
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
          {widerBooks.length ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {widerBooks.map((book) => (
                <BookCard book={book} key={book.slug} />
              ))}
            </div>
          ) : (
            <p className="mt-8 rounded-lg border border-line bg-white/70 p-6 text-sm text-muted">
              No developing publication is currently filed under this category.
            </p>
          )}
        </div>
      </section>

      <section className="border-y border-line bg-white/60 px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="General Publication Archive"
            title="Legacy identities preserved instead of silently disappearing"
            copy={`${publicationArchive.length} exact-title legacy general-publication identities are retained as archive evidence while their authoritative manuscripts and edition relationships are recovered.`}
          />
          <div className="mt-8 rounded-lg border border-line bg-white/80 p-7">
            <p className="max-w-3xl text-sm leading-7 text-muted">
              Archive records are not counted as completed or commercially released books. They exist so older cover evidence and publication identities stay traceable in Git without contaminating the confirmed Canon.
            </p>
            <Link
              className="mt-6 inline-flex rounded-md bg-deep px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-vellum"
              href="/books/archive"
            >
              Open General Publication Archive
            </Link>
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
