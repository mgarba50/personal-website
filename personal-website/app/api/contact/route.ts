import { NextResponse } from "next/server";
import env from "@/lib/env";
import { contactSchema, formDataToObject } from "@/lib/validators";
import { handleSubmission } from "@/lib/server/submissions";

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = contactSchema.safeParse(formDataToObject(formData));

  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues[0]?.message || "Invalid submission." }, { status: 400 });
  }

  const result = await handleSubmission({
    kind: "general inquiry",
    payload: parsed.data,
    userEmail: parsed.data.email,
    userName: parsed.data.fullName,
    adminEmail: env.adminEmail,
    adminSubject: "New general inquiry",
    userSubject: "General inquiry acknowledgement",
    userNextStep: "Your message has entered the routing queue and will be directed to the appropriate corridor."
  });

  return NextResponse.json(result);
}
