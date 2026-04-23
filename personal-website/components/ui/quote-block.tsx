export function QuoteBlock({
  quote,
  attribution
}: {
  quote: string;
  attribution: string;
}) {
  return (
    <blockquote className="rounded-[28px] border border-line bg-white p-8 shadow-card">
      <p className="font-serif text-2xl leading-10 text-text md:text-3xl">{quote}</p>
      <footer className="mt-6 text-sm uppercase tracking-[0.24em] text-accent">{attribution}</footer>
    </blockquote>
  );
}
