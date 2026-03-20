import { Router } from "express";

import { createContactSubmissionHandler } from "../controllers/contact-controller";
import { contactRateLimiter } from "../middleware/rate-limit";

const router = Router();

router.post("/", contactRateLimiter, createContactSubmissionHandler);

export const contactRouter = router;
