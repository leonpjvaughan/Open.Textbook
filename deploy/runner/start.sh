#!/usr/bin/env bash
# Start, restart or stop the self-hosted runner for this repository.
#
#     deploy/runner/start.sh          # build if needed, register, start
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
  --logs)
    exec docker compose logs -f
    ;;
  --help | -h)
    sed -n '2,10p' "$0" | sed 's/^# \{0,1\}//'
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
echo "  point CI at it:  gh variable set RUNNER_LABEL --body self-hosted"
echo "  put CI back:     gh variable delete RUNNER_LABEL"
