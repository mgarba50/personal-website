import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { adminMetrics } from "@/lib/content";
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
    </>
  );
}
