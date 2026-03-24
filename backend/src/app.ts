import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import { env } from "./config/env";
import { ApiError } from "./lib/api-error";
import { errorHandler } from "./middleware/error-handler";
import { notFoundHandler } from "./middleware/not-found";
import { requestContextMiddleware } from "./middleware/request-context";
import { appRouter } from "./routes";

export const app = express();

app.disable("x-powered-by");
app.set("trust proxy", env.trustProxy);

app.use(requestContextMiddleware);
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || env.corsAllowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new ApiError(403, "CORS_DENIED", "Origin is not allowed."),
      );
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: [
      "Authorization",
      "Content-Type",
      "X-Admin-Token",
      "X-Requested-With",
      "X-Request-Id",
      "X-Scan-Access-Token",
    ],
    optionsSuccessStatus: 204,
  }),
);
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }),
);
app.use(compression());
app.use(express.json({ limit: env.REQUEST_BODY_LIMIT, strict: true }));
app.use(express.urlencoded({ extended: false, limit: env.REQUEST_BODY_LIMIT }));

app.use((_req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

app.use(appRouter);
app.use(notFoundHandler);
app.use(errorHandler);
