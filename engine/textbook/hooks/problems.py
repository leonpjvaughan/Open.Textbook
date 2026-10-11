"""Render a practice set from the problem bank.

``:::problems <bank>`` prints the numbered questions; ``:::answers <bank>`` prints
the solutions. Both come from the same records CI verifies, so a page holds no
hand-written mathematics and cannot drift from its proof. The maths hook runs
after this one, so the ``$...$`` emitted here is rendered in the same pass.

Markers are line-anchored and expanded outside code fences only; an unknown bank
or an empty selection fails the build. Banks are read from the current book's
``problems/`` directory.
"""

from __future__ import annotations

import re

import yaml

from .. import config as cfg
from ..verify.render import render_answer_block, render_problem_list
from ._fences import transform_outside_fences

PROBLEMS_MARKER = re.compile(
    r"^:::[ \t]*problems[ \t]+([a-z0-9._-]+)(?:#([a-z0-9,._-]+))?[ \t]*$", re.M
)
ANSWERS_MARKER = re.compile(
    r"^:::[ \t]*answers[ \t]+([a-z0-9._-]+)(?:#([a-z0-9,._-]+))?[ \t]*$", re.M
)


def load_problems(name: str, config=None) -> list[dict]:
    path = cfg.banks_dir(config) / f"{name}.yaml"
    if not path.exists():
        raise ValueError(f"problems: no bank named '{name}'")
    data = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
    return data.get("problems", [])


def select(name: str, ids: str | None, page, config=None) -> list[dict]:
    problems = load_problems(name, config)
    if ids:
        wanted = set(ids.split(","))
        problems = [p for p in problems if p.get("id") in wanted]
    if not problems:
        raise ValueError(f"problems: {name} selected nothing on {page.file.src_path}")
    return problems


def _expand(markdown: str, marker: re.Pattern[str], render, page, config) -> str:
    def replace(match: re.Match[str]) -> str:
        return render(select(match.group(1), match.group(2), page, config))

    return transform_outside_fences(markdown, lambda text: marker.sub(replace, text))


def on_page_markdown(markdown, page, config, files):
    markdown = _expand(markdown, PROBLEMS_MARKER, render_problem_list, page, config)
    markdown = _expand(markdown, ANSWERS_MARKER, render_answer_block, page, config)
    return markdown
