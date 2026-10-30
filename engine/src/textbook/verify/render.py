"""Render an answer block from the problem bank.

The page never restates an answer by hand: `:::answers <bank>` is expanded at
build time from the same records CI verifies, so the reader and the proof cannot
drift apart.

A quantity is rendered as **plain text or HTML**, never ``$...$``. The maths hook
runs at build time, so an expression assembled for the reader would never reach
KaTeX; the booklet and the figures have both hit that trap. A physics answer
like ``0.0001 m^3`` is legible without any maths rendering at all.
"""

from __future__ import annotations

import html as html_lib

from .. import book as book_module

#: The units-oracle kinds whose answer is a quantity rather than an expression.
_QUANTITY_KINDS = frozenset(
    {"dimensions", "convert", "sigfigs", "uncertainty", "resolve", "gradient", "intercept", "area"}
)


def render_quantity(value, unit: str = "") -> str:
    """A quantity as plain text: ``render_quantity("0.0001", "m^3")``.

    No ``$...$`` is introduced. The unit is the author's string, shown exactly.
    """
    value_text = str(value).strip()
    unit_text = str(unit or "").strip()
    if value_text and unit_text:
        return f"{value_text} {unit_text}"
    return value_text or unit_text


def render_quantity_html(value, unit: str = "") -> str:
    """A quantity as HTML, with the unit marked but no colour and no ``$...$``.

    ``unit`` is escaped; the span classes are structural hooks for styling, and
    carry no meaning a theme has to know.
    """
    value_text = html_lib.escape(str(value).strip())
    unit_text = html_lib.escape(str(unit or "").strip())
    if unit_text:
        return (
            f'<span class="quantity">{value_text}'
            f' <span class="unit">{unit_text}</span></span>'
        )
    return f'<span class="quantity">{value_text}</span>'


def _answer_from_check(check: dict) -> str:
    """A units-oracle answer composed at build time, as plain text.

    Only a single value and unit are composed here; anything richer (a vector's
    components, a graph interval) is authored in ``answer_text``. A maths check
    falls through to the caller, which keeps rendering its raw answer string.
    """
    kind = check.get("kind")
    if kind not in _QUANTITY_KINDS:
        return ""
    if kind == "convert":
        return render_quantity(check.get("answer", ""), check.get("to", ""))
    if kind == "dimensions":
        answer = check.get("answer")
        if isinstance(answer, dict):
            return render_quantity(answer.get("value", ""), answer.get("unit", ""))
        if "si_value" in check:
            return render_quantity(check["si_value"], "")
        return ""
    if kind in ("sigfigs", "uncertainty"):
        answer = check.get("answer", check.get("result", ""))
        if answer == "" or answer is None:
            return ""
        return render_quantity(answer, check.get("unit", ""))
    return ""


def _step_line(step: dict) -> str:
    maths = step.get("expr") or step.get("equation") or ""
    text = step.get("text")
    if text:
        return f"- {text}  \n  ${maths}$"
    return f"- ${maths}$"


def rendered_answer(problem: dict) -> str:
    """The answer the reader will actually see, or ``""``.

    One function decides this, so the renderer and the verifier agree. It was
    inline in `render_problem`, which is how a record could verify and then print
    a question with nothing after it: a check of `kind: all` has no top-level
    `answer` — its values live in the sub-checks — so without `answer_text` there
    was nothing to render, and CI could not see it because the verifier passed.
    """
    check = problem.get("check") or {}
    answer = problem.get("answer_text") or _answer_from_check(check)
    if not answer and not isinstance(check.get("answer"), dict):
        answer = check.get("answer", "")
    return str(answer or "").strip()


def render_problem(problem: dict, number: int) -> str:
    label = (problem.get("answer_label") or problem.get("statement", "")).strip()
    check = problem.get("check") or {}
    answer = rendered_answer(problem)
    steps = problem.get("steps") or []

    lines = [f"**{number}.** {label}".rstrip()]
    if steps:
        lines.append("")
        lines.extend(_step_line(step) for step in steps)
    elif check.get("kind") == "structured" and check.get("points"):
        # The model answer CI checked for step presence and order. It is prose,
        # so it is rendered as written; no conclusion here is proved.
        lines.append("")
        lines.extend(f"- {point['text']}" for point in check["points"])
    if answer:
        lines.append("")
        # An answer with a newline in it carries structure — a list, a display
        # equation, a second paragraph. Putting it on the label's own line folds it
        # back into that paragraph, which is how a four-step method arrived as one
        # sentence with numbers in it. A single-paragraph answer stays inline.
        if "\n" in answer:
            lines.append("**Answer:**")
            lines.append("")
            lines.append(answer)
        else:
            lines.append(f"**Answer:** {answer}")
    return "\n".join(lines)


def render_problem_list(problems: list[dict]) -> str:
    """Numbered problem list, marked **H** for Higher-only questions."""
    lines = []
    for index, problem in enumerate(problems, 1):
        marker = " **H**" if problem.get("tier") == book_module.HIGHER_CODE else ""
        statement = problem.get("statement", "").strip().replace("\n", "\n   ")
        lines.append(f"{index}.{marker} {statement}")
    return "\n".join(lines) + "\n"


def render_answer_block(problems: list[dict], summary: str = "Answers and concise solutions") -> str:
    body = "\n\n".join(render_problem(p, i + 1) for i, p in enumerate(problems))
    return (
        f'<details markdown="1">\n<summary>{summary}</summary>\n\n'
        f"{body}\n\n</details>"
    )
