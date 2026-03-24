import { enProductCopy } from "@/lib/product-copy/en";
import type { ProductCopy } from "@/lib/product-copy/types";

export const frProductCopy: ProductCopy = {
  ...enProductCopy,
  navLinks: [
    { href: "/security-scan", label: "Scan de sécurité" },
    { href: "/payments", label: "Paiements" },
  ],
  paymentsMeta: {
    title: "Paiements",
    description:
      "Réglez un acompte Nourmed via un paiement hébergé et sécurisé pour une mission de conformité, un projet web sécurisé ou un onboarding récurrent.",
    keywords: [
      "paiement cybersécurité",
      "acompte mission sécurité",
      "paiement stripe conseil",
      "acompte site web sécurisé",
    ],
  },
  paymentsPage: {
    ...enProductCopy.paymentsPage,
    heroEyebrow: "Paiements sécurisés",
    heroTitle: "Une manière simple et professionnelle de régler un acompte et d’ouvrir une mission.",
    heroDescription:
      "Cette page permet de régler un acompte clair, de réserver un démarrage cadré ou de commencer par un scan gratuit avant un périmètre plus large. Nous expliquons toujours ce que le paiement couvre avant validation.",
    primaryCta: "Choisir une option de paiement",
    secondaryCta: "Parler à Nourmed d’abord",
    useCasesEyebrow: "Quand utiliser cette page",
    useCasesTitle: "Des options pensées pour les parcours d’achat les plus courants",
    useCasesDescription:
      "L’objectif est de faciliter les prochaines étapes simples: réserver un cadrage, verser un acompte sur un projet défini ou commencer par une demande gratuite avant un devis sur mesure.",
    useCases: [
      {
        title: "Réserver un accompagnement de conformité",
        description: "Utilisez un acompte fixe lorsque vous êtes prêt à lancer un cadrage de préparation et un premier échange structuré.",
      },
      {
        title: "Démarrer un projet web sécurisé",
        description: "Utilisez l’acompte projet après alignement du périmètre pour réserver l’implémentation et la planification du déploiement.",
      },
      {
        title: "Ouvrir un accompagnement récurrent",
        description: "Utilisez l’acompte de mise en place lorsque vous êtes prêt à démarrer un forfait sécurité pour petite entreprise.",
      },
    ],
    optionsEyebrow: "Options de paiement",
    optionsTitle: "Des choix lisibles avec un périmètre compréhensible",
    optionsDescription:
      "Les acomptes fixes passent par Stripe Checkout afin que nous ne stockions jamais de données carte brutes. Les missions sur mesure commencent toujours par un échange cadré.",
    options: [
      {
        key: "free-scan-request",
        mode: "link",
        label: "Demande de scan gratuit",
        price: "0 $",
        description: "Commencez par un scan autorisé ou une demande de devis avant une mission plus large.",
        cta: "Demander un scan gratuit",
        href: "/security-scan",
      },
      {
        key: "compliance-consultation-deposit",
        mode: "checkout",
        label: "Acompte conseil en conformité",
        price: "250 $",
        description: "Réservez un cadrage initial de préparation à la conformité et un premier échange structuré.",
        cta: "Régler l’acompte",
      },
      {
        key: "secure-website-project-deposit",
        mode: "checkout",
        label: "Acompte projet web sécurisé",
        price: "500 $",
        description: "Réservez un projet de site sécurisé ou une mission de remédiation avec plan d’implémentation.",
        cta: "Régler l’acompte",
      },
      {
        key: "security-package-setup-deposit",
        mode: "checkout",
        label: "Acompte de mise en place du forfait sécurité",
        price: "300 $",
        description: "Réservez l’onboarding d’un forfait récurrent et une première revue de posture.",
        cta: "Régler l’acompte",
      },
      {
        key: "custom-engagement",
        mode: "link",
        label: "Mission sur mesure",
        price: "Nous contacter d’abord",
        description: "Pour un environnement plus large, plusieurs sites, ou des exigences spécifiques, un devis cadré reste la bonne première étape.",
        cta: "Demander un devis",
        href: "/contact",
      },
    ],
    formEyebrow: "Paiement hébergé",
    formTitle: "Choisissez un acompte puis finalisez le paiement en toute sécurité",
    formDescription:
      "Sélectionnez un acompte fixe, indiquez les coordonnées que nous devons rattacher à la mission, puis vous serez redirigé vers Stripe Checkout.",
    pricingNote: "Les scans gratuits restent gratuits. Les environnements plus larges ou multi-systèmes font l’objet d’un devis avant paiement.",
    faqEyebrow: "FAQ",
    faqTitle: "Les réponses essentielles avant de payer",
    faqDescription: "Le parcours est volontairement simple, transparent et adapté à un achat B2B de petite entreprise.",
    faq: [
      {
        question: "Que se passe-t-il après le paiement d’un acompte ?",
        answer: "Nous utilisons le paiement et les coordonnées associées pour confirmer le périmètre, planifier la suite et ouvrir la mission.",
      },
      {
        question: "Nourmed stocke-t-il des données carte bancaire ?",
        answer: "Non. La collecte carte est traitée via Stripe Checkout afin de limiter le périmètre PCI et d’éviter tout stockage direct de données carte.",
      },
      {
        question: "Que faire si ma mission nécessite un devis sur mesure ?",
        answer: "Passez d’abord par le parcours de devis. Les environnements plus larges ou les besoins spécifiques doivent être cadrés avant tout paiement.",
      },
    ],
    trustEyebrow: "Confiance et sécurité",
    trustTitle: "Un parcours de paiement conçu pour rester simple et rassurant",
    trustDescription:
      "Nous cherchons à réduire la friction sans réduire la clarté. Paiement hébergé, libellés explicites et acomptes cadrés rendent la démarche facile à comprendre.",
    trustItems: [
      {
        title: "Gestion carte hébergée",
        description: "Stripe Checkout gère la page de paiement afin que nous n’ayons pas à stocker les données carte.",
      },
      {
        title: "Objet du paiement clairement défini",
        description: "Chaque option précise s’il s’agit d’un cadrage, d’un démarrage projet ou d’un onboarding récurrent.",
      },
      {
        title: "Cadrage métier avant tout",
        description: "Les environnements complexes passent toujours par un échange structuré plutôt que par un paiement générique mal calibré.",
      },
    ],
    successTitle: "Paiement reçu",
    successDescription: "Le règlement a bien été enregistré. Nous utiliserons les informations transmises pour confirmer la prochaine étape.",
    cancelTitle: "Paiement annulé",
    cancelDescription: "Aucun paiement n’a été capturé. Vous pouvez revenir aux options ou nous contacter pour un devis cadré.",
  },
  scanMeta: {
    title: "Scan de sécurité autorisé",
    description:
      "Lancez un scan de posture de sécurité pour un site, un domaine ou un service explicitement déclaré, uniquement sur des actifs autorisés.",
    keywords: [
      "scan de sécurité autorisé",
      "analyse de vulnérabilité site web",
      "scan posture sécurité petite entreprise",
      "évaluation défensive web",
    ],
  },
  scanPage: {
    ...enProductCopy.scanPage,
    heroEyebrow: "Scan de sécurité autorisé",
    heroTitle: "Lancez un scan en lecture seule sur des actifs que vous possédez ou pour lesquels vous êtes autorisé.",
    heroDescription:
      "Ce MVP est conçu pour un usage strictement défensif. Il analyse des signaux visibles liés au transport, au TLS, aux headers, aux cookies et à la surface web afin d’aider à prioriser les prochaines actions.",
    primaryCta: "Lancer un scan",
    secondaryCta: "Demander un devis cadré",
    guardrailTitle: "Uniquement pour des tests autorisés",
    guardrailBody:
      "Utilisez ce parcours uniquement pour des actifs appartenant à votre organisation ou pour lesquels vous disposez d’une autorisation explicite. Le MVP actuel reste non destructif, en lecture seule et orienté audit.",
    capabilitiesEyebrow: "Ce que le MVP analyse",
    capabilitiesTitle: "Une première lecture crédible plutôt qu’une promesse artificielle",
    capabilitiesDescription:
      "Nous commençons par les signaux qui comptent tôt: accessibilité du service, posture de transport, garde-fous web de base et écarts faciles à prioriser.",
    capabilities: [
      {
        title: "TLS et transport",
        description: "Vérification de l’accessibilité HTTPS, de la durée de vie du certificat et du comportement HTTP vers HTTPS.",
      },
      {
        title: "Headers et cookies",
        description: "Revue des headers de sécurité manquants et des indicateurs faibles dans les attributs de cookies.",
      },
      {
        title: "Surface HTML et formulaires",
        description: "Détection d’actions de formulaires en HTTP, de références mixtes et d’autres signaux de surface sur la page analysée.",
      },
    ],
    processEyebrow: "Fonctionnement",
    processTitle: "Un flux lisible, de la demande au rapport",
    processDescription:
      "La plateforme enregistre la demande, valide le type de cible déclaré, exécute une revue sûre puis restitue des findings triés par sévérité.",
    processSteps: [
      { step: "01", title: "Déclarez la cible", description: "Choisissez un site, un domaine ou un service explicite au format hôte:port que vous êtes autorisé à auditer." },
      { step: "02", title: "Confirmez l’autorisation", description: "Vous devez attester que l’actif vous appartient ou que vous avez l’autorisation de le tester." },
      { step: "03", title: "Lancez le scan", description: "Nous exécutons une revue en lecture seule et stockons les résultats côté backend." },
      { step: "04", title: "Analysez le rapport", description: "Le rapport met en avant le niveau de risque, les findings et les recommandations concrètes." },
    ],
    formEyebrow: "Lancer un scan",
    formTitle: "Démarrer une évaluation de vulnérabilité autorisée",
    formDescription:
      "Indiquez la cible, l’organisation concernée et l’attestation d’autorisation. Le rapport reste limité à cette session tant que vous ne le partagez pas volontairement.",
    trustEyebrow: "Garde-fous opérationnels",
    trustTitle: "Un MVP défensif, limité et prêt à évoluer",
    trustDescription:
      "Cette version constitue une première couche sérieuse. Elle aide à trier et prioriser, sans prétendre couvrir l’intégralité d’un test d’intrusion approfondi.",
    trustItems: [
      {
        title: "Lecture seule par conception",
        description: "Le scanner observe et analyse des signaux de posture sans tentative d’exploitation ni action destructive.",
      },
      {
        title: "Autorisation explicite exigée",
        description: "Chaque demande requiert une attestation d’autorisation avant d’être acceptée par le backend.",
      },
      {
        title: "Findings structurés",
        description: "Les résultats sont stockés avec sévérité, description et recommandation afin de faciliter la remédiation.",
      },
    ],
    targetTypeLabel: "Type de cible",
    targetTypeOptions: [
      { value: "WEB_APPLICATION", label: "Site web ou application web" },
      { value: "DOMAIN", label: "Domaine ou sous-domaine" },
      { value: "HOST_SERVICE", label: "Service explicite au format hôte:port" },
    ],
    requesterNameLabel: "Votre nom",
    requesterEmailLabel: "Votre email",
    organizationLabel: "Organisation",
    targetLabel: "Cible",
    targetPlaceholder: "https://app.votreentreprise.com ou portail.exemple.com ou 10.0.0.15:8443",
    notesLabel: "Notes facultatives",
    authorizationLabel: "Je confirme que cet actif m’appartient ou que je dispose d’une autorisation explicite pour le tester.",
    authorizationHint: "Pour un service explicite, utilisez le format hôte:port. Les cibles intranet exigent une connectivité réseau depuis l’environnement du scanner.",
    submitLabel: "Lancer le scan autorisé",
    submittingLabel: "Lancement du scan...",
    reportTitle: "Rapport de scan",
    reportDescription: "Ce rapport reflète le périmètre actuel du MVP: contrôles de posture sûrs, et non test d’intrusion exhaustif.",
    reportEmpty: "Lancez un scan pour générer un rapport sur une cible autorisée.",
    findingsTitle: "Findings",
    technicalSummaryTitle: "Résumé technique",
    statusQueued: "En file d’attente",
    statusRunning: "En cours",
    statusCompleted: "Terminé",
    statusFailed: "Échoué",
    messages: {
      success: "Le job de scan a bien été créé. Nous collectons maintenant les findings.",
      error: "Le scan n’a pas pu être lancé. Vérifiez la cible et l’attestation d’autorisation puis réessayez.",
      loading: "Actualisation du statut du scan...",
    },
    riskLabels: {
      LOW: "Risque faible",
      MODERATE: "Risque modéré",
      ELEVATED: "Risque élevé",
      HIGH: "Risque fort",
      CRITICAL: "Risque critique",
    },
  },
  paymentsForm: {
    customerName: "Nom",
    businessName: "Nom de l’entreprise",
    customerEmail: "Email",
    notes: "Notes facultatives",
    submitLabel: "Continuer vers le paiement sécurisé",
    submittingLabel: "Redirection...",
    emptyState: "Sélectionnez un acompte payant pour continuer vers le paiement.",
    secureNote: "Le règlement passe par Stripe Checkout. Nous conservons le dossier de mission, pas les données carte brutes.",
    messages: {
      redirecting: "Préparation du paiement sécurisé...",
      error: "Le paiement n’a pas pu être préparé. Vérifiez vos informations ou contactez-nous pour un lien de paiement cadré.",
    },
  },
};
