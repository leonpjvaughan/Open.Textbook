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
    # ``engine/src/textbook/book.py`` -> ``engine/src`` -> ``engine`` -> root.
    return Path(__file__).resolve().parents[3]


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
    #: The kinds of page each section has. Empty means every kind the engine
    #: knows (`scaffold.PAGE_KINDS`) — the three-page formula a course wants. A
    #: book that is not a course declares a shorter list in `book.yaml`:
    #: `section_pages: [learn]`.
    section_pages: tuple[str, ...] = ()

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

        Read from ``tier_filter`` and never from the profile's id. A book may name
        its lower-tier profile anything — `foundation` in England, `ordinary` in
        Ireland — so keying behaviour on a literal id is the same fact written
        twice: a rename, or a book whose id differs from its filter, would silently
        ship Higher-only content to the wrong reader.

        The behaviours are `both` (the reader who studies only the content common
        to both tiers), `higher` (the higher tier, which studies everything),
        `all` (a book with no tier axis) and `toggle` (the development build that
        keeps everything and switches in the browser). An id with no declared
        profile is its own filter.
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
    def pages(self) -> list[dict]:
        """The pages a reference work lists, in nav order.

        A course's navigation comes from its chapters. A reference work has none:
        it is consulted rather than read end to end, and every page under `docs/`
        is authored, so there is nothing for the scaffold to generate and no
        section to hang a page on. It declares its pages here instead — one entry
        per page, with a `title` and a `path` — and the navigation is built from
        that. See `books/numerical-methods/map.yaml`.

        This is a *different* registry from `proofs`. That one is read by the
        `:::prove` directive so another book can link to a page; this one exists
        only so a reference work has a sidebar.
        """
        entries = self.curriculum_data.get("pages") or []
        return [
            entry
            for entry in entries
            if isinstance(entry, dict) and entry.get("path") and entry.get("title")
        ]

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
    def tier_codes(self) -> tuple[str, ...]:
        """The tier codes this book uses, ordered **lowest level first**.

        The order is the whole of the tier model, so it is read from the document
        rather than inferred from the labels: a code's position is its rank, and
        content is studied by every reader at or above that rank.
        """
        return tuple(self.tier_axis)

    @property
    def lower_code(self) -> str:
        """The lowest tier code — the label of which names every level.

        `Foundation and Higher` in England, `Foundation, Ordinary and Higher` in
        Ireland. Read from the front of the order rather than looked up by a
        literal `F`, so a book using `O` for its common content works.
        """
        codes = self.tier_codes
        if not codes:
            raise ValueError(f"{self.id}: tier_axis is empty, so it has no lower code")
        return codes[0]

    def tiers_included(self, tier_filter: str) -> frozenset[str]:
        """The tier codes a build includes, given a profile's declared filter.

        A filter that names a tier code includes every level **up to and including
        its own**, because content at a lower level is studied by every reader above
        it. `all` and any unrecognised filter include everything — which is what a
        book with no tier axis wants, and what keeps `toggle` a whole-book build.
        """
        codes = self.tier_codes
        # The two whole-book behaviours. `all` is a book with no tier axis; `toggle`
        # is the development build, which keeps everything and switches in the
        # browser. Both are declared, not inferred.
        if tier_filter in ("all", "toggle"):
            return frozenset(codes)
        if tier_filter not in codes:
            # Loudly, because the alternative is what this code did first: an
            # unrecognised filter fell through to "include everything", so a typo in
            # `tier_filter` shipped every higher-only page to the lower-tier reader
            # and the build stayed green. The declared values are the tier codes in
            # `tier_axis`, plus `all` and `toggle`.
            raise ValueError(
                f"{self.id}: profile filter {tier_filter!r} is not a tier code "
                f"({', '.join(codes) or 'none declared'}), nor 'all' nor 'toggle'"
            )
        return frozenset(codes[: codes.index(tier_filter) + 1])

    def sections_above(self, tier_filter: str) -> frozenset[str]:
        """Section ids (e.g. '12.5') a build leaves out.

        Used to unlink links to pages that will not exist, so a build does not
        dangle. See `hooks.tier.strip_excluded_links`.
        """
        included = self.tiers_included(tier_filter)
        return frozenset(
            section["id"]
            for chapter in self.chapters
            for section in chapter.get("sections", [])
            if section.get("tier")
            and section["tier"] in self.tier_codes
            and section["tier"] not in included
        )

    @property
    def section_page_kinds(self) -> tuple[str, ...]:
        """The page kinds a section has, in the order a reader meets them.

        **One declaration, three readers.** The scaffold writes a stub for each
        kind, the nav lists each kind, and `textbook.lint` checks the structure
        each kind implies. Reading a different list in any of the three is how a
        book ends up with a `Practise` page its own `book.yaml` says it does not
        have, and a lint rule demanding verified answers on it.

        `book.yaml` declares them by their **reader-facing** name — `learn`,
        `practise-with-help`, `practise` — and this returns the engine's kind ids in
        reading order. An empty declaration means every kind, which is a course.
        """
        from . import scaffold  # local: scaffold imports this module

        try:
            kinds = scaffold.page_kinds_for(self.section_pages)
        except ValueError as err:
            raise ValueError(f"{self.id}: {err}") from None
        return kinds or scaffold.page_kinds_for(scaffold.page_kind_slugs())

    @property
    def deeper_pages(self) -> list[dict]:
        """Every optional depth page a section declares, in nav order.

        A deeper page is **authored, never scaffolded**: it is the track a reader
        takes when they want more than the main thread, so the scaffold has
        nothing to say about its content and must not put a stub where it goes.
        ``:::deeper <slug>`` links to one from the section it belongs to, and the
        nav lists it as a child of that section, so it has a real URL and works
        with scripting off.
        """
        from . import scaffold  # local: scaffold imports this module

        pages: list[dict] = []
        for chapter in self.chapters:
            for section in chapter.get("sections", []):
                seen: set[str] = set()
                for entry in section.get("deeper", []) or []:
                    slug = str(entry.get("slug", "")).strip()
                    title = " ".join(str(entry.get("title", "")).split())
                    where = f"{self.id} Section {section['id']}"
                    if not scaffold.DEEPER_SLUG_PATTERN.match(slug):
                        raise ValueError(
                            f"{where}: deeper page slug {slug!r} is not lowercase "
                            "letters, digits and single hyphens"
                        )
                    if slug in seen:
                        raise ValueError(f"{where}: two deeper pages are named {slug!r}")
                    if not title:
                        raise ValueError(f"{where}: deeper page {slug!r} has no title")
                    seen.add(slug)
                    pages.append(
                        {
                            "chapter": str(chapter["id"]),
                            "section": str(section["id"]),
                            "slug": slug,
                            "title": title,
                            "path": (
                                f"Chapter {chapter['id']}/Section {section['id']}/"
                                f"{scaffold.DEEPER_DIRECTORY}/{slug}/index.md"
                            ),
                        }
                    )
        return pages

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
        section_pages=tuple(data.get("section_pages", ())),
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

#: The tier code that marks content only the higher tier or level studies.
#:
#: One code for the whole collection, because it means the same thing in each
#: jurisdiction: Higher tier in England, Higher level in Ireland. Only the *other*
#: code differs — `F` for "Foundation and Higher", `O` for "Ordinary and Higher" —
#: and a book declares that one in `tier_axis`.
HIGHER_CODE = "H"


def reference_books(root: Path | None = None) -> list[Book]:
    """Every reference work in the collection.

    Found by the qualification each declares rather than by id, so renaming a
    directory is a rename and not a silent break. Several books share the group:
    the proof book is not the only kind of reference work a collection can hold.
    """
    return [b for b in discover_books(root) if b.qualification == REFERENCE]


def proof_book(root: Path | None = None) -> Book | None:
    """The reference work that holds the shared proof registry.

    The one that declares `proofs:`, not the first one found — with more than one
    reference work, "the reference book" is ambiguous, and the proof directive
    would start resolving against whichever happened to sort first. Exactly one
    book may hold the registry; `tests/test_proofs.py` fails on two rather than
    picking one.
    """
    found = [b for b in reference_books(root) if b.proofs]
    if len(found) > 1:
        raise ValueError(
            f"{len(found)} books declare a proof registry "
            f"({', '.join(b.id for b in found)}); there must be at most one"
        )
    return found[0] if found else None


def map_book(root: Path | None = None) -> Book | None:
    """The reference work that lists its own pages: the map of problem classes.

    Found by declaration like the proof book, and for the same reason: the
    `:::class` directive resolves its links against this book's registry, so a
    renamed directory must not silently empty every link. A reference work is the
    only kind of book whose navigation comes from a page registry, so there can be
    at most one — `tests/test_class_links.py` fails on two rather than picking one.
    """
    found = [b for b in reference_books(root) if b.pages]
    if len(found) > 1:
        raise ValueError(
            f"{len(found)} books declare a page registry "
            f"({', '.join(b.id for b in found)}); there must be at most one"
        )
    return found[0] if found else None


@lru_cache(maxsize=None)
def _curriculum(path: str) -> dict:
    return yamlio.load_file(path) or {}


def load_curriculum(book: Book) -> dict:
    return _curriculum(str(book.curriculum))
