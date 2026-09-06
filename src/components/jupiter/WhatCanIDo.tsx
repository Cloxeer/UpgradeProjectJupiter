"use client";

import { useState } from "react";
import { commissionMeeting } from "@/data/upgrade";
import { useAudience } from "./Audience";

const G = "#2e8b57";
const SHARE_TEXT = "Do not cancel Project Jupiter. Force the upgrade: catch the carbon, reuse the heat, make water, hire here. Same land, same timeline, about 1.5% more.";

/**
 * What can I do: one primary button (sign), then three quiet links. No equal buttons.
 */
export function WhatCanIDo() {
  const [audience] = useAudience();
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
  const meeting = commissionMeeting.replace(/^The Board of County Commissioners meets /, "").replace(/ in the Commission Chambers.*$/, "");
  const link = "inline-flex min-h-[44px] items-center font-bold underline";
  return (
    <div className="text-center">
      <a href="/petition" className="inline-flex min-h-[56px] w-full items-center justify-center rounded px-10 text-[18px] font-black uppercase tracking-wide text-white sm:w-auto" style={{ backgroundColor: G }}>
        {kid ? "Sign the petition with a grown-up" : "Sign the petition"}
      </a>
      <p className="mt-2 text-[14px]" style={{ color: "#6b6b6b" }}>One minute. Your name and ZIP go in the packet handed to the commission.</p>
      <div className="mt-4 flex flex-col items-center gap-1 sm:flex-row sm:justify-center sm:gap-6" style={{ fontSize: 16, color: "#003047" }}>
        <a href="/legislators#commission" className={link}>{kid ? "Call the county →" : "Email or call your commissioner →"}</a>
        <a href="/legislators#commission" className={link} title={meeting}>{kid ? "Go to the meeting →" : "Speak at a commission meeting →"}</a>
        <button type="button" onClick={share} className={`${link} pj-inline`} style={{ color: shared ? G : "#003047" }}>
          {shared ? "Link copied ✓" : kid ? "Tell your friends" : "Share this site"}
        </button>
      </div>
    </div>
  );
}
