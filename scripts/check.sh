#!/usr/bin/env bash
# Everything CI enforces, in one command. Run this before pushing.
#
# Usage: scripts/check.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

step() { printf '\n== %s ==\n' "$1"; }

step "the otkd bundle is intact"
# Offline: the bundle's own SHA256SUMS against the committed bytes. Rebuilding needs
# the otkd environment and about eight minutes, so it is the changed-path CI job; the
# local gate verifies the bytes. See `scripts/build-otkd.sh`.
scripts/build-otkd.sh --verify

step "generated files are in sync"
# The TypeScript compiles first, because the kit's output is committed and the drift
# check below diffs it against the source. `tsc` transpiles without checking: type
# errors are the `types` step's job, and a build that refused to emit until every
# annotation existed would be a build nobody runs.
node tools/build.mjs
uv run python -m textbook.scaffold
uv run python -m textbook.booklet
uv run python -m textbook.portal
# Only the files the generators own. Diffing the whole tree would fail on any
# unrelated edit in progress, which is not what this is checking for.
mapfile -t generated < <(uv run python -m textbook.plan --generated)

missing=()
for path in "${generated[@]}"; do
  [ -e "$path" ] || missing+=("$path")
done
if [ "${#missing[@]}" -gt 0 ]; then
  printf 'missing generated file: %s\n' "${missing[@]}" >&2
  exit 1
fi

# Compared against the last commit. A source change (curriculum.yaml, book.yaml,
# themes/, booklet/) regenerates these, and they belong in the same commit, so
# this is reported as a difference to commit rather than as a stale file — the
# earlier wording sent me looking for a generator bug that was not there.
if ! git diff --quiet -- "${generated[@]}"; then
  git diff --stat -- "${generated[@]}" >&2
  echo >&2
  echo "These are generated, and differ from the last commit. If a source changed," >&2
  echo "they are its regenerated output and belong in the same commit." >&2
  exit 1
fi

echo "${#generated[@]} generated files in sync"

step "problem banks"
uv run python -m textbook.verify

step "voice and structure"
uv run python -m textbook.lint

step "types"
# The browser runtime is checked, not compiled: `tsc` reads the JavaScript that
# ships and reports on it. The count is not zero yet, so this ratchets — it fails
# if the number grows, and fails if it falls without the baseline being lowered.
node tools/dist/cli.js types

step "solvers"
# The wasm is committed. With Rust, rebuild it and compare byte for byte; without,
# verify the digests and still replay every selftest through the JS loader. The
# replay is the check that the bytes a page loads are the bytes the Rust computed.
if command -v cargo >/dev/null 2>&1; then
  scripts/build-solvers.sh --check
else
  scripts/build-solvers.sh --verify
fi
node scripts/check-solvers.mjs

step "tests"
uv run python -m pytest tests/ -q -n "${PYTEST_WORKERS:-4}"

step "builds"
# The pipeline is the site now. It replaces `mkdocs build --strict`: check_links()
# requires every internal link to resolve to a built file, and the build exits
# non-zero when one does not. It also reports maths errors and exits non-zero on
# those. `--configs` now emits the pipeline's arguments, not MkDocs config paths.
while read -r -a build; do
  uv run python -m textbook.pipeline "${build[@]}"
done < <(uv run python -m textbook.plan --configs)
# The deployment root and the one search index, in the same order `build-all.sh`
# uses: the root pages exist before Pagefind sees them, and the browser checks below
# get the same site a deploy does.
uv run python -m textbook.portal
uv run python -m textbook.search

step "browser checks (mobile, canvas, figure paint, phone labels, print)"
# Mandatory — if Playwright is absent, fail rather than announcing a skip. A branch
# must not pass the local gate while skipping the paint and phone-label audits.
if ! node -e 'require(process.env.PLAYWRIGHT_PATH || "playwright")' 2>/dev/null \
   && ! node -e 'require("/home/leon/.local/share/mise/installs/npm-playwright/latest/node_modules/playwright")' 2>/dev/null; then
  echo "playwright is required for the browser checks; install it or set PLAYWRIGHT_PATH" >&2
  exit 1
fi

# Run the four independent browser sweeps concurrently so the wall clock is the
# longest of them rather than their sum, then check print media on the built site.
browser_tmp="$(mktemp -d)"
trap 'rm -rf "$browser_tmp"' EXIT
browser_names=()
browser_pids=()
run_browser() {
  local name="$1"
  shift
  ( "$@" ) >"$browser_tmp/$name.log" 2>&1 &
  browser_names+=("$name")
  browser_pids+=($!)
}

# **A table cannot widen a page**, because `wrap_tables` puts every one in a
# `.table-scroll` — measure every table at 390px and fail when one overflows.
run_browser mobile node tools/dist/cli.js check-mobile site
# **A label's width is its font's** — verify every figure stays inside its viewBox
# even in a wider monospace font.
run_browser canvas node tools/dist/cli.js canvas site --font monospace
# **A control is a thumb's, not a pixel's** — every interactive element at 390px, in
# both schemes, against WCAG 2.2's 24x24 floor.
run_browser targets node tools/dist/cli.js targets site
# Every figure, in both schemes, and what each one actually paints (plus no HTML
# box carrying a var(--tb-*) background).
run_browser audit node tools/dist/cli.js audit site
# Every figure again at 390px: no rendered label below 9px.
run_browser phone node tools/dist/cli.js audit site --mobile

browser_failed=0
for i in "${!browser_names[@]}"; do
  name="${browser_names[$i]}"
  if wait "${browser_pids[$i]}"; then
    printf '\n-- %s --\n' "$name"
  else
    printf '\n-- %s — FAILED --\n' "$name"
    browser_failed=1
  fi
  cat "$browser_tmp/$name.log"
done
[ "$browser_failed" = 0 ] || exit 1

# Print media render on a built Learn page (asserts figures survive print and fit).
uv run python -m pytest tests/test_print.py -m browser -q

# The layout seam: every page complete without its layout, no layout overflowing under the
# widest bundle font, the reader's Layout choice, and every layout's measure, targets and
# phone figure labels.
uv run python -m pytest tests/test_layouts_browser.py -m browser -q -n "${PYTEST_WORKERS:-4}"

step "no maths rendering errors"
if grep -rl 'math-error' site --include='*.html'; then
  echo "KaTeX failed to render at least one expression" >&2
  exit 1
fi
echo "none"

step "no unparsed Markdown wrappers"
if grep -rl 'markdown="1"' site --include='*.html'; then
  echo "a wrapper kept its markdown attribute, so md_in_html did not parse it" >&2
  exit 1
fi
echo "none"

step "the asset graph of the assembled site"
# Every file a page reaches for resolves — root-absolute references included, which
# resolve at the site root and not at the book's — every content-addressed name a
# page links is in the manifest the build wrote, and every manifest entry is a file
# on disk. It needs the books built first, which is why it is here and not with the
# other `node tools/dist/cli.js` checks in the "types" step.
node tools/dist/cli.js assets site

printf '\nall checks passed\n'
