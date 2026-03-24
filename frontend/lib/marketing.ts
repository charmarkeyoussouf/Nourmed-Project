export const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const serviceOfferings = [
  {
    slug: "compliance-consulting",
    title: "Compliance Consulting",
    price: "Starting at $7,500",
    priceNote: "Custom pricing for larger environments, multi-framework readiness work, and ongoing advisory.",
    summary:
      "Plain-English compliance readiness support for small businesses facing customer, vendor, or data protection expectations.",
    description:
      "Compliance is the work of showing customers, vendors, and partners that your business handles sensitive systems and information responsibly. Nourmed helps small businesses prepare for those expectations with practical readiness support, prioritized remediation guidance, policy direction, and security planning that strengthens trust without pretending to be a law firm or certifying body.",
    bullets: [
      "Readiness reviews for vendor requirements, customer questionnaires, and operational security expectations",
      "Roadmaps for closing gaps around data handling, access control, documentation, and repeatable security practices",
      "Practical support for teams that need stronger security posture before audits, renewals, or growth conversations",
    ],
  },
  {
    slug: "secure-website-development",
    title: "Secure Website Development",
    price: "Starting at $15,000",
    priceNote: "Custom pricing for advanced integrations, portals, ecommerce, and larger multi-site builds.",
    summary:
      "Security-first website builds with hardened hosting, protected forms, deployment discipline, and uptime-minded architecture.",
    description:
      "Nourmed builds business websites that are designed to do more than look polished. We focus on secure deployment practices, HTTPS, hardened hosting, protected forms, abuse controls, and architecture choices that reduce avoidable exposure. This is secure business infrastructure for companies that need a trustworthy public presence, not just a design refresh.",
    bullets: [
      "HTTPS, secure configuration, and hosting hardening aligned to real business risk",
      "Protected forms, basic abuse resistance, and cleaner intake paths for public-facing systems",
      "Deployment practices, change control, and uptime-minded builds that support ongoing operations",
    ],
  },
  {
    slug: "small-business-security-packages",
    title: "Small Business Security Packages",
    price: "Starting at $3,500/month",
    priceNote: "Custom pricing for larger teams, regulated environments, or broader advisory retainers.",
    summary:
      "Recurring protection for growing businesses that need ongoing hardening, visibility, and practical risk reduction.",
    description:
      "Nourmed offers recurring security support for small businesses that need more than a one-time cleanup. These packages are built to keep websites, accounts, and core business systems in better shape over time with vulnerability scanning, monitoring, basic hardening, backup guidance, access-control review, and practical follow-through that fits a growing company.",
    bullets: [
      "Recurring vulnerability scanning, monitoring, and prioritized hardening guidance",
      "Backup planning, access reviews, and practical risk reduction for everyday operations",
      "A business-friendly security partner for teams that need ongoing protection without enterprise confusion",
    ],
  },
] as const;

export const serviceInterestOptions = [
  ...serviceOfferings.map((service) => service.title),
  "Not sure yet",
] as const;

export const serviceInterestBySlug = Object.fromEntries(
  serviceOfferings.map((service) => [service.slug, service.title]),
) as Record<string, (typeof serviceInterestOptions)[number]>;

export const processSteps = [
  {
    step: "01",
    title: "Scan and assess",
    description:
      "We start with the business surface that matters most: your website, public exposure, intake paths, and the security expectations already pressing on your team.",
  },
  {
    step: "02",
    title: "Identify risks and gaps",
    description:
      "You get a clear picture of weak points, trust risks, compliance friction, and the areas most likely to create downtime or customer hesitation.",
  },
  {
    step: "03",
    title: "Secure and harden",
    description:
      "We improve the environment with practical controls, stronger website infrastructure, cleaner processes, and prioritized remediation that fits your size.",
  },
  {
    step: "04",
    title: "Support and improve",
    description:
      "For teams that need ongoing coverage, we stay involved through recurring reviews, monitoring guidance, and steady security improvement.",
  },
] as const;
