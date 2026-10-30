"use client";
import { useState } from "react";
export function OrderDownloads({ orderId }: { orderId: string }) {
  const [links, setLinks] = useState<{ title: string; href: string }[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function requestLinks() {
    setBusy(true); setMessage(""); setLinks([]);
    try {
      const response = await fetch(`/api/customer/orders/${orderId}/downloads`, { method: "POST" });
      const data = await response.json();
      if (response.ok && data.ok) setLinks(data.links);
      else setMessage(data.message || "Please contact support for access.");
    } catch { setMessage("Links could not be requested. Please retry or contact support."); }
    finally { setBusy(false); }
  }
  return <div className="mt-4"><button className="underline disabled:opacity-50" disabled={busy} onClick={requestLinks} type="button">{busy ? "Preparing links..." : "Get fresh download links"}</button>{links.length ? <ul className="mt-3 space-y-3">{links.map(link => <li key={link.title}><a className="underline" href={link.href} referrerPolicy="no-referrer">Download {link.title.replaceAll("-", " ")}</a></li>)}</ul> : null}{message ? <p role="status" className="mt-3">{message}</p> : null}</div>;
}
