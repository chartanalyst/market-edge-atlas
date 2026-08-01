import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/sections/hero";
import { MarketTicker } from "@/components/site/ticker";
import { About, Markets } from "@/components/site/sections/overview";
import { FeaturedAnalysis, Performance } from "@/components/site/sections/work";
import { Experience, Process } from "@/components/site/sections/journey";
import { Services, WhyWorkWithMe } from "@/components/site/sections/offer";
import { Faq, Insights, Testimonials } from "@/components/site/sections/social";
import { Contact } from "@/components/site/sections/contact";
import { useSiteContent } from "@/components/site/content-context";

const title = "Technical Market Analyst — Institutional-Grade Multi-Market Research";
const description =
  "Institutional-grade technical analysis across crypto, forex, stocks, commodities and indices. Documented theses, defined invalidation, tracked outcomes.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { sections } = useSiteContent();
  const registry: Record<string, () => JSX.Element> = {
    hero: Hero,
    ticker: MarketTicker,
    about: About,
    markets: Markets,
    featured: FeaturedAnalysis,
    performance: Performance,
    experience: Experience,
    process: Process,
    services: Services,
    why: WhyWorkWithMe,
    testimonials: Testimonials,
    insights: Insights,
    faq: Faq,
    contact: Contact,
  };

  return (
    <main>
      {sections
        .filter((s) => s.enabled && registry[s.id])
        .map((s) => {
          const Section = registry[s.id];
          return <Section key={s.id} />;
        })}
    </main>
  );
}
