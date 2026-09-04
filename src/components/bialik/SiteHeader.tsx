"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "About", href: "https://www.bialikbreakdown.com/about" },
  { label: "Episodes", href: "https://www.bialikbreakdown.com/episodes" },
  { label: "Articles", href: "https://www.bialikbreakdown.com/articles" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative z-30 w-full">
      <div className="bb-container flex items-center justify-between py-[15px]">
        <Link href="/" className="block shrink-0">
          <Image
            src="/images/bialik/logo.png"
            alt="Mayim Bialik's Breakdown"
            width={190}
            height={132}
            priority
            className="h-auto w-[150px] md:w-[190px]"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex lg:gap-9">
          {navLinks.map((l) => (
            <Link key={l.label} href={l.href} className="bb-navlink">
              {l.label}
            </Link>
          ))}
          <a
            href="https://shop.bialikbreakdown.com/"
            className="bb-btn-shop"
            target="_blank"
            rel="noreferrer"
          >
            Shop
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-[6px] md:hidden"
        >
          <span className="block h-[3px] w-[26px] bg-ink" />
          <span className="block h-[3px] w-[26px] bg-ink" />
          <span className="block h-[3px] w-[26px] bg-ink" />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="bg-cream md:hidden">
          <div className="flex flex-col items-start gap-4 px-5 pb-6 pt-2">
            {navLinks.map((l) => (
              <Link key={l.label} href={l.href} className="bb-navlink">
                {l.label}
              </Link>
            ))}
            <a
              href="https://shop.bialikbreakdown.com/"
              className="bb-btn-shop"
              target="_blank"
              rel="noreferrer"
            >
              Shop
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
