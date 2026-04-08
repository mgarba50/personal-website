import { NextResponse } from "next/server";
import env from "@/lib/env";
import { formDataToObject, newsletterSchema } from "@/lib/validators";
import { handleSubmission } from "@/lib/server/submissions";

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = newsletterSchema.safeParse(formDataToObject(formData));

  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues[0]?.message || "Invalid submission." }, { status: 400 });
  }

  const result = await handleSubmission({
    kind: "newsletter subscription",
    payload: parsed.data,
    userEmail: parsed.data.email,
    userName: parsed.data.name,
    adminEmail: env.adminEmail,
    adminSubject: "New intelligence brief subscriber",
    userSubject: "Subscription confirmation",
    userNextStep: "You will receive occasional dispatches when essays, releases, or institutional updates are published."
  });

  return NextResponse.json(result);
}
