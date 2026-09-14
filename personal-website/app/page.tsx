import Image from "next/image";
import Link from "next/link";
import { BookCard } from "@/components/cards/book-card";
import { CourseCard } from "@/components/cards/course-card";
import { ConversionStrip } from "@/components/commerce/conversion-strip";
import { ServiceCard } from "@/components/cards/service-card";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { CtaButton } from "@/components/ui/cta-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { advisoryServices, books, courses, membershipTiers, pillars } from "@/lib/content";
import { bundleOffers, phaseOneLeadMagnets } from "@/lib/revenue";
import { jsonLd } from "@/lib/seo";

const divisions = [
{ title: "The Canon", href: "/books", copy: "Books, manuals, diwans, and strategic publications." },
{ title: "The Madrasa", href: "/courses", copy: "Accredited courses and certifications for practical state and corporate capacity building." },
{ title: "Strategic Advisory", href: "/advisory", copy: "Private consulting for government, agriculture, publishing, and digital infrastructure." },
{ title: "Agro-Industrial Command Center", href: "/agro", copy: "Agriculture, agrochemicals, hydroponics, and advanced procurement intelligence." },
{ title: "Gallifrey Digital & Compliance", href: "/gallifrey", copy: "Websites, corporate documentation, ICT-centre establishment, and regulatory framework facilitation." },
{ title: "Living Library", href: "/library", copy: "Long-form essays, executive field notes, language scholarship, and research briefs." },
{ title: "Membership Circles", href: "/membership", copy: "Restricted access to premium knowledge, reports, and private institutional briefings." },
];

export default function Home() {
const flagshipBooks = books
.filter((book) => book.isFlagship)
.sort((first, second) => (first.salesOrder ?? 99) - (second.salesOrder ?? 99));
const featuredBook = books[0];
const featuredCourse = courses[0];
const featuredService = advisoryServices[0];
const featuredTier = membershipTiers[1];

return (
<>
<script
type="application/ld+json"
dangerouslySetInnerHTML={jsonLd({
"@context": "https://schema.org",
"@type": "Organization",
name: "MusaAllama.com",
url: "https://musaallama.com",
description:
"An institutional platform for books, courses, strategic advisory, agro-industrial intelligence, and multilingual scholarship.",
})}
/>



Executive Desk
Musa Allama

Knowledge. Strategy. Agriculture. Publishing. Technology.


MusaAllama.com is the primary institutional headquarters for authoritative publications, executive certifications, strategic advisory, and agro-industrial intelligence.


Access The Canon

Commission Advisory




Publications


The Academy


Advisory


Membership





MA





Office of the Principal
Maiduguri · Nigeria



Founder & Principal
Musa Allama
Engineer · Scholar · Publisher · Strategist






  <section className="px-5 py-16">
    <div className="mx-auto max-w-7xl">
      <SectionHeading
        eyebrow="The Canon"
        title="Institutional Publications & Diwans"
        copy="Authoritative manuals for agriculture, agrochemical strategy, international trade communication, and profitable enterprise-building."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {flagshipBooks.map((book) => (
          <BookCard book={book} key={book.slug} />
        ))}
      </div>
    </div>
  </section>

  <section className="bg-white/55 px-5 py-16">
    <div className="mx-auto max-w-7xl">
      <SectionHeading
        eyebrow="Institutional Architecture"
        title="Four Operating Pillars"
        copy="The platform is structured to deliver strategic capacity, specialized scholarship, and global agricultural intelligence."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {pillars.map((pillar) => (
          <Link
            href={pillar.href}
            key={pillar.title}
            className="rounded-lg border border-line bg-white/75 p-6 transition hover:-translate-y-1 hover:border-gold"
          >
            <h3 className="display text-2xl font-semibold text-deep">{pillar.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{pillar.copy}</p>
          </Link>
        ))}
      </div>
    </div>
  </section>

  <section className="px-5 py-16">
    <div className="mx-auto max-w-7xl">
      <SectionHeading
        eyebrow="Primary Directives"
        title="Executive Programs & Certifications"
        copy="Access foundational literature, enroll institutional cohorts, or commission private strategic advisory."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-4">
        <BookCard book={featuredBook} />
        <CourseCard course={featuredCourse} />
        <ServiceCard service={featuredService} />
        <article className="flex h-full flex-col rounded-lg border border-line bg-white/80 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">Membership</p>
          <h3 className="display mt-3 text-3xl font-semibold text-deep">{featuredTier.title}</h3>
          <p className="mt-4 text-sm leading-7 text-muted">{featuredTier.description}</p>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
            <span className="text-sm font-semibold text-deep">{featuredTier.price}</span>
            <Link
              className="text-sm font-semibold uppercase tracking-[0.14em] text-burgundy hover:text-deep"
              data-conversion="apply_membership"
              data-conversion-label={featuredTier.title}
              href={`/membership/${featuredTier.slug}`}
            >
              Request Induction
            </Link>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section className="bg-white/60 px-5 py-16">
    <div className="mx-auto max-w-7xl">
      <SectionHeading
        eyebrow="Institutional Procurement"
        title="Strategic Knowledge Collections"
        copy="Procure comprehensive operational libraries designed for state delegates, corporate teams, and elite practitioners. Immediate digital provisioning enabled."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {bundleOffers.map((bundle) => (
          <article className="rounded-lg border border-line bg-white/80 p-6" key={bundle.slug}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">Procurement Bundle</p>
            <h3 className="display mt-3 text-3xl font-semibold text-deep">{bundle.title}</h3>
            <p className="mt-4 text-lg font-semibold text-deep">{bundle.price}</p>
            <ul className="mt-5 grid gap-2 text-sm leading-7 text-muted">
              {bundle.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link
              className="mt-6 inline-flex rounded-md bg-deep px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-vellum transition hover:bg-navy"
              data-conversion="bundle_inquiry"
              data-conversion-label={bundle.title}
              href={`/checkout?type=bundle&slug=${bundle.slug}`}
            >
              Procure Collection
            </Link>
          </article>
        ))}
      </div>
    </div>
  </section>

  <section className="px-5 py-16">
    <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr]">
      <div>
        <SectionHeading
          eyebrow="Open Access Briefings"
          title="Strategic Checklists & Field Guides"
          copy="Download foundational frameworks to immediately audit and elevate your agricultural and trade operations."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {phaseOneLeadMagnets.map((resource) => (
            <article className="rounded-lg border border-line bg-white/75 p-5" key={resource.slug}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">{resource.category}</p>
              <h3 className="display mt-2 text-2xl font-semibold text-deep">{resource.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{resource.description}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                Gateway to {resource.routesTo}
              </p>
            </article>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-line bg-white/80 p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">Secure Access</p>
        <h3 className="display mt-3 text-3xl font-semibold text-deep">Request Institutional Briefings</h3>
        <p className="mt-3 text-sm leading-7 text-muted">
          Submit your credentials to receive direct access to our specialized tactical frameworks and operational checklists.
        </p>
        <div className="mt-6">
          <NewsletterForm />
        </div>
      </div>
    </div>
  </section>

  <ConversionStrip title="Initiate strategic transformation and institutional capacity building." />

  <section className="px-5 py-16">
    <div className="mx-auto max-w-7xl">
      <SectionHeading
        eyebrow="Global Operations"
        title="Comprehensive Digital & Physical Infrastructure"
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {divisions.map((division) => (
          <Link href={division.href} key={division.title} className="rounded-lg border border-line bg-white/70 p-6 transition hover:border-gold">
            <h3 className="display text-3xl font-semibold text-deep">{division.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{division.copy}</p>
          </Link>
        ))}
      </div>
    </div>
  </section>

  <section className="bg-navy px-5 py-16 text-vellum">
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">The Institutional Dispatch</p>
        <h2 className="display mt-3 text-4xl font-semibold leading-tight md:text-5xl">
          Receive the Institutional Dispatch
        </h2>
        <p className="mt-5 text-sm leading-7 text-vellum/72">
          A private executive briefing on knowledge, strategy, agriculture, publishing, technology, and language intelligence.
        </p>
      </div>
      <NewsletterForm />
    </div>
  </section>

  <section className="px-5 py-16">
    <div className="mx-auto max-w-5xl text-center">
      <h2 className="display text-4xl font-semibold text-deep md:text-5xl">
        Commence capacity building through the Canon, the Academy, or Strategic Advisory.
      </h2>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <CtaButton action="buy_book" href="/books" variant="light">
          Procure Publications
        </CtaButton>
        <CtaButton action="enroll_course" href="/courses" variant="light">
          Enroll Institutional Cohort
        </CtaButton>
        <CtaButton action="send_inquiry" href="/contact" variant="light">
          Submit Inquiry
        </CtaButton>
      </div>
    </div>
  </section>
</>


);
}