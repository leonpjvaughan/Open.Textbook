"""Expand ``:::answers <bank>`` into an answer block generated from the bank.

The page holds no answers of its own, so the block the reader sees is exactly
what `python -m verification` proved. Runs before the maths hook, so the `$...$`
it emits is rendered to MathML in the same pass.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

import yaml

# Hooks are loaded as standalone modules, so make the sibling helper importable.
_HOOKS = Path(__file__).resolve().parent
if str(_HOOKS) not in sys.path:
    sys.path.insert(0, str(_HOOKS))

from _fences import transform_outside_fences  # noqa: E402

REPO = Path(__file__).resolve().parents[3]
if str(REPO) not in sys.path:
    sys.path.insert(0, str(REPO))

from verification.render import render_answer_block  # noqa: E402
BANKS = REPO / "problems"
MARKER = re.compile(r"^:::[ \t]*answers[ \t]+([a-z0-9._-]+)(?:#([a-z0-9,._-]+))?[ \t]*$", re.M)


def load_problems(name: str) -> list[dict]:
    path = BANKS / f"{name}.yaml"
    if not path.exists():
        raise ValueError(f"problems: no bank named '{name}'")
    data = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
    return data.get("problems", [])


def on_page_markdown(markdown, page, config, files):
    def replace(match: re.Match[str]) -> str:
        name, ids = match.group(1), match.group(2)
        problems = load_problems(name)
        if ids:
            wanted = set(ids.split(","))
            problems = [p for p in problems if p.get("id") in wanted]
        if not problems:
            raise ValueError(
                f"problems: {name} selected nothing on {page.file.src_path}"
            )
        return render_answer_block(problems)

    return transform_outside_fences(markdown, lambda text: MARKER.sub(replace, text))
