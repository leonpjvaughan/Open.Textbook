"""The release tag scheme: yy.<day of year>.<increment>

The increment exists so two releases on the same day cannot collide, which is the
failure the previous plain-date scheme had: the second deploy of the day silently
released nothing. The scheme lives in `scripts/next-tag.sh` and is driven here
with a stubbed `gh` and a fixed date, because a tag format that drifts is a
release nobody can identify.
"""

from __future__ import annotations

import json
import os
import re
import subprocess
from pathlib import Path

import pytest

from textbook.book import repo_root

SCRIPT = repo_root() / "scripts" / "next-tag.sh"
TAG = re.compile(r"^\d{2}\.\d{3}\.\d+$")

# A minimal `gh` that answers `api <path> --jq <expr>` from a fixture, so the
# script's real jq expression is exercised rather than approximated.
GH_STUB = """#!/usr/bin/env bash
set -eu
if [ "${1:-}" != "api" ]; then
  echo "stub gh: unexpected call: $*" >&2
  exit 2
fi
expr=""
while [ $# -gt 0 ]; do
  case "$1" in
    --jq) expr="$2"; shift 2 ;;
    *) shift ;;
  esac
done
jq -r "$expr" "$GH_FIXTURE"
"""


def next_tag(tmp_path: Path, refs: list[str], today: str = "26.284") -> str:
    """Run the script against a stub `gh` and a fixed date."""
    stub = tmp_path / "bin"
    stub.mkdir(exist_ok=True)
    fixture = tmp_path / "refs.json"
    fixture.write_text(json.dumps([{"ref": ref} for ref in refs]), encoding="utf-8")

    (stub / "gh").write_text(GH_STUB, encoding="utf-8")
    (stub / "date").write_text(f"#!/usr/bin/env bash\necho {today}\n", encoding="utf-8")
    for name in ("gh", "date"):
        (stub / name).chmod(0o755)

    env = {
        **os.environ,
        "PATH": f"{stub}:{os.environ['PATH']}",
        "GH_FIXTURE": str(fixture),
        "REPO": "owner/name",
        "TZ": "UTC",
    }
    result = subprocess.run(
        ["bash", str(SCRIPT)], capture_output=True, text=True, env=env, check=True
    )
    return result.stdout.strip()


def test_the_first_release_of_a_day_is_increment_zero(tmp_path):
    assert next_tag(tmp_path, []) == "26.284.0"


def test_the_increment_follows_the_tags_already_released(tmp_path):
    refs = ["refs/tags/26.284.0", "refs/tags/26.284.1", "refs/tags/26.284.2"]
    assert next_tag(tmp_path, refs) == "26.284.3"


def test_a_gap_does_not_reuse_a_number(tmp_path):
    """The maximum wins, so deleting one tag cannot make two tags the same."""
    assert next_tag(tmp_path, ["refs/tags/26.284.0", "refs/tags/26.284.7"]) == "26.284.8"


def test_other_days_and_years_are_ignored(tmp_path):
    refs = [
        "refs/tags/26.283.4",
        "refs/tags/25.284.9",
        "refs/tags/2026.10.11",
        "refs/tags/unrelated",
    ]
    assert next_tag(tmp_path, refs) == "26.284.0"


def test_a_non_numeric_suffix_cannot_break_the_count(tmp_path):
    refs = ["refs/tags/26.284.0", "refs/tags/26.284.notes"]
    assert next_tag(tmp_path, refs) == "26.284.1"


def test_the_increment_does_not_sort_as_text(tmp_path):
    """9 -> 10, which string ordering would get wrong."""
    refs = [f"refs/tags/26.284.{n}" for n in range(0, 10)]
    assert next_tag(tmp_path, refs) == "26.284.10"


@pytest.mark.parametrize("today", ["26.001", "26.099", "26.100", "26.366"])
def test_the_shape_holds_at_the_edges_of_the_year(tmp_path, today):
    tag = next_tag(tmp_path, [], today=today)
    assert TAG.match(tag), tag
    assert tag.startswith(today + ".")


def test_the_day_is_zero_padded_so_tags_sort(tmp_path):
    """26.005.0 before 26.284.0 as text, which unpadded days would break."""
    assert next_tag(tmp_path, [], today="26.005") == "26.005.0"
