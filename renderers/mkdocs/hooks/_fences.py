"""Apply a line-level transform to markdown, skipping fenced code blocks.

Marker expansion must never fire inside a code fence, or a page that shows the
marker syntax as an example would silently expand it. This is a small parser
rather than a bare regex, so the rule is explicit and testable.
"""

from __future__ import annotations

import re
from typing import Callable

FENCE = re.compile(r"^ {0,3}(`{3,}|~{3,})(.*)$")


def transform_outside_fences(text: str, transform: Callable[[str], str]) -> str:
    """Run *transform* on the prose segments only, leaving fenced code verbatim.

    Fences may be indented by up to three spaces, and a fence opened with a run
    of backticks is closed only by a run of at least the same length.
    """
    lines = text.splitlines(keepends=True)
    out: list[str] = []
    buffer: list[str] = []
    fence: str | None = None

    for line in lines:
        match = FENCE.match(line.rstrip("\n"))
        if fence is None:
            if match:
                out.append(transform("".join(buffer)))
                buffer = []
                fence = match.group(1)
                out.append(line)
            else:
                buffer.append(line)
        else:
            out.append(line)
            if (
                match
                and match.group(1)[0] == fence[0]
                and len(match.group(1)) >= len(fence)
            ):
                fence = None

    tail = "".join(buffer)
    out.append(transform(tail) if fence is None else tail)
    return "".join(out)
