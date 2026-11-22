"""The page contracts the linter does not gate, with the debt recorded.

`textbook.lint` checks voice, spelling and the shape of a page. It does not check
whether a Review has an answer, whether the help actually fades, whether a
practice set is long enough, or whether the warm-up gate sits in front of the
questions. Those are the findings of the cross-book review, and each is a page
contract, so this module gates them.

**The debt is a ceiling, measured on 2026-11-22.** It may only go down: fix a
page and lower the number. A new violation pushes a book's count above its
ceiling and fails here. While a ceiling is non-zero, each test also asserts that
its scanner still finds an offender; a scanner that silently returns nothing
would otherwise pass.

The two voice and typesetting checks are here for the same reason. A front block
that runs to a 64-word semicolon chain, or an integral written `xdx`, renders
without an error and passes every other gate.
"""

from __future__ import annotations

import re
from collections import Counter
from pathlib import Path

import yaml

from textbook import book as books

BOOKS = books.discover_books()

#: Reviews whose mixed practice has numbered items and no answer block.
REVIEW_DEBT = {
    "gcse-maths": 6,
    "ie-jc-maths": 14,
    "ie-lc-maths": 13,
    "ie-lc-applied-maths": 9,
    "ie-lc-physics": 20,
}

#: Guided pages with a Hint and a Full working but no Next step.
FADE_DEBT = {"gcse-maths": 29}

#: Section practice pages whose rendered bank is outside the 8-15 contract.
PRACTICE_DEBT = {
    "ie-jc-maths": 3,
    "ie-lc-maths": 27,
    "ie-lc-applied-maths": 14,
    "ie-lc-physics": 37,
}

#: Guided pages where the warm-up gate sits after the first practice item, so it
#: gates the wrong `<details>` instead of the warm-up answers.
GATE_DEBT = {"gcse-maths": 5}

#: Learn pages whose pre-first-heading block contains a sentence over 32 words.
FRONT_DEBT = {
    "a-level-maths": 105,
    "a-level-physics": 0,
    "gcse-maths": 3,
    "gcse-physics": 35,
    "ie-jc-maths": 31,
    "ie-lc-maths": 16,
    "ie-lc-applied-maths": 18,
    "ie-lc-physics": 52,
}

#: Learn pages with a figure but no Predict prompt before it. `maths-applied`
#: is excluded: its rule is a static frame, not Predict -> Test -> Explain.
FIGURE_DEBT = {
    "gcse-maths": 2,
    "ie-jc-maths": 4,
    "ie-lc-maths": 7,
    "ie-lc-applied-maths": 10,
    "ie-lc-physics": 17,
}

#: Integrals written `xdx` rather than `x\,dx`.
FUSED_DEBT = {"a-level-maths": 50}

#: `\sqrt` followed by two or more digits, which KaTeX reads as the root of the
#: first digit followed by the rest: `\sqrt25` renders as sqrt(2) 5.
SQRT_DEBT: dict[str, int] = {}

#: Chapter openers that print a linked Roadmap and then an unlinked Sections list
#: of the same sections.
NAV_DEBT = {"ie-jc-maths": 16}

#: Reviews whose mixed-practice heading or closing checklist is not the course
#: ritual. `maths-applied` is excluded: its Review is deliberately different.
REVIEW_HEADING_DEBT = {"gcse-maths": 4}

#: Plain-text references to a section above the page's own tier, after inline
#: `<!-- tier:h -->` spans and markdown links are removed. These are the ones the
#: tier hook cannot unlink.
TIER_DEBT = {
    "gcse-maths": 2,
    "ie-jc-maths": 5,
    "ie-lc-applied-maths": 14,
    "ie-lc-maths": 75,
    "ie-lc-physics": 19,
}


def _body(text: str) -> str:
    return re.sub(r"^---\n.*?\n---\n", "", text, flags=re.S)


def _words(text: str) -> int:
    text = re.sub(r"\$\$.*?\$\$", " MATH ", text, flags=re.S)
    text = re.sub(r":::.*", " ", text)
    return len(re.findall(r"[A-Za-z][A-Za-z'’-]*", text))


def _review_without_answers(book):
    for path in book.docs.glob("Chapter */Review/index.md"):
        text = path.read_text(encoding="utf-8")
        block = re.search(r"^## Mixed practice.*?(?=^## |\Z)", _body(text), re.M | re.S)
        if not block or not re.search(r"^\d+\.\s", block.group(0), re.M):
            continue
        if ":::answers" in text:
            continue
        if re.search(r"<summary>[^<]*(answer|solution)", text, re.I):
            continue
        yield path


def _guided_without_next_step(book):
    for path in book.docs.glob("Chapter */Section */Guided problems/index.md"):
        text = path.read_text(encoding="utf-8")
        if (
            "<summary>Hint</summary>" in text
            and "<summary>Full working</summary>" in text
            and "<summary>Next step</summary>" not in text
        ):
            yield path


def _bank_sizes(book) -> dict[str, int]:
    sizes = {}
    for path in book.banks.glob("*.yaml"):
        try:
            data = yaml.safe_load(path.read_text(encoding="utf-8"))
        except yaml.YAMLError:
            continue
        if isinstance(data, dict) and isinstance(data.get("problems"), list):
            sizes[path.stem] = len(data["problems"])
    return sizes


def _practice_out_of_range(book):
    sizes = _bank_sizes(book)
    for path in book.docs.glob("Chapter */Section */Problems/index.md"):
        text = path.read_text(encoding="utf-8")
        banks = re.findall(r":::problems\s+(\S+)", text)
        count = sum(sizes.get(bank, 0) for bank in banks)
        if count < 8 or count > 15:
            yield path


def _gate_after_the_questions(book):
    for path in book.docs.glob("Chapter */Section */Guided problems/index.md"):
        text = path.read_text(encoding="utf-8")
        if ":::figure warm-up-gate" not in text:
            continue
        gate = text.find(":::figure warm-up-gate")
        first = re.search(r"(^### Question 1|^\*\*1\.\*\*)", text, re.M)
        if first and first.start() < gate:
            yield path


def _front_block_over_32(book):
    for path in book.docs.glob("Chapter */Section */Walkthrough/index.md"):
        text = path.read_text(encoding="utf-8")
        block = re.match(r"\s*# .*?\n(.*?)(?=^## )", _body(text), re.S | re.M)
        if not block:
            continue
        prose: list[str] = []
        too_long = False
        for line in block.group(1).splitlines():
            stripped = line.strip()
            if not stripped:
                continue
            if stripped.startswith(("- ", "* ")):
                item = stripped[2:].rstrip(";.")
                if _words(item) > 32:
                    too_long = True
            else:
                prose.append(stripped)
        if too_long or any(
            _words(sentence.group(0)) > 32
            for sentence in re.finditer(r"[^.!?]+[.!?]", " ".join(prose))
        ):
            yield path


def _predict_after_the_figure(book):
    if book.id == "maths-applied":
        return
    for path in book.docs.glob("Chapter */Section */Walkthrough/index.md"):
        text = path.read_text(encoding="utf-8")
        if ":::figure" not in text:
            continue
        first = text.find(":::figure")
        if not re.search(r"predict", text[:first], re.I):
            yield path


def _fused_differential(book):
    for path in book.docs.rglob("*.md"):
        if "assets/data" in path.parts:
            continue
        text = path.read_text(encoding="utf-8")
        for _ in re.finditer(r"[A-Za-z]dx", text):
            yield path


def _sqrt_run_together(book):
    for path in book.docs.rglob("*.md"):
        if "assets/data" in path.parts:
            continue
        text = path.read_text(encoding="utf-8")
        for _ in re.finditer(r"\\sqrt\s*\d{2,}", text):
            yield path


def _duplicate_section_lists(book):
    for path in book.docs.glob("Chapter */index.md"):
        text = path.read_text(encoding="utf-8")
        if "## Roadmap" in text and "## Sections" in text:
            yield path


def _review_heading_drift(book):
    if book.id == "maths-applied":
        return
    for path in book.docs.glob("Chapter */Review/index.md"):
        text = path.read_text(encoding="utf-8")
        if "## Mixed practice — choose the method first" not in text:
            yield path
        elif "## What you can now do" not in text:
            yield path


def _section_tiers(book) -> dict[str, str]:
    if not book.curriculum.is_file():
        return {}
    data = yaml.safe_load(book.curriculum.read_text(encoding="utf-8")) or {}
    tiers: dict[str, str] = {}

    def walk(node):
        if isinstance(node, dict):
            if "id" in node and "tier" in node:
                tiers[str(node["id"])] = node["tier"]
            for value in node.values():
                walk(value)
        elif isinstance(node, list):
            for value in node:
                walk(value)

    walk(data)
    return tiers


def _tier_excluded_reference(book):
    axis = getattr(book, "tier_axis", None) or {}
    if isinstance(axis, dict):
        axis = list(axis)
    if not axis:
        return
    tiers = _section_tiers(book)
    for path in book.docs.rglob("*.md"):
        text = path.read_text(encoding="utf-8")
        match = re.search(r"^tier:\s*([A-Z]+)", text, re.M)
        page_tier = match.group(1) if match else axis[0]
        if page_tier not in axis:
            continue
        page_level = axis.index(page_tier)
        body = re.sub(r"<!-- tier:h -->.*?<!-- /tier:h -->", "", text, flags=re.S)
        for line in body.splitlines():
            if "](" in line or line.lstrip().startswith("#"):
                continue
            if re.search(r"\bHigher\b|tier", line, re.I):
                continue
            for reference in re.finditer(r"(?:Section|§)\s*(\d+\.\d+)", line):
                target = reference.group(1)
                target_tier = tiers.get(target)
                if target_tier in axis and axis.index(target_tier) > page_level:
                    yield path


def _breaches(label: str, finder, debt: dict[str, int]) -> Counter:
    actual: Counter = Counter()
    examples: dict[str, list[str]] = {}
    for book in BOOKS:
        for path in finder(book):
            actual[book.id] += 1
            examples.setdefault(book.id, []).append(str(path.relative_to(book.docs)))
    over = {
        book: (actual[book], debt.get(book, 0))
        for book in actual
        if actual[book] > debt.get(book, 0)
    }
    assert not over, (
        f"{label}: {sum(n for n, _ in over.values())} new or unfixed page(s) "
        f"over the recorded ceiling {over}. The ceiling may only go down: fix "
        f"a page and lower the number. Examples:\n  "
        + "\n  ".join(
            f"{book} ({actual[book]} pages): {', '.join(examples[book][:4])}"
            for book in over
        )
    )
    if sum(debt.values()):
        assert actual.total() > 0, (
            f"{label}: the scanner found no offender while the ceiling is "
            f"non-zero; the scanner may be broken."
        )
    return actual


def test_every_review_with_mixed_practice_has_answers():
    _breaches("review without answers", _review_without_answers, REVIEW_DEBT)


def test_every_guided_page_that_fades_has_the_middle_rung():
    _breaches("Guided page without Next step", _guided_without_next_step, FADE_DEBT)


def test_every_practice_page_has_eight_to_fifteen_items():
    _breaches("practice page outside 8-15 items", _practice_out_of_range, PRACTICE_DEBT)


def test_the_warm_up_gate_precedes_the_first_question():
    _breaches("warm-up gate after the first question", _gate_after_the_questions, GATE_DEBT)


def test_the_front_block_has_no_sentence_over_the_ceiling():
    _breaches("front block over 32 words", _front_block_over_32, FRONT_DEBT)


def test_predict_comes_before_the_figure():
    _breaches("figure without Predict before it", _predict_after_the_figure, FIGURE_DEBT)


def test_an_integral_separates_its_differential():
    _breaches("fused differential", _fused_differential, FUSED_DEBT)


def test_a_square_root_takes_its_whole_number():
    _breaches("sqrt run together with its number", _sqrt_run_together, SQRT_DEBT)


def test_a_chapter_opener_does_not_list_its_sections_twice():
    _breaches("duplicate Roadmap and Sections", _duplicate_section_lists, NAV_DEBT)


def test_a_review_keeps_the_course_headings():
    _breaches("Review heading drift", _review_heading_drift, REVIEW_HEADING_DEBT)


def test_no_page_names_a_section_its_profile_excludes():
    _breaches(
        "plain reference to a tier-excluded section",
        _tier_excluded_reference,
        TIER_DEBT,
    )
