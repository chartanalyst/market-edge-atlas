import {
  analyses,
  coverageMap,
  differentiators,
  faqs,
  insights,
  markets,
  processSteps,
  services,
  stats,
  testimonials,
  tickerItems,
  timeline,
  type Analysis,
} from "@/lib/site-data";
import { defaultCopy, type SiteCopy } from "@/lib/site-copy";

export type SiteContent = {
  copy: SiteCopy;
  analyses: Analysis[];
  insights: typeof insights;
  markets: typeof markets;
  services: typeof services;
  processSteps: typeof processSteps;
  timeline: typeof timeline;
  faqs: typeof faqs;
  testimonials: typeof testimonials;
  differentiators: typeof differentiators;
  stats: typeof stats;
  tickerItems: typeof tickerItems;
  coverageMap: typeof coverageMap;
};

export type SiteContentKey = keyof SiteContent;

export const defaultSiteContent: SiteContent = {
  copy: defaultCopy,
  analyses,
  insights,
  markets,
  services,
  processSteps,
  timeline,
  faqs,
  testimonials,
  differentiators,
  stats,
  tickerItems,
  coverageMap,
};

export const siteContentKeys = Object.keys(defaultSiteContent) as SiteContentKey[];

/**
 * Database rows override the built-in defaults, key by key. A missing row simply
 * falls back to the shipped content, so the site can never render empty.
 */
export function mergeSiteContent(
  rows: { key: string; data: unknown }[] | null | undefined,
): SiteContent {
  const merged = { ...defaultSiteContent } as Record<string, unknown>;
  for (const row of rows ?? []) {
    if (!siteContentKeys.includes(row.key as SiteContentKey)) continue;
    if (row.data === null || row.data === undefined) continue;
    if (row.key === "copy") {
      const stored = row.data as Partial<SiteCopy>;
      merged.copy = {
        brand: { ...defaultCopy.brand, ...(stored.brand ?? {}) },
        hero: { ...defaultCopy.hero, ...(stored.hero ?? {}) },
        about: { ...defaultCopy.about, ...(stored.about ?? {}) },
        contact: { ...defaultCopy.contact, ...(stored.contact ?? {}) },
      };
      continue;
    }
    if (Array.isArray(row.data)) merged[row.key] = row.data;
  }
  return merged as SiteContent;
}
