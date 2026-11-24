"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { useLenis } from "@/components/providers/SmoothScroll";
import { Shuttle } from "./Icons";

export function BackToTop() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  const lenis = useLenis();
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 900));

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          whileHover={{ y: -4 }}
          onClick={() => (lenis ? lenis.scrollTo(0, { duration: 1.4 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
          className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-violet text-white shadow-lg shadow-ink/30 transition-colors hover:bg-orange hover:text-ink"
        >
          <Shuttle className="h-6 w-6 rotate-180" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
