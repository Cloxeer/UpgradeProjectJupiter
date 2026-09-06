import type { ReactNode } from "react";

/** **bold** inside a sentence. Nothing else. */
export function Emph({ text }: { text: string }) {
  const parts = text.split("**");
  return (
    <>
      {parts.map((part, i) => (i % 2 === 1 ? <strong key={i} style={{ color: "#fdb715" }}>{part}</strong> : <span key={i}>{part}</span>))}
    </>
  );
}

/**
 * [text](url) inside prose becomes a quiet link: same color family as the site's link blue, no underline until hover.
 * For company and agency names, so a reader who wants the source can get there without the link shouting.
 */
export function Linked({ text }: { text: string }) {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\((https?:[^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <a key={k++} href={m[2]} target="_blank" rel="noopener noreferrer" className="pj-quietlink" style={{ color: "#15768c" }}>
        {m[1]}
      </a>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}
