"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { documents, type Doc } from "@/lib/org";
import { IconDownload } from "@/components/ui/Icons";

const kinds: ("All" | Doc["type"])[] = ["All", "Regulation", "Policy", "Report", "Minutes", "Form"];

export function DocumentLibrary() {
  const [kind, setKind] = useState<(typeof kinds)[number]>("All");
  const [q, setQ] = useState("");
  const list = documents.filter(
    (d) => (kind === "All" || d.type === kind) && d.title.toLowerCase().includes(q.trim().toLowerCase()),
  );

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Document type" className="no-scrollbar -mx-1 flex overflow-x-auto rounded-full bg-white p-1 shadow-[inset_0_0_0_1px_var(--bbf-line)]">
          {kinds.map((k) => (
            <button key={k} aria-pressed={kind === k} onClick={() => setKind(k)} className="pill shrink-0">
              {kind === k && <motion.span layoutId="doc-kind" className="absolute inset-0 rounded-full bg-violet" transition={{ type: "spring", stiffness: 500, damping: 40 }} />}
              <span className="relative">{k}</span>
            </button>
          ))}
        </div>
        <label className="lg:w-80">
          <span className="sr-only">Search documents</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search documents" className="field" />
        </label>
      </div>
      <motion.ul layout className="mt-6 overflow-hidden rounded-xl border border-line bg-white">
        <AnimatePresence initial={false}>
          {list.map((d) => (
            <motion.li
              layout
              key={d.title}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-b border-line last:border-b-0"
            >
              {/* TODO: link each row to the hosted PDF once documents are uploaded. */}
              <div className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-paper">
                <span className="font-display flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-paper-2 text-sm font-extrabold text-violet">PDF</span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{d.title}</p>
                  <p className="text-sm text-muted">
                    {d.type}, {d.year}, {d.size}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm font-semibold text-muted" title="Document upload pending">
                  <IconDownload width={16} height={16} /> Coming soon
                </span>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
        {list.length === 0 && <li className="p-8 text-center text-muted">No documents match your search.</li>}
      </motion.ul>
    </div>
  );
}
