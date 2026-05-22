import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookCard } from "@/components/cards/book-card";
import { ConversionStrip } from "@/components/commerce/conversion-strip";
import { PaymentPanel } from "@/components/commerce/payment-panel";
import { CourseWaitlistForm } from "@/components/forms/course-waitlist-form";
import { PageHero } from "@/components/ui/page-hero";
import { books } from "@/lib/content";
import { bankDetails } from "@/lib/revenue";
import { jsonLd, pageMetadata } from "@/lib/seo";

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
  const checkoutHref = `/checkout?type=book&slug=${book.slug}&provider=manual`;
  const previewHref = book.previewHref ?? "#preview";
  const displayPrice = book.launchPrice ?? book.price;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "Book",
          name: book.title,
          description: book.metaDescription ?? book.description,
          author: "Musa Allama",
          image: book.coverImage,
          offers: {
            "@type": "Offer",
            price: displayPrice,
            priceCurrency: "NGN",
            availability: "https://schema.org/InStock",
          },
        })}
      />
      <PageHero
        eyebrow={book.category}
        title={book.title}
        copy={book.subtitle}
        primaryCta={{ label: book.primaryCta ?? "Buy PDF", href: checkoutHref, action: "buy_pdf_click" }}
        secondaryCta={{ label: "Preview sample", href: previewHref, action: "preview_click" }}
      />
      <ConversionStrip title="Buy the PDF, submit payment proof, download a free resource, join a course waitlist, or request a print copy." />

      <section className="px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_360px]">
          <article>
            <div className="grid gap-8 rounded-lg border border-line bg-white/80 p-7 md:grid-cols-[280px_1fr]">
              {book.coverImage ? (
                <div className="relative aspect-[3/4] overflow-hidden rounded-md border border-line bg-deep">
                  <Image src={book.coverImage} alt={`${book.title} cover`} fill priority sizes="280px" className="object-cover" />
                </div>
              ) : null}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">{book.category}</p>
                <h2 className="display mt-3 text-4xl font-semibold leading-tight text-deep">{book.title}</h2>
                <p className="mt-3 text-lg leading-8 text-muted">{book.promise ?? book.description}</p>
                <div className="mt-6 grid gap-3 text-sm md:grid-cols-2">
                  <div className="rounded-md border border-line bg-vellum/70 p-4">
                    <p className="font-semibold text-deep">Launch Price: {displayPrice}</p>
                    {book.standardPrice ? <p className="mt-1 text-muted">Standard Price: {book.standardPrice}</p> : null}
                  </div>
                  {book.bundlePrice ? (
                    <div className="rounded-md border border-line bg-vellum/70 p-4">
                      <p className="font-semibold text-deep">{book.bundleLabel}</p>
                      <p className="mt-1 text-muted">{book.bundlePrice}</p>
                    </div>
                  ) : null}
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-burgundy">
                  Launch pricing is available for early buyers only.
                </p>
              </div>
            </div>

            <section className="mt-6 rounded-lg border border-line bg-white/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">Manual checkout</p>
              <h2 className="display mt-3 text-3xl font-semibold text-deep">Complete Your Book Order</h2>
              <div className="mt-5 grid gap-4 text-sm leading-7 text-muted md:grid-cols-3">
                <div>
                  <p className="font-semibold text-deep">Step 1</p>
                  <p>Transfer the correct amount to the account below.</p>
                </div>
                <div>
                  <p className="font-semibold text-deep">Step 2</p>
                  <p>Upload your payment receipt or screenshot.</p>
                </div>
                <div>
                  <p className="font-semibold text-deep">Step 3</p>
                  <p>Your order will be reviewed and approved. Access is delivered by email or dashboard link.</p>
                </div>
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
                <Link
                  className="rounded-md border border-gold px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-deep"
                  data-conversion="preview_click"
                  data-conversion-label={book.title}
                  href={previewHref}
                >
                  Preview sample
                </Link>
              </div>
            </section>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <section className="rounded-lg border border-line bg-white/80 p-7">
                <h2 className="display text-3xl font-semibold text-deep">Who this book is for</h2>
                <p className="mt-4 text-sm leading-7 text-muted">{book.audience}</p>
              </section>
              <section id="preview" className="rounded-lg border border-line bg-white/80 p-7">
                <h2 className="display text-3xl font-semibold text-deep">Preview sample</h2>
                <p className="mt-4 text-sm leading-7 text-muted">
                  Read a short sample before ordering. The full PDF is delivered only after payment approval.
                </p>
                <Link
                  className="mt-5 inline-flex rounded-md border border-gold px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-deep transition hover:bg-gold"
                  data-conversion="preview_click"
                  data-conversion-label={book.title}
                  href={previewHref}
                >
                  Open preview
                </Link>
              </section>
            </div>

            <section className="mt-6 rounded-lg border border-line bg-white/80 p-7">
              <h2 className="display text-3xl font-semibold text-deep">What readers will learn</h2>
              <ul className="mt-4 grid list-disc gap-3 pl-5 text-sm leading-7 text-charcoal">
                {book.learn.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mt-6 rounded-lg border border-line bg-white/80 p-7">
              <h2 className="display text-3xl font-semibold text-deep">Table of contents</h2>
              <ol className="mt-4 grid list-decimal gap-3 pl-5 text-sm leading-7 text-charcoal">
                {book.contents.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </section>

            {book.bonuses?.length ? (
              <section className="mt-6 rounded-lg border border-line bg-white/80 p-7">
                <h2 className="display text-3xl font-semibold text-deep">Bonuses</h2>
                <ul className="mt-4 grid list-disc gap-3 pl-5 text-sm leading-7 text-charcoal">
                  {book.bonuses.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="mt-6 rounded-lg border border-line bg-white/80 p-7">
              <h2 className="display text-3xl font-semibold text-deep">Related course or waitlist</h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                {book.waitlistTitle
                  ? `Join the ${book.waitlistTitle} waitlist connected to this book.`
                  : "Join the course waitlist for the next practical program."}
              </p>
              <div className="mt-6">
                <CourseWaitlistForm defaultCourse={book.waitlistTitle} />
              </div>
            </section>

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
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Final CTA</p>
              <h2 className="display mt-3 text-3xl font-semibold">Buy the PDF or request a manual order.</h2>
              <p className="mt-4 text-sm leading-7 text-vellum/72">
                Every order is manually verified in V1. Paid PDFs are not exposed publicly and are delivered only after approval.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  className="rounded-md bg-gold px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-deep"
                  data-conversion="buy_pdf_click"
                  data-conversion-label={book.title}
                  href={checkoutHref}
                >
                  Buy PDF
                </Link>
                <Link
                  className="rounded-md border border-gold px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-gold"
                  data-conversion="print_copy_request"
                  data-conversion-label={book.title}
                  href={`/contact?inquiry=print-copy&product=${book.slug}`}
                >
                  Request print copy
                </Link>
                <Link
                  className="rounded-md border border-gold px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-gold"
                  data-conversion="send_inquiry"
                  data-conversion-label={`${book.title} institutional license`}
                  href={`/contact?inquiry=institutional-license&product=${book.slug}`}
                >
                  Institutional license
                </Link>
              </div>
            </section>
          </article>
          <PaymentPanel title={book.title} productType="book" slug={book.slug} price={displayPrice} />
        </div>
      </section>

      <section className="bg-white/55 px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">Related path</p>
              <h2 className="display mt-3 text-4xl font-semibold text-deep">Continue through the Canon</h2>
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
