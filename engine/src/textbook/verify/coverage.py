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
    plays: [standard-derivatives, differentiation-rules]

A record may name **several** items, because a question can need several: to
differentiate $x^2\\sin x$ a reader needs the derivative of a power *and* the
product rule, and the booklet supplies them separately. Naming one of the two
would let the check pass while the other was missing, which is the failure it
exists to catch. Every named id is verified.

and the check proves each id exists in the book's booklet and that **some board the
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

A second gap, smaller and closed: an item the parser cannot read gets no check
either, because `_sides` sees nothing in it. Which items those are used to be a
list of eight LaTeX notations in a test, so a new booklet with a new notation
failed a test that named notations rather than items. Now the item says it
itself — `symbolic: false` and a `why:` — and `booklet_faults()` proves every item
is either read or declared. The declaration is data in the booklet, so a naming
convention in LaTeX is a row rather than a regex, and the list of things this
module cannot read is derived from the booklets — `unreadable()` returns it —
rather than maintained beside them.

`infer()` is the same machinery used honestly: it *suggests* the booklet items a
formula might play, so an author writing a declaration is helped rather than
guessing. It never decides.
"""

from __future__ import annotations

import itertools
import re
from pathlib import Path

from .. import book as books
from .. import yamlio

#: Provision values a booklet item may carry, from `BOOKLETS.md`.
GIVEN = "given"
QUESTION = "question"
KNOW = "know"

#: An item that `sympy.parsing.latex` cannot read says so on the item, with a reason:
#:
#:     - id: mean-of-data
#:       latex: '\bar{x} = \frac{\sum x}{n} = \frac{\sum f x}{\sum f}'
#:       symbolic: false
#:       why: A \sum with no limits, which the parser only reads with explicit bounds.
#:
#: The declaration is the data; this module is its only reader. Its first version
#: kept the knowledge in the *test* instead — eight `(regex, reason)` pairs naming
#: `\sum`, `\begin{`, `{}^n C_r`, `\binom`, `\mathbb`, paired delimiters,
#: `\operatorname` and spacing commands — so a ninth kind of unreadable notation
#: failed a test whose only fix was another regex. That is the shape this repository
#: is removing (`.agents/todo.md` item 67): a check may branch on data it was given,
#: and may not branch on a list of notations it happens to know. The reasons those
#: rows carried were good ones — *a layout, not a relation*, *a symbol list, not an
#: expression* — so they moved here, onto the items that need them.
SYMBOLIC = "symbolic"
WHY = "why"

#: A reason shorter than this is not a reason. It stops `why: "?"` standing in for
#: an explanation, which would make the declaration a silent opt-out from the check.
MIN_WHY = 20

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
    data = yamlio.load_file(path) or {}
    items: dict[str, dict] = {}
    for section in data.get("sections", []) or []:
        for item in section.get("items", []) or []:
            if isinstance(item, dict) and item.get("id"):
                items[str(item["id"])] = item
    return items


# --- what the parser cannot read, declared rather than guessed ----------------


def declares_not_symbolic(item: dict) -> bool:
    """Does this booklet item say that it is not a relation the parser can read?"""
    return item.get(SYMBOLIC) is False


def not_symbolic_reason(item: dict) -> str:
    """The reason an item gives for not being a relation, or the empty string."""
    return str(item.get(WHY) or "").strip()


def unreadable(items: dict[str, dict]) -> list[tuple[str, str]]:
    """The items that declare they are not relations, with the reason they give.

    This is the gap in what the check can see, written down and countable rather
    than hidden in a percentage: `_sides` returns nothing for these items, so a
    problem that plays one gets no coverage check. That is a real limit of this
    module, and it belongs to the item that makes it rather than to a table in a
    test.
    """
    return [
        (item_id, not_symbolic_reason(item))
        for item_id, item in items.items()
        if declares_not_symbolic(item)
    ]


def booklet_faults(items: dict[str, dict]) -> list[str]:
    """Items whose LaTeX is neither readable nor declared unreadable, ready to assert.

    Three faults, and the third is what keeps the first two honest:

    * an item the parser cannot read that does not declare it — fix the LaTeX, or
      declare `symbolic: false` and say why;
    * a declaration with no reason, which is an opt-out rather than a record;
    * a declaration on an item the parser *can* read — the declaration is stale,
      and a stale one would hide the relation this check exists to see. So
      declaring an item opaque can never be the cheap way past a fault.
    """
    faults: list[str] = []
    for item_id, item in items.items():
        latex = str(item.get("latex") or "")
        if declares_not_symbolic(item):
            reason = not_symbolic_reason(item)
            if len(reason) < MIN_WHY:
                faults.append(
                    f"{item_id}: declares `{SYMBOLIC}: false` without a reason. "
                    f"Add a `{WHY}:` saying what the notation is and why it cannot "
                    f"be parsed."
                )
            elif _sides(item):
                faults.append(
                    f"{item_id}: declares `{SYMBOLIC}: false`, but its LaTeX parses. "
                    f"Remove the declaration so the relation is checked."
                )
        elif not _sides(item):
            faults.append(
                f"{item_id}: {latex!r} is not read by `sympy.parsing.latex` and does "
                f"not say so. Fix the LaTeX, or declare `{SYMBOLIC}: false` with a "
                f"`{WHY}:` on the item."
            )
    return faults


def declared_all(problem: dict) -> list[str]:
    """Every booklet item a record says it plays, in order, without repeats.

    A record may name one — `plays: standard-derivatives` — or several, because a
    question can need more than one. "Differentiate $x^2\\sin x$" needs the
    derivative of a power *and* the product rule, and the booklet provides them as
    two items; recording only one would leave the check able to pass while the
    other was missing, which is the failure it exists to catch. The order is the
    author's and is not used for anything, so it reads as prose.
    """
    for source in (problem, problem.get("check") or {}):
        value = source.get("plays")
        if value is None:
            continue
        values = value if isinstance(value, (list, tuple)) else [value]
        found = [str(item).strip() for item in values if str(item).strip()]
        if found:
            return list(dict.fromkeys(found))
    return []


def declared(problem: dict) -> str | None:
    """The first booklet item a record plays, for callers that want one."""
    found = declared_all(problem)
    return found[0] if found else None


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
    """Why each equation a record declares is not one the reader is shown."""
    problems: list[str] = []
    for item_id in declared_all(problem):
        problems.extend(_errors_for(item_id, items, boards))
    return problems


def _errors_for(
    item_id: str, items: dict[str, dict], boards: tuple[str, ...]
) -> list[str]:
    """Why one declared id is not a booklet item the reader is given."""
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
#
# `_sides` is the parser boundary. It returns [] both for "this is not a relation"
# and for "I cannot read this", and nothing here tries to tell those apart from the
# LaTeX: an item that is not a relation says so in the booklet (`booklet_faults`),
# and an item that says nothing is expected to parse.


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


def expressions(problem: dict) -> list[str]:
    """Every expression a record's check carries, composites included.

    `check.checks` nests: `kind: all` holds sub-checks, each with its own
    `expression` or `consistency`. Reading only the top level made a record that
    uses three supplied formulae look as though it used none, so the gap below
    was a lower bound rather than a measurement — found while declaring the
    Applied Mathematics banks, where most mechanics records are composites.
    """
    found: list[str] = []

    def walk(check) -> None:
        if not isinstance(check, dict):
            return
        for key in ("expression", "consistency"):
            value = check.get(key)
            if isinstance(value, str):
                found.append(value)
        for sub in check.get("checks") or []:
            walk(sub)

    walk(problem.get("check") or {})
    return found


def undeclared(book: books.Book) -> list[str]:
    """Records that carry symbols, declare nothing, and are not pure arithmetic.

    Not an error — this is the completeness gap, reported so it is countable. It is
    the reason the module docstring says the check cannot prove coverage.
    """
    out: list[str] = []
    for path in sorted(book.banks.glob("*.yaml")):
        data = yamlio.load_file(path) or {}
        for record in data.get("problems", []) or []:
            if declared(record):
                continue
            found = expressions(record)
            if not found:
                continue
            try:
                from sympy import sympify

                if any(sympify(expression).free_symbols for expression in found):
                    out.append(f"{path.name}:{record.get('id')}: {'; '.join(found)}")
            except Exception:
                continue
    return out


def check_book(book: books.Book) -> list[str]:
    """Every invalid declaration in a book's banks, ready to be an assertion."""
    items = booklet_items(book)
    boards = supported_boards(book)
    problems: list[str] = [f"booklet: {fault}" for fault in booklet_faults(items)]
    for path in sorted(book.banks.glob("*.yaml")):
        data = yamlio.load_file(path) or {}
        for record in data.get("problems", []) or []:
            for error in errors(record, items, boards):
                problems.append(f"{path.name}:{record.get('id')}: {error}")
    return problems
