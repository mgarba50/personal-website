"use client";

import type { ReactNode } from "react";

export function MobileNavigation({ children }: { children: ReactNode }) {
  return (
    <details className="sa-mobile-nav" onClick={(event) => {
      // The shared layout survives client navigation, so close after choosing a link.
      if ((event.target as Element).closest("a")) event.currentTarget.open = false;
    }}>
      {children}
    </details>
  );
}
