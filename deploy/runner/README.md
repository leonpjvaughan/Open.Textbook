# A self-hosted runner on this machine

The gate runs on GitHub's runners by default. This runs it here instead: useful when the
Actions minutes are spent, and faster on the second run because Chrome, `node_modules`
and the checkout are already on disk.

```bash
deploy/runner/start.sh                       # build, register, start
gh variable set RUNNER_LABEL --body self-hosted   # point CI at it
deploy/runner/start.sh --logs                # watch it pick up a job
gh variable delete RUNNER_LABEL              # put CI back on ubuntu-latest
deploy/runner/start.sh --stop                # deregister and remove
```

The workflow reads `vars.RUNNER_LABEL` and falls back to `ubuntu-latest`, so pointing CI
at this runner is a repository variable and not a commit. Nothing about the gate is
different on it: `scripts/check.sh` and `scripts/preview-themes.sh` are the same scripts,
and the same sums decide.

## What the image holds, and what it deliberately does not

`Dockerfile` installs three things: **Chrome**, the **runner**, and the fonts and
libraries a headless browser needs. Chrome is the reason the image exists at all — the
preview job measures every figure's paint and its label size at two viewports, so a
runner whose browser comes from the host is a runner that works on one machine.

Everything the workflow installs for itself is left alone: Node through
`actions/setup-node`, uv through `astral-sh/setup-uv`, the Playwright client through
`npm`. A copy here would be a second version to keep in step, and `tsconfig.json`'s
`types: ["node"]`, `package-lock.json` and `uv.lock` are the ones that decide.

The runner release is pinned by version **and checksum** and the checksum is verified
before the tarball is unpacked, so a download that changes fails the build.

## The Docker socket, and what it costs

The compose file mounts `/var/run/docker.sock` because one job is a Docker action
(`rhysd/actionlint`) and it pulls an image to run in. **A job that can reach the Docker
daemon can mount the host filesystem, so this is equivalent to root on this machine.**
That is acceptable here only because:

- the repository is **private**, so a workflow run is started by a collaborator, not by
  anyone who can open a pull request;
- no job is given a secret (`permissions: contents: read` and nothing else);
- the runner is not in the `docker` group on the host — the container is given the
  socket's group id by `start.sh`, so the host's own user permissions are unchanged.

If the repository is ever made public, **stop the runner**: on a public repository a fork
can open a pull request whose workflow executes here. The variable-driven `runs-on` means
that is `gh variable delete RUNNER_LABEL`, not a revert.

## Where the pieces are

| File | Role |
|---|---|
| `Dockerfile` | Chrome, the pinned runner, the fonts |
| `docker-compose.yml` | the service, the socket, the work volume |
| `entrypoint.sh` | configure on first start, then `exec ./run.sh` |
| `start.sh` | mint a token with `gh`, set the socket's gid, start or stop |

The runner registers as `<hostname>-open-textbook` with `self-hosted,linux,x64`. It
deregisters on `docker compose down`; a ghost left online is at
*Settings → Actions → Runners*.

## Limits worth knowing

- **One job at a time.** A single runner takes one job, so the matrix queues. The gate's
  longest job is `theme preview` at about fifteen minutes, and it is the one to speed up
  before adding a second runner.
- **The work directory is a named volume**, so a rerun does not re-clone. `checkout`
  cleans it per job; nothing else is expected to persist.
- **The token is passed through the environment**, so it appears in the container's
  environment for its one-minute life. It is exchanged on first start and then useless.
