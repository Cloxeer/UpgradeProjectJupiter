"use client";

import { Stamp } from "./Stamp";
import { TheySay } from "./TheySay";
import { useCopy } from "./AudienceText";

export function CtaBar() {
  const copy = useCopy();
  return (
    <div className="w-full bg-gold">
      <div className="pj-container py-2 text-center">
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 py-1" style={{ fontSize: 19, lineHeight: 1.3, color: "#ffffff" }}>
          <a href="/petition" className="inline-flex min-h-[44px] items-center rounded px-6 font-black uppercase tracking-wide text-white" style={{ backgroundColor: "#2e8b57", fontSize: 15 }}>
            Sign the petition
          </a>
          <strong className="font-bold">
            {copy.ctaAfter.replace("Project Jupiter", "").trim()} <Stamp kind="force">Project Jupiter</Stamp>
          </strong>
          <a href="#support" className="text-[15px] font-bold underline" style={{ color: "#003047" }}>
            See the six demands
          </a>
        </p>
        <TheySay className="!mt-1 mb-2" label="Their version of this bar">
          <p className="text-center font-bold" style={{ fontSize: 18, color: "#3c3c3c" }}>
            Click <span className="underline">HERE</span> To Show Your Support for Project Jupiter
          </p>
          <p className="mt-1 text-center" style={{ fontSize: 14, color: "#6b6b6b" }}>
            Their link opens an Oracle-funded Quorum advocacy form. Ours opens a petition to force the
            upgrade.
          </p>
        </TheySay>
      </div>
    </div>
  );
}
