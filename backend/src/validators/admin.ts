import { z } from "zod";

export const listAdminRecordsQuerySchema = z
  .object({
    limit: z.coerce.number().int().min(1).max(100).default(25),
  })
  .strict();
