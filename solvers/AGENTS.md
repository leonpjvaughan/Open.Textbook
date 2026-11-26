# AGENTS.md — the solvers

`solvers/` holds the code that computes a page's numbers. It is not content and not the site:
a figure imports a kernel from here, the build copies the result into `assets/data/solvers/`,
and the page reads it. `ABI.md` beside this file is the contract.

```
solvers/
├── Cargo.toml            # the Rust workspace
├── rust-toolchain.toml   # the pinned channel and the wasm target
├── ot-solve/             # the hand-written numerical kernels
├── ot-solve-build/       # the build tool: manifest, selftest, module, sums
└── otkd/                 # the mechanism compiler, a project of its own
```

## Two producers, one contract

- **`ot-solve`** is the generic library: diffusion, waves, conjugate gradients, Newton, power
  iteration, gradient descent, Monte Carlo. Written by hand.
- **`otkd`** is the mechanism compiler: a model's residual and Jacobian derived with SymPy,
  printed as Rust and compiled. It has its own ABI (`otkd-kernel-2`) until the shared
  contract has been used by both in a page; then it moves once, with a version bump. Do not
  mix the two in one figure before then.

## The rules

- **A kernel reports, it does not trap.** Every failure is a `Status`; a figure must be able
  to draw a growing field, not an empty rectangle and a stack trace.
- **The arena is fixed.** No allocator, no growth; capacity is compile-time and `cells`
  chooses how much is used. An output beyond `cells` is cleared by `init`, so a stale byte
  cannot survive a parameter change.
- **Every number has a name.** Parameters and outputs are declared in Rust; the manifest is
  generated from that declaration; a figure reads by name. A hidden index is a defect.
- **The manifest is generated, never written.** If a figure needs a number, add an output; if
  a control needs a range, add a `Param`. Do not edit `manifest.json`.
- **Determinism.** No clock, no unseeded randomness, no threads. A sampler takes its seed from
  a parameter.
- **A simulated number is not a claim.** `claim()` is for arithmetic the CAS can prove; a
  number from a time step is proved by the selftest. Do not `claim()` it, or print it as
  exact.
- **One artifact per kernel.** The page downloads only what it mounts; the wasm is inlined in
  `kernel.js`, and the separate `kernel.wasm` is provenance.
- **No colour, no size, no hand-written `<text>`.** Figures go through the kit; `assets/AGENTS.md`
  is binding.

## Build and vendor

```console
$ scripts/build-solvers.sh            # rebuild assets/data/solvers/
$ scripts/build-solvers.sh --check    # rebuild to a temp dir and diff; CI's job
$ scripts/build-solvers.sh --verify   # verify SHA256SUMS, no Rust needed
$ node scripts/check-solvers.mjs      # replay every selftest through the JS loader
```

The built tree is **committed**: the deploy and local gate verify it offline, and CI's
`solvers` job rebuilds and compares without writing what ships — `build to compare, never to
ship`. A difference is a red gate, not a new artifact. The toolchain is pinned in
`rust-toolchain.toml`; the wasm bytes depend on the compiler, so bumping it is its own commit
with the byte diff as evidence.

**There is no C or C++ toolchain.** The wasm half is `wasm32-unknown-unknown`, linked by
`rust-lld`; the host half is static Rust on `x86_64-unknown-linux-musl`, also `rust-lld`
(`.cargo/config.toml`). Rust's default host linker is `cc`, which needs the system C runtime;
that is why a host build once looked like a C dependency.

## otkd

`otkd` is a nested `uv` project with its own `uv.lock`, deliberately **not** a member of the
root workspace, because NumPy and SciPy would then be installed for every site job. Some of its
tests compile a kernel, so CI splits the suite across three hosted-runner jobs
(`otkd tests`, `otkd kernels`, `otkd bundle`), all gated on `solvers/otkd/` changing. A branch
runs the fast suite on its own (`otkd (dev)`). The local gate and deploy only run
`scripts/build-otkd.sh --verify`, which needs no toolchain.

`--check` compares the rebuilt trees **structurally**, not byte for byte: a different BLAS
moves the last bits of a solved equilibrium, and that is not a change to the model. The
bundle at `books/maths-applied/docs/assets/data/otkd/` is built from `solvers/otkd`, not
downloaded. **A rebuild that changes a number is a reviewable change, not drift.**

## Adding a kernel

`ABI.md` has the four steps: a module, a feature, a line in the registry, a figure. The
loader, the manifest and the selftest need no new code.
