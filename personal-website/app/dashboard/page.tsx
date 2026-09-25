import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { pageMetadata } from "@/lib/seo";
import { siteContact } from "@/lib/site-contact";

export const metadata = pageMetadata({
  title: "Access & Support",
  description: "Order support, course access, membership assistance, downloads, and client help for MusaAllama.com.",
  path: "/dashboard",
});

const accessRoutes = [
  {
    title: "Book Orders",
    copy: "Need help with a paid book, receipt confirmation, delivery, or a print-copy request?",
    href: siteContact.whatsappHref,
    label: "Contact order desk",
  },
  {
    title: "Courses",
    copy: "Browse available courses, join a waitlist, or ask about access to a program you have already enrolled in.",
    href: "/courses",
    label: "Open courses",
  },
  {
    title: "Membership",
    copy: "Review membership options, renew your circle, or ask about member benefits and access.",
    href: "/membership",
    label: "View membership",
  },
  {
    title: "Advisory",
    copy: "Follow up on a strategic session, request a new consultation, or ask about an existing engagement.",
    href: "/advisory",
    label: "Open advisory",
  },
  {
    title: "Media & Institutional Requests",
    copy: "Request official media materials, speaking information, or institutional documentation.",
    href: "/press",
    label: "Open media desk",
  },
  {
    title: "General Support",
    copy: "For anything else, contact the MusaAllama.com support desk directly and include your name and order or inquiry details.",
    href: siteContact.whatsappHref,
    label: "Contact support",
  },
];

export default function DashboardPage() {
  return (
    <>
      <PageHero
        eyebrow="Access & Support"
        title="Help with orders, courses, membership, and client access."
        copy="Use this desk to reach the right part of MusaAllama.com for delivery support, course access, membership, advisory, or general assistance."
        primaryCta={{ label: "Contact support", href: siteContact.whatsappHref, action: "send_inquiry" }}
        secondaryCta={{ label: "Browse books", href: "/books", action: "buy_book" }}
      />

      <section className="px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-lg border border-line bg-deep p-7 text-vellum">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Existing customers</p>
            <h2 className="display mt-3 text-3xl font-semibold">Need access to something you already purchased?</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-vellum/72">
              Contact support with your name, order number or payment reference, and the product or service you purchased. The team will verify the order and assist with the correct access or next step.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {accessRoutes.map((item) => (
              <article className="flex h-full flex-col rounded-lg border border-line bg-white/80 p-6" key={item.title}>
                <h3 className="display text-3xl font-semibold text-deep">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">{item.copy}</p>
                <Link
                  className="mt-auto pt-6 text-sm font-semibold uppercase tracking-[0.14em] text-burgundy hover:text-deep"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
