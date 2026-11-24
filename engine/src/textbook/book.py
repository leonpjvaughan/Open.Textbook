"""Load a book's identity and build metadata from ``books/<id>/book.yaml``.

That file is the one place a book declares what it is, so adding a book is data
rather than code. The collection is described by ``collection.yaml`` at the root.
"""

from __future__ import annotations

import os
import re
from dataclasses import dataclass, field
from functools import lru_cache
from pathlib import Path

import yaml

from . import yamlio

COLLECTION_FILE = "collection.yaml"
BOOKS_DIR = "books"

# engine names, and a fallback rather than a design.
HOUSE_ACCENT = "#2f6690"
HOUSE_ACCENT_DARK_SCHEME = "#6ea8d8"

SCHEME_TOKENS: dict[str, str] = {
    "accent": "--tb-accent",
    "accent_light": "--tb-accent-light",
    "accent_dark": "--tb-accent-dark",
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
    """The repository root: ``TEXTBOOK_ROOT`` if set, else the nearest parent with
    ``collection.yaml``, else the editable install's path.
    """
    override = os.environ.get("TEXTBOOK_ROOT")
    if override:
        return Path(override).resolve()
    here = Path.cwd().resolve()
    for candidate in (here, *here.parents):
        if (candidate / COLLECTION_FILE).is_file():
            return candidate
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
    """The token overrides a book declares for one colour scheme; empty means the
    house defaults, which is the common case.
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
    backgrounds: dict = field(default_factory=dict)
    sources_name: str = "sources.yaml"
    section_pages: tuple[str, ...] = ()

    section_page_label: str = ""

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

        Read from ``tier_filter`` and never from the profile's id: a book may name
        its lower-tier profile anything (`foundation`, `ordinary`), so keying on a
        literal id would ship Higher-only content to the wrong reader. An id with no
        declared profile is its own filter.
        """
        try:
            return self.profile(profile_id).tier_filter
        except KeyError:
            return profile_id

    def deploy_path(self, profile_id: str) -> str:
        """Where a profile is deployed, relative to the site root. The profile
        segment appears only when a book has more than one.
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
        """The pages a reference work lists, in nav order, each with a `title` and
        a `path`. A reference work has no chapters and every page is authored, so
        its sidebar comes from here. Not the `proofs` registry, which exists so the
        `:::prove` directive can link; this one exists so a work has a sidebar.
        """
        entries = self.curriculum_data.get("pages") or []
        return [
            entry
            for entry in entries
            if isinstance(entry, dict) and entry.get("path") and entry.get("title")
        ]

    @property
    def proofs(self) -> list[dict]:
        """The proof registry a reference work declares, in nav order; empty for a
        course. The `:::prove` directive reads it through `config.extra`, so a book
        and the hook cannot disagree about what exists.
        """
        return list(self.curriculum_data.get("proofs", []) or [])

    @property
    def tier_codes(self) -> tuple[str, ...]:
        """The tier codes this book uses, ordered **lowest level first**. A code's
        position is its rank: content is studied by every reader at or above it.
        """
        return tuple(self.tier_axis)

    @property
    def lower_code(self) -> str:
        """The lowest tier code, whose label names every level: `F` in England,
        `O` in Ireland. Read from the front of the order, never a literal `F`.
        """
        codes = self.tier_codes
        if not codes:
            raise ValueError(f"{self.id}: tier_axis is empty, so it has no lower code")
        return codes[0]

    def tiers_included(self, tier_filter: str) -> frozenset[str]:
        """The tier codes a build includes: a filter that names a code includes
        every level **up to and including its own**, since lower content is studied
        by every reader above it. `all` (no tier axis) and `toggle` (the development
        build) include everything.
        """
        codes = self.tier_codes
        if tier_filter in ("all", "toggle"):
            return frozenset(codes)
        if tier_filter not in codes:
            raise ValueError(
                f"{self.id}: profile filter {tier_filter!r} is not a tier code "
                f"({', '.join(codes) or 'none declared'}), nor 'all' nor 'toggle'"
            )
        return frozenset(codes[: codes.index(tier_filter) + 1])

    def sections_above(self, tier_filter: str) -> frozenset[str]:
        """Section ids (e.g. '12.5') a build leaves out, so links to pages that
        will not exist are unlinked. See `hooks.tier.strip_excluded_links`.
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

    def chapters_above(self, tier_filter: str) -> frozenset[str]:
        """Chapter ids with no section this build includes.

        The chapter's opener and its Review have no tier of their own, so without
        this they are written and listed by every profile while every section under
        them is absent. See `hooks.tier.on_files` and `scaffold.build_nav_list`.
        """
        included = self.tiers_included(tier_filter)
        return frozenset(
            str(chapter["id"])
            for chapter in self.chapters
            if chapter.get("sections")
            and not any(
                not section.get("tier") or section["tier"] in included
                for section in chapter["sections"]
            )
        )

    @property
    def section_page_kinds(self) -> tuple[str, ...]:
        """The page kinds a section has, in the order a reader meets them.

        One declaration, three readers: the scaffold, the nav and `textbook.lint`.
        Any of them reading a different list is how a book gets a `Practise` page
        its own `book.yaml` denies. Declared by reader-facing name, returned as
        engine kind ids; empty means every kind, which is a course.
        """
        from . import scaffold

        try:
            kinds = scaffold.page_kinds_for(self.section_pages)
        except ValueError as err:
            raise ValueError(f"{self.id}: {err}") from None
        return kinds or scaffold.page_kinds_for(scaffold.page_kind_slugs())

    @property
    def deeper_pages(self) -> list[dict]:
        """Every optional depth page a section declares, in nav order.

        Authored, never scaffolded: the scaffold must not put a stub where one
        goes. ``:::deeper <slug>`` links to it from its section, and the nav lists
        it as that section's child, so it has a real URL and works without script.
        """
        from . import scaffold

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
        section_page_label=str(data.get("section_page_label", "")).strip(),
    )


def discover_books(root: Path | None = None) -> list[Book]:
    """Every book, in the order the collection presents them."""
    base = (root or repo_root()) / BOOKS_DIR
    books = [load_book(path) for path in sorted(base.glob("*/book.yaml"))]
    order = qualification_order()
    return sorted(books, key=lambda b: (order.get(b.qualification, 99), b.order, b.id))


def book_for_bank(path: Path) -> Book | None:
    """The book whose banks directory contains ``path``, or ``None``: verification
    reads that book's ``oracles`` to know what a bank may use.
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


LAYOUTS_DIR = Path("assets") / "stylesheets" / "layouts"
COMPANION_FIELDS = ("kicker", "title", "body", "link", "href")


def band_slug(qualification: str) -> str:
    """The id fragment of a qualification's band: ``band-<slug>``."""
    return re.sub(r"[^a-z0-9]+", "-", qualification.lower()).strip("-")


def layout_thumbnail(layout_id: str, root: Path | None = None) -> Path:
    """The wireframe the Settings dialog shows for a layout, beside its stylesheet."""
    return (root or repo_root()) / LAYOUTS_DIR / f"{layout_id}.svg"


def layout_ids(collection: dict) -> list[str]:
    return [str(entry["id"]) for entry in collection.get("layouts", ())]


def default_layout() -> str:
    """The layout id written to ``<html data-style>`` on every page."""
    return str(load_collection().get("default_layout", ""))


def validate_collection(collection: dict, root: Path) -> None:
    """Raise ``ValueError`` for a layout, region or companion the build cannot use."""
    layouts = collection.get("layouts")
    if layouts is not None:
        if not isinstance(layouts, list) or not layouts:
            raise ValueError("collection.yaml: `layouts` must be a non-empty list")
        seen: set[str] = set()
        for entry in layouts:
            if not isinstance(entry, dict) or not str(entry.get("id", "")).strip():
                raise ValueError(f"collection.yaml: a layout needs an `id`: {entry!r}")
            layout_id = str(entry["id"])
            if not re.fullmatch(r"[a-z][a-z0-9-]*", layout_id):
                raise ValueError(f"collection.yaml: layout id {layout_id!r} is not lowercase-hyphenated")
            if layout_id in seen:
                raise ValueError(f"collection.yaml: layout {layout_id!r} is listed twice")
            seen.add(layout_id)
            for key in ("title", "description"):
                if not str(entry.get(key, "")).strip():
                    raise ValueError(f"collection.yaml: layout {layout_id!r} needs a `{key}`")
            for suffix in (".css", ".svg"):
                needed = root / LAYOUTS_DIR / f"{layout_id}{suffix}"
                if not needed.is_file():
                    raise ValueError(
                        f"collection.yaml: layout {layout_id!r} has no {LAYOUTS_DIR / needed.name}"
                    )
        default = collection.get("default_layout")
        if default not in seen:
            raise ValueError(
                f"collection.yaml: default_layout {default!r} is not one of the layouts {sorted(seen)}"
            )
    elif "default_layout" in collection:
        raise ValueError("collection.yaml: `default_layout` needs `layouts`")

    validate_qualifications(collection.get("qualifications", ()), root)


def validate_qualifications(qualifications, root: Path) -> None:
    """Each qualification's band slug is unique and non-empty, and each companion resolves."""
    built = [load_book(path) for path in sorted((root / BOOKS_DIR).glob("*/book.yaml"))]
    with_books = {book.qualification for book in built}
    slugs: dict[str, str] = {}
    for name in [q.get("id") for q in qualifications] + sorted(with_books):
        if not (isinstance(name, str) and name.strip()):
            raise ValueError(f"collection.yaml: a qualification needs a string `id`: {name!r}")
        slug = band_slug(name)
        if not slug:
            raise ValueError(f"collection.yaml: qualification {name!r} has an empty band slug")
        if slugs.setdefault(slug, name) != name:
            raise ValueError(
                f"collection.yaml: qualifications {slugs[slug]!r} and {name!r} share band-{slug}"
            )
    bands = {f"band-{band_slug(q)}" for q in with_books}

    for qualification in qualifications:
        name = qualification["id"]
        for key in ("title", "note", "region"):
            value = qualification.get(key)
            if value is not None and not (isinstance(value, str) and value.strip()):
                raise ValueError(f"collection.yaml: {key} of {name!r} must be a non-empty string")
        companion = qualification.get("companion")
        if companion is None:
            continue
        if not isinstance(companion, dict):
            raise ValueError(f"collection.yaml: companion of {name!r} must be a mapping")
        missing = [
            f for f in COMPANION_FIELDS
            if not (isinstance(companion.get(f), str) and companion[f].strip())
        ]
        extra = sorted(set(companion) - set(COMPANION_FIELDS))
        if missing or extra:
            raise ValueError(
                f"collection.yaml: companion of {name!r}: missing {missing}, unknown {extra}"
            )
        companion_target(name, companion["href"], bands, built)


def companion_target(name: str, href: str, bands: set[str], built: list[Book]) -> None:
    """A fragment names a band with books; a path names a page a book builds."""
    where = f"collection.yaml: companion of {name!r}"
    if href.startswith("#"):
        if href[1:] not in bands:
            raise ValueError(f"{where}: {href} is not a band with at least one book")
        return
    book_id, _, rest = href.partition("/")
    book = next((b for b in built if b.id == book_id), None)
    if book is None or not rest or "//" in href or ".." in href.split("/"):
        raise ValueError(f"{where}: {href!r} is not `#band-<slug>` or `<book>/<page>/`")
    page = rest.rstrip("/") + ("/index.md" if rest.endswith("/") else "")
    if not (book.docs / page).is_file():
        raise ValueError(f"{where}: {href!r} has no page {page} in {book.id}")


@lru_cache(maxsize=None)
def load_collection(root: Path | None = None) -> dict:
    base = root or repo_root()
    path = base / COLLECTION_FILE
    if not path.is_file():
        return {}
    data = yamlio.load_file(path) or {}
    validate_collection(data, base)
    return data


def book_by_id(book_id: str, root: Path | None = None) -> Book:
    for book in discover_books(root):
        if book.id == book_id:
            return book
    raise KeyError(f"no book '{book_id}' under {BOOKS_DIR}/")


REFERENCE = "Reference"

HIGHER_CODE = "H"


def reference_books(root: Path | None = None) -> list[Book]:
    """Every reference work in the collection, found by qualification rather than
    id, so renaming a directory is not a silent break.
    """
    return [b for b in discover_books(root) if b.qualification == REFERENCE]


def proof_book(root: Path | None = None) -> Book | None:
    """The reference work that holds the shared proof registry: the one declaring
    `proofs:`, not the first found. Exactly one may hold it; `tests/test_proofs.py`
    fails on two rather than picking one.
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

    Found by declaration like the proof book, because `:::class` resolves its links
    against this registry. At most one, else `tests/test_class_links.py` fails.
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
