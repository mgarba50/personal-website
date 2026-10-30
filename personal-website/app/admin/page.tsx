import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { signOut } from "@/app/auth/actions";
import type { CommerceOrder } from "@/lib/commerce";
import { formatMoney } from "@/lib/checkout";
import { selectSupabaseRows } from "@/lib/supabase-rest";
export const dynamic = "force-dynamic";
export const metadata = { title: "Order desk", robots: { index: false, follow: false } };
export default async function Admin() {
  const user = await requireAdmin();
  const result = await selectSupabaseRows<CommerceOrder>("commerce_orders", "select=id,order_number,email,product_title,amount_minor,status,delivery_status,created_at&order=created_at.desc&limit=50");
  return <section className="px-5 py-16"><div className="mx-auto max-w-6xl">
    <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-widest text-burgundy">Authorised order desk</p><h1 className="display mt-3 text-4xl font-semibold text-deep">Payment review and delivery</h1><p className="mt-3 text-sm text-muted">Signed in as {user.email}. Latest 50 orders.</p></div><form action={signOut}><button className="sa-button sa-button--ghost" type="submit">Sign out</button></form></div>
    {!result.ok ? <p role="alert" className="mt-8 rounded-md bg-vellum p-5">The order data is unavailable. Check the database migration and server configuration before processing payments.</p> : <div className="mt-8 overflow-x-auto"><table className="w-full min-w-[700px] text-left text-sm"><thead><tr className="border-b border-line"><th className="p-3">Order</th><th className="p-3">Product / customer</th><th className="p-3">Expected amount</th><th className="p-3">Review / delivery</th><th className="p-3">Action</th></tr></thead><tbody>{result.rows.map(order => <tr className="border-b border-line" key={order.id}><td className="p-3">{order.order_number}</td><td className="p-3">{order.product_title}<br />{order.email}</td><td className="p-3">{formatMoney(Number(order.amount_minor))}</td><td className="p-3">{order.status.replaceAll("_", " ")}<br />{order.delivery_status}</td><td className="p-3"><Link className="underline" href={`/admin/orders/${order.id}`}>Review order</Link></td></tr>)}</tbody></table>{!result.rows.length ? <p className="mt-5">No orders have been recorded.</p> : null}</div>}
    <p className="mt-7 text-sm leading-7 text-muted">Historical receipt records are retained. Review and fulfil older orders using the documented legacy procedure; do not ask a customer to pay again to create a new record.</p>
  </div></section>;
}
