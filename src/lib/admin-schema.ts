import type { SiteContentKey } from "@/lib/site-content";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "image"
  | "stringList"
  | "numberList"
  | "objectList"
  | "object";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  fields?: Field[];
};

export type ListSection = {
  kind: "list";
  key: SiteContentKey;
  label: string;
  blurb: string;
  itemLabel: string;
  titleField: string;
  fields: Field[];
};

export type GroupSection = {
  kind: "groups";
  key: SiteContentKey;
  label: string;
  blurb: string;
  groups: { name: string; label: string; fields: Field[] }[];
};

export type AdminSection = ListSection | GroupSection;

const t = (name: string, label: string, placeholder?: string): Field => ({
  name,
  label,
  type: "text",
  placeholder,
});
const area = (name: string, label: string): Field => ({ name, label, type: "textarea" });
const num = (name: string, label: string): Field => ({ name, label, type: "number" });
const img = (name: string, label: string): Field => ({ name, label, type: "image" });

const labelValue: Field[] = [t("label", "Label"), t("value", "Value")];

export const adminSections: AdminSection[] = [
  {
    kind: "groups",
    key: "copy",
    label: "Page copy",
    blurb: "Hero, about, contact and brand text used across the site.",
    groups: [
      {
        name: "hero",
        label: "Hero section",
        fields: [
          t("indexLabel", "Index label"),
          t("practice", "Practice label"),
          t("established", "Established label"),
          t("badge", "Live badge"),
          t("titleLine1", "Headline line 1"),
          t("titleAccent", "Headline accent line"),
          t("titleLine3", "Headline line 3"),
          area("subtitle", "Subtitle"),
          t("primaryCta", "Primary button"),
          t("secondaryCta", "Secondary button"),
          {
            name: "kpis",
            label: "Headline KPIs",
            type: "objectList",
            fields: [num("value", "Value"), t("suffix", "Suffix"), t("label", "Label")],
          },
          t("panelLabel", "Chart panel label"),
          num("panelPrice", "Chart panel price"),
          t("panelChange", "Chart panel change"),
          t("panelBadge", "Chart panel badge"),
          { name: "panelSeries", label: "Chart panel series", type: "numberList" },
          img("panelImage", "Hero panel image (replaces chart when set)"),
          { name: "panelMetrics", label: "Chart panel metrics", type: "objectList", fields: labelValue },
          {
            name: "floatOne",
            label: "Floating card 1",
            type: "object",
            fields: [t("title", "Title"), t("sub", "Subtitle")],
          },
          {
            name: "floatTwo",
            label: "Floating card 2",
            type: "object",
            fields: [t("title", "Title"), t("sub", "Subtitle")],
          },
        ],
      },
      {
        name: "about",
        label: "About section",
        fields: [
          t("eyebrow", "Eyebrow"),
          t("title", "Title"),
          area("description", "Description"),
          { name: "paragraphs", label: "Paragraphs", type: "stringList" },
          {
            name: "pillars",
            label: "Pillars",
            type: "objectList",
            fields: [t("title", "Title"), area("desc", "Description")],
          },
          t("asideTitle", "Aside title"),
          {
            name: "points",
            label: "Aside points",
            type: "objectList",
            fields: [t("n", "Number"), t("title", "Title"), area("desc", "Description")],
          },
          t("chartLabel", "Chart label"),
          t("chartValue", "Chart value"),
          { name: "chartSeries", label: "Chart series", type: "numberList" },
        ],
      },
      {
        name: "contact",
        label: "Contact section",
        fields: [
          t("eyebrow", "Eyebrow"),
          t("title", "Title"),
          area("description", "Description"),
          t("email", "Email address"),
          t("responseTime", "Response time"),
          t("coverage", "Coverage"),
          { name: "engagements", label: "Engagement options", type: "stringList" },
          area("footnote", "Footnote"),
        ],
      },
      {
        name: "brand",
        label: "Brand & footer",
        fields: [
          t("initials", "Monogram initials"),
          t("name", "Brand name"),
          area("tagline", "Footer tagline"),
          area("disclaimer", "Footer disclaimer"),
        ],
      },
    ],
  },
  {
    kind: "list",
    key: "sections",
    label: "Homepage sections",
    blurb: "Reorder sections with the arrows, or untick one to hide it from the homepage.",
    itemLabel: "Section",
    titleField: "label",
    fields: [
      { name: "id", label: "Section id (do not change)", type: "text" },
      t("label", "Label"),
      { name: "enabled", label: "Show on homepage", type: "boolean" },
    ],
  },
  {
    kind: "list",
    key: "links",
    label: "Social & contact links",
    blurb: "Links used in the footer and contact section.",
    itemLabel: "Link",
    titleField: "label",
    fields: [
      t("platform", "Platform", "Email | X | LinkedIn | Discord | Telegram | Instagram | TradingView | GitHub"),
      t("label", "Label"),
      t("href", "URL", "https://…"),
    ],
  },

  {
    kind: "list",
    key: "certifications",
    label: "Certifications",
    blurb: "Credentials shown in the certifications section.",
    itemLabel: "Certification",
    titleField: "name",
    fields: [
      t("name", "Certificate name"),
      t("org", "Issuing organisation"),
      t("date", "Issue date (YYYY-MM)"),
      t("credentialId", "Credential ID (optional)"),
      t("link", "Credential link", "https://…"),
      img("image", "Certificate image"),
      area("desc", "Short description"),
    ],
  },
  {
    kind: "list",
    key: "markets",
    label: "Markets covered",
    blurb: "The asset classes grid.",
    itemLabel: "Market",
    titleField: "name",
    fields: [
      t("name", "Name"),
      t("icon", "Icon name (lucide)", "Bitcoin"),
      area("desc", "Description"),
      t("stat", "Stat"),
    ],
  },
  {
    kind: "list",
    key: "services",
    label: "Services",
    blurb: "Engagement types offered.",
    itemLabel: "Service",
    titleField: "title",
    fields: [t("title", "Title"), area("desc", "Description"), t("icon", "Icon name (lucide)")],
  },
  {
    kind: "list",
    key: "processSteps",
    label: "Analysis process",
    blurb: "The stages of your documented process.",
    itemLabel: "Step",
    titleField: "title",
    fields: [t("n", "Number"), t("title", "Title"), area("desc", "Description")],
  },
  {
    kind: "list",
    key: "differentiators",
    label: "Why work with me",
    blurb: "Standards shown in the differentiators grid.",
    itemLabel: "Standard",
    titleField: "title",
    fields: [t("title", "Title"), area("desc", "Description"), t("icon", "Icon name (lucide)")],
  },
  {
    kind: "list",
    key: "testimonials",
    label: "Testimonials",
    blurb: "Quotes shown in the testimonial carousel.",
    itemLabel: "Testimonial",
    titleField: "name",
    fields: [area("quote", "Quote"), t("name", "Name"), t("role", "Role"), num("rating", "Rating (1-5)")],
  },
  {
    kind: "list",
    key: "faqs",
    label: "FAQ",
    blurb: "Questions and answers in the FAQ accordion.",
    itemLabel: "Question",
    titleField: "q",
    fields: [t("q", "Question"), area("a", "Answer")],
  },
  {
    kind: "list",
    key: "stats",
    label: "Performance KPIs",
    blurb: "Animated counters in the performance dashboard.",
    itemLabel: "KPI",
    titleField: "label",
    fields: [num("value", "Value"), t("suffix", "Suffix"), t("label", "Label"), t("detail", "Detail")],
  },
  {
    kind: "list",
    key: "tickerItems",
    label: "Market ticker",
    blurb: "Instruments in the scrolling bar above the navigation. Live prices overlay BTC/ETH/SOL/XAU when available.",
    itemLabel: "Instrument",
    titleField: "symbol",
    fields: [
      t("symbol", "Symbol"),
      t("price", "Fallback price"),
      t("change", "Fallback change"),
      { name: "up", label: "Positive change", type: "boolean" },
    ],
  },
];

export function findSection(key: string): AdminSection | undefined {
  return adminSections.find((s) => s.key === key);
}

export function emptyItem(fields: Field[]): Record<string, unknown> {
  const item: Record<string, unknown> = {};
  for (const f of fields) {
    if (f.type === "number") item[f.name] = 0;
    else if (f.type === "boolean") item[f.name] = true;
    else if (f.type === "stringList" || f.type === "numberList") item[f.name] = [];
    else if (f.type === "objectList") item[f.name] = [];
    else item[f.name] = "";
  }
  return item;
}
