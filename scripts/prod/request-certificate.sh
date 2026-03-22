#!/usr/bin/env sh
set -eu

PROJECT_ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)"

cd "$PROJECT_ROOT"

if [ ! -f .env ]; then
  echo "Missing .env in $PROJECT_ROOT"
  echo "Create it from .env.example and set LETSENCRYPT_EMAIL before requesting certificates."
  exit 1
fi

set -a
. ./.env
set +a

if [ -z "${LETSENCRYPT_EMAIL:-}" ] || [ "${LETSENCRYPT_EMAIL}" = "security@nourmed.org" ]; then
  echo "Set a real LETSENCRYPT_EMAIL value in .env before requesting certificates."
  exit 1
fi

mkdir -p nginx/certbot/conf nginx/certbot/lib nginx/certbot/www

docker compose -f docker-compose.prod.yml stop nginx >/dev/null 2>&1 || true

docker compose -f docker-compose.prod.yml --profile ops run --rm --service-ports certbot \
  certonly \
  --standalone \
  --preferred-challenges http \
  --non-interactive \
  --agree-tos \
  --no-eff-email \
  --keep-until-expiring \
  --email "$LETSENCRYPT_EMAIL" \
  -d www.nourmed.org \
  -d nourmed.org

echo "Certificate request completed."
echo "If successful, deploy HTTPS with: sh scripts/prod/deploy.sh"
