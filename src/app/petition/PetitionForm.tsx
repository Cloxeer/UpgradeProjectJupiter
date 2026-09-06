const FORM_LINK = "https://forms.gle/SxybK8c9wz4tCVYVA";
export const CONTACT_EMAIL = "UpgradeProjectJupiter@gmail.com";

/** The live petition, hosted on Google Forms. Opens in a new tab. */
export function PetitionForm() {
  return (
    <div className="mx-auto max-w-[640px]">
      <div className="rounded p-8 text-center shadow-md" style={{ backgroundColor: "#003047" }}>
        <div className="text-[13px] font-black uppercase tracking-wide" style={{ color: "#fdb715" }}>Add your name</div>
        <h2 className="mt-1 font-black text-white" style={{ fontSize: 28, lineHeight: 1.1 }}>Sign the petition</h2>
        <p className="mx-auto mt-4 max-w-[520px]" style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.85)" }}>
          It takes about a minute. Your name and ZIP code make it count. The petition goes to the Doña Ana County commissioners and New
          Mexico legislators. Then spread the word: tell your friends and family, go to your local representatives and council meetings,
          learn, understand and teach others.
        </p>
        <a href={FORM_LINK} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block rounded px-10 py-4 text-[17px] font-black uppercase tracking-wide" style={{ backgroundColor: "#2e8b57", color: "#ffffff" }}>
          Sign the petition ↗
        </a>
        <p className="mt-3 text-[13px]" style={{ color: "rgba(255,255,255,0.6)" }}>Opens a secure Google Form in a new tab.</p>
        <div className="mt-5 rounded p-3 text-left" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
          <div className="text-[12px] font-black uppercase tracking-wide" style={{ color: "#fdb715" }}>After you sign</div>
          <p className="mt-1" style={{ fontSize: 14, lineHeight: 1.55, color: "rgba(255,255,255,0.85)" }}>
            The names go in the public-comment packet handed to the commissioners at a second- or fourth-Tuesday meeting, and to the legislators who sponsor the bills.
            Step two takes sixty seconds:{" "}
            <a href="/legislators#commission" className="font-bold underline" style={{ color: "#fdb715" }}>
              email your commissioner, script included →
            </a>
          </p>
        </div>
      </div>

      <p className="mt-4 text-center" style={{ fontSize: 14, color: "#6b6b6b" }}>
        Questions or corrections:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold underline" style={{ color: "#15768c" }}>
          {CONTACT_EMAIL}
        </a>
      </p>
    </div>
  );
}
