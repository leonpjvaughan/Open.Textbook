# AGENTS.md — the solvers

`solvers/` holds the code that computes a page's numbers. It is not content, and it is
not the site: a figure imports a kernel from here, the build copies the result into
`assets/data/solvers/`, and the page reads it.

Read the root `AGENTS.md` first. `ABI.md` beside this file is the contract.

```
solvers/
├── Cargo.toml            # the Rust workspace
├── rust-toolchain.toml   # the pinned channel and the wasm target
├── ot-solve/             # the hand-written numerical kernels
├── ot-solve-build/       # the build tool: manifest, selftest, module, sums
└── otkd/                 # the mechanism compiler, a project of its own
```

## Two producers, one contract

- **`ot-solve`** is the generic library: diffusion, waves, conjugate gradients, Newton,
  power iteration, gradient descent, Monte Carlo. It is written by hand.
- **`otkd`** is the mechanism compiler: a model's residual and Jacobian derived with
  SymPy, then printed as Rust and compiled. It has its own ABI (`otkd-kernel-2`) until
  the shared contract has been used by both in a page; then it moves once, with a
  version bump. Do not mix the two in one figure before then.

## The rules

- **A kernel reports, it does not trap.** Every failure is a `Status`. A figure must be
  able to draw a growing field, not an empty rectangle and a stack trace.
- **The arena is fixed.** No allocator, no growth. Capacity is compile-time; `cells`
  chooses how much is used. An output beyond `cells` is cleared by `init`, so a stale
  byte cannot survive a parameter change.
- **Every number has a name.** Parameters and outputs are declared in Rust; the
  manifest is generated from that declaration; a figure reads by name. A hidden index
  is a defect.
- **The manifest is generated, never written.** If a figure needs a number, add an
  output; if a control needs a range, add a `Param`. Do not edit `manifest.json`.
- **Determinism.** No clock, no unseeded randomness, no threads. A sampler takes its
  seed from a parameter.
- **A simulated number is not a claim.** `claim()` is for arithmetic the CAS can prove.
  A number that came out of a time step is proved by the selftest, not by SymPy. Do not
  `claim()` it, and do not print it as exact.
- **One artifact per kernel.** The page downloads only what it mounts. The wasm is
  inlined in `kernel.js`; the separate `kernel.wasm` is provenance.
- **No colour, no size, no hand-written `<text>`.** Figures go through the kit:
  `fig-*` classes, `SIZE`, `label()`, `scale()`. `assets/AGENTS.md` is binding.

## Build and vendor

```console
$ scripts/build-solvers.sh            # rebuild assets/data/solvers/
$ scripts/build-solvers.sh --check    # rebuild to a temp dir and diff; CI's job
$ scripts/build-solvers.sh --verify   # verify SHA256SUMS, no Rust needed
$ node scripts/check-solvers.mjs      # replay every selftest through the JS loader
```

The built tree is **committed**. The deploy and the local gate verify it offline; the
CI `solvers` job rebuilds and compares, and never writes what ships. That is the rule
`build to compare, never to ship`: a difference is a red gate, not a new artifact.

The toolchain is pinned in `rust-toolchain.toml`. The wasm bytes depend on the
compiler, so bumping it is its own commit, with the byte diff as the evidence.

**There is no C or C++ toolchain.** The wasm half is `wasm32-unknown-unknown`, linked
by `rust-lld`; the host half — the tests and the build tool — is static Rust on
`x86_64-unknown-linux-musl`, also linked by `rust-lld` (`.cargo/config.toml`). Rust's
default host linker is `cc`, which needs the system C runtime to make an ELF
executable; that is why a host build once looked like a C dependency. It never was
one, and now it is not needed either.

## otkd

`otkd` is a nested `uv` project with its own `uv.lock`; it is deliberately **not** a
member of the root workspace, because NumPy and SciPy would then be installed for
every site job. Its suite is 95 tests, 27 of which compile a kernel, so CI splits it
across three hosted-runner jobs (`otkd tests`, `otkd kernels`, `otkd bundle`), each
about three and a half minutes, and all three are gated on `solvers/otkd/` changing.
A branch runs the fast suite on its own (`otkd (dev)`). The local gate and the deploy
only run `scripts/build-otkd.sh --verify`, which needs no toolchain.

`--check` compares the rebuilt trees **structurally**, not byte for byte: see the note
in `.github/AGENTS.md`. A different BLAS moves the last bits of a solved equilibrium,
and that is not a change to the model.

The bundle at `books/maths-applied/docs/assets/data/otkd/` is built from
`solvers/otkd`, not downloaded. **A rebuild that changes a number is a reviewable
change, not drift**; the moved source was verified against the old release: every
payload and kernel byte-identical, only the generator and commit stamps differ.

## Adding a kernel

`ABI.md` has the four steps. In short: a module, a feature, a line in the registry, a
figure. The loader, the manifest and the selftest need no new code.
