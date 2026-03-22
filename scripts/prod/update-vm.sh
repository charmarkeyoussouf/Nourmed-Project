#!/usr/bin/env sh
set -eu

PROJECT_ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)"
DEPLOY_BRANCH="main"
EXPECTED_REF=""

usage() {
  cat <<'EOF'
Usage: sh scripts/prod/update-vm.sh [options]

Fetch the latest code for the deployment branch on the VM and redeploy
the production Docker Compose stack.

Options:
  --branch NAME   Git branch to deploy (default: main)
  --ref SHA       Expected remote commit SHA for origin/<branch>
  -h, --help      Show this help
EOF
}

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Required command not found: $1"
    exit 1
  fi
}

log() {
  printf '%s\n' "$1"
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    --branch)
      DEPLOY_BRANCH="${2:-}"
      shift
      ;;
    --ref)
      EXPECTED_REF="${2:-}"
      shift
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

require_command git
require_command sh

cd "$PROJECT_ROOT"

if ! git rev-parse --show-toplevel >/dev/null 2>&1; then
  echo "$PROJECT_ROOT is not a git repository."
  exit 1
fi

if [ ! -f .env ]; then
  echo "Missing .env in $PROJECT_ROOT"
  echo "Create it from .env.example with production values before enabling automated deploys."
  exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
  echo "Automated deploy requires a clean git working tree on the VM."
  echo "Commit, stash, or remove manual changes in $PROJECT_ROOT before rerunning."
  exit 1
fi

log "Fetching origin/$DEPLOY_BRANCH"
git fetch origin "$DEPLOY_BRANCH" --prune

if git show-ref --verify --quiet "refs/heads/$DEPLOY_BRANCH"; then
  git checkout "$DEPLOY_BRANCH"
else
  git checkout -b "$DEPLOY_BRANCH" --track "origin/$DEPLOY_BRANCH"
fi

REMOTE_REF="$(git rev-parse "origin/$DEPLOY_BRANCH")"
LOCAL_REF="$(git rev-parse HEAD)"

if [ -n "$EXPECTED_REF" ] && [ "$REMOTE_REF" != "$EXPECTED_REF" ]; then
  echo "origin/$DEPLOY_BRANCH resolved to $REMOTE_REF, expected $EXPECTED_REF."
  echo "Retry after GitHub finishes advertising the new commit."
  exit 1
fi

if [ "$LOCAL_REF" != "$REMOTE_REF" ]; then
  log "Updating local checkout from $LOCAL_REF to $REMOTE_REF"
  git pull --ff-only origin "$DEPLOY_BRANCH"
else
  log "Local checkout already matches origin/$DEPLOY_BRANCH at $LOCAL_REF"
fi

log "Deploying production stack"
sh scripts/prod/deploy.sh
