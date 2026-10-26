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
# The toolchain is pinned in `solvers/rust-toolchain.toml`. Bump it in its own commit,
# with the wasm diff as the evidence.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TREE="$ROOT/assets/data/solvers"
BIN="$ROOT/solvers/target/x86_64-unknown-linux-musl/debug/ot-solve-build"

usage() {
  sed -n '2,16p' "$0" | sed 's/^# \{0,1\}//'
}

build_tool() {
  ( cd "$ROOT/solvers" && cargo build --locked -p ot-solve-build >/dev/null )
}

case "${1:-}" in
  --check)
    build_tool
    tmp="$(mktemp -d)"
    trap 'rm -rf "$tmp"' EXIT
    "$BIN" --out "$tmp/solvers" >/dev/null
    if ! diff -r "$tmp/solvers" "$TREE"; then
      echo >&2
      echo "build-solvers: the committed bundle is not what the source builds." >&2
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
