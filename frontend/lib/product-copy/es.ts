import { enProductCopy } from "@/lib/product-copy/en";
import type { ProductCopy } from "@/lib/product-copy/types";

export const esProductCopy: ProductCopy = {
  ...enProductCopy,
  navLinks: [
    { href: "/security-scan", label: "Escaneo" },
    { href: "/payments", label: "Pagos" },
  ],
  paymentsMeta: {
    title: "Pagos",
    description:
      "Pague depósitos de Nourmed mediante un checkout alojado y seguro para consultoría de cumplimiento, proyectos web seguros y onboarding recurrente.",
    keywords: ["pago ciberseguridad", "deposito proyecto seguridad", "stripe checkout consultoria", "deposito sitio seguro"],
  },
  scanMeta: {
    title: "Escaneo de seguridad autorizado",
    description:
      "Lance un escaneo defensivo y autorizado para sitios, dominios y servicios explícitos, con resultados priorizados por severidad.",
    keywords: ["escaneo autorizado", "escaneo vulnerabilidades web", "postura de seguridad pyme", "evaluacion defensiva"],
  },
  paymentsPage: {
    ...enProductCopy.paymentsPage,
    heroEyebrow: "Pagos seguros",
    heroTitle: "Una forma clara de pagar un depósito y avanzar con una contratación de seguridad.",
    heroDescription:
      "Utilice un checkout alojado para depósitos fijos, reserve un proyecto con alcance definido o empiece con un escaneo gratuito antes de un trabajo mayor.",
    primaryCta: "Elegir una opción",
    secondaryCta: "Hablar primero",
    successTitle: "Pago recibido",
    successDescription: "El pago se registró correctamente. Nourmed utilizará los datos enviados para confirmar el siguiente paso.",
    cancelTitle: "Pago cancelado",
    cancelDescription: "No se capturó ningún pago. Puede volver a las opciones o contactar a Nourmed para una cotización.",
  },
  scanPage: {
    ...enProductCopy.scanPage,
    heroEyebrow: "Escaneo autorizado",
    heroTitle: "Ejecute un escaneo de postura de seguridad solo sobre activos autorizados.",
    heroDescription:
      "Este MVP está diseñado para revisión defensiva y de solo lectura. Analiza señales visibles de transporte, TLS, cabeceras, cookies y superficie web.",
    primaryCta: "Iniciar escaneo",
    secondaryCta: "Solicitar presupuesto",
    guardrailTitle: "Solo pruebas autorizadas",
    guardrailBody:
      "Use este flujo únicamente sobre activos propios o con autorización explícita. El MVP actual es no destructivo y está orientado a auditoría.",
    targetTypeLabel: "Tipo de objetivo",
    requesterNameLabel: "Su nombre",
    requesterEmailLabel: "Su correo",
    organizationLabel: "Organización",
    targetLabel: "Objetivo",
    notesLabel: "Notas opcionales",
    authorizationLabel: "Confirmo que este activo me pertenece o que tengo autorización explícita para probarlo.",
    authorizationHint: "Para servicios explícitos use host:puerto. Los objetivos internos requieren conectividad de red del escáner.",
    submitLabel: "Iniciar escaneo autorizado",
    submittingLabel: "Lanzando escaneo...",
    reportTitle: "Informe del escaneo",
    reportDescription: "El informe refleja el alcance actual del MVP: controles seguros de postura, no una prueba de intrusión exhaustiva.",
    reportEmpty: "Inicie un escaneo para generar un informe sobre un objetivo autorizado.",
    findingsTitle: "Hallazgos",
    technicalSummaryTitle: "Resumen técnico",
    statusQueued: "En cola",
    statusRunning: "En ejecución",
    statusCompleted: "Completado",
    statusFailed: "Fallido",
    messages: {
      success: "El trabajo de escaneo fue creado. Nourmed está recopilando hallazgos.",
      error: "No se pudo iniciar el escaneo. Revise el objetivo y la autorización.",
      loading: "Actualizando estado del escaneo...",
    },
    riskLabels: {
      LOW: "Riesgo bajo",
      MODERATE: "Riesgo moderado",
      ELEVATED: "Riesgo elevado",
      HIGH: "Riesgo alto",
      CRITICAL: "Riesgo crítico",
    },
  },
  paymentsForm: {
    customerName: "Nombre",
    businessName: "Empresa",
    customerEmail: "Correo",
    notes: "Notas opcionales",
    submitLabel: "Continuar al checkout seguro",
    submittingLabel: "Redirigiendo...",
    emptyState: "Seleccione un depósito de pago para continuar.",
    secureNote: "Stripe Checkout gestiona el pago. Nourmed guarda el registro del servicio, no datos de tarjeta.",
    messages: {
      redirecting: "Preparando checkout seguro...",
      error: "No se pudo crear el checkout. Verifique los datos o contacte a Nourmed.",
    },
  },
};
