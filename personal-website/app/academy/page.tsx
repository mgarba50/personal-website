import type { Metadata } from "next";
import Link from "next/link";
import {
  academyBundles,
  academyProducts,
  academyTopics,
} from "@/content/academy";

export const metadata: Metadata = {
  title: "The Academy",
  description:
    "Books, practical manuals, resources, courses, and certification pathways from MusaAllama.com, organized by topic.",
  alternates: { canonical: "/academy" },
};

export default function AcademyPage() {
  const flagship = academyProducts
    .filter((product) => product.isFlagship)
    .sort((a, b) => (a.salesOrder ?? 999) - (b.salesOrder ?? 999));

  return (
    <div>
      <section className="sa-wing-shell-hero sa-wing-shell-hero--academy">
        <div className="sa-container sa-wing-shell-hero__grid">
          <div>
            <p className="sa-kicker">Wing 02 · Education / B2C</p>
            <h1 className="sa-display sa-wing-shell-hero__title">The Academy</h1>
            <p className="sa-wing-shell-hero__copy">
              Practical books, resources, and structured learning pathways,
              organized by subject rather than scattered across separate catalogues.
            </p>
          </div>

          <aside className="sa-architecture-index">
            <p className="sa-architecture-index__label">Learning Architecture</p>
            <ol>
              <li><span>01</span> Choose a topic</li>
              <li><span>02</span> Use the free resource</li>
              <li><span>03</span> Enter the book or manual</li>
              <li><span>04</span> Advance to deeper training</li>
              <li><span>05</span> Build practical capability</li>
            </ol>
          </aside>
        </div>
      </section>

      {flagship.length ? (
        <section className="sa-wing-section sa-flagship-section">
          <div className="sa-container">
            <div className="sa-wing-section__heading">
              <p className="sa-kicker sa-kicker--dark">Flagship Commercial Library</p>
              <h2 className="sa-display">Start with the working books.</h2>
              <p>
                These flagship titles are currently open for manual-order purchase while the wider catalogue remains clearly marked by release status.
              </p>
            </div>

            <div className="sa-book-grid">
              {flagship.map((book) => (
                <article className="sa-book-card" key={book.slug}>
                  <Link href={`/academy/${book.topicSlug}/${book.slug}`}>
                    <div className="sa-book-card__cover">
                      {book.coverImage ? (
                        <img src={book.coverImage} alt={`${book.title} cover`} />
                      ) : null}
                    </div>
                  </Link>
                  <div className="sa-book-card__body">
                    <p>{book.categories?.[0] ?? book.kind}</p>
                    <h3 className="sa-display">{book.title}</h3>
                    <span>{book.summary}</span>
                    <div className="sa-card-price">
                      <strong>{book.launchPrice}</strong>
                      <small>{book.standardPrice}</small>
                    </div>
                    <div className="sa-card-actions">
                      <Link
                        className="sa-button sa-button--gold"
                        href={`/checkout?type=book&slug=${book.slug}`}
                      >
                        Buy PDF
                      </Link>
                      <Link
                        className="sa-button sa-button--ghost-dark"
                        href={`/academy/${book.topicSlug}/${book.slug}`}
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="sa-wing-section">
        <div className="sa-container">
          <div className="sa-wing-section__heading">
            <p className="sa-kicker sa-kicker--dark">Topic Directory</p>
            <h2 className="sa-display">Choose the field, then the depth.</h2>
          </div>

          <div className="sa-topic-directory">
            {academyTopics.map((topic, index) => {
              const count = academyProducts.filter(
                (product) => product.topicSlug === topic.slug,
              ).length;

              return (
                <Link
                  href={`/academy/${topic.slug}`}
                  className="sa-topic-directory__item"
                  key={topic.slug}
                >
                  <span className="sa-topic-directory__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{topic.title}</h3>
                    <p>{topic.summary}</p>
                  </div>
                  <span className="sa-topic-directory__count">
                    {count ? `${count} title${count > 1 ? "s" : ""}` : "Building"}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sa-wing-section sa-wing-section--soft">
        <div className="sa-container">
          <div className="sa-wing-section__heading">
            <p className="sa-kicker sa-kicker--dark">Current Catalogue</p>
            <h2 className="sa-display">Every title in the Academy registry.</h2>
            <p>
              Available books, publication-ready masters, and candidate editions
              remain clearly distinguished so the catalogue never overstates release status.
            </p>
          </div>

          <div className="sa-book-grid">
            {academyProducts.map((book) => (
              <Link
                href={`/academy/${book.topicSlug}/${book.slug}`}
                className="sa-book-card"
                key={book.slug}
              >
                <div className="sa-book-card__cover">
                  {book.coverImage ? (
                    <img src={book.coverImage} alt={`${book.title} cover`} loading="lazy" />
                  ) : (
                    <div className="sa-typographic-cover">
                      <span>MUSA ALLAMA</span>
                      <strong>{book.title}</strong>
                      <small>{book.subtitle}</small>
                    </div>
                  )}
                  <span className={`sa-release-badge sa-release-badge--${book.releaseStatus}`}>
                    {book.releaseStatus === "available"
                      ? "Available"
                      : book.releaseStatus === "publication-ready"
                        ? "Publication ready"
                        : "Candidate"}
                  </span>
                </div>
                <div className="sa-book-card__body">
                  <p>{book.categories?.[0] ?? book.kind}</p>
                  <h3 className="sa-display">{book.title}</h3>
                  <span>{book.subtitle}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sa-wing-section sa-wing-section--soft">
        <div className="sa-container">
          <div className="sa-wing-section__heading">
            <p className="sa-kicker sa-kicker--dark">Current Bundles</p>
            <h2 className="sa-display">Three bundled entry points for the current commercial library.</h2>
          </div>

          <div className="sa-bundle-grid">
            {academyBundles.map((bundle) => (
              <article className="sa-bundle-card" key={bundle.slug}>
                <span>Bundle</span>
                <h3 className="sa-display">{bundle.title}</h3>
                <ul>
                  {bundle.includes.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <strong>{bundle.launchPrice}</strong>
                <Link
                  className="sa-button sa-button--gold"
                  href={`/checkout?type=bundle&slug=${bundle.slug}`}
                  data-conversion="bundle_inquiry"
                  data-conversion-label={bundle.title}
                >
                  Manual Order
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
