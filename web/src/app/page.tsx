import { Accordions } from "@/components/accordions";
import { FeatureRow } from "@/components/feature-row";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { PartnerWall } from "@/components/partner-wall";
import { Section } from "@/components/section";
import { Stats } from "@/components/stats";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeatureRow />
        <Stats />
        <Section tone="sea-shallow" id="stories">
          <div className="glass rounded-[28px] border-white/60 p-6 text-center text-white/90 shadow-soft md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
              Featured highlight
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight sm:text-4xl">
              “It feels like the kids made SportsCenter. The grandparents cried.”
            </h2>
            <p className="mt-4 text-sm leading-[1.6] text-white/80">
              — Jasmine L., parent &amp; team coordinator
            </p>
          </div>
        </Section>
        <PartnerWall />
        <Accordions />
      </main>
      <Footer />
    </>
  );
}
