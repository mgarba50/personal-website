import { LeadForm } from "@/components/forms/lead-form";
import { profile } from "@/content/profile";
import { HeroBlock } from "@/components/ui/hero-block";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardEyebrow, CardTitle } from "@/components/ui/card";
import { CtaStrip } from "@/components/ui/cta-strip";
import { engagementModels, qualificationStandards, serviceTiers } from "@/content/collections/services";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Strategic Advisory | Musa Allama",
  path: "/advisory"
});

export default function AdvisoryPage() {
  return (
    <main className="mx-auto max-w-shell space-y-16 px-4 py-8 md:px-6 md:py-10">
      <HeroBlock
        eyebrow="Global Advisory"
        title="Consultancy presented as institutional force, not freelance service inventory."
        summary="This corridor operates to the Gallifrey International standard: serious mandates, multilingual complexity, systems discipline, and intake-first routing for high-value work."
      >
        <Card>
          <CardEyebrow>Engagement posture</CardEyebrow>
          <CardTitle>Qualification before scheduling for high-ticket mandates.</CardTitle>
          <p className="mt-4 text-sm leading-7 text-muted">
            The site avoids generic booking behavior. Serious engagements begin with a diplomatic intake brief, internal review, fit routing, and then the appropriate call, proposal, or invoice corridor. Tier 3 sessions remain bookable after approval.
          </p>
        </Card>
      </HeroBlock>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Service tiers"
          title="Three tiers for different levels of strategic intensity"
          description="Enterprise corridors, systems transformation work, and Diplomatic Desk strategy sessions are separated so each path preserves its own tone, expectation, and commercial logic."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {serviceTiers.map((tier) => (
            <Card key={tier.id}>
              <CardEyebrow>{tier.title}</CardEyebrow>
              <CardTitle>{tier.summary}</CardTitle>
              <p className="mt-4 text-sm leading-7 text-muted">{tier.audience}</p>
              <ul className="mt-4 grid gap-3 text-sm leading-7 text-muted">
                {tier.offers.map((offer) => (
                  <li key={offer}>- {offer}</li>
                ))}
              </ul>
              <div className="mt-5 border-t border-line pt-5 text-sm leading-7 text-text">
                <p>{tier.pricing}</p>
                <p className="mt-2 text-muted">{tier.delivery}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardEyebrow>Engagement models</CardEyebrow>
          <CardTitle>Flexible structures, governed entry points.</CardTitle>
          <ul className="mt-4 grid gap-3 text-sm leading-7 text-muted">
            {engagementModels.map((model) => (
              <li key={model}>- {model}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardEyebrow>Qualification system</CardEyebrow>
          <CardTitle>Fit matters before momentum.</CardTitle>
          <ul className="mt-4 grid gap-3 text-sm leading-7 text-muted">
            {qualificationStandards.map((standard) => (
              <li key={standard}>- {standard}</li>
            ))}
          </ul>
        </Card>
      </section>

      <LeadForm
        title="Diplomatic Intake Brief"
        summary={`This intake replaces the generic contact form for serious advisory work and routes directly to ${profile.advisoryEmail}. It collects the context needed for fit review, acknowledgement, and the next correct routing decision.`}
        endpoint="/api/intake/diplomatic"
        submitLabel="Submit intake brief"
        fields={[
          { name: "fullName", label: "Full legal name", type: "text", required: true, placeholder: "Full legal name" },
          { name: "organization", label: "Organization", type: "text", required: true, placeholder: "Organization name" },
          { name: "title", label: "Title", type: "text", required: true, placeholder: "Your role or designation" },
          { name: "email", label: "Email", type: "email", required: true, placeholder: "name@organization.com" },
          { name: "phone", label: "Phone or WhatsApp", type: "tel", required: true, placeholder: "+234..." },
          { name: "jurisdiction", label: "Operating jurisdiction", type: "text", required: true, placeholder: "Primary jurisdiction" },
          {
            name: "sector",
            label: "Primary sector",
            type: "select",
            required: true,
            options: ["Agro-industrial", "Trade and logistics", "Education", "Publishing", "Technology", "Institutional strategy"]
          },
          { name: "objective", label: "Strategic objective", type: "textarea", required: true, placeholder: "State the objective, constraint, and desired outcome." },
          { name: "languages", label: "Multilingual requirements", type: "text", placeholder: "Arabic, English, Chinese, Hausa, or other needs" },
          { name: "budget", label: "Budget range", type: "select", required: true, options: ["Below $2,500", "$2,500 - $10,000", "$10,000 - $25,000", "$25,000+"] },
          { name: "horizon", label: "Deployment horizon", type: "select", required: true, options: ["Immediate", "30-60 days", "This quarter", "Longer horizon"] },
          { name: "attachment", label: "Supporting file", type: "file", accept: ".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg" }
        ]}
      />

      <CtaStrip
        eyebrow="Workflow logic"
        title="Submit brief, receive acknowledgement, move into review, and only then enter scheduling or proposal flow."
        summary="This route is designed to support auto acknowledgement, internal review, fit and non-fit responses, and downstream proposal or invoice handling once live integrations are configured."
        href="/contact"
        label="Need a general route instead?"
      />
    </main>
  );
}
