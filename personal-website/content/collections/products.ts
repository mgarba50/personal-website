import type { Product } from "@/lib/types";

export const products: Product[] = [
  {
    name: "Premium Operational Frameworks",
    slug: "premium-operational-frameworks",
    type: "Premium digital PDF",
    description: "Institutional frameworks covering systems design, executive routing, and operational clarity.",
    price: "$95",
    accessMethod: "Protected download after payment",
    cover: "/assets/Engineering-the-journey.JPG",
    featured: true
  },
  {
    name: "Executive Strategy Dossier",
    slug: "executive-strategy-dossier",
    type: "Premium digital PDF",
    description: "A premium dossier for executives needing structured language for clarity, influence, and decision architecture.",
    price: "$140",
    accessMethod: "Secure digital fulfillment",
    cover: "/assets/book-the-strategist-of-power.png",
    featured: true
  },
  {
    name: "Executive Certificate Seat",
    slug: "executive-certificate-seat",
    type: "Certification",
    description: "Priority seat allocation for certificate-based education programs under The Madrasa.",
    price: "Application-based pricing",
    accessMethod: "Qualification and payment approval",
    cover: "/assets/knowledge-is-the-seed.jpg",
    featured: false
  },
  {
    name: "Institutional Direct Order",
    slug: "institutional-direct-order",
    type: "Institutional order",
    description: "Bulk or direct-order corridor for institutions requesting books, dossiers, certifications, or private educational deployments.",
    price: "Quoted on request",
    accessMethod: "Invoice or manual corporate transfer",
    cover: "/assets/collection-of-books-featured.png",
    featured: false
  }
];
