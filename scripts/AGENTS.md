# AGENTS.md — developer entry points

**`scripts/` is shell only, and that is the point.** It used to hold thirteen loose
files in three languages with no index: the name said `check-figure-kit` and the usage
was inside, in a comment, in a format only the author knew. The Node checks and
measurements are now one package with one entry point, `tools` — see `tools/AGENTS.md`
and run `node tools/dist/cli.js help`. What is left here orchestrates Python and Node
processes and branches on their exit codes, which is what bash is for.

Read the root `AGENTS.md` first. The root's **Build and verify**, **Branches and
releases** and **Toolchain** still apply.

## What lives here

| Script | What it does |
|---|---|
| `scripts/check.sh` | **Everything CI enforces, in one call.** Run this before pushing |
| `scripts/build-all.sh` | Every profile, `BUILD_JOBS` at a time (default 4), then the portal. **One job in CI, not one matrix row per profile**: 16 profiles in 43 seconds locally, against 13 rows at ~100 seconds each because every row paid its own install |
| `scripts/preview-themes.sh` | Every bundle in both schemes over three routes, plus both figure audits |
| `scripts/deploy.sh` | Build the collection and deploy it to Cloudflare; it follows the reader's report route before uploading |
| `scripts/check-contact.sh` | Follow the About page's contact URL as a signed-out reader would; `deploy.sh` runs it so a private or renamed repository fails the deploy, not the reader |
| `scripts/next-tag.sh` | Print the next release tag, `yy.<day>.<increment>` |
| `scripts/protect-main.sh` | Require the gate check on `main` (public repository, or GitHub Pro) |
| `scripts/build-otkd.sh` | Builds the `otkd` bundle — model exports and compiled kernels — from `solvers/otkd` into `books/maths-applied/docs/assets/data/otkd/`. `--verify` is the offline digest check in `check.sh`; `--check` rebuilds and diffs in the changed-path CI job |
| `scripts/fetch_sources.sh` | Fetch the tracked primary sources into `research/sources/` |
| `scripts/launch_chapter_agents.sh` | Feed `.agents/prompts/` to chapter sub-agents |
| `scripts/launch_review_agents.sh` | The same for the review prompts |

The `*.md` prompts that used to live here are now `.agents/prompts/` — the launch
scripts read them from there. Nothing in this directory is agent context any more
except this file.

## Rules local to the scripts

- **`scripts/check.sh` is the gate.** When the CI steps change, change it there; it is
  meant to be the single local command that matches CI. It runs `node tools/build.mjs`
  first, because the compiled TypeScript is committed and the drift check diffs it.
- **Shellcheck matters.** `actionlint` only runs shellcheck when it is on `PATH`, and it
  is on `PATH` in CI but not by default locally. Check with `command -v shellcheck`
  before trusting a local run — see the root's **Toolchain**.
- **`next-tag.sh` reads tags from the GitHub API**, not from a local clone, and `REPO`
  and `TZ` are overridable so `tests/test_release.py` can drive it.
- **Keep scripts executable and shellcheck-clean**, and quote every expansion.

## Common tasks

- **The whole gate** — `scripts/check.sh`.
- **Everything else** — `node tools/dist/cli.js help`, or `npm run <name>`.
- **Releasing** — `scripts/next-tag.sh`; the scheme is pinned by
  `tests/test_release.py`.

## Read next

`tools/AGENTS.md` for the checks and measurements, `.github/AGENTS.md` for the workflow
that calls these, and the root's **Build and verify** for the underlying commands.
