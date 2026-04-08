import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Booking Policy | Musa Allama",
  path: "/policies/booking"
});

export default function BookingPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-6 px-4 py-10 md:px-6">
      <h1 className="font-serif text-5xl text-text">Booking Policy</h1>
      <p className="text-base leading-8 text-muted">
        Premium services on this platform are qualification-first where appropriate. Booking requests may require intake review, deposit confirmation, or proposal acceptance before time is reserved.
      </p>
      <p className="text-base leading-8 text-muted">
        Final rescheduling, cancellation, and timezone rules should be inserted before go-live.
      </p>
    </main>
  );
}
