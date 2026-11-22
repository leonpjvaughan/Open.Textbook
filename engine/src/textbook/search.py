#!/usr/bin/env python3
"""The collection's one search index.

Pagefind used to run inside each profile's build, so the reader could search only
the book they were standing in and the site shipped one bundle per book. Search is
now one index over the assembled site: every page imports the same root-absolute
``/pagefind/pagefind.js``, and the result URLs Pagefind returns are already absolute
from the deployment root.

**The order is the build's, not a book's.** `scripts/build-all.sh` runs this once,
after every profile has written its pages and `textbook.portal` has written the root
pages. A pipeline run for one chapter deliberately does not index anything: a
chapter on its own is not the collection, and a per-book bundle would be a second
answer to the same question.

Usage: python -m textbook.search [--site site]
"""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
import time
from dataclasses import dataclass
from pathlib import Path

from . import book as books


@dataclass(frozen=True)
class Index:
    """What the build wrote: one bundle, one page count, one size, one duration."""

    out: Path
    pages: int
    bytes: int
    seconds: float

    @property
    def megabytes(self) -> float:
        return self.bytes / (1024 * 1024)


def site() -> Path:
    return Path(books.repo_root()) / "site"


def binary() -> Path:
    """The Pagefind executable, from the npm install the toolchain test requires."""
    return Path(books.repo_root()) / "node_modules" / ".bin" / "pagefind"


def bundle(out: Path) -> Path:
    return out / "pagefind"


def page_count(out: Path) -> int:
    """How many pages Pagefind indexed, from its own entry manifest.

    The count is Pagefind's, not a recount of the HTML on disk: a page it skipped —
    a 404, or one marked ``data-pagefind-ignore`` — is not a search result and must
    not be reported as one.
    """
    entry = bundle(out) / "pagefind-entry.json"
    if not entry.is_file():
        return 0
    try:
        data = json.loads(entry.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return 0
    return sum(
        int(language.get("page_count") or 0)
        for language in data.get("languages", {}).values()
    )


def bundle_bytes(out: Path) -> int:
    root = bundle(out)
    if not root.is_dir():
        return 0
    return sum(path.stat().st_size for path in root.rglob("*") if path.is_file())


def build(out: Path | None = None) -> Index:
    """Index the assembled site at ``out`` and replace any previous bundle.

    A stale bundle from an earlier build would be indexed bytes with no page behind
    them, so it is removed first: the size this reports is the size of this build.
    """
    out = Path(out) if out is not None else site()
    if not (out / "index.html").is_file():
        raise RuntimeError(
            f"no site to index at {out}: build every profile and run the portal first"
        )
    executable = binary()
    if not executable.exists():
        raise RuntimeError(
            "pagefind is not installed, so the built site would have no search: "
            "run `npm install`"
        )
    target = bundle(out)
    if target.exists():
        shutil.rmtree(target)
    started = time.time()
    finished = subprocess.run(
        [str(executable), "--site", str(out), "--output-subdir", "pagefind", "--quiet"],
        capture_output=True,
        text=True,
    )
    if finished.returncode != 0:
        raise RuntimeError(
            "pagefind failed, so the built site has no working search: "
            f"{(finished.stderr or '').strip()[:400]}"
        )
    return Index(
        out=out,
        pages=page_count(out),
        bytes=bundle_bytes(out),
        seconds=time.time() - started,
    )


def report(index: Index) -> None:
    relative = (
        index.out.relative_to(Path(books.repo_root()))
        if index.out.is_relative_to(Path(books.repo_root()))
        else index.out
    )
    print(
        f"search     {relative}/pagefind  {index.megabytes:.1f} MB  "
        f"{index.pages} pages  {index.seconds:.2f}s"
    )


def main() -> int:
    parser = argparse.ArgumentParser(description="Index the whole collection once.")
    parser.add_argument("--site", type=Path, default=None, help="the built site root")
    args = parser.parse_args()
    try:
        index = build(args.site)
    except RuntimeError as err:
        print(err, file=sys.stderr)
        return 1
    report(index)
    return 0


if __name__ == "__main__":
    sys.exit(main())
