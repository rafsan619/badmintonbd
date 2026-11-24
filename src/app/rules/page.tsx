import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { CourtLines } from "@/components/ui/CourtLines";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Laws of the game",
  description: "A plain-language guide to badminton scoring, service, faults and court dimensions.",
};

const laws = [
  {
    q: "Scoring",
    a: "Matches are best of three games to 21 points. Every rally wins a point. At 20–20 a side must lead by two, up to a maximum of 30. The side that wins a game serves first in the next.",
  },
  {
    q: "Service",
    a: "Serve diagonally, below waist height (1.15 m from the floor), with both feet still and in contact with the floor. The server serves from the right court when their score is even and the left when it’s odd.",
  },
  {
    q: "Faults",
    a: "It’s a fault if the shuttle lands outside the boundary, passes under or through the net, touches a player or their clothing, or is hit twice by the same side. Touching the net or invading the opponent’s court is also a fault.",
  },
  {
    q: "Lets",
    a: "A let is called when an unforeseen event stops play, such as a shuttle from another court. The rally is replayed and no point is scored.",
  },
  {
    q: "Intervals and changing ends",
    a: "Players get a 60-second interval when the leading score reaches 11, and two minutes between games. In a third game, ends change when the leading score reaches 11.",
  },
];

const dims = [
  ["Court length", "13.40 m"],
  ["Doubles width", "6.10 m"],
  ["Singles width", "5.18 m"],
  ["Net height at centre", "1.524 m"],
  ["Short service line from net", "1.98 m"],
  ["Doubles long service line from back", "0.76 m"],
];

export default function RulesPage() {
  return (
    <>
      <PageHero
        title="Laws of the game"
        intro="A plain-language summary of the BWF Laws of Badminton. Tournament referees apply the full official text."
      />
      <section className="section">
        <div className="wrap grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <Accordion items={laws} />
          </Reveal>
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-xl bg-court p-6 text-white">
              <CourtLines className="w-full text-white" strokeWidth={0.06} />
              <p className="mt-3 text-sm text-white/75">Doubles court, to scale. The orange line is the net.</p>
            </div>
            <dl className="mt-6 divide-y divide-line rounded-xl border border-line bg-white">
              {dims.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 px-5 py-3">
                  <dt className="text-muted">{k}</dt>
                  <dd className="font-semibold tabular">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>
    </>
  );
}
