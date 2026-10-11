"""The units oracle: dimensions, prefixes, figures, uncertainty and structure.

The SymPy oracle proves symbolic equivalence. Physics marking needs five things
it cannot give: a quantity's *dimensions*, a value reported to the right number
of significant figures, an uncertainty propagated by a named rule, a resolved
vector, and a value read off a graph. This module owns those check kinds, plus
the structural check that stands where a CAS cannot go.

**Units never enter the CAS string** (``PROBLEMS.md``). A unit is parsed here
into an exact dimension vector over the SI base units and an exact factor to SI,
and the arithmetic is done on exact rationals. The SymPy boundary (``..cas``) is
used only where an irrational value is unavoidable — a trigonometric resolution,
a square root inside a dimension check, a significant-figure check of a
$\pi$-based value, or an uncertainty computed through a square root — and a
stated tolerance is then what is proved.

Honest limit (``research/curriculum/physics-verifier-gaps.md`` §6)
-----------------------------------------------------------------
The verifier proves arithmetic and dimensions, **not physics**. A dimensionally
consistent, arithmetically correct, physically absurd answer passes. ``F = ma``
with ``m`` in coulombs and ``a`` in volts can be made to balance; the oracle
will accept a rearrangement that is dimensionally coherent and still nonsense.
It also enforces a *declared* convention (round once, half-range) rather than
the board's mark scheme, because no machine-readable mark scheme exists. The
``structured`` kind proves only that a model answer contains the declared steps
in order; whether those steps are the right ones stays human. None of this is a
reason not to check what can be checked — it is a reason never to present these
checks as a proof of the physics.

The kinds are the vocabulary ``PROBLEMS.md`` tabulates, and :data:`CHECKS` must
match the ``units`` rows of the registry's ``KIND_ORACLE`` — the loader fails
loudly if it does not.
"""

from __future__ import annotations

import ast
import math
import re
from dataclasses import dataclass
from fractions import Fraction
from typing import Any, Mapping

import sympy

from .. import cas

# ---------------------------------------------------------------------------
# Dimension algebra
# ---------------------------------------------------------------------------

#: The seven SI base dimensions, in display order.
BASE_DIMENSIONS = ("kg", "m", "s", "A", "K", "mol", "cd")

#: Unicode superscripts an author may type instead of ``^``.
_SUPERSCRIPTS = {
    "⁰": "0",
    "¹": "1",
    "²": "2",
    "³": "3",
    "⁴": "4",
    "⁵": "5",
    "⁶": "6",
    "⁷": "7",
    "⁸": "8",
    "⁹": "9",
    "⁻": "-",
    "⁺": "+",
}


class UnitError(ValueError):
    """A unit string, quantity or dimension declaration could not be read."""


@dataclass(frozen=True)
class Dimension:
    """A dimension vector over the SI base units.

    ``Dimension(m=1, s=-2)`` is an acceleration: length per time squared. Two
    dimensions are equal when their exponent vectors are equal, so ``kg m s^-2``
    and ``N`` compare equal without either being special-cased.
    """

    exponents: tuple[tuple[str, Fraction], ...]

    def __init__(self, **exponents: Any):
        parts = []
        for name, power in exponents.items():
            if name not in BASE_DIMENSIONS:
                raise UnitError(f"unknown base dimension {name!r}")
            value = power if isinstance(power, Fraction) else Fraction(power)
            if value != 0:
                parts.append((name, value))
        object.__setattr__(
            self, "exponents", tuple(sorted(parts, key=lambda item: BASE_DIMENSIONS.index(item[0])))
        )

    @property
    def is_dimensionless(self) -> bool:
        return not self.exponents

    def _combine(self, other: "Dimension", sign: int) -> "Dimension":
        merged: dict[str, Fraction] = dict(self.exponents)
        for name, power in other.exponents:
            merged[name] = merged.get(name, Fraction(0)) + sign * power
        return Dimension(**merged)

    def __mul__(self, other: "Dimension") -> "Dimension":
        return self._combine(other, 1)

    def __truediv__(self, other: "Dimension") -> "Dimension":
        return self._combine(other, -1)

    def __pow__(self, power: Any) -> "Dimension":
        exponent = power if isinstance(power, Fraction) else Fraction(power)
        return Dimension(**{name: value * exponent for name, value in self.exponents})

    def __str__(self) -> str:
        if not self.exponents:
            return "1"
        return " ".join(
            name if power == 1 else f"{name}^{power}" for name, power in self.exponents
        )

    def __repr__(self) -> str:  # pragma: no cover - debugging aid
        return f"Dimension({str(self)!r})"


DIMENSIONLESS = Dimension()


def dimension(**exponents: Any) -> Dimension:
    return Dimension(**exponents)


# ---------------------------------------------------------------------------
# Unit registry: symbol -> (dimension, exact factor to SI)
# ---------------------------------------------------------------------------

_UNITS: dict[str, tuple[Dimension, Fraction]] = {}


def _register(symbol: str, dims: Dimension, factor: Any = "1") -> None:
    _UNITS[symbol] = (dims, Fraction(str(factor)))


def _register_derived(symbol: str, **exponents: Any) -> None:
    _register(symbol, dimension(**exponents))


# Base units. The SI base for mass is the kilogram, so the gram is the
# prefixed unit; ``kg`` is registered too so the ambiguous parse never happens.
_register("kg", dimension(kg=1))
_register("g", dimension(kg=1), "1e-3")
_register("m", dimension(m=1))
_register("s", dimension(s=1))
_register("A", dimension(A=1))
_register("K", dimension(K=1))
_register("mol", dimension(mol=1))
_register("cd", dimension(cd=1))

# Named derived units, dimensionally defined rather than looked up in SymPy:
# a unit is data, and its dimension is what the check compares.
_register_derived("Hz", s=-1)
_register_derived("N", kg=1, m=1, s=-2)
_register_derived("Pa", kg=1, m=-1, s=-2)
_register_derived("J", kg=1, m=2, s=-2)
_register_derived("W", kg=1, m=2, s=-3)
_register_derived("C", A=1, s=1)
_register_derived("V", kg=1, m=2, s=-3, A=-1)
_register_derived("F", kg=-1, m=-2, s=4, A=2)
_register_derived("Ω", kg=1, m=2, s=-3, A=-2)
_register_derived("ohm", kg=1, m=2, s=-3, A=-2)
_register_derived("S", kg=-1, m=-2, s=3, A=2)
_register_derived("Wb", kg=1, m=2, s=-2, A=-1)
_register_derived("T", kg=1, s=-2, A=-1)
_register_derived("H", kg=1, m=2, s=-2, A=-2)
_register_derived("Bq", s=-1)
_register_derived("Gy", m=2, s=-2)
_register_derived("Sv", m=2, s=-2)
_register_derived("kat", mol=1, s=-1)

# Accepted non-SI units, with their exact factor. The exact decimal strings
# keep the arithmetic rational; the measured constants are exact by convention.
_register("L", dimension(m=3), "1e-3")
_register("l", dimension(m=3), "1e-3")
_register("t", dimension(kg=1), "1e3")
_register("min", dimension(s=1), "60")
_register("h", dimension(s=1), "3600")
_register("day", dimension(s=1), "86400")
_register("eV", dimension(kg=1, m=2, s=-2), "1.602176634e-19")
_register("u", dimension(kg=1), "1.66053906660e-27")
_register("bar", dimension(kg=1, m=-1, s=-2), "1e5")
_register("atm", dimension(kg=1, m=-1, s=-2), "101325")

#: SI prefixes, longest first when resolving so ``da`` wins over ``d``.
_PREFIXES = {
    "da": "1e1",
    "Q": "1e30",
    "R": "1e27",
    "Y": "1e24",
    "Z": "1e21",
    "E": "1e18",
    "P": "1e15",
    "T": "1e12",
    "G": "1e9",
    "M": "1e6",
    "k": "1e3",
    "h": "1e2",
    "d": "1e-1",
    "c": "1e-2",
    "m": "1e-3",
    "u": "1e-6",
    "μ": "1e-6",
    "µ": "1e-6",
    "n": "1e-9",
    "p": "1e-12",
    "f": "1e-15",
    "a": "1e-18",
    "z": "1e-21",
    "y": "1e-24",
}

_FACTOR_RE = re.compile(r"([A-Za-zµμΩ]+)(?:\^([+-]?\d+))?")


def _normalise(text: str) -> str:
    """Expand Unicode superscripts and multiplication symbols to ASCII."""
    out: list[str] = []
    previous_superscript = False
    for char in text:
        if char in _SUPERSCRIPTS:
            if not previous_superscript:
                out.append("^")
            out.append(_SUPERSCRIPTS[char])
            previous_superscript = True
        else:
            previous_superscript = False
            out.append(char)
    return (
        "".join(out)
        .replace("·", " ")
        .replace("×", " ")
        .replace("*", " ")
        .replace("**", "^")
    )


def _resolve_unit(name: str) -> tuple[Dimension, Fraction]:
    """The dimension and SI factor of one unit symbol, prefix aware."""
    if name in _UNITS:
        return _UNITS[name]
    for length in (2, 1):
        prefix, rest = name[:length], name[length:]
        if prefix in _PREFIXES and rest in _UNITS:
            base_dim, base_factor = _UNITS[rest]
            return base_dim, Fraction(_PREFIXES[prefix]) * base_factor
    raise UnitError(f"unknown unit {name!r}")


def parse_unit(text: Any) -> tuple[Dimension, Fraction]:
    """Parse a unit string into ``(dimension, exact factor to SI)``.

    ``cm^3`` is ``(m^3, 1/10^6)``; ``N`` is ``(kg m s^-2, 1)``. A ``/`` negates
    every factor that follows it within a chunk, so ``kg/m^3`` is SI and
    ``J/mol/K`` reads as ``J mol^-1 K^-1`` the way it is written.
    """
    raw = str(text).strip()
    if raw in ("", "1", "dimensionless", "rad", "sr"):
        return DIMENSIONLESS, Fraction(1)
    text = _normalise(raw)
    total = DIMENSIONLESS
    factor = Fraction(1)
    divide = False
    for chunk in text.split():
        if chunk == "/":
            divide = True
            continue
        for index, part in enumerate(chunk.split("/")):
            if index > 0:
                divide = True
            if not part:
                continue
            match = _FACTOR_RE.fullmatch(part)
            if not match:
                raise UnitError(f"cannot parse unit {part!r} in {raw!r}")
            exponent = Fraction(match.group(2) or 1)
            if divide:
                exponent = -exponent
            unit_dim, unit_factor = _resolve_unit(match.group(1))
            total = total * (unit_dim ** exponent)
            factor = factor * (unit_factor ** exponent)
    return total, factor


def _parse_dimensions(value: Any) -> Dimension | None:
    if value is None:
        return None
    if isinstance(value, (list, tuple)):
        value = " ".join(str(item) for item in value)
    return parse_unit(value)[0]


# ---------------------------------------------------------------------------
# Quantities and a tiny evaluator (never a CAS string)
# ---------------------------------------------------------------------------


def _rational_sqrt(value: Fraction) -> Fraction | sympy.Expr:
    """The exact root when ``value`` is a perfect square, else a symbolic one.

    A unit-carrying magnitude is usually the exact 3-4-5 kind, but a check may
    legitimately need ``sqrt(5)``; the symbolic form keeps it exact and a
    declared tolerance decides the comparison.
    """
    if value < 0:
        raise UnitError("cannot take the square root of a negative magnitude")
    numerator = math.isqrt(value.numerator)
    denominator = math.isqrt(value.denominator)
    if (
        numerator * numerator == value.numerator
        and denominator * denominator == value.denominator
    ):
        return Fraction(numerator, denominator)
    return sympy.sqrt(value)


@dataclass(frozen=True)
class Quantity:
    """A magnitude in SI base units and its dimension vector.

    The magnitude is an exact :class:`~fractions.Fraction` wherever the
    arithmetic stays rational. A ``sqrt`` of an imperfect square is instead an
    exact SymPy expression, and a check that uses one declares a tolerance.
    """

    value: Fraction | sympy.Expr
    dimension: Dimension

    def __mul__(self, other: "Quantity") -> "Quantity":
        return Quantity(self.value * other.value, self.dimension * other.dimension)

    def __truediv__(self, other: "Quantity") -> "Quantity":
        return Quantity(self.value / other.value, self.dimension / other.dimension)

    def __pow__(self, power: Any) -> "Quantity":
        exponent = power if isinstance(power, Fraction) else Fraction(power)
        if exponent.denominator != 1:
            raise UnitError("only integer powers of a quantity are supported")
        return Quantity(self.value**exponent.numerator, self.dimension**exponent)

    def sqrt(self) -> "Quantity":
        """The square root, defined only when every exponent is even."""
        exponents: dict[str, Fraction] = {}
        for name, power in self.dimension.exponents:
            if power.denominator != 1 or power.numerator % 2 != 0:
                raise UnitError(
                    f"cannot take the square root of {self.dimension}: "
                    f"{name} has an odd power"
                )
            exponents[name] = power / 2
        if isinstance(self.value, Fraction):
            value: Fraction | sympy.Expr = _rational_sqrt(self.value)
        else:
            value = sympy.sqrt(self.value)
        return Quantity(value, Dimension(**exponents))

    def abs(self) -> "Quantity":
        return Quantity(abs(self.value), self.dimension)

    def _add(self, other: "Quantity", sign: int) -> "Quantity":
        if self.dimension != other.dimension:
            raise UnitError(
                f"cannot add {self.dimension} and {other.dimension}: "
                "the dimensions differ"
            )
        return Quantity(self.value + sign * other.value, self.dimension)

    def __add__(self, other: "Quantity") -> "Quantity":
        return self._add(other, 1)

    def __sub__(self, other: "Quantity") -> "Quantity":
        return self._add(other, -1)


def _as_quantity(spec: Any, *, default_dimension: Dimension | None = None) -> Quantity:
    """Read ``{value, unit}`` (or a bare number) as a :class:`Quantity`."""
    if isinstance(spec, Mapping):
        raw_value = spec.get("value", spec.get("magnitude", 0))
        unit = spec.get("unit")
    else:
        raw_value = spec
        unit = None
    value = Fraction(str(raw_value))
    if unit is None:
        if default_dimension is None:
            return Quantity(value, DIMENSIONLESS)
        return Quantity(value, default_dimension)
    unit_dim, unit_factor = parse_unit(unit)
    return Quantity(value * unit_factor, unit_dim)


def _evaluate(text: str, names: dict[str, Quantity]) -> Quantity:
    """Evaluate an arithmetic expression over quantities, safely, via ``ast``."""
    try:
        tree = ast.parse(str(text).strip(), mode="eval")
    except SyntaxError as err:
        raise UnitError(f"cannot parse expression {text!r}: {err}") from err
    return _eval_node(tree.body, names)


def _eval_node(node: ast.AST, names: dict[str, Quantity]) -> Quantity:
    if isinstance(node, ast.Constant) and isinstance(node.value, (int, float)):
        return Quantity(Fraction(str(node.value)), DIMENSIONLESS)
    if isinstance(node, ast.Name):
        if node.id not in names:
            raise UnitError(f"unknown quantity {node.id!r}")
        return names[node.id]
    if isinstance(node, ast.UnaryOp) and isinstance(node.op, ast.USub):
        inner = _eval_node(node.operand, names)
        return Quantity(-inner.value, inner.dimension)
    if isinstance(node, ast.Call):
        return _eval_call(node, names)
    if isinstance(node, ast.BinOp):
        left = _eval_node(node.left, names)
        right = _eval_node(node.right, names)
        if isinstance(node.op, ast.Mult):
            return left * right
        if isinstance(node.op, ast.Div):
            return left / right
        if isinstance(node.op, ast.Pow):
            if not right.dimension.is_dimensionless:
                raise UnitError("a power must be dimensionless")
            return left ** right.value
        if isinstance(node.op, ast.Add):
            return left + right
        if isinstance(node.op, ast.Sub):
            return left - right
    raise UnitError(f"unsupported expression element {ast.dump(node)}")


def _eval_call(node: ast.Call, names: dict[str, Quantity]) -> Quantity:
    """A fixed set of real-valued functions over quantities.

    ``sqrt`` halves every dimension exponent, so it only accepts even powers; a
    magnitude such as ``sqrt(vx**2 + vy**2)`` is then dimension-checked like any
    other expression. The set is deliberately closed: an unknown name is an
    error, never a silent pass.
    """
    if not isinstance(node.func, ast.Name) or node.keywords or len(node.args) != 1:
        raise UnitError(f"unsupported function call {ast.dump(node)}")
    argument = _eval_node(node.args[0], names)
    if node.func.id == "sqrt":
        return argument.sqrt()
    if node.func.id == "abs":
        return argument.abs()
    raise UnitError(f"unknown function {node.func.id!r}")


# ---------------------------------------------------------------------------
# Significant figures
# ---------------------------------------------------------------------------


def _exact(number: Any) -> Fraction:
    try:
        return Fraction(str(number))
    except (ValueError, ZeroDivisionError) as err:
        raise UnitError(f"not an exact number: {number!r}") from err


def _floor_log10(value: Fraction) -> int:
    """The integer e with 10**e <= value < 10**(e+1), for value > 0."""
    if value >= 1:
        exponent = 0
        while Fraction(10) ** (exponent + 1) <= value:
            exponent += 1
        return exponent
    exponent = -1
    while Fraction(10) ** exponent > value:
        exponent -= 1
    return exponent


def _round_significant(value: Fraction, figures: int) -> Fraction:
    """Round ``value`` once to ``figures`` significant figures, half away from 0."""
    if figures < 1:
        raise UnitError("significant figures must be at least 1")
    if value == 0:
        return Fraction(0)
    sign = -1 if value < 0 else 1
    magnitude = abs(value)
    exponent = _floor_log10(magnitude)
    step = Fraction(10) ** (exponent - figures + 1)
    scaled = magnitude / step
    whole = scaled.numerator // scaled.denominator
    if scaled - whole >= Fraction(1, 2):
        whole += 1
    return sign * whole * step


def _count_significant(text: Any) -> int:
    """The significant figures a written number carries.

    Trailing zeros count only after a decimal point: ``1.20`` is three figures
    and ``1200`` is two. That is why the answer is a string and why a bank that
    means three figures must write ``1.20e3``.
    """
    mantissa = str(text).strip().split("e")[0].split("E")[0].lstrip("+-")
    if "." in mantissa:
        digits = mantissa.replace(".", "").lstrip("0")
        return len(digits)
    return len(mantissa.lstrip("0").rstrip("0"))


def _write(value: Fraction | sympy.Expr) -> str:
    """A short exact decimal for an error message."""
    if isinstance(value, Fraction):
        if value.denominator == 1:
            return str(value.numerator)
        return str(float(value))
    return str(value)


# ---------------------------------------------------------------------------
# Graph helpers
# ---------------------------------------------------------------------------


def _points(check: Mapping[str, Any]) -> list[tuple[Fraction, Fraction]]:
    series = check.get("series") or []
    points = [(_exact(x), _exact(y)) for x, y in series]
    if len(points) < 2:
        raise UnitError("a graph check needs at least two points")
    return points


def _least_squares(points: list[tuple[Fraction, Fraction]]) -> tuple[Fraction, Fraction]:
    n = len(points)
    sx = sum(x for x, _ in points)
    sy = sum(y for _, y in points)
    sxx = sum(x * x for x, _ in points)
    sxy = sum(x * y for x, y in points)
    denominator = n * sxx - sx * sx
    if denominator == 0:
        raise UnitError("the x values do not vary, so there is no gradient")
    slope = (n * sxy - sx * sy) / denominator
    intercept = (sy * sxx - sx * sxy) / denominator
    return slope, intercept


def _trapezium_area(points: list[tuple[Fraction, Fraction]]) -> Fraction:
    ordered = sorted(points)
    total = Fraction(0)
    for (x1, y1), (x2, y2) in zip(ordered, ordered[1:]):
        total += (x2 - x1) * (y1 + y2) / 2
    return total


def _check_interval(report, label: str, value: Fraction, check: Mapping[str, Any]) -> None:
    """Prove a graph-derived value lies in a declared closed interval or tolerance."""
    if "between" in check:
        low = _exact(check["between"][0])
        high = _exact(check["between"][1])
        if not (low <= value <= high):
            report.errors.append(
                f"check: {label} is {_write(value)}, outside the declared "
                f"interval [{_write(low)}, {_write(high)}]"
            )
        return
    if "answer" in check:
        answer = _exact(check["answer"])
        tolerance = _exact(check.get("tolerance", 0))
        if abs(value - answer) > tolerance:
            report.errors.append(
                f"check: {label} is {_write(value)}, not within "
                f"{_write(tolerance)} of {_write(answer)}"
            )
        return
    report.errors.append(f"check: {label} needs 'between' or 'answer' with 'tolerance'")


# ---------------------------------------------------------------------------
# Handlers
# ---------------------------------------------------------------------------


def check_dimensions(check, symbols, report, dispatch):
    """Dimensional consistency, a declared quantity, or unit-carrying arithmetic."""
    handled = False

    if "consistency" in check:
        handled = True
        _check_consistency(check, report)
    if "expression" in check:
        handled = True
        _check_arithmetic(check, report)

    has_single = any(key in check for key in ("unit", "dimensions", "quantity"))
    if has_single:
        handled = True
        _check_declared_quantity(check, report)

    if not handled:
        report.errors.append(
            "check: dimensions needs 'consistency', 'expression' or a 'unit'"
        )


def _check_consistency(check, report) -> None:
    text = str(check["consistency"])
    if text.count("=") != 1:
        report.errors.append(f"check: consistency must be one equation, got {text!r}")
        return
    units = check.get("units") or {}
    try:
        names = {
            name: Quantity(Fraction(1), parse_unit(unit)[0])
            for name, unit in units.items()
        }
        left_text, right_text = text.split("=")
        left = _evaluate(left_text, names)
        right = _evaluate(right_text, names)
    except UnitError as err:
        report.errors.append(f"check: {err}")
        return
    if left.dimension != right.dimension:
        report.errors.append(
            f"check: {left_text.strip()} has dimensions {left.dimension} but "
            f"{right_text.strip()} has dimensions {right.dimension}"
        )


def _check_arithmetic(check, report) -> None:
    values = check.get("values") or {}
    try:
        names = {name: _as_quantity(spec) for name, spec in values.items()}
        computed = _evaluate(check["expression"], names)
        answer = _as_quantity(check["answer"])
        tolerance = _exact(check.get("tolerance", 0))
    except (UnitError, KeyError) as err:
        report.errors.append(f"check: {err}")
        return
    if computed.dimension != answer.dimension:
        report.errors.append(
            f"check: {check['expression']} has dimensions {computed.dimension} "
            f"but the answer declares {answer.dimension}"
        )
        return
    if not _within(computed.value, answer.value, tolerance):
        report.errors.append(
            f"check: {check['expression']} is {_write(computed.value)} "
            f"{computed.dimension}, not {_write(answer.value)} {answer.dimension}"
        )


def _check_declared_quantity(check, report) -> None:
    unit_text = check.get("unit")
    if unit_text is None and isinstance(check.get("quantity"), Mapping):
        unit_text = check["quantity"].get("unit")
    if unit_text is None:
        # A bare `dimensions:` list with nothing to compare it to would pass for
        # no reason; only a composite that carries its own unit is meaningful.
        if "consistency" not in check and "expression" not in check:
            report.errors.append(
                "check: dimensions needs a 'unit' to compare with the declared dimensions"
            )
        return
    try:
        actual_dim, factor = parse_unit(unit_text)
        expected = _parse_dimensions(check.get("dimensions"))
    except UnitError as err:
        report.errors.append(f"check: {err}")
        return
    if expected is not None and actual_dim is not None and actual_dim != expected:
        report.errors.append(
            f"check: unit {unit_text!r} has dimensions {actual_dim}, "
            f"not the declared {expected}"
        )
        return
    if expected is None and actual_dim is not None:
        expected = actual_dim
    value = check.get("value")
    if isinstance(check.get("quantity"), Mapping):
        value = check["quantity"].get("value", value)
    if value is None or unit_text is None:
        return
    try:
        si_value = _exact(value) * factor
    except UnitError as err:
        report.errors.append(f"check: {err}")
        return
    if "si_value" in check and si_value != _exact(check["si_value"]):
        report.errors.append(
            f"check: {value} {unit_text} is {_write(si_value)} in SI base units, "
            f"not {check['si_value']}"
        )


def check_convert(check, symbols, report, dispatch):
    """An exact prefix or unit conversion, dimension-checked first."""
    try:
        value = _exact(check["value"])
        from_dim, from_factor = parse_unit(check["from"])
        to_dim, to_factor = parse_unit(check["to"])
    except (UnitError, KeyError) as err:
        report.errors.append(f"check: {err}")
        return
    if from_dim != to_dim:
        report.errors.append(
            f"check: cannot convert {check['from']!r} ({from_dim}) to "
            f"{check['to']!r} ({to_dim}): the dimensions differ"
        )
        return
    converted = value * from_factor / to_factor
    answer = _exact(check["answer"])
    if converted != answer:
        report.errors.append(
            f"check: {check['value']} {check['from']} is {_write(answer)} expected, "
            f"but the conversion gives {_write(converted)} {check['to']}"
        )


def check_sigfigs(check, symbols, report, dispatch):
    """A value reported once to a declared number of significant figures."""
    if check.get("convention") != "round-once":
        report.errors.append(
            "check: sigfigs requires convention: round-once "
            "(the oracle enforces one rounding at the end, never at every step)"
        )
        return
    try:
        value, tolerance = _read_sigfig_value(check, symbols)
        figures = int(check["figures"])
        answer_text = str(check["answer"])
        expected = _exact(answer_text)
    except (UnitError, KeyError, ValueError) as err:
        report.errors.append(f"check: {err}")
        return
    if tolerance is None:
        rounded = _round_significant(value, figures)
    else:
        # A value built on an irrational constant is only known within its
        # declared tolerance, so the rounding must hold across the whole band.
        low = _round_significant(value - tolerance, figures)
        high = _round_significant(value + tolerance, figures)
        if low != high:
            report.errors.append(
                f"check: {check['value']} is too close to a rounding boundary to "
                f"round to {figures} significant figures within a tolerance of "
                f"{_write(tolerance)}; narrow the tolerance or declare more figures"
            )
            return
        rounded = low
    if rounded != expected:
        report.errors.append(
            f"check: {answer_text} is not {check['value']} rounded once to "
            f"{figures} significant figures (that is {_write(rounded)})"
        )
        return
    written = _count_significant(answer_text)
    if written != figures:
        report.errors.append(
            f"check: {answer_text} is written to {written} significant figures, "
            f"not {figures}; use scientific notation to show trailing zeros"
        )


def _read_sigfig_value(check, symbols) -> tuple[Fraction, Fraction | None]:
    """The value to round, and the tolerance for a value that is not rational.

    An exactly rational ``value`` is used as it stands. A value built on an
    irrational constant, such as ``4 * pi**2 * L / T**2``, cannot be represented
    exactly, so it is evaluated to high precision and the declared tolerance is
    the band across which the reported rounding must not change. Without a
    tolerance a symbolic value is ambiguous, so the check refuses it.
    """
    expression = cas.parse_expression(str(check["value"]), symbols)
    if expression.is_rational:
        return Fraction(expression.p, expression.q), None
    if "tolerance" not in check:
        raise UnitError(
            f"value {check['value']!r} is not an exact rational; declare a "
            "'tolerance' for its rounding"
        )
    tolerance = _exact(check["tolerance"])
    if tolerance <= 0:
        raise UnitError("'tolerance' must be positive for a symbolic value")
    return Fraction(str(expression.evalf(60))), tolerance


def check_uncertainty(check, symbols, report, dispatch):
    """Uncertainty propagated by a convention the check names."""
    if "mean_of" in check:
        _check_mean_uncertainty(check, symbols, report)
        return
    combine = check.get("combine")
    if combine == "add-absolutes":
        _check_add_absolutes(check, symbols, report)
        return
    if combine == "add-percentages":
        _check_add_percentages(check, symbols, report)
        return
    report.errors.append(
        "check: uncertainty needs 'mean_of' or combine: add-absolutes | add-percentages"
    )


def _within(value, target, tolerance) -> bool:
    return cas.within_tolerance(value, target, tolerance)


def _check_mean_uncertainty(check, symbols, report) -> None:
    convention = check.get("convention")
    if convention not in ("half-range", "full-range", "standard-deviation", "standard-error"):
        report.errors.append(
            "check: a mean's uncertainty needs convention: half-range | full-range "
            "| standard-deviation | standard-error"
        )
        return
    try:
        values = [cas.parse_expression(str(item), symbols) for item in check["mean_of"]]
        if len(values) < 2:
            raise UnitError("a mean needs at least two readings")
        mean = sum(values) / len(values)
        spread = max(values) - min(values)
        if convention == "half-range":
            uncertainty = spread / 2
        elif convention == "full-range":
            uncertainty = spread
        else:
            variance = sum((item - mean) ** 2 for item in values) / (len(values) - 1)
            uncertainty = sympy.sqrt(variance)
            if convention == "standard-error":
                uncertainty = uncertainty / sympy.sqrt(len(values))
        tolerance = cas.parse_expression(str(check.get("tolerance", 0)), symbols)
        expected_mean = cas.parse_expression(str(check.get("answer", check.get("mean"))), symbols)
        expected_uncertainty = cas.parse_expression(str(check["uncertainty"]), symbols)
    except (UnitError, KeyError, TypeError) as err:
        report.errors.append(f"check: {err}")
        return
    if not _within(mean, expected_mean, tolerance):
        report.errors.append(
            f"check: the mean of the readings is {mean}, not {expected_mean}"
        )
    if not _within(uncertainty, expected_uncertainty, tolerance):
        report.errors.append(
            f"check: under convention {convention!r} the uncertainty is "
            f"{uncertainty}, not {expected_uncertainty}"
        )


def _check_add_absolutes(check, symbols, report) -> None:
    try:
        terms = _term_values(check["terms"])
        tolerance = cas.parse_expression(str(check.get("tolerance", 0)), symbols)
        expected_result = cas.parse_expression(str(check.get("result", check.get("answer"))), symbols)
        expected_uncertainty = cas.parse_expression(str(check["uncertainty"]), symbols)
    except (UnitError, KeyError, TypeError) as err:
        report.errors.append(f"check: {err}")
        return
    result = sum(value for value, _ in terms)
    uncertainty = sum(uncertainty for _, uncertainty in terms)
    if not _within(result, expected_result, tolerance):
        report.errors.append(
            f"check: adding the terms gives {result}, not {expected_result}"
        )
    if not _within(uncertainty, expected_uncertainty, tolerance):
        report.errors.append(
            f"check: adding the absolute uncertainties gives {uncertainty}, "
            f"not {expected_uncertainty}"
        )


def _check_add_percentages(check, symbols, report) -> None:
    try:
        terms = check["terms"]
        result = sympy.Integer(1)
        total_percentage = sympy.Integer(0)
        for term in terms:
            value = cas.parse_expression(str(term["value"]), symbols)
            percentage = cas.parse_expression(str(term["percentage"]), symbols)
            power = cas.parse_expression(str(term.get("power", 1)), symbols)
            result *= value**power
            total_percentage += abs(power) * percentage
        uncertainty = result * total_percentage / 100
        tolerance = cas.parse_expression(str(check.get("tolerance", 0)), symbols)
        expected_result = cas.parse_expression(str(check.get("result", check.get("answer"))), symbols)
        expected_uncertainty = cas.parse_expression(str(check["uncertainty"]), symbols)
    except (UnitError, KeyError, TypeError) as err:
        report.errors.append(f"check: {err}")
        return
    if not _within(result, expected_result, tolerance):
        report.errors.append(
            f"check: multiplying the terms gives {result}, not {expected_result}"
        )
    if not _within(uncertainty, expected_uncertainty, tolerance):
        report.errors.append(
            f"check: adding the percentage uncertainties gives an absolute "
            f"uncertainty of {uncertainty}, not {expected_uncertainty}"
        )


def _term_values(terms) -> list[tuple[Any, Any]]:
    parsed = []
    for term in terms:
        value = cas.parse_expression(str(term["value"]), {})
        uncertainty = cas.parse_expression(str(term["absolute"]), {})
        parsed.append((value, uncertainty))
    if not parsed:
        raise UnitError("the terms list is empty")
    return parsed


def check_resolve(check, symbols, report, dispatch):
    """Resolve a magnitude and angle into components, or back again."""
    relation = check.get("relation")
    if relation not in (
        "components-from-magnitude-and-angle",
        "magnitude-and-angle-from-components",
    ):
        report.errors.append(
            f"check: unknown resolve relation {relation!r}"
        )
        return
    try:
        tolerance = cas.parse_expression(str(check.get("tolerance", "0.05")), symbols)
    except (ValueError, TypeError) as err:
        report.errors.append(f"check: {err}")
        return

    def close(value, target):
        return cas.within_tolerance(value, target, tolerance)

    if relation == "components-from-magnitude-and-angle":
        try:
            magnitude = cas.parse_expression(str(check["magnitude"]), symbols)
            angle = cas.parse_expression(str(check["angle_deg"]), symbols)
            components = check["components"]
        except (KeyError, ValueError) as err:
            report.errors.append(f"check: {err}")
            return
        radians = angle * sympy.pi / 180
        expected = {
            "x": magnitude * sympy.cos(radians),
            "y": magnitude * sympy.sin(radians),
        }
        for axis, target in expected.items():
            actual = cas.parse_expression(str(components[axis]), symbols)
            if not close(actual, target):
                report.errors.append(
                    f"check: the {axis}-component is {actual}, not {target}"
                )
        return

    try:
        components = check["components"]
        x = cas.parse_expression(str(components["x"]), symbols)
        y = cas.parse_expression(str(components["y"]), symbols)
        magnitude = cas.parse_expression(str(check["magnitude"]), symbols)
        angle = cas.parse_expression(str(check["angle_deg"]), symbols)
    except (KeyError, ValueError) as err:
        report.errors.append(f"check: {err}")
        return
    expected_magnitude = sympy.sqrt(x**2 + y**2)
    if not close(magnitude, expected_magnitude):
        report.errors.append(
            f"check: the magnitude is {magnitude}, not {expected_magnitude}"
        )
    expected_angle = sympy.deg(sympy.atan2(y, x))
    difference = abs((angle - expected_angle + 180) % 360 - 180)
    if not cas.within_tolerance(difference, sympy.Integer(0), tolerance):
        report.errors.append(
            f"check: the direction is {angle} degrees, not {expected_angle}"
        )


def check_gradient(check, symbols, report, dispatch):
    """The least-squares gradient of a series, proved against an interval."""
    try:
        slope, _ = _least_squares(_points(check))
    except UnitError as err:
        report.errors.append(f"check: {err}")
        return
    _check_interval(report, "the gradient", slope, check)


def check_intercept(check, symbols, report, dispatch):
    """The least-squares intercept of a series, proved against an interval."""
    try:
        _, intercept = _least_squares(_points(check))
    except UnitError as err:
        report.errors.append(f"check: {err}")
        return
    _check_interval(report, "the intercept", intercept, check)


def check_area(check, symbols, report, dispatch):
    """The trapezium-rule area under a series, proved against an interval."""
    try:
        area = _trapezium_area(_points(check))
    except UnitError as err:
        report.errors.append(f"check: {err}")
        return
    _check_interval(report, "the area", area, check)


def check_structured(check, symbols, report, dispatch):
    """A model answer contains its declared steps in order and covers its concepts.

    This proves **presence, order and coverage** — nothing about whether the
    steps are physically right, or the best method. The required steps must come
    from the specification or the practical, and a human checks that mapping.
    """
    requires = list(check.get("requires") or [])
    concepts = list(check.get("concepts") or [])
    points = list(check.get("points") or [])
    if not requires and not concepts:
        report.errors.append(
            "check: structured needs 'requires' and/or 'concepts'; a check that "
            "asserts nothing is not a check"
        )
        return
    identifiers = []
    for point in points:
        if not point.get("id") or not point.get("text"):
            report.errors.append(
                "check: every structured point needs an 'id' and a 'text'"
            )
            return
        identifiers.append(point["id"])
    if len(identifiers) != len(set(identifiers)):
        report.errors.append("check: structured point ids must be unique")
        return
    missing = [step for step in requires if step not in identifiers]
    for step in missing:
        report.errors.append(
            f"check: the model answer is missing the required step {step!r}"
        )
    present = [step for step in identifiers if step in set(requires)]
    if present != requires:
        report.errors.append(
            f"check: the model answer's steps are out of order: {present} "
            f"does not match {requires}"
        )
    covered = {concept for point in points for concept in point.get("concepts") or []}
    for concept in concepts:
        if concept not in covered:
            report.errors.append(
                f"check: the model answer does not cover the concept {concept!r}"
            )


CHECKS = {
    "dimensions": check_dimensions,
    "convert": check_convert,
    "sigfigs": check_sigfigs,
    "uncertainty": check_uncertainty,
    "resolve": check_resolve,
    "gradient": check_gradient,
    "intercept": check_intercept,
    "area": check_area,
    "structured": check_structured,
}
