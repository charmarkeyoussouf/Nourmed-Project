#!/usr/bin/env sh
set -eu

PROJECT_ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)"
DEFAULT_DOMAIN="nourmed.org"
DEFAULT_WWW_DOMAIN="www.nourmed.org"
DEFAULT_POSTGRES_DB="nourmed"
DEFAULT_POSTGRES_USER="nourmed_app"
DEFAULT_PUBLIC_PORT="8080"
DEFAULT_REQUEST_BODY_LIMIT="16kb"
DEFAULT_CONTACT_RATE_LIMIT_WINDOW_MS="900000"
DEFAULT_CONTACT_RATE_LIMIT_MAX="5"
DEFAULT_TRUST_PROXY="1"
DEFAULT_LOG_LEVEL="info"
DEFAULT_SHUTDOWN_TIMEOUT_MS="10000"
CERTIFICATE_DIR="$PROJECT_ROOT/nginx/certbot/conf/live/$DEFAULT_WWW_DOMAIN"

INSTALL_RENEW_CRON=0
SKIP_CERT=0
SKIP_DEPLOY=0
INSTALL_DOCKER=1
CONFIGURE_FIREWALL=1
FORCE_ENV_WRITE=0
PUBLIC_IP=""
DOMAIN="$DEFAULT_DOMAIN"
WWW_DOMAIN="$DEFAULT_WWW_DOMAIN"
LETSENCRYPT_EMAIL="${LETSENCRYPT_EMAIL:-}"
POSTGRES_PASSWORD="${POSTGRES_PASSWORD:-}"

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
Usage: sh scripts/prod/bootstrap.sh [options]

Production bootstrap for the Nourmed stack on a Linux VPS.
It can:
1. Install Docker and Docker Compose on Ubuntu/Debian if missing
2. Open ports 80 and 443 with ufw if available
3. Create or overwrite .env with production values
4. Verify the domain resolves to this server
5. Request the initial Let's Encrypt certificate
6. Deploy the production Docker Compose stack
7. Optionally install a nightly certificate renewal cron job

Options:
  --email you@example.com        Set LETSENCRYPT_EMAIL for .env generation
  --postgres-password VALUE      Set POSTGRES_PASSWORD for .env generation
  --public-ip X.X.X.X            Override detected public IP for DNS checks
  --install-renew-cron           Install a cron entry that runs renew-certificate.sh nightly
  --skip-cert                    Skip initial certificate issuance
  --skip-deploy                  Skip docker compose deployment
  --skip-docker-install          Do not attempt Docker installation
  --skip-firewall                Do not attempt ufw port configuration
  --force-env                    Overwrite an existing .env file
  -h, --help                     Show this help

Notes:
  - This script assumes the production domain is nourmed.org/www.nourmed.org
  - DNS management at your registrar is still external and cannot be automated from this repo
EOF
}

log() {
  printf '%s\n' "$1"
}

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Required command not found: $1"
    exit 1
  fi
}

require_root_for() {
  if [ "$(id -u)" -ne 0 ]; then
    echo "$1 requires root privileges. Re-run with sudo."
    exit 1
  fi
}

random_secret() {
  if command -v openssl >/dev/null 2>&1; then
    openssl rand -hex 24
    return
  fi

  if [ -r /dev/urandom ]; then
    od -An -N24 -tx1 /dev/urandom | tr -d ' \n'
    return
  fi

  echo "Unable to generate a random password automatically."
  exit 1
}

detect_public_ip() {
  if [ -n "$PUBLIC_IP" ]; then
    printf '%s\n' "$PUBLIC_IP"
    return
  fi

  if command -v curl >/dev/null 2>&1; then
    detected_ip="$(curl -4fsS https://api.ipify.org 2>/dev/null || true)"
    if [ -n "$detected_ip" ]; then
      printf '%s\n' "$detected_ip"
      return
    fi
  fi

  if command -v wget >/dev/null 2>&1; then
    detected_ip="$(wget -4qO- https://api.ipify.org 2>/dev/null || true)"
    if [ -n "$detected_ip" ]; then
      printf '%s\n' "$detected_ip"
      return
    fi
  fi

  printf '%s\n' ""
}

resolve_domain_ip() {
  target_domain="$1"

  if command -v getent >/dev/null 2>&1; then
    getent ahostsv4 "$target_domain" 2>/dev/null | awk 'NR==1 {print $1}'
    return
  fi

  if command -v host >/dev/null 2>&1; then
    host "$target_domain" 2>/dev/null | awk '/has address/ {print $4; exit}'
    return
  fi

  if command -v nslookup >/dev/null 2>&1; then
    nslookup "$target_domain" 2>/dev/null | awk '/^Address: / {print $2; exit}'
    return
  fi

  printf '%s\n' ""
}

write_env_file() {
  if [ -f "$PROJECT_ROOT/.env" ] && [ "$FORCE_ENV_WRITE" -ne 1 ]; then
    log "Existing .env found. Keeping it as-is."
    return
  fi

  if [ -z "$LETSENCRYPT_EMAIL" ]; then
    echo "Missing required email. Re-run with --email you@example.com"
    exit 1
  fi

  if [ -z "$POSTGRES_PASSWORD" ]; then
    POSTGRES_PASSWORD="$(random_secret)"
  fi

  cat > "$PROJECT_ROOT/.env" <<EOF
PUBLIC_PORT=$DEFAULT_PUBLIC_PORT
NEXT_PUBLIC_SITE_URL=https://$WWW_DOMAIN
POSTGRES_DB=$DEFAULT_POSTGRES_DB
POSTGRES_USER=$DEFAULT_POSTGRES_USER
POSTGRES_PASSWORD=$POSTGRES_PASSWORD
DATABASE_URL=postgresql://$DEFAULT_POSTGRES_USER:$POSTGRES_PASSWORD@db:5432/$DEFAULT_POSTGRES_DB?schema=public
CORS_ALLOWED_ORIGINS=https://$WWW_DOMAIN,https://$DOMAIN
REQUEST_BODY_LIMIT=$DEFAULT_REQUEST_BODY_LIMIT
CONTACT_RATE_LIMIT_WINDOW_MS=$DEFAULT_CONTACT_RATE_LIMIT_WINDOW_MS
CONTACT_RATE_LIMIT_MAX=$DEFAULT_CONTACT_RATE_LIMIT_MAX
TRUST_PROXY=$DEFAULT_TRUST_PROXY
LOG_LEVEL=$DEFAULT_LOG_LEVEL
SHUTDOWN_TIMEOUT_MS=$DEFAULT_SHUTDOWN_TIMEOUT_MS
LETSENCRYPT_EMAIL=$LETSENCRYPT_EMAIL
EOF

  chmod 600 "$PROJECT_ROOT/.env" 2>/dev/null || true
  log "Wrote production .env at $PROJECT_ROOT/.env"
}

install_docker_if_needed() {
  if command -v docker >/dev/null 2>&1; then
    log "Docker already installed."
    return
  fi

  if [ "$INSTALL_DOCKER" -ne 1 ]; then
    echo "Docker is missing and --skip-docker-install was provided."
    exit 1
  fi

  require_root_for "Docker installation"
  require_command apt-get

  log "Installing Docker and Docker Compose plugin"
  apt-get update
  apt-get install -y ca-certificates curl gnupg
  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  chmod a+r /etc/apt/keyrings/docker.gpg
  . /etc/os-release
  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
    $VERSION_CODENAME stable" > /etc/apt/sources.list.d/docker.list
  apt-get update
  apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
  systemctl enable --now docker
}

configure_firewall_if_possible() {
  if [ "$CONFIGURE_FIREWALL" -ne 1 ]; then
    log "Skipping firewall configuration by request."
    return
  fi

  if ! command -v ufw >/dev/null 2>&1; then
    log "ufw not available. Skipping firewall configuration."
    return
  fi

  require_root_for "Firewall configuration"

  log "Allowing OpenSSH, HTTP, and HTTPS in ufw"
  ufw allow OpenSSH >/dev/null 2>&1 || true
  ufw allow 80/tcp >/dev/null 2>&1 || true
  ufw allow 443/tcp >/dev/null 2>&1 || true
  ufw --force enable >/dev/null 2>&1 || true
}

check_dns_points_to_server() {
  current_public_ip="$(detect_public_ip)"

  if [ -z "$current_public_ip" ]; then
    log "Could not determine the server's public IP automatically. Skipping DNS/IP match check."
    return
  fi

  domain_ip="$(resolve_domain_ip "$DOMAIN")"
  www_domain_ip="$(resolve_domain_ip "$WWW_DOMAIN")"

  log "Detected server public IP: $current_public_ip"
  log "$DOMAIN resolves to: ${domain_ip:-unknown}"
  log "$WWW_DOMAIN resolves to: ${www_domain_ip:-unknown}"

  if [ "$domain_ip" != "$current_public_ip" ] || [ "$www_domain_ip" != "$current_public_ip" ]; then
    echo "DNS is not pointed at this server yet."
    echo "Update the A records for $DOMAIN and $WWW_DOMAIN to $current_public_ip before requesting certificates."
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

while [ "$#" -gt 0 ]; do
  case "$1" in
    --email)
      LETSENCRYPT_EMAIL="${2:-}"
      shift
      ;;
    --postgres-password)
      POSTGRES_PASSWORD="${2:-}"
      shift
      ;;
    --public-ip)
      PUBLIC_IP="${2:-}"
      shift
      ;;
    --install-renew-cron)
      INSTALL_RENEW_CRON=1
      ;;
    --skip-cert)
      SKIP_CERT=1
      ;;
    --skip-deploy)
      SKIP_DEPLOY=1
      ;;
    --skip-docker-install)
      INSTALL_DOCKER=0
      ;;
    --skip-firewall)
      CONFIGURE_FIREWALL=0
      ;;
    --force-env)
      FORCE_ENV_WRITE=1
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

require_command sh

install_docker_if_needed
compose version >/dev/null
configure_firewall_if_possible
write_env_file

set -a
. ./.env
set +a

if [ "$LETSENCRYPT_EMAIL" = "security@nourmed.org" ]; then
  echo "Set a real LETSENCRYPT_EMAIL value. Re-run with --email you@example.com --force-env"
  exit 1
fi

if [ "${NEXT_PUBLIC_SITE_URL:-}" != "https://$WWW_DOMAIN" ]; then
  echo "NEXT_PUBLIC_SITE_URL in .env must be https://$WWW_DOMAIN"
  exit 1
fi

case ",${CORS_ALLOWED_ORIGINS:-}," in
  *,https://$WWW_DOMAIN,*)
    ;;
  *)
    echo "CORS_ALLOWED_ORIGINS must include https://$WWW_DOMAIN"
    exit 1
    ;;
esac

case ",${CORS_ALLOWED_ORIGINS:-}," in
  *,https://$DOMAIN,*)
    ;;
  *)
    echo "CORS_ALLOWED_ORIGINS must include https://$DOMAIN"
    exit 1
    ;;
esac

mkdir -p nginx/certbot/conf nginx/certbot/lib nginx/certbot/www
check_dns_points_to_server

if [ "$SKIP_CERT" -eq 0 ]; then
  if [ -f "$CERTIFICATE_DIR/fullchain.pem" ] && [ -f "$CERTIFICATE_DIR/privkey.pem" ]; then
    echo "Existing Let's Encrypt certificate found at $CERTIFICATE_DIR"
  else
    echo "Requesting initial TLS certificate for $DOMAIN and $WWW_DOMAIN"
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
echo "  curl -I http://$DOMAIN"
echo "  curl -I http://$WWW_DOMAIN"
echo "  curl -I https://$WWW_DOMAIN"
