"use client";

import { asset } from "@/lib/base";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/data/upgrade";
import { MenuIcon } from "./icons";

/** The two pages the nav keeps underlined so readers know where to look. */
const KEY_PAGES = new Set(["/blueprint", "/petition"]);

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // The page you are on keeps its yellow line in place (no hover needed).
  const pathname = usePathname() ?? "/";
  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));

  // Full-screen menu: lock the page behind it and close on Escape.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

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
        <nav className="pj-nav hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`pj-nav__link text-[15px] font-semibold uppercase tracking-wide text-navy ${KEY_PAGES.has(item.href) ? "pj-nav__link--key" : ""} ${isCurrent(item.href) ? "pj-nav__link--current" : ""}`}
              aria-current={isCurrent(item.href) ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Menu"}
          aria-expanded={mobileOpen}
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded text-navy lg:hidden"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <span style={{ fontSize: 28, lineHeight: 1 }}>×</span> : <MenuIcon className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile menu: the whole page goes white, and the options arrive one after another. */}
      {mobileOpen && (
        <nav className="pj-menu fixed inset-0 z-[95] flex flex-col bg-white lg:hidden" aria-label="Site menu">
          <div className="pj-container flex items-center justify-between" style={{ paddingBlock: 12 }}>
            <a href="/petition" onClick={() => setMobileOpen(false)} className="min-h-[44px] inline-flex items-center text-[13px] font-black uppercase tracking-wide" style={{ color: "#c0392b" }}>
              Force Upgrade Project Jupiter → sign the petition
            </a>
            <button type="button" aria-label="Close menu" onClick={() => setMobileOpen(false)} className="-mr-2 flex h-11 w-11 items-center justify-center rounded text-navy" style={{ fontSize: 30, lineHeight: 1 }}>
              ×
            </button>
          </div>
          <div className="pj-nav flex flex-1 flex-col items-center justify-center gap-1 px-6 pb-16">
            {nav.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                className={`pj-menu__item pj-nav__link flex min-h-[52px] items-center justify-center text-[22px] font-black uppercase tracking-wide text-navy ${KEY_PAGES.has(item.href) ? "pj-nav__link--key" : ""} ${isCurrent(item.href) ? "pj-nav__link--current" : ""}`}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                style={{ animationDelay: `${0.2 * i}s` }}
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
