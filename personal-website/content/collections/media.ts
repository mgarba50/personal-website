import type { MediaCollection } from "@/lib/types";

export const mediaCollections: MediaCollection[] = [
  {
    title: "Executive portrait archive",
    slug: "executive-portrait-archive",
    type: "Portrait",
    date: "2026-01-12",
    description: "A curated headshot and editorial portrait set for institutional and media use.",
    cover: "/assets/musa-allama-executive-portrait.jpg",
    tags: ["Portrait", "Press", "Executive"]
  },
  {
    title: "Field systems and operations",
    slug: "field-systems-and-operations",
    type: "Project album",
    date: "2026-02-21",
    description: "Visual materials related to controlled agriculture, irrigation workflows, and operational oversight.",
    cover: "/assets/The-Climate-Resilent-Farmer.jpg",
    tags: ["Agro", "Operations", "Command"]
  },
  {
    title: "Recitations and studio readings",
    slug: "recitations-and-studio-readings",
    type: "Audio archive",
    date: "2026-03-06",
    description: "A vault-ready collection for recitations, readings, and related literary audio releases.",
    cover: "/assets/Diwan-Manazil-Noor.PNG",
    tags: ["Audio", "Poetry", "Studio"]
  }
];
