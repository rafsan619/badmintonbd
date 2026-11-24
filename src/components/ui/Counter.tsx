"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

const nf = new Intl.NumberFormat("en-GB");

export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduce) {
      el.textContent = nf.format(value) + suffix;
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = nf.format(Math.round(v)) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix, reduce]);

  return (
    <span ref={ref} className="tabular">
      {nf.format(value)}
      {suffix}
    </span>
  );
}
