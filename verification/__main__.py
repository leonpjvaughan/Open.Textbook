"""CLI: verify every problem bank under a path.

    python -m verification problems/
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from .verify import verify_bank


def banks_from(paths: list[str]) -> list[Path]:
    found: list[Path] = []
    for raw in paths:
        path = Path(raw)
        found.extend(sorted(path.glob("*.yaml")) if path.is_dir() else [path])
    return found


def main() -> int:
    parser = argparse.ArgumentParser(description="Verify the problem bank.")
    parser.add_argument("paths", nargs="*", default=["problems"])
    args = parser.parse_args()

    failed = 0
    for path in banks_from(args.paths or ["problems"]):
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
