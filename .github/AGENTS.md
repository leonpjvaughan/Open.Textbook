# AGENTS.md — CI

`.github/` holds the workflows that verify, release and deploy, plus the
dependabot configuration. `verify.yml` is the gate; `rollback.yml` is manual and
restores an earlier Worker version.

Read the root `AGENTS.md` first. The root's **Build and verify**, **Branches and
releases** and **Toolchain** still apply. This file adds what is particular to
CI.

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
