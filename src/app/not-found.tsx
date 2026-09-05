import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/jupiter/SiteHeader";
import { SiteFooter } from "@/components/jupiter/SiteFooter";
import { Stamp } from "@/components/jupiter/Stamp";

export const metadata: Metadata = {
  title: "Page not found | Force Upgrade Project Jupiter",
};

const places = [
  { href: "/", label: "Home", note: "what the upgrade is" },
  { href: "/blueprint", label: "Blueprint", note: "the site plan and the five processes" },
  { href: "/science", label: "The Science", note: "how each part works" },
  { href: "/petition", label: "Petition", note: "add your name" },
  { href: "/sources", label: "Sources", note: "every document we cite" },
];

/** 404: drawn like the rest of the site. The desert-lot joke is the campaign's own; nothing here claims anything about the developers. */
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main>
        <section style={{ backgroundColor: "#003047" }}>
          <div className="pj-container py-16 text-center">
            <div className="text-[14px] font-black uppercase tracking-wide" style={{ color: "#fdb715" }}>Error 404</div>
            <h1 className="mt-2 font-black text-white" style={{ fontSize: "clamp(40px,8vw,72px)", lineHeight: 1 }}>
              <Stamp kind="force">OPEN DESERT</Stamp>
            </h1>
            <p className="mx-auto mt-5 max-w-[620px] text-gold" style={{ fontSize: 20, lineHeight: 1.45, fontWeight: 600 }}>
              There is nothing built at this address yet.
            </p>
            <p className="mx-auto mt-3 max-w-[560px]" style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.85)" }}>
              The page you asked for does not exist, or it moved. Everything on the site is one tap away below.
            </p>
            {/* A small empty lot, drawn the way the blueprint draws land. */}
            <svg viewBox="0 0 320 120" className="mx-auto mt-8 w-full max-w-[420px]" role="img" aria-label="An empty desert lot with a for-upgrade sign">
              <rect x="0" y="0" width="320" height="120" fill="#e8d9b8" rx="8" />
              {[
                [30, 30], [70, 84], [120, 50], [170, 92], [210, 36], [260, 70], [290, 100], [45, 105], [140, 20], [240, 104],
              ].map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r={2} fill="#8f7a4a" />
              ))}
              <polygon points="8,8 312,8 312,112 8,112" fill="none" stroke="#3c3c3c" strokeWidth={2} strokeDasharray="10 5" />
              <rect x="128" y="34" width="64" height="30" rx="3" fill="#ffffff" stroke="#c0392b" strokeWidth={2} />
              <text x="160" y="47" textAnchor="middle" fontSize="8" fontWeight={900} fill="#c0392b">FOR UPGRADE</text>
              <text x="160" y="58" textAnchor="middle" fontSize="7" fontWeight={700} fill="#003047">inquire within</text>
              <rect x="158" y="64" width="4" height="30" fill="#8a6a00" />
            </svg>
            <div className="mx-auto mt-8 grid max-w-[760px] grid-cols-1 gap-3 sm:grid-cols-2">
              {places.map((p) => (
                <Link key={p.href} href={p.href} className="rounded bg-white p-4 text-left shadow-md" style={{ borderLeft: "6px solid #2e8b57" }}>
                  <div className="font-black uppercase tracking-wide" style={{ fontSize: 15, color: "#003047" }}>{p.label} →</div>
                  <div className="mt-0.5" style={{ fontSize: 14, color: "#6b6b6b" }}>{p.note}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
