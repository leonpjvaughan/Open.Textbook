---
name: verify-textbook-change
description: Gate a textbook change against everything this repository enforces — scaffold idempotence, verified problem banks, voice lint, tests, strict builds with no maths errors, and the figure/tier evaluation — plus a pedagogy audit for the checks CI cannot see. Use before claiming a chapter or page is done, or when asked whether textbook content is correct and complete.
---

# Verify a textbook change

Never assert completion. Run the gate, then report the literal commands and
their literal output. The build checks links, maths and structure — it does not
check mathematical correctness, so re-derive answers by hand as well.

## The full gate

```bash
scripts/check.sh
```

That is everything CI enforces, in one call. It runs, in order: generated-file
drift (`scaffold`, `booklet`, `portal`, `git diff --exit-code`), the problem-bank
verifier, the voice lint, `pytest` (including the figure-hook and tier-profile
evaluation), every profile build strict, and the `math-error` grep. Run it once at
the end.

## The targeted loop while authoring

```bash
uv run python -m textbook.scaffold   # the chapter's files must be SKIPPED, not rewritten
uv run python -m textbook.verify books/<id>/problems/
uv run python -m textbook.lint
uv run python -m textbook.pipeline --book <book> --profile <profile>
grep -rl 'math-error' site --include='*.html'   # must print nothing
uv run python -m pytest tests/ -q
```

Two failure modes the exit code does not catch:

- **KaTeX runs with `throwOnError`.** A bad expression becomes a `.math-error`
  span and the build still exits 0. Always grep. A raw `£` inside `$…$` is the
  usual cause.
- **A generated file is hand-edited.** `textbook.scaffold` rewrites a stub only
  while it carries `<!-- scaffold:stub -->`; if it rewrites an authored page, that
  page or the curriculum drifted. Fix the source (`curriculum.yaml`,
  `book.yaml`), never the generated output.

## The pedagogy audit

CI cannot see whether the teaching works. Run the bundled audit:

```bash
uv run python .agents/skills/verify-textbook-change/scripts/textbook-audit.py
```

It reports the lint's blind spots:

- **fade-collapse** — a *Next step* that repeats its *Full working*, so the
  support does not actually fade;
- **generic-fade** — the same *Hint* or *Next step* printed on many problems, so
  the tier adds nothing per problem. The hint should name what to notice in
  *this* item; the next step should perform its first concrete move;
- **opener heading drift** — a chapter that renames the ritual headings, so the
  reader does not meet one pattern;
- **relevance heading drift** — the same constructed-relevance prompt under
  several different headings across the book;
- **covers-in-prose** — curriculum codes printed to the reader instead of kept in
  front matter;
- **prose before the H1** and **duplicate paragraph** — structure and editing
  slips;
- **reading age** — mean sentence length and Flesch–Kincaid grade for prose
  alone.

Findings need judgement. Fix the content, do not lower the target. `--strict`
exits non-zero for use as a gate once the backlog is clear.

## What the gate proves, and what it does not

- **Proves:** the maths in every bank step, tier separation, link and marker
  integrity, voice and spelling rules, the figure and tier mechanisms.
- **Does not prove:** that the mathematics of a worked example outside a bank is
  correct; that a step is the best method; that the chapter problem is genuinely
  solvable at the point it is set; that the prose teaches. Those are review, and
  a hand re-derivation.

## Report

Give the literal command and its literal outcome for each gate. If something was
skipped, say so and say why. If a check cannot run in the environment (no Node,
no browser), name the degradation rather than claiming the full gate passed.
