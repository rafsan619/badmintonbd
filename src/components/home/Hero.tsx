"use client";

import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { images } from "@/lib/images";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-brand", { y: 40, autoAlpha: 0, duration: 1 })
        .from(".hero-line", { y: 50, autoAlpha: 0, duration: 1 }, "-=0.55")
        .from(".hero-copy", { y: 30, autoAlpha: 0, duration: 0.8 }, "-=0.55")
        .from(".hero-cta", { y: 20, autoAlpha: 0, duration: 0.7 }, "-=0.4")
        .from(".hero-media", { scale: 1.08, autoAlpha: 0, duration: 1.3 }, "-=1.1");

      gsap.to(".hero-media img", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative min-h-[100svh] overflow-hidden bg-bbf-ink">
      <div className="absolute inset-0">
        <div className="hero-media absolute inset-0">
          <Image
            src={images.hero}
            alt="Badminton shuttlecock in play"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,7,17,0.9)_0%,rgba(10,7,17,0.68)_55%,rgba(10,7,17,0.35)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,7,17,0.66)_0%,rgba(10,7,17,0.12)_38%,rgba(10,7,17,0.9)_100%)]" />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-end px-4 pb-16 pt-32 md:px-8 md:pb-20">
        <p className="hero-brand eyebrow mb-5 w-fit rounded-sm border border-white/15 bg-black/60 px-4 py-2.5 !text-white shadow-lg backdrop-blur-md">
          Bangladesh Badminton Federation
        </p>
        <h1 className="hero-line display max-w-4xl text-[clamp(2.8rem,8vw,6.5rem)] text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.35)]">
          Where Bangladesh
          <br />
          meets the shuttle.
        </h1>
        <p className="hero-copy mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
          The national governing body for badminton — building athletes, clubs, and
          competitive pathways from grassroots courts to the world stage.
        </p>
        <div className="hero-cta mt-8 flex flex-wrap gap-3">
          <Link href="/athletes" className="btn btn-primary">
            Athlete Pathways
          </Link>
          <Link
            href="/events"
            className="btn btn-on-dark"
          >
            Upcoming Events
          </Link>
        </div>
      </div>
    </section>
  );
}
