import Link from "next/link";
import { legalDisclaimer } from "@/lib/content";

const columns = [
  {
    title: "Institution",
    links: [
      ["Executive Desk", "/"],
      ["Executive Dossier", "/about"],
      ["Press", "/press"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Knowledge",
    links: [
      ["The Canon", "/books"],
      ["Living Library", "/library"],
      ["The Madrasa", "/courses"],
    ],
  },
  {
    title: "Services",
    links: [
      ["Strategic Advisory", "/advisory"],
      ["Agro-Industrial Command Center", "/agro"],
      ["Gallifrey Digital & Compliance", "/gallifrey"],
      ["Website Samples", "/gallifrey/samples"],
      ["Membership Circles", "/membership"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy Policy", "/legal/privacy"],
      ["Terms", "/legal/terms"],
      ["Refund Policy", "/legal/refund"],
      ["Disclaimer", "/legal/consulting-disclaimer"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-deep px-5 py-14 text-vellum">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.4fr_2fr]">
        <div>
          <h2 className="display text-3xl font-semibold">MusaAllama.com</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-vellum/70">
            A private institution of knowledge, strategy, publishing, agriculture, and practical transformation.
          </p>
          <p className="mt-6 max-w-xl text-xs leading-6 text-vellum/50">{legalDisclaimer}</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{column.title}</h3>
              <ul className="mt-4 space-y-3 text-sm text-vellum/70">
                {column.links.map(([label, href]) => (
                  <li key={href}>
                    <Link className="transition hover:text-gold" href={href}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-gold/20 pt-6 text-xs uppercase tracking-[0.18em] text-vellum/45 md:flex-row md:items-center md:justify-between">
        <span>Copyright 2026 MusaAllama.com</span>
        <span>Nigeria / Global advisory available</span>
      </div>
    </footer>
  );
}
