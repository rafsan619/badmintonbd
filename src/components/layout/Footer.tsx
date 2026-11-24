import Image from "next/image";
import Link from "next/link";
import { contact, navGroups, socials } from "@/lib/nav";
import { affiliations } from "@/lib/org";
import { CourtLines } from "@/components/ui/CourtLines";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

export function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-ink text-white">
      <CourtLines className="pointer-events-none absolute -right-40 -top-24 w-[900px] text-white/[0.05]" quiet strokeWidth={0.04} />

      <div className="wrap relative grid gap-12 border-b border-white/10 py-16 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="h-section max-w-xl">Results, call-ups and entry deadlines in your inbox.</h2>
          <p className="mt-4 max-w-lg text-white/70">One email a fortnight. Unsubscribe any time.</p>
        </div>
        <NewsletterForm />
      </div>

      <div className="wrap relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/bbf-logo.png" alt="" width={52} height={72} className="h-16 w-auto" />
            <span className="leading-tight">
              <span className="font-display block text-xl font-extrabold">Bangladesh Badminton Federation</span>
              <span lang="bn" className="text-sm text-white/60">
                বাংলাদেশ ব্যাডমিন্টন ফেডারেশন
              </span>
            </span>
          </Link>
          <address className="mt-6 space-y-1 text-sm not-italic text-white/70">
            <p>{contact.address}</p>
            <p>
              <a href={`mailto:${contact.email}`} className="hover:text-orange">
                {contact.email}
              </a>
            </p>
            <p>{contact.hours}</p>
          </address>
          <ul className="mt-6 flex flex-wrap gap-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center rounded-md border border-white/20 px-3 text-sm transition-colors hover:border-orange hover:text-orange"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {navGroups.slice(0, 4).map((g) => (
          <nav key={g.label} aria-label={g.label}>
            <p className="font-display mb-3 text-xl font-bold">{g.label}</p>
            <ul className="space-y-2 text-sm text-white/70">
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-orange">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="wrap relative flex flex-col gap-6 border-t border-white/10 py-8 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-sm text-white/60">
          Affiliated to {affiliations.map((a) => a.name).join(", ").replace(/, ([^,]*)$/, " and $1")}.
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
          <li>
            <Link href="/about" className="hover:text-orange">About</Link>
          </li>
          <li>
            <Link href="/governance" className="hover:text-orange">Governance</Link>
          </li>
          <li>
            <Link href="/integrity" className="hover:text-orange">Integrity</Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-orange">Contact</Link>
          </li>
          <li>© {new Date().getFullYear()} BBF</li>
        </ul>
      </div>
    </footer>
  );
}
