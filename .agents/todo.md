# TODO

Working notes for the collection. One item per change. Items are ordered, not
dated: the first is next. This file is ours, not the reader's — the voice rules
in `AGENTS.md` do not apply here, but the engineering rules do.

**This file holds open items only.** Closed items are deleted (git history keeps their diagnosis). A new item goes at the next number, with its diagnosis, its fix and its own done-means. Open: **230, 231, 232**.

Accepted limitations live where the check that records them lives (`tests/test_verify_coverage.py`, `books/*/curriculum.yaml`), not here.

---

## 230 — a-level-maths 11.5 Example 3 breaks its own sentence around a proof link

**What is wrong.** In `books/a-level-maths/docs/Chapter 11/Section 11.5/Walkthrough/index.md`
the working says

```
162  The squared deviations from the mean are
163
164  The mean is the value that makes the total squared deviation smallest, which is
165  why the deviations are measured from it.
166
167  :::prove mean-minimises-squared-error
168
169  $$
170  16,\ 4,\ 0,\ 4,\ 16.
171  $$
```

The sentence that announces the values is separated from them by two sentences and a
link, so the reader holds an unfinished sentence across a paragraph and an aside. This is
a content fault on its own; the `examples.py` boundary bug only decides whether the aside
lands inside or outside the wrapper.

**The fix.** In that file, leave "The squared deviations from the mean are" immediately
followed by the display of $16, 4, 0, 4, 16$, and move the two-sentence note and
`:::prove mean-minimises-squared-error` after the final display of the example (after
the $\sigma$ line). No mathematics changes.

**Done means**

- [ ] the source has the announcing sentence, a blank line and the values, with no
      intervening prose or directive;
- [ ] the built Section 11.5 Walkthrough keeps the sentence, the values and the proof
      link inside one `.worked-example` section, in that order;
- [ ] `uv run python -m textbook.lint` reports nothing for `a-level-maths`.

## 231 — `mathlt` rewrites `<` inside inline code spans and `\text{...}`

**What is wrong.** `hooks/mathlt.py:27` rewrites every `$...$` and `$$...$$` outside
fences. `transform_outside_fences` skips fenced blocks only, not inline code spans, and
`_lt` rewrites `<` inside `\text{...}`, where `\lt` is not valid in text mode:

```
$ uv run python -c 'from textbook.hooks import mathlt; print(repr(mathlt.transform(r"Code `$a<b$` stays.")))'
'Code `$a\\lt b$` stays.'
$ uv run python -c 'from textbook.hooks import mathlt; print(repr(mathlt.transform(r"Math $\\text{a<b}$ stays.")))'
'Math $\\text{a\\lt b}$ stays.'
$ node -e 'require("katex").renderToString("\\text{a\\lt b}", {throwOnError:true})'
KaTeX parse error: Undefined control sequence: \lt at position 8: \text{a̲l̲t̲ ̲b}
```

There is no corpus hit today: `grep -rn '\\text{[^}]*<' books --include="*.md" | wc -l`
prints 0, and no backtick span contains `$...<...$`. This is a trap for the next author,
not a live page.

**The fix.** In `hooks/mathlt.py`, skip inline code spans (a backtick run and its matching
run, which may be shorter than a fence) before the maths regexes run, and rewrite `<`
inside `\text{...}` as `\textless`, which KaTeX accepts in text mode (`\text{a\textless b}`
renders). Keep `\lt` everywhere else. Add tests to `tests/test_mathlt.py` for both cases,
including a KaTeX render with `throwOnError: true`.

**Done means**

- [ ] ``mathlt.transform("Code `$a<b$` stays.")`` returns the input unchanged;
- [ ] `mathlt.transform(r"$\text{a<b}$")` returns `$\text{a\textless b}$`, and KaTeX
      renders it with `throwOnError: true`;
- [ ] a test fails if either guard is removed.

## 232 — declare the ready state

**Not a change: the gate.** The collection is ready to release when items 230–231 are
closed and their boxes are ticked, and not before — a checklist that is mostly ticked has
not been done.

**Done means**

- [ ] every box in items 230–231 is ticked, or the item is explicitly deferred here
      with a reason;
- [ ] `scripts/check.sh` passes on `dev`;
- [ ] both profile builds leave no `markdown="1"` page and no `math-error` page;
- [ ] `main` is the commit that is live, and a release exists for it.
