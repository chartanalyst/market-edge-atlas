export type SectionSetting = { id: string; label: string; enabled: boolean };

/** Homepage sections, in render order. Editable from the dashboard. */
export const defaultSections: SectionSetting[] = [
  { id: "hero", label: "Hero", enabled: true },
  { id: "ticker", label: "Market ticker", enabled: true },
  { id: "about", label: "About", enabled: true },
  { id: "markets", label: "Research Universe", enabled: true },
  { id: "featured", label: "Featured analysis", enabled: true },
  { id: "reports", label: "Reports", enabled: true },
  { id: "performance", label: "Performance dashboard", enabled: true },
  { id: "journal", label: "Trading journal", enabled: true },
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
  { platform: "Email", label: "Email", href: "mailto:ubaid.ullah2005op@gmail.com" },
  { platform: "X", label: "X", href: "https://x.com/AChartAnalyst" },
  { platform: "Telegram", label: "Telegram", href: "https://t.me/chartanalyst01" },
  { platform: "Discord", label: "Discord", href: "https://discord.gg/2RntKagEdU" },
  { platform: "Instagram", label: "Instagram", href: "https://instagram.com/twxubaid" },
  { platform: "LinkedIn", label: "LinkedIn", href: "https://www.linkedin.com/in/ubaid-ullah-656748301/" },
];
