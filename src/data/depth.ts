// The three reading depths and the authoring contract every tiered line follows.
// simple = one sentence. normal = one to three. expert = four to five, with source ids rendered by <Cite/>.

export type Depth = "simple" | "normal" | "expert";
export const DEPTHS: Depth[] = ["simple", "normal", "expert"];

export const depthMeta: Record<Depth, { label: string; blurb: string }> = {
  simple: { label: "Simple", blurb: "one sentence each" },
  normal: { label: "Normal", blurb: "a short paragraph" },
  expert: { label: "Expert", blurb: "the full case, with sources" },
};

export type Tiered = {
  simple: string;
  normal: string;
  expert: { text: string; cites: string[] };
};

/** The line for a depth. Expert returns its text; the cites are rendered by the caller. */
export function tierText(d: Depth, t: Tiered): string {
  return d === "expert" ? t.expert.text : t[d];
}
