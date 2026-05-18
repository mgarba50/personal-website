import { CourseCard } from "@/components/cards/course-card";
import { ConversionStrip } from "@/components/commerce/conversion-strip";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { courses } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "The Madrasa",
  description:
    "Premium practical courses and certificates in languages, agriculture, technology, publishing, strategy, and business.",
  path: "/courses",
});

export default function CoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="The Madrasa"
        title="A premium learning academy for practical operators."
        copy="Courses and certifications for language intelligence, agriculture, technology, publishing, strategy, and business."
        primaryCta={{ label: "Browse courses", href: "#courses", action: "view_course_catalog" }}
        secondaryCta={{ label: "Student dashboard", href: "/dashboard", action: "open_dashboard" }}
      />
      <ConversionStrip title="Course traffic should become enrollment or subscriber demand." />

      <section id="courses" className="px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Course products"
            title="Initial academy catalog"
            copy="Each course has outcomes, modules, duration, certificate information, free preview lessons, paid access, and a student dashboard path."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard course={course} key={course.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy px-5 py-16 text-vellum">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Free previews</p>
            <h2 className="display mt-3 text-4xl font-semibold md:text-5xl">Sample lessons before enrollment.</h2>
            <p className="mt-5 text-sm leading-7 text-vellum/70">
              Capture interest, deliver lead magnets, and route students into paid course areas after checkout.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
