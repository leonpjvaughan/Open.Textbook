"""Pure helpers shared across the suite: no fixtures, no files, no state.

Two test files that each grow their own copy of the same builder is how a scanner
ends up fixed in one place and stale in the other. So a helper that is a plain
function takes its one definition here and is imported; a helper that is per-test
state built from ``tmp_path`` is a fixture in ``conftest.py`` instead.

Import it as ``from support import ...``: pytest puts this directory on the path
because it holds ``conftest.py``, and ``tests/`` is not a package.
"""

from __future__ import annotations

import re


def problem_record(check: dict, symbols: dict | None = None) -> dict:
    """A problem record as a bank holds it: an id, a check, and optional symbols.

    The three verification files — the algebra, units and statistics vocabularies
    — each wrote this, and only the algebra one needed the ``symbols`` a
    dimensional check uses to say what a free variable is. One builder covers all
    three: the record is the same shape, and an absent ``symbols`` key is what the
    verifier already reads as "no assumptions".
    """
    record: dict = {"id": "case", "check": check}
    if symbols is not None:
        record["symbols"] = symbols
    return record


def call_expressions(text: str, name: str) -> list[str]:
    """Every ``name(...)`` call in ``text``, as written, by balancing parentheses.

    Scanned by balancing parentheses rather than by a regular expression, and by
    skipping string literals as it goes. The pattern this replaces was
    ``name\\([^;]*?\\)``, which stops at the **first** ``)`` — so a call whose
    arguments contain one, such as ``max: Object.keys(EQUATIONS).length - 1``, was
    truncated before ``show:`` and the call was reported as silent when it was
    not. A check that a nested call can defeat is worse than no check, because it
    reads as a guarantee.

    A string is skipped whole, because a bracket inside one is not a bracket: the
    older scanner was defeated by both a nested call and a string.

    The result is the call exactly as written, from ``(`` to its balanced ``)``,
    so a caller can look for a key inside the arguments. A call that never closes
    is dropped rather than returned half-open.
    """
    calls: list[str] = []
    for match in re.finditer(rf"\b{name}\(", text):
        start = match.end() - 1
        depth = 0
        quote: str | None = None
        i = start
        while i < len(text):
            char = text[i]
            if quote:
                if char == "\\":
                    i += 2
                    continue
                if char == quote:
                    quote = None
            elif char in "\"'`":
                quote = char
            elif char == "(":
                depth += 1
            elif char == ")":
                depth -= 1
                if depth == 0:
                    calls.append(text[start : i + 1])
                    break
            i += 1
    return calls
