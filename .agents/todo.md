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
`.agents/todo-closed.md`; 136 is the open one, and the books it names are the work left. The
*interactive-aid backlog* — which figures and interactions a book still wants — is
`ideas.md`; it is a plan rather than a defect list, and it is written for the
author choosing what to build next.

**Not in the queue, and not forgotten.** Accepted limitations live where the check
that records them lives, not here: the booklets whose items cannot be parsed
(`tests/test_verify_coverage.py`), the specifications that publish no finer
granularity than a strand (`books/*/curriculum.yaml`), and the deferred chapter
rewrites ranked in `research/pedagogy-audit/README.md`. An item in this file is a
defect this repository can fix; those are decisions already taken.

## 136 — Most books' formulas name none of the symbols they use

**What is wrong.** The rule is now written down — "every symbol in a formula is
defined where the reader meets it" — and only the two reference books follow it.
The rest of the collection carries a large number of displayed formulas whose
letters are never named. Measured by counting `$$` pairs and table rows that open
with maths:

```
$ for b in books/*/; do ...; done
a-level-maths        2251 display formulas   98 table rows with maths
ie-jc-maths          2498                   32
ie-lc-maths          2158                   81
ie-lc-physics        1585                   10
ie-lc-applied-maths  1447                   37
a-level-physics       586                    2
gcse-physics          373                    0
gcse-maths            306                   10
proofs                174                    3
maths-applied          24                    0
numerical-methods      19                    3
```

`numerical-methods` is the one book whose formula tables now carry a **The symbols**
list (`techniques/index.md`, five sections). The others were written under the old
rule, so a formula like `$v = u + at$` reaches a 14-year-old with three letters and
no definitions.

**The fix.** Sweep book by book, starting with the four Irish books and
`a-level-maths`, whose pages are the formula-dense ones. For each displayed formula
add a `where …` clause, or one **The symbols** list under a table of formulas. A
symbol defined in the question stem of a worked example counts as defined, so the
sweep is over displayed formulas rather than every `$…$`. Editorial decisions —
which symbols a page should rename for consistency — are part of it, not a blocker.

**A screen, not a verdict.** A regex over every display formula and the four lines
either side of it reports how many have no `where`/`here`/`is the` nearby:

```
a-level-maths         1907 of 2251      ie-lc-maths        1662 of 2158
ie-jc-maths           2093 of 2498      ie-lc-physics      1206 of 1585
ie-lc-applied-maths   1172 of 1447      a-level-physics     466 of  586
gcse-physics           296 of  373      gcse-maths          271 of  306
proofs                  91 of  174      maths-applied         7 of   24
```

It over-reports, and the `proofs` pages show why: `laws-of-logarithms` scores 16 of
18, and it defines its base, its two inputs and its two proof letters in the opening
sentence and again where they are used. So treat the table as where to start reading,
not as a list of defects, and close a page by reading it.

**Progress.** `numerical-methods` is done: the A–Z's five tables carry a **The
symbols** list each (`techniques/index.md`), written 2026-10-27. `maths-applied` is
done: its 24 display formulas were read one by one, and eight clauses were added
where a letter was used before it was named — the two radii on the two-circles pages,
$\gamma$ on the camber rule, $J$ and $\Delta$ on the least-squares pages, $U$ and $V$
in the decomposition, $\lambda_i$ on the singular-value page, $k$ and $x_P$ in the
bush energy, $\mathbf F$ and $\mathbf M$ in the equilibrium statement, and $M$, $C$,
$\Phi_q$ and $Q$ in the equation of motion. The rest already defined their symbols in
the paragraph under the formula, which is the pattern the rule asks for. Left: the
four Irish books, `a-level-maths`, `a-level-physics`, `gcse-physics`, `gcse-maths` and
`proofs`, in that order.

**done means**

- [ ] every displayed formula in each book is followed by a definition of each
      symbol it uses, or sits under a table that has one
- [ ] no page defines the same letter twice for different things in one section
- [ ] `textbook.lint` reports nothing for each book as it is swept
- [ ] the inventory above is re-measured and each book's row is closed with its
      count, in `.agents/todo-closed.md`

