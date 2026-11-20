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

**Every item from 79 to 185, and 189, is closed,** each with its measurement, its fix, its
outcome and its ticked done-means in `.agents/todo-closed.md`. A new item goes at the number
after the last one, with its diagnosis, its fix and its own done-means. Four are open:
**186–188** from `research/review/maths-applied-and-numerical-methods-v.md`, and **190** from
the first `guidance:legacy` scan.

Two items were both filed as 182 by different passes; the label-and-font one is now **189**,
and the duplicate number is gone.

The *interactive-aid backlog* — which figures and interactions a book still wants — is
`ideas.md`; it is a plan rather than a defect list, and it is written for the author
choosing what to build next.

**Not in the queue, and not forgotten.** Accepted limitations live where the check
that records them lives, not here: the booklets whose items cannot be parsed
(`tests/test_verify_coverage.py`), the specifications that publish no finer
granularity than a strand (`books/*/curriculum.yaml`), and the deferred chapter
rewrites ranked in `research/pedagogy-audit/README.md`. An item in this file is a
defect this repository can fix; those are decisions already taken.

The five **design proposals** in `research/review/maths-applied-and-numerical-methods-ii.md`
are adopted as items **168–172**, listed in the paragraph above; `ideas.md` §12 holds the
argument and the citations, and the review holds the measurement. The two indexes in
`research/review/maths-applied-and-numerical-methods-iii.md` were items **173–174**, and that
review holds their measurement.

---

## 186 — Two figure tools hard-code one book's routes, so they cannot check any other book

**What is wrong.** `tools/src/commands/check-mobile.ts` holds
`ROUTES = ["/gcse-maths/higher/chapter-1/section-1.1/learn/", ".../practise/"]`, and the `kit`
command resolves its page the same way. Point either at a build of another book and every
request 404s into the static server's fallback, which is 980 px wide — so the measurement
reports the fallback and not the page.

```
$ node tools/dist/cli.js check-mobile /tmp/ma
FAIL 412px learn      page is 981px wide in a 980px viewport
FAIL 412px practise   page is 981px wide in a 980px viewport
FAIL 480px learn      page is 981px wide in a 980px viewport
FAIL 480px practise   page is 981px wide in a 980px viewport

$ node tools/dist/cli.js kit /tmp/ma
page.evaluate: TypeError: Failed to fetch dynamically imported module:
  http://textbook.local/gcse-maths/higher/assets/figures/kit.js
```

Same four failures on a `numerical-methods` build. Nothing is wrong with either book: a
390 px probe of all 26 pages of `maths-applied` and 15 of `numerical-methods` found
`scrollWidth === 390`, no overflowing table and no card table wider than its column. The
error is that the two commands that would have said so out loud are wired to one book, so
"does this book work on a phone" has never been answerable for the other eleven.

**The fix.** Derive the routes from the build the command was given, not from a book's
name: take one `learn` and one `practise` route from the built site's own page list
(`site/**/index.html`, or the collection manifest already read by `portal`), and let `--route`
override. `kit` should do the same — pick the first page that mounts a figure module. Keep
the gcse-maths routes as the default only when the given directory *is* that book.

**Done means**

- [ ] `node tools/dist/cli.js check-mobile <dir>` on any built book measures that book's
      pages; a build of `maths-applied` reports its own route names and no fallback page.
- [ ] `--route` selects a specific route, and a route that does not exist anywhere in the
      build is an error rather than a 980 px fallback.
- [ ] `node tools/dist/cli.js kit <dir>` passes on a `maths-applied` build.
- [ ] a test asserts that no command module contains a literal `"/gcse-maths/` route.
- [ ] `tools help --check` agrees with the new flags.

## 187 — `numerical-methods` draws five things and explains 77 methods in words

**What is wrong.** The book has 32 pages, 77 methods and 64 systems, and five figure
modules: `discriminant.js`, `energy-drift.js`, `kind-shapes.js`, `order-rate.js`,
`step-limit.js`. Each draws a *shape* — the three cases of a discriminant, the shape of a
kind, a step limit, an order rate, an error that does not shrink. Not one draws a *method*,
so the book's difficult ideas are carried entirely by prose and by displayed algebra: a
Newton step leaving the tangent and crossing the axis, a secant through two iterates, a
bracket that bisection halves, an iteration on a plane converging along one direction
because the others were divided away, a Krylov subspace slicing a spectrum, a Jacobi
splitting's diagonal and off-diagonal halves, a multigrid restriction between two grids, a
condition number turning a circle into an ellipse.

`maths-applied` has 11 modules for 16 pages. This book has 5 for 32, and they are the ones
that were easiest to draw rather than the ones the reading needs.

**The fix.** Draw the first four from that list, in the order a reader meets them, each
mounted on the class page whose paragraph currently describes it. The rule the review
established holds: the numbers come from the page's own model or from a kernel, never typed
to look right, and `claim()` declares the arithmetic. A figure whose claim is
pose-independent stays static; a methods page whose claim *is* the step wants one scrubber.

**Done means**

- [ ] four new modules in `books/numerical-methods/docs/assets/figures/`, each mounted by
      `:::figure` on the class page it explains, beside the paragraph that describes it.
- [ ] every number a figure prints comes from the page's model or a kernel, and
      `node tools/dist/cli.js readout site --verify` passes for the new claims.
- [ ] `canvas`, `kit` and `audit site --mobile` pass in both schemes, with no label under
      9 px at 390 px.
- [ ] no new colour: the drawings use `fig-*`/`text-*` and the `--tb-*` tokens only.
- [ ] the class pages that gain a figure lose the sentence that only described the picture.

## 188 — The book's front door is 91 screens long on a phone and cannot be skimmed

**What is wrong.** `/techniques/` is the alphabetical index of every method, and at 390 px
it measures 23,511 px tall, 5,291 words and 6 `<h2>` for 77 entries:

```
$ node /tmp/probe.mjs      # 390 px viewport, built site, offsetHeight of <main>
/techniques/   23511 px   5291 words   6 h2   77 entries
```

Its job is "find the method you want". The five family cards at the top do that job well.
The `:::method-index` block below them expands every entry into a full row, so a reader on
a phone scrolls ninety screens, cannot jump to a letter, and cannot narrow the list.

**The fix.** Keep the cards and the marker. Make the index skimmable at a narrow width:
either a letter rail that jumps to the entry's anchor, or per-letter `<details>` groups with
the first letter's group open — no script, because a reader with scripting off must still
reach every method. At a wide viewport the same markup reads as the current two columns.

**Done means**

- [ ] the default state of `/techniques/` at 390 px is measurably shorter than today, with
      the measurement in the closing note.
- [ ] every one of the 77 methods is still reachable and still carries its anchor, with
      scripting off, and the A–Z index still lists each name once.
- [ ] `:::method-index`'s hook and its test are updated together, and the marker's
      documentation in `engine/AGENTS.md` matches the new markup.
- [ ] no colour and no script is added; the page passes `audit site --mobile`.

## 190 — The first `guidance:legacy` scan found 13 leads, and none of them is measured

**What is wrong.** Modern Web Guidance is now pinned and its `legacy-scan` reports
`js` — 13 findings across three rules on this repository:

| Rule | Count | Where |
| --- | --- | --- |
| `js/copying-array-methods` | 11 | `assets/settings/settings.js:130`, `assets/figures/src/kit/draw.ts:1195` (and its built `assets/figures/kit/draw.js:1014`), `research/design/background-effects/{dots,field-2d,field-gl}.js`, and six more it truncates |
| `js/error-cause` | 1 | `tools/src/commands/types.ts:71` |
| `js/replace-children-innerhtml` | 1 | `engine/src/textbook/templates/page.html:145` |

None has been read, so none is known to be a defect: the pack's own rule says a
finding is a lead and its silence is no information. Two carry a visible cost
today — `innerHTML = ""` on the search results parses a string to clear a node,
and a `throw` without `cause` discards the `tsc` stderr that the catch already
has. The `copying-array-methods` ones are mostly `[...arr].sort()` where
`toSorted()` is the current spelling, and that is a readability change, not a
bug.

**The fix.** Read all 13, then split them three ways: fix the two that lose
information (`replaceChildren()`, `Error(..., { cause })`); change the array
copies that the rule is right about, skipping the built `kit/draw.js` because it
is generated from the `.ts` beside it; and write down why any that remain stay,
in the sentence the rule's own "keep when" needs. `guidance:legacy` stays out of
`check.sh`: it exits 0 on findings, so it is a report and not a gate.

**Done means.**

- [ ] every one of the 13 findings appears in the commit body with one line
      saying fixed or kept, and the kept ones say why;
- [ ] `research/design/background-effects/` is a research scratch area — say
      whether it counts, and if it does not, say that in the skill so the next
      scan is read against the same rule;
- [ ] `engine/src/textbook/templates/page.html` clears the results with
      `replaceChildren()` and the search box still works with a keyboard and a
      screen reader (`tools screenshot` of the search route before and after);
- [ ] `tools/src/commands/types.ts` throws with `cause`, so a failing `tsc` run
      carries stderr in the stack instead of one sentence;
- [ ] `tools types` is 0 and `scripts/check.sh` is green;
- [ ] the scan's finding count is lower and the difference is explained, not
      just observed.

## 191 — The solvers check says "commit what it writes" when the compiler was the wrong one

**What is wrong.** `solvers/rust-toolchain.toml` pins `1.99.1`, and the comment beside it
warns that the `.wasm` bytes depend on the compiler. On this machine `scripts/build-solvers.sh
--check` rebuilds with **1.100.0** and reports

```
build-solvers: the committed bundle is not what the source builds.
  Run scripts/build-solvers.sh and commit what it writes.
```

which is the one instruction that would break the contract: it invites committing bytes from
a compiler the repository did not pin. The cause is `mise`, which exports
`RUSTUP_TOOLCHAIN=stable` (`mise ls rust` → `stable`), and that environment variable wins over
`solvers/rust-toolchain.toml`. Reproduced on a clean worktree of `HEAD`, so it is not any
change in the working tree; CI has the pinned toolchain and its `--check` passes.

**The fix.** Have the script compare `rustc --version` inside `solvers/` with the channel in
`rust-toolchain.toml` before it builds, and say what is actually wrong —
`the build used 1.100.0, the repository pins 1.99.1: unset RUSTUP_TOOLCHAIN (mise sets it) or
install the pinned toolchain` — instead of "commit what it writes". A build with the wrong
compiler should refuse, not advise.

**Done means.**

- [ ] `scripts/build-solvers.sh --check` on this machine names the toolchain mismatch and
      exits non-zero **before** it compiles;
- [ ] with `RUSTUP_TOOLCHAIN` unset (or 1.99.1 installed) `--check` rebuilds and matches the
      committed bytes;
- [ ] `--verify` still works offline with no Rust at all;
- [ ] a test or the script's own selftest covers the refusal, so the message cannot regress
      into advice;
- [ ] CI is unchanged and still green.
