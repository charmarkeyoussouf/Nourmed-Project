import { PaymentSessionStatus } from "@prisma/client";

import { env } from "../config/env";
import { ApiError } from "../lib/api-error";
import { getPaymentOption } from "../lib/payment-catalog";
import { prisma } from "../lib/prisma";
import { sanitizeMultilineText, sanitizeOptionalText, sanitizeText } from "../lib/sanitize";
import { getStripeClient } from "../lib/stripe-client";
import { createLeadRecord } from "./contact-service";
import type { CreatePaymentCheckoutSessionInput } from "../validators/payment";

type CheckoutRequestContext = {
  ipAddress?: string;
  userAgent?: string;
};

function getSuccessUrl() {
  return env.STRIPE_SUCCESS_URL ?? `${env.PUBLIC_APP_URL}/payments/success?session_id={CHECKOUT_SESSION_ID}`;
}

function getCancelUrl() {
  return env.STRIPE_CANCEL_URL ?? `${env.PUBLIC_APP_URL}/payments/cancel`;
}

function resolvePaymentStatus(stripeStatus: string | null, paymentStatus: string | null): PaymentSessionStatus {
  if (paymentStatus === "paid") {
    return "COMPLETE";
  }

  if (stripeStatus === "expired") {
    return "EXPIRED";
  }

  if (stripeStatus === "open" || stripeStatus === "complete") {
    return "OPEN";
  }

  return "FAILED";
}

export async function createPaymentCheckoutSession(
  input: CreatePaymentCheckoutSessionInput,
  context: CheckoutRequestContext,
) {
  const stripe = getStripeClient();

  if (!stripe) {
    throw new ApiError(
      503,
      "PAYMENTS_NOT_CONFIGURED",
      "Stripe is not configured yet. Add STRIPE_SECRET_KEY to enable hosted checkout.",
    );
  }

  const option = getPaymentOption(input.optionKey);

  if (!option) {
    throw new ApiError(400, "INVALID_PAYMENT_OPTION", "Select a valid payment option.");
  }

  const lead = await createLeadRecord({
    name: input.customerName,
    email: input.customerEmail,
    company: input.businessName,
    message: input.notes,
    source: "payments_page_checkout",
    serviceInterest: "Payments / Deposit",
    ipAddress: context.ipAddress,
    userAgent: context.userAgent,
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: getSuccessUrl(),
    cancel_url: getCancelUrl(),
    customer_email: input.customerEmail,
    billing_address_collection: "auto",
    payment_method_collection: "always",
    metadata: {
      leadId: lead.id,
      optionKey: option.key,
      businessName: input.businessName ?? "",
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: env.STRIPE_CURRENCY,
          unit_amount: option.amountCents,
          product_data: {
            name: option.label,
            description: option.description,
          },
        },
      },
    ],
  });

  const savedSession = await prisma.paymentSession.create({
    data: {
      optionKey: option.key,
      optionLabel: option.label,
      amountCents: option.amountCents,
      currency: env.STRIPE_CURRENCY,
      status: resolvePaymentStatus(session.status, session.payment_status),
      stripeCheckoutSessionId: session.id,
      stripePaymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : null,
      stripeCustomerEmail: session.customer_details?.email ?? input.customerEmail,
      customerName: sanitizeText(input.customerName),
      customerEmail: input.customerEmail,
      businessName: sanitizeOptionalText(input.businessName) ?? null,
      notes: input.notes ? sanitizeMultilineText(input.notes) : null,
      checkoutUrl: session.url ?? null,
      leadId: lead.id,
      metadata: {
        requestIpAddress: sanitizeOptionalText(context.ipAddress) ?? null,
      },
    },
  });

  if (!session.url) {
    throw new ApiError(502, "PAYMENT_SESSION_ERROR", "Stripe did not return a hosted checkout URL.");
  }

  return {
    paymentSessionId: savedSession.id,
    checkoutSessionId: session.id,
    checkoutUrl: session.url,
    option,
  };
}

export async function syncPaymentSession(checkoutSessionId: string) {
  const stripe = getStripeClient();

  if (!stripe) {
    throw new ApiError(
      503,
      "PAYMENTS_NOT_CONFIGURED",
      "Stripe is not configured yet. Add STRIPE_SECRET_KEY to enable hosted checkout.",
    );
  }

  const localSession = await prisma.paymentSession.findUnique({
    where: {
      stripeCheckoutSessionId: checkoutSessionId,
    },
  });

  if (!localSession) {
    throw new ApiError(404, "PAYMENT_SESSION_NOT_FOUND", "Payment session not found.");
  }

  const stripeSession = await stripe.checkout.sessions.retrieve(checkoutSessionId);

  return prisma.paymentSession.update({
    where: {
      id: localSession.id,
    },
    data: {
      status: resolvePaymentStatus(stripeSession.status, stripeSession.payment_status),
      stripePaymentIntentId:
        typeof stripeSession.payment_intent === "string" ? stripeSession.payment_intent : localSession.stripePaymentIntentId,
      stripeCustomerEmail: stripeSession.customer_details?.email ?? localSession.stripeCustomerEmail,
      completedAt:
        stripeSession.payment_status === "paid" ? new Date() : localSession.completedAt,
      expiredAt: stripeSession.status === "expired" ? new Date() : localSession.expiredAt,
    },
  });
}

export async function listPaymentSessions(limit: number) {
  return prisma.paymentSession.findMany({
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      lead: true,
    },
  });
}
