import { footerText as theirFooter } from "@/data/jupiter";
import { footerText, LAST_UPDATED } from "@/data/upgrade";

export function SiteFooter() {
  return (
    <footer style={{ backgroundColor: "#003047" }}>
      <div className="pj-container py-6 text-center">
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)" }}>{footerText}</p>
        <p className="mt-1" style={{ fontSize: 14, color: "#fdb715", fontWeight: 700 }}>Last updated {LAST_UPDATED}. Status lines on this site reflect public filings and reporting as of that date.</p>
        <p className="mt-2" style={{ fontSize: 13, lineHeight: 1.5, color: "rgba(255,255,255,0.6)" }}>About this site: independent commentary and a policy proposal by a student. Statements about Project Jupiter are drawn from the developers&apos; own publications, the signed county agreement, state permit filings and named news reports, each linked on the Sources page; our figures are estimates where marked. No statement here should be read as an accusation of wrongdoing by any person or company. Corrections are welcome and will be posted.</p>
        <p className="mt-1" style={{ fontSize: 13, lineHeight: 1.5, color: "rgba(255,255,255,0.6)" }}>This site is political commentary and a petition to government, speech protected by the First Amendment to the U.S. Constitution and Article II, Section 17 of the New Mexico Constitution.</p>
        <p className="mt-2" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
          Their footer reads: “{theirFooter}”
        </p>
      </div>
    </footer>
  );
}
