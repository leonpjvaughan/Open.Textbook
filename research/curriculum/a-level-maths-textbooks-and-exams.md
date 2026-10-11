# A-level Mathematics in practice — past papers, mark schemes and textbooks

**Retrieved:** 2026-10-11 (every source fetched on this date; see
`a-level-maths-textbooks-and-exams.sources.yaml` for URLs and licences).
**Scope:** what AQA 7357, Pearson Edexcel 9MA0 and OCR H240 actually publish and
require — command words, how marks are awarded, how "show that" is marked, the
length and scaffolding of a question, the difficulty progression inside a paper,
what examiner reports say goes wrong, the Large Data Set in practice, the AS
versus A-level difference in questions, and the structure and voice of existing
textbooks and open resources. It closes with "What this means for our book".

**Purpose:** so that `books/a-level-maths/` is shaped by what a student actually
meets. Companion to `a-level-maths.md` (the syllabus, paper splits and verifier
gaps). No book directory was created.

**Citation convention.** `[id]` refers to an entry in
`a-level-maths-textbooks-and-exams.sources.yaml`. A claim without a tag is
arithmetic, a count I took from a document I name, or an explicit statement that
something could not be established.

**Read the document, or read a description of it?** This matters, so every
section says which. In short: **almost everything below was read from the
board's own primary document** — the question paper, mark scheme, examiner
report, specification or data file itself. The exceptions, all named in place,
are AQA's Large Data Set (never found), Dr Frost's lesson resources (behind
registration), the commercial A-level textbooks (not accessible), and the
identity of the datasets AQA hides. No content farm or revision-site summary is
used as evidence for a board's behaviour.

**Copyright — read §10 before using anything here.** These are exam boards'
copyrighted documents. This file summarises and cites them; it does not
reproduce them. No question, no mark scheme and no scanned page is copied into
this repository.

---

## 0. Headline findings

1. **All three boards' sample, past and examiner materials are publicly
   downloadable, but the route differs and one board gates the recent series.**
   OCR publishes everything under `ocr.org.uk/Images/`; Pearson's exam materials
   are freely downloadable from `/content/dam/pdf/A-Level/...` (not the
   `secure/silver` copies); AQA publishes 2018, 2019, November 2020, 2022 and
   June 2023 freely, and puts the 2021-onwards bundles behind a "Log in to
   myAQA" wall `[aqa-7357-resources]` `[ocr-h240-assessment]`
   `[pearson-content-api]`.
2. **Only OCR publishes a table of command-word meanings** — H240 specification
   §2d, which defines *Exact*, *Prove*, *Show that*, *Verify*, *Find/Solve/
   Calculate*, *Determine*, *Give/State/Write down* and "In this question you
   must show detailed reasoning" `[ocr-h240]`. AQA and Pearson do not have an
   equivalent table in their specifications; they define mark *types* in the mark
   scheme instead `[aqa-7357-ms-2019]` `[pearson-9ma0-01-ms-2025]`.
3. **A method mark can normally be implied by a correct answer — except when the
   command word forbids it.** OCR states this outright: a method mark "may usually
   be implied by a correct answer unless the question includes the DR statement,
   the command words 'Determine' or 'Show that', or some other indication that
   the method must be given explicitly" `[ocr-h240-01-ms-2025]`.
4. **"Show that" is marked for a complete, error-free argument, not for the
   answer.** The answer is already printed, so the last mark is conditional:
   AQA requires "at least one line of simplification … before given answer"
   `[aqa-7357-ms-2019]`; Pearson's `A1*` needs "the given answer with no errors
   seen" `[pearson-9ma0-01-ms-2025]`; Pearson's exemplar booklet fails a student
   who wrote the right final line because a previous line was wrong, commenting
   that in a "show that" question "it is important that all lines are correct"
   `[pearson-sam-exemplars-pure]`.
5. **A conclusion is part of the mark.** "Show that" answers lose marks for a
   missing concluding statement `[aqa-7357-p1-er-2023]`; "prove" answers need
   "a minimal overall conclusion eg. Proven, QED, tick"
   `[pearson-9ma0-01-ms-2025]`; statistics answers need "a correct conclusion in
   context" as a separate accuracy mark `[pearson-sam-exemplars-applied]`.
6. **Every paper is two hours and 100 marks, and the marks are where the length
   is.** Pearson 9MA0/01 June 2025 is 16 questions with totals from 3 to 9 marks
   `[pearson-9ma0-01-qp-2025]`; OCR H240/01 June 2025 is 12 questions in 38
   scored parts, of which 22 parts are worth 1 or 2 marks and the four largest
   (two of 5, two of 7) all sit in the second half `[ocr-h240-01-qp-2025]`;
   AQA 7357/1 June 2019 has 16 questions and *opens with three multiple-choice
   items* `[aqa-7357-01-qp-2019]` `[aqa-7357-p1-er-2019]`.
7. **Examiner reports are the misconception source, and they are the most
   directly useful documents for the book's "Watch out" callouts.** They name the
   error, not just the topic: vague pronouns in explanations, "exact value"
   read as a long decimal, `g = 10` ignored, mass confused with weight, 0.05 used
   instead of 0.025 in a two-tail test, an LDS answer asserting the data "is not
   representative" `[aqa-7357-p1-er-2023]` `[aqa-7357-p3-er-2023]`
   `[ocr-h240-03-er-2025]` `[pearson-9ma0-32-er-2025]`.
8. **Pearson's Large Data Set *is* identifiable — from the workbook, not the
   specification.** The specification says only that "Pearson has provided a
   large data set"; the published workbook names it and documents every variable:
   weather records for five UK stations (Camborne, Heathrow, Hurn, Leeming,
   Leuchars) and three overseas (Beijing, Jacksonville, Perth), May–October 1987
   and May–October 2015, from the Met Office `[pearson-lds]`. This closes a gap
   left open in `a-level-maths.md` §9. AQA's remains unfound.
9. **AS and A-level pure papers are the same size and shape.** Pearson
   `8MA0/01` (AS, June 2025) is also two hours, 100 marks, "15 questions"
   `[pearson-8ma0-01-qp-2025]`, against 16 questions for `9MA0/01`. The
   difference is content, not length: the AS paper cannot use A-level-only
   material such as radian measure or the reciprocal trigonometric functions.
10. **No open textbook covers UK A-level Mathematics.** OpenStax, CK-12, Khan
    Academy and Underground Mathematics all cover adjacent content with a
    different national shape; Underground Mathematics is the only one designed
    for post-16 UK mathematics, and it is deliberately task-based rather than a
    narrative textbook `[openstax-precalculus-2e]` `[ck12-calculus]`
    `[khan-precalculus]` `[underground-maths]`.

---

## 1. Sources and the exact commands used

All fetches used a browser user-agent and followed redirects; PDFs were converted
with `pdftotext -layout`, the legacy `.xls` with `python-calamine`, and
JavaScript-rendered board pages with Playwright driving the system Chrome.

```bash
UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
mkdir -p /tmp/pi-delegate/del-25/src && cd /tmp/pi-delegate/del-25
```

**AQA 7357 — papers, mark schemes, examiner reports and specimen.**

```bash
B=https://filestore.aqa.org.uk/sample-papers-and-mark-schemes
for p in 1 2 3; do
  curl -fsSL -m 240 -A "$UA" "$B/2019/june/AQA-7357$p-QP-JUN19.PDF"     -o src/aqa_7357$p-qp-jun19.pdf
  curl -fsSL -m 240 -A "$UA" "$B/2019/june/AQA-7357$p-W-MS-JUN19.PDF"  -o src/aqa_7357$p-ms-jun19.pdf
  curl -fsSL -m 240 -A "$UA" "$B/2019/june/AQA-7357$p-WRE-JUN19.PDF"   -o src/aqa_7357$p-wre-jun19.pdf
  curl -fsSL -m 240 -A "$UA" "$B/2023/june/AQA-7357$p-WRE-JUN23.PDF"   -o src/aqa_7357$p-wre-jun23.pdf
done
curl -fsSL -m 240 -A "$UA" https://filestore.aqa.org.uk/resources/mathematics/AQA-73571-SQP.PDF -o src/aqa_73571-sqp.pdf
curl -fsSL -m 240 -A "$UA" https://filestore.aqa.org.uk/resources/mathematics/AQA-73571-SMS.PDF -o src/aqa_73571-sms.pdf

# The 2023 mark schemes are NOT on filestore under -W-MS- (404); they are on aqa.org.uk/files/:
curl -s -o /dev/null -w '%{http_code}\n' -m 60 -A "$UA" -L \
  https://filestore.aqa.org.uk/sample-papers-and-mark-schemes/2023/june/AQA-73571-W-MS-JUN23.PDF   # 404
curl -fsSL -m 240 -A "$UA" -L \
  https://www.aqa.org.uk/files/sample-papers-and-mark-schemes.2023.june.AQA-73571-MS-JUN23_PDF/e79e15aa274dc5df317d425a5f0f3f04c5d2c8e4.pdf -o src/aqa_73571-ms-jun23.pdf
```

The freely published resource list (and the gating) was read by rendering AQA's
own assessment-resources page, because the static HTML contains no file links:

```bash
NODE_PATH=/home/leon/.npm/_npx/e41f203b7505f1fb/node_modules node dump5.cjs \
  "https://www.aqa.org.uk/subjects/mathematics/a-level/mathematics-7357/assessment-resources" > aqa_res_full.txt
NODE_PATH=... node aqafilt.cjs      # clicks the "Examiner Reports" / "Mark schemes" filters
curl -s -m 90 -A "$UA" -L "https://www.aqa.org.uk/search?q=large+data+set"   # shows "Log in to myAQA" on the ZIPs
```

**Pearson Edexcel 9MA0 (and 8MA0 AS) — papers, mark schemes, examiner reports,
sample-assessment exemplars and the data set.** Pearson's content is indexed by
a public Algolia index that its own course-materials page queries; browsing it
enumerates the exam materials and gives their DAM paths. Copying that path into
`qualifications.pearson.com` downloads the non-secure PDFs without a login.

```bash
API="https://l639t95u5a-dsn.algolia.net/1/indexes/qualifications-uk_LIVE_master-content/browse?x-algolia-application-id=L639T95U5A&x-algolia-api-key=f79c7a8352e9ffbdaec387bf43612ee6"
curl -s -m 120 -A "$UA" -X POST "$API" -H 'content-type: application/json' \
  --data '{"params":"filters=category:%22Pearson-UK:Specification-Code/maths-2017-as-al%22&hitsPerPage=1000&attributesToRetrieve=url,title,category,extension"}' \
  | python3 -c "import json,sys; [print(h['url'],'||',h['title']) for h in json.load(sys.stdin)['hits']]" > algolia_9ma0.txt
# 815 records; 712 are not under dam/secure (i.e. downloadable). Then, per file:
E="/content/dam/pdf/A-Level/Mathematics/2017/Exam-materials"
curl -fsSL -m 300 -A "$UA" "https://qualifications.pearson.com$(python3 -c "import urllib.parse,sys;print(urllib.parse.quote('$E/9ma0-01-que-20250605.pdf'))")" -o src/pearson_9ma0-01-qp-2025.pdf
# and likewise for 9ma0-01-rms-20250814.pdf, 9ma0-01-pef-20250814.pdf, paper 02, paper 31,
# paper 32 (mark scheme and examiner report), 9ma0-01-que-2018.pdf, 9ma0-03 (2018),
# 9MA0_01_pef_20190815.pdf, 8ma0-01-que-20250516.pdf, 8ma0-01-rms-20250814.pdf, 8ma0-01-pef-20250814.pdf
curl -fsSL -m 300 -A "$UA" "https://qualifications.pearson.com/content/dam/pdf/A%20Level/Mathematics/2017/Teaching%20and%20learning%20materials/AS_and_A_level_Maths_SAMs_Exemplar_answers_with_examiner_comments_Pure.pdf" -o src/pearson_sam-exemplars-pure.pdf
curl -fsSL -m 300 -A "$UA" "https://qualifications.pearson.com/content/dam/pdf/A%20Level/Mathematics/2017/specification-and-sample-assesment/Pearson%20Edexcel%20GCE%20AS%20and%20AL%20Mathematics%20data%20set%20-%20Issue%201%20(1).xls" -o src/pearson_lds.xls
```

**OCR H240 — papers, mark schemes and examiner reports.** The assessment page is
JavaScript-rendered, so the link list was taken from the rendered DOM:

```bash
NODE_PATH=... node dump3.cjs "https://www.ocr.org.uk/qualifications/as-and-a-level/mathematics-a-h230-h240-from-2017/assessment/" > ocr_assessment_links.txt
o() { curl -fsSL -m 240 -A "$UA" "https://www.ocr.org.uk/Images/$1" -o "src/$2"; }
o 752329-question-paper-pure-mathematics.pdf                 ocr_h240-01-qp-2025.pdf   # June 2025
o 752469-mark-scheme-pure-mathematics.pdf                    ocr_h240-01-ms-2025.pdf
o 751977-examiners-report-pure-mathematics.pdf               ocr_h240-01-er-2025.pdf
o 752331-question-paper-pure-mathematics-and-statistics.pdf  ocr_h240-02-qp-2025.pdf
o 752470-mark-scheme-pure-mathematics-and-statistics.pdf     ocr_h240-02-ms-2025.pdf
o 751976-examiners-report-pure-mathematics-and-statistics.pdf ocr_h240-02-er-2025.pdf
o 752333-question-paper-pure-mathematics-and-mechanics.pdf   ocr_h240-03-qp-2025.pdf
o 752471-mark-scheme-pure-mathematics-and-mechanics.pdf      ocr_h240-03-ms-2025.pdf
o 751975-examiners-report-pure-mathematics-and-mechanics.pdf ocr_h240-03-er-2025.pdf
o 726654-question-paper-pure-mathematics.pdf                 ocr_h240-01-qp-2024.pdf   # June 2024
o 726795-mark-scheme-pure-mathematics.pdf                    ocr_h240-01-ms-2024.pdf
o 726298-examiners-report-pure-mathematics.pdf               ocr_h240-01-er-2024.pdf
```

**Conversion.**

```bash
for f in src/*.pdf; do pdftotext -layout "$f" "txt/$(basename "$f" .pdf).txt"; done
uv run --no-project --with python-calamine python -c "..."   # pearson_lds.xls -> sheets and variables
```

**Probes that establish a negative**, recorded so the gaps are known to be gaps:

```bash
# AQA's own "Notes and guidance: large data set" page names no dataset (rendered with Playwright):
#   https://www.aqa.org.uk/resources/mathematics/as-and-a-level/assess/large-data-set
# aqa.org.uk/7357 redirects to the specification page, which names no dataset.
curl -s -m 60 -A "$UA" -L https://www.aqa.org.uk/7357 -o /dev/null -w '%{http_code} %{url_effective}\n'
# AQA plainer filestore guesses all 404 (the LDS is not published as AQA-7357-LDS.*):
for n in AQA-7357-LDS.XLSX AQA-7357-LDS-2020.XLSX AQA-7357-LDS.XLS AQA-7357-INS-LDS.PDF; do
  curl -s -o /dev/null -w "%{http_code} $n\n" -m 60 -A "$UA" -L "https://filestore.aqa.org.uk/resources/mathematics/$n"; done
```

**What I read directly, versus what I only read about.** `Role: primary` in the
manifest means I opened the board's own file. The only third-party pages used as
primary evidence for *that resource's own structure* are the OpenStax, CK-12,
Khan Academy, Underground Mathematics, NRICH, MEI, AMSP, PMT and Maths Genie
pages listed in §9. The commercial A-level textbooks (Hodder/MEI, Pearson,
Collins, CGP) were **not accessible and were not used**; nothing in §9 describes
them. Dr Frost's lesson resources were **not accessible** (registration); only
its public landing page was opened.

**The retry pass, and how the load-bearing claims were checked.** This document
was drafted in a first pass that reused the extracted text under
`/tmp/pi-delegate/del-25`. A second, time-boxed pass re-ran the retrievals and
confirmed that the extraction behind the central claims is faithful:

```bash
UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
curl -fsSL -m 200 -A "$UA" \
  https://filestore.aqa.org.uk/sample-papers-and-mark-schemes/2019/june/AQA-73571-W-MS-JUN19.PDF \
  -o aqa_ms.pdf && pdftotext -layout aqa_ms.pdf aqa_ms.txt
curl -fsSL -m 200 -A "$UA" \
  https://www.ocr.org.uk/Images/752469-mark-scheme-pure-mathematics.pdf \
  -o ocr_ms.pdf && pdftotext -layout ocr_ms.pdf ocr_ms.txt
sha256sum aqa_ms.pdf ocr_ms.pdf
```

Both re-fetched files are **byte-identical** (sha256 `f4944ae2…` for the AQA mark
scheme, `6d8afc9a…` for the OCR mark scheme) to the copies read the first time,
and the two decisive sentences were found in the fresh text: AQA's "Must see at
least one line of simplification after … before given answer" and OCR's "A
method mark may usually be implied by a correct answer unless the question
includes the DR statement, the command words 'Determine' or 'Show that'". Ten
further URLs — the AQA, OCR and Pearson June 2025 papers, mark schemes and
examiner reports, and AQA's Large Data Set guidance page — were confirmed to
return HTTP 200 at the time of writing. The OCR specification's command-word
definitions were re-read verbatim from the copy already in
`research/sources/a-level-maths/`.

**What the retry did not add.** No new document beyond the first pass's corpus
was opened, and no claim in this file was changed by the check; the check
establishes that the first pass's reading was of the live documents, not of a
stale or fabricated extraction. The gaps in §12 are unchanged.

---

## 2. What each board publishes openly, and what is gated

All three boards examined here are the boards named in the mission; a fourth
(OCR MEI, H640) exists but is out of scope.

| Board | Freely published | Gated or missing | Evidence |
|---|---|---|---|
| **AQA 7357** | Question papers: June 2023 (all three papers), June 2022 (Paper 1), November 2020 (Paper 1), plus 2018 and 2019 on `filestore`. Mark schemes: June 2023 (all three), June 2022 (1 and 2), June 2019 (1), June 2018 (1 and 2), November 2020 (1), Sample set 1. Examiner reports: 2018, 2019 and 2023 (all three papers) and November 2020 (Paper 1). Specimen paper and mark scheme (`AQA-73571-SQP` / `-SMS`). "Notes and guidance: large data set". | The 2021-onwards question-paper/mark-scheme/LDS bundles appear in AQA's own search results as ZIPs carrying "Log in to myAQA". AQA never publishes the identity of its 2020-onwards Large Data Set outside the gated area. | `[aqa-7357-resources]` `[aqa-7357-ms-2019]` `[aqa-7357-sqp]` `[aqa-lds-guidance]` |
| **Pearson Edexcel 9MA0 / 8MA0** | Question papers, mark schemes and examiner reports for June 2018, June 2019, October 2020, November 2021 and June 2022–2025, for papers 01, 02, 31 and 32 and for AS 8MA0; the Sample Assessment Materials exemplar-answers booklets with examiner comments (Pure and Applied); the formulae and statistical tables booklet; and the data-set workbook. Downloaded from `/content/dam/pdf/...` with no login. | Copies under `/content/dam/secure/silver/...` are the login-gated variants; the same documents also exist at non-secure paths. | `[pearson-9ma0-01-qp-2025]` `[pearson-9ma0-01-ms-2025]` `[pearson-9ma0-01-er-2025]` `[pearson-31-er-2025]` `[pearson-sam-exemplars-pure]` `[pearson-lds]` |
| **OCR H240 / H230** | Question paper, printed answer booklet, mark scheme and examiners' report for every paper and every series from 2018 to June 2025, all under `ocr.org.uk/Images/` with no login; the specification; and the Large Data Set notes (`.docx`). | Nothing needed was gated. | `[ocr-h240-assessment]` `[ocr-h240-01-qp-2025]` `[ocr-h240-01-ms-2025]` `[ocr-h240-01-er-2025]` `[ocr-h240]` `[ocr-lds]` |

Two routes that were needed and are worth reusing: AQA's 2023 mark schemes are at
`www.aqa.org.uk/files/<repo-path>/<sha>.pdf` even though `filestore…/-W-MS-` 404s;
and Pearson's Algolia index (above) enumerates every exam material with its DAM
path, which is the only reliable way to find the file names, because the
course-materials page is JavaScript-rendered.

---

## 3. Command words: what the documents require

### 3.1 The one board that defines them

**Read directly:** OCR H240 specification §2d "Command words", pages 9–12
`[ocr-h240]`. Its definitions, in condensed form (the spec's own wording is
quoted only where the exact phrase matters):

| Command | What the specification requires |
|---|---|
| **Exact** | "An exact answer is one where numbers are not given in rounded form"; the answer will "often contain an irrational number such as √3, *e* or π"; "the use of the word 'exact' also tells learners that rigorous (exact) working is expected". |
| **Prove** | "a formal mathematical argument which demonstrates its validity", with "a high level of mathematical detail, with candidates clearly defining variables, correct algebraic manipulation and a concise conclusion". |
| **Show that** | "Learners are given a result and have to show that it is true. Because they are given the result, the explanation has to be sufficiently detailed to cover every step of their working." |
| **Verify** | "A clear substitution of the given value to justify the statement is required." |
| **Find, Solve, Calculate** | "while working may be necessary … no justification is required. A solution could be obtained from the efficient use of a calculator, either graphically or using a numerical method." |
| **Determine** | "justification should be given for any results found, including working where appropriate." |
| **Give, State, Write down** | "neither working nor justification is required." |
| **"In this question you must show detailed reasoning."** | "a solution which leads to a conclusion showing a detailed and complete analytical method", with "sufficient detail to allow the line of their argument to be followed"; not a restriction on using a calculator, but a restriction on "what will be accepted as evidence of a complete method". |
| **Everything else** | "Other command words, for example 'explain' or 'calculate', will have their ordinary English meaning." |

The specification also requires simplification in final answers even when not
asked, and gives four worked conventions: a surd should be simplified; a
negative index should be written with a positive index; a sum of logs should be
combined; "the equation of a straight line should be given in the form
`y = mx + c` or `ax + by = c` unless otherwise stated" `[ocr-h240]`.

**AQA and Pearson have no equivalent table.** Searched directly in both
specifications: AQA 7357 uses the DfE terminology and the assessment objectives
but does not define command words `[aqa-7357]`; Pearson 9MA0's guidance columns
say "prove", "show that" and "determine" in content notes, but there is no
command-word glossary `[edexcel-9ma0]`. Their requirement is carried by the mark
scheme's own instructions instead (§4).

### 3.2 What the mark schemes and examiner reports add

**Read directly.** These are strong, specific statements:

- **"Hence"** — used in every paper; a "hence" part must use the previous
  result. The OCR paper has a "hence or otherwise" variant, which explicitly
  allows a fresh method `[ocr-h240-02-qp-2025]`; Pearson and AQA use the same
  convention `[pearson-9ma0-01-qp-2025]` `[aqa-7357-01-qp-2019]`.
- **"Show that"** — "Generally indicates that the answer has been given, and
  that candidates should provide an explanation that has enough detail to cover
  every step of their working" `[ocr-h240-03-er-2025]`. AQA's 2023 report:
  "Often a required concluding statement gets missed out. Do not omit steps or
  take shortcuts … it is important to convince the examiner that you know how to
  do it and not assume they will fill in the gaps for you" `[aqa-7357-p1-er-2023]`.
- **"Prove"** — "requires a clear, convincing argument that demonstrates the given
  result without any skipped steps or 'fudges'", and "It is best practice, when
  proving an identity, to start from one side and work sequentially to
  demonstrate the other"; if you work on part of an expression, show that you
  have done so and show when you recombine `[ocr-h240-02-er-2025]`.
- **"Determine"** — "This command word features in Questions 10(c), 11(b),
  11(c) and 12(b)" of one paper, and it is the command word that forces working
  to be shown rather than implied by the answer `[ocr-h240-03-er-2025]`
  `[ocr-h240-01-ms-2025]`.
- **"Find"** — "While there is no specific level of working needed … method marks
  may still be available for valid attempts that do not result in a correct
  answer", and candidates should "state explicitly any expressions, integrals,
  parameters and variables that they use a calculator to evaluate (using correct
  mathematical notation rather than model specific calculator notation)"
  `[ocr-h240-03-er-2025]`.
- **"Explain"** — "many 'explain' answers could have been improved by avoiding
  words like 'it' or 'they'. These words are usually too vague and the examiner
  cannot tell for sure what is being referred to", with an example of a response
  that would have scored had it named the objects `[aqa-7357-p1-er-2023]`.
- **Context questions** — "candidates should also address the context in their
  answer, paying close attention to the question posed … too often candidates
  gave standard, learnt, responses as opposed to answering the actual question
  posed" `[ocr-h240-01-er-2025]`.
- **"Fully justify your answer"** — "not only means show clear working, but is a
  clear indication that a step needs to be explained or justified"; many
  students did not realise this `[aqa-7357-p1-er-2019]`.
- **Calculator bounds** — "if a question simply requires an answer to be found,
  rather than shown or justified, then calculators can be used with confidence
  to solve equations, solve simultaneous equation or evaluate expressions"
  `[aqa-7357-p1-er-2019]`.

### 3.3 How often each command word appears in practice

**Counted by me** from the extracted text of the papers named. Counts are of
occurrences of the phrase in the paper's text, so they are indicative, not
audited; the point is the ordering, not the digit.

| Paper | Show that | Hence | Prove | Verify | Determine | Explain / describe / comment | Find |
|---|---|---|---|---|---|---|---|
| AQA 7357/1, June 2019 `[aqa-7357-01-qp-2019]` | 11 | 4 | 2 | 0 | 1 | 3 | 16 |
| AQA 7357/2, June 2019 | 7 | 1 | 1 | 0 | 2 | 4 | 12 |
| AQA 7357/3, June 2019 | 2 | 0 | 3 | 1 | 3 | 5 | 14 |
| Pearson 9MA0/01, June 2025 `[pearson-9ma0-01-qp-2025]` | 9 | 6 | 3 | 1 | 1 | 0 | 17 |
| Pearson 8MA0/01 (AS), June 2025 `[pearson-8ma0-01-qp-2025]` | 5 | 3 | 0 | 0 | 2 | 2 | 15 |
| OCR H240/01, June 2025 `[ocr-h240-01-qp-2025]` | 5 | 3 | 1 | 0 | 5 | 2 | 11 |
| OCR H240/02, June 2025 `[ocr-h240-02-qp-2025]` | 5 | 1 (+1 "hence or otherwise") | 2 | 0 | 6 | 7 | 16 |
| OCR H240/03, June 2025 `[ocr-h240-03-qp-2025]` | 9 | 5 | 0 | 0 | 4 | 2 | 10 |

"Show that" is the single most common demanding command word in every paper
counted; "find" is the most common overall. This is why the book's practice has
to rehearse a "show that" answer's *shape*, not just its algebra.

---

## 4. How marks are awarded

### 4.1 The mark types, as the boards define them

**Read directly** from the mark schemes' own instruction pages.

AQA `[aqa-7357-ms-2019]`:

- `M` — "mark is for method"; `R` — "mark is for reasoning"; `A` — "mark is
  dependent on M or m marks and is for accuracy"; `B` — "mark is independent of
  M or m marks and is for method and accuracy"; `E` — "mark is for explanation";
  `F` — "follow through from previous incorrect result".
- Abbreviations include `CAO` (correct answer only), `CSO` (correct solution
  only), `AG` (**answer given**), `AWRT`, `AWFW`, `ACF`, `OE` (or equivalent),
  `NMS` (no method shown), `PI` (possibly implied), `SCA` (substantially correct
  approach), `sf`, `dp`, `SC`.
- Each row carries an **AO code** from the DfE's elaborated objectives (for
  example `1.1a` select routine procedures, `2.1` construct rigorous
  mathematical arguments including proofs, `2.4` explain their reasoning,
  `3.1a` translate problems in mathematical contexts), a **mark**, and a
  **typical solution**.

Pearson `[pearson-9ma0-01-ms-2025]`:

- "M marks: method marks are awarded for 'knowing a method and attempting to
  apply it', unless otherwise indicated." "A marks: Accuracy marks can only be
  awarded if the relevant method (M) marks have been earned." "B marks are
  unconditional accuracy marks (independent of M marks)." "Marks should not be
  subdivided."
- Abbreviations include `bod`, `ft`, `cao`, `cso` ("There must be no errors in
  this part of the question to obtain this mark"), `isw`, `awrt`, `SC`, `oe`,
  `dep`, `indep`, plus two printed symbols: one for "The answer is printed on
  the paper" and one for "The second mark is dependent on gaining the first".
- A misread "which does not alter the character of a question" costs two marks
  from the A/B marks in the affected part.
- It also names **marks with a star**: `A1*` is the "given answer" mark on a
  "show that" question, and `dM1` a dependent method mark.

OCR `[ocr-h240-01-ms-2025]`:

- "M: A suitable method has been selected and applied in a manner which shows
  that the method is essentially understood. Method marks are not usually lost
  for numerical errors, algebraic slips or errors in units."
- "A: Accuracy mark … **Accuracy marks cannot be given unless the associated
  Method mark is earned (or implied). Therefore M0 A1 cannot ever be awarded.**"
- "B: Mark for a correct result or statement independent of Method marks."
- Abbreviations include `dep*`, `cao`, `oe`, `rot`, `soi`, `www`, `AG`, `awrt`,
  `BC` (by calculator) and `DR` — "This question included the instruction: In
  this question you must show detailed reasoning."
- Accuracy: "When a value is not given in the paper accept any answer that agrees
  with the correct value to 3 s.f. unless a different level of accuracy has been
  asked for"; and `g`: "Candidates using a value of 9.80, 9.81 or 10 for g should
  usually be penalised for any final accuracy marks which do not agree to the
  value found with 9.8 which is given in the rubric."
- OCR's schemes end with **subject-specific marking instructions** — for
  example the "general quadratic" rules (factorising must give at least two of
  the three terms; a stated general formula condones one sign error; completing
  the square must reach the `p ± √q` form) and the "finding the gradient /
  equation of a straight line" rules `[ocr-h240-01-ms-2025]`.

### 4.2 Method versus accuracy — an indicative count

**Counted by me** by scanning the token identifiers in the question tables of one
paper per board (the guidance text before the tables is excluded, but guidance
inside the tables, alternative methods and follow-through marks are not, so the
absolute numbers are inflated; the ratio is the point):

| Mark scheme | M | A | B | R | E |
|---|---|---|---|---|---|
| AQA 7357/1 June 2019 `[aqa-7357-ms-2019]` | 32 | 25 (+2 `A1F`) | 24 (+3 `B1F`) | 12 | 3 |
| Pearson 9MA0/01 June 2025 `[pearson-9ma0-01-ms-2025]` | 128 | 117 | 26 (+10 follow-through B) | — | — |
| OCR H240/01 June 2025 `[ocr-h240-01-ms-2025]` | 56 | 50 | 92 | — | — |

Read this as: for AQA and Pearson, method and accuracy marks are roughly equal in
number, so a student who gets the method right and the arithmetic wrong keeps
about half of a question's marks. For OCR, independent `B` marks dominate,
reflecting a paper built from many one- and two-mark short items (§5). AQA is the
only scheme of the three that regularly awards a separate **reasoning** mark
(`R`) and an **explanation** mark (`E`), which is how it funds AO2.

### 4.3 How a "show that" question is marked

**Read directly.** This is the mechanism our book has to teach, so it is set out
explicitly.

- **AQA.** The row reads, verbatim, "Completes rigorous argument with correct
  algebraic manipulation to show required result", marked `R1`, with the
  condition "Must see at least one line of simplification after [the preceding
  line] before given answer" `[aqa-7357-ms-2019]`. In the specification, `AG`
  means "answer given", and the no-method-shown rule gives the corresponding
  student instruction: "Where a question asks the student to state or write down
  a result, no method need be shown for full marks" — but a "show that" is not
  such a question.
- **Pearson.** The final mark is `A1*`, awarded when the candidate "Achieves the
  given answer with no errors seen including use of invisible brackets (but
  condone a missing trailing bracket) … The … must have been seen somewhere in
  their solution", with explicit instructions on which starting lines are *not*
  acceptable, and, for a proof, "Requires a minimal overall conclusion eg.
  Proven, QED, tick" `[pearson-9ma0-01-ms-2025]`. Where a candidate reaches a
  given answer by simplifying terms, the scheme says so directly.
- **OCR.** The last mark is commonly `A1*` or `B1dep*` and depends on a complete
  argument; the examiner reports spell out why: a "show that" needs "a clear,
  convincing argument … without any skipped steps or 'fudges'", and "when an
  answer is given … provide a logical argument that shows how that answer is
  reached" `[ocr-h240-02-er-2025]` `[ocr-h240-03-er-2025]`.
- **The published exemplar proof.** Pearson's Sample Assessment Materials
  exemplar booklet prints a real student response to a "show that" factor-theorem
  question, the mark scheme, and the examiner's comment: the `M1` was earned but
  the `A0` was awarded "Although f(3) = 0 stated, there is no conclusion, so this
  mark cannot be awarded" `[pearson-sam-exemplars-pure]`. A second comment, on a
  different "show that", awards the method marks but withholds the final mark
  because of an error two lines earlier, adding: "In a 'show that' question it is
  important that all lines are correct" `[pearson-sam-exemplars-pure]`.

### 4.4 Conclusion and context marks

Two findings are worth building into practice:

- **"A correct conclusion in context"** is a separate accuracy mark in a
  hypothesis-test question, and the mark scheme names what the conclusion must
  mention `[pearson-sam-exemplars-applied]`.
- A "comment" mark is awarded for "a suitable interpretation", "a suitable
  reason" or "a comment that supports the idea that the sampling method was not a
  good one" — i.e. the criterion is *relevance to the context*, not length
  `[pearson-sam-exemplars-applied]`.

---

## 5. Length, scaffolding and difficulty progression

**Read directly** from the papers and their front matter.

**The fixed frame.** Every paper is two hours at 100 marks
`[aqa-7357-01-qp-2019]` `[pearson-9ma0-01-qp-2025]` `[ocr-h240-01-qp-2025]`.
Each front page carries: the formulae booklet (AQA "Formulae for A-level
Mathematics"; Pearson "Mathematical Formulae and Statistical Tables (Green)";
OCR prints its own formulae pages 2–3 of the question paper); a calculator rule
(Pearson: "Calculators must not have the facility for symbolic algebra
manipulation, differentiation and integration, or have retrievable mathematical
formulae stored in them"); an accuracy default ("Inexact answers should be given
to three significant figures unless otherwise stated"; OCR identical); and the
statement "You should show sufficient working to make your methods clear.
Answers without working may not gain full credit."

**Question counts and tariffs.**

| Paper | Questions | Largest question | Notes |
|---|---|---|---|
| AQA 7357/1 June 2019 `[aqa-7357-01-qp-2019]` | 16 | 12 marks | Opens with three multiple-choice questions (1 mark each) |
| Pearson 9MA0/01 June 2025 `[pearson-9ma0-01-qp-2025]` | 16 | 9 marks (Q9, Q15) | Question totals 4, 5, 5, 5, 3, then 7 and up |
| OCR H240/01 June 2025 `[ocr-h240-01-qp-2025]` | 12 (38 parts) | 7 marks (two parts) | Opens with 1–3 mark parts |

**OCR H240/01 June 2025, counted by me from the printed `[n]` brackets:** the 38
scored parts total 100 and break down as eleven 1-mark parts, eleven 2-mark
parts, five 3-mark parts, seven 4-mark parts, two 5-mark parts and two 7-mark
parts. The first half of the parts carries 34 marks and the second half 66, and
every part worth 4 or more, except one, is in the second three-quarters of the
paper. That is the concrete shape of "difficulty progression": **early short
answers, late extended arguments**, with the long parts usually multi-part.

**Scaffolding.** Two patterns recur:

- **A multi-part build-up.** AQA's 7357/1 June 2023 report notes that "questions
  5, 9, 13, 14 and 16 were all broken into parts that built towards later
  answers", and that "a significant number of students did not see or use these
  pointers" `[aqa-7357-p1-er-2023]`. Pearson's `9MA0/01` is likewise all
  multi-part.
- **A "show that" stepping stone.** AQA's 2019 report on a sequence question:
  "part (a), which was intended to help students get started with the question
  and give a hint as to what was required for part (b)" `[aqa-7357-p1-er-2019]`.
  This is the exam's own version of P1 (teach, then fade), and it is worth
  copying in the book's Guided problems: a guided first part, then a harder part
  that uses it.

**Multiple choice.** AQA places three multiple-choice questions at the start of
each paper, and its reports use them as an on-ramp: "All of the multiple-choice
questions performed well and enabled students to settle well at the start of the
paper" `[aqa-7357-p1-er-2023]`, and the 2019 report gives the distributions of
the wrong options. Pearson and OCR do not use multiple choice in these papers.

---

## 6. What the examiner reports say goes wrong

**Read directly** from the boards' own reports. These are the most directly
usable documents for the book's misconception callouts, because they name the
error in the students' own words. They are grouped here by cause, not by paper.

### 6.1 Proof, "show that" and argument

- Missing conclusion: "a required concluding statement gets missed out" — named
  for two separate questions in one report `[aqa-7357-p1-er-2023]`.
- Skipped steps: omitting the substitution of limits "it is important to
  convince the examiner that you know how to do it and not assume they will fill
  in the gaps for you" `[aqa-7357-p1-er-2023]`.
- An error earlier in the working invalidates the final "show that" mark even
  when the given line is written correctly `[pearson-sam-exemplars-pure]`.
- Proof by contradiction set-up: students did not "demonstrate their
  understanding of the setup before writing down the expression given in the
  question" `[ocr-h240-02-er-2025]`.
- A proof written in an illogical order, or with part of the identity worked on
  without saying so, cost marks `[ocr-h240-02-er-2025]`.
- Forgetting a conclusion on a proof: the scheme wants a minimal overall
  conclusion `[pearson-9ma0-01-ms-2025]`.

### 6.2 Explanation and communication

- Vague pronouns: "They all meet at a point" does not communicate; name the
  objects `[aqa-7357-p1-er-2023]`.
- Standard learnt responses instead of the question asked, especially in context
  `[ocr-h240-01-er-2025]`.
- Imprecise language: mixing up the nth term with the sum to n terms
  `[aqa-7357-p1-er-2019]`.
- Handwriting and notation: legibility and correct mathematical notation "if
  required, set notation" `[ocr-h240-01-er-2025]`.
- Quiet full marks lost to "notation … appeared to cause confusion for some"
  on composite/inverse functions `[pearson-9ma0-01-er-2025]`.

### 6.3 "Exact", "rounding" and calculator use

- "There were some instances of students not understanding the phrase 'exact
  value' … A long decimal is not an exact value" `[aqa-7357-p1-er-2023]`; the
  2022 OCR report records students giving a rounded decimal where exact form was
  required `[ocr-h240-01-er-2025]`.
- The default is 3 s.f. unless the question says otherwise; the OCR rubric
  applies to the whole paper `[ocr-h240-02-er-2025]`.
- Reluctance to use the calculator where the question allows it
  `[aqa-7357-p1-er-2019]`; the reverse error — jumping steps the command word
  forbids — is the "determine"/"show that" case above.

### 6.4 Trigonometry, angles and direction

- Obtuse angle and the sign of `cot` `[aqa-7357-p2-er-2023]`.
- Degree/radian mode errors and assuming a given value; giving a negative angle
  rather than the stated interval `[aqa-7357-p1-er-2023]` `[ocr-h240-01-er-2025]`.
- `sin`/`cos` confusion, resolved force/velocity misconverted
  `[ocr-h240-03-er-2025]` `[pearson-9ma0-32-er-2025]`.
- Bearings misunderstood, and unrepresentative diagrams
  `[pearson-9ma0-32-er-2025]`.

### 6.5 Mechanics

- Mass and weight confused; "being given the weight of the particle, rather than
  its mass, confused some students" `[aqa-7357-p2-er-2023]`; students "used a
  mass of 800 in their calculations possibly due to confusion of mass and
  weight" `[pearson-9ma0-32-er-2025]`.
- `g` — OCR's report notes that although a question required `g = 10`, "many
  still used a value of 9.8"; the mark scheme says 9.8/9.81/10 answers are
  penalised `[ocr-h240-03-er-2025]` `[ocr-h240-01-ms-2025]`.
- Subtracting a force instead of resolving it, and friction modelled as
  `a = µg` or `a = 0.4g` `[pearson-9ma0-32-er-2025]`.
- Moments: omitting the weight of a rod, wrong perpendicular distances, wrong
  angles, or including a force applied to a different particle
  `[ocr-h240-03-er-2025]` `[pearson-9ma0-32-er-2025]`.
- A named misconception: "the magnitude of the contact force exerted on the …"
  misread `[ocr-h240-03-er-2025]`.
- Sign conventions in vertical motion; forgetting to resolve the velocity into
  components `[pearson-9ma0-32-er-2025]`.

### 6.6 Algebra, functions and calculus

- Brackets and signs: "By far the most common error was poor use of brackets";
  sign errors frequent `[aqa-7357-p1-er-2023]`; "invisible brackets" around `2x`
  in a binomial expansion `[pearson-9ma0-02-er-2025]` and in integration steps
  `[pearson-9ma0-01-ms-2025]`.
- "Multiplying out a log" `[aqa-7357-p1-er-2023]`, and log laws misapplied
  `[pearson-9ma0-01-er-2025]`.
- Domain and range: an inverse function's domain given as `x ≥ 5`
  `[aqa-7357-p2-er-2023]`; `σ` and `σ²` confused `[ocr-h240-02-er-2025]`.
- Composite/inverse transformations, reflection in the wrong axis
  `[pearson-9ma0-01-er-2025]`.
- Integration: omitting `+c` `[pearson-9ma0-01-er-2025]`; limits not applied or
  not substituted; "those who attempted to integrate their partial fractions
  often forgot to divide by 3" `[aqa-7357-p1-er-2023]`; the coefficient
  mishandled after a substitution `[pearson-9ma0-01-er-2025]`.
- Binomial: applying the index to the coefficient, "the index was applied to the
  0.5"; not carrying the index through `[ocr-h240-01-er-2025]`.
- Completing the square: a missing bracket around the squared linear term
  `[ocr-h240-03-er-2025]`.
- Modulus: "A common error was not applying the modulus correctly"
  `[pearson-9ma0-01-er-2025]`.
- Dividing out a common factor and forgetting it
  `[pearson-9ma0-02-er-2025]`; quotient and remainder confused
  `[pearson-9ma0-02-er-2025]`.
- Vectors: misreading components, only finding one expression, misreading a ratio
  `[pearson-9ma0-02-er-2025]`.

### 6.7 Statistics and the Large Data Set

- Hypothesis tests: using 0.05 instead of 0.025 in a two-tail test, and failing
  to reject `H₀` when the evidence requires it
  `[aqa-7357-p3-er-2023]`; the null hypothesis stated with `µ` rather than `p`;
  using the sample proportion instead of the test statistic
  `[aqa-7357-p3-er-2023]`; "Students should know that in all hypothesis tests,
  they are required to …" — a statement-with-reason is expected
  `[aqa-7357-p3-er-2023]`.
- Binomial conditions: "independent events" and "constant probability" confused
  `[ocr-h240-02-er-2025]`.
- "At least" overlooked: using `P(X = 8)` rather than `P(X ≥ 8)`
  `[pearson-9ma0-31-er-2025]`; a population described loosely
  `[pearson-9ma0-31-er-2025]`; correct hypotheses not stated
  `[pearson-9ma0-31-er-2025]`.
- The Large Data Set: "A common error was to state that it is not
  representative", and students treated the LDS sample "as being biased or not
  random" — where the question wanted the properties of the data, not a verdict
  on the sampling `[aqa-7357-p3-er-2023]`. Pearson's question asks how "the
  teacher might need to clean" the LDS data `[pearson-9ma0-31-qp-2025]`.
- Describing data: an outlier's inclusion or exclusion needed "a suitable
  reason", and a correlation answer needed to name the variables and the rate
  `[pearson-sam-exemplars-applied]`.

### 6.8 Modelling and interpretation (AO3)

- Interpreting a model beyond what it says: students "misunderstood the
  mathematics, such as claiming the model suggested the car could have a
  …" `[pearson-9ma0-01-er-2025]`.
- A regression conclusion "then forgot to write a conclusion or to say that the
  lines …" `[pearson-9ma0-01-er-2025]`.
- "Good answer in the context to provide a relevant comment as to the possible
  validity" is the model answer's shape for a validity comment
  `[pearson-sam-exemplars-applied]`; AQA's 2019 paper ends with "Comment on the
  validity of the model" `[aqa-7357-01-qp-2019]`.

---

## 7. What the AS/A-level difference looks like in questions

**Read directly.** The AS specification content is fixed by the DfE (AS content
is the bracketed text in `DFE-00706-2014`, per `a-level-maths.md` §2). In the
papers the difference is **content, not paper shape**:

- Pearson AS `8MA0/01` June 2025 is 2 hours and 100 marks with "15 questions",
  the same frame as `9MA0/01` with 16 `[pearson-8ma0-01-qp-2025]`
  `[pearson-9ma0-01-qp-2025]`. Both front pages carry the same calculator rule
  and the same 3 s.f. default.
- **A-level-only material simply does not appear on the AS paper.** A direct
  text search of the two papers found radian measure and the reciprocal
  trigonometric functions (`sec`, `cosec`) in `9MA0/01` and **not** in `8MA0/01`.
  (Searching for `cot`, `partial fraction`, `contradiction`, `by parts`, `small
  angle` and `Newton` in `8MA0/01` returned nothing either — but the same search
  returned nothing in `9MA0/01` as well, because one sitting does not sample
  every topic, so the negative result is only meaningful for `radian`/`sec`.)
- AQA's `Paper 3` report for June 2023 contains the one *assessment-objective*
  difference that shows up in reports: correlation coefficients are "A-level
  only" in the DfE content and the LDS guidance lists "using and interpreting
  correlation coefficients (A-level only)" `[aqa-lds-guidance]`
  `[dfe-a-level]`.
- The OCR specification's own command-word examples include A-level-only content
  — logarithmic differentiation and the stationary point of `y = x ln x`
  `[ocr-h240]` — which is a reminder that AS papers cannot set those, while the
  command-word conventions themselves are identical at AS and A-level.

**Practical consequence for the book:** the Year 1 material should already use
the full command-word vocabulary and the same answer conventions; the AS/A-level
difference is which content the question is built from, so the book does not need
a separate "exam technique" level for AS.

---

## 8. The Large Data Set in practice

**Read directly**, except where noted.

- **OCR.** The data set is the 2001 and 2011 Census for England and Wales
  (Method of Travel to Work, and Age Structure), by local authority
  `[ocr-lds]`. It is assessed in Paper 2's Statistics section. In the June 2025
  paper, question 13 prints "excerpts from the census data for Age Structure in
  2001 and 2011 for four …" and asks about a further set of age ranges — so the
  paper supplies a table but assumes the student knows the categories
  `[ocr-h240-02-qp-2025]`.
- **Pearson Edexcel.** The data set is **named and documented in the workbook
  Pearson publishes**, which is the primary source: daily weather for
  Camborne, Heathrow, Hurn, Leeming and Leuchars (UK); Beijing, Jacksonville and
  Perth (overseas); May–October of 1987 and of 2015; from the Met Office, "© 2016
  Crown Copyright" in the overseas sheets `[pearson-lds]`. The workbook's own
  Information sheet lists the **eleven variables** recorded across the stations:
  mean temperature; total rainfall; total sunshine; mean windspeed (in knots,
  with a Beaufort-scale category); maximum gust speed; daily mean wind
  direction; maximum-gust direction; maximum relative humidity; mean total
  cloud; mean visibility; and mean air pressure — each with the workbook's own
  units and its notes on the `n/a` and `trace` markers. The workbook says tasks
  "such as
  selecting a sample, cleaning the data, creating diagrams from the data,
  calculating summary statistics … calculating regression equations and
  correlation coefficients … hypothesis testing, must be carried out by students
  during their course of study", and lists five suggested activities
  `[pearson-lds]`. It is assessed in Paper 3 Section A (A-level) and AS Paper 2.
  In June 2025's Paper 31, a question works from "the large data set for Leeming
  in 2015", asks how a teacher "might need to clean" the data, and asks for a
  comparison — i.e. the exam supplies the extract and tests knowledge of the
  data's character, not recall of the numbers `[pearson-9ma0-31-qp-2025]`.
- **AQA.** The AQA specification states that the 2018 and 2019 dataset was an
  extract from DEFRA's "Family Food 2014" and that from 2020 there is a new
  dataset `[aqa-7357]`. AQA's own "Notes and guidance: large data set" page,
  read directly, teaches the techniques (sampling, histograms, scatter graphs,
  measures of spread, data cleansing, probability, modelling) and gives two
  sample-assessment questions as exemplars of "material advantage", but
  **names no dataset** `[aqa-lds-guidance]`. The AQA June 2019 Paper 3 questions
  it points to use the phrase "based upon the Large Data Set" and "Using your
  knowledge of the Large Data Set, give two reasons why …" `[aqa-7357-03-qp-2019]`.
  The current dataset's identity is behind the myAQA login and could not be
  established; see §12.
- **Common to all three** (from the specifications and the workbook): students
  are not given the data set in the exam and are not required to memorise the
  numbers; questions supply extracts or summaries and assume familiarity with the
  categories, the rounding and the anomalies `[aqa-lds-guidance]` `[pearson-lds]`.

---

## 9. Existing textbooks and open resources: structure and voice

None of these is a UK A-level textbook, and the commercial ones (Hodder/MEI,
Pearson, Collins, CGP) could not be opened, so nothing here describes them. What
follows is the structure of resources I opened directly, with what each is good
for.

### OpenStax — `[openstax-precalculus-2e]`

**Read directly** (chapter 3.2, rendered). A US general-education textbook, CC
licence (see §10). A section is: **Learning Objectives** → narrative prose →
**Forms of …** box (the named results) → **How To** box (a numbered procedure) →
**Example 1**, then a boxed sub-heading naming the task, then **Solution**, then
sometimes **Analysis** → **Try It #1** → repeat → then exercises.

Two things to take: the **"How To" box is a numbered procedure stated before the
worked example**, and **every worked example is followed by a "Try It" clone**,
which is the same fading pattern the chapter formula wants (worked example →
partial → independent). The *voice* is different from ours: long US sentences,
no reading-age control, and almost no formal proof — OpenStax Precalculus is not
a model for proof or modelling.

### CK-12 FlexBooks — `[ck12-calculus]`

**Read directly** (a lesson, rendered). A lesson is short: a **Guidance**
narrative, a set of numbered **Examples** each with a worked **Solution**, then a
**Review** set, then **Review (Answers)**, with an **Attribution guide** linked.
The whole lesson is one screen — useful as a model for a compact "Learn" page,
useless as a model for a chapter with an anchor thread.

### Khan Academy — `[khan-precalculus]`

**Read directly** (the Precalculus course page, rendered). Course → **Unit** →
lesson (a third-level heading) → items (video, article, exercise). The unit list
is topic-based ("Composite and inverse functions", "Trigonometry", …) with lesson
headings phrased as skills, including "Verifying inverse functions by
composition" — a reminder that *verification* is a task in its own right.

### Underground Mathematics — `[underground-maths]`

**Read directly** (home page and the Quadratics station). Resource geometry is
deliberately different from a textbook: **Stations** (topics) → **rich resources**
(essays, problems, interactives) → **Review questions**, plus **Pervasive ideas**
and **Making connections** across the map. The Quadratics station lists resources
such as "Which quadratic?", "Quadratic solving sorter", "Discriminating", and
"Proving the quadratic formula", with teacher support for some. Its stated aim is
post-16 UK mathematics and "an emphasis on connections", and it carries
project/print/device variants. This is the closest thing to an open A-level
resource designed for the UK, and it is the best existing model for the book's
*guided investigation* pages (P6): a task that requires a decision, with teacher
notes rather than a stated answer.

### Other open and free resources

- **MEI** `[mei]` — the charity behind MEI's specifications and Integral; its
  public "curriculum support and resources", "inspiring students" and transition
  pages point at free materials, but the A-level question bank (Integral) is
  subscription-based. MEI's public pages are a source of *pedagogical* positions,
  not of exam-shaped questions.
- **AMSP** `[amsp]` — the Advanced Mathematics Support Programme (led by MEI),
  funded by the DfE, with free teacher CPD and resources for A-level Mathematics;
  it is a legitimate source for the book's "where it is used" framing and for
  transition support.
- **Physics & Maths Tutor** `[pmt]` — read directly. Its maths revision pages are
  indexed by the **DfE strand names** (Proof; Algebra and Functions; Coordinate
  Geometry; Sequences and Series; Trigonometry; Exponentials and Logarithms;
  Differentiation; Integration; Numerical Methods; Vectors; Sampling; Data
  Presentation and Interpretation; Probability; Statistical Distributions;
  Hypothesis Testing; Quantities and Units in Mechanics; Kinematics; Forces and
  Newton's Laws; Moments), each with "Year 1 | Year 2" grouping, alongside
  "Questions by Topic", "Notes and Worksheets" and "Solution Banks". Two useful
  signals: the strand names are the ones a student will meet in a topic search,
  and PTM's own structure treats questions-by-topic and notes as separate
  products — which is what our `:::problems` banks and our Learn pages are.
- **Maths Genie** `[mathsgenie]` — read directly. The public "A Level Old Maths"
  page advertises "205 exam-style questions and past papers from 2005–2018 with
  mark schemes" and Solomon worksheets; note that "old maths" is the *pre-2017*
  specification (C1–C4, S1, M1), so its free A-level content is **not** the
  current A-level. The current A-level route is inside a new subscription
  product. This is a caution: a resource that "does A-level" may do the previous
  specification.
- **Dr Frost Maths** `[drfrost]` — its public landing page is a product page;
  lesson and worksheet resources now sit behind registration, so I could not
  read a lesson page and make no claim about its internal structure beyond the
  page titles ("Lesson Resources", "Auto-Marking Worksheets", "Real Exam
  Questions", "Video Explainers") it advertises.
- **NRICH** `[nrich]` — read directly (home page and terms). Rich problem-solving
  tasks with teacher notes; its terms of use are unusually restrictive (§10).
- **TLMaths** and **Corbettmaths** were reachable and are widely used by students
  for video walkthroughs and drill sheets, but neither is a board or a textbook
  and neither is used as evidence here.

### What the textbook survey says about our book

- **Nobody publishes a backbone-free, exam-shaped, reader-paced textbook for UK
  A-level Mathematics with an anchor thread, retrieval and interleaving.** The
  commercial books are print-shaped; the open resources are either US-shaped
  (OpenStax, CK-12, Khan), task-shaped (Underground Mathematics, NRICH) or
  product-shaped (Dr Frost, Maths Genie, Integral, PMT). The gap our book fills
  is real.
- **The closest structural models are**: OpenStax for a worked example's
  furniture (objective → procedure → worked example → Try It); Underground
  Mathematics for a guided investigation that requires a decision; PMT for the
  organisation by DfE strand and by year; the boards' own exemplar booklets for
  the shape of an acceptable answer.
- **Proof and modelling are the weak points of every open resource surveyed.**
  OpenStax and CK-12 do not teach proof; Khan does verification; Underground
  Mathematics does proof as a task. Nothing surveyed teaches *how to write* a
  "show that" or a "prove" answer in a board's terms — which is exactly what
  §4.3 gives us and what the book should teach.

---

## 10. Copyright and the licence position

This section is short because it is load-bearing.

**The board documents are all-rights-reserved and are not licensed for reuse.**

- AQA: "Copyright © 2019 AQA and its licensors. All rights reserved. AQA
  retains the copyright on all its publications. However, registered
  schools/colleges for AQA are permitted to copy material from this booklet for
  their own internal use" `[aqa-7357-ms-2019]` `[aqa-7357-p1-er-2019]`.
- Pearson: "All the material in this publication is copyright © Pearson
  Education Ltd 2025" `[pearson-9ma0-01-ms-2025]`; the exemplar booklet carries
  the same notice `[pearson-sam-exemplars-pure]`.
- OCR: every page carries "© OCR 2025" and the mark scheme says only that it "is
  published as an aid to teachers and students" `[ocr-h240-01-ms-2025]`
  `[ocr-h240-01-qp-2025]`.
- The Pearson data-set workbook carries "© 2016 Crown Copyright" on the
  Met Office sheets and a Pearson notice in its introduction `[pearson-lds]`.

**Consequences for this repository.** Nothing in this file may be pasted into
`books/`: no question, no mark scheme row, no table of data, no student response.
Command words and the boards' own short definitions (for example "Determine …
justification should be given") are quoted because the exact wording is the
curriculum, and are attributed to the specification that publishes them. Where a
question shape matters, this file describes it (for example "a two-part question
where part (a) is a 'show that' that sets up part (b)") rather than reproducing
it. The book's own questions must be written for the book.

**Open-resource licences, as read from the pages themselves.**

- **OpenStax**: "Except where otherwise noted, textbooks on this site are
  licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0
  International License" (site footer) `[openstax-precalculus-2e]`. Non-commercial
  and ShareAlike — so OpenStax text cannot be adapted into a commercial
  collection; the structure is free to imitate, the prose is not free to copy.
- **NRICH** (University of Cambridge) permits use and a single copy for private
  study and allows "teachers to use and download the Materials and to make
  multiple copies thereof for their students within their school", but
  prohibits any other copying, republication or inclusion in a database, and
  states: "this content is not licensed for text and data mining. The User
  undertakes not to use the Materials for text and data mining, including for
  the purposes of training artificial intelligence systems without the prior
  written permission of the University" `[nrich]`. **Do not fetch NRICH content
  into any pipeline of ours.**
- **CK-12** publishes an "Attribution guide" and reserves "FlexBook®" and
  related trademarks; I did not find an explicit CC licence statement on the
  lesson page I opened `[ck12-calculus]`. Treat it as all-rights-reserved until
  the attribution guide is read.
- **Underground Mathematics** states it was "funded by a grant from the UK
  Department for Education and based at the University of Cambridge" and is "now
  hosted by Cambridge Mathematics"; the page I read did not state a licence
  `[underground-maths]`. Check before reusing anything.
- **PMT, Maths Genie, Dr Frost, MEI, AMSP**: commercial or charitable
  organisations; their pages are cited here as evidence of structure only.

**The only safe material for the book**: the command words and their short
definitions (quoted and attributed), the *patterns* described in this file
(question shape, mark logic, misconception list), and our own writing.

---

## 11. What this means for our book

Actionable, in the order a chapter author meets it. This is written in the same
terms as `AGENTS.md` ("The chapter formula", "Voice and language") and
`.agents/skills/author-textbook-chapter/SKILL.md`, so it can be lifted into a
chapter plan.

### 11.1 The command words we must teach, and how

Put a short, standing "How exam questions are worded" element on the **first
Learn page of the book** and then teach each word inside the chapter that first
uses it. Teach the *requirement*, not just the word:

| Word | Teach the reader to | Where it first earns its place |
|---|---|---|
| **show that** | treat the result as given: write every step, no skipping, and finish with a concluding sentence that says what has been shown; expect the last mark to require *no errors anywhere* — one wrong line earlier costs it | the first chapter with a derivation (proof, identities, factor theorem) |
| **prove** | define the variables first, work one side to the other (or say clearly which pieces are being worked on and when they rejoin), and end with a minimal conclusion | proof strand |
| **verify** | substitute the given value and show it satisfies the statement; no derivation needed | any "verify that x = … is a solution" |
| **determine** | give the justification and the working, even though the answer is obtainable on a calculator | functions, stationary points, hypothesis tests |
| **find / solve / calculate** | a calculator is allowed; but write the method down anyway, because method marks exist when the answer is wrong | everywhere |
| **hence** | check the previous part and *use its result*; "hence or otherwise" frees you, "hence" does not | sequences, series, identities |
| **explain / give a reason** | name the objects; never write "it" or "they"; answer the question that was asked, not a standard description | first "explain" |
| **state / write down / give** | no working needed — and do not waste time deriving | everywhere |
| **exact** | leave it as a surd, a log, a fraction or in terms of π; a decimal is not exact | surds, logs, trigonometry |
| **sketch** | (ordinary English — no board defines it) mark the key features and label the axes | curve sketching |
| **in this question you must show detailed reasoning** (OCR) | a calculator answer earns nothing; show the analytic steps, then use the calculator to check | radian/trig equations |

Two board-level facts to keep straight and to state plainly when they matter:
only OCR documents these words in its specification, and AQA and Pearson reach
the same requirements through their mark schemes. Our book should teach the
requirement, and can name the boards without favouring one.

### 11.2 The question shapes we should rehearse

Every practice set should contain these shapes, because they are what the papers
contain:

1. **The two-part "stepping stone"**: part (a) is a "show that" that sets up
   part (b). This is the exam's own version of "model, then fade" — AQA
   deliberately builds them `[aqa-7357-p1-er-2019]`, and AQA's own report notes
   students miss the pointer.
2. **The "hence" chain**: (a) show a result; (b) use it. Include one
   "hence or otherwise" so the reader feels the difference.
3. **The multi-part long question (6–9 marks) that builds**: the last question or
   two of a Pearson-style paper. Practise holding a long argument together.
4. **The one-line "state"/"write down" item** in among harder parts — a
   retrieval check in exam clothing.
5. **A context question with a comment mark**: "Comment on the validity of the
   model", "Interpret the constant in context". The mark is for relevance, and
   the answer must name the variables and the context.
6. **A "determine" question** whose answer a calculator gives, so the reader
   practises writing the justification anyway.
7. **A hypothesis-test question ending in a conclusion in context**, with the
   null hypothesis, the test statistic, the comparison and the context sentence
   as four separately markable moves.
8. **A proof written to be marked**: define, argue, conclude.

And the page mechanics that mirror the papers: put the command word in the
question, put the mark tariff beside it, and in the collapsed working show the
*concluding sentence* as a marked line, not as an afterthought.

### 11.3 The misconceptions worth naming

Choose the chapter's one "Watch out" callout from this list rather than inventing
a generic warning; each is evidenced by an examiner report or a mark scheme, and
the diagnosis is what makes the callout useful.

**Chapter-independent, worth a place somewhere in the book:**

- A **"show that"** answer that stops at the given line with no conclusion
  `[aqa-7357-p1-er-2023]` `[pearson-sam-exemplars-pure]`.
- A **"show that"** answer that is right at the end but wrong a line earlier —
  the final mark is lost `[pearson-sam-exemplars-pure]`.
- **"Exact"** read as a long decimal `[aqa-7357-p1-er-2023]`; and the converse,
  a rounded decimal where 3 s.f. is expected in the final answer.
- **Vague pronouns** in explanations `[aqa-7357-p1-er-2023]`.
- **A standard learnt answer** where a context question was asked
  `[ocr-h240-01-er-2025]`.
- **Invisible brackets** in a product or a substitution
  `[pearson-9ma0-02-er-2025]`.

**By strand:**

| Chapter strand | Misconception to name | Evidence |
|---|---|---|
| Algebra / functions | inverse or composite function's domain/range; notation and transformation directions | `[aqa-7357-p2-er-2023]` `[pearson-9ma0-01-er-2025]` |
| Quadratics / inequalities | completing the square bracket; interval written as a complement or as two parts with no "and" | `[ocr-h240-03-er-2025]` `[ocr-h240-02-er-2025]` |
| Proof | no conclusion; starting from the given result; skipped steps | `[ocr-h240-02-er-2025]` `[aqa-7357-p1-er-2023]` |
| Trigonometry | calculator in the wrong mode; negative angle vs stated interval; obtuse angle and the sign of a function | `[aqa-7357-p1-er-2023]` `[aqa-7357-p2-er-2023]` |
| Exponentials / logs | "multiplying out a log"; the gradient of an exponential; the `+c` on an integral | `[aqa-7357-p1-er-2023]` `[pearson-9ma0-01-er-2025]` |
| Calculus | `+c`; limits not applied; coefficient after substitution; modulus | `[pearson-9ma0-01-er-2025]` |
| Mechanics | mass vs weight; `g` as stated in the rubric; moments omitting a weight or a perpendicular distance; sign convention | `[pearson-9ma0-32-er-2025]` `[ocr-h240-03-er-2025]` |
| Statistics | test tail and significance level; conclusion in context; defining the population; `σ` vs `σ²`; binomial conditions | `[aqa-7357-p3-er-2023]` `[ocr-h240-02-er-2025]` `[pearson-9ma0-31-er-2025]` |
| Large Data Set | calling the data "biased" or "not representative" rather than describing its categories, rounding and anomalies | `[aqa-7357-p3-er-2023]` `[aqa-lds-guidance]` |
| Modelling | claiming the model says more than it does; a comment with no context | `[pearson-9ma0-01-er-2025]` `[pearson-sam-exemplars-applied]` |

### 11.4 Two structural consequences

- **The formula booklet is part of the course, not a crutch.** OCR's report
  expects candidates to "be aware of the formulae given at the start of the
  question paper, and be able to apply them reliably … Equally they should
  appreciate which formulae will, and will not, be provided and be able to
  accurately recall any of the latter" `[ocr-h240-01-er-2025]`. The DfE requires
  recall of Appendix B formulae `[dfe-a-level]`. A Learn page should say, for
  each result, whether it is *given* or *recalled* — and the book's booklet
  widget is where the "given" ones belong.
- **A working accuracy convention belongs in the front matter and on every
  practise page**: 3 significant figures unless the question says otherwise;
  exact means exact; `g = 9.8` unless the question says otherwise. All three are
  printed on the papers and all three are lost marks in the reports.

### 11.5 What to put in the chapter opener's "Where it is used"

Use the DfE strand names (§9, PMT's index) and the boards' own contexts: the
papers' contexts are weather (the Pearson LDS), census and travel to work (OCR),
household food (AQA's 2018–19 LDS), tides, model-building for economics,
kinematics, and growth/decay. All of these are *in* the papers, so a relevance
prompt built on one of them is grounded; a made-up context is not.

---

## 12. What could not be established (read before making a claim)

1. **AQA's current Large Data Set.** AQA's specification says a new dataset
   exists from 2020 and is "only available on the AQA website" `[aqa-7357]`; its
   own guidance page names no dataset `[aqa-lds-guidance]`; `aqa.org.uk/7357`
   redirects to the specification; plausible filestore names 404; and the bundles
   containing it carry "Log in to myAQA" `[aqa-7357-resources]`. **Do not name
   it from memory.** Write "your board's data set" and describe the *skills* AQA
   lists, which are published.
2. **AQA's 2021-onwards question papers and mark schemes.** The search results
   show them as ZIPs behind myAQA. Anything about AQA's recent paper style in
   this file therefore rests on 2018, 2019, 2022 and June 2023 documents.
3. **The internal structure of Dr Frost's lessons.** Registration-gated; only
   the landing page was read.
4. **The commercial A-level textbooks** (Hodder/MEI, Pearson, Collins, CGP).
   Not accessible; nothing here describes them. If the book needs to know how a
   commercial UK A-level chapter is laid out, that needs a purchased copy or a
   publisher's sample chapter, and it should be recorded as a description of the
   book, not a reading of it.
5. **A fourth board's materials (OCR MEI, H640; WJEC/Eduqas).** Out of scope by
   instruction, and not fetched. The DfE content is common, so nothing in §3–§7
   should change, but the OCR MEI command-word conventions and the MEI
   specification's accuracy rubric ("2 s.f." for Specification B, per
   `[ocr-h240-01-ms-2025]`'s cross-reference) differ and would need checking
   before a claim about "the boards".
6. **Which AQA papers the OCR-style reading applies to.** The AQA mark-scheme
   conventions were read from June 2019 (paper 1, all three papers' examiner
   reports from 2019 and 2023). I did not open an AQA 2022 or 2023 *mark scheme*
   beyond confirming it exists at the `aqa.org.uk/files` URL; if a chapter
   depends on a precise AQA 2023 marking convention, open
   `[aqa-7357-resources]`'s 2023 mark scheme first.

---

## 13. Cross-checks performed

- **The three boards were checked against the same question**, "how is a 'show
  that' marked?", and each answer came from that board's own mark scheme, not
  from a revision site: AQA's `R1` with the line-of-simplification condition
  `[aqa-7357-ms-2019]`; Pearson's `A1*` with the "no errors seen" condition
  `[pearson-9ma0-01-ms-2025]`; OCR's `A1*` with the command-word rule that
  forbids implying the method `[ocr-h240-01-ms-2025]`.
- **The command-word definitions are OCR's specification only**, verified by
  searching the AQA and Pearson specifications directly for a command-word
  section (none), and by finding the requirements instead in each board's mark
  scheme.
- **The per-paper counts in §3.3 and §5 are mine**, taken from the extracted
  text of the named papers, and are labelled as indicative. They are not
  board-published figures.
- **The Pearson Large Data Set claim is verified from two independent files**:
  the workbook's "Information" sheet and its data sheets, which agree on the
  stations, the years, the months and the eleven variables `[pearson-lds]`; the
  paper-level use was then confirmed in the June 2025 Paper 31
  `[pearson-9ma0-31-qp-2025]`.
- **Every "misconception" line in §6 and §11.3 is traced to a named report or
  mark scheme**, and none is a general teaching claim. Where a report gives a
  percentage (for example "over 70% of students" correct on a multiple-choice
  item `[aqa-7357-p1-er-2023]`), the percentage is deliberately not carried into
  the book, because it is about one question in one series.
- **No copyrighted question text, mark scheme or data table was copied into this
  repository.** Quotations are limited to short phrases that state a requirement
  ("this command word indicates that justification should be given for any
  results found"), each attributed to its source.
