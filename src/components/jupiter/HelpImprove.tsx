export const HELP_EMAIL = "UpgradeProjectJupiter@gmail.com";

export function HelpImprove({ dark = false }: { dark?: boolean }) {
  const fg = dark ? "#ffffff" : "#003047";
  const body = dark ? "rgba(255,255,255,0.88)" : "#3c3c3c";
  return (
    <section id="help" style={{ backgroundColor: dark ? "#003047" : "#ffffff" }}>
      <div className="pj-container py-12">
        <div className="mx-auto max-w-[900px] rounded p-6" style={{ border: `2px dashed ${dark ? "#fdb715" : "#c0392b"}` }}>
          <h2 className="font-black" style={{ fontSize: 26, color: fg }}>HELP IMPROVE THIS PLAN</h2>
          <p className="mt-3" style={{ fontSize: 17, lineHeight: 1.65, color: body }}>
            Everything on this site is public record or published research, assembled by one NMSU computer-science student in a few days
            of reading. That is not enough people, and no one here claims these are the best possible ideas. If you are an engineer, a
            grower, a water operator, a lawyer, a Bloom or Oracle employee, a neighbor in Sunland Park, or a legislator, and you see a flaw,
            a better method, a missing source, or a cheaper way to reach the same result, send it. Corrections are welcome and will be
            posted with credit.
          </p>
          <p className="mt-3" style={{ fontSize: 17, lineHeight: 1.65, color: body }}>
            If Project Jupiter goes ahead, the goal is not to fight it forever. It is to make it the project New Mexico should have been
            offered in the first place: one that works with the county instead of on top of it.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a href={`mailto:${HELP_EMAIL}?subject=Force%20Upgrade%20Project%20Jupiter%20-%20idea%20or%20correction`} className="rounded px-5 py-2.5 text-[15px] font-bold uppercase tracking-wide" style={{ backgroundColor: dark ? "#fdb715" : "#c0392b", color: dark ? "#003047" : "#fff" }}>
              Send an idea or a correction
            </a>
            <code className="rounded px-2 py-1 text-[14px]" style={{ backgroundColor: dark ? "rgba(255,255,255,0.1)" : "#f4f4f4", color: fg }}>
              {HELP_EMAIL}
            </code>
            
          </div>
        </div>
      </div>
    </section>
  );
}
