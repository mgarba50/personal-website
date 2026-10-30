"use client";
import { useEffect, useState, type FormEvent } from "react";
type Order = { id: string; orderNumber: string; title: string; type: string; slug: string; amount: string; status: string; deliveryStatus: string };
type Props = { title: string; productType: string; slug: string; amount: string; requestKey: string; bank: { accountName: string; accountNumber: string; bank: string; notice: string } };

export function ManualPaymentForm({ title, productType, slug, amount, requestKey, bank }: Props) {
  const [order, setOrder] = useState<Order | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [resuming, setResuming] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/orders", { cache: "no-store", signal: controller.signal }).then(r => r.json()).then(data => {
      if (data.ok && data.order?.slug === slug && data.order?.type === productType) setOrder(data.order);
    }).catch(() => {}).finally(() => { if (!controller.signal.aborted) setResuming(false); });
    return () => controller.abort();
  }, [productType, slug]);

  async function createOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: productType, slug, requestKey, name: form.get("name"), email: form.get("email"), phone: form.get("phone") }) });
      const data = await response.json();
      if (response.ok && data.ok && data.order?.id) setOrder(data.order);
      else setMessage(data.message || "The order could not be created. Please contact support before making a transfer.");
    } catch { setMessage("The order could not be created. Please retry before making a transfer."); }
    finally { setBusy(false); }
  }

  async function submitReceipt(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage("");
    const data = new FormData(event.currentTarget);
    const file = data.get("receipt");
    if (!(file instanceof File) || file.size > 4 * 1024 * 1024) { setMessage("Choose a receipt no larger than 4 MB."); setBusy(false); return; }
    try {
      const response = await fetch("/api/manual-payment", { method: "POST", body: data });
      const result = await response.json();
      setMessage(result.message || "Please check the order status.");
      if (response.ok && result.ok && result.order) {
        setOrder(result.order);
        const payload = JSON.stringify({ action: "payment_proof_submitted", label: title, path: window.location.pathname, timestamp: new Date().toISOString() });
        navigator.sendBeacon?.("/api/conversions", new Blob([payload], { type: "application/json" }));
      }
    } catch { setMessage("The receipt could not be confirmed. Refresh to check the order status before submitting again."); }
    finally { setBusy(false); }
  }

  return <div className="rounded-lg border border-line bg-white/90 p-7">
    {resuming ? <p role="status">Checking your current order...</p> : !order ? <>
      <h2 className="display text-3xl font-semibold text-deep">Create your order</h2>
      <p className="mt-3 text-sm leading-7 text-muted">{title} · {amount}. Your bank details and order reference appear after this step succeeds.</p>
      <form onSubmit={createOrder} className="mt-6 grid gap-4">
        <label className="grid gap-2 text-sm font-semibold">Full name<input className="field rounded-md" name="name" autoComplete="name" minLength={2} maxLength={100} required /></label>
        <label className="grid gap-2 text-sm font-semibold">Delivery email<input className="field rounded-md" name="email" type="email" autoComplete="email" maxLength={254} required /></label>
        <label className="grid gap-2 text-sm font-semibold">Phone / WhatsApp<input className="field rounded-md" name="phone" type="tel" autoComplete="tel" minLength={5} maxLength={50} required /></label>
        <p className="text-sm leading-6 text-muted">If you are signed in, delivery uses your verified account email.</p>
        <button disabled={busy} className="sa-button sa-button--gold disabled:opacity-60" type="submit">{busy ? "Creating order..." : "Create order"}</button>
      </form>
    </> : <>
      <h2 className="display text-3xl font-semibold text-deep">{order.title}</h2>
      <p className="mt-4 break-words text-sm leading-7"><strong>Order:</strong> {order.orderNumber}<br /><strong>Amount:</strong> {order.amount}<br /><strong>Status:</strong> {order.status.replaceAll("_", " ")}</p>
      {order.status === "pending_payment" ? <>
        <div className="mt-5 rounded-md border border-line bg-vellum p-5 text-sm leading-7"><p><strong>Account name:</strong> {bank.accountName}</p><p><strong>Account number:</strong> {bank.accountNumber}</p><p><strong>Bank:</strong> {bank.bank}</p><p className="mt-3">Use {order.orderNumber} as your transfer narration.</p><p>{bank.notice}</p></div>
        <form onSubmit={submitReceipt} className="mt-6 grid gap-4" encType="multipart/form-data">
          <label className="grid gap-2 text-sm font-semibold">Bank transaction reference<input className="field rounded-md" name="reference" maxLength={200} required /></label>
          <label className="grid gap-2 text-sm font-semibold">Amount transferred (NGN)<input className="field rounded-md" name="amountPaid" inputMode="decimal" placeholder="For example, 3500" maxLength={40} required /></label>
          <label className="grid gap-2 text-sm font-semibold">Receipt (PDF, JPEG, PNG or WebP; 4 MB maximum)<input className="field rounded-md" name="receipt" type="file" accept="application/pdf,image/jpeg,image/png,image/webp" required /></label>
          <label className="grid gap-2 text-sm font-semibold">Notes (optional)<textarea className="field min-h-24 rounded-md" name="notes" maxLength={2000} /></label>
          <button disabled={busy} className="sa-button sa-button--gold disabled:opacity-60" type="submit">{busy ? "Submitting receipt..." : "Submit for verification"}</button>
        </form>
      </> : <p className="mt-5 text-sm leading-7 text-muted">{order.status === "payment_approved" ? order.deliveryStatus === "sent" ? "Your payment is approved and the delivery email was accepted by the sender. Check your inbox and spam folder." : "Your payment is approved. Please contact the order desk for delivery assistance." : order.status === "payment_submitted" ? "Your receipt is pending review against the bank transaction. Keep this order number and do not transfer again." : "Please contact the order desk before making another transfer."}</p>}
    </>}
    {message ? <p role="status" className="mt-5 rounded-md bg-vellum p-4 text-sm leading-7 text-deep">{message}</p> : null}
  </div>;
}
