#!/usr/bin/env sh
set -eu

PROJECT_ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)"

cd "$PROJECT_ROOT"

mkdir -p nginx/certbot/conf nginx/certbot/lib nginx/certbot/www

docker compose -f docker-compose.prod.yml --profile ops run --rm certbot \
  renew \
  --webroot \
  -w /var/www/certbot

docker compose -f docker-compose.prod.yml exec nginx nginx -s reload
