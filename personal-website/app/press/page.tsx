import env from "@/lib/env";
import { pressDownloads } from "@/content/site";
import { profile } from "@/content/profile";
import { LeadForm } from "@/components/forms/lead-form";
import { HeroBlock } from "@/components/ui/hero-block";
import { Card, CardEyebrow, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { buildMetadata } from "@/lib/metadata";

const speakingTopics = profile.pressTopics;

export const metadata = buildMetadata({
  title: "Press and Media Vault | Musa Allama Ibn Garba",
  path: "/press"
});

export default function PressPage() {
  return (
    <main className="mx-auto max-w-shell space-y-16 px-4 py-8 md:px-6 md:py-10">
      <HeroBlock
        eyebrow="Press and Media Vault"
        title="A media-ready corridor for journalists, summit teams, event organizers, and institutions."
        summary="The press vault is intentionally clean and utilitarian. It holds approved assets, speaking guidance, and a dedicated inquiry route without unnecessary decorative clutter."
      >
        <Card>
          <CardEyebrow>Official contact</CardEyebrow>
          <CardTitle>{env.pressEmail}</CardTitle>
          <p className="mt-4 text-sm leading-7 text-muted">
            Use the inquiry form for interviews, summit participation, panel invitations, media verification, or official asset requests.
          </p>
        </Card>
      </HeroBlock>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Downloads"
          title="Approved asset placeholders ready for replacement"
          description="The current build includes branded placeholders for the official dossier, portrait, and mark pack so the media vault can be populated quickly later."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {pressDownloads.map((item) => (
            <Card key={item.title}>
              <CardEyebrow>Download card</CardEyebrow>
              <CardTitle>{item.title}</CardTitle>
              <p className="mt-4 text-sm leading-7 text-muted">{item.description}</p>
              <a href={item.href} className="mt-6 inline-flex text-sm uppercase tracking-[0.18em] text-accent">
                Download placeholder
              </a>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardEyebrow>Speaking topics</CardEyebrow>
          <CardTitle>Event-ready thematic areas</CardTitle>
          <ul className="mt-4 grid gap-3 text-sm leading-7 text-muted">
            {speakingTopics.map((topic) => (
              <li key={topic}>- {topic}</li>
            ))}
          </ul>
        </Card>
        <LeadForm
          title="Press and Speaking Inquiry"
          summary="For interviews, keynote invitations, summit participation, and media requests."
          endpoint="/api/press"
          submitLabel="Submit press inquiry"
          fields={[
            { name: "fullName", label: "Full name", type: "text", required: true, placeholder: "Your name" },
            { name: "organization", label: "Organization", type: "text", required: true, placeholder: "Publication or event organization" },
            { name: "email", label: "Email", type: "email", required: true, placeholder: "name@organization.com" },
            {
              name: "requestType",
              label: "Request type",
              type: "select",
              required: true,
              options: ["Interview request", "Speaking invitation", "Press asset request", "Profile verification"]
            },
            { name: "details", label: "Request details", type: "textarea", required: true, placeholder: "Event context, dates, themes, and deadlines." }
          ]}
        />
      </section>
    </main>
  );
}
