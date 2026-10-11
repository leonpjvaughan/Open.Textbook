#!/usr/bin/env bash
# The theme preview, against a site built exactly as CI builds it.
#
# This is the one place the audit matrix is written down: the bundles the harness
# discovers itself, and the three routes a chapter can add a defect on (the
# landing page, a Learn page and a practise page). The harness asserts the route
# layout before it starts, so a renderer swap fails here rather than auditing a
# 404 — see test/README.md and the header of test/theme-preview.cjs.
#
# It needs Chrome. Locally, either install Google Chrome or point Playwright at
# a browser with CHROME_PATH. In CI the runner's Chrome is used; see the
# `preview` job in .github/workflows/verify.yml.
#
# Usage: scripts/preview-themes.sh [--shots] [extra node args...]
#   --shots     also write the PNGs to --out (default: checks only)
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

# Checks only by default: the gate does not want 54 PNGs. `--shots` writes them
# to var/theme-preview/ (git-ignored), which is what a human reviewing a bundle
# wants.
shots=(--no-shots)
extra=()
for arg in "$@"; do
  case "$arg" in
    --shots) shots=(--out var/theme-preview) ;;
    *) extra+=("$arg") ;;
  esac
done

# Generated CSS (book.css, themes.css) and the shared symlinks come from the
# scaffold; the booklet widget and the landing page from their own generators.
# The harness reads the bundle ids out of the generated themes.css, so the
# order matters: build, then preview.
uv run python -m textbook.scaffold
uv run python -m textbook.booklet
uv run python -m textbook.portal
while read -r -a build; do
  uv run python -m textbook.pipeline "${build[@]}"
done < <(uv run python -m textbook.plan --configs)

# Phone widths, before the bundle sweep: a page that overflows sideways makes
# every colour question moot, and this is the check that catches it. It costs a
# few seconds and it is why the gate must not be built around a desktop browser.
node scripts/check-mobile.cjs site

# The matrix, 6 bundles x 2 schemes x 3 routes = 36 pages. Adding a book means
# adding its landing route and one of its chapter routes here.
exec node test/theme-preview.cjs \
  --root site \
  --audit \
  "${shots[@]}" \
  "${extra[@]}" \
  -- \
  "landing:/" \
  "learn:/gcse-maths/higher/chapter-1/section-1.1/learn/" \
  "practise:/gcse-maths/higher/chapter-1/section-1.1/practise/"
