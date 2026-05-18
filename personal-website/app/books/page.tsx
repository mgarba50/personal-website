import Link from "next/link";
import { BookCard } from "@/components/cards/book-card";
import { ConversionStrip } from "@/components/commerce/conversion-strip";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { books } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "The Canon",
  description:
    "The publishing division of MusaAllama.com: books, manuals, diwans, bundles, collector editions, and digital products.",
  path: "/books",
});

const categories = ["Agriculture", "Strategy", "Languages", "Technology", "Poetry / Diwan", "Philosophy", "Publishing", "Business"];

export default function BooksPage() {
  return (
    <>
      <PageHero
        eyebrow="The Canon"
        title="Books, manuals, diwans, and strategic publications."
        copy="The publishing house of MusaAllama.com: PDF, EPUB, print, bundle offers, and collector edition products."
        primaryCta={{ label: "Browse books", href: "#book-grid", action: "view_book_catalog" }}
        secondaryCta={{ label: "Publishing advisory", href: "/advisory/publishing-system", action: "book_advisory" }}
      />
      <ConversionStrip title="Books should lead to purchase, bundle interest, or advisory." />

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
            eyebrow="Publishing catalog"
            title="Initial book products"
            copy="Each book page includes formats, reader promise, table of contents, author note, purchase options, and related offers."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {books.map((book) => (
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
              Collector editions, institutional bundles, and private reading packs can be sold through direct checkout,
              manual bank transfer, or membership access.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
