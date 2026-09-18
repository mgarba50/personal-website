import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { publicationArchive } from "@/lib/publication-archive";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "General Publication Archive",
  description:
    "Protected Musa Allama general-publication identities recovered from legacy cover and archive evidence but not yet promoted into the confirmed Books Canon.",
  path: "/books/archive",
});

export default function GeneralPublicationArchivePage() {
  return (
    <>
      <PageHero
        eyebrow="General Publication Archive"
        title="Recovered identities that must not disappear."
        copy="Legacy general-book evidence is preserved here without pretending that a cover alone proves a complete manuscript, finished edition, or commercial release."
        primaryCta={{ label: "Return to Books Canon", href: "/books", action: "view_book_catalog" }}
        secondaryCta={{ label: "Open Al-Maqam", href: "/al-maqam", action: "view_diwan_canon" }}
      />

      <section className="px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-lg border border-line bg-deep p-7 text-vellum">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Archive rule</p>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-vellum/72">
              These records exist because exact-title legacy publication evidence was recovered in the archive. They are not counted as completed or released books until authoritative manuscript and package evidence is recovered and reconciled.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {publicationArchive.map((record) => (
              <article className="rounded-lg border border-line bg-white/80 p-6" id={record.slug} key={record.archiveId}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">{record.archiveId}</p>
                <h2 className="display mt-3 text-3xl font-semibold text-deep">{record.title}</h2>
                <p className="mt-4 text-sm leading-7 text-muted">
                  <span className="font-semibold text-deep">Evidence:</span> {record.evidenceState}
                </p>
                <p className="mt-2 text-sm leading-7 text-muted">
                  <span className="font-semibold text-deep">Disposition:</span> {record.disposition}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10">
            <Link className="text-sm font-semibold uppercase tracking-[0.14em] text-burgundy" href="/books">
              ← Back to the confirmed and developing Books Canon
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
