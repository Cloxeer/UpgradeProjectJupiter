import { talkingPoints } from "@/data/upgrade";
import { demands, CLAUSE_NOTE } from "@/data/feasibility";

export const SCRIPT_SUBJECT = "Project Jupiter: put the six conditions in the lease";

/** The talking points as one plain-text message, for the clipboard and for mailto bodies. */
export function scriptText(): string {
  return talkingPoints.map((t, i) => `${i + 1}. ${t}`).join("\n\n");
}

/** The six draft lease clauses as one plain-text appendix. The mailto body stays the two-minute script; this is for the clipboard. */
export function clausesText(): string {
  return demands.map((d, i) => `Clause ${i + 1} · ${d.short}\n${d.clause}`).join("\n\n") + `\n\n${CLAUSE_NOTE}`;
}

/** A mailto link with the subject and the script already filled in. Plain module so server pages can call it. */
export function mailtoWithScript(email: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(SCRIPT_SUBJECT)}&body=${encodeURIComponent(scriptText())}`;
}
