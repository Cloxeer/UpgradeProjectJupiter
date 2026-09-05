"use client";

import { useState } from "react";
import { commissionMeeting } from "@/data/upgrade";
import { useAudience } from "./Audience";

const G = "#2e8b57";
const SHARE_TEXT = "Do not cancel Project Jupiter. Force the upgrade: catch the carbon, reuse the heat, make water, hire here. Same land, same timeline, about 1.5% more.";

/** Share the site: the phone's share sheet where it exists, otherwise copy the link. */
function ShareButton({ kid }: { kid: boolean }) {
  const [done, setDone] = useState(false);
  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.origin : "";
    try {
      const nav: Navigator = navigator;
      if (typeof nav.share === "function") {
        await nav.share({ title: "Force Upgrade Project Jupiter", text: SHARE_TEXT, url });
        return;
      }
      await nav.clipboard.writeText(`${SHARE_TEXT} ${url}`);
      setDone(true);
      setTimeout(() => setDone(false), 2500);
    } catch {
      /* cancelled or unavailable */
    }
  };
  return (
    <button type="button" onClick={share} className="mt-auto inline-flex min-h-[44px] items-center justify-center rounded px-4 text-[14px] font-black uppercase tracking-wide" style={{ backgroundColor: done ? G : "#fff", color: done ? "#fff" : "#003047", border: `2px solid ${G}` }}>
      {done ? "Link copied ✓" : kid ? "Share it" : "Share this site"}
    </button>
  );
}

/**
 * The four things a reader can actually do, in the order of effort. Sign first.
 * Each card is one line of why and one button. Same four for every reader; kids get shorter words.
 */
export function WhatCanIDo() {
  const [audience] = useAudience();
  const kid = audience === "kid";
  const meetingShort = commissionMeeting.replace(/^The Board of County Commissioners meets /, "").replace(/ Public comment is three minutes per person\.$/, "");
  const cards: { n: number; title: string; why: string; cta: React.ReactNode }[] = [
    {
      n: 1,
      title: kid ? "Ask a grown-up to sign" : "Sign the petition",
      why: kid ? "It takes one minute and it counts." : "One minute. Your name and ZIP go in the packet handed to the commission.",
      cta: (
        <a href="/petition" className="mt-auto inline-flex min-h-[44px] items-center justify-center rounded px-4 text-[14px] font-black uppercase tracking-wide text-white" style={{ backgroundColor: G }}>
          Sign the petition
        </a>
      ),
    },
    {
      n: 2,
      title: kid ? "Call the county" : "Talk to your local representatives",
      why: kid ? "The five county leaders decide. There is a script ready." : "Five commissioners hold the lease. Email or call; the script is already written.",
      cta: (
        <a href="/legislators#commission" className="mt-auto inline-flex min-h-[44px] items-center justify-center rounded px-4 text-[14px] font-black uppercase tracking-wide" style={{ backgroundColor: "#fdb715", color: "#003047" }}>
          Who to call, what to say
        </a>
      ),
    },
    {
      n: 3,
      title: kid ? "Go to the meeting" : "Go to a county commission meeting",
      why: kid ? "Grown-ups get three minutes to talk. Anyone can go." : `${meetingShort} Three minutes each, and anyone can speak.`,
      cta: (
        <a href="/legislators#commission" className="mt-auto inline-flex min-h-[44px] items-center justify-center rounded px-4 text-[14px] font-black uppercase tracking-wide" style={{ backgroundColor: "#fff", color: "#003047", border: "2px solid #003047" }}>
          Your three minutes
        </a>
      ),
    },
    {
      n: 4,
      title: kid ? "Tell your friends" : "Spread the word",
      why: kid ? "Tell a friend. Tell your neighbor. Tell your teacher." : "Tell a friend, a neighbor, a group chat. The lease is being written now.",
      cta: <ShareButton kid={kid} />,
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4" role="list" aria-label="What can I do to help">
      {cards.map((c) => (
        <div key={c.n} role="listitem" className="flex flex-col rounded p-4" style={{ backgroundColor: c.n === 1 ? "#eaf6ee" : "#fff", border: `2px solid ${c.n === 1 ? G : "#e0e0e0"}` }}>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full font-black text-white" style={{ backgroundColor: c.n === 1 ? G : "#6b6b6b", fontSize: 14 }}>{c.n}</span>
            <h4 className="font-black" style={{ fontSize: kid ? 18 : 16, lineHeight: 1.2, color: "#003047" }}>{c.title}</h4>
          </div>
          <p className="mb-3 mt-2" style={{ fontSize: kid ? 16 : 14, lineHeight: 1.5, color: "#3c3c3c" }}>{c.why}</p>
          {c.cta}
        </div>
      ))}
    </div>
  );
}
