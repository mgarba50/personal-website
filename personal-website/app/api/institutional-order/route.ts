import { NextResponse } from "next/server";
import env from "@/lib/env";
import { formDataToObject, institutionalOrderSchema } from "@/lib/validators";
import { handleSubmission } from "@/lib/server/submissions";

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = institutionalOrderSchema.safeParse(formDataToObject(formData));

  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues[0]?.message || "Invalid submission." }, { status: 400 });
  }

  const result = await handleSubmission({
    kind: "institutional order request",
    payload: parsed.data,
    userEmail: parsed.data.email,
    userName: parsed.data.fullName,
    adminEmail: env.adminEmail,
    adminSubject: "New institutional order request",
    userSubject: "Publishing request acknowledgement",
    userNextStep: "The publishing desk will review the requested work, availability, and the appropriate commercial or institutional next step."
  });

  return NextResponse.json(result);
}
