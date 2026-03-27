import { Router } from "express";

import { adminRouter } from "./admin";
import { contactRouter } from "./contact";
import { healthRouter } from "./health";
import { scanRouter } from "./scan";

const router = Router();

router.use("/health", healthRouter);
router.use("/api/contact", contactRouter);
router.use("/api/scan-jobs", scanRouter);
router.use("/api/admin", adminRouter);

export const appRouter = router;
