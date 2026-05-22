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

export function BookCard({ book }: { book: Book }) {
  const checkoutHref = `/checkout?type=book&slug=${book.slug}&provider=manual`;
  const previewHref = book.previewHref ?? `/books/${book.slug}#preview`;
  const waitlistHref = book.waitlistSlug
    ? `/courses?waitlist=${encodeURIComponent(book.waitlistSlug)}#course-waitlists`
    : "/courses";
  const canBuy = Boolean(book.isFlagship);

  return (
    <article className="grid h-full gap-5 rounded-lg border border-line bg-white/75 p-5 shadow-sm">
      <div className="relative aspect-[3/4] overflow-hidden rounded-md border border-line bg-deep">
        {book.coverImage ? (
          <Image src={book.coverImage} alt={`${book.title} cover`} fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
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
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">{book.category}</p>
        <h3 className="display mt-2 text-2xl font-semibold text-deep">{book.title}</h3>
        <p className="mt-3 text-sm leading-7 text-muted">{book.promise ?? book.description}</p>
      </div>
      <div className="mt-auto border-t border-line pt-4">
        <div className="grid gap-1 text-sm">
          <span className="font-semibold text-deep">Launch Price: {book.launchPrice ?? book.price}</span>
          {book.standardPrice ? <span className="text-muted">Standard Price: {book.standardPrice}</span> : null}
          {book.bundlePrice ? <span className="text-muted">{book.bundleLabel}: {book.bundlePrice}</span> : null}
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
                href={`/books/${book.slug}`}
              >
                View sales page
              </Link>
            </div>
          </>
        ) : (
          <Link
            className="mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.14em] text-burgundy hover:text-deep"
            data-conversion="view_book"
            data-conversion-label={book.title}
            href={`/books/${book.slug}`}
          >
            View coming soon page
          </Link>
        )}
      </div>
    </article>
  );
}
