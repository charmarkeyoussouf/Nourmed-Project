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
CERTIFICATE_DIR="$PROJECT_ROOT/nginx/certbot/conf/live/www.nourmed.org"

cd "$PROJECT_ROOT"

if [ ! -f .env ]; then
  echo "Missing .env in $PROJECT_ROOT"
  echo "Create it from .env.example with production values before deploying."
  exit 1
fi

set -a
. ./.env
set +a

if [ "${NEXT_PUBLIC_SITE_URL:-}" != "https://www.nourmed.org" ]; then
  echo "Set NEXT_PUBLIC_SITE_URL=https://www.nourmed.org in .env before deploying HTTPS."
  exit 1
fi

case ",${CORS_ALLOWED_ORIGINS:-}," in
  *,https://www.nourmed.org,*)
    ;;
  *)
    echo "CORS_ALLOWED_ORIGINS must include https://www.nourmed.org before deploying HTTPS."
    exit 1
    ;;
esac

if [ ! -f "$CERTIFICATE_DIR/fullchain.pem" ] || [ ! -f "$CERTIFICATE_DIR/privkey.pem" ]; then
  echo "Missing Let's Encrypt certificate for www.nourmed.org."
  echo "Run 'sh scripts/prod/request-certificate.sh' on the VPS before deploying HTTPS."
  exit 1
fi

compose -f docker-compose.prod.yml up -d --build
