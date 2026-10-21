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

# The shared formulae-and-tables widget, loaded only by books that have one.
BOOKLET_WIDGET = "assets/booklet/booklet.js"

# The reader Settings runtime. Loaded by every book, because the control is on
# every page of every book.
SETTINGS_WIDGET = "assets/settings/settings.js"

# The reader-facing page about the book. It is generated rather than authored
# because the licence it may carry is a collection-level decision: the page reads
# `licence` from collection.yaml and shows a licence section only once the author
# has chosen one. See `colophon_page`.
COLOPHON_FILE = "colophon.md"
COLOPHON_TITLE = "About this book"

# The files every book ships, as **repository paths** — which are also their paths
# in the built site. One list, read by `pipeline.copy_assets`.
#
# These used to be symlinked into each book's `docs/assets/`, so a book's tree
# showed which shared files it used. That was MkDocs's requirement: it served only
# `docs_dir`, so anything a page linked had to be inside it. The bespoke pipeline
# reads `assets/` directly, so the links became decoration — and decoration that
# **breaks on Windows**, where git checks a symlink out as a small plain file
# containing its target (see `core.symlinks` in git-config). A build then copied a
# 36-byte `kit.js` holding a path into the site, reported success, and left every
# figure in the book unable to import its scaffolding.
#
# So the sharing is declared once, here, and **materialised by the build** — the
# shape Hugo calls a directory *mount* and Eleventy calls *passthrough copy*: say
# what is shared and let the tool place it. Nothing in the repository is a link.
SHARED_FILES: tuple[str, ...] = (
    "assets/stylesheets/themes.css",
    "assets/stylesheets/extra.css",
    "assets/stylesheets/settings.css",
    "assets/settings/settings.js",
    "assets/figures/figures.js",
    "assets/figures/kit.js",
)

#: Directories whose **whole contents** are shared, copied recursively by the build.
#:
#: The figure kit outgrew one file. It is 25 exports over six layers — text, frame,
#: draw, controls, interact, drag — and `kit.js` is now a barrel that re-exports them,
#: so the 209 modules that write `from "./kit.js"` are unchanged.
#:
#: A directory is declared rather than each module listed. Adding a file to
#: `SHARED_FILES` and forgetting the build was exactly the drift the list above was
#: introduced to remove, and a kit of five or six files is the case where it would
#: happen again: the omission would break every figure in every book at runtime, where
#: the build's own link check cannot see it. Declaring the directory makes the
#: contents shared by construction, and `tests/test_collection.py` compares what is
#: on disk with what the build wrote, so a file that nothing copies fails the suite.
SHARED_DIRS: tuple[str, ...] = ("assets/figures/kit",)

# Files that live in a book's `docs/assets/figures/` but are not figures. The
# loader mounts a module by slug and the kit is imported by one, so neither is a
# slug a `:::figure` directive may name. Read by the directive's slug registry and
# by `pipeline.copy_assets`, so there is one list rather than two.
SHARED_FIGURE_FILES: tuple[str, ...] = ("figures.js", "kit.js")

#: The shared figure library: modules in `assets/figures/` that more than one book
#: mounts.
#:
#: **Why a directory rather than a list.** A figure module is mounted by bare slug —
#: the loader runs `import(`./${slug}.js`)` — so a shared module has to sit *beside the
#: loader* in the built tree, not in a subdirectory. `assets/figures/` already holds
#: the loader, the kit and the kit's layers, and a figure module dropped in beside them
#: resolves `./kit.js` in the source and in the build alike. So the rule is the same one
#: a book's own directory uses:
#:
#: > every `*.js` in `assets/figures/` other than `SHARED_FIGURE_FILES` is a figure
#: > module, and every book can mount it by its filename.
#:
#: A book's own module of the same name is an **error rather than an override**. Two
#: modules with one slug would make the page's meaning depend on build order, and the
#: book can always rename its own.
FIGURE_LIBRARY = "assets/figures"


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

#: The kinds of page a section has. A book may declare a shorter list in
#: `book.yaml → section_pages` — see `Book.section_page_kinds`, which is what the
#: scaffold, the nav and the lint rules all read.
#:
#: One tuple because there were four places that had to agree and no test between
#: them: the URL shaper's slug map, the reader-facing titles a stub is written
#: with, the navigation's page list, and the loop that emits the stubs. Adding a
#: fourth page kind meant editing four files and finding out at a build whether
#: they agreed. The four fields are (directory, kind, reader-facing title, URL
#: segment).
#:
#: The directory names are ours; the titles are the reader's, and `AGENTS.md` is
#: explicit that internal words must never reach a page or a URL. That is why the
#: two differ at all.
PAGE_KINDS: tuple[tuple[str, str, str, str], ...] = (
    ("Walkthrough", "walkthrough", "Learn", "learn"),
    ("Guided problems", "guided-problems", "Practise with help", "practise-with-help"),
    ("Problems", "problems", "Practise", "practise"),
)

#: The directory a section's optional depth pages live under, and its URL segment.
#:
#: One declaration, because four things must agree and none of them can afford to
#: guess: the nav lists the page, the URL shaper slugs the directory, the
#: `:::deeper` directive resolves the target, and the scaffold must **not** write a
#: stub there — a depth page is authored or it does not exist.
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


def write_shared_stylesheets(dry_run: bool) -> None:
    """Emit themes.css: every bundle, for every book to share.

    Written once for the collection, not per book — adding a bundle therefore
    needs no book rebuild, and the reader switches between bundles in the browser.
    """
    from .themes import default_bundle, ordered_bundles, stylesheet

    path = repo_root() / "assets" / "stylesheets" / "themes.css"
    written.append(path)
    if dry_run:
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        stylesheet(ordered_bundles(), default_bundle()), encoding="utf-8"
    )


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
    # The reader-facing page name for each internal `kind`. The navigator
    # (build_nav_list) already uses these names, and an authored page carries
    # one in its title; a stub that used the internal name instead would put
    # "Guided problems" in front of the reader, which the voice rules forbid.
    titles = {kind: title for _, kind, title, _ in PAGE_KINDS}
    # `tier` is optional. A book with a Foundation/Higher axis declares it on
    # every section; a book with none (A-level) omits it, and a page that
    # declares no tier belongs to every reader of that book. The field keeps its
    # place in the front matter when it is present, so the two kinds of book
    # produce the same shape for the keys they share.
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
        # The reader knows this as "the chapter problem"; "anchor problem" is
        # our word for it and never reaches a page (see `textbook.lint`).
        lines.append("## The chapter problem\n")
        lines.append(f"**{anchor['title']}.** {anchor['brief']}\n")
    if chapter.get("application"):
        lines.append(f"**Where it is used:** {chapter['application']}\n")
    if chapter.get("relevance_prompt"):
        # The prompt is prose and the figure is storage, and the order matters: a reader
        # with scripting off still meets the question and can still answer it in a
        # notebook. What the figure adds is the keeping, not the asking.
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


#: A small count as a reader would say it. "Every section has 3 pages" reads like a
#: specification; "three pages" reads like prose, and this book's pages are prose.
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


#: What one page of a section is for, in the reader's words. Read when the colophon
#: describes the book's shape, so a book with a different shape is described in
#: terms of the pages it has.
PAGE_SENTENCE = {
    "walkthrough": "**Learn** teaches the ideas and the method.",
    "guided-problems": (
        "**Practise with help** gives questions with hints you can reveal."
    ),
    "problems": (
        "**Practise** gives independent questions, with the answers at the end."
    ),
}


# The references a reader is entitled to see linked, marked in the book's own
# `sources.yaml` with `attribution: true`.
#
# It used to be a global tuple of ids, which meant a new book got no links at all
# until someone remembered to add its ids to this file: the A-level Mathematics
# About page listed none of the sources its content rests on. The tag keeps the
# original intent — the page stays short, and a book links only what it actually
# rests on — without the book having to match a list kept somewhere else.
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
    # Where this book is for, and who publishes what it follows. Read from the
    # curriculum's `meta`, never assumed: this page said "for England" in a hardcoded
    # string, so all four Irish books were published claiming to be English ones. A
    # book that declares neither is a mistake, not a default.
    meta = book.curriculum_data.get("meta", {})
    jurisdiction = str(meta.get("jurisdiction") or "").strip()
    if not jurisdiction and book.qualification != REFERENCE and not meta.get("what_it_is"):
        raise ValueError(
            f"{book.id}: curriculum.yaml has no meta.jurisdiction, so the About page "
            "cannot say which country this book is for"
        )
    # England calls its levels tiers; Ireland calls them levels.
    level_word = str(meta.get("level_word") or "level").strip()
    curriculum_body = str(meta.get("curriculum_body") or "").strip()
    curriculum_licence = meta.get("curriculum_licence") or None
    # The label for the code both tiers study already names both of them
    # ("Foundation and Higher", "Ordinary and Higher"), so the course description
    # reads it rather than listing the axis. The code itself is the book's — `F` in
    # England, `O` in Ireland — and is never assumed here.
    tiers = ""
    if book.tier_axis:
        tiers = str(book.tier_axis.get(book.lower_code, "")).strip()
    boards = _join_words(book.boards)

    # A reference work is not a course. It has no syllabus, no chapters and no
    # questions, so the course description below would be false for it. The
    # landing card already tells the two apart (`portal.card`); this page is the
    # other half of the same distinction.
    if book.qualification == REFERENCE:
        # A reference work is not a course, so the course description below would
        # be false for it. What it *is* is the book's own statement: a proof book
        # and a map of numerical problems are both reference works, and this page
        # used to describe the second as a book of proofs because the words were
        # written when the collection held one. The default stays for a reference
        # work that says nothing.
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
        # A book may say what it is in its own words. The default below is a
        # *course's* answer — "a complete GCSE Physics book" — and it is false for a
        # book that follows no syllabus, so the sentence is data rather than a
        # qualification-shaped guess.
        stated = str(meta.get("what_it_is") or "").strip()
        if stated:
            # Wrapped here rather than in the YAML, because a folded scalar in a
            # config file comes out as one long line, and a generated page whose
            # paragraph is a single 90-word line is unreadable in a diff and fails
            # the line-length rule that every authored page obeys.
            what_it_is = _wrapped(stated)
        else:
            what_it_is = [
                f"This is a complete {book.qualification} {book.subject} book for "
                f"{jurisdiction}."
            ]
        # `tiers` is the label of the code both levels study, and it already names
        # them all — "Foundation and Higher", "Foundation, Ordinary and Higher" — so
        # the word after it belongs to the jurisdiction. England calls them tiers;
        # Ireland calls them levels.
        levels = f"{tiers} {level_word}" if tiers else ""
        if levels and boards:
            what_it_is.append(
                f"It covers {levels}, and it follows the specifications of {boards}."
            )
        elif levels:
            what_it_is.append(f"It covers {levels}.")
        elif boards:
            what_it_is.append(f"It follows the specifications of {boards}.")
        # What a section holds is the book's own declaration, so the page cannot
        # describe three pages to a book that has one. This used to be a hardcoded
        # sentence about Learn / Practise with help / Practise, which would have
        # promised a reader of a one-page book two pages that are not there.
        named = {kind: title for _directory, kind, title, _slug in PAGE_KINDS}
        if kinds:
            plural = "page" if len(kinds) == 1 else "pages"
            what_it_is.append(f"Every section has {_number_word(len(kinds))} {plural}.")
            # What each page is for, in the reader's words. Kept per kind so a book
            # with a different shape gets sentences about the pages it has, rather
            # than a promise of two pages that are not there.
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
        *legal.disclaimer_lines(),
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
        # The proof book's claim is about courses: which specification examines a
        # proof. It is not a reference work's *only* claim, and a map of numerical
        # methods has no course claim at all — so this sentence belongs to the book
        # that declares a proof registry, not to every reference work. Written when
        # the collection held one, and it published a proof book's provenance on a
        # numerical page.
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
        # A book that follows no syllabus says so, rather than letting the reader
        # infer it from a list of documents that is not a curriculum. Whether there
        # is a list at all is settled below, where the links are.
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
        # No licence claim. A body's terms are stated only when they have been read;
        # the alternative is an invented permission, which is worse than a cautious
        # sentence.
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
    # A book that makes no claim resting on an external document says so here,
    # rather than leaving a reader to infer it from an empty list of sources.
    source_note = str(sources.get("note") or "").strip()
    if source_note:
        # Wrapped here rather than in the YAML, for the same reason `what_it_is` is:
        # a folded scalar comes out as one long line, and a generated page whose
        # paragraph is a 90-word line is unreadable in a diff and fails the
        # line-length rule every authored page obeys.
        lines += ["", *textwrap.wrap(" ".join(source_note.split()), 78)]
    # Who owns the specification, and who examines it. Declared whole rather than
    # composed from `boards`, because the split differs: England's awarding bodies
    # publish their own specifications and examine them, while in Ireland the NCCA
    # publishes the specification and the State Examinations Commission examines.
    # Composing it from `boards` produced "SEC publish the specifications this book
    # follows" for all four Irish books, which is false.
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
        # `booklet_note` overrides the English default, for the same reason
        # `specification_note` does: the arrangement differs. In England each board
        # prints its own sheet and Ofqual decides what must be on it; in Ireland the
        # State Examinations Commission prints one booklet for four subjects and issues
        # it to every candidate. The default below told three Irish books that "Ofqual
        # decides which material the boards must provide", which is not true of them.
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
    # Plural, because a one-chapter book reading "1 chapters" looks like a bug
    # because it is one.
    lines.append(
        f"- {len(chapters)} chapter{'s' if len(chapters) != 1 else ''}, "
        f"{total_sections} section{'s' if total_sections != 1 else ''}\n"
    )
    if book.tier_axis:
        # The **levels of the course**, named by the code every reader studies — the
        # same expression the colophon uses. This line used to join every axis value,
        # so a book read `Tiers: Ordinary and Higher, Higher only`: the second half is a
        # note about which content is Higher-only, not a level anyone enrols in, and
        # Leaving Certificate Mathematics would have read `Foundation, Ordinary and
        # Higher, Ordinary and Higher, Higher only`. The reader wants the levels.
        levels = str(book.tier_axis.get(book.lower_code, "")).strip()
        if levels:
            lines.append(f"- Tiers: {levels}\n")
    lines.append(f"- Awarding bodies: {', '.join(book.boards) or '—'}\n")
    lines.append("## Chapters\n")
    for c in chapters:
        lines.append(f"1. [Chapter {c['id']}: {c['title']}](Chapter {c['id']}/index.md)")
    lines.append("")
    # The note a reader meets before starting. It is a directive rather than ten
    # lines of HTML here, so the wording lives in one place (`legal.py`) and the
    # same compact note is on every book's home page, including a book authored
    # before this existed.
    lines.append(":::disclaimer")
    lines.append("")
    return stub_page(fm, book.title, *lines)


# --- generated CSS ------------------------------------------------------------


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


def local_css(book: Book) -> str:
    return (
        f"/* Style overrides for {book.title}.\n"
        " *\n"
        " * Loaded after the shared design system and the generated tokens, so a\n"
        " * rule here wins. Prefer setting token values in book.yaml; keep this file\n"
        " * for components that are genuinely specific to this book, and keep it\n"
        " * small — a book should be recognisable, not a different design system.\n"
        " */\n"
    )


# --- curriculum map -----------------------------------------------------------


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


# --- nav ----------------------------------------------------------------------


def build_nav_list(
    strands: list[dict],
    chapters: list[dict],
    included_tiers: frozenset[str] | None = None,
    proofs: list[dict] | None = None,
    page_kinds: tuple[str, ...] | None = None,
    deepers: list[dict] | None = None,
    pages: list[dict] | None = None,
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
    # A reference work's own pages, in the order it lists them. Flat rather than
    # grouped: it has no chapters to nest them under, and the registry order is
    # the reading order the book chose. `Book.pages` is the one declaration.
    for page in pages or []:
        nav.append({str(page["title"]): str(page["path"])})
    for c in chapters:
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
            # The optional track, listed after the main thread it belongs to. A
            # depth page has a URL of its own rather than being an aside, so a
            # reader with scripting off can reach it and a search engine can index
            # it — and the chapter's own page can link to it with `:::deeper`.
            section_children.extend(
                {page["title"]: page["path"]}
                for page in by_section.get((str(c["id"]), str(s["id"])), [])
            )
            children.append({f"{s['id']} {s['title']}": section_children})
        children.append({"Review": f"Chapter {c['id']}/Review/index.md"})
        nav.append({f"Chapter {c['id']}: {c['title']}": children})
    # The colophon sits last, where a reader expects to find it.
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


# --- coverage -----------------------------------------------------------------


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


# --- driver -------------------------------------------------------------------


def scaffold(book: Book, dry_run: bool) -> None:
    data = book.curriculum_data
    # A reference work has no syllabus: `books/proofs/` is a book because that is
    # how the collection publishes, navigates and themes a body of pages, and for
    # no other reason. It declares no strands and no chapters, so everything that
    # assumes a syllabus is skipped rather than stubbed empty — the alternative
    # would grow it an empty glossary, an empty curriculum map and a home page
    # listing no chapters, which is noise a reader would have to walk past.
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
                # A book declares which pages its sections have. Anything it does
                # not declare is not generated — and, because the nav is built
                # from `Book.section_page_kinds` too, is not linked either.
                if kind not in book.section_page_kinds:
                    continue
                emit(base / directory / "index.md", section_stub(c, s, kind), dry_run)
            # A `deeper:` page is authored, never scaffolded. Writing a stub there
            # would put a placeholder at a URL the nav already points at, and the
            # whole point of the depth track is that its pages exist because
            # somebody wrote them.
        emit(chapter_dir / "Review" / "index.md", review_stub(c), dry_run)


    # The book's own theme layer. `book.css` is generated, so it is rewritten
    # on every run — a theme change must reach the stylesheet.
    stylesheets = docs / "assets" / "stylesheets"
    written.append(stylesheets / "book.css")
    create(stylesheets / "book-local.css", local_css(book), dry_run)
    if not dry_run:
        stylesheets.mkdir(parents=True, exist_ok=True)
        (stylesheets / "book.css").write_text(theme_css(book), encoding="utf-8")

    # MkDocs profiles used to be generated here, one per declared profile. The
    # bespoke pipeline builds from curriculum.yaml directly and needs no config.

    map_out = book.root / "CURRICULUM-MAP.md"
    written.append(map_out)
    if not dry_run:
        map_out.write_text(build_curriculum_map(book, strands, chapters), encoding="utf-8")
    # The banks directory, so a new book is "one directory and one registration"
    # as SHAPE.md says. `tests/test_collection.py` requires `book.banks` to exist,
    # and this used to leave it out — a new book failed the shape test until
    # somebody created the directory by hand.
    banks = book.root / book.banks_name
    if not dry_run:
        banks.mkdir(parents=True, exist_ok=True)
        keep = banks / ".gitkeep"
        if not keep.exists():
            # Empty, so a checkout keeps a directory with no banks in it yet.
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
