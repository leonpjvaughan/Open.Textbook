#!/usr/bin/env bash
# Build the whole collection and deploy it to Cloudflare.
#
# Usage:
#   scripts/deploy.sh              # build, then deploy
#   scripts/deploy.sh --dry-run    # build, then check the deploy without uploading
#
# Credentials come from .env (git-ignored) as CF_ACCOUNT_ID / CF_API_TOKEN, or
# from the environment as CLOUDFLARE_ACCOUNT_ID / CLOUDFLARE_API_TOKEN, which is
# what CI uses. Wrangler still accepts the CF_* names but warns that they are
# deprecated, so this maps them onto the canonical ones. Renaming them in .env
# removes the warning.
#
# See DEPLOY.md.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [ -f .env ]; then
  set -a
  # shellcheck disable=SC1091
  . ./.env
  set +a
fi

CLOUDFLARE_ACCOUNT_ID="${CLOUDFLARE_ACCOUNT_ID:-${CF_ACCOUNT_ID:-}}"
CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN:-${CF_API_TOKEN:-}}"
export CLOUDFLARE_ACCOUNT_ID CLOUDFLARE_API_TOKEN

if [ -z "$CLOUDFLARE_API_TOKEN" ] || [ -z "$CLOUDFLARE_ACCOUNT_ID" ]; then
  echo "no Cloudflare credentials found." >&2
  echo "Set CF_ACCOUNT_ID and CF_API_TOKEN in .env (copy .env.example), or" >&2
  echo "CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN in the environment." >&2
  exit 2
fi

step() { printf '\n== %s ==\n' "$1"; }

step "build"
uv run python -m textbook.scaffold
uv run python -m textbook.booklet
uv run python -m textbook.portal
while read -r config; do
  uv run mkdocs build -f "$config" --strict
done < <(uv run python -m textbook.plan --configs)

step "refuse to ship broken maths"
if grep -rl 'math-error' site --include='*.html'; then
  echo "KaTeX failed to render at least one expression; not deploying." >&2
  exit 1
fi
echo "none"

step "deploy"
exec npx wrangler deploy "$@"
