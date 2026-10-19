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
are checked against each other on every pass. One item is open, and two of them
say which single line is not met.

The *interactive-aid backlog* — which figures and interactions a book still wants —
is `ideas.md`. It is a plan rather than a defect list, and it is written for the
author choosing what to build next.

**Open, and the list is the index:**

- [ ] 83. §1.5's ladder is still the page's model — the package's compliant export
      carries one stiffness, and its kernel refuses to compile

**Not in the queue, and not forgotten.** Accepted limitations live where the check
that records them lives, not here: the booklets whose items cannot be parsed
(`tests/test_verify_coverage.py`), the specifications that publish no finer
granularity than a strand (`books/*/curriculum.yaml`), and the deferred chapter
rewrites ranked in `research/pedagogy-audit/README.md`. An item in this file is a
defect this repository can fix; those are decisions already taken.

---

## 83. §1.5's ladder is still the page's model — **open**

**What is wrong.** `books/numerical-methods`'s worked case and `Maths Applied` §1.5
quote a stiffness ladder (1.92°/1.94°/1.95° over the travel at 0.2/1/10/100 MN/m).
Those numbers come from the page's own equilibrium model. The package's compliant
export is vendored — `data/package/double-wishbone-compliant/out.js` — but it carries
**one** stiffness, and `otkd emit --format wasm` refuses it by name:

```
the WASM kernel cannot solve this model yet: it is 'equilibrium'; a compliant model
needs the equilibrium root-find, which is not compiled yet
```

The page says so in one sentence, which is the honest position, but it is not the
position the chapter's argument wants: a ladder generated from the export, checked
against the page's model, is two routes.

**The fix.** When the package can solve the compliant model, emit a study that sweeps
the stiffness (`study.yaml` already has the shape), vendor the export, and generate
§1.5's table from `sweep.frames[]` — then assert the page's model agrees with it to
the panel's rounding.

**Done means**

- [ ] `otkd emit examples/double-wishbone-compliant … --format wasm` succeeds, or the
      compliant study is emitted as a `js` export with a stiffness axis.
- [ ] §1.5's table is generated from the vendored export rather than typed.
- [ ] The page's model and the export agree to the rounding shown, and the panel says
      which is which.
- [ ] `grep -n "one stiffness" books/maths-applied/docs` prints nothing.
