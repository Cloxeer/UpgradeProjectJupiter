"use client";

import { useState } from "react";
import type { TabPanel } from "@/data/jupiter";
import { SourceList } from "@/components/Cite";

function DataTable({ head, rows, highlightLast = false }: { head: string[]; rows: string[][]; highlightLast?: boolean }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="pj-table">
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={highlightLast && j === row.length - 1 ? "pj-cell-ours" : undefined}
                  style={j > 0 && head.length > 2 ? { textAlign: "center" } : undefined}
                >
                  {cell.split("\n").map((line, k) => (
                    <span key={k} className="block">
                      {line}
                    </span>
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Tabs({ panels, highlightLastColumn = false }: { panels: TabPanel[]; highlightLastColumn?: boolean }) {
  const [active, setActive] = useState(0);
  const panel = panels[active];

  return (
    <div>
      {/* Tab titles */}
      <div className="flex flex-wrap justify-center gap-2 border-b border-line">
        {panels.map((p, i) => (
          <button
            key={p.title}
            type="button"
            onClick={() => setActive(i)}
            className="relative px-4 py-3 text-center font-bold transition-colors"
            style={{
              fontSize: 17,
              color: i === active ? "#15768c" : "#3c3c3c",
              borderBottom: i === active ? "3px solid #15768c" : "3px solid transparent",
              marginBottom: -1,
            }}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Active panel */}
      <div key={active} className="pj-fade-up pt-8">
        {panel.table && <DataTable head={panel.table.head} rows={panel.table.rows} highlightLast={highlightLastColumn} />}
        {panel.paragraphs && (
          <div className="mx-auto max-w-[900px] space-y-4">
            {panel.paragraphs.map((p, i) => (
              <p key={i} style={{ fontSize: 16, lineHeight: "23.1px", color: "#3c3c3c" }}>
                {p}
              </p>
            ))}
          </div>
        )}
        {panel.sources && panel.sources.length > 0 && (
          <div className="mx-auto max-w-[900px]">
            <SourceList ids={panel.sources} />
          </div>
        )}
      </div>
    </div>
  );
}
