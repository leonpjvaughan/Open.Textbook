"""Read YAML with the C parser when this interpreter has one.

PyYAML ships a pure-Python parser and, when its `libyaml` binding is present, a C
one. They read the same documents — `CSafeLoader` is the C implementation of the
same safe loader, so nothing about what a file may contain changes — but the C one
is measured at **about 12x faster** on this repository's problem banks: 1.48s
against 0.12s for 119 files.

That matters because the banks are a hot path. An A-level Mathematics build parses
every bank in the book, and profiling put the pure-Python parse at **5.2s of a
24.7s build** — the largest single remaining cost after the per-page re-reads were
cached.

The engine asks for the fast parser and falls back when it is absent, rather than
requiring a build of libyaml. A reader's machine and a CI runner should not be able
to produce different content because of it; a missing C parser is a slower build,
not a different book.
"""

from __future__ import annotations

from pathlib import Path
from typing import Any

import yaml

#: The C safe loader when the binding is present, otherwise the Python one. Both
#: refuse to construct arbitrary Python objects, so a bank cannot execute code.
Loader = getattr(yaml, "CSafeLoader", yaml.SafeLoader)

#: True when the fast parser is in use. Exposed so a report can say which one ran
#: rather than implying the build is as fast as the best case.
USING_C_PARSER = Loader is not yaml.SafeLoader


def load(text: str) -> Any:
    """Parse a YAML document. Empty documents parse to ``None``, as PyYAML does."""
    return yaml.load(text, Loader=Loader)


def load_file(path: str | Path) -> Any:
    """Parse a YAML file."""
    return load(Path(path).read_text(encoding="utf-8"))
