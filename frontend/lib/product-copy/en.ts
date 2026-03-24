import type { ProductCopy } from "@/lib/product-copy/types";

export const enProductCopy: ProductCopy = {
  navLinks: [
    { href: "/security-scan", label: "Security Scan" },
    { href: "/payments", label: "Payments" },
  ],
  paymentsMeta: {
    title: "Payments",
    description:
      "Pay a Nourmed deposit securely through hosted checkout for compliance consulting, secure website projects, and recurring security onboarding.",
    keywords: [
      "cybersecurity consulting payment",
      "security project deposit",
      "stripe checkout consulting",
      "website security deposit",
    ],
  },
  paymentsPage: {
    heroEyebrow: "Secure payments",
    heroTitle: "A clean way to pay deposits and move a security engagement forward.",
    heroDescription:
      "Use hosted checkout for fixed deposits, reserve a scoped engagement, or start with a free scan before larger work. Nourmed explains what the payment covers before you commit.",
    primaryCta: "Choose a Payment Option",
    secondaryCta: "Talk to Nourmed First",
    useCasesEyebrow: "When to Use This Page",
    useCasesTitle: "Payment options designed for common client paths",
    useCasesDescription:
      "This page is meant for straightforward next steps: reserve a kickoff, place a deposit on a scoped project, or start with a free request before custom pricing.",
    useCases: [
      {
        title: "Reserve a scoped consultation",
        description: "Use a fixed deposit when you are ready to book compliance guidance and initial planning time.",
      },
      {
        title: "Start a secure website project",
        description: "Use the website project deposit after scope alignment to reserve implementation and deployment planning.",
      },
      {
        title: "Begin recurring protection",
        description: "Use the package setup deposit when you are ready to onboard into a recurring small-business security package.",
      },
    ],
    optionsEyebrow: "Payment Options",
    optionsTitle: "Clear payment choices with business-friendly scope",
    optionsDescription:
      "Fixed deposits are routed through Stripe Checkout so Nourmed does not store raw card data. Custom engagements still begin with a scoped conversation.",
    options: [
      {
        key: "free-scan-request",
        mode: "link",
        label: "Free Scan Request",
        price: "$0",
        description: "Start with an authorized scan or free quote request before a larger engagement.",
        cta: "Request a Free Scan",
        href: "/security-scan",
      },
      {
        key: "compliance-consultation-deposit",
        mode: "checkout",
        label: "Compliance Consultation Deposit",
        price: "$250",
        description: "Reserve an initial compliance readiness engagement and scoping conversation.",
        cta: "Pay Deposit",
      },
      {
        key: "secure-website-project-deposit",
        mode: "checkout",
        label: "Secure Website Project Deposit",
        price: "$500",
        description: "Reserve a secure website build or remediation engagement with implementation planning.",
        cta: "Pay Deposit",
      },
      {
        key: "security-package-setup-deposit",
        mode: "checkout",
        label: "Security Package Setup Deposit",
        price: "$300",
        description: "Reserve onboarding for a recurring security package and initial posture review.",
        cta: "Pay Deposit",
      },
      {
        key: "custom-engagement",
        mode: "link",
        label: "Custom Engagement",
        price: "Contact us first",
        description: "Use a scoped quote first for larger environments, multi-site estates, or specialized requirements.",
        cta: "Request a Quote",
        href: "/contact",
      },
    ],
    formEyebrow: "Hosted checkout",
    formTitle: "Choose a deposit and complete checkout securely",
    formDescription:
      "Select one of the fixed deposit options, enter the contact details Nourmed should tie to the engagement, and you will be redirected to Stripe Checkout.",
    pricingNote: "Free scan requests stay free. Larger or multi-system environments are quoted separately before payment.",
    faqEyebrow: "FAQ",
    faqTitle: "Short answers before you pay",
    faqDescription: "The payment flow is intentionally simple, transparent, and suited to small-business buying decisions.",
    faq: [
      {
        question: "What happens after I pay a deposit?",
        answer: "Nourmed uses the payment record and contact details to confirm scope, schedule next steps, and open the engagement.",
      },
      {
        question: "Does Nourmed store card details?",
        answer: "No. Card collection is handled through hosted Stripe Checkout to keep PCI scope narrow and avoid storing raw payment data on the platform.",
      },
      {
        question: "What if my engagement needs a custom quote?",
        answer: "Use the custom engagement path first. Larger environments, multiple targets, or specialized scopes should be quoted before any payment is taken.",
      },
    ],
    trustEyebrow: "Trust & Security",
    trustTitle: "A payment flow designed to be simple and reassuring",
    trustDescription:
      "The goal is to reduce friction without reducing trust. Hosted checkout, clear service labels, and scoped deposits keep the process easy to understand.",
    trustItems: [
      {
        title: "Hosted card handling",
        description: "Stripe Checkout handles the payment page so Nourmed can avoid storing card data directly.",
      },
      {
        title: "Clear payment purpose",
        description: "Each option explains whether you are reserving consultation time, project kickoff, or onboarding into recurring support.",
      },
      {
        title: "Business-first scope control",
        description: "Custom environments still go through a scoped conversation instead of forcing a generic one-size-fits-all payment.",
      },
    ],
    successTitle: "Payment received",
    successDescription: "Your checkout was recorded. Nourmed will use the payment and contact details to confirm the next step.",
    cancelTitle: "Checkout canceled",
    cancelDescription: "No payment was captured. You can return to the payment options or contact Nourmed for a scoped quote.",
  },
  scanMeta: {
    title: "Authorized Security Scan",
    description:
      "Launch an authorized-only security posture scan for websites, domains, and explicitly declared services, then review prioritized findings.",
    keywords: [
      "authorized security scan",
      "website vulnerability scan",
      "small business security posture scan",
      "defensive web assessment",
    ],
  },
  scanPage: {
    heroEyebrow: "Authorized security scan",
    heroTitle: "Run a read-only security posture scan on assets you own or are authorized to test.",
    heroDescription:
      "This MVP is designed for defensive assessment only. It reviews visible transport, TLS, header, cookie, and basic web-surface signals so businesses can understand where to focus next.",
    primaryCta: "Launch a Scan",
    secondaryCta: "Request a Scoped Quote",
    guardrailTitle: "Authorized testing only",
    guardrailBody:
      "Use this workflow only for assets your organization owns or assets for which you have explicit written authorization. The current MVP is read-only, non-destructive, and intended for defensive review, not offensive testing.",
    capabilitiesEyebrow: "What the MVP Reviews",
    capabilitiesTitle: "A credible first pass instead of a fake all-in-one promise",
    capabilitiesDescription:
      "Nourmed starts with practical signals that matter early: reachable services, transport posture, basic web safeguards, and issues that are easy to prioritize.",
    capabilities: [
      {
        title: "TLS and transport checks",
        description: "Review HTTPS reachability, certificate age, and whether HTTP behavior points visitors back to secure transport.",
      },
      {
        title: "Header and cookie posture",
        description: "Check for missing security headers and weak cookie flags that can signal avoidable hardening gaps.",
      },
      {
        title: "HTML and form surface review",
        description: "Look for insecure form actions, mixed-content references, and other basic exposure signals on the analyzed page.",
      },
    ],
    processEyebrow: "How It Works",
    processTitle: "A small-business-friendly flow from request to findings",
    processDescription:
      "The platform records the request, verifies the declared target type, executes a safe review, and returns a report sorted by severity.",
    processSteps: [
      { step: "01", title: "Declare the target", description: "Choose a website, domain, or explicit host:port that you are authorized to review." },
      { step: "02", title: "Confirm authorization", description: "You must attest that the target belongs to you or that you have permission to test it." },
      { step: "03", title: "Run the scan", description: "Nourmed performs a read-only review and stores findings in the backend for reporting." },
      { step: "04", title: "Review the report", description: "The resulting report highlights risk level, findings, and practical next-step guidance." },
    ],
    formEyebrow: "Launch a scan",
    formTitle: "Start an authorized vulnerability assessment",
    formDescription:
      "Provide the target, organization, and authorization confirmation. The report stays limited to this session unless you share it deliberately.",
    trustEyebrow: "Operational Guardrails",
    trustTitle: "Built to stay defensive, limited, and extensible",
    trustDescription:
      "This release is a safe first layer. It is meant to support triage and prioritization, not to claim exhaustive coverage or replace a deeper assessment.",
    trustItems: [
      {
        title: "Read-only by design",
        description: "The scanner focuses on observation and posture review rather than exploit attempts or destructive probes.",
      },
      {
        title: "Explicit authorization required",
        description: "Every scan request requires an authorization attestation before the backend will accept the job.",
      },
      {
        title: "Structured findings",
        description: "Results are stored with severity, description, and remediation guidance so they can support follow-up work.",
      },
    ],
    targetTypeLabel: "Target type",
    targetTypeOptions: [
      { value: "WEB_APPLICATION", label: "Website or web application" },
      { value: "DOMAIN", label: "Domain or subdomain" },
      { value: "HOST_SERVICE", label: "Explicit host:port service" },
    ],
    requesterNameLabel: "Your name",
    requesterEmailLabel: "Your email",
    organizationLabel: "Organization",
    targetLabel: "Target",
    targetPlaceholder: "https://app.yourbusiness.com or portal.example.com or 10.0.0.15:8443",
    notesLabel: "Optional notes",
    authorizationLabel: "I confirm that I own this asset or have explicit authorization to test it.",
    authorizationHint: "For explicit services, use the format host:port. Intranet targets require scanner network reachability.",
    submitLabel: "Start Authorized Scan",
    submittingLabel: "Launching scan...",
    reportTitle: "Scan report",
    reportDescription: "This report reflects the current MVP scope: safe posture checks, not exhaustive penetration testing.",
    reportEmpty: "Launch a scan to generate a report for an authorized target.",
    findingsTitle: "Findings",
    technicalSummaryTitle: "Technical summary",
    statusQueued: "Queued",
    statusRunning: "Running",
    statusCompleted: "Completed",
    statusFailed: "Failed",
    messages: {
      success: "The scan job was created. Nourmed is now collecting findings.",
      error: "The scan could not be started. Review the target and authorization details, then try again.",
      loading: "Refreshing scan status...",
    },
    riskLabels: {
      LOW: "Low risk",
      MODERATE: "Moderate risk",
      ELEVATED: "Elevated risk",
      HIGH: "High risk",
      CRITICAL: "Critical risk",
    },
  },
  paymentsForm: {
    customerName: "Name",
    businessName: "Business name",
    customerEmail: "Email",
    notes: "Optional notes",
    submitLabel: "Continue to Secure Checkout",
    submittingLabel: "Redirecting...",
    emptyState: "Select a paid deposit option to continue to checkout.",
    secureNote: "Hosted Stripe Checkout is used for payment collection. Nourmed stores the engagement record, not raw card data.",
    messages: {
      redirecting: "Preparing secure checkout...",
      error: "Checkout could not be created. Please verify your details or contact Nourmed for a scoped payment link.",
    },
  },
};
