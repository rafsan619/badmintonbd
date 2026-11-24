"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { divisions } from "@/lib/data";
import { clubs } from "@/lib/org";
import { contact } from "@/lib/nav";
import { IconPin } from "@/components/ui/Icons";

/** Stylised map of Bangladesh's eight divisions — positions are approximate, for navigation only. */
const mapPos: Record<string, [number, number]> = {
  Rangpur: [30, 14],
  Rajshahi: [22, 34],
  Mymensingh: [52, 28],
  Sylhet: [78, 26],
  Dhaka: [50, 46],
  Khulna: [30, 66],
  Barishal: [50, 72],
  Chattogram: [78, 68],
};

export function ClubFinder() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initial = params.get("division");
  const [division, setDivision] = useState<string>(initial && (divisions as readonly string[]).includes(initial) ? initial : "All");
  const [juniors, setJuniors] = useState(false);
  const [para, setPara] = useState(false);
  const [q, setQ] = useState("");

  const pick = (d: string) => {
    setDivision(d);
    const sp = new URLSearchParams(params.toString());
    if (d === "All") sp.delete("division");
    else sp.set("division", d);
    router.replace(`${pathname}${sp.size ? `?${sp}` : ""}#clubs`, { scroll: false });
  };

  const list = clubs.filter(
    (c) =>
      (division === "All" || c.division === division) &&
      (!juniors || c.juniors) &&
      (!para || c.para) &&
      (c.name + c.city).toLowerCase().includes(q.trim().toLowerCase()),
  );
  const counts = Object.fromEntries(divisions.map((d) => [d, clubs.filter((c) => c.division === d).length]));

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(280px,420px)_1fr]">
      <div>
        <div className="relative aspect-[4/5] rounded-xl bg-violet p-4 text-white" role="group" aria-label="Choose a division">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
            {Object.entries(mapPos).map(([a, [x1, y1]]) =>
              Object.entries(mapPos)
                .filter(([b, [x2, y2]]) => a < b && Math.hypot(x1 - x2, y1 - y2) < 32)
                .map(([b, [x2, y2]]) => (
                  <line key={a + b} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeOpacity="0.15" strokeWidth="0.4" />
                )),
            )}
          </svg>
          {divisions.map((d) => {
            const [x, y] = mapPos[d];
            const active = division === d;
            return (
              <button
                key={d}
                onClick={() => pick(active ? "All" : d)}
                aria-pressed={active}
                style={{ left: `${x}%`, top: `${y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
              >
                <motion.span
                  animate={{ scale: active ? 1.25 : 1 }}
                  className={clsx(
                    "mx-auto flex h-11 w-11 items-center justify-center rounded-full border-2 font-display text-lg font-extrabold transition-colors",
                    active ? "border-orange bg-orange text-ink" : "border-white/40 bg-ink/40 hover:border-orange",
                  )}
                >
                  {counts[d]}
                </motion.span>
                <span className={clsx("mt-1 block text-xs font-semibold", active ? "text-orange" : "text-white/80")}>{d}</span>
              </button>
            );
          })}
          <p className="absolute bottom-3 left-4 right-4 text-xs text-white/60">Select a division. Numbers show affiliated clubs listed here.</p>
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex-1">
            <span className="sr-only">Search clubs</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by club or area" className="field" />
          </label>
          <select aria-label="Division" value={division} onChange={(e) => pick(e.target.value)} className="field sm:!w-48">
            <option value="All">All divisions</option>
            {divisions.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button aria-pressed={juniors} onClick={() => setJuniors((v) => !v)} className={clsx("chip transition-colors", juniors && "border-court bg-court text-white")}>
            Junior sessions
          </button>
          <button aria-pressed={para} onClick={() => setPara((v) => !v)} className={clsx("chip transition-colors", para && "border-court bg-court text-white")}>
            Para-friendly
          </button>
        </div>
        <p className="mt-5 text-sm text-muted" aria-live="polite">
          {list.length} {list.length === 1 ? "club" : "clubs"}
          {division !== "All" && ` in ${division}`}
        </p>
        <motion.ul layout className="mt-3 grid gap-3 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {list.map((c) => (
              <motion.li
                layout
                key={c.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="rounded-xl border border-line bg-white p-5"
              >
                <p className="font-semibold">{c.name}</p>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted">
                  <IconPin width={15} height={15} /> {c.city}
                </p>
                <p className="mt-3 flex flex-wrap gap-2">
                  <span className="chip">{c.courts} courts</span>
                  {c.juniors && <span className="chip chip-court">Juniors</span>}
                  {c.para && <span className="chip chip-violet">Para</span>}
                </p>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
        {list.length === 0 && (
          <div className="mt-3 rounded-xl border border-dashed border-line p-8 text-center">
            <p className="font-semibold">No clubs match yet.</p>
            <p className="mt-1 text-sm text-muted">
              Email <a className="text-violet link-underline" href={`mailto:${contact.email}`}>{contact.email}</a> and we’ll point you to the nearest session.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
