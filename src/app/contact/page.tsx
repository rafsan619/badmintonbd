import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { contact } from "@/lib/nav";
import { faqs } from "@/lib/org";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the Bangladesh Badminton Federation: competitions, membership, media and integrity.",
};

const departments = [
  { id: "competitions", name: "Competitions and entries", email: contact.email, body: "Calendar, entries, draws, results and rankings." },
  { id: "membership", name: "Membership", email: contact.email, body: "Player IDs, club affiliation and renewals." },
  { id: "media", name: "Press office", email: contact.media, body: "Accreditation, interviews and photo requests. Apply seven days before an event." },
  { id: "integrity", name: "Integrity", email: contact.integrity, body: "Confidential reports on safeguarding, doping or match-fixing." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact us" intro={`${contact.hours}. We reply to most emails within two working days.`} />

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Reveal as="ul" stagger={0.07} className="grid gap-3">
              {departments.map((d) => (
                <li key={d.id} id={d.id} className="rounded-xl border border-line bg-white p-5">
                  <p className="font-semibold">{d.name}</p>
                  <p className="mt-1 text-sm text-muted">{d.body}</p>
                  <a href={`mailto:${d.email}`} className="mt-3 inline-block font-semibold text-violet link-underline">
                    {d.email}
                  </a>
                </li>
              ))}
            </Reveal>
            <Reveal className="mt-6 rounded-xl bg-violet p-6 text-white">
              <p className="font-semibold">Federation office</p>
              <p className="mt-1 text-white/75">{contact.address}</p>
              <p className="text-white/75">{contact.hours}</p>
            </Reveal>
          </div>
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="section bg-white">
        <div className="wrap max-w-4xl">
          <h2 className="h-section mb-8">Common questions</h2>
          <Accordion items={faqs.map((f) => ({ q: f.q, a: f.a }))} />
        </div>
      </section>
    </>
  );
}
