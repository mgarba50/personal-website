import { NextResponse } from "next/server";
import env from "@/lib/env";
import { formDataToObject, diplomaticIntakeSchema } from "@/lib/validators";
import { handleSubmission } from "@/lib/server/submissions";

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = diplomaticIntakeSchema.safeParse(formDataToObject(formData));

  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues[0]?.message || "Invalid submission." }, { status: 400 });
  }

  const result = await handleSubmission({
    kind: "diplomatic intake",
    payload: parsed.data,
    userEmail: parsed.data.email,
    userName: parsed.data.fullName,
    adminEmail: env.bookingsEmail,
    adminSubject: "New diplomatic intake brief",
    userSubject: "Diplomatic intake acknowledgement",
    userNextStep: "If the mandate is aligned, the next message will outline either a review call, request for clarification, or proposal path."
  });

  return NextResponse.json(result);
}
