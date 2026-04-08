"use client";

import { useState } from "react";
import Link from "next/link";
import { primaryNavigation } from "@/content/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="rounded-full border border-line px-4 py-2 text-sm uppercase tracking-[0.16em] text-text"
        aria-expanded={open}
        aria-label="Toggle navigation"
      >
        Menu
      </button>
      {open ? (
        <div className="absolute left-4 right-4 top-20 z-50 rounded-[28px] border border-line bg-surface p-4 shadow-card">
          <nav className="grid gap-2">
            {primaryNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm text-text transition hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
