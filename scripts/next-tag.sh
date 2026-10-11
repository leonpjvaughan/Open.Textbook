#!/usr/bin/env bash
# Print the next release tag: yy.<day of year>.<increment>
#
#   yy          two-digit year
#   <day>       day of the year, zero-padded to three digits
#   <increment> counts the tags already released for this year and day, and
#               starts at 0
#
# The increment is the point. A plain date collides the moment a second deploy
# lands on the same day, and the release job then either overwrites the tag — or,
# as it used to, silently skips releasing at all.
#
# Tags are read from the GitHub API rather than from a local clone, so this needs
# neither the history nor the tags fetched. REPO and TZ are overridable, which is
# what lets the tests drive it with a fixed date.
#
# Usage: scripts/next-tag.sh
set -euo pipefail

REPO="${REPO:-$(gh repo view --json nameWithOwner --jq .nameWithOwner)}"
TZ="${TZ:-Europe/London}"
export TZ

prefix="$(date +%y.%j)"

latest="$(
  gh api "repos/$REPO/git/matching-refs/tags/$prefix." \
    --jq ".[].ref | ltrimstr(\"refs/tags/$prefix.\") | select(test(\"^[0-9]+\$\"))" \
    | sort -n | tail -1
)"

if [ -n "$latest" ]; then
  echo "$prefix.$((latest + 1))"
else
  echo "$prefix.0"
fi
