import "dotenv/config";

import http from "node:http";

import { app } from "./app";
import { env } from "./config/env";
import { logger } from "./lib/logger";
import { prisma } from "./lib/prisma";

const server = http.createServer(app);

server.requestTimeout = 30_000;
server.headersTimeout = 65_000;

let isShuttingDown = false;

async function shutdown(signal: NodeJS.Signals) {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;

  logger.info({ signal }, "Shutdown signal received");

  const forceShutdownTimer = setTimeout(() => {
    logger.error("Graceful shutdown timed out");
    process.exit(1);
  }, env.SHUTDOWN_TIMEOUT_MS);

  forceShutdownTimer.unref();

  server.close(async (error) => {
    if (error) {
      logger.error({ err: error }, "Failed to close HTTP server cleanly");
      process.exit(1);
      return;
    }

    try {
      await prisma.$disconnect();
      clearTimeout(forceShutdownTimer);
      logger.info("HTTP server and database connections closed");
      process.exit(0);
    } catch (disconnectError) {
      logger.error({ err: disconnectError }, "Failed to disconnect Prisma cleanly");
      process.exit(1);
    }
  });
}

server.listen(env.PORT, env.HOST, () => {
  logger.info(
    {
      host: env.HOST,
      port: env.PORT,
      environment: env.NODE_ENV,
    },
    "Backend listening",
  );
});

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});

process.on("unhandledRejection", (reason) => {
  logger.error({ reason }, "Unhandled promise rejection");
});

process.on("uncaughtException", (error) => {
  logger.fatal({ err: error }, "Uncaught exception");
  void shutdown("SIGTERM");
});
