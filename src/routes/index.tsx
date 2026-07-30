import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/sections/hero";
import { MarketTicker } from "@/components/site/ticker";
import { About, Markets } from "@/components/site/sections/overview";
import { FeaturedAnalysis, Performance } from "@/components/site/sections/work";
import { Experience, Process } from "@/components/site/sections/journey";
import { Services, WhyWorkWithMe } from "@/components/site/sections/offer";
import { Faq, Insights, Testimonials } from "@/components/site/sections/social";
import { Contact } from "@/components/site/sections/contact";

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
  return (
    <main>
      <Hero />
      <MarketTicker />
      <About />
      <Markets />
      <FeaturedAnalysis />
      <Performance />
      <Experience />
      <Process />
      <Services />
      <WhyWorkWithMe />
      <Testimonials />
      <Insights />
      <Faq />
      <Contact />
    </main>
  );
}
