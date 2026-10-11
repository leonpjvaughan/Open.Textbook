#!/usr/bin/env bash
# Everything CI enforces, in one command. Run this before pushing.
#
# Usage: scripts/check.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

step() { printf '\n== %s ==\n' "$1"; }

step "generated files are in sync"
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

step "tests"
uv run python -m pytest tests/ -q

step "builds"
while read -r config; do
  uv run mkdocs build -f "$config" --strict
done < <(uv run python -m textbook.plan --configs)

step "no maths rendering errors"
if grep -rl 'math-error' site --include='*.html'; then
  echo "KaTeX failed to render at least one expression" >&2
  exit 1
fi
echo "none"

step "figure-hook and tier-profile evaluation"
test/run.sh

printf '\nall checks passed\n'
