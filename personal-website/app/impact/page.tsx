import { initiatives } from "@/content/collections/initiatives";
import { LeadForm } from "@/components/forms/lead-form";
import { HeroBlock } from "@/components/ui/hero-block";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardEyebrow, CardTitle } from "@/components/ui/card";
import { buildMetadata } from "@/lib/metadata";

const supportTiers = [
  "Recurring support",
  "One-time contribution",
  "Corporate sponsorship",
  "Library or archive sponsorship",
  "Strategic alliance inquiry"
];

export const metadata = buildMetadata({
  title: "Institutional Impact | Musa Allama",
  path: "/impact"
});

export default function ImpactPage() {
  return (
    <main className="mx-auto max-w-shell space-y-16 px-4 py-8 md:px-6 md:py-10">
      <HeroBlock
        eyebrow="Institutional Impact"
        title="Human capital, publishing preservation, and livelihoods designed with dignity."
        summary="This page frames impact work as legacy architecture and strategic stewardship rather than charity rhetoric. It is designed for benefactors, corporate partners, and long-horizon allies under the Gallifrey Human Capital Initiative."
      >
        <Card>
          <CardEyebrow>Manifesto</CardEyebrow>
          <CardTitle>No pity tone. No brochure sentimentality.</CardTitle>
          <p className="mt-4 text-sm leading-7 text-muted">
            The language and structure emphasize operational mandate, measurable support architecture, and proof-of-work readiness.
          </p>
        </Card>
      </HeroBlock>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Three-pillar architecture"
          title="Impact corridors aligned with scholarship, preservation, and productive capability"
          description="Each initiative is designed to support reporting, sponsorship, and future impact dossier publication."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {initiatives.map((initiative) => (
            <Card key={initiative.title}>
              <CardEyebrow>{initiative.impactType}</CardEyebrow>
              <CardTitle>{initiative.title}</CardTitle>
              <p className="mt-4 text-sm leading-7 text-muted">{initiative.summary}</p>
              <ul className="mt-5 grid gap-3 text-sm leading-7 text-muted">
                {initiative.assets.map((asset) => (
                  <li key={asset}>- {asset}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardEyebrow>Support modes</CardEyebrow>
          <CardTitle>Flexible contribution architecture</CardTitle>
          <ul className="mt-4 grid gap-3 text-sm leading-7 text-muted">
            {supportTiers.map((tier) => (
              <li key={tier}>- {tier}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardEyebrow>Transparency layer</CardEyebrow>
          <CardTitle>Proof-of-work and reporting placeholders are built into the page model.</CardTitle>
          <p className="mt-4 text-sm leading-7 text-muted">
            The current build creates space for impact reports, partner acknowledgements, sponsorship dossiers, and future audit-facing updates once the real program data is added.
          </p>
        </Card>
      </section>

      <LeadForm
        title="Endowment and Institutional Support Form"
        summary="Use this route for benefactor commitments, corporate sponsorship, CSR partnerships, or legacy architecture conversations."
        endpoint="/api/support"
        submitLabel="Submit support inquiry"
        fields={[
          { name: "fullName", label: "Full name", type: "text", required: true, placeholder: "Full name" },
          { name: "organization", label: "Organization", type: "text", placeholder: "Organization or family office" },
          { name: "email", label: "Email", type: "email", required: true, placeholder: "contact@example.com" },
          {
            name: "supportType",
            label: "Support type",
            type: "select",
            required: true,
            options: ["Recurring support", "One-time support", "Corporate sponsorship", "CSR partnership", "Strategic alliance"]
          },
          { name: "details", label: "Support brief", type: "textarea", required: true, placeholder: "State the intended support corridor and priorities." }
        ]}
      />
    </main>
  );
}
