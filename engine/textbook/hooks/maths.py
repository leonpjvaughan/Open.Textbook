"""Render ``$...$`` / ``$$...$$`` maths to MathML at build time.

pymdownx.arithmatex (``generic: true``) delimits the maths; this hook batches the
LaTeX on each page through KaTeX (``textbook/js/katex-render.mjs``) and
substitutes the MathML. No runtime JavaScript, CSS or fonts are required.
"""

from __future__ import annotations

import html
import json
import logging
import re
import subprocess
from pathlib import Path  # noqa: F401  (kept for the renderer path expression)

log = logging.getLogger("textbook.hooks.maths")

# The renderer ships inside the engine package, so it travels with it.
RENDERER = Path(__file__).resolve().parents[1] / "js" / "katex-render.mjs"

TOKEN = re.compile(
    r'<span class="arithmatex">\\\((.*?)\\\)</span>'
    r'|<div class="arithmatex">\\\[(.*?)\\\]</div>',
    re.S,
)

# One Node process for the whole build: the renderer speaks a line-delimited
# JSON protocol, so there is no per-page startup cost.
_process: subprocess.Popen | None = None


def _renderer() -> subprocess.Popen:
    global _process
    if _process is None or _process.poll() is not None:
        _process = subprocess.Popen(
            ["node", str(RENDERER)],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            text=True,
            bufsize=1,
        )
    return _process


def render(items: list[dict]) -> list[str]:
    if not items:
        return []
    try:
        process = _renderer()
        process.stdin.write(json.dumps(items) + "\n")
        process.stdin.flush()
        line = process.stdout.readline()
        return json.loads(line)
    except (OSError, ValueError, subprocess.SubprocessError) as err:
        log.warning("maths: KaTeX renderer unavailable (%s); maths left as LaTeX", err)
        return [f'<span class="math-error">{i["tex"]}</span>' for i in items]


def on_page_content(content, page, config, files):
    if "arithmatex" not in content:
        return content

    items: list[dict] = []

    def collect(match: re.Match[str]) -> str:
        tex = match.group(1)
        display = tex is None
        if display:
            tex = match.group(2)
        # Markdown HTML-escapes <, > and & inside the delimiters; KaTeX needs the
        # original LaTeX.
        tex = html.unescape(tex).strip()
        index = len(items)
        items.append({"tex": tex, "display": display})
        return f"\x00MATH{index}\x00"

    templated = TOKEN.sub(collect, content)
    if not items:
        return content

    rendered = render(items)
    for index, mathml in enumerate(rendered):
        templated = templated.replace(f"\x00MATH{index}\x00", mathml)
    return templated
