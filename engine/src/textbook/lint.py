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
from dataclasses import dataclass
from pathlib import Path

from . import book as books
from . import frontmatter
from .scaffold import PAGE_KINDS, STUB_MARKER


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

# --- rules --------------------------------------------------------------------
#
# A rule is a row: what it catches, what to write instead, and the reason it exists.
# The reason travels with the rule because it used to live in a comment above a
# regex, which is not where the person who has to widen the rule looks.
#
# A word or spelling that is *correct* in some sentences is a row in ALLOWED_PHRASES,
# and that table is consulted before a rule fires. It used to be a lookahead with one
# follower list per false positive — `just` carried fifty followers, and `meter` a
# lookbehind nobody could read — so the fix for a false positive was a rewrite of the
# pattern that risked every case it already got right. This is item 67's rule: a check
# may branch on data it was given, and a false positive is data with a reason.

#: The finding each table raises. A category is the key ALLOWED_PHRASES is written
#: against, so an exemption can only ever silence the rule it is about.
STYLE = "voice:style-word"
SPELLING = "style:us-spelling"


@dataclass(frozen=True)
class Word:
    """A word not to use in the reader's prose, and what to write instead."""

    word: str
    fix: str
    why: str


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

STYLE_WORDS: tuple[Word, ...] = (
    Word("obviously", "(remove)", "It tells a reader who is stuck that the step was easy."),
    Word("clearly", "(remove)", "The same fault: it praises a step for being visible to its writer."),
    Word("simply", "(remove or rewrite)", "It makes a hard step sound like a failure to see it."),
    Word("easy", "(rewrite: straightforward / quick)", "Calling a task easy shames the reader who cannot do it."),
    Word("easily", "(rewrite)", "The same word as an adverb."),
    Word("trivial", "(remove)", "The most dismissive of the set."),
    Word(
        "just",
        "(check: often removable)",
        "Belittling in 'it is just a table', and precise in 'just below zero' or "
        "'just begins to slide' — a measurement, a threshold or a limit, which "
        "ALLOWED_PHRASES allows with the reason on the row.",
    ),
)


@dataclass(frozen=True)
class Spelling:
    """A US spelling, the UK form to write instead, and why the rule exists."""

    us: str
    uk: str
    why: str


US_SPELLINGS: tuple[Spelling, ...] = (
    Spelling(r"\bfactoriz(e|es|ed|ing)\b", r"factoris\1", "UK English writes -ise: factorise, factorised."),
    Spelling(r"\bFactoriz(e|es|ed|ing)\b", r"Factoris\1", "The same at the start of a sentence, where the capital must survive."),
    Spelling(r"\bcolor(s|ed|ing)?\b", r"colour\1", "UK English writes colour."),
    Spelling(r"\bColor(s|ed|ing)?\b", r"Colour\1", "The same at the start of a sentence, where the capital must survive."),
    Spelling(r"\bcenter(s|ed|ing)?\b", r"centre\1", "UK English writes centre."),
    Spelling(r"\bCenter(s|ed|ing)?\b", r"Centre\1", "The same at the start of a sentence, where the capital must survive."),
    # A measuring instrument is a **meter** in UK English — a taxi meter, a water meter,
    # a parking meter. Only the unit of length is a **metre**. The rule used to carry
    # this in a lookbehind (`(?<=\d)`), which was unreadable and could not say what it
    # was for; the instrument is a determiner and a noun, so it is a row in
    # ALLOWED_PHRASES instead. `--fix` reads the same table, because rewriting "start
    # the meter" to "start the metre" is the same defect as reporting it.
    Spelling(r"\bmeter(s)?\b", r"metre\1", "Only the unit of length is metre; an instrument that measures is a meter (see ALLOWED_PHRASES)."),
    Spelling(r"\bMeter(s)?\b", r"Metre\1", "The same with a capital, where a sentence begins."),
    Spelling(r"\borganiz(e|es|ed|ing)\b", r"organis\1", "UK English writes -ise."),
    Spelling(r"\brecogniz(e|es|ed|ing)\b", r"recognis\1", "UK English writes -ise."),
    Spelling(r"\bsummariz(e|es|ed|ing)\b", r"summaris\1", "UK English writes -ise."),
    Spelling(r"\banalyz(e|es|ed|ing)\b", r"analys\1", "UK English writes analyse, analysis, analysed."),
    # `kilogram` used to be here, mapped to itself. The rule changed nothing and
    # the reporting loop still tested the pattern, so every page that wrote
    # "kilogram" — the UK spelling the book is asked to use — was reported as a
    # US spelling, and `--fix` could not clear it. There is no UK/US difference to
    # enforce; `kilogramme` is the obsolete form, and nothing writes it.
)


@dataclass(frozen=True)
class Allowed:
    """A phrase a rule would otherwise flag, and why the phrase is right.

    The row is the unit of change. A false positive is one of these, not a rewrite
    of the pattern that produced it: a pattern carrying its exemptions cannot be
    read by the person who has to add the next one, and editing it risks the cases
    it already gets right.
    """

    category: str
    phrase: str
    why: str


#: The senses of `just` that mean *exactly*, or *only barely* — a comparison, a
#: measurement, a threshold, a limit — and are correct as written. Every other use
#: of the word is the belittling one and is reported. The check reads one line at a
#: time, so a follower that wraps to the next line is not seen: write those clauses
#: so the word does not end a line.
ALLOWED_PHRASES: tuple[Allowed, ...] = (
    Allowed(STYLE, "just as", "means exactly as: a comparison"),
    Allowed(STYLE, "just like", "means exactly like: a comparison"),
    Allowed(STYLE, "just the", "a determiner: only the one"),
    Allowed(STYLE, "just now", "a time: a moment ago"),
    Allowed(STYLE, "just yet", "a time: only just"),
    Allowed(STYLE, "just before", "a position in time: immediately before"),
    Allowed(STYLE, "just after", "a position in time: immediately after"),
    Allowed(STYLE, "just once", "a count: one time"),
    Allowed(STYLE, "just enough", "a measurement: only just enough"),
    Allowed(STYLE, "just over", "a limit: only just over"),
    Allowed(STYLE, "just under", "a limit: only just under"),
    Allowed(STYLE, "just so", "means exactly so, or neatly arranged"),
    Allowed(STYLE, "just one", "a count: only one"),
    Allowed(STYLE, "just two", "a count: only two"),
    Allowed(STYLE, "just three", "a count: only three"),
    Allowed(STYLE, "just how", "a determiner: in what way exactly"),
    Allowed(STYLE, "just what", "a determiner: exactly what"),
    Allowed(STYLE, "just above", "a threshold: only just above"),
    Allowed(STYLE, "just below", "a threshold: only just below"),
    Allowed(STYLE, "just outside", "a boundary: only just outside"),
    Allowed(STYLE, "just inside", "a boundary: only just inside"),
    Allowed(STYLE, "just past", "a position: just past the mark"),
    Allowed(STYLE, "just short", "a measurement: only just short of"),
    Allowed(STYLE, "just at", "a threshold: at the limit"),
    Allowed(STYLE, "just begin", "an onset: only just begins"),
    Allowed(STYLE, "just begins", "an onset: only just begins"),
    Allowed(STYLE, "just start", "an onset: only just starts"),
    Allowed(STYLE, "just starts", "an onset: only just starts"),
    Allowed(STYLE, "just slide", "an onset of motion: only just slides"),
    Allowed(STYLE, "just slides", "an onset of motion: only just slides"),
    Allowed(STYLE, "just move", "an onset of motion: only just moves"),
    Allowed(STYLE, "just moves", "an onset of motion: only just moves"),
    Allowed(STYLE, "just clear", "a threshold crossed: only just clears"),
    Allowed(STYLE, "just clears", "a threshold crossed: only just clears"),
    Allowed(STYLE, "just miss", "a threshold missed by a margin: only just misses"),
    Allowed(STYLE, "just misses", "a threshold missed by a margin: only just misses"),
    Allowed(STYLE, "just touch", "a threshold met: only just touches"),
    Allowed(STYLE, "just touches", "a threshold met: only just touches"),
    Allowed(STYLE, "just reach", "a threshold met: only just reaches"),
    Allowed(STYLE, "just reaches", "a threshold met: only just reaches"),
    Allowed(STYLE, "just fit", "a threshold met: only just fits"),
    Allowed(STYLE, "just fits", "a threshold met: only just fits"),
    Allowed(STYLE, "just hold", "a threshold met: only just holds"),
    Allowed(STYLE, "just holds", "a threshold met: only just holds"),
    Allowed(STYLE, "just underneath", "a position: just underneath"),
    # A meter that measures. Each row is an instrument the books actually write
    # about; the fix for a new one is a new row here, not a narrower regex.
    Allowed(SPELLING, "the meter", "an instrument that measures is a meter; only the unit of length is a metre"),
    Allowed(SPELLING, "water meter", "an instrument that measures water is a meter, not a unit of length"),
    Allowed(SPELLING, "a.c. meter", "an instrument that measures alternating current is a meter"),
)


def _phrase_pattern(phrase: str) -> re.Pattern[str]:
    """A phrase as a pattern: whole words, any run of whitespace between them."""
    words = [re.escape(word) for word in phrase.split()]
    return re.compile(r"\b" + r"\s+".join(words) + r"\b", re.I)


_ALLOWED = tuple((row.category, _phrase_pattern(row.phrase)) for row in ALLOWED_PHRASES)


def _exempt(category: str, text: str, start: int, end: int) -> bool:
    """Is `text[start:end]` inside a phrase that is correct as written?"""
    return any(
        low <= start and end <= high
        for name, pattern in _ALLOWED
        if name == category
        for low, high in (match.span() for match in pattern.finditer(text))
    )


def _fires(category: str, text: str, pattern: str, flags: int = 0) -> bool:
    """Does `pattern` match `text` somewhere ALLOWED_PHRASES does not allow?"""
    return any(
        not _exempt(category, text, match.start(), match.end())
        for match in re.finditer(pattern, text, flags)
    )


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
    for rule in US_SPELLINGS:
        current = text
        text = re.sub(
            rule.us,
            lambda match, rule=rule, current=current: (
                match.group(0)
                if _exempt(SPELLING, current, match.start(), match.end())
                else match.expand(rule.uk)
            ),
            text,
        )
    for pattern, repl in INTERNAL_PHRASES.items():
        if repl == "(delete)":
            text = re.sub(pattern, "", text)
        else:
            text = re.sub(pattern, repl, text, flags=re.I)
    return text


def lint(book: books.Book, fix: bool, findings: Counter, examples: dict) -> tuple[int, int]:
    docs = book.docs

    # The structural rules below are keyed on the **book's own** page kinds, not on
    # the three a course happens to have. A book that declares
    # `section_pages: [learn]` has no `Practise` page, so demanding verified answer
    # markers on one would be asking for a page the book does not have — and the
    # exemption would then have to be repeated for every future book with a
    # different shape. Reading the same declaration the scaffold reads means the
    # rule and the page cannot disagree.
    declared = set(book.section_page_kinds)
    directory = {
        kind: name for name, kind, _title, _slug in PAGE_KINDS if kind in declared
    }
    walkthrough = directory.get("walkthrough")
    guided = directory.get("guided-problems")
    practise = directory.get("problems")

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
        rel = str(path.relative_to(book.root))
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
            for rule in STYLE_WORDS:
                if _fires(STYLE, stripped, rf"\b{re.escape(rule.word)}\b", re.I):
                    note(STYLE, where)
            for bad in {**NEGATIVE_CONTRACTIONS, **OTHER_CONTRACTIONS}:
                if re.search(rf"\b{re.escape(bad)}\b", stripped, re.I):
                    note("voice:contraction", where)
            for rule in US_SPELLINGS:
                if _fires(SPELLING, stripped, rule.us):
                    note(SPELLING, where)
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
        if walkthrough and f"/{walkthrough}/" in rel_posix:
            for label, needle in (
                ("structure:walkthrough-missing-checklist", "You should now be able to"),
                ("structure:walkthrough-missing-watchout", "Watch out"),
            ):
                if needle not in text:
                    note(label, rel)
        if guided and f"/{guided}/" in rel_posix and "Warm-up: remember" not in text:
            note("structure:guided-missing-warmup", rel)
        if practise and f"/{practise}/" in rel_posix:
            if ":::problems" not in text or ":::answers" not in text:
                note("structure:problems-missing-markers", rel)

    # A retrieval starter repeated across a chapter's sections is a copy-paste, not
    # a design (P4). Advisory: it reports, and the content pass acts on it.
    starters: dict[str, list[str]] = {}
    for path in paths:
        rel_posix = path.as_posix()
        if not guided or f"/{guided}/" not in rel_posix:
            continue
        chapter = re.search(r"Chapter (\d+)/", rel_posix)
        if not chapter:
            continue
        block = warm_up_block(path.read_text(encoding="utf-8"))
        if block:
            starters.setdefault(f"Chapter {chapter.group(1)}|{block}", []).append(
                str(path.relative_to(book.root))
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
        rel = str(path.relative_to(book.root))
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

    # A finding is a failure. The repository's definition of done says the linter
    # reports nothing for a book, and for a long time this returned 0 regardless —
    # so 42 findings across five books sat in the tree while every gate run said
    # "all checks passed". The count is the gate; printing it is not.
    return 1 if findings else 0


if __name__ == "__main__":
    sys.exit(main())
