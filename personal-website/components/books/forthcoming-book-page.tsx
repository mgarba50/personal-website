import Image from "next/image";
import Link from "next/link";
import { BookCard } from "@/components/cards/book-card";
import { ConversionStrip } from "@/components/commerce/conversion-strip";
import { PageHero } from "@/components/ui/page-hero";
import type { Book } from "@/lib/content";

type Props = {
  book: Book;
  allBooks: Book[];
  author: string;
  edition: string;
  language?: "en" | "ar";
};

export function ForthcomingBookPage({ book, allBooks, author, edition, language = "en" }: Props) {
  const isArabic = language === "ar";
  const related = allBooks.filter((item) => book.related.includes(item.slug));
  const inquiryHref = `/contact?inquiry=book-publication&product=${book.slug}`;
  const previewHref = book.previewHref;

  return (
    <>
      <PageHero
        eyebrow={book.category}
        title={book.title}
        copy={book.subtitle}
        primaryCta={{
          label: book.primaryCta ?? (isArabic ? "طلب إشعار الإصدار" : "Publication inquiry"),
          href: inquiryHref,
          action: "send_inquiry",
        }}
        secondaryCta={
          previewHref
            ? {
                label: book.secondaryCta ?? (isArabic ? "قراءة المقتطف" : "Preview sample"),
                href: previewHref,
                action: "preview_click",
              }
            : { label: "Return to Canon", href: "/books", action: "view_book_catalog" }
        }
      />

      <ConversionStrip
        title={
          isArabic
            ? "العنوان مدرج في الديوان العام بصفة «قريبًا». المقتطف العام فقط منشور، ولا يوجد تحصيل مالي أو تنزيل كامل مفتوح."
            : "Forthcoming Canon title. The approved excerpt is public; payment and full-file delivery remain disabled until release is formally opened."
        }
      />

      <section className="px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <article dir={isArabic ? "rtl" : "ltr"} lang={language}>
            <div className="grid gap-8 rounded-lg border border-line bg-white/80 p-7 md:grid-cols-[280px_1fr]">
              {book.coverImage ? (
                <div className="relative aspect-[3/4] overflow-hidden rounded-md border border-line bg-deep">
                  <Image
                    src={book.coverImage}
                    alt={`${book.title} cover`}
                    fill
                    priority
                    sizes="280px"
                    className="object-cover"
                  />
                </div>
              ) : null}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">{book.category}</p>
                <h1 className="display mt-3 text-4xl font-semibold leading-tight text-deep">{book.title}</h1>
                <p className="mt-3 text-lg leading-8 text-muted">{book.promise ?? book.description}</p>
                <div className="mt-6 grid gap-3 text-sm md:grid-cols-2">
                  <div className="rounded-md border border-line bg-vellum/70 p-4">
                    <p className="font-semibold text-deep">{isArabic ? "حالة النشر" : "Publication status"}</p>
                    <p className="mt-1 text-muted">{book.price}</p>
                  </div>
                  <div className="rounded-md border border-line bg-vellum/70 p-4">
                    <p className="font-semibold text-deep">{isArabic ? "المؤلف" : "Author"}</p>
                    <p className="mt-1 text-muted">{author}</p>
                    <p className="mt-1 text-muted">{edition}</p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-7 text-muted">{book.description}</p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {isArabic ? "الصيغ المخططة" : "Planned formats"}: {book.formats.join(" · ")}
                </p>
              </div>
            </div>

            <section className="mt-6 rounded-lg border border-line bg-white/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">
                {isArabic ? "حماية الإصدار" : "Release protection"}
              </p>
              <h2 className="display mt-3 text-3xl font-semibold text-deep">
                {isArabic ? "الكتاب الكامل غير منشور للعامة." : "The complete edition is not publicly exposed."}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                {isArabic
                  ? "لم يُعتمد سعر بيع لهذا العنوان بعد. لا يوجد زر دفع، ولا رابط تنزيل كامل، ولا ملف مدفوع داخل المسارات العامة."
                  : "No sale price has been approved for this title. There is no checkout button, unrestricted full-book link, or paid manuscript in public assets."}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {previewHref ? (
                  <Link
                    className="rounded-md border border-gold px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-deep"
                    data-conversion="preview_click"
                    data-conversion-label={book.title}
                    href={previewHref}
                  >
                    {book.secondaryCta ?? (isArabic ? "قراءة المقتطف" : "Preview sample")}
                  </Link>
                ) : null}
                <Link
                  className="rounded-md bg-deep px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-vellum"
                  data-conversion="send_inquiry"
                  data-conversion-label={`${book.title} publication inquiry`}
                  href={inquiryHref}
                >
                  {book.primaryCta ?? (isArabic ? "طلب إشعار الإصدار" : "Publication inquiry")}
                </Link>
              </div>
            </section>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <section className="rounded-lg border border-line bg-white/80 p-7">
                <h2 className="display text-3xl font-semibold text-deep">{isArabic ? "لمن هذا الكتاب؟" : "Who this book is for"}</h2>
                <p className="mt-4 text-sm leading-7 text-muted">{book.audience}</p>
              </section>
              <section className="rounded-lg border border-line bg-white/80 p-7">
                <h2 className="display text-3xl font-semibold text-deep">{isArabic ? "المقتطف العام" : "Approved preview"}</h2>
                <p className="mt-4 text-sm leading-7 text-muted">
                  {isArabic
                    ? "المقتطف المنشور مادة مختارة فقط، ولا يفتح الوصول إلى النسخة الكاملة."
                    : "The published excerpt is a selected sample only and does not provide access to the complete edition."}
                </p>
                {previewHref ? (
                  <Link
                    className="mt-5 inline-flex rounded-md border border-gold px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-deep transition hover:bg-gold"
                    href={previewHref}
                  >
                    {book.secondaryCta ?? (isArabic ? "فتح المقتطف" : "Open preview")}
                  </Link>
                ) : null}
              </section>
            </div>

            <section className="mt-6 rounded-lg border border-line bg-white/80 p-7">
              <h2 className="display text-3xl font-semibold text-deep">{isArabic ? "ما الذي سيجده القارئ؟" : "What readers will learn"}</h2>
              <ul className="mt-4 grid list-disc gap-3 px-5 text-sm leading-7 text-charcoal">
                {book.learn.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mt-6 rounded-lg border border-line bg-white/80 p-7">
              <h2 className="display text-3xl font-semibold text-deep">{isArabic ? "المحتويات" : "Table of contents"}</h2>
              <ol className="mt-4 grid list-decimal gap-3 px-5 text-sm leading-7 text-charcoal">
                {book.contents.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </section>

            <section className="mt-6 rounded-lg border border-line bg-white/80 p-7">
              <h2 className="display text-3xl font-semibold text-deep">{isArabic ? "ملاحظة المؤلف" : "Author note"}</h2>
              <p className="mt-4 text-sm leading-7 text-muted">{book.authorNote}</p>
            </section>
          </article>
        </div>
      </section>

      {related.length ? (
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
      ) : null}
    </>
  );
}
