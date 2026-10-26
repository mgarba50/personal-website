import { academyBundles, academyProducts } from "@/content/academy";
import { advisoryServices, courses, membershipTiers } from "@/lib/content";
import { blockedPublicationSlugs } from "@/lib/publication-authority";

export type CheckoutProduct = { title: string; amount: string; purchasable: boolean; reason?: string };

export function canPurchaseBook(book: (typeof academyProducts)[number]) {
  return Boolean(book.purchasable && book.releaseStatus === "available" && book.launchPrice && !blockedPublicationSlugs.has(book.slug));
}

export function findCheckoutProduct(type?: string, slug?: string): CheckoutProduct {
  if (type === "book") {
    const book = academyProducts.find((item) => item.slug === slug);
    if (book) return { title: book.title, amount: book.launchPrice ?? book.priceLabel ?? "Not open for payment", purchasable: canPurchaseBook(book), reason: "This edition is not currently open for payment." };
  }
  if (type === "bundle") {
    const bundle = academyBundles.find((item) => item.slug === slug);
    if (bundle) return { title: bundle.title, amount: bundle.launchPrice, purchasable: bundle.purchasable && bundle.includes.every((title) => {
      const book = academyProducts.find((item) => item.title === title);
      return !book || canPurchaseBook(book);
    }) };
  }
  if (type === "course") {
    const course = courses.find((item) => item.slug === slug);
    if (course) return { title: course.title, amount: course.price, purchasable: true };
  }
  if (type === "advisory") {
    const service = advisoryServices.find((item) => item.slug === slug);
    if (service) return { title: service.shortTitle, amount: service.price, purchasable: true };
  }
  if (type === "membership") {
    const tier = membershipTiers.find((item) => item.slug === slug);
    if (tier) return { title: tier.title, amount: tier.price, purchasable: true };
  }
  return { title: "Selected product", amount: "Not open for payment", purchasable: false, reason: "Select a registered product before transferring funds." };
}
