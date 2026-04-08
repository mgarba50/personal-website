import { NextResponse } from "next/server";
import { paymentChannels } from "@/lib/payments";
import { paymentIntentSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = paymentIntentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues[0]?.message || "Invalid payment request." }, { status: 400 });
  }

  const channel = paymentChannels.find(
    (entry) => entry.name.toLowerCase() === parsed.data.channel.toLowerCase()
  );

  if (!channel) {
    return NextResponse.json({ message: "Unknown payment channel." }, { status: 400 });
  }

  if (!channel.configured) {
    return NextResponse.json({
      status: "pending-configuration",
      message: `${channel.name} is scaffolded but not yet configured in environment variables.`
    });
  }

  return NextResponse.json({
    status: "ready",
    message: `${channel.name} is configured. Integrate provider-specific session creation logic in this route before live launch.`,
    productSlug: parsed.data.productSlug
  });
}
