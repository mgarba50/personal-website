import Link from "next/link";
import type { AdvisoryService } from "@/lib/content";

export function ServiceCard({ service }: { service: AdvisoryService }) {
  const serviceHref = `/advisory/${service.slug}`;

  return (
    <article className="group flex h-full flex-col rounded-lg border border-line bg-white/80 p-6 transition duration-200 hover:-translate-y-1 hover:border-gold hover:shadow-md">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">{service.duration}</p>
      <h3 className="display mt-3 text-3xl font-semibold leading-tight text-deep">
        <Link className="transition hover:text-burgundy" href={serviceHref}>
          {service.title}
        </Link>
      </h3>
      <p className="mt-4 text-sm leading-7 text-muted">{service.description}</p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
        <span className="text-sm font-semibold text-deep">{service.price}</span>
        <Link
          className="rounded-md border border-line px-3 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-burgundy transition hover:border-gold hover:text-deep"
          data-conversion="book_advisory"
          data-conversion-label={service.title}
          href={serviceHref}
        >
          Book session
        </Link>
      </div>
    </article>
  );
}
