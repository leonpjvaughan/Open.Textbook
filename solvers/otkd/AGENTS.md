# AGENTS.md — otkd

This package lives at `solvers/otkd` in the **Open.Textbook** repository. It is **otkd**, the
engine behind a textbook about modelling: config files in, mathematical problems out. It
reads a mechanism's topology, geometry and study, derives the residual and its Jacobian
symbolically, and hands them to a solver or an emitter. A suspension corner is the first
subject; nothing in the config layer knows what a wishbone is.

The code is small and the prose is not. The documents are the design record — read them
before changing a contract, and update them in the same commit as the code.

## Where to look

Start at [`docs/README.md`](docs/README.md), then the document that states the contract you
are changing: [`docs/config-layer.md`](docs/config-layer.md) (§10 for an example) with
[`examples/constraints.yaml`](examples/constraints.yaml);
[`docs/problem-mapping.md`](docs/problem-mapping.md) (§8 for an example), for the derivation,
solvers and diagnostics; [`docs/entry-points.md`](docs/entry-points.md) and
[`docs/naming.md`](docs/naming.md) for the CLI, API and errors;
[`docs/wasm.md`](docs/wasm.md) for the compiled kernel; [`docs/dynamics.md`](docs/dynamics.md),
[`docs/ui.md`](docs/ui.md) and [`docs/follow-ups.md`](docs/follow-ups.md) for the rest.

## Ground rules

- **There is no separate release any more.** The package moved into `Open.Textbook` on
  2026-10-26 and `suspension-kinematics` is archived. Its version is the collection's tag,
  read by `hatch-vcs` from the repository root; the commit is the provenance, and the bundle
  records it. Nothing is published to PyPI.
- **`uv` + `hatchling` + `src` layout, `requires-python >= 3.12`.** Add a dependency only with
  a reason in `pyproject.toml`.
- **No hand-differentiation, anywhere.** The residual and the Jacobian come from sympy. If a
  derivative is needed at solve time, differentiate the symbolic expression numerically
  rather than writing it down.
- **Emitted artefacts are committed and reproducible.** `out.js` and the kernel sources must
  be byte-identical on regeneration; the `.wasm` is a toolchain artefact tested by behaviour.
  Never put a value in an artefact that changes without a release (a git-derived version, a
  timestamp).
- **Type hints everywhere; pydantic for anything a user writes in YAML.** A configuration
  error is a list of faults naming file, key and expectation — never a silent default.
- **Comments say why.** Match the tone of the documents: calm, specific, no exclamation
  marks.
- **Change a contract deliberately.** Update the document that states it in the same commit
  and give the reason in the commit message.

## Solver findings are teaching material

This package exists to be explained, so a finding is not finished when the code is fixed — it
is finished when the textbook can teach it.

- Say in the commit whether `books/maths-applied/` could use the finding: a figure, a worked
  step, a "here is how you would know" box.
- The ones worth the most have a **tell** — a measurement that separates two explanations: an
  energy error that did not shrink when the step was quartered, a residual that did not move
  when the load changed by three orders of magnitude. Name the insight, the measurement and
  where it came from; do not write the chapter's prose here.

## Commands

```console
$ uv sync                                   # install this project (from solvers/otkd)
$ uv run pytest -q                          # the whole suite, ~2 minutes
$ uv run --project solvers/otkd pytest -q   # the same, from the repository root
$ uv run otkd check examples/double-wishbone
$ uv run otkd solve examples/double-wishbone
$ uv run otkd emit examples/double-wishbone examples/double-wishbone/out.js
$ uv run otkd emit <model> <dir> --format wasm    # generated Rust kernel
$ uv run python scripts/build_release.py --version <v> --out dist --package
```

`uv run pytest` from this directory uses this project's `testpaths`; from the repository root
it collects the site's tests against this environment, which is why the CI job starts pytest
here.

The version is the **collection's tag**, read by `hatch-vcs` into
`src/open_textbook/otkd/_version.py` at install time; no version text is written by hand. It
is why `scripts/build-otkd.sh` sets `SETUPTOOLS_SCM_PRETEND_VERSION` when it builds a bundle
from a checkout without tags. The bundle's `MANIFEST.json` records the commit and the
compiler: that is the provenance.

## End every run with this

Three short sections, in this order, no preamble: **a table** of what changed or was verified
(one row per item, with the evidence); **issues**, one line each, with the proposed solution,
marked **decision needed** where the author must choose, and a failing check first; and
**remaining tasks** in order, each small enough to start without another conversation. If a
section would be long, the run did too much and the detail belongs in a document.
