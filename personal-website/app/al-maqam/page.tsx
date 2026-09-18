import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  diwanArchive,
  extendedDiwanCanon,
  mainDiwanCanon,
  releaseReadyDiwans,
} from "@/lib/diwan-canon";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Al-Maqam — The Diwan Canon",
  description:
    "The dedicated Musa Allama Diwan collection: fifty Main Canon works, two verified Extended Canon works, release-ready private masters, and protected archive evidence.",
  path: "/al-maqam",
});

function DiwanCard({
  record,
}: {
  record: (typeof mainDiwanCanon)[number] | (typeof extendedDiwanCanon)[number];
}) {
  return (
    <article className="rounded-lg border border-line bg-white/80 p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">
        {record.canonId} · {record.collection}
      </p>
      <h3 className="display mt-3 text-3xl font-semibold text-deep">{record.title}</h3>
      {record.alternateTitle ? (
        <p className="mt-2 text-sm text-muted">{record.alternateTitle}</p>
      ) : null}
      <div className="mt-5 space-y-2 text-sm leading-6 text-muted">
        <p><span className="font-semibold text-deep">Package:</span> {record.packageState}</p>
        <p><span className="font-semibold text-deep">Cover:</span> {record.coverState}</p>
        <p><span className="font-semibold text-deep">Publication:</span> {record.publicationState}</p>
      </div>
      <Link
        className="mt-6 inline-flex rounded-md bg-deep px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-vellum transition hover:bg-navy"
        href={`/al-maqam/${record.slug}`}
      >
        Open Canon record
      </Link>
    </article>
  );
}

export default function AlMaqamPage() {
  return (
    <>
      <PageHero
        eyebrow="Al-Maqam · المقام"
        title="The sovereign Diwan Canon."
        copy="A dedicated publishing division for the Arabic Diwan corpus: canonical identities, verified production packages, controlled cover authority, extended works, and protected archive evidence."
        primaryCta={{ label: "Browse the 50-title Canon", href: "#main-canon", action: "view_diwan_canon" }}
        secondaryCta={{ label: "General Books Canon", href: "/books", action: "view_book_catalog" }}
      />

      <section className="border-y border-line bg-deep px-5 py-12 text-vellum">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-gold/25 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Main Canon</p>
            <p className="display mt-2 text-5xl font-semibold">{mainDiwanCanon.length}</p>
            <p className="mt-3 text-sm leading-6 text-vellum/70">Contiguous DIW-CAT-001 through DIW-CAT-050 records with publication-package evidence.</p>
          </div>
          <div className="rounded-lg border border-gold/25 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Extended Canon</p>
            <p className="display mt-2 text-5xl font-semibold">{extendedDiwanCanon.length}</p>
            <p className="mt-3 text-sm leading-6 text-vellum/70">Independent works verified as distinct from similarly named Main Canon titles.</p>
          </div>
          <div className="rounded-lg border border-gold/25 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Release-ready private masters</p>
            <p className="display mt-2 text-5xl font-semibold">{releaseReadyDiwans.length}</p>
            <p className="mt-3 text-sm leading-6 text-vellum/70">Production-ready records whose remaining step is controlled public scheduling, not manuscript recovery.</p>
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-7xl text-xs leading-6 text-vellum/55">
          Catalogue visibility is not a claim that every title is commercially released. Full private masters remain outside public Git assets unless a public edition is explicitly approved.
        </p>
      </section>

      <section id="main-canon" className="px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Main Canon"
            title="Fifty controlled Diwan identities"
            copy="Every catalogue title has a controlled identity and publication-package evidence. Cover approval and public-release timing remain separate authority stages."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {mainDiwanCanon.map((record) => <DiwanCard key={record.canonId} record={record} />)}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white/60 px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Extended Canon"
            title="Verified independent works beyond the original fifty"
            copy="These works were separated only after content-level comparison confirmed that they are not aliases or cosmetic editions of Main Canon titles."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {extendedDiwanCanon.map((record) => <DiwanCard key={record.canonId} record={record} />)}
          </div>
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Archive & Reconciliation"
            title="Preserved works, aliases, witnesses, and unresolved identities"
            copy="Nothing is discarded merely because its final Canon position is unresolved. Evidence remains visible here without inflating the book count or attaching a cover to the wrong manuscript."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {diwanArchive.map((record) => (
              <article className="rounded-lg border border-line bg-white/80 p-5" key={record.title}>
                <h3 className="display text-2xl font-semibold text-deep">{record.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted"><span className="font-semibold text-deep">Evidence:</span> {record.evidenceState}</p>
                <p className="mt-2 text-sm leading-6 text-muted"><span className="font-semibold text-deep">Disposition:</span> {record.disposition}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
