"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function ShareLinks({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const share = (base: string) => {
    const url = encodeURIComponent(window.location.href);
    window.open(`${base}${url}&text=${encodeURIComponent(title)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div>
      <p className="font-semibold">Share this story</p>
      <div className="mt-3 flex flex-wrap gap-2 lg:flex-col">
        <button className="btn btn-outline !min-h-10 !justify-start" onClick={() => share("https://www.facebook.com/sharer/sharer.php?u=")}>
          Facebook
        </button>
        <button className="btn btn-outline !min-h-10 !justify-start" onClick={() => share("https://x.com/intent/post?url=")}>
          X
        </button>
        <button
          className="btn btn-outline !min-h-10 !justify-start"
          onClick={async () => {
            await navigator.clipboard?.writeText(window.location.href);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={String(copied)} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }}>
              {copied ? "Link copied" : "Copy link"}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
