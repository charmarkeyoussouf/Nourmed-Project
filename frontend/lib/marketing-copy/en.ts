import type { MarketingCopy } from "@/lib/marketing-copy/types";

export const enMarketingCopy: MarketingCopy = {
  brand: {
    descriptor: "Cybersecurity Consulting",
  },
  meta: {
    siteTitle: "Nourmed | Cybersecurity Consulting for Small Businesses",
    siteDescription:
      "Nourmed helps small businesses improve website security, compliance readiness, and recurring protection with practical cybersecurity consulting.",
    siteOpenGraphDescription:
      "Cybersecurity consulting for small businesses focused on secure websites, compliance readiness, vulnerability scanning, and practical ongoing protection.",
    home: {
      title: "Cybersecurity Consulting for Small Businesses",
      description:
        "Nourmed helps small businesses secure websites, reduce vulnerabilities, improve compliance readiness, and strengthen trust with practical cybersecurity support.",
      keywords: [
        "small business cybersecurity",
        "website security consulting",
        "small business vulnerability scan",
        "compliance consulting for small businesses",
      ],
    },
    services: {
      title: "Services",
      description:
        "Explore compliance consulting, secure website development, and ongoing small business cybersecurity packages with practical pricing and clear scope.",
      keywords: [
        "compliance consulting for small businesses",
        "secure website development",
        "small business cybersecurity packages",
        "vulnerability scan",
        "website security consulting",
      ],
    },
    about: {
      title: "About",
      description:
        "Learn how Nourmed helps small businesses strengthen public-facing systems, improve compliance readiness, and reduce avoidable cyber risk.",
      keywords: ["about nourmed", "small business security partner", "cybersecurity consulting company"],
    },
    contact: {
      title: "Contact",
      description:
        "Request a free security scan or quote from Nourmed for compliance consulting, secure website development, or ongoing small business protection.",
      keywords: ["free security scan", "small business security quote", "contact cybersecurity consultant"],
    },
  },
  nav: {
    languageLabel: "Language",
    links: [
      { href: "/", label: "Home" },
      { href: "/services", label: "Services" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
    cta: "Get a Free Security Scan",
  },
  footer: {
    description:
      "Cybersecurity consulting for small businesses focused on secure websites, compliance readiness, and practical ongoing protection.",
    cta: "Request a Free Scan",
    closing: "Practical protection for growing businesses.",
    ribbon: "Secure websites. Compliance readiness. Ongoing protection.",
  },
  shared: {
    pricingDisclaimer: "Final pricing depends on scope, business size, and system complexity.",
    serviceOfferings: [
      {
        slug: "compliance-consulting",
        interestValue: "Compliance Consulting",
        title: "Compliance Consulting",
        price: "Starting at $750",
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
        interestValue: "Secure Website Development",
        title: "Secure Website Development",
        price: "Starting at $2,500",
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
        interestValue: "Small Business Security Packages",
        title: "Small Business Security Packages",
        price: "Starting at $199/month",
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
    ],
    processSteps: [
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
    ],
    serviceInterestOptions: [
      { value: "Compliance Consulting", label: "Compliance Consulting" },
      { value: "Secure Website Development", label: "Secure Website Development" },
      { value: "Small Business Security Packages", label: "Small Business Security Packages" },
      { value: "Not sure yet", label: "Not sure yet" },
    ],
  },
  form: {
    eyebrow: "Free security scan",
    title: "Request a free security scan or quote",
    description:
      "Tell Nourmed a little about your business, your website, and the type of support you need. We will review the request and recommend the right next step.",
    submitLabel: "Request a Free Scan",
    secureNote: "Secure intake, server-side validation, and anti-spam controls are enabled on the backend.",
    hiddenWebsiteLabel: "Website",
    fields: {
      name: "Name",
      businessName: "Business Name",
      email: "Email",
      websiteUrl: "Website URL",
      websiteUrlPlaceholder: "https://yourbusiness.com",
      serviceOfInterest: "Service of Interest",
      servicePlaceholder: "Select a service",
      optionalMessage: "Optional Message",
    },
    messages: {
      submitting: "Sending your request...",
      success: "Your request has been received. Nourmed will review it and follow up shortly.",
      error: "The request could not be sent. Please check your connection and try again.",
    },
  },
  home: {
    heroEyebrow: "Cybersecurity for small businesses",
    heroTitle: "Protect your business from cyber risk, downtime, and weak systems.",
    heroDescription:
      "Nourmed helps small businesses secure their websites, reduce vulnerabilities, improve compliance readiness, and build more confidence into the systems customers and partners rely on.",
    primaryCta: "Get a Free Security Scan",
    secondaryCta: "View Services",
    heroPanelEyebrow: "What Nourmed helps with",
    heroPanelTitle: "Clear security support for businesses that need stronger public-facing systems.",
    heroHighlights: [
      "Secure public-facing websites and forms",
      "Compliance readiness guidance for growing businesses",
      "Ongoing security support sized for small teams",
    ],
    heroScanEyebrow: "Free scan",
    heroScanDescription:
      "Start with a free security scan to understand visible gaps before committing to a larger engagement.",
    whatWeDo: {
      eyebrow: "What We Do",
      title:
        "Nourmed helps small businesses secure websites, reduce vulnerabilities, and strengthen readiness",
      description:
        "We focus on the parts of the business that affect trust most: public-facing systems, security gaps that interrupt operations, and the readiness work needed to answer customer or vendor expectations with confidence.",
      items: [
        {
          title: "Secure the systems people actually see",
          description:
            "Nourmed helps small businesses improve the websites, forms, hosting decisions, and public-facing systems that shape trust from the first visit.",
        },
        {
          title: "Reduce avoidable risk before it grows",
          description:
            "We look for vulnerabilities, weak processes, and security gaps that can lead to downtime, poor customer confidence, or hard questions from vendors and partners.",
        },
        {
          title: "Make security easier to act on",
          description:
            "The focus is practical guidance. Business owners get clear priorities, sensible recommendations, and implementation support without enterprise-heavy jargon.",
        },
      ],
    },
    howWeDoIt: {
      eyebrow: "How We Do It",
      title: "A simple process built around clarity, action, and steady improvement",
      description:
        "Nourmed keeps the process straightforward so business owners can see what matters, what needs to happen next, and where ongoing support makes sense.",
    },
    services: {
      eyebrow: "Services",
      title: "Three ways Nourmed supports small-business security and readiness",
      description:
        "Each service is structured to be clear, practical, and useful for real businesses rather than overloaded with unnecessary complexity.",
      cardCta: "View Service Details",
    },
    freeScan: {
      eyebrow: "Free Security Scan",
      title: "Start with a clear first step instead of guessing what needs attention",
      description:
        "A free scan helps you understand visible website risk, likely weak points, and which Nourmed service is the best fit before you commit to a larger scope.",
      benefits: [
        "A clear first look at website risk, intake paths, and visible exposure",
        "Guidance on the right service path for your business",
        "A more informed quote when deeper work is needed",
      ],
      formEyebrow: "Request your scan",
      formTitle: "Request a free security scan or quote",
      formDescription:
        "Tell Nourmed about your business, your website, and the type of help you need. We will review the request and recommend the right next step.",
    },
    trust: {
      eyebrow: "Trust & Reassurance",
      title: "Practical protection for growing businesses that need clear guidance",
      description:
        "Nourmed is built around business-relevant security work: secure websites, stronger readiness, and support that helps owners move forward with more confidence.",
      items: [
        {
          title: "Practical guidance, not noise",
          description:
            "Nourmed explains risks and next steps in plain English so business owners can make decisions quickly and confidently.",
        },
        {
          title: "Security-minded execution",
          description:
            "From secure websites to recurring protection, the work is shaped around real operational risk rather than generic agency deliverables.",
        },
        {
          title: "Readiness without overclaiming",
          description:
            "Nourmed supports compliance readiness and implementation guidance, but does not present itself as a law firm or certifying body.",
        },
      ],
    },
  },
  servicesPage: {
    heroEyebrow: "Cybersecurity consulting services",
    heroTitle:
      "Services designed to help small businesses strengthen security and operate with more confidence.",
    heroDescription:
      "Nourmed helps businesses secure public-facing systems, prepare for compliance expectations, and reduce avoidable risk through clear consulting, practical implementation, and ongoing support.",
    primaryCta: "Get a Free Security Scan",
    secondaryCta: "Get a Free Quote",
    principles: {
      eyebrow: "What We Do",
      title: "Security services built around real business needs",
      description:
        "Nourmed helps small businesses improve trust, reduce vulnerabilities, and make better security decisions with service lines that stay practical and easy to understand.",
      items: [
        {
          title: "Clear scopes and practical outcomes",
          description:
            "Nourmed structures each engagement around visible business needs, real risks, and work that can be understood by owners and operators.",
        },
        {
          title: "Security work that supports trust",
          description:
            "The goal is to improve the systems customers, vendors, and partners rely on, not to bury your team in unnecessary complexity.",
        },
        {
          title: "Support that fits smaller organizations",
          description:
            "Everything is designed for growing businesses that need serious protection without enterprise-sized overhead.",
        },
      ],
    },
    process: {
      eyebrow: "How We Do It",
      title: "A straightforward process from assessment to ongoing support",
      description:
        "The work begins with clarity, moves into practical remediation, and grows into recurring support only where it adds value.",
    },
    pricing: {
      eyebrow: "Services",
      title: "Three service lines with realistic starting prices for small businesses",
      description:
        "These starting prices are designed to be credible for small-business engagements while leaving room to scale with scope, systems, and business complexity.",
      boxEyebrow: "Average starting price",
      cta: "Get a Free Quote",
    },
    freeScan: {
      eyebrow: "Free Security Scan",
      title: "Use the free scan to understand your next security move",
      description:
        "Tell Nourmed what you are concerned about, share the website or system in question, and we will review the visible risk surface before recommending a practical next step.",
      benefits: [
        "A practical review of your website and visible attack surface",
        "A clearer understanding of which service is the right fit",
        "A faster and more informed quote when deeper work is needed",
      ],
      formEyebrow: "Request your scan",
      formTitle: "Request a free security scan or quote",
      formDescription:
        "Use this form for a free scan, a service quote, or a practical first conversation about your security priorities.",
    },
    trust: {
      eyebrow: "Trust & Reassurance",
      title: "Security guidance that stays practical and business-relevant",
      description:
        "Nourmed is built for owners and operators who need serious help protecting public-facing systems, improving readiness, and reducing avoidable risk.",
      items: [
        {
          title: "Business-friendly guidance",
          description:
            "We explain what matters, why it matters, and what should happen next in terms a non-technical owner can use.",
        },
        {
          title: "Readiness support without legal overreach",
          description:
            "Nourmed helps businesses prepare for security and compliance expectations, but does not provide legal advice or issue certifications.",
        },
        {
          title: "Security work that remains practical",
          description:
            "The focus stays on websites, vulnerabilities, trust, access, backups, and recurring risk reduction that supports real operations.",
        },
      ],
    },
  },
  aboutPage: {
    heroEyebrow: "About Nourmed",
    heroTitle: "A security and compliance readiness partner for small businesses that need practical protection",
    heroDescription:
      "Nourmed was built to help growing businesses strengthen public-facing systems, prepare for real-world security expectations, and make better decisions before small issues turn into bigger problems.",
    panelEyebrow: "What this means",
    panelBody: [
      "We help businesses understand the security expectations attached to customer trust, vendor requirements, public-facing websites, and everyday operational risk.",
      "The goal is a stronger security posture, not confusion. Nourmed focuses on guidance and implementation support that makes sense for small teams.",
    ],
    principles: {
      eyebrow: "Operating Principles",
      title: "How Nourmed approaches security work",
      description:
        "The business is designed around clarity, trust, and steady risk reduction rather than generic technical theater.",
      items: [
        {
          title: "Business-first communication",
          description:
            "Nourmed explains what matters in plain English so owners and operators can make security decisions without getting buried under buzzwords.",
        },
        {
          title: "Practical protection",
          description:
            "We focus on reducing real risk for growing businesses: secure websites, stronger intake paths, better readiness, and operational follow-through.",
        },
        {
          title: "Readiness without overclaiming",
          description:
            "Nourmed supports compliance readiness and security preparation, but does not pretend to be a law firm or a certifying authority.",
        },
        {
          title: "Long-term improvement",
          description:
            "The goal is not a one-time checklist. It is helping small businesses build stronger systems that can hold up as expectations grow.",
        },
      ],
    },
    expectations: {
      eyebrow: "What Clients Can Expect",
      title: "A simple model for practical security improvement",
      description:
        "Nourmed helps businesses understand where they are exposed, what matters most, and how to improve without overspending on the wrong priorities.",
      items: [
        {
          label: "Who we serve",
          detail:
            "Small businesses that need clearer security posture, stronger websites, and better preparation for customer or vendor expectations.",
        },
        {
          label: "What we focus on",
          detail:
            "Compliance readiness, secure website development, and recurring security support sized for growing operations.",
        },
        {
          label: "How we work",
          detail:
            "We assess what is exposed, prioritize what matters most, harden what is weak, and support ongoing improvement where needed.",
        },
        {
          label: "What clients get",
          detail:
            "Clearer risk visibility, more trustworthy public systems, and security guidance that is practical enough to implement.",
        },
      ],
    },
    cta: {
      eyebrow: "Next step",
      title:
        "If you need a secure website, clearer compliance readiness, or ongoing protection, start with a free scan or quote request.",
      label: "Get a Free Quote",
    },
  },
  contactPage: {
    heroEyebrow: "Free Security Scan",
    heroTitle: "Request a free security scan or a scoped quote",
    heroDescription:
      "Use the secure intake form to tell Nourmed about your business, your website, and the kind of support you need. We will review the request and recommend a practical next step.",
    expectationEyebrow: "What to expect",
    expectationBody: [
      "Use this form for compliance consulting, secure website development, or recurring security support.",
      "The goal is to understand your business, your visible risk surface, and whether a free scan or a deeper engagement makes the most sense.",
      "Nourmed focuses on practical cybersecurity and readiness guidance, not legal claims, fake guarantees, or inflated jargon.",
    ],
    assurances: [
      {
        title: "Useful information first",
        description: "The form collects the details needed to scope a free security scan or a practical service quote.",
      },
      {
        title: "Protected intake path",
        description:
          "Requests are validated on the backend and protected by anti-spam controls before they reach storage.",
      },
      {
        title: "A clearer next step",
        description:
          "Nourmed uses the request to understand visible risk, business needs, and the right service path.",
      },
    ],
  },
};
