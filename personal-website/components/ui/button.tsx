import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

function buttonStyles(variant: Variant = "primary") {
  return cn(
    "inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-medium tracking-[0.08em] transition duration-300 ease-dignified",
    variant === "primary" &&
      "border-accent bg-accent text-white hover:-translate-y-0.5 hover:bg-[#2C3539]",
    variant === "secondary" &&
      "border-line bg-white text-text hover:-translate-y-0.5 hover:border-accent hover:bg-surface-strong",
    variant === "ghost" &&
      "border-transparent bg-transparent text-muted hover:bg-surface-strong hover:text-text"
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={cn(buttonStyles(variant), className)}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
}) {
  return (
    <button className={cn(buttonStyles(variant), className)} {...props}>
      {children}
    </button>
  );
}
