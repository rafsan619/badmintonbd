"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FormShell } from "@/components/ui/FormShell";
import { divisions } from "@/lib/data";

const types = [
  { id: "player", label: "Player", fee: "৳500 a year", note: "Needed to enter sanctioned tournaments." },
  { id: "club", label: "Club", fee: "৳5,000 a year", note: "Requires a named welfare officer." },
  { id: "coach", label: "Coach", fee: "৳1,000 a year", note: "Requires a current coaching licence." },
  { id: "volunteer", label: "Volunteer or official", fee: "Free", note: "Events, line judging and umpiring." },
] as const;

export function RegistrationForm() {
  const [type, setType] = useState<(typeof types)[number]["id"]>("player");
  const t = types.find((x) => x.id === type)!;

  return (
    <FormShell
      submitLabel={`Submit ${t.label.toLowerCase()} registration`}
      success={{
        title: "Registration received",
        body: "Your division association will review it within ten working days and email you the next steps.",
      }}
      className="rounded-xl border border-line bg-white p-6 md:p-8"
    >
      <fieldset>
        <legend className="label">I’m registering as a</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {types.map((x) => (
            <label
              key={x.id}
              className={`relative cursor-pointer rounded-lg border-2 p-4 transition-colors ${type === x.id ? "border-violet" : "border-line hover:border-violet/40"}`}
            >
              <input type="radio" name="type" value={x.id} checked={type === x.id} onChange={() => setType(x.id)} className="sr-only" />
              {type === x.id && (
                <motion.span layoutId="reg-type" className="absolute inset-0 -z-0 rounded-md bg-violet/5" />
              )}
              <span className="relative block font-semibold">{x.label}</span>
              <span className="relative block text-sm text-muted">{x.fee}</span>
            </label>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.p key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-3 text-sm text-muted">
            {t.note}
          </motion.p>
        </AnimatePresence>
      </fieldset>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label>
          <span className="label">{type === "club" ? "Club name" : "Full name"}</span>
          <input required name="name" className="field" autoComplete={type === "club" ? "organization" : "name"} />
        </label>
        <label>
          <span className="label">Email</span>
          <input required type="email" name="email" className="field" autoComplete="email" />
        </label>
        <label>
          <span className="label">Mobile number</span>
          <input required type="tel" name="phone" className="field" autoComplete="tel" placeholder="01XXXXXXXXX" />
        </label>
        <label>
          <span className="label">Division</span>
          <select name="division" className="field" required defaultValue="">
            <option value="" disabled>Choose a division</option>
            {divisions.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>
        {type === "player" && (
          <label>
            <span className="label">Date of birth</span>
            <input required type="date" name="dob" className="field" />
          </label>
        )}
        {type !== "club" && (
          <label>
            <span className="label">Club (if any)</span>
            <input name="club" className="field" />
          </label>
        )}
      </div>
      <label className="mt-5 flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" required className="mt-1 h-4 w-4 accent-[var(--bbf-violet)]" />
        I agree to the BBF code of conduct and safeguarding policy. Under-18s need a parent or guardian to submit this form.
      </label>
    </FormShell>
  );
}
