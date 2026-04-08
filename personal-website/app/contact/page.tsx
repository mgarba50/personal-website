import env from "@/lib/env";
import { profile } from "@/content/profile";
import { LeadForm } from "@/components/forms/lead-form";
import { HeroBlock } from "@/components/ui/hero-block";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardEyebrow, CardTitle } from "@/components/ui/card";
import { buildMetadata } from "@/lib/metadata";

const pathways = [
  {
    title: "Strategic advisory",
    summary: "Use the diplomatic intake brief for enterprise, transformation, and strategy-intensive work.",
    href: "/advisory"
  },
  {
    title: "Inner Diwan",
    summary: "Use the private clarity intake for confidential ethical, legacy, or philosophical guidance.",
    href: "/inner-diwan"
  },
  {
    title: "Press and speaking",
    summary: "Use the media vault for interviews, official assets, and event-related requests.",
    href: "/press"
  },
  {
    title: "Institutional support",
    summary: "Use the impact page for endowment support, sponsorship, and alliance conversations.",
    href: "/impact"
  }
];

export const metadata = buildMetadata({
  title: "Diplomatic Desk | Musa Allama",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-shell space-y-16 px-4 py-8 md:px-6 md:py-10">
      <HeroBlock
        eyebrow="Diplomatic Desk"
        title="Multiple contact pathways, one disciplined routing architecture."
        summary="This page prevents confusion by directing visitors toward the right corridor before they submit. General inquiries remain available, but premium routes keep their own specialized intake forms and routing logic."
      >
        <Card>
          <CardEyebrow>Office routing</CardEyebrow>
          <CardTitle>{profile.brandName}</CardTitle>
          <p className="mt-4 text-sm leading-7 text-muted">
            Administrative, publishing, and general institutional communication can begin here when a more specialized corridor is not required.
          </p>
          <p className="mt-4 text-sm text-text">{env.adminEmail} | {profile.whatsapp}</p>
        </Card>
      </HeroBlock>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Routing architecture"
          title="Choose the correct path before you write."
          description="Generic one-form-fits-all handling is intentionally avoided for high-trust inquiries."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {pathways.map((pathway) => (
            <Card key={pathway.href}>
              <CardEyebrow>Preferred route</CardEyebrow>
              <CardTitle>{pathway.title}</CardTitle>
              <p className="mt-4 text-sm leading-7 text-muted">{pathway.summary}</p>
              <a href={pathway.href} className="mt-6 inline-flex text-sm uppercase tracking-[0.18em] text-accent">
                Enter route
              </a>
            </Card>
          ))}
        </div>
      </section>

      <LeadForm
        title="General Inquiry Form"
        summary="Use this for general correspondence, partnership exploration, owner communication, or routing questions that do not belong to the more specialized corridors."
        endpoint="/api/contact"
        submitLabel="Send inquiry"
        fields={[
          { name: "fullName", label: "Full name", type: "text", required: true, placeholder: "Your full name" },
          { name: "email", label: "Email", type: "email", required: true, placeholder: "you@example.com" },
          { name: "organization", label: "Organization", type: "text", placeholder: "Organization or context" },
          {
            name: "inquiryType",
            label: "Inquiry type",
            type: "select",
            required: true,
            options: ["General inquiry", "Partnership", "Book request", "Product question", "Administrative note"]
          },
          { name: "message", label: "Message", type: "textarea", required: true, placeholder: "State your inquiry clearly and briefly." }
        ]}
      />
    </main>
  );
}
