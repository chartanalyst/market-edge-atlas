export type SiteCopy = {
  brand: {
    initials: string;
    name: string;
    tagline: string;
    disclaimer: string;
  };
  hero: {
    indexLabel: string;
    practice: string;
    established: string;
    badge: string;
    titleLine1: string;
    titleAccent: string;
    titleLine3: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    kpis: { value: number; suffix: string; label: string }[];
    panelLabel: string;
    panelPrice: number;
    panelChange: string;
    panelBadge: string;
    panelSeries: number[];
    panelMetrics: { label: string; value: string }[];
    floatOne: { title: string; sub: string };
    floatTwo: { title: string; sub: string };
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    paragraphs: string[];
    pillars: { title: string; desc: string }[];
    asideTitle: string;
    points: { n: string; title: string; desc: string }[];
    chartLabel: string;
    chartValue: string;
    chartSeries: number[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    email: string;
    responseTime: string;
    coverage: string;
    engagements: string[];
    footnote: string;
  };
};

export const defaultCopy: SiteCopy = {
  brand: {
    initials: "TA",
    name: "Technical Market Analyst",
    tagline:
      "Institutional-grade technical research across crypto, forex, equities, commodities and indices. Structure first, risk always.",
    disclaimer:
      "Research and education only. Nothing published here constitutes financial advice.",
  },
  hero: {
    indexLabel: "001 — Overview",
    practice: "Independent Research Practice",
    established: "Est. 2019",
    badge: "Coverage live · 5 asset classes",
    titleLine1: "Professional",
    titleAccent: "Technical Market",
    titleLine3: "Analyst",
    subtitle:
      "Providing institutional-grade technical analysis across Crypto, Forex, Stocks, Commodities, and Indices.",
    primaryCta: "View Portfolio",
    secondaryCta: "Contact Me",
    kpis: [
      { value: 2400, suffix: "+", label: "Charts published" },
      { value: 71, suffix: "%", label: "Thesis hit rate" },
      { value: 7, suffix: "yrs", label: "Full-time research" },
    ],
    panelLabel: "BTC / USD · Weekly",
    panelPrice: 112480,
    panelChange: "+1.84%",
    panelBadge: "Bullish structure",
    panelSeries: [22, 26, 21, 30, 27, 36, 32, 44, 40, 52, 58, 54, 68, 74, 88],
    panelMetrics: [
      { label: "Bias", value: "Long" },
      { label: "R:R", value: "1 : 3.8" },
      { label: "Risk", value: "0.75%" },
    ],
    floatOne: { title: "Invalidation defined", sub: "before every entry" },
    floatTwo: { title: "Liquidity mapped", sub: "HTF → LTF confluence" },
  },
  about: {
    eyebrow: "About",
    title: "Research discipline borrowed from the institutional side of the desk.",
    description:
      "I've spent seven years reading price for a living — first inside a digital-asset research desk, now independently for funds, communities and private clients across five asset classes.",
    paragraphs: [
      "My mission is simple: make technical analysis defensible. Every chart I publish states a thesis, the evidence supporting it, the level that proves it wrong, and the risk taken to express it. If a call fails, it is logged exactly like the ones that work.",
      "The approach is structure-first. I build context from the highest timeframe downward, mapping ranges, liquidity and unmitigated zones before considering an entry. Confirmation is required, never assumed. Narrative and sentiment inform the environment — they never override the chart.",
    ],
    pillars: [
      { title: "Auditable", desc: "Public log of thesis vs. outcome since 2021." },
      { title: "Repeatable", desc: "One written seven-stage process for every market." },
      { title: "Risk-first", desc: "Invalidation defined before position sizing." },
      { title: "Multi-market", desc: "Cross-asset confirmation on every directional call." },
    ],
    asideTitle: "What makes the analysis different",
    points: [
      {
        n: "01",
        title: "Evidence before opinion",
        desc: "Each thesis is built on observable structure, not on a narrative searching for a chart.",
      },
      {
        n: "02",
        title: "Invalidation is published",
        desc: "You always know the exact level at which the idea is wrong — stated up front.",
      },
      {
        n: "03",
        title: "Cross-asset confirmation",
        desc: "Dollar strength, yields and breadth are checked before any directional conviction.",
      },
      {
        n: "04",
        title: "Outcomes tracked in R",
        desc: "Performance is expressed in risk multiples, not screenshots of winners.",
      },
    ],
    chartLabel: "Cumulative R · published ideas",
    chartValue: "+148R",
    chartSeries: [4, 9, 7, 16, 21, 19, 30, 38, 35, 48, 61, 70, 88, 104, 126, 148],
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's discuss your markets.",
    description:
      "Research retainers, community coverage, education or a one-off custom review — tell me what you need and I'll respond with a scope and timeline.",
    email: "research@technical-analyst.io",
    responseTime: "Within one business day",
    coverage: "Asia · London · New York sessions",
    engagements: [
      "Technical analysis retainer",
      "Institutional report",
      "Community coverage",
      "Education / mentoring",
      "Custom market review",
      "Consulting",
    ],
    footnote:
      "Prefer a call? Book a 45-minute consultation and I'll send a written summary afterwards.",
  },
};
