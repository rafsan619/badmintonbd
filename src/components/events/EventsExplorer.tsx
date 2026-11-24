"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { events, type EventType } from "@/lib/data";
import { formatDate, formatDay, formatMonth, formatMonthYear, formatRange } from "@/lib/format";
import { IconArrow, IconPin } from "@/components/ui/Icons";

const types: ("All" | EventType)[] = ["All", "National", "International", "Junior", "Para", "Education"];

export function EventsExplorer() {
  const [type, setType] = useState<(typeof types)[number]>("All");
  const [division, setDivision] = useState("All");
  const cities = useMemo(() => ["All", ...Array.from(new Set(events.map((e) => e.city)))], []);

  const list = events.filter(
    (e) => (type === "All" || e.type === type) && (division === "All" || e.city === division),
  );

  const byMonth = list.reduce<Record<string, typeof list>>((acc, e) => {
    const k = formatMonthYear(e.start);
    (acc[k] ??= []).push(e);
    return acc;
  }, {});

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by event type" className="no-scrollbar -mx-1 flex overflow-x-auto rounded-full bg-white p-1 shadow-[inset_0_0_0_1px_var(--bbf-line)]">
          {types.map((t) => (
            <button key={t} aria-pressed={type === t} onClick={() => setType(t)} className="pill shrink-0">
              {type === t && (
                <motion.span layoutId="event-type" className="absolute inset-0 rounded-full bg-violet" transition={{ type: "spring", stiffness: 500, damping: 40 }} />
              )}
              <span className="relative">{t}</span>
            </button>
          ))}
        </div>
        <label className="flex items-center gap-3">
          <span className="text-sm font-semibold">City</span>
          <select value={division} onChange={(e) => setDivision(e.target.value)} className="field !w-48 !py-2.5">
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        Showing {list.length} {list.length === 1 ? "event" : "events"}
      </p>

      <motion.div layout className="mt-4">
        <AnimatePresence mode="popLayout">
          {Object.entries(byMonth).map(([month, items]) => (
            <motion.section
              layout
              key={month}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10"
            >
              <h2 className="font-display mb-3 text-2xl font-extrabold text-violet">{month}</h2>
              <ul className="overflow-hidden rounded-xl border border-line bg-white">
                <AnimatePresence initial={false}>
                  {items.map((e) => (
                    <motion.li
                      layout
                      key={e.slug}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-b border-line last:border-b-0"
                    >
                      <Link
                        href={`/events/${e.slug}`}
                        className="group grid grid-cols-[64px_1fr_auto] items-center gap-4 px-4 py-5 transition-colors hover:bg-paper md:grid-cols-[88px_1fr_200px_48px] md:gap-6 md:px-6"
                      >
                        <div className="text-center leading-none">
                          <span className="font-display block text-4xl font-extrabold text-violet md:text-5xl">{formatDay(e.start)}</span>
                          <span className="text-sm font-semibold text-muted">{formatMonth(e.start)}</span>
                        </div>
                        <div className="min-w-0">
                          <span className={clsx("chip mb-2", e.type === "Junior" ? "chip-court" : e.type === "International" ? "chip-orange" : "chip-violet")}>
                            {e.type}
                          </span>
                          <h3 className="h-card !text-[1.45rem] group-hover:text-violet">{e.title}</h3>
                          <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                            <span>{formatRange(e.start, e.end)}</span>
                            <span className="inline-flex items-center gap-1">
                              <IconPin width={15} height={15} />
                              {e.city}
                            </span>
                          </p>
                        </div>
                        <div className="hidden text-sm md:block">
                          {e.entryDeadline ? (
                            <>
                              <span className="block font-semibold text-court">Entries open</span>
                              <span className="text-muted">Close {formatDate(e.entryDeadline)}</span>
                            </>
                          ) : (
                            <span className="text-muted">Entry opens soon</span>
                          )}
                        </div>
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-all duration-300 group-hover:translate-x-1 group-hover:border-orange group-hover:bg-orange">
                          <IconArrow width={18} height={18} />
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </motion.section>
          ))}
        </AnimatePresence>
        {list.length === 0 && (
          <div className="rounded-xl border border-dashed border-line p-10 text-center">
            <p className="font-semibold">No events match these filters.</p>
            <button
              className="mt-3 font-semibold text-violet link-underline"
              onClick={() => {
                setType("All");
                setDivision("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
