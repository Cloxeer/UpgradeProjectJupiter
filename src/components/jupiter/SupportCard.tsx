"use client";

import { useState } from "react";
import { useAudience } from "./Audience";
import { useCopy } from "./AudienceText";

const G = "#2e8b57";
const SHARE_TEXT = "Do not cancel Project Jupiter. Force the upgrade: catch the carbon, reuse the heat, make water, hire here. Same land, same timeline, about 1.5% more.";

/**
 * Show Your Support, in the hero: the four things a reader can do, as four buttons.
 * Sign first. The longer version with the why lines is at the foot of the page.
 */
export function SupportCard() {
  const [audience] = useAudience();
  const copy = useCopy();
  const kid = audience === "kid";
  const [shared, setShared] = useState(false);
  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.origin : "";
    try {
      const nav: Navigator = navigator;
      if (typeof nav.share === "function") {
        await nav.share({ title: "Force Upgrade Project Jupiter", text: SHARE_TEXT, url });
        return;
      }
      await nav.clipboard.writeText(`${SHARE_TEXT} ${url}`);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    } catch {
      /* cancelled or unavailable */
    }
  };
  const btn = "flex min-h-[46px] w-full items-center justify-between gap-2 rounded px-4 text-left text-[14px] font-black uppercase tracking-wide";
  return (
    <div className="rounded bg-white p-5 shadow-lg" style={{ borderTop: `6px solid ${G}` }}>
      <div className="text-[12px] font-black uppercase tracking-wide" style={{ color: G }}>Show your support</div>
      <h2 className="mt-1 font-black" style={{ fontSize: 22, lineHeight: 1.15, color: "#003047" }}>
        {kid ? "What can you do to help?" : "What can I do to help?"}
      </h2>
      <p className="mt-2" style={{ fontSize: 14, lineHeight: 1.5, color: "#3c3c3c" }}>
        {kid ? "Ask a grown-up to do these with you." : copy.supportLead}
      </p>
      <div className="mt-4 space-y-2">
        <a href="/petition" className={btn} style={{ backgroundColor: G, color: "#fff" }}>
          <span>1 · {kid ? "Sign the petition (with a grown-up)" : "Sign the petition"}</span>
          <span aria-hidden>→</span>
        </a>
        <a href="/legislators#commission" className={btn} style={{ backgroundColor: "#fdb715", color: "#003047" }}>
          <span>2 · {kid ? "Call the county" : "Talk to your local representatives"}</span>
          <span aria-hidden>→</span>
        </a>
        <a href="/legislators#commission" className={btn} style={{ backgroundColor: "#fff", color: "#003047", border: "2px solid #003047" }}>
          <span>3 · {kid ? "Go to the meeting" : "Go to a county commission meeting"}</span>
          <span aria-hidden>→</span>
        </a>
        <button type="button" onClick={share} className={btn} style={{ backgroundColor: shared ? G : "#fff", color: shared ? "#fff" : "#003047", border: `2px solid ${G}` }}>
          <span>4 · {shared ? "Link copied ✓" : kid ? "Tell your friends" : "Spread the word"}</span>
          <span aria-hidden>{shared ? "" : "↗"}</span>
        </button>
      </div>
      <p className="mt-3 text-[12px]" style={{ lineHeight: 1.4, color: "#6b6b6b" }}>
        None of the six conditions is in the county lease yet. Concrete is being poured now.
      </p>
    </div>
  );
}
