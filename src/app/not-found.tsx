import Link from "next/link";
import { CourtLines } from "@/components/ui/CourtLines";

export default function NotFound() {
  return (
    <section className="on-dark relative flex min-h-[80vh] items-center overflow-hidden bg-ink pt-28 text-white">
      <CourtLines className="pointer-events-none absolute left-1/2 top-1/2 w-[1100px] -translate-x-1/2 -translate-y-1/2 text-white/10" quiet strokeWidth={0.03} />
      <div className="wrap relative">
        <p className="font-display text-[clamp(6rem,20vw,14rem)] font-black leading-none text-orange">Out.</p>
        <h1 className="h-display mt-2 text-[clamp(2rem,5vw,3.5rem)]">That page landed outside the lines.</h1>
        <p className="mt-4 max-w-lg text-white/70">
          It may have moved or never existed. Try search with Ctrl K, or start from one of these.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">Home</Link>
          <Link href="/events" className="btn btn-outline">Calendar</Link>
          <Link href="/play#clubs" className="btn btn-outline">Find a club</Link>
        </div>
      </div>
    </section>
  );
}
