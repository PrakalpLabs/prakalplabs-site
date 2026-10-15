// Site configuration with safe Vite environment variable lookups
const getEnvVar = (key: string, fallback: string): string => {
  try {
    if (typeof import.meta !== "undefined" && import.meta.env) {
      const val = (import.meta.env as unknown as Record<string, string | undefined>)[key];
      if (val) return val;
    }
  } catch {
    // fallback
  }
  return fallback;
};

export const siteConfig = {
  name: "Prakalp Labs",
  legalName: "Prakalp Labs Technologies",
  tagline: "Turning Ideas Into Powerful Solutions.",
  smallLabel: "ENGINEERING WHAT'S NEXT",
  description:
    "We design and build digital experiences, custom software, and innovative products that help businesses move forward.",
  positioning:
    "Prakalp Labs is a technology and software solutions company that transforms ideas into practical digital products.",
  url: getEnvVar("VITE_SITE_URL", "http://localhost:3000"),
  apiUrl: getEnvVar("VITE_API_URL", "/api/v1"),
  dataSource: getEnvVar("VITE_DATA_SOURCE", "mock") as "mock" | "api",
  contactEmail: "inquiries@prakalplabs.internal",
  availabilityStatus: "Available for New Projects",
  navItems: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footerLinks: {
    solutions: [
      { label: "Web Development", href: "/services/website-development" },
      { label: "Custom Software", href: "/services/custom-software-development" },
      { label: "Digital Products", href: "/services/digital-product-development" },
      { label: "Business Automation", href: "/services/business-automation" },
      { label: "Technology Consulting", href: "/services/technology-consulting" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Engineering Philosophy", href: "/about#philosophy" },
      { label: "Projects", href: "/projects" },
      { label: "Contact Inquiries", href: "/contact" },
      { label: "Admin Portal", href: "/admin" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Security & Compliance", href: "/about#security" },
    ],
  },
  socialLinks: [
    { platform: "GitHub", url: "https://github.com/prakalplabs" },
    { platform: "LinkedIn", url: "https://linkedin.com/company/prakalplabs" },
    { platform: "X", url: "https://x.com/prakalplabs" },
  ],
};
