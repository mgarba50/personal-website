import { InquiryForm } from "@/components/forms/inquiry-form";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Institutional Impact",
  description:
    "Education support, agriculture training, youth skills development, knowledge preservation, scholarships, endowment inquiries, and partnerships.",
  path: "/impact",
});

const initiatives = [
  {
    title: "Education support",
    copy: "Partnership opportunities for learning materials, teaching programs, student support, and practical educational initiatives.",
  },
  {
    title: "Agriculture training",
    copy: "Field-oriented agricultural training for farmers, students, cooperatives, institutions, and development programs.",
  },
  {
    title: "Youth skills development",
    copy: "Practical skills initiatives in technology, languages, enterprise, publishing, and agriculture for young learners and emerging professionals.",
  },
  {
    title: "Knowledge preservation",
    copy: "Support for publishing, digitization, educational archives, manuscripts, and long-term access to useful knowledge.",
  },
  {
    title: "Scholarships",
    copy: "Education-support partnerships and scholarship inquiries for selected learning and training opportunities.",
  },
  {
    title: "Endowment & partnerships",
    copy: "Long-term institutional support, sponsored programs, research, training, publishing, and collaborative initiatives.",
  },
];

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="Institutional Impact"
        title="Legacy, education, agriculture, and knowledge preservation."
        copy="A partnership center for initiatives that support learning, agricultural capability, youth skills, scholarships, publishing, and long-term institutional memory."
        primaryCta={{ label: "Partner with us", href: "#partner" }}
        secondaryCta={{ label: "Support an initiative", href: "#partner" }}
      />

      <section className="px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Impact areas"
            title="Support an educational, agricultural, or publishing initiative"
            copy="Partnerships can be structured around training, educational support, publishing, scholarships, youth skills, or long-term institutional projects."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {initiatives.map((initiative) => (
              <article className="rounded-lg border border-line bg-white/80 p-6" key={initiative.title}>
                <h3 className="display text-3xl font-semibold text-deep">{initiative.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">{initiative.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="partner" className="bg-white/55 px-5 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-burgundy">Partner with us</p>
            <h2 className="display mt-3 text-4xl font-semibold text-deep md:text-5xl">Send an institutional partnership inquiry.</h2>
            <p className="mt-5 text-sm leading-7 text-muted">
              Include project scope, location, intended beneficiaries, budget range, timeline, and partnership expectations.
            </p>
          </div>
          <InquiryForm />
        </div>
      </section>
    </>
  );
}
