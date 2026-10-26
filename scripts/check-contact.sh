#!/usr/bin/env bash
# Follow the address the About page gives a reader who finds a mistake.
#
# The contact URL is data in `engine/src/textbook/legal.py`, not a link in the
# page tree, so `check_links` cannot see it and the build cannot fail on it. On
# 2026-10-25 the repository behind it was private and the URL returned 404 to a
# signed-out reader: the page said "report it here" and there was nowhere to go.
#
# Run it before a deploy. A 302 is the sign-in redirect a signed-out reader gets
# for a public repository with issues enabled, so it is a pass; 404 is the defect.
set -euo pipefail

URL="${CONTACT_URL:-https://github.com/leonpjvaughan/Open.Textbook/issues/new}"
CODE="$(curl -sL -o /dev/null -w '%{http_code}' --max-time 20 "$URL" || true)"

case "$CODE" in
  200|302)
    echo "report route: $CODE"
    ;;
  *)
    echo "the report route is ${CODE:-unreachable}: $URL" >&2
    echo "A reader cannot report a mistake. Check the repository's visibility" >&2
    echo "and that issues are enabled; see .agents/todo.md item 122." >&2
    exit 1
    ;;
esac
