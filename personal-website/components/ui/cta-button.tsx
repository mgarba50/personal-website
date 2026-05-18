import Link from "next/link";

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light";
};

export function CtaButton({ href, children, variant = "primary" }: CtaButtonProps) {
  const styles = {
    primary:
      "border border-gold bg-gold px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-deep transition hover:bg-transparent hover:text-gold",
    secondary:
      "border border-gold/60 px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold transition hover:bg-gold hover:text-deep",
    light:
      "border border-deep/20 bg-deep px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-vellum transition hover:bg-navy",
  };

  return (
    <Link className={`inline-flex items-center justify-center rounded-md ${styles[variant]}`} href={href}>
      {children}
    </Link>
  );
}
