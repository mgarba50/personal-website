import Link from "next/link";
import type { AdvisoryService } from "@/lib/content";

export function ServiceCard({ service }: { service: AdvisoryService }) {
  const serviceHref = `/advisory/${service.slug}`;

  return (
    <Link
      aria-label={`Open ${service.title}`}
      className="group block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      data-conversion="book_advisory"
      data-conversion-label={service.title}
      href={serviceHref}
    >
      <article className="flex h-full cursor-pointer flex-col rounded-lg border border-line bg-white/80 p-6 transition duration-200 group-hover:-translate-y-1 group-hover:border-gold group-hover:shadow-md">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">{service.duration}</p>
        <h3 className="display mt-3 text-3xl font-semibold leading-tight text-deep transition group-hover:text-burgundy">
          {service.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-muted">{service.description}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
          <span className="text-sm font-semibold text-deep">{service.price}</span>
          <span className="rounded-md border border-line px-3 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-burgundy transition group-hover:border-gold group-hover:text-deep">
            Book session
          </span>
        </div>
      </article>
    </Link>
  );
}
