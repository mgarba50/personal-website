import { CourseCard } from "@/components/cards/course-card";
import { ConversionStrip } from "@/components/commerce/conversion-strip";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { CourseWaitlistForm } from "@/components/forms/course-waitlist-form";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { courses } from "@/lib/content";
import { courseWaitlists } from "@/lib/revenue";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "The Madrasa",
  description:
    "Premium practical courses and certificates in languages, agriculture, technology, publishing, strategy, and business.",
  path: "/courses",
});

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ waitlist?: string }>;
}) {
  const params = await searchParams;
  const selectedWaitlist = courseWaitlists.find((course) => course.slug === params.waitlist)?.title;

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

      <section id="course-waitlists" className="px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow="Course waitlists"
              title="Prepare for next week's course creation."
              copy="Join the waitlist for the programs connected to the Phase 1 books and practical training tracks."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {courseWaitlists.map((course) => (
                <article className="rounded-lg border border-line bg-white/75 p-5" key={course.slug}>
                  <h3 className="display text-2xl font-semibold text-deep">{course.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{course.description}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-line bg-white/80 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">Waitlist form</p>
            <h3 className="display mt-3 text-3xl font-semibold text-deep">Join a course waitlist</h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              Choose your preferred course and format. Course updates can be sent by email or WhatsApp.
            </p>
            <div className="mt-6">
              <CourseWaitlistForm defaultCourse={selectedWaitlist} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
