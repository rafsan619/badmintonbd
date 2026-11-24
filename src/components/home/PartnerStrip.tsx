import Link from "next/link";
import { partners } from "@/lib/org";
import { Shuttle } from "@/components/ui/Icons";

export function PartnerStrip() {
  const all = [...partners.principal, ...partners.official, ...partners.supporters];
  return (
    <section className="py-16">
      <div className="wrap mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-3xl font-extrabold">Our partners</h2>
        <Link href="/partners" className="font-semibold text-violet link-underline">
          Become a partner
        </Link>
      </div>
      <div className="marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <ul className="marquee-track gap-4" style={{ "--marquee-duration": "45s" } as React.CSSProperties}>
          {[...all, ...all].map((p, i) => (
            <li
              key={i}
              aria-hidden={i >= all.length}
              className="flex h-24 w-64 shrink-0 items-center justify-center gap-3 rounded-lg border border-dashed border-line bg-white text-muted"
            >
              <Shuttle className="h-6 w-6 text-violet/40" />
              <span className="text-sm font-semibold">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
