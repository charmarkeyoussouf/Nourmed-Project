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

usage() {
  cat <<'EOF'
Usage: sh scripts/prod/bootstrap.sh [--install-renew-cron] [--skip-cert] [--skip-deploy]

Runs the full production bootstrap flow on the server:
1. Validate required environment values from .env
2. Request the initial Let's Encrypt certificate if it is missing
3. Deploy the production Docker Compose stack
4. Optionally install a nightly cron entry for certificate renewal

Flags:
  --install-renew-cron   Install a cron entry that runs renew-certificate.sh nightly
  --skip-cert            Skip initial certificate issuance
  --skip-deploy          Skip docker compose deployment
  -h, --help             Show this help
EOF
}

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Required command not found: $1"
    exit 1
  fi
}

require_env() {
  var_name="$1"
  var_value="$(eval "printf '%s' \"\${$var_name:-}\"")"

  if [ -z "$var_value" ]; then
    echo "Missing required environment variable in .env: $var_name"
    exit 1
  fi
}

install_renew_cron() {
  if ! command -v crontab >/dev/null 2>&1; then
    echo "Skipping renewal cron install because 'crontab' is not available on this host."
    return
  fi

  cron_command="cd $PROJECT_ROOT && sh scripts/prod/renew-certificate.sh >> /var/log/nourmed-cert-renew.log 2>&1"
  cron_entry="0 3 * * * $cron_command"
  existing_cron="$(crontab -l 2>/dev/null || true)"

  if printf '%s\n' "$existing_cron" | grep -F "$cron_command" >/dev/null 2>&1; then
    echo "Renewal cron already installed."
    return
  fi

  if [ -n "$existing_cron" ]; then
    printf '%s\n%s\n' "$existing_cron" "$cron_entry" | crontab -
  else
    printf '%s\n' "$cron_entry" | crontab -
  fi

  echo "Installed renewal cron:"
  echo "  $cron_entry"
}

PROJECT_ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)"
CERTIFICATE_DIR="$PROJECT_ROOT/nginx/certbot/conf/live/www.nourmed.org"
INSTALL_RENEW_CRON=0
SKIP_CERT=0
SKIP_DEPLOY=0

while [ "$#" -gt 0 ]; do
  case "$1" in
    --install-renew-cron)
      INSTALL_RENEW_CRON=1
      ;;
    --skip-cert)
      SKIP_CERT=1
      ;;
    --skip-deploy)
      SKIP_DEPLOY=1
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1"
      usage
      exit 1
      ;;
  esac
  shift
done

cd "$PROJECT_ROOT"

require_command docker
require_command sh
compose version >/dev/null

if [ ! -f .env ]; then
  echo "Missing .env in $PROJECT_ROOT"
  echo "Create it from .env.example with production values before bootstrapping."
  exit 1
fi

set -a
. ./.env
set +a

require_env NEXT_PUBLIC_SITE_URL
require_env CORS_ALLOWED_ORIGINS
require_env POSTGRES_DB
require_env POSTGRES_USER
require_env POSTGRES_PASSWORD
require_env DATABASE_URL
require_env LETSENCRYPT_EMAIL

if [ "$LETSENCRYPT_EMAIL" = "security@nourmed.org" ]; then
  echo "Set a real LETSENCRYPT_EMAIL value in .env before bootstrapping."
  exit 1
fi

if [ "$NEXT_PUBLIC_SITE_URL" != "https://www.nourmed.org" ]; then
  echo "Set NEXT_PUBLIC_SITE_URL=https://www.nourmed.org in .env before bootstrapping."
  exit 1
fi

case ",$CORS_ALLOWED_ORIGINS," in
  *,https://www.nourmed.org,*)
    ;;
  *)
    echo "CORS_ALLOWED_ORIGINS must include https://www.nourmed.org."
    exit 1
    ;;
esac

case ",$CORS_ALLOWED_ORIGINS," in
  *,https://nourmed.org,*)
    ;;
  *)
    echo "CORS_ALLOWED_ORIGINS must include https://nourmed.org."
    exit 1
    ;;
esac

mkdir -p nginx/certbot/conf nginx/certbot/lib nginx/certbot/www

if [ "$SKIP_CERT" -eq 0 ]; then
  if [ -f "$CERTIFICATE_DIR/fullchain.pem" ] && [ -f "$CERTIFICATE_DIR/privkey.pem" ]; then
    echo "Existing Let's Encrypt certificate found at $CERTIFICATE_DIR"
  else
    echo "Requesting initial TLS certificate for nourmed.org and www.nourmed.org"
    sh scripts/prod/request-certificate.sh
  fi
else
  echo "Skipping certificate issuance by request."
fi

if [ "$SKIP_DEPLOY" -eq 0 ]; then
  echo "Deploying production stack"
  sh scripts/prod/deploy.sh
else
  echo "Skipping deployment by request."
fi

if [ "$INSTALL_RENEW_CRON" -eq 1 ]; then
  install_renew_cron
fi

echo "Bootstrap completed."
echo "Verify with:"
echo "  curl -I http://nourmed.org"
echo "  curl -I http://www.nourmed.org"
echo "  curl -I https://www.nourmed.org"
