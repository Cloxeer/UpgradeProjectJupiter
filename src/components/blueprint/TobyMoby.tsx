"use client";

import type { Exchange } from "@/data/tobyMoby";

/*
  Toby & Sal: the little-kid two-voice explainer.
  Sal (🐢, curious) asks; Toby (🦊, the friend who gets it) explains back simply.
  Shown only in "Little kid" audience mode, in place of the adult copy.
  (Data lives in src/data/tobyMoby.ts; the "moby" key is Sal.)
*/

function Bubble({ who, text }: { who: "moby" | "toby"; text: string }) {
  const isMoby = who === "moby";
  return (
    <div className={`flex items-end gap-2 ${isMoby ? "" : "flex-row-reverse"}`}>
      <div
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[18px]"
        style={{ backgroundColor: isMoby ? "#e6f2ff" : "#eaf6ee", border: `2px solid ${isMoby ? "#1f7ae0" : "#2e8b57"}` }}
        aria-hidden
      >
        {isMoby ? "🐢" : "🦊"}
      </div>
      <div
        className="max-w-[86%] rounded-2xl px-4 py-2.5"
        style={{
          backgroundColor: isMoby ? "#eef6ff" : "#ecf8f0",
          borderBottomLeftRadius: isMoby ? 4 : 16,
          borderBottomRightRadius: isMoby ? 16 : 4,
        }}
      >
        <div className="text-[12px] font-black uppercase tracking-wide" style={{ color: isMoby ? "#1f7ae0" : "#1f5f3a" }}>
          {isMoby ? "Sal asks" : "Toby says"}
        </div>
        <p className="mt-0.5" style={{ fontSize: 17, lineHeight: 1.5, color: "#26333d" }}>
          {text}
        </p>
      </div>
    </div>
  );
}

export function TobyMoby({ chat, fallback }: { chat?: Exchange[]; fallback?: string }) {
  if (!chat || chat.length === 0) {
    return fallback ? <p style={{ fontSize: 18, lineHeight: 1.55, color: "#3c3c3c" }}>{fallback}</p> : null;
  }
  return (
    <div className="flex flex-col gap-3">
      {chat.map((ex, i) => (
        <div key={i} className="flex flex-col gap-2">
          <Bubble who="moby" text={ex.q} />
          <Bubble who="toby" text={ex.a} />
        </div>
      ))}
    </div>
  );
}
