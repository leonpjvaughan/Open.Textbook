#!/usr/bin/env bash
# Build, check or verify the `ot-solve` wasm bundle.
#
#   scripts/build-solvers.sh            rebuild assets/data/solvers/ in place — the authoring step
#   scripts/build-solvers.sh --check    rebuild into a temporary directory and diff — CI's job
#   scripts/build-solvers.sh --verify   check the committed tree against SHA256SUMS, offline
#
# The split is deliberate. The deploy and the local gate ship and verify committed bytes,
# with no Rust toolchain. Only the CI job that owns `solvers/` rebuilds, and it rebuilds
# to compare rather than to ship: a difference is a red gate, not a new artefact.
#
# The toolchain is pinned in `solvers/rust-toolchain.toml`, and both build paths put that
# pin back into the environment before compiling — see `require_pinned_toolchain`. Bump
# the pin in its own commit, with the wasm diff as the evidence.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TREE="$ROOT/assets/data/solvers"
BIN="$ROOT/solvers/target/x86_64-unknown-linux-musl/debug/ot-solve-build"

usage() {
  # The header comment, and nothing below it: a line range went stale the moment a
  # sentence was added, and `--help` printed `set -euo pipefail` and the ROOT assignment.
  awk 'NR > 1 && /^#/ { sub(/^# ?/, ""); print; next } NR > 1 { exit }' "$0"
}

pinned_channel() {
  sed -n 's/^[[:space:]]*channel[[:space:]]*=[[:space:]]*"\([^"]*\)".*/\1/p' \
    "$ROOT/solvers/rust-toolchain.toml"
}

# Put the repository's pin back into the environment, and stop if it is not the compiler
# that will be used.
#
# `rustup` lets `RUSTUP_TOOLCHAIN` win over a `rust-toolchain.toml`, and `mise` exports it
# as `stable`. So `--check` on a developer machine rebuilt the bundle with 1.100.0 and
# reported "the committed bundle is not what the source builds — commit what it writes",
# which is the one instruction that would replace the repository's bytes with another
# compiler's. The pin is exported here rather than trusted: the wasm is the compiler's
# business, and the environment is not evidence about which compiler it was.
#
# The build spawns `cargo` per kernel and a `rustc --version` for the bundle manifest, so
# this is an export and not a local — both have to see it.
require_pinned_toolchain() {
  local pinned used
  pinned="$(pinned_channel)"
  if [ -z "$pinned" ]; then
    echo "build-solvers: solvers/rust-toolchain.toml names no channel, so no build here can be reproduced." >&2
    exit 2
  fi
  export RUSTUP_TOOLCHAIN="$pinned"
  if ! used="$( cd "$ROOT/solvers" && rustc --version | awk '{print $2}' )"; then
    used=""
  fi
  case "$used" in
    "$pinned" | "$pinned"-*) return 0 ;;
  esac
  if [ -z "$used" ]; then
    echo "build-solvers: the pinned toolchain is not usable here." >&2
  else
    echo "build-solvers: the compiler is not the one this repository pins." >&2
    echo "  building with: $used" >&2
  fi
  cat >&2 <<EOF
  pinned:        $pinned (solvers/rust-toolchain.toml)
  The .wasm bytes are the compiler's, so a build from anything else is not this bundle.
  Install the pin and run this again:
    rustup toolchain install $pinned --profile minimal \\
      --target wasm32-unknown-unknown,x86_64-unknown-linux-musl
EOF
  exit 2
}

build_tool() {
  ( cd "$ROOT/solvers" && cargo build --locked -p ot-solve-build >/dev/null )
}

case "${1:-}" in
  --check)
    require_pinned_toolchain
    build_tool
    tmp="$(mktemp -d)"
    trap 'rm -rf "$tmp"' EXIT
    "$BIN" --out "$tmp/solvers" >/dev/null
    if ! diff -r "$tmp/solvers" "$TREE"; then
      echo >&2
      echo "build-solvers: the committed bundle is not what the source builds with $RUSTUP_TOOLCHAIN." >&2
      echo "  Run scripts/build-solvers.sh and commit what it writes." >&2
      exit 1
    fi
    echo "ot-solve: $(find "$TREE" -name kernel.wasm | wc -l) kernels, byte-identical to the source"
    ;;
  --verify)
    ( cd "$TREE" && sha256sum --quiet -c SHA256SUMS )
    echo "ot-solve: $(grep -c . "$TREE/SHA256SUMS") files verified from SHA256SUMS, offline"
    ;;
  "")
    require_pinned_toolchain
    build_tool
    "$BIN" --out "$TREE"
    ;;
  -h | --help)
    usage
    ;;
  *)
    echo "build-solvers: unknown argument '$1' (try --help)" >&2
    exit 2
    ;;
esac
