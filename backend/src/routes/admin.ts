import { Router } from "express";

import {
  getScanJobHandler,
  listLeadsHandler,
  listPaymentSessionsHandler,
  listScanJobsHandler,
} from "../controllers/admin-controller";
import { requireAdminAuth } from "../middleware/admin-auth";

const router = Router();

router.use(requireAdminAuth);
router.get("/leads", listLeadsHandler);
router.get("/payment-sessions", listPaymentSessionsHandler);
router.get("/scan-jobs", listScanJobsHandler);
router.get("/scan-jobs/:jobId", getScanJobHandler);

export const adminRouter = router;
