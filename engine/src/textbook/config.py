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

from . import book as books_module
from .book import Book, book_by_id, discover_books, repo_root
from .themes import default_bundle, ordered_bundles


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
    """The profile **id** for this build, e.g. ``higher``.

    Not the tier filter. `book.default_profile.tier_filter` is `"H"`, which is a
    different vocabulary for a different question, and the fallback here used to return
    it — so this function answered `"higher"` when production wrote the key and `"H"`
    when a test omitted it. One key, two vocabularies, no test between them.
    """
    current = extra(config).get("tier_profile")
    if current:
        return current
    return book(config).default_profile.id


def proofs_dir(book_: Book) -> str:
    """The reference work's directory, relative to the repository root.

    Empty when there is no reference work, and the hook then falls back to
    discovery — but a build knows, so it says.
    """
    reference = books_module.proof_book()
    return book_.rel(reference.root) if reference else ""


def proofs_base_url() -> str:
    """Where the proof book publishes, root-absolute, so any book can link to it."""
    reference = books_module.proof_book()
    if reference is None:
        return "/proofs"
    return "/" + reference.deploy_path(reference.default_profile.id)


def classmap_base_url() -> str:
    """Where the map of problem classes publishes, root-absolute.

    The same reasoning as the proof book's URL: a class is linked from a page in
    another book, and the two are at different depths, so a relative href would
    resolve against whichever page happened to carry it.
    """
    reference = books_module.map_book()
    if reference is None:
        return "/numerical-methods"
    return "/" + reference.deploy_path(reference.default_profile.id)


def from_parts(docs_dir, *, book=None, profile=None, **extra_values) -> dict:
    """Build the hook config in one place.

    **Why a constructor and not a dict literal.** This is the `extra` block every hook
    reads, and it has grown by one key five times — `qualification`, `proofs_dir`,
    `proofs_url`, `themes`, `default_theme`. Six places in `tests/` used to hand-write
    it, each a second copy of an engine contract, and two of them had already drifted:
    one wrote `tier_filter` where production writes a profile id, and none of them
    carried the proof book. A hook that starts reading a new key passes in production
    and silently misbehaves in a test, which is the failure a test exists to prevent.

    `book` is optional because a test's docs tree is often a temporary directory; the
    bundle registry is always present because it is global rather than book-specific.
    """
    values: dict = {
        "tier_profile": profile,
        "themes": [bundle.id for bundle in ordered_bundles()],
        "default_theme": default_bundle().id,
    }
    if book is not None:
        values.update(
            {
                "book": book.id,
                "book_dir": book.rel(book.root),
                "qualification": book.qualification,
                "proofs_dir": proofs_dir(book),
                "proofs_url": proofs_base_url(),
                "classmap_url": classmap_base_url(),
            }
        )
    values.update(extra_values)
    return {"extra": values, "docs_dir": str(docs_dir)}


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
