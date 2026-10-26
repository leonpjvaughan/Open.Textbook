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
