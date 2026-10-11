You are reviewing and fixing ONE chapter of an interactive GCSE Mathematics
textbook in /home/leon/Work/maths-site. Be a careful editor, not a rewriter: keep
the teaching and structure, fix what is wrong.

READ FIRST, and follow exactly:
- AGENTS.md        (chapter formula and the "Voice and language" standard — binding)
- AGENT-BRIEF.md   (the content contract)
- research/pedagogy.md      (do not overclaim)
- PROBLEMS.md      (bank schema)
- sources/aqa_spec.txt and sources/dfe_content.txt (tier and coverage truth)
- A finished, reviewed chapter as the reference: "books/gcse-maths/docs/Chapter 1/**"

YOUR CHAPTER: CHAPTER

SCOPE — edit ONLY:
- "books/gcse-maths/docs/Chapter CHAPTER/**"
- books/gcse-maths/problems/chapter-CHAPTER-*.yaml
- books/gcse-maths/docs/assets/figures/chCHAPTER-*.js
Do NOT touch any other file, including other chapters, books/gcse-maths/docs/Glossary/**, AGENTS.md,
PROBLEMS.md, books/gcse-maths/curriculum.yaml, renderers/**, scripts/**, test/**.

REVIEW AND FIX these, in priority order:

1. MATHEMATICAL MISTAKES (highest priority). Re-work every worked example, every
   step, and every stated answer yourself. Check arithmetic, signs, units,
   rounding, and that each answer actually answers the question. Fix any error.
   If a bank `check` is wrong, correct it. Do not trust the existing text.
2. VOICE (AGENTS.md). Remove any internal words from student prose: "anchor
   problem", "retrieval starter", "Walkthrough" / "Guided problems" / "Problems",
   DfE codes, "tier H". Remove shaming words ("obviously", "simply", "just",
   "easy", "clearly"). Expand negative contractions ("can't" -> "cannot",
   "don't" -> "do not"). Split sentences longer than about 30 words. No slang or
   idioms. Use GCSE command words precisely. UK English.
3. STYLE AND CONSISTENCY. One term per idea. Page titles end "— Learn",
   "— Practise with help", "— Practise". Headings in order (no skipped levels).
   Consistent units, currency as £1.20, decimals with a leading zero.
4. STRUCTURE. Every Learn page has prerequisites, objectives, a "Watch out."
   callout, and "You should now be able to". Every Practise-with-help page opens
   with "## Warm-up: remember". Every Practise page uses only
   `:::problems <bank>` and `:::answers <bank>`. The chapter opener has
   "## The chapter problem" and "By the end of this chapter".
5. CROSS-REFERENCES. Every "Section X.Y" you mention must exist in
   books/gcse-maths/curriculum.yaml, and every link must resolve. Fix or remove dead references.
6. TIER. Check each section's F/H tag against sources/aqa_spec.txt. Fix only with
   evidence from that file; say what you changed.

YAML AND MATHS RULES (violations break the build):
- Every bank string is SINGLE-QUOTED and on ONE line. Never double-quote values;
  never use a backslash line-continuation.
- Separate two consecutive `$$...$$` blocks with a blank line or prose.
- Write no literal control characters; write \angle, \approx, \frac normally.

DO NOT run mkdocs or pytest. You MAY run:
  .venv/bin/python -m textbook.verify books/gcse-maths/problems/chapter-CHAPTER-practice-*.yaml

WHEN DONE, report:
- a list of every mistake you found and fixed (with the correction);
- anything you were unsure about and left unchanged;
- the literal output of the verification command.
