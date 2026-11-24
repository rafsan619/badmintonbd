import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { ShareLinks } from "@/components/news/ShareLinks";
import { newsItems } from "@/lib/data";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return newsItems.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const n = newsItems.find((x) => x.slug === slug);
  return n ? { title: n.title, description: n.excerpt, openGraph: { images: [n.image] } } : {};
}

export default async function ArticlePage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const i = newsItems.findIndex((n) => n.slug === slug);
  if (i < 0) notFound();
  const n = newsItems[i];
  const prev = newsItems[i + 1];
  const next = newsItems[i - 1];
  const related = newsItems.filter((x) => x.slug !== slug && x.category === n.category).slice(0, 2);

  return (
    <article>
      <header className="on-dark bg-ink pb-0 pt-[calc(76px+3rem)] text-white lg:pt-[calc(var(--header-h)+3.5rem)]">
        <div className="wrap max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/60">
            <Link href="/" className="hover:text-orange">Home</Link>
            <span aria-hidden className="mx-2">/</span>
            <Link href="/news" className="hover:text-orange">News</Link>
          </nav>
          <p className="flex flex-wrap gap-3 text-sm">
            <span className="chip border-0 bg-orange text-ink">{n.category}</span>
            <time dateTime={n.date} className="self-center text-white/70">{formatDate(n.date)}</time>
          </p>
          <h1 className="h-display mt-5 text-[clamp(2.6rem,6vw,4.8rem)]">{n.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/75">{n.excerpt}</p>
        </div>
        <div className="wrap mt-10 max-w-6xl">
          <div className="relative aspect-[21/9] translate-y-16 overflow-hidden rounded-xl shadow-2xl">
            <Image src={n.image} alt="" fill priority sizes="(max-width:1200px) 100vw, 1150px" className="object-cover" />
          </div>
        </div>
      </header>

      <div className="wrap max-w-6xl pb-20 pt-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_220px]">
          <Reveal className="prose-bbf text-lg">
            {n.body.map((p, k) => (
              <p key={k} className={k === 0 ? "text-xl font-medium text-ink" : ""}>
                {p}
              </p>
            ))}
          </Reveal>
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <ShareLinks title={n.title} />
          </aside>
        </div>

        <nav aria-label="More stories" className="mt-16 grid gap-4 border-t border-line pt-10 md:grid-cols-2">
          {prev ? (
            <Link href={`/news/${prev.slug}`} className="group rounded-xl bg-white p-6 transition-colors hover:bg-paper-2">
              <span className="text-sm text-muted">Previous story</span>
              <span className="mt-1 block font-semibold group-hover:text-violet">{prev.title}</span>
            </Link>
          ) : <span />}
          {next && (
            <Link href={`/news/${next.slug}`} className="group rounded-xl bg-white p-6 text-right transition-colors hover:bg-paper-2">
              <span className="text-sm text-muted">Next story</span>
              <span className="mt-1 block font-semibold group-hover:text-violet">{next.title}</span>
            </Link>
          )}
        </nav>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="h-card !text-3xl">Related</h2>
            <ul className="mt-6 grid gap-6 md:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/news/${r.slug}`} className="group grid grid-cols-[120px_1fr] gap-4">
                    <div className="img-zoom relative aspect-square overflow-hidden rounded-md">
                      <Image src={r.image} alt="" fill sizes="120px" className="object-cover" />
                    </div>
                    <div>
                      <time dateTime={r.date} className="text-sm text-muted">{formatDate(r.date)}</time>
                      <p className="mt-1 font-semibold group-hover:text-violet">{r.title}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}
