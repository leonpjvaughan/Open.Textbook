#!/usr/bin/env bash
# Build the whole collection and deploy it to Cloudflare.
#
# Usage:
#   scripts/deploy.sh              # build, then deploy
#   scripts/deploy.sh --built      # use the site/ already built; do not rebuild
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

built=0
wrangler_args=()
for arg in "$@"; do
  case "$arg" in
    --built) built=1 ;;
    *) wrangler_args+=("$arg") ;;
  esac
done

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

if [ "$built" = "1" ]; then
  step "use the built site"
  [ -d site ] || {
    echo "deploy: --built needs a site/ directory" >&2
    exit 1
  }
else
  step "build"
  uv run python -m textbook.scaffold
  uv run python -m textbook.booklet
  # The pipeline is the site now. It replaces `mkdocs build --strict`: check_links()
  # requires every internal link to resolve to a built file, and the build exits
  # non-zero when one does not.
  #
  # **Every profile four at a time, and the portal last.** This walked the profiles
  # one at a time — 82 seconds of the deploy's critical path for work that finishes in
  # 25, and the deploy is the last job in the gate, so those seconds are the end of the
  # run. `build-all.sh` is the same script the `build` job runs, so a deploy and a
  # check build the site the same way.
  scripts/build-all.sh
fi

step "refuse to ship broken maths"
if grep -rl 'math-error' site --include='*.html'; then
  echo "KaTeX failed to render at least one expression; not deploying." >&2
  exit 1
fi
echo "none"

step "the reader's report route"
# The About page's contact URL is data, not a link in the tree, so the build cannot
# fail on it. It was a 404 for a signed-out reader while the repository was private.
scripts/check-contact.sh

step "deploy"
exec npx wrangler deploy "${wrangler_args[@]}"
