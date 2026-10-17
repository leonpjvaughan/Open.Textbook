#!/usr/bin/env bash
# Configure the runner on first start, then run it.
#
# Registration is by token, so the token is read from the environment and never written
# to disk: `config.sh` exchanges it for the runner's own credentials and the token is
# then useless. A restart reuses `.runner`, so only the first start needs one.
set -euo pipefail

if [[ -z "${REPO_URL:-}" || -z "${RUNNER_TOKEN:-}" ]]; then
  echo "REPO_URL and RUNNER_TOKEN must be set; see README.md" >&2
  exit 2
fi

if [[ ! -f .runner ]]; then
  ./config.sh \
    --url "${REPO_URL}" \
    --token "${RUNNER_TOKEN}" \
    --name "${RUNNER_NAME:-$(hostname)}" \
    --labels "${RUNNER_LABELS:-self-hosted,linux,x64}" \
    --work _work \
    --unattended \
    --replace
fi

# `exec` so the runner is PID 1 and the container's stop signal reaches it: a runner
# that is told to stop deregisters, and one that is killed leaves a ghost online.
exec ./run.sh
