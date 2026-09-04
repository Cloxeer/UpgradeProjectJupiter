"use client";

import { useState } from "react";
import { citeNumber, sourceById } from "@/data/sources";
import type { SourcePage } from "@/data/sourceMap";

const icons: Record<string, string> = { Home: "🏠", Blueprint: "📐", Science: "🔬", Legislators: "🏛️", Petition: "✍️", FAQ: "❓" };

export function SourceBrowser({ pages }: { pages: SourcePage[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const page = pages.find((p) => p.title === open) ?? null;
  const count = (p: SourcePage) => new Set(p.sections.flatMap((s) => s.ids)).size;

  return (
    <div className="mx-auto max-w-[1000px]">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {pages.map((p) => {
          const on = open === p.title;
          return (
            <button key={p.title} type="button" onClick={() => setOpen(on ? null : p.title)} aria-expanded={on} className="flex aspect-square flex-col items-center justify-center rounded p-3 text-center shadow-sm transition-transform hover:-translate-y-0.5" style={{ backgroundColor: on ? "#003047" : "#fff", color: on ? "#fff" : "#003047", border: `2px solid ${on ? "#c0392b" : "#e0e0e0"}` }}>
              <div style={{ fontSize: 34 }} aria-hidden>{icons[p.title] ?? "📄"}</div>
              <div className="mt-2 font-black" style={{ fontSize: 17, lineHeight: 1.1 }}>{p.title} page</div>
              <div className="mt-1 text-[13px]" style={{ opacity: 0.8 }}>{count(p)} documents</div>
              <div className="mt-1 text-[13px] font-bold" style={{ color: on ? "#fdb715" : "#c0392b" }}>{on ? "close ▲" : "see sources ▼"}</div>
            </button>
          );
        })}
      </div>

      {page && (
        <div className="mt-5 rounded bg-white p-5 shadow-sm" style={{ borderTop: "6px solid #c0392b" }} role="region" aria-live="polite">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-black" style={{ fontSize: 22, color: "#003047" }}>
              {page.title} <span style={{ fontWeight: 500, color: "#6b6b6b", fontSize: 17 }}>· {page.blurb}</span>
            </h3>
            <a href={page.href} className="text-[15px] font-bold underline" style={{ color: "#15768c" }}>open the page →</a>
          </div>
          {page.sections.length === 0 && <p className="mt-3" style={{ fontSize: 16, color: "#6b6b6b" }}>This page repeats numbers from the Home page and cites nothing new; see the Home page square.</p>}
          <div className="mt-4 space-y-4">
            {page.sections.map((sec) => (
              <div key={sec.title}>
                <div className="text-[13px] font-black uppercase tracking-wide" style={{ color: "#c0392b" }}>{sec.title}</div>
                <ul className="mt-1 space-y-1">
                  {sec.ids.map((id) => {
                    const s = sourceById[id];
                    if (!s) return null;
                    return (
                      <li key={id} style={{ fontSize: 16, lineHeight: 1.5 }}>
                        <span className="font-black" style={{ color: "#c0392b" }}>[{citeNumber(id)}]</span>{" "}
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-bold underline" style={{ color: "#003047" }}>{s.title}</a>
                        <span style={{ color: "#6b6b6b" }}> · {s.publisher}, {s.date}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
