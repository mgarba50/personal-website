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

// Original artist-supplied catalogue artwork; legacy book records keep their commercial data.
const imperialCatalogueCovers: Readonly<Record<string, string>> = {
  "a-multilingual-mind": "/assets/academy-phase1/a-multilingual-mind.webp",
  "agro-logistics-across-the-great-divide": "/assets/academy-phase1/agro-logistics-across-the-great-divide.webp",
  "agrochemical-sales-field-guide": "/assets/academy-phase1/agrochemical-sales-field-guide.webp",
  "bridge-of-meaning": "/assets/academy-phase1/bridge-of-meaning.webp",
  "chinese-for-agrochemical-professionals": "/assets/academy-phase1/chinese-for-agrochemical-professionals.webp",
  "knowledge-is-seed": "/assets/academy-phase1/knowledge-is-seed.webp",
  "nurturing-seekers-of-truth": "/assets/academy-phase1/nurturing-seekers-of-truth.webp",
  "the-allama-economy": "/assets/academy-phase1/the-allama-economy.webp",
  "the-borderless-intellectual-economy": "/assets/academy-phase1/the-borderless-intellectual-economy.webp",
  "the-climate-resilient-farmer": "/assets/academy-phase1/the-climate-resilient-farmer.webp",
  "the-desert-ceo": "/assets/academy-phase1/the-desert-ceo.webp",
  "the-entrepreneurial-polyglot": "/assets/academy-phase1/the-entrepreneurial-polyglot.webp",
  "the-five-language-ceo": "/assets/academy-phase1/the-five-language-ceo.webp",
  "the-modern-farmer": "/assets/academy-phase1/the-modern-farmer.webp",
  "the-strategist-of-power": "/assets/academy-phase1/the-strategist-of-power.webp",
  "web-development-for-world-changers": "/assets/academy-phase1/web-development-for-world-changers.webp"
};

export function BookCard({ book }: { book: Book }) {
  const coverImage = imperialCatalogueCovers[book.slug] ?? book.coverImage;
  const bookHref = `/books/${book.slug}`;
  const checkoutHref = `/checkout?type=book&slug=${book.slug}&provider=manual`;
  const previewHref = book.previewHref ?? `${bookHref}#preview`;
  const waitlistHref = book.waitlistSlug
    ? `/courses?waitlist=${encodeURIComponent(book.waitlistSlug)}#course-waitlists`
    : "/courses";
  const canBuy = Boolean(book.isFlagship);

  return (
    <article className="group grid h-full gap-5 rounded-lg border border-line bg-white/75 p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-gold hover:shadow-md">
      <Link
        aria-label={`Open ${book.title}`}
        className="relative aspect-[2/3] overflow-hidden rounded-md border border-gold/20 bg-[#15222a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        data-conversion="view_book"
        data-conversion-label={`${book.title} cover`}
        href={bookHref}
      >
        {coverImage ? (
          <Image
            src={coverImage}
            alt={`${book.title} cover`}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
            className="object-contain p-4 drop-shadow-[0_16px_18px_rgba(0,0,0,0.22)] transition duration-300 motion-safe:group-hover:scale-[1.008]"
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
      </Link>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">{book.category}</p>
        <h3 className="display mt-2 text-2xl font-semibold text-deep">
          <Link className="transition hover:text-burgundy" href={bookHref}>
            {book.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-7 text-muted">{book.promise ?? book.description}</p>
      </div>
      <div className="mt-auto border-t border-line pt-4">
        <div className="grid gap-1 text-sm">
          <span className="font-semibold text-deep">
            {canBuy ? `Launch Price: ${book.launchPrice ?? book.price}` : "Coming soon"}
          </span>
          {canBuy && book.standardPrice ? <span className="text-muted">Standard Price: {book.standardPrice}</span> : null}
          {canBuy && book.bundlePrice ? <span className="text-muted">{book.bundleLabel}: {book.bundlePrice}</span> : null}
        </div>
        {canBuy ? (
          <>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-burgundy">
              Introductory pricing for early readers.
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
                href={bookHref}
              >
                View book
              </Link>
            </div>
          </>
        ) : (
          <Link
            className="mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.14em] text-burgundy hover:text-deep"
            data-conversion="view_book"
            data-conversion-label={book.title}
            href={bookHref}
          >
            Explore book
          </Link>
        )}
      </div>
    </article>
  );
}
