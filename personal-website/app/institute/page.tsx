import { InstitutePortal } from "@/components/institute/institute-portal";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "The Allama Institute | Executive Learning Portal",
  description:
    "Executive-grade learning portal for agro-logistics, systems architecture, multilingual leadership, and sovereign strategic execution.",
  path: "/institute"
});

export default function InstitutePage() {
  return <InstitutePortal />;
}
