import Image from "next/image";
import Link from "next/link";
import { newsItems } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function HomeNews() {
  const [lead, ...rest] = newsItems;
  return (
    <section className="section">
      <div className="wrap">
        <SectionHeader title="Latest from the federation" link={{ href: "/news", label: "All news" }} />
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <Link href={`/news/${lead.slug}`} className="group block">
              <div className="img-zoom relative aspect-[16/10] overflow-hidden rounded-xl">
                <Image src={lead.image} alt="" fill sizes="(max-width:1024px) 100vw, 58vw" className="object-cover" />
                <span className="chip absolute left-4 top-4 border-0 bg-orange text-ink">{lead.category}</span>
              </div>
              <time dateTime={lead.date} className="mt-5 block text-sm text-muted">
                {formatDate(lead.date)}
              </time>
              <h3 className="h-card mt-2 text-[clamp(2rem,3.4vw,2.8rem)] group-hover:text-violet">
                <span className="link-underline">{lead.title}</span>
              </h3>
              <p className="mt-3 max-w-2xl text-muted">{lead.excerpt}</p>
            </Link>
          </Reveal>
          <Reveal as="ul" stagger={0.08} className="divide-y divide-line border-y border-line">
            {rest.slice(0, 4).map((n) => (
              <li key={n.slug}>
                <Link href={`/news/${n.slug}`} className="group grid grid-cols-[96px_1fr] gap-4 py-5">
                  <div className="img-zoom relative aspect-square overflow-hidden rounded-md">
                    <Image src={n.image} alt="" fill sizes="96px" className="object-cover" />
                  </div>
                  <div>
                    <p className="flex flex-wrap items-center gap-2 text-sm text-muted">
                      <span className="font-semibold text-violet">{n.category}</span>
                      <time dateTime={n.date}>{formatDate(n.date)}</time>
                    </p>
                    <h3 className="mt-1 font-semibold leading-snug group-hover:text-violet">{n.title}</h3>
                  </div>
                </Link>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
