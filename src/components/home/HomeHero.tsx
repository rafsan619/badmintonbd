"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { CourtLines } from "@/components/ui/CourtLines";
import { Countdown } from "@/components/ui/Countdown";
import { Shuttle } from "@/components/ui/Icons";
import { images } from "@/lib/images";
import { events, results } from "@/lib/data";
import { formatDate, formatRange } from "@/lib/format";

gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin);

const lines = [
  { word: "Play.", href: "/play" },
  { word: "Compete.", href: "/events" },
  { word: "Represent Bangladesh.", href: "/players" },
];

export function HomeHero() {
  const root = useRef<HTMLElement>(null);
  const next = events.find((e) => e.entryDeadline) ?? events[0];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(".hero-photo", { scale: 1.15, autoAlpha: 0, duration: 2.2 }, 0)
          .fromTo(
            ".hero-court .court-line",
            { strokeDasharray: 1, strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 1.3, stagger: 0.05, ease: "power2.inOut" },
            0.2,
          )
          .fromTo(
            ".hero-court .court-net",
            { strokeDasharray: 1, strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 0.8, ease: "power3.inOut" },
            0.9,
          )
          .from(".hero-word", { yPercent: 115, duration: 1.1, stagger: 0.12 }, 0.6)
          .fromTo(
            ".hero-shuttle",
            { autoAlpha: 0 },
            {
              autoAlpha: 1,
              duration: 1.6,
              ease: "power1.inOut",
              motionPath: {
                path: "#flight",
                align: "#flight",
                alignOrigin: [0.5, 0.5],
                autoRotate: 90,
              },
            },
            1.0,
          )
          .from(".hero-fade", { autoAlpha: 0, y: 20, duration: 0.9, stagger: 0.1 }, 1.3);

        // Scroll: the court tips back into perspective as you leave the hero.
        gsap.to(".hero-court-plane", {
          rotateX: 58,
          yPercent: -12,
          scale: 1.1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero-copy", {
          yPercent: -18,
          autoAlpha: 0.2,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const ticker = results.flatMap((r) =>
    r.finals.map((f) => ({ ...f, event: r.event, date: r.date })),
  );

  return (
    <section ref={root} className="on-dark relative isolate overflow-hidden bg-ink text-white">
      <div className="hero-photo absolute inset-0 -z-10">
        <Image src={images.hero} alt="" fill priority sizes="100vw" className="object-cover opacity-35" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_80%_20%,transparent,var(--bbf-ink)_75%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/60" />
      </div>

      {/* Court plane */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center [perspective:1200px]">
        <div className="hero-court-plane relative w-[min(1400px,140vw)] origin-center lg:translate-x-[7%] max-md:rotate-90 max-md:w-[170vh]">
          <div className="hero-court text-white/[0.16]">
            <CourtLines strokeWidth={0.03} />
          </div>
          <svg viewBox="-0.2 -0.2 13.8 6.5" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
            <path id="flight" d="M1.6 4.6 C 4.5 -1.6, 8.5 -1.4, 11.4 2.1" stroke="none" />
          </svg>
          <Shuttle className="hero-shuttle invisible absolute left-0 top-0 h-[2.6%] w-auto min-h-6 text-orange" />
        </div>
      </div>

      <div className="wrap relative flex min-h-[calc(100svh-52px)] flex-col justify-end pb-12 pt-40">
        <div className="hero-copy grid items-end gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h1 className="h-display text-[clamp(3.2rem,8.2vw,7.25rem)] leading-[0.88]">
              {lines.map((l) => (
                <span key={l.word} className="block overflow-hidden pb-[0.04em]">
                  <Link
                    href={l.href}
                    className="hero-word group inline-block transition-colors duration-300 hover:text-orange"
                  >
                    {l.word}
                  </Link>
                </span>
              ))}
            </h1>
            <p className="hero-fade mt-7 max-w-xl text-lg text-white/75">
              The Bangladesh Badminton Federation runs the national calendar, rankings and squads,
              and supports more than 300 clubs across all eight divisions.
            </p>
            <div className="hero-fade mt-8 flex flex-wrap gap-3">
              <Link href="/play#clubs" className="btn btn-primary">
                Find a club near you
              </Link>
              <Link href="/events" className="btn btn-outline">
                See the calendar
              </Link>
            </div>
          </div>

          <aside
            aria-label="Next national event"
            className="hero-fade rounded-xl border border-white/15 bg-ink/60 p-6 backdrop-blur-md"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="chip chip-court !bg-court/25 !text-[#7fe0bd]">
                <span className="live-dot" /> Entries open
              </span>
              <span className="text-sm text-white/60">Closes {formatDate(next.entryDeadline!)}</span>
            </div>
            <p className="font-display mt-4 text-3xl font-extrabold leading-none">{next.title}</p>
            <p className="mt-2 text-white/70">
              {formatRange(next.start, next.end)}, {next.city}
            </p>
            <div className="mt-5">
              <Countdown to={next.start} dark />
            </div>
            <Link href={`/events/${next.slug}`} className="mt-5 inline-block font-semibold text-orange link-underline">
              Event details and entry
            </Link>
          </aside>
        </div>
      </div>

      {/* Results ticker */}
      <div className="hero-fade marquee relative border-t border-white/10 bg-ink/80 backdrop-blur">
        <div className="flex items-stretch">
          <Link
            href="/results"
            className="z-10 flex shrink-0 items-center bg-orange px-5 font-display text-lg font-extrabold text-ink"
          >
            Latest results
          </Link>
          <div className="overflow-hidden" style={{ "--marquee-duration": "70s" } as React.CSSProperties}>
            <ul className="marquee-track py-3.5">
              {[...ticker, ...ticker].map((t, i) => (
                <li key={i} className="flex shrink-0 items-center gap-3 px-6 text-sm" aria-hidden={i >= ticker.length}>
                  <span className="text-white/50">{t.event}</span>
                  <span className="font-semibold">{t.discipline}</span>
                  <span className="text-orange">{t.winner}</span>
                  <span className="text-white/50">beat {t.runnerUp}</span>
                  <span className="tabular text-white/80">{t.score}</span>
                  <span aria-hidden className="ml-4 h-1 w-1 rounded-full bg-white/30" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
