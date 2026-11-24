"use client";

import { FormShell } from "@/components/ui/FormShell";

export function ContactForm() {
  return (
    <FormShell
      submitLabel="Send message"
      success={{ title: "Message sent", body: "We’ll reply within two working days." }}
      className="rounded-xl border border-line bg-white p-6 md:p-8"
    >
      <h2 className="h-card mb-6 !text-3xl">Send us a message</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <label>
          <span className="label">Name</span>
          <input required name="name" className="field" autoComplete="name" />
        </label>
        <label>
          <span className="label">Email</span>
          <input required type="email" name="email" className="field" autoComplete="email" />
        </label>
      </div>
      <label className="mt-4 block">
        <span className="label">Topic</span>
        <select name="topic" className="field">
          <option>Competitions and entries</option>
          <option>Membership</option>
          <option>Media</option>
          <option>Partnerships</option>
          <option>Something else</option>
        </select>
      </label>
      <label className="mt-4 block">
        <span className="label">Message</span>
        <textarea required name="message" rows={6} className="field" />
      </label>
    </FormShell>
  );
}
