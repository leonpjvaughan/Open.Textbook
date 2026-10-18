#!/usr/bin/env bash
# Build every profile, several at a time.
#
# **Why this exists.** The gate used to run one matrix job per profile: thirteen rows at
# about a hundred seconds each — half of a 2600-second run — for a build that takes four
# seconds. Every row paid its own `checkout`, `uv sync` and `npm ci`, and on four
# self-hosted runners they then queued behind each other. One job with this script is
# one install and one batch of concurrent builds.
#
# Nothing is lost but the job list: `deploy` builds the site itself, so the build job is
# a check, and a failing profile prints its own log and exits non-zero.
#
# Each pipeline writes only under its own `site/<book>/<profile>/`, so the profiles do
# not collide. The portal writes the deployment root and therefore runs last, alone.
#
# Usage: scripts/build-all.sh
#   BUILD_JOBS=8   how many profiles at once (default 4)
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

jobs="${BUILD_JOBS:-4}"
mapfile -t configs < <(uv run python -m textbook.plan --configs)
if [ "${#configs[@]}" -eq 0 ]; then
  echo "no profiles to build" >&2
  exit 1
fi
printf '%d profiles, %d at a time\n' "${#configs[@]}" "$jobs"

failed=0
for ((i = 0; i < ${#configs[@]}; i += jobs)); do
  pids=()
  logs=()
  labels=()
  for config in "${configs[@]:i:jobs}"; do
    read -r -a build <<<"$config"
    log="$(mktemp)"
    # `timeout` so a wedged build fails the batch rather than hanging the job: the
    # pipeline has its own timeouts for fetches, not for a renderer that never returns.
    ( start=$SECONDS
      if timeout 600 uv run python -m textbook.pipeline "${build[@]}" >"$log" 2>&1; then
        printf '  ok    %-46s %3ss\n' "$config" "$((SECONDS - start))"
      else
        printf '  FAIL  %-46s %3ss\n' "$config" "$((SECONDS - start))"
        exit 1
      fi
    ) &
    pids+=($!)
    logs+=("$log")
    labels+=("$config")
  done
  for idx in "${!pids[@]}"; do
    if ! wait "${pids[$idx]}"; then
      failed=1
      printf '\n== %s ==\n' "${labels[$idx]}"
      cat "${logs[$idx]}"
    fi
    rm -f "${logs[$idx]}"
  done
done

if [ "$failed" != 0 ]; then
  echo >&2
  echo "at least one profile did not build; its log is above" >&2
  exit 1
fi

uv run python -m textbook.portal
echo "every profile built"
