# Pedagogy audit — GCSE Mathematics, Chapters 1–13

Measurement pass only. No content page was edited. Every finding below cites a
file and a 1-based line number. Where a claim is an *absence*, the command that
demonstrated the absence is given.

## Method, commands, and what was read versus pattern-matched

**Read in full (judgement):** all 13 Chapter `index.md`; all 13 `Review/index.md`;
the 15 Walkthrough pages that carry a `:::figure` (figure context); the Guided
problems pages for Ch 1.1, 2.1, 4.1, 5.1, 6.1, 8.1, 12.2, 13.2; the Problems pages
for Ch 1.2, 4.6, 7.6, 9.5, 11.6, 12.6, 13.3; bank YAML for Ch 4.1, 5.1, 11.6,
13.4.

**Pattern-matched only (counts and presence):** every other page was interrogated
by grep/script, not read line by line: the 70 first-task extractions, the 70
warm-up extractions, progress-check locations, `:::figure` locations, method
prompt counts, and bank item counts. Where a pattern-matched result is
ambiguous I say so.

**Commands used** (from the repository root unless stated):

```bash
# structure
find books/gcse-maths/docs/Chapter {1..13} -name index.md | sort
grep -rn 'Progress check' books/gcse-maths/docs/Chapter {1..13}
grep -rn ':::figure' books/gcse-maths/docs/Chapter {1..13}
grep -rn 'method' books/gcse-maths/docs/Chapter {1..13}/Section */Problems/index.md
grep -rn 'which method\|Which method' books/gcse-maths/docs/Chapter {1..13}/Section */Problems/index.md
grep -n 'anchor\|application\|relevance_prompt\|tools:' books/gcse-maths/curriculum.yaml
for c in $(seq 1 13); do grep -n '^## ' "books/gcse-maths/docs/Chapter $c/index.md"; done
# repeated warm-ups / checkpoints
grep -n 'Without looking back, calculate' books/gcse-maths/docs/Chapter\ 5/Section\ */Guided\ problems/index.md
grep -n 'Solve \$2x=18\$' books/gcse-maths/docs/Chapter\ 9/Section\ */Guided\ problems/index.md
grep -n 'Solve \$3x+8=20\$' books/gcse-maths/docs/Chapter\ 12/Section\ */Guided\ problems/index.md
grep -n 'revisit your savings estimate' books/gcse-maths/docs/Chapter\ 6/Section\ */Guided\ problems/index.md
# counts (script)
python3 - <<'EOF'   # question counts per Guided page; item counts per bank
... see body for the two scripts ...
EOF
# bundled audit (lint blind spots)
uv run python .agents/skills/verify-textbook-change/scripts/textbook-audit.py
```

The bundled audit ran clean (exit 0) and its relevant output is quoted under Q2,
Q3 and "Other findings".

**Definition used for "first task".** The first line in a Walkthrough that is a
blockquote callout, a `:::figure` to use, a `Try it` heading, or a bold task
heading (`**Example …**`, `**Worked example.**`, `**Predict …**`), whichever
comes first. The 1-based table is in Q2.

---

## Verdicts

1. **Chapter 1 — Strong anchor and support, but the fade is only two levels.**
   Five anchor checkpoints all tied to the stall; 6–8 guided questions per
   section with a Hint → Full working fade. Two editing defects on the Problems
   pages (duplicated paragraph, prose before the H1).
2. **Chapter 2 — Solid anchor, thin support.** Four checkpoints tied to the
   counters; only 3 questions per guided page and a warm-up that includes the
   section's own content.
3. **Chapter 3 — Good anchor, one missing checkpoint.** Three checkpoints tied
   to the file-doubling problem; 3.4 has no checkpoint and its warm-up asks the
   section's own topic.
4. **Chapter 4 — Anchor carried but repetitive; practice under the floor.** Six
   Walkthrough checkpoints + six Guided checkpoints, but 4.1–4.3 guided
   checkpoints are copy-pasted and the Problems bank has only 5 items per
   section (floor is 8–15).
5. **Chapter 5 — Weakest chapter.** Only two anchor checkpoints, one vague;
   every Guided page has exactly **one** question and ends with a claim about
   "a later question" that does not exist; one identical warm-up on all six
   pages.
6. **Chapter 6 — Anchor stops short of its own solution.** Checkpoints in
   6.1–6.3 only; the five Guided checkpoints are byte-identical; 6.4/6.5, where
   the compound-interest anchor is actually computed, have no checkpoint.
7. **Chapter 7 — No genuine chapter problem.** Six checkpoints, but the opener
   states a question with no data and the Review invents the numbers. The anchor
   is not solvable "as set".
8. **Chapter 8 — One checkpoint, generic hints throughout.** Only 8.6 has a
   checkpoint; the bundled audit flags all seven Guided pages for generic-fade;
   the warm-up is identical across six pages and in 8.1 asks later-section
   content.
9. **Chapter 9 — Two checkpoints, generic next steps throughout.** All six
   Guided pages use the same non-specific "Next step"; warm-up identical on all
   six pages.
10. **Chapter 10 — Strong anchor, minor drift.** Five checkpoints tied to the
    two patterns; opener renames the roadmap heading and some warm-ups ask the
    section's own topic.
11. **Chapter 11 — Strong anchor, method prompt in the wrong place.** Six
    checkpoints tied to the walker; the Problems pages *claim* mixing but carry
    no method-selection prompt; a method prompt appears once, on Guided 11.1.
12. **Chapter 12 — Two checkpoints, one-question support pages.** 12.1 and 12.3
    checkpoints tied to the ball; 12.2–12.6 Guided pages have one question each
    plus an identical copy-pasted "Choose a method" prompt.
13. **Chapter 13 — Strong anchor, one forward-reference warm-up.** Four
    checkpoints tied to the signal; 13.2's warm-up asks `sin 30°`/`cos 60°`,
    which is taught in Chapter 20, not earlier.

---

## Q1 — P2: the chapter problem returned to and resolved

### 1a. A source-of-truth gap first

`books/gcse-maths/curriculum.yaml` defines `anchor`, `application`,
`relevance_prompt` and `tools` for **Chapter 1 only**:

- `books/gcse-maths/curriculum.yaml:61` `anchor:`
- `books/gcse-maths/curriculum.yaml:67` `application: Cash handling, …`
- `books/gcse-maths/curriculum.yaml:68` `relevance_prompt: Where in your own week …`
- `books/gcse-maths/curriculum.yaml:69` `tools: [profit-slider]`

`grep -n 'anchor\|application\|relevance_prompt\|tools:' books/gcse-maths/curriculum.yaml`
returns only lines 61–69. Chapters 2–13 declare none of these keys.

**Consequence:** for Chapters 2–13 the chapter problem is not defined by the
curriculum; I recovered it only from the opener prose. The "genuinely solvable by
the chapter's end" claim therefore cannot be checked against the plan for those
twelve chapters.

### 1b. Checkpoint coverage (pattern-matched)

`grep -rn 'Progress check' books/gcse-maths/docs/Chapter {1..13}`. Line numbers:

| Ch | Walkthrough `Progress check` lines | count | Gap |
|---|---|---|---|
| 1 | 1.1:97, 1.2:102, 1.3:88, 1.4:81, 1.5:81 | 5 | — |
| 2 | 2.1:54, 2.2:56, 2.3:52, 2.4:50 | 4 | — |
| 3 | 3.1:65, 3.2:63, 3.3:71 | 3 | **3.4 none** |
| 4 | 4.1:47, 4.2:45, 4.3:41, 4.4:41, 4.5:49, 4.6:47 (+Guided 4.1–4.6:71) | 6+6 | 4.1/4.2/4.3 Guided text identical |
| 5 | 5.3:48, 5.5:39 (inline) | 2 | 5.1, 5.2, 5.4, 5.6 none |
| 6 | 6.1:38, 6.2:36, 6.3:36 (+Guided 6.1–6.5:78) | 3+5 | **6.4/6.5 none**; Guided text identical on all 5 |
| 7 | 7.1:81, 7.2:67, 7.3:55, 7.4:53, 7.5:72, 7.6:68 (blockquotes) | 6 | — |
| 8 | 8.6:38 | **1** | 8.1–8.5, 8.7 none |
| 9 | 9.1:42, 9.3:52 | 2 | 9.2, 9.4, 9.5, 9.6 none |
| 10 | 10.1:68, 10.2:82, 10.3:54, 10.4:51, 10.5:57 | 5 | — |
| 11 | 11.1:38, 11.2:40, 11.3:42, 11.4:30, 11.5:38, 11.6:38 | 6 | — |
| 12 | 12.1:70, 12.3:42 | 2 | 12.2, 12.4, 12.5, 12.6 none |
| 13 | 13.1:74, 13.2:60, 13.3:62, 13.4:78 | 4 | — |

**Are they tied to the chapter problem?** (read)

- Ch1 — yes. Every checkpoint uses the stall's figures:
  `Chapter 1/Section 1.2/Walkthrough/index.md:102` ("Work out the two costs exactly and add them"),
  `.../1.3/Walkthrough/index.md:88` ("With 60 cans sold"),
  `.../1.5/Walkthrough/index.md:81` ("The stall's profit was £39.20").
- Ch2 — yes. `Chapter 2/Section 2.1/Walkthrough/index.md:54` ("24 blue counters and 36 red counters").
- Ch3 — yes. `Chapter 3/Section 3.2/Walkthrough/index.md:63` ("After 20 doublings, the file size is 2^20").
- Ch4 — yes, and repetitively so. 4.1:47, 4.2:45, 4.3:41 all resolve the same
  £48 keyboard discount; the Guided checkpoints at
  `Chapter 4/Section 4.1/Guided problems/index.md:71`, `.../4.2/...:71` and
  `.../4.3/...:71` carry the **identical sentence** "Return to the keyboard
  prices. What fraction of £48 is the discount?".
- Ch5 — barely. `Chapter 5/Section 5.3/Walkthrough/index.md:48` "apply this
  multiplier idea to the garden path scale" names no task; only
  `.../5.5/Walkthrough/index.md:39` does an anchor calculation.
- Ch6 — yes but stops before the solve. `.../6.3/Walkthrough/index.md:36` ends
  with "This prepares you to model the account over time"; 6.4/6.5 (where the
  £600 compound interest is computed) carry no checkpoint. The five Guided
  checkpoints are identical:
  `Chapter 6/Section 6.1/Guided problems/index.md:78` … `6.5/...:78` all read
  "**Progress check:** revisit your savings estimate. What calculation would make
  it exact?".
- Ch7 — the six checkpoints are six unrelated mini-problems (map route, runner's
  speed, a mass interval, a rectangle's bounds, comparing powers, surds); none
  uses the "survey team" framing from the opener
  (`Chapter 7/index.md:9-14`), because the opener gives no data.
- Ch8 — one checkpoint, and it is a forward pointer:
  `Chapter 8/Section 8.6/Walkthrough/index.md:38` "The chapter frame has outer
  area (x+6)(x+4) … In the next section, you will expand these products". The
  frame appears only twice in the Walkthroughs (`.../8.3/...:40,42` and
  `.../8.6/...:40`).
- Ch9 — yes. `Chapter 9/Section 9.1/Walkthrough/index.md:42` and
  `.../9.3/Walkthrough/index.md:52` both use the £18/£6 vs £10/£8 halls.
- Ch10 — yes. `Chapter 10/Section 10.1/Walkthrough/index.md:68` … `10.5/...:57`
  all use Pattern A/B.
- Ch11 — yes. `Chapter 11/Section 11.1/Walkthrough/index.md:38` … `11.6/...:38`
  all use the walker's 2 km in 30 minutes.
- Ch12 — yes. `Chapter 12/Section 12.1/Walkthrough/index.md:70` and
  `.../12.3/Walkthrough/index.md:42` use h = −t² + 4t + 5.
- Ch13 — yes. `Chapter 13/Section 13.2/Walkthrough/index.md:60` and
  `.../13.4/Walkthrough/index.md:78` use the sensor signal.

### 1c. Review resolution (read)

All 13 Reviews have a resolution section. Headings and lines:

| Ch | Resolution heading | Verdict |
|---|---|---|
| 1 | `## The chapter problem, solved` (`Chapter 1/Review/index.md:9`) | full worked profit £39.20 and £89.20 cash |
| 2 | `## Resolve the chapter problem` (`.../2/Review/index.md:9`) | HCF 12 packs |
| 3 | `## Resolve the chapter problem` (`.../3/Review/index.md:9`) | 2^20 = 1 048 576 |
| 4 | `## The chapter problem, solved` (`.../4/Review/index.md:9`) | £36 vs £37.50 |
| 5 | `## Resolve the chapter problem` (`.../5/Review/index.md:9`) | 18 cm fits 30 cm page |
| 6 | `## The chapter problem, solved` (`.../6/Review/index.md:9`) | £648.96 |
| 7 | `## The chapter problem, resolved` (`.../7/Review/index.md:9`) | **invents** "Suppose the map uses scale 1:25 000, and the path measures 3.2 cm" (line 11) |
| 8 | `## Resolve the chapter problem` (`.../8/Review/index.md:9`) | 8x + 24 |
| 9 | `## The chapter problem, solved` (`.../9/Review/index.md:9`) | h = 4 hours, £42 |
| 10 | `## The chapter problem, solved` (`.../10/Review/index.md:9`) | B overtakes A at design 4 |
| 11 | `## The chapter problem, solved` (`.../11/Review/index.md:9`) | 4 km after one hour |
| 12 | `## The chapter problem, solved` (`.../12/Review/index.md:9`) | t = 5 s |
| 13 | `## The chapter problem, solved` (`.../13/Review/index.md:9`) | y = sin x |

**Escalation (Ch7).** The opener (`Chapter 7/index.md:9-14`) asks "How can you
convert the measurements, decide what each rounded value could be, and report
very large or small values exactly?" with no numbers. The Review cannot "resolve"
it; it chooses numbers (line 11). The chapter problem is therefore not genuinely
solvable as set, and P2 cannot be verified for Chapter 7 from the pages as
written.

---

## Q2 — P1: the fade, and whether any Walkthrough opens unguided

**Question answered by reading the first-task region of every Walkthrough plus
the guided-page structure.**

No Walkthrough opens with an unguided task. Every one begins either with a
worked example/`Example 1` (teaching) or, in 1.1 only, a `> **Check.**` placed
after the first teaching block. First task of each Walkthrough, with line:

| Section | First task | Section | First task |
|---|---|---|---|
| 1.1 | `Chapter 1/Section 1.1/Walkthrough/index.md:33` `> **Check.** What is the digit 2 worth …` | 8.1 | `Chapter 8/Section 8.1/Walkthrough/index.md:34` `**Worked example.** Describe 7m−4.` |
| 1.2 | `.../1.2/Walkthrough/index.md:25` `**Example 1.** Work out 78 + 14.8.` | 8.2 | `.../8.2/Walkthrough/index.md:30` `**Worked example.** Simplify 6x+4−2x+3.` |
| 1.3 | `.../1.3/Walkthrough/index.md:28` `**Example 1.** The temperature falls …` | 8.3 | `.../8.3/Walkthrough/index.md:30` `**Worked example.** Expand −3(2x−5).` |
| 1.4 | `.../1.4/Walkthrough/index.md:29` `**Example 1.** Work out 3 + 2 × 4.` | 8.4 | `.../8.4/Walkthrough/index.md:30` `**Worked example.** Factorise 15x+20.` |
| 1.5 | `.../1.5/Walkthrough/index.md:25` `**Example 1.** Round 4 367 to the nearest 100.` | 8.5 | `.../8.5/Walkthrough/index.md:30` `**Worked example.** Find 2x²−3 when x=−4.` |
| 2.1 | `.../2.1/Walkthrough/index.md:28` `**Worked example.** Find all factors of 20 …` | 8.6 | `.../8.6/Walkthrough/index.md:30` `**Worked example.** Make x the subject of y=5x−2.` |
| 2.2 | `.../2.2/Walkthrough/index.md:24` `**Worked example.** Write 60 as a product of prime factors.` | 8.7 | `.../8.7/Walkthrough/index.md:30` `**Worked example.** Expand (x+1)(x+2)(x+3).` |
| 2.3 | `.../2.3/Walkthrough/index.md:24` `**Worked example.** A spinner has red, blue and green …` | 9.1 | `.../9.1/Walkthrough/index.md:22` `**Example 1.** Solve 3x+5=20.` |
| 2.4 | `.../2.4/Walkthrough/index.md:24` `**Worked example.** A meal has 3 main choices and 4 drink choices.` | 9.2 | `.../9.2/Walkthrough/index.md:22` `**Example 1.** Solve 5x+3=2x+18.` |
| 3.1 | `.../3.1/Walkthrough/index.md:31` `**Example 1.** Work out 2⁵.` | 9.3 | `.../9.3/Walkthrough/index.md:22` `**Example 1.** A number and the next integer total 31.` |
| 3.2 | `.../3.2/Walkthrough/index.md:29` `**Example 1.** Estimate √70 to the nearest whole number.` | 9.4 | `.../9.4/Walkthrough/index.md:22` `**Example 1.** Show x<3 on a number line.` |
| 3.3 | `.../3.3/Walkthrough/index.md:38` `**Example 1.** Simplify a⁴a³.` | 9.5 | `.../9.5/Walkthrough/index.md:22` `**Example 1.** Solve 3x+2≤14.` |
| 3.4 | `.../3.4/Walkthrough/index.md:32` `**Example 1.** Work out 64^(1/3).` | 9.6 | `.../9.6/Walkthrough/index.md:22` `**Example 1.** Solve (x−2)(x+3)>0.` |
| 4.1 | `.../4.1/Walkthrough/index.md:23` `**Example 1.** Make 3/4 have denominator 20.` | 10.1 | `.../10.1/Walkthrough/index.md:29` `**Example 1.** Write the next two terms.` |
| 4.2 | `.../4.2/Walkthrough/index.md:23` `**Example 1.** Work out 2/9+4/9.` | 10.2 | `.../10.2/Walkthrough/index.md:28` `**Example 1.** Is 49 a square number?` |
| 4.3 | `.../4.3/Walkthrough/index.md:23` `**Example 1.** Work out 2/3×5/8.` | 10.3 | `.../10.3/Walkthrough/index.md:28` `**Example 1.** Find the nth term of 7,11,15,19,…` |
| 4.4 | `.../4.4/Walkthrough/index.md:23` `**Example 1.** Write 7/20 as a decimal.` | 10.4 | `.../10.4/Walkthrough/index.md:28` `**Example 1.** Find the nth term of 2,7,16,29,…` |
| 4.5 | `.../4.5/Walkthrough/index.md:23` `**Example 1.** Convert 0.6̇ to a fraction.` | 10.5 | `.../10.5/Walkthrough/index.md:28` `**Example 1.** Find the next two terms of 5,15,45,…` |
| 4.6 | `.../4.6/Walkthrough/index.md:23` `**Example 1.** Work out 3/8 of £56.` | 11.1 | `.../11.1/Walkthrough/index.md:26` `**Worked example.** Plot (−2,3) and find the values for y=2x+1 …` |
| 5.1 | `.../5.1/Walkthrough/index.md:39` `**Worked example. A class has 8 pupils who walk and 12 who travel by bus …` | 11.2 | `.../11.2/Walkthrough/index.md:26` `**Worked example.** Find the gradient through (1,2) and (4,11).` |
| 5.2 | `.../5.2/Walkthrough/index.md:40` `**Worked example. 4 cakes use 300 g of flour …` | 11.3 | `.../11.3/Walkthrough/index.md:24` `**Worked example.** Find the line through (2,1) with gradient 3.` |
| 5.3 | `.../5.3/Walkthrough/index.md:34` `**Worked example. y is proportional to x² …` | 11.4 | `.../11.4/Walkthrough/index.md:24` `**Worked example.** Find the line perpendicular to y=2x+1 through (0,4).` |
| 5.4 | `.../5.4/Walkthrough/index.md:40` `**Worked example. A graph follows y=24/x …` | 11.5 | `.../11.5/Walkthrough/index.md:24` `**Worked example.** A cyclist travels 18 km in 1.5 hours. Find the constant speed.` |
| 5.5 | `.../5.5/Walkthrough/index.md:32` `**Worked example. A 6 cm drawing represents a 9 m wall …` | 11.6 | `.../11.6/Walkthrough/index.md:24` `**Worked example.** Velocity rises evenly from 0 m/s to 8 m/s over 4 s.` |
| 5.6 | `.../5.6/Walkthrough/index.md:32` `**Worked example. Similar solids have length scale factor 3 …` | 12.1 | `.../12.1/Walkthrough/index.md:26` `**Example 1.** Expand (x+3)(x+5).` |
| 6.1 | `.../6.1/Walkthrough/index.md:20` `**Example 1.** Work out 35% of £240.` | 12.2 | `.../12.2/Walkthrough/index.md:25` `**Example 1.** Factorise 6x²+11x+3.` |
| 6.2 | `.../6.2/Walkthrough/index.md:20` `**Example 1.** Increase £80 by 15%.` | 12.3 | `.../12.3/Walkthrough/index.md:26` `**Example 1.** Find useful points for y=x²−4.` |
| 6.3 | `.../6.3/Walkthrough/index.md:20` `**Example 1.** A coat costs £72 after a 20% discount …` | 12.4 | `.../12.4/Walkthrough/index.md:25` `**Example 1.** Solve x²+5x+6=0.` |
| 6.4 | `.../6.4/Walkthrough/index.md:20` `**Example 1.** Find the final amount for £500 at 4% simple interest …` | 12.5 | `.../12.5/Walkthrough/index.md:32` `**Example 1.** Solve 2x²+3x−2=0.` |
| 6.5 | `.../6.5/Walkthrough/index.md:20` `**Example 1.** A population of 2,000 grows by 3% each year …` | 12.6 | `.../12.6/Walkthrough/index.md:26` `**Example 1.** Complete the square for x²+6x+2.` |
| 7.1 | `.../7.1/Walkthrough/index.md:39` `**Example 1.** Convert 3.6 km to metres.` | 13.1 | `.../13.1/Walkthrough/index.md:22` `**Example 1.** Find the intercepts of y=x³−4x.` |
| 7.2 | `.../7.2/Walkthrough/index.md:33` `**Example 1.** A train travels 150 km in 2.5 hours.` | 13.2 | `.../13.2/Walkthrough/index.md:26` `**Example 1.** Solve sin x = 1/2 for 0°≤x≤360°.` |
| 7.3 | `.../7.3/Walkthrough/index.md:37` `**Example 1.** A mass is 320 g to the nearest 10 g.` | 13.3 | `.../13.3/Walkthrough/index.md:24` `**Example 1.** Translate y=x² three units right and two units down.` |
| 7.4 | `.../7.4/Walkthrough/index.md:31` `**Example 1.** A length is 6.4 cm to the nearest 0.1 cm.` | 13.4 | `.../13.4/Walkthrough/index.md:28` `**Example 1.** State the centre and radius of x²+y²=25.` |
| 7.5 | `.../7.5/Walkthrough/index.md:32` `**Example 1.** Write 5 630 000 in standard form.` | | |
| 7.6 | `.../7.6/Walkthrough/index.md:32` `**Example 1.** Simplify √72.` | | |

**Where the fade actually breaks** (read + pattern-matched counts):

1. **Ch5 and Ch12 have no fade across items.** Every Guided page has exactly
   **one** question. Counts from the script (`**Question:**` / `**n.**`):

   | Ch | guided questions per section | Ch | guided questions per section |
   |---|---|---|---|
   | 1 | 6,7,7,8,7 | 8 | 8,8,8,8,8,8,8 |
   | 2 | 3,3,3,3 | 9 | 5,5,5,5,5,5 |
   | 3 | 3,3,3,3 | 10 | 3,3,3,3,3 |
   | 4 | 2,2,2,2,2,2 | 11 | 2,3,3,3,3,3 |
   | **5** | **1,1,1,1,1,1** | **12** | **2,1,1,1,1,1** |
   | 6 | 3,3,3,3,3 | 13 | 4,4,4,4 |
   | 7 | 4,3,2,2,2,2 | | |

   Worse, each Ch5 Guided page closes with a promise it does not keep:
   `Chapter 5/Section 5.1/Guided problems/index.md:70` (and 5.2:70, 5.3:70,
   5.4:70, 5.5:68, 5.6:68) reads "At least one later question asks you to connect
   this method with material from an earlier section." There is no later
   question.

2. **Ch8 and Ch9 hints do not fade per item.** The bundled audit output
   (`.agents/skills/verify-textbook-change/scripts/textbook-audit.py`, run via
   `uv run python`) reports 13 `generic-fade` findings in Ch8 and 6 in Ch9, e.g.:

   > `generic-fade: …/Chapter 8/Section 8.1/Guided problems/index.md: 'Hint' is the same on 8 problems, so it fades nothing — "identify the letter, coefficient and constant in the written expression."`
   > `generic-fade: …/Chapter 9/Section 9.6/Guided problems/index.md: 'Next step' is the same on 5 problems, so it fades nothing — "try the first operation or write the equation before opening the full solution."`

   Read confirmation: `Chapter 8/Section 8.1/Guided problems/index.md:34` is
   "Identify the letter, coefficient and constant in the written expression." and
   the identical hint is repeated on items 2, 3, 4, 5, 6, 7 and 8 of that page.

3. **The fade is not the same depth everywhere.** Read:
   - three levels (Hint → Next step → Full working): Ch2
     (`.../2.1/Guided problems/index.md:31-39`), Ch3, Ch8, Ch9, Ch11, Ch13;
   - two levels (Hint → Full working): Ch1
     (`.../1.1/Guided problems/index.md:37-45` item 1 has Hint then Full working,
     no next step) and Ch6 (`.../6.1/Guided problems/index.md:33-40` item 1 has
     Hint then Full working);
   - nested three levels: Ch4
     (`.../4.1/Guided problems/index.md:34-44` — Next step and Full working are
     nested inside the Hint `<details>`, so they cannot be read as independent
     fading steps in the rendered page);
   - Ch5 uses "Hint / One step / Full working" although "Next step" is the
     canonical label (`.../5.1/Guided problems/index.md:33, 44, 59`).

---

## Q3 — P3: relevance construction versus assertion

**Question answered by reading all 13 openers.**

Every chapter contains a learner-written prompt. No chapter relies on a bare
assertion *instead of* a prompt.

| Ch | Relevance heading | Line | Prompt (read) |
|---|---|---|---|
| 1 | `## Your turn to connect it` | `Chapter 1/index.md:48` | "Write two examples: one about money, and one that is not about money." |
| 2 | `## Your turn to connect it` | `.../2/index.md:27` | "Describe one example and say where factors or systematic counting might help." |
| 3 | `## Your turn to connect it` | `.../3/index.md:37` | "Write one example from your life or someone else's." |
| 4 | `## Your connection` | `.../4/index.md:33` | "Where have you or someone you know used one recently? Write one example…" |
| 5 | `## Your connection` | `.../5/index.md:31` | "Write one place where you or someone you know compares quantities…" |
| 6 | `## Your turn to connect it` | `.../6/index.md:29` | "Which situation matters to you or someone you know? Write one example…" |
| 7 | `## Your connection` | `.../7/index.md:33` | "Write one example. You can return to it after studying the chapter." |
| 8 | `## Your turn to connect it` | `.../8/index.md:37` | "Give one example from your own life, then say what each letter could represent." |
| 9 | `## Your connection` | `.../9/index.md:37` | "Write your own example and say what the unknown would represent." |
| 10 | `## Make a connection` | `.../10/index.md:40` | "Describe one pattern and say how a rule could help." |
| 11 | `## Where might this help you?` | `.../11/index.md:26` | "Which situation have you seen …? Write your own example." |
| 12 | `## Make a connection` | `.../12/index.md:34` | "Write one example in your own words." |
| 13 | `## Your turn to connect it` | `.../13/index.md:34` | "Write one example and say which graph might describe it." |

**Finding — heading drift.** The author skill requires "one relevance heading,
used consistently". Chapters 1–13 use **four** different headings. The bundled
audit confirms this book-wide:

> `relevance-heading-drift: the same prompt is under 5 headings: {'Your turn to connect it': 15, 'Make a connection': 3, 'Your turn to connect': 1, 'Where this could connect to your life': 1, 'Your connection': 4}`

Within Chapters 1–13 the drift is: *Your turn to connect it* (1,2,3,6,8,13),
*Your connection* (4,5,7,9), *Make a connection* (10,12), *Where might this help
you?* (11). The prompt's **position** also drifts: in Ch3 it is after the Roadmap
(`Chapter 3/index.md:37` vs roadmap at 29), in Ch7 after the roadmap (33 vs 22),
in Ch10 after a renamed roadmap (40 vs 31), in Ch12 after the roadmap (34 vs 24).

**Finding — outcome-heading drift.** The canonical heading is "By the end of
this chapter you will be able to". Six of thirteen use the truncated form
`## By the end of this chapter`: Ch1:10, Ch2:9, Ch3:20, Ch6:13, Ch11:18, Ch13:15.
The other seven use the full heading (Ch4:16, Ch5:13, Ch7:15, Ch8:17, Ch9:15,
Ch10:24, Ch12:17).

**Bare assertions present but not substituted for the prompt:** Chapter 1 has a
separate `## Where it is used` section (`Chapter 1/index.md:43`) that asserts
value ("Cash handling, budgets, profit and loss…"). Every other chapter omits
that heading. It is not a defect by itself because the learner prompt is also
present, but it is inconsistent.

---

## Q4 — P4: retrieval warm-ups and corrective feedback

**Question answered by reading representative warm-ups in every chapter plus a
pattern-matched scan of all 70.**

### 4a. Does the warm-up come from earlier material?

| Ch | Source of warm-up | Verdict |
|---|---|---|
| 1 | all prerequisite/earlier (digit value, ×10, ordering) | earlier |
| 2 | 2.1 includes "List the first four positive multiples of 5" (`.../2.1/Guided problems/index.md:19`) — the section's own topic | **partly own topic** |
| 3 | 3.1/3.2/3.3 earlier; 3.4 item 2 "Write 3⁻² as a fraction" (`.../3.4/Guided problems/index.md:17`) is the section's own topic | **partly own topic** |
| 4 | explicitly labelled "From Section 4.1"/"From Chapter 1" (`.../4.1/Guided problems/index.md:15,16`; `.../4.2/...:15,16`) | earlier, labelled |
| 5 | earlier (Ch4/Ch1) but **identical on all six pages** (see 4b) | earlier, massed |
| 6 | section-specific prereqs/earlier (25% as decimal, 20% of 80, multiplier for a decrease) | earlier |
| 7 | 7.1 earlier; 7.2 "Convert 1.8 m to cm" (`.../7.2/Guided problems/index.md:17`) and 7.3 "Round 4.376 to 2 dp" (`.../7.3/...:16`) are the section's own topic | **partly own topic** |
| 8 | 8.1 "Work out −8+3" / "3²" (prerequisite); 8.2–8.7 **identical** "Simplify 4x+3x" / "Substitute x=2 into x+5", which is 8.2 and 8.5 content — later material for 8.1 and the section's own topic for the rest | **own/later topic, massed** |
| 9 | **identical on all six pages** "Solve 2x=18" / "3(4+2)" (`.../9.1/Guided problems/index.md:16` … `9.6/...:16`) | massed |
| 10 | 10.1 item 2 "Find the 5th term of 2n" (`.../10.1/Guided problems/index.md:19`) is the section's own position-to-term rule | **partly own topic** |
| 11 | 11.1 prereq; 11.2 item 1 "gradient and vertical intercept in y=4x+2" (`.../11.2/Guided problems/index.md:17`) is the section's own topic; 11.3–11.6 earlier | **partly own topic** |
| 12 | earlier (Ch8/Ch9, Ch3) but **identical on all six pages** (`.../12.1/Guided problems/index.md:20` … `12.6/...:20`) | earlier, massed |
| 13 | 13.1/13.3/13.4 earlier; 13.2 items 1–2 "sin 30°" / "cos 60°" (`.../13.2/Guided problems/index.md:18,19`) are Chapter 20 content, not earlier | **forward reference** |

### 4b. Repeated warm-ups (pattern-matched)

`grep -n` shows one string repeated across every section of a chapter:

- Ch5 — "Without looking back, calculate 3/4 + 1/8": 5.1:19, 5.2:19, 5.3:19,
  5.4:19, 5.5:17, 5.6:17.
- Ch8 — "Simplify 4x+3x": 8.2:20, 8.3:20, 8.4:20, 8.5:20, 8.6:20, 8.7:20
  (8.1 differs).
- Ch9 — "Solve 2x=18": 9.1:16 … 9.6:16.
- Ch12 — "Solve 3x+8=20": 12.1:20, 12.2:19, 12.3:20, 12.4:19, 12.5:19, 12.6:20.

A retrieval starter repeated word-for-word sixteen times across a chapter is
massed practice, not spaced retrieval: later sections do not retrieve their own
earlier section.

### 4c. Corrective feedback

Only Chapter 8 gives an explicit corrective route. `grep -rn 'If an answer
differs' …` finds exactly:

- `Chapter 8/Section 8.1/Guided problems/index.md:25` (and the same line in
  8.2:25, 8.3:25, 8.4:25, 8.5:25, 8.6:25, 8.7:25):
  "If an answer differs, review the earlier method before continuing."

Every other chapter's warm-up feedback is answers or answers-with-working only.
Ch3's and Ch8's summaries are labelled "Answers and feedback", but Ch3's
"feedback" is an explanation of the answer (`.../3.1/Guided problems/index.md:22`
"24, because 4 groups of 6 make 24"), not a corrective instruction. Ch1's
feedback gives reasoning (`.../1.1/Guided problems/index.md:26` "60 (six tens)")
but no next step if wrong.

---

## Q5 — P5: interleaving and method selection

**Question answered by pattern-matching every Guided/Problems/Review page and
reading the Review pages and bank tags.**

**Result: no Problems page carries a method-selection prompt.** The count script:

```
for kind in "Guided problems" "Problems" "Review":
  grep -rli 'choose a method|which method|choose the method|name the .*method|method you will use|method first'
```

| Ch | Guided pages with prompt | Problems pages with prompt | Review page |
|---|---|---|---|
| 1–10 | 0 | **0** | 1 |
| 11 | 1 (`.../11.1/Guided problems/index.md:39`) | **0** | 1 |
| 12 | 6 | **0** | 1 |
| 13 | 0 | **0** | 1 |

So the "which method applies, and why?" prompt the author skill puts on the
Review is **absent from the section practice pages** everywhere.

**What the Problems pages do say** (read + grep):

- Ch11.1–11.6 Problems say "The later questions mix this section with earlier
  methods" (`.../11.1/Problems/index.md:14` … `11.6/Problems/index.md:14`) — a
  claim, with no "which method?" prompt, and no earlier-section content visible
  in the section tag. The 11.6 bank (`chapter-11-practice-11.6.yaml`) tags all
  ten items `section: '11.6'`, `dfe: [A15, R15]` (lines 3–5 etc.); only
  `p9-mixed-gradient` compares gradients, and both gradients are 11.6 material.
- Every bank item across Chapters 7–13 is tagged with its own section only.
  `grep -oE "section: '?[0-9.]+" chapter-{7..13}-practice-*.yaml` yields one
  section per file. There is no bank item tagged to another section.
- Ch12 puts the method prompt on the **Guided** page instead, and identically:
  `Chapter 12/Section 12.1/Guided problems/index.md:72`, `12.2:51`, `12.3:52`,
  `12.4:51`, `12.5:51`, `12.6:52` all read
  "**Choose a method:** factorise x²+7x+10. Which method applies, and why?"
  Asking "which method applies" for factorising on a page titled "Factorising
  harder quadratics" supplies the answer in the question.
- Ch11.1's prompt is the only genuine method-choice item on a Guided page:
  `.../11.1/Guided problems/index.md:39`
  "**3. Earlier learning.** Solve 2x+3=11. Which method did you choose, and why?"

**Review pages** do ask for method selection in every chapter (read):
Ch1:41 ("say which method you will use *before* you calculate"), Ch2:19
("choose a method and give a reason"), Ch3:22, Ch4:21 ("choose the method and
explain why"), Ch5:15, Ch6:19, Ch7:25, Ch8:19, Ch9:21, Ch10:36, Ch11:25,
Ch12:28, Ch13:15. Chapter 6's Review achieves the mixing by rendering the five
section banks together (`Chapter 6/Review/index.md:21-29`, five `:::problems`
markers), and Chapter 12's by listing current methods plus two earlier-chapter
recall items (`Chapter 12/Review/index.md:38-39`, items 7–8). Chapter 5's "earlier work"
item is the only cross-chapter item on its Review
(`Chapter 5/Review/index.md:23`, "Which earlier number method applies?").

---

## Q6 — P6: every `:::figure` follows Predict → Test → Explain

**Question answered by reading all 15 figure contexts.**

All 15 figures have a Predict prompt and an Explain prompt; 14 also have an
explicit instruction to manipulate and test the figure (the exception is Ch5.3).

| # | Figure | Line | Predict | Test | Explain |
|---|---|---|---|---|---|
| 1 | 1.1 `number-line` | `Chapter 1/Section 1.1/Walkthrough/index.md:92` | :88 "If a = −2.5 and b = 1.8, which is greater?" | :89 "Then move the sliders and check" | :94 "why is 0.3 greater than 0.29…" |
| 2 | 1.3 `profit-slider` | `.../1.3/Walkthrough/index.md:83` | :76 "will the result be a profit or a loss?" | :80 "use the tool: set … and try your own values" | :85 "when the readout says the profit is negative, what does that mean…" |
| 3 | 1.5 `rounding-slider` | `.../1.5/Walkthrough/index.md:76` | :72 "what is 3.14159 to 2 decimal places?" | :73 "then check" | :78 "for a given number of decimal places … which…" |
| 4 | 2.1 `ch2-multiples` | `.../2.1/Walkthrough/index.md:64` | :60 "is 42 a multiple of 3? Is 7 a factor of 42?" | :62 "Now pick a number and look at its multiples" | :66 "how can you tell from the grid whether one number is a factor of another?" |
| 5 | 3.3 `ch3-index-laws` | `.../3.3/Walkthrough/index.md:81` | :78 "predict 2³×2² and 2³⁺²" | :79 "Then calculate each expression to test your prediction" | :83 "why is aᵐ×aⁿ=aᵐ⁺ⁿ?" |
| 6 | 4.1 `ch4-fraction-strip` | `.../4.1/Walkthrough/index.md:43` | :41 "how many shaded parts … if a strip had 12 equal parts?" | :45 "select the number of parts and compare" | :45 "why does multiplying both fraction parts …" |
| 7 | **5.3 `ch5-proportion`** | `.../5.3/Walkthrough/index.md:56` | :54 "does y double or halve?" | **none** — no instruction to manipulate the figure | :58 "what is the difference between y=kx and y=k/x?" |
| 8 | 6.4 `ch6-interest` | `.../6.4/Walkthrough/index.md:42` | :40 "Which line will be higher after five years at 5%?" | :40 "Move the years control to five" | :40 "Why does the gap change each year?" |
| 9 | 7.1 `ch7-scale` | `.../7.1/Walkthrough/index.md:83` | :85 "If you double the drawing length, what happens to the real length?" | :85 "Set the scale slider to 1, then to 2" | :85 "Write how the scale ratio connects the two lengths." |
| 10 | 8.3 `ch8-frame-area` | `.../8.3/Walkthrough/index.md:46` | :44 "predict the simplified expression for the frame area" | :48 "use the controls for x and compare the two area calculations" | :50 "write why the x² terms cancel…" |
| 11 | 9.4 `ch9-inequality-line` | `.../9.4/Walkthrough/index.md:38` | :40 "which direction represents x>2?" | :40 "set the boundary to 2 and choose the right-facing solution" | :40 "why is the circle open…" |
| 12 | 10.5 `ch10-geometric` | `.../10.5/Walkthrough/index.md:65` | :62 "Predict how changing the multiplier will affect the fifth term" | :63 "adjust it in the figure, test your prediction" | :67 "What happens to later terms when the multiplier is above 1…" |
| 13 | 11.1 `ch11-coordinate-line` | `.../11.1/Walkthrough/index.md:46` | :44 "predict y when x=2" | :44 "use the figure to check" | :44 "describe how changing x changes y" |
| 14 | 12.3 `ch12-parabola` | `.../12.3/Walkthrough/index.md:40` | :38 "predict how changing p affects the roots and turning point" | :38 "change p in the figure and compare" | :38 "describe what moved and what stayed" |
| 15 | 13.2 `ch13-trig` | `.../13.2/Walkthrough/index.md:50` | :52 "predict where y=a sin x reaches its maximum when a=1" | :54 "Change the amplitude control and compare" | :56 "What changes as a changes? What stays fixed?" |

**Findings.**

- **Ch5.3 (`.../5.3/Walkthrough/index.md:56`) is the one figure with no Test
  step.** The Predict at :54 and Explain at :58 bracket the figure, but the page
  never tells the reader to move the slider and test; the Explain simply says
  "Use the shape of each graph."
- **Two figures place their Predict/Test/Explain *after* the `:::figure` line**
  (Ch7.1: figure at :83, prompts at :85; Ch13.2: figure at :50, prompts at
  :52–56), while the rest put them before. Placement, not presence.
- No figure's explanation is given; every Explain is a question. No colour or
  runtime LaTeX issue was observed in the figure text (out of scope to test the
  JS modules).

---

## Q7 — Budget: hooks, applications and tools versus practice

**Question answered by counting figures, openers and bank items (pattern-matched)
and reading the curriculum's `tools` key.**

| Ch | `:::figure` | opener words | bank items | items/section | guided Qs total |
|---|---|---|---|---|---|
| 1 | 3 | 450 | 67 | 12–14 | 35 |
| 2 | 1 | 236 | 36 | 9 | 12 |
| 3 | 1 | 185 | 33 | 8–9 | 12 |
| 4 | 1 | 219 | 32 | **5–7** | 12 |
| 5 | 1 | 209 | 76 | 12–13 | **6** |
| 6 | 1 | 193 | 50 | 10 | 15 |
| 7 | 1 | 210 | 60 | 10 | 15 |
| 8 | 1 | 248 | 56 | 8 | 56 |
| 9 | 1 | 222 | 54 | 9 | 30 |
| 10 | 1 | 242 | 40 | 8 | 15 |
| 11 | 1 | 227 | 61 | 10–11 | 17 |
| 12 | 1 | 192 | 48 | 8 | **7** |
| 13 | 1 | 185 | 36 | 9 | 16 |

**Verdicts.**

- **Investigations are not crowding out practice.** Every chapter has one
  guided figure, except Chapter 1 which has three; the opener is under 250 words
  except Chapter 1 (450). Practice banks run 32–76 items per chapter. Nothing
  here breaches "hooks + applications + tools ≤ ~¼ of a chapter".
- **The `tools` key is declared for Chapter 1 only**
  (`books/gcse-maths/curriculum.yaml:69`, `tools: [profit-slider]`). The other
  14 figures are guided investigations, not tools, but the curriculum does not
  distinguish them, so the budget cannot be checked against the source of truth.
- **Practice volume is below the page contract in two places.**
  - **Chapter 4:** every section bank has 5 items (4.1–4.5) or 7 (4.6), below
    the "8–15 independent items" floor. Verified by counting `id:` in
    `books/gcse-maths/problems/chapter-4-practice-4.*.yaml`.
  - **Chapters 5 and 12:** the *Guided* (practise-with-help) pages have 1
    question per section (Ch5) or 1–2 (Ch12); the independent banks are large
    (76 and 48), so the chapter total is fine, but the supported practice that
    is supposed to fade the support is not present.
- Chapters 2, 3 and 10 have 33–40 bank items and 3 guided questions per section;
  Chapter 10 sits at the 8-item floor exactly.

---

## Chapters that most need work

1. **Chapter 5 (`Chapter 5/`).** Weakest on every axis.
   - Anchor checkpoints: 2, one vague (`.../5.3/Walkthrough/index.md:48`).
   - Guided pages: one question each, and a false claim of a "later question"
     (`.../5.1/Guided problems/index.md:70`).
   - Warm-up: identical on all six pages (5.1:19 … 5.6:17).
   - One figure lacks a Test step (`.../5.3/Walkthrough/index.md:56`).
2. **Chapter 8 (`Chapter 8/`).** One checkpoint in the whole chapter
   (`.../8.6/Walkthrough/index.md:38`); all seven guided pages flagged
   `generic-fade`; warm-up identical across 8.2–8.7 and, at 8.1, drawing on
   later sections (`.../8.1/Guided problems/index.md:20-21`).
3. **Chapter 12 (`Chapter 12/`).** One question on 12.2–12.6 guided pages; the
   same "Choose a method: factorise x²+7x+10" prompt pasted on all six
   (`.../12.1/Guided problems/index.md:72` etc.); checkpoints only at 12.1 and
   12.3, neither in the sections that actually solve the ball problem.
4. **Chapter 6 (`Chapter 6/`).** The anchor is computed in 6.4/6.5, where there
   is no checkpoint; the five guided checkpoints are identical
   (`.../6.1/Guided problems/index.md:78` … `6.5:78`).
5. **Chapter 7 (`Chapter 7/`).** There is no genuine chapter problem: the opener
   gives no data (`Chapter 7/index.md:9-14`) and the Review supplies its own
   (`Chapter 7/Review/index.md:11`). This is an escalation, not just a weakness.
6. **Chapter 4 (`Chapter 4/`).** Practice floor breached (5 items/section);
   guided checkpoints 4.1–4.3 copy-pasted (`.../4.1/Guided problems/index.md:71`).
7. **Chapter 9 (`Chapter 9/`).** All six guided pages share one non-specific
   "Next step" (`textbook-audit.py` `generic-fade`); warm-up identical across
   all six (`.../9.1/Guided problems/index.md:16`).

Chapters 1, 2, 3, 10, 11 and 13 carry their anchor threads and are not in this
list; their defects are local (3.4 has no checkpoint; 2.x/10.x warm-ups include
the section's own topic; 13.2's forward reference; heading drift).

---

## Escalations — questions that cannot be answered from the pages as written

1. **Chapter 7's chapter problem is not solvable as set.** The opener
   (`Chapter 7/index.md:9-14`) asks a general question with no figures, and the
   Review invents them (`Chapter 7/Review/index.md:11`). There is no way to
   verify that the problem is "genuinely solvable using only this chapter"
   because no problem is stated. A design decision is needed before this can be
   audited.
2. **P2 cannot be audited against `curriculum.yaml` for Chapters 2–13** because
   those chapters declare no `anchor`, `application`, `relevance_prompt` or
   `tools` (only Chapter 1 does:
   `books/gcse-maths/curriculum.yaml:61-69`). I judged P2 from the opener prose,
   which is a weaker source than the declared plan.
3. **Whether the Chapter 11 Problems banks really "mix this section with earlier
   methods"** (`.../11.6/Problems/index.md:14`) could not be confirmed: every item
   in every Ch7–13 bank is tagged to its own section. Confirming otherwise would
   need a semantic read of all 61 Chapter 11 statements, which this pass did not
   do.

---

## Other findings within scope that the linter does not catch

These are from the bundled audit run
(`uv run python .agents/skills/verify-textbook-change/scripts/textbook-audit.py`)
and from reading.

- **`covers-in-prose`** — curriculum codes printed to the reader:
  `Chapter 2/Section 2.1/Walkthrough/index.md:18` "**Covers:** N4."; 2.2:18,
  2.3:18, 2.4:18; `Chapter 4/Section 4.1/Walkthrough/index.md:58`
  "**Covers:** [N1, N10]." The audit counts 17 such pages book-wide.
- **`opener-heading-drift`** — `Chapter 10/index.md:31` uses
  "## Your route through the chapter" for the roadmap. The audit:
  `opener-heading-drift: …/Chapter 10/index.md: roadmap heading is ['Your route through the chapter']`.
- **`prose-before-h1` + `duplicate-paragraph`** — four Chapter 1 Problems pages
  print the same paragraph above and below the H1. Example:
  `Chapter 1/Section 1.2/Problems/index.md:12-13` and `:17-18`. Same in 1.3, 1.4,
  1.5 (audit output confirmed).
- **Friendly-name leak** — the Chapter 1 opener's "How to use this chapter"
  table names the middle page "**Guided problems**"
  (`Chapter 1/index.md:61`), which the AGENTS.md substitution table maps to
  "Practise with help". The linter did not flag it.
- **Reading age** — the audit reports mean sentence 9.1 words, maximum 33,
  Flesch–Kincaid grade 5.3, within the target band (12–14 → grade 5–9). Not a
  finding.

*No generated file, engine file, test or content page was modified. The only
file written is this report.*
