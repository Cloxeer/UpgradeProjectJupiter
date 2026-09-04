"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SideDrawer } from "@/components/site/SideDrawer";

const EASE = "cubic-bezier(0.46,0.01,0.32,1)";

/**
 * Mirrors the original's structure: `.main` (header + sections + footer) is
 * pushed right by 300px while the drawer is open; `.side-nav` sits outside it.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("ss-browsing", open);
    return () => document.body.classList.remove("ss-browsing");
  }, [open]);

  return (
    <>
      <div
        className="flex min-h-full flex-1 flex-col"
        style={{
          // Must be `none` (not translateX(0)) when closed — any transform
          // value would make this a containing block and break the fixed bar.
          transform: open ? "translateX(300px)" : "none",
          transition: `transform 0.45s ${EASE}`,
        }}
      >
        <Header onOpenMenu={() => setOpen(true)} />
        <main className="flex-1">
          <div className="ss-panel">{children}</div>
        </main>
        <Footer />
      </div>

      <SideDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
