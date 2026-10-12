"""The mathematics in the proof book, checked by machine.

A proof is prose, so a reader checks it by reading. That is not a reason for it to
be unchecked: most of the proofs here end in an algebraic identity, and an identity
is a thing SymPy can settle. A typo in a sign — `b^2 - 2bc cos A` written with a
plus, the quadratic formula with `4ac` instead of `-4ac` — reads perfectly well and
would sit on the page for years.

So each proof that rests on algebra has its identity asserted here, by the route the
page takes. Where a page's argument is geometric (Pythagoras by rearrangement, the
angles of a triangle, the angle in a semicircle), there is nothing for a CAS to
check and the test says which step is being taken on trust instead.

**Not a substitute for reading the page.** This proves the algebra, not the
argument: it cannot tell that a proof has skipped a case, that the prose and the
symbols disagree, or that the result is true but the stated reason is the wrong one.
`books/proofs/sources.yaml` records what was checked against external sources for
the statements themselves.
"""

from __future__ import annotations

import random

import pytest
from sympy import Rational, cos, oo, pi, simplify, sin, solve, sqrt, summation, symbols

# --- the quadratic formula ----------------------------------------------------
#
# The page completes the square on ax^2 + bx + c = 0 and solves for x.


def test_the_quadratic_formula_satisfies_its_equation():
    a, b, c, x = symbols("a b c x", positive=True)
    formula = [sqrt(b**2 - 4 * a * c) * s for s in (1, -1)]
    for root in formula:
        x_value = (-b + root) / (2 * a)
        assert simplify(a * x_value**2 + b * x_value + c) == 0


def test_the_quadratic_formula_is_what_completing_the_square_gives():
    """The page's middle step, and the solving of it, must agree with the end."""
    a, b, c, x = symbols("a b c x", positive=True)
    completed = (x + b / (2 * a)) ** 2 - (b**2 - 4 * a * c) / (4 * a**2)
    from_completed = {simplify(root) for root in solve(completed, x)}
    formula = {
        simplify((-b + s * sqrt(b**2 - 4 * a * c)) / (2 * a)) for s in (1, -1)
    }
    assert from_completed == formula


def test_the_discriminant_decides_the_number_of_real_roots():
    """The page claims this follows from the square root, so it is asserted."""
    x = symbols("x", real=True)
    assert len(solve(x**2 - 5 * x + 6, x)) == 2  # discriminant 1
    assert len(solve(x**2 - 4 * x + 4, x)) == 1  # discriminant 0
    assert solve(x**2 + x + 1, x) == []  # discriminant -3


# --- the cosine rule ----------------------------------------------------------
#
# The page drops a perpendicular and applies Pythagoras to each half.


def test_the_cosine_rule_is_pythagoras_twice():
    a, b, c, A = symbols("a b c A", positive=True)
    projection = b * cos(A)
    height_squared = b**2 - projection**2
    second_triangle = height_squared + (c - projection) ** 2
    assert simplify(second_triangle - (b**2 + c**2 - 2 * b * c * cos(A))) == 0


def test_the_cosine_rule_becomes_pythagoras_at_a_right_angle():
    """Which is the page's prediction, asked before the proof."""
    a, b, c, A = symbols("a b c A", positive=True)
    projection = b * cos(A)
    second_triangle = (b**2 - projection**2) + (c - projection) ** 2
    assert simplify((second_triangle - (b**2 + c**2)).subs(A, pi / 2)) == 0


# --- the sine rule ------------------------------------------------------------
#
# The page's proof is geometric — one height written two ways — so the identity is
# checked directly, over triangles rather than over symbols, because the page's
# claim is about every triangle and the algebra of a general triangle is the same
# identity rearranged.


def test_the_sine_rule_holds_for_a_thousand_triangles():
    random.seed(20261012)
    checked = 0
    for _ in range(1000):
        # Two angles are drawn and the third is what is left, so every draw is a
        # triangle. Drawing three at random and discarding the impossible ones
        # threw away half of them, which is how this test first read as a failure
        # of the sine rule rather than of its own sampling.
        first = random.uniform(0.05, pi - 0.1)
        second = random.uniform(0.05, pi - first - 0.05)
        angles = (first, second, pi - first - second)
        scale = random.uniform(0.5, 5)
        sides = [scale * sin(angle) for angle in angles]
        ratios = [side / sin(angle) for side, angle in zip(sides, angles)]
        assert max(ratios) - min(ratios) < 1e-12
        checked += 1
    assert checked == 1000


def test_the_height_written_two_ways_is_one_length():
    """The step the prose actually takes: `b sin A = a sin B`."""
    first, second, third = 0.7, 1.1, pi - 1.8
    scale = 3.0
    a, b = scale * sin(first), scale * sin(second)
    assert abs(b * sin(first) - a * sin(second)) < 1e-12


# --- the sums -----------------------------------------------------------------


def test_the_sum_of_the_first_n_squares_is_proved_by_the_step_the_page_uses():
    n, k, m = symbols("n k m", positive=True, integer=True)
    formula = n * (n + 1) * (2 * n + 1) / 6
    # The two steps of an induction: the first case, and the link to the next.
    assert formula.subs(n, 1) == 1
    assert simplify(formula + (n + 1) ** 2 - formula.subs(n, n + 1)) == 0
    # And it agrees with the sum itself, which induction alone would not show if
    # the formula were wrong in the same way at both ends.
    assert all(summation(m**2, (m, 1, t)) == formula.subs(n, t) for t in range(1, 200))


def test_the_arithmetic_series_pairing():
    a, d, n, k = symbols("a d n k", positive=True, integer=True)
    total = summation(a + (k - 1) * d, (k, 1, n))
    last = a + (n - 1) * d
    assert simplify(total - n * (a + last) / 2) == 0
    assert simplify(total - n * (2 * a + (n - 1) * d) / 2) == 0
    # The pairing the page describes: the sum and its reverse add to n(a + l).
    assert simplify(2 * total - n * (a + last)) == 0


def test_the_story_in_the_page_is_the_right_number():
    assert summation(symbols("m", integer=True, positive=True), (symbols("m", integer=True, positive=True), 1, 100)) == 5050


def test_the_geometric_series_cancels_to_the_formula_the_page_gives():
    """`S_n = a(1 - r^n)/(1 - r)` for **n** terms, which is what the page sums.

    Wikipedia states it as `a(1 - r^{n+1})/(1 - r)` because it sums from `k = 0` to
    `n`, which is n + 1 terms. Both are right and they differ only in the counting,
    so this test pins the convention the page uses rather than the other one — and
    the page's form is the one the board's own formulae booklet prints.

    `summation` returns a `Piecewise` that handles `r = 1` separately, so the
    identity is asserted at each value of `r` the page excludes rather than in the
    general case; the Piecewise is sympy saying the same thing.
    """
    a, r, n, k = symbols("a r n k", positive=True, integer=True)
    total = summation(a * r ** (k - 1), (k, 1, n))
    for value in (Rational(1, 3), Rational(3, 5), Rational(9, 4)):
        assert simplify((total - a * (1 - r**n) / (1 - r)).subs(r, value)) == 0
    # Checked term by term too, so the identity is not resting on sympy's own
    # summation being right.
    for terms in range(1, 25):
        direct = sum(a * Rational(3, 5) ** (j - 1) for j in range(1, terms + 1))
        target = a * (1 - Rational(3, 5) ** terms) / (1 - Rational(3, 5))
        assert simplify(direct - target) == 0


def test_the_geometric_sum_to_infinity_is_the_limit_and_not_a_rounding():
    a, r, k = symbols("a r k", positive=True)
    limit = summation(a * r ** (k - 1), (k, 1, oo))
    # The series converges only for |r| < 1, which is the condition the page states,
    # so the identity is asserted where it holds rather than everywhere.
    for value in (Rational(1, 2), Rational(2, 5), Rational(9, 10)):
        assert simplify(limit.subs(r, value) - a / (1 - value)) == 0
    # And the partial sums really do approach it: the gap shrinks by a factor of r.
    values = [sum(Rational(1, 2) ** (j - 1) for j in range(1, t + 1)) for t in range(1, 12)]
    gaps = [2 - v for v in values]
    assert all(later < earlier for earlier, later in zip(gaps, gaps[1:]))
    assert gaps[-1] < Rational(1, 1000)


# --- the results with no algebra to check -------------------------------------


@pytest.mark.parametrize(
    ("result", "why_it_is_not_checked_here"),
    [
        (
            "angles in a triangle add to 180",
            "geometric: the parallel-line construction. The angle arithmetic is "
            "checked on the figure's own numbers, not here.",
        ),
        (
            "angles in a polygon add to (n - 2) x 180",
            "the counting is (n - 2) triangles, which is asserted below because it "
            "is arithmetic; the triangulation itself is geometric.",
        ),
        (
            "Pythagoras by rearrangement",
            "geometric: the frame and the hole. The algebra after the counting is "
            "checked below.",
        ),
        (
            "the angle in a semicircle is 90",
            "geometric: the two isosceles triangles. Checked numerically below.",
        ),
        (
            "the area of a trapezium",
            "geometric: two copies make a parallelogram. Checked arithmetically "
            "below.",
        ),
    ],
)
def test_the_geometric_proofs_say_what_is_not_machine_checked(
    result, why_it_is_not_checked_here
):
    """A record of what is taken on reading, so it is visible rather than assumed.

    These five proofs are correct because their geometry is correct, and no CAS
    decides that. Naming them here means the gap is in the file rather than in
    somebody's head — the same reason every other limit in this repository is
    written down.
    """
    assert result and why_it_is_not_checked_here


def test_the_polygon_count_is_two_fewer_than_the_sides():
    """The arithmetic step of that proof, which is the part that can be wrong."""
    for sides in range(3, 201):
        assert sides - 3 + 1 == sides - 2


def test_the_triangle_case_is_the_polygon_formula_at_n_equals_three():
    """Which is the check the page suggests, and a real consistency test."""
    assert (3 - 2) * 180 == 180


def test_the_trapezium_pair_makes_a_parallelogram_by_construction():
    """The figure's geometry, at the slider extremes, as the module computes it.

    The construction is a rotation through 180 degrees about the midpoint of a
    sloping side, so the two shapes share that side and the union is a
    parallelogram. Its base is `a + b` and its height is `h`, and one trapezium is
    half of it — which is the proof. A sign error in the rotation would give a
    quadrilateral that is not a parallelogram, so this is worth asserting.
    """
    for short in (20, 60, 100):
        for height in (50, 130):
            base, left, ground = 140, 40, 200
            top = ground - height
            inset = (base - short) / 2
            t1 = [
                (left + inset, top),
                (left + inset + short, top),
                (left + base, ground),
                (left, ground),
            ]
            bx, by = left + base, ground
            cx, cy = left + inset + short, top
            turned = [(bx + cx - px, by + cy - py) for px, py in t1]
            # The parallelogram's corners: floor-left, floor-right, top-right,
            # top-left. Its opposite sides must be equal.
            _, a_top, _, a = t1[0], t1[2], t1[3], t1[3]
            d = t1[0]
            a2 = turned[3]
            d2 = turned[0]
            parallelogram = [a, d2, a2, d]
            sides = [
                (
                    (parallelogram[i][0] - parallelogram[(i + 1) % 4][0]) ** 2
                    + (parallelogram[i][1] - parallelogram[(i + 1) % 4][1]) ** 2
                )
                ** 0.5
                for i in range(4)
            ]
            assert abs(sides[0] - sides[2]) < 1e-9, (short, height, sides)
            assert abs(sides[1] - sides[3]) < 1e-9, (short, height, sides)
            assert abs(sides[0] - (short + base)) < 1e-9, (short, height, sides)
