"use client";

import { useEffect } from "react";
import { useAudience } from "./Audience";
import { BASE_PATH } from "@/lib/base";

/**
 * Mirrors the chosen audience onto <html data-audience="…"> so page-wide CSS (e.g. hiding grown-up captions for kids) can use it.
 * When the site is hosted under a sub-folder (GitHub Pages), it also re-points plain root links ("/petition") that were
 * rendered on the client, which the static export cannot prefix ahead of time.
 */
export function AudienceFlag() {
  const [audience] = useAudience();
  useEffect(() => {
    document.documentElement.dataset.audience = audience;
  }, [audience]);
  useEffect(() => {
    if (!BASE_PATH) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("/") && !href.startsWith("//") && !href.startsWith(BASE_PATH + "/") && href !== BASE_PATH) {
        e.preventDefault();
        window.location.href = BASE_PATH + href;
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
