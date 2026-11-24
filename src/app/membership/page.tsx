import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PlayerLookup } from "@/components/membership/PlayerLookup";
import { RegistrationForm } from "@/components/membership/RegistrationForm";
import { Accordion } from "@/components/ui/Accordion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { faqs } from "@/lib/org";

export const metadata: Metadata = {
  title: "Membership and registration",
  description: "Register as a player, club, coach or volunteer with the Bangladesh Badminton Federation, and look up your player ID.",
};

const roles = [
  { t: "Event volunteer", b: "Help with results desks, court management and athlete hospitality at national events." },
  { t: "Line judge", b: "One-day course, then supervised matches. The first step to becoming an umpire." },
  { t: "Club welfare officer", b: "Be the safeguarding contact in your club. Training is provided free." },
];

export default function MembershipPage() {
  return (
    <>
      <PageHero
        title="Membership and registration"
        intro="Register once a year to compete, coach, run a club or volunteer."
        jump={[
          { href: "#player-id", label: "Player ID lookup" },
          { href: "#register", label: "Register" },
          { href: "#volunteer", label: "Volunteer" },
          { href: "#faq", label: "Questions" },
        ]}
      />

      <section id="player-id" className="section on-dark bg-violet text-white">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <h2 className="h-section">Check your player ID</h2>
            <p className="mt-4 max-w-md text-white/75">
              You need an active ID to enter any sanctioned tournament. Look it up before the entry deadline.
            </p>
          </Reveal>
          <Reveal>
            <PlayerLookup />
          </Reveal>
        </div>
      </section>

      <section id="register" className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <h2 className="h-section">Register with BBF</h2>
            <p className="lede mt-4">
              Registrations run from January to December. Fees go towards insurance, rankings and the
              national calendar.
            </p>
            <ul className="mt-8 space-y-3">
              {["Tournament entry and national ranking", "Insurance at sanctioned events", "Coaching and official courses at member rates", "A vote at your division’s general meeting"].map((x) => (
                <li key={x} className="flex gap-3">
                  <span aria-hidden className="mt-2.5 h-0.5 w-5 shrink-0 bg-orange" /> {x}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <RegistrationForm />
          </Reveal>
        </div>
      </section>

      <section id="volunteer" className="section bg-white">
        <div className="wrap">
          <SectionHeader title="Volunteer with us" intro="Events don’t run without volunteers. Choose the role in the registration form above." />
          <Reveal stagger={0.08} className="grid gap-4 md:grid-cols-3">
            {roles.map((r) => (
              <div key={r.t} className="rounded-xl bg-paper p-6">
                <h3 className="h-card">{r.t}</h3>
                <p className="mt-2 text-muted">{r.b}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="faq" className="section">
        <div className="wrap max-w-4xl">
          <h2 className="h-section mb-8">Questions</h2>
          <Accordion items={faqs.map((f) => ({ q: f.q, a: f.a }))} />
        </div>
      </section>
    </>
  );
}
