// Four truth labels for structured claims (tiles, table cells, checks, rows). Prose stays unlabelled.
// Fact = in a signed or filed document. Verified estimate = priced or measured by a named institution, not yet built here.
// Projection = our arithmetic on industry averages. Unknown = no document answers it yet.

export type ClaimLabel = "fact" | "verified-estimate" | "projection" | "unknown";

export const CLAIM: Record<ClaimLabel, { word: string; bg: string; fg: string; title: string }> = {
  fact: { word: "Fact", bg: "#003047", fg: "#ffffff", title: "In a signed or filed document" },
  "verified-estimate": { word: "Verified estimate", bg: "#2e8b57", fg: "#ffffff", title: "Priced or measured by a named institution; not yet built here" },
  projection: { word: "Projection", bg: "#d99a00", fg: "#003047", title: "Our arithmetic on industry averages" },
  unknown: { word: "Unknown", bg: "#e0e0e0", fg: "#3c3c3c", title: "No document answers this yet" },
};
