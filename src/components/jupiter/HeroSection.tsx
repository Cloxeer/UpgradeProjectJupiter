"use client";

import { asset } from "@/lib/base";
import { heroBullets as theirBullets } from "@/data/jupiter";
import { Stamp } from "./Stamp";
import { TheySay } from "./TheySay";
import { useCopy } from "./AudienceText";
import { useAudience } from "./Audience";
import { statIcons } from "./icons";
import { Notice } from "./Notice";
import { useOpenOne } from "./OpenOne";

function Bullets({ items }: { items: { strong: string; rest: string }[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((b, i) => (
        <li key={i} className="flex items-start gap-3 text-white">
          <span className="mt-2 block flex-shrink-0 rounded-full" style={{ width: 8, height: 8, backgroundColor: "#219ebc" }} />
          <span style={{ fontSize: 17, lineHeight: 1.55 }}>
            {b.strong && <strong className="font-bold">{b.strong}</strong>}
            {b.rest}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * The first screen. One sentence, one button, three numbers. Everything else is one tap away.
 */
export function HeroSection() {
  const copy = useCopy();
  const [audience] = useAudience();
  const kid = audience === "kid";
  const [more, setMore, moreRef] = useOpenOne<HTMLDivElement>("hero-more");
  return (
    <section className="relative bg-cover bg-center" style={{ backgroundImage: `url('${asset("/images/jupiter/hero.jpg")}')` }}>
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,48,71,0.62)" }} />

      <div className="pj-container relative pt-8 pb-6 md:pt-12 md:pb-8">
        <div className="mx-auto max-w-[820px] text-center">
          <p className="mb-2 text-[13px] font-black uppercase tracking-wide" style={{ color: "#fdb715" }}>
            A citizen proposal · not the company&apos;s site
          </p>
          <h1 className="font-black text-white" style={{ fontSize: "clamp(40px,6.5vw,64px)", lineHeight: 1, fontWeight: 900 }}>
            <Stamp kind="force">PROJECT JUPITER</Stamp>
          </h1>
          <p key={audience} className="pj-fade mx-auto mt-5 max-w-[720px] font-semibold text-white" style={{ fontSize: "clamp(19px,2.2vw,24px)", lineHeight: 1.35 }}>
            {copy.heroLine}
          </p>
          <a href="/petition" className="mt-6 inline-flex min-h-[56px] items-center justify-center rounded px-10 text-[18px] font-black uppercase tracking-wide text-white" style={{ backgroundColor: "#2e8b57" }}>
            Sign the petition
          </a>
        </div>

        {/* Three numbers: air, water, food (or this reader's three). */}
        <div key={`tiles-${audience}`} className="pj-fade mx-auto mt-7 grid max-w-[900px] grid-cols-3 gap-2 sm:gap-4">
          {copy.heroStats.map((s) => {
            const Icon = statIcons[s.icon];
            return (
              <div key={s.label} className="flex flex-col items-center rounded bg-white px-2 py-4 text-center shadow-md sm:px-4 sm:py-5">
                <div className="flex items-center justify-center rounded-full text-white" style={{ width: 56, height: 56, backgroundColor: s.color }}>
                  <Icon style={{ width: 32, height: 32 }} />
                </div>
                <div className="mt-2 font-black" style={{ fontSize: "clamp(22px,3.6vw,44px)", lineHeight: 1.05, color: s.color }}>{s.value}</div>
                <div className="mt-1 font-bold" style={{ fontSize: "clamp(13px,1.3vw,16px)", lineHeight: 1.25, color: "#003047" }}>{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* The longer version, one tap away: this reader's points and the company's own words. */}
        <div ref={moreRef} className="mx-auto mt-4 max-w-[820px] scroll-mt-32 text-center">
          <button type="button" onClick={() => setMore(!more)} aria-expanded={more} className="min-h-[44px] rounded px-5 text-[14px] font-bold" style={{ color: "#fdb715", border: "1px solid rgba(253,183,21,0.6)" }}>
            {more ? "Less ▲" : kid ? "Why these three? ▼" : "Why these three, and what the company says ▼"}
          </button>
          {more && (
            <div className="pj-reveal mt-3 text-left">
              <h2 className="font-bold text-white" style={{ fontSize: 20, lineHeight: 1.25 }}>{copy.heroQuestion}</h2>
              <Bullets items={copy.heroBullets} />
              <TheySay dark>
                <p className="font-semibold text-gold" style={{ fontSize: 18, lineHeight: 1.4 }}>
                  $4.7 billion in economic benefits, thousands of jobs, less water, and cleaner energy for New Mexico.
                </p>
                <h3 className="mt-6 font-bold text-white" style={{ fontSize: 18 }}>WHAT DOES PROJECT JUPITER MEAN FOR NEW MEXICO?</h3>
                <Bullets items={theirBullets} />
              </TheySay>
            </div>
          )}
        </div>
      </div>
      <div className="relative" style={{ backgroundColor: "rgba(0,0,0,0.25)" }}>
        <Notice dark />
      </div>
    </section>
  );
}
