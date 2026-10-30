import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { innerEntries } from "@/content/inner-circle";
import { diwanEntries } from "@/content/diwan";
import { getDiwanEntry, getInnerEntry, isInnerCollection } from "@/lib/content-registry";

type Params = { params: Promise<{ collection: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...innerEntries.map((entry) => ({ collection: entry.collectionSlug, slug: entry.slug })),
    ...diwanEntries.map((entry) => ({ collection: "diwan", slug: entry.slug })),
  ];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { collection, slug } = await params;
  if (!isInnerCollection(collection)) return {};
  if (collection === "diwan") {
    const work = getDiwanEntry(slug);
    if (!work) return {};
    return {
      title: work.title + " | Diwan Archive",
      description: "Archive catalogue record for " + work.title + ". The full original remains in protected storage.",
      alternates: { canonical: "/inner-circle/diwan/" + slug },
    };
  }
  const entry = getInnerEntry(collection, slug);
  if (!entry) return {};
  return {
    title: entry.seo?.title ?? entry.title,
    description: entry.seo?.description ?? entry.summary,
    alternates: { canonical: "/inner-circle/" + collection + "/" + slug },
  };
}

export default async function InnerEntryPage({ params }: Params) {
  const { collection, slug } = await params;
  if (!isInnerCollection(collection)) notFound();

  if (collection === "diwan") {
    const work = getDiwanEntry(slug);
    if (!work) notFound();
    return (
      <div>
        <section className="sa-simple-hero">
          <div className="sa-container sa-simple-hero__grid">
            <div>
              <p className="sa-kicker">The Inner Circle · Diwan Archive · {work.archiveId}</p>
              <h1 className="sa-display sa-simple-hero__title">{work.title}</h1>
              <p className="sa-simple-hero__copy">{work.classification}</p>
              <Link className="sa-button sa-button--gold" href="/inner-circle/diwan">Return to the Diwan catalogue</Link>
            </div>
            <aside className="sa-simple-hero__note">
              <span>ARCHIVE STATUS</span><p>{work.status}</p>
              <p>Reference: {work.archiveId}</p>
              <p>Original manuscripts remain in the protected archive.</p>
            </aside>
          </div>
        </section>
        <section className="sa-wing-section sa-wing-section--soft">
          <div className="sa-container">
            <div className="sa-wing-section__heading">
              <p className="sa-kicker sa-kicker--dark">Catalogue record</p>
              <h2 className="sa-display">Preserved in the institutional Diwan registry.</h2>
              <p>This public record identifies an indexed work without exposing private master files or claiming that a readable edition has been released.</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const entry = getInnerEntry(collection, slug);
  if (!entry) notFound();
  return (
    <div className="sa-dossier">
      <section className="sa-simple-hero">
        <div className="sa-container sa-simple-hero__grid">
          <div>
            <p className="sa-kicker">The Inner Circle · {collection.replace("-", " ")}</p>
            <h1 className="sa-display sa-simple-hero__title">{entry.title}</h1>
            {entry.subtitle ? <p className="sa-simple-hero__copy">{entry.subtitle}</p> : null}
            <p className="sa-simple-hero__copy">{entry.summary}</p>
            <Link className="sa-button sa-button--gold" href={"/inner-circle/" + collection}>Back to collection</Link>
          </div>
          <aside className="sa-simple-hero__note">
            {entry.coverImage ? <img src={entry.coverImage} alt={entry.title + " cover"} style={{ width: "100%", maxWidth: 260, height: "auto", marginBottom: 18 }} /> : null}
            <span>{entry.access.toUpperCase()} RECORD</span>
            {entry.author ? <p>By {entry.author}</p> : null}
            {entry.language ? <p>{entry.language}</p> : null}
          </aside>
        </div>
      </section>
      <section className="sa-wing-section sa-wing-section--soft">
        <div className="sa-container">
          <div className="sa-wing-section__heading">
            <p className="sa-kicker sa-kicker--dark">Editorial dossier</p>
            <h2 className="sa-display">About this work.</h2>
            <p>{entry.summary}</p>
          </div>
          {entry.contents?.length ? <><h3 className="sa-display">Recorded structure</h3><ol>{entry.contents.map((item) => <li key={item}>{item}</li>)}</ol></> : null}
          <p>{entry.editorialNote ?? "This entry is a descriptive catalogue record. No private manuscript is distributed from this page."}</p>
        </div>
      </section>
    </div>
  );
}
