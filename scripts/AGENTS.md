# AGENTS.md — developer entry points

`scripts/` holds thin entry points. They orchestrate the engine's modules; they
do not implement rendering, verification or deployment logic themselves. If a
script grows a real algorithm, it belongs in `engine/textbook/` and the script
should call it.

Read the root `AGENTS.md` first. The root's **Build and verify**, **Branches and
releases** and **Toolchain** still apply. This file adds what is particular to
the scripts.

## What lives here

| Script | What it does |
|---|---|
| `scripts/check.sh` | **Everything CI enforces, in one call.** Run this before pushing |
| `scripts/deploy.sh` | Build the collection and deploy it to Cloudflare |
| `scripts/next-tag.sh` | Print the next release tag, `yy.<day>.<increment>` |
| `scripts/protect-main.sh` | Require the gate check on `main` (needs GitHub Pro) |
| `scripts/fetch_sources.sh` | Fetch the tracked primary sources into `research/sources/` |
| `scripts/screenshot.cjs` | Capture built pages to images for review |
| `scripts/check-mobile.cjs` | Check the mobile layout |
| `scripts/measure-budget.cjs` | Measure a page against the extras budget |
| `scripts/preview-themes.sh` | Preview the theme bundles |

The `*.md` prompts (`agent-prompt.md`, `review-prompt.md`, `glossary-prompt.md`)
are the briefs the launch scripts feed to sub-agents.

## Rules local to the scripts

- **`scripts/check.sh` is the gate.** When the CI steps change, change it there;
  it is meant to be the single local command that matches CI.
- **Shellcheck matters.** `actionlint` only runs shellcheck when it is on
  `PATH`, and it is on `PATH` in CI but not by default locally. Check with
  `command -v shellcheck` before trusting a local run — see the root's
  **Toolchain**.
- **`next-tag.sh` reads tags from the GitHub API**, not from a local clone, and
  `REPO` and `TZ` are overridable so `tests/test_release.py` can drive it.
- **`screenshot.cjs` needs a real route→file mapping.** A route without the file
  extension 404s, and every capture then returns the same page. Check that the
  captures differ before reviewing them — see the root's **Toolchain**.
- **Keep scripts executable and shellcheck-clean**, and quote every expansion.

## Common tasks

- **Running the whole gate** — `scripts/check.sh`.
- **Capturing a page** — `node scripts/screenshot.cjs <dir> <out> --schemes … -- "<route>:<file>"`.
- **Releasing** — `scripts/next-tag.sh`; the scheme is pinned by
  `tests/test_release.py`.

## Read next

`.github/AGENTS.md` for the workflow that calls these, and the root's **Build
and verify** for the underlying commands.
