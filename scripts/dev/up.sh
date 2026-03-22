#!/usr/bin/env sh
set -eu

if docker compose version >/dev/null 2>&1; then
  docker compose up --build
  exit 0
fi

if command -v docker-compose >/dev/null 2>&1; then
  docker-compose up --build
  exit 0
fi

echo "Neither 'docker compose' nor 'docker-compose' is available on this host."
exit 1
