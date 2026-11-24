import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Timeline } from "@/components/about/Timeline";
import { images } from "@/lib/images";
import { affiliations, honours } from "@/lib/org";

export const metadata: Metadata = {
  title: "About BBF",
  description: "The Bangladesh Badminton Federation is the national governing body for badminton in Bangladesh.",
};

const priorities = [
  { t: "Grow participation", b: "More clubs, school programmes and come-and-play sessions in every division." },
  { t: "Build performance", b: "A clear pathway from district trials to the national squad, backed by qualified coaches." },
  { t: "Run fair competition", b: "A national calendar, transparent rankings and trained technical officials." },
  { t: "Protect the sport", b: "Clean sport, safe environments for children and adults at risk, and good governance." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About the federation"
        intro="The Bangladesh Badminton Federation is the national governing body for badminton, responsible for competition, development and representation."
        jump={[
          { href: "#purpose", label: "Our purpose" },
          { href: "#history", label: "History" },
          { href: "#honours", label: "Honours" },
          { href: "#affiliations", label: "Affiliations" },
        ]}
      />

      <section id="purpose" className="section">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image src={images.court} alt="Players during a doubles session" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
          </Reveal>
          <Reveal>
            <h2 className="h-section">Badminton for everyone in Bangladesh, and Bangladesh on the world stage</h2>
            <p className="lede mt-5">
              We set the rules for competition, run the national calendar and rankings, select national
              squads, educate coaches and officials, and support clubs and associations in all eight divisions.
            </p>
            <Link href="/governance" className="btn btn-outline mt-8">How we’re governed</Link>
          </Reveal>
        </div>
      </section>

      <section className="section bg-white">
        <div className="wrap">
          <SectionHeader title="Our four priorities" intro="From the federation’s strategic plan." />
          <Reveal stagger={0.08} className="grid gap-px overflow-hidden rounded-xl bg-line md:grid-cols-2 lg:grid-cols-4">
            {priorities.map((p) => (
              <div key={p.t} className="bg-white p-7">
                <h3 className="h-card">{p.t}</h3>
                <p className="mt-2 text-muted">{p.b}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <Timeline />

      <section id="honours" className="section">
        <div className="wrap">
          <SectionHeader title="Honours" intro="Recent national champions. A full roll of honour is in preparation." link={{ href: "/results", label: "Latest results" }} />
          <Reveal as="ul" stagger={0.07} className="divide-y divide-line border-y border-line">
            {honours.map((h) => (
              <li key={h.year + h.detail} className="grid gap-2 py-5 md:grid-cols-[120px_240px_1fr] md:items-baseline">
                <span className="font-display text-4xl font-black text-violet">{h.year}</span>
                <span className="font-semibold">{h.title}</span>
                <span className="text-muted">{h.detail}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="affiliations" className="section bg-paper-2">
        <div className="wrap">
          <SectionHeader title="Affiliations" />
          <Reveal stagger={0.08} className="grid gap-4 md:grid-cols-3">
            {affiliations.map((a) => (
              <div key={a.short} className="rounded-xl bg-white p-6">
                <p className="font-display text-5xl font-black text-violet">{a.short}</p>
                <p className="mt-2 font-semibold">{a.name}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
