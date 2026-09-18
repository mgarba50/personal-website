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
  if (!record) return { title: "Diwan record not found" };
  return {
    title: `${record.title} | Al-Maqam · Musa Allama`,
    description: `${record.canonId}. ${record.publicationState}. ${record.packageState}.`,
  };
}

export default async function DiwanCanonRecordPage({
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
          ← Al-Maqam / Diwan Canon
        </Link>

        <section className="mt-8 overflow-hidden rounded-xl border border-line bg-white/80">
          <div className="bg-deep p-8 text-vellum md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              {record.canonId} · {record.collection}
            </p>
            <h1 className="display mt-4 text-5xl font-semibold leading-tight md:text-6xl">{record.title}</h1>
            {record.alternateTitle ? <p className="mt-4 text-lg text-vellum/70">{record.alternateTitle}</p> : null}
          </div>

          <div className="grid gap-6 p-8 md:grid-cols-3 md:p-12">
            <div className="rounded-lg border border-line bg-vellum/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">Package authority</p>
              <p className="mt-3 text-sm leading-7 text-muted">{record.packageState}</p>
            </div>
            <div className="rounded-lg border border-line bg-vellum/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">Cover authority</p>
              <p className="mt-3 text-sm leading-7 text-muted">{record.coverState}</p>
            </div>
            <div className="rounded-lg border border-line bg-vellum/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">Publication state</p>
              <p className="mt-3 text-sm leading-7 text-muted">{record.publicationState}</p>
            </div>
          </div>

          <div className="border-t border-line p-8 md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">Public record policy</p>
            <h2 className="display mt-3 text-3xl font-semibold text-deep">The record is public; the private master is not.</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">
              This page establishes the work's canonical identity and verified production status. It does not expose the complete private manuscript, imply an approved sale price, or open unrestricted delivery. Public previews and commercial editions are activated only when their release authority is separately approved.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {record.previewHref ? (
                <Link className="rounded-md bg-deep px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-vellum" href={record.previewHref}>
                  Read approved preview
                </Link>
              ) : null}
              <Link className="rounded-md border border-line px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-deep" href="/contact?inquiry=diwan-publication">
                Publication inquiry
              </Link>
              <Link className="rounded-md border border-line px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-deep" href="/books">
                General Books Canon
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
