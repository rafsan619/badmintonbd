"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconCheck } from "./Icons";

/**
 * Client-side form wrapper with a confirmation state.
 * TODO: connect `onSubmit` to a server action or email service before launch —
 * submissions are currently not sent anywhere.
 */
export function FormShell({
  children,
  success,
  submitLabel,
  className,
  dark,
}: {
  children: React.ReactNode;
  success: { title: string; body: string };
  submitLabel: string;
  className?: string;
  dark?: boolean;
}) {
  const [sent, setSent] = useState(false);

  return (
    <div className={className}>
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            className="flex items-start gap-4"
          >
            <motion.span
              initial={{ scale: 0, rotate: -40 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 18, delay: 0.1 }}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-court text-white"
            >
              <IconCheck />
            </motion.span>
            <div>
              <p className="font-display text-2xl font-bold">{success.title}</p>
              <p className={dark ? "mt-1 text-white/70" : "mt-1 text-muted"}>{success.body}</p>
              <button
                type="button"
                className={`mt-3 text-sm font-semibold link-underline ${dark ? "text-orange" : "text-violet"}`}
                onClick={() => setSent(false)}
              >
                Send another
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            {children}
            <button type="submit" className="btn btn-primary mt-6">
              {submitLabel}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
