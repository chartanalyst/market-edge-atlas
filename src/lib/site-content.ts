import {
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
} from "@/lib/site-data";
import { defaultCopy, type SiteCopy } from "@/lib/site-copy";
import {
  analysisFromRow,
  defaultAnalysisRecords,
  sortAnalyses,
  type AnalysisRecord,
} from "@/lib/analysis-model";
import {
  defaultLinks,
  defaultSections,
  type LinkSetting,
  type SectionSetting,
} from "@/lib/site-structure";

export type SiteContent = {
  copy: SiteCopy;
  analyses: AnalysisRecord[];
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
  sections: SectionSetting[];
  links: LinkSetting[];
};

export type SiteContentKey = keyof SiteContent;

export const defaultSiteContent: SiteContent = {
  copy: defaultCopy,
  analyses: defaultAnalysisRecords,
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
  sections: defaultSections,
  links: defaultLinks,
};

export const siteContentKeys = Object.keys(defaultSiteContent) as SiteContentKey[];

/**
 * Database rows override the built-in defaults, key by key. A missing row simply
 * falls back to the shipped content, so the site can never render empty.
 * Published analyses come from their own table once any exist.
 */
export function mergeSiteContent(
  rows: { key: string; data: unknown }[] | null | undefined,
  analysisRows?: Record<string, unknown>[] | null,
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
    if (row.key === "sections") {
      const stored = Array.isArray(row.data) ? (row.data as SectionSetting[]) : [];
      const known = new Map(defaultSections.map((s) => [s.id, s]));
      const ordered = stored
        .filter((s) => known.has(s.id))
        .map((s) => ({ ...known.get(s.id)!, enabled: s.enabled !== false }));
      const missing = defaultSections.filter((s) => !ordered.some((o) => o.id === s.id));
      merged.sections = [...ordered, ...missing];
      continue;
    }
    if (row.key === "analyses") continue; // analyses live in their own table
    if (Array.isArray(row.data)) merged[row.key] = row.data;
  }

  if (analysisRows && analysisRows.length > 0) {
    merged.analyses = sortAnalyses(analysisRows.map((r) => analysisFromRow(r)));
  } else {
    merged.analyses = sortAnalyses(defaultAnalysisRecords);
  }

  return merged as SiteContent;
}
