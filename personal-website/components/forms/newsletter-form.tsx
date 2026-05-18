import { leadMagnets } from "@/lib/content";

type NewsletterFormProps = {
  compact?: boolean;
};

export function NewsletterForm({ compact = false }: NewsletterFormProps) {
  return (
    <form action="/api/newsletter" method="post" className="grid gap-3 md:grid-cols-2">
      <input className="field rounded-md" name="name" placeholder="Name" required />
      <input className="field rounded-md" name="email" placeholder="Email" required type="email" />
      <select className="field rounded-md" name="interest" required>
        <option value="">Interest</option>
        <option>Books</option>
        <option>Courses</option>
        <option>Consulting</option>
        <option>Agriculture</option>
        <option>Languages</option>
        <option>Technology</option>
      </select>
      <select className="field rounded-md" name="leadMagnet">
        <option value="">Optional free resource</option>
        {leadMagnets.map((item) => (
          <option key={item.slug} value={item.slug}>
            {item.title}
          </option>
        ))}
      </select>
      <button
        className={`rounded-md bg-deep px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-vellum transition hover:bg-navy ${
          compact ? "md:col-span-2" : "md:col-span-2"
        }`}
        type="submit"
      >
        Receive the Dispatch
      </button>
    </form>
  );
}
