# TODO

Working notes for the collection. One item per change. Items are ordered, not
dated: the first is next. This file is ours, not the reader's — the voice rules
in `AGENTS.md` do not apply here, but the engineering rules do.

**This file holds open items only.** Closed items are deleted (git history keeps their diagnosis). A new item goes at the next number, with its diagnosis, its fix and its own done-means. Open: **226, 227**.

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

## 227 — about 100px of blank space under "Contents" on a phone Learn page

**What is wrong.** Measured at 390px on
`/gcse-maths/higher/chapter-1/section-1.1/learn/`, light scheme: the "Contents" label
ends at y = 131 and the page title starts at y = 234 (Matrix). With `layouts.css`
emptied the title still starts about 100px below the label, so the space is the shell's,
not a layout's:

- `.nav-drawer__summary` is 68px tall for a 17px label: `shell.css` sets
  `min-height: 2.75rem` on a `content-box`, so the 44px floor sits inside 11.2px of
  padding on each side, and the label is at the top of it;
- the phone grid keeps the desktop `.layout { gap: 2rem }`, 32px between the closed
  drawer and `<main>`;
- `<main>` then adds its own top padding (32px bare, 22px plus a 14px margin in Matrix).

**The fix.** In `engine/src/textbook/css/shell.css`: give the summary
`box-sizing: border-box` (the 44px target holds, the dead band goes) and centre the label
in it; below 60rem set `.layout { row-gap: 0.75rem }`. Do not change the 24px target
floor.

**Done means**

- [ ] at 390px the summary is 44px tall and the label is vertically centred in it;
- [ ] the label-to-title distance on the page above is under 60px in every layout;
- [ ] `node tools/dist/cli.js targets site` still reports 0 errors, and
      `tests/test_layouts_browser.py` passes.
