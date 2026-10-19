#!/usr/bin/env bash
# Vendor the `otkd` bundle: the model exports and the compiled kernels this book runs.
#
# The `suspension-kinematics` package publishes one zip per tag, with a MANIFEST, a
# SHA256SUMS file and one directory per model. This script is the **only** way that
# bundle reaches the repository, and it does two different jobs:
#
#   scripts/vendor-otkd.sh            fetch the pinned release, verify its digest and
#                                     replace `books/maths-applied/docs/assets/data/otkd/`
#   scripts/vendor-otkd.sh --check    verify the committed tree against the bundle's own
#                                     SHA256SUMS, offline
#
# **Why the tree is committed and the fetch is not a build step.** The collection's rule
# is that a clone builds with no network, and generated files are drift-checked. A build
# that downloaded the bundle would break both. So the download is the refresh a person
# runs when `VERSION` changes, and CI runs `--check`, which needs nothing but the
# committed bytes. The package's own `docs/wasm.md` §6 allows exactly these two
# arrangements; this is the second, chosen for the rule above.
#
# **Pin the digest, not just the version.** A release asset can be deleted and uploaded
# again under the same tag. The version decides what a reader is told; the digest decides
# what arrives.
set -euo pipefail

# Both are bumped together, by a person, in one commit that also refreshes the tree.
VERSION="0.4.0"
ZIP_SHA256="4bcd68886092c4fd0aa3218967d091e4700f9e3bcaa4b7b80adf3fdacae08959"
OWNER="leonpjvaughan"
REPO="suspension-kinematics"

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET="$ROOT/books/maths-applied/docs/assets/data/otkd"

usage() {
  sed -n '2,24p' "$0" | sed 's/^# \{0,1\}//'
}

check() {
  local sums="$TARGET/SHA256SUMS"
  [ -f "$sums" ] || {
    echo "vendor-otkd: no bundle at $TARGET" >&2
    echo "  run scripts/vendor-otkd.sh to fetch $VERSION" >&2
    exit 1
  }
  local recorded
  recorded="$(grep -o 'otkd [0-9][^,]*' "$TARGET/MANIFEST.json" | head -1 || true)"
  if ! grep -q "\"generator\": \"otkd $VERSION\"" "$TARGET/MANIFEST.json"; then
    echo "vendor-otkd: the vendored bundle is not $VERSION ($recorded)" >&2
    exit 1
  fi
  # Every line except the Python distributions, which are the package rather than this
  # book's data and are therefore not vendored. The zip's digest still pins them.
  ( cd "$TARGET" && grep -v '  package/' SHA256SUMS | sha256sum --quiet -c - )
  echo "vendor-otkd: $VERSION verified, $(grep -c . "$sums") files, offline"
}

fetch() {
  # A script-level variable, not a local: the EXIT trap runs after the function has
  # returned, when a `local` is gone and `set -u` turns that into a crash.
  VENDOR_TMP="$(mktemp -d)"
  trap 'rm -rf "$VENDOR_TMP"' EXIT
  local url="https://github.com/$OWNER/$REPO/releases/download/$VERSION/otkd-$VERSION.zip"

  echo "vendor-otkd: fetching $url"
  curl -sSL -o "$VENDOR_TMP/bundle.zip" "$url"
  echo "$ZIP_SHA256  $VENDOR_TMP/bundle.zip" | sha256sum -c - >/dev/null
  unzip -q "$VENDOR_TMP/bundle.zip" -d "$VENDOR_TMP/unpacked"

  # The bundle's root is the zip's root: 0.4.0 has no `otkd-<version>/` prefix, and a
  # later version might. Find the MANIFEST rather than assuming either layout.
  local source
  source="$(dirname "$(find "$VENDOR_TMP/unpacked" -maxdepth 2 -name MANIFEST.json | head -1)")"
  [ -n "$source" ] || {
    echo "vendor-otkd: the zip has no MANIFEST.json" >&2
    exit 1
  }

  rm -rf "$TARGET"
  mkdir -p "$TARGET"
  # Everything the bundle ships except the Python distributions: the models and their
  # kernels are what a page can use, and the wheel is the package, not this book's data.
  cp -r "$source/MANIFEST.json" "$source/SHA256SUMS" "$TARGET/"
  cp -r "$source/models" "$TARGET/models"
  cat >"$TARGET/README.md" <<EOF
# The \`otkd\` bundle, vendored

Written by \`scripts/vendor-otkd.sh\`. Do not edit anything here: change \`VERSION\` in
that script, run it, and commit what it writes.

| | |
|---|---|
| generator | \`otkd $VERSION\` |
| release | <https://github.com/$OWNER/$REPO/releases/tag/$VERSION> |
| zip sha256 | \`$ZIP_SHA256\` |

\`models/<name>/out.js\` is the model's static payload (\`meta\`, \`sweep.frames[]\`,
\`iterations[]\`, \`agreement\`); \`models/<name>/kernel/\` is its solver — \`kernel.js\` is
self-contained, with the WebAssembly binary inlined, so one import is all a page needs.
\`quarter-car\` has neither: a dynamics study yields a trajectory, not a sweep, and the
manifest says so.

## The ground plane, and why the radius matters

The examples declare \`tyre-radius: 0.200\` with the wheel centre at \`z = 0.32\`, so the
ground is the tyre's lowest point at **\`z = 0.12\`**, not \`z = 0\`. The book adopts that
radius (\`GEOMETRY.tyreRadius\` in \`mechanism.js\`) and measures every height above the
ground from it, so §1.2's roll centre and the exported \`rc\` agree to **1 mm**. A page
that assumed a 0.32 m tyre on \`z = 0\` would report a roll centre 39 mm higher than the
payload's, which is what item 75 was about.

\`scripts/vendor-otkd.sh --check\` verifies every file against \`SHA256SUMS\`, offline.
EOF

  check
  echo "vendor-otkd: wrote $TARGET"
}

case "${1:-}" in
  --check) check ;;
  -h | --help) usage ;;
  "") fetch ;;
  *)
    echo "vendor-otkd: unknown argument '$1' (try --help)" >&2
    exit 2
    ;;
esac
