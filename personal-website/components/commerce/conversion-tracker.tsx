"use client";

import { useEffect } from "react";

export function ConversionTracker() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target.closest("[data-conversion]") : null;
      if (!target) return;

      const payload = {
        action: target.getAttribute("data-conversion"),
        label: target.getAttribute("data-conversion-label"),
        href: target.getAttribute("href"),
        path: window.location.pathname,
        timestamp: new Date().toISOString(),
      };

      const body = JSON.stringify(payload);
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/conversions", new Blob([body], { type: "application/json" }));
        return;
      }

      void fetch("/api/conversions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      });
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
