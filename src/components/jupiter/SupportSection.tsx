"use client";

import { petitionDemands } from "@/data/upgrade";
import { Stamp } from "./Stamp";
import { TheySay } from "./TheySay";
import { useCopy } from "./AudienceText";

export function SupportSection() {
  const copy = useCopy();
  return (
    <section id="support" style={{ backgroundColor: "#fafafa" }}>
      <div className="pj-container py-16">
        <div className="mx-auto max-w-[720px]">
          <div className="rounded bg-white p-8 shadow-sm">
            <h2 className="text-center font-black" style={{ fontSize: 28, lineHeight: 1.2, color: "#003047" }}>
              <Stamp kind="force">SHOW YOUR SUPPORT</Stamp>
            </h2>
            <p className="mt-4 text-center" style={{ fontSize: 17, lineHeight: 1.6, color: "#3c3c3c" }}>
              {copy.supportLead}
            </p>
            <ol className="mt-6 space-y-3 pl-5" style={{ fontSize: 16, lineHeight: 1.6, color: "#3c3c3c", listStyle: "decimal" }}>
              {petitionDemands.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ol>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href="/petition"
                className="rounded px-6 py-3 text-center font-bold uppercase text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#2e8b57", fontSize: 16, letterSpacing: 1 }}
              >
                Sign the petition
              </a>
              <a
                href="/legislators"
                className="rounded px-6 py-3 text-center font-bold uppercase transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#fdb715", color: "#003047", fontSize: 16, letterSpacing: 1 }}
              >
                Call your legislators
              </a>
            </div>
          </div>

          <TheySay label="Their support form — click to see it">
            <p className="mb-4" style={{ fontSize: 15 }}>
              This is the Oracle-funded Quorum advocacy widget embedded on the original site.
            </p>
            <div className="relative w-full overflow-hidden rounded bg-white shadow-sm">
              <iframe
                title="Show your support for Project Jupiter"
                src="https://projectjupiter.quorum.us/campaign/163224?embedded=true&widget_version=v2"
                className="w-full"
                style={{ minHeight: 640, border: "none" }}
                scrolling="no"
                loading="lazy"
              />
            </div>
          </TheySay>
        </div>
      </div>
    </section>
  );
}
