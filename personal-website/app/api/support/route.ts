import { NextResponse } from "next/server";
import env from "@/lib/env";
import { formDataToObject, supportSchema } from "@/lib/validators";
import { handleSubmission } from "@/lib/server/submissions";

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = supportSchema.safeParse(formDataToObject(formData));

  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues[0]?.message || "Invalid submission." }, { status: 400 });
  }

  const result = await handleSubmission({
    kind: "institutional support inquiry",
    payload: parsed.data,
    userEmail: parsed.data.email,
    userName: parsed.data.fullName,
    adminEmail: env.adminEmail,
    adminSubject: "New institutional support inquiry",
    userSubject: "Support inquiry acknowledgement",
    userNextStep: "A follow-up will clarify sponsorship, endowment, or alliance routing based on the support type selected."
  });

  return NextResponse.json(result);
}
