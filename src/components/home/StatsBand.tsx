import { stats } from "@/lib/org";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";

export function StatsBand() {
  return (
    <section className="border-y border-line bg-white">
      <Reveal stagger={0.08} className="wrap grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`px-2 py-10 md:px-8 md:py-14 ${i % 2 ? "border-l border-line" : ""} ${i > 1 ? "border-t border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
          >
            <p className="font-display text-[clamp(3rem,6vw,5rem)] font-black leading-none text-violet">
              <Counter value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-muted">{s.label}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
