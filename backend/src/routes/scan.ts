import { Router } from "express";

import { createScanJobHandler, getPublicScanReportHandler } from "../controllers/scan-controller";
import { scanRateLimiter } from "../middleware/rate-limit";

const router = Router();

router.post("/", scanRateLimiter, createScanJobHandler);
router.get("/:jobId", getPublicScanReportHandler);

export const scanRouter = router;
