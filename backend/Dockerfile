FROM node:22-bookworm-slim AS base
WORKDIR /app
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl \
  && rm -rf /var/lib/apt/lists/*

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY package.json tsconfig.json tsconfig.build.json ./
COPY prisma ./prisma
COPY src ./src
RUN npm run prisma:generate && npm run build && npm prune --omit=dev

FROM base AS runner
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4000
WORKDIR /app

RUN groupadd --system --gid 1001 nodeapp && useradd --system --uid 1001 --gid nodeapp nodeapp

COPY --from=builder --chown=nodeapp:nodeapp /app/node_modules ./node_modules
COPY --from=builder --chown=nodeapp:nodeapp /app/package.json ./package.json
COPY --from=builder --chown=nodeapp:nodeapp /app/prisma ./prisma
COPY --from=builder --chown=nodeapp:nodeapp /app/dist ./dist

USER nodeapp

EXPOSE 4000

CMD ["sh", "-c", "npm run prisma:migrate:deploy && node dist/server.js"]
