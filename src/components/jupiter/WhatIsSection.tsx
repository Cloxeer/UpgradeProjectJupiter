"use client";

import { SectionHeading } from "./SectionHeading";
import { TheySay } from "./TheySay";
import { whatIsParagraphs as theirParagraphs } from "@/data/jupiter";
import { AudienceText, useCopy } from "./AudienceText";

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-5">
      {items.map((p, i) => (
        <p key={i} style={{ fontSize: 16, lineHeight: "23.1px" }}>
          {p}
        </p>
      ))}
    </div>
  );
}

export function WhatIsSection() {
  const copy = useCopy();
  return (
    <section>
      <SectionHeading stamp="upgrade">WHAT IS PROJECT JUPITER?</SectionHeading>
      <div className="pj-container pb-12">
        <div className="mx-auto max-w-[900px]" style={{ color: "#3c3c3c" }}>
          <p className="mb-5 font-semibold" style={{ fontSize: 18, lineHeight: 1.6, color: "#1f5f3a" }}>
            <AudienceText field="whatIsIntro" fallback={null} />
          </p>
          <Paragraphs items={copy.whatIsParagraphs} />
          <TheySay>
            <Paragraphs items={theirParagraphs} />
          </TheySay>
        </div>
      </div>
    </section>
  );
}
