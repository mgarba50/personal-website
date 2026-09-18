import Link from "next/link";
import { notFound } from "next/navigation";
import { diwanArchive, diwanArchiveBySlug } from "@/lib/diwan-canon";

export const dynamicParams = false;

export function generateStaticParams() {
  return diwanArchive.map((record) => ({ slug: record.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const record = diwanArchiveBySlug.get(slug);
  if (!record) return { title: "Archive record not found" };
  return {
    title: `${record.title} | Al-Maqam Archive · Musa Allama`,
    description: `${record.archiveId}. ${record.evidenceState}. ${record.disposition}.`,
  };
}

export default async function DiwanArchiveRecordPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const record = diwanArchiveBySlug.get(slug);
  if (!record) notFound();

  return (
    <main className="px-5 py-16">
      <div className="mx-auto max-w-4xl">
        <Link className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy" href="/al-maqam">
          ← Al-Maqam / Archive & Reconciliation
        </Link>

        <section className="mt-8 overflow-hidden rounded-xl border border-line bg-white/80">
          <div className="bg-deep p-8 text-vellum md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              {record.archiveId} · Protected archive record
            </p>
            <h1 className="display mt-4 text-5xl font-semibold leading-tight md:text-6xl">{record.title}</h1>
          </div>

          <div className="grid gap-6 p-8 md:grid-cols-2 md:p-12">
            <div className="rounded-lg border border-line bg-vellum/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">Evidence state</p>
              <p className="mt-3 text-sm leading-7 text-muted">{record.evidenceState}</p>
            </div>
            <div className="rounded-lg border border-line bg-vellum/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">Current disposition</p>
              <p className="mt-3 text-sm leading-7 text-muted">{record.disposition}</p>
            </div>
          </div>

          <div className="border-t border-line p-8 md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">Archive policy</p>
            <h2 className="display mt-3 text-3xl font-semibold text-deep">Evidence is preserved without manufacturing a publication claim.</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">
              This record exists so legacy covers, index entries, aliases, edition families, and unresolved manuscript identities are not lost or silently attached to the wrong Canon work. An archive record is not counted as a separate confirmed book unless independent manuscript and package evidence later justify promotion into the Main or Extended Canon.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link className="rounded-md bg-deep px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-vellum" href="/al-maqam">
                Return to Al-Maqam
              </Link>
              <Link className="rounded-md border border-line px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-deep" href="/contact?inquiry=diwan-archive">
                Archive inquiry
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
