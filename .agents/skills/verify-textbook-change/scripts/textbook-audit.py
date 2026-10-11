#!/usr/bin/env python3
"""Pedagogy and consistency audit for the textbooks.

Reports on the checks the voice linter does not make: whether support actually
fades, whether a chapter keeps one set of heading names, whether a page is still
at the target reading age, and whether structure held. Findings need judgement;
by default the script reports and exits 0. Pass --strict to fail on any finding.

Usage:
    uv run python .agents/skills/verify-textbook-change/scripts/textbook-audit.py
    uv run python .agents/skills/verify-textbook-change/scripts/textbook-audit.py --strict
    uv run python .agents/skills/verify-textbook-change/scripts/textbook-audit.py gcse-maths
"""

from __future__ import annotations

import argparse
import re
import statistics
import sys
from collections import Counter
from pathlib import Path

def repo_root() -> Path:
    """Walk up to the repository root, identified by a books/ directory with a book."""
    for candidate in Path(__file__).resolve().parents:
        if any((candidate / "books").glob("*/book.yaml")):
            return candidate
    return Path(__file__).resolve().parents[4]


REPO = repo_root()
FENCE = re.compile(r"^ {0,3}(`{3,}|~{3,}).*?^ {0,3}\1\s*$", re.S | re.M)
FRONT = re.compile(r"^---\n.*?\n---\n", re.S)
COMMENT = re.compile(r"<!--.*?-->", re.S)
DISPLAY = re.compile(r"\$\$.*?\$\$", re.S)
INLINE = re.compile(r"\$[^$\n]+\$")
CODE = re.compile(r"`[^`]+`")
LINK = re.compile(r"\[([^\]]+)\]\([^)]+\)")
DETAIL = re.compile(
    r'<details[^>]*markdown="1">\s*<summary>(.*?)</summary>(.*?)</details>', re.S
)


def strip(text: str) -> str:
    text = FENCE.sub(lambda m: "\n" * m.group(0).count("\n"), text)
    text = COMMENT.sub("", text)
    text = DISPLAY.sub(" MATH ", text)
    text = INLINE.sub(" MATH ", text)
    return CODE.sub(" CODE ", text)


def without_details(text: str) -> str:
    return DETAIL.sub(lambda m: "\n" * m.group(0).count("\n"), text)


def prose_paragraphs(text: str):
    """Yield prose paragraphs, with headings, tables, lists and directives removed."""
    body = FRONT.sub("", text)
    body = strip(body)
    buf: list[str] = []
    for line in body.splitlines():
        stripped = line.strip()
        if not stripped:
            if buf:
                yield " ".join(buf)
                buf = []
            continue
        if stripped.startswith(("#", "|", ">", ":::", "<", "-", "*", "+")) or re.match(
            r"^\d+\.", stripped
        ):
            if buf:
                yield " ".join(buf)
                buf = []
            continue
        buf.append(LINK.sub(r"\1", line))
    if buf:
        yield " ".join(buf)


def syllables(word: str) -> int:
    word = re.sub(r"[^a-z]", "", word.lower())
    if not word:
        return 0
    groups = len(re.findall(r"[aeiouy]+", word))
    if word.endswith("e") and groups > 1:
        groups -= 1
    return max(1, groups)


def normalise(text: str) -> str:
    text = re.sub(r"[`*_$\\]", "", text)
    return re.sub(r"\s+", " ", text).strip().lower()


def audit(book_dir: Path, findings: list[str], notes: list[str]) -> None:
    docs = book_dir / "docs"
    pages = sorted(docs.rglob("*.md"))

    # 1. Support fades: Next step must not repeat Full working, and a repeated
    #    generic block means the support does not fade per problem.
    for path in pages:
        if "/Guided problems/" not in path.as_posix():
            continue
        text = path.read_text(encoding="utf-8")
        blocks = DETAIL.findall(text)
        labels = [normalise(label) for label, _ in blocks]
        bodies = [normalise(body) for _, body in blocks]
        for index, label in enumerate(labels):
            if index + 1 >= len(bodies):
                continue
            if label == "next step" and bodies[index] == bodies[index + 1]:
                findings.append(
                    f"fade-collapse: {path.relative_to(REPO)}: "
                    "'Next step' repeats 'Full working'"
                )
            if label == "hint" and bodies[index] == bodies[index + 1]:
                findings.append(
                    f"fade-collapse: {path.relative_to(REPO)}: "
                    "'Hint' repeats the next block"
                )
        for label_name in ("Hint", "Next step"):
            repeated = Counter(
                body
                for name, body in ((normalise(l), normalise(b)) for l, b in blocks)
                if name == normalise(label_name) and len(body) > 20
            )
            for body, count in repeated.items():
                if count >= 3:
                    notes.append(
                        f"generic-fade: {path.relative_to(REPO)}: '{label_name}' is the "
                        f"same on {count} problems, so it fades nothing — ``{body[:70]}``"
                    )

    # 2. Prose before the H1 (headings in order) and duplicate paragraphs.
    for path in pages:
        text = path.read_text(encoding="utf-8")
        body = FRONT.sub("", text)
        lines = COMMENT.sub("", body).splitlines()
        first = next((i for i, line in enumerate(lines) if line.startswith("#")), None)
        if first is not None and any(line.strip() for line in lines[:first]):
            findings.append(
                f"prose-before-h1: {path.relative_to(REPO)}: text appears before the "
                "first heading"
            )
        paragraphs = [
            normalise(p)
            for p in prose_paragraphs(without_details(text))
            if len(normalise(p)) > 40
        ]
        for first_p, second_p in zip(paragraphs, paragraphs[1:]):
            if first_p == second_p:
                findings.append(
                    f"duplicate-paragraph: {path.relative_to(REPO)}: "
                    "the same paragraph appears twice"
                )
                break

    # 3. One ritual per chapter: stable opener headings.
    for opener in sorted(docs.glob("Chapter */index.md")):
        text = opener.read_text(encoding="utf-8")
        headings = re.findall(r"^## (.+)$", text, re.M)
        if not any(h.startswith("The chapter problem") for h in headings):
            findings.append(
                f"opener-missing-anchor: {opener.relative_to(REPO)}: no "
                "'The chapter problem' heading"
            )
        if not any("By the end of" in h for h in headings):
            findings.append(
                f"opener-missing-outcomes: {opener.relative_to(REPO)}: no "
                "'By the end of this chapter' heading"
            )
        if "Roadmap" not in headings:
            notes.append(
                f"opener-heading-drift: {opener.relative_to(REPO)}: roadmap heading is "
                f"{[h for h in headings if 'route' in h.lower() or 'roadmap' in h.lower()]!r}"
            )

    # 4. Relevance prompt: one heading name across chapters.
    relevance_headings: Counter[str] = Counter()
    for opener in sorted(docs.glob("Chapter */index.md")):
        for heading in re.findall(r"^## (.+)$", opener.read_text(encoding="utf-8"), re.M):
            low = heading.lower()
            if any(word in low for word in ("connect", "relevance", "where this", "your life")):
                relevance_headings[heading] += 1
    if len(relevance_headings) > 1:
        notes.append(
            "relevance-heading-drift: the same prompt is under "
            f"{len(relevance_headings)} headings: {dict(relevance_headings)}"
        )

    # 5. Curriculum codes must not be printed to the reader.
    covers = []
    for path in pages:
        for line_number, line in enumerate(
            path.read_text(encoding="utf-8").splitlines(), 1
        ):
            if re.search(r"\*\*Covers:\*\*", line):
                covers.append(f"{path.relative_to(REPO)}:{line_number}: {line.strip()[:80]}")
    if covers:
        notes.append(
            f"covers-in-prose: {len(covers)} page(s) print curriculum codes to the "
            "reader; they belong in front matter only"
        )
        notes.extend("  " + item for item in covers[:5])

    # 6. Reading age on prose alone.
    lengths: list[int] = []
    words = 0
    syllables_total = 0
    for path in pages:
        for paragraph in prose_paragraphs(path.read_text(encoding="utf-8")):
            for match in re.finditer(r"[^.!?]+[.!?]", paragraph):
                sentence = " ".join(match.group(0).split())
                tokens = re.findall(r"[A-Za-z]+", sentence)
                if len(tokens) < 4:
                    continue
                lengths.append(len(tokens))
                words += len(tokens)
                syllables_total += sum(syllables(token) for token in tokens)
    if lengths:
        asl = words / len(lengths)
        asw = syllables_total / words
        grade = 0.39 * asl + 11.8 * asw - 15.59
        notes.append(
            f"reading-age: mean sentence {asl:.1f} words, max {max(lengths)}, "
            f"Flesch-Kincaid grade {grade:.1f} (target 12-14 => grade 5-9)"
        )
        if grade > 9:
            findings.append(f"reading-age: FK grade {grade:.1f} is above the target")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("books", nargs="*", help="book ids (default: all)")
    parser.add_argument("--strict", action="store_true", help="exit 1 on any finding")
    args = parser.parse_args()

    books_root = REPO / "books"
    if args.books:
        book_dirs = [books_root / book for book in args.books]
    else:
        book_dirs = sorted(p.parent for p in books_root.glob("*/book.yaml"))

    findings: list[str] = []
    notes: list[str] = []
    for book_dir in book_dirs:
        audit(book_dir, findings, notes)

    print("NOTE (needs judgement)")
    for note in notes or ["none"]:
        print(f"  {note}")
    print("\nFINDINGS")
    for finding in findings or ["none"]:
        print(f"  {finding}")

    if args.strict and findings:
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
