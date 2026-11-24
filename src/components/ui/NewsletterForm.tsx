"use client";

import { FormShell } from "./FormShell";

export function NewsletterForm() {
  return (
    <FormShell
      dark
      submitLabel="Subscribe"
      success={{ title: "You're subscribed", body: "The next bulletin will arrive in your inbox." }}
      className="self-end"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="label !text-white">Email address</span>
          <input type="email" required name="email" autoComplete="email" className="field !border-white/20 !bg-white/5 !text-white" />
        </label>
        <label className="block">
          <span className="label !text-white">I’m mostly interested in</span>
          <select name="topic" className="field !border-white/20 !bg-ink !text-white">
            <option>Everything</option>
            <option>National team</option>
            <option>Junior pathway</option>
            <option>Coaching and officiating</option>
          </select>
        </label>
      </div>
    </FormShell>
  );
}
