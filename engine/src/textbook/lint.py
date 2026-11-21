#!/usr/bin/env python3
"""Lint a book for voice, style and mechanical mistakes.

    python -m textbook.lint                 # every book
    python -m textbook.lint gcse-maths
    python -m textbook.lint --fix           # apply the safe automatic fixes

Anything that needs judgement is reported, not rewritten.
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


FENCE = re.compile(r"^ {0,3}(`{3,}|~{3,}).*?^ {0,3}\1\s*$", re.S | re.M)
DISPLAY_MATH = re.compile(r"\$\$.*?\$\$", re.S)
INLINE_MATH = re.compile(r"\$[^$\n]+\$")
CODE_SPAN = re.compile(r"`[^`]+`")
LINK_URL = re.compile(r"\]\([^)]+\)")


def prose_lines(text: str):
    r"""Yield (line_number, raw, prose) with code and maths replaced by a token.

    The token has no spaces, so removing maths cannot create phantom double
    spaces or repeated words. Display maths is blanked before the split into
    lines, keeping its newlines, so line numbers stay correct.
    """
    text = FENCE.sub(lambda m: "\n" * m.group(0).count("\n"), text)
    text = DISPLAY_MATH.sub(lambda m: "\x00" + "\n" * m.group(0).count("\n"), text)
    for number, line in enumerate(text.splitlines(), 1):
        stripped = INLINE_MATH.sub("\x00", line)
        stripped = CODE_SPAN.sub("\x00", stripped)
        stripped = LINK_URL.sub("]", stripped)
        yield number, line, stripped


#: A line that starts a heading, a table, a directive, a block quote or a list:
#: structure, which the sentence rule does not join.
STRUCTURAL = re.compile(r"^\s*(?:#{1,6}\s|\||<|:::|>)")
LIST_ITEM = re.compile(r"^\s{0,3}(?:[-*+]|\d+\.)\s")
FRONT_MATTER = re.compile(r"\A---\r?\n.*?\r?\n---\r?\n", re.S)


def prose_paragraphs(text: str):
    """Yield ``(first_line, joined_prose)`` for each paragraph in a page.

    Only the sentence ceiling needs this: a hard-wrapped sentence never fits on
    one line. Headings, tables, directives, quotes, list items and display maths
    are structure, and a list is skipped whole with its continuation lines.
    """
    buffer: list[str] = []
    start = 0
    in_list = False
    # Front matter is data, not prose: blank it line for line so findings keep line numbers.
    text = FRONT_MATTER.sub(lambda m: "\n" * m.group(0).count("\n"), text)
    for number, _raw, stripped in prose_lines(text):
        body = stripped.strip()
        if not body or body == "\x00":
            if buffer:
                yield start, " ".join(buffer)
                buffer = []
            in_list = False
            continue
        if STRUCTURAL.match(stripped) or LIST_ITEM.match(stripped):
            if buffer:
                yield start, " ".join(buffer)
                buffer = []
            in_list = bool(LIST_ITEM.match(stripped))
            continue
        if in_list:
            continue
        if not buffer:
            start = number
        buffer.append(stripped)
    if buffer:
        yield start, " ".join(buffer)


QUOTE = re.compile(r"^\s{0,3}>\s?")


def _unquoted(line: str) -> str:
    """The line with its block-quote markers removed.

    A quote is a container, and the rules inside it are Markdown's: stripping the
    markers is what lets one scan see a defect quoted and unquoted alike.
    """
    while QUOTE.match(line):
        line = QUOTE.sub("", line, count=1)
    return line


def lists_without_a_blank_line(text: str):
    """Line numbers of list items the Markdown parser will not read as a list.

    A list starts a paragraph, so its first item needs a blank line above unless
    the line above already ends a block; without one the reader sees the hyphen.
    Later items are not reported: the list continues through them and through
    their indented continuation lines. A multi-line ``$$`` block is not prose, so
    its ``+``/``-`` continuation lines are arithmetic, not items.
    """
    # Front matter is YAML: `refs:` followed by `- A23` is a list either way. Blanked
    # line for line so a finding still names the line the author has to open.
    text = FRONT_MATTER.sub(lambda match: "\n" * match.group(0).count("\n"), text)
    lines = [_unquoted(line) for line in text.splitlines()]
    offences = []
    in_fence = False
    in_list = False
    in_maths = False
    for index, line in enumerate(lines):
        stripped = line.strip()
        if stripped.startswith("```"):
            in_fence = not in_fence
            in_list = False
            continue
        if in_fence:
            continue
        # A maths block, entered and left by an unpaired `$$`; a line carrying both
        # delimiters changes nothing.
        if in_maths:
            if stripped.count("$$") % 2:
                in_maths = False
            continue
        if stripped.count("$$") % 2:
            in_maths = True
            in_list = False
            continue
        if not stripped:
            in_list = False
            continue
        if LIST_ITEM.match(line):
            if in_list:
                continue
            previous = lines[index - 1] if index else ""
            if previous.strip() and not previous.lstrip().startswith(
                ("#", "|", "```", ":::", "<")
            ):
                offences.append(index + 1)
            in_list = True
            continue
        # An indented line continues the item above it; a flush-left line ends the list.
        if not line.startswith((" ", "\t")):
            in_list = False
    return offences


def display_maths_without_a_blank_line(text: str):
    """Line numbers of display equations that share a paragraph with the prose.

    ``$$…$$`` is a block, so it needs a blank line above unless the line above ends
    one; without it the delimiters reach the reader. Three shapes, one defect: prose
    directly above an opening ``$$``, prose directly below a closing one, and a
    ``$$…$$`` inside a sentence, which no blank line can fix. Quotes are read with
    markers stripped; fences and table cells are skipped.
    """
    text = FRONT_MATTER.sub(lambda match: "\n" * match.group(0).count("\n"), text)
    raw = text.splitlines()
    lines = []
    for line in raw:
        content = _unquoted(line)
        # `> $$x$$` is a block at the start of its line; `>    $$x$$` is not. Removing
        # the marker leaves the space that followed it, so take one off — but only
        # when the line really was quoted.
        if line is not content and content.startswith(" ") and not line.startswith((" ", "\t")):
            content = content[1:]
        lines.append(content)
    offences = []
    in_fence = False
    in_maths = False
    for index, line in enumerate(lines):
        stripped = line.strip()
        if stripped.startswith("```"):
            in_fence = not in_fence
            continue
        if in_fence or "$$" not in stripped or stripped.startswith("|"):
            continue
        # Count delimiters: a lone `$$` opens a multi-line block, it holds no equation.
        delimiters = stripped.count("$$")
        if in_maths:
            if delimiters % 2:
                in_maths = False
                if index + 1 < len(lines) and lines[index + 1].strip():
                    offences.append(index + 2)
            continue
        if not stripped.startswith("$$") and not stripped.endswith("$$"):
            # Mid-sentence, which is a different repair: no blank line helps here.
            offences.append(index + 1)
            continue
        if not stripped.startswith("$$") and stripped.endswith("$$"):
            # Text before the equation on the same line: no blank line separates them.
            offences.append(index + 1)
            continue
        if line != line.lstrip(" \t"):
            # An indented `$$` is not a block to the maths hook, whatever is around it.
            offences.append(index + 1)
            continue
        if index and lines[index - 1].strip():
            offences.append(index + 1)
        if delimiters % 2 == 0:
            # A whole equation on one line: the line below needs its own blank too.
            if index + 1 < len(lines) and lines[index + 1].strip():
                offences.append(index + 2)
        else:
            in_maths = True
    return offences


#: The house register is 15–20 words, one idea each. A section page, where the reader
#: does the work, is held to 25; every other page to 32, because a reference page may
#: legitimately carry a longer sentence.
SENTENCE_CEILING = 32
SECTION_CEILING = 25

#: A section page: the teaching page of a numbered section, in any book's layout.
SECTION_PAGE = re.compile(r"(?i)/Section \d+\.\d+/(?:Walkthrough|Learn)/index\.md$")


def long_sentences(text: str, ceiling: int = SENTENCE_CEILING):
    """Yield ``(line_number, sentence)`` for each sentence over ``ceiling`` words."""
    for number, paragraph in prose_paragraphs(text):
        for sentence in _sentences(paragraph):
            if len(re.findall(r"[A-Za-z]+", sentence)) > ceiling:
                yield number, " ".join(sentence.split())


# A rule is a row: what it catches, what to write instead, and why. A word that is
# correct in some sentences is a row in ALLOWED_PHRASES, consulted before a rule fires;
# the fix for a false positive is a new row, never a narrower pattern.

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
    # The refs live in front matter (`dfe: [G3]`), so this line is a note to us.
    r"\bDfE coverage\b[^\n]*": "(delete)",
    # The page names are ours: the navigator and the prose both say "Practise with help".
    r"\bGuided problems\b": "Practise with help",
    r"\btier [FH]\b": "Foundation / Higher",
    r"\bscaffold\b": "(delete)",
    r"\bfront matter\b": "(delete)",
    # "The bank" alone is ordinary English (money, a river), so a bare one is left
    # alone: only the bank of problems is internal.
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
        "naive",
        "(name the method instead)",
        "It calls a method foolish for answering the question it was asked, so it "
        "tells a reader the honest answer must be the complicated one.",
    ),
    Word(
        "toy",
        "(name the model instead)",
        "'A toy model' says a simple model is not worth the reader's attention — the "
        "claim this collection argues against in every book.",
    ),
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
    # An instrument that measures is a meter in UK English; only the unit of length is
    # a metre. The instrument is a determiner and a noun, so it is a row in
    # ALLOWED_PHRASES, which `--fix` reads too.
    Spelling(r"\bmeter(s)?\b", r"metre\1", "Only the unit of length is metre; an instrument that measures is a meter (see ALLOWED_PHRASES)."),
    Spelling(r"\bMeter(s)?\b", r"Metre\1", "The same with a capital, where a sentence begins."),
    Spelling(r"\borganiz(e|es|ed|ing)\b", r"organis\1", "UK English writes -ise."),
    Spelling(r"\brecogniz(e|es|ed|ing)\b", r"recognis\1", "UK English writes -ise."),
    Spelling(r"\bsummariz(e|es|ed|ing)\b", r"summaris\1", "UK English writes -ise."),
    Spelling(r"\banalyz(e|es|ed|ing)\b", r"analys\1", "UK English writes analyse, analysis, analysed."),
    # No `kilogram` row: it is already the UK spelling, and `kilogramme` is obsolete.
)


@dataclass(frozen=True)
class Allowed:
    """A phrase a rule would otherwise flag, and why the phrase is right.

    The row is the unit of change: a false positive is one of these, not a rewrite
    of the pattern that produced it.
    """

    category: str
    phrase: str
    why: str


#: The senses of `just` that mean *exactly* or *only barely* — a comparison, a
#: measurement, a threshold, a limit — and are correct as written. The check reads one
#: line at a time, so a follower that wraps is not seen: do not end a line on the word.
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
    # Two belittling words with correct senses the books write: *the naive error bar*
    # is a named quantity, and *a toy car* is an ordinary noun. One row per sense.
    Allowed(STYLE, "naive error bar", "the uncorrected standard error: a named quantity, not a judgement of a method"),
    Allowed(STYLE, "toy car", "a child's toy is an ordinary noun, not a model called worthless"),
    # A meter that measures: a new instrument is a new row here, not a narrower regex.
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

#: Periods that do not end a sentence: `§1.6`, `1.5`, `e.g.`, and a link target's URL.
#: Masked before splitting, restored after, so the finding still quotes the page.
LINK_TARGET = re.compile(r"\]\([^)]*\)")

#: Abbreviations whose final period is not a stop.
ABBREV = re.compile(r"\b(?:e\.g|i\.e|vs|cf|etc|approx|Fig|Eq|Ref)\.", re.I)

NON_STOP = re.compile(
    r"(?<=§\d)\.(?=\d)"          # §1.6
    r"|(?<=\d)\.(?=\d)"          # 1.5, 0.001
)


def _sentences(paragraph: str):
    """The paragraph's sentences, with the periods that do not end one left alone."""
    mask = lambda m: m.group(0).replace(".", "\x00")  # noqa: E731 - one expression
    masked = LINK_TARGET.sub(mask, paragraph)
    masked = ABBREV.sub(mask, masked)
    masked = NON_STOP.sub("\x00", masked)
    return [s.replace("\x00", ".") for s in SENTENCE.findall(masked)]

#: The sentences over the ceiling a book still carries. The debt is grandfathered so a
#: rule can land without rewriting every book at once, and it may only go down: fix a
#: sentence and lower the number. It is a count rather than a list, so in a book with
#: debt a new sentence can replace a fixed one. The section table is the same, at 25
#: words; `maths-applied` is absent because its sections were rewritten instead.
SECTION_SENTENCE_DEBT: dict[str, int] = {
    "gcse-maths": 15,
    "gcse-physics": 73,
    "a-level-maths": 146,
    "a-level-physics": 79,
    "ie-jc-maths": 131,
    "ie-lc-maths": 148,
    "ie-lc-applied-maths": 87,
    "ie-lc-physics": 197,
}

SENTENCE_DEBT: dict[str, int] = {
    "gcse-maths": 3,
    "gcse-physics": 44,
    "a-level-maths": 124,
    "a-level-physics": 35,
    "ie-jc-maths": 55,
    "ie-lc-maths": 42,
    "ie-lc-applied-maths": 50,
    "ie-lc-physics": 100,
    "proofs": 8,
    "numerical-methods": 0,
    "maths-applied": 0,
}
#: The lists a book still starts without a blank line. Empty is the state the rule is
#: written to reach; like every debt here it may only go down, and a book at 0 stays 0.
LIST_DEBT: dict[str, int] = {}

LINK = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")
SECTION_REF = re.compile(r"\bSection (\d+\.\d+)\b")
CHAPTER_REF = re.compile(r"\bChapter (\d+)\b")


def known_sections(book: books.Book) -> set[str]:
    return {s["id"] for chapter in book.chapters for s in chapter["sections"]}


def warm_up_block(text: str) -> str:
    """The retrieval starter, normalised so two copies compare equal.

    Used to catch a chapter whose sections share one warm-up: P4 asks each section to
    retrieve the earlier material *that section* depends on, so the same questions
    five times measure the chapter, and the reader learns to skip them.
    """
    match = re.search(r"^## Warm-up: remember\n(.*?)(?=^## |\Z)", text, re.M | re.S)
    if not match:
        return ""
    return re.sub(r"\s+", " ", match.group(1)).strip()



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

    # Structural rules key on the book's own page kinds, the declaration the scaffold
    # reads: a book that declares `section_pages: [learn]` has no `Practise` page.
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
    long_found: list[tuple[str, int, str]] = []
    section_found: list[tuple[str, int, str]] = []
    for path in paths:
        text = path.read_text(encoding="utf-8")
        # A stub is a note to the author, so it is supposed to carry the internal words
        # this scan reports. `scaffold.emit` rewrites any file that still carries it.
        if STUB_MARKER in text:
            continue
        original = text
        if fix:
            text = fix_text(text)
        rel = str(path.relative_to(book.root))
        # Front matter that does not parse silently drops `tier`; see frontmatter.py.
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
        # Two ceilings, two debts; judged per book below, because a debt is a book's.
        if SECTION_PAGE.search(rel):
            section_found.extend(
                (rel, line, sentence)
                for line, sentence in long_sentences(text, SECTION_CEILING)
            )
        else:
            long_found.extend(
                (rel, line, sentence) for line, sentence in long_sentences(text)
            )
        if re.search(r"Chapter \d+/index\.md$", rel_posix):
            if "## The chapter problem" not in text:
                note("structure:chapter-missing-anchor", rel)
            if "By the end of this chapter" not in text:
                note("structure:chapter-missing-outcomes", rel)
        broken_lists = lists_without_a_blank_line(text)
        for index, line_number in enumerate(broken_lists):
            if index < LIST_DEBT.get(book.id, 0):
                continue
            note("structure:list-without-blank-line", f"{rel}:{line_number}")
        for line_number in display_maths_without_a_blank_line(text):
            note("structure:display-maths-without-blank-line", f"{rel}:{line_number}")

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

    # A book's existing debt is allowed; everything after it is a finding, longest first.
    for index, (rel, line_number, sentence) in enumerate(
        sorted(long_found, key=lambda item: len(item[2]), reverse=True)
    ):
        if index < SENTENCE_DEBT.get(book.id, 0):
            continue
        note("style:long-sentence", f"{rel}:{line_number}: {sentence[:90]}")

    # The same shape against the section debt.
    for index, (rel, line_number, sentence) in enumerate(
        sorted(section_found, key=lambda item: len(item[2]), reverse=True)
    ):
        if index < SECTION_SENTENCE_DEBT.get(book.id, 0):
            continue
        note(
            "style:long-sentence-in-a-section",
            f"{rel}:{line_number}: {sentence[:90]}",
        )

    # A warm-up repeated across a chapter's sections is a copy-paste, not a design (P4).
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

    # A finding is a failure: the count is the gate, and printing it is not.
    return 1 if findings else 0


if __name__ == "__main__":
    sys.exit(main())
