import type { MarketingCopy } from "@/lib/marketing-copy/types";

export const frMarketingCopy: MarketingCopy = {
  brand: {
    descriptor: "Conseil en cybersécurité",
  },
  meta: {
    siteTitle: "Nourmed | Conseil en cybersécurité pour petites entreprises",
    siteDescription:
      "Nourmed aide les petites entreprises à renforcer la sécurité de leur site, leur préparation à la conformité et leur protection continue grâce à un accompagnement concret.",
    siteOpenGraphDescription:
      "Conseil en cybersécurité pour petites entreprises axé sur les sites sécurisés, la préparation à la conformité, les analyses de vulnérabilité et une protection continue pragmatique.",
    home: {
      title: "Cybersécurité pour petites entreprises",
      description:
        "Nourmed aide les petites entreprises à sécuriser leurs sites web, réduire les vulnérabilités, améliorer leur préparation à la conformité et renforcer la confiance.",
      keywords: [
        "cybersécurité petite entreprise",
        "conseil sécurité site web",
        "analyse de vulnérabilité petite entreprise",
        "conseil conformité petite entreprise",
      ],
    },
    services: {
      title: "Services",
      description:
        "Découvrez le conseil en conformité, le développement web sécurisé et les forfaits de cybersécurité pour petites entreprises avec des prix de départ réalistes.",
      keywords: [
        "conseil conformité petite entreprise",
        "développement site web sécurisé",
        "forfaits cybersécurité petite entreprise",
        "analyse de vulnérabilité",
        "conseil sécurité web",
      ],
    },
    about: {
      title: "À propos",
      description:
        "Découvrez comment Nourmed aide les petites entreprises à renforcer leurs systèmes exposés au public, améliorer leur préparation à la conformité et réduire les risques évitables.",
      keywords: ["à propos nourmed", "partenaire sécurité petite entreprise", "cabinet conseil cybersécurité"],
    },
    contact: {
      title: "Contact",
      description:
        "Demandez une analyse de sécurité gratuite ou un devis pour le conseil en conformité, le développement web sécurisé ou une protection continue.",
      keywords: ["analyse de sécurité gratuite", "devis cybersécurité petite entreprise", "contacter consultant cybersécurité"],
    },
  },
  nav: {
    languageLabel: "Langue",
    links: [
      { href: "/", label: "Accueil" },
      { href: "/services", label: "Services" },
      { href: "/about", label: "À propos" },
      { href: "/contact", label: "Contact" },
    ],
    cta: "Obtenir un scan de sécurité gratuit",
  },
  footer: {
    description:
      "Conseil en cybersécurité pour petites entreprises centré sur les sites sécurisés, la préparation à la conformité et une protection continue pragmatique.",
    cta: "Demander un scan gratuit",
    closing: "Une protection concrète pour les entreprises en croissance.",
    ribbon: "Sites sécurisés. Préparation à la conformité. Protection continue.",
  },
  shared: {
    pricingDisclaimer: "Le tarif final dépend de la portée, de la taille de l'entreprise et de la complexité des systèmes.",
    serviceOfferings: [
      {
        slug: "compliance-consulting",
        interestValue: "Compliance Consulting",
        title: "Conseil en conformité",
        price: "À partir de 750 $",
        summary:
          "Un accompagnement de préparation pour les petites entreprises confrontées à des exigences clients, fournisseurs ou liées aux données.",
        description:
          "En termes simples, la conformité consiste à montrer que votre entreprise protège correctement les informations et fonctionne avec des mesures de sécurité raisonnables. Nourmed aide les petites entreprises à s'y préparer grâce à des analyses d'écarts, des recommandations concrètes et un accompagnement de mise en œuvre autour des exigences fournisseurs, de la confiance client, de la protection des données et de la préparation opérationnelle. Nourmed n'est pas un cabinet juridique et ne délivre pas de certifications.",
        bullets: [
          "Identification des écarts et planification de préparation pour questionnaires clients, fournisseurs et sécurité",
          "Conseils sur les politiques, les accès, la documentation et les attentes de sécurité concrètes",
          "Soutien à la mise en œuvre pour aider votre équipe avant tout examen externe",
        ],
      },
      {
        slug: "secure-website-development",
        interestValue: "Secure Website Development",
        title: "Développement web sécurisé",
        price: "À partir de 2 500 $",
        summary:
          "Des sites sécurisés pour les entreprises qui ont besoin de protection, de fiabilité et d'une base publique plus solide.",
        description:
          "Nourmed conçoit et développe des sites web avec la sécurité en tête dès le premier jour. Cela inclut le HTTPS, des formulaires sécurisés, des recommandations d'hébergement renforcé, des pratiques de déploiement plus sûres, une protection de base contre les abus et des choix d'architecture favorisant la disponibilité et la confiance. Le résultat n'est pas seulement un meilleur site, mais un système métier plus fiable.",
        bullets: [
          "HTTPS, formulaires sécurisés et choix d'hébergement ou de déploiement orientés réduction du risque",
          "Résistance pratique aux abus, parcours d'entrée plus propres et infrastructure publique plus sûre",
          "Mise en œuvre pensée pour la disponibilité et traitant le site comme une infrastructure métier",
        ],
      },
      {
        slug: "small-business-security-packages",
        interestValue: "Small Business Security Packages",
        title: "Forfaits de sécurité pour petites entreprises",
        price: "À partir de 199 $/mois",
        summary:
          "Un accompagnement continu pour les petites entreprises qui veulent une protection régulière sans complexité d'entreprise.",
        description:
          "Nos forfaits récurrents s'adressent aux entreprises qui veulent une attention constante portée à leur posture de sécurité. Nourmed propose des analyses de vulnérabilité, des conseils de durcissement, des orientations de surveillance, des revues de sauvegarde et d'accès, ainsi qu'un accompagnement clair pour réduire les risques évitables dans le temps.",
        bullets: [
          "Analyses de vulnérabilité récurrentes et recommandations concrètes",
          "Conseils de durcissement, revue des accès et planification des sauvegardes",
          "Soutien continu pour garder la sécurité gérable dans une entreprise en croissance",
        ],
      },
    ],
    processSteps: [
      {
        step: "01",
        title: "Analyser et évaluer",
        description:
          "Nous examinons votre site web, votre exposition publique et les préoccupations de sécurité ou de conformité qui touchent déjà l'entreprise.",
      },
      {
        step: "02",
        title: "Identifier les risques et les écarts",
        description:
          "Nous cartographions les points qui peuvent affecter la confiance, la disponibilité et la préparation, puis nous priorisons ce qui compte vraiment.",
      },
      {
        step: "03",
        title: "Sécuriser et renforcer",
        description:
          "Nous renforçons le site, l'hébergement, les parcours d'entrée et les mesures associées avec des actions concrètes.",
      },
      {
        step: "04",
        title: "Accompagner et améliorer",
        description:
          "Quand un soutien continu a du sens, nous restons impliqués avec des revues régulières, des conseils et des améliorations progressives.",
      },
    ],
    serviceInterestOptions: [
      { value: "Compliance Consulting", label: "Conseil en conformité" },
      { value: "Secure Website Development", label: "Développement web sécurisé" },
      { value: "Small Business Security Packages", label: "Forfaits de sécurité pour petites entreprises" },
      { value: "Not sure yet", label: "Je ne sais pas encore" },
    ],
  },
  form: {
    eyebrow: "Scan de sécurité gratuit",
    title: "Demander un scan de sécurité gratuit ou un devis",
    description:
      "Expliquez brièvement votre entreprise, votre site web et le type d'accompagnement recherché. Nourmed examinera la demande et recommandera la bonne prochaine étape.",
    submitLabel: "Demander un scan gratuit",
    secureNote: "Collecte sécurisée, validation côté serveur et contrôles anti-spam activés côté backend.",
    hiddenWebsiteLabel: "Site web",
    fields: {
      name: "Nom",
      businessName: "Nom de l'entreprise",
      email: "Email",
      websiteUrl: "URL du site web",
      websiteUrlPlaceholder: "https://votreentreprise.com",
      serviceOfInterest: "Service recherché",
      servicePlaceholder: "Sélectionnez un service",
      optionalMessage: "Message facultatif",
    },
    messages: {
      submitting: "Envoi de votre demande...",
      success: "Votre demande a bien été reçue. Nourmed l'examinera et reviendra vers vous rapidement.",
      error: "La demande n'a pas pu être envoyée. Vérifiez votre connexion et réessayez.",
    },
  },
  home: {
    heroEyebrow: "Cybersécurité pour petites entreprises",
    heroTitle: "Protégez votre entreprise contre le risque cyber, les interruptions et les systèmes fragiles.",
    heroDescription:
      "Nourmed aide les petites entreprises à sécuriser leurs sites web, réduire les vulnérabilités, améliorer leur préparation à la conformité et renforcer la confiance dans les systèmes sur lesquels clients et partenaires comptent.",
    primaryCta: "Obtenir un scan de sécurité gratuit",
    secondaryCta: "Voir les services",
    heroPanelEyebrow: "Ce que Nourmed prend en charge",
    heroPanelTitle: "Un accompagnement clair pour les entreprises qui ont besoin de systèmes publics plus solides.",
    heroHighlights: [
      "Sites publics et formulaires sécurisés",
      "Accompagnement de préparation à la conformité pour les entreprises en croissance",
      "Support sécurité continu adapté aux petites équipes",
    ],
    heroScanEyebrow: "Scan gratuit",
    heroScanDescription:
      "Commencez par un scan de sécurité gratuit pour comprendre les écarts visibles avant d'engager une mission plus large.",
    whatWeDo: {
      eyebrow: "Ce que nous faisons",
      title: "Nourmed aide les petites entreprises à sécuriser leurs sites, réduire les vulnérabilités et renforcer leur préparation",
      description:
        "Nous nous concentrons sur les éléments qui influencent le plus la confiance: les systèmes exposés au public, les failles qui perturbent l'activité et le travail de préparation nécessaire pour répondre avec assurance aux attentes des clients ou fournisseurs.",
      items: [
        {
          title: "Sécuriser les systèmes que les gens voient",
          description:
            "Nourmed aide les petites entreprises à améliorer les sites, formulaires, choix d'hébergement et systèmes publics qui façonnent la confiance dès la première visite.",
        },
        {
          title: "Réduire les risques évitables avant qu'ils grandissent",
          description:
            "Nous recherchons les vulnérabilités, les processus fragiles et les écarts de sécurité qui peuvent entraîner des interruptions, une baisse de confiance ou des questions difficiles de la part de partenaires.",
        },
        {
          title: "Rendre la sécurité plus simple à mettre en œuvre",
          description:
            "L'objectif est un accompagnement concret. Les dirigeants reçoivent des priorités claires, des recommandations sensées et un appui à la mise en œuvre sans jargon d'entreprise.",
        },
      ],
    },
    howWeDoIt: {
      eyebrow: "Comment nous procédons",
      title: "Un processus simple fondé sur la clarté, l'action et l'amélioration continue",
      description:
        "Nourmed garde le processus lisible pour que les dirigeants comprennent ce qui compte, ce qu'il faut faire ensuite et quand un soutien continu est utile.",
    },
    services: {
      eyebrow: "Services",
      title: "Trois façons pour Nourmed de soutenir la sécurité et la préparation des petites entreprises",
      description:
        "Chaque service est conçu pour être clair, pratique et utile à de vraies entreprises sans complexité inutile.",
      cardCta: "Voir les détails du service",
    },
    freeScan: {
      eyebrow: "Scan de sécurité gratuit",
      title: "Commencez par une première étape claire au lieu de deviner ce qui demande de l'attention",
      description:
        "Un scan gratuit vous aide à comprendre le risque visible sur votre site, les points faibles probables et le service Nourmed le plus adapté avant d'engager une mission plus large.",
      benefits: [
        "Un premier regard clair sur les risques du site, les parcours d'entrée et l'exposition visible",
        "Des indications sur le bon service pour votre entreprise",
        "Un devis plus pertinent quand un accompagnement plus large est nécessaire",
      ],
      formEyebrow: "Demandez votre scan",
      formTitle: "Demander un scan de sécurité gratuit ou un devis",
      formDescription:
        "Parlez à Nourmed de votre entreprise, de votre site web et du type d'aide recherché. Nous examinerons la demande et recommanderons la bonne prochaine étape.",
    },
    trust: {
      eyebrow: "Confiance & réassurance",
      title: "Une protection concrète pour les entreprises en croissance qui ont besoin d'un accompagnement clair",
      description:
        "Nourmed se concentre sur un travail de sécurité utile au business: sites sécurisés, meilleure préparation et accompagnement qui aide les dirigeants à avancer avec plus de confiance.",
      items: [
        {
          title: "Des conseils concrets, pas du bruit",
          description:
            "Nourmed explique les risques et les prochaines étapes en langage clair pour aider les dirigeants à décider vite et sereinement.",
        },
        {
          title: "Une exécution pensée pour la sécurité",
          description:
            "Des sites sécurisés à la protection récurrente, le travail est structuré autour des vrais risques opérationnels et non de livrables d'agence génériques.",
        },
        {
          title: "Une préparation sans surpromesses",
          description:
            "Nourmed accompagne la préparation à la conformité et la mise en œuvre, sans se présenter comme cabinet juridique ou organisme certificateur.",
        },
      ],
    },
  },
  servicesPage: {
    heroEyebrow: "Services de cybersécurité",
    heroTitle: "Des services conçus pour aider les petites entreprises à renforcer leur sécurité et à opérer avec plus de confiance.",
    heroDescription:
      "Nourmed aide les entreprises à sécuriser leurs systèmes exposés au public, à se préparer aux exigences de conformité et à réduire les risques évitables grâce à un conseil clair, une mise en œuvre concrète et un soutien continu.",
    primaryCta: "Obtenir un scan de sécurité gratuit",
    secondaryCta: "Obtenir un devis gratuit",
    principles: {
      eyebrow: "Ce que nous faisons",
      title: "Des services de sécurité construits autour de vrais besoins métier",
      description:
        "Nourmed aide les petites entreprises à renforcer la confiance, réduire les vulnérabilités et prendre de meilleures décisions de sécurité avec des offres claires et compréhensibles.",
      items: [
        {
          title: "Des périmètres clairs et des résultats utiles",
          description:
            "Chaque mission est structurée autour de besoins visibles, de risques réels et d'un travail compréhensible par les dirigeants et opérateurs.",
        },
        {
          title: "Un travail de sécurité au service de la confiance",
          description:
            "L'objectif est d'améliorer les systèmes sur lesquels clients, fournisseurs et partenaires s'appuient, sans noyer l'équipe dans une complexité inutile.",
        },
        {
          title: "Un accompagnement adapté aux petites structures",
          description:
            "Tout est pensé pour des entreprises en croissance qui ont besoin d'une protection sérieuse sans lourdeur d'entreprise.",
        },
      ],
    },
    process: {
      eyebrow: "Comment nous procédons",
      title: "Un processus direct, de l'évaluation au soutien continu",
      description:
        "Le travail commence par la clarté, avance vers la remédiation concrète et devient récurrent seulement lorsque cela apporte une vraie valeur.",
    },
    pricing: {
      eyebrow: "Services",
      title: "Trois offres avec des prix de départ réalistes pour les petites entreprises",
      description:
        "Ces prix de départ sont pensés pour rester crédibles pour des missions orientées petites entreprises tout en laissant de la place à la portée, aux systèmes et à la complexité.",
      boxEyebrow: "Prix moyen de départ",
      cta: "Obtenir un devis gratuit",
    },
    freeScan: {
      eyebrow: "Scan de sécurité gratuit",
      title: "Utilisez le scan gratuit pour comprendre votre prochaine décision de sécurité",
      description:
        "Expliquez vos préoccupations, partagez le site ou le système concerné, et nous examinerons la surface de risque visible avant de recommander une prochaine étape pragmatique.",
      benefits: [
        "Une revue concrète de votre site web et de votre surface d'exposition visible",
        "Une compréhension plus claire du service le plus adapté",
        "Un devis plus rapide et mieux cadré si un travail plus profond est nécessaire",
      ],
      formEyebrow: "Demandez votre scan",
      formTitle: "Demander un scan de sécurité gratuit ou un devis",
      formDescription:
        "Utilisez ce formulaire pour un scan gratuit, un devis de service ou une première conversation pratique sur vos priorités de sécurité.",
    },
    trust: {
      eyebrow: "Confiance & réassurance",
      title: "Des conseils de sécurité qui restent concrets et utiles au business",
      description:
        "Nourmed est conçu pour les dirigeants et opérateurs qui ont besoin d'une vraie aide pour protéger leurs systèmes publics, améliorer leur préparation et réduire les risques évitables.",
      items: [
        {
          title: "Des explications accessibles au business",
          description:
            "Nous expliquons ce qui compte, pourquoi cela compte et ce qui doit être fait ensuite dans des termes utilisables par un dirigeant non technique.",
        },
        {
          title: "Une aide à la préparation sans excès juridique",
          description:
            "Nourmed aide les entreprises à se préparer aux attentes de sécurité et de conformité, mais ne fournit ni conseil juridique ni certification.",
        },
        {
          title: "Un travail de sécurité qui reste concret",
          description:
            "L'accent reste mis sur les sites, les vulnérabilités, la confiance, les accès, les sauvegardes et la réduction continue des risques qui soutiennent l'activité réelle.",
        },
      ],
    },
  },
  aboutPage: {
    heroEyebrow: "À propos de Nourmed",
    heroTitle: "Un partenaire en sécurité et préparation à la conformité pour les petites entreprises qui ont besoin d'une protection concrète",
    heroDescription:
      "Nourmed a été créé pour aider les entreprises en croissance à renforcer leurs systèmes exposés au public, à se préparer aux attentes de sécurité réelles et à prendre de meilleures décisions avant que de petits problèmes ne deviennent plus grands.",
    panelEyebrow: "Ce que cela signifie",
    panelBody: [
      "Nous aidons les entreprises à comprendre les attentes de sécurité liées à la confiance client, aux exigences fournisseurs, aux sites publics et au risque opérationnel quotidien.",
      "L'objectif est une posture de sécurité plus solide, pas de la confusion. Nourmed se concentre sur un accompagnement et un soutien à la mise en œuvre adaptés aux petites équipes.",
    ],
    principles: {
      eyebrow: "Principes de fonctionnement",
      title: "Comment Nourmed aborde le travail de sécurité",
      description:
        "L'entreprise est construite autour de la clarté, de la confiance et d'une réduction progressive du risque, plutôt que d'un théâtre technique générique.",
      items: [
        {
          title: "Une communication centrée sur le business",
          description:
            "Nourmed explique ce qui compte en langage clair afin que dirigeants et opérateurs puissent décider sans se noyer sous les buzzwords.",
        },
        {
          title: "Une protection pragmatique",
          description:
            "Nous nous concentrons sur la réduction des risques réels pour les entreprises en croissance: sites sécurisés, meilleurs parcours d'entrée, meilleure préparation et exécution concrète.",
        },
        {
          title: "Une préparation sans surpromesses",
          description:
            "Nourmed accompagne la préparation à la conformité et la sécurité sans prétendre être un cabinet juridique ou une autorité de certification.",
        },
        {
          title: "Une amélioration durable",
          description:
            "Le but n'est pas une simple checklist ponctuelle, mais d'aider les petites entreprises à construire des systèmes plus solides à mesure que les attentes augmentent.",
        },
      ],
    },
    expectations: {
      eyebrow: "Ce que les clients peuvent attendre",
      title: "Un modèle simple pour améliorer la sécurité de façon concrète",
      description:
        "Nourmed aide les entreprises à comprendre où elles sont exposées, ce qui compte le plus et comment progresser sans investir au mauvais endroit.",
      items: [
        {
          label: "Qui nous aidons",
          detail:
            "Des petites entreprises qui ont besoin d'une posture de sécurité plus claire, de sites plus solides et d'une meilleure préparation aux attentes clients ou fournisseurs.",
        },
        {
          label: "Ce sur quoi nous intervenons",
          detail:
            "Préparation à la conformité, développement web sécurisé et support sécurité récurrent adapté aux opérations en croissance.",
        },
        {
          label: "Notre manière de travailler",
          detail:
            "Nous évaluons ce qui est exposé, priorisons ce qui compte, renforçons ce qui est fragile et accompagnons l'amélioration continue lorsque cela est utile.",
        },
        {
          label: "Ce que les clients obtiennent",
          detail:
            "Une meilleure visibilité du risque, des systèmes publics plus fiables et des conseils de sécurité assez concrets pour être mis en œuvre.",
        },
      ],
    },
    cta: {
      eyebrow: "Prochaine étape",
      title:
        "Si vous avez besoin d'un site sécurisé, d'une préparation à la conformité plus claire ou d'une protection continue, commencez par un scan gratuit ou une demande de devis.",
      label: "Obtenir un devis gratuit",
    },
  },
  contactPage: {
    heroEyebrow: "Scan de sécurité gratuit",
    heroTitle: "Demander un scan de sécurité gratuit ou un devis cadré",
    heroDescription:
      "Utilisez le formulaire sécurisé pour expliquer votre entreprise, votre site web et le type d'accompagnement recherché. Nous examinerons la demande et recommanderons une prochaine étape pragmatique.",
    expectationEyebrow: "À quoi vous attendre",
    expectationBody: [
      "Utilisez ce formulaire pour le conseil en conformité, le développement web sécurisé ou un support sécurité récurrent.",
      "L'objectif est de comprendre votre entreprise, votre surface de risque visible et si un scan gratuit ou une mission plus profonde est le meilleur choix.",
      "Nourmed se concentre sur un accompagnement concret en cybersécurité et préparation, sans promesses juridiques, faux garanties ni jargon gonflé.",
    ],
    assurances: [
      {
        title: "Les bonnes informations dès le départ",
        description:
          "Le formulaire recueille les éléments nécessaires pour cadrer un scan de sécurité gratuit ou un devis de service pertinent.",
      },
      {
        title: "Un parcours d'entrée protégé",
        description:
          "Les demandes sont validées côté backend et protégées par des contrôles anti-spam avant d'être enregistrées.",
      },
      {
        title: "Une prochaine étape plus claire",
        description:
          "Nourmed utilise la demande pour comprendre le risque visible, les besoins métier et le bon parcours de service.",
      },
    ],
  },
};
