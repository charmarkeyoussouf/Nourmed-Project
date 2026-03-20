import { Router } from "express";

import { contactRouter } from "./contact";
import { healthRouter } from "./health";

const router = Router();

router.use("/health", healthRouter);
router.use("/api/contact", contactRouter);

export const appRouter = router;
