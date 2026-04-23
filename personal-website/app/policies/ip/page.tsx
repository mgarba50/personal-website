import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Intellectual Property Notice | Musa Allama Ibn Garba",
  path: "/policies/ip"
});

export default function IntellectualPropertyPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-6 px-4 py-10 md:px-6">
      <h1 className="font-serif text-5xl text-text">Intellectual Property Notice</h1>
      <p className="text-base leading-8 text-muted">
        All writings, media, course materials, frameworks, books, poems, and commercial assets associated with this platform remain protected intellectual property unless a written license or release states otherwise.
      </p>
      <p className="text-base leading-8 text-muted">
        Final production launch should include jurisdiction-specific IP, trademark, and licensing language where relevant.
      </p>
    </main>
  );
}
