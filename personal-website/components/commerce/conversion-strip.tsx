import Link from "next/link";

const actions = [
  { label: "Buy", href: "/books", action: "buy_book" },
  { label: "Enroll", href: "/courses", action: "enroll_course" },
  { label: "Book", href: "/advisory/strategic-session", action: "book_advisory" },
  { label: "Inquire", href: "/contact", action: "send_inquiry" },
  { label: "Subscribe", href: "/library#resources", action: "subscribe_dispatch" },
  { label: "Apply", href: "/membership", action: "apply_membership" },
];

export function ConversionStrip({ title = "Choose the next institutional action." }: { title?: string }) {
  return (
    <section className="border-y border-gold/25 bg-deep px-5 py-7 text-vellum">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Conversion Desk</p>
          <h2 className="display mt-2 text-3xl font-semibold">{title}</h2>
        </div>
        <div className="flex flex-wrap gap-2 lg:justify-end">
          {actions.map((item) => (
            <Link
              className="min-w-24 rounded-md border border-gold/45 px-3 py-3 text-center text-xs font-semibold uppercase tracking-[0.12em] text-vellum transition hover:bg-gold hover:text-deep"
              data-conversion={item.action}
              data-conversion-label={item.label}
              href={item.href}
              key={item.action}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
