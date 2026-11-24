import { HomeHero } from "@/components/home/HomeHero";
import { AudienceSelector } from "@/components/home/AudienceSelector";
import { HomeNews } from "@/components/home/HomeNews";
import { HomeEvents } from "@/components/home/HomeEvents";
import { SquadStrip } from "@/components/home/SquadStrip";
import { Pathway } from "@/components/home/Pathway";
import { StatsBand } from "@/components/home/StatsBand";
import { PartnerStrip } from "@/components/home/PartnerStrip";
import { RankingTable } from "@/components/rankings/RankingTable";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { rankingsUpdated } from "@/lib/data";
import { formatDate } from "@/lib/format";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <AudienceSelector />
      <HomeNews />
      <HomeEvents />
      <section className="section">
        <div className="wrap">
          <SectionHeader
            title="National rankings"
            intro={`Top five in each discipline. Updated ${formatDate(rankingsUpdated)}.`}
            link={{ href: "/rankings", label: "Full rankings" }}
          />
          <Reveal>
            <RankingTable limit={5} />
          </Reveal>
        </div>
      </section>
      <Pathway />
      <SquadStrip />
      <StatsBand />
      <PartnerStrip />
    </>
  );
}
