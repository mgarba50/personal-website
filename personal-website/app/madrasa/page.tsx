import { courses } from "@/content/collections/courses";
import { HeroBlock } from "@/components/ui/hero-block";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardEyebrow, CardTitle } from "@/components/ui/card";
import { CtaStrip } from "@/components/ui/cta-strip";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "The Madrasa | Musa Allama",
  path: "/madrasa"
});

export default function MadrasaPage() {
  return (
    <main className="mx-auto max-w-shell space-y-16 px-4 py-8 md:px-6 md:py-10">
      <HeroBlock
        eyebrow="The Madrasa"
        title="A structured education layer designed for future certification without early LMS bloat."
        summary="The Madrasa supports executive education, cohort learning, and certification-ready architecture through clean modular course pages, downloadable notes, and controlled enrollment logic."
      >
        <Card>
          <CardEyebrow>Launch approach</CardEyebrow>
          <CardTitle>Clean modules now, expandable learning infrastructure later.</CardTitle>
          <p className="mt-4 text-sm leading-7 text-muted">
            The current build favors elegant course corridors over premature complexity, while keeping future premium student areas and certificate logic within reach.
          </p>
        </Card>
      </HeroBlock>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Courses"
          title="Programs for modern agro-industrial management and secure logistics automation"
          description="Each course is mapped with format, duration, delivery mode, access logic, and outcomes drawn from your directive."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.slug}>
              <CardEyebrow>{course.format}</CardEyebrow>
              <CardTitle>{course.title}</CardTitle>
              <p className="mt-4 text-sm leading-7 text-muted">{course.summary}</p>
              <div className="mt-5 border-t border-line pt-5 text-sm leading-7 text-muted">
                <p>Duration: {course.duration}</p>
                <p>Delivery: {course.delivery}</p>
                <p>Access: {course.access}</p>
              </div>
              <ul className="mt-5 grid gap-3 text-sm leading-7 text-muted">
                {course.outcomes.map((outcome) => (
                  <li key={outcome}>- {outcome}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <CtaStrip
        eyebrow="Enrollment logic"
        title="Qualification, payment, and cohort communication can be activated as soon as provider keys are supplied."
        summary="The current build includes the page architecture and readiness notes for cohort enrollments, downloadable notes, and later student-area expansion."
        href="/contact"
        label="Discuss learning partnerships"
      />
    </main>
  );
}
