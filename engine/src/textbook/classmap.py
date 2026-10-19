"""The class registry: which kinds of problem this collection can name, and where.

A model becomes a kind of problem, and the kind decides the method. That claim is
made in one place — the map at `books/numerical-methods/` — and every other book
points at it rather than restating it, so a reader who meets "this is a saddle
point" in a chapter can follow the word to the page that explains what that costs.

The registry is the map book's own curriculum file (`map.yaml`), under `pages`.
Each entry that carries a `signature` is linkable; the two indexes carry none and
are therefore not classes. That is the whole rule, and it is what makes
``:::class techniques`` a build error rather than a link to a table.

**Why this is not part of `proofs.py`.** They look alike and they answer different
questions. A proof is a fact's page and its registry records who is examined on it;
a class is a kind of problem and its registry records the order a tree reaches it.
Sharing a loader would save twenty lines and make both harder to change.

The URLs are root-absolute, like a proof's, because a class is linked from a page in
another book and the two live at different depths. That has one consequence worth
stating: `check_links` skips such a link by design, so
`tests/test_reference_books.py` checks the emitted targets against the registry
instead.
"""

from __future__ import annotations

from functools import lru_cache
from pathlib import Path

from . import yamlio

from . import book as books
from . import config as cfg


def base_url(config=None) -> str:
    """The map's URL, root-absolute so it works from any book's page."""
    raw = cfg.extra(config).get("classmap_url")
    if raw:
        return "/" + str(raw).strip("/")
    book = books.map_book()
    if book is None:
        return "/numerical-methods"
    return "/" + book.deploy_path(book.default_profile.id).strip("/")


def entries(config=None) -> dict[str, dict]:
    """Every linkable class, by slug, with the URL it is published at.

    Cached per registry path, because the hook asks once per page and parsing the
    same YAML per page cost a third of a build when the proof book learned this.
    """
    book = books.map_book()
    if book is None or not book.curriculum.is_file():
        return {}
    return dict(_cached_entries(str(book.curriculum), base_url(config)))


@lru_cache(maxsize=None)
def _cached_entries(path: str, base: str) -> dict[str, dict]:
    data = yamlio.load_file(Path(path)) or {}
    out: dict[str, dict] = {}
    for page in data.get("pages", []) or []:
        if not isinstance(page, dict) or not page.get("path"):
            continue
        # A signature is what the directive prints, so an entry without one is not
        # a class: an index page is a place to look things up, not a kind of
        # problem, and linking it as one would be a category error in the prose.
        if not str(page.get("signature") or "").strip():
            continue
        slug = str(page["path"]).split("/")[0]
        out[slug] = {**page, "slug": slug, "url": f"{base}/{slug}/"}
    return out
