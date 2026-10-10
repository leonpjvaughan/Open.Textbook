"""Render an answer block from the problem bank.

The page never restates an answer by hand: `:::answers <bank>` is expanded at
build time from the same records CI verifies, so the reader and the proof cannot
drift apart.
"""

from __future__ import annotations


def _step_line(step: dict) -> str:
    maths = step.get("expr") or step.get("equation") or ""
    text = step.get("text")
    if text:
        return f"- {text}  \n  ${maths}$"
    return f"- ${maths}$"


def render_problem(problem: dict, number: int) -> str:
    statement = problem.get("statement", "").strip()
    answer = problem.get("answer_text") or problem.get("check", {}).get("answer", "")
    steps = problem.get("steps") or []

    lines = [f"**{number}.** {statement}"]
    if steps:
        lines.append("")
        lines.extend(_step_line(step) for step in steps)
    if answer:
        lines.append("")
        lines.append(f"**Answer:** {answer}")
    return "\n".join(lines)


def render_answer_block(problems: list[dict], summary: str = "Answers and concise solutions") -> str:
    body = "\n\n".join(render_problem(p, i + 1) for i, p in enumerate(problems))
    return (
        f'<details markdown="1">\n<summary>{summary}</summary>\n\n'
        f"{body}\n\n</details>"
    )
