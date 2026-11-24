"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gallery } from "@/lib/images";
import { IconArrow, IconClose } from "@/components/ui/Icons";
import { useLenis } from "@/components/providers/SmoothScroll";

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const lenis = useLenis();
  const n = gallery.length;
  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + n) % n)), [n]);

  useEffect(() => {
    if (open === null) {
      lenis?.start();
      return;
    }
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step, lenis]);

  return (
    <>
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {gallery.map((g, i) => (
          <li key={g.src + i} className="mb-4 break-inside-avoid">
            <button onClick={() => setOpen(i)} className="group relative block w-full overflow-hidden rounded-xl text-left" aria-label={`Open photo: ${g.alt}`}>
              <motion.div layoutId={`photo-${i}`} className={`img-zoom relative w-full ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                <Image src={g.src} alt={g.alt} fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover" />
              </motion.div>
              <span className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/85 to-transparent p-4 pt-10 text-sm font-semibold text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {g.event}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-ink/95 p-4 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={gallery[open].alt}
            onClick={() => setOpen(null)}
          >
            <motion.div layoutId={`photo-${open}`} className="relative h-full max-h-[80vh] w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
              <Image src={gallery[open].src} alt={gallery[open].alt} fill sizes="100vw" className="object-contain" />
            </motion.div>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-white/80">
              {gallery[open].event}
              <span className="ml-3 text-white/50 tabular">
                {open + 1} of {n}
              </span>
            </p>
            <button className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-orange hover:text-ink" onClick={() => setOpen(null)} aria-label="Close photo" autoFocus>
              <IconClose />
            </button>
            <button className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 rotate-180 items-center justify-center rounded-full bg-white/10 text-white hover:bg-orange hover:text-ink" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous photo">
              <IconArrow />
            </button>
            <button className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-orange hover:text-ink" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next photo">
              <IconArrow />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
