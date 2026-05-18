import { PageHero } from "@/components/ui/page-hero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Course Terms",
  description: "Course terms for The Madrasa on MusaAllama.com.",
  path: "/legal/course-terms",
});

export default function CourseTermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Course Terms"
        copy="Terms for course enrollment, lesson access, certificates, student dashboards, and learning materials."
      />
      <section className="px-5 py-16">
        <article className="content mx-auto max-w-4xl rounded-lg border border-line bg-white/80 p-7 text-muted">
          <h2>Enrollment</h2>
          <p>
            Paid course access begins after successful payment or admin verification of manual transfer. Free preview
            lessons may be available before purchase.
          </p>
          <h2>Certificates</h2>
          <p>
            Certificates may be issued after completion requirements are met. Certificate numbers and files should be stored
            in the Certificate table.
          </p>
          <h2>Student conduct</h2>
          <p>
            Course materials are for enrolled students only. Reposting, reselling, or distributing private lessons without
            permission is prohibited.
          </p>
        </article>
      </section>
    </>
  );
}
