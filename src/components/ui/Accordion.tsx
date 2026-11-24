"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconPlus } from "./Icons";

export function Accordion({ items }: { items: { q: string; a: React.ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <li key={it.q}>
            <h3>
              <button
                id={`${base}-h${i}`}
                aria-expanded={isOpen}
                aria-controls={`${base}-p${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="text-lg font-semibold transition-colors group-hover:text-violet">{it.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? "var(--bbf-orange)" : "rgba(0,0,0,0)" }}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line"
                >
                  <IconPlus width={18} height={18} />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${base}-p${i}`}
                  role="region"
                  aria-labelledby={`${base}-h${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="max-w-3xl pb-6 text-muted">{it.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
