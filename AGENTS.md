# AGENTS.md — repository instructions

**Open.Textbook**: interactive, static, backend-free textbooks sharing one engine. Read this,
then `books/<id>/AGENTS.md` for a book's boards, tier axis and pitfalls. `SHAPE.md` holds the
repository shape, `research/pedagogy.md` the evidence, `.agents/chapter-brief.md` the
per-chapter contract.

## Where to look

A nested `AGENTS.md` is additive and the closest wins; the Load column names a skill under
`.agents/skills/`.

| If you are… | Read | Load |
|---|---|---|
| Writing or revising a chapter | `books/<id>/AGENTS.md`, `.agents/chapter-brief.md` | `.agents/skills/author-textbook-chapter/SKILL.md` |
| Writing in `maths-applied` — modelling, not a course | `books/maths-applied/AGENTS.md` | `.agents/skills/write-textbook-prose/SKILL.md` |
| Editing book content | `books/<id>/AGENTS.md` | `.agents/skills/write-textbook-prose/SKILL.md` |
| Writing a problem bank | `books/AGENTS.md`, `PROBLEMS.md` | `.agents/skills/build-practice-set/SKILL.md` |
| Building a figure | `assets/AGENTS.md`, `ideas.md` | `.agents/skills/build-guided-figure/SKILL.md`, `.agents/skills/modern-web-guidance/SKILL.md` |
| Editing a booklet | `BOOKLETS.md`, `books/AGENTS.md` | — |
| Changing the shell or the renderer | `engine/AGENTS.md`, `SHAPE.md` | `.agents/skills/modern-web-guidance/SKILL.md` |
| Theming and CSS | `assets/AGENTS.md`, `themes/`, this file | `.agents/skills/modern-web-guidance/SKILL.md` |
| Verification and the test suite | `tests/AGENTS.md`, `scripts/check.sh` | `.agents/skills/verify-textbook-change/SKILL.md` |
| The deploy and DNS | `deploy/AGENTS.md`, `DEPLOY.md` | — |
| The research corpus | `research/AGENTS.md`, `research/pedagogy.md` | — |
| Adding a book | `SHAPE.md`, `books/AGENTS.md`, `collection.yaml` | — |
| Changing CI | `.github/AGENTS.md`, `scripts/check.sh` | — |

## The chapter formula

Interest and memory are separate tracks: every chapter runs an **interest** arc (trigger →
maintain → emerge → invite) and a **memory** arc (encode → retrieve → space → interleave);
every page serves one or both. Full procedure: `.agents/chapter-brief.md`.

- **P1 Teach first, then fade:** model → worked → partial → hint → independent; never open on
  an unguided task.
- **P2 Give the chapter a destination:** a problem solvable by the end; low-stakes first
  contact (predict, estimate, notice, never fail); 2–3 `Progress check` returns; resolution on
  Review.
- **P3 Relevance is constructed by the learner, not announced.**
- **P4 Retrieve over gaps:** each *Practise with help* page opens with 1–2 closed-book recalls,
  with feedback.
- **P5 Interleave, and make the learner choose the method:** "which method, and why?".
- **P6 Guide every investigation:** no sandboxes; **Predict → Test → Explain**, the reader
  writing the explanation.

One chapter problem, one learner-written relevance prompt and one guided investigation per
chapter, plus a bespoke tool only where the application **is** the maths (`tool:` in
`curriculum.yaml`). Hooks, applications and tools are at most ~¼ of a chapter. Every *Learn*
page carries a common-error callout (state it, show the contrast, re-check).

**Page contracts.** *Learn*: explicit teaching, one reasoning line per algebra line, a
misconception callout, ≤1 guided figure, DfE refs in front matter. *Practise with help*: a
closed-book warm-up, then hint → next step → full working. *Practise*: 8–15 items,
method-choice prompts later, Higher-only marked **H**, answers in one collapsed block.
*Review*: resolve the chapter problem, mixed practice, a reflection.

### A theorem stated without proof is a promise to write one

Every unproved result needs a page in the proof book, linked from the line that states it:

```markdown
A polygon can be split from one vertex into $n-2$ triangles, so its interior
angle sum is $(n-2)\times180^\circ$.

:::prove angles-in-a-polygon
```

The directive sits on its own line and expands to a **Prove it to me** link — a link only, no
script, so a reader with scripting off still reaches the page. `books/proofs/proofs.yaml`
records who is examined on each proof, so the same page reads *Prove it to me* or **Beyond
your course**. A definition is not a theorem and a convention is not a theorem; the test is
whether a reader could reasonably ask *why*.

## Voice and language

The reader is 14–16 of mixed attainment, often reading English as an additional language: the
mathematics should be the only difficulty, at a 12–14 reading age. Be calm, clear and
encouraging — never matey, jokey at the reader's expense, or a salesperson. Full guide:
`write-textbook-prose`.

- **Active voice, short sentences** (GOV.UK): ~15–20 words, one idea each.
- **Plain English; explain every term on first use.**
- **No negative contractions** (`cannot`, not `can't`) **or shaming words** (`obviously`,
  `clearly`, `simply`, `just`, `easy`).
- **No slang, idioms or cultural references.**
- **Board command words keep their exam meaning** (`Work out`, `show that`, `explain`, `give
  a reason`, `describe`, `compare`, `estimate`, `solve`, `sketch`); say when a question wants
  a reason.
- **Address the reader as `you`**; `we` is for reasoning together; never `one`.
- **Frame mistakes kindly**: a `Common error` is a trap to spot, not a failure.
- **UK English**: `factorise`, `metre`, `0.5` with a leading zero, `£1.20`.

Internal words never reach the reader: use the friendly names (`Learn`, `Practise with help`,
`Practise`, `Warm-up: remember`, `Progress check`, the chapter problem) and never print DfE
codes, `tier F`/`tier H`, `scaffold`, `hook`, `JSON` or `front matter`.

## Theming and figures

A **bundle** (`themes/<id>.yaml`) is the reader's light-and-dark experience, applied to
**every book**; a book contributes only its **subject tint** (`book.yaml → theme`), as
`--tb-book-*` values the bundle composes. Never put a surface or a font in a book, or a
subject's identity in a bundle.

**Nothing in a page, and nothing in a figure, may carry a colour.** Use the `fig-*` and
`text-*` classes and read the `--tb-*` tokens. **`fig-*` paints a shape and `text-*` paints
words**: in SVG that is `fill`/`stroke` against `color`, and a class setting only `color`
leaves an SVG `<text>` initial black. Never put `$...$` in runtime figure text. The icons are
the one fixed-colour exception. Figures are drawn through `assets/figures/kit.js` and may not
choose a number: `SIZE`, `label()`, `scale()` and the marks are the rules, checked in CI.
`assets/figures/` is also the shared figure library. `node tools/dist/cli.js audit site`
measures every figure in a browser, both schemes.

## Guidance, and where it stops

The web platform moves faster than model training data. **Modern Web Guidance** is pinned
(`modern-web-guidance@1.0.1`) and queried through `npm`, so a review is reproducible:

```bash
npm run guidance -- search "dialog light dismiss"
npm run guidance -- retrieve "light-dismiss-a-dialog"
```

It **teaches and does not decide**: nothing fails a build because a guide was not consulted,
`legacy-scan` exits 0 on findings, and its silence is not a pass. A recurring pattern becomes
a lint rule, which is the gate. Traps: `.agents/skills/modern-web-guidance/SKILL.md`.

## Definition of done

- the chapter index, every section's three pages, and the Review exist, and
  `grep -rl 'scaffold:stub' books/<id>/docs/Chapter <n>/` prints nothing;
- every answer is in a verified bank — `python -m textbook.verify books/<id>/problems/`
  reports `ok` for every file;
- `python -m textbook.lint` reports nothing for the book;
- the profile builds produce **no** `math-error` page, and figures go through `kit.js` with
  `SIZE`, `label()` and `scale()`;
- `python -m pytest tests/ -q` passes.

## Repository map

`SHAPE.md` has the full layout and `books/AGENTS.md` the per-book layout. A nested file stays
beside what it governs, because it is read when that directory is opened.

| Path | Role |
|---|---|
| `AGENTS.md` | cross-cutting rules, routing and map |
| `SHAPE.md`, `.agents/chapter-brief.md`, `PROBLEMS.md`, `BOOKLETS.md`, `DEPLOY.md`, `DECISIONS.md`, `ideas.md`, `.agents/todo.md`, `collection.yaml`, `wrangler.jsonc` | shape, brief, banks, booklets, deploy, decisions, backlog, queue, collection, Worker |
| `engine/`, `engine/AGENTS.md`, `assets/`, `assets/AGENTS.md` | engine and design system, and their rules |
| `tools/`, `tools/AGENTS.md` | every non-Python check and measurement |
| `solvers/`, `solvers/AGENTS.md`, `solvers/ABI.md`, `solvers/otkd/AGENTS.md` | the numerical kernels, one ABI, the build |
| `themes/`, `books/`, `books/AGENTS.md`, `books/gcse-maths/AGENTS.md`, `books/a-level-maths/AGENTS.md`, `books/gcse-physics/AGENTS.md`, `books/a-level-physics/AGENTS.md`, `books/ie-jc-maths/AGENTS.md`, `books/ie-lc-maths/AGENTS.md`, `books/ie-lc-applied-maths/AGENTS.md`, `books/ie-lc-physics/AGENTS.md`, `books/proofs/AGENTS.md`, `books/numerical-methods/AGENTS.md`, `books/maths-applied/AGENTS.md` | bundles; the books and their rules |
| `research/`, `research/AGENTS.md`, `scripts/`, `scripts/AGENTS.md`, `tests/`, `tests/AGENTS.md`, `deploy/`, `deploy/AGENTS.md`, `.github/`, `.github/AGENTS.md`, `.claude/`, `.serena/` | corpus, shell, tests, deploy, CI |

## Build and verify

```bash
uv sync && npm install      # without Node, maths silently degrades
python -m textbook.scaffold
python -m textbook.booklet
python -m textbook.portal
python -m textbook.lint
python -m textbook.verify
python -m textbook.plan
while read -r -a b; do python -m textbook.pipeline "${b[@]}"; done \
    < <(python -m textbook.plan --configs)   # both profiles, strict, no broken links
python -m textbook.search                   # one index over the assembled site
grep -rl 'math-error' site --include='*.html'   # must print nothing
pytest tests/ -q
node tools/build.mjs                            # compile the kit and the tools
node tools/dist/cli.js help                     # every check and measurement
node tools/dist/cli.js kit-pure                 # the kit's drawing and formatting layers
node tools/dist/cli.js types                    # the type ratchet (target 0)
node tools/dist/cli.js kit site                 # the kit's DOM contract, on a build
node tools/dist/cli.js canvas site              # every figure draws inside its viewBox
scripts/build-solvers.sh --verify               # the committed wasm, offline
scripts/build-otkd.sh --verify                  # the otkd bundle, offline
node scripts/check-solvers.mjs                  # replay every kernel selftest
node tools/dist/cli.js readout site --verify  # the arithmetic every figure declares
node tools/dist/cli.js audit site --mobile      # every figure at 390px; none below 9px
scripts/preview-themes.sh   # 6 bundles x 2 schemes x 3 routes, and both figure audits
scripts/check.sh            # everything CI enforces, in one call
python -m textbook.plan --generated   # files a drift check should diff
scripts/deploy.sh           # build, guard, deploy (see DEPLOY.md)
scripts/next-tag.sh         # release tags: yy.day.increment
scripts/protect-main.sh     # require the gate check on main (needs GitHub Pro)
```

## Branches and releases

When no human is present, do not block on a question tool; pause and leave the question. Stop
after two independent-review rejections and ask rather than looping.

`dev` takes the whole gate — banks, tests, voice, both tier builds, drift, actionlint — then
merges into `main`, which reruns the gate, releases and deploys to open-textbook.org. Release
and deploy require `refs/heads/main`, so they are skipped elsewhere by construction. A
workflow change is inert until it reaches `main`. Releases are tagged
`yy.<day of year>.<increment>` by `scripts/next-tag.sh` (tested in `tests/test_release.py`);
`DEPLOY.md` is the runbook.

## Capturing work

`.agents/todo.md` is the work queue: one item per change, ordered, the first being next. It
is ours, not the reader's, so the voice rules do not apply — but these do.

**Anything you notice and are not going to fix now goes there before you finish** — not in a
commit message, a reply that scrolls away, or your head. That includes a setting nobody
verified, a dead link, a false claim, a test that would have caught the bug you fixed by
hand.

Write it the way the file already reads: **what is wrong** with the evidence you measured (a
command and its output, or a primary source); **the fix**, concretely; and a **`done means`
checklist** anyone can verify. Add a **new numbered item**; keep the **ready-state gate
last**; **do not park work you should be doing**; **delete a closed item**.

## Toolchain

The build needs `uv sync` (engine, Markdown, PyYAML) and `npm install` (KaTeX, Pagefind);
without Node, maths silently degrades to `.math-error` spans.

`actionlint` runs shellcheck only when it is on `PATH` (true in CI, not locally). Install it
with `mise use -g shellcheck@0.11.0` and check `command -v shellcheck` first.

`solvers/` needs Rust with the `wasm32-unknown-unknown` and `x86_64-unknown-linux-musl`
targets (pinned in `solvers/rust-toolchain.toml`); no C/C++ toolchain. Without Rust,
`scripts/build-solvers.sh --verify` checks the committed wasm offline.

`tools screenshot` serves `site/` by Playwright request interception (extension-less routes
404). Set `PLAYWRIGHT_PATH` if `require("playwright")` does not resolve;
`tools/src/lib/browser.ts` also tries the local package and mise.

## Conventions

- **Tier:** `F` = Foundation and Higher, `H` = Higher only. Higher-only pages carry `tier: H`
  front matter; in-page extensions use `<!-- tier:h -->…<!-- /tier:h -->`. Each book declares
  its axis in `book.yaml → tier_axis`.
- **Figures:** author with the line-anchored `:::figure <slug>`; the hook expands it to
  `<maths-figure data-figure="<slug>">` and injects the loader only where needed. Modules live
  in `books/<id>/docs/assets/figures/`; `assets/figures/figures.js` is shared. Do not edit
  generated files or nav lists.
- **Maths:** write `$…$` and `$$…$$`, rendered to MathML at build time (KaTeX 0.19.0) with no
  runtime JavaScript; `aligned` is supported.
- **Theming:** never a colour in a page or a figure; use `fig-*`/`text-*` and `--tb-*`.
- **Glossary:** define a term once on its strand page and link to it.
