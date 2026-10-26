#!/usr/bin/env bash
# Build, check or verify the `otkd` bundle the maths-applied book runs.
#
#   scripts/build-otkd.sh            rebuild books/maths-applied/docs/assets/data/otkd/
#   scripts/build-otkd.sh --check    rebuild to a temporary directory and diff — the
#                                    changed-path CI job's check
#   scripts/build-otkd.sh --verify   verify the committed tree against SHA256SUMS, offline
#
# `otkd` now lives in `solvers/otkd`. The bundle used to arrive as a GitHub release
# zip; the release existed to cross a repository boundary that no longer exists, so
# the source is the input and the commit is the provenance.
#
# The build is about eight minutes and needs the otkd project's Python environment
# and the pinned Rust toolchain. It does not run in the default gate. The deploy and
# the local gate read the committed bytes and use `--verify`; the CI job that owns
# `solvers/otkd` rebuilds and compares, and never writes what ships.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROJECT="$ROOT/solvers/otkd"
TARGET="$ROOT/books/maths-applied/docs/assets/data/otkd"
usage() {
  sed -n '2,18p' "$0" | sed 's/^# \{0,1\}//'
}

# The collection's tag is the package version. `hatch-vcs` reads the same tag, so the
# bundle, the package and the site cannot name three different versions. `--verify`
# does not call this: a shallow clone can verify the bytes without its tags.
need_version() {
  VERSION="$(git -C "$ROOT" describe --tags --abbrev=0 2>/dev/null || true)"
  if [ -z "$VERSION" ]; then
    echo "build-otkd: the repository has no tag, so the bundle has no version" >&2
    echo "  A shallow clone needs its tags: git fetch --tags" >&2
    exit 1
  fi
}

build() {
  local out="$1"
  # Adopt the tag before building, so the installed package and the manifest agree.
  # The alternative is a development version in the bundle, which changes on every
  # commit and cannot be compared.
  SETUPTOOLS_SCM_PRETEND_VERSION="$VERSION" \
    uv sync --project "$PROJECT" --frozen --reinstall-package open-textbook-otkd >/dev/null
  SETUPTOOLS_SCM_PRETEND_VERSION="$VERSION" \
    uv run --project "$PROJECT" --frozen python "$PROJECT/scripts/build_release.py" \
      --version "$VERSION" --out "$out"
}

case "${1:-}" in
  --check)
    need_version
    tmp="$(mktemp -d)"
    trap 'rm -rf "$tmp"' EXIT
    build "$tmp" >/dev/null
    # The payloads and kernels must be byte-identical. Three files are not compared
    # directly: the README is hand-written; MANIFEST.json's `git` and `python` record
    # the commit and interpreter of the build, so they move with every checkout; and
    # SHA256SUMS covers the manifest, so it moves with them. The manifest is compared
    # with those two fields removed, and each tree's own sums are verified.
    if ! diff -r --exclude=README.md --exclude=MANIFEST.json --exclude=SHA256SUMS "$tmp/bundle" "$TARGET"; then
      echo >&2
      echo "build-otkd: the committed bundle is not what solvers/otkd builds." >&2
      echo "  Run scripts/build-otkd.sh and commit what it writes." >&2
      exit 1
    fi
    python3 - "$tmp/bundle/MANIFEST.json" "$TARGET/MANIFEST.json" <<'PYTHON'
import json, sys
left, right = (json.load(open(path)) for path in sys.argv[1:3])
for manifest in (left, right):
    # The commit, the interpreter and the tag are build stamps. The payloads and the
    # kernels are the claim; a tag bump refreshes the label on the next rebuild.
    for key in ("git", "python", "version", "generator"):
        manifest.pop(key, None)
if left != right:
    print("build-otkd: the manifests differ beyond the build stamp", file=sys.stderr)
    raise SystemExit(1)
PYTHON
    ( cd "$tmp/bundle" && sha256sum --quiet -c SHA256SUMS )
    ( cd "$TARGET" && sha256sum --quiet -c SHA256SUMS )
    echo "otkd: $(find "$TARGET/models" -name kernel.wasm | wc -l) kernels, byte-identical to the source"
    ;;
  --verify)
    ( cd "$TARGET" && sha256sum --quiet -c SHA256SUMS )
    echo "otkd: $(grep -c . "$TARGET/SHA256SUMS") files verified from SHA256SUMS, offline"
    ;;
  "")
    need_version
    tmp="$(mktemp -d)"
    trap 'rm -rf "$tmp"' EXIT
    build "$tmp"
    rm -rf "$TARGET"
    cp -r "$tmp/bundle" "$TARGET"
    # The build copies wasm files out of a target directory, where the executable bit
    # is set; the committed tree is data, not a program.
    find "$TARGET" -type f -exec chmod 644 {} +
    # The README is the one hand-written file: it explains where the tree came from,
    # and it is not part of the bundle's digest.
    cat >"$TARGET/README.md" <<EOF
# The \`otkd\` bundle, built here

Written by \`scripts/build-otkd.sh\` from \`solvers/otkd\`. Do not edit anything here:
change the source in \`solvers/otkd\`, run the script, and commit what it writes.

| | |
|---|---|
| generator | \`otkd $VERSION\` |
| source | \`solvers/otkd\` in this repository |
| rustc | \`$(rustc --version)\` |

\`models/<name>/out.js\` is the model's static payload (\`meta\`, \`sweep.frames[]\`,
\`iterations[]\`, \`agreement\`); \`models/<name>/kernel/\` is its solver — \`kernel.js\` is
self-contained, with the WebAssembly binary inlined, so one import is all a page needs.
\`quarter-car\` has no payload: a dynamics study yields a trajectory, not a sweep, and
the manifest says so.

## The ground plane, and why the radius matters

The examples declare \`tyre-radius: 0.200\` with the wheel centre at \`z = 0.32\`, so the
ground is the tyre's lowest point at **\`z = 0.12\`**, not \`z = 0\`. The book adopts that
radius (\`GEOMETRY.tyreRadius\` in \`mechanism.js\`) and measures every height above the
ground from it, so §1.2's roll centre and the exported \`rc\` agree to **1 mm**. A page
that assumed a 0.32 m tyre on \`z = 0\` would report a roll centre 39 mm higher than the
payload's, which is what item 75 was about.

\`scripts/build-otkd.sh --verify\` verifies every file against \`SHA256SUMS\`, offline.
EOF
    echo "wrote $TARGET"
    ;;
  -h | --help)
    usage
    ;;
  *)
    echo "build-otkd: unknown argument '$1' (try --help)" >&2
    exit 2
    ;;
esac
