#!/usr/bin/env bash
# Launch one Codex agent per chapter, in parallel waves.
#
# Usage: scripts/launch_chapter_agents.sh <chapter> [<chapter> ...]
#
# Each agent is bounded by scripts/agent-prompt.md, writes a log under
# agent-runs/, and is told not to run the build (the orchestrator does).
set -uo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.." || exit 1
mkdir -p agent-runs

launch() {
  local n="$1"
  local template="scripts/agent-prompt.md"
  [ -f "scripts/agent-prompt-${n}.md" ] && template="scripts/agent-prompt-${n}.md"
  local prompt
  prompt=$(sed "s/CHAPTER/${n}/g" "$template")
  printf '%s' "$prompt" | codex exec -s workspace-write - \
    >"agent-runs/chapter-${n}.log" 2>&1
  echo "chapter ${n}: exit $? -> agent-runs/chapter-${n}.log"
}

for n in "$@"; do
  launch "$n" &
done
wait
echo "wave finished: $*"
