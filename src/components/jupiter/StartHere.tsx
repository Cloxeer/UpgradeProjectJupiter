const steps = [
  { n: "1", title: "What Project Jupiter is", body: "A $165 billion data-center campus in Santa Teresa with its own gas-fired power plant, approved by Doña Ana County in 2025.", href: "#whatis" },
  { n: "2", title: "What the upgrade changes", body: "Same site, same buildings, same timeline. Catch the CO₂, use the heat, make clean water from salty groundwater, grow food, put every ton on a public meter.", href: "/blueprint" },
  { n: "3", title: "What you can do", body: "Ask the county and the Legislature to write six conditions into the leases before the fuel cells arrive.", href: "/petition" },
];

const paths = [
  { who: "One minute", what: "Read the eight highlight cards. Ours on top, theirs quoted underneath.", href: "#highlights" },
  { who: "Elected official", what: "How fast, how cheap, who pays: the speed-and-cost table and the cost table on the Blueprint.", href: "#speed" },
  { who: "Business owner", what: "What it adds to the developer's bill as a share of the bond, on every process card.", href: "/blueprint#cost" },
  { who: "Kid or student", what: "Every process has an 'If you are ten' box and a drawing you can make bigger.", href: "/blueprint#processes" },
];

export function StartHere() {
  return (
    <section id="start" style={{ backgroundColor: "#ffffff" }}>
      <div className="pj-container py-10">
        <div className="mx-auto max-w-[1000px]">
          <div className="text-center">
            <div className="text-[14px] font-black uppercase tracking-wide" style={{ color: "#2e8b57" }}>New here? Start with this</div>
            <h2 className="mt-1 font-black" style={{ fontSize: 26, color: "#003047" }}>Three things to know, in order</h2>
          </div>
          <ol className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.n} className="rounded p-5 shadow-sm" style={{ backgroundColor: "#f4faf6", borderTop: "4px solid #2e8b57" }}>
                <div className="flex h-9 w-9 items-center justify-center rounded-full font-black text-white" style={{ backgroundColor: "#2e8b57" }}>{s.n}</div>
                <h3 className="mt-3 font-bold" style={{ fontSize: 17, color: "#003047" }}>{s.title}</h3>
                <p className="mt-1" style={{ fontSize: 16, lineHeight: 1.6, color: "#3c3c3c" }}>{s.body}</p>
                <a href={s.href} className="mt-2 inline-block text-[15px] font-bold underline" style={{ color: "#1f5f3a" }}>Go →</a>
              </li>
            ))}
          </ol>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {paths.map((p) => (
              <a key={p.who} href={p.href} className="rounded border p-3 hover:shadow-sm" style={{ borderColor: "#e0e0e0" }}>
                <div className="text-[13px] font-black uppercase" style={{ color: "#6b6b6b" }}>If you are… {p.who}</div>
                <div className="mt-1" style={{ fontSize: 15, lineHeight: 1.5, color: "#003047" }}>{p.what}</div>
              </a>
            ))}
          </div>
          <p className="mt-5 text-center" style={{ fontSize: 15, lineHeight: 1.6, color: "#6b6b6b" }}>
            This site is commentary and a proposal. Every claim about Project Jupiter comes from the developers&apos; own filings, the signed county
            agreement, state permit documents or named news reports, each linked on the Sources page. Where we estimate, we say so.
          </p>
        </div>
      </div>
    </section>
  );
}
