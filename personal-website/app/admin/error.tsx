"use client";
export default function AdminError({ reset }: { reset: () => void }) {
  return <section className="px-5 py-16"><div className="mx-auto max-w-3xl rounded-lg border border-line bg-white p-8"><h1 className="display text-3xl font-semibold text-deep">The order desk could not load.</h1><p className="mt-4 leading-7">Retry, or check the server and database configuration before processing payments.</p><button className="sa-button sa-button--gold mt-6" onClick={reset} type="button">Retry order desk</button></div></section>;
}
