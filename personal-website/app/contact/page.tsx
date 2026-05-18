import { InquiryForm } from "@/components/forms/inquiry-form";
import { PageHero } from "@/components/ui/page-hero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact / Diplomatic Desk",
  description:
    "Serious inbound inquiries for books, courses, consulting, speaking, agriculture, partnerships, media, and membership.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact / Diplomatic Desk"
        title="A serious desk for serious inquiries."
        copy="Use this channel for books, courses, consulting, speaking, agriculture, partnerships, media, and membership requests."
        primaryCta={{ label: "Send inquiry", href: "#form" }}
        secondaryCta={{ label: "Book advisory", href: "/advisory/strategic-session" }}
      />

      <section id="form" className="px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="rounded-lg border border-line bg-white/80 p-7">
            <h2 className="display text-4xl font-semibold text-deep">Direct details</h2>
            <div className="mt-6 grid gap-4 text-sm leading-7 text-muted">
              <p>Email: hello@musaallama.com</p>
              <p>WhatsApp: add official number</p>
              <p>Location: Nigeria / Global advisory available</p>
              <p>Calendly embed: add scheduling URL in production</p>
            </div>
          </aside>
          <InquiryForm />
        </div>
      </section>
    </>
  );
}
