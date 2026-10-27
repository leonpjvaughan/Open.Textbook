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

**Items 79–136 are closed,** each with its measurement and fix in
`.agents/todo-closed.md`; 137 is open. A new item goes at the number after the last
one, with its diagnosis, its fix and its own done-means. The
*interactive-aid backlog* — which figures and interactions a book still wants — is
`ideas.md`; it is a plan rather than a defect list, and it is written for the
author choosing what to build next.

**Not in the queue, and not forgotten.** Accepted limitations live where the check
that records them lives, not here: the booklets whose items cannot be parsed
(`tests/test_verify_coverage.py`), the specifications that publish no finer
granularity than a strand (`books/*/curriculum.yaml`), and the deferred chapter
rewrites ranked in `research/pedagogy-audit/README.md`. An item in this file is a
defect this repository can fix; those are decisions already taken.

## 137 — A worked example uses the period before the page teaches it

**What is wrong.** `gcse-physics` 4.2 (*Sound waves and waves for detection and
exploration*) never teaches the relation between period and frequency, then uses it
in its first worked example. Measured:

```
$ grep -n "period" books/gcse-physics/docs/Chapter\ 4/Section\ 4.2/Walkthrough/index.md
54:20 Hz. Calculate the period of this sound wave.
64:Here $T$ is the period in seconds and $f$ is the frequency in hertz.
```

The word appears only inside the example, and the objectives for the section
(line 19) name neither period nor $T$. The formula $T = 1/f$ is never stated, so a
reader meets an untaught relation at the first question — the chapter formula's P1
("teach first, then fade"), broken on this page. Section 4.1 teaches the wave
equation $v = f\lambda$ and not this one.

**The fix.** A short taught paragraph before Example 1: a period is the time for one
complete wave, a frequency is the number of waves each second, so $T = 1/f$ and
$f = 1/T$; then the example uses it. Add "calculate a period from a frequency" to the
objectives line. If the intent was that 4.1 should own this relation, move the
teaching there and keep 4.2's example as retrieval — either is fine, but the page
cannot open on an untaught formula.

**done means**

- [ ] 4.2 states $T = 1/f$ and names $T$ and $f$ before Example 1, or the teaching
      lives in 4.1 and 4.2 links to it
- [ ] the objectives line says the reader can calculate a period from a frequency
- [ ] `python -m textbook.lint gcse-physics` reports nothing
- [ ] the page still passes `scripts/check.sh`, and the worked answer 0.050 s is
      unchanged
