"""The theme-preview shards: every check runs once, and CI runs every group."""

from __future__ import annotations

import re
import subprocess

import yaml

from textbook.book import repo_root

ROOT = repo_root()
SCRIPT = ROOT / "scripts" / "preview-themes.sh"
WORKFLOW = ROOT / ".github" / "workflows" / "verify.yml"


def groups() -> dict[str, list[str]]:
    block = re.search(
        r"CHECK_GROUPS=\(\n(.*?)\n\)", SCRIPT.read_text(encoding="utf-8"), re.S
    )
    assert block is not None, "scripts/preview-themes.sh has no CHECK_GROUPS block"
    return {
        name: members.split()
        for name, members in re.findall(r'"([^":]+):([^"]*)"', block.group(1))
    }


def checks() -> list[str]:
    return re.findall(
        r"^run_check ([\w-]+)", SCRIPT.read_text(encoding="utf-8"), re.MULTILINE
    )


def test_every_check_is_in_exactly_one_group():
    listed = [name for members in groups().values() for name in members]
    assert sorted(listed) == sorted(checks())


def test_the_ci_matrix_is_the_script_groups():
    workflow = yaml.safe_load(WORKFLOW.read_text(encoding="utf-8"))
    preview = workflow["jobs"]["preview"]
    shards = preview["strategy"]["matrix"]["shard"]
    assert preview["strategy"]["fail-fast"] is False
    assert {shard["group"] for shard in shards} == set(groups())
    assert all(shard["name"] for shard in shards)
    assert preview["timeout-minutes"] == 15
    step = next(
        step for step in preview["steps"] if "--group" in str(step.get("run", ""))
    )
    assert "${{ matrix.shard.group }}" in step["run"]
    assert "preview" in workflow["jobs"]["gate"]["needs"]


def test_an_unknown_group_fails_before_building():
    result = subprocess.run(
        ["bash", str(SCRIPT), "--group", "nope"],
        cwd=ROOT,
        capture_output=True,
        text=True,
    )
    assert result.returncode == 2
    assert "no group 'nope'" in result.stderr
