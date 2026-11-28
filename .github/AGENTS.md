# AGENTS.md — CI

`.github/` holds the workflows that verify, release and deploy, plus dependabot.
`verify.yml` is the gate; `rollback.yml` is manual and restores an earlier Worker version.
The root's **Build and verify**, **Branches and releases** and **Toolchain** apply.

## The three-minute rule

**A check that takes three minutes does not belong in the default path.** Fix it, not excuse
it: build profiles in parallel, run checks concurrently so the clock is the longest check
rather than the sum, and wait for a figure to mount, not a fixed delay. Never parallelise an
audit *internally*: at two workers eleven slugs fail with "Execution context was destroyed"
and pass alone, so `--jobs` stays 1.

`preview` is **a release gate**: it runs on a push to `main`, a `workflow_dispatch` on
`main`, and a pull request whose base is `main`. A pull request into `dev` skips it, and the
gate announces the skip by name, so "not run" is never read as "passed". `scripts/check.sh`
does not run it: run `scripts/preview-themes.sh` before merging anything that touches a
figure, a theme or a stylesheet.

Quote a full `workflow_dispatch` or `main` for the gate's clock, never a pull request into
`dev`, where preview is skipped by design and flatters the number. The gate stays under ten
minutes with the browser job included.

## Rules local to CI

- **`verify.yml` is the gate**: generated files, banks, voice, tests, both tier builds, no
  `math-error`, drift, actionlint; then release and deploy on `main`. `rollback.yml` is the
  manual rollback; `dependabot.yml` updates dependencies.
- **A workflow change is inert until it reaches `main`.** The pipeline runs from the pushed
  branch, release and deploy run only from `main`, and pushing `verify.yml` to `main`
  deploys.
- **`dev` verifies, `main` releases and deploys.** Release and deploy require
  `refs/heads/main`, so they are skipped elsewhere by construction.
- **Adding a book edits no workflow.** The matrix comes from `books/*/book.yaml` through
  `python -m textbook.plan --github-matrix`.
- **`actionlint` runs shellcheck only when it is on `PATH`** — true in CI, not by default
  locally, so a workflow error can pass locally and fail `lint workflows`. Check
  `command -v shellcheck`.
- **Pin actions to a commit SHA**, and keep the top-of-file note on the branch policy.
- **CI builds a vendored binary only to prove it.** `solvers/` holds the Rust kernels,
  `books/maths-applied/docs/assets/data/otkd/` the `otkd` bundle; both committed. A job may
  rebuild and fail on differing bytes, but may not write what ships: the deploy reads
  committed bytes and installs no compiler. `scripts/build-solvers.sh --check` and
  `scripts/build-otkd.sh --check` are those jobs; `--verify` is the offline check the local
  gate and the deploy run with no toolchain.
- **The otkd jobs are path-gated.** Each runs only when the push changed `solvers/otkd/` or
  `scripts/build-otkd.sh`, and prints the skip when it does not; a skipped job is green. The
  split into `otkd kernels`, `otkd tests` and `otkd bundle` is a hosted-runner decision.
- **The bundle check compares structure, and refuses only real movement.** Every byte must
  match except a floating-point number, which may differ by at most `1e-12` relative; an
  integer token must match exactly. A changed sign, step or cell count still fails, and the
  message names the file, the token and the difference.
- **The build is uploaded and reused.** `build every profile` writes `site/` and uploads it
  as the `site` artefact; the preview downloads it and runs
  `scripts/preview-themes.sh --built`, the deploy downloads it and runs
  `scripts/deploy.sh --built`. The deploy restamps only the root with the release tag
  (`textbook.portal`), created after the gate; the profiles are the verified bytes.
- **The full otkd validation is `main`-only.** A branch runs the Python suite without the
  kernel compiles; `main` runs it plus the kernel conformance tests and the bundle rebuild.
  The gate requires the right set for the ref and says so when the other is skipped.
- **CI runs on hosted runners.** `runs-on: ubuntu-latest` is written in the file, not a
  repository variable. `deploy/runner/README.md` records the self-hosted switch if the
  hosted minutes run out. **`rollback.yml` is manual on purpose**, and must never be
  cancelled in flight.

## Common tasks

- **Reproduce the gate locally** — `scripts/check.sh`.
- **Change what CI runs** — `.github/workflows/verify.yml` and `scripts/check.sh` together,
  landed through `dev`.
