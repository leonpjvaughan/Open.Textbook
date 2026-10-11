"""CLI: verify every problem bank under a path.

    python -m textbook.verify                     # every book's banks
    python -m textbook.verify books/gcse-maths/problems
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from ..book import discover_books
from .verify import verify_bank


def default_paths() -> list[str]:
    return [str(book.banks) for book in discover_books()]


def banks_from(paths: list[str]) -> list[Path]:
    found: list[Path] = []
    for raw in paths:
        path = Path(raw)
        found.extend(sorted(path.glob("*.yaml")) if path.is_dir() else [path])
    return found


def main() -> int:
    parser = argparse.ArgumentParser(description="Verify the problem banks.")
    parser.add_argument("paths", nargs="*", help="bank files or directories")
    args = parser.parse_args()

    failed = 0
    for path in banks_from(args.paths or default_paths()):
        report = verify_bank(path)
        print(f"{'ok  ' if report.ok else 'FAIL'} {path} ({len(report.reports)} problems)")
        for error in report.errors:
            print(f"      error: {error}")
        for warning in report.warnings:
            print(f"      warn:  {warning}")
        failed += 0 if report.ok else 1
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
