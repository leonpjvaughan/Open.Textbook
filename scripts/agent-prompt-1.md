You are finishing Chapter 1 of an interactive GCSE Mathematics textbook in
/home/leon/Work/maths-site. Chapter 1 is already authored; do not rewrite its
prose. Your job is to move the practice sets into verified banks.

READ FIRST, and follow exactly:
- AGENTS.md (chapter formula and the "Voice and language" standard — binding)
- AGENTS.md → "Watch out for", PROBLEMS.md (bank schema; :::problems / :::answers)
- The finished example: "books/gcse-maths/docs/Chapter 1/Section 1.1/Problems/index.md" and
  books/gcse-maths/problems/chapter-01-practice-1.1.yaml

TASK — for each of sections 1.2, 1.3, 1.4 and 1.5:
1. Create books/gcse-maths/problems/chapter-01-practice-<section>.yaml containing every question
   from that section's Problems page as a record, with:
   - id (e.g. p3-...), section, tier (F, or H for the items marked **H**),
     dfe refs copied from the section front matter,
   - statement: the full question text (markdown with $...$ maths),
   - answer_label: a short label for the answers block,
   - answer_text: the final answer(s),
   - check: an independent CAS check (evaluate / compare / rounded / between /
     apply / statistic / all). Rounding uses `rounded`. Where a question has parts
     (a)(b)(c), use `kind: all` with one sub-check per part.
2. Replace the body of "books/gcse-maths/docs/Chapter 1/Section X.Y/Problems/index.md" with a
   short instruction sentence followed by exactly:
       :::problems chapter-01-practice-X.Y
       :::answers chapter-01-practice-X.Y
   Keep the front matter (add kind: problems if missing) and keep the existing
   H1 title ending "— Practise".
3. Do not change any Walkthrough or Guided problems page. Do not touch
   books/gcse-maths/curriculum.yaml, AGENTS.md, PROBLEMS.md, renderers/**, scripts/**, test/**,
   books/gcse-maths/docs/Glossary/**, or any other chapter. Do not run mkdocs or pytest.

The problems currently on those pages must be preserved exactly in meaning; move
them, do not invent new ones. Keep the voice rules.

WHEN DONE:
- Run `.venv/bin/python -m textbook.verify books/gcse-maths/problems/` and paste the literal output.
- Report the bank files created and any question whose answer you could not
  express as a check, with the reason.
