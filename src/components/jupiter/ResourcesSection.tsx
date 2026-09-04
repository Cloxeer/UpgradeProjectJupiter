import { resources as theirResources, mediaPress } from "@/data/jupiter";
import { Stamp } from "./Stamp";
import { TheySay } from "./TheySay";

const links = [
  { title: "The Blueprint", desc: "The site plan and five processes you can play with", href: "/blueprint", icon: "📐" },
  { title: "The Science", desc: "Four reading levels, every number sourced", href: "/science", icon: "🔬" },
  { title: "Legislators", desc: "Who to call and the three bills", href: "/legislators", icon: "🏛️" },
  { title: "Sources", desc: "Every document behind every number", href: "/sources", icon: "📚" },
];

function Card({ title, desc, href, icon }: { title: string; desc: string; href: string; icon?: string }) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="group flex flex-col rounded bg-white p-5 text-center shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
      {icon && <div style={{ fontSize: 28 }} aria-hidden>{icon}</div>}
      <h3 className="font-bold transition-colors group-hover:text-teal" style={{ fontSize: 18, color: "#003047" }}>{title}</h3>
      <p className="mt-1" style={{ fontSize: 15, lineHeight: 1.5, color: "#3c3c3c" }}>{desc}</p>
    </a>
  );
}

export function ResourcesSection() {
  return (
    <section id="resources" style={{ backgroundColor: "#003047" }}>
      <div className="pj-container py-10">
        <div className="pj-heading mb-8">
          <h2 style={{ color: "#ffffff" }}>
            <Stamp kind="upgrade">PROJECT JUPITER</Stamp> RESOURCES
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {links.map((r) => (
            <Card key={r.title} {...r} />
          ))}
        </div>
        <TheySay dark label="Their original resources and press links">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...theirResources, ...mediaPress].map((r) => (
              <Card key={r.title} {...r} />
            ))}
          </div>
        </TheySay>
      </div>
    </section>
  );
}
