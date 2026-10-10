"""Render ``$...$`` / ``$$...$$`` maths to MathML at build time.

pymdownx.arithmatex (``generic: true``) delimits the maths; this hook batches the
LaTeX on each page through KaTeX (``scripts/katex-render.mjs``) and substitutes
the MathML. No runtime JavaScript, CSS or fonts are required.
"""

from __future__ import annotations

import html
import json
import logging
import re
import subprocess
from pathlib import Path

log = logging.getLogger("mkdocs.hooks.maths")

REPO = Path(__file__).resolve().parents[3]
RENDERER = REPO / "scripts" / "katex-render.mjs"

TOKEN = re.compile(
    r'<span class="arithmatex">\\\((.*?)\\\)</span>'
    r'|<div class="arithmatex">\\\[(.*?)\\\]</div>',
    re.S,
)


def render(items: list[dict]) -> list[str]:
    if not items:
        return []
    try:
        proc = subprocess.run(
            ["node", str(RENDERER)],
            input=json.dumps(items),
            capture_output=True,
            text=True,
            timeout=60,
            check=True,
        )
    except (OSError, subprocess.SubprocessError) as err:
        log.warning("maths: KaTeX renderer unavailable (%s); maths left as LaTeX", err)
        return [f'<span class="math-error">{i["tex"]}</span>' for i in items]
    return json.loads(proc.stdout)


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
