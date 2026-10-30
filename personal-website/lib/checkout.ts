import { academyBundles, academyProducts } from "@/content/academy";
import { blockedPublicationSlugs } from "@/lib/publication-authority";
import manifest from "@/secure-download-manifest.json";

export type CheckoutProduct = { title: string; amount: string; amountMinor: number; currency: "NGN"; purchasable: boolean; fulfilmentSlugs: string[]; reason?: string };

export function canPurchaseBook(book: (typeof academyProducts)[number]) {
  return Boolean(book.purchasable && book.releaseStatus === "available" && book.launchPrice && !blockedPublicationSlugs.has(book.slug));
}

export function moneyMinor(value: string) {
  const cleaned = value.replace(/^NGN\s*/i, "").replaceAll(",", "");
  if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) return null;
  const amount = Math.round(Number(cleaned) * 100);
  return Number.isSafeInteger(amount) && amount > 0 && amount <= 100_000_000_00 ? amount : null;
}
export function formatMoney(minor: number) { return `NGN ${(minor / 100).toLocaleString("en-NG", { maximumFractionDigits: 2 })}`; }
export function deliveryFile(slug: string) {
  const path = (manifest.products as Record<string, string>)[slug];
  return path && !path.includes("..") && path.endsWith(".pdf") ? path : null;
}
export function findCheckoutProduct(type?: string, slug?: string): CheckoutProduct {
  const unavailable: CheckoutProduct = { title: "Selected product", amount: "Not open for payment", amountMinor: 0, currency: "NGN", purchasable: false, fulfilmentSlugs: [], reason: "This offer is not open for payment. Please contact the desk about availability." };
  if (type === "book") {
    const book = academyProducts.find((item) => item.slug === slug);
    if (!book) return unavailable;
    const minor = moneyMinor(book.launchPrice || "");
    return { ...unavailable, title: book.title, amount: book.launchPrice || book.priceLabel || unavailable.amount, amountMinor: minor || 0, purchasable: canPurchaseBook(book) && Boolean(minor && deliveryFile(book.slug)), fulfilmentSlugs: [book.slug] };
  }
  if (type === "bundle") {
    const bundle = academyBundles.find((item) => item.slug === slug);
    if (bundle) return { ...unavailable, title: bundle.title, amount: bundle.launchPrice, reason: "Please enquire about this bundle while its complete book and bonus delivery package is prepared." };
  }
  return unavailable;
}
