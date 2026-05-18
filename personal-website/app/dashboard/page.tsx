import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { dashboardItems } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Member Dashboard",
  description: "Member, student, and client dashboard for purchases, courses, downloads, certificates, and bookings.",
  path: "/dashboard",
});

export default function DashboardPage() {
  return (
    <>
      <PageHero
        eyebrow="Member Dashboard"
        title="Your private access center."
        copy="Purchased books, enrolled courses, membership status, downloads, certificates, advisory bookings, renewal, and upgrade paths."
        primaryCta={{ label: "Renew / upgrade", href: "/membership", action: "apply_membership" }}
        secondaryCta={{ label: "Browse products", href: "/books", action: "buy_book" }}
      />

      <section className="px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-lg border border-line bg-white/80 p-7">
            <h2 className="display text-4xl font-semibold text-deep">Welcome back</h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              Authentication is ready to connect through Supabase Auth, Clerk, or NextAuth. This V1 dashboard models the
              required member, student, and client access areas.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {dashboardItems.map((item) => (
              <article className="rounded-lg border border-line bg-white/80 p-6" key={item}>
                <h3 className="display text-3xl font-semibold text-deep">{item}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">
                  Empty state ready. Connect database records to show live access, progress, files, certificates, and
                  booking history.
                </p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="rounded-md bg-deep px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-vellum"
              data-conversion="enroll_course"
              data-conversion-label="Dashboard course CTA"
              href="/courses"
            >
              Enroll in course
            </Link>
            <Link
              className="rounded-md border border-gold px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-deep"
              data-conversion="book_advisory"
              data-conversion-label="Dashboard advisory CTA"
              href="/advisory"
            >
              Book advisory
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
