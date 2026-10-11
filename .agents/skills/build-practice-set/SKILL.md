---
name: build-practice-set
description: Design the practice in a textbook section — a closed-book warm-up, support that fades hint → next step → full working, an independent set of 8–15 items, interleaving and method-choice prompts — and back it with a SymPy-verified problem bank wired in by marker. Use when writing or revising Guided problems or Problems pages, or the YAML banks behind them.
---

# Build a practice set

Practice is the main event of a chapter. This skill covers the memory arc at the
item level: retrieval, fading, spacing, interleaving. Chapter-level design is
`author-textbook-chapter`; page voice is `write-textbook-prose`.

## The three tiers of support

**Warm-up: remember** — the first thing on every *Practise with help* page. One
or two closed-book recall items from **earlier** material, with corrective
feedback: if the answer is wrong, name what to revisit. It is a retrieval event,
not a warm-up in the sense of easy. Heading exactly `## Warm-up: remember`.

**Fade the support.** Each problem is attemptable first, then reveals in nested
`<details markdown="1">` blocks:

```
<details markdown="1">
<summary>Hint</summary>
…the nudge, not the method…
</details>

<details markdown="1">
<summary>Next step</summary>
…one concrete move to make…
</details>

<details markdown="1">
<summary>Full working</summary>
…one line of reasoning per line of algebra…
</details>
```

Each block must add something the previous one did not, and must be about
*this* problem. The hint names what to notice here; the next step performs this
problem's first concrete move. A **Next step** that repeats the **Full working**
collapses the fade. A hint or next step pasted identically onto many problems
fades nothing, even when the sentence is true. The audit script in
`verify-textbook-change` finds both.

**Independent set.** 8–15 items in increasing difficulty. Later sections mix in
earlier topics and add a method-selection item: "which method applies, and why?".
Mark Higher-only items **H** even on an otherwise Foundation page.

## Answers come from the bank, never from the page

A page carries two markers and no hand-written questions or answers:

```
:::problems <bank>
:::answers <bank>
```

`:::answers <bank>#<id>,<id>` selects records. Both expand at build time from
the same records CI verified, so the page and the proof cannot drift. A real
marker inside a code fence is left alone — never rely on a fenced marker
expanding.

## Write the bank

Banks live in `books/<id>/problems/<bank>.yaml`. The schema, the relations and
the verification limits are in `PROBLEMS.md`; read it before writing a step
chain. The traps that have cost us before:

- **Single-quote every string that contains maths.** Double-quoted YAML turns
  `\a` and `\f` into control characters and silently corrupts LaTeX.
- **No multi-line quoted scalars.** One value, one line.
- **Keep units, words and `%` out of the CAS fields.** `£`, `p` and commas will
  not parse; they belong in `statement`.
- **Declare assumptions** (`symbols: {x: {real: true}}`) or valid steps such as
  `sqrt(x**2) -> x` are rejected.
- **Write exact values, not rounded ones.** Decimals are rationalised before
  checking. Rounding needs a `rounded` or `between` check, not equality.
- **A non-equivalence declares itself.** Squaring, multiplying by an unknown,
  differentiating, substituting or integrating needs the right relation, not a
  fake `equivalent` step. Squaring and multiplying can add roots: use `implies`
  and check for extraneous roots explicitly.

## Verify

```bash
uv run python -m textbook.verify books/<id>/problems/   # per-problem report
uv run python -m pytest tests/ -q                       # bank + planted-error tests
```

The verifier proves the algebra, not the argument: a correct answer reached by an
unexpected route still passes, and the choice of method is not checked. Treat a
green verifier as necessary, not sufficient.

## Checks before claiming done

- Every `:::problems` and `:::answers` bank and slug resolves; the manifest
  coverage test in `tests/test_markers.py` proves it.
- No **Next step** repeats its **Full working**.
- Higher-only items carry **H** on the page.
- The verifier passes with the literal report shown, and `pytest` is green.
