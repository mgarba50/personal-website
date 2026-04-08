import { cn } from "@/lib/utils";

export function Card({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <article
      className={cn(
        "rounded-[28px] border border-line bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 shadow-card backdrop-blur",
        className
      )}
    >
      {children}
    </article>
  );
}

export function CardEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs uppercase tracking-[0.28em] text-accent">{children}</p>;
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-4 font-serif text-2xl text-text">{children}</h3>;
}
