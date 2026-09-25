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
  title: "Books",
  description:
    "Books, field guides, strategic publications, language works, agriculture titles, and selected forthcoming releases from MusaAllama.com.",
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
        eyebrow="Musa Allama Books"
        title="Books for learning, strategy, enterprise, language, and the field."
        copy="Explore published titles, reader-ready works, forthcoming books, and selected collector editions from Musa Allama. Arabic Diwan works are presented separately in Al-Maqam."
        primaryCta={{ label: "Browse books", href: "#book-grid", action: "view_book_catalog" }}
        secondaryCta={{ label: "Visit Al-Maqam", href: "/al-maqam", action: "view_diwan_canon" }}
      />
      <ConversionStrip title="Available titles can be ordered directly. Forthcoming books can be followed or requested through an inquiry." />

      <section className="border-b border-line bg-deep px-5 py-12 text-vellum">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Arabic Poetry & Diwan</p>
            <h2 className="display mt-3 text-4xl font-semibold md:text-5xl">Enter Al-Maqam.</h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-vellum/72">
              Al-Maqam is the dedicated home of the Arabic Diwan collection, bringing the poetic works together in one focused reading experience.
            </p>
          </div>
          <div className="rounded-lg border border-gold/25 p-6">
            <p className="display text-5xl font-semibold text-gold">{mainDiwanCanon.length + extendedDiwanCanon.length}</p>
            <p className="mt-2 text-sm text-vellum/70">Diwan works in the collection</p>
            <Link className="mt-6 inline-flex rounded-md bg-gold px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-deep" href="/al-maqam">
              Enter Al-Maqam
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-12">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">
            Browse by category {activeCategory ? `· ${activeCategory}` : "· All books"}
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
            eyebrow="Available Now"
            title="Featured books"
            copy="Selected digital titles available for direct order, preview, print-copy requests, and related course access."
          />
          {flagshipBooks.length ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {flagshipBooks.map((book) => (
                <BookCard book={book} key={book.slug} />
              ))}
            </div>
          ) : (
            <p className="mt-8 rounded-lg border border-line bg-white/70 p-6 text-sm text-muted">
              No available title is listed under this category yet.
            </p>
          )}
        </div>
      </section>

      <section className="border-y border-line bg-deep px-5 py-16 text-vellum">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Selected Works</p>
          <h2 className="display mt-3 text-4xl font-semibold md:text-5xl">More books from Musa Allama.</h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-vellum/72">
            Explore completed works across language, leadership, agriculture, technology, learning, and enterprise. Release details are shown on each book page.
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
              No additional title is listed under this category yet.
            </p>
          )}
        </div>
      </section>

      <section className="bg-white/60 px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Book Bundles"
            title="Curated reading bundles"
            copy="Choose a bundle when you want several connected titles together at one combined price."
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
                  Order bundle
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Forthcoming"
            title="Books in preparation"
            copy="A selection of upcoming Musa Allama titles. Open a book page to read its introduction, audience, themes, and availability information."
          />
          {widerBooks.length ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {widerBooks.map((book) => (
                <BookCard book={book} key={book.slug} />
              ))}
            </div>
          ) : (
            <p className="mt-8 rounded-lg border border-line bg-white/70 p-6 text-sm text-muted">
              No forthcoming title is listed under this category yet.
            </p>
          )}
        </div>
      </section>

      <section className="bg-white/60 px-5 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-burgundy">Collector Editions</p>
            <h2 className="display mt-3 text-4xl font-semibold text-deep md:text-5xl">Premium editions and institutional sets.</h2>
            <p className="mt-5 text-sm leading-7 text-muted">
              For collector editions, institutional orders, print requests, and special reading sets, contact MusaAllama.com directly.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
