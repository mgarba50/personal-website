import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/lib/content";

const toneClasses: Record<string, string> = {
  emerald: "from-emerald to-deep",
  navy: "from-navy to-deep",
  gold: "from-gold to-burgundy",
  burgundy: "from-burgundy to-deep",
  deep: "from-deep to-navy",
};

const recoveredCoverBySlug: Record<string, string> = {
  "a-multilingual-mind": "/assets/books/a-multilingual-mind/cover.webp",
  "cheating-time": "/assets/books/cheating-time/cover.webp",
  "the-illusion-of-control": "/assets/books/the-illusion-of-control/cover.webp",
  "knowledge-is-seed": "/assets/books/knowledge-is-seed/cover.webp",
  "the-allama-economy": "/assets/books/the-allama-economy/cover.webp",
  "the-climate-resilient-farmer": "/assets/books/the-climate-resilient-farmer/cover.webp",
  "the-entrepreneurial-polyglot": "/assets/books/the-entrepreneurial-polyglot/cover.webp",
  "the-desert-ceo": "/assets/books/the-desert-ceo/cover.webp",
  "the-five-language-ceo": "/assets/books/the-five-language-ceo/cover.webp",
  "the-strategist-of-power": "/assets/books/the-strategist-of-power/cover.webp",
};

export function BookCard({ book }: { book: Book }) {
  const detailHref = `/books/${book.slug}`;
  const checkoutHref = `/checkout?type=book&slug=${book.slug}&provider=manual`;
  const previewHref = book.previewHref ?? `${detailHref}#preview`;
  const waitlistHref = book.waitlistSlug
    ? `/courses?waitlist=${encodeURIComponent(book.waitlistSlug)}#course-waitlists`
    : "/courses";
  const canBuy = Boolean(book.isFlagship);
  const coverImage = book.coverImage ?? recoveredCoverBySlug[book.slug];

  return (
    <article className="group grid h-full gap-5 rounded-lg border border-line bg-white/75 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-gold hover:shadow-md">
      <Link
        aria-label={`Open ${book.title}`}
        className="relative block aspect-[3/4] overflow-hidden rounded-md border border-line bg-deep outline-none ring-gold transition focus-visible:ring-2"
        data-conversion="book_cover_click"
        data-conversion-label={book.title}
        href={detailHref}
      >
        {coverImage ? (
          <Image
            src={coverImage}
            alt={`${book.title} cover`}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-[1.015]"
          />
        ) : (
          <div
            className={`flex h-full flex-col justify-between bg-gradient-to-br ${
              toneClasses[book.coverTone] ?? toneClasses.deep
            } p-5 text-vellum`}
          >
            <span className="text-xs uppercase tracking-[0.18em] text-gold">{book.category}</span>
            <h3 className="display text-3xl font-semibold leading-none">{book.title}</h3>
          </div>
        )}
        <span className="absolute inset-x-3 bottom-3 rounded-md bg-deep/90 px-3 py-2 text-center text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-vellum opacity-0 shadow-sm transition group-hover:opacity-100 group-focus-within:opacity-100">
          Open publication
        </span>
      </Link>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">{book.category}</p>
        <h3 className="display mt-2 text-2xl font-semibold text-deep">
          <Link className="outline-none transition hover:text-burgundy focus-visible:underline" href={detailHref}>
            {book.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-7 text-muted">{book.promise ?? book.description}</p>
      </div>

      <div className="mt-auto border-t border-line pt-4">
        <div className="grid gap-1 text-sm">
          <span className="font-semibold text-deep">
            {canBuy ? `Launch Price: ${book.launchPrice ?? book.price}` : `Publication status: ${book.price}`}
          </span>
          {canBuy && book.standardPrice ? <span className="text-muted">Standard Price: {book.standardPrice}</span> : null}
          {canBuy && book.bundlePrice ? <span className="text-muted">{book.bundleLabel}: {book.bundlePrice}</span> : null}
        </div>
        {canBuy ? (
          <>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-burgundy">
              Launch pricing is available for early buyers only.
            </p>
            <div className="mt-4 grid gap-2">
              <Link
                className="rounded-md bg-deep px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-vellum transition hover:bg-navy"
                data-conversion="buy_pdf_click"
                data-conversion-label={book.title}
                href={checkoutHref}
              >
                {book.primaryCta ?? "Buy PDF"}
              </Link>
              <div className="grid gap-2 sm:grid-cols-2">
                <Link
                  className="rounded-md border border-gold px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.12em] text-deep transition hover:bg-gold"
                  data-conversion="preview_click"
                  data-conversion-label={book.title}
                  href={previewHref}
                >
                  Preview
                </Link>
                <Link
                  className="rounded-md border border-deep/15 px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.12em] text-deep transition hover:bg-vellum"
                  data-conversion="product_card_click"
                  data-conversion-label={`${book.title} waitlist`}
                  href={waitlistHref}
                >
                  Waitlist
                </Link>
              </div>
              <Link
                className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-burgundy hover:text-deep"
                data-conversion="view_book"
                data-conversion-label={book.title}
                href={detailHref}
              >
                View sales page
              </Link>
            </div>
          </>
        ) : (
          <Link
            className="mt-4 flex w-full items-center justify-center rounded-md bg-deep px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-vellum transition hover:bg-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            data-conversion="view_book"
            data-conversion-label={book.title}
            href={detailHref}
          >
            View publication page
          </Link>
        )}
      </div>
    </article>
  );
}
