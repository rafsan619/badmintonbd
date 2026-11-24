"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { MotionConfig } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: { offset: -120 },
      stopInertiaOnNavigate: true,
      prevent: (node) => node.closest("[data-lenis-prevent]") !== null,
    });
    instance.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- expose the instance once created
    setLenis(instance);

    return () => {
      gsap.ticker.remove(ticker);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  // On route change: jump to top (or the hash target) and refresh triggers.
  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    const hash = window.location.hash;
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (lenis) {
      if (target) lenis.scrollTo(target, { offset: -120, immediate: true });
      else lenis.scrollTo(0, { immediate: true });
    }
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(t);
  }, [pathname, lenis]);

  return (
    <LenisContext.Provider value={lenis}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LenisContext.Provider>
  );
}
