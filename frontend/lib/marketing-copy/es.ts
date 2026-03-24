import type { MarketingCopy } from "@/lib/marketing-copy/types";

export const esMarketingCopy: MarketingCopy = {
  brand: {
    descriptor: "Consultoría en ciberseguridad",
  },
  meta: {
    siteTitle: "Nourmed | Consultoría en ciberseguridad para pequeñas empresas",
    siteDescription:
      "Nourmed ayuda a pequeñas empresas a mejorar la seguridad de su sitio web, su preparación de cumplimiento y su protección continua con consultoría práctica.",
    siteOpenGraphDescription:
      "Consultoría en ciberseguridad para pequeñas empresas enfocada en sitios seguros, preparación de cumplimiento, escaneo de vulnerabilidades y protección continua práctica.",
    home: {
      title: "Ciberseguridad para pequeñas empresas",
      description:
        "Nourmed ayuda a pequeñas empresas a asegurar sus sitios web, reducir vulnerabilidades, mejorar su preparación de cumplimiento y fortalecer la confianza.",
      keywords: [
        "ciberseguridad para pequeñas empresas",
        "consultoría de seguridad web",
        "escaneo de vulnerabilidades pequeña empresa",
        "consultoría de cumplimiento pequeña empresa",
      ],
    },
    services: {
      title: "Servicios",
      description:
        "Conozca consultoría de cumplimiento, desarrollo web seguro y paquetes de ciberseguridad para pequeñas empresas con precios iniciales realistas.",
      keywords: [
        "consultoría de cumplimiento para pequeñas empresas",
        "desarrollo web seguro",
        "paquetes de ciberseguridad para pequeñas empresas",
        "escaneo de vulnerabilidades",
        "consultoría de seguridad web",
      ],
    },
    about: {
      title: "Nosotros",
      description:
        "Conozca cómo Nourmed ayuda a pequeñas empresas a fortalecer sistemas expuestos al público, mejorar la preparación de cumplimiento y reducir riesgo cibernético evitable.",
      keywords: ["sobre nourmed", "socio de seguridad para pequeñas empresas", "empresa de consultoría en ciberseguridad"],
    },
    contact: {
      title: "Contacto",
      description:
        "Solicite un escaneo de seguridad gratuito o una cotización para consultoría de cumplimiento, desarrollo web seguro o protección continua para pequeñas empresas.",
      keywords: ["escaneo de seguridad gratuito", "cotización de ciberseguridad pequeña empresa", "contactar consultor de ciberseguridad"],
    },
  },
  nav: {
    languageLabel: "Idioma",
    links: [
      { href: "/", label: "Inicio" },
      { href: "/services", label: "Servicios" },
      { href: "/about", label: "Nosotros" },
      { href: "/contact", label: "Contacto" },
    ],
    cta: "Obtén un escaneo de seguridad gratis",
  },
  footer: {
    description:
      "Consultoría en ciberseguridad para pequeñas empresas enfocada en sitios seguros, preparación de cumplimiento y protección continua práctica.",
    cta: "Solicitar un escaneo gratis",
    closing: "Protección práctica para empresas en crecimiento.",
    ribbon: "Sitios seguros. Preparación de cumplimiento. Protección continua.",
  },
  shared: {
    pricingDisclaimer: "El precio final depende del alcance, el tamaño de la empresa y la complejidad de los sistemas.",
    serviceOfferings: [
      {
        slug: "compliance-consulting",
        interestValue: "Compliance Consulting",
        title: "Consultoría de cumplimiento",
        price: "Desde $750",
        summary:
          "Guía de preparación para pequeñas empresas que deben cumplir expectativas de clientes, proveedores o manejo de datos.",
        description:
          "En términos simples, cumplimiento significa demostrar que su empresa protege la información de forma responsable y opera con controles de seguridad razonables. Nourmed ayuda a pequeñas empresas a prepararse con revisiones de brechas, recomendaciones prácticas y guía de implementación alrededor de requisitos de proveedores, confianza del cliente, expectativas de protección de datos y preparación operativa diaria. Nourmed no es un despacho legal ni emite certificaciones.",
        bullets: [
          "Identificación de brechas y planificación de preparación para cuestionarios de clientes, proveedores y seguridad",
          "Orientación sobre políticas, controles de acceso, documentación y expectativas de seguridad prácticas",
          "Apoyo de implementación para ayudar a su equipo antes de una revisión externa",
        ],
      },
      {
        slug: "secure-website-development",
        interestValue: "Secure Website Development",
        title: "Desarrollo web seguro",
        price: "Desde $2,500",
        summary:
          "Sitios web seguros para empresas que necesitan protección, confiabilidad y una base pública más sólida.",
        description:
          "Nourmed diseña y construye sitios web con seguridad en mente desde el primer día. Eso incluye HTTPS, formularios seguros, guía de hosting endurecido, prácticas de despliegue más seguras, protección básica contra abusos y decisiones de arquitectura que favorecen disponibilidad y confianza. El resultado no es solo un sitio más atractivo, sino un sistema empresarial más confiable.",
        bullets: [
          "HTTPS, formularios seguros y decisiones de hosting o despliegue guiadas por reducción de riesgo",
          "Resistencia práctica frente a abusos, flujos de entrada más limpios e infraestructura pública más segura",
          "Implementación orientada a disponibilidad que trata el sitio como infraestructura del negocio",
        ],
      },
      {
        slug: "small-business-security-packages",
        interestValue: "Small Business Security Packages",
        title: "Paquetes de seguridad para pequeñas empresas",
        price: "Desde $199/mes",
        summary:
          "Soporte continuo para pequeñas empresas que necesitan protección constante sin complejidad empresarial.",
        description:
          "Nuestros paquetes recurrentes están diseñados para empresas que quieren atención constante sobre su postura de seguridad. Nourmed ofrece escaneo de vulnerabilidades, guía práctica de endurecimiento, orientación de monitoreo, revisión de respaldos y controles de acceso, y apoyo claro para reducir riesgos evitables con el tiempo.",
        bullets: [
          "Escaneos recurrentes de vulnerabilidades y recomendaciones prácticas",
          "Guía de endurecimiento, revisión de accesos y planificación de respaldos",
          "Soporte continuo que mantiene el trabajo de seguridad manejable para un negocio en crecimiento",
        ],
      },
    ],
    processSteps: [
      {
        step: "01",
        title: "Escanear y evaluar",
        description:
          "Revisamos su sitio web, su exposición pública y las preocupaciones de seguridad o cumplimiento que ya afectan al negocio.",
      },
      {
        step: "02",
        title: "Identificar riesgos y brechas",
        description:
          "Mapeamos los problemas que pueden afectar confianza, disponibilidad y preparación, y priorizamos el trabajo que realmente importa.",
      },
      {
        step: "03",
        title: "Asegurar y endurecer",
        description:
          "Fortalecemos el sitio, la postura de hosting, las rutas de entrada y las salvaguardas relacionadas con pasos de implementación prácticos.",
      },
      {
        step: "04",
        title: "Dar soporte y mejorar",
        description:
          "Cuando el apoyo continuo tiene sentido, seguimos involucrados con revisiones periódicas, orientación y mejoras incrementales.",
      },
    ],
    serviceInterestOptions: [
      { value: "Compliance Consulting", label: "Consultoría de cumplimiento" },
      { value: "Secure Website Development", label: "Desarrollo web seguro" },
      { value: "Small Business Security Packages", label: "Paquetes de seguridad para pequeñas empresas" },
      { value: "Not sure yet", label: "Aún no estoy seguro" },
    ],
  },
  form: {
    eyebrow: "Escaneo de seguridad gratis",
    title: "Solicita un escaneo de seguridad gratis o una cotización",
    description:
      "Cuéntale a Nourmed sobre tu empresa, tu sitio web y el tipo de apoyo que necesitas. Revisaremos la solicitud y recomendaremos el siguiente paso correcto.",
    submitLabel: "Solicitar un escaneo gratis",
    secureNote: "Recepción segura, validación del lado del servidor y controles anti-spam habilitados en el backend.",
    hiddenWebsiteLabel: "Sitio web",
    fields: {
      name: "Nombre",
      businessName: "Nombre de la empresa",
      email: "Correo electrónico",
      websiteUrl: "URL del sitio web",
      websiteUrlPlaceholder: "https://tuempresa.com",
      serviceOfInterest: "Servicio de interés",
      servicePlaceholder: "Selecciona un servicio",
      optionalMessage: "Mensaje opcional",
    },
    messages: {
      submitting: "Enviando tu solicitud...",
      success: "Tu solicitud fue recibida. Nourmed la revisará y te responderá pronto.",
      error: "No se pudo enviar la solicitud. Revisa tu conexión e inténtalo de nuevo.",
    },
  },
  home: {
    heroEyebrow: "Ciberseguridad para pequeñas empresas",
    heroTitle: "Protege tu empresa del riesgo cibernético, las caídas y los sistemas débiles.",
    heroDescription:
      "Nourmed ayuda a pequeñas empresas a asegurar sus sitios web, reducir vulnerabilidades, mejorar su preparación de cumplimiento y generar más confianza en los sistemas de los que dependen clientes y socios.",
    primaryCta: "Obtén un escaneo de seguridad gratis",
    secondaryCta: "Ver servicios",
    heroPanelEyebrow: "En qué ayuda Nourmed",
    heroPanelTitle: "Apoyo de seguridad claro para empresas que necesitan sistemas públicos más sólidos.",
    heroHighlights: [
      "Sitios y formularios públicos seguros",
      "Guía de preparación de cumplimiento para empresas en crecimiento",
      "Soporte de seguridad continuo para equipos pequeños",
    ],
    heroScanEyebrow: "Escaneo gratis",
    heroScanDescription:
      "Comienza con un escaneo de seguridad gratis para entender brechas visibles antes de comprometerte con un proyecto más amplio.",
    whatWeDo: {
      eyebrow: "Qué hacemos",
      title: "Nourmed ayuda a pequeñas empresas a asegurar sitios web, reducir vulnerabilidades y fortalecer su preparación",
      description:
        "Nos enfocamos en las partes del negocio que más afectan la confianza: sistemas expuestos al público, brechas de seguridad que interrumpen operaciones y el trabajo de preparación necesario para responder con seguridad a expectativas de clientes o proveedores.",
      items: [
        {
          title: "Asegurar los sistemas que la gente realmente ve",
          description:
            "Nourmed ayuda a pequeñas empresas a mejorar sitios web, formularios, decisiones de hosting y sistemas públicos que moldean la confianza desde la primera visita.",
        },
        {
          title: "Reducir riesgo evitable antes de que crezca",
          description:
            "Buscamos vulnerabilidades, procesos débiles y brechas de seguridad que pueden generar caídas, menor confianza o preguntas difíciles de socios y proveedores.",
        },
        {
          title: "Hacer la seguridad más fácil de ejecutar",
          description:
            "El foco es la orientación práctica. Los dueños reciben prioridades claras, recomendaciones sensatas y apoyo de implementación sin jerga empresarial pesada.",
        },
      ],
    },
    howWeDoIt: {
      eyebrow: "Cómo lo hacemos",
      title: "Un proceso simple basado en claridad, acción y mejora constante",
      description:
        "Nourmed mantiene el proceso claro para que los dueños entiendan qué importa, qué debe ocurrir después y cuándo el apoyo continuo realmente tiene sentido.",
    },
    services: {
      eyebrow: "Servicios",
      title: "Tres formas en que Nourmed apoya la seguridad y preparación de pequeñas empresas",
      description:
        "Cada servicio está estructurado para ser claro, práctico y útil para negocios reales en lugar de estar cargado de complejidad innecesaria.",
      cardCta: "Ver detalles del servicio",
    },
    freeScan: {
      eyebrow: "Escaneo de seguridad gratis",
      title: "Empieza con un primer paso claro en lugar de adivinar qué necesita atención",
      description:
        "Un escaneo gratis te ayuda a entender el riesgo visible del sitio web, los puntos débiles probables y qué servicio de Nourmed encaja mejor antes de comprometerte con un alcance mayor.",
      benefits: [
        "Una primera visión clara del riesgo del sitio, rutas de entrada y exposición visible",
        "Guía sobre el servicio correcto para tu negocio",
        "Una cotización más informada cuando se necesita trabajo más profundo",
      ],
      formEyebrow: "Solicita tu escaneo",
      formTitle: "Solicita un escaneo de seguridad gratis o una cotización",
      formDescription:
        "Cuéntale a Nourmed sobre tu empresa, tu sitio web y el tipo de ayuda que necesitas. Revisaremos la solicitud y recomendaremos el siguiente paso correcto.",
    },
    trust: {
      eyebrow: "Confianza y respaldo",
      title: "Protección práctica para empresas en crecimiento que necesitan orientación clara",
      description:
        "Nourmed está construido alrededor de trabajo de seguridad relevante para el negocio: sitios seguros, mejor preparación y apoyo que ayuda a los dueños a avanzar con más confianza.",
      items: [
        {
          title: "Orientación práctica, no ruido",
          description:
            "Nourmed explica riesgos y próximos pasos en lenguaje claro para que los dueños tomen decisiones rápidas y seguras.",
        },
        {
          title: "Ejecución con mentalidad de seguridad",
          description:
            "Desde sitios seguros hasta protección recurrente, el trabajo está moldeado por riesgo operativo real y no por entregables genéricos de agencia.",
        },
        {
          title: "Preparación sin exageraciones",
          description:
            "Nourmed apoya la preparación de cumplimiento y la guía de implementación, pero no se presenta como despacho legal ni organismo certificador.",
        },
      ],
    },
  },
  servicesPage: {
    heroEyebrow: "Servicios de ciberseguridad",
    heroTitle: "Servicios diseñados para ayudar a pequeñas empresas a fortalecer su seguridad y operar con mayor confianza.",
    heroDescription:
      "Nourmed ayuda a empresas a asegurar sistemas expuestos al público, prepararse para expectativas de cumplimiento y reducir riesgo evitable mediante consultoría clara, implementación práctica y soporte continuo.",
    primaryCta: "Obtén un escaneo de seguridad gratis",
    secondaryCta: "Obtén una cotización gratis",
    principles: {
      eyebrow: "Qué hacemos",
      title: "Servicios de seguridad construidos alrededor de necesidades reales del negocio",
      description:
        "Nourmed ayuda a pequeñas empresas a mejorar confianza, reducir vulnerabilidades y tomar mejores decisiones de seguridad con líneas de servicio prácticas y fáciles de entender.",
      items: [
        {
          title: "Alcances claros y resultados prácticos",
          description:
            "Cada proyecto se estructura alrededor de necesidades visibles del negocio, riesgos reales y trabajo que dueños y operadores pueden entender.",
        },
        {
          title: "Trabajo de seguridad que sostiene la confianza",
          description:
            "La meta es mejorar los sistemas en los que confían clientes, proveedores y socios, no enterrar a tu equipo en complejidad innecesaria.",
        },
        {
          title: "Soporte adecuado para organizaciones pequeñas",
          description:
            "Todo está diseñado para empresas en crecimiento que necesitan protección seria sin sobrecarga empresarial.",
        },
      ],
    },
    process: {
      eyebrow: "Cómo lo hacemos",
      title: "Un proceso directo desde la evaluación hasta el soporte continuo",
      description:
        "El trabajo empieza con claridad, avanza hacia remediación práctica y solo se vuelve recurrente cuando realmente agrega valor.",
    },
    pricing: {
      eyebrow: "Servicios",
      title: "Tres líneas de servicio con precios iniciales realistas para pequeñas empresas",
      description:
        "Estos precios iniciales están diseñados para ser creíbles para proyectos orientados a pequeñas empresas y dejar espacio para alcance, sistemas y complejidad del entorno.",
      boxEyebrow: "Precio promedio inicial",
      cta: "Obtén una cotización gratis",
    },
    freeScan: {
      eyebrow: "Escaneo de seguridad gratis",
      title: "Usa el escaneo gratis para entender tu siguiente movimiento de seguridad",
      description:
        "Cuéntanos qué te preocupa, comparte el sitio web o sistema en cuestión y revisaremos la superficie de riesgo visible antes de recomendar el siguiente paso más práctico.",
      benefits: [
        "Una revisión práctica de tu sitio web y su superficie de ataque visible",
        "Una comprensión más clara del servicio correcto",
        "Una cotización más rápida e informada cuando se necesita trabajo más profundo",
      ],
      formEyebrow: "Solicita tu escaneo",
      formTitle: "Solicita un escaneo de seguridad gratis o una cotización",
      formDescription:
        "Usa este formulario para un escaneo gratis, una cotización de servicio o una primera conversación práctica sobre tus prioridades de seguridad.",
    },
    trust: {
      eyebrow: "Confianza y respaldo",
      title: "Orientación de seguridad que se mantiene práctica y relevante para el negocio",
      description:
        "Nourmed está pensado para dueños y operadores que necesitan ayuda seria para proteger sistemas públicos, mejorar preparación y reducir riesgos evitables.",
      items: [
        {
          title: "Explicaciones aptas para negocio",
          description:
            "Explicamos qué importa, por qué importa y qué debe pasar después en términos que un dueño no técnico pueda usar.",
        },
        {
          title: "Apoyo de preparación sin exceso legal",
          description:
            "Nourmed ayuda a empresas a prepararse para expectativas de seguridad y cumplimiento, pero no brinda asesoría legal ni emite certificaciones.",
        },
        {
          title: "Trabajo de seguridad que sigue siendo práctico",
          description:
            "El foco se mantiene en sitios web, vulnerabilidades, confianza, accesos, respaldos y reducción continua de riesgo que respalda operaciones reales.",
        },
      ],
    },
  },
  aboutPage: {
    heroEyebrow: "Sobre Nourmed",
    heroTitle: "Un socio de seguridad y preparación de cumplimiento para pequeñas empresas que necesitan protección práctica",
    heroDescription:
      "Nourmed fue creado para ayudar a empresas en crecimiento a fortalecer sistemas expuestos al público, prepararse para expectativas reales de seguridad y tomar mejores decisiones antes de que problemas pequeños se conviertan en problemas mayores.",
    panelEyebrow: "Qué significa esto",
    panelBody: [
      "Ayudamos a empresas a entender las expectativas de seguridad ligadas a la confianza del cliente, requisitos de proveedores, sitios públicos y riesgo operativo diario.",
      "La meta es una postura de seguridad más fuerte, no confusión. Nourmed se enfoca en guía y apoyo de implementación que tiene sentido para equipos pequeños.",
    ],
    principles: {
      eyebrow: "Principios de trabajo",
      title: "Cómo aborda Nourmed el trabajo de seguridad",
      description:
        "La empresa está diseñada alrededor de claridad, confianza y reducción constante del riesgo en lugar de teatro técnico genérico.",
      items: [
        {
          title: "Comunicación orientada al negocio",
          description:
            "Nourmed explica lo que importa en lenguaje claro para que dueños y operadores puedan tomar decisiones sin quedar enterrados en palabras de moda.",
        },
        {
          title: "Protección práctica",
          description:
            "Nos enfocamos en reducir riesgo real para empresas en crecimiento: sitios seguros, mejores rutas de entrada, mejor preparación y seguimiento operativo.",
        },
        {
          title: "Preparación sin exageraciones",
          description:
            "Nourmed apoya la preparación de cumplimiento y seguridad sin fingir ser un despacho legal ni una autoridad certificadora.",
        },
        {
          title: "Mejora a largo plazo",
          description:
            "La meta no es una lista puntual. Es ayudar a pequeñas empresas a construir sistemas más fuertes que puedan sostenerse a medida que aumentan las expectativas.",
        },
      ],
    },
    expectations: {
      eyebrow: "Qué pueden esperar los clientes",
      title: "Un modelo simple para mejorar la seguridad de forma práctica",
      description:
        "Nourmed ayuda a empresas a entender dónde están expuestas, qué importa más y cómo mejorar sin gastar de más en prioridades equivocadas.",
      items: [
        {
          label: "A quién servimos",
          detail:
            "Pequeñas empresas que necesitan una postura de seguridad más clara, sitios más sólidos y mejor preparación para expectativas de clientes o proveedores.",
        },
        {
          label: "En qué nos enfocamos",
          detail:
            "Preparación de cumplimiento, desarrollo web seguro y soporte de seguridad recurrente para operaciones en crecimiento.",
        },
        {
          label: "Cómo trabajamos",
          detail:
            "Evaluamos lo que está expuesto, priorizamos lo que importa, reforzamos lo que es débil y apoyamos mejoras continuas cuando hace sentido.",
        },
        {
          label: "Qué obtienen los clientes",
          detail:
            "Mayor visibilidad del riesgo, sistemas públicos más confiables y orientación de seguridad lo suficientemente práctica para implementarse.",
        },
      ],
    },
    cta: {
      eyebrow: "Siguiente paso",
      title:
        "Si necesitas un sitio seguro, una preparación de cumplimiento más clara o protección continua, empieza con un escaneo gratis o una solicitud de cotización.",
      label: "Obtén una cotización gratis",
    },
  },
  contactPage: {
    heroEyebrow: "Escaneo de seguridad gratis",
    heroTitle: "Solicita un escaneo de seguridad gratis o una cotización con alcance",
    heroDescription:
      "Usa el formulario seguro para contarle a Nourmed sobre tu empresa, tu sitio web y el tipo de apoyo que necesitas. Revisaremos la solicitud y recomendaremos un siguiente paso práctico.",
    expectationEyebrow: "Qué esperar",
    expectationBody: [
      "Usa este formulario para consultoría de cumplimiento, desarrollo web seguro o soporte de seguridad recurrente.",
      "La meta es entender tu negocio, tu superficie de riesgo visible y si un escaneo gratis o un proyecto más profundo tiene más sentido.",
      "Nourmed se enfoca en guía práctica de ciberseguridad y preparación, no en afirmaciones legales, garantías falsas ni jerga inflada.",
    ],
    assurances: [
      {
        title: "Información útil primero",
        description:
          "El formulario recopila los detalles necesarios para definir un escaneo de seguridad gratis o una cotización de servicio práctica.",
      },
      {
        title: "Ruta de entrada protegida",
        description:
          "Las solicitudes se validan en el backend y se protegen con controles anti-spam antes de guardarse.",
      },
      {
        title: "Un siguiente paso más claro",
        description:
          "Nourmed usa la solicitud para entender riesgo visible, necesidades del negocio y la ruta de servicio adecuada.",
      },
    ],
  },
};
