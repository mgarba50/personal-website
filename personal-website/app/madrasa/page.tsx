import { InstitutePortal } from "@/components/institute/institute-portal";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "The Madrasa | Executive Learning Portal",
  description:
    "Executive-grade learning portal for agro-logistics, systems architecture, multilingual leadership, and sovereign strategic execution.",
  path: "/madrasa"
});

export default function MadrasaPage() {
  return <InstitutePortal initialView="dashboard" />;
}
