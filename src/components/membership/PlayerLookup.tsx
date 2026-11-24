"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { players } from "@/lib/data";

/**
 * Demo lookup against the sample squad data. IDs are derived as BBF-<birth year>-<index>.
 * TODO: replace with a call to the registration database.
 */
const registry = players.map((p, i) => ({
  id: `BBF-${p.born}-${String(i + 101).padStart(4, "0")}`,
  name: p.name,
  division: p.division,
  club: p.club,
  status: "Active until 31 Dec 2026",
}));

export function PlayerLookup() {
  const [q, setQ] = useState("");
  const [result, setResult] = useState<(typeof registry)[number] | null | undefined>(undefined);

  return (
    <div>
      <form
        className="flex flex-col gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          const t = q.trim().toLowerCase();
          setResult(registry.find((r) => r.id.toLowerCase() === t || r.name.toLowerCase() === t) ?? null);
        }}
      >
        <label className="flex-1">
          <span className="label !text-white">Player ID or full name</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="e.g. BBF-2000-0101"
            className="field !border-white/20 !bg-white/5 !text-white placeholder:!text-white/40"
            required
          />
        </label>
        <button className="btn btn-primary self-end">Check registration</button>
      </form>
      <AnimatePresence mode="wait">
        {result !== undefined && (
          <motion.div
            key={result?.id ?? "none"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 rounded-xl border border-white/15 bg-white/5 p-5"
            role="status"
          >
            {result ? (
              <dl className="grid gap-4 sm:grid-cols-2">
                <div><dt className="text-sm text-white/60">Name</dt><dd className="font-semibold">{result.name}</dd></div>
                <div><dt className="text-sm text-white/60">Player ID</dt><dd className="font-semibold tabular">{result.id}</dd></div>
                <div><dt className="text-sm text-white/60">Club</dt><dd>{result.club}, {result.division}</dd></div>
                <div><dt className="text-sm text-white/60">Status</dt><dd className="font-semibold text-[#7fe0bd]">{result.status}</dd></div>
              </dl>
            ) : (
              <p>
                No registration found for “{q}”. Check the spelling, or register below. If you think this is
                wrong, contact your division association.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
