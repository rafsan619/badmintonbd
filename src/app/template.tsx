"use client";

import { motion } from "framer-motion";

/**
 * Re-mounts on every navigation: a violet wipe lifts off the new page
 * while the content settles into place.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[90] origin-top bg-violet"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div
          className="absolute inset-x-0 bottom-0 h-1.5 bg-orange"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      >
        {children}
      </motion.div>
    </>
  );
}
