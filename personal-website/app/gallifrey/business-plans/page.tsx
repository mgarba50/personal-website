import Link from "next/link";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { PageHero } from "@/components/ui/page-hero";
import { documentSolutions, solutionCategories } from "@/lib/gallifrey-document-solutions";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Business Plans, Proposals & Tender Documentation",
  description: "Professional farm business plans, feasibility studies, funding proposals, company profiles and tender documentation from Gallifrey.",
  path: "/gallifrey/business-plans",
});

const categoryIds: Record<(typeof solutionCategories)[number], string> = {
  "Farm & Agribusiness": "farm-agribusiness",
  "Funding & Investment": "funding-investment",
  "Corporate Documentation": "corporate-documentation",
  "Contracts & Tenders": "contracts-tenders",
};

const standards = [
  ["01", "Evidence first", "Claims, experience, assets and registrations are included only when the client can support them."],
  ["02", "Built around the decision", "The structure changes for a bank, grant maker, investor, procurement team or internal management audience."],
  ["03", "Numbers with assumptions", "Financial tables identify their inputs so projections can be reviewed, challenged and updated."],
  ["04", "Submission control", "Every final pack includes a requirements check, evidence index and last-stage quality review."],
];

export default function BusinessPlansPage() {
  return <>
    <PageHero
      eyebrow="Gallifrey International · Planning & Tender Desk"
      title="Business documents built to survive scrutiny."
      copy="Farm business plans, feasibility studies, funding proposals, capability documents and tender responses—professionally structured around the client's real operation, evidence and objective."
      primaryCta={{ label: "Explore 20 solutions", href: "#solutions", action: "view_document_solutions" }}
      secondaryCta={{ label: "Request assessment", href: "#request", action: "request_document_assessment" }}
    />

    <section className="border-b border-line bg-white/70 px-5 py-8">
      <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-3">
        <div><strong className="display block text-4xl text-deep">20</strong><span className="mt-1 block text-xs uppercase tracking-[0.16em] text-muted">Structured solution routes</span></div>
        <div><strong className="display block text-4xl text-deep">A4</strong><span className="mt-1 block text-xs uppercase tracking-[0.16em] text-muted">Editable and print-ready delivery</span></div>
        <div><strong className="display block text-4xl text-deep">100%</strong><span className="mt-1 block text-xs uppercase tracking-[0.16em] text-muted">Client evidence required</span></div>
      </div>
    </section>

    <section id="solutions" className="px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-burgundy">Document solution catalogue</p>
            <h2 className="display mt-4 text-4xl font-semibold leading-tight text-deep md:text-6xl">Start with the decision your document must win.</h2>
          </div>
          <div>
            <p className="max-w-2xl text-base leading-8 text-muted">These are service systems, not downloadable one-size-fits-all files. Gallifrey selects the right master, collects authentic information, rebuilds the financial and evidence sections, and issues a client-specific final pack.</p>
            <nav aria-label="Document solution categories" className="mt-6 flex flex-wrap gap-2">
              {solutionCategories.map((category) => <a key={category} href={`#${categoryIds[category]}`} className="rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-deep transition hover:border-gold hover:bg-deep hover:text-vellum">{category}</a>)}
            </nav>
          </div>
        </div>

        <div className="mt-16 space-y-20">
          {solutionCategories.map((category) => {
            const items = documentSolutions.filter((solution) => solution.category === category);
            return <section id={categoryIds[category]} key={category} className="scroll-mt-40">
              <div className="flex flex-col gap-3 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy">Solution division</p><h3 className="display mt-2 text-3xl font-semibold text-deep md:text-4xl">{category}</h3></div>
                <p className="text-sm text-muted">{items.length} professional {items.length === 1 ? "solution" : "solutions"}</p>
              </div>
              <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {items.map((solution) => <article key={solution.slug} className="group flex min-h-[23rem] flex-col rounded-lg border border-line bg-white/80 p-7 transition duration-300 hover:-translate-y-1 hover:border-gold/70 hover:shadow-[0_24px_70px_rgba(11,15,20,0.1)]">
                  <div className="flex items-center justify-between gap-4"><span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-burgundy">Gallifrey solution</span><span className="display text-4xl text-gold/55">{solution.number}</span></div>
                  <h4 className="display mt-4 text-3xl font-semibold leading-tight text-deep">{solution.title}</h4>
                  <p className="mt-4 text-sm leading-7 text-muted">{solution.summary}</p>
                  <div className="mt-6 border-t border-line pt-5"><p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-burgundy">Primary focus</p><p className="mt-2 text-sm leading-6 text-deep/75">{solution.focusAreas.slice(0, 3).join(" · ")}</p></div>
                  <Link href={`/gallifrey/business-plans/${solution.slug}`} className="mt-auto pt-7 text-xs font-semibold uppercase tracking-[0.15em] text-deep transition group-hover:text-burgundy">Examine this solution →</Link>
                </article>)}
              </div>
            </section>;
          })}
        </div>
      </div>
    </section>

    <section className="bg-deep px-5 py-20 text-vellum">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">The document standard</p><h2 className="display mt-4 text-4xl font-semibold md:text-5xl">A strong document is an evidence system.</h2><p className="mt-5 text-sm leading-7 text-vellum/65">Design can attract attention. Credible assumptions, traceable claims and disciplined submission control are what protect the client when the document is examined.</p></div>
          <div className="grid gap-3 sm:grid-cols-2">{standards.map(([number, title, copy]) => <article key={number} className="border border-gold/20 bg-vellum/5 p-6"><span className="display text-3xl text-gold/70">{number}</span><h3 className="mt-4 font-semibold text-vellum">{title}</h3><p className="mt-2 text-sm leading-6 text-vellum/60">{copy}</p></article>)}</div>
        </div>
      </div>
    </section>

    <section className="px-5 py-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
        <article className="rounded-lg border border-line bg-white/75 p-7"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">Stage 01</p><h2 className="display mt-3 text-3xl font-semibold text-deep">Classify</h2><p className="mt-4 text-sm leading-7 text-muted">We identify the actual reader, decision, submission instruction and deadline before selecting a document master.</p></article>
        <article className="rounded-lg border border-line bg-white/75 p-7"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">Stage 02</p><h2 className="display mt-3 text-3xl font-semibold text-deep">Build</h2><p className="mt-4 text-sm leading-7 text-muted">Client facts, quotations, market evidence, operational assumptions and financial inputs replace every master placeholder.</p></article>
        <article className="rounded-lg border border-line bg-white/75 p-7"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">Stage 03</p><h2 className="display mt-3 text-3xl font-semibold text-deep">Control</h2><p className="mt-4 text-sm leading-7 text-muted">The final file is checked against the request, evidence register, calculations, format requirements and submission sequence.</p></article>
      </div>
    </section>

    <section id="request" className="bg-white/65 px-5 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.78fr_1.22fr]">
        <div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-burgundy">Gallifrey engagement desk</p><h2 className="display mt-3 text-4xl font-semibold text-deep md:text-5xl">Request a document assessment.</h2><p className="mt-5 text-sm leading-7 text-muted">Tell us what the document must achieve, who will examine it, what evidence you already have and the submission deadline. We will recommend the correct scope before quoting.</p></div>
        <InquiryForm defaultInquiryType="Business plan and feasibility study" submitLabel="Request Document Assessment" />
      </div>
    </section>
  </>;
}
