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
from pathlib import Path

import yaml

from .. import yamlio

from .. import config as cfg
from ..verify.render import render_answer_block, render_problem_list
from ._fences import transform_outside_fences

PROBLEMS_MARKER = re.compile(
    r"^:::[ \t]*problems[ \t]+([a-z0-9._-]+)(?:#([a-z0-9,._-]+))?[ \t]*$", re.M
)
ANSWERS_MARKER = re.compile(
    r"^:::[ \t]*answers[ \t]+([a-z0-9._-]+)(?:#([a-z0-9,._-]+))?[ \t]*$", re.M
)


from functools import lru_cache


def _bank_path(name: str, config=None):
    return cfg.banks_dir(config) / f"{name}.yaml"


@lru_cache(maxsize=None)
def _read_bank(path: str) -> tuple[dict, ...]:
    """A bank, parsed once per process.

    Cached because the hook asked for it once per marker per page: profiling an
    A-level Mathematics build put this hook at **10.5s of a 24.7s build**, the
    largest single cost, re-reading and re-parsing the same YAML. A bank is a pure
    function of a file that does not change while a build runs.

    Keyed on the path string so a test's own banks directory is a different key,
    and `load_problems.cache_clear()` exists for a test that rewrites a file in
    place.
    """
    import yaml

    data = yamlio.load_file(path) or {}
    return tuple(data.get("problems", []))


def load_problems(name: str, config=None) -> list[dict]:
    path = _bank_path(name, config)
    if not path.exists():
        raise ValueError(f"problems: no bank named '{name}'")
    return list(_read_bank(str(path)))


load_problems.cache_clear = _read_bank.cache_clear
load_problems.cache_info = _read_bank.cache_info


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
    # Most pages carry neither marker, and `transform_outside_fences` walks every
    # line of the page twice to find that out. The cheap substring test first.
    if ":::problems" not in markdown and ":::answers" not in markdown:
        return markdown
    markdown = _expand(markdown, PROBLEMS_MARKER, render_problem_list, page, config)
    markdown = _expand(markdown, ANSWERS_MARKER, render_answer_block, page, config)
    return markdown
