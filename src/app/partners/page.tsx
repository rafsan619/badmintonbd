import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Shuttle } from "@/components/ui/Icons";
import { ContactForm } from "@/components/contact/ContactForm";
import { partners } from "@/lib/org";

export const metadata: Metadata = {
  title: "Partners",
  description: "Partners and sponsors of the Bangladesh Badminton Federation, and how to partner with us.",
};

const tiers = [
  { key: "principal" as const, title: "Principal partner", size: "h-44 md:col-span-3" },
  { key: "official" as const, title: "Official partners", size: "h-32" },
  { key: "supporters" as const, title: "Supporters", size: "h-24" },
];

const offers = [
  { t: "National team", b: "Kit, travel and naming rights connected to the senior and junior squads." },
  { t: "Events", b: "Title and presenting rights at the National Championships and international events." },
  { t: "Grassroots", b: "Fund schools programmes, come-and-play sessions and equipment in a division of your choice." },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero title="Partners" intro="The organisations that help us grow badminton across Bangladesh." jump={[{ href: "#current", label: "Current partners" }, { href: "#partner", label: "Partner with us" }]} />

      <section id="current" className="section">
        <div className="wrap space-y-12">
          {tiers.map((t) => (
            <Reveal key={t.key}>
              <h2 className="font-display mb-4 text-2xl font-extrabold">{t.title}</h2>
              <ul className={`grid gap-4 ${t.key === "principal" ? "md:grid-cols-3" : t.key === "official" ? "sm:grid-cols-3" : "grid-cols-2 md:grid-cols-4"}`}>
                {partners[t.key].map((p) => (
                  <li key={p} className={`flex items-center justify-center gap-3 rounded-xl border border-dashed border-line bg-white text-muted ${t.size}`}>
                    <Shuttle className="h-7 w-7 text-violet/40" />
                    <span className="font-semibold">{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="partner" className="section bg-white">
        <div className="wrap">
          <SectionHeader title="Partner with us" intro="Packages are built around what you want to achieve. Tell us about your goals and we’ll send a proposal." />
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <Reveal as="ul" stagger={0.08} className="space-y-4">
              {offers.map((o) => (
                <li key={o.t} className="rounded-xl bg-paper p-6">
                  <h3 className="h-card">{o.t}</h3>
                  <p className="mt-2 text-muted">{o.b}</p>
                </li>
              ))}
            </Reveal>
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
