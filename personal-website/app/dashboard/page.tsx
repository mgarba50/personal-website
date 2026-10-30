import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { pageMetadata } from "@/lib/seo";
import { siteContact } from "@/lib/site-contact";
import { getCurrentUser } from "@/lib/auth";
import { signOut } from "@/app/auth/actions";
import { selectSupabaseRows } from "@/lib/supabase-rest";
import type { CommerceOrder } from "@/lib/commerce";
import { formatMoney } from "@/lib/checkout";
import { OrderDownloads } from "@/components/commerce/order-downloads";
export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "Access & Support",
  description: "Order support, course access, membership assistance, downloads, and client help for MusaAllama.com.",
  path: "/dashboard",
});

const accessRoutes = [
  {
    title: "Book Orders",
    copy: "Need help with a paid book, receipt confirmation, delivery, or a print-copy request?",
    href: siteContact.whatsappHref,
    label: "Contact order desk",
  },
  {
    title: "Courses",
    copy: "Browse available courses, join a waitlist, or ask about access to a program you have already enrolled in.",
    href: "/courses",
    label: "Open courses",
  },
  {
    title: "Membership",
    copy: "Review membership options, renew your circle, or ask about member benefits and access.",
    href: "/membership",
    label: "View membership",
  },
  {
    title: "Advisory",
    copy: "Follow up on a strategic session, request a new consultation, or ask about an existing engagement.",
    href: "/advisory",
    label: "Open advisory",
  },
  {
    title: "Media & Institutional Requests",
    copy: "Request official media materials, speaking information, or institutional documentation.",
    href: "/press",
    label: "Open media desk",
  },
  {
    title: "General Support",
    copy: "For anything else, contact the MusaAllama.com support desk directly and include your name and order or inquiry details.",
    href: siteContact.whatsappHref,
    label: "Contact support",
  },
];

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const orders = user ? await selectSupabaseRows<CommerceOrder>("commerce_orders", `user_id=eq.${user.id}&select=id,order_number,product_title,amount_minor,status,delivery_status,created_at&order=created_at.desc&limit=50`) : null;
  return (
    <>
      <PageHero
        eyebrow="Access & Support"
        title="Help with orders, courses, membership, and client access."
        copy="Use this desk to reach the right part of MusaAllama.com for delivery support, course access, membership, advisory, or general assistance."
        primaryCta={{ label: "Contact support", href: siteContact.whatsappHref, action: "send_inquiry" }}
        secondaryCta={{ label: "Browse books", href: "/books", action: "buy_book" }}
      />
      <section className="px-5 pt-12"><div className="mx-auto max-w-7xl rounded-lg border border-line bg-white p-7">
        <h2 className="display text-3xl font-semibold text-deep">Your account and orders</h2>
        {user ? <><p className="mt-3 text-sm">Signed in as {user.email}.</p><div className="mt-4 flex flex-wrap items-center gap-5"><form action={signOut}><button className="underline" type="submit">Sign out</button></form><Link className="underline" href="/account/password">Change password</Link>{user.role === "admin" ? <Link className="underline" href="/admin">Open order desk</Link> : null}</div>
          {orders?.ok ? <div className="mt-6 grid gap-4 md:grid-cols-2">{orders.rows.map(order => <article className="rounded-md border border-line p-5 text-sm leading-7" key={order.id}><h2 className="font-semibold">{order.product_title}</h2><p>{order.order_number} · {formatMoney(Number(order.amount_minor))}</p><p>{order.status.replaceAll("_", " ")}</p>{order.status === "payment_approved" ? <OrderDownloads orderId={order.id} /> : null}</article>)}{!orders.rows.length ? <p>No account-associated orders are listed. For an older or guest order, contact support with your reference.</p> : null}</div> : <p role="status" className="mt-5">Your order history is temporarily unavailable. Please use the support desk below.</p>}
        </> : <p className="mt-4 text-sm leading-7"><Link className="underline" href="/login">Sign in</Link> or <Link className="underline" href="/signup">create an account</Link> to view orders placed while signed in. Guest and older orders can be supported through the desk below.</p>}
      </div></section>


      <section className="px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-lg border border-line bg-deep p-7 text-vellum">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Existing customers</p>
            <h2 className="display mt-3 text-3xl font-semibold">Need access to something you already purchased?</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-vellum/72">
              Contact support with your name, order number or payment reference, and the product or service you purchased. The team will verify the order and assist with the correct access or next step.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {accessRoutes.map((item) => (
              <article className="flex h-full flex-col rounded-lg border border-line bg-white/80 p-6" key={item.title}>
                <h3 className="display text-3xl font-semibold text-deep">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">{item.copy}</p>
                <Link
                  className="mt-auto pt-6 text-sm font-semibold uppercase tracking-[0.14em] text-burgundy hover:text-deep"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
