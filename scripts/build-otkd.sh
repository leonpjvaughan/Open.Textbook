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
  # One BLAS thread per model, four models at once: the build is SymPy and rustc,
  # not a linear-algebra kernel, and oversubscribing the eight cores is slower.
  OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 \
  SETUPTOOLS_SCM_PRETEND_VERSION="$VERSION" \
    uv run --project "$PROJECT" --frozen python "$PROJECT/scripts/build_release.py" \
      --version "$VERSION" --out "$out" --jobs "${OTKD_JOBS:-4}"
}

case "${1:-}" in
  --check)
    need_version
    tmp="$(mktemp -d)"
    trap 'rm -rf "$tmp"' EXIT
    build "$tmp" >/dev/null
    # The payloads and kernels must be byte-identical. Three files are not compared
    # directly: the README is hand-written; MANIFEST.json's `git` and `python` record
    # the commit and interpreter of the build, and each kernel's `provenance.json`
    # repeats the generator, so those are stamps that move with a checkout or a tag;
    # SHA256SUMS covers the manifest, so it moves with them. The manifest is compared
    # with its stamps removed and each tree's own sums are verified.
    #
    # The payloads and kernels are compared **structurally**: every byte must match
    # except a floating-point number, which may differ in its last bits. That is not
    # a relaxation for convenience. Measured on the first real run of the split CI
    # job, on GitHub's runner, the quarter-car equilibrium came back as
    # `0.4986231041578398` where this machine writes `0.49862310415783984`: one unit
    # in the last place, from a different BLAS, with every displayed figure unchanged
    # and the model identical. Byte equality across machines is not a promise this
    # project can keep; what it can promise is that no number moved by more than
    # float noise and nothing else moved at all. A changed step, sign or cell count is
    # an integer token and must match exactly.
    uv run --project "$PROJECT" --frozen python - "$tmp/bundle" "$TARGET" <<'PYTHON'
import re
import sys
from pathlib import Path

EXCLUDED = {"README.md", "MANIFEST.json", "SHA256SUMS", "provenance.json"}
NUMBER = re.compile(rb"-?\d+(?:\.\d+)?(?:[eE][-+]?\d+)?")
TOLERANCE = 1e-12


def files(root):
    return {
        path.relative_to(root)
        for path in Path(root).rglob("*")
        if path.is_file() and path.name not in EXCLUDED
    }


def compare_numbers(left, right, where, worst):
    if left == right:
        return None
    integral = b"." not in left and b"e" not in left and b"E" not in left
    if integral:
        return f"{where}: {left.decode()} is not {right.decode()}"
    a, b = float(left), float(right)
    if a == b:
        return None
    relative = abs(a - b) / max(abs(a), abs(b), 1e-300)
    worst[0] = max(worst[0], relative)
    if relative > TOLERANCE:
        return f"{where}: {left.decode()} differs from {right.decode()} by {relative:.3g}"
    return None


def compare_file(left_path, right_path, name, worst):
    left = left_path.read_bytes()
    right = right_path.read_bytes()
    if left == right:
        return
    left_parts, left_numbers = NUMBER.split(left), NUMBER.findall(left)
    right_parts, right_numbers = NUMBER.split(right), NUMBER.findall(right)
    if len(left_numbers) != len(right_numbers) or left_parts != right_parts:
        raise SystemExit(
            f"build-otkd: {name} differs from what solvers/otkd builds, "
            "and not only in a number"
        )
    for index, (a, b) in enumerate(zip(left_numbers, right_numbers)):
        problem = compare_numbers(a, b, f"{name} number {index}", worst)
        if problem:
            raise SystemExit(f"build-otkd: {problem}")


left_root, right_root = (Path(path) for path in sys.argv[1:3])
left_files, right_files = files(left_root), files(right_root)
missing = sorted(str(name) for name in left_files ^ right_files)
if missing:
    raise SystemExit(f"build-otkd: these files are in one tree and not the other: {missing}")
worst = [0.0]
for name in sorted(left_files):
    compare_file(left_root / name, right_root / name, str(name), worst)
if worst[0]:
    print(
        f"otkd: every number agrees except float noise, largest relative "
        f"difference {worst[0]:.3g}"
    )
else:
    print("otkd: the bundle is byte-identical to the source")
PYTHON
    uv run --project "$PROJECT" --frozen python - "$tmp/bundle/MANIFEST.json" "$TARGET/MANIFEST.json" <<'PYTHON'
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
