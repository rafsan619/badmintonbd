import { FeatureBand } from "@/components/home/FeatureBand";
import { GetStarted } from "@/components/home/GetStarted";
import { Hero } from "@/components/home/Hero";
import { Mission } from "@/components/home/Mission";
import { NewsTeaser } from "@/components/home/NewsTeaser";
import { Programs } from "@/components/home/Programs";
import { SupportCTA } from "@/components/home/SupportCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Mission />
      <Programs />
      <FeatureBand />
      <GetStarted />
      <NewsTeaser />
      <SupportCTA />
    </>
  );
}
