# GCSE and A-level Physics in practice — past papers, mark schemes and existing books

Research note for the two planned physics books (`books/gcse-physics/`,
`books/a-level-physics/`). `physics.md` established the syllabus and the tier
axis; `physics-equations-and-data.md` established what each board prints on its
equation sheet; `physics-verifier-gaps.md` established what a physics oracle
would have to prove. This note answers a different question: **what does a
student actually meet?** — command words, question shapes, how a 6-mark
explanation is marked, what a required-practical question looks like, and how a
graph or an uncertainty is assessed.

The provenance manifest is
`research/curriculum/physics-textbooks-and-exams.sources.yaml`. The
specification-level provenance (board specifications, DfE subject content,
Ofqual conditions, equation sheets) stays in `physics.sources.yaml` and is not
duplicated here.

**Retrieved 2026-10-11.** Every fetch used the browser User-Agent the repository
already uses in `scripts/fetch_sources.sh`.

---

## How to read the labels in this document

Every claim about a board document carries one of three labels, because they are
not equally strong evidence.

| Label | Means |
|---|---|
| **read** | The board's own PDF was downloaded and converted to text, and the quoted words are in that text. |
| **read (mirror)** | The board's own PDF, but obtained from a third-party mirror (Physics & Maths Tutor) because the board's own download is behind a login. The document is the board's; the URL is not the board's. |
| **described only** | The site is a JavaScript single-page application and a plain fetch returns a shell. Nothing about its content is asserted here beyond what its own index pages expose. |

Everything below is **read** unless it says otherwise. The one class of source
that is **described only** is Isaac Physics, Khan Academy and CK-12; no headless
browser was available (`node -e "require('playwright')"` fails, and the repo's
`scripts/screenshot.cjs` needs `PLAYWRIGHT_PATH`), so those three could not be
opened at all.

---

## Exact fetch commands

Working directory: `/tmp/pi-delegate/del-26/fetched`.

```bash
UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

# A general PDF fetch + text extraction.
curl -fsSL -A "$UA" -m 200 <url> -o <file>.pdf && pdftotext -layout <file>.pdf <file>.txt
```

### AQA — resources are rendered from an embedded JSON blob

AQA publishes question papers, mark schemes **and examiner reports** freely. To
pair a resource *title* with its PDF URL on an assessment-resources page:

```bash
curl -fsSL -A "$UA" -m 90 \
  "https://www.aqa.org.uk/subjects/physics/gcse/physics-8463/assessment-resources" -o ar_gcse.html
curl -fsSL -A "$UA" -m 90 \
  "https://www.aqa.org.uk/subjects/physics/a-level/physics-7408/assessment-resources" -o ar_al.html
python3 - <<'PY'
import re, glob
for f in sorted(glob.glob('ar_*.html')):
    s = open(f, encoding='utf-8', errors='replace').read().replace('\\"', '"')
    for m in re.finditer(r'"url":"(https://cdn\.sanity\.io/files/[^"]+\.pdf)"', s):
        tail = s[m.end():m.end()+800]
        t = re.search(r'"title":"((?:[^"\\]|\\.)*)"', tail)
        print((t.group(1) if t else '?'), '||', m.group(1))
PY
```

The AQA PDFs themselves then download directly from `cdn.sanity.io` with the
same `curl`.

### OCR — resources are plain links on the assessment page

OCR publishes question papers, mark schemes and examiner reports freely too. The
assessment page carries the links; extract them with:

```bash
curl -fsSL -A "$UA" -m 90 \
  "https://www.ocr.org.uk/qualifications/gcse/gateway-science-suite-physics-a-j249-from-2016/assessment/" -o ocr_j249.html
curl -fsSL -A "$UA" -m 90 \
  "https://www.ocr.org.uk/qualifications/as-and-a-level/physics-a-h156-h556-from-2015/assessment/" -o ocr_h556.html
python3 - <<'PY'
import re, html
for f in ('ocr_j249.html', 'ocr_h556.html'):
    s = open(f, encoding='utf-8', errors='replace').read()
    seen = set()
    for m in re.finditer(r'href="([^"]+\.(?:pdf|docx|zip))"', s, re.I):
        u = html.unescape(m.group(1))
        if u in seen: continue
        seen.add(u)
        pre = re.sub(r'<[^>]+>', ' ', s[max(0, m.start()-400):m.start()])
        print(re.sub(r'\s+', ' ', pre).strip()[-90:], '||', u)
PY
```

OCR PDFs live at `https://www.ocr.org.uk/Images/<id>-<slug>.pdf`.

### Pearson Edexcel — the board's own materials are login-gated

`https://qualifications.pearson.com/...` returns HTTP 200 for a *soft* 404 and
renders a JavaScript shell, so a 200 means nothing; verify with `file`:

```bash
curl -sS -A "$UA" -L -m 60 -D - -o /tmp/x.bin "<url>" | grep -iE '^(HTTP|content-type|content-length)'
file -b /tmp/x.bin      # a real PDF says "PDF document"; otherwise it is the 404 shell
```

Pearson's A-level Physics page links to its own "Assessment and tracking
progress" page, whose text says past papers, mark schemes and examiner reports
sit behind **examWizard / Edexcel Online**, not on a public URL. I therefore took
the board's own PDFs from the Physics & Maths Tutor mirror (the third-party label
above), and read the board's conventions from **public** Pearson PDFs where they
exist — the specifications, the GCSE science *Extended Open Response* guidance,
and the A-level subject and transition guides.

### Physics & Maths Tutor — a public mirror

```bash
curl -fsSL -A "$UA" -m 60 "https://www.physicsandmathstutor.com/past-papers/a-level-physics/edexcel-paper-1/" -o pmt_p1.html
python3 -c "import re,html;print('\n'.join(sorted(set(html.unescape(x) for x in re.findall(r'href=\"([^\"]+\.pdf)\"',open('pmt_p1.html').read())))))"
# then curl the chosen https://pmt.physicsandmathstutor.com/download/... URL
```

### OpenStax — a JSON API

The site is a Single Page App; its content API answers directly:

```bash
curl -sSL -A "$UA" -m 60 \
 "https://openstax.org/apps/cms/api/v2/pages/?type=books.Book&fields=title,slug,license_name,license_version,license_url,book_state,high_resolution_pdf_url&limit=200" \
 -o osx_books.json
# and a book page renders server-side:
curl -sSL -A "$UA" -m 60 "https://openstax.org/books/physics/pages/2-1-relative-motion-distance-and-displacement" -o osx_sec.html
```

---

## What could not be established (escalate; do not fill from memory)

1. **Edexcel's own past papers, mark schemes and examiner reports for 1PH0 and
   9PH0.** They are not on a public Pearson URL. `qualifications.pearson.com`
   returns HTTP 200 with a *soft* 404 body for a wrong path, and the real
   listing is behind examWizard / Edexcel Online. **What I used instead:** the
   board's own PDFs from the PMT mirror (mark schemes for 9PH0 Paper 1 and
   Paper 3, June 2025 and the specimen; 1PH0 Paper 1H, June 2025), plus every
   public Pearson document (specifications, the GCSE *Extended Open Response*
   guidance, the A-level subject and transition guides). **No Edexcel examiner
   report was opened at all.** Everything below about Edexcel is from a mark
   scheme, a question paper or a specification — never from an examiner report.
2. **Edexcel's published examiner reports.** Not retrieved, and not substituted.
   The only Edexcel examiner *commentary* available is the worked candidate
   responses and examiner notes inside the public GCSE *Extended Open Response*
   guidance (June 2018 papers).
3. **Isaac Physics, Khan Academy and CK-12 content.** All three are client-side
   rendered. Isaac's own sitemap (`https://isaacphysics.org/sitemap.xml`) lists
   its structure (`/concepts/…`, `/books/…`, `/<subject>/<level>/question_decks`)
   but a fetch of a concept page returns a 3 KB shell (`You need to enable
   JavaScript…`). Their *pedagogy* is therefore **not** assessed here.
4. **AQA's and OCR's own command-word glossaries at A-level.** AQA's A-level
   specification does not print one (the GCSE *Our exams explained* booklet does,
   and OCR prints one for GCSE and one for A-level). For AQA at A-level the
   command words are read off the papers and the mark scheme's own instructions.

---

## Copyright and licences — load-bearing

This section is deliberate. The repository carries a licence and an attribution
page, and this note is evidence the authors can consult without importing
anything.

- **The boards' papers and mark schemes are commercial, all-rights-reserved
  documents.** AQA's mark schemes carry `Copyright © 2025 AQA and its licensors.
  All rights reserved.` and permit copying only by registered centres for
  internal use. OCR's carry `© OCR 2025` and are published "as an aid to teachers
  and students". Pearson's carry `All the material in this publication is
  copyright © Pearson Education Ltd 2025`. **Nothing from them may be copied into
  this repository.** This note therefore quotes only command words and stock
  marking conventions (single short phrases such as "error carried forward", or
  a board's one-line definition of a command word where the wording is the
  thing being reported). It does not reproduce question stems, mark-scheme
  tables, indicative content or scanned pages.
- **The exam papers are read, not redistributed.** The fetched PDFs live in
  `/tmp` outside the build tree, exactly as `physics.md` keeps its fetches out of
  the repository. If a book ever wants a past-paper question, the route is a
  *link* to the board's page with the licence respected, or a question written
  from scratch to the board's shape — never a transcription.
- **OpenStax carries a restriction that matters here.** The high-school
  *Physics* book's own reuse statement says it "may not be used in the training
  of large language models or otherwise be ingested into large language models
  or generative AI offerings without OpenStax's prior written permission", and
  that the book "uses the Creative Commons Attribution License, which means that
  you can reuse and modify the material only for noncommercial purposes, must
  attribute Texas Education Agency (TEA), and must distribute any derivative
  works under the same license." The OpenStax CMS API reports the book's
  `license_name` as "Creative Commons Attribution License 4.0" for
  `physics` but **CC-BY-NC-SA 4.0** for `college-physics-2e` and
  `university-physics-volume-1`; the page footer's operative wording is the
  NC-SA one. **Do not paste OpenStax prose into a chapter, and do not paste it
  into a prompt.** OpenStax can be read for structure and for what a US
  first-year treatment covers; it is not a source of text.
- **BBC Bitesize** is `© BBC` and not reusable.
- **Physics & Maths Tutor** hosts the boards' PDFs; the copyright in those
  remains the boards'. Treat PMT as a *reading route*, not as a licensing route.

**The one-line rule for the books:** the boards' documents may be *read* to
shape a chapter and *cited* for a claim, and may not be *copied*. A chapter with
a past-paper question in it needs a rewrite of the question, not a paste.

---

# Part 1 — Past papers and mark schemes

## 1.1 What a paper is made of

Read from the question-paper covers and the specifications. Every structural
fact here is from the board's own document.

| Qualification | Paper | Time | Marks | Sections | Extended response |
|---|---|---|---|---|---|
| AQA GCSE Physics 8463 | Paper 1, Paper 2 (each Foundation and Higher) | 1 h 45 | 100 each | one continuous paper | one or more 6-mark level-of-response items, no separate QWC mark |
| Edexcel GCSE Physics 1PH0 | Paper 1, Paper 2 (each F and H) | 1 h 45 | 100 each | mixed styles | **two** asterisked "Extended Open Response" 6-mark items per separate-science paper |
| OCR GCSE Physics A J249 | Foundation 01/02, Higher 03/04 | 1 h 45 | 90 each | Section A 15 MCQs (AO1/AO2 only); Section B up to 69 short answer + **one** 6-mark level-of-response item (asterisked) | exactly one asterisked item per paper |
| AQA A-level 7408 | Paper 1, Paper 2 | 2 h | 85 each | Section A 60 marks short/long answer; Section B **25 multiple-choice** | level-of-response items; no separate QWC mark |
| AQA A-level 7408 | Paper 3 | 2 h | 80 (Section A 45 + one Section B option 35) | Section A compulsory practical skills & data analysis; Section B one option | level-of-response items |
| Edexcel A-level 9PH0 | Paper 1, Paper 2 | 1 h 45 | 90 each | one continuous paper | asterisked QWE item |
| Edexcel A-level 9PH0 | Paper 3 General & Practical Principles | 2 h 30 | 120 | one continuous paper, synoptic | asterisked QWE item |
| OCR A-level H556 | Paper 1, Paper 2 | 2 h 15 | 100 each | Section A 15 MCQs; Section B 85 marks | **two** 6-mark level-of-response items per paper |
| OCR A-level H556 | Paper 3 Unified physics | 2 h 15 | 70 | no MCQs; short answer + extended; two 6-mark level-of-response items | two asterisked items |

Two things to carry from this table.

- **Section B is choice-free multiple choice at AQA A-level** (25 one-mark
  items), and **Section A is MCQ at OCR A-level** (15 one-mark items). Both
  boards use the MCQ block to cover breadth cheaply, not to carry the
  explanation load. A book that only practises long answers leaves a quarter of
  an AQA A-level paper untaught.
- **The three boards' extended-response signals are mechanically different.**
  AQA: a level-of-response mark scheme, no extra mark for English. OCR: an
  asterisk and an italicised "communication statement" that decides the mark
  *within* the level. Edexcel: an asterisk and marks split between indicative
  content and structure. Section 1.3 spells each out.

## 1.2 Command words, and what each one demands

This is the section the book most needs, because `AGENTS.md` already says to
use the board's command words with their exam meaning. The three boards do not
define them identically, and one board's "describe" is another's "explain".

### AQA

AQA states its principles for writing questions rather than a single glossary:
it "put[s] command words at the beginning of a sentence, and use[s] one per
sentence" (*Notes and guidance: Our exams explained*, GCSE Science, p. 8; read).
The 2025 GCSE mark scheme's level descriptors supply the meaning of the words
that carry the marks:

- **describe** — "Relevant points (reasons / causes) are identified", where the
  Level 2 descriptor requires those points be "given in detail and logically
  linked to form a clear account" (AQA 8463/1H June 2025 mark scheme; read).
- **explain** — AQA does not print a prose definition at GCSE; the papers and
  mark schemes mark it as an identification point plus a reasoning point, which
  is the same split Edexcel and OCR define in words (below).
- **plan a method** — "The method would lead to the production of a valid
  outcome. The key steps are identified and logically sequenced" (same scheme).
- **evaluate / compare** — AQA's 6-mark descriptors ask for a "coherent …
  evaluation … that considers a range of relevant points, quotes relevant data
  … and comes to a conclusion consistent with the reasoning" (*Our exams
  explained*, p. 46; read).

AQA's A-level command words are then read off the papers and the mark-scheme
instructions: `calculate`, `determine`, `deduce`, `explain`, `describe`,
`compare`, `sketch`, `suggest`, `discuss`, `state`, and **`show that`**. In the
June 2024 A-level Paper 1 the most frequent are `explain` (7), `state` (5),
`calculate` (4), `determine` (3), `deduce` (3); in the Paper 3 Section A
practical paper, `explain` (6), `determine` (6), `show that` (4) (word counts
taken from the extracted paper text).

### Pearson Edexcel

Edexcel prints a full taxonomy. Appendix 4 of the GCSE 1PH0 specification and
Appendix 7 of the A-level 9PH0 specification (both read) give, among others:

| Command word | Edexcel's definition (abridged) |
|---|---|
| Calculate | "Obtain a numerical answer, showing relevant working. If the answer has a unit, this must be included." |
| Describe | "Give an account of something. Statements … need to be developed … but do not need to include a justification or reason." |
| Explain | "An explanation requires a justification/exemplification of a point. The answer must contain some element of reasoning/justification. This can include mathematical explanations." |
| Compare | "Looking for the similarities or differences of two (or more) things. Should not require the drawing of a conclusion. Answer must relate to both (or all) things mentioned." |
| Evaluate | "Review information … then bring it together to form a conclusion, drawing on evidence including strengths, weaknesses, alternative actions, relevant data or information. Come to a supported judgement." |
| Determine | "The answer must have an element which is quantitative from the stimulus provided, or must show how the answer can be reached quantitatively." |
| Deduce / Derive | "Draw/reach conclusion(s) from the information provided" / "Combine two or more equations or principles to develop a new equation" (A-level adds `Derive` and `Criticise`). |
| Show that | "Prove that a numerical figure is as stated in the question. The answer must be to at least 1 more significant figure than the numerical figure in the question." |

The distinction to teach at both levels: **`describe` is not `explain`.**
Edexcel's own GCSE mark scheme front matter turns this into a marking rule: for
an "Explain" question the answer must "link … identification of a point with
reasoning/justification"; a bare statement scores the identification mark only
(Edexcel 1PH0 1H June 2025 mark scheme; read (mirror)).

### OCR

OCR prints a command-word list in *Exploring our question papers* (GCSE Gateway
Science) and in the A-level *Assessment story* (both read). They overlap but are
not identical, so a book spanning both qualifications should teach both sets.
The A-level list is the tighter one:

| Command word | OCR's A-level definition (abridged) |
|---|---|
| Calculate | "Work out the numerical value. Show your working when asked to." |
| Compare | "Give an account of the similarities and/or differences between two (or more) items or situations, referring to both (all) of them throughout." |
| Describe | "Give an account using relevant concepts, processes, characteristics and, if necessary, examples." |
| Explain | "Use relevant knowledge and/or evidence and/or ideas to demonstrate understanding why something is the case or how something happens." |
| Evaluate | "Make qualitative, or quantitative, judgements and/or reasoning conclusions." |
| Suggest | "There is often no single correct answer. Candidates will be given credit for sensible reasoning based on correct physics." |
| Show that | "Write down sufficient details, structured steps or calculations to prove a fact or answer." |
| Sketch | "Produce a simple, freehand drawing to illustrate the general point(s) being conveyed, using annotations as required." |
| Plot | "Mark points accurately for a given range of values, using labelled axes." |

OCR's GCSE list adds `analyse`, `conclude`, `convert`, `define`, `design`,
`estimate`, `identify`, `justify`, `measure`, `predict`, `recall`, `select`,
`state`, `use/using`, `write down` — and, crucially, contrasts `describe` with
`explain` in the same way the other boards do but in OCR's words: a description
"should address what happens, and when and/or where it happens", an explanation
"set[s] out reasons and/or mechanisms to address why and/or how something
happens" (read).

### The three command words a book most needs to teach apart

- **describe vs explain.** All three boards separate them, and all three make
  the difference a mark. `describe` gives an account; `explain` adds a reason.
  A student who answers "explain" with a description loses the reasoning half
  of every mark scheme. This is the single most reusable fact in this section.
- **determine vs calculate.** Edexcel's `determine` is explicitly not
  arithmetic-only: the answer "must have an element which is quantitative from
  the stimulus". A method answer can satisfy it.
- **show that.** All three boards require *more* precision than the question
  gave; Edexcel and AQA both say "one more significant figure", and Edexcel
  warns that too few significant figures loses the final mark outright.

## 1.3 How a 6-mark extended response is marked, and how a calculation is marked

### Levels of response — AQA

AQA uses three levels, **two marks in each level**, marked by "best fit": read
the whole answer, pick the level, then decide top or bottom of the level from
the quality. "Indicative content … is provided as a guide for examiners. It is
not intended to be exhaustive … Students do not have to cover all of the points
mentioned in the indicative content to reach the highest level." And: "full
marks can be awarded only if there are no incorrect statements that contradict a
correct response" (AQA 8463/1H June 2025 mark scheme; read).

AQA's own worked example (specific heat capacity method, 6 marks) shows the
shape: the top level is *not* "more facts", it is "the method would lead to the
production of a valid outcome … key steps are identified and logically
sequenced", and the scheme adds a single hard condition — "a level 3 answer must
have a clear method of how the mass of water is determined" (same scheme).

**AQA does not award a mark for written communication.** The GCSE papers carry
only the standard instruction "You are reminded of the need for good English and
clear presentation" (question-paper instruction; read). There is no QWC mark in
the mark scheme.

### The communication statement — OCR

OCR's level-of-response question is flagged with an asterisk. Three levels, two
marks each, and an **italicised communication statement** inside each level:

- the science content decides the level;
- the communication statement decides the mark *within* the level.

The wording is fixed across papers: level 3 is "There is a well-developed line
of reasoning which is clear and logically structured. The information presented
is relevant and substantiated"; level 2 is "There is a line of reasoning
presented with some structure. The information presented is relevant and
supported by some evidence"; level 1 is "There is an attempt at a logical
structure with a line of reasoning. The information is in the most part
relevant" (OCR H556 *Assessment story*, p. 19, and OCR J249/03 June 2025 mark
scheme; read). This is the closest thing any of the three boards has to a
quality-of-writing signal, and it is worth teaching explicitly: an answer can be
physically correct and sit at the bottom of a level for being unstructured.

### Indicative content plus a structure mark — Edexcel

Edexcel awards an asterisked 6-mark item in a way none of the others does. Its
A-level mark scheme prints a **points table**: the number of indicative-content
points seen maps to an IC mark (e.g. six points → 4 marks), then a **separate
mark out of 2** is given for "coherent and logical structure with linkage and
fully sustained lines of reasoning demonstrated throughout" (Edexcel 9PH0 Paper 1
June 2025 mark scheme; read (mirror)). The maximum final mark is the sum of the
two, and the scheme's own table caps the linkage mark at zero when there is no
linkage at all.

At GCSE, Edexcel's public *Extended Open Response* guidance states the rule
plainly: EOR questions "are the 6-mark questions found towards the end of a
paper. There is one in each Combined Science paper and two in each Separate
Science paper"; "There is no longer a requirement to test the quality of written
communication … However, there is a requirement to test candidates' ability to
construct a sustained line of reasoning. Questions assessing this will be marked
with an asterisk*" (Pearson Edexcel, *GCSE (9-1) Sciences — Guidance for
Extended Open Response questions*; read). The level descriptors there are
generic across the sciences — Level 1 (1–2), Level 2 (3–4), Level 3 (5–6) — and
the physics examples in the same document are all method-design or
measurement items (measuring power; measuring resistance), not recall.

The candidate instruction on the paper is fixed: "In the question marked with an
asterisk (*), marks will be awarded for your ability to [organise] your answer
logically, showing how the points that you make are related or follow on from
each other where appropriate" (Edexcel 9PH0 Paper 1 June 2025 question paper;
read (mirror)).

### A calculation is marked differently — and the difference is teachable

All three boards award method marks stage by stage and allow a correct final
answer without working:

- AQA GCSE: "Marks should be awarded for each stage of the calculation completed
  correctly … Full marks should be awarded for a correct numerical answer,
  without any working shown. Full marks are not awarded for a correct final
  answer from incorrect working." (AQA 8463/1H June 2025 mark scheme; read).
- AQA A-level: "A calculation must be followed through to answer in decimal
  form. An answer in surd form is never acceptable for the final (evaluation)
  mark in a calculation" (AQA 7408/1 June 2024 mark scheme; read).
- OCR: "if the answer on the answer line is correct, full marks would be awarded
  (unless the question has specifically said that working must be shown)"
  (*Exploring our question papers*; read).
- Edexcel: "award full marks for the correct answer without working"
  (Edexcel 1PH0 1H June 2025 mark scheme; read (mirror)).

**The book's practice pages should therefore rehearse both shapes deliberately:**
a 2–3 mark calculation where the marks are for substitution, rearrangement and
evaluation; and a 6-mark explanation where the marks are for content *plus*
structure. Practising one does not train the other.

## 1.4 Significant figures

The three boards' rules are close but not identical, and each is stated in the
mark scheme itself, which is what makes them learnable.

| Board | Rule as printed |
|---|---|
| AQA A-level | Up to 2 marks per paper (1 at AS) depend on quoting the final answer to a specified number of significant figures, normally that of "the datum with the least number of sf … or this sf −1". In a `show that` the answer must be to one *more* sf than the value in the question. "An answer in surd form cannot gain the sf mark. An incorrect calculation following some working can gain the sf mark." "An answer to 1 sf will not normally be acceptable, unless the answer is an integer." |
| Edexcel A-level | Too many sf is not penalised if the answer rounds to the mark-scheme value. Too few sf loses the final mark in a `show that`. In practical-skill questions "a specific number of significant figures will be required". Using `g = 10` instead of 9.81 is penalised one mark, once per clip. |
| OCR A-level | "If the data given in a question is to 2 sf, then allow an answer to 2 or more significant figures. If an answer is given to fewer than 2 sf, then penalise once only in the entire paper." |

Sources: AQA 7408/1 June 2024 mark scheme §3.8 (read); Edexcel 9PH0 Paper 1
June 2025 mark scheme §3.1–3.5 (read (mirror)); OCR H556/01 June 2024 mark
scheme, "SIGNIFICANT FIGURES" (read).

**Consequence for the book.** "Round once, at the end, to the precision of the
least precise datum" is the teachable rule, and it is the rule
`physics-verifier-gaps.md` §3.2 already says a physics oracle needs a
`sigfigs` check to enforce. It is not the same claim as "the answer is a
multiple of 0.01".

## 1.5 Units

Every board marks units, and every board marks them differently from significant
figures.

- **AQA A-level:** up to 2 marks per paper (1 at AS) depend on the correct unit
  being quoted for a calculation. The expected unit is the "most commonly agreed
  form"; a string of base units is not accepted — `1 tesla` or `1 Wb m⁻²` are
  both fine for magnetic flux density, `1 kg m² s⁻² A⁻¹` is not (AQA 7408/1 June
  2024 mark scheme §3.9; read).
- **Edexcel A-level:** "A separate mark is not usually given for a unit but a
  missing or incorrect unit will normally mean that the final calculation mark
  will not be awarded", and it is penalised once only. It does not apply in
  `show that` questions or where the units are given (Edexcel 9PH0 Paper 1 June
  2025 mark scheme §2; read (mirror)).
- **OCR:** the mark scheme guidance carries the unit requirement and the
  marker's annotation set names its own failure modes: "Rounding error", "Error
  in number of significant figures", and "Error carried forward" are three
  separate annotations (OCR J249/03 June 2025 mark scheme, §11; read). The
  GCE mark schemes carry a `POT` power-of-ten annotation as well (OCR H556/01
  June 2024; read).
- **GCSE:** there is no separate unit annotation; the unit is part of the
  evaluation mark. Edexcel prints it as "evaluation and unit (1)" and adds
  "4.3 x 10⁹ with no unit or the wrong unit scores 1 mark" (Edexcel 1PH0 1H June
  2025 mark scheme; read (mirror)). AQA's GCSE mark schemes fold the unit into
  the final evaluation step in the same way. Where the requirement is explicit,
  it is explicit in the *question*: "State an appropriate SI unit" appears in
  AQA 7408/1, 7408/2 and 7408/3A June 2024 (read).

**Consequence for the book.** "Write the unit with every numerical answer" is
not politeness. At Edexcel A-level a missing unit normally costs the final
calculation mark; at Edexcel GCSE it costs part of the evaluation mark; AQA
spends up to 2 marks a paper on the unit alone; and OCR makes its failure modes
separate annotations in the marker's interface. This is exactly the
`kind: dimensions` check in `physics-verifier-gaps.md` §3.1 — but the *bank* has
to also assert that the printed answer carries the unit, because the CAS cannot
see it.

## 1.6 Error carried forward (ecf)

All three boards allow a follow-through, and all three print the abbreviation.

- **AQA**: "An error can be carried forward from one question part to the next
  and is shown by the abbreviation 'ecf'. Within an individual question part, an
  incorrect value in one step of a calculation does not prevent all of the
  subsequent marks being awarded." A-level adds that "an arithmetic error should
  be penalised for one mark only" (AQA 8463/1H June 2025 and 7408/1 June 2024
  mark schemes; read).
- **OCR** goes further and distinguishes the *kinds* of slip: `AE` arithmetic
  error, `TE` transcription error, `POT` power-of-ten error, `XP` wrong physics
  or equation. "Within a question, ECF can be given for AE, TE and POT errors
  but not for XP" (OCR H556/01 June 2024 mark scheme; read). **This is the most
  useful single table for a physics book**, because it separates the three
  careless slips (which are forgiven) from the one conceptual error (which is
  not).
- **Edexcel** prints `[ecf]` in the additional guidance and "allow ECF from
  MP1" in the marks column (Edexcel 1PH0 1H June 2025 mark scheme; read
  (mirror)).

**Consequence for the book.** A "Watch out." callout can honestly say *which*
error the mark scheme forgives. Teaching "if your value is wrong but your method
is right you still score the method marks, but if you use the wrong equation you
score nothing" is a real examinable fact, not reassurance.

## 1.7 Required practicals, and what a required-practical question looks like

The board-by-board practical counts are in `physics.md` §2 and are not repeated
here. What this pass adds is the **shape of the question**.

**AQA.** The mark scheme tags every practical question with `RPA<n>` in the
spec-ref column, so the mapping from a question to a required practical is
published. In AQA 8463 the tags are per paper: 1H June 2025 uses `RPA1` and
`RPA4`; 2H June 2025 uses `RPA6`; 2H June 2024 uses `RPA7` and `RPA9` (counted
from the extracted mark schemes). Across the GCSE physics papers AQA therefore
tags practicals 1, 4, 6, 7 and 9. AQA's A-level practical
paper is Paper 3 Section A (45 marks, with the paper advising 70 minutes of the
2 hours on it), and the board's own report notes that the 2024 paper was changed
"to draw the attention of the students to when a required practical activity was
being tested" — question 1 was based on RPA 5 and question 3 on RPA 10 (AQA
7408/3A June 2024 *Report on the Examination*; read).

A required-practical question in practice has four recognisable shapes.

1. **Measure or read an instrument.** "In 01.2 87% correctly indicated that the
   reading shown was 6.72 mm" — a micrometer screw gauge on a diagram (AQA
   7408/3A June 2024 report; read).
2. **State *and* explain a technique.** The same question asked students to
   "state and explain how the micrometer should be closed"; the report says
   "many could 'state' what they should do but then overlooked the 'explain'
   part". This is the `describe`/`explain` split wearing a lab coat.
3. **Plan the method (6 marks, level of response).** AQA's GCSE example is the
   specific heat capacity method: the descriptor is "would lead to the production
   of a valid outcome", and the single hard requirement is that the answer shows
   how the *mass of water* is determined (AQA 8463/1H June 2025 mark scheme;
   read). At A-level OCR asks candidates to "design their own experiment"
   (OCR H556/03 June 2024 *Examiners' report*; read).
4. **Evaluate the data, including a graph and an uncertainty.** See §1.8.

**OCR.** OCR does not tag papers with `PAG` codes, but its specification maps
learning outcomes to PAG1–PAG12 and the papers test the principles rather than
the specific practical: "The examination is testing their understanding of the
principles and apparatus, not of the specific PAG that they may have completed"
(*Exploring our question papers*; read). OCR's "Practical skills assessed within
papers" table is the clearest published list of what a practical question can
ask, split into Planning / Implementing / Analysis / Evaluation — including
"Identifying anomalies in measurements", "Assessing precision and accuracy,
including uncertainties and percentage error" and "Refining experimental design
to improve procedure and apparatus" (OCR H556 *Assessment story*, p. 9; read).

**Edexcel.** The eight mandatory core practicals are in `physics.md` §2. Edexcel
A-level Paper 3 is the practical paper (40% of the qualification, 2 h 30,
120 marks) and the specification says it "will include questions that assess
conceptual and theoretical understanding of experimental methods (indirect
practical skills) that will draw on students' experiences of the core
practicals" (Edexcel 9PH0 specification; read). The mark scheme for that paper
shows the shapes: "comment on suitability consistent with stated
characteristics of circuit", and a four-mark item asking what *precision* and
*accuracy* mean and whether each can be claimed from a single reading —
"Precision is the closeness of agreement (consistency) between (repeated)
measurements"; "Accuracy is how close the measured value is to the true value";
"The true value is not known, so the student cannot say the value will be
accurate" (Edexcel 9PH0 Paper 3 June 2025 mark scheme; read (mirror)).

**The shape the books should rehearse most.** Not "recite the method", but
"given this apparatus and this data, say what to do, what could go wrong, and
whether the conclusion holds." That is precisely the class of answer
`physics-verifier-gaps.md` §4 says a CAS cannot check and a `structured` check
can only half-check.

## 1.8 How graphs, gradients and uncertainties are actually assessed

This is where the physics book earns its keep and where the verifier cannot
help, so it is worth being concrete.

### Reading a graph

- **Read a value off a line.** AQA's GCSE papers ask this directly and allow "a
  large tolerance" for the read-off where the lines are close ("a large
  tolerance was allowed as the two lines had similar gradients at the
  cross-over point") (AQA 8463/1H June 2025 *Report on the examination*; read).
- **Estimate an area under a curve**, or a tangent — explicitly named in AQA's
  own GCSE guidance: "In this question students are asked to estimate the area
  under a curve. This is conceptually challenging" (*Our exams explained*;
  read). This is DfE maths skill C.3.8 in `physics.md`.
- **Describe and analyse a v–t graph** as the level-of-response question. OCR's
  June 2025 J249/03 level-of-response item is exactly this, and the report names
  the classic error: "A recurring mistake was to confuse this question with a
  distance–time graph, particularly with the horizontal portion" (OCR J249/03
  Summer 2025 *Examiners' report*; read).

### Plotting marks, as the mark scheme prints them

Edexcel's A-level mark scheme has a dedicated **Graphs** section that is the
most explicit published list of what a graph mark is:

- a mark for axes requires "both axes … labelled with quantities and units, and
  drawn the correct way round";
- a mark for scale requires the scale to fit all points, spread them "over more
  than half of each axis" and not be "an awkward scale e.g. multiples of 3, 7";
- "Points should be plotted to within 1 mm";
- "For a line mark there must be a thin continuous line which is the best-fit
  line for the candidate's results" (Edexcel 9PH0 Paper 3 June 2025 mark scheme;
  read (mirror)).

### Gradient and uncertainty

- **Use the line, not the table.** OCR's report: "it is important to use points
  on the line of best fit to calculate a gradient (which are not necessarily
  points from the table)", and a "large triangle" is expected (OCR H556/03
  Summer 2024 *Examiners' report*; read).
- **Uncertainty from a graph** is via lines of maximum and minimum gradient (or
  "best fit" / "worst fit") through error bars. AQA's report describes the error
  precisely: students "would draw a line from the bottom of the first error bar
  to the top of the last bar, overlooking the need to make sure the line passed
  through all the other error bars" (AQA 7408/3A June 2024 report; read). It
  also notes that "the use of error bars in drawing the lines of maximum or
  minimum gradient was poorly explained" and that the board "allowed them to
  give correct expressions for fractional or percentage uncertainty".
- **The whole uncertainty toolkit** is stated by Edexcel in its specification
  Appendix 10, on the authority of the ASE's *The Language of Measurement*:
  the uncertainty of a mean can come from the half-range, from the reading
  furthest from the mean, or from the resolution of the instrument (half a
  division, so a 0.1 A digital ammeter has a 0.05 A uncertainty); percentage
  uncertainty is uncertainty ÷ measurement × 100% (Edexcel 9PH0 specification
  Appendix 10; read). This is the citation a chapter on uncertainty should use,
  and it matches the `kind: uncertainty` sketch in `physics-verifier-gaps.md`
  §3.3.

### The uncertainty misconception worth naming

OCR's report names it in one sentence, which is a gift to a "Watch out."
callout:

> "There is still a common misconception that data given to 3s.f. is more
> precise than data given to 2s.f."

(OCR H556/03 Summer 2024 *Examiners' report*; read.) The report then says the
better answer goes on to *quantify*: for a range of 0.6 s on a mean of 14.4 s,
"this gives a percentage uncertainty of 4.2%", where "the data is fairly close
together" scores nothing. Precision is a property of the spread, not of the
number of digits.

## 1.9 Examiner reports: the mistakes students actually make

`AGENTS.md` says the misconception callouts "depend on this" — on what examiners
say students get wrong. AQA and OCR publish examiner reports freely; Edexcel's
are login-gated (see the escalation). The following are the ones that recur
across more than one paper or more than one board, and each is a candidate for a
`> **Watch out.**` callout. All are **read** from the named report.

**Measurement and calculation**

- Acceleration in m/s² does not mean you square the *number*: "There are a
  significant number of students that think a value with a square or cube in the
  unit needs to be squared / cubed when substituted into an equation" (AQA
  8463/2H June 2025 report).
- Equation triangles cause a net *loss*: "The use of equation triangles seems to
  confuse many students. Many could correctly write down the equation in one
  question but then tried to use an equation triangle but incorrectly." The
  board recommends substituting into the equation as printed on the sheet.
- Rounding mid-calculation: "Students need to be aware that rounding a value in
  the middle of a calculation is often not helpful" (same report).
- Powers of ten: "Some imported a power of ten error from their 01.5 calculation
  which led to them identifying copper. Others simply ignored powers of ten
  altogether" (AQA 7408/3A June 2024 report).
- Unit conversion: "Many students struggled to convert 22°C into kelvin", and
  "Some candidates did not convert from g to kg" (AQA 7408/1 June 2024 report;
  OCR J249/03 Summer 2025 report).

**Physics concepts**

- Annihilation: "fewer than 35% of students identified annihilation of the
  positron with an electron as the source of more gamma photons" (AQA 7408/1
  June 2024 report).
- Photon rest mass: students "identified the difference in rest mass between the
  pion and positron/electron pair and assumed it was 'given' to the photon",
  rather than that a photon's rest mass is zero (same report).
- Stationary waves: "Most students who did not get the mark … assumed that the
  amplitude of the stationary wave and progressive waves were the same", and
  students split 50:50 on whether a phase difference was 0 or π (same report).
- Nodes: in one MCQ "most students chose … the distance between two nodes, or
  half the wavelength" (same report).
- Left-hand rule: "Only the better students correctly realised that when the
  balance reading decreased, the force on the rod must be downwards" and
  direction was often not identified (AQA 7408/3A June 2024 report).
- v–t confused with s–t: "A recurring mistake was to confuse this question with
  a distance–time graph, particularly with the horizontal portion" (OCR
  J249/03 Summer 2025 report).
- Specific heat capacity vs latent heat: students who did well "knew the
  difference between latent heat and specific heat capacity"; those who did less
  well "were unfamiliar with the equations and so chose the wrong one" (same
  report).
- Environmental claims need the datum: "Students who said that tidal power
  output was greater than wind power did not score a mark without reference to a
  particular flow speed" (AQA 8463/1H June 2025 report).

**Answering technique**

- Not doing what the command word asked: "many could 'state' what they should
  do but then overlooked the 'explain' part" (AQA 7408/3A June 2024 report).
- No working: "did not write working out for calculations" (OCR J249/03 Summer
  2025 report).
- Vague evaluation: "the data is fairly close together" and "it gets less
  precise as N increases" gained no credit; a quantified comparison did (OCR
  H556/03 Summer 2024 report).
- The list principle: "Students did not cross out the work they did not want to
  be marked. This results in the 'list principle' being applied which means if
  there are two sets of working or answers and they conflict, the student scores
  zero" (AQA 8463/1H June 2025 report). AQA's mark scheme spells the principle
  out as "right + wrong = wrong".

---

# Part 2 — Existing textbooks and open resources

## 2.1 OpenStax (read — the only full open textbook that could be opened)

OpenStax is the Free textbook programme of Rice University. Three of its physics
books are relevant, and their licences differ, which is why the API was queried
rather than assumed:

| Book | slug | Licence reported by the API | State |
|---|---|---|---|
| Physics (high school / TEA) | `physics` | "Creative Commons Attribution License 4.0" — but the book's own reuse statement is CC-BY-NC-SA, attributing the Texas Education Agency | live |
| College Physics 2e | `college-physics-2e` | CC-BY-NC-SA 4.0 | live |
| University Physics Volume 1 | `university-physics-volume-1` | CC-BY-NC-SA 4.0 | live |

Structure (read from a server-rendered section page,
`openstax.org/books/physics/pages/2-1-relative-motion-distance-and-displacement`):

- **Section Learning Objectives**, phrased in Student-facing "By the end of this
  section, you will be able to do the following: …" form.
- **Section Key Terms** as a vocabulary block.
- **Teacher Support** boxes, keyed to a US state standard.
- The teaching, with **Worked Example** boxes and **"Grasp Check"** /
  **"Check Your Understanding"** prompts inside the prose.
- **"Watch Physics"** video embeds, **"Links To Physics"** and **"Practice
  Problems"**.
- End-of-chapter **Conceptual Questions** and **Problems** exercises.

What is worth borrowing: the explicit *objectives → key terms → worked example →
check-your-understanding → practice* rhythm, and the practice of naming the
objectives at the top of a section. What is *not* worth borrowing: the US
contexts and units, the teacher-facing boilerplate, and the reliance on embedded
video. It is also a US college-prep treatment, so its demand profile is not
GCSE.

Its derivation style, in the sections sampled, is "state the equation, substitute
the numbers, comment on the result" with the algebra shown one line at a time;
it does not ask the learner to predict first. That is the opposite of the
chapter formula's `Predict → Test → Explain`.

## 2.2 Physics & Maths Tutor (read)

PMT is a UK revision site. Its physics index lists revision notes and past
papers per board, and the past-paper pages mirror AQA, OCR and Edexcel papers by
year with both question paper and mark scheme, plus "MA" (model answers) files
for some years (`physicsandmathstutor.com/past-papers/a-level-physics/`; read).

Its relevance to this project is primarily **access**: it is the only public
route found to Edexcel 1PH0/9PH0 papers, because Pearson's own copies are
gated. Its own revision content is a list of downloadable PDFs rather than an
interactive book, so it offers little on voice or on guided investigation. It
is a route, not a model.

## 2.3 BBC Bitesize (read)

BBC Bitesize's GCSE Physics page is board-specific (there is a distinct "GCSE
Physics (Single Science) – AQA" index; read from
`bbc.co.uk/bitesize/examspecs/zsc9rdm`). The index is organised by the AQA
topic list (Energy, Electricity, Particle model, Atomic structure, Forces,
Waves, Magnetism and electromagnetism, Space physics, plus Physics practicals
and Practical skills), and each topic page is a **video playlist** with short
presenter-led clips, alongside:
- "GCSE Physics: exam-style quiz by topic";
- "GCSE Physics: exam-style questions";
- "GCSE Physics: quick-fire questions";
- "GCSE Physics: using past papers effectively";
- **Flashcards**;
- outbound links to **Isaac Physics**, Quizlet and Tassomai.

The written "guide" pages that Bitesize was once known for are not what the
topic URLs serve now in a plain fetch (the topic pages returned are video and
quiz pages). What is worth borrowing: the *past-paper-shaped quiz* and the
equation/flashcard drills next to the topic list, and the fact that the practical
work is a first-class index entry. What is not: the video-first presentation,
which is exactly the "lively activity substitutes for teaching" failure the
chapter formula warns against.

## 2.4 Isaac Physics (described only)

`isaacphysics.org` (which now redirects to `isaacscience.org`) is a JavaScript
single-page application. A plain fetch of `/`, `/about` and
`/concepts/cp_kinetic_energy` returns a 3.2 KB shell reading "You need to enable
JavaScript to access Isaac Science." Its public sitemap
(`isaacphysics.org/sitemap.xml`; read) does expose the structure:

- `/concepts/<slug>` — hundreds of concept pages, physics ones prefixed `cp_`;
- `/books/…`, including `physics_skills_19`, `phys_book_gcse`,
  `solve_physics_problems`, `step_into_phys`, `step_up_phys`,
  `linking_concepts`;
- `/<subject>/<level>/question_decks` for GCSE and A-level.

So it is question-bank-and-concept-first, with free-response questions that
accept algebraic and numeric answers, and a "skills" spine. **No claim is made
here about how it teaches**, because its content could not be opened. It is
worth a second look in an environment with a headless browser, because it is the
closest thing in the UK to the `structured` verification idea in
`physics-verifier-gaps.md` §4.

## 2.5 Khan Academy and CK-12 (described only)

Both are client-side rendered. A fetch of `khanacademy.org/science/physics`
returns a JavaScript-disabled notice; `ck12.org/student/` returns a 5.5 KB
shell, and CK-12's sitemap lists only marketing and school pages, not lessons.
Neither could be opened, so **nothing is asserted** about their physics
structure, voice or question design.

---

# Part 3 — What this means for our book

Everything here maps to the chapter formula in `AGENTS.md` and to the page
contracts in `.agents/skills/author-textbook-chapter/SKILL.md`. The internal
names (`Learn`, `Practise with help`, `Practise`, `Progress check`) are used
because this note is for authors, not readers.

## 3.1 GCSE Physics

### The command words we must teach

Teach these six explicitly, with the board's own meaning, and rehearse the
difference rather than assuming it:

1. **describe** — an account; no reason required. *Do not answer an `explain`
   with a description.*
2. **explain** — a reason or mechanism attached to a point. The EOR and
   level-of-response descriptors all key on "logically linked" or "reasoning".
3. **compare** — similarities *and* differences, referred to throughout.
   Edexcel explicitly says it "should not require the drawing of a conclusion".
4. **calculate** — a numerical answer with working; the unit is part of the
   answer.
5. **determine** — Edexcel's word for "quantitative from the stimulus" or
   "show how the answer can be reached quantitatively"; not merely arithmetic.
6. **show that** — prove a stated value, quoting *one more* significant figure
   than the value given.

Also worth a line each, because they appear and are cheap to get wrong:
**suggest** (no single right answer; credit sensible reasoning — OCR), **state /
give / name** (recall), **estimate** and **sketch** (Bitesize and the boards both
use them), **plan/devise** (a method that would produce valid results).

### The question shapes worth rehearsing

- **The 2–3 mark calculation** split into substitution, rearrangement and
  evaluation marks, where a correct final answer with no working scores full
  marks but a correct final answer from wrong working does not.
- **The 6-mark level-of-response explanation**, rehearsed for *structure* as
  well as content: at OCR the structure decides the mark within the level, at
  Edexcel it is up to 2 of the 6 marks, at AQA a "clear account" is the Level 2
  descriptor. Practise the same physics as a rough bullet list and as a linked
  account, and compare.
- **The 6-mark method-design item** (Edexcel's EOR set is almost entirely
  method items; AQA's example is the specific heat capacity method). The hard
  requirement is that the method would *work* — for AQA's example, that it
  shows how the mass of water is found.
- **Read-a-value / plot / draw-the-best-fit / estimate-the-area graph items**,
  including the read-off-with-tolerance case and the "which is the gradient"
  case.
- **A required-practical data question**: read an instrument, state *and*
  explain a technique, comment on precision and accuracy, identify an anomaly.
- **The multiple-choice block** if the book ever spans boards — OCR's GCSE
  Section A is 15 MCQs and OCR says the distractors are chosen from "common
  misconceptions"; AQA's are "not … easy marks". Multiple choice is where a
  misconception is cheapest to test.

### The practicals we must cover

The required lists differ per board and are already tabulated in `physics.md`
§2 (AQA ten with two physics-only; Edexcel eight mandatory; OCR no numbered list
but a practical-skills topic and 15% of the marks). The book's own board
selection decides which list applies. What this pass adds is the *coverage
discipline*: every required practical should appear at least once in a
`Learn` page and at least once in a `Practise`/`Practise with help` item, and
the item should ask for something the board's mark scheme actually asks —
a reading, a stated-and-explained technique, a method, an evaluation — not a
recitation of the method.

### The misconceptions worth naming

Take them from §1.9, where each is read from a board's examiner report. The
GCSE-priority set:

- a squared unit in the answer does not mean squaring the number substituted;
- equation triangles lose marks — substitute into the equation as printed;
- do not round in the middle of a calculation;
- convert g to kg, and °C to K, before substituting;
- the horizontal part of a *velocity*–time graph is constant velocity, not
  "stationary" as on a distance–time graph;
- `describe` answers do not earn the `explain` mark;
- an unquantified comparison ("wind is bigger") is not a comparison mark;
- the list principle: two conflicting answers score zero, so cross out.

### What the verifier can and cannot do here

The numeric spine — substitution, rearranged equations, sig figs, units,
uncertainty bands and graph gradients — is checkable and is sketched in
`physics-verifier-gaps.md`. Every item above in the "question shapes" list that
is an explanation, a method or a conclusion can only be a `structured` presence
check plus human review. The GCSE book should therefore expect a mix: `evaluate`,
`sigfigs`, `uncertainty` and `gradient` checks on the calculation and graph
items, `structured` on the explanation and practical items, and a `Learn` page
that teaches the structure the explanation needs.

## 3.2 A-level Physics

### The command words we must teach

The A-level list is wider than GCSE and the boards differ, so teach the union
and mark the board-specific ones:

- **explain** and **describe** — again the highest-frequency pair; `explain`
  dominates both AQA and OCR A-level papers.
- **show that** — with the "one more significant figure" rule and the Edexcel
  warning that too few significant figures loses the final mark.
- **derive** (Edexcel only) — "combine two or more equations or principles to
  develop a new equation". AQA asks for derivations in its content, so teach
  derivation as a genre even where the command word is Edexcel's.
- **determine**, **deduce**, **calculate** — as at GCSE, with `determine`
  carrying the "quantitative from the stimulus" meaning.
- **sketch** — a freehand line with labelled axes and important features, axes
  not scaled; contrasted with **plot** (accurate points, labelled axes, line of
  best fit).
- **suggest** and **criticise** (Edexcel) — "credit for sensible reasoning based
  on correct physics"; "look at the merits and/or faults … and back judgements
  made".
- **evaluate / discuss / assess / comment on** — a judgement supported by
  evidence, which is exactly what the level-of-response descriptors reward.

### The question shapes worth rehearsing

- **The 6-mark level-of-response question, rehearsed three ways** because the
  three boards reward it differently: AQA's *levels, two marks each, best fit*;
  OCR's *level from the science, mark from the communication statement*;
  Edexcel's *indicative content points plus a structure mark out of 2*. A single
  model answer cannot serve all three, so the book should teach the *shape of a
  linked argument* that satisfies all three, and then note the difference.
- **The `show that` calculation**, where the answer must be quoted to one more
  significant figure than the given value and the working must be laid out so an
  examiner can see the steps — OCR's report is explicit that a bare arithmetic
  statement with no reasoning "is not enough".
- **The practical-paper design question** (OCR H556/03 asks candidates to design
  their own experiment; AQA 7408/3A question 1 is a resistivity determination
  with a max/min-gradient uncertainty). The expected answer names apparatus,
  gives a method in order, says how the data is analysed, and comments on
  accuracy or on an improvement.
- **The graph-and-uncertainty question**: plot to the mark-scheme rules (axes
  with quantity and unit, scale covering more than half the axis, points within
  1 mm, a thin best-fit line), read the gradient from the *line* with a large
  triangle, and put error bars and max/min-gradient lines through *all* the
  bars.
- **The precision-vs-accuracy item** — define both and then say whether each can
  be claimed from the data given. This is a recurring Edexcel Paper 3 shape and
  a good `structured` check candidate.
- **The 15-mark MCQ Section A** (OCR) and the 25-mark MCQ Section B (AQA): a
  mixed-practice page should carry some one-mark items, because a quarter of an
  AQA paper and a sixth of an OCR paper is decided there.

### The practicals we must cover

Twelve identified practical activities at all three boards, with the Practical
Endorsement separate (see `physics.md` §2). The written paper is where the
book's coverage must land: A-level questions test the *principles and
apparatus*, not the specific practical done in school (OCR's words), so the book
must teach the apparatus and the data analysis, not narrate one centre's
protocol. The recurring analysis skills are OCR's published list: processing and
interpreting results, appropriate significant figures, gradients and intercepts,
anomalies, limitations, precision and accuracy including uncertainties and
percentage error, and refining a design.

### The misconceptions worth naming

The A-level-priority set from §1.9:

- a photon has zero rest mass; a mass difference appears as kinetic energy, not
  as photon mass;
- annihilation is a source of gammas (fewer than 35% of AQA candidates found
  it);
- the amplitude of a stationary wave is not the amplitude of either progressive
  wave; a node-to-node distance is half a wavelength;
- use the left-hand rule and identify the current direction before deciding a
  force direction;
- `g = 10` costs a mark at Edexcel — use 9.81;
- conversion to kelvin, and g to kg, before substituting;
- `log(A ÷ B)` is not `log A ÷ log B`;
- precision is about spread, not about the number of significant figures;
- error bars and the max/min-gradient lines must pass through the bars;
- round once, at the end; a value in surd form cannot gain the final mark;
- do not use the wrong equation: at OCR a wrong equation is annotated `XP` and
  breaks the error-carried-forward chain, unlike an arithmetic, transcription or
  power-of-ten slip.

### What the verifier can and cannot do here

The A-level book leans harder on the unverifiable, so the split should be
explicit in the banks. `evaluate`, `sigfigs`, `uncertainty`, `resolve`,
`gradient`/`intercept`/`area` and the equations-sheet coverage check cover the
arithmetic, dimensional and graph spine; `structured` covers the presence of the
required steps and concepts in a method, an explanation or a conclusion; and
human review covers whether the physics is right. The book should not pretend
otherwise, and neither should the banks — `physics-verifier-gaps.md` §6 lists
the same limits.

---

## Sources by claim, and how each was read

| Source | URL | Read as |
|---|---|---|
| AQA 8463/1H, 2H June 2025 question papers, mark schemes, reports | `https://www.aqa.org.uk/subjects/physics/gcse/physics-8463/assessment-resources` (PDFs on `cdn.sanity.io`) | read |
| AQA 8463/2H June 2024 question paper, mark scheme | same page | read |
| AQA GCSE Physics sample-set mark schemes | same page | read |
| AQA *Notes and guidance: Our exams explained* (GCSE science) | `https://cdn.sanity.io/files/p28bar15/green/8e496b826e157a0df530bd27751e7b769d9b506c.pdf` | read |
| AQA *Notes and guidance: Making questions clear* | `https://cdn.sanity.io/files/p28bar15/green/f6251dea255868ccb974faf9157192227850e2f5.pdf` | read |
| AQA 7407/7408 specification v1.4 | `https://cdn.sanity.io/files/p28bar15/green/fa68d54c1a3b8ef17760536c7fb2e3911c29dc73.pdf` | read |
| AQA 7408 Paper 1, 2, 3 Section A June 2024 question papers, mark schemes, reports | `https://www.aqa.org.uk/subjects/physics/a-level/physics-7408/assessment-resources` | read |
| AQA 7408 Paper 3 Section B (Astrophysics) June 2024 question paper | same page | read |
| OCR J249/03 and J249/04 June 2025 question papers, mark schemes, reports | `https://www.ocr.org.uk/qualifications/gcse/gateway-science-suite-physics-a-j249-from-2016/assessment/` | read |
| OCR J249/03 June 2024 and J249/03 sample assessment material | same page | read |
| OCR *Exploring our question papers* (Gateway Science) | `https://www.ocr.org.uk/Images/462559-exploring-our-question-papers-gateway-science.pdf` | read |
| OCR J249 *Exam hints for students* | `https://www.ocr.org.uk/Images/594807-exam-hints-for-students-a4-.pdf` | read |
| OCR H556/01 June 2024 and 2025, H556/03 June 2024 question papers, mark schemes, reports | `https://www.ocr.org.uk/qualifications/as-and-a-level/physics-a-h156-h556-from-2015/assessment/` | read |
| OCR H556 *Assessment story* | `https://www.ocr.org.uk/Images/assessment-story-exploring-our-question-papers-physicsa.pdf` | read |
| OCR H556 sample assessment material (Papers 1 and 3) | same assessment page | read |
| Edexcel 1PH0 specification Issue 4 | `https://qualifications.pearson.com/content/dam/pdf/GCSE/Science/2016/Specification/gcse-physics-spec.pdf` | read |
| Edexcel 9PH0 specification Issue 3 | `https://qualifications.pearson.com/content/dam/pdf/A%20Level/Physics/2015/Specification%20and%20sample%20assessments/pearsonedexcel-alevel-physics-spec.pdf` | read |
| Edexcel GCSE sciences *Guidance for Extended Open Response questions* | `https://qualifications.pearson.com/content/dam/pdf/GCSE/Science/2016/teaching-and-learning-materials/pearson-edexcel-gcse-sciences-extended-open-response-guidance.pdf` | read |
| Edexcel A-level Physics subject guide and transition guide | `https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/physics-2015.html` | read |
| Edexcel 9PH0 Paper 1 June 2025 question paper and mark scheme; Paper 3 June 2025 mark scheme; Paper 1 specimen mark scheme | `https://www.physicsandmathstutor.com/past-papers/a-level-physics/edexcel-paper-1/` | read (mirror) |
| Edexcel 1PH0 Paper 1H June 2025 question paper and mark scheme | `https://www.physicsandmathstutor.com/past-papers/gcse-physics/edexcel-paper-1/` | read (mirror) |
| Pearson's own exam-materials route | `https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/physics-2015/teaching-support/assessment-and-tracking-progress.html` | read (states examWizard / login gate) |
| OpenStax *Physics* and its CMS API | `https://openstax.org/details/books/physics`, `https://openstax.org/apps/cms/api/v2/pages/` | read |
| OpenStax *Physics* §2.1 | `https://openstax.org/books/physics/pages/2-1-relative-motion-distance-and-displacement` | read |
| BBC Bitesize GCSE Physics (AQA) | `https://www.bbc.co.uk/bitesize/examspecs/zsc9rdm` | read |
| Physics & Maths Tutor index and past-paper pages | `https://www.physicsandmathstutor.com/physics-revision/`, `…/past-papers/a-level-physics/` | read |
| Isaac Physics | `https://isaacphysics.org/sitemap.xml` | described only (JS shell) |
| Khan Academy Physics | `https://www.khanacademy.org/science/physics` | described only (JS shell) |
| CK-12 | `https://www.ck12.org/student/` | described only (JS shell) |
