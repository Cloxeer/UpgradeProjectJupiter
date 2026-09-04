"use client";

import { useEffect, useRef, useState } from "react";
import { updatesLead as theirLead, vimeoId, progress } from "@/data/jupiter";
import { Stamp } from "./Stamp";
import { TheySay } from "./TheySay";
import { Cite, SourceList } from "@/components/Cite";
import { useCopy } from "./AudienceText";

const tracker = [
  { label: "Upgrade conditions adopted into the county lease", value: "0 of 5", state: "bad" as const, note: "Capture before power-on, one permit with PSD-level controls, heat offered to growers, NMSU water plant funded, bonds tied to verified jobs.", sources: ["cba"] },
  { label: "Air permit 10883", value: "Stayed", state: "bad" as const, note: "The New Mexico Supreme Court stayed the proceeding on Aug. 24, 2026 and on Sept. 1 unanimously refused to partially lift the stay. The Sept. 14 hearing is off.", sources: ["nmpr-stay", "abq-stay", "notice"] },
  { label: "Construction water well", value: "Stayed", state: "bad" as const, note: "Emergency authorization halted by the Supreme Court after more than 103 million gallons were pumped between April and August 2026.", sources: ["cbd-well", "nmpr-stay"] },
  { label: "Gas pipeline route", value: "Denied twice", state: "bad" as const, note: "State Land Office denied the state-land segment in March and again on July 14, 2026; a federal-land route is now being sought.", sources: ["slo", "energyconnects"] },
  { label: "Quarterly job reports to the county", value: "Missed", state: "bad" as const, note: "The county reported the developers missed required employment-report deadlines under the tax-rebate agreement.", sources: ["abq-reports"] },
  { label: "Construction progress (their figure)", value: "9%", state: "neutral" as const, note: "2,755 workers to date, 2.1 million hours, as of their July 28, 2026 presentation to the county.", sources: ["bocc"] },
];

export function UpdatesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const copy = useCopy();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section style={{ backgroundColor: "#003047" }}>
      <div className="pj-container py-12">
        <div className="pj-heading mb-10">
          <h2 style={{ color: "#ffffff" }}>
            <Stamp kind="upgrade">PROJECT JUPITER</Stamp> UPDATES
          </h2>
        </div>

        <p className="mx-auto mb-8 max-w-[900px] text-center" style={{ fontSize: 18, lineHeight: 1.6, color: "#ffffff" }}>
          {copy.updatesLead}
          <Cite ids={["bocc", "nmpr-stay"]} />
        </p>

        {/* Our tracker */}
        <div ref={ref} className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-center text-[14px] font-bold uppercase tracking-wide" style={{ color: "#fdb715" }}>
            Upgrade status, as of Sept. 2, 2026 · click a row for the source
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {tracker.map((t, i) => (
              <button
                key={t.label}
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="rounded p-4 text-left transition-transform duration-500"
                style={{ backgroundColor: "rgba(255,255,255,0.06)", border: `1px solid ${t.state === "bad" ? "#e74c3c" : "#fdb715"}`, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)" }}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-semibold" style={{ fontSize: 16, color: "#ffffff" }}>{t.label}</div>
                  <div className="font-black" style={{ fontSize: 20, color: t.state === "bad" ? "#e74c3c" : "#fdb715" }}>{t.value}</div>
                </div>
                {open === i && (
                  <div className="mt-2" style={{ fontSize: 15, lineHeight: 1.55, color: "rgba(255,255,255,0.85)" }}>
                    {t.note}
                    <SourceList ids={t.sources} dark />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Theirs, in the standard compare panel: their lead, their video, their three bars */}
        <div className="mx-auto max-w-[900px]">
          <TheySay dark label="What Project Jupiter Together actually says">
            <p style={{ fontSize: 18, lineHeight: 1.6 }}>{theirLead}</p>
            <div className="mt-4 relative w-full overflow-hidden rounded" style={{ paddingTop: "56.25%" }}>
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://player.vimeo.com/video/${vimeoId}?loop=1&muted=1&title=0&portrait=0&byline=0`}
                title="Project Jupiter update video"
                allow="fullscreen; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <p className="mt-2 text-center" style={{ fontSize: 14, opacity: 0.7 }}>Their promotional video, unchanged.</p>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              {progress.map((p) => (
                <div key={p.label}>
                  <div className="mb-2 text-center font-bold uppercase" style={{ fontSize: 15, letterSpacing: 1 }}>{p.label}</div>
                  <div className="h-3 w-full overflow-hidden rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                    <div className="h-full rounded-full" style={{ width: `${p.pct}%`, backgroundColor: "#fdb715" }} />
                  </div>
                  <div className="mt-1 text-right font-semibold" style={{ fontSize: 14, color: "#fdb715" }}>{p.pct}%</div>
                </div>
              ))}
            </div>
          </TheySay>
        </div>
      </div>
    </section>
  );
}
