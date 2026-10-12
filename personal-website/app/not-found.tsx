import Link from "next/link";
import { siteWings } from "@/lib/site-architecture";

export default function NotFound() {
  return (
    <section className="sa-not-found">
      <div className="sa-container sa-not-found__inner">
        <p className="sa-not-found__code">404</p>
        <h1 className="sa-display sa-not-found__title">
          This route is outside the headquarters.
        </h1>
        <p className="sa-not-found__copy">
          The address may have moved during the MusaAllama.com restructuring.
          Continue through one of the three primary wings.
        </p>

        <div className="sa-not-found__routes">
          {siteWings.map((wing) => (
            <Link className="sa-button sa-button--ghost" href={wing.href} key={wing.id}>
              {wing.shortLabel}
            </Link>
          ))}
          <Link className="sa-button sa-button--gold" href="/">
            Headquarters
          </Link>
        </div>
      </div>
    </section>
  );
}
