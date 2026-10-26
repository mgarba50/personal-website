import { pageMetadata } from "@/lib/seo";
import { canPurchaseBook } from "@/lib/checkout";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { academyProducts } from "@/content/academy";
import { getAcademyProduct, getAcademyTopic } from "@/lib/content-registry";

type Params = { params: Promise<{ topic: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return academyProducts.map((product) => ({ topic: product.topicSlug, slug: product.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { topic, slug } = await params;
  const product = getAcademyProduct(topic, slug);
  if (!product) return {};
  return pageMetadata({ title: product.seo?.title ?? product.title, description: product.seo?.description ?? product.summary, path: "/academy/" + topic + "/" + slug, image: product.coverImage });
}

export default async function AcademyProductPage({ params }: Params) {
  const { topic, slug } = await params;
  const product = getAcademyProduct(topic, slug);
  const category = getAcademyTopic(topic);
  if (!product || !category) notFound();

  const canBuy = canPurchaseBook(product);
  const related = academyProducts.filter((item) =>
    product.relatedProductSlugs?.includes(item.slug) && item.slug !== product.slug
  );

  return (
    <div className="sa-dossier">
      <section className="sa-simple-hero">
        <div className="sa-container sa-simple-hero__grid">
          <div>
            <p className="sa-kicker">The Academy · {category.title}</p>
            <h1 className="sa-display sa-simple-hero__title">{product.title}</h1>
            {product.subtitle ? <p className="sa-simple-hero__copy">{product.subtitle}</p> : null}
            <p className="sa-simple-hero__copy">{product.summary}</p>
            <div className="sa-wing-hero__actions">
              {canBuy ? (
                <Link className="sa-button sa-button--gold" href={"/checkout?type=book&slug=" + encodeURIComponent(product.slug)}>
                  {product.primaryCta ?? "Buy PDF"} · {product.launchPrice}
                </Link>
              ) : (
                <Link className="sa-button sa-button--gold" href={"/contact?inquiry=book-publication&product=" + encodeURIComponent(product.slug)}>
                  Enquire about release
                </Link>
              )}
              <Link className="sa-button sa-button--ghost" href={"/academy/" + topic}>Explore this topic</Link>
            </div>
          </div>
          <aside className="sa-simple-hero__note">
            {product.coverImage ? <img src={product.coverImage} alt={product.title + " cover"} style={{ width: "100%", maxWidth: 270, height: "auto", marginBottom: 18 }} /> : null}
            <span>PUBLICATION STATUS</span>
            <p>{product.releaseLabel}</p>
            {product.author ? <p>By {product.author}</p> : null}
            {product.language ? <p>Language: {product.language}</p> : null}
          </aside>
        </div>
      </section>
      <section className="sa-wing-section sa-wing-section--soft">
        <div className="sa-container">
          <div className="sa-wing-section__heading">
            <p className="sa-kicker sa-kicker--dark">Reader dossier</p>
            <h2 className="sa-display">What this edition offers.</h2>
            <p>{product.idealReader ?? product.summary}</p>
          </div>
          <div className="sa-editorial-grid">
            <article className="sa-structural-card">
              <span className="sa-structural-card__index">PUBLICATION</span>
              <h3>Edition information</h3>
              <p>{product.releaseLabel}</p>
              <p>{product.publisher ?? "Musa Allama"}</p>
              {product.publicationYear ? <p>{product.publicationYear}</p> : null}
              {product.formats?.length ? <p>{product.formats.join(" · ")}</p> : null}
            </article>
            <article className="sa-structural-card">
              <span className="sa-structural-card__index">READERS</span>
              <h3>Who it is for</h3>
              {product.audience?.length ? (
                <ul>{product.audience.map((item) => <li key={item}>{item}</li>)}</ul>
              ) : <p>{product.idealReader ?? product.summary}</p>}
            </article>
            <article className="sa-structural-card">
              <span className="sa-structural-card__index">AVAILABILITY</span>
              <h3>{canBuy ? "Available to order" : "Not yet on sale"}</h3>
              <p>{product.commercialNote ?? (canBuy ? "Manual ordering is available." : "Release details will be announced when approved.")}</p>
              {canBuy ? <p>Launch price: {product.launchPrice}</p> : null}
              {canBuy && product.standardPrice ? <p>Standard price: {product.standardPrice}</p> : null}
            </article>
          </div>
        </div>
      </section>
      {product.learn?.length || product.readerOutcomes?.length ? (
        <section className="sa-wing-section">
          <div className="sa-container">
            <div className="sa-wing-section__heading"><p className="sa-kicker sa-kicker--dark">Learning outcomes</p><h2 className="sa-display">What you will take away.</h2></div>
            <ol>{(product.learn ?? product.readerOutcomes ?? []).map((item) => <li key={item}>{item}</li>)}</ol>
          </div>
        </section>
      ) : null}
      {product.contents?.length ? (
        <section className="sa-wing-section sa-wing-section--soft">
          <div className="sa-container">
            <div className="sa-wing-section__heading"><p className="sa-kicker sa-kicker--dark">Contents</p><h2 className="sa-display">Inside the book.</h2></div>
            <ol>{product.contents.map((item) => <li key={item}>{item}</li>)}</ol>
          </div>
        </section>
      ) : null}
      {product.bonuses?.length || product.faq?.length ? (
        <section className="sa-wing-section">
          <div className="sa-container">
            {product.bonuses?.length ? <><h2 className="sa-display">Included extras</h2><ul>{product.bonuses.map((item) => <li key={item}>{item}</li>)}</ul></> : null}
            {product.faq?.length ? <><h2 className="sa-display">Frequently asked questions</h2>{product.faq.map((item) => <article key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></article>)}</> : null}
          </div>
        </section>
      ) : null}
      {related.length ? (
        <section className="sa-wing-section sa-wing-section--soft">
          <div className="sa-container">
            <div className="sa-wing-section__heading"><p className="sa-kicker sa-kicker--dark">Continue reading</p><h2 className="sa-display">Related titles.</h2></div>
            <div className="sa-editorial-grid">
              {related.map((item) => <Link className="sa-structural-card" href={"/academy/" + item.topicSlug + "/" + item.slug} key={item.slug}><h3>{item.title}</h3><p>{item.summary}</p><strong>{item.releaseLabel}</strong></Link>)}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
