#!/usr/bin/env python3
"""Scaffold a book's docs tree and MkDocs profiles from its curriculum.

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

from .book import Book, discover_books, repo_root
from .config import book_by_id

STUB_MARKER = "<!-- scaffold:stub -->"
CONFIG_DIR = repo_root() / "renderers" / "mkdocs"
SITE_DIR = repo_root() / "site"

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
    """Per-book design tokens, generated from ``book.yaml``.

    Everything else comes from the shared design system, so a book can be
    differentiated by data without forking the stylesheet.
    """
    t = book.theme
    return (
        "/* GENERATED by `python -m textbook.scaffold` from book.yaml.\n"
        " * Do not edit: change the `theme` block in book.yaml and re-run.\n"
        " *\n"
        " * Per-book design tokens. The house defaults, and every other rule,\n"
        " * live in assets/stylesheets/extra.css.\n"
        " */\n"
        f":root {{\n"
        f"  --tb-accent: {t.accent};\n"
        f"  --tb-accent-light: {t.accent_light};\n"
        f"  --tb-accent-dark: {t.accent_dark};\n"
        f"}}\n"
    )


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


# --- MkDocs config ------------------------------------------------------------


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
    return nav


def config_path(book: Book, profile_id: str) -> Path:
    return CONFIG_DIR / f"{book.id}.{profile_id}.yml"


def site_url(book: Book, profile_id: str) -> str:
    """Absolute URL for this profile, from the collection's base URL."""
    from .book import load_collection

    base = str(load_collection().get("base_url", "")).strip().rstrip("/")
    if not base:
        return ""
    return f"{base}/{book.deploy_path(profile_id)}/"


def build_mkdocs_config(book: Book, profile_id: str) -> str:
    profile = book.profile(profile_id)
    include_higher = profile.tier_filter != "foundation"
    config = {
        "INHERIT": "base.yml",
        "site_name": f"{book.title} — {profile.name}",
        "site_description": book.description,
        "docs_dir": _relative(book.docs),
        "site_dir": _relative(SITE_DIR / book.deploy_path(profile_id)),
        "extra": {
            "book": book.id,
            "book_dir": book.rel(book.root),
            "tier_profile": profile.tier_filter,
        },
        "nav": build_nav_list(book.strands, book.chapters, include_higher=include_higher),
    }
    url = site_url(book, profile_id)
    if url:
        config["site_url"] = url
    return yaml.safe_dump(config, sort_keys=False, allow_unicode=True, width=120)


def _relative(path: Path) -> str:
    return os.path.relpath(path, CONFIG_DIR).replace(os.sep, "/")


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

    # The book's own theme layer. `book.css` is generated, so it is rewritten
    # on every run — a theme change must reach the stylesheet.
    stylesheets = docs / "assets" / "stylesheets"
    written.append(stylesheets / "book.css")
    create(stylesheets / "book-local.css", local_css(book), dry_run)
    if not dry_run:
        stylesheets.mkdir(parents=True, exist_ok=True)
        (stylesheets / "book.css").write_text(theme_css(book), encoding="utf-8")

    # MkDocs profiles, one per declared profile.
    for profile in book.profiles:
        written.append(config_path(book, profile.id))
        if not dry_run:
            CONFIG_DIR.mkdir(parents=True, exist_ok=True)
            config_path(book, profile.id).write_text(
                build_mkdocs_config(book, profile.id), encoding="utf-8"
            )

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
