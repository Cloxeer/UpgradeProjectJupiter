"use client";

import { asset } from "@/lib/base";
import { Cite } from "@/components/Cite";
import { useAudience } from "@/components/jupiter/Audience";

/**
 * Why the name: the real Jupiter has a storm bigger than Earth. Their plan is the storm; ours is the calm planet.
 * One picture each, one line each, no controls. The numbers live in the cards below this.
 */
export function JupiterStorm() {
  const [audience] = useAudience();
  const isKid = audience === "kid";
  return (
    <section id="jupiter" className="scroll-mt-24" style={{ backgroundColor: "#0b1f2b" }}>
      <div className="pj-container py-8">
        <div className="mx-auto grid max-w-[1000px] items-center gap-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-8">
          <div className="text-center md:text-left">
            <div className="text-[13px] font-black uppercase tracking-wide" style={{ color: "#fdb715" }}>Why the name</div>
            <h2 className="mt-1 font-black text-white" style={{ fontSize: "clamp(22px,2.6vw,30px)", lineHeight: 1.15 }}>
              {isKid ? "Their Jupiter has a storm. Ours does not." : "Their Jupiter has a storm. Ours doesn't."}
            </h2>
            <p className="mt-2" style={{ fontSize: 16, lineHeight: 1.55, color: "rgba(255,255,255,0.85)" }}>
              {isKid
                ? "The real planet Jupiter has a giant storm on it. Their plan breathes out gas every year, like the storm. Our plan catches it, so the planet stays calm. It is a joke, but the numbers below are real."
                : <>The project is named after a planet with a storm bigger than Earth. As filed, this campus would add about 10 million tons of CO₂ a year over a valley that already fails the smog standard<Cite ids={["sob", "sunland-park-ozone"]} />. Upgraded, the same campus catches it. The drawings below show how.</>}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <figure className="overflow-hidden rounded" style={{ border: "2px solid #c0392b" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/images/refs/jupiter-great-red-spot.jpg")} alt="Jupiter's Great Red Spot, a storm larger than Earth, photographed by NASA's Juno spacecraft" className="aspect-[4/3] w-full object-cover" style={{ objectPosition: "74% 50%" }} loading="lazy" decoding="async" />
              <figcaption className="px-2 py-1.5 text-center text-[13px] font-black uppercase" style={{ backgroundColor: "#c0392b", color: "#fff" }}>As filed</figcaption>
            </figure>
            <figure className="overflow-hidden rounded" style={{ border: "2px solid #2e8b57" }}>
              <svg viewBox="0 0 400 300" className="aspect-[4/3] w-full" role="img" aria-label="A calm Jupiter without its storm, drawn as an illustration">
                <defs>
                  <radialGradient id="jup-shade" cx="35%" cy="35%" r="75%">
                    <stop offset="0%" stopColor="#f6e2c3" />
                    <stop offset="70%" stopColor="#c99a63" />
                    <stop offset="100%" stopColor="#6b4a2a" />
                  </radialGradient>
                  <clipPath id="jup-clip">
                    <circle cx="200" cy="150" r="118" />
                  </clipPath>
                </defs>
                <rect width="400" height="300" fill="#0b1f2b" />
                <circle cx="200" cy="150" r="118" fill="url(#jup-shade)" />
                <g clipPath="url(#jup-clip)" opacity="0.55">
                  {[50, 78, 106, 134, 162, 190, 218, 246].map((y, i) => (
                    <path key={y} d={`M60,${y} C150,${y - 7} 250,${y + 7} 340,${y}`} stroke={i % 2 ? "#a86f3b" : "#e8c79a"} strokeWidth={i % 3 === 0 ? 12 : 7} fill="none" />
                  ))}
                </g>
              </svg>
              <figcaption className="px-2 py-1.5 text-center text-[13px] font-black uppercase" style={{ backgroundColor: "#2e8b57", color: "#fff" }}>Upgraded</figcaption>
            </figure>
          </div>
        </div>
        <p className="pj-adult mx-auto mt-3 max-w-[1000px] text-center text-[12px] md:text-left" style={{ color: "rgba(255,255,255,0.5)" }}>
          Left: NASA/JPL-Caltech/SwRI/MSSS, processing Kevin M. Gill (CC BY)<Cite ids={["photo-grs"]} />. Right: our illustration. Satire; nobody is claiming anything about the planet.
        </p>
      </div>
    </section>
  );
}
