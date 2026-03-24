import type { MarketingCopy } from "@/lib/marketing-copy/types";

export const frMarketingCopy: MarketingCopy = {
  brand: {
    descriptor: "Conseil en cybersécurité",
  },
  meta: {
    siteTitle: "Nourmed | Conseil en cybersécurité pour petites entreprises",
    siteDescription:
      "Nous accompagnons les petites entreprises dans la sécurisation de leurs sites web, leur préparation à la conformité et la mise en place d'une protection continue.",
    siteOpenGraphDescription:
      "Nous aidons les petites entreprises à sécuriser leurs sites, à renforcer leur préparation à la conformité et à réduire les vulnérabilités par un accompagnement clair et pragmatique.",
    home: {
      title: "Cybersécurité pour petites entreprises",
      description:
        "Nous aidons les petites entreprises à sécuriser leurs sites web, à réduire leurs vulnérabilités, à renforcer leur préparation à la conformité et à consolider la confiance.",
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
        "Découvrez notre conseil en conformité, notre développement web sécurisé et nos forfaits de cybersécurité pour petites entreprises avec des prix de départ réalistes.",
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
        "Découvrez comment nous aidons les petites entreprises à renforcer leurs systèmes exposés au public, à améliorer leur préparation à la conformité et à réduire les risques évitables.",
      keywords: ["à propos nourmed", "partenaire sécurité petite entreprise", "cabinet conseil cybersécurité"],
    },
    contact: {
      title: "Contact",
      description:
        "Demandez un scan de sécurité gratuit ou un devis pour notre conseil en conformité, notre développement web sécurisé ou notre protection continue.",
      keywords: ["scan de sécurité gratuit", "devis cybersécurité petite entreprise", "contacter consultant cybersécurité"],
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
    cta: "Obtenir un scan gratuit",
  },
  footer: {
    description:
      "Nous accompagnons les petites entreprises avec des sites plus sûrs, une meilleure préparation à la conformité et une protection continue adaptée à leur réalité.",
    cta: "Demander un scan gratuit",
    closing: "Une protection concrète pour les entreprises en croissance.",
    ribbon: "Sites sécurisés. Préparation à la conformité. Protection continue.",
  },
  shared: {
    pricingDisclaimer:
      "Le tarif final dépend du périmètre, de la taille de l'entreprise et de la complexité des systèmes concernés.",
    serviceOfferings: [
      {
        slug: "compliance-consulting",
        interestValue: "Compliance Consulting",
        title: "Conseil en conformité",
        price: "À partir de 750 $",
        summary:
          "Nous aidons les petites entreprises à se préparer à des exigences clients, fournisseurs ou liées à la protection des données.",
        description:
          "En termes simples, la conformité consiste à démontrer que votre entreprise protège les informations de manière responsable et fonctionne avec des mesures de sécurité appropriées. Nous vous aidons à structurer cette préparation grâce à des analyses d'écarts, des recommandations concrètes et un accompagnement de mise en œuvre autour des exigences fournisseurs, de la confiance client, de la protection des données et de la préparation opérationnelle. Nous n'agissons ni comme cabinet juridique ni comme organisme certificateur.",
        bullets: [
          "Identification des écarts et plan de préparation pour questionnaires clients, fournisseurs et sécurité",
          "Conseils sur les politiques, les accès, la documentation et les attentes de sécurité concrètes",
          "Accompagnement de mise en œuvre pour préparer votre équipe avant tout contrôle externe",
        ],
      },
      {
        slug: "secure-website-development",
        interestValue: "Secure Website Development",
        title: "Développement web sécurisé",
        price: "À partir de 2 500 $",
        summary:
          "Nous concevons des sites sécurisés pour les entreprises qui attendent une base publique fiable, solide et professionnelle.",
        description:
          "Nous concevons et développons des sites web avec la sécurité en tête dès le premier jour. Cela inclut le HTTPS, des formulaires sécurisés, des recommandations d'hébergement renforcé, des pratiques de déploiement plus sûres, une protection de base contre les abus et des choix d'architecture orientés disponibilité et confiance. Le résultat n'est pas seulement un meilleur site, mais un système métier plus fiable.",
        bullets: [
          "HTTPS, formulaires sécurisés et choix d'hébergement ou de déploiement orientés réduction du risque",
          "Protection pratique contre les abus, parcours d'entrée plus propres et infrastructure publique plus sûre",
          "Mise en œuvre pensée pour la disponibilité et traitant le site comme une infrastructure métier",
        ],
      },
      {
        slug: "small-business-security-packages",
        interestValue: "Small Business Security Packages",
        title: "Forfaits de sécurité pour petites entreprises",
        price: "À partir de 199 $/mois",
        summary:
          "Nous proposons un accompagnement récurrent pour les entreprises qui ont besoin d'une protection régulière sans complexité inutile.",
        description:
          "Nos forfaits récurrents s'adressent aux entreprises qui veulent garder une attention constante sur leur posture de sécurité. Nous proposons des analyses de vulnérabilité, des recommandations de durcissement, des orientations de surveillance, des revues de sauvegarde et d'accès ainsi qu'un accompagnement clair pour réduire les risques évitables dans la durée.",
        bullets: [
          "Analyses de vulnérabilité récurrentes et recommandations concrètes",
          "Conseils de durcissement, revue des accès et planification des sauvegardes",
          "Soutien continu pour garder la sécurité maîtrisable dans une entreprise en croissance",
        ],
      },
    ],
    processSteps: [
      {
        step: "01",
        title: "Analyser et évaluer",
        description:
          "Nous examinons votre site web, votre exposition publique et les préoccupations de sécurité ou de conformité déjà visibles dans votre activité.",
      },
      {
        step: "02",
        title: "Identifier les risques et les écarts",
        description:
          "Nous hiérarchisons les points qui peuvent affecter la confiance, la disponibilité et votre niveau de préparation.",
      },
      {
        step: "03",
        title: "Sécuriser et renforcer",
        description:
          "Nous renforçons le site, l'hébergement, les parcours d'entrée et les mesures associées avec des actions concrètes et adaptées.",
      },
      {
        step: "04",
        title: "Accompagner et améliorer",
        description:
          "Lorsque cela a du sens, nous prolongeons le travail avec des revues régulières, des conseils ciblés et des améliorations progressives.",
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
    title: "Demander un scan gratuit ou un devis",
    description:
      "Présentez-nous votre entreprise, votre site web et le type d'accompagnement recherché. Nous étudierons votre demande et vous proposerons la prochaine étape la plus pertinente.",
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
      success: "Nous avons bien reçu votre demande. Nous reviendrons vers vous rapidement.",
      error: "La demande n'a pas pu être envoyée. Vérifiez votre connexion et réessayez.",
    },
  },
  home: {
    heroEyebrow: "Cybersécurité pour petites entreprises",
    heroTitle: "Nous protégeons votre entreprise contre les risques cyber, les interruptions et les systèmes fragiles.",
    heroDescription:
      "Nous sécurisons les sites web, réduisons les vulnérabilités, renforçons la préparation à la conformité et consolidons la confiance dans les systèmes sur lesquels vos clients et partenaires s'appuient.",
    primaryCta: "Obtenir un scan gratuit",
    secondaryCta: "Voir les services",
    heroPanelEyebrow: "Ce que nous prenons en charge",
    heroPanelTitle: "Une approche claire pour les entreprises qui ont besoin de systèmes publics plus sûrs et plus fiables.",
    heroHighlights: [
      "Sites publics et formulaires sécurisés",
      "Préparation à la conformité adaptée aux entreprises en croissance",
      "Support sécurité continu, proportionné aux petites équipes",
    ],
    heroScanEyebrow: "Scan gratuit",
    heroScanDescription:
      "Commencez par un scan gratuit pour comprendre les écarts visibles avant d'engager une mission plus large.",
    whatWeDo: {
      eyebrow: "Ce que nous faisons",
      title: "Nous sécurisons vos sites web, réduisons vos vulnérabilités et renforçons votre niveau de préparation",
      description:
        "Nous concentrons notre travail sur ce qui influence directement la confiance: les systèmes exposés au public, les failles qui fragilisent l'activité et les actions de préparation nécessaires pour répondre avec assurance aux attentes de vos clients ou partenaires.",
      items: [
        {
          title: "Sécuriser les systèmes visibles",
          description:
            "Nous renforçons les sites, les formulaires, les choix d'hébergement et les systèmes publics qui influencent la confiance dès le premier contact.",
        },
        {
          title: "Réduire les risques évitables",
          description:
            "Nous identifions les vulnérabilités, les processus fragiles et les écarts de sécurité susceptibles de provoquer des interruptions ou d'affaiblir la confiance.",
        },
        {
          title: "Rendre la sécurité plus lisible",
          description:
            "Nous transformons les sujets techniques en priorités claires, recommandations solides et décisions compréhensibles pour les dirigeants.",
        },
      ],
    },
    howWeDoIt: {
      eyebrow: "Comment nous procédons",
      title: "Une méthode simple, structurée et orientée résultats",
      description:
        "Nous gardons le processus lisible afin que vous sachiez ce qui compte, ce qu'il faut traiter en priorité et quand un accompagnement continu devient pertinent.",
    },
    services: {
      eyebrow: "Services",
      title: "Trois offres par lesquelles nous renforçons la sécurité et la préparation des petites entreprises",
      description:
        "Chaque service est conçu pour rester clair, pratique et utile à une entreprise réelle, sans complexité superflue.",
      cardCta: "Voir les détails du service",
    },
    freeScan: {
      eyebrow: "Scan de sécurité gratuit",
      title: "Commencez par une première étape claire plutôt que par des suppositions",
      description:
        "Ce scan gratuit vous aide à comprendre le risque visible sur votre site, les points faibles probables et le type d'accompagnement le plus adapté avant d'engager une mission plus large.",
      benefits: [
        "Une première lecture claire des risques visibles, des parcours d'entrée et de l'exposition publique",
        "Des indications sur le service le plus pertinent pour votre entreprise",
        "Un devis mieux cadré lorsqu'un accompagnement plus large est nécessaire",
      ],
      formEyebrow: "Demandez votre scan",
      formTitle: "Demander un scan gratuit ou un devis",
      formDescription:
        "Présentez-nous votre entreprise, votre site web et le type d'aide recherché. Nous examinerons votre demande et vous proposerons la suite la plus adaptée.",
    },
    trust: {
      eyebrow: "Confiance et clarté",
      title: "Une protection concrète pour les entreprises qui attendent un accompagnement sérieux",
      description:
        "Nous privilégions un travail de sécurité utile au fonctionnement réel de l'entreprise: sites plus sûrs, meilleure préparation et accompagnement qui facilite des décisions solides.",
      items: [
        {
          title: "Des conseils clairs",
          description:
            "Nous expliquons les risques, les priorités et les prochaines étapes dans un langage compréhensible par les dirigeants.",
        },
        {
          title: "Une exécution rigoureuse",
          description:
            "Nous structurons notre travail autour des risques opérationnels réels plutôt qu'autour de promesses génériques ou de livrables de façade.",
        },
        {
          title: "Une posture de partenaire",
          description:
            "Nous accompagnons la préparation à la conformité et la mise en œuvre opérationnelle, sans revendiquer de rôle juridique ni d'autorité de certification.",
        },
      ],
    },
  },
  servicesPage: {
    heroEyebrow: "Services de cybersécurité",
    heroTitle: "Nous concevons des services pensés pour aider les petites entreprises à se sécuriser et à gagner en confiance.",
    heroDescription:
      "Nous sécurisons les systèmes exposés au public, préparons votre entreprise aux attentes de conformité et réduisons les risques évitables grâce à un conseil clair, une mise en œuvre concrète et un soutien continu.",
    primaryCta: "Obtenir un scan gratuit",
    secondaryCta: "Obtenir un devis gratuit",
    principles: {
      eyebrow: "Ce que nous faisons",
      title: "Des services construits autour de besoins métier réels",
      description:
        "Nous aidons les petites entreprises à renforcer la confiance, à réduire les vulnérabilités et à prendre de meilleures décisions de sécurité avec des offres claires et compréhensibles.",
      items: [
        {
          title: "Des périmètres clairs",
          description:
            "Nous structurons chaque mission autour de besoins visibles, de risques réels et d'objectifs compréhensibles par les dirigeants et les équipes.",
        },
        {
          title: "Un travail de sécurité utile",
          description:
            "Nous cherchons à améliorer les systèmes sur lesquels s'appuient vos clients, fournisseurs et partenaires, sans créer de complexité inutile.",
        },
        {
          title: "Un accompagnement à taille humaine",
          description:
            "Nous adaptons notre intervention aux petites structures qui ont besoin d'une protection sérieuse sans lourdeur excessive.",
        },
      ],
    },
    process: {
      eyebrow: "Comment nous procédons",
      title: "Un processus direct, de l'évaluation à l'amélioration continue",
      description:
        "Nous commençons par clarifier les priorités, puis nous passons à la remédiation concrète et, lorsque cela s'impose, à un accompagnement durable.",
    },
    pricing: {
      eyebrow: "Services",
      title: "Trois offres avec des prix de départ réalistes pour les petites entreprises",
      description:
        "Ces prix de départ sont pensés pour rester crédibles pour des missions orientées petites entreprises tout en laissant de la place à la portée, aux systèmes et à la complexité réelle de l'environnement.",
      boxEyebrow: "Prix moyen de départ",
      cta: "Obtenir un devis gratuit",
    },
    freeScan: {
      eyebrow: "Scan de sécurité gratuit",
      title: "Utilisez le scan gratuit pour clarifier votre prochaine décision de sécurité",
      description:
        "Décrivez-nous vos préoccupations, partagez le site ou le système concerné, et nous analyserons la surface de risque visible avant de recommander une prochaine étape adaptée.",
      benefits: [
        "Une revue concrète de votre site web et de votre surface d'exposition visible",
        "Une meilleure compréhension du service le plus pertinent",
        "Un devis plus rapide et mieux cadré lorsqu'un travail plus approfondi est nécessaire",
      ],
      formEyebrow: "Demandez votre scan",
      formTitle: "Demander un scan gratuit ou un devis",
      formDescription:
        "Utilisez ce formulaire pour demander un scan gratuit, un devis ou un premier échange utile sur vos priorités de sécurité.",
    },
    trust: {
      eyebrow: "Confiance et clarté",
      title: "Des conseils de sécurité concrets, lisibles et utiles à l'entreprise",
      description:
        "Nous intervenons pour les dirigeants et les équipes qui ont besoin d'une aide sérieuse pour protéger leurs systèmes publics, améliorer leur préparation et réduire les risques évitables.",
      items: [
        {
          title: "Des explications utilisables",
          description:
            "Nous expliquons ce qui compte, pourquoi cela compte et ce qu'il faut faire ensuite dans des termes exploitables au niveau direction.",
        },
        {
          title: "Une préparation sans ambiguïté",
          description:
            "Nous aidons les entreprises à se préparer aux attentes de sécurité et de conformité, sans fournir d'avis juridique ni de certification.",
        },
        {
          title: "Un travail ancré dans l'opérationnel",
          description:
            "Nous restons concentrés sur les sites, les vulnérabilités, les accès, les sauvegardes et la réduction continue des risques qui soutiennent l'activité réelle.",
        },
      ],
    },
  },
  aboutPage: {
    heroEyebrow: "À propos de Nourmed",
    heroTitle: "Nous accompagnons les petites entreprises qui ont besoin d'une protection concrète et d'une préparation crédible",
    heroDescription:
      "Nous avons créé Nourmed pour aider les entreprises en croissance à renforcer leurs systèmes exposés au public, à se préparer aux attentes de sécurité réelles et à prendre de meilleures décisions avant que de petits écarts ne deviennent des problèmes plus coûteux.",
    panelEyebrow: "Notre positionnement",
    panelBody: [
      "Nous aidons les entreprises à comprendre les attentes de sécurité liées à la confiance client, aux exigences fournisseurs, aux sites publics et au risque opérationnel quotidien.",
      "Notre objectif est de renforcer la posture de sécurité sans créer de confusion. Nous privilégions un accompagnement utile, structuré et adapté aux petites équipes.",
    ],
    principles: {
      eyebrow: "Principes de fonctionnement",
      title: "Comment nous abordons le travail de sécurité",
      description:
        "Nous avons construit notre approche autour de la clarté, de la crédibilité et d'une réduction progressive du risque plutôt qu'autour d'un discours technique excessif.",
      items: [
        {
          title: "Une communication orientée métier",
          description:
            "Nous expliquons ce qui compte dans un langage clair afin de faciliter les décisions au niveau direction.",
        },
        {
          title: "Une protection pragmatique",
          description:
            "Nous concentrons notre intervention sur les risques réels: sites publics, parcours d'entrée, préparation et exécution opérationnelle.",
        },
        {
          title: "Une préparation sans surpromesse",
          description:
            "Nous accompagnons la préparation à la conformité et la sécurité sans nous présenter comme cabinet juridique ou autorité de certification.",
        },
        {
          title: "Une amélioration durable",
          description:
            "Nous ne visons pas une simple checklist ponctuelle. Nous aidons les entreprises à bâtir des systèmes plus solides dans la durée.",
        },
      ],
    },
    expectations: {
      eyebrow: "Ce que vous pouvez attendre",
      title: "Un modèle simple pour améliorer la sécurité de manière concrète",
      description:
        "Nous vous aidons à comprendre où se situent les expositions, ce qui doit être traité en priorité et comment progresser sans investir au mauvais endroit.",
      items: [
        {
          label: "Qui nous accompagnons",
          detail:
            "Les petites entreprises qui ont besoin d'une posture de sécurité plus claire, de sites plus robustes et d'une meilleure préparation face aux attentes clients ou fournisseurs.",
        },
        {
          label: "Ce sur quoi nous intervenons",
          detail:
            "Préparation à la conformité, développement web sécurisé et support sécurité récurrent adapté aux opérations en croissance.",
        },
        {
          label: "Notre manière de travailler",
          detail:
            "Nous évaluons l'exposition, hiérarchisons les priorités, renforçons les points faibles et accompagnons l'amélioration continue lorsque cela est justifié.",
        },
        {
          label: "Ce que vous obtenez",
          detail:
            "Une meilleure visibilité du risque, des systèmes publics plus fiables et des recommandations suffisamment concrètes pour être mises en œuvre.",
        },
      ],
    },
    cta: {
      eyebrow: "Prochaine étape",
      title:
        "Si vous avez besoin d'un site plus sûr, d'une préparation à la conformité plus claire ou d'une protection continue, commencez par un scan gratuit ou une demande de devis.",
      label: "Obtenir un devis gratuit",
    },
  },
  contactPage: {
    heroEyebrow: "Scan de sécurité gratuit",
    heroTitle: "Demander un scan gratuit ou un devis cadré",
    heroDescription:
      "Utilisez notre formulaire sécurisé pour nous présenter votre entreprise, votre site web et le type d'accompagnement recherché. Nous étudierons votre demande et vous recommanderons la prochaine étape la plus adaptée.",
    expectationEyebrow: "Ce que nous analysons",
    expectationBody: [
      "Vous pouvez utiliser ce formulaire pour notre conseil en conformité, notre développement web sécurisé ou notre support sécurité récurrent.",
      "Notre objectif est de comprendre votre activité, votre surface de risque visible et de déterminer si un scan gratuit ou une mission plus approfondie est la meilleure option.",
      "Nous privilégions un accompagnement concret en cybersécurité et en préparation, sans promesses juridiques, sans garanties artificielles et sans jargon excessif.",
    ],
    assurances: [
      {
        title: "Les bonnes informations dès le départ",
        description:
          "Le formulaire nous permet de recueillir les éléments utiles pour cadrer un scan gratuit ou une proposition d'accompagnement pertinente.",
      },
      {
        title: "Un parcours d'entrée protégé",
        description:
          "Les demandes sont validées côté backend et protégées par des contrôles anti-spam avant d'être enregistrées.",
      },
      {
        title: "Une prochaine étape plus claire",
        description:
          "Nous utilisons votre demande pour comprendre le risque visible, les besoins métier et le parcours de service le plus adapté.",
      },
    ],
  },
};
