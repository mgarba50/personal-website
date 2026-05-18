import Link from "next/link";
import type { AdvisoryService } from "@/lib/content";

export function ServiceCard({ service }: { service: AdvisoryService }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-line bg-white/80 p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">{service.duration}</p>
      <h3 className="display mt-3 text-3xl font-semibold leading-tight text-deep">{service.title}</h3>
      <p className="mt-4 text-sm leading-7 text-muted">{service.description}</p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
        <span className="text-sm font-semibold text-deep">{service.price}</span>
        <Link className="text-sm font-semibold uppercase tracking-[0.14em] text-burgundy hover:text-deep" href={`/advisory/${service.slug}`}>
          Book session
        </Link>
      </div>
    </article>
  );
}
