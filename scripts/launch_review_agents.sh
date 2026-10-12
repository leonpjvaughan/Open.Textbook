#!/usr/bin/env bash
# Launch one review agent per chapter (or the glossary), in parallel.
#
# Usage:
#   scripts/launch_review_agents.sh 1 2 3 ...
#   TEMPLATE=.agents/prompts/glossary-prompt.md scripts/launch_review_agents.sh glossary
set -uo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.." || exit 1
mkdir -p agent-runs
TEMPLATE="${TEMPLATE:-.agents/prompts/review-prompt.md}"

launch() {
  local n="$1"
  local prompt
  prompt=$(sed "s/CHAPTER/${n}/g" "$TEMPLATE")
  if [ "${AGENT:-codex}" = "copilot" ]; then
    copilot -p "$prompt" --allow-all-tools --allow-all-paths \
      >"agent-runs/review-${n}.log" 2>&1
  else
    printf '%s' "$prompt" | codex exec -s workspace-write - \
      >"agent-runs/review-${n}.log" 2>&1
  fi
  echo "review ${n}: exit $? -> agent-runs/review-${n}.log"
}

for n in "$@"; do
  launch "$n" &
done
wait
echo "review wave finished"
