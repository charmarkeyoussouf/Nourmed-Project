# Nourmed Secure Platform

Security-first Dockerized foundation for Nourmed. This repository provides a production-minded starting point for a public marketing site with a contact intake flow, PostgreSQL persistence, a Node/Express API, and Nginx as the only public entrypoint.

The MVP is intentionally narrow:
- Public home, about, and contact pages
- Contact form submission through Nginx to the backend API
- Strict backend validation and structured JSON responses
- PostgreSQL persistence with Prisma migrations
- Health checks, request IDs, structured logging, and containerized local startup

## Architecture Overview

```text
Browser
  |
  v
Nginx reverse proxy
  |-- /           -> Next.js frontend
  |-- /api/*      -> Express backend
  |-- /health     -> Express backend health
                     |
                     v
                 PostgreSQL
```

Core decisions:
- `frontend` and `backend` are isolated services so the public site and API can evolve independently.
- `db` is attached only to an internal Docker network. It is never published to the host by default.
- Nginx is the only exposed service and is structured so HTTPS termination can be added later without a major rewrite.
- Prisma migrations are committed and `prisma migrate deploy` runs automatically when the backend container starts.
- `npm` is used consistently because the original workspace already used it and it keeps onboarding and lockfiles straightforward.

## Folder Structure

```text
.
|-- .env.example
|-- docker-compose.yml
|-- README.md
|-- frontend/
|   |-- Dockerfile
|   |-- .dockerignore
|   |-- .env.example
|   |-- package.json
|   |-- tsconfig.json
|   |-- next.config.ts
|   |-- eslint.config.mjs
|   |-- postcss.config.mjs
|   |-- app/
|   |-- components/
|   `-- public/
|-- backend/
|   |-- Dockerfile
|   |-- .dockerignore
|   |-- .env.example
|   |-- package.json
|   |-- tsconfig.json
|   |-- tsconfig.build.json
|   |-- prisma/
|   `-- src/
|-- nginx/
|   `-- nginx.conf
`-- scripts/
    |-- dev/
    `-- prod/
```

## Security Decisions

- Reverse proxy first: all browser traffic is designed to flow through Nginx.
- Network segmentation: PostgreSQL is on an internal Docker network that only the backend can join.
- No hardcoded secrets: configuration lives in `.env` files derived from committed `.env.example` files.
- Backend hardening: strict Zod validation, body size limits, `helmet`, constrained CORS, endpoint rate limiting, and centralized error handling.
- Logging foundations: request IDs are issued or propagated, request summaries are logged, and application errors are structured without leaking stack traces to clients.
- Container posture: multi-stage Node builds, slim base images, non-root runtime users for frontend and backend, and `no-new-privileges` at runtime.

This foundation applies industry best practices for defense in depth. It is not a guarantee of absolute security, and production deployment should add TLS, secret management, backup controls, monitoring, and periodic hardening reviews.

## Environment Variables

1. Copy the root example file:

```bash
cp .env.example .env
```

PowerShell equivalent:

```powershell
Copy-Item .env.example .env
```

2. Rotate these values before any shared or internet-facing deployment:
- `POSTGRES_PASSWORD`
- `DATABASE_URL`
- `CORS_ALLOWED_ORIGINS`
- `NEXT_PUBLIC_SITE_URL`

Root `.env` variables used by Docker Compose:

| Variable | Purpose |
| --- | --- |
| `PUBLIC_PORT` | Host port mapped to Nginx |
| `NEXT_PUBLIC_SITE_URL` | Public base URL baked into the frontend build |
| `POSTGRES_DB` | PostgreSQL database name |
| `POSTGRES_USER` | Application database user |
| `POSTGRES_PASSWORD` | Application database password |
| `DATABASE_URL` | Prisma connection string used by the backend |
| `CORS_ALLOWED_ORIGINS` | Comma-separated origins allowed by the API |
| `REQUEST_BODY_LIMIT` | Max request body size for Express JSON parsing |
| `CONTACT_RATE_LIMIT_WINDOW_MS` | Rate limit window for the contact endpoint |
| `CONTACT_RATE_LIMIT_MAX` | Max contact submissions per window per client |
| `TRUST_PROXY` | Express trust proxy value for correct client IP handling |
| `LOG_LEVEL` | Backend log verbosity |
| `SHUTDOWN_TIMEOUT_MS` | Graceful shutdown timeout for the backend |

Service-specific examples are also included in `frontend/.env.example` and `backend/.env.example` for running services outside Compose later.

## Local Startup

Default local startup is intentionally simple:

```bash
docker compose up --build
```

Expected result:
- Nginx is reachable at `http://localhost:8080` by default
- The frontend serves the public pages through Nginx
- The backend is reachable only through Nginx from the host
- PostgreSQL remains internal to Docker

Optional helper scripts:

```bash
./scripts/dev/up.sh
./scripts/dev/down.sh
```

## Prisma Migrations

Existing migrations are applied automatically when the backend container starts via `prisma migrate deploy`.

Manual commands:

```bash
docker compose exec backend npm run prisma:migrate:deploy
docker compose exec backend npm run prisma:generate
```

If you later change the Prisma schema and want to create a new migration, the cleanest flow is:

1. Edit `backend/prisma/schema.prisma`
2. Run `npm install` inside `backend/` on the host
3. Run `npx prisma migrate dev --name your_change` from `backend/`
4. Rebuild with `docker compose up --build`

That keeps migration files committed in the repo instead of only inside a container filesystem.

## Verify the Platform

Open the public site:

```bash
http://localhost:8080
```

Check backend health through Nginx:

```bash
curl http://localhost:8080/health
```

Expected response:

```json
{
  "success": true,
  "data": {
    "status": "ok",
    "service": "nourmed-backend",
    "database": "reachable"
  }
}
```

Test the contact form from the browser:
- Open `/contact`
- Submit a valid name, email, and message
- Confirm the success message appears

Test the contact API directly:

```bash
curl -X POST http://localhost:8080/api/contact \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Jane Doe\",\"email\":\"jane@example.com\",\"message\":\"I want to discuss secure infrastructure for our operations.\"}"
```

Inspect saved records from PostgreSQL:

```bash
docker compose exec db sh -lc 'PGPASSWORD="$POSTGRES_PASSWORD" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "SELECT id, name, email, status FROM contact_submissions ORDER BY createdAt DESC;"'
```

PowerShell example using the default compose project name and example credentials:

```powershell
$cmd = 'docker exec -e PGPASSWORD=change-me-strong-postgres-password nourmed-secure-db-1 psql -U nourmed_app -d nourmed -A -F "," -t -c "SELECT name, email, status FROM contact_submissions LIMIT 10;"'
Invoke-Expression $cmd
```

## Operational Notes

- The backend returns consistent JSON envelopes for both success and failure responses.
- Contact submissions include audit-friendly `createdAt` and `updatedAt` timestamps.
- The schema already includes nullable fields for future extensions such as `phone`, `source`, `company`, `status`, and `forwardedAt`.
- The contact endpoint includes a hidden honeypot field and rate limiting to reduce low-effort spam.

## Future Hardening Recommendations

Short-term:
- Terminate HTTPS at Nginx and enable HSTS only after TLS is active.
- Replace `.env` secrets with a managed secret source on the target server.
- Add CSP headers tuned to the final frontend assets.
- Add centralized log shipping and alerting.
- Add database backup automation and periodic restore drills.

Next platform steps:
- Authentication and session management
- RBAC and admin dashboard boundaries
- Append-only audit logging for privileged actions
- Webhook forwarding for GoHighLevel and n8n
- AI receptionist and telephony integrations
- CI/CD with image scanning, dependency auditing, and staged deploys

## VPS Deployment Notes

This repo is structured for a straightforward VPS path:

1. Provision a Linux host with Docker and Docker Compose
2. Copy the repo to the server
3. Create a production `.env`
4. Point DNS to the server
5. Add TLS certs and extend `nginx/nginx.conf` with HTTPS server blocks
6. Run `docker compose up -d --build`

For a more mature production posture later, separate the database onto managed infrastructure or a hardened private host, create separate admin and app database roles, and add encrypted off-host backups.
