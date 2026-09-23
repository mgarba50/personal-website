import Link from "next/link";
import type { Course } from "@/lib/content";

export function CourseCard({ course }: { course: Course }) {
  const courseHref = `/courses/${course.slug}`;

  return (
    <article className="group flex h-full flex-col rounded-lg border border-line bg-white/75 p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-gold hover:shadow-md">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald">{course.category}</p>
      <h3 className="display mt-3 text-3xl font-semibold leading-tight text-deep">
        <Link className="transition hover:text-burgundy" href={courseHref}>
          {course.title}
        </Link>
      </h3>
      <p className="mt-4 text-sm leading-7 text-muted">{course.description}</p>
      <div className="mt-5 grid gap-2 text-sm text-charcoal">
        <span>{course.duration}</span>
        <span>{course.certificate}</span>
      </div>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
        <span className="text-sm font-semibold text-deep">{course.price}</span>
        <Link
          className="rounded-md border border-line px-3 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-burgundy transition hover:border-gold hover:text-deep"
          data-conversion="view_course"
          data-conversion-label={course.title}
          href={courseHref}
        >
          View course
        </Link>
      </div>
    </article>
  );
}
