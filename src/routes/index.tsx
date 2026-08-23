import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/sections/hero";
import { About } from "@/components/site/sections/overview";
import { FeaturedAnalysis } from "@/components/site/sections/work";
import { TradingJournal } from "@/components/site/sections/journal";
import { Process } from "@/components/site/sections/journey";
import { Services, WhyWorkWithMe } from "@/components/site/sections/offer";
import { Faq, Testimonials } from "@/components/site/sections/social";
import { Certifications } from "@/components/site/sections/certifications";
import { WeeklyReports } from "@/components/site/sections/reports";
import { Contact } from "@/components/site/sections/contact";
import { useSiteContent } from "@/components/site/content-context";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site-meta";

import { HomePageSkeleton } from "@/components/site/skeletons";

const title = SITE_TITLE;
const description = SITE_DESCRIPTION;

export const Route = createFileRoute("/")({
  pendingComponent: HomePageSkeleton,
  pendingMs: 120,
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
  const registry: Record<string, React.ComponentType> = {
    hero: Hero,
    about: About,

    featured: FeaturedAnalysis,
    reports: WeeklyReports,
    journal: TradingJournal,
    process: Process,
    certifications: Certifications,
    services: Services,
    why: WhyWorkWithMe,
    testimonials: Testimonials,
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
