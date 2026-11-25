# TODO

Working notes for the collection. One item per change. Items are ordered, not
dated: the first is next. This file is ours, not the reader's — the voice rules
in `AGENTS.md` do not apply here, but the engineering rules do.

**This file holds open items only.** Closed items are deleted (git history keeps their diagnosis). A new item goes at the next number, with its diagnosis, its fix and its own done-means. Open: **226, 228**.

Accepted limitations live where the check that records them lives (`tests/test_verify_coverage.py`, `books/*/curriculum.yaml`), not here.

---

## 226 — a worked example has no element of its own, so no layout can set it off

**What is wrong.** A worked example is a bare paragraph whose first word is bold,
followed by its working as sibling paragraphs and display maths:

```
$ grep -rho '<p><strong>Example [0-9]*\.\?</strong>' site --include=index.html | wc -l
4144        # in 1058 pages; source: 609 files under books/*/docs with **Example N
```

`site/gcse-maths/higher/chapter-1/section-1.1/learn/index.html`: `<p><strong>Example
1.</strong> Which is larger, …?</p>` then `<p>The ones digit decides it: …</p>` then
`<p><strong>Example 2.</strong> …`. Nothing marks where an example ends, so the
Notebook layout (`assets/stylesheets/layouts/notebook.css`) cannot indent an example
behind a rule as it does callouts, and the layout contract forbids `:has()` tricks on
`display`. The content markup must not change by hand across 609 files.

**The fix.** A build hook, not an edit to the books: in the Markdown pipeline, wrap a
paragraph that opens with `<strong>Example N.</strong>` and the blocks up to the next
heading, example or callout in `<section class="worked-example">` (no colour, no
script). Base CSS leaves it unstyled; Notebook then indents `.worked-example`.

**Done means**

- [ ] the Section 1.1 Learn page above has its three examples each inside one
      `.worked-example` element, and the page text is byte-identical otherwise;
- [ ] `grep -rho '<p><strong>Example' site --include=index.html` counts only paragraphs
      inside a `.worked-example`;
- [ ] a pytest renders a fixture with two examples, a callout and a heading and asserts
      where each wrapper closes;
- [ ] `notebook.css` indents `.worked-example` and `tests/test_layouts_browser.py` still
      passes for every layout.

## 228 — the measure is stated as "45 to 75" in one place and "70 to 78" in another

**What is wrong.** `assets/AGENTS.md` ("Layouts") says a layout keeps "a 45 to 75ch
measure", and a review asked `tests/test_layouts_browser.py` to hold 90% of full lines at
45 to 75 characters. `tests/test_measure.py` pins the median at 70 to 78 characters
(`AT_1280`), and `--tb-measure: 62ch` was tuned to it. Measured with every full line of
every paragraph, callouts included, on `/gcse-maths/higher/chapter-1/section-1.1/learn/`
at 1280, Matrix: 22 lines, 66 to 78 characters, median 73; 4 of 22 (18%) are 76 to 78,
so a 75 ceiling fails the unchanged default. The layouts test now uses `AT_1280[1]` (78)
as its ceiling, so the two tests agree, but the prose in `assets/AGENTS.md` does not.

**The fix.** Decide one range. Either keep 70 to 78 characters and reword
`assets/AGENTS.md` to say characters a line, not `ch`; or narrow `--tb-measure` (in
`extra.css` and `portal.css`) until 90% of lines are at most 75, and lower
`AT_1280` to match.

**Done means**

- [ ] `assets/AGENTS.md`, `tests/test_measure.py` and `tests/test_layouts_browser.py`
      state the same range, in characters a line;
- [ ] both browser tests pass on a fresh build.
