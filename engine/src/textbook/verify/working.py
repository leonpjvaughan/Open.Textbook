"""Verify the arithmetic a figure states.

**Why this is data and not a parser.** Two figures printed a multiplication that does
not give the number beside it — ``× 0.07`` for a rate of 6.5%, and ``3 × 14.29 = 42.86``
from an already-rounded 14.29 — and every check passed, because none of them reads a
number. The first attempt at a check parsed the printed sentence back out of the text,
and that is unbounded work: it needed ``<sup>``, ``√``, ``%``, thousands separators, a
trailing sentence period and the words "and"/"is" before it could read 43% of the
statements it saw, and only four of those were arithmetic. Every new formatting choice
was a new case.

So a figure **declares** what it asserts. `claim()` on the kit's panel records, per
render, an expression, the values it was given, the answer it computed and the string it
printed. This module proves them with the same CAS the problem banks already use, which
is exact: ``0.065`` is rationalised to ``13/200``, so a comparison is exact and the
figure's notation cannot break it.

Two claims are checked per entry, and both matter:

1. the expression, evaluated at the stated values, **is** the answer;
2. the string shown to the reader **is** that answer at the precision it shows.

The first catches a wrong multiplier. The second catches a print that rounds an
intermediate and then multiplies it back up — which is the defect that started this.

Usage::

    python -m textbook.working var/claims.json
    python -m textbook.working --self-test
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

import sympy

from .verify import cas

#: How far a JavaScript float may sit from the exact value it represents. Every
#: `answer` arrives as a double, so this is round-off and never a claim's slack: the
#: defects this looks for are 30 and 0.01 out, not 1e-12.
FLOAT_SLACK = 1e-9

#: A number with a sign, a decimal part and an optional exponent.
NUMBER = re.compile(r"^[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?$")


def _rational(text: str) -> sympy.Rational | None:
    """A printed number as an exact rational, or None when it is not a number."""
    cleaned = text.replace(",", "").replace("\u2212", "-").strip()
    if not NUMBER.match(cleaned):
        return None
    try:
        return sympy.Rational(cleaned)
    except (ValueError, TypeError):
        return None


def _decimals(text: str) -> int:
    cleaned = text.split("e")[0].split("E")[0]
    whole, _, fraction = cleaned.partition(".")
    return len(fraction)


def _value(text) -> sympy.Expr:
    """A claim's value as an exact number, or the symbol of that name."""
    rational = _rational(str(text))
    return rational if rational is not None else sympy.Symbol(str(text))


def check_claim(claim: dict) -> list[str]:
    """Every reason this claim is not true. Empty means it is."""
    problems: list[str] = []
    expression = str(claim.get("expression") or "").strip()
    values = claim.get("values") or {}
    if not expression:
        return ["claim has no expression"]

    local = {name: sympy.Symbol(name) for name in values}
    try:
        parsed = cas.parse_expression(expression, local)
    except Exception as error:  # noqa: BLE001 - a bad claim is a finding, not a crash
        return [f"expression {expression!r} could not be parsed: {error}"]

    computed = sympy.simplify(parsed.subs({local[name]: _value(value) for name, value in values.items()}))
    if computed.free_symbols:
        return [
            f"{expression} still has {sorted(map(str, computed.free_symbols))} after "
            f"substituting {values}"
        ]

    answer = claim.get("answer")
    if answer is not None:
        stated = _rational(str(answer))
        if stated is None:
            problems.append(f"answer {answer!r} is not a number")
        elif abs(computed - stated) > abs(stated) * FLOAT_SLACK + FLOAT_SLACK:
            problems.append(
                f"{expression} at {values} is {float(computed):.10g}, not the answer {answer}"
            )

    shown = claim.get("shown")
    if shown:
        printed = _rational(str(shown))
        if printed is None:
            # A label rather than a number — "the total" — is not this check's business.
            return problems
        places = _decimals(str(shown).replace(",", ""))
        slack = sympy.Rational(1, 2 * 10**places)
        if abs(computed - printed) > slack:
            problems.append(
                f"the figure prints {shown!r} but {expression} at {values} is "
                f"{float(computed):.10g} (to {places} decimal place{'' if places == 1 else 's'}, "
                f"±{float(slack):g})"
            )
    return problems


def check_record(record: dict) -> list[str]:
    """Every reason this figure's render is not true, including what it printed."""
    problems: list[str] = []
    readout = str(record.get("readout") or "")
    claims = record.get("claims") or []
    for claim in claims:
        for problem in check_claim(claim):
            problems.append(problem)
        shown = claim.get("shown")
        if shown and str(shown) not in readout:
            # A claim about a number the figure never printed proves nothing about what a
            # reader sees. This is the cheap half of "the display and the data agree".
            problems.append(
                f"claims to show {shown!r}, but the readout does not contain it: "
                f"{readout[:90]!r}"
            )
    return problems


def check_file(path: Path) -> int:
    records = json.loads(path.read_text(encoding="utf-8"))
    claims = 0
    wrong = 0
    for record in records:
        problems = check_record(record)
        claims += len(record.get("claims") or [])
        if not problems:
            continue
        wrong += 1
        print(f"\n  {record.get('slug', '?')}  {record.get('route', '')}")
        for problem in problems:
            print(f"     {problem}")
    figures = len({record.get("slug") for record in records})
    print(
        f"  {claims} claim(s) in {len(records)} render(s) across {figures} figure(s): "
        f"{wrong} render(s) untrue"
    )
    return 1 if wrong else 0


# --- the checks this module must pass -----------------------------------------
#
# The two defects, as they were printed, and the same statements correct. A verifier
# that cannot tell these apart is not a verifier.

SELF_TEST: list[tuple[str, dict, bool]] = [
    (
        # The defect itself: the rate is 6.5% and the figure used 0.07. 1500 × 0.07 × 4
        # is 420, so declaring the answer it printed makes the claim false — which is
        # the whole point of declaring `values`.
        "a rate of 6.5% evaluated as 0.07",
        {
            "expression": "P * r * t",
            "values": {"P": 1500, "r": 0.07, "t": 4},
            "answer": 390,
            "shown": "390.00",
        },
        False,
    ),
    (
        "the same simple interest at the real rate",
        {
            "expression": "P * r * t",
            "values": {"P": 1500, "r": "0.065", "t": 4},
            "answer": 390,
            "shown": "390.00",
        },
        True,
    ),
    (
        "a rounded part multiplied back up",
        {
            "expression": "3 * 14.29",
            "values": {},
            "answer": 42.86,
            "shown": "42.86",
        },
        False,
    ),
    (
        "the same share computed from the total",
        {
            "expression": "100 * 3 / 7",
            "values": {},
            "answer": 42.857142857142854,
            "shown": "42.86",
        },
        True,
    ),
    (
        "compound interest, exact",
        {
            "expression": "P * (1 + r) ** t",
            "values": {"P": "1500", "r": "0.065", "t": "4"},
            "answer": 1929.69952594,
            "shown": "1,929.70",
        },
        True,
    ),
    (
        "a hypotenuse with a square root",
        {
            "expression": "sqrt(6 ** 2 + 8 ** 2)",
            "values": {},
            "answer": 10,
            "shown": "10.00",
        },
        True,
    ),
    (
        "a percentage as a fraction",
        {
            "expression": "0.5 * 2 * 3 ** 2",
            "values": {},
            "answer": 9,
            "shown": "9",
        },
        True,
    ),
]


def self_test() -> int:
    failed = 0
    for name, claim, should_pass in SELF_TEST:
        problems = check_claim(claim)
        passed = not problems
        if passed != should_pass:
            failed += 1
            print(f"  FAIL {name}: expected {'pass' if should_pass else 'a finding'}, got {problems}")
    print(f"  self-test: {len(SELF_TEST)} claims, {failed} disagreement(s)")
    return 1 if failed else 0


def main() -> int:
    parser = argparse.ArgumentParser(description="Verify the arithmetic a figure states.")
    parser.add_argument("claims", nargs="?", help="the JSON a `tools readout --json` run wrote")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        return self_test()
    if not args.claims:
        parser.error("give a claims file, or --self-test")
    path = Path(args.claims)
    if not path.exists():
        print(f"no claims file at {path}; run `tools readout site --json {path}`", file=sys.stderr)
        return 2
    return check_file(path)


if __name__ == "__main__":
    sys.exit(main())
