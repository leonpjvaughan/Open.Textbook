"""Load a book's identity and build metadata from ``books/<id>/book.yaml``.

`book.yaml` is the one place a book declares what it is: its qualification and
subject, the profiles it builds, the verification oracles its banks may use, its
theme tokens and the paths to its curriculum, banks and booklet data. The
scaffold, the portal and the build hooks all read it, so adding a book is data
rather than code.

The collection as a whole is described by ``collection.yaml`` at the repository
root: its title, its deployment base URL and the order qualifications appear in.
"""

from __future__ import annotations

import os
from dataclasses import dataclass, field
from functools import lru_cache
from pathlib import Path

import yaml

from . import yamlio

COLLECTION_FILE = "collection.yaml"
BOOKS_DIR = "books"

# The accent a **book with no tint of its own** gets: the reference work, whose
# `theme:` block is empty because it belongs to no subject. It is the only colour
# the engine names, and it is a fallback rather than a design.
#
# It used to be five constants, three of which nothing read, and all five were the
# first book's palette copied verbatim (`books/gcse-maths/book.yaml`). That
# contradicts `engine/AGENTS.md`: "The engine declares no colour. Colour lives in
# the bundles … a book contributes only its tint." The honest fix is for a book
# with no tint to take the *bundle's* accent, which is what `--tb-accent` already
# resolves to — but `Scheme.accent` is what the landing card reads, and there is no
# bundle in scope at that point. So the fallback stays, reduced to the two values
# actually used, named for what they are, and pinned by a test that fails if it
# drifts from the bundle it is standing in for.
HOUSE_ACCENT = "#2f6690"
HOUSE_ACCENT_DARK_SCHEME = "#6ea8d8"

# The tokens a book may set, per scheme, in book.yaml. Everything else about the
# design system is shared; a book that needs more than tinting belongs in its
# authored book-local.css.
SCHEME_TOKENS: dict[str, str] = {
    "accent": "--tb-accent",
    "accent_light": "--tb-accent-light",
    "accent_dark": "--tb-accent-dark",
    # Text drawn *on* the accent (the booklet bar's label, chip text). It is not
    # `paper`: a bundle's paper can sit too close to its own accent to read, so
    # each bundle names a dedicated ink for that surface.
    "accent_ink": "--tb-accent-ink",
    "paper": "--tb-paper",
    "ink": "--tb-ink",
    "ink_soft": "--tb-ink-soft",
    "ink_lighter": "--tb-ink-lighter",
    "rule": "--tb-rule",
    "link": "--tb-link",
    "code_bg": "--tb-code-bg",
    "fig_warn": "--tb-fig-warn",
    "fig_good": "--tb-fig-good",
    "fig_grid": "--tb-fig-grid",
}

SCHEMES = ("default", "slate")


def repo_root() -> Path:
    """The repository root.

    Resolved from ``TEXTBOOK_ROOT`` if set, otherwise by walking up from the
    working directory for ``collection.yaml``. The fallback assumes the engine
    is an editable install, which is what a uv workspace gives us.
    """
    override = os.environ.get("TEXTBOOK_ROOT")
    if override:
        return Path(override).resolve()
    here = Path.cwd().resolve()
    for candidate in (here, *here.parents):
        if (candidate / COLLECTION_FILE).is_file():
            return candidate
    return Path(__file__).resolve().parents[2]


@dataclass(frozen=True)
class Profile:
    """One build of a book: a tier filter and a name."""

    id: str
    name: str
    tier_filter: str
    default: bool = False

    @classmethod
    def from_dict(cls, data: dict) -> "Profile":
        return cls(
            id=data["id"],
            name=data.get("name", data["id"].title()),
            tier_filter=data.get("tier_filter", data["id"]),
            default=bool(data.get("default", False)),
        )


@dataclass(frozen=True)
class Scheme:
    """The token overrides a book declares for one colour scheme.

    Empty means "use the house defaults", which is the common case: a book
    usually names only an accent, or an accent plus its tints.
    """

    scheme: str
    tokens: dict[str, str] = field(default_factory=dict)

    @classmethod
    def from_dict(cls, scheme: str, data: dict | None) -> "Scheme":
        data = data or {}
        tokens = {}
        for key, value in data.items():
            if key not in SCHEME_TOKENS:
                raise ValueError(
                    f"theme.{scheme}.{key} is not a themable token; "
                    f"choose one of {', '.join(sorted(SCHEME_TOKENS))} "
                    "or use book-local.css"
                )
            if value:
                tokens[key] = str(value)
        return cls(scheme=scheme, tokens=tokens)

    @property
    def accent(self) -> str:
        """The accent to tint this book's card with, house default included."""
        if self.tokens.get("accent"):
            return self.tokens["accent"]
        return HOUSE_ACCENT_DARK_SCHEME if self.scheme == "slate" else HOUSE_ACCENT


@dataclass(frozen=True)
class Theme:
    """A book's own theme: one variation per colour scheme."""

    light: Scheme = field(default_factory=lambda: Scheme("default"))
    dark: Scheme = field(default_factory=lambda: Scheme("slate"))

    @classmethod
    def from_dict(cls, data: dict | None) -> "Theme":
        data = data or {}
        # A flat accent block is read as the light variation, so an older
        # book.yaml still works.
        if "accent" in data:
            return cls(light=Scheme.from_dict("default", data), dark=Scheme("slate"))
        return cls(
            light=Scheme.from_dict("default", data.get("light")),
            dark=Scheme.from_dict("slate", data.get("dark")),
        )

    def for_scheme(self, scheme: str) -> Scheme:
        return self.dark if scheme == "slate" else self.light

    @property
    def variations(self) -> tuple[Scheme, Scheme]:
        return (self.light, self.dark)


@dataclass(frozen=True)
class Book:
    id: str
    title: str
    qualification: str
    subject: str
    description: str
    root: Path
    boards: tuple[str, ...] = ()
    profiles: tuple[Profile, ...] = ()
    theme: Theme = field(default_factory=Theme)
    tier_axis: dict[str, str] = field(default_factory=dict)
    oracles: tuple[str, ...] = ("sympy",)
    order: int = 0
    curriculum_name: str = "curriculum.yaml"
    banks_name: str = "problems"
    booklet_name: str = ""
    #: Where an animated background may run: site / default / chapters / sections.
    #: Empty by default, and nothing ships one — see textbook/backgrounds.py.
    backgrounds: dict = field(default_factory=dict)
    sources_name: str = "sources.yaml"

    # --- paths ---------------------------------------------------------------
    @property
    def docs(self) -> Path:
        return self.root / "docs"

    @property
    def curriculum(self) -> Path:
        return self.root / self.curriculum_name

    @property
    def banks(self) -> Path:
        return self.root / self.banks_name

    @property
    def booklet(self) -> Path:
        return self.root / self.booklet_name if self.booklet_name else self.root / "booklet"

    @property
    def sources(self) -> Path:
        return self.root / self.sources_name

    def rel(self, path: Path) -> str:
        """A path as written in generated config: relative to the repository root."""
        return Path(path).relative_to(repo_root()).as_posix()

    def profile(self, profile_id: str) -> Profile:
        for profile in self.profiles:
            if profile.id == profile_id:
                return profile
        raise KeyError(f"{self.id}: no profile '{profile_id}'")

    def tier_filter_for(self, profile_id: str) -> str:
        """The tier behaviour of a build, from the profile's declared filter.

        Read from ``tier_filter`` and never from the profile's id. A book may
        name its Foundation profile anything, so keying behaviour on the
        literal ``"foundation"`` is the same fact written twice: a rename, or a
        book whose id differs from its filter, would silently ship Higher-only
        content to Foundation readers. An id with no declared profile — the
        development ``toggle`` build — is its own filter.
        """
        try:
            return self.profile(profile_id).tier_filter
        except KeyError:
            return profile_id

    def deploy_path(self, profile_id: str) -> str:
        """Where a profile is deployed, relative to the site root.

        A book with a single profile has no reason to bury its URL one level
        deeper, so the profile segment appears only when there is a choice.
        """
        if len(self.profiles) > 1:
            return f"{self.id}/{profile_id}"
        return self.id

    @property
    def default_profile(self) -> Profile:
        for profile in self.profiles:
            if profile.default:
                return profile
        return self.profiles[0]

    # --- curriculum ----------------------------------------------------------
    @property
    def curriculum_data(self) -> dict:
        return load_curriculum(self)

    @property
    def chapters(self) -> list[dict]:
        return self.curriculum_data.get("chapters", [])

    @property
    def strands(self) -> list[dict]:
        return self.curriculum_data.get("strands", [])

    @property
    def proofs(self) -> list[dict]:
        """The proof registry a reference work declares, in nav order.

        Empty for a course. This is what makes a reference work navigable without
        a syllabus: it has no chapters to list, so its nav comes from here and its
        pages are authored rather than generated. It is also the registry
        `textbook.proofs` serves to the `:::prove` directive, which reads it
        through `config.extra` so a book and the hook cannot disagree about what
        exists.
        """
        return list(self.curriculum_data.get("proofs", []) or [])

    @property
    def higher_sections(self) -> frozenset[str]:
        """Section ids (e.g. '12.5') that are Higher-only."""
        return frozenset(
            section["id"]
            for chapter in self.chapters
            for section in chapter.get("sections", [])
            if section.get("tier") == "H"
        )

    @property
    def chapter_count(self) -> int:
        return len(self.chapters)

    @property
    def section_count(self) -> int:
        return sum(len(chapter.get("sections", [])) for chapter in self.chapters)


# Every loader below is cached for the duration of a process. They are pure
# functions of files that do not change while a build runs, and they are called
# very often: resolving the current book goes through ``discover_books``, which
# reaches ``load_collection`` and ``load_book``.
#
# Measured before this was added: a single-page render re-parsed collection.yaml
# and every book.yaml once per hook, so an 18-page build made 73 ``yaml.safe_load``
# calls and spent 63% of its time in YAML. Callers only read what these return;
# none of them mutate it.


@lru_cache(maxsize=None)
def load_book(path: Path) -> Book:
    path = Path(path)
    data = yamlio.load_file(path) or {}
    return Book(
        id=data["id"],
        title=data["title"],
        qualification=data.get("qualification", ""),
        subject=data.get("subject", ""),
        description=" ".join(str(data.get("description", "")).split()),
        root=path.parent,
        boards=tuple(data.get("boards", ())),
        profiles=tuple(Profile.from_dict(p) for p in data.get("profiles", ())),
        theme=Theme.from_dict(data.get("theme")),
        tier_axis=dict(data.get("tier_axis", {})),
        oracles=tuple(data.get("oracles", ("sympy",))),
        order=int(data.get("order", 0)),
        curriculum_name=data.get("curriculum", "curriculum.yaml"),
        banks_name=data.get("banks", "problems"),
        booklet_name=data.get("booklet", ""),
        backgrounds=dict(data.get("backgrounds", {}) or {}),
        sources_name=data.get("sources", "sources.yaml"),
    )


def discover_books(root: Path | None = None) -> list[Book]:
    """Every book, in the order the collection presents them."""
    base = (root or repo_root()) / BOOKS_DIR
    books = [load_book(path) for path in sorted(base.glob("*/book.yaml"))]
    order = qualification_order()
    return sorted(books, key=lambda b: (order.get(b.qualification, 99), b.order, b.id))


def book_for_bank(path: Path) -> Book | None:
    """The book whose banks directory contains ``path``, or ``None``.

    Verification reads ``book.yaml → oracles`` to know which oracles a bank may
    use, so a bank path is traced back to the book that owns it.
    """
    path = Path(path).resolve()
    for book in discover_books():
        if book.banks.resolve() in path.parents:
            return book
    return None


@lru_cache(maxsize=None)
def qualification_order(root: Path | None = None) -> dict[str, int]:
    """Position of each qualification, as declared in collection.yaml."""
    collection = load_collection(root)
    return {
        entry["id"]: index
        for index, entry in enumerate(collection.get("qualifications", []))
    }


@lru_cache(maxsize=None)
def load_collection(root: Path | None = None) -> dict:
    path = (root or repo_root()) / COLLECTION_FILE
    if not path.is_file():
        return {}
    return yamlio.load_file(path) or {}


def book_by_id(book_id: str, root: Path | None = None) -> Book:
    for book in discover_books(root):
        if book.id == book_id:
            return book
    raise KeyError(f"no book '{book_id}' under {BOOKS_DIR}/")


#: The qualification a book declares when it is a reference work rather than a
#: course. `collection.yaml` lists it as a group on the landing page. A reference
#: work has no syllabus, no boards and no tier axis, and is the only kind of book
#: the shared proof registry can live in.
REFERENCE = "Reference"


def reference_book(root: Path | None = None) -> Book | None:
    """The collection's reference work, if it has one.

    Found by the qualification it declares rather than by its id, so renaming the
    directory is a rename and not a silent break: a second reference work would be
    ambiguous, and `tests/test_proofs.py` fails on that rather than picking one.
    """
    found = [b for b in discover_books(root) if b.qualification == REFERENCE]
    if len(found) > 1:
        raise ValueError(
            f"{len(found)} books declare the {REFERENCE!r} qualification "
            f"({', '.join(b.id for b in found)}); there must be at most one"
        )
    return found[0] if found else None


@lru_cache(maxsize=None)
def _curriculum(path: str) -> dict:
    return yamlio.load_file(path) or {}


def load_curriculum(book: Book) -> dict:
    return _curriculum(str(book.curriculum))
