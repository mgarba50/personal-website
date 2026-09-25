import Link from "next/link";

export function CourseAccessPanel({ slug }: { slug: string }) {
  return (
    <section className="rounded-lg border border-line bg-white/80 p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald">Course access</p>
      <h2 className="display mt-3 text-3xl font-semibold text-deep">Enrollment and learner support</h2>
      <p className="mt-4 text-sm leading-7 text-muted">
        Enroll in the course below. If you are already enrolled and need help with lessons, materials, certificates, or access, use the support desk.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link
          className="rounded-md bg-deep px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-vellum"
          data-conversion="enroll_course"
          data-conversion-label={slug}
          href={`/checkout?type=course&slug=${slug}`}
        >
          Enroll now
        </Link>
        <Link
          className="rounded-md border border-gold px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-deep"
          data-conversion="open_dashboard"
          data-conversion-label="Course support"
          href="/dashboard"
        >
          Course support
        </Link>
      </div>
    </section>
  );
}
