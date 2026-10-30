import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { readOrder } from "@/lib/commerce";
import { formatMoney } from "@/lib/checkout";
import { selectSupabaseRows } from "@/lib/supabase-rest";
export const dynamic = "force-dynamic";
export const metadata = { title: "Review order", robots: { index: false, follow: false } };
export default async function Review({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ notice?: string }> }) {
  const { id } = await params;
  await requireAdmin(`/admin/orders/${id}`);
  const order = await readOrder(id);
  const { notice } = await searchParams;
  const proofs = await selectSupabaseRows<{ id: string; amount_paid: string; transfer_reference: string; notes: string }>("manual_payment_proofs", `commerce_order_id=eq.${order.id}&select=id,amount_paid,transfer_reference,notes&limit=1`);
  const proof = proofs.ok ? proofs.rows[0] : undefined;
  const action = `/api/admin/orders/${order.id}`;
  return <section className="px-5 py-16"><div className="mx-auto max-w-4xl">
    <Link className="text-sm underline" href="/admin">Back to order desk</Link>
    <h1 className="display mt-5 text-4xl font-semibold text-deep">{order.order_number}</h1>
    {notice ? <p role="status" className="mt-5 rounded-md bg-vellum p-5">{notice.slice(0,300)}</p> : null}
    <div className="mt-7 rounded-lg border border-line bg-white/90 p-6 text-sm leading-8"><p><strong>Product:</strong> {order.product_title}</p><p><strong>Expected:</strong> {formatMoney(Number(order.amount_minor))}</p><p><strong>Customer:</strong> {order.name} · {order.email} · {order.phone}</p><p><strong>Status:</strong> {order.status} / delivery {order.delivery_status}</p>{proof ? <><p><strong>Reported transfer:</strong> {proof.amount_paid}</p><p><strong>Customer reference:</strong> {proof.transfer_reference}</p><p><strong>Customer notes:</strong> {proof.notes || "None"}</p><Link className="underline" href={`/api/admin/receipts/${proof.id}`}>Download private receipt for review</Link></> : <p>No receipt is available for this order.</p>}</div>
    {order.status === "payment_submitted" && proof ? <div className="mt-7 grid gap-6 md:grid-cols-2">
      <form action={action} method="post" className="grid gap-4 rounded-lg border border-line bg-white p-6"><input type="hidden" name="action" value="approve" /><h2 className="display text-2xl font-semibold">Approve and deliver</h2><p className="text-sm leading-7">Check the actual bank credit, recipient, amount and reference before approving. An uploaded screenshot alone is insufficient.</p><label className="grid gap-2 text-sm font-semibold">Verified bank amount (NGN)<input className="field rounded-md" name="verifiedAmount" inputMode="decimal" required maxLength={40} /></label><label className="grid gap-2 text-sm font-semibold">Unique bank transaction reference<input className="field rounded-md" name="bankReference" minLength={3} maxLength={200} required /></label><label className="grid gap-2 text-sm font-semibold">Review note<textarea className="field rounded-md" name="note" minLength={3} maxLength={1000} required /></label><label className="flex items-start gap-3 text-sm leading-6"><input type="checkbox" name="bankVerified" value="yes" required />I verified the credit in the bank account.</label><button className="sa-button sa-button--gold" type="submit">Approve payment and email files</button></form>
      <form action={action} method="post" className="grid content-start gap-4 rounded-lg border border-line bg-white p-6"><input type="hidden" name="action" value="reject" /><h2 className="display text-2xl font-semibold">Reject receipt</h2><label className="grid gap-2 text-sm font-semibold">Reason<textarea className="field rounded-md" name="note" minLength={3} maxLength={1000} required /></label><button className="sa-button sa-button--ghost" type="submit">Reject without granting access</button></form>
    </div> : null}
    {order.status === "payment_approved" ? <div className="mt-7 flex flex-wrap gap-4"><form action={action} method="post"><input type="hidden" name="action" value="resend" /><button className="sa-button sa-button--gold" type="submit">Reissue links and resend email</button></form><form action={action} method="post"><input type="hidden" name="action" value="revoke" /><button className="sa-button sa-button--ghost" type="submit">Revoke download links</button></form></div> : null}
  </div></section>;
}
