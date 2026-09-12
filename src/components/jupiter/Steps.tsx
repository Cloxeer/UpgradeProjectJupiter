import { steps } from "@/data/upgrade";

const G = "#2e8b57";

/**
 * How the upgrade happens, in three steps. The only step a reader controls is the third, so it carries the button.
 * `highlight` marks the step this page is about.
 */
export function Steps({ dark = false, highlight = 3, compact = false }: { dark?: boolean; highlight?: 1 | 2 | 3; compact?: boolean }) {
  const fg = dark ? "#ffffff" : "#003047";
  const body = dark ? "rgba(255,255,255,0.85)" : "#3c3c3c";
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3" role="list" aria-label="How the upgrade happens">
      {steps.map((s) => {
        const on = s.n === highlight;
        const you = s.n === 3;
        return (
          <div key={s.n} role="listitem" className="flex flex-col rounded p-4" style={{ backgroundColor: dark ? (on ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)") : on ? "#eaf6ee" : "#fff", border: `2px solid ${on ? G : dark ? "rgba(255,255,255,0.2)" : "#e0e0e0"}` }}>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-black text-white" style={{ backgroundColor: on ? G : "#6b6b6b", fontSize: 16 }}>{s.n}</span>
              <span className="text-[15px] font-bold" style={{ color: on ? G : body }}>{s.who}</span>
            </div>
            <p className="mt-2 font-bold" style={{ fontSize: 16, lineHeight: 1.45, color: fg }}>
              {s.who} {s.what}
            </p>
            {!compact && <p className="mt-1" style={{ fontSize: 14, lineHeight: 1.5, color: body }}>{s.why}</p>}
            <a href={s.href} className={`pj-press mt-auto inline-flex min-h-[44px] items-center text-[15px] font-bold ${you ? "justify-center" : "underline"}`} style={you ? { color: "#fff", backgroundColor: G, borderRadius: 4, padding: "8px 14px", marginTop: 12 } : { color: dark ? "#fdb715" : "#15768c", marginTop: 8 }}>
              {s.cta}
            </a>
          </div>
        );
      })}
    </div>
  );
}
