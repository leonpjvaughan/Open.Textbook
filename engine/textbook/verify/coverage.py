"""Does every equation a question plays come from the booklet the reader has?

A physics question must not need an equation the reader is not shown. That is
`research/curriculum/physics-verifier-gaps.md` §3.6, and this is the check it asks
for — but **not** the check it originally proposed.

## Why it is declaration-first

The obvious design is to infer: read the formula out of a bank record and find the
booklet item it is an instance of. That was measured on the two completed physics
books before anything was built, and it does not work:

    323 records carry an expression
      121 are pure arithmetic — `100 - 10 - 20` — with no booklet equation to play
      182 carry symbols — `F / (r * v)`, `E / f`, `(C - B) / t`

and of the expressions actually printed, **0 of 34 resolved** against the GCSE
booklet and **53 of 176** against the A-level one. The rest are *substituted*
forms: `0.5 * 1200 * 15**2` is kinetic energy, but nothing in the expression says
so, and a matcher that guessed would as happily call it potential energy. An
inferred match therefore passes by accident, which this repository treats as worse
than no check at all.

So the declaration is the truth and the check verifies it:

    plays: aqa-kinetic-energy      # on the record, or inside its `check:`

and the check proves the id exists in the book's booklet and that **some board the
book follows provides it**. `given` means printed on that board's insert,
`question` means supplied in the question — either way the reader is not asked to
recall it. `know` means they are, so a record that plays a `know` item for every
supported board is an error.

## What it cannot prove, and says so

Completeness. A record with no `plays:` is not an error, because 121 of them have
nothing to play and nothing distinguishes "arithmetic" from "an undeclared
formula" mechanically — that measurement is the whole reason this file is shaped
the way it is. `undeclared()` reports the records that carry symbols and declare
nothing, so the gap is visible and countable rather than assumed closed.

`infer()` is the same machinery used honestly: it *suggests* the booklet items a
formula might play, so an author writing a declaration is helped rather than
guessing. It never decides.
"""

from __future__ import annotations

import itertools
import re
from pathlib import Path

from .. import book as books

#: Provision values a booklet item may carry, from `BOOKLETS.md`.
GIVEN = "given"
QUESTION = "question"
KNOW = "know"

_TEXT = re.compile(r"\\text\{[^}]*\}")


def booklet_items(book: books.Book) -> dict[str, dict]:
    """Every item in the book's booklet, by id.

    A book with no booklet returns an empty mapping, and then any `plays:` is an
    error — which is right: there is nothing for the reader to be given.
    """
    if not book.booklet_name:
        return {}
    path = book.root / book.booklet_name
    if not path.is_file():
        return {}
    import yaml

    data = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
    items: dict[str, dict] = {}
    for section in data.get("sections", []) or []:
        for item in section.get("items", []) or []:
            if isinstance(item, dict) and item.get("id"):
                items[str(item["id"])] = item
    return items


def declared(problem: dict) -> str | None:
    """The booklet item a record says it plays, if it says."""
    for source in (problem, problem.get("check") or {}):
        value = source.get("plays")
        if value:
            return str(value).strip()
    return None


def supported_boards(book: books.Book) -> tuple[str, ...]:
    """The board keys a booklet's `provision` uses, lowercased.

    `book.yaml → boards` is written for a reader ("Pearson Edexcel"); a booklet's
    `provision` is keyed for a machine ("edexcel").
    """
    keys = []
    for board in book.boards:
        key = str(board).strip().lower()
        key = key.split()[-1] if " " in key else key
        keys.append(key)
    return tuple(keys)


def errors(problem: dict, items: dict[str, dict], boards: tuple[str, ...]) -> list[str]:
    """Why a record's declared equation is not one the reader is shown."""
    item_id = declared(problem)
    if item_id is None:
        return []
    if item_id not in items:
        return [
            f"plays {item_id!r}, which is not in this book's booklet. "
            f"Known ids include {', '.join(sorted(items)[:3])}…"
            if items
            else f"plays {item_id!r}, but this book declares no booklet"
        ]
    provision = items[item_id].get("provision") or {}
    not_provided = [b for b in boards if provision.get(b) == KNOW]
    if len(not_provided) == len(boards) and boards:
        return [
            f"plays {item_id!r}, which every supported board expects the reader to "
            f"recall (provision: {provision}). A question must not need it."
        ]
    return []


# --- the author's aid, never the verdict --------------------------------------


def _sides(item: dict):
    """The two sides of a booklet item's relation, as SymPy expressions.

    Parsed with `sympy.parsing.latex`, which needs `antlr4-python3-runtime`; a
    booklet item that will not parse is skipped rather than guessed at.
    """
    from sympy.parsing.latex import parse_latex

    latex = _TEXT.sub("", str(item.get("latex") or "")).strip()
    if not latex:
        return []
    try:
        return [parse_latex(part) for part in latex.split("=") if part.strip()]
    except Exception:
        return []


def _same_shape(a, b) -> bool:
    """Is `a` `b` under a renaming of symbols? SymPy decides, not a string."""
    from sympy import simplify

    left = sorted(a.free_symbols, key=str)
    right = sorted(b.free_symbols, key=str)
    if len(left) != len(right):
        return False
    for permutation in itertools.permutations(right):
        try:
            if simplify(a.subs(dict(zip(left, permutation))) - b) == 0:
                return True
        except Exception:
            continue
    return False


def infer(problem: dict, items: dict[str, dict], limit: int = 3) -> list[str]:
    """Booklet ids whose relation has this record's expression as a side.

    A *suggestion* for an author writing `plays:`. It cannot see a substituted
    form — `0.5 * 1200 * 15**2` is kinetic energy and this will not say so — which
    is exactly why the declaration is what the check trusts.
    """
    from sympy import sympify

    check = problem.get("check") or {}
    expression = check.get("expression") or check.get("consistency")
    if not isinstance(expression, str):
        return []
    try:
        target = sympify(expression)
    except Exception:
        return []
    if not target.free_symbols:
        return []
    found = []
    for item_id, item in items.items():
        if any(_same_shape(target, side) for side in _sides(item)):
            found.append(item_id)
            if len(found) >= limit:
                break
    return found


def undeclared(book: books.Book) -> list[str]:
    """Records that carry symbols, declare nothing, and are not pure arithmetic.

    Not an error — this is the completeness gap, reported so it is countable. It is
    the reason the module docstring says the check cannot prove coverage.
    """
    import yaml

    out: list[str] = []
    for path in sorted(book.banks.glob("*.yaml")):
        data = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
        for record in data.get("problems", []) or []:
            if declared(record):
                continue
            check = record.get("check") or {}
            expression = check.get("expression") or check.get("consistency")
            if not isinstance(expression, str):
                continue
            try:
                from sympy import sympify

                if sympify(expression).free_symbols:
                    out.append(f"{path.name}:{record.get('id')}: {expression}")
            except Exception:
                continue
    return out


def check_book(book: books.Book) -> list[str]:
    """Every invalid declaration in a book's banks, ready to be an assertion."""
    import yaml

    items = booklet_items(book)
    boards = supported_boards(book)
    problems: list[str] = []
    for path in sorted(book.banks.glob("*.yaml")):
        data = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
        for record in data.get("problems", []) or []:
            for error in errors(record, items, boards):
                problems.append(f"{path.name}:{record.get('id')}: {error}")
    return problems
