"use client";

import { useState } from "react";
import Link from "next/link";
import { navItems } from "@/data/sophia";

const EASE = "cubic-bezier(0.46,0.01,0.32,1)";

export function SideDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="fixed inset-0 z-[350] cursor-default bg-transparent"
        />
      )}
      <div
        aria-label="Primary"
        aria-hidden={!open}
        className="fixed top-0 z-[400] h-screen w-[300px] overflow-y-auto p-[30px]"
        style={{
          left: "-300px",
          backgroundColor: "#ae7e79",
          transform: open ? "translateX(300px)" : "translateX(0)",
          transition: `transform 0.45s ${EASE}`,
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          tabIndex={open ? 0 : -1}
          className="absolute left-[30px] top-[17px] text-white"
        >
          <CloseIcon />
        </button>

        <ul className="mt-[62px]">
          {navItems.map((item) => (
            <li key={item.label}>
              {item.children ? (
                <>
                  <button
                    type="button"
                    tabIndex={open ? 0 : -1}
                    aria-expanded={expanded === item.label}
                    onClick={() =>
                      setExpanded((v) => (v === item.label ? null : item.label))
                    }
                    className="block py-[10px] text-left font-[family-name:var(--font-fraunces)] text-[34px] font-normal leading-none text-white"
                  >
                    {item.label} <span className="align-middle">+</span>
                  </button>
                  {expanded === item.label && (
                    <ul className="pb-2 pl-3">
                      {item.children.map((c) => (
                        <li key={c.label}>
                          <Link
                            href={c.href}
                            onClick={onClose}
                            tabIndex={open ? 0 : -1}
                            className="block py-[6px] font-[family-name:var(--font-fraunces)] text-[20px] font-light text-white/90 hover:text-white"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  tabIndex={open ? 0 : -1}
                  className="block py-[10px] font-[family-name:var(--font-fraunces)] text-[34px] font-normal leading-none text-white"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
          <li>
            <a
              href="https://sourdoughsophia.co.uk/account"
              tabIndex={open ? 0 : -1}
              className="block py-[10px] font-[family-name:var(--font-fraunces)] text-[34px] font-normal leading-none text-white"
            >
              Sign In
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

function CloseIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="5" y1="5" x2="23" y2="23" />
        <line x1="23" y1="5" x2="5" y2="23" />
      </g>
    </svg>
  );
}
