"""Shared engine for the interactive textbook collection.

Layers, from the bottom up:

* :mod:`textbook.book` — a book's identity and build metadata (`book.yaml`);
* :mod:`textbook.config` — resolve the current build's paths from its config;
* :mod:`textbook.hooks` — the engine's page hooks, composed in an explicit order;
* :mod:`textbook.pipeline` — the site: Markdown to HTML, shell, nav, search, links;
* :mod:`textbook.verify` — the problem-bank verifier and its oracles;
* :mod:`textbook.scaffold`, :mod:`textbook.booklet`, :mod:`textbook.portal` —
  the generators whose output CI checks for drift.
"""

# Written by hatch-vcs at install time from the collection's tag. The fallback keeps a
# source tree importable before the first `uv sync`.
try:
    from ._version import __version__  # type: ignore[import-not-found]
except ImportError:  # pragma: no cover - only without an install
    __version__ = "0.0.0"
