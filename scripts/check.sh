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
git diff --exit-code --stat

step "problem banks"
uv run python -m textbook.verify

step "voice and structure"
uv run python -m textbook.lint

step "tests"
uv run python -m pytest tests/ -q

step "builds"
while read -r _ _ config _; do
  [ -n "${config:-}" ] || continue
  uv run mkdocs build -f "$config" --strict
done < <(uv run python -m textbook.plan)

step "no maths rendering errors"
if grep -rl 'math-error' site --include='*.html'; then
  echo "KaTeX failed to render at least one expression" >&2
  exit 1
fi
echo "none"

step "figure-hook and tier-profile evaluation"
test/run.sh

printf '\nall checks passed\n'
