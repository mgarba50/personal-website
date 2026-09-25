import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { extendedDiwanCanon, mainDiwanCanon } from "@/lib/diwan-canon";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Al-Maqam — Arabic Diwan Collection",
  description:
    "The dedicated Musa Allama collection for Arabic Diwan works, poetry, reflection, language, and literary expression.",
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
        {record.collection}
      </p>
      <h3 className="display mt-3 text-3xl font-semibold text-deep">{record.title}</h3>
      {record.alternateTitle ? (
        <p className="mt-2 text-sm text-muted">{record.alternateTitle}</p>
      ) : null}
      <p className="mt-5 text-sm leading-7 text-muted">
        Explore this work in the Al-Maqam collection and follow its available reading or release options.
      </p>
      <Link
        className="mt-6 inline-flex rounded-md bg-deep px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-vellum transition hover:bg-navy"
        href={`/al-maqam/${record.slug}`}
      >
        Explore work
      </Link>
    </article>
  );
}

export default function AlMaqamPage() {
  return (
    <>
      <PageHero
        eyebrow="Al-Maqam · المقام"
        title="Arabic poetry, reflection, and literary expression."
        copy="Al-Maqam brings Musa Allama's Arabic Diwan works together in a dedicated literary collection for readers of poetry, language, contemplation, and artistic expression."
        primaryCta={{ label: "Browse the collection", href: "#main-collection", action: "view_diwan_canon" }}
        secondaryCta={{ label: "Browse all books", href: "/books", action: "view_book_catalog" }}
      />

      <section className="border-y border-line bg-deep px-5 py-12 text-vellum">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-gold/25 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Main Collection</p>
            <p className="display mt-2 text-5xl font-semibold">{mainDiwanCanon.length}</p>
            <p className="mt-3 text-sm leading-6 text-vellum/70">Core Diwan works presented together in the principal Al-Maqam collection.</p>
          </div>
          <div className="rounded-lg border border-gold/25 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Additional Works</p>
            <p className="display mt-2 text-5xl font-semibold">{extendedDiwanCanon.length}</p>
            <p className="mt-3 text-sm leading-6 text-vellum/70">Additional independent works that expand the collection beyond its original series.</p>
          </div>
        </div>
      </section>

      <section id="main-collection" className="px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Main Collection"
            title="The heart of Al-Maqam"
            copy="Browse the principal Diwan works and open any title to see its available reading, preview, and inquiry options."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {mainDiwanCanon.map((record) => <DiwanCard key={record.canonId} record={record} />)}
          </div>
        </div>
      </section>

      {extendedDiwanCanon.length ? (
        <section className="border-y border-line bg-white/60 px-5 py-16">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Additional Works"
              title="Beyond the main collection"
              copy="Explore further Diwan works presented as part of the wider Al-Maqam literary collection."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {extendedDiwanCanon.map((record) => <DiwanCard key={record.canonId} record={record} />)}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
