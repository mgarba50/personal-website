import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "");
  const fullName = String(formData.get("name") ?? "");
  const product = String(formData.get("product") ?? formData.get("slug") ?? "");
  const amount = String(formData.get("amount") ?? "");

  if (!email.includes("@") || !fullName || !product || !amount) {
    return NextResponse.json({ ok: false, message: "Name, email, product, and amount are required." }, { status: 400 });
  }

  const orderRef = `MA-${Date.now()}`;
  return NextResponse.json({
    ok: true,
    orderRef,
    status: "Under Review",
    message: "Payment proof received. Status: Payment Submitted → Under Review. Admin will verify and send download.",
  });
}
