"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Animate direct children one after another instead of the wrapper. */
  stagger?: number;
  as?: "div" | "section" | "ul" | "ol";
};

export function Reveal({ children, className, delay = 0, y = 36, stagger, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = stagger ? Array.from(el.children) : el;
        gsap.from(targets, {
          autoAlpha: 0,
          y,
          duration: 0.9,
          delay,
          stagger: stagger ?? 0,
          ease: "expo.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const Tag = as;
  return (
    <Tag ref={ref as React.Ref<never>} className={className}>
      {children}
    </Tag>
  );
}
