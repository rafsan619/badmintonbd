"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { disciplineNames, rankings, type Discipline } from "@/lib/data";

const keys = Object.keys(disciplineNames) as Discipline[];
const nf = new Intl.NumberFormat("en-GB");

function Move({ v }: { v: number }) {
  if (v === 0) return <span className="text-muted" aria-label="No change">–</span>;
  const up = v > 0;
  return (
    <span className={clsx("inline-flex items-center gap-0.5 font-semibold", up ? "text-court" : "text-[#b42318]")}>
      <span aria-hidden>{up ? "▲" : "▼"}</span>
      <span className="sr-only">{up ? "Up" : "Down"}</span>
      {Math.abs(v)}
    </span>
  );
}

export function RankingTable({ limit, searchable = false }: { limit?: number; searchable?: boolean }) {
  const [tab, setTab] = useState<Discipline>("MS");
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const list = rankings[tab].filter((r) => r.name.toLowerCase().includes(q.trim().toLowerCase()));
    return limit ? list.slice(0, limit) : list;
  }, [tab, q, limit]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="tablist" aria-label="Discipline" className="no-scrollbar -mx-1 flex overflow-x-auto rounded-full bg-white p-1 shadow-[inset_0_0_0_1px_var(--bbf-line)]">
          {keys.map((k) => (
            <button
              key={k}
              role="tab"
              aria-selected={tab === k}
              onClick={() => setTab(k)}
              className="pill shrink-0"
            >
              {tab === k && (
                <motion.span
                  layoutId={`rank-pill-${searchable ? "full" : "mini"}`}
                  className="absolute inset-0 -z-0 rounded-full bg-violet"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}
              <span className="relative">
                <span className="md:hidden">{k}</span>
                <span className="hidden md:inline">{disciplineNames[k]}</span>
              </span>
            </button>
          ))}
        </div>
        {searchable && (
          <label className="relative block md:w-72">
            <span className="sr-only">Filter by name</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter by player name" className="field" />
          </label>
        )}
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-line bg-white">
        <table className="w-full text-left">
          <caption className="sr-only">{disciplineNames[tab]} national ranking</caption>
          <thead className="bg-paper text-sm text-muted">
            <tr>
              <th scope="col" className="w-16 px-4 py-3 font-semibold md:px-6">Rank</th>
              <th scope="col" className="px-4 py-3 font-semibold">Player</th>
              <th scope="col" className="hidden px-4 py-3 font-semibold sm:table-cell">Division</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">Points</th>
              <th scope="col" className="w-16 px-4 py-3 text-right font-semibold md:px-6">Move</th>
            </tr>
          </thead>
          <AnimatePresence mode="wait" initial={false}>
            <motion.tbody
              key={tab}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              variants={{ show: { transition: { staggerChildren: 0.035 } } }}
            >
              {rows.map((r) => (
                <motion.tr
                  key={r.name}
                  variants={{ hidden: { opacity: 0, x: -14 }, show: { opacity: 1, x: 0 } }}
                  className="border-t border-line transition-colors hover:bg-paper"
                >
                  <td className="px-4 py-3.5 md:px-6">
                    <span className={clsx("font-display text-2xl font-extrabold tabular", r.rank <= 3 ? "text-violet" : "text-muted")}>
                      {r.rank}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-semibold">
                    {r.slug ? (
                      <Link href={`/players/${r.slug}`} className="hover:text-violet link-underline">
                        {r.name}
                      </Link>
                    ) : (
                      r.name
                    )}
                  </td>
                  <td className="hidden px-4 py-3.5 text-muted sm:table-cell">{r.division}</td>
                  <td className="px-4 py-3.5 text-right tabular">{nf.format(r.points)}</td>
                  <td className="px-4 py-3.5 text-right text-sm md:px-6">
                    <Move v={r.move} />
                  </td>
                </motion.tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-muted">
                    No player in this list matches “{q}”.
                  </td>
                </tr>
              )}
            </motion.tbody>
          </AnimatePresence>
        </table>
      </div>
    </div>
  );
}
