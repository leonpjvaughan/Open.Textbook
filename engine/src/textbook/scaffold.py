#!/usr/bin/env python3
"""Scaffold a book's docs tree and generated assets from its curriculum.

Idempotent: a file is only (re)written when it is missing or still carries the
`scaffold:stub` marker. Authored content is never overwritten.

Usage:
    python -m textbook.scaffold                 # every book
    python -m textbook.scaffold gcse-maths      # one book
    python -m textbook.scaffold --dry-run
"""

from __future__ import annotations

import argparse
import hashlib
import os
import re
import sys
import textwrap
from pathlib import Path

import yaml

from . import legal
from . import yamlio

from .book import (
    REFERENCE,
    Book,
    SCHEME_TOKENS,
    discover_books,
    load_collection,
    repo_root,
)
from .book import book_by_id

STUB_MARKER = "<!-- scaffold:stub -->"

BOOKLET_WIDGET = "assets/booklet/booklet.js"

SETTINGS_WIDGET = "assets/settings/settings.js"

COLOPHON_FILE = "colophon.md"
COLOPHON_TITLE = "About this book"

SHARED_FILES: tuple[str, ...] = (
    "assets/stylesheets/themes.css",
    "assets/stylesheets/extra.css",
    "assets/stylesheets/layouts.css",
    "assets/stylesheets/search.css",
    "assets/stylesheets/settings.css",
    "assets/search/search.js",
    "assets/settings/settings.js",
    "assets/offline/offline.js",
    "assets/figures/figures.js",
    "assets/figures/kit.js",
    "assets/figures/kernel.js",
    "assets/figures/kernel-lab.js",
)

SHARED_DIRS: tuple[str, ...] = ("assets/figures/kit", "assets/data/solvers")

SHARED_FIGURE_FILES: tuple[str, ...] = ("figures.js", "kit.js", "kernel.js", "kernel-lab.js")

FIGURE_LIBRARY = "assets/figures"


def digest(path: Path) -> str:
    """Eight hex digits of a file's SHA-256: a cache key short enough for a URL."""
    return hashlib.sha256(path.read_bytes()).hexdigest()[:8]


def addressed_name(path: Path) -> str:
    """``ch10-nth-term.js`` -> ``ch10-nth-term.a1b2c3d4.js``.

    The name is the bytes, so a file that did not change keeps its URL across a
    deploy and a cached copy is still *the* copy. The one place this cannot be
    applied is a module's own relative imports: 213 figure modules write
    ``from "./kit.js"`` and the kit writes ``from "./kit/draw.js"``, so the kit is
    named stably and revalidated by the ETag the Worker sends instead.
    """
    return f"{path.stem}.{digest(path)}{path.suffix}"


def addressed_url(relative: str) -> str:
    """A repository file's site path, with its content-addressed basename.

    Used for the files the *portal* writes at the deployment root, because a book
    page reaches some of them by a root-absolute URL: the two builds must agree on
    the name, and they do not run in a fixed order. They agree because both derive
    it from the same source bytes — not because one reads the other's output.
    """
    path = Path(relative)
    return f"{path.parent.as_posix()}/{addressed_name(path)}" if path.parent.as_posix() != "." else addressed_name(path)


def shared_figure_modules() -> dict[str, Path]:
    """Every shared figure module, by slug.

    Read by the directive's slug registry, by the test that checks every shared module
    against the figure contract, and by nothing else — the build copies the directory
    rather than reading this.
    """
    directory = repo_root() / FIGURE_LIBRARY
    if not directory.is_dir():
        return {}
    return {
        path.stem: path
        for path in sorted(directory.glob("*.js"))
        if path.name not in SHARED_FIGURE_FILES
    }

PAGE_KINDS: tuple[tuple[str, str, str, str], ...] = (
    ("Walkthrough", "walkthrough", "Learn", "learn"),
    ("Guided problems", "guided-problems", "Practise with help", "practise-with-help"),
    ("Problems", "problems", "Practise", "practise"),
)

DEEPER_DIRECTORY = "Deeper"
DEEPER_SLUG = "deeper"
DEEPER_SLUG_PATTERN = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


def page_kind_slugs() -> tuple[str, ...]:
    """The names a book may declare in `book.yaml → section_pages`.

    The **reader-facing** names — `learn`, `practise-with-help`, `practise` — not
    the internal kind ids, because the declaration is written by an author looking
    at a page rather than at the engine. Read from `PAGE_KINDS` rather than written
    again, because a fourth page kind used to mean editing four files and finding
    out at build time whether they agreed.
    """
    return tuple(slug for _directory, _kind, _title, slug in PAGE_KINDS)


def page_kinds_for(declared: tuple[str, ...] | list[str]) -> tuple[str, ...]:
    """A book's declared page slugs as the engine's kind ids, in reading order.

    The order is `PAGE_KINDS` order whatever order the declaration uses: a book
    chooses *which* pages a section has, not the order a reader meets them in. An
    unknown name raises here rather than quietly generating nothing, because a
    typo in `section_pages` would otherwise be three missing pages discovered at
    the build.
    """
    known = page_kind_slugs()
    wanted = set(declared)
    unknown = sorted(wanted - set(known))
    if unknown:
        raise ValueError(
            f"section_pages {unknown} are not page kinds; choose from {list(known)}"
        )
    return tuple(kind for _directory, kind, _title, slug in PAGE_KINDS if slug in wanted)


STRAND_FILES = {
    "number": "number.md",
    "algebra": "algebra.md",
    "ratio": "ratio.md",
    "geometry": "geometry.md",
    "probability": "probability.md",
    "statistics": "statistics.md",
    "mechanics": "mechanics.md",
    "electricity": "electricity.md",
    "waves": "waves.md",
    "energy": "energy.md",
    "particles": "particles.md",
}

written: list[Path] = []
skipped: list[Path] = []


def emit(path: Path, content: str, dry_run: bool) -> None:
    if path.exists():
        existing = path.read_text(encoding="utf-8")
        if STUB_MARKER not in existing:
            skipped.append(path)
            return
    written.append(path)
    if not dry_run:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content, encoding="utf-8")


def generate(path: Path, content: str, dry_run: bool) -> None:
    """Write a *generated* file, always, replacing whatever is there.

    Used for files whose content depends on data that can change without a
    content edit — the About page's licence comes from collection.yaml, so it
    cannot be a stub that is written once.
    """
    written.append(path)
    if not dry_run:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content, encoding="utf-8")


LAYOUTS_DIR = "assets/stylesheets/layouts"


def layouts_stylesheet(directory: Path | None = None) -> str:
    """Every layout sheet, ordered by id, as the one ``layouts.css`` a page links.

    One file rather than one per layout, so a reader who switches layout needs no
    second request; each sheet scopes itself to its own ``data-style``.
    """
    directory = directory or repo_root() / LAYOUTS_DIR
    parts = [
        "/* GENERATED by `python -m textbook.scaffold` from assets/stylesheets/layouts/*.css.",
        " * Do not edit: change a layout's own sheet and re-run the scaffold.",
        " */",
    ]
    for path in sorted(directory.glob("*.css")):
        parts += ["", f"/* {path.stem} */", path.read_text(encoding="utf-8").strip("\n")]
    return "\n".join(parts) + "\n"


def write_shared_stylesheets(dry_run: bool) -> None:
    """Emit themes.css and layouts.css, once for the collection, for every book to share.

    Adding a bundle or a layout therefore needs no book rebuild, and the reader
    switches between them in the browser.
    """
    from .themes import default_bundle, ordered_bundles, stylesheet

    sheets = repo_root() / "assets" / "stylesheets"
    outputs = {
        sheets / "themes.css": lambda: stylesheet(ordered_bundles(), default_bundle()),
        sheets / "layouts.css": layouts_stylesheet,
    }
    for path, render in outputs.items():
        written.append(path)
        if dry_run:
            continue
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(render(), encoding="utf-8")


def create(path: Path, content: str, dry_run: bool) -> None:
    """Write an *authored* file once; never overwrite it afterwards."""
    if path.exists():
        skipped.append(path)
        return
    written.append(path)
    if not dry_run:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content, encoding="utf-8")


def front_matter(**fields: object) -> str:
    body = yaml.safe_dump(fields, sort_keys=False, allow_unicode=True).strip()
    return f"---\n{body}\n---\n"


def stub_page(fm: str, heading: str, *body: str) -> str:
    """A generated page: its front matter, the stub marker, an H1, then the body.

    Every stub below is these four things and nothing else, so the shape is stated
    once. The marker sits exactly where `create` looks for it, which is what makes a
    stub regenerable and an authored page safe from being overwritten.
    """
    return "\n".join([fm, f"{STUB_MARKER}\n", f"# {heading}\n", *body])


def section_stub(chapter: dict, section: dict, kind: str) -> str:
    titles = {kind: title for _, kind, title, _ in PAGE_KINDS}
    fields: dict[str, object] = {
        "title": f"{section['id']} {section['title']} — {titles[kind]}",
        "chapter": chapter["id"],
        "chapter_title": chapter["title"],
        "section": section["id"],
        "section_title": section["title"],
    }
    if section.get("tier"):
        fields["tier"] = section["tier"]
    fields["refs"] = section.get("refs", [])
    fields["kind"] = kind
    fm = front_matter(**fields)
    guidance = {
        "walkthrough": (
            "Teaching narrative and fully worked examples. At least one Tier-1 or "
            "Tier-2 interactive figure where a parameter is worth manipulating. "
            "State prerequisites and learning objectives at the top."
        ),
        "guided-problems": (
            "Scaffolded practice with progressive exposure: the student attempts each "
            "step, then reveals a hint or a fuller worked step only if needed."
        ),
        "problems": (
            "Independent, homework-style practice. Answers and concise solutions in a "
            "collapsed block. Mark Higher-only questions explicitly."
        ),
    }
    tier_note = f"Tier: **{section['tier']}** · " if section.get("tier") else ""
    return stub_page(
        fm,
        f"{section['id']} {section['title']} — {titles[kind]}",
        f"> **Stub.** {guidance[kind]}\n"
        f"> {tier_note}refs: "
        f"{', '.join(section.get('refs', [])) or '—'}\n",
    )


def chapter_stub(chapter: dict) -> str:
    fm = front_matter(
        title=f"Chapter {chapter['id']}: {chapter['title']}",
        chapter=chapter["id"],
        strand=chapter["strand"],
    )
    lines: list[str] = [f"{chapter['summary']}\n"]
    anchor = chapter.get("anchor")
    if anchor:
        lines.append("## The chapter problem\n")
        lines.append(f"**{anchor['title']}.** {anchor['brief']}\n")
    if chapter.get("application"):
        lines.append(f"**Where it is used:** {chapter['application']}\n")
    if chapter.get("relevance_prompt"):
        lines.append("## Your turn to connect it\n")
        lines.append(f"{chapter['relevance_prompt']}\n")
        lines.append(":::figure relevance-prompt\n")
    lines.append("## Sections\n")
    for s in chapter["sections"]:
        tier = f"tier {s['tier']} · " if s.get("tier") else ""
        lines.append(
            f"- **{s['id']} {s['title']}** — {tier}"
            f"refs {', '.join(s.get('refs', [])) or '—'}"
        )
    lines.append("")
    return stub_page(fm, f"Chapter {chapter['id']}: {chapter['title']}", *lines)


def review_stub(chapter: dict) -> str:
    fm = front_matter(
        title=f"Chapter {chapter['id']}: Review",
        chapter=chapter["id"],
        kind="review",
    )
    anchor = chapter.get("anchor")
    anchor_line = (
        f"Resolve the chapter problem — **{anchor['title']}** — now that every section "
        "is available.\n"
        if anchor
        else "Resolve the chapter problem.\n"
    )
    return stub_page(
        fm,
        f"Chapter {chapter['id']}: Review",
        f"> **Stub.** {anchor_line}"
        "> Then set interleaved mixed practice across this chapter and earlier "
        "chapters, with method-selection prompts (\u201cwhich method, and why?\u201d).\n",
    )


def glossary_stub(strands: list[dict]) -> str:
    fm = front_matter(title="Glossary")
    lines = [
        "Definitions of the terms used in this book. Each strand page is maintained "
        "alongside the chapters that use it; a term is defined once, here.\n"
    ]
    for strand in strands:
        filename = STRAND_FILES.get(strand["id"], f"{strand['id']}.md")
        lines.append(f"- [{strand['title']}]({filename})")
    lines.append("")
    return stub_page(fm, "Glossary", *lines)


def strand_glossary_stub(strand: dict) -> str:
    fm = front_matter(title=f"Glossary — {strand['title']}", strand=strand["id"])
    return stub_page(
        fm,
        f"Glossary — {strand['title']}",
        "> **Stub.** Terms introduced by this strand's chapters, alphabetically.\n",
    )


_USE_COLLECTION = object()


def collection_licence() -> object | None:
    """The collection's licence, or None while the author has not chosen one.

    It lives in collection.yaml because a licence covers the whole collection,
    not one book. Reading it when the page is generated means choosing one is a
    one-line change there, and no page ever carries a placeholder licence.
    """
    return load_collection().get("licence")


def _licence_markdown(licence: object) -> str:
    """A licence value as inline markdown.

    ``licence`` is normally a string (a name, or a name and a URL). A mapping
    with ``name`` and ``url`` is also accepted, so the name can link to the full
    terms without the author writing markdown in YAML.
    """
    if isinstance(licence, dict):
        name = str(licence.get("name", "")).strip()
        url = str(licence.get("url", "")).strip()
        if name and url:
            return f"[{name}]({url})"
        return name or url
    return str(licence).strip()


def _sources_data(book: Book) -> dict:
    """The book's sources.yaml, or an empty mapping when it has none."""
    if not book.sources.is_file():
        return {}
    return yamlio.load_file(book.sources) or {}


def _join_words(items) -> str:
    """A list as a reader would say it: ``A, B and C``."""
    words = [str(item).strip() for item in items if str(item).strip()]
    if not words:
        return ""
    if len(words) == 1:
        return words[0]
    return ", ".join(words[:-1]) + " and " + words[-1]


_NUMBER_WORDS = {
    0: "no",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
}


def _number_word(count: int) -> str:
    return _NUMBER_WORDS.get(count, str(count))


PAGE_SENTENCE = {
    "walkthrough": "**Learn** teaches the ideas and the method.",
    "guided-problems": (
        "**Practise with help** gives questions with hints you can reveal."
    ),
    "problems": (
        "**Practise** gives independent questions, with the answers at the end."
    ),
}


def _attribution_links(book: Book) -> list[str]:
    references = _sources_data(book).get("references", [])
    links: list[str] = []
    for reference in references:
        if not isinstance(reference, dict) or not reference.get("attribution"):
            continue
        title = str(reference.get("title", "")).strip()
        url = str(reference.get("url", "")).strip()
        if title and url:
            links.append(f"- [{title}]({url})")
    return links


def _wrapped(text: str, width: int = 78) -> list[str]:
    """A config scalar as page lines, one paragraph at a time.

    **Why paragraphs survive.** A folded YAML scalar (`>-`) joins every line with a
    space, so a two-paragraph description written that way reaches the page as one
    paragraph. A literal block (`|-`) keeps the newlines, and this splits on the blank
    line between them and wraps each paragraph to the width an authored page obeys.
    The first reference work's About page was written as two lists of strings here for
    exactly that reason; the data now says what the page should say.
    """
    paragraphs = [p for p in text.strip().split("\n\n")]
    out: list[str] = []
    for index, paragraph in enumerate(paragraphs):
        if index:
            out.append("")
        out.extend(textwrap.wrap(" ".join(paragraph.split()), width))
    return out


def colophon_page(book: Book, licence: object = _USE_COLLECTION) -> str:
    """The reader-facing page about the book: what it is and where it came from.

    It answers the questions a reader is entitled to ask — what this is, who
    made it, whether the answers can be trusted, and what to do about a mistake —
    and it carries the attribution the sources require. The licence is read from
    collection.yaml and rendered only when it is set (`_USE_COLLECTION`), so
    choosing one is a data change and a placeholder licence is impossible.

    Everything subject-specific comes from the book and its sources.yaml, so a
    new book needs no code change here.
    """
    if licence is _USE_COLLECTION:
        licence = collection_licence()
    licence_md = _licence_markdown(licence) if licence else ""

    sources = _sources_data(book)
    retrieved = str(sources.get("retrieved") or "").strip()
    meta = book.curriculum_data.get("meta", {})
    jurisdiction = str(meta.get("jurisdiction") or "").strip()
    if not jurisdiction and book.qualification != REFERENCE and not meta.get("what_it_is"):
        raise ValueError(
            f"{book.id}: curriculum.yaml has no meta.jurisdiction, so the About page "
            "cannot say which country this book is for"
        )
    level_word = str(meta.get("level_word") or "level").strip()
    curriculum_body = str(meta.get("curriculum_body") or "").strip()
    curriculum_licence = meta.get("curriculum_licence") or None
    tiers = ""
    if book.tier_axis:
        tiers = str(book.tier_axis.get(book.lower_code, "")).strip()
    boards = _join_words(book.boards)

    if book.qualification == REFERENCE:
        stated = str(meta.get("what_it_is") or "").strip()
        if not stated:
            raise ValueError(
                f"{book.id}: a reference work must say what it is, in "
                "curriculum.yaml -> meta.what_it_is. The About page is generated, "
                "and the engine no longer holds one book's description of itself."
            )
        what_it_is = _wrapped(stated)
    else:
        kinds = book.section_page_kinds
        stated = str(meta.get("what_it_is") or "").strip()
        if stated:
            what_it_is = _wrapped(stated)
        else:
            what_it_is = [
                f"This is a complete {book.qualification} {book.subject} book for "
                f"{jurisdiction}."
            ]
        levels = f"{tiers} {level_word}" if tiers else ""
        if levels and boards:
            what_it_is.append(
                f"It covers {levels}, and it follows the specifications of {boards}."
            )
        elif levels:
            what_it_is.append(f"It covers {levels}.")
        elif boards:
            what_it_is.append(f"It follows the specifications of {boards}.")
        named = {kind: title for _directory, kind, title, _slug in PAGE_KINDS}
        if kinds:
            plural = "page" if len(kinds) == 1 else "pages"
            what_it_is.append(f"Every section has {_number_word(len(kinds))} {plural}.")
            what_it_is += [
                PAGE_SENTENCE[kind] for kind in kinds if kind in PAGE_SENTENCE
            ]
        if book.deeper_pages:
            what_it_is += [
                "Some sections offer an optional page as well, for a reader who wants",
                "more. You never need one to follow the chapter.",
            ]
        what_it_is += [
            "You can read the whole book in a browser, and there is nothing to",
            "install.",
        ]
        if "problems" in kinds:
            what_it_is.append(
                "Each chapter opens with a problem you can solve by the end, and closes "
                "with a **Review**."
            )
        else:
            what_it_is.append(
                "Each chapter opens with a question you can answer by the end, and "
                "closes with a **Review**."
            )

    lines = [
        "<!-- Generated from collection.yaml and sources.yaml.",
        "     Do not edit this file: edit the sources and regenerate. -->",
        "",
        "# About this book",
        "",
        "## What this book is",
        "",
        *what_it_is,
        "",
        "## Before you use this book",
        "",
        *legal.disclaimer_lines(book),
        "",
        "## Who made it",
        "",
        "This book is part of **Open.Textbook**, an independent project by Leon",
        "Vaughan, who wrote and assembled it.",
    ]
    if book.qualification != REFERENCE and "problems" in book.section_page_kinds:
        lines += [
            "",
            "## Answers are checked by a computer",
            "",
            "The questions and answers in **Practise** come from one set of data. "
            "Before",
            "the book is published, a computer checks that data with SymPy, a computer",
            "algebra system. The check tests each step against the claim it makes, so a",
            "page cannot show an answer the check did not pass.",
            "",
            "The check proves the mathematics. It cannot judge whether an explanation "
            "is",
            "clear. If a page is confusing, report it, even when the answer is correct.",
        ]
    lines += [
        "",
        "## Where the content comes from",
        "",
    ]
    if book.qualification == REFERENCE and book.proofs:
        lines += [
            "Every claim about which course a proof belongs to rests on a published",
            "specification, and each one is named below.",
        ]
    elif book.qualification == REFERENCE:
        lines += [
            "Every claim about a method rests on a textbook or a paper, and the",
            "reference says whether it is the source of a claim or further reading.",
        ]
    elif meta.get("syllabus") is False:
        lines += [
            "This book follows no syllabus, and it is not tied to a country's",
            "curriculum.",
        ]
    elif curriculum_licence:
        name = str(curriculum_licence.get("name", "")).strip()
        url = str(curriculum_licence.get("url", "")).strip()
        notice = str(curriculum_licence.get("notice", "")).strip()
        holder = f"That material is {notice}, and it is used here" if notice else (
            "That material is used here"
        )
        lines += [
            f"The curriculum follows the subject content published by "
            f"{curriculum_body}.",
            f"{holder} under the [{name}]({url}).",
        ]
    elif curriculum_body:
        lines += [
            f"The curriculum follows the subject content published by "
            f"{curriculum_body}.",
            "That material remains the property of that body, and is referred to here",
            "rather than reproduced.",
        ]
    else:
        lines += [
            "The curriculum this book follows is named in the list of sources below.",
        ]
    source_note = str(sources.get("note") or "").strip()
    if source_note:
        lines += ["", *textwrap.wrap(" ".join(source_note.split()), 78)]
    specification_note = str(meta.get("specification_note") or "").strip()
    if specification_note:
        lines += ["", *specification_note.splitlines()]
    elif boards:
        lines += [
            "",
            "The specification content, and any wording taken from a specification,",
            f"belongs to the awarding bodies. {boards} publish the specifications",
            "this book follows.",
        ]
    if book.booklet_name:
        booklet_note = str(meta.get("booklet_note") or "").strip()
        lines += [""]
        if booklet_note:
            lines += booklet_note.splitlines()
        else:
            lines += [
                "The formulae and tables in the **Formulae** booklet are the awarding",
                "bodies' own sheets. Ofqual decides which material the boards must",
                "provide.",
            ]
    links = _attribution_links(book)
    if links:
        lines += [
            "",
            "The claims in this book rest on these documents:",
            "",
        ]
        lines += links
    if retrieved:
        lines += [
            "",
            f"These sources were last checked on {retrieved}.",
        ]
    lines += [
        "",
        "No awarding body endorses this book, and no curriculum body supplies it.",
        "",
        "## Reporting a mistake",
        "",
        "If you find a mistake, report it as an issue on the project's GitHub page:",
        "<https://github.com/leonpjvaughan/Open.Textbook/issues/new>.",
        "",
        "That route needs a free GitHub account. The project has no email address,",
        "because it does not run a mail service.",
        "",
        "In your report, say which page you were reading, what you expected, and what",
        "you saw. That is enough to find the mistake and fix it.",
    ]
    lines += [
        "",
        "The [terms of use](/terms/) and [acknowledgements](/acknowledgements/)",
        "cover the whole collection.",
    ]
    if licence_md:
        lines += [
            "",
            "## Licence",
            "",
            f"This book is available under {licence_md}. That covers the text and",
            "figures written for this book. Material from the sources listed above",
            "keeps its own copyright and licence.",
        ]
    lines.append("")
    return "\n".join(lines)


def home_stub(book: Book, chapters: list[dict]) -> str:
    fm = front_matter(title=book.title)
    total_sections = sum(len(c["sections"]) for c in chapters)
    lines = [f"{book.description}\n"]
    lines.append(
        f"- {len(chapters)} chapter{'s' if len(chapters) != 1 else ''}, "
        f"{total_sections} section{'s' if total_sections != 1 else ''}\n"
    )
    if book.tier_axis:
        levels = str(book.tier_axis.get(book.lower_code, "")).strip()
        if levels:
            lines.append(f"- Tiers: {levels}\n")
    lines.append(f"- Awarding bodies: {', '.join(book.boards) or '—'}\n")
    lines.append("## Chapters\n")
    for c in chapters:
        lines.append(f"1. [Chapter {c['id']}: {c['title']}](Chapter {c['id']}/index.md)")
    lines.append("")
    lines.append(":::disclaimer")
    lines.append("")
    return stub_page(fm, book.title, *lines)




def theme_css(book: Book) -> str:
    """The book's subject tint, generated from ``book.yaml``.

    These are ``--tb-book-*`` values, not final tokens: each theme bundle in
    assets/stylesheets/themes.css composes them in, and may refuse one by listing
    it under ``fixed:``. So a book states its identity once and every bundle
    decides how to use it. See SHAPE.md, "Theme bundles".
    """
    lines = [
        "/* GENERATED by `python -m textbook.scaffold` from book.yaml.",
        " * Do not edit: set the values under `theme` in book.yaml and re-run.",
        " *",
        " * This book's subject tint. Theme bundles compose these in; see",
        " * assets/stylesheets/themes.css and SHAPE.md, \"Theme bundles\".",
        " */",
    ]
    for scheme in book.theme.variations:
        if not scheme.tokens:
            continue
        attr = "default" if scheme.scheme == "default" else "slate"
        lines.append("")
        lines.append(f"/* {scheme.scheme} variation */")
        lines.append(f'body[data-md-color-scheme="{attr}"] {{')
        for key, value in scheme.tokens.items():
            lines.append(f"  --tb-book-{key.replace('_', '-')}: {value};")
        lines.append("}")
    if len(lines) == 6:
        lines.append("")
        lines.append("/* This book adds no tint of its own. */")
        return "\n".join(lines) + "\n"
    header, body = lines[:6], lines[6:]
    indented = [f"  {line}" if line else "" for line in body]
    return "\n".join([*header, "", "@layer book {", *indented[1:], "}"]) + "\n"


def local_css(book: Book) -> str:
    return (
        f"/* Style overrides for {book.title}.\n"
        " *\n"
        " * Loaded after the shared design system and the generated tokens, so a\n"
        " * rule here wins. Prefer setting token values in book.yaml; keep this file\n"
        " * for components that are genuinely specific to this book, and keep it\n"
        " * small — a book should be recognisable, not a different design system.\n"
        " */\n"
        "\n"
        "@layer book {}\n"
    )




def build_curriculum_map(book: Book, strands: list[dict], chapters: list[dict]) -> str:
    """Reverse index: every curriculum content item -> the sections that teach it."""
    meta = book.curriculum_data.get("meta", {})
    coverage = book.curriculum_data.get("coverage", [])
    rev: dict[str, list[str]] = {}
    for c in chapters:
        for s in c["sections"]:
            for ref in s.get("refs", []):
                rev.setdefault(ref, []).append(f"{s['id']} {s['title']}")
    lines = [
        "<!-- GENERATED by `python -m textbook.scaffold` from curriculum.yaml. "
        "Do not edit. -->",
        "",
        f"# Curriculum map — {book.qualification} {book.subject}",
        "",
        f"_{meta.get('title', book.title)} · generated {meta.get('retrieved', '')}_",
        "",
        "The authoritative document is named in `sources.yaml`. Every item is "
        "mapped below to at least one section; the scaffold fails loudly if any "
        "item has no home.",
        "",
    ]
    strand_of = {s["id"]: s["title"] for s in strands}
    for group in coverage:
        prefix = group["prefix"]
        lines.append(f"## {prefix} — {strand_of.get(group['strand'], group['strand'])}")
        lines.append("")
        lines.append("| Item | Taught in |")
        lines.append("|---|---|")
        for i in range(1, int(group["items"]) + 1):
            ref = f"{prefix}{i}"
            where = "; ".join(rev.get(ref, [])) or "**UNMAPPED**"
            lines.append(f"| {ref} | {where} |")
        lines.append("")
    if meta.get("note"):
        lines.append(str(meta["note"]).strip())
        lines.append("")
    return "\n".join(lines)




def _chapter_in_build(chapter: dict, included_tiers: frozenset[str] | None) -> bool:
    """Whether this build includes any section of the chapter.

    A chapter whose every section is above the build has no opener and no Review a
    reader could use: listing it would link two pages the build does not write.
    """
    if included_tiers is None or not chapter.get("sections"):
        return True
    return any(
        not section.get("tier") or section["tier"] in included_tiers
        for section in chapter["sections"]
    )


def build_nav_list(
    strands: list[dict],
    chapters: list[dict],
    included_tiers: frozenset[str] | None = None,
    proofs: list[dict] | None = None,
    page_kinds: tuple[str, ...] | None = None,
    deepers: list[dict] | None = None,
    pages: list[dict] | None = None,
    section_page_label: str = "",
) -> list[dict]:
    """The sidebar and page list.

    Two shapes, and a book is one or the other. A course has strands, a glossary
    and chapters of pages. A **reference work** has none of those: it declares no
    chapters, so it is listed from its own registry and every page under `docs/`
    is authored. The glossary is emitted only when there are strands, because a
    glossary of nothing is a page a reader has to walk past.

    ``page_kinds`` is the book's own declaration (``Book.section_page_kinds``) and
    ``deepers`` its optional depth pages (``Book.deeper_pages``); the pipeline
    passes both, so the nav and the scaffold cannot disagree about what a section
    has. The defaults — every kind, no depth pages — are for a caller holding
    chapter data but no book, and are the shape every course book uses.

    ``pages`` is a reference work's registry, and its entries may nest: a page whose
    path is ``averaging/error-bars/index.md`` is listed as a child of the entry whose
    path is ``averaging/index.md``. See the block that builds it for why the path's
    shape is the rule rather than a second field.
    """
    kinds = tuple(page_kinds or (kind for _directory, kind, _title, _slug in PAGE_KINDS))
    wanted = set(kinds)
    by_section: dict[tuple[str, str], list[dict]] = {}
    for page in deepers or []:
        by_section.setdefault((str(page["chapter"]), str(page["section"])), []).append(page)

    nav: list[dict] = [{"Home": "index.md"}]
    if strands:
        glossary_children = [{"Overview": "Glossary/index.md"}]
        for strand in strands:
            filename = STRAND_FILES.get(strand["id"], f"{strand['id']}.md")
            glossary_children.append({strand["title"]: f"Glossary/{filename}"})
        nav.append({"Glossary": glossary_children})
    for proof in proofs or []:
        nav.append({proof["title"]: f"{proof['id']}/index.md"})
    grouped: dict[str, list[dict]] = {}
    top_level: list[dict] = []
    registered = {
        str(page["path"]).split("/")[0]
        for page in pages or []
        if len(str(page["path"]).split("/")) == 2
    }
    for page in pages or []:
        parts = str(page["path"]).split("/")
        if len(parts) < 3:
            top_level.append({str(page["title"]): str(page["path"])})
            continue
        slug = parts[0]
        if slug not in registered:
            raise ValueError(
                f"{page['path']}: a nested page whose parent {slug}/index.md is not "
                "in the registry, so the nav has nothing to nest it under"
            )
        grouped.setdefault(slug, []).append({str(page["title"]): str(page["path"])})
    for entry in top_level:
        (title, path), = entry.items()
        children = grouped.get(path.split("/")[0])
        if children:
            nav.append({title: [{"Overview": path}, *children]})
        else:
            nav.append(entry)
    for c in chapters:
        if not _chapter_in_build(c, included_tiers):
            continue
        children = [{"Overview": f"Chapter {c['id']}/index.md"}]
        for s in c["sections"]:
            if s.get("tier") and s["tier"] not in included_tiers:
                continue
            base = f"Chapter {c['id']}/Section {s['id']}"
            section_children = [
                {title: f"{base}/{directory}/index.md"}
                for directory, kind, title, _slug in PAGE_KINDS
                if kind in wanted
            ]
            section_children.extend(
                {page["title"]: page["path"]}
                for page in by_section.get((str(c["id"]), str(s["id"])), [])
            )
            label = f"{s['id']} {s['title']}"
            if len(kinds) == 1 and len(section_children) == 1:
                children.append({label: next(iter(section_children[0].values()))})
            else:
                if len(kinds) == 1:
                    section_children[0] = {
                        section_page_label or "Overview": next(iter(section_children[0].values()))
                    }
                children.append({label: section_children})
        children.append({"Review": f"Chapter {c['id']}/Review/index.md"})
        nav.append({f"Chapter {c['id']}: {c['title']}": children})
    nav.append({COLOPHON_TITLE: COLOPHON_FILE})
    return nav


def site_url(book: Book, profile_id: str) -> str:
    """Absolute URL for this profile, from the collection's base URL.

    The profile root a reader lands on, and what every page's `<link
    rel="canonical">` is built from.
    """
    from .book import load_collection

    base = str(load_collection().get("base_url", "")).strip().rstrip("/")
    if not base:
        return ""
    return f"{base}/{book.deploy_path(profile_id)}/"




def check_full_coverage(book: Book) -> list[str]:
    """Curriculum items the plan does not teach anywhere."""
    coverage = book.curriculum_data.get("coverage", [])
    cited = {
        ref
        for c in book.chapters
        for s in c.get("sections", [])
        for ref in s.get("refs", [])
    }
    return [
        f"{group['prefix']}{i}"
        for group in coverage
        for i in range(1, int(group["items"]) + 1)
        if f"{group['prefix']}{i}" not in cited
    ]




def scaffold(book: Book, dry_run: bool) -> None:
    data = book.curriculum_data
    strands = data.get("strands", [])
    chapters = data.get("chapters", [])
    docs = book.docs

    emit(docs / "index.md", home_stub(book, chapters), dry_run)
    generate(docs / COLOPHON_FILE, colophon_page(book), dry_run)
    if strands:
        emit(docs / "Glossary" / "index.md", glossary_stub(strands), dry_run)
        for strand in strands:
            filename = STRAND_FILES.get(strand["id"], f"{strand['id']}.md")
            emit(docs / "Glossary" / filename, strand_glossary_stub(strand), dry_run)

    for c in chapters:
        chapter_dir = docs / f"Chapter {c['id']}"
        emit(chapter_dir / "index.md", chapter_stub(c), dry_run)
        for s in c["sections"]:
            base = chapter_dir / f"Section {s['id']}"
            for directory, kind, _title, _slug in PAGE_KINDS:
                if kind not in book.section_page_kinds:
                    continue
                emit(base / directory / "index.md", section_stub(c, s, kind), dry_run)
        emit(chapter_dir / "Review" / "index.md", review_stub(c), dry_run)


    stylesheets = docs / "assets" / "stylesheets"
    written.append(stylesheets / "book.css")
    create(stylesheets / "book-local.css", local_css(book), dry_run)
    if not dry_run:
        stylesheets.mkdir(parents=True, exist_ok=True)
        (stylesheets / "book.css").write_text(theme_css(book), encoding="utf-8")


    map_out = book.root / "CURRICULUM-MAP.md"
    written.append(map_out)
    if not dry_run:
        map_out.write_text(build_curriculum_map(book, strands, chapters), encoding="utf-8")
    banks = book.root / book.banks_name
    if not dry_run:
        banks.mkdir(parents=True, exist_ok=True)
        keep = banks / ".gitkeep"
        if not keep.exists():
            keep.write_text("", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description="Scaffold books from curriculum.yaml.")
    parser.add_argument("books", nargs="*", help="book ids (default: all)")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    books = [book_by_id(b) for b in args.books] if args.books else discover_books()

    write_shared_stylesheets(args.dry_run)

    failures = 0
    for book in books:
        gaps = check_full_coverage(book)
        if gaps:
            print(
                f"ERROR: {book.id}: curriculum items with no section: " + ", ".join(gaps),
                file=sys.stderr,
            )
            failures += 1

    if failures:
        return 1

    for book in books:
        scaffold(book, args.dry_run)

    print(f"written: {len(written)}")
    print(f"skipped (authored): {len(skipped)}")
    if args.dry_run:
        for path in written[:20]:
            print("  would write", path.relative_to(repo_root()))
        if len(written) > 20:
            print(f"  ... and {len(written) - 20} more")
    return 0


if __name__ == "__main__":
    sys.exit(main())
