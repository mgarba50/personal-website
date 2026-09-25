import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookCard } from "@/components/cards/book-card";
import { ConversionStrip } from "@/components/commerce/conversion-strip";
import { PaymentPanel } from "@/components/commerce/payment-panel";
import { CourseWaitlistForm } from "@/components/forms/course-waitlist-form";
import { PageHero } from "@/components/ui/page-hero";
import { books } from "@/lib/canon-books";
import { completedBookFrontMatter } from "@/lib/completed-books";
import { bankDetails } from "@/lib/revenue";
import { jsonLd, pageMetadata } from "@/lib/seo";

const canonicalFrontMatter: Record<string, { author: string; edition: string }> = {
  "the-modern-farmer": { author: "Musa Allama", edition: "Executive Edition" },
  "agrochemical-sales-field-guide": { author: "Musa Allama Ibn Garba", edition: "First Edition" },
  "chinese-for-agrochemical-professionals": { author: "Musa Allama", edition: "Executive Edition" },
  ...completedBookFrontMatter,
};

const toneClasses: Record<string, string> = {
  emerald: "from-emerald to-deep",
  navy: "from-navy to-deep",
  gold: "from-gold to-burgundy",
  burgundy: "from-burgundy to-deep",
  deep: "from-deep to-navy",
};

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = books.find((item) => item.slug === slug);
  if (!book) return {};
  return pageMetadata({
    title: book.seoTitle ?? book.title,
    description: book.metaDescription ?? book.description,
    path: `/books/${book.slug}`,
  });
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = books.find((item) => item.slug === slug);
  if (!book) notFound();

  const related = books.filter((item) => book.related.includes(item.slug));
  const canBuy = Boolean(book.isFlagship && book.launchPrice);
  const checkoutHref = `/checkout?type=book&slug=${book.slug}&provider=manual`;
  const inquiryHref = `/contact?inquiry=book-publication&product=${book.slug}`;
  const previewHref = book.previewHref;
  const displayPrice = canBuy ? book.launchPrice ?? book.price : "Coming soon";
  const frontMatter = canonicalFrontMatter[book.slug] ?? { author: "Musa Allama", edition: "Forthcoming" };

  const bookStructuredData = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    description: book.metaDescription ?? book.description,
    author: frontMatter.author,
    image: book.coverImage,
    bookEdition: frontMatter.edition,
    ...(canBuy
      ? {
          offers: {
            "@type": "Offer",
            price: displayPrice,
            priceCurrency: "NGN",
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(bookStructuredData)} />
      <PageHero
        eyebrow={book.category}
        title={book.title}
        copy={book.subtitle}
        primaryCta={
          canBuy
            ? { label: book.primaryCta ?? "Buy PDF", href: checkoutHref, action: "buy_pdf_click" }
            : { label: "Request updates", href: inquiryHref, action: "send_inquiry" }
        }
        secondaryCta={
          previewHref
            ? { label: "Preview sample", href: previewHref, action: "preview_click" }
            : { label: "Browse all books", href: "/books", action: "view_book_catalog" }
        }
      />
      <ConversionStrip
        title={
          canBuy
            ? "Order the digital edition, preview the book, request a print copy, or join a related course waitlist."
            : "This title is forthcoming. Ask for release information or explore the rest of the collection."
        }
      />

      <section className="px-5 py-16">
        <div className={`mx-auto grid max-w-7xl gap-10 ${canBuy ? "lg:grid-cols-[1fr_360px]" : "lg:grid-cols-1"}`}>
          <article>
            <div className="grid gap-8 rounded-lg border border-line bg-white/80 p-7 md:grid-cols-[280px_1fr]">
              {book.coverImage ? (
                <div className="relative aspect-[3/4] overflow-hidden rounded-md border border-line bg-deep">
                  <Image src={book.coverImage} alt={`${book.title} cover`} fill priority sizes="280px" className="object-contain p-2" />
                </div>
              ) : (
                <div
                  className={`flex aspect-[3/4] items-end rounded-md border border-line bg-gradient-to-br ${
                    toneClasses[book.coverTone] ?? toneClasses.deep
                  } p-6 text-vellum`}
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Forthcoming</p>
                    <p className="display mt-3 text-3xl font-semibold leading-none">{book.title}</p>
                    <p className="mt-4 text-xs leading-5 text-vellum/65">{book.subtitle}</p>
                  </div>
                </div>
              )}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">{book.category}</p>
                <h2 className="display mt-3 text-4xl font-semibold leading-tight text-deep">{book.title}</h2>
                <p className="mt-3 text-lg leading-8 text-muted">{book.promise ?? book.description}</p>
                <div className="mt-6 grid gap-3 text-sm md:grid-cols-2">
                  <div className="rounded-md border border-line bg-vellum/70 p-4">
                    <p className="font-semibold text-deep">{canBuy ? `Launch Price: ${displayPrice}` : "Coming soon"}</p>
                    {canBuy && book.standardPrice ? <p className="mt-1 text-muted">Standard Price: {book.standardPrice}</p> : null}
                  </div>
                  {canBuy && book.bundlePrice ? (
                    <div className="rounded-md border border-line bg-vellum/70 p-4">
                      <p className="font-semibold text-deep">{book.bundleLabel}</p>
                      <p className="mt-1 text-muted">{book.bundlePrice}</p>
                    </div>
                  ) : (
                    <div className="rounded-md border border-line bg-vellum/70 p-4">
                      <p className="font-semibold text-deep">Author: {frontMatter.author}</p>
                      <p className="mt-1 text-muted">{frontMatter.edition}</p>
                    </div>
                  )}
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-burgundy">
                  {canBuy ? "Introductory pricing for early readers." : "Release information will be announced here."}
                </p>
              </div>
            </div>

            {canBuy ? (
              <section className="mt-6 rounded-lg border border-line bg-white/80 p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">Order the book</p>
                <h2 className="display mt-3 text-3xl font-semibold text-deep">Complete your order</h2>
                <div className="mt-5 grid gap-4 text-sm leading-7 text-muted md:grid-cols-3">
                  <div><p className="font-semibold text-deep">Step 1</p><p>Transfer the displayed amount to the account below.</p></div>
                  <div><p className="font-semibold text-deep">Step 2</p><p>Upload your payment receipt or screenshot.</p></div>
                  <div><p className="font-semibold text-deep">Step 3</p><p>Your order is confirmed and your digital copy is delivered to you.</p></div>
                </div>
                <div className="mt-5 rounded-md border border-line bg-vellum/70 p-4 text-sm leading-7 text-charcoal">
                  <p><strong>Account Name:</strong> {bankDetails.accountName}</p>
                  <p><strong>Account Number:</strong> {bankDetails.accountNumber}</p>
                  <p><strong>Bank:</strong> {bankDetails.bank}</p>
                  <p className="mt-2 text-muted">{bankDetails.notice}</p>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    className="rounded-md bg-deep px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-vellum"
                    data-conversion="manual_checkout_started"
                    data-conversion-label={book.title}
                    href={checkoutHref}
                  >
                    Buy PDF
                  </Link>
                  {previewHref ? (
                    <Link
                      className="rounded-md border border-gold px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-deep"
                      data-conversion="preview_click"
                      data-conversion-label={book.title}
                      href={previewHref}
                    >
                      Preview sample
                    </Link>
                  ) : null}
                </div>
              </section>
            ) : (
              <section className="mt-6 rounded-lg border border-line bg-white/80 p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">Forthcoming</p>
                <h2 className="display mt-3 text-3xl font-semibold text-deep">Be notified when this book becomes available.</h2>
                <p className="mt-4 text-sm leading-7 text-muted">
                  Release date, edition details, pricing, and ordering information will appear here when announced.
                </p>
                <Link
                  className="mt-6 inline-flex rounded-md bg-deep px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-vellum"
                  data-conversion="send_inquiry"
                  data-conversion-label={`${book.title} release inquiry`}
                  href={inquiryHref}
                >
                  Request updates
                </Link>
              </section>
            )}

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <section className="rounded-lg border border-line bg-white/80 p-7">
                <h2 className="display text-3xl font-semibold text-deep">Who this book is for</h2>
                <p className="mt-4 text-sm leading-7 text-muted">{book.audience}</p>
              </section>
              <section id="preview" className="rounded-lg border border-line bg-white/80 p-7">
                <h2 className="display text-3xl font-semibold text-deep">{previewHref ? "Preview sample" : "Preview"}</h2>
                <p className="mt-4 text-sm leading-7 text-muted">
                  {previewHref
                    ? "Read a sample and explore the book before ordering."
                    : "A public preview is not available for this title yet."}
                </p>
                {previewHref ? (
                  <Link
                    className="mt-5 inline-flex rounded-md border border-gold px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-deep transition hover:bg-gold"
                    data-conversion="preview_click"
                    data-conversion-label={book.title}
                    href={previewHref}
                  >
                    Open preview
                  </Link>
                ) : null}
              </section>
            </div>

            <section className="mt-6 rounded-lg border border-line bg-white/80 p-7">
              <h2 className="display text-3xl font-semibold text-deep">What readers will learn</h2>
              <ul className="mt-4 grid list-disc gap-3 pl-5 text-sm leading-7 text-charcoal">
                {book.learn.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>

            <section className="mt-6 rounded-lg border border-line bg-white/80 p-7">
              <h2 className="display text-3xl font-semibold text-deep">Table of contents</h2>
              <ol className="mt-4 grid list-decimal gap-3 pl-5 text-sm leading-7 text-charcoal">
                {book.contents.map((item) => <li key={item}>{item}</li>)}
              </ol>
            </section>

            {book.bonuses?.length ? (
              <section className="mt-6 rounded-lg border border-line bg-white/80 p-7">
                <h2 className="display text-3xl font-semibold text-deep">Bonuses</h2>
                <ul className="mt-4 grid list-disc gap-3 pl-5 text-sm leading-7 text-charcoal">
                  {book.bonuses.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
            ) : null}

            {canBuy ? (
              <section className="mt-6 rounded-lg border border-line bg-white/80 p-7">
                <h2 className="display text-3xl font-semibold text-deep">Related learning</h2>
                <p className="mt-4 text-sm leading-7 text-muted">
                  {book.waitlistTitle
                    ? `Join the ${book.waitlistTitle} waitlist connected to this book.`
                    : "Join the course waitlist for the next practical program."}
                </p>
                <div className="mt-6"><CourseWaitlistForm defaultCourse={book.waitlistTitle} /></div>
              </section>
            ) : null}

            {book.faq?.length ? (
              <section className="mt-6 rounded-lg border border-line bg-white/80 p-7">
                <h2 className="display text-3xl font-semibold text-deep">FAQ</h2>
                <div className="mt-5 grid gap-4">
                  {book.faq.map((item) => (
                    <div className="border-t border-line pt-4" key={item.question}>
                      <h3 className="font-semibold text-deep">{item.question}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="mt-6 rounded-lg border border-line bg-deep p-7 text-vellum">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Next step</p>
              <h2 className="display mt-3 text-3xl font-semibold">
                {canBuy ? "Start reading." : "Follow this book."}
              </h2>
              <p className="mt-4 text-sm leading-7 text-vellum/72">
                {canBuy
                  ? "Order the digital edition, request a print copy, or contact us about institutional access."
                  : "Request release information and we will point you to the latest availability details."}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {canBuy ? (
                  <>
                    <Link className="rounded-md bg-gold px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-deep" data-conversion="buy_pdf_click" data-conversion-label={book.title} href={checkoutHref}>Buy PDF</Link>
                    <Link className="rounded-md border border-gold px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-gold" data-conversion="print_copy_request" data-conversion-label={book.title} href={`/contact?inquiry=print-copy&product=${book.slug}`}>Request print copy</Link>
                    <Link className="rounded-md border border-gold px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-gold" data-conversion="send_inquiry" data-conversion-label={`${book.title} institutional license`} href={`/contact?inquiry=institutional-license&product=${book.slug}`}>Institutional access</Link>
                  </>
                ) : (
                  <Link className="rounded-md bg-gold px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-deep" data-conversion="send_inquiry" data-conversion-label={`${book.title} release inquiry`} href={inquiryHref}>Request updates</Link>
                )}
              </div>
            </section>
          </article>
          {canBuy ? <PaymentPanel title={book.title} productType="book" slug={book.slug} price={displayPrice} /> : null}
        </div>
      </section>

      <section className="bg-white/55 px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">You may also like</p>
              <h2 className="display mt-3 text-4xl font-semibold text-deep">Continue exploring</h2>
            </div>
            <Link className="text-sm font-semibold uppercase tracking-[0.14em] text-burgundy hover:text-deep" href="/books">Browse all books</Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => <BookCard book={item} key={item.slug} />)}
          </div>
        </div>
      </section>
    </>
  );
}
