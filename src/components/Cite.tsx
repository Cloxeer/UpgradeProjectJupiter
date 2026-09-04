import { citeNumber, sourceById } from "@/data/sources";

/** Inline citation: renders [n] superscripts linking to the Sources page. */
export function Cite({ ids }: { ids: string[] }) {
  return (
    <sup className="pj-cite">
      {ids.map((id) => {
        const s = sourceById[id];
        return (
          <a key={id} href={`/sources#${id}`} title={s ? `${s.title} — ${s.publisher}, ${s.date}` : id}>
            [{citeNumber(id)}]
          </a>
        );
      })}
    </sup>
  );
}

/** A "Sources" footer for a card or section. */
export function SourceList({ ids: rawIds, dark = false }: { ids: string[]; dark?: boolean }) {
  const ids = Array.from(new Set(rawIds));
  return (
    <div className="mt-4 border-t pt-3" style={{ borderColor: dark ? "rgba(255,255,255,0.2)" : "#e5e5e5" }}>
      <div className="text-[10px] font-bold uppercase tracking-wide" style={{ color: dark ? "rgba(255,255,255,0.6)" : "#6b6b6b" }}>
        Sources
      </div>
      <ol className="mt-1 space-y-0.5" style={{ fontSize: 11, lineHeight: 1.45, color: dark ? "rgba(255,255,255,0.85)" : "#3c3c3c" }}>
        {ids.map((id) => {
          const s = sourceById[id];
          if (!s) return null;
          return (
            <li key={id} id={undefined}>
              <a href={`/sources#${id}`} className="font-bold" style={{ color: dark ? "#fdb715" : "#15768c" }}>
                [{citeNumber(id)}]
              </a>{" "}
              {s.title}. <span style={{ opacity: 0.8 }}>{s.publisher}, {s.date}.</span>{" "}
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: dark ? "#fdb715" : "#15768c" }}>
                link ↗
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
