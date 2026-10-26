# TODO

Working notes for the collection. One item per change. Items are ordered, not
dated: the first is next. This file is ours, not the reader's — the voice rules
in `AGENTS.md` do not apply here, but the engineering rules do.

**This file holds open items only.** `.agents/todo-closed.md` holds every closed
one **in full** — the diagnosis is the valuable part: what was wrong, how it was
measured and what fixed it. A one-line summary keeps the number and deletes the
reasoning, so nothing is compressed on the way across and nothing is deleted.

**An item is here because it is still true.** Before closing one, run its own
done-means; an item whose heading says done and whose checklist does not is the
failure this file has had twice, so the list below, the headings and the boxes
are checked against each other on every pass.

**Items 79–123 are closed,** each with its measurement and fix in
`.agents/todo-closed.md`; 124 below is the only open one. The
*interactive-aid backlog* — which figures and interactions a book still wants — is
`ideas.md`; it is a plan rather than a defect list, and it is written for the
author choosing what to build next.

**Not in the queue, and not forgotten.** Accepted limitations live where the check
that records them lives, not here: the booklets whose items cannot be parsed
(`tests/test_verify_coverage.py`), the specifications that publish no finer
granularity than a strand (`books/*/curriculum.yaml`), and the deferred chapter
rewrites ranked in `research/pedagogy-audit/README.md`. An item in this file is a
defect this repository can fix; those are decisions already taken.

## 124 — Every table renders on the browser's 1px cell padding

**What is wrong.** No stylesheet here styles `table`, `th` or `td`:

```
$ grep -rn "md-typeset table\|md-typeset td\|md-typeset th" assets engine --include=*.css
assets/stylesheets/extra.css:767:  .md-typeset table,        # a print-media rule only
assets/stylesheets/extra.css:783:  .md-typeset thead {       # a print-media rule only
```

So the user-agent default is what every reader sees. Measured on the built site
(computed style of a `td` and a `th` in `site/numerical-methods/`):

```
{ "td": { "padding": "1px", "text-align": "start" },
  "th": { "padding": "1px", "text-align": "center" } }
```

Text-heavy tables survive 1px — the A–Z and the nine-kinds table are separated by
their own column width and line height. A table of short numbers is not: the
worked table on `reading-the-class` printed `1 0 1 −4` as one blob, and the fix
that shipped was local — the three coefficients were merged into one cell
(`$1$, $0$, $1$`) so the reader can see where each number ends. That is a
workaround for a collection-wide gap.

**The fix.** Give cells padding in `assets/stylesheets/extra.css`, for every book,
then re-check the tables already tuned against the current spacing:
`books/numerical-methods/docs/assets/stylesheets/book-local.css` sets explicit
column widths for the A–Z at `min-width: 1024px`, and padding takes content space
out of every column, so those widths will need re-measuring rather than assuming.

```css
.md-typeset table th,
.md-typeset table td { padding: 0.4em 0.6em; }
```

**done means**

- [ ] a built page's `td` computes to padding other than `1px`
- [ ] the A–Z's five tables still fit at 1024px and 1280px: no `.table-scroll`
      that scrolls at desktop width, and `node tools/dist/cli.js check-mobile site`
      reports 0 errors
- [ ] the worked table on `reading-the-class` reads as separate columns in a light
      and a dark capture, with and without the merged coefficient cell
- [ ] `scripts/check.sh` passes
