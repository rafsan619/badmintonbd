import Link from "next/link";
import clsx from "clsx";
import { Reveal } from "./Reveal";

export function SectionHeader({
  title,
  intro,
  link,
  className,
  id,
}: {
  title: string;
  intro?: string;
  link?: { href: string; label: string };
  className?: string;
  id?: string;
}) {
  return (
    <Reveal className={clsx("mb-10 md:mb-14", className)}>
      <div className="court-rule mb-8" />
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 id={id} className="h-section max-w-3xl">
            {title}
          </h2>
          {intro && <p className="lede mt-4">{intro}</p>}
        </div>
        {link && (
          <Link href={link.href} className="btn btn-outline shrink-0 self-start md:self-end">
            {link.label}
          </Link>
        )}
      </div>
    </Reveal>
  );
}
