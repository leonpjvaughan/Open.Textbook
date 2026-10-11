# AGENTS.md — repository instructions

This repository builds a **collection of interactive, static, backend-free
textbooks** sharing one engine. GCSE Mathematics is the first book; GCSE Physics
and A-level Mathematics and Physics are planned. It is **Open.Textbook**
(https://github.com/leonpjvaughan/Open.Textbook).

`SHAPE.md` holds the repository shape and what a new book requires, `PLAN.md` the
authoring plan, `research/pedagogy.md` the evidence, `AGENT-BRIEF.md` the
per-chapter contract. Read this file first, then `books/<id>/AGENTS.md` for a
book's exam boards, tier axis and pitfalls.

## Where to look

A nested `AGENTS.md` is additive: it does not repeat the root, and the closest
file wins. The Load column names the portable `.agents/skills/`; Claude Code
reads them from `.claude/skills/`, projected with the
`agent-repository-conventions` helper rather than copied by hand.

| If you are… | Read | Load |
|---|---|---|
| Writing or revising a chapter | `books/gcse-maths/AGENTS.md`, `AGENT-BRIEF.md` | `.agents/skills/author-textbook-chapter/SKILL.md` |
| Editing book content | `books/AGENTS.md`, `books/gcse-maths/AGENTS.md` | `.agents/skills/write-textbook-prose/SKILL.md` |
| Writing a problem bank | `books/AGENTS.md`, `PROBLEMS.md`, `books/gcse-maths/AGENTS.md` | `.agents/skills/build-practice-set/SKILL.md` |
| Building a figure | `assets/AGENTS.md`, `books/AGENTS.md` | `.agents/skills/build-guided-figure/SKILL.md` |
| Editing a booklet | `books/AGENTS.md`, `BOOKLETS.md`, `assets/AGENTS.md` | — |
| Changing the shell or the renderer | `engine/AGENTS.md`, `SHAPE.md` | — |
| Theming and CSS | `assets/AGENTS.md`, `themes/`, this file | — |
| Verification and the test suite | `tests/AGENTS.md`, `scripts/AGENTS.md`, `scripts/check.sh` | `.agents/skills/verify-textbook-change/SKILL.md` |
| The deploy and DNS | `deploy/AGENTS.md`, `DEPLOY.md`, `.github/AGENTS.md` | — |
| The research corpus | `research/AGENTS.md`, `research/pedagogy.md` | — |
| Adding a book | `SHAPE.md`, `books/AGENTS.md`, `collection.yaml` | — |
| Changing CI | `.github/AGENTS.md`, `scripts/check.sh`, `SHAPE.md` | — |

## The chapter formula

Interest and memory are separate tracks, so every chapter runs an **interest** arc
(trigger → maintain → emerge → invite) and a **memory** arc (encode → retrieve →
space → interleave); every page serves one or both. Evidence:
`research/pedagogy.md`; procedure: `author-textbook-chapter`.

- **P1 Teach first, then fade:** model → worked → partial → hint → independent;
  never open on an unguided task.
- **P2 Give the chapter a destination, and return to it:** a problem solvable by
  the end; low-stakes first contact (predict, estimate, notice, never fail); 2–3
  `Progress check` returns; resolution on Review.
- **P3 Relevance is constructed by the learner, not announced.**
- **P4 Retrieve from memory, over gaps:** each *Practise with help* page opens
  with 1–2 closed-book recalls from earlier material, with feedback.
- **P5 Interleave, and make the learner choose the method:** blocked practice
  first, then mix in earlier topics — "which method, and why?".
- **P6 Guide every investigation or tool:** no sandboxes; **Predict → Test →
  Explain**, the reader writing the explanation.

Every *Learn* page carries a common-error callout (state it, show the contrast,
re-check); hooks, applications and tools together are at most ~¼ of a chapter;
and the weight is one chapter problem, one learner-written relevance prompt and a
guided investigation each chapter, with a bespoke tool only where the application
**is** the maths (`tool:` in `curriculum.yaml`).

**Page contracts.** *Learn*: explicit teaching, one reasoning line per algebra
line, a misconception callout, ≤1 guided figure, DfE refs in front matter.
*Practise with help*: a closed-book warm-up, then hint → next step → full
working. *Practise*: 8–15 items, method-choice prompts later, Higher-only marked
**H**, answers in one collapsed block. *Review*: resolve the chapter problem,
mixed practice, a reflection.

## Voice and language

The reader is 14–16 of mixed attainment, often reading English as an additional
language or finding reading hard: the mathematics should be the only difficulty,
at a 12–14 reading age. Be calm, clear and encouraging, like a good teacher beside
the reader — never matey, jokey at the reader's expense, or a salesperson. Full
guide: `write-textbook-prose`.

- **Active voice, short sentences** (GOV.UK): ~15–20 words, one idea each.
- **Plain English; explain every term on first use.**
- **No negative contractions** (`cannot`, not `can't`) **or shaming words**
  (`obviously`, `clearly`, `simply`, `just`, `easy`).
- **No slang, idioms or cultural references.**
- **Board command words keep their exam meaning** (`Work out`, `show that`,
  `explain`, `give a reason`, `describe`, `compare`, `estimate`, `solve`,
  `sketch`); say when a question wants a reason.
- **Address the reader as `you`**; `we` is for reasoning together; never `one`.
- **Frame mistakes kindly**: a `Common error` is a trap to spot, not a failure.
- **UK English**: `factorise`, `metre`, `0.5` with a leading zero, `£1.20`.

Internal words never reach the reader: use the friendly names (`Learn`,
`Practise with help`, `Practise`, `Warm-up: remember`, `Progress check`, the
chapter problem) and never print DfE codes, `tier F`/`tier H`, `scaffold`,
`hook`, `JSON` or `front matter` (full table: `write-textbook-prose`).

## Theming

A **bundle** (`themes/<id>.yaml`) is the reader's light-and-dark experience,
applied to **every book**; a book contributes only its **subject tint**
(`book.yaml → theme`), supplied as `--tb-book-*` values bundles compose in. Never
put a surface or a font in a book, and never a subject's identity in a bundle.

**Nothing in a page, and nothing in a figure, may carry a colour.** Use the
`fig-*` and `text-*` classes and read the `--tb-*` tokens. Never put `$...$` in
runtime figure text; the maths hook runs at build time. The icons are the one
fixed-colour exception. The cascade, the contrast invariant, reader preferences
and adding or previewing a bundle are in `assets/AGENTS.md`.

## Evidence

Do not overclaim. The synthesis says its causal evidence is mostly US, secondary
science or early-secondary maths, and that effects are not a ranking of methods;
keep claims to what the briefing supports. See `research/pedagogy.md`.

## Repository map

Every top-level directory is listed, so nothing in the tree is a surprise. The
per-book layout is in `books/AGENTS.md`.

| Path | Role |
|---|---|
| `AGENTS.md` | cross-cutting rules, routing and map |
| `SHAPE.md`, `PLAN.md`, `AGENT-BRIEF.md`, `PROBLEMS.md`, `BOOKLETS.md`, `DEPLOY.md`, `DECISIONS.md`, `todo.md`, `collection.yaml`, `wrangler.jsonc` | shape, plan, brief, banks, booklets, deploy, decisions, queue, collection, Worker |
| `engine/`, `engine/AGENTS.md`, `assets/`, `assets/AGENTS.md` | the engine and the design system, and their rules |
| `themes/`, `books/`, `books/AGENTS.md`, `books/gcse-maths/`, `books/gcse-maths/AGENTS.md` | bundles; the books and their rules |
| `research/`, `research/AGENTS.md`, `scripts/`, `scripts/AGENTS.md`, `tests/`, `tests/AGENTS.md`, `test/`, `deploy/`, `deploy/AGENTS.md`, `.github/`, `.github/AGENTS.md`, `.agents/`, `.claude/`, `.serena/` | corpus, scripts, tests, deploy, CI, skills |

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
grep -rl 'math-error' site --include='*.html'   # must print nothing
pytest tests/ -q
scripts/check.sh            # everything CI enforces, in one call
python -m textbook.plan --generated   # files a drift check should diff
scripts/deploy.sh           # build, guard, deploy (see DEPLOY.md)
scripts/next-tag.sh         # release tags: yy.day.increment
scripts/protect-main.sh     # require the gate check on main (needs GitHub Pro)
```

## Branches and releases

`dev` takes the whole gate — banks, tests, voice, both tier builds, drift,
actionlint — and nothing else, then merges into `main`, which reruns the gate,
releases and deploys to open-textbook.org. Release and deploy require
`refs/heads/main`, so they are skipped elsewhere by construction.

**A workflow change is inert until it reaches `main`:** the pipeline that runs is
the one on the branch being pushed, and release and deploy only run from `main`.
Editing `.github/workflows/verify.yml` on `dev` changes nothing until the merge;
pushing it straight to `main` deploys.

Releases are tagged `yy.<day of year>.<increment>` (`26.284.1` is the second on
day 284 of 2026), so two deploys a day cannot collide; the scheme is
`scripts/next-tag.sh`, tested in `tests/test_release.py`. `DEPLOY.md` is the
runbook for credentials, the domain, each stage and checking a deploy.

## Capturing work

`todo.md` is the work queue: one item per change, ordered, the first being next.
It is ours, not the reader's, so the voice rules do not apply — but these do.

**Anything you notice and are not going to fix now goes in `todo.md` before you
finish** — not in a commit message, a reply that scrolls away, or your head. That
includes the small things: a setting nobody verified, a dead link, a false claim,
a test that would have caught the bug you just fixed by hand.

Write it the way the file already reads: **what is wrong** with the evidence you
measured (a command and its output, or a primary source); **the fix**,
concretely; and a **`done means` checklist** anyone can verify. Add a **new
numbered item**, never append to an unrelated one; keep the **ready-state gate
last**; **do not park work you should be doing**; and **close items properly**,
keeping the diagnosis.

## Toolchain

The build needs `uv sync` (engine, Markdown, PyYAML) and `npm install` (KaTeX,
Pagefind); without Node, maths silently degrades to `.math-error` spans.

`actionlint` runs shellcheck only when it is on `PATH` (true in CI, not
locally), so a whole class of workflow error can pass locally. Install it with
`mise use -g shellcheck@0.11.0` and check `command -v shellcheck` first.

`screenshot.cjs` serves the built site by Playwright request interception, not a
bound port (no free port, no clash with a running server); a listening socket does
work here, so interception is a choice, not a workaround. A route maps to a file
under the given directory, appending `index.html` only for a trailing slash, so
an extension-less route 404s — and every capture then returns the same 404 page,
making a broken run look successful. Check the captures differ first; set
`PLAYWRIGHT_PATH` if `require("playwright")` does not resolve.

`tests/test_render_hooks.py` is the figure-hook and tier-profile evaluation,
driven from `pipeline.MARKDOWN_HOOKS`. The area-specific traps live in the file
that owns them — see the routing table and each nested `AGENTS.md`.

## Conventions

- **Tier:** `F` = Foundation and Higher, `H` = Higher only. Higher-only pages
  carry `tier: H` front matter; in-page extensions use
  `<!-- tier:h -->…<!-- /tier:h -->`. Each book declares its axis in
  `book.yaml → tier_axis` and its profiles.
- **Figures:** author with the line-anchored `:::figure <slug>`; the hook expands
  it to `<maths-figure data-figure="<slug>">` and injects the loader only where
  needed. Modules live in `books/<id>/docs/assets/figures/`;
  `assets/figures/figures.js` is shared. Do not edit generated files or nav lists.
- **Maths:** write `$…$` and `$$…$$`, rendered to MathML at build time (KaTeX
  0.19.0) with no runtime JavaScript; `aligned` is supported.
- **Theming:** never a colour in a page or a figure; use the `fig-*`/`text-*`
  classes and `--tb-*`. See **Theming**.
- **Glossary:** define a term once on its strand page and link to it.
