"""Verify a problem bank with a computer-algebra system.

Each problem declares an independent ``check`` of its final answer and, where it
has a worked solution, a chain of ``steps``. The verifier proves:

* every consecutive pair of steps is related as declared (equivalent
  expressions, or equal solution sets); and
* the final answer satisfies the independent check.

It returns a report rather than raising, so the caller decides whether a failure
is a test failure or an authoring warning.

Which oracle proves a check is chosen by its ``kind``: the registry in
:mod:`textbook.verify.oracles` owns that table, and ``book.yaml → oracles`` (or a
bank's own ``oracles``) says which oracles a bank may use. This module keeps the
reports, the step relations and the delegation.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Iterable

import yaml

from ..book import book_for_bank
from . import cas, render
from .oracles import select as select_oracles
from .oracles import verify_check


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
            parsed.append(("expr", cas.parse_expression(step["expr"], symbols), step))
        elif "equation" in step:
            parsed.append(("equation", cas.parse_equation(step["equation"], symbols), step))
        else:
            report.errors.append(f"step {index}: needs 'expr' or 'equation'")
    return parsed


def _verify_steps(problem: dict, symbols: dict, report: Report) -> None:
    parsed = _parsed_steps(problem, symbols, report)
    default_relation = problem.get("step_relation", "equivalent")
    variable_name = (problem.get("check") or {}).get("variable")
    variable = symbols.get(variable_name) if variable_name else None

    for index in range(len(parsed) - 1):
        (kind_a, a, _), (kind_b, b, step_b) = parsed[index], parsed[index + 1]
        # The relation belongs to the step it produces, so a single solution can
        # mix equivalent rewrites with, say, a differentiation or a substitution.
        relation = step_b.get("relation", default_relation)
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
        elif relation == "apply":
            # The step names the operation that produced it, e.g. differentiate.
            spec = step_b.get("apply")
            if not spec:
                report.errors.append(f"{label}: relation 'apply' needs an 'apply' block")
                continue
            try:
                if cas.is_indefinite_integral(spec):
                    if variable is None:
                        report.errors.append(f"{label}: integrate needs a variable")
                        continue
                    if not cas.is_antiderivative(b, a, variable):
                        report.errors.append(f"{label}: is not an antiderivative of the previous step")
                else:
                    result = cas.apply_operation(a, spec, symbols)
                    if not cas.matches(result, b):
                        report.errors.append(
                            f"{label}: applying {spec} does not give the next step"
                        )
            except (ValueError, TypeError, NotImplementedError) as err:
                report.errors.append(f"{label}: cannot apply {spec}: {err}")
        else:
            if kind_a != "expr" or kind_b != "expr":
                report.errors.append(f"{label}: equivalence steps must be expressions")
                continue
            if not cas.equivalent(a, b):
                report.errors.append(f"{label}: expressions are not equivalent")


def _verify_check(problem: dict, symbols: dict, report: Report, selection) -> None:
    check = problem.get("check")
    if not check:
        report.warnings.append("no independent check declared")
        return
    verify_check(check, symbols, report, selection)


def _verify_problem(problem: dict, selection) -> Report:
    report = Report(problem_id=problem.get("id", "<unknown>"))
    symbols = cas.make_symbols(problem.get("symbols"))
    _verify_steps(problem, symbols, report)
    _verify_check(problem, symbols, report, selection)
    return report


def _verify_renders(problem: dict, report: Report) -> None:
    """A *bank* record must render an answer, or the page and its proof drift.

    The reader's answers block is built from the same records CI verifies, so a
    record that verifies and renders nothing puts a question on the page with no
    answer under it — and nothing in CI can see it, because the verifier passed.
    Six records in the GCSE banks were doing exactly this, all of them checks whose
    answer lives inside the check rather than in `answer_text`.

    A `structured` check is the one honest exception: its model answer is prose
    rendered from its points, so a conclusion is deliberately not asserted.
    """
    if render.rendered_answer(problem):
        return
    check = problem.get("check") or {}
    if check.get("kind") == "structured" and check.get("points"):
        return
    report.errors.append(
        "renders no answer: add 'answer_text'. A check of kind 'all' has no "
        "top-level answer, so the reader would see the question and nothing else."
    )


def verify_problem(problem: dict, oracles: Iterable[str] = ("sympy",)) -> Report:
    return _verify_problem(problem, select_oracles(oracles))


def _declared_oracles(data: dict, path: Path, override: Iterable[str] | None):
    """A bank's own ``oracles`` override, else its book's, else SymPy."""
    if override is not None:
        return override
    declared = data.get("oracles")
    if declared:
        return declared
    book = book_for_bank(path)
    return book.oracles if book is not None else ("sympy",)


def verify_bank(path: Path, oracles: Iterable[str] | None = None) -> BankReport:
    path = Path(path)
    data: dict[str, Any] = yaml.safe_load(path.read_text(encoding="utf-8"))
    selection = select_oracles(_declared_oracles(data, path, oracles))
    bank = BankReport(bank=str(path))
    for problem in data.get("problems", []):
        merged = dict(problem)
        merged.setdefault("symbols", data.get("symbols"))
        report = _verify_problem(merged, selection)
        # A bank is what a page renders, so the rule belongs here rather than in
        # `_verify_problem`: a verifier test can check the mathematics of a record
        # it made up, but a bank whose record renders no answer would print a
        # question with nothing under it.
        _verify_renders(merged, report)
        bank.reports.append(report)
    return bank
