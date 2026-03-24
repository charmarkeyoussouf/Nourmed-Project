import Stripe from "stripe";

import { env } from "../config/env";

let stripeClient: Stripe | null | undefined;

export function getStripeClient() {
  if (stripeClient !== undefined) {
    return stripeClient;
  }

  stripeClient = env.STRIPE_SECRET_KEY
    ? new Stripe(env.STRIPE_SECRET_KEY, {
        appInfo: {
          name: "Nourmed",
        },
      })
    : null;

  return stripeClient;
}
