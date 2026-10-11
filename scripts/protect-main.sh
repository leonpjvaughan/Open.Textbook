#!/usr/bin/env bash
# Protect main: require the gate check, and refuse force pushes and deletions.
#
# Protected branches need GitHub Pro on a private repository. On GitHub Free they
# are available only on public repositories, and the API answers with
# "Upgrade to GitHub Pro or make this repository public to enable this feature."
# This script says that plainly and stops, rather than failing with an HTTP code.
#
# Usage:
#   scripts/protect-main.sh            # apply
#   scripts/protect-main.sh --check     # report only
set -euo pipefail

REPO="${REPO:-$(gh repo view --json nameWithOwner --jq .nameWithOwner)}"
BRANCH="${BRANCH:-main}"
CHECK="${CHECK:-all checks}"

if ! gh api "repos/$REPO/branches/$BRANCH" >/dev/null 2>&1; then
  echo "cannot read $REPO@$BRANCH; is gh authenticated?" >&2
  exit 1
fi

if ! gh api "repos/$REPO/branches/$BRANCH/protection" >/dev/null 2>&1; then
  echo "Branch protection is not available for $REPO." >&2
  echo >&2
  echo "Protected branches are available on public repositories with GitHub Free," >&2
  echo "and on public and private repositories with GitHub Pro, Team or Enterprise." >&2
  echo "This repository is private on a Free plan, so the API refuses." >&2
  echo >&2
  echo "Either make the repository public — which a free, open textbook probably" >&2
  echo "wants anyway — or upgrade the account, then re-run this script." >&2
  exit 2
fi

read -r -d '' BODY <<JSON || true
{
  "required_status_checks": {
    "strict": false,
    "contexts": ["$CHECK"]
  },
  "enforce_admins": false,
  "required_pull_request_reviews": null,
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "required_linear_history": false,
  "required_conversation_resolution": true
}
JSON

if [ "${1:-}" = "--check" ]; then
  gh api "repos/$REPO/branches/$BRANCH/protection" --jq '{
    checks: .required_status_checks.contexts,
    strict: .required_status_checks.strict,
    force_pushes: .allow_force_pushes.enabled,
    deletions: .allow_deletions.enabled,
    admins_must_comply: .enforce_admins.enabled
  }'
  exit 0
fi

printf '%s' "$BODY" | gh api -X PUT \
  -H "Accept: application/vnd.github+json" \
  --input - \
  "repos/$REPO/branches/$BRANCH/protection" >/dev/null

echo "protected $REPO@$BRANCH:"
echo "  required check : $CHECK"
echo "  force pushes   : refused"
echo "  deletions      : refused"
echo "  admins bypass  : yes (so pushing to main directly keeps working)"
echo
echo "Note: requiring '$CHECK' gates pull requests. It does not gate a direct"
echo "push to main from an admin, which is deliberate — the deploy pipeline runs"
echo "on push. Set enforce_admins to true in this script if you would rather"
echo "checks block direct pushes too, and expect to work through pull requests."
