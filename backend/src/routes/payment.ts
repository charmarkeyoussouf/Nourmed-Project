import { Router } from "express";

import {
  createPaymentCheckoutSessionHandler,
  getPaymentSessionHandler,
} from "../controllers/payment-controller";
import { paymentRateLimiter } from "../middleware/rate-limit";

const router = Router();

router.post("/checkout-session", paymentRateLimiter, createPaymentCheckoutSessionHandler);
router.get("/session/:sessionId", getPaymentSessionHandler);

export const paymentRouter = router;
