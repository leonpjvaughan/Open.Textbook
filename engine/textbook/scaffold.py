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
import sys
from pathlib import Path

import yaml

from .book import Book, SCHEME_TOKENS, discover_books, load_collection, repo_root
from .config import book_by_id

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

# Shared files every book sees through a symlink, so there is one copy. Kept as
# the book's self-describing view; see ``ensure_shared_assets``.
SHARED_ASSETS: tuple[tuple[str, str], ...] = (
    ("stylesheets/extra.css", "assets/stylesheets/extra.css"),
    ("stylesheets/themes.css", "assets/stylesheets/themes.css"),
    ("stylesheets/settings.css", "assets/stylesheets/settings.css"),
    ("settings/settings.js", SETTINGS_WIDGET),
    ("figures/figures.js", "assets/figures/figures.js"),
)

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


def ensure_shared_assets(book: Book, dry_run: bool) -> None:
    """Make the shared files visible inside this book's docs tree, through symlinks.

    The shared bytes live once in ``assets/``, and ``pipeline.copy_assets`` reads
    them from there directly — MkDocs was the last build that needed them inside
    ``docs_dir``. They are kept deliberately, as the book's self-describing view:
    ``docs/assets/`` shows which shared stylesheets, figure loader, settings
    runtime and booklet widget a book uses, beside its own files. The links are
    the contract that ``tests/test_themes.py``, ``tests/test_figures.py`` and
    ``tests/test_settings.py`` read, and ``tests/test_collection.py`` checks each
    one resolves.

    A *broken* symlink no longer fails a build, because nothing walks
    ``docs_dir`` any more, so that test is what holds it. Creating the links here
    rather than leaving them to whoever adds a book is what keeps a new book from
    starting with a broken one.
    """
    pairs = list(SHARED_ASSETS)
    if book.booklet_name:
        pairs.append(("booklet/booklet.js", BOOKLET_WIDGET))

    for relative, target in pairs:
        link = book.docs / "assets" / relative
        destination = repo_root() / target
        if link.is_symlink() and link.resolve() == destination:
            continue
        written.append(link)
        if dry_run:
            continue
        link.parent.mkdir(parents=True, exist_ok=True)
        if link.is_symlink() or link.exists():
            link.unlink()
        link.symlink_to(os.path.relpath(destination, link.parent))


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


def section_stub(chapter: dict, section: dict, kind: str) -> str:
    titles = {
        "walkthrough": "Walkthrough",
        "guided-problems": "Guided problems",
        "problems": "Problems",
    }
    fm = front_matter(
        title=f"{section['id']} {section['title']} — {titles[kind]}",
        chapter=chapter["id"],
        chapter_title=chapter["title"],
        section=section["id"],
        section_title=section["title"],
        tier=section["tier"],
        dfe=section.get("dfe", []),
        kind=kind,
    )
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
    return (
        f"{fm}\n"
        f"{STUB_MARKER}\n\n"
        f"# {section['id']} {section['title']} — {titles[kind]}\n\n"
        f"> **Stub.** {guidance[kind]}>\n"
        f"> Tier: **{section['tier']}** · DfE refs: "
        f"{', '.join(section.get('dfe', [])) or '—'}\n"
    )


def chapter_stub(chapter: dict) -> str:
    fm = front_matter(
        title=f"Chapter {chapter['id']}: {chapter['title']}",
        chapter=chapter["id"],
        strand=chapter["strand"],
    )
    lines = [fm, f"{STUB_MARKER}\n", f"# Chapter {chapter['id']}: {chapter['title']}\n"]
    lines.append(f"{chapter['summary']}\n")
    anchor = chapter.get("anchor")
    if anchor:
        lines.append("## Anchor problem\n")
        lines.append(f"**{anchor['title']}.** {anchor['brief']}\n")
    if chapter.get("application"):
        lines.append(f"**Where it is used:** {chapter['application']}\n")
    if chapter.get("relevance_prompt"):
        lines.append(f"**Your turn to connect it:** {chapter['relevance_prompt']}\n")
    lines.append("## Sections\n")
    for s in chapter["sections"]:
        lines.append(
            f"- **{s['id']} {s['title']}** — tier {s['tier']} · "
            f"DfE {', '.join(s.get('dfe', [])) or '—'}"
        )
    lines.append("")
    return "\n".join(lines)


def review_stub(chapter: dict) -> str:
    fm = front_matter(
        title=f"Chapter {chapter['id']}: Review",
        chapter=chapter["id"],
        kind="review",
    )
    anchor = chapter.get("anchor")
    anchor_line = (
        f"Resolve the anchor problem — **{anchor['title']}** — now that every section "
        "is available.\n"
        if anchor
        else "Resolve the chapter's anchor problem.\n"
    )
    return (
        f"{fm}\n{STUB_MARKER}\n\n# Chapter {chapter['id']}: Review\n\n"
        f"> **Stub.** {anchor_line}>\n"
        "> Then set interleaved mixed practice across this chapter and earlier "
        "chapters, with method-selection prompts (\u201cwhich method, and why?\u201d).\n"
    )


def glossary_stub(strands: list[dict]) -> str:
    fm = front_matter(title="Glossary")
    lines = [fm, f"{STUB_MARKER}\n", "# Glossary\n"]
    lines.append(
        "Definitions of the terms used in this book. Each strand page is maintained "
        "alongside the chapters that use it; a term is defined once, here.\n"
    )
    for strand in strands:
        filename = STRAND_FILES.get(strand["id"], f"{strand['id']}.md")
        lines.append(f"- [{strand['title']}]({filename})")
    lines.append("")
    return "\n".join(lines)


def strand_glossary_stub(strand: dict) -> str:
    fm = front_matter(title=f"Glossary — {strand['title']}", strand=strand["id"])
    return (
        f"{fm}\n{STUB_MARKER}\n\n# Glossary — {strand['title']}\n\n"
        "> **Stub.** Terms introduced by this strand's chapters, alphabetically.\n"
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
    return yaml.safe_load(book.sources.read_text(encoding="utf-8")) or {}


def _join_words(items) -> str:
    """A list as a reader would say it: ``A, B and C``."""
    words = [str(item).strip() for item in items if str(item).strip()]
    if not words:
        return ""
    if len(words) == 1:
        return words[0]
    return ", ".join(words[:-1]) + " and " + words[-1]


# The references a reader is entitled to see linked: the curriculum, the
# awarding-body specifications and the regulator's decision on formula sheets.
# A book whose sources.yaml uses other ids simply omits those links.
ATTRIBUTION_IDS: tuple[str, ...] = (
    "dfe",
    "aqa-8300",
    "edexcel-1ma1",
    "ocr-j560",
    "ofqual-formulae-2026",
)


def _attribution_links(book: Book) -> list[str]:
    references = _sources_data(book).get("references", [])
    by_id = {str(ref.get("id")): ref for ref in references if isinstance(ref, dict)}
    links = []
    for source_id in ATTRIBUTION_IDS:
        reference = by_id.get(source_id)
        if not reference:
            continue
        title = str(reference.get("title", "")).strip()
        url = str(reference.get("url", "")).strip()
        if title and url:
            links.append(f"- [{title}]({url})")
    return links


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
    # `tier_axis` maps F and H to their reader-facing labels; F's label already
    # names both tiers ("Foundation and Higher").
    tiers = str(book.tier_axis.get("F", "")).strip()
    boards = _join_words(book.boards)

    lines = [
        "<!-- Generated from collection.yaml and sources.yaml.",
        "     Do not edit this file: edit the sources and regenerate. -->",
        "",
        "# About this book",
        "",
        "## What this book is",
        "",
        f"This is a complete {book.qualification} {book.subject} book for England.",
    ]
    if tiers and boards:
        lines.append(
            f"It covers {tiers} tier, and it follows the specifications of {boards}."
        )
    elif tiers:
        lines.append(f"It covers {tiers} tier.")
    elif boards:
        lines.append(f"It follows the specifications of {boards}.")
    lines += [
        "You can read the whole book in a browser, and there is nothing to",
        "install.",
        "",
        "Every section has three pages. **Learn** teaches the ideas and the method.",
        "**Practise with help** gives questions with hints you can reveal.",
        "**Practise** gives independent questions, with the answers at the end. Each",
        "chapter opens with a problem you can solve by the end, and closes with a",
        "**Review**.",
        "",
        "## Who made it",
        "",
        "This book is part of **Open.Textbook**, an independent project by Leon",
        "Vaughan, who wrote and assembled it.",
        "",
        "## Answers are checked by a computer",
        "",
        "The questions and answers in **Practise** come from one set of data. Before",
        "the book is published, a computer checks that data with SymPy, a computer",
        "algebra system. The check tests each step against the claim it makes, so a",
        "page cannot show an answer the check did not pass.",
        "",
        "The check proves the mathematics. It cannot judge whether an explanation is",
        "clear. If a page is confusing, report it, even when the answer is correct.",
        "",
        "## Where the content comes from",
        "",
        "The curriculum follows the subject content published by the Department for",
        "Education. That material is Crown copyright, and it is used here under the",
        "[Open Government Licence v3.0]",
        "(https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/).",
    ]
    if boards:
        lines += [
            "",
            "The specification content, and any wording taken from a specification,",
            f"belongs to the awarding bodies. {boards} publish the specifications",
            "this book follows.",
        ]
    else:
        lines += [
            "",
            "The specification content, and any wording taken from a specification,",
            "belongs to the awarding bodies.",
        ]
    lines += [
        "",
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
        "No awarding body endorses this book, and the Department for Education",
        "does not supply it.",
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
    lines = [fm, f"{STUB_MARKER}\n", f"# {book.title}\n"]
    lines.append(f"{book.description}\n")
    lines.append(
        f"- {len(chapters)} chapters, {total_sections} sections\n"
        f"- Tiers: {', '.join(book.tier_axis.values()) or '—'}\n"
        f"- Awarding bodies: {', '.join(book.boards) or '—'}\n"
    )
    lines.append("## Chapters\n")
    for c in chapters:
        lines.append(f"1. [Chapter {c['id']}: {c['title']}](Chapter {c['id']}/index.md)")
    lines.append("")
    return "\n".join(lines)


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
            for ref in s.get("dfe", []):
                rev.setdefault(ref, []).append(f"{s['id']} {s['title']}")
    lines = [
        "<!-- GENERATED by `python -m textbook.scaffold` from curriculum.yaml. "
        "Do not edit. -->",
        "",
        f"# Curriculum map — {book.qualification} {book.subject}",
        "",
        f"_{meta.get('title', book.title)} · generated {meta.get('retrieved', '')}_",
        "",
        "The subject content is the authoritative coverage target. Every item is "
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
    strands: list[dict], chapters: list[dict], include_higher: bool = True
) -> list[dict]:
    nav: list[dict] = [{"Home": "index.md"}]
    glossary_children = [{"Overview": "Glossary/index.md"}]
    strand_titles = {s["id"]: s["title"] for s in strands}
    for strand in strands:
        filename = STRAND_FILES.get(strand["id"], f"{strand['id']}.md")
        glossary_children.append({strand["title"]: f"Glossary/{filename}"})
    nav.append({"Glossary": glossary_children})
    for c in chapters:
        children = [{"Overview": f"Chapter {c['id']}/index.md"}]
        for s in c["sections"]:
            if not include_higher and s["tier"] == "H":
                continue
            base = f"Chapter {c['id']}/Section {s['id']}"
            children.append(
                {
                    f"{s['id']} {s['title']}": [
                        {"Learn": f"{base}/Walkthrough/index.md"},
                        {"Practise with help": f"{base}/Guided problems/index.md"},
                        {"Practise": f"{base}/Problems/index.md"},
                    ]
                }
            )
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
        for ref in s.get("dfe", [])
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
    strands, chapters = data["strands"], data["chapters"]
    docs = book.docs

    emit(docs / "index.md", home_stub(book, chapters), dry_run)
    generate(docs / COLOPHON_FILE, colophon_page(book), dry_run)
    emit(docs / "Glossary" / "index.md", glossary_stub(strands), dry_run)
    for strand in strands:
        filename = STRAND_FILES.get(strand["id"], f"{strand['id']}.md")
        emit(docs / "Glossary" / filename, strand_glossary_stub(strand), dry_run)

    for c in chapters:
        chapter_dir = docs / f"Chapter {c['id']}"
        emit(chapter_dir / "index.md", chapter_stub(c), dry_run)
        for s in c["sections"]:
            base = chapter_dir / f"Section {s['id']}"
            emit(
                base / "Walkthrough" / "index.md",
                section_stub(c, s, "walkthrough"),
                dry_run,
            )
            emit(
                base / "Guided problems" / "index.md",
                section_stub(c, s, "guided-problems"),
                dry_run,
            )
            emit(
                base / "Problems" / "index.md",
                section_stub(c, s, "problems"),
                dry_run,
            )
        emit(chapter_dir / "Review" / "index.md", review_stub(c), dry_run)

    ensure_shared_assets(book, dry_run)

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
