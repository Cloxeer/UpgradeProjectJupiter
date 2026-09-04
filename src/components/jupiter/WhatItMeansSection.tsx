"use client";

import { SectionHeading } from "./SectionHeading";
import { TheySay } from "./TheySay";
import { willList as theirWill, willNotList as theirWillNot } from "@/data/jupiter";
import { useCopy } from "./AudienceText";
import { CheckIcon, TimesIcon } from "./icons";

function List({
  title,
  items,
  variant,
}: {
  title: string;
  items: string[];
  variant: "will" | "willnot";
}) {
  const Icon = variant === "will" ? CheckIcon : TimesIcon;
  const color = variant === "will" ? "#15768c" : "#c0392b";
  return (
    <div>
      <h3 className="mb-5 font-bold" style={{ fontSize: 22, color: "#3c3c3c" }}>
        {title}
      </h3>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <Icon style={{ width: 16, height: 16, color, flexShrink: 0, marginTop: 4 }} />
            <span style={{ fontSize: 16, lineHeight: "23.1px", color: "#3c3c3c" }}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function WhatItMeansSection() {
  const copy = useCopy();
  return (
    <section>
      <SectionHeading stamp="upgrade">WHAT PROJECT JUPITER MEANS</SectionHeading>
      <div className="pj-container pb-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <List title={copy.willTitle} items={copy.willList} variant="will" />
          <List title={copy.willNotTitle} items={copy.willNotList} variant="willnot" />
        </div>
        <TheySay>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
            <List title="WILL:" items={theirWill} variant="will" />
            <List title="WILL NOT:" items={theirWillNot} variant="willnot" />
          </div>
        </TheySay>
      </div>
    </section>
  );
}
