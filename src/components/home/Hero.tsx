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
    <section ref={root} className="relative min-h-[100svh] overflow-hidden pt-28">
      <div className="absolute inset-0">
        <div className="hero-media absolute inset-0">
          <Image
            src={images.hero}
            alt="Badminton shuttlecock in play"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f4f2ef]/via-[#f4f2ef]/80 to-[#f4f2ef]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f4f2ef] via-transparent to-[#f4f2ef]/40" />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-7rem)] max-w-[1400px] flex-col justify-end px-4 pb-16 md:px-8 md:pb-20">
        <p className="hero-brand eyebrow mb-5 text-bbf-orange">
          Bangladesh Badminton Federation
        </p>
        <h1 className="hero-line display max-w-4xl text-[clamp(2.8rem,8vw,6.5rem)] text-bbf-purple">
          Where Bangladesh
          <br />
          meets the shuttle.
        </h1>
        <p className="hero-copy mt-6 max-w-xl text-base leading-relaxed text-bbf-ink-soft md:text-lg">
          The national governing body for badminton — building athletes, clubs, and
          competitive pathways from grassroots courts to the world stage.
        </p>
        <div className="hero-cta mt-8 flex flex-wrap gap-3">
          <Link href="/athletes" className="btn btn-primary">
            Athlete Pathways
          </Link>
          <Link href="/events" className="btn btn-ghost">
            Upcoming Events
          </Link>
        </div>
      </div>
    </section>
  );
}
