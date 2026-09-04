"use client";

import { useAudience } from "./Audience";
import { audiencePanels, type AudiencePanel } from "@/data/audience";
import { audienceCopy, type Copy } from "@/data/audienceCopy";

/** Whole-page copy for the current audience. */
export function useCopy(): Copy {
  const [a] = useAudience();
  return audienceCopy[a];
}

type Field = "heroSubhead" | "whatIsIntro" | "netlossIntro" | "speedIntro" | "ctaLabel";

/** Renders the audience-specific text for a field, or the fallback for "Everyone". */
export function AudienceText({ field, fallback }: { field: Field; fallback: React.ReactNode }) {
  const [a] = useAudience();
  const v = (audiencePanels[a] as AudiencePanel)[field];
  return <>{a !== "overall" && v ? v : fallback}</>;
}

/** Renders children only for the given audiences. */
export function AudienceOnly({ only, children }: { only: string[]; children: React.ReactNode }) {
  const [a] = useAudience();
  return only.includes(a) ? <>{children}</> : null;
}
