Build the shared glossary for an interactive GCSE Mathematics textbook in
/home/leon/Work/maths-site.

READ FIRST:
- AGENTS.md (the "Voice and language" standard — binding)
- books/gcse-maths/docs/Glossary/number.md (the finished example)
- The curriculum: books/gcse-maths/curriculum.yaml and CURRICULUM-MAP.md
- The chapters: books/gcse-maths/docs/Chapter */Section */Walkthrough/index.md

TASK:
- Fill each of books/gcse-maths/docs/Glossary/algebra.md, ratio.md, geometry.md, probability.md
  and statistics.md with the key terms actually used in the book for that strand.
  `number.md` is done; match its format exactly.
- Also update books/gcse-maths/docs/Glossary/index.md: remove the `<!-- scaffold:stub -->` marker
  and replace the placeholder sentence with a proper one-line introduction.

RULES:
- One term per entry, alphabetical, format:
  **Term** — a one-sentence definition in plain English.
- Define a term ONCE, on its strand page. Do not duplicate across strands.
- Use the book's voice: ages 14–16, reading age 12–14, active voice, no shaming
  words, no negative contractions, UK English.
- Maths in $...$ with single-quoted, backslash-free-safe YAML only where needed;
  these are markdown files, so write `$\frac{3}{4}$` normally.
- Extract terms from the chapters (bolded terms, headings, and glossary-worthy
  words). Aim for 15–30 solid terms per strand, not every word.
- SCOPE: edit ONLY books/gcse-maths/docs/Glossary/*.md. Nothing else.

WHEN DONE, report the terms you added per strand.
