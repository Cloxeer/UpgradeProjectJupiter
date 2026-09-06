"use client";

import { asset } from "@/lib/base";

import { AudiencePicker, useAudience, audienceMeta, type Audience } from "./Audience";
import { audiencePanels } from "@/data/audience";
import { SourceList } from "@/components/Cite";

/** Photo cards per audience: a picture and one line each, so the panel is visual first. */
const visuals: Record<Audience, { src: string; title: string; line: string; href: string }[]> = {
  overall: [
    { src: asset("/images/refs/filter-backwash.jpg"), title: "Air you can check", line: "the CO₂ caught and used; every stack on a public meter", href: "/blueprint#p2" },
    { src: asset("/images/refs/reverse-osmosis-bedok.jpg"), title: "Water given back", line: "5 million gallons a day made from salty groundwater", href: "/blueprint#p3" },
    { src: asset("/images/refs/hydroponic-tomato-greenhouse.jpg"), title: "Heat that feeds people", line: "~60 million lbs of food a year on the computers' warmth", href: "/blueprint#p5" },
    { src: asset("/images/refs/el-cabo-wind-nm.jpg"), title: "Less gas every year", line: "hot rock and New Mexico wind take over the hours", href: "/blueprint#p4" },
  ],
  expert: [],
  legislator: [
    { src: asset("/images/refs/reverse-osmosis-bedok.jpg"), title: "Water plant, already designed", line: "5 MGD to CRRUA · $269M, NMSU 2023", href: "/blueprint#p3" },
    { src: asset("/images/refs/lightning-dock-geothermal.jpg"), title: "Geothermal, already in New Mexico", line: "Lightning Dock, 11 MW · rift heat under this county", href: "/blueprint#p4" },
    { src: asset("/images/refs/hydroponic-tomato-greenhouse.jpg"), title: "Jobs that stay", line: "~3,000 permanent, written into the lease", href: "/blueprint#p5" },
    { src: asset("/images/refs/co2-compressor-boundary-dam.jpg"), title: "Capture on day one", line: "exhaust is ~95% CO₂ per NMED", href: "/blueprint#p2" },
  ],
  homeowner: [
    { src: asset("/images/refs/water-main-trench.jpg"), title: "More water in your pipes", line: "5 million gallons a day added to CRRUA", href: "/blueprint#p3" },
    { src: asset("/images/refs/hydroponic-tomato-greenhouse.jpg"), title: "Food grown next door", line: "~60 million lbs a year, pesticide-free", href: "/blueprint#p5" },
    { src: asset("/images/refs/el-cabo-wind-nm.jpg"), title: "Less gas, less smog", line: "wind and hot rock replace gas hours", href: "/blueprint#p4" },
    { src: asset("/images/refs/filter-backwash.jpg"), title: "Air you can check", line: "every stack monitored, readings public", href: "/blueprint#p2" },
  ],
  business: [
    { src: asset("/images/refs/hydroponic-tomato-greenhouse.jpg"), title: "150 acres to lease", line: "~$130k/acre/yr lease + heat (estimate)", href: "/blueprint#p5" },
    { src: asset("/images/refs/reverse-osmosis-bedok.jpg"), title: "Water to sell", line: "utility demand 6 → 15 MGD by 2042", href: "/blueprint#p3" },
    { src: asset("/images/refs/santa-teresa-construction-yard.jpg"), title: "CO₂ to sell", line: "concrete and aggregate buyers, not a well", href: "/blueprint#p2" },
    { src: asset("/images/refs/lightning-dock-geothermal.jpg"), title: "Gas to buy less of", line: "geothermal + wind under contract", href: "/blueprint#p4" },
  ],
  kid: [
    { src: asset("/images/refs/hydroponic-tomato-greenhouse.jpg"), title: "Tomatoes from computer heat", line: "the hot water warms the plants", href: "/blueprint#p5" },
    { src: asset("/images/refs/alamogordo-water-tower.jpg"), title: "Clean water from salty water", line: "enough for 16,700 homes a day", href: "/blueprint#p3" },
    { src: asset("/images/refs/el-cabo-wind-nm.jpg"), title: "Wind instead of gas", line: "the biggest wind farm in America is in New Mexico", href: "/blueprint#p4" },
    { src: asset("/images/refs/bloom-energy-servers.jpg"), title: "Catch the gas", line: "a box catches what the machines breathe out", href: "/blueprint#p2" },
  ],
};

export function WhoAreYou() {
  const [audience] = useAudience();
  const panel = audiencePanels[audience];
  const pics = visuals[audience];
  const simple = audience === "kid" || audience === "homeowner";

  return (
    <section id="who" className="scroll-mt-32" style={{ backgroundColor: "#ffffff" }}>
      <div className="pj-container py-12">
        <div className="mx-auto max-w-[1000px]">
          <div className="text-center">
            <div className="text-[14px] font-black uppercase tracking-wide" style={{ color: "#2e8b57" }}>Who are you?</div>
            <h2 className="mt-1 font-black" style={{ fontSize: 26, color: "#003047" }}>Pick who you are and every page rewrites itself for you</h2>
            <p className="mx-auto mt-2 max-w-[760px]" style={{ fontSize: 16, lineHeight: 1.6, color: "#6b6b6b" }}>
              Same facts, same sources, different words. &ldquo;Earth&rdquo; is where everyone starts: what this does to our air, water, land and people. &ldquo;Expert&rdquo; shows every number, unit and source.
            </p>
          </div>
          <div className="mt-6">
            <AudiencePicker revealSelector="#who-result" />
          </div>
          <p id="who-result" className="pj-fade mt-3 scroll-mt-32 text-center font-bold" key={`result-${audience}`} style={{ fontSize: 17, color: "#1f5f3a" }}>
            ✓ The whole site is now written for: {audienceMeta[audience].label}. Scroll down; every section speaks to you.
          </p>

          {audience !== "expert" && (
            <div key={`panel-${audience}`} className="pj-fade mt-5 rounded bg-white p-5 shadow-sm" style={{ borderTop: "6px solid #2e8b57" }} role="region" aria-live="polite">
              <h3 className="font-black" style={{ fontSize: simple ? 26 : 22, color: "#003047" }}>{panel.title}</h3>
              <p className="mt-2" style={{ fontSize: simple ? 17 : 15, lineHeight: 1.65, color: "#3c3c3c" }}>{panel.intro}</p>

              {/* pictures first */}
              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                {pics.map((p) => (
                  <a key={p.title} href={p.href} className="group overflow-hidden rounded shadow-sm hover:shadow-md" style={{ border: "1px solid #e0e0e0" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.src} alt={p.title} className="h-28 w-full object-cover transition-transform group-hover:scale-105 sm:h-32" loading="lazy" decoding="async" />
                    <div className="p-2">
                      <div className="font-black" style={{ fontSize: simple ? 15 : 13, lineHeight: 1.2, color: "#003047" }}>{p.title}</div>
                      <div className="mt-0.5" style={{ fontSize: simple ? 13 : 11, lineHeight: 1.3, color: "#6b6b6b" }}>{p.line}</div>
                    </div>
                  </a>
                ))}
              </div>

              <ul className={`mt-4 ${simple ? "space-y-3" : "space-y-2"}`}>
                {(simple ? panel.bullets.slice(0, 4) : panel.bullets).map((b) => (
                  <li key={b.text.slice(0, 30)} className="flex gap-2" style={{ fontSize: simple ? 16 : 14, lineHeight: 1.6, color: "#3c3c3c" }}>
                    <span style={{ color: "#2e8b57", fontWeight: 900 }}>✓</span>
                    <span>{b.text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {panel.links.map((l) => (
                  <a key={l.href} href={l.href} className="rounded px-4 py-2 text-[15px] font-bold text-white" style={{ backgroundColor: "#2e8b57" }}>
                    {l.label} →
                  </a>
                ))}
              </div>
              {!simple && <SourceList ids={Array.from(new Set(panel.bullets.flatMap((b) => b.sources)))} />}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
