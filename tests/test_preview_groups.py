"""The theme-preview shards: every check runs once, and CI runs every group."""

from __future__ import annotations

import os
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


def workflow() -> dict:
    return yaml.safe_load(WORKFLOW.read_text(encoding="utf-8"))


def plan_preview_script() -> str:
    step = next(
        step
        for step in workflow()["jobs"]["plan"]["steps"]
        if step.get("id") == "preview"
    )
    return step["run"]


def gate_script() -> str:
    step = next(
        step
        for step in workflow()["jobs"]["gate"]["steps"]
        if step["name"] == "Every required job must have succeeded"
    )
    return step["run"]


def test_the_preview_runs_only_on_main_and_the_release_pr(tmp_path):
    cases = {
        ("refs/heads/main", "push", ""): "true",
        ("refs/heads/main", "workflow_dispatch", ""): "true",
        ("refs/pull/77/merge", "pull_request", "main"): "true",
        ("refs/pull/76/merge", "pull_request", "dev"): "false",
        ("refs/heads/dev", "push", ""): "false",
    }
    for (ref, event, base), want in cases.items():
        output = tmp_path / "output"
        output.unlink(missing_ok=True)
        result = subprocess.run(
            ["bash", "-c", plan_preview_script()],
            env={
                **os.environ,
                "REF": ref,
                "EVENT": event,
                "BASE": base,
                "GITHUB_OUTPUT": str(output),
            },
            capture_output=True,
            text=True,
        )
        assert result.returncode == 0, result.stderr
        assert output.read_text() == f"run={want}\n"


def test_the_preview_job_and_gate_share_the_plan_output():
    jobs = workflow()["jobs"]
    assert jobs["plan"]["outputs"]["preview"] == "${{ steps.preview.outputs.run }}"
    assert jobs["preview"]["if"] == "needs.plan.outputs.preview == 'true'"
    gate = next(
        step
        for step in jobs["gate"]["steps"]
        if step["name"] == "Every required job must have succeeded"
    )
    assert gate["env"]["PREVIEW_REQUIRED"] == "${{ needs.plan.outputs.preview }}"
    assert gate["env"]["PREVIEW"] == "${{ needs.preview.result }}"


def gate_env(ref: str, preview_required: str, preview: str) -> dict[str, str]:
    env = {
        "PLAN": "success",
        "GENERATED": "success",
        "BUILD": "success",
        "CONTENT": "success",
        "SOLVERS": "success",
        "WORKFLOWS": "success",
        "GITHUB_REF": ref,
        "PREVIEW": preview,
        "PREVIEW_REQUIRED": preview_required,
    }
    if ref == "refs/heads/main":
        env |= {
            "OTKD": "skipped",
            "OTKD_TESTS": "success",
            "OTKD_KERNELS": "success",
            "OTKD_BUNDLE": "success",
        }
    else:
        env |= {
            "OTKD": "success",
            "OTKD_TESTS": "skipped",
            "OTKD_KERNELS": "skipped",
            "OTKD_BUNDLE": "skipped",
        }
    return env


def run_gate(ref: str, preview_required: str, preview: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        ["bash", "-c", gate_script()],
        env={**os.environ, **gate_env(ref, preview_required, preview)},
        capture_output=True,
        text=True,
    )


def test_the_gate_requires_the_preview_when_it_is_due():
    result = run_gate("refs/heads/main", "true", "success")
    assert result.returncode == 0, result.stdout + result.stderr

    for preview in ("skipped", "failure", "cancelled"):
        result = run_gate("refs/heads/main", "true", preview)
        assert result.returncode == 1, preview
        assert f"required job preview finished as '{preview}'" in result.stdout


def test_the_gate_accepts_only_a_skip_when_the_preview_is_not_due():
    result = run_gate("refs/heads/dev", "false", "skipped")
    assert result.returncode == 0, result.stdout + result.stderr
    assert "NOTE: the theme preview runs only on main and the release PR." in result.stdout

    for preview in ("success", "failure", "cancelled"):
        result = run_gate("refs/heads/dev", "false", preview)
        assert result.returncode == 1, preview
        assert f"required job preview finished as '{preview}' while it is not due" in result.stdout


def test_release_and_deploy_still_need_the_gate():
    jobs = workflow()["jobs"]
    assert jobs["release"]["needs"] == "gate"
    assert "needs.gate.result == 'success'" in jobs["release"]["if"]
    assert "release" in jobs["deploy"]["needs"]
    assert "needs.release.result == 'success'" in jobs["deploy"]["if"]
