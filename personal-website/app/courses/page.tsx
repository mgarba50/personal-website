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
        title="Practical learning for language, agriculture, technology, and enterprise."
        copy="Courses and certifications designed around useful skills, clear outcomes, and applied learning."
        primaryCta={{ label: "Browse courses", href: "#courses", action: "view_course_catalog" }}
        secondaryCta={{ label: "Student dashboard", href: "/dashboard", action: "open_dashboard" }}
      />
      <ConversionStrip title="Explore a course, preview available lessons, or join a waitlist for the next intake." />

      <section id="courses" className="px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Courses"
            title="Practical programs for serious learners"
            copy="Explore course outcomes, modules, duration, certificate information, previews, and enrollment options."
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
              Preview selected lessons and receive updates on new courses, resources, and enrollment openings.
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
              title="Be notified when the next program opens"
              copy="Join the waitlist for upcoming practical programs and related learning tracks."
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
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">Waitlist</p>
            <h3 className="display mt-3 text-3xl font-semibold text-deep">Join a course waitlist</h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              Choose your preferred course and format. Updates can be sent by email or WhatsApp.
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
