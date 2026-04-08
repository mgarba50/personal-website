import { NextResponse } from "next/server";
import env from "@/lib/env";
import { formDataToObject, clarityIntakeSchema } from "@/lib/validators";
import { handleSubmission } from "@/lib/server/submissions";

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = clarityIntakeSchema.safeParse(formDataToObject(formData));

  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues[0]?.message || "Invalid submission." }, { status: 400 });
  }

  const result = await handleSubmission({
    kind: "inner diwan intake",
    payload: parsed.data,
    userEmail: parsed.data.email,
    userName: parsed.data.fullName,
    adminEmail: env.adminEmail,
    adminSubject: "New inner diwan intake",
    userSubject: "Private clarity intake acknowledgement",
    userNextStep: "A confidential review will determine whether the request moves forward, needs clarification, or should be referred elsewhere."
  });

  return NextResponse.json(result);
}
