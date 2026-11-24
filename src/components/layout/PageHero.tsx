"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CourtLines } from "@/components/ui/CourtLines";

gsap.registerPlugin(useGSAP);

type Crumb = { href: string; label: string };

type PageHeroProps = {
  title: string;
  intro?: string;
  crumbs?: Crumb[];
  jump?: Crumb[];
  children?: React.ReactNode;
};

export function PageHero({ title, intro, crumbs = [], jump, children }: PageHeroProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.fromTo(
          ".court-line, .court-net",
          { strokeDasharray: 1, strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 1.4, stagger: 0.04, ease: "power2.inOut" },
          0,
        )
          .from(".ph-word", { yPercent: 110, duration: 1, stagger: 0.05 }, 0.1)
          .from(".ph-fade", { autoAlpha: 0, y: 16, duration: 0.8, stagger: 0.08 }, 0.4);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="on-dark relative overflow-hidden bg-ink pb-14 pt-[calc(76px+3.5rem)] text-white lg:pt-[calc(var(--header-h)+4rem)]"
    >
      <CourtLines
        className="pointer-events-none absolute -right-24 top-1/2 w-[min(980px,110vw)] -translate-y-1/2 text-white/[0.13] max-md:-right-64"
        strokeWidth={0.035}
      />
      <div className="wrap relative">
        <nav aria-label="Breadcrumb" className="ph-fade mb-6 text-sm text-white/60">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-orange">Home</Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.href} className="flex items-center gap-2">
                <span aria-hidden>/</span>
                <Link href={c.href} className="hover:text-orange">{c.label}</Link>
              </li>
            ))}
            <li className="flex items-center gap-2 text-white/90" aria-current="page">
              <span aria-hidden>/</span>
              {title}
            </li>
          </ol>
        </nav>
        <h1 className="h-display max-w-5xl text-[clamp(3rem,8vw,6.5rem)]">
          {title.split(" ").map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
              <span className="ph-word inline-block">{w}&nbsp;</span>
            </span>
          ))}
        </h1>
        {intro && <p className="ph-fade mt-6 max-w-2xl text-lg text-white/75">{intro}</p>}
        {children && <div className="ph-fade mt-8">{children}</div>}
        {jump && (
          <nav aria-label="On this page" className="ph-fade mt-10">
            <ul className="flex flex-wrap gap-2">
              {jump.map((j) => (
                <li key={j.href}>
                  <a
                    href={j.href}
                    className="inline-flex rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white/85 transition-colors hover:border-orange hover:bg-orange hover:text-ink"
                  >
                    {j.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </section>
  );
}
