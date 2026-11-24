import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ReportForm } from "@/components/integrity/ReportForm";
import { integrityAreas, sanctions } from "@/lib/org";
import { contact } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Integrity",
  description: "Anti-doping, safeguarding, match-fixing rules and how to report a concern in Bangladesh badminton.",
};

export default function IntegrityPage() {
  return (
    <>
      <PageHero
        title="Integrity"
        intro="Clean, safe and honest badminton. What the rules are, and how to report a concern in confidence."
        jump={[
          ...integrityAreas.map((a) => ({ href: `#${a.id}`, label: a.title })),
          { href: "#sanctions", label: "Sanctions" },
          { href: "#report", label: "Report a concern" },
        ]}
      />

      {integrityAreas.map((a, i) => (
        <section key={a.id} id={a.id} className={`section ${i % 2 ? "bg-white" : ""}`}>
          <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <Reveal>
              <div className="court-rule mb-8" />
              <h2 className="h-section">{a.title}</h2>
              <p className="lede mt-4">{a.body}</p>
            </Reveal>
            <Reveal as="ul" stagger={0.08} className="space-y-3 self-end">
              {a.points.map((p) => (
                <li key={p} className="flex items-start gap-4 rounded-xl border border-line bg-white p-5">
                  <span aria-hidden className="mt-2 h-2.5 w-2.5 shrink-0 rotate-45 bg-orange" />
                  <span className="font-semibold">{p}</span>
                </li>
              ))}
            </Reveal>
          </div>
        </section>
      ))}

      <section id="sanctions" className="section bg-paper-2">
        <div className="wrap">
          <SectionHeader title="Current sanctions" intro="Decisions under BBF anti-doping, conduct and integrity rules are published here once final." />
          <ul className="rounded-xl border border-line bg-white">
            {sanctions.map((s) => (
              <li key={s.name} className="p-6">
                <p className="font-semibold">{s.name}</p>
                <p className="text-muted">{s.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="report" className="section on-dark bg-ink text-white">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <h2 className="h-section">Report a concern</h2>
            <p className="mt-4 max-w-md text-white/75">
              Reports go to the integrity officer only. You can stay anonymous. If someone is in immediate
              danger, call 999 first.
            </p>
            <p className="mt-6 text-white/75">
              Prefer email?{" "}
              <a href={`mailto:${contact.integrity}`} className="font-semibold text-orange link-underline">
                {contact.integrity}
              </a>
            </p>
          </Reveal>
          <Reveal>
            <ReportForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
