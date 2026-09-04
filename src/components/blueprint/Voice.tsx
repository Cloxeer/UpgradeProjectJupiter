"use client";

import { useAudience, type Audience } from "@/components/jupiter/Audience";
import { heroVoice, costVoice } from "@/data/blueprintVoices";

const fields = { heroSub: heroVoice.sub, heroGuide: heroVoice.guide, cost: costVoice } as const;

/** A block of Blueprint text in the current audience's voice. */
export function VoiceText({ field }: { field: keyof typeof fields }) {
  const [a] = useAudience();
  const v = fields[field];
  return <>{v[a] ?? v.overall}</>;
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
