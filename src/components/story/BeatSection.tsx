"use client";

import { useEffect, useRef } from "react";

/**
 * One section of the story. Reveals once (fade and a short lift) when it first enters the viewport.
 * Sections already on screen at load render at rest; nothing is parked invisible. The reveal is a DOM
 * class swap driven by IntersectionObserver, so React never re-renders for it.
 */
export function BeatSection({ id, children, className = "", style, tone = "light" }: { id?: string; children: React.ReactNode; className?: string; style?: React.CSSProperties; tone?: "light" | "paper" | "navy" }) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return; // on screen now: stay at rest
    el.classList.add("pj-beat--hidden");
    const show = () => {
      el.classList.remove("pj-beat--hidden");
      el.classList.add("pj-beat--in");
      io.disconnect();
      window.clearTimeout(fallback);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) show();
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    // Safety net: a section is never left invisible if the observer is late or never fires.
    const fallback = window.setTimeout(show, 1000);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);
  const bg = tone === "navy" ? "#003047" : tone === "paper" ? "#f6f8f8" : "#ffffff";
  return (
    <section ref={ref} id={id} className={`pj-beat ${className}`} style={{ backgroundColor: bg, ...style }}>
      {children}
    </section>
  );
}
