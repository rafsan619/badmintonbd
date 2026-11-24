import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { EventCard } from "@/components/events/EventCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { coachLevels, officialGrades } from "@/lib/org";
import { events } from "@/lib/data";

export const metadata: Metadata = {
  title: "Coach and official zone",
  description: "Coach licensing levels, umpire and referee grades, and upcoming education courses in Bangladesh badminton.",
};

export default function CoachingPage() {
  const courses = events.filter((e) => e.type === "Education");

  return (
    <>
      <PageHero
        title="Coach and official zone"
        intro="Licensing, courses and assessments for coaches, umpires and referees."
        jump={[
          { href: "#coaches", label: "Coach licensing" },
          { href: "#officials", label: "Umpires and referees" },
          { href: "#courses", label: "Upcoming courses" },
        ]}
      />

      <section id="coaches" className="section">
        <div className="wrap">
          <SectionHeader
            title="Coach licensing"
            intro="Four levels aligned to the BWF coach education framework. Each level needs a valid safeguarding certificate and first-aid training."
          />
          <Reveal as="ol" stagger={0.08} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {coachLevels.map((c, i) => (
              <li key={c.level} className="rounded-xl bg-white p-6 shadow-[inset_0_0_0_1px_var(--bbf-line)]">
                <span aria-hidden className="mb-4 flex h-8 items-end gap-1">
                  {[0, 1, 2, 3].map((b) => (
                    <span
                      key={b}
                      className={`w-2 rounded-sm ${b <= i ? "bg-violet" : "bg-paper-2"}`}
                      style={{ height: `${(b + 1) * 25}%` }}
                    />
                  ))}
                </span>
                <p className="relative text-sm font-semibold text-orange-text">{c.level}</p>
                <h3 className="h-card relative mt-1">{c.title}</h3>
                <p className="relative mt-2 text-muted">{c.body}</p>
                <p className="relative mt-4 text-sm font-semibold">{c.hours}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="officials" className="section on-dark bg-violet text-white">
        <div className="wrap">
          <SectionHeader
            title="Umpires and referees"
            intro="Technical officials keep competition fair. Start as a line judge and work up through assessed grades."
            className="[&_.lede]:text-white/70"
          />
          <Reveal as="ol" stagger={0.08} className="grid gap-px overflow-hidden rounded-xl bg-white/15 md:grid-cols-4">
            {officialGrades.map((g, i) => (
              <li key={g.grade} className="bg-violet p-6">
                <span className="font-display text-5xl font-black text-white/20">{i + 1}</span>
                <h3 className="h-card mt-2">{g.grade}</h3>
                <p className="mt-2 text-white/70">{g.body}</p>
              </li>
            ))}
          </Reveal>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/membership#volunteer" className="btn btn-primary">Register interest as an official</Link>
            <Link href="/rules" className="btn btn-outline">Laws of the game</Link>
          </div>
        </div>
      </section>

      <section id="courses" className="section">
        <div className="wrap">
          <SectionHeader title="Upcoming courses" link={{ href: "/events", label: "Full calendar" }} />
          <Reveal stagger={0.08} className="grid gap-4 md:grid-cols-3">
            {courses.map((e) => (
              <EventCard key={e.slug} event={e} />
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
