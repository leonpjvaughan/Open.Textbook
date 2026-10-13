"""The shared proof registry: which proofs exist, and whose course they are in.

A fact stated as fact — the angles of a triangle add to 180°, the quadratic
formula — should lead to the proof. One page, one URL, referenced from every book
that needs it, so a reader meets the same proof wherever they met the claim.

The registry itself is `books/proofs/proofs.yaml`. It is a *book's* data because
the pages belong to that book, and the book is a book only because that is how the
collection publishes, navigates and themes a body of pages: `books/proofs/book.yaml`
declares no chapters, no boards and no tier axis, and the scaffold generates no
stubs for it.

## The label, and why the registry is not just a list

`qualifications` is the reason this file exists rather than the directive reading
the pages. The same proof sits differently in different courses: a reader on GCSE
Mathematics meets the angles of a triangle every year and the sum of the first *n*
squares never. So the directive compares the registry against the qualification of
the book the reader is in and **marks the link when the proof is not in their
course** — which is the author's request, and which no page can work out alone.

A proof that is in no course is almost certainly a mistake, and an empty list is
rejected rather than read as "everyone".
"""

from __future__ import annotations

from functools import lru_cache
from pathlib import Path

from . import book as books
from . import config as cfg

#: The registry file inside the reference work.
REGISTRY = "proofs.yaml"

#: The reader-facing name of a proof that is not in their course. The words are
#: chosen once here rather than per page: "the specification" is exam-board
#: language, and a reader who has not met it does not know what is being said.
BEYOND_LABEL = "Beyond your course"

#: What being beyond the course means, in one sentence. Not a warning: a reader is
#: allowed to enjoy this, and the only fact they need is that it will not be asked
#: of them.
BEYOND_NOTE = "You can read and use this. An exam will not ask you to reproduce it."


def registry_path(config=None) -> Path:
    """Where the registry lives, from ``extra.proofs_dir`` or by discovery.

    Through ``config.extra`` first, like every other hook: a hook that guesses its
    own location works for one book and breaks for the next.
    """
    raw = cfg.extra(config).get("proofs_dir")
    if raw:
        return books.repo_root() / raw / REGISTRY
    reference = books.reference_book()
    return (reference.root if reference else books.repo_root() / "books" / "proofs") / REGISTRY


def base_url(config=None) -> str:
    """The proof book's URL, root-absolute so it works from any book.

    Root-absolute rather than relative because a proof is reached from a page in
    another book, and the two are at different depths.
    """
    raw = cfg.extra(config).get("proofs_url")
    if raw:
        return "/" + str(raw).strip("/")
    reference = books.reference_book()
    if reference is None:
        return "/proofs"
    return "/" + reference.deploy_path(reference.default_profile.id).strip("/")


def entries(config=None) -> dict[str, dict]:
    """Every proof, by id, with the URL it is published at.

    The URL is derived from the id rather than stored, because the id *is* the
    directory name — `docs/<id>/index.md` — so a stored copy could disagree with
    the page that exists.

    Cached per registry path. The registry is a pure function of a file that does
    not change while a build runs, and the hook asks for it once per page: the
    uncached version cost **12.2s of a 34.3s build** for A-level Mathematics,
    re-parsing the same YAML 362 times and rebuilding the same URLs. Found by
    profiling the build, not by reading it — the review had attributed the cost to
    the navigation, which was already computed once.
    """
    return dict(_cached_entries(str(registry_path(config)), base_url(config)))


@lru_cache(maxsize=None)
def _cached_entries(path: str, base: str) -> dict[str, dict]:
    """The parsed registry, keyed by the two strings the result depends on.

    Strings rather than a `Path` and a config dict, because a cache key must be
    hashable and a `dict` is not.
    """
    import yaml

    registry_file = Path(path)
    if not registry_file.is_file():
        return {}
    data = yaml.safe_load(registry_file.read_text(encoding="utf-8")) or {}
    out: dict[str, dict] = {}
    for proof in data.get("proofs", []) or []:
        if not isinstance(proof, dict) or not proof.get("id"):
            continue
        item = dict(proof)
        item["url"] = f"{base}/{item['id']}/"
        item["qualifications"] = [str(q) for q in (proof.get("qualifications") or [])]
        out[str(item["id"])] = item
    return out


def beyond_course(entry: dict, qualification: str) -> bool:
    """Is this proof outside the course the reader is in?

    An **empty** list means the proof is in no course at this collection's level,
    and it is therefore beyond every reader's — which is a real case, not a
    mistake: `sum-of-the-first-n-squares` is Further Mathematics, not A level, so
    it is offered to an A-level reader as something to enjoy rather than to learn.
    The registry requires the `qualifications` key to be *present*, so leaving it
    out is caught while writing an empty list is a decision, and
    `tests/test_proofs.py` is what draws that line.
    """
    if not qualification:
        return False
    return qualification not in (entry.get("qualifications") or [])
