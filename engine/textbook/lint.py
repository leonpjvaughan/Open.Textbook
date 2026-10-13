#!/usr/bin/env python3
"""Lint a book for voice, style and mechanical mistakes.

Usage:
    python -m textbook.lint                 # every book
    python -m textbook.lint gcse-maths
    python -m textbook.lint --fix           # apply the safe automatic fixes

Checks are grouped: voice (our binding rules), style (consistency), and
mechanics (typos and formatting). Anything that needs judgement is reported, not
rewritten.
"""

from __future__ import annotations

import argparse
import re
import sys
from collections import Counter
from pathlib import Path

from . import book as books
from . import frontmatter
from .scaffold import STUB_MARKER

ROOT = books.repo_root()

# --- text preparation ---------------------------------------------------------

FENCE = re.compile(r"^ {0,3}(`{3,}|~{3,}).*?^ {0,3}\1\s*$", re.S | re.M)
DISPLAY_MATH = re.compile(r"\$\$.*?\$\$", re.S)
INLINE_MATH = re.compile(r"\$[^$\n]+\$")
CODE_SPAN = re.compile(r"`[^`]+`")
LINK_URL = re.compile(r"\]\([^)]+\)")


def prose_lines(text: str):
    r"""Yield (line_number, raw, prose) with code and maths replaced by a token.

    The token has no spaces, so removing maths cannot create phantom double
    spaces or repeated words.

    Display maths is removed *before* the text is split into lines: a
    ``$$ … $$`` block spans lines, so linting it a line at a time read the LaTeX
    as prose, and ``\color`` was reported as a US spelling and ``\,`` as a
    missing space. Each match is replaced with the token plus the newlines it
    contained, so the line numbers a finding cites still point at the same line.
    """
    text = FENCE.sub(lambda m: "\n" * m.group(0).count("\n"), text)
    text = DISPLAY_MATH.sub(lambda m: "\x00" + "\n" * m.group(0).count("\n"), text)
    for number, line in enumerate(text.splitlines(), 1):
        stripped = INLINE_MATH.sub("\x00", line)
        stripped = CODE_SPAN.sub("\x00", stripped)
        stripped = LINK_URL.sub("]", stripped)
        yield number, line, stripped


# --- rules --------------------------------------------------------------------

NEGATIVE_CONTRACTIONS = {
    "can't": "cannot",
    "don't": "do not",
    "won't": "will not",
    "isn't": "is not",
    "doesn't": "does not",
    "didn't": "did not",
    "wasn't": "was not",
    "weren't": "were not",
    "aren't": "are not",
    "haven't": "have not",
    "hasn't": "has not",
    "couldn't": "could not",
    "shouldn't": "should not",
    "wouldn't": "would not",
}

OTHER_CONTRACTIONS = {
    "it's": "it is",
    "that's": "that is",
    "there's": "there is",
    "let's": "let us",
    "we'll": "we will",
    "you'll": "you will",
    "we're": "we are",
    "you're": "you are",
    "they're": "they are",
    "i'm": "I am",
}

INTERNAL_PHRASES = {
    r"\banchor problem\b": "chapter problem",
    r"\banchor checkpoint\b": "progress check",
    r"\bretrieval starter\b": "Warm-up: remember",
    r"\bDelivers DfE\b[^\n]*": "(delete)",
    r"\bDfE refs?\b": "(delete)",
    # Found by the 2026-10-11 pedagogy audit: five Chapter 16 Walkthroughs printed
    # "**DfE coverage:** G3" to the reader. The refs already live in front matter
    # (`dfe: [G3]`), so this line was a note to us, not to the reader.
    r"\bDfE coverage\b[^\n]*": "(delete)",
    # The page names are ours: the navigator and the prose both say "Practise with
    # help". Four pages still used the internal name.
    r"\bGuided problems\b": "Practise with help",
    r"\btier [FH]\b": "Foundation / Higher",
    r"\bscaffold\b": "(delete)",
    r"\bfront matter\b": "(delete)",
    # "The bank" is also ordinary English — a financial institution, the bank of
    # a river — so a chapter may legitimately write "the bank adds interest". The
    # internal sense is our bank *of problems*: the word "problem" is what tells
    # them apart. A bare "the bank" means the English word and is left alone; a
    # lookahead on money or river words would miss the next phrasing ("the bank
    # charges") and misread the next chapter ("the bank asks questions"), which
    # is worse than the one internal phrasing it would keep.
    r"\bthe problem bank\b": "(delete)",
    r"\bthe bank of problems\b": "(delete)",
}

STYLE_WORDS = {
    r"\bobviously\b": "(remove)",
    r"\bclearly\b": "(remove)",
    r"\bsimply\b": "(remove or rewrite)",
    r"\beasy\b": "(rewrite: straightforward / quick)",
    r"\beasily\b": "(rewrite)",
    r"\btrivial\b": "(remove)",
    r"\bjust\b(?! (?:as|like|the|now|yet|before|after|once|enough|over|under|so|one|two|three|how|what))": "(check: often removable)",
}

US_SPELLINGS = {
    r"\bfactoriz(e|es|ed|ing)\b": "factoris\\1",
    r"\bFactoriz(e|es|ed|ing)\b": "Factoris\\1",
    r"\bcolor(s|ed|ing)?\b": "colour\\1",
    r"\bColor(s|ed|ing)?\b": "Colour\\1",
    r"\bcenter(s|ed|ing)?\b": "centre\\1",
    r"\bCenter(s|ed|ing)?\b": "Centre\\1",
    r"\bmeter(s)?\b": "metre\\1",
    r"\bMeter(s)?\b": "Metre\\1",
    r"\borganiz(e|es|ed|ing)\b": "organis\\1",
    r"\brecogniz(e|es|ed|ing)\b": "recognis\\1",
    r"\bsummariz(e|es|ed|ing)\b": "summaris\\1",
    r"\banalyz(e|es|ed|ing)\b": "analys\\1",
    # `kilogram` used to be here, mapped to itself. The rule changed nothing and
    # the reporting loop still tested the pattern, so every page that wrote
    # "kilogram" — the UK spelling the book is asked to use — was reported as a
    # US spelling, and `--fix` could not clear it. There is no UK/US difference to
    # enforce; `kilogramme` is the obsolete form, and nothing writes it.
}

PLACEHOLDERS = re.compile(r"\b(TODO|TBD|FIXME|XXX|lorem ipsum|placeholder)\b", re.I)
DOUBLE_SPACE = re.compile(r"(?<=[a-z,;:.)]) {2,}(?=[A-Za-z])")
DOUBLE_WORD = re.compile(r"\b(\w+)\s+\1\b", re.I)
MISSING_SPACE = re.compile(r"(?<![:/\w])[,;](?=[A-Za-z])")
SENTENCE = re.compile(r"[^.!?]+[.!?]?")
LINK = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")
SECTION_REF = re.compile(r"\bSection (\d+\.\d+)\b")
CHAPTER_REF = re.compile(r"\bChapter (\d+)\b")


def known_sections(book: books.Book) -> set[str]:
    return {s["id"] for chapter in book.chapters for s in chapter["sections"]}


def warm_up_block(text: str) -> str:
    """The retrieval starter, normalised so two copies compare equal.

    Used to catch a chapter whose sections share one warm-up. The 2026-10-11
    pedagogy audit found that in eight chapters, and it is not a coincidence: P4
    asks each section to retrieve the earlier material *that section* depends on,
    so the same three questions five times measures the chapter rather than the
    section, and the reader learns to skip it.
    """
    match = re.search(r"^## Warm-up: remember\n(.*?)(?=^## |\Z)", text, re.M | re.S)
    if not match:
        return ""
    return re.sub(r"\s+", " ", match.group(1)).strip()


# --- run ----------------------------------------------------------------------


def fix_text(text: str) -> str:
    for bad, good in {**NEGATIVE_CONTRACTIONS, **OTHER_CONTRACTIONS}.items():
        text = re.sub(rf"\b{re.escape(bad)}\b", good, text, flags=re.I)
    for pattern, repl in US_SPELLINGS.items():
        text = re.sub(pattern, repl, text)
    for pattern, repl in INTERNAL_PHRASES.items():
        if repl == "(delete)":
            text = re.sub(pattern, "", text)
        else:
            text = re.sub(pattern, repl, text, flags=re.I)
    return text


def lint(book: books.Book, fix: bool, findings: Counter, examples: dict) -> tuple[int, int]:
    docs = book.docs

    def note(category: str, where: str) -> None:
        findings[category] += 1
        examples.setdefault(category, [])
        if len(examples[category]) < 5:
            examples[category].append(where)

    fixed_files = 0
    paths = sorted(docs.rglob("*.md"))
    for path in paths:
        text = path.read_text(encoding="utf-8")
        # A scaffold stub is not reader content. It carries the marker the
        # generator uses to rewrite it, and its body is a note to the author
        # (which page kind it is, what to write). Linting it reports the
        # internal words and missing sections a stub is *supposed* to have, and
        # that noise hides the findings on authored pages, which is what this
        # scan is for. The marker also cannot survive into authored content:
        # `scaffold.emit` rewrites any file that still carries it, and
        # books/AGENTS.md forbids it on an authored page.
        if STUB_MARKER in text:
            continue
        original = text
        if fix:
            text = fix_text(text)
        rel = str(path.relative_to(ROOT))
        # Front matter that does not parse silently drops `tier`, which is how a
        # Higher-only page ends up in a Foundation build. See frontmatter.py.
        try:
            frontmatter.split(text, path)
        except frontmatter.FrontMatterError as err:
            note("structure:front-matter", f"{rel}: {err.cause}")
        for line_number, raw, stripped in prose_lines(text):
            shown = stripped.replace("\x00", "…").strip()
            where = f"{rel}:{line_number}: {shown[:90]}"
            for pattern in INTERNAL_PHRASES:
                if re.search(pattern, stripped, re.I):
                    note("voice:internal", where)
            for pattern in STYLE_WORDS:
                if re.search(pattern, stripped, re.I):
                    note("voice:style-word", where)
            for bad in {**NEGATIVE_CONTRACTIONS, **OTHER_CONTRACTIONS}:
                if re.search(rf"\b{re.escape(bad)}\b", stripped, re.I):
                    note("voice:contraction", where)
            for pattern in US_SPELLINGS:
                if re.search(pattern, stripped):
                    note("style:us-spelling", where)
            if len(stripped.split()) > 40 and not stripped.lstrip().startswith(
                ("-", "*", "|", "#", "1.", "2.")
            ):
                note("style:long-line", where)
            for sentence in SENTENCE.findall(stripped):
                if len(sentence.split()) > 32:
                    note("style:long-sentence", where)
                    break
            if PLACEHOLDERS.search(stripped):
                note("mechanics:placeholder", where)
            if DOUBLE_SPACE.search(stripped):
                note("mechanics:double-space", where)
            if MISSING_SPACE.search(stripped):
                note("mechanics:missing-space", where)
            for match in DOUBLE_WORD.finditer(stripped):
                if match.group(1).lower() not in {"that", "had"}:
                    note("mechanics:double-word", where)
        if fix and text != original:
            path.write_text(text, encoding="utf-8")
            fixed_files += 1

        rel_posix = path.as_posix()
        if re.search(r"Chapter \d+/index\.md$", rel_posix):
            if "## The chapter problem" not in text:
                note("structure:chapter-missing-anchor", rel)
            if "By the end of this chapter" not in text:
                note("structure:chapter-missing-outcomes", rel)
        if "/Walkthrough/" in rel_posix:
            for label, needle in (
                ("structure:walkthrough-missing-checklist", "You should now be able to"),
                ("structure:walkthrough-missing-watchout", "Watch out"),
            ):
                if needle not in text:
                    note(label, rel)
        if "/Guided problems/" in rel_posix and "Warm-up: remember" not in text:
            note("structure:guided-missing-warmup", rel)
        if "/Problems/" in rel_posix:
            if ":::problems" not in text or ":::answers" not in text:
                note("structure:problems-missing-markers", rel)

    # A retrieval starter repeated across a chapter's sections is a copy-paste, not
    # a design (P4). Advisory: it reports, and the content pass acts on it.
    starters: dict[str, list[str]] = {}
    for path in paths:
        rel_posix = path.as_posix()
        if "/Guided problems/" not in rel_posix:
            continue
        chapter = re.search(r"Chapter (\d+)/", rel_posix)
        if not chapter:
            continue
        block = warm_up_block(path.read_text(encoding="utf-8"))
        if block:
            starters.setdefault(f"Chapter {chapter.group(1)}|{block}", []).append(
                str(path.relative_to(ROOT))
            )
    for key, places in starters.items():
        if len(places) > 1:
            chapter = key.split("|", 1)[0]
            note(
                "structure:guided-warmup-repeated",
                f"{chapter}: the same warm-up on {len(places)} sections "
                f"({', '.join(sorted(places)[:3])}…)",
            )

    # Cross-references must point at real sections and chapters.
    sections = known_sections(book)
    for path in paths:
        rel = str(path.relative_to(ROOT))
        text = path.read_text(encoding="utf-8")
        for ref in set(SECTION_REF.findall(text)):
            if ref not in sections:
                note("ref:missing-section", f"{rel}: Section {ref}")
        for chapter in set(CHAPTER_REF.findall(text)):
            if not (docs / f"Chapter {chapter}").is_dir():
                note("ref:missing-chapter", f"{rel}: Chapter {chapter}")

    return len(paths), fixed_files


def main() -> int:
    parser = argparse.ArgumentParser(description="Lint the books.")
    parser.add_argument("books", nargs="*", help="book ids (default: all)")
    parser.add_argument("--fix", action="store_true")
    args = parser.parse_args()

    selected = (
        [books.book_by_id(b) for b in args.books] if args.books else books.discover_books()
    )

    findings: Counter = Counter()
    examples: dict[str, list[str]] = {}
    scanned = 0
    fixed = 0
    for book in selected:
        count, fixed_here = lint(book, args.fix, findings, examples)
        scanned += count
        fixed += fixed_here

    print(
        f"scanned {scanned} pages; fixed {fixed} files"
        if args.fix
        else f"scanned {scanned} pages"
    )

    for category, count in findings.most_common():
        print(f"\n{category}: {count}")
        for example in examples[category]:
            print(f"    {example}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
