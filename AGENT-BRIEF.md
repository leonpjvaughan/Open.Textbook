# SUB-AGENT BRIEF — author one chapter

You are authoring **one chapter** of an interactive GCSE Mathematics textbook
(England, 9-1). Everything you need is in the repository. Do not invent content
that is not on the curriculum, and do not touch work outside your chapter.

## Your input

Invoke with `CHAPTER_ID=<n>` (1–25). Read, in order:

1. `PLAN.md` §4–§6 — folder conventions, content contract, interactivity policy.
2. `curriculum.yaml` — find `chapters[?id=<n>]`. This is your scope: every section,
   its `tier`, and its `dfe` references.
3. `CURRICULUM-MAP.md` — confirm exactly which DfE items you must deliver.
4. `HANDOFF.md` §3–§4 — interactivity tiers and the client-side compute constraints.
5. The primary sources in `sources/` (run `scripts/fetch_sources.sh` if empty):
   `dfe_content.txt`, `aqa_spec.txt`, `edexcel_spec.txt`, `ocr_spec.txt`. Use them
   to confirm scope and tier; quote nothing.

## Your deliverables

For every section `s` in your chapter:

```
Docs/Chapter <n>/Section <n.m>/Walkthrough/index.md
Docs/Chapter <n>/Section <n.m>/Guided problems/index.md
Docs/Chapter <n>/Section <n.m>/Problems/index.md
```

Replace the `<!-- scaffold:stub -->` pages. Keep the front matter (update it if the
scope genuinely shifted, but do not change `id`, `tier` or `dfe` without recording
why). Also:

- Update the chapter `Docs/Chapter <n>/index.md` with a real overview and section
  list; keep it short and navigational.
- Append any new terms to `Docs/Glossary/<strand>.md`, alphabetically, one
  definition each. Define a term once in the book.
- Add figures under `figures/js/<slug>.js` (Tier 1) or generators under
  `figures/py/` writing to `figures/data/` (Tier 2). Only when they earn their keep.
- Do **not** edit `curriculum.yaml`, `nav.yml`, `CURRICULUM-MAP.md`, `PLAN.md`, or
  any other chapter. `nav.yml` and the map are generated.

## Coverage — non-negotiable

Every DfE item in your chapter's `dfe` list must be explicitly taught and practised.
Each Walkthrough page names the items it delivers and shows at least one worked
example per item. Each Guided/Problems page includes items keyed to each item. If
you believe an item is misplaced, do not silently move it — finish the chapter and
raise it (see escalation).

## Content standards

- **Walkthrough:** prerequisites → objectives → teaching prose → worked examples
  (one line of reasoning per line of algebra) → interactive figure where a parameter
  is worth manipulating → "you should now be able to…" checklist.
- **Guided problems:** attempt first, then hint, then fuller step, then full working,
  using nested `<details>` blocks. Include at least one retrieval item from an
  earlier chapter. Answers are numeric/structured — never free-text symbolic
  equivalence.
- **Problems:** 8–15 homework-style items in increasing difficulty; Higher-only
  items marked like **H**; answers and concise solutions in one collapsed block.
- **Maths** is `$...$` / `$$...$$` (KaTeX, build time). No MathJax on the same page.
- **Language:** UK English, GCSE command words ("work out", "show that", "explain
  why", "give a reason"). Contexts should be plausible and varied, not filler.
- **Tier:** confirm each `F`/`H` tag against the AQA 8300 tier columns. Fixing a
  wrong tag is in scope; changing the scaffolded tag without evidence is not.
- **Accessibility:** headings in order, alt text on every figure, colour never the
  only signal, and every interactive control operable by keyboard.

## Interactivity

Default to Tier 0. Add a Tier-1 pure-JS figure on most Walkthrough pages where a
parameter can be manipulated (gradient, scale factor, right-triangle sides,
probability, distribution shape). Use Tier 2 only for heavy, finite, deterministic
sweeps, and prove determinism by regenerating. Tier 3/4 is almost never justified at
GCSE; if you reach for Pyodide, justify it in the chapter overview first.

## Definition of done — report evidence, do not assert

1. Every file listed above exists and contains no `scaffold:stub` marker.
2. Every `dfe` item in your chapter appears in at least one Walkthrough and one
   practice page (grep the refs and show the result).
3. `python scripts/scaffold_docs.py` reports your chapter's files as **skipped**,
   not rewritten.
4. If you added a Tier-2 figure: regeneration is byte-identical
   (`git diff --exit-code figures/data/`, or the equivalent check).
5. MkDocs renders your pages without errors if the shell exists at the time.
6. Report the literal commands you ran and their literal output.

## Escalate (stop and hand back with evidence) if

- a DfE item cannot be taught at the section granularity you were given;
- the figure hook you were told to use does not exist or does not work;
- a tier tag conflicts with the AQA columns;
- covering a section honestly would require content outside the curriculum.
