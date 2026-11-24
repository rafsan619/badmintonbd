"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { players, disciplineNames, type Discipline, type Player } from "@/lib/data";
import { PlayerCard } from "./PlayerCard";

const squads: ("All" | Player["squad"])[] = ["All", "Senior", "Junior", "Para"];

export function SquadExplorer() {
  const [squad, setSquad] = useState<(typeof squads)[number]>("All");
  const [disc, setDisc] = useState<"All" | Discipline>("All");

  const list = players.filter(
    (p) => (squad === "All" || p.squad === squad) && (disc === "All" || p.disciplines.includes(disc)),
  );

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Squad" className="flex w-fit rounded-full bg-white p-1 shadow-[inset_0_0_0_1px_var(--bbf-line)]">
          {squads.map((s) => (
            <button key={s} aria-pressed={squad === s} onClick={() => setSquad(s)} className="pill">
              {squad === s && (
                <motion.span layoutId="squad-pill" className="absolute inset-0 rounded-full bg-violet" transition={{ type: "spring", stiffness: 500, damping: 40 }} />
              )}
              <span className="relative">{s}</span>
            </button>
          ))}
        </div>
        <label className="flex items-center gap-3">
          <span className="text-sm font-semibold">Discipline</span>
          <select value={disc} onChange={(e) => setDisc(e.target.value as typeof disc)} className="field !w-56 !py-2.5">
            <option value="All">All disciplines</option>
            {(Object.keys(disciplineNames) as Discipline[]).map((d) => (
              <option key={d} value={d}>
                {disciplineNames[d]}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {list.length} {list.length === 1 ? "player" : "players"}
      </p>
      <motion.ul layout className="mt-4 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.li
              layout
              key={p.slug}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <PlayerCard player={p} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      {list.length === 0 && (
        <p className="rounded-xl border border-dashed border-line p-10 text-center text-muted">
          No players in this squad play that discipline yet.
        </p>
      )}
    </div>
  );
}
