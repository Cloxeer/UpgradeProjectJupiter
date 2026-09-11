import { commissioners, commissionMeeting, talkingPoints } from "@/data/upgrade";
import { demands } from "@/data/feasibility";
import { mailtoWithScript } from "@/lib/script";
import { CopyScriptButton, CopyTextButton } from "./CopyScript";
import { blueprint } from "@/data/story";

/** The comment as one paragraph: the six conditions in the order the record will read them. */
function commentText(): string {
  const list = demands.map((d, i) => `${i + 1}. ${d.short}.`).join("\n");
  return `Re: Draft Air Quality Permit 10883 (Project Jupiter, Santa Teresa).\n\nI ask that the following conditions be reflected in the permit and negotiated into the county's bond lease at its next consent point:\n\n${list}\n\nName: ____\nTown: ____`;
}

/**
 * The real ask, shared by the end of the Blueprint and the Legislators page. Three steps in the order
 * that binds: the written comment, the commission microphone, the phone call.
 */
export function ActOnRecord({ id = "act" }: { id?: string }) {
  return (
    <div id={id} className="scroll-mt-32">
      <p className="mx-auto max-w-[62ch] text-[19px]" style={{ lineHeight: 1.6, color: "#ffffff" }}>
        {blueprint.act.lead}
      </p>

      <ol className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <li className="rounded p-5" style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.18)" }}>
          <h3 className="text-[20px] font-black text-white" style={{ lineHeight: 1.2 }}>Write a comment on Permit 10883</h3>
          <p className="mt-2 text-[16px]" style={{ lineHeight: 1.55, color: "rgba(255,255,255,0.85)" }}>
            The record is open; the permit is being reissued. This is what to say, in six lines. Copy it, add your name and town, and file it on NMED&apos;s comment page.
          </p>
          <ol className="mt-3 space-y-1.5 pl-5 text-[15px]" style={{ listStyle: "decimal", lineHeight: 1.5, color: "rgba(255,255,255,0.9)" }}>
            {demands.map((d) => (
              <li key={d.id}>{d.short}.</li>
            ))}
          </ol>
          <div className="mt-4">
            <CopyTextButton text={commentText()} label="Copy the comment" dark />
          </div>
        </li>

        <li className="rounded p-5" style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.18)" }}>
          <h3 className="text-[20px] font-black text-white" style={{ lineHeight: 1.2 }}>Speak at the commission</h3>
          <p className="mt-2 text-[16px]" style={{ lineHeight: 1.55, color: "rgba(255,255,255,0.85)" }}>{commissionMeeting}</p>
          <p className="mt-2 text-[15px]" style={{ lineHeight: 1.5, color: "rgba(255,255,255,0.7)" }}>Public comment is three minutes. This fits in two.</p>
          <ol className="mt-3 space-y-1.5 pl-5 text-[15px]" style={{ listStyle: "decimal", lineHeight: 1.5, color: "rgba(255,255,255,0.9)" }}>
            {talkingPoints.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ol>
          <div className="mt-4">
            <CopyScriptButton dark />
          </div>
        </li>

        <li className="rounded p-5" style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.18)" }}>
          <h3 className="text-[20px] font-black text-white" style={{ lineHeight: 1.2 }}>Call your commissioner</h3>
          <p className="mt-2 text-[16px]" style={{ lineHeight: 1.55, color: "rgba(255,255,255,0.85)" }}>Five commissioners hold the lease. The email opens with the script already written; change anything you like.</p>
          <ul className="mt-3 space-y-3">
            {commissioners.map((c) => (
              <li key={c.district} className="text-[15px]" style={{ lineHeight: 1.45, color: "#ffffff" }}>
                <div className="font-bold">
                  {c.name}
                  {c.role ? <span style={{ fontWeight: 400, opacity: 0.8 }}> ({c.role})</span> : null}
                </div>
                <div style={{ color: "rgba(255,255,255,0.75)" }}>{c.district}</div>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                  <a href={`tel:${c.phone.replace(/[^\d]/g, "")}`} className="inline-flex min-h-[44px] items-center font-bold underline" style={{ color: "#fdb715" }}>
                    {c.phone}
                  </a>
                  <a href={mailtoWithScript(c.email)} className="inline-flex min-h-[44px] items-center font-bold underline" style={{ color: "#fdb715" }} title={`Opens an email to ${c.email} with the script filled in`}>
                    Email my commissioner
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ol>

      <p className="mx-auto mt-12 max-w-[62ch] text-[19px]" style={{ lineHeight: 1.6, color: "rgba(255,255,255,0.9)" }}>
        {blueprint.act.closing}
      </p>
    </div>
  );
}
