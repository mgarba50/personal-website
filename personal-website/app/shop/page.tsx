import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Shop", description: "Ready digital books and launch bundles.", path: "/shop" });
export default function ShopPage() { return <div className="px-5 py-16"><PageHero eyebrow="Shop" title="Ready Digital Books" copy="Phase 1 products and bundles." /><SectionHeading eyebrow="Ready" title="Products" /><div className="mt-6 grid gap-4 md:grid-cols-3">{[["The Modern Farmer","the-modern-farmer","₦3,500","₦5,000"],["Agrochemical Sales Field Guide","agrochemical-sales-field-guide","₦5,000","₦7,500"],["Chinese for Agrochemical Professionals","chinese-for-agrochemical-professionals","₦7,500","₦10,000"]].map(([title,slug,l,s])=><article key={slug} className="rounded-lg border p-4 bg-white"><h3>{title}</h3><p>Launch {l} · Standard {s}</p><Link href={`/checkout?type=book&slug=${slug}&provider=manual`}>Buy PDF</Link></article>)}</div></div>; }
