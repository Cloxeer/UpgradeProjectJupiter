"use client";

import { useAudience, type Audience } from "@/components/jupiter/Audience";
import { usePlanMode } from "@/components/blueprint/PlanMode";
import { heroVoice, costVoice } from "@/data/blueprintVoices";

const fields = { heroSub: heroVoice.sub, heroGuide: heroVoice.guide, cost: costVoice } as const;

/** A block of Blueprint text in the current audience's voice. */
export function VoiceText({ field }: { field: keyof typeof fields }) {
  const [a] = useAudience();
  const v = fields[field];
  return <>{v[a] ?? v.overall}</>;
}

/** The hero sentence: their plan as filed in theirs mode, otherwise the audience's voice. */
export function HeroSub() {
  const [mode] = usePlanMode();
  if (mode === "theirs") return <>Their buildings, their fence, their site, as filed. Switch to see what the upgrade adds on the same ground.</>;
  return <VoiceText field="heroSub" />;
}

/** Render children only for these audiences. */
export function OnlyFor({ audiences, children }: { audiences: Audience[]; children: React.ReactNode }) {
  const [a] = useAudience();
  return audiences.includes(a) ? <>{children}</> : null;
}

/** Hide children for these audiences. */
export function HideFor({ audiences, children }: { audiences: Audience[]; children: React.ReactNode }) {
  const [a] = useAudience();
  return audiences.includes(a) ? null : <>{children}</>;
}
