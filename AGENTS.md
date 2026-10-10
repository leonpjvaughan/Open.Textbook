# AGENTS.md — repository instructions

This repository builds an interactive, static, backend-free **GCSE Mathematics**
textbook. Authoritative planning lives in `PLAN.md`; the evidence behind the
teaching design lives in `PEDAGOGY.md`; the per-chapter authoring contract is
`AGENT-BRIEF.md`. This file is the operative summary every agent must follow.

## The chapter formula

The evidence briefing (`../edu-research/summary/build/pedagogy.pdf`) finds that
**interest and memory are separate tracks — neither automatically delivers the
other.** Every chapter therefore runs two arcs at once, and every page serves one
or both.

**Interest arc:** Trigger → Maintain → Emerge → Invite.
**Memory arc:** Encode → Retrieve → Space → Interleave.

### Six principles

- **P1 — Teach first, then fade the support.** Model the method with narrated
  reasoning, then withdraw support. Worked example → partial example → hint →
  independent. Never open with an unguided task a novice cannot start.
- **P2 — Give the chapter a destination and return to it.** Every chapter opens
  with an **anchor problem** that is genuinely solvable by the chapter's end.
  First contact is low-stakes (predict/estimate/notice, never fail). Return at
  2–3 checkpoints tied to specific sections; resolve it on the Review page.
- **P3 — Relevance is constructed by the learner, not announced.** Offer short,
  maths-tied contexts, then ask the learner to write their own connection
  ("where would this help you or someone you know?"). Never just assert that a
  topic is useful.
- **P4 — Retrieve from memory, over gaps.** Every Guided problems page opens with
  1–2 closed-book recall items from *earlier* material, with corrective feedback.
- **P5 — Interleave, and make the learner choose the method.** After enough
  blocked practice to learn a new tool, mix it with earlier topics and require
  "which method applies, and why?".
- **P6 — Guide every investigation or tool.** No unguided sandboxes. Every
  interactive follows **Predict → Test → Explain**, and the explanation is
  prompted, not shown.

Two rules keep the formula honest:

- **Surface misconceptions.** At least one "common error" callout per
  Walkthrough: state the error, show the contrast, re-explain with a check.
- **Budget the extras.** Hooks, applications and tools together are at most
  about a quarter of a chapter. Practice is the main event; a lively activity
  does not substitute for teaching and understanding.

### Chapter anatomy

```
Chapter <n>/
  index.md        # anchor problem, "by the end you'll…", roadmap, relevance prompt
  Section <n.m>/
    Walkthrough/index.md
    Guided problems/index.md
    Problems/index.md
  Review/index.md # anchor resolution, interleaved mixed practice, retrieval
```

### Page contracts

- **Walkthrough** — prerequisites, objectives, explicit teaching, worked
  examples with one line of reasoning per line of algebra, a misconception
  callout, at most one guided figure, and a "you should now be able to…"
  checklist. Name the DfE refs it delivers.
- **Guided problems** — retrieval starter (P4), then problems that fade
  hint → step → full working through nested `<details>`. At least one item from
  an earlier section or chapter.
- **Problems** — 8–15 independent items in increasing difficulty. In later
  sections, mixed with earlier topics (P5) and with method-selection prompts.
  Higher-only items marked **H**. Answers and concise solutions in one collapsed
  block. Low stakes; errors inform further teaching.
- **Review** — resolve the anchor problem; interleaved mixed practice across the
  chapter and earlier chapters; a reflection on what the learner can now do.

The weight is fixed: anchor thread + one learner-constructed relevance prompt +
guided investigation(s) per chapter; a bespoke application tool only where the
application *is* the maths (`tool:` in `curriculum.yaml`).

## Evidence

Do not overclaim. The synthesis is explicit that its causal evidence is mostly
US, secondary science or early-secondary maths, and that effects are not a
ranking of methods. Keep the claims to what the briefing supports; see
`PEDAGOGY.md` for the mapping and the primary sources.

## Repository map

| Path | Role |
|---|---|
| `curriculum.yaml` | Source of truth: chapters, sections, tier, DfE refs, pedagogy metadata |
| `Docs/` | Canonical content (marimo markdown). Never edit generated files by hand |
| `renderers/mkdocs/` | MkDocs build: `base.yml`, generated configs, hooks, assets |
| `Docs/assets/figures/` | Tier-1 pure-JS figures (each exports `mount(el)`); `figures.js` is the loader |
| `scripts/` | `scaffold_docs.py`, `fetch_sources.sh`, `katex-render.mjs`, `screenshot.cjs` |
| `problems/` | Verifiable problem bank, one YAML per chapter |
| `booklet/` | Formula-and-tables data (source of truth) and its build step |
| `Docs/assets/booklet/` | Generated booklet JSON and the `<formula-booklet>` widget |
| `verification/` | SymPy CAS boundary, bank loader and verifier |
| `tests/` | Bank verification plus planted-error tests |
| `PROBLEMS.md` | Problem-bank schema and verification limits |
| `test/` | The figure-hook and tier-profile evaluation (24 assertions) |
| `AGENT-BRIEF.md` | Per-chapter sub-agent brief |

## Build and verify

```bash
uv sync                                   # Python toolchain (pinned)
npm install                               # build-time KaTeX (pinned)
python scripts/scaffold_docs.py           # regenerate Docs tree, configs, curriculum map
python scripts/build_booklet.py            # validate booklet data, emit JSON + MathML
mkdocs build -f renderers/mkdocs/mkdocs.yml --strict
mkdocs build -f renderers/mkdocs/mkdocs.foundation.yml --strict
grep -rl 'math-error' site/higher --include='*.html'   # must print nothing
python -m verification problems/          # verify the problem bank (SymPy)
pytest tests/ -q                          # bank + verifier tests
test/run.sh                               # figure-hook + tier evaluation
```

## Watch out for

Issues found while building the shell and the Chapter 1 slice. Check these before
calling a chapter done.

**Maths**

- Markdown escapes `<`, `>` and `&` inside `$…$`; the maths hook unescapes before
  KaTeX. If you bypass the hook you will see `&lt;` and broken maths.
- KaTeX runs with `throwOnError`, so a bad expression becomes a `.math-error`
  span and the build **still exits 0**. Always grep for `math-error` after a
  build; the exit code does not catch it.
- Prefer `\pounds` or write currency outside maths; a raw `£` in an equation is
  a trap. `aligned` works; `latex2mathml` does not — do not reintroduce it.

**Hooks**

- Never name a hook parameter `html`; it shadows the `html` module.
- Figure slugs are auto-discovered from `Docs/assets/figures/*.js`. The filename
  must equal the slug, and an unknown `:::figure` slug fails the build.
- Use the `:::figure` directive, not raw `<maths-figure>` HTML: only the
  directive triggers the per-page loader injection. Modules export `mount(el)`.

**Tiers**

- Foundation drops `tier: H` pages; a plain markdown link from an `F` page to an
  `H` page breaks the strict build. Wrap such links in
  `<!-- tier:h -->…<!-- /tier:h -->` or omit them.
- Verify every `F`/`H` tag against the AQA 8300 tier columns before publishing.

**Generated files**

- `Docs/**` stubs, `renderers/mkdocs/mkdocs.yml`,
  `renderers/mkdocs/mkdocs.foundation.yml` and `CURRICULUM-MAP.md` are generated.
  Never hand-edit them; edit `curriculum.yaml` and re-run `scaffold_docs.py`.
- A stub is rewritten only while it carries `<!-- scaffold:stub -->`; authored
  pages must never contain that marker.

**Content**

- The build checks links, maths and structure — **not** mathematical correctness.
  Re-derive every answer and check the arithmetic in worked examples.
- `<details>` blocks need `markdown="1"` (via `md_in_html`) or the inner
  markdown renders literally.
- The anchor problem must be genuinely solvable by the chapter's end; keep hooks,
  applications and tools within the ~¼ budget.
- Figures must use the `fig-*` classes (`fig-accent`, `fig-warn`, `fig-good`,
  `fig-ink`, `fig-grid`) and the `text-*` classes, never hard-coded colours, so
  they adapt to dark mode.
- Never put `$...$` in text a figure injects at runtime: the maths hook runs at
  build time, so runtime LaTeX is not rendered. Use plain text or HTML.

**Problem bank**

- Keep units, words and `%` out of the CAS fields; they belong in `statement`.
  `£`, `p` and commas will not parse.
- Declare assumptions (`symbols: {x: {real: true}}`) or the verifier will reject
  valid steps such as `sqrt(x**2) -> x` when `x` can be negative.
- Decimals are rationalised before checking, so write exact values rather than
  rounded ones. Rounding needs an interval check, not equality.
- Squaring both sides or multiplying by a variable can add roots; those steps
  need a weaker relation and an explicit extraneous-root check. See PROBLEMS.md.
- The verifier proves the mathematics, not the method. A correct answer reached
  by an unexpected route still passes.

**Booklet**

- `booklet/gcse-maths.yaml` is the source of truth; `Docs/assets/booklet/booklet.json`
  is generated. Edit the YAML and run `scripts/build_booklet.py`.
- Provision is per board and tier. Selecting a board hides every item that board
  does not provide, so a wrong tag is a content bug: verify against the board's
  current formula sheet, not memory. AQA and OCR 2026 are verified; confirm
  Edexcel against its live sheet.
- The booklet renders formulae from build-time MathML, so never put `$...$` into
  it at runtime. Tables are plain text and data.
- Pop-out uses the Document Picture-in-Picture API, which is Chromium-only; the
  button is hidden elsewhere and the in-page panel is the baseline.
- The widget is site-wide runtime JS, a deliberate exception to the Tier-0
  no-JS rule. Keep it deferred and lazy: nothing beyond the button loads until a
  reader opens it.

**Toolchain**

- The build needs both `uv sync` (MkDocs) and `npm install` (KaTeX). Without
  Node, maths silently degrades to `.math-error` spans.
- `test/hooks/` duplicates the real hook logic; keep them in sync or point the
  harness at `renderers/mkdocs/hooks/`.
- `screenshot.cjs` serves the built site through Playwright request interception
  because this sandbox blocks listening sockets; set `PLAYWRIGHT_PATH` if
  `require("playwright")` does not resolve.

## Conventions

- **Tier:** `F` = Foundation and Higher, `H` = Higher only. Higher-only pages
  carry `tier: H` front matter; in-page extensions use
  `<!-- tier:h -->…<!-- /tier:h -->`.
- **Figures:** author with the line-anchored directive `:::figure <slug>`; the
  MkDocs hook expands it to `<maths-figure data-figure="<slug>">` and injects the
  loader only on pages that need it. Do not edit generated configs or nav files.
- **Maths:** write `$…$` and `$$…$$`. It is rendered to MathML at build time
  (KaTeX 0.19.0) with no runtime JavaScript. `aligned` environments are supported.
- **Glossary:** define a term once on its strand page and link to it.
