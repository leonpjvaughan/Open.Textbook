# A self-hosted runner on this machine

The gate runs on GitHub's runners by default. This runs it here instead: useful when the
Actions minutes are spent, and faster on the second run because Chrome, `node_modules`
and the checkout are already on disk.

```bash
deploy/runner/start.sh          # build, register, start four runners
deploy/runner/start.sh --status # containers, their registrations, where CI runs
deploy/runner/start.sh --logs   # watch them pick up jobs
deploy/runner/start.sh --prune  # remove registrations left offline
deploy/runner/start.sh --stop   # deregister and remove
```

**CI runs on `ubuntu-latest`, and this fleet is the warm fallback.** The hosted runners
give every job its own machine, which is what the otkd split and the parallel gate
need; the fleet is kept up because the second run here is much faster, with Chrome,
`node_modules` and the checkout already on disk.

**There is no variable to set.** `runs-on` used to be
`${{ vars.RUNNER_LABEL || 'ubuntu-latest' }}`, and that indirection was removed on
purpose: a repository setting deciding which machine runs a job is a dependency
nobody can see in the workflow. To point CI here, edit `runs-on:` in
`.github/workflows/verify.yml` for the jobs you want; nothing else about the gate
changes.

A registration is minted on every start, and only `--stop` removes it. A rebuild that
replaces a container leaves its old registration behind, offline and forever, so
`--status` counts them and `--prune` deletes them:

```
$ deploy/runner/start.sh --status
4 container(s), 4 online, 0 offline
```

## What the image holds, and what it deliberately does not

`Dockerfile` installs three things: **Chrome**, the **runner**, and the fonts and
libraries a headless browser needs. It deliberately installs **no C toolchain**: the
Rust kernels in `solvers/` use Rust's own linker for both halves — `wasm32` for the
artefact and static `musl` for the host tests and build tool. Chrome is the reason the image exists at all — the
preview job measures every figure's paint and its label size at two viewports, so a
runner whose browser comes from the host is a runner that works on one machine.

Everything the workflow installs for itself is left alone: Node through
`actions/setup-node`, uv through `astral-sh/setup-uv`, the Playwright client through
`npm`. A copy here would be a second version to keep in step, and `tsconfig.json`'s
`types: ["node"]`, `package-lock.json` and `uv.lock` are the ones that decide.

The runner release is pinned by version **and checksum** and the checksum is verified
before the tarball is unpacked, so a download that changes fails the build.

## What a job on this runner can reach

**No Docker socket.** The compose file mounts two cache volumes and nothing else. It
used to mount `/var/run/docker.sock` for one Docker action (`rhysd/actionlint`), and a
job that can reach the daemon can mount the host filesystem, which is root on this
machine. The workflow installs actionlint as a checksummed binary now, so the socket
went with it and the runner is an ordinary unprivileged container.

**This repository is public**, which changes what a runner here may be asked to run. A
fork can open a pull request whose workflow executes on the machine it names: fork
pull requests from first-time contributors wait for approval, and a returning
contributor's do not. So the fleet is for `push`-only work, and it must not be the
target of a `pull_request` job. That is one of the reasons CI stays on
`ubuntu-latest`; the other is that each hosted job gets its own machine.

**No secret reaches a job that could run here.** The gate's jobs declare
`permissions: contents: read` and read no `secrets.*`. The two that do —
`tag and release` (`GITHUB_TOKEN`) and `deploy to production` (the Cloudflare token) —
are `main`-only and stay on hosted runners.

Stopping the fleet is `deploy/runner/start.sh --stop`; there is no variable to delete.

## Where the pieces are

| File | Role |
|---|---|
| `Dockerfile` | Chrome, the pinned runner, the fonts |
| `docker-compose.yml` | the service and the two cache volumes |
| `entrypoint.sh` | configure on first start, then `exec ./run.sh` |
| `start.sh` | mint a token with `gh`, start, inspect or stop |

The runner registers under the container's own hostname — a `--scale` replica cannot
take a name from the environment without three of the four colliding — with the labels
`self-hosted,linux,x64`. It deregisters on `docker compose down`, which is what
`--stop` runs. A ghost left online by a rebuild is removed by `--prune`, not by hand in
*Settings → Actions → Runners*.

## Limits worth knowing

- **One job at a time.** A single runner takes one job, so the matrix queues. The gate's
  longest job is `theme preview` at about fifteen minutes, and it is the one to speed up
  before adding a second runner.
- **The work directory is a named volume**, so a rerun does not re-clone. `checkout`
  cleans it per job; nothing else is expected to persist.
- **The token is passed through the environment**, so it appears in the container's
  environment for its one-minute life. It is exchanged on first start and then useless.
