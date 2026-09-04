"use client";

import { asset } from "@/lib/base";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, banner, LAST_UPDATED } from "@/data/upgrade";
import { MenuIcon } from "./icons";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 w-full bg-white transition-all duration-300"
      style={{ boxShadow: scrolled ? "0 2px 8px rgba(0,0,0,0.08)" : "none" }}
    >
      {/* Parody / not-affiliated banner */}
      <div style={{ backgroundColor: "#c0392b" }}>
        <p className="pj-container py-1 text-center text-[11.5px] leading-[1.3] text-white sm:py-1.5 sm:text-[13px] sm:leading-[1.4]">
          {banner} <span style={{ whiteSpace: "nowrap", fontWeight: 800 }}>Last updated {LAST_UPDATED}.</span>
        </p>
      </div>

      <div className="pj-container flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center transition-all duration-300"
          style={{ paddingBlock: scrolled ? 12 : 24 }}
        >
          <span className="pj-stamp-wrap">
            <Image
              src={asset("/images/jupiter/logo.svg")}
              alt="Project Jupiter Together"
              width={300}
              height={72}
              priority
              className="transition-all duration-300"
              style={{ height: scrolled ? 48 : 60, width: "auto" }}
            />
            <span className="pj-stamp pj-stamp--force pj-stamp--overlay" style={{ fontSize: scrolled ? 15 : 19 }}>
              Force Upgrade
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[15px] font-semibold uppercase tracking-wide text-navy transition-colors hover:text-teal"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Menu"
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded text-navy lg:hidden"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <MenuIcon className="h-7 w-7" />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="border-t border-line bg-white lg:hidden">
          <div className="pj-container flex flex-col py-2">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="border-b border-line py-3 text-[15px] font-semibold uppercase tracking-wide text-navy"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
