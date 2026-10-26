import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { innerCollections } from "@/content/inner-circle";
import { getInnerCollection, getInnerEntries } from "@/lib/content-registry";
import type { InnerCollectionSlug } from "@/content/types";

type Params = { params: Promise<{ collection: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  // /inner-circle/diwan has its own existing curated archive page.
  return innerCollections.filter((item) => item.slug !== "diwan").map((item) => ({ collection: item.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { collection } = await params;
  const item = getInnerCollection(collection);
  if (!item) return {};
  return {
    title: item.title + " | The Inner Circle",
    description: item.summary,
    alternates: { canonical: "/inner-circle/" + item.slug },
  };
}

export default async function InnerCollectionPage({ params }: Params) {
  const { collection: collectionSlug } = await params;
  const collection = getInnerCollection(collectionSlug);
  if (!collection || collection.slug === "diwan") notFound();
  const entries = getInnerEntries(collection.slug as InnerCollectionSlug);
  return (
    <div>
      <section className="sa-simple-hero">
        <div className="sa-container sa-simple-hero__grid">
          <div>
            <p className="sa-kicker">The Inner Circle · Editorial Collection</p>
            <h1 className="sa-display sa-simple-hero__title">{collection.title}</h1>
            <p className="sa-simple-hero__copy">{collection.summary}</p>
            <Link className="sa-button sa-button--gold" href="/inner-circle">All collections</Link>
          </div>
          <aside className="sa-simple-hero__note"><span>CURATED WORKS</span><p>{entries.length} indexed {entries.length === 1 ? "work" : "works"}</p></aside>
        </div>
      </section>
      <section className="sa-wing-section sa-wing-section--soft">
        <div className="sa-container">
          <div className="sa-wing-section__heading">
            <p className="sa-kicker sa-kicker--dark">Editorial catalogue</p>
            <h2 className="sa-display">Explore the indexed works.</h2>
            <p>Catalogue descriptions are public. Restricted manuscripts and archive originals are not exposed here.</p>
          </div>
          <div className="sa-editorial-grid">
            {entries.map((entry) => (
              <Link className="sa-structural-card" href={"/inner-circle/" + collection.slug + "/" + entry.slug} key={entry.slug}>
                <span className="sa-structural-card__index">{entry.access.toUpperCase()} · {entry.language ?? "Editorial"}</span>
                <h3>{entry.title}</h3>
                <p>{entry.summary}</p>
                <strong>Explore dossier</strong>
              </Link>
            ))}
          </div>
          {!entries.length ? <p>No public dossiers are indexed in this collection yet.</p> : null}
        </div>
      </section>
    </div>
  );
}
