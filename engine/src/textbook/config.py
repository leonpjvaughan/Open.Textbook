"""Resolve the current build's book and paths from its config.

The pipeline builds a plain dict through :func:`textbook.pipeline.make_config`, with
the same ``extra`` block every hook reads:

    extra:
      book: gcse-maths
      book_dir: books/gcse-maths
      tier_profile: higher

Hooks read paths through this module rather than guessing from ``__file__``, so a
hook works for any book and a test can drive it with a hand-written config.
"""

from __future__ import annotations

from pathlib import Path

from .book import Book, book_by_id, discover_books, repo_root


def extra(config) -> dict:
    if config is None:
        return {}
    return dict(config.get("extra") or {})


def book(config) -> Book:
    """The book being built, from ``extra.book``.

    With no config (as in a focused unit test) or no ``extra.book``, fall back to
    the only book in the collection — and fail loudly if that is ambiguous.
    """
    book_id = extra(config).get("book")
    if book_id:
        return book_by_id(book_id)
    books = discover_books()
    if len(books) != 1:
        raise ValueError(
            "config.extra.book is not set and the collection has "
            f"{len(books)} books, so the target is ambiguous"
        )
    return books[0]


def book_dir(config) -> Path:
    raw = extra(config).get("book_dir")
    return repo_root() / raw if raw else book(config).root


def profile(config) -> str:
    """The profile id for this build, e.g. ``higher``."""
    current = extra(config).get("tier_profile")
    return current or book(config).default_profile.tier_filter


def curriculum_path(config) -> Path:
    return book_dir(config) / book(config).curriculum_name


def banks_dir(config) -> Path:
    return book_dir(config) / book(config).banks_name


def root_prefix(url: str) -> str:
    """The relative path from a page back to the site root: one ``../`` per level.

    Here because two callers need it and neither may import the other: the
    pipeline shapes a page's asset links, and the figure hook writes the loader's
    `src`, and `pipeline` imports `hooks` so the dependency only runs one way. They
    used to compute it differently — a split-and-filter against a `str.count("/")
    + 1` — which agreed for every URL `url_for` produces and would have gone on
    agreeing until one of them was changed.
    """
    depth = len([part for part in url.strip("/").split("/") if part])
    return "../" * depth


def docs_dir(config) -> Path:
    if config is not None and config.get("docs_dir"):
        return Path(config["docs_dir"])
    return book_dir(config) / "docs"
