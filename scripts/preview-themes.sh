#!/usr/bin/env bash
# The theme preview, against a site built exactly as CI builds it.
#
# This is the one place the audit matrix is written down: the bundles the harness
# discovers itself, and the three routes a chapter can add a defect on (the
# landing page, a Learn page and a practise page). The harness asserts the route
# layout before it starts, so a renderer swap fails here rather than auditing a
# 404 — see `tools/src/commands/preview.ts` and `tools/AGENTS.md`.
#
# It needs Chrome. Locally, either install Google Chrome or point Playwright at
# a browser with CHROME_PATH. In CI the runner's Chrome is used; see the
# `preview` job in .github/workflows/verify.yml.
#
# **It is the slowest thing in the repository, so it is built to finish in about two
# minutes rather than eight.** Two things made it slow and neither was the work: the
# build ran one profile at a time, and the six checks below ran one after another. They
# are independent processes with their own browser, so they run together and the wall
# clock is the longest of them, not the sum.
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

# Every profile, four at a time. A pipeline writes only under its own
# `site/<book>/<profile>/`, so they do not collide; the portal writes the deployment
# root and therefore goes last, alone. Twenty sequential builds were 82 seconds of a
# run whose checks then took most of the rest.
uv run python -m textbook.plan --configs |
  xargs -d '\n' -P "${BUILD_JOBS:-4}" -n1 -I{} bash -c '
    read -r -a build <<< "$1"
    uv run python -m textbook.pipeline "${build[@]}" >/dev/null
  ' _ {}
uv run python -m textbook.portal

# --- the six checks, concurrently -------------------------------------------------
#
# Each is an independent process with its own browser, and run one at a time they were
# most of the run. Six at once on eight cores costs the longest, not the sum, and the
# longest is now the figure audit at about ninety seconds.
#
# Output is captured per check and printed in a fixed order afterwards: interleaved
# progress dots from six browsers are unreadable, and a failure has to be findable in
# the log of the check that failed.
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
check_names=()
check_pids=()

run_check() {
  local name="$1"
  shift
  ( "$@" ) >"$tmp/$name.log" 2>&1 &
  check_names+=("$name")
  check_pids+=($!)
}

# Phone widths: a page that overflows sideways makes every colour question moot.
run_check mobile node tools/dist/cli.js check-mobile site

# Every figure, in both schemes, and what each one actually paints. The only check that
# sees the difference between `text-*` setting `color` (HTML) and `fill` (SVG).
run_check contrast node tools/dist/cli.js audit site --json "${TMPDIR:-/tmp}/figure-audit.json"

# Every figure again at phone width: the one check that answers "can a label be read on
# the device most readers use". A figure can clear 4.5:1 and still draw its label at
# 8.6px, which is how `SIZE.tick` came to be 15 when it needed 16.
run_check phone node tools/dist/cli.js audit site --mobile

# The kit's own contract, before the modules that build on it.
run_check kit node tools/dist/cli.js kit site

# The arithmetic each figure declares, decided by the same exact CAS the banks use.
run_check readout node tools/dist/cli.js readout site --verify

# The matrix, 6 bundles x 2 schemes x 3 routes = 36 pages.
run_check preview node tools/dist/cli.js preview \
  --root site \
  --audit \
  "${shots[@]}" \
  "${extra[@]}" \
  -- \
  "landing:/" \
  "learn:/gcse-maths/higher/chapter-1/section-1.1/learn/" \
  "practise:/gcse-maths/higher/chapter-1/section-1.1/practise/"

failed=0
for i in "${!check_names[@]}"; do
  name="${check_names[$i]}"
  if wait "${check_pids[$i]}"; then
    printf '\n== %s ==\n' "$name"
  else
    printf '\n== %s — FAILED ==\n' "$name"
    failed=1
  fi
  cat "$tmp/$name.log"
done
[ "$failed" = 0 ] || exit 1
