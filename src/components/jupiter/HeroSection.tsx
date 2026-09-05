"use client";

import { asset } from "@/lib/base";

import { heroBullets as theirBullets } from "@/data/jupiter";
import { heroSubhead } from "@/data/upgrade";
import { Stamp } from "./Stamp";
import { TheySay } from "./TheySay";
import { AudienceText, useCopy } from "./AudienceText";
import { SupportCard } from "./SupportCard";

function Bullets({ items }: { items: { strong: string; rest: string }[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((b, i) => (
        <li key={i} className="flex items-start gap-3 text-white">
          <span
            className="mt-2 block flex-shrink-0 rounded-full"
            style={{ width: 8, height: 8, backgroundColor: "#219ebc" }}
          />
          <span style={{ fontSize: 16, lineHeight: 1.6 }}>
            {b.strong && <strong className="font-bold">{b.strong}</strong>}
            {b.rest}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function HeroSection() {
  const copy = useCopy();
  return (
    <section
      className="relative bg-cover bg-center"
      style={{ backgroundImage: `url('${asset("/images/jupiter/hero.jpg")}')` }}
    >
      {/* Navy tint overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,48,71,0.55)" }} />

      <div className="pj-container relative py-12 md:py-16 lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-10">
        <div className="max-w-[680px]">
          <p className="mb-2 text-[13px] font-black uppercase tracking-wide" style={{ color: "#fdb715" }}>
            A citizen upgrade proposal, not the company&apos;s site
          </p>
          <h1
            className="font-black text-white"
            style={{ fontSize: "clamp(40px,7vw,60px)", lineHeight: 1, fontWeight: 900 }}
          >
            <Stamp kind="force">PROJECT JUPITER</Stamp>
          </h1>
          <p
            className="mt-4 font-semibold text-gold"
            style={{ fontSize: "clamp(20px,2.4vw,26px)", lineHeight: 1.2, fontWeight: 600 }}
          >
            <AudienceText field="heroSubhead" fallback={heroSubhead} />
          </p>

          <h2
            className="mt-8 font-bold text-white"
            style={{ fontSize: 22, lineHeight: 1.25, fontWeight: 700 }}
          >
            {copy.heroQuestion}
          </h2>

          {/* Three points and the closing line. The rest of each list lives in the highlights and the persona panel. */}
          <Bullets items={[...copy.heroBullets.slice(0, 3), copy.heroBullets[copy.heroBullets.length - 1]]} />

          <TheySay dark>
            <p className="font-semibold text-gold" style={{ fontSize: 18, lineHeight: 1.4 }}>
              $4.7 billion in economic benefits, thousands of jobs, less water, and cleaner energy for
              New Mexico.
            </p>
            <h3 className="mt-6 font-bold text-white" style={{ fontSize: 18 }}>
              WHAT DOES PROJECT JUPITER MEAN FOR NEW MEXICO?
            </h3>
            <Bullets items={theirBullets} />
          </TheySay>
        </div>
        <div id="support-hero" className="mt-8 scroll-mt-32 lg:mt-0">
          <SupportCard />
        </div>
      </div>
    </section>
  );
}
