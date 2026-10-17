#!/usr/bin/env bash
# Everything CI enforces, in one command. Run this before pushing.
#
# Usage: scripts/check.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

step() { printf '\n== %s ==\n' "$1"; }

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

step "tests"
uv run python -m pytest tests/ -q

step "builds"
# The pipeline is the site now. It replaces `mkdocs build --strict`: check_links()
# requires every internal link to resolve to a built file, and the build exits
# non-zero when one does not. It also reports maths errors and exits non-zero on
# those. `--configs` now emits the pipeline's arguments, not MkDocs config paths.
while read -r -a build; do
  uv run python -m textbook.pipeline "${build[@]}"
done < <(uv run python -m textbook.plan --configs)

step "no maths rendering errors"
if grep -rl 'math-error' site --include='*.html'; then
  echo "KaTeX failed to render at least one expression" >&2
  exit 1
fi
echo "none"

printf '\nall checks passed\n'
