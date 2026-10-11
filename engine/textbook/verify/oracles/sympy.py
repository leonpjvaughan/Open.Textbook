"""The SymPy oracle: symbolic equivalence, solving and exact statistics.

Every kind owns one handler. The handlers only decide what a kind *means*;
the parsing, comparison and exact arithmetic come from :mod:`..cas`, the one
CAS boundary, imported unchanged. The kinds are the vocabulary ``PROBLEMS.md``
tabulates, and :data:`CHECKS` must match the ``sympy`` rows of the registry's
``KIND_ORACLE`` — the loader fails loudly if it does not.
"""

from __future__ import annotations

from .. import cas


def check_all(check, symbols, report, dispatch):
    """Compose sub-checks; each is dispatched to its own oracle."""
    for sub in check.get("checks", []):
        dispatch(sub)


def check_evaluate(check, symbols, report, dispatch):
    lhs = cas.parse_expression(check["expression"], symbols)
    rhs = cas.parse_expression(check["answer"], symbols)
    if not cas.equivalent(lhs, rhs):
        report.errors.append(
            f"check: {check['expression']} is not equal to {check['answer']}"
        )


def check_solve(check, symbols, report, dispatch):
    variable = symbols.get(check["variable"])
    if variable is None:
        report.errors.append(f"check: unknown variable {check['variable']!r}")
        return
    equation = cas.parse_equation(check["equation"], symbols)
    expected = cas.expected_set(check["answer"], symbols)
    domain = cas.parse_domain(check, symbols)
    try:
        actual = cas.solution_set(equation, variable, domain=domain)
    except (ValueError, NotImplementedError, TypeError) as err:
        report.warnings.append(f"check: solutions are unknown ({err}); not verified")
        return
    if cas.is_unknown_set(actual):
        report.warnings.append(
            f"check: solutions are unknown ({actual}); not verified"
        )
        return
    if actual != expected:
        report.errors.append(f"check: solutions are {actual}, expected {expected}")


def check_inequality(check, symbols, report, dispatch):
    variable = symbols.get(check["variable"])
    if variable is None:
        report.errors.append(f"check: unknown variable {check['variable']!r}")
        return
    try:
        if "inequalities" in check:
            relations = []
            for item in check["inequalities"]:
                relations.extend(cas.parse_inequalities(item, symbols))
        else:
            relations = cas.parse_inequalities(check["inequality"], symbols)
        actual = cas.inequality_set(relations, variable)
    except (ValueError, NotImplementedError, TypeError) as err:
        report.warnings.append(f"check: inequality solutions are unknown ({err})")
        return
    expected = cas.expected_set(check["answer"], symbols)
    if actual != expected:
        report.errors.append(
            f"check: inequality solves to {actual}, expected {expected}"
        )


def check_system(check, symbols, report, dispatch):
    try:
        equations = [cas.parse_equation(item, symbols) for item in check["equations"]]
    except ValueError as err:
        report.errors.append(f"check: {err}")
        return
    variables = [symbols.get(name) for name in check["variables"]]
    if any(variable is None for variable in variables):
        report.errors.append(f"check: unknown variable in {check['variables']}")
        return
    actual = cas.system_solutions(equations, variables)
    if actual is None:
        report.warnings.append("check: system solutions are unknown; not verified")
        return
    expected = cas.expected_solutions(check["answer"], variables, symbols)
    if actual != expected:
        report.errors.append(
            f"check: solutions are {cas.format_solutions(actual, variables)}, "
            f"expected {cas.format_solutions(expected, variables)}"
        )


def check_vector(check, symbols, report, dispatch):
    op = check.get("op")
    try:
        args = [cas.parse_expression(item, symbols) for item in check.get("args", [])]
        result = cas.vector_operation(op, args)
    except (ValueError, TypeError) as err:
        report.errors.append(f"check: cannot apply vector op {op!r}: {err}")
        return
    answer = cas.parse_expression(check["answer"], symbols)
    if not cas.matches(result, answer):
        report.errors.append(f"check: {op} gives {result}, expected {check['answer']}")


def _check_dsolve(check, symbols, report):
    spec = check["apply"]
    dependent = spec.get("dependent")
    independent = spec.get("independent")
    if not dependent or not independent:
        report.errors.append("check: dsolve needs 'dependent' and 'independent'")
        return
    equation = cas.parse_function_equation(
        check.get("equation") or check["expression"], dependent, independent, symbols
    )
    answer = cas.parse_function_expression(
        check["answer"], dependent, independent, symbols
    )
    if not cas.is_ode_solution(equation, answer, dependent, independent, symbols):
        report.errors.append(
            f"check: {check['answer']} does not satisfy the differential equation"
        )


def _check_rsolve(check, symbols, report):
    spec = check["apply"]
    dependent = spec.get("dependent")
    independent = spec.get("independent")
    if not dependent or not independent:
        report.errors.append("check: rsolve needs 'dependent' and 'independent'")
        return
    equation = cas.parse_function_equation(
        check.get("equation") or check["expression"], dependent, independent, symbols
    )
    answer = cas.parse_function_expression(
        check["answer"], dependent, independent, symbols
    )
    actual = cas.recurrence_solution(
        equation, dependent, independent, symbols, spec.get("initial")
    )
    if actual is None:
        report.warnings.append("check: recurrence solution is unknown; not verified")
        return
    if not cas.matches(actual, answer):
        report.errors.append(
            f"check: recurrence solves to {actual}, expected {check['answer']}"
        )


def check_apply(check, symbols, report, dispatch):
    # A check that names its operation, e.g. differentiate x**3 to get 3x**2.
    spec = check["apply"]
    if spec.get("op") == "dsolve":
        _check_dsolve(check, symbols, report)
        return
    if spec.get("op") == "rsolve":
        _check_rsolve(check, symbols, report)
        return
    expression = cas.parse_expression(check["expression"], symbols)
    answer = cas.parse_expression(check["answer"], symbols)
    if cas.is_indefinite_integral(spec):
        variable = symbols.get(check["variable"])
        if variable is None:
            report.errors.append("check: integrate needs a variable")
            return
        if not cas.is_antiderivative(answer, expression, variable):
            report.errors.append(
                f"check: {check['answer']} is not an antiderivative of {check['expression']}"
            )
        return
    try:
        result = cas.apply_operation(expression, spec, symbols)
    except (ValueError, TypeError, NotImplementedError) as err:
        report.errors.append(f"check: cannot apply {spec}: {err}")
        return
    if not cas.matches(result, answer):
        report.errors.append(
            f"check: applying {spec} to {check['expression']} does not give {check['answer']}"
        )


def check_ode(check, symbols, report, dispatch):
    dependent = check["dependent"]
    independent = check["independent"]
    equation = cas.parse_function_equation(
        check["equation"], dependent, independent, symbols
    )
    answer = cas.parse_function_expression(
        check["answer"], dependent, independent, symbols
    )
    if not cas.is_ode_solution(equation, answer, dependent, independent, symbols):
        report.errors.append(
            f"check: {check['answer']} does not satisfy the differential equation"
        )
        return
    variable = cas.parse_expression(independent, symbols)
    for condition in check.get("initial", []):
        point = cas.parse_expression(condition[0], symbols)
        target = cas.parse_expression(condition[1], symbols)
        if not cas.equivalent(answer.subs(variable, point), target):
            report.errors.append(
                f"check: answer does not satisfy the initial condition "
                f"{dependent}({point}) = {target}"
            )
            return


def check_approx(check, symbols, report, dispatch):
    value = cas.parse_expression(check["value"], symbols)
    target = cas.parse_expression(check["target"], symbols)
    tolerance = cas.parse_expression(check["tolerance"], symbols)
    relative = bool(check.get("relative"))
    if not cas.within_tolerance(value, target, tolerance, relative):
        kind = "relative" if relative else "absolute"
        report.errors.append(
            f"check: {check['value']} is not within {check['tolerance']} "
            f"({kind} tolerance) of {check['target']}"
        )


def check_rounded(check, symbols, report, dispatch):
    value = cas.parse_expression(check["value"], symbols)
    rounded = cas.parse_expression(check["rounded"], symbols)
    step = cas.parse_expression(check["to"], symbols)
    if not cas.is_nearest_multiple(value, rounded, step):
        report.errors.append(
            f"check: {check['rounded']} is not {check['value']} rounded to {check['to']}"
        )


def check_statistic(check, symbols, report, dispatch):
    try:
        actual = cas.statistic(
            check["data"],
            check["stat"],
            check.get("convention"),
            check.get("percentile"),
        )
    except (ValueError, TypeError) as err:
        report.errors.append(f"check: {err}")
        return
    expected = cas.parse_expression(check["answer"], symbols)
    if not cas.is_zero(actual - expected):
        report.errors.append(f"check: {check['stat']} is {actual}, expected {expected}")


def check_between(check, symbols, report, dispatch):
    low = cas.parse_expression(check["low"], symbols)
    value = cas.parse_expression(check["value"], symbols)
    high = cas.parse_expression(check["high"], symbols)
    if not (low < value < high):
        report.errors.append(
            f"check: {check['value']} is not between {check['low']} and {check['high']}"
        )


def check_compare(check, symbols, report, dispatch):
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


CHECKS = {
    "all": check_all,
    "evaluate": check_evaluate,
    "solve": check_solve,
    "compare": check_compare,
    "rounded": check_rounded,
    "between": check_between,
    "apply": check_apply,
    "statistic": check_statistic,
    "system": check_system,
    "inequality": check_inequality,
    "vector": check_vector,
    "ode": check_ode,
    "approx": check_approx,
}
