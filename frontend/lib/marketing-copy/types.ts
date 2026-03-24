export type LinkItem = {
  href: string;
  label: string;
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type ServiceOffering = {
  slug: string;
  interestValue: string;
  title: string;
  price: string;
  summary: string;
  description: string;
  bullets: readonly string[];
};

export type FormCopy = {
  eyebrow: string;
  title: string;
  description: string;
  submitLabel: string;
  secureNote: string;
  hiddenWebsiteLabel: string;
  fields: {
    name: string;
    businessName: string;
    email: string;
    websiteUrl: string;
    websiteUrlPlaceholder: string;
    serviceOfInterest: string;
    servicePlaceholder: string;
    optionalMessage: string;
  };
  messages: {
    submitting: string;
    success: string;
    error: string;
  };
};

export type PageMeta = {
  title: string;
  description: string;
  keywords: readonly string[];
};

export type MarketingCopy = {
  brand: {
    descriptor: string;
  };
  meta: {
    siteTitle: string;
    siteDescription: string;
    siteOpenGraphDescription: string;
    home: PageMeta;
    services: PageMeta;
    about: PageMeta;
    contact: PageMeta;
  };
  nav: {
    languageLabel: string;
    links: readonly LinkItem[];
    cta: string;
  };
  footer: {
    description: string;
    cta: string;
    closing: string;
    ribbon: string;
  };
  shared: {
    pricingDisclaimer: string;
    serviceOfferings: readonly ServiceOffering[];
    processSteps: readonly ProcessStep[];
    serviceInterestOptions: readonly { value: string; label: string }[];
  };
  form: FormCopy;
  home: {
    heroEyebrow: string;
    heroTitle: string;
    heroDescription: string;
    primaryCta: string;
    secondaryCta: string;
    heroPanelEyebrow: string;
    heroPanelTitle: string;
    heroHighlights: readonly string[];
    heroScanEyebrow: string;
    heroScanDescription: string;
    whatWeDo: {
      eyebrow: string;
      title: string;
      description: string;
      items: readonly { title: string; description: string }[];
    };
    howWeDoIt: {
      eyebrow: string;
      title: string;
      description: string;
    };
    services: {
      eyebrow: string;
      title: string;
      description: string;
      cardCta: string;
    };
    freeScan: {
      eyebrow: string;
      title: string;
      description: string;
      benefits: readonly string[];
      formEyebrow: string;
      formTitle: string;
      formDescription: string;
    };
    trust: {
      eyebrow: string;
      title: string;
      description: string;
      items: readonly { title: string; description: string }[];
    };
  };
  servicesPage: {
    heroEyebrow: string;
    heroTitle: string;
    heroDescription: string;
    primaryCta: string;
    secondaryCta: string;
    principles: {
      eyebrow: string;
      title: string;
      description: string;
      items: readonly { title: string; description: string }[];
    };
    process: {
      eyebrow: string;
      title: string;
      description: string;
    };
    pricing: {
      eyebrow: string;
      title: string;
      description: string;
      boxEyebrow: string;
      cta: string;
    };
    freeScan: {
      eyebrow: string;
      title: string;
      description: string;
      benefits: readonly string[];
      formEyebrow: string;
      formTitle: string;
      formDescription: string;
    };
    trust: {
      eyebrow: string;
      title: string;
      description: string;
      items: readonly { title: string; description: string }[];
    };
  };
  aboutPage: {
    heroEyebrow: string;
    heroTitle: string;
    heroDescription: string;
    panelEyebrow: string;
    panelBody: readonly string[];
    principles: {
      eyebrow: string;
      title: string;
      description: string;
      items: readonly { title: string; description: string }[];
    };
    expectations: {
      eyebrow: string;
      title: string;
      description: string;
      items: readonly { label: string; detail: string }[];
    };
    cta: {
      eyebrow: string;
      title: string;
      label: string;
    };
  };
  contactPage: {
    heroEyebrow: string;
    heroTitle: string;
    heroDescription: string;
    expectationEyebrow: string;
    expectationBody: readonly string[];
    assurances: readonly { title: string; description: string }[];
  };
};
