"use client";

import { asset } from "@/lib/base";

import { useState } from "react";
import { Cite } from "@/components/Cite";
import { useAudience } from "@/components/jupiter/Audience";
import { jupiterKid } from "@/data/blueprintVoices";

const YEARS = [2, 5, 10, 15, 20, 30] as const;

/** Two Jupiters: NASA's Great Red Spot for the plan as filed, our own drawing of a calm Jupiter for the upgrade. The storm grows with the year. */
export function JupiterStorm() {
  const [year, setYear] = useState<number>(5);
  const k = Math.min(1, (year - 2) / 28);
  const [audience] = useAudience();
  const isKid = audience === "kid";
  return (
    <section id="jupiter" className="scroll-mt-24" style={{ backgroundColor: "#0b1f2b" }}>
      <div className="pj-container py-12">
        <div className="mx-auto max-w-[1000px] text-center">
          <div className="text-[14px] font-black uppercase tracking-wide" style={{ color: "#fdb715" }}>A joke with a point · side by side</div>
          <h2 className="mt-1 font-black text-white text-[22px] sm:text-[26px]">The same site in {year} years: their plan vs. the upgrade</h2>
          <p className="mx-auto mt-2 max-w-[820px]" style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.8)" }}>
            {isKid ? jupiterKid.intro : "The real Jupiter has a storm bigger than Earth that has raged for centuries. Left: the project as filed, with its permitted plume growing every year it runs. Right: the same project upgraded. Satire, and our own drawing on the right; nobody is claiming anything about the planet."}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {YEARS.map((y) => (
              <button key={y} type="button" onClick={() => setYear(y)} aria-pressed={year === y} className="rounded px-3 py-1.5 text-[15px] font-black" style={{ backgroundColor: year === y ? "#fdb715" : "rgba(255,255,255,0.08)", color: year === y ? "#0b1f2b" : "#fff", border: "1px solid rgba(255,255,255,0.4)" }}>
                {y} yrs
              </button>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-6 grid max-w-[1000px] grid-cols-2 gap-3 md:gap-6">
          <figure className="rounded p-2 sm:p-4" style={{ backgroundColor: "rgba(0,0,0,0.3)", border: "2px solid #c0392b" }}>
            <div className="relative overflow-hidden rounded">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/images/refs/jupiter-great-red-spot.jpg")} alt="Jupiter's Great Red Spot, a storm larger than Earth, photographed by NASA's Juno spacecraft" className="w-full" loading="lazy" decoding="async" />
              <div className="pointer-events-none absolute inset-0 transition-opacity duration-500" style={{ background: `radial-gradient(ellipse at 45% 55%, rgba(120,20,10,${0.15 + k * 0.55}) ${20 + k * 25}%, rgba(40,10,5,${k * 0.35}) 80%)` }} aria-hidden />
              <div className="mt-1 inline-block rounded px-2 py-1 text-[13px] font-black uppercase sm:absolute sm:left-2 sm:top-2 sm:mt-0" style={{ backgroundColor: "#c0392b", color: "#fff" }}>If nothing changes</div>
            </div>
            <figcaption className="mt-3">
              <div className="font-black text-white text-[15px] sm:text-[20px]">Project Jupiter in {year} years, as filed</div>
              <div className="mt-1 text-[13px] sm:text-[15px]" style={{ lineHeight: 1.5, color: "rgba(255,255,255,0.85)" }}>
                {isKid ? jupiterKid.filed(year) : <>About {((10.144 * Math.max(0, year - 2))).toFixed(0)} million tons of CO₂ released by then at the permitted rate, over a county that already fails the smog standard<Cite ids={["sob", "sunland-park-ozone"]} />. The storm is the point.</>}
              </div>
              <div className="pj-adult mt-1 text-[13px]" style={{ color: "rgba(255,255,255,0.6)" }}>
                Image: NASA/JPL-Caltech/SwRI/MSSS, processing Kevin M. Gill (CC BY)<Cite ids={["photo-grs"]} />. Red tint added by us.
              </div>
            </figcaption>
          </figure>
          <figure className="rounded p-2 sm:p-4" style={{ backgroundColor: "rgba(0,0,0,0.3)", border: "2px solid #2e8b57" }}>
            <div className="relative overflow-hidden rounded">
              <svg viewBox="0 0 400 260" className="w-full" role="img" aria-label="A calm Jupiter without its storm, drawn as an illustration">
                <defs>
                  <radialGradient id="jup-shade" cx="35%" cy="35%" r="75%">
                    <stop offset="0%" stopColor="#f6e2c3" />
                    <stop offset="70%" stopColor="#c99a63" />
                    <stop offset="100%" stopColor="#6b4a2a" />
                  </radialGradient>
                  <clipPath id="jup-clip">
                    <circle cx="200" cy="110" r="100" />
                  </clipPath>
                </defs>
                <rect width="400" height="260" fill="#0b1f2b" />
                <circle cx="200" cy="110" r="100" fill="url(#jup-shade)" />
                <g clipPath="url(#jup-clip)" opacity="0.55">
                  {[25, 50, 75, 100, 125, 150, 175, 200].map((y, i) => (
                    <path key={y} d={`M80,${y} C150,${y - 6} 250,${y + 6} 320,${y}`} stroke={i % 2 ? "#a86f3b" : "#e8c79a"} strokeWidth={i % 3 === 0 ? 10 : 6} fill="none" />
                  ))}
                </g>
                <circle cx="200" cy="110" r="100" fill="none" stroke="#2e8b57" strokeWidth="3" />
                {Array.from({ length: Math.round(1 + k * 5) }).map((_, i) => (
                  <g key={i} transform={`translate(${60 + i * 56} 232)`}>
                    <path d="M0,10 L0,-4 L8,-10 L16,-4 L16,10 Z" fill="#d7f0dc" stroke="#1f5f3a" strokeWidth="1" />
                  </g>
                ))}
                <text x="200" y="252" textAnchor="middle" fontSize="10" fontWeight="800" fill="#2e8b57">NO STORM · OUR ILLUSTRATION · GREENHOUSES ADDED AS THE YEARS PASS</text>
              </svg>
              <div className="mt-1 inline-block rounded px-2 py-1 text-[13px] font-black uppercase sm:absolute sm:left-2 sm:top-2 sm:mt-0" style={{ backgroundColor: "#2e8b57", color: "#fff" }}>Upgraded</div>
            </div>
            <figcaption className="mt-3">
              <div className="font-black text-white text-[15px] sm:text-[20px]">Project Jupiter in {year} years, upgraded</div>
              <div className="mt-1 text-[13px] sm:text-[15px]" style={{ lineHeight: 1.5, color: "rgba(255,255,255,0.85)" }}>
                {isKid ? jupiterKid.upgraded(year) : <>Same halls, same fuel cells, same timeline; the CO₂ captured and used, the heat growing food, salty water made drinkable, gas hours falling every year, and every ton of smog on a public meter. About {(5 * 0.365 * Math.max(0, year - 2)).toFixed(0)} billion gallons of clean water delivered by then.</>}
              </div>
              <div className="pj-adult mt-1 text-[13px]" style={{ color: "rgba(255,255,255,0.6)" }}>Illustration, not a NASA image.</div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
