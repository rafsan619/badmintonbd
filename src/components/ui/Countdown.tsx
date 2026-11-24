"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function parts(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    mins: Math.floor((diff / 60_000) % 60),
    secs: Math.floor((diff / 1000) % 60),
  };
}

/** Counts down to a date (Dhaka time, UTC+6). Renders placeholders until mounted. */
export function Countdown({ to, dark }: { to: string; dark?: boolean }) {
  const target = new Date(`${to}T09:00:00+06:00`).getTime();
  const [p, setP] = useState<ReturnType<typeof parts> | null>(null);

  useEffect(() => {
    const tick = () => setP(parts(target));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const cells = [
    ["days", p?.days],
    ["hrs", p?.hours],
    ["min", p?.mins],
    ["sec", p?.secs],
  ] as const;

  return (
    <div className="flex gap-2" role="timer" aria-label="Time until the event starts">
      {cells.map(([label, v]) => (
        <div
          key={label}
          className={`min-w-[3.6rem] rounded-md px-2 py-2 text-center ${dark ? "bg-white/10" : "bg-paper"}`}
        >
          <div className="font-display relative h-9 overflow-hidden text-3xl font-extrabold leading-9 tabular">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={v ?? "x"}
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                {v === undefined ? "--" : String(v).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className={`text-xs ${dark ? "text-white/60" : "text-muted"}`}>{label}</div>
        </div>
      ))}
    </div>
  );
}
