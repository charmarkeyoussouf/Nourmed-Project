#!/usr/bin/env sh
set -eu

compose() {
  if docker compose version >/dev/null 2>&1; then
    docker compose "$@"
    return
  fi

  if command -v docker-compose >/dev/null 2>&1; then
    docker-compose "$@"
    return
  fi

  echo "Neither 'docker compose' nor 'docker-compose' is available on this host."
  exit 1
}

PROJECT_ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)"

cd "$PROJECT_ROOT"

mkdir -p nginx/certbot/conf nginx/certbot/lib nginx/certbot/www

docker run --rm \
  -v "$PROJECT_ROOT/nginx/certbot/conf:/etc/letsencrypt" \
  -v "$PROJECT_ROOT/nginx/certbot/lib:/var/lib/letsencrypt" \
  -v "$PROJECT_ROOT/nginx/certbot/www:/var/www/certbot" \
  certbot/certbot:latest renew \
  --webroot \
  -w /var/www/certbot

compose -f docker-compose.prod.yml exec nginx nginx -s reload
