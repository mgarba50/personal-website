"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { ConversionTracker } from "@/components/commerce/conversion-tracker";
import { isPrivateSurface } from "@/lib/private-surfaces";

export function PublicIntegrations() {
  const pathname = usePathname();
  const privatePage = isPrivateSurface(pathname || "/");
  useEffect(() => {
    if (privatePage) return;
    // A full document navigation clears already-loaded public chat code before
    // an account, receipt, order or staff page can render private information.
    const enterPrivate = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target === "_blank") return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin === window.location.origin && isPrivateSurface(url.pathname)) {
        event.preventDefault(); event.stopPropagation(); window.location.assign(url.href);
      }
    };
    document.addEventListener("click", enterPrivate, true);
    return () => document.removeEventListener("click", enterPrivate, true);
  }, [privatePage]);
  if (privatePage) return null;
  return <><ConversionTracker /><Script id="tawk-live-chat" strategy="afterInteractive">{`
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/6ae0c14aef4a433475174dc9/1k5uv633d";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();
  `}</Script></>;
}
