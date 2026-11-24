import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { ClubFinder } from "@/components/play/ClubFinder";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { images } from "@/lib/images";
import { sessions } from "@/lib/org";

export const metadata: Metadata = {
  title: "Get into badminton",
  description: "Find a badminton club or session in Bangladesh, para badminton, schools programmes and how to start playing.",
};

const firstSteps = [
  { title: "Find a session", body: "Come-and-play sessions need no booking. Rackets and shuttles are provided." },
  { title: "Join a club", body: "Clubs offer regular coaching, league teams and a route into tournaments." },
  { title: "Get a player ID", body: "Register with BBF once you want to play sanctioned events." },
];

export default function PlayPage() {
  return (
    <>
      <PageHero
        title="Get into badminton"
        intro="Whether you’re eight or eighty, there’s a court near you. Here’s how to start."
        jump={[
          { href: "#start", label: "First steps" },
          { href: "#sessions", label: "Come and play" },
          { href: "#clubs", label: "Find a club" },
          { href: "#para", label: "Para badminton" },
          { href: "#schools", label: "Schools" },
        ]}
      />

      <section id="start" className="section">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="h-section">Three steps to your first game</h2>
            <ol className="mt-8 space-y-6">
              {firstSteps.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[56px_1fr] gap-4">
                  <span className="font-display flex h-14 w-14 items-center justify-center rounded-full bg-orange text-2xl font-black text-ink">{i + 1}</span>
                  <div>
                    <h3 className="h-card">{s.title}</h3>
                    <p className="mt-1 text-muted">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal className="img-zoom relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image src={images.outdoor} alt="Young player hitting a shuttle outdoors" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
          </Reveal>
        </div>
      </section>

      <section id="sessions" className="section bg-white">
        <div className="wrap">
          <SectionHeader title="Come-and-play sessions" intro="Free, drop-in and run by qualified coaches. Bring indoor shoes and water." />
          <Reveal as="ul" stagger={0.06} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sessions.map((s) => (
              <li key={s.place + s.day} className="rounded-xl bg-paper p-6">
                <p className="font-display text-3xl font-extrabold text-violet">{s.day}</p>
                <p className="tabular font-semibold">{s.time}</p>
                <p className="mt-4">{s.place}</p>
                <p className="text-sm text-muted">{s.who}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="clubs" className="section">
        <div className="wrap">
          <SectionHeader title="Find a club" intro="Every club listed is affiliated to BBF, with a named welfare officer and qualified coaches." />
          <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-paper-2" />}>
            <ClubFinder />
          </Suspense>
        </div>
      </section>

      <section id="para" className="section on-dark bg-ink text-white">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image src={images.shuttleRacket} alt="Shuttle resting on a racket" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
          </Reveal>
          <Reveal>
            <h2 className="h-section">Para badminton</h2>
            <p className="mt-5 text-lg text-white/75">
              Para badminton is played in six sport classes covering wheelchair, standing and short-stature
              players. BBF runs inclusive club sessions, on-site classification at the Para Badminton Open
              and a para squad pathway.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-3">
              {["Wheelchair: WH1, WH2", "Standing: SL3, SL4, SU5", "Short stature: SH6"].map((c) => (
                <li key={c} className="rounded-lg border border-white/15 px-4 py-3 text-sm">{c}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/events/para-badminton-open-2027" className="btn btn-primary">Para Badminton Open</Link>
              <a href="#clubs" className="btn btn-outline">Find a para-friendly club</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="schools" className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <h2 className="h-section">Schools and Shuttle Time</h2>
            <p className="lede mt-5">
              Shuttle Time is the BWF schools programme. BBF trains PE teachers to deliver it and lends
              starter kits to schools that join.
            </p>
          </Reveal>
          <Reveal stagger={0.08} className="grid gap-4 sm:grid-cols-2">
            {[
              { t: "Teacher training", b: "One-day workshop with lesson plans for ages 5 to 15." },
              { t: "Starter kit loan", b: "Rackets, shuttles and a portable net for one term." },
              { t: "Inter-school festival", b: "Division festivals each spring for schools in the programme." },
              { t: "AirBadminton", b: "Outdoor version for playgrounds and open spaces." },
            ].map((x) => (
              <div key={x.t} className="rounded-xl border border-line bg-white p-6">
                <h3 className="h-card">{x.t}</h3>
                <p className="mt-2 text-muted">{x.b}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
