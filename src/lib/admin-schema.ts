import type { SiteContentKey } from "@/lib/site-content";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
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
    key: "analyses",
    label: "Featured analyses",
    blurb: "Case studies shown in the portfolio grid and on their own detail pages.",
    itemLabel: "Analysis",
    titleField: "title",
    fields: [
      t("slug", "Slug (URL)", "btcusd-quarterly-reaccumulation"),
      t("market", "Market", "Crypto | Forex | Stocks | Commodities | Indices"),
      t("pair", "Pair"),
      t("title", "Title"),
      t("timeframe", "Timeframe"),
      area("summary", "Summary"),
      t("outcome", "Outcome"),
      t("rr", "R multiple"),
      t("date", "Date (YYYY-MM-DD)"),
      { name: "series", label: "Chart series", type: "numberList" },
      { name: "thesis", label: "Thesis points", type: "stringList" },
      area("invalidation", "Invalidation"),
      { name: "levels", label: "Key levels", type: "objectList", fields: labelValue },
    ],
  },
  {
    kind: "list",
    key: "insights",
    label: "Insights & education",
    blurb: "Articles listed on the insights page and the home insights grid.",
    itemLabel: "Insight",
    titleField: "title",
    fields: [
      t("slug", "Slug (URL)"),
      t("category", "Category"),
      t("title", "Title"),
      area("excerpt", "Excerpt"),
      t("readTime", "Read time"),
      t("date", "Date (YYYY-MM-DD)"),
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
    key: "timeline",
    label: "Experience timeline",
    blurb: "Roles, achievements and community work.",
    itemLabel: "Entry",
    titleField: "role",
    fields: [
      t("period", "Period"),
      t("role", "Role"),
      t("org", "Organisation"),
      t("tag", "Tag"),
      { name: "points", label: "Bullet points", type: "stringList" },
    ],
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
    blurb: "Instruments scrolling in the ticker bar.",
    itemLabel: "Instrument",
    titleField: "symbol",
    fields: [
      t("symbol", "Symbol"),
      t("price", "Price"),
      t("change", "Change"),
      { name: "up", label: "Positive change", type: "boolean" },
    ],
  },
  {
    kind: "list",
    key: "coverageMap",
    label: "Coverage map",
    blurb: "Session cities plotted on the world map (x/y are percentages).",
    itemLabel: "City",
    titleField: "city",
    fields: [t("city", "City"), num("x", "X %"), num("y", "Y %")],
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
