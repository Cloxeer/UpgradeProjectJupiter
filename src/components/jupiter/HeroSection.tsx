"use client";

import { asset } from "@/lib/base";

import { heroBullets as theirBullets } from "@/data/jupiter";
import { heroSubhead } from "@/data/upgrade";
import { Stamp } from "./Stamp";
import { TheySay } from "./TheySay";
import { AudienceText, useCopy } from "./AudienceText";

function Bullets({ items }: { items: { strong: string; rest: string }[] }) {
  return (
    <ul className="mt-6 space-y-4">
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

      <div className="pj-container relative py-16 md:py-20">
        <div className="max-w-[680px]">
          <h1
            className="font-black text-white"
            style={{ fontSize: "clamp(40px,7vw,60px)", lineHeight: 1, fontWeight: 900 }}
          >
            <Stamp kind="force">PROJECT JUPITER</Stamp>
          </h1>
          <p
            className="mt-4 font-semibold text-gold"
            style={{ fontSize: 26, lineHeight: "30px", fontWeight: 600 }}
          >
            <AudienceText field="heroSubhead" fallback={heroSubhead} />
          </p>

          <h2
            className="mt-10 font-bold text-white"
            style={{ fontSize: 26, lineHeight: "30px", fontWeight: 700 }}
          >
            {copy.heroQuestion}
          </h2>

          <Bullets items={copy.heroBullets} />

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
      </div>
    </section>
  );
}
