import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { academyTopics } from "@/content/academy";
import { getAcademyProductsByTopic, getAcademyTopic } from "@/lib/content-registry";

type Params = { params: Promise<{ topic: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return academyTopics.map((topic) => ({ topic: topic.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { topic: topicSlug } = await params;
  const topic = getAcademyTopic(topicSlug);
  if (!topic) return {};
  return {
    title: topic.title + " | The Academy",
    description: topic.summary,
    alternates: { canonical: "/academy/" + topic.slug },
  };
}

export default async function AcademyTopicPage({ params }: Params) {
  const { topic: topicSlug } = await params;
  const topic = getAcademyTopic(topicSlug);
  if (!topic) notFound();
  const products = getAcademyProductsByTopic(topic.slug);

  return (
    <main>
      <section className="sa-simple-hero">
        <div className="sa-container sa-simple-hero__grid">
          <div>
            <p className="sa-kicker">The Academy · Topic Library</p>
            <h1 className="sa-display sa-simple-hero__title">{topic.title}</h1>
            <p className="sa-simple-hero__copy">{topic.summary}</p>
            <Link className="sa-button sa-button--gold" href="/academy">All Academy topics</Link>
          </div>
          <aside className="sa-simple-hero__note">
            <span>CURATED CATALOGUE</span>
            <p>{products.length} registered {products.length === 1 ? "title" : "titles"}</p>
          </aside>
        </div>
      </section>
      <section className="sa-wing-section sa-wing-section--soft">
        <div className="sa-container">
          <div className="sa-wing-section__heading">
            <p className="sa-kicker sa-kicker--dark">Explore the collection</p>
            <h2 className="sa-display">Books, manuals and learning pathways.</h2>
            <p>Each title shows its actual publication status. Only approved editions are open for purchase.</p>
          </div>
          {products.length ? (
            <div className="sa-book-grid">
              {products.map((product) => (
                <Link className="sa-book-card" href={"/academy/" + topic.slug + "/" + product.slug} key={product.slug}>
                  <div className="sa-book-card__cover">
                    {product.coverImage ? (
                      <img src={product.coverImage} alt={product.title + " cover"} loading="lazy" />
                    ) : (
                      <div className="sa-typographic-cover">
                        <span>MUSA ALLAMA</span><strong>{product.title}</strong><small>{product.subtitle}</small>
                      </div>
                    )}
                    <span className={"sa-release-badge sa-release-badge--" + product.releaseStatus}>
                      {product.releaseLabel}
                    </span>
                  </div>
                  <div className="sa-book-card__body">
                    <p>{product.categories?.[0] ?? product.kind}</p>
                    <h3 className="sa-display">{product.title}</h3>
                    <span>{product.subtitle ?? product.summary}</span>
                    {product.purchasable && product.launchPrice ? <strong>{product.launchPrice}</strong> : null}
                  </div>
                </Link>
              ))}
            </div>
          ) : <p>No public titles have been registered for this topic yet.</p>}
        </div>
      </section>
    </main>
  );
}
