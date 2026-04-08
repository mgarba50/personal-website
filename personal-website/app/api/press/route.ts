import { NextResponse } from "next/server";
import env from "@/lib/env";
import { formDataToObject, pressSchema } from "@/lib/validators";
import { handleSubmission } from "@/lib/server/submissions";

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = pressSchema.safeParse(formDataToObject(formData));

  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues[0]?.message || "Invalid submission." }, { status: 400 });
  }

  const result = await handleSubmission({
    kind: "press inquiry",
    payload: parsed.data,
    userEmail: parsed.data.email,
    userName: parsed.data.fullName,
    adminEmail: env.pressEmail,
    adminSubject: "New press inquiry",
    userSubject: "Press inquiry acknowledgement",
    userNextStep: "The media desk will review the request, confirm fit, and route any asset or scheduling requirements."
  });

  return NextResponse.json(result);
}
