import type { MarketingCopy } from "@/lib/marketing-copy/types";

export const enMarketingCopy: MarketingCopy = {
  brand: {
    descriptor: "Supply Chain Consulting",
  },
  meta: {
    siteTitle: "Nourmed | Supply Chain Consulting for Small and Mid-Size Businesses",
    siteDescription:
      "Nourmed helps small and mid-size businesses build resilient supply chains, reduce costs, improve vendor relationships, and streamline operations with practical consulting support.",
    siteOpenGraphDescription:
      "Supply chain consulting for businesses that need stronger procurement, better vendor performance, lower operating friction, and more resilience.",
    home: {
      title: "Supply Chain Consulting",
      description:
        "Nourmed helps small and mid-size businesses build resilient supply chains, reduce costs, improve vendor relationships, and streamline operations.",
      keywords: [
        "supply chain consulting",
        "vendor management consulting",
        "procurement consulting",
        "logistics optimization",
      ],
    },
    services: {
      title: "Supply Chain Services",
      description:
        "Explore supply chain audits, procurement and vendor optimization, and ongoing support built for practical business results.",
      keywords: [
        "supply chain audit",
        "procurement optimization",
        "vendor management consulting",
        "ongoing supply chain support",
      ],
    },
    about: {
      title: "About Nourmed",
      description:
        "Learn how Nourmed helps growing businesses improve procurement, vendor performance, resilience, and operational clarity.",
      keywords: ["about nourmed", "supply chain consulting firm", "procurement advisor"],
    },
    contact: {
      title: "Contact Nourmed",
      description:
        "Request a free supply chain assessment or quote for procurement, vendor optimization, and ongoing consulting support.",
      keywords: ["supply chain assessment", "procurement consulting quote", "vendor optimization contact"],
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
    cta: "Get a Quote",
  },
  footer: {
    description:
      "Supply chain consulting for small and mid-size businesses focused on cost reduction, vendor performance, and operational resilience.",
    cta: "Request an Assessment",
    closing: "Practical supply chain consulting for growing businesses.",
    ribbon: "Procurement. Vendor Management. Logistics. Risk Resilience.",
  },
  shared: {
    pricingDisclaimer: "Final pricing depends on scope, business size, and supply chain complexity.",
    serviceOfferings: [
      {
        slug: "supply-chain-audit-assessment",
        interestValue: "Supply Chain Audit & Assessment",
        title: "Supply Chain Audit & Assessment",
        price: "Starting at $750",
        summary:
          "A focused review of your supply chain, vendor relationships, procurement process, and operational pain points with prioritized next steps.",
        description:
          "This assessment gives you a clear look at where cost, delay, vendor friction, and process risk are affecting performance. Nourmed reviews the current structure, identifies where the chain is under strain, and turns that into practical recommendations your team can act on without overcomplicating execution.",
        bullets: [
          "Current-state review across procurement, vendors, inventory flow, and operational handoffs",
          "Prioritized recommendations tied to savings, resilience, and practical implementation effort",
          "A clear baseline for deciding whether optimization or recurring support is the right next step",
        ],
      },
      {
        slug: "procurement-vendor-optimization",
        interestValue: "Procurement & Vendor Optimization",
        title: "Procurement & Vendor Optimization",
        price: "Starting at $2,500",
        summary:
          "Hands-on support for renegotiating contracts, improving supplier performance, reducing dependency risk, and tightening procurement workflows.",
        description:
          "Nourmed helps businesses improve the part of the supply chain that often leaks the most value: sourcing, vendor accountability, and purchasing discipline. That can mean better pricing, better terms, better supplier coverage, and a cleaner internal process for approvals and performance management.",
        bullets: [
          "Supplier and contract review to uncover pricing, leverage, and accountability gaps",
          "Vendor qualification, scorecarding, and dependency reduction support",
          "Procurement process improvement that reduces friction while improving control",
        ],
      },
      {
        slug: "ongoing-supply-chain-support",
        interestValue: "Ongoing Supply Chain Support",
        title: "Ongoing Supply Chain Support",
        price: "Starting at $199/month",
        summary:
          "Recurring consulting for businesses that want ongoing oversight, periodic reviews, and a practical partner as operations grow.",
        description:
          "For teams that want continued help instead of one-time advice, Nourmed provides regular review, planning support, and follow-through on the operational issues that keep resurfacing. The goal is steady improvement, not consultant theater or bloated reporting.",
        bullets: [
          "Recurring supply chain reviews and practical recommendations",
          "Ongoing support for vendor performance, procurement discipline, and operational planning",
          "A right-sized advisory model that keeps improvements moving as the business grows",
        ],
      },
    ],
    processSteps: [
      {
        step: "01",
        title: "Assess",
        description:
          "We review your current supply chain structure, vendor base, procurement process, and the pain points already affecting the business.",
      },
      {
        step: "02",
        title: "Diagnose",
        description:
          "We map the inefficiencies, risk areas, and cost drivers that matter most, then prioritize them by impact and practicality.",
      },
      {
        step: "03",
        title: "Optimize",
        description:
          "We help implement the practical changes that improve performance, from vendor structures to procurement workflows and operating rhythm.",
      },
      {
        step: "04",
        title: "Sustain",
        description:
          "When ongoing support makes sense, we stay involved through recurring reviews and steady improvement planning.",
      },
    ],
    serviceInterestOptions: [
      { value: "Supply Chain Audit & Assessment", label: "Supply Chain Audit & Assessment" },
      { value: "Procurement & Vendor Optimization", label: "Procurement & Vendor Optimization" },
      { value: "Ongoing Supply Chain Support", label: "Ongoing Supply Chain Support" },
      { value: "Not sure yet", label: "Not sure yet" },
    ],
  },
  form: {
    eyebrow: "Free assessment",
    title: "Request a free assessment or quote",
    description:
      "Tell Nourmed about your business, your website, and where your supply chain is causing the most pain. We will review the request and recommend the right next step.",
    submitLabel: "Request Free Assessment",
    secureNote: "Requests are validated server-side, and the website field helps us review your current footprint before the assessment.",
    hiddenWebsiteLabel: "Website",
    fields: {
      name: "Name",
      businessName: "Business Name",
      email: "Email",
      websiteUrl: "Business Website",
      websiteUrlPlaceholder: "yourcompany.com",
      serviceOfInterest: "Service of Interest",
      servicePlaceholder: "Select a service",
      optionalMessage: "Supply Chain Challenge (optional)",
    },
    messages: {
      submitting: "Sending your request...",
      success: "Your request has been received. Nourmed will review it and follow up shortly.",
      error: "The request could not be sent. Please check your connection and try again.",
    },
  },
  home: {
    heroEyebrow: "Supply Chain Consulting",
    heroTitle: "Build supply chains that <em>perform under pressure.</em>",
    heroDescription:
      "Nourmed helps small and mid-size businesses reduce costs, strengthen vendor relationships, and build resilient supply chains without enterprise-level complexity.",
    primaryCta: "Request a Free Assessment",
    secondaryCta: "View Services",
    heroPanelEyebrow: "Supply chain focus",
    heroPanelTitle: "Practical support for businesses that need clearer vendor, procurement, and logistics decisions.",
    heroHighlights: [
      "Reduce procurement costs without cutting corners",
      "Improve vendor accountability and resilience",
      "Build better visibility into day-to-day operations",
    ],
    heroScanEyebrow: "Assessment",
    heroScanDescription:
      "Start with a free assessment to understand your biggest cost, vendor, and process issues before committing to a larger engagement.",
    whatWeDo: {
      eyebrow: "What We Do",
      title: "Practical supply chain support for businesses that need results, not theory.",
      description:
        "We focus on the parts of the supply chain that affect cost, delivery, and business continuity the most, then build solutions your team can actually maintain.",
      items: [
        {
          title: "Reduce procurement costs",
          description:
            "We identify overpaid contracts, vendor overlap, and negotiation gaps so you can improve margins without creating new operational problems.",
        },
        {
          title: "Strengthen vendor relationships",
          description:
            "We help you set clearer expectations, evaluate supplier performance, and reduce dependency on single-source risk.",
        },
        {
          title: "Improve visibility and control",
          description:
            "From inventory flow to demand planning, we help you build a clearer picture of how the chain is performing and where it breaks down.",
        },
        {
          title: "Prepare for disruption",
          description:
            "We assess the weak points in the chain and help you build practical contingency plans before disruption becomes expensive.",
        },
      ],
    },
    howWeDoIt: {
      eyebrow: "How We Work",
      title: "A clear process from first conversation to lasting improvement.",
      description:
        "We keep the engagement straightforward so you can see exactly where you are, what comes next, and what is improving.",
    },
    services: {
      eyebrow: "Services",
      title: "Three ways Nourmed supports your supply chain.",
      description:
        "Each service is scoped to deliver clear, measurable results for real businesses instead of generic deliverables and vague strategy decks.",
      cardCta: "Learn more",
    },
    freeScan: {
      eyebrow: "Get Started",
      title: "Start with a free supply chain assessment.",
      description:
        "Tell us about your business and where your supply chain is causing the most pain. We will review it and recommend the right next step with no commitment required.",
      benefits: [
        "A clear look at your biggest supply chain risks and opportunities",
        "Guidance on the right service path for your business size and goals",
        "A more accurate quote when deeper work is needed",
      ],
      formEyebrow: "Request your assessment",
      formTitle: "Request a free assessment or quote",
      formDescription:
        "Use this form to tell us about your business, your website, and the operational issues you want to improve first.",
    },
    trust: {
      eyebrow: "Why Nourmed",
      title: "Built around practical results, not consulting theater.",
      description:
        "Nourmed is designed for businesses that need useful operational guidance, clear communication, and follow-through that actually improves performance.",
      items: [
        {
          title: "Operational, not academic",
          description:
            "We focus on changes that can actually be implemented, not slide decks that sit on a shelf after the kickoff meeting.",
        },
        {
          title: "Right-sized for your business",
          description:
            "Whether you are a small manufacturer or a mid-size distributor, we scope the work to fit your complexity and budget.",
        },
        {
          title: "Clear communication, always",
          description:
            "We explain risks, trade-offs, and next steps in plain language so you can make confident decisions quickly.",
        },
      ],
    },
  },
  servicesPage: {
    heroEyebrow: "Supply chain services",
    heroTitle: "Services designed to strengthen cost control, vendor performance, and operational resilience.",
    heroDescription:
      "Nourmed helps businesses improve procurement, reduce avoidable supply chain friction, and build systems that perform more reliably as the company grows.",
    primaryCta: "Request a Free Assessment",
    secondaryCta: "Get a Quote",
    principles: {
      eyebrow: "What We Do",
      title: "Supply chain support built around practical business needs",
      description:
        "The goal is to improve how the business operates in the real world: better vendor performance, better process control, and better resilience.",
      items: [
        {
          title: "Clear scopes and practical outcomes",
          description:
            "Every engagement is framed around the operational issues that matter most, with recommendations that can actually be acted on.",
        },
        {
          title: "Results that show up in operations",
          description:
            "We focus on cost, reliability, supplier performance, and decision clarity instead of abstract consulting language.",
        },
        {
          title: "Support sized for growing businesses",
          description:
            "The work is designed for small and mid-size teams that need serious help without enterprise-heavy overhead.",
        },
      ],
    },
    process: {
      eyebrow: "How We Work",
      title: "A straightforward process from assessment to implementation support",
      description:
        "We begin by clarifying where the chain is underperforming, then move into prioritized improvements and ongoing support where it adds value.",
    },
    pricing: {
      eyebrow: "Services",
      title: "Three service lines with realistic starting prices for growing businesses",
      description:
        "These starting prices are meant to stay credible for small and mid-size engagements while leaving room to scale with scope and complexity.",
      boxEyebrow: "Average starting price",
      cta: "Request an Assessment",
    },
    freeScan: {
      eyebrow: "Free assessment",
      title: "Use the free assessment to understand your next supply chain move",
      description:
        "Tell Nourmed where costs, vendor issues, delays, or process friction are creating problems, and we will recommend the most practical next step.",
      benefits: [
        "A practical review of your current supply chain pain points",
        "A clearer understanding of which service is the right fit",
        "A faster and more informed quote when deeper work is needed",
      ],
      formEyebrow: "Request your assessment",
      formTitle: "Request a free assessment or quote",
      formDescription:
        "Use this form for an assessment request, a scoped quote, or a practical first conversation about your supply chain priorities.",
    },
    trust: {
      eyebrow: "Why Nourmed",
      title: "Consulting that stays practical, useful, and operationally grounded",
      description:
        "Nourmed is built for leaders who want better supply chain decisions and measurable operational improvement, not inflated consulting theater.",
      items: [
        {
          title: "Business-friendly guidance",
          description:
            "We explain what matters, why it matters, and what should happen next in language your team can actually use.",
        },
        {
          title: "Recommendations built for execution",
          description:
            "The focus stays on what can realistically be implemented, maintained, and improved over time.",
        },
        {
          title: "A practical advisory model",
          description:
            "We help businesses move from unclear friction points to clearer systems, stronger suppliers, and more confidence in day-to-day operations.",
        },
      ],
    },
  },
  aboutPage: {
    heroEyebrow: "About Nourmed",
    heroTitle: "A practical supply chain partner for businesses that need clearer operations and better vendor performance",
    heroDescription:
      "Nourmed was built to help growing businesses improve procurement, strengthen supplier accountability, and reduce the friction that slows operations down.",
    panelEyebrow: "What this means",
    panelBody: [
      "We help businesses understand where cost, delay, and vendor complexity are getting in the way of consistent performance.",
      "The goal is a supply chain that is easier to manage, easier to improve, and better prepared for disruption as the business grows.",
    ],
    principles: {
      eyebrow: "Operating Principles",
      title: "How Nourmed approaches supply chain work",
      description:
        "The business is designed around clarity, execution, and long-term improvement rather than presentation-heavy consulting.",
      items: [
        {
          title: "Operational communication",
          description:
            "We explain supply chain issues in business language so owners and operators can make decisions quickly and confidently.",
        },
        {
          title: "Practical recommendations",
          description:
            "The focus stays on changes that improve procurement, vendor performance, resilience, and control in day-to-day operations.",
        },
        {
          title: "Results over theater",
          description:
            "We care more about what gets implemented than about producing polished deliverables with no operational follow-through.",
        },
        {
          title: "Steady improvement",
          description:
            "The goal is not a one-time assessment alone. It is helping businesses build a stronger operating model over time.",
        },
      ],
    },
    expectations: {
      eyebrow: "What Clients Can Expect",
      title: "A simple model for practical supply chain improvement",
      description:
        "Nourmed helps businesses understand where operations are strained, what matters most, and how to improve without overcomplicating execution.",
      items: [
        {
          label: "Who we serve",
          detail:
            "Small and mid-size businesses that need stronger procurement, better supplier oversight, and clearer operational systems.",
        },
        {
          label: "What we focus on",
          detail:
            "Supply chain assessments, procurement and vendor optimization, and ongoing support for growing operations.",
        },
        {
          label: "How we work",
          detail:
            "We assess the current state, prioritize the biggest opportunities, help implement practical changes, and support continued improvement where needed.",
        },
        {
          label: "What clients get",
          detail:
            "Better visibility, stronger vendor decisions, clearer priorities, and a more resilient operating model.",
        },
      ],
    },
    cta: {
      eyebrow: "Next step",
      title: "If your supply chain is creating avoidable cost, friction, or risk, start with a free assessment or quote request.",
      label: "Get a Quote",
    },
  },
  contactPage: {
    heroEyebrow: "Free assessment",
    heroTitle: "Request a free supply chain assessment or a scoped quote",
    heroDescription:
      "Use the intake form to tell Nourmed about your business, your website, and the type of support you need. We will review the request and recommend a practical next step.",
    expectationEyebrow: "What to expect",
    expectationBody: [
      "Use this form for a supply chain assessment, procurement and vendor optimization, or ongoing consulting support.",
      "The goal is to understand the business context, the operational friction you are dealing with, and whether a lightweight assessment or deeper engagement makes the most sense.",
      "Nourmed focuses on practical supply chain improvement, clear communication, and recommendations that are built to be implemented.",
    ],
    assurances: [
      {
        title: "Useful information first",
        description: "The form collects the details needed to scope a practical assessment or a more tailored consulting conversation.",
      },
      {
        title: "Protected intake path",
        description:
          "Requests are validated on the backend before they are stored, helping keep the intake path clean and reliable.",
      },
      {
        title: "A clearer next step",
        description:
          "Nourmed uses the request to understand your priorities, your current footprint, and the right service path for the business.",
      },
    ],
  },
};
