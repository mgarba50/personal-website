import Link from "next/link";
import { academyProducts } from "@/content/academy";
import { siteWings } from "@/lib/site-architecture";

const authoritySignals = [
  { label: "Languages", value: "English · Mandarin · Arabic" },
  { label: "Discipline", value: "Systems Architecture" },
  { label: "Operating Lens", value: "Global Trade & Procurement" },
];

const routingCopy = {
  corporate: "I am looking for corporate solutions, digital infrastructure, and advisory.",
  academy: "I want to acquire practical skills, books, and systems.",
  "inner-circle": "I want access to exclusive insights, memberships, and writings.",
} as const;

export default function HomePage() {
  const flagship = academyProducts
    .filter((product) => product.isFlagship)
    .sort((a, b) => (a.salesOrder ?? 999) - (b.salesOrder ?? 999));

  return (
    <div className="sa-home">
      <section className="sa-home-hero">
        <div className="sa-home-hero__glow" aria-hidden="true" />
        <div className="sa-container sa-home-hero__grid">
          <div className="sa-home-hero__copy">
            <p className="sa-kicker">MusaAllama.com · Official Headquarters</p>
            <h1 className="sa-display sa-home-hero__title">
              Strategic Advisory, Agro-Industrial Intelligence, and Practical Education.
            </h1>
            <p className="sa-home-hero__lead">
              The official headquarters of Musa Allama. Bridging global infrastructure,
              multilingual trade, and institutional knowledge.
            </p>
            <div className="sa-home-hero__actions">
              <Link href="#routing" className="sa-button sa-button--gold">
                Choose Your Path
              </Link>
              <Link
                href="/consultation"
                className="sa-button sa-button--ghost"
                data-conversion="open_consultation"
                data-conversion-label="Homepage hero"
              >
                Book a Consultation
              </Link>
            </div>
          </div>

          <div className="sa-home-hero__seal" aria-label="Musa Allama institutional mark">
            <div className="sa-home-hero__seal-ring">
              <span className="sa-home-hero__seal-mark">MA</span>
              <span className="sa-home-hero__seal-line" />
              <span className="sa-home-hero__seal-caption">
                Strategy · Knowledge · Systems
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="sa-routing" id="routing">
        <div className="sa-container">
          <div className="sa-section-intro">
            <p className="sa-kicker sa-kicker--dark">Routing Matrix</p>
            <h2 className="sa-display sa-section-intro__title">
              Start with what you need.
            </h2>
            <p className="sa-section-intro__copy">
              Three distinct wings keep enterprise engagements, practical learning,
              and private intellectual work intentionally separate.
            </p>
          </div>

          <div className="sa-routing__grid">
            {siteWings.map((wing, index) => (
              <Link
                href={wing.href}
                key={wing.id}
                className={`sa-route-card sa-route-card--${wing.id}`}
                data-conversion="enter_wing"
                data-conversion-label={wing.label}
              >
                <span className="sa-route-card__number">0{index + 1}</span>
                <span className="sa-route-card__audience">{wing.audience}</span>
                <h3 className="sa-display sa-route-card__title">{wing.label}</h3>
                <p className="sa-route-card__copy">{routingCopy[wing.id]}</p>
                <span className="sa-route-card__action">
                  Enter wing <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sa-wing-section sa-home-flagship">
        <div className="sa-container">
          <div className="sa-wing-section__heading">
            <p className="sa-kicker sa-kicker--dark">Start with the Academy</p>
            <h2 className="sa-display">Three books built for practical work.</h2>
            <p>
              Agriculture, agrochemical sales, and China-facing trade communication
              form the first commercial learning set.
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
                  <p>{book.categories?.[0] ?? "Book"}</p>
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

      <section className="sa-authority">
        <div className="sa-container sa-authority__grid">
          <div>
            <p className="sa-kicker sa-kicker--dark">Authority Anchor</p>
            <h2 className="sa-display sa-authority__title">
              Engineering, trade, language, and institutional systems.
            </h2>
            <p className="sa-authority__copy">
              MusaAllama.com is built around a cross-disciplinary operating profile:
              multilingual communication, digital systems, international trade,
              and practical institutional execution.
            </p>
            <Link href="/about" className="sa-text-link">
              Open Executive Dossier →
            </Link>
          </div>

          <div className="sa-authority__signals">
            {authoritySignals.map((signal, index) => (
              <div className="sa-signal" key={signal.label}>
                <span>0{index + 1}</span>
                <div>
                  <small>{signal.label}</small>
                  <p>{signal.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sa-consultation-anchor">
        <div className="sa-container sa-consultation-anchor__inner">
          <div>
            <p className="sa-kicker">Strategic Engagement</p>
            <h2 className="sa-display sa-consultation-anchor__title">
              Begin with a qualified consultation intake.
            </h2>
          </div>
          <Link
            href="/consultation"
            className="sa-button sa-button--gold"
            data-conversion="open_consultation"
            data-conversion-label="Homepage consultation anchor"
          >
            Initiate Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
