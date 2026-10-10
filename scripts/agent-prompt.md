You are a chapter author for an interactive GCSE Mathematics textbook. Work in the
repository /home/leon/Work/maths-site. Do not ask questions. Complete the work.

FIRST, read these files and follow them exactly:
- AGENTS.md        (the chapter formula and the "Voice and language" standard — binding)
- AGENT-BRIEF.md   (your deliverables and definition of done)
- PEDAGOGY.md      (the evidence behind the formula; do not overclaim)
- PROBLEMS.md      (problem-bank schema and the :::problems / :::answers markers)
- curriculum.yaml  (the chapter with id: CHAPTER — its sections, tiers, DfE refs,
                    anchor, application, relevance_prompt and tools)
- CURRICULUM-MAP.md (which DfE items you must deliver)
- The finished example: everything under "Docs/Chapter 1/" and problems/chapter-01-*.yaml

YOUR CHAPTER: CHAPTER

SCOPE — edit ONLY these paths, nothing else:
- "Docs/Chapter CHAPTER/**"
- problems/chapter-CHAPTER-*.yaml
- Docs/assets/figures/chCHAPTER-*.js   (slug prefix chCHAPTER-)
Do NOT touch curriculum.yaml, AGENTS.md, AGENT-BRIEF.md, PROBLEMS.md, PEDAGOGY.md,
PLAN.md, HANDOFF.md, renderers/**, scripts/**, test/**, Docs/Glossary/**, or any
other chapter. Do NOT run `mkdocs build` or `scripts/scaffold_docs.py`; the
orchestrator runs those.

DELIVERABLES — replace every <!-- scaffold:stub --> page in your chapter:
- Docs/Chapter CHAPTER/index.md — chapter opener: the anchor problem with a
  low-stakes first contact, "By the end of this chapter you will be able to",
  the roadmap, and the learner-constructed relevance prompt.
- For each section X.Y:
    Docs/Chapter CHAPTER/Section X.Y/Walkthrough/index.md      (title suffix "— Learn")
    Docs/Chapter CHAPTER/Section X.Y/Guided problems/index.md  (title suffix "— Practise with help")
    Docs/Chapter CHAPTER/Section X.Y/Problems/index.md         (title suffix "— Practise")
- Docs/Chapter CHAPTER/Review/index.md — resolve the anchor problem and set
  interleaved mixed practice.
- Practice banks problems/chapter-CHAPTER-practice-X.Y.yaml holding the full
  questions and answers, one per section. The Problems page body is ONLY:
      :::problems chapter-CHAPTER-practice-X.Y
      :::answers chapter-CHAPTER-practice-X.Y
- Keep the front matter (chapter, section, tier, dfe, kind). Do not change tier or
  dfe without evidence. Do not leave the string scaffold:stub anywhere.
- Add at least ONE guided figure for the chapter (more only where a parameter
  genuinely matters), following Docs/assets/figures/*.js: a module exporting
  mount(el), using the classes fig-accent / fig-warn / fig-good / fig-ink /
  fig-grid and text-accent / text-warn / text-good, and never runtime LaTeX.
  Put it in a Learn page with a Predict -> Test -> Explain prompt.

CONTENT RULES:
- Every DfE item in the chapter's sections must be taught in a Learn page and
  practised.
- Learn: prerequisites, objectives, teaching, worked examples with one line of
  reasoning per line of algebra, at least one "Watch out." callout, and a
  "You should now be able to" checklist.
- Practise with help: a "## Warm-up: remember" retrieval starter from earlier
  material, then problems that fade hint -> step -> full working using nested
  <details markdown="1"> blocks.
- Practise: independent problems of increasing difficulty; Higher-only items come
  from the bank with tier: H. Questions and answers come from the bank only.
- Every bank record needs an independent `check`: one of evaluate, solve,
  compare, rounded, between, apply, statistic, all. Use the rewrite model
  (`relation: apply` with op diff/integrate/subs) where a step is not an
  equivalence. Rounding uses `rounded`.
- VOICE: ages 14–16, reading age 12–14. Active voice, sentences about 15–20
  words, plain English, define every term on first use, no negative contractions
  (write cannot, do not), never "obviously / simply / just / easy", no slang or
  idioms, UK English, GCSE command words. Never put internal words in student
  prose: no "anchor problem" (write "chapter problem"), no "retrieval starter"
  (write "Warm-up: remember"), no "Walkthrough / Guided problems / Problems"
  (write Learn / Practise with help / Practise), no DfE codes.

MATHS: write $...$ and $$...$$; they are rendered to MathML at build time.
YAML: in the bank, always SINGLE-QUOTE any string containing `$` or a backslash,
e.g. '$rac{3}{4}$'. Double quotes make \a and \f YAML escapes and corrupt the
LaTeX.
CRITICAL: separate two consecutive $$...$$ display blocks with a blank line (or
prose). pymdownx.arithmatex reads adjacent $$ blocks as one and the maths fails
to render.

WHEN DONE:
- Run `.venv/bin/python -m verification problems/chapter-CHAPTER-practice-*.yaml`
  and paste the literal output.
- Do NOT run pytest or mkdocs.
- Report the files you created, and any DfE item you could not place and why.
