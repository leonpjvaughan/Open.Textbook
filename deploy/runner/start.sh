#!/usr/bin/env bash
# Start, restart or stop the self-hosted runner for this repository.
#
#     deploy/runner/start.sh          # build if needed, register, start
#     deploy/runner/start.sh --status # is the fleet up, and registered?
#     deploy/runner/start.sh --prune  # remove stale offline registrations
#     deploy/runner/start.sh --stop   # deregister and remove
#     deploy/runner/start.sh --logs   # follow the runner's log
#
# The registration token is minted with `gh`, which must be authenticated as someone who
# can administer the repository. It is valid for an hour and is exchanged on first start
# for the runner's own credentials, so it is passed straight through and never stored.
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$here"

case "${1:-}" in
  --stop)
    docker compose down --remove-orphans
    echo "stopped. The runner deregisters on shutdown; if it does not, remove it at"
    echo "  Settings -> Actions -> Runners"
    exit 0
    ;;
  --status)
    # What is running, and what GitHub thinks is running. Those can disagree: a container
    # whose registration expired is up and idle, and a runner deleted in the UI leaves a
    # container that will never take a job. Both directions have happened here.
    #
    # `docker compose ps` interpolates the compose file, which wants the two variables the
    # start path exports, so they are set to empty rather than left to a warning.
    export REPO_URL="${REPO_URL:-}" RUNNER_TOKEN="${RUNNER_TOKEN:-}"
    echo "containers:"
    docker compose ps --format '  {{.Name}}  {{.Status}}' || true
    echo
    repo="${REPO:-$(gh repo view --json nameWithOwner -q .nameWithOwner)}"
    echo "registered with ${repo}:"
    gh api "repos/${repo}/actions/runners" \
      --jq '.runners[] | "  \(.name)  \(.status)  busy=\(.busy)"' || \
      echo "  none (gh is not authenticated, or nothing is registered)"
    echo
    containers="$(docker compose ps --format '{{.Name}}' | grep -c . || true)"
    counts="$(gh api "repos/${repo}/actions/runners" \
      --jq '([.runners[] | select(.status=="online")] | length), ([.runners[] | select(.status=="offline")] | length)' 2>/dev/null | tr '\n' ' ')"
    online="$(echo "$counts" | awk '{print $1}')"
    offline="$(echo "$counts" | awk '{print $2}')"
    echo "${containers} container(s), ${online:-?} online, ${offline:-?} offline"
    if [ "${online:-0}" != "${containers}" ]; then
      echo "WARNING: the container count and the online registration count disagree."
      echo "  A runner is up but not registered, or registered but not running."
    fi
    if [ "${offline:-0}" -gt 0 ] 2>/dev/null; then
      echo "  ${offline} offline registration(s) are stale; remove them with: $0 --prune"
    fi
    echo
    echo "CI runs on: $(grep -m1 'runs-on:' ../../.github/workflows/verify.yml | sed 's/.*runs-on: *//')"
    exit 0
    ;;
  --prune)
    # A registration is created on every start, and `docker compose down` is the only
    # thing that removes it. A rebuild that replaces a container leaves the old
    # registration offline, forever, in the repository's runner list.
    repo="${REPO:-$(gh repo view --json nameWithOwner -q .nameWithOwner)}"
    removed=0
    for id in $(gh api "repos/${repo}/actions/runners" \
        --jq '.runners[] | select(.status=="offline") | .id'); do
      gh api -X DELETE "repos/${repo}/actions/runners/${id}"
      removed=$((removed + 1))
    done
    echo "removed ${removed} offline registration(s) from ${repo}"
    exit 0
    ;;
  --logs)
    exec docker compose logs -f
    ;;
  --help | -h)
    sed -n '2,12p' "$0" | sed 's/^# \{0,1\}//'
    exit 0
    ;;
esac

repo="${REPO:-$(gh repo view --json nameWithOwner -q .nameWithOwner)}"
[[ -n "$repo" ]] || { echo "not a GitHub repository, or gh is not authenticated" >&2; exit 1; }

export REPO_URL="https://github.com/${repo}"
export RUNNER_LABELS="${RUNNER_LABELS:-self-hosted,linux,x64}"
# One runner takes one job, so the matrix is serial on a single runner. Four is sized to
# this host: 8 cores, 30 GB, and the heaviest job is one browser session.
export RUNNERS="${RUNNERS:-4}"
export RUNNER_TOKEN="$(gh api -X POST "repos/${repo}/actions/runners/registration-token" -q .token)"
[[ -n "$RUNNER_TOKEN" ]] || { echo "could not mint a registration token" >&2; exit 1; }

docker compose up -d --build --scale "runner=${RUNNERS}"

echo
echo "${RUNNERS} runner(s) starting for ${repo} with labels ${RUNNER_LABELS}"
echo "  follow the log:  $0 --logs"
echo "  check they took:  $0 --status"
echo "  point CI at it:  edit runs-on in .github/workflows/verify.yml (see README)"
