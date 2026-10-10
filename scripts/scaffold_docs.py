#!/usr/bin/env python3
"""Scaffold the Docs/ tree and MkDocs nav from curriculum.yaml.

Idempotent: a file is only (re)written when it is missing or still carries the
`scaffold:stub` marker. Authored content is never overwritten.

Usage:
    python scripts/scaffold_docs.py            # write tree + nav
    python scripts/scaffold_docs.py --dry-run  # report intended writes only
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
CURRICULUM = ROOT / "curriculum.yaml"
DOCS = ROOT / "Docs"
MKDOCS_HIGHER = ROOT / "renderers" / "mkdocs" / "mkdocs.yml"
MKDOCS_FOUNDATION = ROOT / "renderers" / "mkdocs" / "mkdocs.foundation.yml"
STUB_MARKER = "<!-- scaffold:stub -->"

MAP_OUT = ROOT / "CURRICULUM-MAP.md"

STRAND_FILES = {
    "number": "number.md",
    "algebra": "algebra.md",
    "ratio": "ratio.md",
    "geometry": "geometry.md",
    "probability": "probability.md",
    "statistics": "statistics.md",
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
        f"> **Stub.** {guidance[kind]}\n>\n"
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


def glossary_stub() -> str:
    fm = front_matter(title="Glossary")
    lines = [fm, f"{STUB_MARKER}\n", "# Glossary\n"]
    lines.append(
        "Definitions of the terms used in this book. Each strand page is maintained "
        "alongside the chapters that use it; a term is defined once, here.\n"
    )
    for strand_id, filename in STRAND_FILES.items():
        lines.append(f"- [{strand_id.title()}]({filename})")
    lines.append("")
    return "\n".join(lines)


def strand_glossary_stub(strand: dict) -> str:
    fm = front_matter(title=f"Glossary — {strand['title']}", strand=strand["id"])
    return (
        f"{fm}\n{STUB_MARKER}\n\n# Glossary — {strand['title']}\n\n"
        "> **Stub.** Terms introduced by this strand's chapters, alphabetically.\n"
    )


def home_stub(meta: dict, chapters: list[dict]) -> str:
    fm = front_matter(title=meta["title"])
    total_sections = sum(len(c["sections"]) for c in chapters)
    lines = [fm, f"{STUB_MARKER}\n", f"# {meta['title']}\n"]
    lines.append(
        "An interactive, static, backend-free GCSE Mathematics textbook.\n\n"
        f"- {len(chapters)} chapters, {total_sections} sections\n"
        f"- Tiers: {', '.join(meta['tiers'])}\n"
        f"- Awarding bodies: {', '.join(meta['awarding_bodies'])}\n"
    )
    lines.append("## Chapters\n")
    for c in chapters:
        lines.append(f"1. [Chapter {c['id']}: {c['title']}](Chapter {c['id']}/index.md)")
    lines.append("")
    return "\n".join(lines)


def build_curriculum_map(meta: dict, strands: list[dict], chapters: list[dict]) -> str:
    """Reverse index: every DfE content item -> the sections that teach it."""
    ranges = {"N": 16, "A": 25, "R": 16, "G": 25, "P": 9, "S": 6}
    rev: dict[str, list[str]] = {}
    for c in chapters:
        for s in c["sections"]:
            for ref in s.get("dfe", []):
                rev.setdefault(ref, []).append(f"{s['id']} {s['title']}")
    lines = [
        "<!-- GENERATED by scripts/scaffold_docs.py from curriculum.yaml. Do not edit. -->",
        "",
        "# Curriculum map — DfE content to chapters and sections",
        "",
        f"_{meta['title']} · generated {meta['retrieved']}_",
        "",
        "The DfE subject content is the authoritative coverage target. Every item is "
        "mapped below to at least one section; `scripts/scaffold_docs.py` fails loudly "
        "if any item has no home. Items G11, G14 and P4 sit inside cross-cutting "
        "sections rather than having a dedicated section of their own.",
        "",
    ]
    strand_of = {s["id"]: s["title"] for s in strands}
    letter_strand = {
        "N": "number",
        "A": "algebra",
        "R": "ratio",
        "G": "geometry",
        "P": "probability",
        "S": "statistics",
    }
    for letter, count in ranges.items():
        lines.append(f"## {letter} — {strand_of[letter_strand[letter]]}")
        lines.append("")
        lines.append("| DfE item | Taught in |")
        lines.append("|---|---|")
        for i in range(1, count + 1):
            ref = f"{letter}{i}"
            where = "; ".join(rev.get(ref, [])) or "**UNMAPPED**"
            lines.append(f"| {ref} | {where} |")
        lines.append("")
    return "\n".join(lines)


def build_nav_list(
    strands: list[dict], chapters: list[dict], include_higher: bool = True
) -> list[dict]:
    nav: list[dict] = [{"Home": "index.md"}]
    glossary_children = [{"Overview": "Glossary/index.md"}]
    strand_titles = {s["id"]: s["title"] for s in strands}
    for strand_id, filename in STRAND_FILES.items():
        glossary_children.append({strand_titles[strand_id]: f"Glossary/{filename}"})
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


def build_mkdocs_config(
    meta: dict, strands: list[dict], chapters: list[dict], profile: str
) -> str:
    higher = profile != "foundation"
    config = {
        "INHERIT": "base.yml",
        "site_name": f"{meta['title']} \u2014 {'Higher' if higher else 'Foundation'}",
        "docs_dir": "../../Docs",
        "site_dir": f"../../site/{profile}",
        "extra": {"tier_profile": profile},
        "nav": build_nav_list(strands, chapters, include_higher=higher),
    }
    return yaml.safe_dump(config, sort_keys=False, allow_unicode=True, width=120)


def check_full_coverage(chapters: list[dict]) -> list[str]:
    ranges = {"N": 16, "A": 25, "R": 16, "G": 25, "P": 9, "S": 6}
    cited = {ref for c in chapters for s in c["sections"] for ref in s.get("dfe", [])}
    return [
        f"{letter}{i}"
        for letter, count in ranges.items()
        for i in range(1, count + 1)
        if f"{letter}{i}" not in cited
    ]


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    data = yaml.safe_load(CURRICULUM.read_text(encoding="utf-8"))
    meta, strands, chapters = data["meta"], data["strands"], data["chapters"]

    gaps = check_full_coverage(chapters)
    if gaps:
        print(
            "ERROR: DfE content items with no section: " + ", ".join(gaps),
            file=sys.stderr,
        )
        return 1

    emit(DOCS / "index.md", home_stub(meta, chapters), args.dry_run)
    emit(DOCS / "Glossary" / "index.md", glossary_stub(), args.dry_run)
    for strand in strands:
        emit(
            DOCS / "Glossary" / STRAND_FILES[strand["id"]],
            strand_glossary_stub(strand),
            args.dry_run,
        )

    for c in chapters:
        chapter_dir = DOCS / f"Chapter {c['id']}"
        emit(chapter_dir / "index.md", chapter_stub(c), args.dry_run)
        for s in c["sections"]:
            base = chapter_dir / f"Section {s['id']}"
            emit(
                base / "Walkthrough" / "index.md",
                section_stub(c, s, "walkthrough"),
                args.dry_run,
            )
            emit(
                base / "Guided problems" / "index.md",
                section_stub(c, s, "guided-problems"),
                args.dry_run,
            )
            emit(
                base / "Problems" / "index.md",
                section_stub(c, s, "problems"),
                args.dry_run,
            )
        emit(
            chapter_dir / "Review" / "index.md",
            review_stub(c),
            args.dry_run,
        )

    written.append(MKDOCS_HIGHER)
    written.append(MKDOCS_FOUNDATION)
    if not args.dry_run:
        MKDOCS_HIGHER.write_text(
            build_mkdocs_config(meta, strands, chapters, "higher"), encoding="utf-8"
        )
        MKDOCS_FOUNDATION.write_text(
            build_mkdocs_config(meta, strands, chapters, "foundation"), encoding="utf-8"
        )

    written.append(MAP_OUT)
    if not args.dry_run:
        MAP_OUT.write_text(build_curriculum_map(meta, strands, chapters), encoding="utf-8")

    print(f"written: {len(written)}")
    print(f"skipped (authored): {len(skipped)}")
    if args.dry_run:
        for p in written[:20]:
            print("  would write", p.relative_to(ROOT))
        if len(written) > 20:
            print(f"  ... and {len(written) - 20} more")
    return 0


if __name__ == "__main__":
    sys.exit(main())
