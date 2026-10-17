# PLAN — GCSE Mathematics interactive textbook

**Status:** plan agreed, structure scaffolded, ready to dispatch one sub-agent per chapter.
**Date:** 2026-10-10
**Repo:** `/home/leon/Work/maths-site` (not yet a git repository)

This plan supersedes the "no mathematical content" clause of `.agents/planning/handoff.md`. The
stack decisions in `.agents/planning/handoff.md` (marimo-markdown canonical format, a static
backend-free site, interactivity tiers) still hold; the renderer is now the
bespoke `engine/src/textbook/pipeline.py` rather than MkDocs — see `SHAPE.md`,
"The bespoke renderer is the site". What changes is that we now have a concrete
subject, a concrete structure, and we *are* writing content. The folder layout
below is the one the human specified and replaces `math-book/content/` as the
content root.

---

## 1. What was retrieved, and what it is

| Source | Role | Verified |
|---|---|---|
| **DfE**, *Mathematics: GCSE subject content and assessment objectives* (DFE-00233-2013) | The authoritative curriculum. Six strands; standard/underlined/**bold** type encodes tier. | Downloaded, full text extracted. |
| **AQA 8300** specification (v1.1, Sept 2026) | Content grouped into `basic foundation` / `additional foundation` / `higher only` columns. Uses the same DfE reference scheme (N/A/R/G/P/S). | Downloaded; content headings and tier columns extracted. |
| **Pearson Edexcel 1MA1** specification + *Content Guidance* | Confirms the six DfE strands verbatim; guidance adds depth and exemplars. | Downloaded. |
| **Cambridge OCR J560** specification (v2.1, Aug 2026) | Independent cross-check: groups the same content into 12 topics. | Downloaded; 12-topic grouping extracted. |
| **Maths Genie** GCSE topic list (Edexcel), grades 1–9 | Public, grade-ordered enumeration of every teachable topic (~130). Used to confirm no topic is orphaned. | Fetched and parsed in full. |
| **Pearson Edexcel GCSE (9-1) Mathematics** Higher (9781447980209, 728 pp) / Foundation (9781447980193, 712 pp) | Confirms the market-leading textbook's two-tier split and scale. | Metadata verified via Open Library. |

**Honest limitation.** The full tables of contents of the proprietary textbooks
(Pearson, CGP, Oxford, Collins, Hodder) are not machine-retrievable — they sit
behind JS-gated sample viewers or print. The chapter/section plan is therefore
grounded in the **curriculum and the exam-board specifications**, not in a copied
textbook TOC. This is the stronger footing for coverage: the DfE document *is* the
specification of what must be taught, and `CURRICULUM-MAP.md` proves every item is
placed.

## 2. How the plan was derived

1. Take the DfE six strands as the non-negotiable coverage target.
2. Cross-check the topic *groupings* against AQA (3 topic areas × sub-topics), OCR
   (12 topics) and Edexcel to see how boards bundle content into teachable units.
3. Choose a chapter granularity of roughly one agent-sized unit (≈4–8 sections),
   sequenced in a conventional teaching order (number → algebra → geometry →
   probability/statistics), not the DfE's reference order.
4. Cross-check against Maths Genie's grade-ordered list to confirm every examinable
   topic appears somewhere.
5. Tag each section `F` (Foundation and Higher) or `H` (Higher only). This is a
   first pass; `engine/src/textbook/scaffold.py` and the DfE map guarantee *coverage*, not
   *tier accuracy*. Tier tags must be confirmed against the AQA columns while
   authoring (see the agent brief).

## 3. Structure at a glance

25 chapters, 133 sections, in four parts. Source of truth: `books/gcse-maths/curriculum.yaml`.
Generated reverse index: `CURRICULUM-MAP.md`.

| Part | Strand(s) | Chapters |
|---|---|---|
| A. Number and ratio | Number; Ratio, proportion and rates of change | 1–7 |
| B. Algebra | Algebra | 8–15 |
| C. Geometry and measures | Geometry and measures | 16–22 |
| D. Probability and statistics | Probability; Statistics | 23–25 |

| # | Chapter | Sections |
|---|---|---|
| 1 | Number skills | 5 |
| 2 | Factors, multiples and primes | 4 |
| 3 | Powers, roots and indices | 4 |
| 4 | Fractions, decimals and percentages | 6 |
| 5 | Ratio and proportion | 6 |
| 6 | Percentages and financial mathematics | 5 |
| 7 | Measures, accuracy, standard form and surds | 6 |
| 8 | Algebraic expressions and manipulation | 7 |
| 9 | Equations and inequalities | 6 |
| 10 | Sequences | 5 |
| 11 | Straight-line graphs and rates of change | 6 |
| 12 | Quadratic expressions, equations and graphs | 6 |
| 13 | Other functions and graphs | 4 |
| 14 | Simultaneous equations and iteration | 5 |
| 15 | Functions, algebraic fractions and proof | 5 |
| 16 | Angles, polygons and geometrical reasoning | 5 |
| 17 | Properties, constructions, loci and bearings | 5 |
| 18 | Transformations, congruence and similarity | 6 |
| 19 | Perimeter, area, surface area and volume | 6 |
| 20 | Pythagoras' theorem and trigonometry | 8 |
| 21 | Circle geometry and circle theorems | 4 |
| 22 | Vectors | 3 |
| 23 | Probability | 6 |
| 24 | Statistics: representing and analysing data | 5 |
| 25 | Statistics: spread, grouped data and correlation | 5 |

## 4. Folder and file conventions

```
books/gcse-maths/docs/
  index.md                       # book front page
  Glossary/
    index.md
    number.md algebra.md ratio.md geometry.md probability.md statistics.md
  Chapter <n>/
    index.md                     # chapter overview: summary + section list
    Section <n.m>/
      Walkthrough/index.md
      Guided books/gcse-maths/problems/index.md
      Problems/index.md
```

- Folder names mirror the human's brief: `Chapter 1`, `Section 1.1`,
  `Walkthrough`, `Guided problems`, `Problems`. Section folders carry the section
  id (`Section 1.1`), not a bare `Section1`, so chapter and section numbers cannot
  drift apart.
- One page per leaf folder, named `index.md`, so each folder is a directory
  section in the built site (`Chapter 1/Section 1.1/Walkthrough/`). Extra sibling pages may be added
  inside a leaf folder when a topic genuinely needs more than one page (e.g.
  `Questions/index.md`); the `index.md` remains the landing page.
- The navigation is generated from `books/gcse-maths/curriculum.yaml` by
  `scaffold.build_nav_list` and should not be hand-edited.
- The scaffold is idempotent. Every generated file carries `<!-- scaffold:stub -->`;
  `python -m textbook.scaffold` rewrites only files that still carry it, so
  authored content is never clobbered. Re-run after editing `books/gcse-maths/curriculum.yaml`.

## 5. Content contract

Every section page starts with YAML front matter (already emitted in the stubs):

```yaml
title: "1.1 Place value and ordering numbers — Walkthrough"
chapter: 1
chapter_title: Number skills
section: "1.1"
section_title: Place value and ordering numbers
tier: F            # F = Foundation and Higher, H = Higher only
dfe: [N1, N2]      # DfE content references this page delivers
kind: walkthrough  # walkthrough | guided-problems | problems
```

**Walkthrough** — teaching narrative plus fully worked examples.
- Opens with: prerequisites, learning objectives, and the DfE refs in prose.
- At least one worked example per distinct DfE item, one line of reasoning per line
  of algebra.
- At least one interactive figure where a parameter is worth manipulating (tier
  policy below); no figure is better than a decorative one.
- Closes with a short "what you should be able to do" checklist.

**Guided problems** — progressive exposure.
- Each problem is attemptable first, then reveals a hint, then a fuller step, then
  the full working. Use nested `<details>` blocks so it degrades without JS and is
  screen-reader navigable.
- Interleaves at least one item that revisits the previous section (spacing).
- Answers are numeric or structured; avoid free-text symbolic equivalence checks
  (see `.agents/planning/handoff.md` §4).

**Problems** — independent practice.
- Homework-style set, roughly 8–15 items, ordered by difficulty.
- Mark Higher-only items explicitly even on an `F` page.
- Answers and concise solutions in a single collapsed block at the foot.
- Where a generated variant set is useful, tag it so the exercises layer can seed
  variants from a URL.

**Glossary** — a term is defined once, on its strand page, and linked from the
pages that introduce it. Chapter authoring appends to the strand page.

**Maths and code.** Mathematics is written as `$...$` / `$$...$$` and rendered at
build time with KaTeX (Tier 0). Python cells, when used, use the canonical marimo
fence ` ```python {marimo} `. Figures are authored with the line-anchored
directive `:::figure <slug>`; the engine's figure hook expands it to the portable
`<maths-figure data-figure="<slug>">` element and injects the figure loader only
into pages that use it. Figure modules live under `books/gcse-maths/docs/assets/figures/<slug>.js`
and export `mount(el)`. See `test/README.md` for the evaluation behind this.

## 6. Interactivity policy for GCSE

Default to the cheapest tier that earns its keep (`.agents/planning/handoff.md` §3). For this book:

- **Tier 0** (prose + KaTeX) is the default for every page.
- **Tier 1** (pure JS) is the expected figure on most Walkthrough pages: sliders for
  a parameter (gradient, scale factor, probability), JSXGraph for geometry and
  transformations, plotly/mathjs for graphs and statistics.
- **Tier 2** (build-time Python → committed JSON → JS animates) when the maths is
  heavy but finite and unchanging: precomputed function families, distribution
  sweeps, cumulative-frequency screens. Determinism is a requirement
  (`git diff --exit-code` after regeneration).
- **Tier 3/4** (Pyodide marimo islands / `marimo export html-wasm` iframes) only
  when the reader must vary the *computation itself* — rare at GCSE. Never make a
  Tier-3 page the entry point of a chapter.

## 7. Coverage and how to check it

- `CURRICULUM-MAP.md` maps all 97 DfE content items (N1–16, A1–25, R1–16, G1–25,
  P1–9, S1–6) to the section(s) that teach them.
- `python -m textbook.scaffold` **fails** if any DfE item loses its home,
  and regenerates the docs tree, `nav.yml` and the map from `books/gcse-maths/curriculum.yaml`.
- `scripts/fetch_sources.sh` restores the primary sources into git-ignored
  `sources/` (DfE subject content, AQA/Edexcel/OCR specifications).

## 8. Execution plan

1. **Stack shell.** a renderer + tier profiles + repo-owned figure hook +
   build-time maths, a strict link check green. **Done** — the pipeline builds the
   full book with no broken links in the Higher and Foundation profiles.
2. **Vertical slice.** Author **Chapter 1** end-to-end, plus its glossary entries,
   to prove the pedagogy formula, the content contract, the hint pattern and the
   figure mechanism, and to surface any missing hook. **Done** — Chapter 1 (17
   pages + glossary) builds clean with three guided figures and no maths errors.
3. **Long run: one sub-agent per chapter.** Chapters 2–25 dispatched in parallel
   or in small batches, each bounded to its chapter folder, its glossary strand
   page, and `books/gcse-maths/docs/assets/figures/` / `figures/py/` additions it needs. See
   `.agents/chapter-brief.md` for the per-chapter brief.
4. **Integration and verification.** the pipeline's link check, no-JS check on
   Tier-0 pages, Tier-2 determinism check, links and maths render check, tier-tag
   audit against AQA columns.

## 9. Decisions taken this phase

- **D8 — Figure mechanism.** The wire format is the portable
  `<maths-figure>` custom element (raw HTML, so it survives every renderer).
  Authors write the line-anchored directive `:::figure <slug>`;
  `engine/src/textbook/hooks/figures.py` expands it and injects the loader only
  into pages that need it. A template-plugin mechanism was rejected: it loads JS
  on every page and aborts the build on any literal `{{ … }}` in prose or maths.
  Evidence: `test/README.md`.
- **D9 — Tier delivery.** One source, three build profiles — `foundation`,
  `higher` and `toggle` — selected by `extra.tier_profile`. Higher-only pages
  carry `tier: H` front matter; in-page Higher extensions use
  `<!-- tier:h -->…<!-- /tier:h -->`. Foundation drops the former and strips the
  latter; Higher keeps both; toggle tags both for the runtime switch. The
  two-site build is the product; the toggle is a third config from the same
  source. Evidence: `test/` (24/24 assertions).
- **D10 — Portability of D8/D9 to Quarto/MyST/MDX** remains CI work under
  `.agents/planning/handoff.md` D4; only the pipeline is verified so far.
- **D11 — Reading theme.** Warm off-white paper (`#faf9f5`) with warm near-black
  ink, not pure white/black; dark-on-light default (positive polarity reads
  better — Buchner & Baumgartner 2007), with a `prefers-color-scheme` dark mode
  toggle. Measure capped at `70ch` (Butterick 45–90, Baymard 50–75 optimal);
  ~17px body, 1.65 line-height; serif display + sans body. Implemented in
  `assets/stylesheets/extra.css` and the theme bundles in `themes/`.
- **D12 — Maths rendering.** Build-time KaTeX 0.19.0 to MathML (no runtime JS,
  CSS or fonts), via `engine/src/textbook/js/katex-render.mjs` and
  `engine/src/textbook/hooks/maths.py`. `aligned` works; the hook unescapes the
  HTML entities Markdown introduces before rendering.
- **D13 — OpenDesign** is activated project-scoped (`.mcp.json`,
  `.claude/settings.json`); its design directions are the house style reference.

## 10. Open decisions for the human

1. **Source licensing.** Exam-board specifications and the DfE document are
   OGL/Crown or board-copyrighted; we use them as reference, not copied text.
   `sources/` is git-ignored and restorable. Confirm that is acceptable.
2. **Tier-2 figures.** The slice uses Tier-1 figures only; the first Tier-2
   (precomputed JSON) figure should be added in a chapter where a parameter
   family genuinely needs it, with the determinism check.
