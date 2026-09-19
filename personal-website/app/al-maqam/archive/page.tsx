import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { diwanArchive } from "@/lib/diwan-canon";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Al-Maqam Archive & Reconciliation",
  description:
    "Protected Musa Allama Diwan archive records for aliases, legacy witnesses, edition families, cover evidence, and unresolved manuscript identities.",
  path: "/al-maqam/archive",
});

export default function AlMaqamArchivePage() {
  return (
    <>
      <PageHero
        eyebrow="Al-Maqam · Archive & Reconciliation"
        title="Preserved evidence without inflated publication claims."
        copy="A controlled register of aliases, legacy covers, edition families, index-only titles, composite dossier components, and unresolved Diwan identities. Archive records remain visible and traceable without being counted as independent Canon works until the evidence justifies promotion."
        primaryCta={{ label: "Return to Al-Maqam", href: "/al-maqam", action: "view_diwan_canon" }}
        secondaryCta={{ label: "General Books Canon", href: "/books", action: "view_book_catalog" }}
      />

      <section className="px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy">Protected Archive</p>
              <h2 className="display mt-3 text-4xl font-semibold text-deep md:text-5xl">
                {diwanArchive.length} reconciliation records
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-muted">
              These records preserve evidence and provenance. They are not automatically treated as separate published books, and full private manuscript masters remain outside public Git assets unless a public edition is explicitly approved.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {diwanArchive.map((record) => (
              <article className="rounded-xl border border-line bg-white/80 p-6" key={record.archiveId}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">
                  {record.archiveId} · Archive evidence
                </p>
                <h3 className="display mt-3 text-3xl font-semibold text-deep">{record.title}</h3>
                <div className="mt-5 space-y-3 text-sm leading-6 text-muted">
                  <p>
                    <span className="font-semibold text-deep">Evidence:</span> {record.evidenceState}
                  </p>
                  <p>
                    <span className="font-semibold text-deep">Disposition:</span> {record.disposition}
                  </p>
                </div>
                <Link
                  className="mt-6 inline-flex rounded-md bg-deep px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-vellum transition hover:bg-navy"
                  href={`/al-maqam/archive/${record.slug}`}
                >
                  Open archive record
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
