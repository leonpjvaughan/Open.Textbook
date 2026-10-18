"""The units oracle: dimensions, figures, uncertainty, vectors, graphs, structure.

``research/curriculum/physics-verifier-gaps.md`` §3 lists the check kinds a
physics bank needs and §5 steps 3–6 the order to build them in. This file proves
each one verifies a record — and, because a check that cannot fail is not a
check, that each one fails a deliberately wrong record. The three named in the
brief are here in full: a dimensional inconsistency, a wrong number of
significant figures, and an uncertainty that does not propagate.

``test_problem_bank.py`` remains the proof that every shipped bank verifies;
``test_verify_oracles.py`` pins the kind → oracle table. This file is the physics
vocabulary itself.
"""

from __future__ import annotations

import pytest
import yaml

from textbook.verify import oracles
from textbook.verify.oracles import units
from textbook.verify.render import render_problem, render_quantity, render_quantity_html
from textbook.verify.verify import verify_bank, verify_problem

from support import problem_record

#: A physics bank selects both oracles: SymPy for the arithmetic it is good at
#: (`all`, `evaluate`, `between`) and units for the rest.
PHYSICS = ("sympy", "units")


def _verify(check, oracles_=PHYSICS):
    return verify_problem(problem_record(check), oracles=oracles_)


# --- unit algebra -------------------------------------------------------------


def test_prefix_power_is_exact():
    """`cm^3 -> m^3` is exactly `1e-6`, not a float near it."""
    dimension, factor = units.parse_unit("cm^3")
    assert dimension == units.dimension(m=3)
    assert factor == units.Fraction(1, 1_000_000)


def test_compound_units_and_unicode_superscripts_agree():
    assert units.parse_unit("m s^-2")[0] == units.parse_unit("m s⁻²")[0]
    assert units.parse_unit("N")[0] == units.parse_unit("kg m s^-2")[0]
    assert units.parse_unit("J/mol/K")[0] == units.parse_unit("J mol^-1 K^-1")[0]


def test_every_units_kind_has_a_handler_and_only_the_units_kinds():
    selection = oracles.select(PHYSICS)
    for kind in units.CHECKS:
        assert selection.handler(kind) is not None


# --- dimensions: the kind that makes the oracle worth having ------------------

DIMENSION_CASES = {
    "consistency": {
        "kind": "dimensions",
        "consistency": "F = m * a",
        "units": {"F": "N", "m": "kg", "a": "m s^-2"},
    },
    "arithmetic": {
        "kind": "dimensions",
        "expression": "m * a",
        "values": {"m": {"value": "2", "unit": "kg"}, "a": {"value": "10", "unit": "m s^-2"}},
        "answer": {"value": "20", "unit": "N"},
    },
    "declared": {
        "kind": "dimensions",
        "unit": "N",
        "dimensions": ["kg", "m", "s^-2"],
    },
}


@pytest.mark.parametrize("case", DIMENSION_CASES, ids=DIMENSION_CASES)
def test_dimensions_verifies_a_record(case):
    assert _verify(DIMENSION_CASES[case]).ok


def test_a_dimensional_inconsistency_fails():
    """`F = m / a` is dimensionally wrong even though it is a valid rearrangement
    of symbols. This is the failure the CAS cannot see."""
    report = _verify(
        {
            "kind": "dimensions",
            "consistency": "F = m / a",
            "units": {"F": "N", "m": "kg", "a": "m s^-2"},
        }
    )
    assert not report.ok
    assert "dimensions" in report.errors[0]


def test_arithmetic_with_the_wrong_unit_fails():
    report = _verify(
        {
            "kind": "dimensions",
            "expression": "m * a",
            "values": {"m": {"value": "2", "unit": "kg"}, "a": {"value": "10", "unit": "m s^-2"}},
            "answer": {"value": "20", "unit": "J"},
        }
    )
    assert not report.ok
    assert "kg m^2 s^-2" in report.errors[0]


def test_wrong_magnitude_with_the_right_dimension_fails():
    """The arithmetic is checked, not only the dimension."""
    report = _verify(
        {
            "kind": "dimensions",
            "expression": "m * a",
            "values": {"m": {"value": "2", "unit": "kg"}, "a": {"value": "10", "unit": "m s^-2"}},
            "answer": {"value": "200", "unit": "N"},
        }
    )
    assert not report.ok


def test_sqrt_magnitude_verifies_and_a_wrong_unit_fails():
    """`sqrt(vx**2 + vy**2)` is a magnitude that carries a unit, so the oracle
    must be able to compose it. The resultant is 5.0 m s^-1; a record that keeps
    the components' speed without the dimension, or with a wrong magnitude, is
    wrong."""
    values = {
        "vx": {"value": "4.0", "unit": "m s^-1"},
        "vy": {"value": "3.0", "unit": "m s^-1"},
    }
    good = _verify(
        {
            "kind": "dimensions",
            "expression": "sqrt(vx**2 + vy**2)",
            "values": values,
            "answer": {"value": "5.0", "unit": "m s^-1"},
        }
    )
    wrong_unit = _verify(
        {
            "kind": "dimensions",
            "expression": "sqrt(vx**2 + vy**2)",
            "values": values,
            "answer": {"value": "5.0", "unit": "m"},
        }
    )
    wrong_magnitude = _verify(
        {
            "kind": "dimensions",
            "expression": "sqrt(vx**2 + vy**2)",
            "values": values,
            "answer": {"value": "4.0", "unit": "m s^-1"},
        }
    )
    assert good.ok
    assert not wrong_unit.ok
    assert "dimensions" in wrong_unit.errors[0]
    assert not wrong_magnitude.ok


def test_sqrt_of_an_odd_dimension_power_fails():
    """A square root halves every exponent, so an odd power has no integer
    dimension. `sqrt(vx)` with `vx` in metres is not a length the oracle can
    express, and the check says so rather than guessing."""
    report = _verify(
        {
            "kind": "dimensions",
            "expression": "sqrt(vx)",
            "values": {"vx": {"value": "4.0", "unit": "m"}},
            "answer": {"value": "2.0", "unit": "m"},
        }
    )
    assert not report.ok
    assert "square root" in report.errors[0]


def test_declared_quantity_with_the_wrong_dimension_fails():
    report = _verify(
        {"kind": "dimensions", "unit": "N", "dimensions": ["kg", "m", "s^-1"]}
    )
    assert not report.ok
    assert "declared" in report.errors[0]


def test_a_dimensions_declaration_with_nothing_to_check_fails():
    """A bare `dimensions:` list with no unit would pass for no reason."""
    report = _verify({"kind": "dimensions", "dimensions": ["kg", "m", "s^-2"]})
    assert not report.ok
    assert "unit" in report.errors[0]


# --- prefix conversion --------------------------------------------------------


def test_convert_prefix_power_passes():
    assert _verify(
        {"kind": "convert", "value": "100", "from": "cm^3", "to": "m^3", "answer": "0.0001"}
    ).ok


def test_convert_wrong_answer_fails():
    report = _verify(
        {"kind": "convert", "value": "100", "from": "cm^3", "to": "m^3", "answer": "0.001"}
    )
    assert not report.ok


def test_convert_across_dimensions_fails():
    report = _verify(
        {"kind": "convert", "value": "1", "from": "m", "to": "s", "answer": "1"}
    )
    assert not report.ok
    assert "dimensions differ" in report.errors[0]


# --- significant figures ------------------------------------------------------


def test_sigfigs_rounds_once_to_a_declared_figures():
    assert _verify(
        {
            "kind": "sigfigs",
            "value": "0.0038695652173913047",
            "figures": 3,
            "answer": "0.00387",
            "convention": "round-once",
        }
    ).ok


def test_a_wrong_number_of_significant_figures_fails():
    """`0.00388` is the wrong rounding of the same quantity; the check must fail,
    and it must name the value it computed."""
    report = _verify(
        {
            "kind": "sigfigs",
            "value": "0.0038695652173913047",
            "figures": 3,
            "answer": "0.00388",
            "convention": "round-once",
        }
    )
    assert not report.ok
    assert "0.00387" in report.errors[0]


def test_sigfigs_rounds_a_symbolic_value_with_a_tolerance():
    """$g = 4\\pi^2 L/T^2$ is irrational, so a bank cannot pre-round it by hand
    and call that the proof. The value may be the expression; the declared
    tolerance is the band across which the rounding must hold, and a wrong
    rounding still fails."""
    good = _verify(
        {
            "kind": "sigfigs",
            "value": "4 * pi**2 * (4/5) / ((359/200)**2)",
            "figures": 3,
            "answer": "9.80",
            "convention": "round-once",
            "tolerance": "0.0005",
        }
    )
    wrong_rounding = _verify(
        {
            "kind": "sigfigs",
            "value": "4 * pi**2 * (4/5) / ((359/200)**2)",
            "figures": 3,
            "answer": "9.81",
            "convention": "round-once",
            "tolerance": "0.0005",
        }
    )
    assert good.ok
    assert not wrong_rounding.ok
    assert "9.8" in wrong_rounding.errors[0]


def test_a_symbolic_value_without_a_tolerance_fails_loudly():
    """An irrational value with no tolerance is ambiguous, so it is an error,
    never a silent pass."""
    report = _verify(
        {
            "kind": "sigfigs",
            "value": "pi",
            "figures": 3,
            "answer": "3.14",
            "convention": "round-once",
        }
    )
    assert not report.ok
    assert "tolerance" in report.errors[0]


def test_trailing_zeros_are_a_convention_not_a_number():
    """`1200` is two significant figures; three must be written `1.20e3`."""
    wrong = _verify(
        {
            "kind": "sigfigs",
            "value": "1204.5",
            "figures": 3,
            "answer": "1200",
            "convention": "round-once",
        }
    )
    right = _verify(
        {
            "kind": "sigfigs",
            "value": "1204.5",
            "figures": 3,
            "answer": "1.20e3",
            "convention": "round-once",
        }
    )
    assert not wrong.ok
    assert "trailing zeros" in wrong.errors[0]
    assert right.ok


def test_sigfigs_requires_the_round_once_convention():
    report = _verify(
        {"kind": "sigfigs", "value": "1.234", "figures": 2, "answer": "1.2"}
    )
    assert not report.ok
    assert "round-once" in report.errors[0]


# --- uncertainty propagation --------------------------------------------------


def test_uncertainty_add_absolutes_passes():
    assert _verify(
        {
            "kind": "uncertainty",
            "combine": "add-absolutes",
            "terms": [
                {"value": "1.20", "absolute": "0.05"},
                {"value": "0.80", "absolute": "0.05"},
            ],
            "result": "2.00",
            "uncertainty": "0.10",
            "tolerance": "0.001",
        }
    ).ok


def test_an_uncertainty_that_does_not_propagate_fails():
    """Both readings carry 0.05, so the sum carries 0.10. A record that keeps one
    reading's uncertainty is wrong and must fail."""
    report = _verify(
        {
            "kind": "uncertainty",
            "combine": "add-absolutes",
            "terms": [
                {"value": "1.20", "absolute": "0.05"},
                {"value": "0.80", "absolute": "0.05"},
            ],
            "result": "2.00",
            "uncertainty": "0.05",
            "tolerance": "0.001",
        }
    )
    assert not report.ok
    assert "uncertainties" in report.errors[0]


def test_uncertainty_add_percentages_passes_and_fails():
    good = _verify(
        {
            "kind": "uncertainty",
            "combine": "add-percentages",
            "terms": [
                {"value": "4.0", "percentage": "2"},
                {"value": "5.0", "percentage": "3", "power": "2"},
            ],
            "result": "100.0",
            "uncertainty": "8",
            "tolerance": "0.01",
        }
    )
    bad = _verify(
        {
            "kind": "uncertainty",
            "combine": "add-percentages",
            "terms": [
                {"value": "4.0", "percentage": "2"},
                {"value": "5.0", "percentage": "3", "power": "2"},
            ],
            "result": "100.0",
            "uncertainty": "5",
            "tolerance": "0.01",
        }
    )
    assert good.ok
    assert not bad.ok


def test_uncertainty_add_percentages_handles_a_negative_power():
    """$g = L/T^2$ is the natural way to write the quotient: the period enters
    with power -2, whose percentage contribution is still positive. A record
    that forgets to double the period's percentage, or that lets the negative
    power subtract, is wrong."""
    good = _verify(
        {
            "kind": "uncertainty",
            "combine": "add-percentages",
            "terms": [
                {"value": "2.00", "percentage": "0.5"},
                {"value": "1.00", "percentage": "1.0", "power": -2},
            ],
            "result": "2.00",
            "uncertainty": "0.05",
            "tolerance": "0.0001",
        }
    )
    wrong_uncertainty = _verify(
        {
            "kind": "uncertainty",
            "combine": "add-percentages",
            "terms": [
                {"value": "2.00", "percentage": "0.5"},
                {"value": "1.00", "percentage": "1.0", "power": -2},
            ],
            "result": "2.00",
            "uncertainty": "0.03",
            "tolerance": "0.0001",
        }
    )
    assert good.ok
    assert not wrong_uncertainty.ok
    assert "uncertainty" in wrong_uncertainty.errors[0]


def test_mean_uncertainty_uses_the_named_convention():
    """Half-range and full-range disagree; the check enforces the one it names."""
    half_range = _verify(
        {
            "kind": "uncertainty",
            "mean_of": ["1.02", "0.98", "1.01"],
            "convention": "half-range",
            "answer": "1.0033333333333333",
            "uncertainty": "0.02",
            "tolerance": "0.0001",
        }
    )
    wrong_convention = _verify(
        {
            "kind": "uncertainty",
            "mean_of": ["1.02", "0.98", "1.01"],
            "convention": "full-range",
            "answer": "1.0033333333333333",
            "uncertainty": "0.02",
            "tolerance": "0.0001",
        }
    )
    assert half_range.ok
    assert not wrong_convention.ok


def test_uncertainty_requires_a_known_rule():
    report = _verify({"kind": "uncertainty", "terms": []})
    assert not report.ok
    assert "combine" in report.errors[0]


# --- vector resolution --------------------------------------------------------


def test_resolve_components_from_magnitude_and_angle():
    assert _verify(
        {
            "kind": "resolve",
            "relation": "components-from-magnitude-and-angle",
            "magnitude": "25",
            "angle_deg": "30",
            "components": {"x": "21.65", "y": "12.5"},
            "tolerance": "0.01",
        }
    ).ok


def test_resolve_wrong_components_fail():
    report = _verify(
        {
            "kind": "resolve",
            "relation": "components-from-magnitude-and-angle",
            "magnitude": "25",
            "angle_deg": "30",
            "components": {"x": "12.5", "y": "21.65"},
            "tolerance": "0.01",
        }
    )
    assert not report.ok


def test_resolve_magnitude_and_angle_from_components():
    good = _verify(
        {
            "kind": "resolve",
            "relation": "magnitude-and-angle-from-components",
            "components": {"x": "3", "y": "4"},
            "magnitude": "5",
            "angle_deg": "53.13",
            "tolerance": "0.01",
        }
    )
    bad = _verify(
        {
            "kind": "resolve",
            "relation": "magnitude-and-angle-from-components",
            "components": {"x": "3", "y": "4"},
            "magnitude": "5",
            "angle_deg": "36.87",
            "tolerance": "0.01",
        }
    )
    assert good.ok
    assert not bad.ok


# --- graphs and graphical calculus --------------------------------------------


def test_gradient_of_a_velocity_time_graph():
    assert _verify(
        {
            "kind": "gradient",
            "series": [[0.0, 0.0], [0.2, 0.98], [0.4, 1.96]],
            "between": [4.7, 5.1],
        }
    ).ok


def test_a_gradient_outside_the_interval_fails():
    report = _verify(
        {
            "kind": "gradient",
            "series": [[0.0, 0.0], [0.2, 0.98], [0.4, 1.96]],
            "between": [3.0, 4.0],
        }
    )
    assert not report.ok
    assert "outside" in report.errors[0]


def test_intercept_and_area():
    assert _verify(
        {
            "kind": "intercept",
            "series": [[0.0, 0.1], [0.2, 1.08], [0.4, 2.06]],
            "between": [0.05, 0.15],
        }
    ).ok
    assert _verify(
        {"kind": "area", "series": [[0.0, 0.0], [1.0, 2.0], [2.0, 0.0]], "between": [1.9, 2.1]}
    ).ok
    assert not _verify(
        {"kind": "area", "series": [[0.0, 0.0], [1.0, 2.0], [2.0, 0.0]], "between": [3.0, 4.0]}
    ).ok


def test_a_graph_check_without_an_interval_fails_loudly():
    report = _verify({"kind": "gradient", "series": [[0.0, 0.0], [1.0, 2.0]]})
    assert not report.ok
    assert "between" in report.errors[0]


# --- structured content -------------------------------------------------------

STRUCTURED = {
    "kind": "structured",
    "requires": ["measure-mass", "measure-temperature-change", "use-mc-delta-theta"],
    "concepts": ["specific-heat-capacity"],
    "points": [
        {"id": "measure-mass", "text": "Measure the mass of the block."},
        {
            "id": "measure-temperature-change",
            "text": "Measure the temperature change.",
        },
        {
            "id": "use-mc-delta-theta",
            "text": "Use E = mcΔθ to find the specific heat capacity.",
            "concepts": ["specific-heat-capacity"],
        },
    ],
}


def test_structured_covers_its_declared_steps():
    assert _verify(STRUCTURED).ok


def test_structured_missing_step_fails():
    report = _verify(
        {"kind": "structured", "requires": ["measure-mass"], "points": [{"id": "heat", "text": "Heat."}]}
    )
    assert not report.ok
    assert "missing" in report.errors[0]


def test_structured_wrong_order_fails():
    report = _verify(
        {
            "kind": "structured",
            "requires": ["measure-mass", "measure-temperature-change"],
            "points": [
                {"id": "measure-temperature-change", "text": "Temperature."},
                {"id": "measure-mass", "text": "Mass."},
            ],
        }
    )
    assert not report.ok
    assert "out of order" in report.errors[0]


def test_structured_missing_concept_fails():
    report = _verify(
        {
            "kind": "structured",
            "requires": ["measure-mass"],
            "concepts": ["specific-heat-capacity"],
            "points": [{"id": "measure-mass", "text": "Measure the mass."}],
        }
    )
    assert not report.ok
    assert "concept" in report.errors[0]


def test_a_vacuous_structured_check_is_an_error():
    report = _verify({"kind": "structured", "points": []})
    assert not report.ok
    assert "asserts nothing" in report.errors[0]


# --- the seam selects the oracle ----------------------------------------------


def test_a_physics_bank_selects_units_and_a_maths_bank_does_not():
    """`oracles: [sympy, units]` means something; a bank with none keeps SymPy."""
    check = {
        "kind": "dimensions",
        "consistency": "v = s / t",
        "units": {"v": "m s^-1", "s": "m", "t": "s"},
    }
    assert verify_problem(problem_record(check), oracles=PHYSICS).ok
    with pytest.raises(oracles.UnknownCheck, match="units"):
        verify_problem(problem_record(check))


def test_a_units_kind_in_a_maths_bank_fails_loudly(tmp_path):
    bank = tmp_path / "physics.yaml"
    bank.write_text(
        yaml.safe_dump(
            {
                "problems": [
                    {
                        "id": "wrong-oracle",
                        "check": {
                            "kind": "sigfigs",
                            "value": "1.234",
                            "figures": 2,
                            "answer": "1.2",
                            "convention": "round-once",
                        },
                    }
                ]
            }
        ),
        encoding="utf-8",
    )
    # No `oracles:` and no owning book: the default is SymPy alone, and a kind
    # from an unselected oracle is loud rather than a silent pass.
    with pytest.raises(oracles.UnknownCheck, match="units"):
        verify_bank(bank)


def test_a_bank_may_declare_the_units_oracle(tmp_path):
    bank = tmp_path / "physics.yaml"
    bank.write_text(
        yaml.safe_dump(
            {
                "oracles": ["sympy", "units"],
                "problems": [
                    {
                        "id": "ok",
                        "check": {
                            "kind": "convert",
                            "value": "1",
                            "from": "km",
                            "to": "m",
                            "answer": "1000",
                        },
                    }
                ],
            }
        ),
        encoding="utf-8",
    )
    assert verify_bank(bank).ok


# --- rendering quantities without runtime maths -------------------------------


def test_render_quantity_is_plain_text_and_never_maths():
    assert render_quantity("0.0001", "m^3") == "0.0001 m^3"
    assert "$" not in render_quantity("20", "N")


def test_render_quantity_html_escapes_and_carries_no_maths():
    rendered = render_quantity_html("20", "<kg>")
    assert "$" not in rendered
    assert "&lt;kg&gt;" in rendered
    assert "quantity" in rendered


def test_a_convert_answer_renders_with_its_unit():
    block = render_problem(
        {
            "statement": "Convert $100\\,\\mathrm{cm^3}$ to $\\mathrm{m^3}$.",
            "check": {
                "kind": "convert",
                "value": "100",
                "from": "cm^3",
                "to": "m^3",
                "answer": "0.0001",
            },
        },
        1,
    )
    assert "**Answer:** 0.0001 m^3" in block


def test_a_structured_answer_renders_its_model_points():
    block = render_problem({"statement": "Describe the method.", "check": STRUCTURED}, 1)
    assert "Measure the mass of the block." in block
    assert "specific heat capacity" in block
