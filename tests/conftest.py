"""Fixtures shared by the whole suite.

A helper that builds per-test state out of ``tmp_path`` is a fixture here, so
there is one of it and no test writes into the repository to get one. A helper
that is a pure function over text is not a fixture: it lives in
``tests/support.py`` and is imported. ``tests/AGENTS.md`` says which is which.

Nothing here asserts anything; a fixture that decided the verdict would be a test
hiding in the plumbing.
"""

from __future__ import annotations

from pathlib import Path

import pytest


@pytest.fixture
def write(tmp_path: Path):
    """A writer into this test's ``tmp_path``, which returns the path it wrote.

    ``relative`` may name a file in a directory that does not exist yet: the
    parents are created first. A test that builds a *site* writes nested pages
    (``chapter-1/review/index.html``), and making that the caller's job meant every
    such test re-stated the two lines, in two files, with two slightly different
    contracts — one returned the path and one did not. This is the contract that
    covers both: always make the parents, always return the path, let a caller that
    does not need the path ignore it.

    ``tmp_path`` is still the test's own argument, because the same test usually
    hands the directory to the thing under test as well as filling it.
    """

    def write(relative: str, content: str) -> Path:
        destination = tmp_path / relative
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(content, encoding="utf-8")
        return destination

    return write
