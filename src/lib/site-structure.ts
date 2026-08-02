export type SectionSetting = { id: string; label: string; enabled: boolean };

/** Homepage sections, in render order. Editable from the dashboard. */
export const defaultSections: SectionSetting[] = [
  { id: "hero", label: "Hero", enabled: true },
  { id: "ticker", label: "Market ticker", enabled: true },
  { id: "about", label: "About", enabled: true },
  { id: "markets", label: "Markets covered", enabled: true },
  { id: "featured", label: "Featured analysis", enabled: true },
  { id: "reports", label: "Weekly reports", enabled: true },
  { id: "performance", label: "Performance dashboard", enabled: true },
  { id: "process", label: "Analysis process", enabled: true },
  { id: "certifications", label: "Certifications", enabled: true },
  { id: "services", label: "Services", enabled: true },
  { id: "why", label: "Why work with me", enabled: true },
  { id: "testimonials", label: "Testimonials", enabled: true },
  { id: "faq", label: "FAQ", enabled: true },
  { id: "contact", label: "Contact", enabled: true },
];

export type LinkSetting = { platform: string; label: string; href: string };

export const defaultLinks: LinkSetting[] = [
  { platform: "Email", label: "Email", href: "mailto:research@technical-analyst.io" },
  { platform: "X", label: "X", href: "https://x.com" },
  { platform: "LinkedIn", label: "LinkedIn", href: "https://linkedin.com" },
  { platform: "Discord", label: "Discord", href: "https://discord.com" },
  { platform: "Telegram", label: "Telegram", href: "https://telegram.org" },
  { platform: "TradingView", label: "TradingView", href: "https://www.tradingview.com" },
];
