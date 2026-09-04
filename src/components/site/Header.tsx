"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navItems } from "@/data/sophia";

const EASE = "cubic-bezier(0.46,0.01,0.32,1)";

export function Header({ onOpenMenu }: { onOpenMenu: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 0);
      setSolid(y >= 50);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Flow header: big centred logo + inline nav (desktop only) */}
      <header className="relative z-[5]">
        <div className="flex justify-center pt-[17px]">
          <Link href="/" aria-label="Sourdough Sophia">
            <Image
              src="/images/sophia/logo.png"
              alt="Sourdough Sophia"
              width={160}
              height={146}
              priority
              unoptimized
              className="h-[146px] w-[160px]"
            />
          </Link>
        </div>

        <nav
          aria-label="Primary"
          className="hidden md:flex items-start justify-center px-[30px] pb-[30px] pt-[8px] mt-[17px]"
          style={{
            opacity: scrolled ? 0 : 1,
            transition: `opacity 0.35s ${EASE}`,
            pointerEvents: scrolled ? "none" : "auto",
          }}
        >
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="ss-navlink">
              {item.label}
              {item.children ? " +" : ""}
            </Link>
          ))}
        </nav>
      </header>

      {/* Fixed bar: hamburger · shrunk logo · account/cart */}
      <div
        className="fixed inset-x-0 top-0 z-[100] flex items-center px-[30px] py-[17px]"
        style={{
          backgroundColor: solid ? "#ffffff" : "transparent",
          // 125.25px once solid so the shrunken logo fits (matches the original)
          minHeight: solid ? "125.25px" : "64px",
          transition: `background-color 0.35s ${EASE}, min-height 0.35s ${EASE}`,
        }}
      >
        <button
          type="button"
          aria-label="MENU"
          onClick={onOpenMenu}
          className="text-ink transition-opacity hover:opacity-70"
        >
          <HamburgerIcon />
        </button>

        <Link
          href="/"
          aria-label="Sourdough Sophia"
          aria-hidden={!solid}
          tabIndex={solid ? 0 : -1}
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            opacity: solid ? 1 : 0,
            pointerEvents: solid ? "auto" : "none",
            transition: `opacity 0.35s ${EASE}`,
          }}
        >
          <Image
            src="/images/sophia/logo.png"
            alt="Sourdough Sophia"
            width={100}
            height={91}
            unoptimized
            className="h-[91px] w-[100px]"
          />
        </Link>

        <div className="ml-auto flex items-center gap-[14px]">
          <a
            href="https://sourdoughsophia.co.uk/account"
            aria-label="Sign In"
            className="hidden text-ink transition-opacity hover:opacity-70 md:block"
          >
            <UserIcon />
          </a>
          <Link
            href="/cart"
            aria-label="Cart"
            className="text-ink transition-opacity hover:opacity-70"
          >
            <CartIcon />
          </Link>
        </div>
      </div>
    </>
  );
}

/* --- 30px icons, matching the original's icon font --- */

function HamburgerIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="square">
        <line x1="3" y1="9" x2="27" y2="9" />
        <line x1="3" y1="15" x2="27" y2="15" />
        <line x1="3" y1="21" x2="27" y2="21" />
      </g>
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.6" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M4.8 20c0-3.6 3.2-6 7.2-6s7.2 2.4 7.2 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3.5 5h2.2l2 10.2h9.6l2-7.4H7.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.4" cy="19" r="1.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16.6" cy="19" r="1.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
