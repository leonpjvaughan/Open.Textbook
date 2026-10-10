"""Verify a problem bank with a computer-algebra system.

Each problem declares an independent ``check`` of its final answer and, where it
has a worked solution, a chain of ``steps``. The verifier proves:

* every consecutive pair of steps is related as declared (equivalent
  expressions, or equal solution sets); and
* the final answer satisfies the independent check.

It returns a report rather than raising, so the caller decides whether a failure
is a test failure or an authoring warning.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import yaml

from . import cas


@dataclass
class Report:
    problem_id: str
    errors: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)

    @property
    def ok(self) -> bool:
        return not self.errors


@dataclass
class BankReport:
    bank: str
    reports: list[Report] = field(default_factory=list)

    @property
    def errors(self) -> list[str]:
        out = []
        for report in self.reports:
            out.extend(f"{report.problem_id}: {e}" for e in report.errors)
        return out

    @property
    def warnings(self) -> list[str]:
        out = []
        for report in self.reports:
            out.extend(f"{report.problem_id}: {w}" for w in report.warnings)
        return out

    @property
    def ok(self) -> bool:
        return not self.errors


def _parsed_steps(problem: dict, symbols: dict, report: Report):
    parsed = []
    for index, step in enumerate(problem.get("steps", [])):
        if "expr" in step:
            parsed.append(("expr", cas.parse_expression(step["expr"], symbols)))
        elif "equation" in step:
            parsed.append(("equation", cas.parse_equation(step["equation"], symbols)))
        else:
            report.errors.append(f"step {index}: needs 'expr' or 'equation'")
    return parsed


def _verify_steps(problem: dict, symbols: dict, report: Report) -> None:
    parsed = _parsed_steps(problem, symbols, report)
    relation = problem.get("step_relation", "equivalent")
    variable_name = (problem.get("check") or {}).get("variable")
    variable = symbols.get(variable_name) if variable_name else None

    for index in range(len(parsed) - 1):
        (kind_a, a), (kind_b, b) = parsed[index], parsed[index + 1]
        label = f"step {index} -> {index + 1}"
        if relation == "solutions":
            if kind_a != "equation" or kind_b != "equation":
                report.errors.append(f"{label}: solution steps must be equations")
                continue
            if variable is None:
                report.errors.append(f"{label}: no variable declared for solving")
                continue
            if cas.solution_set(a, variable) != cas.solution_set(b, variable):
                report.errors.append(
                    f"{label}: solution sets differ "
                    f"({cas.solution_set(a, variable)} != {cas.solution_set(b, variable)})"
                )
        elif relation == "implies":
            # A weaker relation for non-reversible steps (squaring, multiplying by
            # an unknown): the first solution set must be contained in the second.
            if kind_a != "equation" or kind_b != "equation":
                report.errors.append(f"{label}: implication steps must be equations")
                continue
            if variable is None:
                report.errors.append(f"{label}: no variable declared for solving")
                continue
            if not cas.solution_sets_subset(a, b, variable):
                report.errors.append(
                    f"{label}: {cas.solution_set(a, variable)} is not contained in "
                    f"{cas.solution_set(b, variable)}"
                )
            else:
                report.warnings.append(
                    f"{label}: implications can add extraneous roots; check the answer set"
                )
        else:
            if kind_a != "expr" or kind_b != "expr":
                report.errors.append(f"{label}: equivalence steps must be expressions")
                continue
            if not cas.equivalent(a, b):
                report.errors.append(f"{label}: expressions are not equivalent")


def _verify_check(problem: dict, symbols: dict, report: Report) -> None:
    check = problem.get("check")
    if not check:
        report.warnings.append("no independent check declared")
        return
    kind = check.get("kind")
    if kind == "all":
        for index, sub in enumerate(check.get("checks", [])):
            sub_report = Report(problem_id=f"{report.problem_id} #{index + 1}")
            _verify_check({"check": sub, "symbols": problem.get("symbols")}, symbols, sub_report)
            report.errors.extend(sub_report.errors)
            report.warnings.extend(sub_report.warnings)
        return
    if kind == "evaluate":
        lhs = cas.parse_expression(check["expression"], symbols)
        rhs = cas.parse_expression(check["answer"], symbols)
        if not cas.equivalent(lhs, rhs):
            report.errors.append(
                f"check: {check['expression']} is not equal to {check['answer']}"
            )
    elif kind == "solve":
        variable = symbols.get(check["variable"])
        if variable is None:
            report.errors.append(f"check: unknown variable {check['variable']!r}")
            return
        equation = cas.parse_equation(check["equation"], symbols)
        expected = cas.value_set(check["answer"], symbols)
        actual = cas.solution_set(equation, variable)
        if actual != expected:
            report.errors.append(
                f"check: solutions are {actual}, expected {expected}"
            )
    elif kind == "rounded":
        value = cas.parse_expression(check["value"], symbols)
        rounded = cas.parse_expression(check["rounded"], symbols)
        step = cas.parse_expression(check["to"], symbols)
        if not cas.is_nearest_multiple(value, rounded, step):
            report.errors.append(
                f"check: {check['rounded']} is not {check['value']} rounded to {check['to']}"
            )
    elif kind == "between":
        low = cas.parse_expression(check["low"], symbols)
        value = cas.parse_expression(check["value"], symbols)
        high = cas.parse_expression(check["high"], symbols)
        if not (low < value < high):
            report.errors.append(
                f"check: {check['value']} is not between {check['low']} and {check['high']}"
            )
    elif kind == "compare":
        relation = cas.RELATIONS.get(check["relation"])
        if relation is None:
            report.errors.append(f"check: unknown relation {check['relation']!r}")
            return
        result = relation(
            cas.parse_expression(check["lhs"], symbols),
            cas.parse_expression(check["rhs"], symbols),
        )
        if result != True:  # SymPy returns S.true, not the Python singleton
            report.errors.append(
                f"check: {check['lhs']} {check['relation']} {check['rhs']} is not true"
            )
    else:
        report.errors.append(f"check: unknown kind {kind!r}")


def verify_problem(problem: dict) -> Report:
    report = Report(problem_id=problem.get("id", "<unknown>"))
    symbols = cas.make_symbols(problem.get("symbols"))
    _verify_steps(problem, symbols, report)
    _verify_check(problem, symbols, report)
    return report


def verify_bank(path: Path) -> BankReport:
    data: dict[str, Any] = yaml.safe_load(Path(path).read_text(encoding="utf-8"))
    bank = BankReport(bank=str(path))
    for problem in data.get("problems", []):
        merged = dict(problem)
        merged.setdefault("symbols", data.get("symbols"))
        bank.reports.append(verify_problem(merged))
    return bank
