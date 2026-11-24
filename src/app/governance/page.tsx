import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { DocumentLibrary } from "@/components/governance/DocumentLibrary";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { committees, executive, notices } from "@/lib/org";
import { contact } from "@/lib/nav";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Governance",
  description: "Executive committee, standing committees, constitution, annual reports, AGM minutes, tenders and vacancies.",
};

export default function GovernancePage() {
  return (
    <>
      <PageHero
        title="Governance and transparency"
        intro="Who runs the federation, how decisions are made, and the documents that hold us to account."
        jump={[
          { href: "#executive", label: "Executive committee" },
          { href: "#committees", label: "Committees" },
          { href: "#documents", label: "Documents" },
          { href: "#notices", label: "Tenders and careers" },
        ]}
      />

      <section id="executive" className="section">
        <div className="wrap">
          <SectionHeader
            title="Executive committee"
            intro="Elected at the general meeting for a four-year term. Officer names will be listed here once confirmed."
          />
          <Reveal stagger={0.06} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {executive.map((m) => (
              <div key={m.role} className="flex items-center gap-4 rounded-xl border border-line bg-white p-5">
                <span aria-hidden className="h-14 w-14 shrink-0 rounded-full bg-paper-2" />
                <div>
                  <p className="font-semibold">{m.role}</p>
                  <p className="text-sm text-muted">{m.name}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="committees" className="section bg-white">
        <div className="wrap">
          <SectionHeader title="Standing committees" intro="Committees advise the executive and make decisions within their delegated remit." />
          <Reveal as="ul" stagger={0.05} className="grid gap-x-10 md:grid-cols-2">
            {committees.map((c) => (
              <li key={c.name} className="border-t border-line py-5">
                <h3 className="font-semibold">{c.name}</h3>
                <p className="mt-1 text-muted">{c.remit}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="documents" className="section">
        <div className="wrap">
          <SectionHeader title="Documents and reports" intro="Constitution, regulations, policies, annual reports, audited accounts, AGM minutes and forms." />
          <Reveal>
            <DocumentLibrary />
          </Reveal>
        </div>
      </section>

      <section id="notices" className="section on-dark bg-ink text-white">
        <div className="wrap">
          <SectionHeader title="Tenders and careers" intro="Open notices. Send questions to the contact named in each document." className="[&_.lede]:text-white/70" />
          <Reveal as="ul" stagger={0.06} className="divide-y divide-white/10 border-y border-white/10">
            {notices.map((n) => (
              <li key={n.title} className="grid gap-2 py-5 md:grid-cols-[120px_1fr_200px] md:items-center">
                <span className={`chip w-fit border-0 ${n.kind === "Tender" ? "bg-orange text-ink" : "bg-white/10 text-white"}`}>{n.kind}</span>
                <span className="font-semibold">{n.title}</span>
                <span className="text-white/60 md:text-right">Closes {formatDate(n.closes)}</span>
              </li>
            ))}
          </Reveal>
          <p className="mt-8 text-white/70">
            Enquiries: <a href={`mailto:${contact.email}`} className="text-orange link-underline">{contact.email}</a>
          </p>
        </div>
      </section>
    </>
  );
}
