import Link from "next/link";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { documentSolutions, getDocumentSolution } from "@/lib/gallifrey-document-solutions";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return documentSolutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = getDocumentSolution(slug);
  if (!solution) return {};
  return pageMetadata({
    title: solution.title,
    description: solution.summary,
    path: `/gallifrey/business-plans/${solution.slug}`,
  });
}

function ListPanel({ title, items, tone = "light" }: { title: string; items: string[]; tone?: "light" | "dark" }) {
  return <section className={tone === "dark" ? "border border-gold/20 bg-vellum/5 p-7" : "rounded-lg border border-line bg-white/80 p-7"}>
    <h2 className={`text-xs font-semibold uppercase tracking-[0.19em] ${tone === "dark" ? "text-gold" : "text-burgundy"}`}>{title}</h2>
    <ul className={`mt-5 space-y-3 text-sm leading-6 ${tone === "dark" ? "text-vellum/72" : "text-deep/78"}`}>{items.map((item) => <li key={item} className="grid grid-cols-[1.1rem_1fr] gap-2"><span className={tone === "dark" ? "text-gold" : "text-burgundy"}>—</span><span>{item}</span></li>)}</ul>
  </section>;
}

export default async function DocumentSolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = getDocumentSolution(slug);
  if (!solution) notFound();

  const message = `I am requesting an assessment for Gallifrey Solution ${solution.number}: ${solution.title}.\n\nPurpose / receiving institution:\nCurrent documents available:\nProject location and scale:\nRequired deadline:`;

  return <>
    <section className="institutional-shell px-5 py-16 text-vellum md:py-24">
      <div className="mx-auto max-w-6xl">
        <Link href="/gallifrey/business-plans" className="text-xs font-semibold uppercase tracking-[0.16em] text-gold transition hover:text-vellum">← All document solutions</Link>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_17rem] lg:items-end">
          <div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Gallifrey solution {solution.number} · {solution.category}</p><h1 className="display mt-5 max-w-4xl text-5xl font-semibold leading-none md:text-7xl">{solution.title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-vellum/75">{solution.summary}</p></div>
          <div className="border-l border-gold/40 pl-6"><p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold">Engagement principle</p><p className="display mt-3 text-2xl leading-tight text-vellum">Customised from evidence. Never issued as a generic final document.</p></div>
        </div>
      </div>
    </section>

    <section className="px-5 py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy">The assignment</p><h2 className="display mt-4 text-4xl font-semibold leading-tight text-deep">What this solution is designed to accomplish.</h2><p className="mt-6 text-base leading-8 text-muted">{solution.objective}</p><Link href="#request" className="mt-8 inline-flex rounded-md bg-deep px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-vellum transition hover:bg-navy">Request this solution →</Link></div>
        <div className="grid gap-5 sm:grid-cols-2"><ListPanel title="Designed for" items={solution.idealFor} /><ListPanel title="Planning focus" items={solution.focusAreas} /></div>
      </div>
    </section>

    <section className="bg-deep px-5 py-20 text-vellum">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2"><ListPanel title="What the client must provide" items={solution.clientInputs} tone="dark" /><ListPanel title="Gallifrey delivery pack" items={solution.deliverables} tone="dark" /></div>
        <div className="mt-8 border border-gold/25 bg-gold/8 p-7 md:flex md:items-center md:justify-between md:gap-10"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Integrity control</p><p className="mt-3 max-w-3xl text-sm leading-7 text-vellum/70">Approval, funding, contract award and regulatory decisions remain with the relevant institution. Gallifrey prepares and strengthens the submission; it does not fabricate supporting evidence or guarantee an external decision.</p></div><span className="display mt-5 block min-w-fit text-4xl text-gold/65 md:mt-0">G/{solution.number}</span></div>
      </div>
    </section>

    <section id="request" className="bg-white/65 px-5 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.78fr_1.22fr]">
        <div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-burgundy">Commission solution {solution.number}</p><h2 className="display mt-3 text-4xl font-semibold text-deep md:text-5xl">Begin with a document assessment.</h2><p className="mt-5 text-sm leading-7 text-muted">Provide the receiving institution&apos;s instructions whenever available. The final scope and professional fee depend on evidence quality, financial work, submission complexity and deadline.</p></div>
        <InquiryForm defaultInquiryType="Business plan and feasibility study" defaultMessage={message} submitLabel={`Request Solution ${solution.number}`} />
      </div>
    </section>
  </>;
}
