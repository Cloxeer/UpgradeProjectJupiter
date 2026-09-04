"use client";

import { ctaText } from "@/data/upgrade";
import { Stamp } from "./Stamp";
import { TheySay } from "./TheySay";
import { useCopy } from "./AudienceText";

export function CtaBar() {
  const copy = useCopy();
  return (
    <div className="w-full bg-gold">
      <div className="pj-container py-2 text-center">
        <p style={{ fontSize: 20, lineHeight: "33px", color: "#ffffff" }}>
          <strong className="font-bold">
            {ctaText.before}
            <a href="/petition" className="inline py-2.5 underline">
              {ctaText.link}
            </a>
            {copy.ctaAfter.replace("Project Jupiter", "")}
            <Stamp kind="force">Project Jupiter</Stamp>
          </strong>
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
