#!/usr/bin/env python3
"""Emit the build matrix: one row per book profile.

CI calls this so that adding a book needs no workflow edit — the matrix is
derived from ``books/*/book.yaml``.

    python -m textbook.plan                     # one row per line, for humans
    python -m textbook.plan --configs           # config paths, one per line
    python -m textbook.plan --generated         # every generated file's path
    python -m textbook.plan --github-matrix     # {"include": [...]} for CI
"""

from __future__ import annotations

import argparse
import json
import sys

from .book import discover_books, repo_root
from .scaffold import config_path


def rows() -> list[dict[str, str]]:
    out: list[dict[str, str]] = []
    for book in discover_books():
        for profile in book.profiles:
            config = config_path(book, profile.id).relative_to(repo_root())
            out.append(
                {
                    "book": book.id,
                    "title": book.title,
                    "profile": profile.id,
                    "name": profile.name,
                    "config": config.as_posix(),
                    "site_dir": f"site/{book.deploy_path(profile.id)}",
                }
            )
    return out


def generated_paths() -> list[str]:
    """Every file the generators own, relative to the repository root.

    A drift check should look at these and nothing else. Diffing the whole working
    tree conflates "a generator is not reproducible" with "somebody has unsaved
    edits", and the second is not a failure.
    """
    root = repo_root()
    paths = [root / "assets" / "stylesheets" / "themes.css"]
    for book in discover_books():
        paths.append(book.root / "CURRICULUM-MAP.md")
        paths.append(book.docs / "assets" / "stylesheets" / "book.css")
        if book.booklet_name:
            paths.append(book.docs / "assets" / "booklet" / "booklet.json")
        for profile in book.profiles:
            paths.append(config_path(book, profile.id))
    return sorted(str(path.relative_to(root)) for path in paths)


def main() -> int:
    parser = argparse.ArgumentParser(description="Emit the build matrix.")
    parser.add_argument("--github-matrix", action="store_true")
    parser.add_argument(
        "--configs", action="store_true", help="print one MkDocs config path per line"
    )
    parser.add_argument(
        "--generated", action="store_true", help="print every generated file's path"
    )
    args = parser.parse_args()

    if args.generated:
        for path in generated_paths():
            print(path)
        return 0

    matrix = rows()
    if args.configs:
        for row in matrix:
            print(row["config"])
        return 0
    if args.github_matrix:
        # GitHub wants a JSON object with an `include` list; keep it on one line.
        print(json.dumps({"include": matrix}, separators=(",", ":")))
        return 0

    for row in matrix:
        print(f"{row['book']:<14} {row['profile']:<12} {row['config']}  ->  {row['site_dir']}")
    print(f"\n{len(matrix)} build(s) across {len({r['book'] for r in matrix})} book(s)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
