export const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const pricingDisclaimer =
  "Final pricing depends on scope, business size, and system complexity.";

export const serviceOfferings = [
  {
    slug: "compliance-consulting",
    title: "Compliance Consulting",
    price: "Starting at $750",
    priceNote: pricingDisclaimer,
    summary:
      "Readiness guidance for small businesses that need to meet customer, vendor, or data-handling expectations.",
    description:
      "In plain English, compliance means showing that your business protects information responsibly and operates with reasonable security controls. Nourmed helps small businesses prepare for that standard with gap reviews, practical recommendations, and implementation guidance around vendor requirements, customer trust, data protection expectations, and day-to-day operational readiness. Nourmed is not a law firm and does not issue certifications.",
    bullets: [
      "Gap identification and readiness planning for customer, vendor, and security questionnaires",
      "Guidance on policies, access control, documentation, and practical security expectations",
      "Implementation support that helps your team prepare before outside scrutiny arrives",
    ],
  },
  {
    slug: "secure-website-development",
    title: "Secure Website Development",
    price: "Starting at $2,500",
    priceNote: pricingDisclaimer,
    summary:
      "Secure website builds for businesses that need protection, reliability, and a stronger public-facing foundation.",
    description:
      "Nourmed designs and builds websites with security in mind from day one. That includes HTTPS, secure forms, hardened hosting guidance, safer deployment practices, basic abuse protection, and architecture choices that support uptime and trust. The result is not just a better-looking website, but a more dependable business system.",
    bullets: [
      "HTTPS, secure forms, and hosting or deployment decisions shaped by risk reduction",
      "Practical abuse resistance, cleaner intake paths, and safer public-facing infrastructure",
      "Uptime-minded implementation that treats the website as business infrastructure, not just design",
    ],
  },
  {
    slug: "small-business-security-packages",
    title: "Small Business Security Packages",
    price: "Starting at $199/month",
    priceNote: pricingDisclaimer,
    summary:
      "Ongoing support for small businesses that need steady protection without enterprise complexity.",
    description:
      "Our recurring packages are built for businesses that want consistent attention on their security posture. Nourmed provides vulnerability scanning, practical hardening guidance, monitoring direction, backup and access-control review, and straightforward support that helps reduce avoidable risk over time.",
    bullets: [
      "Recurring vulnerability scanning and practical recommendations",
      "Hardening guidance, access-control review, and backup planning",
      "Ongoing support that keeps security work manageable for a growing business",
    ],
  },
] as const;

export const serviceInterestOptions = [
  ...serviceOfferings.map((service) => service.title),
  "Not sure yet",
] as const;

export const processSteps = [
  {
    step: "01",
    title: "Scan and assess",
    description:
      "We review your website, public exposure, and the security or compliance concerns already affecting the business.",
  },
  {
    step: "02",
    title: "Identify risks and gaps",
    description:
      "We map the issues that could affect trust, uptime, and readiness, then prioritize the work that matters most.",
  },
  {
    step: "03",
    title: "Secure and harden",
    description:
      "We strengthen the website, hosting posture, intake paths, and related safeguards with practical implementation steps.",
  },
  {
    step: "04",
    title: "Support and improve",
    description:
      "When ongoing help makes sense, we stay involved through recurring reviews, guidance, and incremental improvement.",
  },
] as const;
