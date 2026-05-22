import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { adminMetrics } from "@/lib/content";
import { adminPaymentActions, customerMessageTemplates, orderStatuses } from "@/lib/revenue";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Admin Dashboard",
  description: "Admin dashboard for metrics, content, orders, inquiries, users, memberships, and certificates.",
  path: "/admin",
});

const actions = [
  "Add/edit book",
  "Upload files",
  "Create course",
  "Publish article",
  "View inquiries",
  "Manage users",
  "Assign membership tier",
  "Issue certificate",
  "Mark manual payment verified",
];

export default function AdminPage() {
  return (
    <>
      <PageHero
        eyebrow="Admin"
        title="Institutional operations dashboard."
        copy="Metrics, revenue summary, recent orders, inquiries, members by tier, enrollments, content management, and manual payment workflows."
        primaryCta={{ label: "View inquiries", href: "/admin#actions" }}
        secondaryCta={{ label: "Member dashboard", href: "/dashboard" }}
      />

      <section className="px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {adminMetrics.map((metric) => (
              <article className="rounded-lg border border-line bg-white/80 p-6" key={metric.label}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">{metric.label}</p>
                <h2 className="display mt-3 text-5xl font-semibold text-deep">{metric.value}</h2>
                <p className="mt-3 text-sm leading-7 text-muted">{metric.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="actions" className="bg-white/55 px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-burgundy">Admin actions</p>
              <h2 className="display mt-3 text-4xl font-semibold text-deep md:text-5xl">Content, commerce, and users.</h2>
            </div>
            <Link className="text-sm font-semibold uppercase tracking-[0.14em] text-burgundy hover:text-deep" href="/supabase/schema.sql">
              Database schema
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {actions.map((action) => (
              <article className="rounded-lg border border-line bg-white/80 p-6" key={action}>
                <h3 className="display text-2xl font-semibold text-deep">{action}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">Ready to connect to Supabase admin tables and protected routes.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <article className="rounded-lg border border-line bg-white/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-burgundy">Order status</p>
              <h2 className="display mt-3 text-4xl font-semibold text-deep">Manual payment approval flow.</h2>
              <div className="mt-6 grid gap-3">
                {orderStatuses.map((status, index) => (
                  <div className="rounded-md border border-line bg-vellum/70 p-4" key={status}>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">Status {index + 1}</p>
                    <h3 className="mt-1 font-semibold text-deep">{status}</h3>
                  </div>
                ))}
              </div>
            </article>
            <article className="rounded-lg border border-line bg-white/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-burgundy">Admin review</p>
              <h2 className="display mt-3 text-4xl font-semibold text-deep">Receipt and delivery actions.</h2>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {adminPaymentActions.map((action) => (
                  <div className="rounded-md border border-line bg-white p-4" key={action}>
                    <h3 className="font-semibold text-deep">{action}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted">Ready for protected admin wiring.</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white/55 px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-burgundy">Customer messages</p>
            <h2 className="display mt-3 text-4xl font-semibold text-deep md:text-5xl">Email and WhatsApp templates.</h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {customerMessageTemplates.map((template) => (
              <article className="rounded-lg border border-line bg-white/80 p-6" key={template.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">{template.title}</p>
                <h3 className="mt-3 font-semibold text-deep">{template.subject}</h3>
                <div className="mt-4 grid gap-2 text-sm leading-7 text-muted">
                  {template.body.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
