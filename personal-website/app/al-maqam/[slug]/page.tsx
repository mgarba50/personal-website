import Link from "next/link";
import { notFound } from "next/navigation";
import { diwanBySlug, diwanCanon } from "@/lib/diwan-canon";

export const dynamicParams = false;

export function generateStaticParams() {
  return diwanCanon.map((record) => ({ slug: record.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const record = diwanBySlug.get(slug);
  if (!record) return { title: "Diwan not found" };
  return {
    title: `${record.title} | Al-Maqam · Musa Allama`,
    description: `Explore ${record.title} in the Al-Maqam Arabic Diwan collection by Musa Allama.`,
  };
}

export default async function DiwanPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const record = diwanBySlug.get(slug);
  if (!record) notFound();

  return (
    <main className="px-5 py-16">
      <div className="mx-auto max-w-5xl">
        <Link className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy" href="/al-maqam">
          ← Return to Al-Maqam
        </Link>

        <section className="mt-8 overflow-hidden rounded-xl border border-line bg-white/80">
          <div className="bg-deep p-8 text-vellum md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              {record.collection}
            </p>
            <h1 className="display mt-4 text-5xl font-semibold leading-tight md:text-6xl">{record.title}</h1>
            {record.alternateTitle ? <p className="mt-4 text-lg text-vellum/70">{record.alternateTitle}</p> : null}
          </div>

          <div className="p-8 md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">Al-Maqam</p>
            <h2 className="display mt-3 text-3xl font-semibold text-deep">A work from the Arabic Diwan collection.</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">
              Discover this title as part of Musa Allama's collection of Arabic poetry, reflection, language, and literary expression. Availability varies by title; use the options below to read a preview when available or ask about the work.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {record.previewHref ? (
                <Link className="rounded-md bg-deep px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-vellum" href={record.previewHref}>
                  Read preview
                </Link>
              ) : null}
              <Link className="rounded-md border border-line px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-deep" href={`/contact?inquiry=diwan-publication&product=${record.slug}`}>
                Ask about this work
              </Link>
              <Link className="rounded-md border border-line px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-deep" href="/books">
                Browse all books
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
