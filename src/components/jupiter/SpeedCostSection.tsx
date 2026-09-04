"use client";

import { SectionHeading } from "./SectionHeading";
import { speedRows } from "@/data/upgrade";
import { zones, TOTAL_ACRES } from "@/data/blueprint";
import { AudienceText, useCopy } from "./AudienceText";

export function SpeedCostSection() {
  const copy = useCopy();
  const theirs = zones.filter((z) => z.plan === "both");
  const ours = zones.filter((z) => z.plan === "ours");
  return (
    <section id="speed" style={{ backgroundColor: "#fafafa" }}>
      <SectionHeading stamp="force">HOW FAST, HOW CHEAP</SectionHeading>
      <div className="pj-container pb-16">
        <p
          className="mx-auto mb-8 max-w-[900px] text-center font-semibold"
          style={{ fontSize: 18, lineHeight: 1.5, color: "#003047" }}
        >
          <AudienceText
            field="speedIntro"
            fallback="Same land. Same buildings. Same timeline. About 1.5% more money. Everything below is built on top of the plan they already filed, not instead of it."
          />
        </p>

        <div className="w-full overflow-x-auto">
          <table className="pj-table pj-table--compare">
            <thead>
              <tr>
                <th></th>
                <th>Their plan</th>
                <th>Force-upgraded plan</th>
              </tr>
            </thead>
            <tbody>
              {speedRows.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  <td>{r.theirs}</td>
                  <td className="pj-cell-ours">{r.ours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* acre budget */}
        <h3 className="mb-4 mt-14 text-center font-bold" style={{ fontSize: 22, color: "#003047" }}>
          The Same Site
        </h3>
        <p className="mx-auto mb-6 max-w-[800px] text-center" style={{ fontSize: 16, lineHeight: 1.6 }}>
          Every building on their render stays where it is. The signed agreement describes about 819 acres with a 400-acre first phase; new zones would use unbuilt acres, to be confirmed from the developers&apos; site plan.
        </p>
        <div className="mx-auto max-w-[1000px]">
          <div className="flex h-16 w-full overflow-hidden rounded shadow-sm sm:h-20">
            {zones.map((z) => (
              <div
                key={z.id}
                className="flex items-center justify-center px-1 text-center text-white"
                style={{ width: `${(z.acres / TOTAL_ACRES) * 100}%`, backgroundColor: z.color, opacity: z.plan === "both" ? 0.8 : 1 }}
                title={`${z.name} — ${z.acres} acres`}
              >
                <span className="font-black" style={{ fontSize: z.acres >= 60 ? 14 : 10 }}>{z.acres}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <div className="mb-2 text-[13px] font-bold uppercase" style={{ color: "#6b6b6b" }}>
                Theirs · {theirs.reduce((s, z) => s + z.acres, 0)} acres
              </div>
              <ul className="space-y-1" style={{ fontSize: 15, color: "#3c3c3c" }}>
                {theirs.map((z) => (
                  <li key={z.id} className="flex items-center gap-2">
                    <span className="inline-block h-3 w-3 flex-shrink-0 rounded-sm" style={{ backgroundColor: z.color }} />
                    {z.name} <span style={{ color: "#6b6b6b" }}>· {z.acres} ac</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-2 text-[13px] font-bold uppercase" style={{ color: "#c0392b" }}>
                Proposed, on unbuilt acres · {ours.reduce((s, z) => s + z.acres, 0)} acres
              </div>
              <ul className="space-y-1" style={{ fontSize: 15, color: "#3c3c3c" }}>
                {ours.map((z) => (
                  <li key={z.id} className="flex items-center gap-2">
                    <span className="inline-block h-3 w-3 flex-shrink-0 rounded-sm" style={{ backgroundColor: z.color }} />
                    {z.name} <span style={{ color: "#6b6b6b" }}>· {z.acres} ac</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-5 text-center">
            <a href="/blueprint" className="inline-block rounded px-6 py-3 font-bold uppercase text-white" style={{ backgroundColor: "#2e8b57", fontSize: 15, letterSpacing: 1 }}>
              Open the interactive blueprint
            </a>
          </p>
        </div>

        {/* Three audiences */}
        <div className="mx-auto mt-14 grid max-w-[1100px] grid-cols-1 gap-6 md:grid-cols-3">
          {copy.pitches.map((p) => (
            <div key={p.title} className="rounded border-t-4 bg-white p-6 shadow-sm" style={{ borderColor: "#2e8b57" }}>
              <h4 className="mb-3 font-bold" style={{ fontSize: 18, color: "#003047" }}>{p.title}</h4>
              <p style={{ fontSize: 16, lineHeight: "23.1px", color: "#3c3c3c" }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
