"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FormShell } from "@/components/ui/FormShell";

const dark = "field !border-white/20 !bg-white/5 !text-white";

export function ReportForm() {
  const [anon, setAnon] = useState(false);

  return (
    <FormShell
      dark
      submitLabel="Send report"
      success={{
        title: "Report sent",
        body: anon
          ? "The integrity officer will review it. Because you reported anonymously, we can’t update you."
          : "The integrity officer will contact you within three working days.",
      }}
      className="rounded-xl border border-white/15 bg-white/5 p-6 md:p-8"
    >
      <div className="grid gap-4">
        <label>
          <span className="label !text-white">What is your concern about?</span>
          <select required name="topic" className={`${dark} !bg-ink`} defaultValue="">
            <option value="" disabled>Choose a topic</option>
            <option>Safeguarding or welfare</option>
            <option>Doping</option>
            <option>Match-fixing or betting</option>
            <option>Bullying, harassment or discrimination</option>
            <option>Governance or financial misconduct</option>
          </select>
        </label>
        <label>
          <span className="label !text-white">What happened?</span>
          <textarea required name="details" rows={5} className={dark} placeholder="Include where, when and who was involved, if you can." />
        </label>
        <label className="flex items-center gap-3 text-sm">
          <input type="checkbox" checked={anon} onChange={(e) => setAnon(e.target.checked)} className="h-4 w-4 accent-[var(--bbf-orange)]" />
          Report anonymously
        </label>
        <AnimatePresence initial={false}>
          {!anon && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="grid gap-4 overflow-hidden sm:grid-cols-2"
            >
              <label>
                <span className="label !text-white">Your name</span>
                <input name="name" className={dark} autoComplete="name" />
              </label>
              <label>
                <span className="label !text-white">Email or phone</span>
                <input name="contact" className={dark} />
              </label>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FormShell>
  );
}
