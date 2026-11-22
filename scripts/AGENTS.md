# AGENTS.md — developer entry points

**`scripts/` is shell only**: it orchestrates Python and Node processes and
branches on their exit codes. The Node checks and measurements are one package
with one entry point, `tools` — see `tools/AGENTS.md` and
`node tools/dist/cli.js help`. Read the root `AGENTS.md` first.

## What lives here

| Script | What it does |
|---|---|
| `scripts/check.sh` | **Everything CI enforces, in one call.** Run before pushing |
| `scripts/build-all.sh` | Every profile, `BUILD_JOBS` at a time (default 4), then the portal. **One job in CI, not one matrix row per profile** |
| `scripts/preview-themes.sh` | Every bundle in both schemes over three routes, plus both figure audits. `--built` audits the existing `site/`; CI passes the build job's artefact |
| `scripts/deploy.sh` | Build and deploy to Cloudflare; follows the reader's report route before uploading. `--built` deploys the existing `site/` |
| `scripts/check-contact.sh` | Follow the About page's contact URL as a signed-out reader; `deploy.sh` runs it so a private or renamed repository fails the deploy, not the reader |
| `scripts/next-tag.sh` | Print the next release tag, `yy.<day>.<increment>` |
| `scripts/protect-main.sh` | Require the gate check on `main` (public repository, or GitHub Pro) |
| `scripts/build-otkd.sh` | Build the `otkd` bundle — model exports and kernels — from `solvers/otkd` into `books/maths-applied/docs/assets/data/otkd/`. `--verify` is the offline digest check in `check.sh`; `--check` rebuilds and diffs in the changed-path CI job |
| `scripts/build-solvers.sh` | Build every `ot-solve` kernel to wasm into `assets/data/solvers/`. `--check` rebuilds to a temp directory and fails if committed bytes differ; `--verify` is the offline digest check in `check.sh`; no argument writes the bundle. Both build paths export `solvers/rust-toolchain.toml`'s channel as `RUSTUP_TOOLCHAIN` and refuse to compile when the answering `rustc` is not that channel — the pin outranks `mise`, which exports `stable` |
| `scripts/check-solvers.mjs` | Replay each kernel's `selftest.json` against the wasm in Node, as the loader does. `check.sh` runs it, so a stale artefact or moved offset fails locally, not in a figure |
| `scripts/fetch_sources.sh` | Fetch tracked primary sources into `research/sources/` |

This file is the only agent context here.

## Rules local to the scripts

- **`scripts/check.sh` is the gate.** When the CI steps change, change it there;
  it is the single local command that matches CI. It runs
  `node tools/build.mjs` first, because the compiled TypeScript is committed and
  the drift check diffs it.
- **Shellcheck matters.** `actionlint` only runs shellcheck when it is on `PATH`;
  it is there in CI but not by default locally. Check with
  `command -v shellcheck` before trusting a local run.
- **`next-tag.sh` reads tags from the GitHub API**, not a local clone; `REPO` and
  `TZ` are overridable so `tests/test_release.py` can drive it.
- **Keep scripts executable and shellcheck-clean**, and quote every expansion.

## Common tasks

- **The whole gate** — `scripts/check.sh`.
- **Everything else** — `node tools/dist/cli.js help`, or `npm run <name>`.
- **Releasing** — `scripts/next-tag.sh`; the scheme is pinned by
  `tests/test_release.py`.

## Read next

`tools/AGENTS.md`, `.github/AGENTS.md`, and the root's **Build and verify**.
