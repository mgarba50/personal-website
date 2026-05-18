import { notFound } from "next/navigation";
import { ConversionStrip } from "@/components/commerce/conversion-strip";
import { CourseAccessPanel } from "@/components/course/course-access-panel";
import { PaymentPanel } from "@/components/commerce/payment-panel";
import { PageHero } from "@/components/ui/page-hero";
import { courses } from "@/lib/content";
import { jsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug);
  if (!course) return {};
  return pageMetadata({
    title: course.title,
    description: course.description,
    path: `/courses/${course.slug}`,
  });
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug);
  if (!course) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "Course",
          name: course.title,
          description: course.description,
          provider: {
            "@type": "Organization",
            name: "MusaAllama.com",
          },
        })}
      />
      <PageHero
        eyebrow={course.category}
        title={course.title}
        copy={course.description}
        primaryCta={{ label: "Enroll now", href: `/checkout?type=course&slug=${course.slug}`, action: "enroll_course" }}
        secondaryCta={{ label: "Free preview", href: "#preview", action: "view_free_preview" }}
      />
      <ConversionStrip title="Enroll, preview, or enter the student dashboard." />

      <section className="px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_360px]">
          <article className="grid gap-6">
            <section className="rounded-lg border border-line bg-white/80 p-7">
              <h2 className="display text-3xl font-semibold text-deep">Learning outcomes</h2>
              <ul className="mt-4 grid gap-3 text-sm leading-7 text-charcoal">
                {course.outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section className="rounded-lg border border-line bg-white/80 p-7">
              <h2 className="display text-3xl font-semibold text-deep">Modules</h2>
              <ol className="mt-4 grid gap-3 text-sm leading-7 text-charcoal">
                {course.modules.map((module, index) => (
                  <li key={module}>
                    {index + 1}. {module}
                  </li>
                ))}
              </ol>
            </section>
            <section id="preview" className="rounded-lg border border-line bg-white/80 p-7">
              <h2 className="display text-3xl font-semibold text-deep">Free preview lessons</h2>
              <ul className="mt-4 grid gap-3 text-sm leading-7 text-charcoal">
                {course.previewLessons.map((lesson) => (
                  <li key={lesson}>{lesson}</li>
                ))}
              </ul>
            </section>
            <section className="grid gap-6 md:grid-cols-3">
              <div className="rounded-lg border border-line bg-white/80 p-6">
                <h3 className="display text-2xl font-semibold text-deep">Who it is for</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{course.audience}</p>
              </div>
              <div className="rounded-lg border border-line bg-white/80 p-6">
                <h3 className="display text-2xl font-semibold text-deep">Duration</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{course.duration}</p>
              </div>
              <div className="rounded-lg border border-line bg-white/80 p-6">
                <h3 className="display text-2xl font-semibold text-deep">Certificate</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{course.certificate}</p>
              </div>
            </section>
            <CourseAccessPanel slug={course.slug} />
          </article>
          <PaymentPanel title={course.title} productType="course" slug={course.slug} price={course.price} />
        </div>
      </section>
    </>
  );
}
