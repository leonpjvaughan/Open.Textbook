# AGENTS.md — CI

`.github/` holds the workflows that verify, release and deploy, plus the
dependabot configuration. `verify.yml` is the gate; `rollback.yml` is manual and
restores an earlier Worker version.

Read the root `AGENTS.md` first. The root's **Build and verify**, **Branches and
releases** and **Toolchain** still apply. This file adds what is particular to
CI.

## The three-minute rule

**A check that takes three minutes does not belong in the default path.** Two do more
than that when run naively, and both were fixed rather than excused:

| Check | Was | Now | What made it slow |
|---|---|---|---|
| `scripts/preview-themes.sh` (whole) | ~15 min | **194 s** | the build ran one profile at a time, then six independent browser checks ran one after another |
| `audit --mobile` | >7 min | **95 s** | it walked *every route a figure appears on* — the same figure on `ordinary` and `higher` measured twice — at a fixed 300 ms a page |
| `audit` (contrast) | 284 s | **91 s** | a fixed 500 ms wait per page; it now waits for the figure to mount |
| `readout` | 220 s | **116 s** | same fixed wait, plus an exhaustive settings sweep, now a sample |

The script now builds four profiles at a time and runs its six checks **concurrently**,
so the wall clock is the longest check rather than the sum. The one thing not to do is
parallelise the audits *internally* beyond one worker: at two workers eleven slugs fail
with "Execution context was destroyed" and pass alone, and `--jobs` is left at 1 for
that reason.

`preview` is therefore **gated**: it runs on `main` (which releases and deploys) and on
`workflow_dispatch`, and on a branch only when the PR carries the `browser` label or
`CI_BROWSER=always` is set. The gate announces a skip by name, so "not run" is never
read as "passed". Locally, `scripts/check.sh` does not run it; run
`scripts/preview-themes.sh` before merging anything that touches a figure, a theme or a
stylesheet.

## What lives here

| Path | What it does |
|---|---|
| `.github/workflows/verify.yml` | The gate: generated files, banks, voice, tests, both tier builds, no `math-error`, drift, actionlint; then release and deploy on `main` |
| `.github/workflows/rollback.yml` | Manual rollback of production to an earlier Worker version |
| `.github/dependabot.yml` | Dependency updates |

## Rules local to CI

- **A workflow change is inert until it reaches `main`.** The pipeline that runs
  is the one on the branch being pushed, and the release and deploy jobs only
  ever run from `main`. Editing `verify.yml` on `dev` changes nothing about what
  happens on a push to `main` until the merge; pushing it straight to `main`
  deploys. See the root's **Branches and releases**.
- **`dev` verifies, `main` releases and deploys.** The release and deploy jobs
  require `refs/heads/main`, so they are skipped elsewhere by construction rather
  than by remembering to guard them.
- **Adding a book edits no workflow.** The build matrix is derived from
  `books/*/book.yaml` through `python -m textbook.plan --github-matrix`.
- **`actionlint` only runs shellcheck when shellcheck is on `PATH`.** It is on
  `PATH` in CI but not by default locally, so a whole class of workflow error
  can pass locally and fail the `lint workflows` job. Check with
  `command -v shellcheck`; the root's **Toolchain** has the rest.
- **Pin actions to a commit SHA**, as the existing workflows do, and keep the
  top-of-file comment that explains the branch policy.
- **CI installs no compiler for a vendored binary.** `books/maths-applied/docs/assets/
  data/package/` holds a WebAssembly solver built from the `suspension-kinematics`
  package; it is committed, and `tests/test_maths_applied_data.py` checks it by
  sha256 against a provenance record rather than by rebuilding it. Regenerating it is
  an authoring step on a machine with Rust and the `wasm32-unknown-unknown` target,
  never a job here — a CI that builds a binary the page ships would let the two
  disagree silently.
- **`rollback.yml` is manual on purpose.** A rollback is not the moment to
  discover an automated path for the first time; it must never be cancelled
  in flight.

## Common tasks

- **Reproducing the gate locally** — `scripts/check.sh`, which is meant to match
  the CI steps.
- **Changing what CI runs** — change `.github/workflows/verify.yml` and
  `scripts/check.sh` together, and land it through `dev`.
- **Adding a dependency update** — `.github/dependabot.yml`.

## Read next

`scripts/AGENTS.md` for the entry points CI calls, `deploy/AGENTS.md` for the
deploy stages, and the root's **Branches and releases**.
