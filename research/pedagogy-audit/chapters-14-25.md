# Pedagogy audit — GCSE Mathematics, Chapters 14–25

Measurement pass. **No content was changed.** This report records what is and is
not present in the chapter formula for Chapters 14–25, with file and line
evidence. A later pass acts on it; this one only measures.

Scope: `books/gcse-maths/docs/Chapter 14` … `Chapter 25` — each chapter's
`index.md`, each section's `Walkthrough/index.md`, `Guided problems/index.md`
and `Problems/index.md`, and each chapter's `Review/index.md`. 213 pages in all
(12 openers, 12 Reviews, 63 Walkthroughs, 63 Guided pages, 63 Problems pages).

### Citation convention

To keep the tables readable, section citations are given in section-relative
shorthand. Every citation in this report expands unambiguously:

| Shorthand | Expands to |
|---|---|
| `14.1/Walkthrough/index.md:84` | `books/gcse-maths/docs/Chapter 14/Section 14.1/Walkthrough/index.md:84` |
| `16.1/Guided problems/index.md:88` | `books/gcse-maths/docs/Chapter 16/Section 16.1/Guided problems/index.md:88` |
| `14.1:24` (inside a Chapter 14 table row) | the same file, line 24 |
| `Review/index.md:9-35` (inside a Chapter 14 table row) | `books/gcse-maths/docs/Chapter 14/Review/index.md:9-35` |
| `index.md:33-35` (inside a Chapter 14 table row) | `books/gcse-maths/docs/Chapter 14/index.md:33-35` |
| `chapter-19-practice-19.1.yaml` | `books/gcse-maths/problems/chapter-19-practice-19.1.yaml` |

The section number before the slash gives the chapter: `16.1/...` is under
`Chapter 16`. Every line number was read from the file at that path.

---

## 1. Method: what was read and what was pattern-matched

This distinction is stated plainly because it bounds the claims.

**Read in full (prose and structure):**

- All 12 chapter openers (`Chapter <n>/index.md`).
- All 12 `Review/index.md`.
- The full text of a sample of Walkthroughs and Guided pages used to interpret
  the patterns: 14.1, 15.1, 16.1, 17.1, 17.2, 17.3, 19.1, 19.2, 21.1, 24.2,
  25.1.

**Pattern-matched across every page in scope (not read line by line):**

- The `## Progress check` / inline `Progress check:` markers and the following
  paragraph, for all 63 sections.
- Every `:::figure` directive and its surrounding lines, for all 12 figures.
- Every `Warm-up: remember` block, for all 63 Guided pages.
- Every `<summary>` label, to reconstruct the fade order of each Guided page.
- The first `**Example` / `**Worked example` / `**Worked construction` line of
  every Walkthrough.
- Reader-facing internal words and headings.
- The 63 problem banks behind the Problems pages.

**A structural note that changes how Q5 is answered.** A `Problems/index.md`
page contains only the two markers:

```
:::problems chapter-14-practice-14.1

:::answers chapter-14-practice-14.1
```

(e.g. `books/gcse-maths/docs/Chapter 14/Section 14.1/Problems/index.md:14-16`).
The items the reader sees come from `books/gcse-maths/problems/chapter-<nn>-practice-<sec>.yaml`.
So Q5 was answered from the banks, not from the Pages. That is stated again in
Q5.

### Commands used

```bash
# Inventory of pages in scope
find "books/gcse-maths/docs/Chapter <n>" -name index.md | sort -V

# P2 — checkpoints
grep -rn "Progress check" books/gcse-maths/docs/Chapter\ {14,15,16,17,18,19,20,21,22,23,24,25}/

# P6 — figures and tools
grep -rn ":::figure" books/gcse-maths/docs/Chapter\ {14,15,16,17,18,19,20,21,22,23,24,25}/
grep -rn ":::tool"   books/gcse-maths/docs/Chapter\ {14,15,16,17,18,19,20,21,22,23,24,25}/

# P5 — method-selection language actually in the banks
grep -rniE "which method|choose a method|name the method|explain why|give a reason|state which" \
  books/gcse-maths/problems/chapter-{14,15,16,17,18,19,20,21,22,23,24,25}-*.yaml

# The bundled audit (read-only; exits 0 without --strict)
uv run python .agents/skills/verify-textbook-change/scripts/textbook-audit.py gcse-maths
```

Structured extraction was done with `/tmp/pi-delegate/del-10/audit_extract.py`
and a line-prefixed corpus at `/tmp/pi-delegate/del-10/corpus.txt` (10,166
lines, every page in scope prefixed `file:line:`). The corpus is what made
`file:line` citations possible for every page, including the ones not read in
full.

---

## 2. One-line verdict per chapter

| Ch | Verdict |
|---|---|
| 14 | Anchor returned to with genuine questions in 14.1–14.3 and resolved on Review, but 14.4–14.5 drift off it, the Guided fade has no middle step, and guided item 1 of 14.1 is the same item as independent problem 1. |
| 15 | Anchor returned to only once (15.1 of 5); the other four checks are generic; each Guided page has **one** supported problem before independent practice. |
| 16 | Strongest anchor thread (every checkpoint names the courtyard, every Guided page carries an "Earlier learning" item), undermined by five Walkthroughs printing `**DfE coverage:**` codes to the reader. |
| 17 | Anchor returned to at every section, but from 17.2 onward every "Progress check" states the answer instead of asking for it, so it is not a retrieval. |
| 18 | Anchor returned to in all six sections, but five of six checks give the answer and the heading is `###` where every other chapter uses `##`. |
| 19 | Weakest checkpoint coverage (19.1 has none; 19.4–19.6 are generic) and the Guided practice in **all six sections** is a verbatim copy of the first three independent items — the across-page fade collapses. |
| 20 | Anchor referenced in all eight checks, but 20.5–20.8 are assertions, not questions, and the warm-up is byte-identical in all eight sections. |
| 21 | Anchor returned to in 21.2–21.4; 21.1 uses an alternative self-check heading and the roadmap heading drifts. |
| 22 | Anchor returned to in all three sections, but 22.2–22.3 give the answer, and the vector figure renders above its Predict prompt. |
| 23 | Anchor abandoned after the 23.1 figure: all six Progress checks are generic worked statements that hand the reader the answer. |
| 24 | Anchor returned to in all five sections, but `Next step` repeats `Full working` in four of five Guided sections, and the warm-up is the same trivial item (3 + 4) in all five. |
| 25 | Anchor returned to in four of five sections (25.4 drifts); warm-ups vary and fit; a solid chapter apart from figure ordering. |

---

## 3. Q1 — P2: the chapter problem

### 3.1 Is it returned to, and is it resolved?

`## Progress check` is present in most sections. I classify each check by
whether it is a **question** (the reader must produce something) or an
**answer already given** (a statement that resolves the point). A check that
states the answer cannot be a retrieval.

| Ch | Anchor (index.md:line) | Checkpoints | Of those, tied to the anchor | Form | Review resolution |
|---|---|---|---|---|---|
| 14 | two taxi routes (`index.md:9-13`) | 5 (one per section) | 3 — 14.1, 14.2, 14.3 | 14.1–14.3 questions; 14.4–14.5 off-anchor | `Review/index.md:9-35` — solves for both fares |
| 15 | two-step machine (`index.md:9-18`) | 5 | 1 — 15.1 only | 15.1 task; 15.2–15.5 generic | `Review/index.md:9-25` — composes both orders |
| 16 | tiled courtyard (`index.md:10-16`) | 5 | 5 | all questions | `Review/index.md:10-12` — restates method, no numbers |
| 17 | garden route (`index.md:9-22`) | 5 | 5 | 17.1 question; 17.2–17.5 answer given | `Review/index.md:9-25` — 30 m, bearing 053° |
| 18 | mural enlargement (`index.md:9-15`) | 6 | 6 | 18.4 question; 5 give the answer | `Review/index.md:9-13` — both copies |
| 19 | circular pond (`index.md:10-12`) | 5 (19.1 has **none**) | 2 — 19.2, 19.3 | 19.2–19.3 questions; 19.4–19.6 instructions/assertions | `Review/index.md:9-11` — 8π m, 16π m² |
| 20 | garden diagonal (`index.md:9-13`) | 8 | 8 (nominal) | 20.1–20.4 questions; 20.5–20.8 assertions | `Review/index.md:9-19` — d = 15 m |
| 21 | circular window (`index.md:9-15`) | 4 (21.1 uses a self-check) | 3 — 21.2–21.4 | all questions | `Review/index.md:9-17` — chord fits; x = 38° |
| 22 | parallelogram diagonals (`index.md:13-25`) | 3 | 3 | 22.1 question; 22.2–22.3 answer given | `Review/index.md:9-18` — midpoints coincide |
| 23 | spinner (`index.md:23-30`) | 6 | **0** | all six give the answer | `Review/index.md:9-13` — relative frequency near ½ |
| 24 | travel survey (`index.md:9-15`) | 5 | 5 | all questions | `Review/index.md:9-13` — qualitative plan |
| 25 | travel times (`index.md:11-19`) | 5 | 4 — 25.4 drifts | all questions | `Review/index.md:9-26` — median 21.5, IQR 9, 42 an outlier |

### 3.2 The evidence by chapter

**14 — good, then drift.** 14.1 asks the reader to subtract the two Company A
equations (`14.1/Walkthrough/index.md:84`); 14.2 asks them to substitute
(`14.2/Walkthrough/index.md:72`); 14.3 asks them to plot the fare points and
read the gradients (`14.3/Walkthrough/index.md:58`). 14.4 and 14.5 leave the
anchor: "In the example, the two intersections are separate points"
(`14.4/Walkthrough/index.md:48`) and "The rule starts from $x_0=2$"
(`14.5/Walkthrough/index.md:46`). The Review does resolve it fully
(`Review/index.md:21-35`).

**15 — stated once and abandoned.** 15.1 ties back: "For the chapter machines,
the second rule reverses the first." (`15.1/Walkthrough/index.md:44`). 15.2–15.5
do not: "Explain why the simplified expression can look defined at an excluded
input." (`15.2/Walkthrough/index.md:37`), "Before simplifying a quotient,
identify values…" (`15.3/Walkthrough/index.md:50`), "Expand both sides of the
proposed identity…" (`15.4/Walkthrough/index.md:38`), "Write the first three
even integers using $n$." (`15.5/Walkthrough/index.md:40`). That is one return,
not the 2–3 the formula asks for. The Review resolves the machine properly
(`Review/index.md:11-25`).

**16 — the model checkpoint.** All five name the courtyard or its tile, e.g.
"The courtyard path is straight. If one tile edge makes $68^\circ$ with it, what
is the adjacent angle? Name the fact you used."
(`16.1/Walkthrough/index.md:60`) and "For the triangular courtyard tile, two
interior angles are $68^\circ$ and $47^\circ$. Write one line that gives the
remaining angle and its reason." (`16.5/Walkthrough/index.md:42`). Each is a
question. The Review (`Review/index.md:10-12`) resolves the problem only in
generalities — it names the facts to chain but produces no worked numbers, which
is weaker than 14, 17 or 25.

**17 — returns to the anchor, but answers its own question.** 17.1 is a
question: "Name two pairs of parallel sides and state how many right angles it
has." (`17.1/Walkthrough/index.md:40`). From 17.2 on, the answer is printed:
"If the scale is $1$ cm for $3$ m, predict the plan dimensions before drawing:
**they are $8$ cm by $6$ cm**." (`17.2/Walkthrough/index.md:36`). 17.3–17.5 are
the same shape of statement: `17.3/Walkthrough/index.md:54`,
`17.4/Walkthrough/index.md:47`, `17.5/Walkthrough/index.md:44`. A reader who has
just been told the answer has nothing to retrieve.

**18 — same, and a heading drift.** Five of six give the answer:
`18.1/Walkthrough/index.md:77` ("A half-turn … maps it to $(-3,-1)$"),
`18.2/Walkthrough/index.md:48` ("the scale factor is $9\div6=1.5$"),
`18.3/Walkthrough/index.md:37` ("maps to $(-2,-1)$"),
`18.5/Walkthrough/index.md:39` ("A tile edge of $8$ cm becomes $12$ cm"),
`18.6/Walkthrough/index.md:36` ("They are $2^2=4$ and $2^3=8$"). Only 18.4 asks
a question the reader must answer (`18.4/Walkthrough/index.md:37`). Every
heading is `### Progress check`, not `##` (e.g. `18.1/Walkthrough/index.md:75`).

**19 — the weakest coverage, and one section with no checkpoint.** 19.1 has no
`Progress check` at all: its Walkthrough runs from the last example
(`19.1/Walkthrough/index.md:46`) and the `Watch out` block
(`19.1/Walkthrough/index.md:54`) straight to `## You should now be able to`
(`19.1/Walkthrough/index.md:58`). 19.4–19.6 are generic instructions, not pond
checks: "name the cross-section of a cylinder…"
(`19.4/Walkthrough/index.md:50`), "state which height belongs in a cone volume
formula" (`19.5/Walkthrough/index.md:58`), "which measurements would you need…"
(`19.6/Walkthrough/index.md:58`). 19.2 and 19.3 do tie to the pond:
`19.2/Walkthrough/index.md:44` and `19.3/Walkthrough/index.md:52`. The checks
are also the only ones in 14–25 not written as headings — they are inline
`Progress check: …` paragraphs, so they are visually quieter than every other
chapter's.

**20 — eight returns, half of them assertions.** 20.1–20.4 ask real questions,
e.g. "Which side is the hypotenuse, and what distance do you predict?"
(`20.1/Walkthrough/index.md:52`). 20.5–20.8 state a fact instead: "identify
perpendicular sides before applying the theorem"
(`20.5/Walkthrough/index.md:46`), "The sine rule is useful when the triangle has
no right angle" (`20.6/Walkthrough/index.md:40`), "choose a suitable sine or
cosine rule" (`20.7/Walkthrough/index.md:40`), "the sine factor supplies the
perpendicular height" (`20.8/Walkthrough/index.md:60`). The word "garden"
appears, but no retrieval happens.

**21 — good, with a naming drift.** 21.1 replaces Progress check with
`## Check your circle vocabulary` (`21.1/Walkthrough/index.md:42`), a self-check
with a hidden answer (`21.1/Walkthrough/index.md:46-50`). 21.2–21.4 are the
strongest anchor checks in the book: they explicitly name the chapter problem
("For the chapter problem, the two circumference angles…",
`21.2/Walkthrough/index.md:66`; `21.3/Walkthrough/index.md:58`;
`21.4/Walkthrough/index.md:48`). The Review resolves both the fit question and
the Higher angle question (`Review/index.md:11-17`).

**22 — the anchor is returned to, then answered for the reader.** 22.1 asks
(`22.1/Walkthrough/index.md:74-75`). 22.2 and 22.3 print the reasoning:
"Component addition gives the same result in either order"
(`22.2/Walkthrough/index.md:56-58`) and "The prediction is true for every
parallelogram" (`22.3/Walkthrough/index.md:65-67`). The Review resolves it
(`Review/index.md:11-18`).

**23 — stated and abandoned.** Not one Progress check mentions the spinner.
They are generic worked statements that give the answer, for example "The fair
die has probability $\frac13$ of showing more than 4…"
(`23.1/Walkthrough/index.md:64`), "its relative frequency is
$\frac{32}{50}=0.64$…" (`23.2/Walkthrough/index.md:44`), "then 12 are not
adults" (`23.3/Walkthrough/index.md:51`), "the chance of at least one head is
the complement, $\frac34$" (`23.4/Walkthrough/index.md:46`),
"$P(A\cap B)=\frac8{20}=0.4$" (`23.5/Walkthrough/index.md:41`), "the
probability they wear a helmet is $\frac34$"
(`23.6/Walkthrough/index.md:64-66`). The spinner is returned to only at the
23.1 figure and in the Review (`Review/index.md:11-13`).

**24 — the anchor is returned to as questions.** 24.1: "Which pupils would be
missing if you asked only people entering by car? Explain why that matters."
(`24.1/Walkthrough/index.md:48`). 24.2–24.5 follow the same survey
(`24.2/Walkthrough/index.md:53`, `24.3/Walkthrough/index.md:46`,
`24.4/Walkthrough/index.md:42`, `24.5/Walkthrough/index.md:34`). This is a
well-kept anchor thread. The Review (`Review/index.md:11-13`) resolves it
qualitatively, which is honest for a survey-design problem.

**25 — four of five.** 25.1 ties to the first prediction ("Does this match your
first prediction of a narrow or wide interval?",
`25.1/Walkthrough/index.md:57-58`), 25.2 to the list
(`25.2/Walkthrough/index.md:39`), 25.3 to the classes
(`25.3/Walkthrough/index.md:44`), 25.5 to the 42-minute value
(`25.5/Walkthrough/index.md:42`). 25.4 drifts to a generic association question
(`25.4/Walkthrough/index.md:38`). The Review is the most complete in the range
(`Review/index.md:11-26`).

---

## 4. Q2 — P1: the fade

### 4.1 Does a Walkthrough open with an unguided task?

**No.** I checked all 63 Walkthroughs. Each opens with `**Prerequisites:**`, an
objectives line, a teaching block, and then a fully worked example. There is no
`<details>` block anywhere in a Walkthrough except `21.1/Walkthrough/index.md:46`,
and no Walkthrough contains an independent task, a "try it" that is not guided,
or an answer-free question before the first worked example.

The first task of each Walkthrough is therefore a **narrated worked example**.
Its exact wording, by section:

| Section | First task (verbatim) | Label |
|---|---|---|
| 14.1 | `**Example 1.** Solve $2x+y=11$ and $x+y=7$.` | Example |
| 14.2 | `**Example 1.** Solve $y=2x-1$ and $x+y=8$.` | Example |
| 14.3 | `**Example.** Find the intersection of $y=2x+1$ and $y=-x+7$.` | Example |
| 14.4 | `**Example.** Solve $y=x+1$ and $y=x^2-3x+1$.` | Example |
| 14.5 | `**Example.** Use $x_{n+1}=\frac12(x_n+6/x_n)$ with $x_0=2$. Find $x_3$.` | Example |
| 15.1 | `**Example 1.** Find the inverse of $f(x)=3x+5$.` | Example |
| 15.2 | `**Example 1.** Simplify $\frac{x^2-9}{x^2+6x+9}$.` | Example |
| 15.3 | `**Example 1.** Simplify $\frac{2}{x}+\frac{3}{x+1}$.` | Example |
| 15.4 | `**Example 1.** Show that $(x+3)^2$ is equivalent to $x^2+6x+9$.` | Example |
| 15.5 | `**Example 1.** Prove that the sum of three consecutive integers is divisible by $3$.` | Example |
| 16.1 | `**Example 1.** A straight line is split into angles of $124^\circ$ and $x^\circ$. Find $x$.` | Example |
| 16.2 | `**Example 1.** A corresponding angle is $71^\circ$. Find its matching angle.` | Example |
| 16.3 | `**Example 1.** A triangle has angles $48^\circ$, $73^\circ$ and $x^\circ$.` | Example |
| 16.4 | `**Example 1.** Find the interior angle sum of a hexagon.` | Example |
| 16.5 | `**Example 1.** Two parallel lines are crossed by a transversal. One angle is $64^\circ$. Prove that the co-interior angle on the same side is $116^\circ$.` | Example |
| 17.1 | `**Worked example.** A triangle has vertices $A$, $B$ and $C$. Its sides $AB$ and $AC$ are equal. Describe its symmetry.` | Worked example |
| 17.2 | `**Worked example.** A cuboid measures $5$ cm wide, $3$ cm deep and $2$ cm high.` | Worked example |
| 17.3 | `**Worked construction.** Bisect segment $AB$.` | Worked construction |
| 17.4 | `**Worked example.** Mark points exactly $4$ cm from point $P$.` | Worked example |
| 17.5 | `**Worked example.** A path goes from the south-west corner of a rectangle to its north-east corner. Find its bearing.` | Worked example |
| 18.1 | `**Example.** Reflect $(3,2)$ in the $y$-axis.` | Example |
| 18.2 | `**Example.** Enlarge $(2,3)$ by scale factor $2$ about the origin.` | Example |
| 18.3 | `**Example.** Enlarge $(6,-4)$ by scale factor $\frac12$.` | Example |
| 18.4 | `**Example.** Two triangles have side lengths $5$, $7$ and $9$ units each.` | Example |
| 18.5 | `**Example.** Similar triangles have corresponding sides $4$ cm and $10$ cm.` | Example |
| 18.6 | `**Example.** A similar shape has length scale factor $3$.` | Example |
| 19.1 | `**Example 1.** A rectangle is 8 cm long and 3 cm wide. Work out its perimeter and area.` | Example |
| 19.2 | `**Example 1.** A circle has diameter 14 cm. Work out its circumference exactly.` | Example |
| 19.3 | `**Example 1.** Find the arc length for radius 12 cm and angle $60^\circ$.` | Example |
| 19.4 | `**Example 1.** A triangular prism has cross-section area $15\text{ cm}^2$ and length 8 cm.` | Example |
| 19.5 | `**Example 1.** A sphere has radius 3 cm. Work out its volume and surface area.` | Example |
| 19.6 | `**Example 1.** A $12$ cm by $8$ cm rectangle has a $4$ cm by $3$ cm corner removed.` | Example |
| 20.1 | `**Example 1.** A right-angled triangle has shorter sides $6$ cm and $8$ cm. Find its hypotenuse.` | Example |
| 20.2 | `**Example 1.** Find the opposite side when $\theta=30^\circ$ and the hypotenuse is $10$ cm.` | Example |
| 20.3 | `**Example 1.** A person stands $20$ m from a tower. The angle of elevation to its top is $35^\circ$…` | Example |
| 20.4 | `**Example 1.** Work out $2\sin30^\circ+\cos60^\circ$ exactly.` | Example |
| 20.5 | `**Example 1.** A cuboid measures $3$ cm by $4$ cm by $12$ cm. Find its space diagonal $d$.` | Example |
| 20.6 | `**Example 1.** In a triangle, $A=30^\circ$, $B=45^\circ$, and $a=8$ cm. Find $b$.` | Example |
| 20.7 | `**Example 1.** Two sides are $5$ cm and $7$ cm, with included angle $60^\circ$…` | Example |
| 20.8 | `**Example 1.** Find the area when two sides are $8$ cm and $5$ cm, with included angle $30^\circ$.` | Example |
| 21.1 | `**Example 1.** A circle has radius $4.6$ cm. Work out its diameter.` | Example |
| 21.2 | `**Example 1.** The angle at the circumference is $38^\circ$…` | Example |
| 21.3 | `**Example 1.** A radius meets a tangent at $T$…` | Example |
| 21.4 | `**Example 1.** $AB$ is a diameter. Point $C$ lies on the circumference. Show that angle $ACB$ is $90^\circ$.` | Example |
| 22.1 | `**Example 1.** Point $P$ moves from $(1,2)$ to $(5,-1)$. Describe the translation.` | Example |
| 22.2 | `**Example 1.** Work out $\begin{pmatrix}3\\-2\end{pmatrix}+\begin{pmatrix}-5\\4\end{pmatrix}$.` | Example |
| 22.3 | `**Example 1.** In triangle $ABC$, let $\overrightarrow{AB}=\mathbf{u}$…` | Example |
| 23.1 | `**Example 1.** A fair six-sided die is rolled. Find the probability of rolling a prime.` | Example |
| 23.2 | `**Example 1.** A coin lands on heads 54 times in 100 tosses. Find the relative frequency of heads.` | Example |
| 23.3 | `**Example 1.** A survey asks 30 students whether they walk to school…` | Example |
| 23.4 | `**Example 1.** A fair coin is tossed twice. Find the probability of at least one head.` | Example |
| 23.5 | `**Example.** In a group of 30 students, 17 study French, 12 study Spanish and 5 study both. Find how many study neither.` | Example |
| 23.6 | `**Example 1.** In a group of 30 students, 18 take the bus…` | Example |
| 24.1 | `**Example.** A school has 900 pupils. A random sample of 90 pupils includes 27 who walk…` | Example |
| 24.2 | `**Example.** In a survey of 40 pupils, 10 walk, 20 take a bus and 10 travel by car. Find the bus sector angle.` | Example |
| 24.3 | `**Example.** Find the mean, median, mode and range of $3, 4, 4, 7, 12$.` | Example |
| 24.4 | `**Example.** The values 1, 2 and 3 have frequencies 2, 3 and 1. Find the mean and median.` | Example |
| 24.5 | `**Example.** Rainfall was 4 mm in January, 7 mm in February and 5 mm in March. Describe the change.` | Example |
| 25.1 | `**Example 1.** Find the median, quartiles and IQR for the chapter travel times.` | Example |
| 25.2 | `**Example 1.** Plot the cumulative frequency graph for the table.` | Example |
| 25.3 | `**Example 1.** A class from 0 to 10 has frequency 20. Find its frequency density.` | Example |
| 25.4 | `**Example 1.** A class records hours of revision and test scores…` | Example |
| 25.5 | `**Example 1.** Group A has median 18 and IQR 6. Group B has median 21 and IQR 10.` | Example |

Two naming drifts are visible in that table: Chapter 17 alone uses
`**Worked example.**` / `**Worked construction.**`; Chapter 23 alone is
inconsistent within itself between `**Example 1.**` (23.1–23.4, 23.6) and
`**Example.**` (23.5).

### 4.2 The fade is entirely off-page — and two chapters collapse it

The Walkthrough is pure worked-example teaching. The "partial example → hint →
independent" half of P1 lives on the Guided problems page. Measured there:

| Ch | Fade implemented on Guided pages | Sections with a middle step | Defect |
|---|---|---|---|
| 14 | `Hint → Full working` (no middle step) | 0 of 5 | `14.1/Guided problems/index.md:31,34` |
| 15 | `Hint → First step → Full working` | 5 of 5 | only **1** supported problem per page |
| 16 | `Hint → One step → Full working` | 5 of 5 | none |
| 17 | `Hint → Next step → Full answer` | 5 of 5 | none |
| 18 | `(Answers and feedback) → Hint → Next step → Full` | 6 of 6 | none |
| 19 | `Hint → Next step → Full working` | 6 of 6 | **fade collapses across pages** (see Q5) |
| 20 | `Hint → Full working` (no middle step) | 0 of 8 | `20.1/Guided problems/index.md:30,35` |
| 21 | `Hint → Mid → Full` | 4 of 4 | none |
| 22 | `(Answers and feedback) → Hint → Mid → Full` | 3 of 3 | none |
| 23 | `Hint → Full working` (no middle step) | 0 of 6 | `23.2/Guided problems/index.md:39,44` |
| 24 | `Hint → Next step → Full working` | 5 of 5 | **Next step repeats Full working in 24.2–24.5** |
| 25 | `(Feedback) → Hint → Mid → Full` | 5 of 5 | none |

The Chapter 24 collapse is confirmed by the bundled audit
(`uv run python .agents/skills/verify-textbook-change/scripts/textbook-audit.py gcse-maths`):

```
fade-collapse: books/gcse-maths/docs/Chapter 24/Section 24.2/Guided problems/index.md: 'Next step' repeats 'Full working'
fade-collapse: books/gcse-maths/docs/Chapter 24/Section 24.3/Guided problems/index.md: 'Next step' repeats 'Full working'
fade-collapse: books/gcse-maths/docs/Chapter 24/Section 24.4/Guided problems/index.md: 'Next step' repeats 'Full working'
fade-collapse: books/gcse-maths/docs/Chapter 24/Section 24.5/Guided problems/index.md: 'Next step' repeats 'Full working'
```

Literal example, `24.2/Guided problems/index.md`: the `Next step` body at
line 34 and the `Full working` body at line 39 are both
`A bar chart uses separate bars with gaps.` `24.4/Guided problems/index.md`
does the same with `The answers are 24 and 4.` (lines 34 and 39). 24.1 is not
affected.

Chapter 15's fade is correct but thin: one problem per section, e.g.
`15.1/Guided problems/index.md:31` (one `**1.**`, then Hint/First step/Full
working at lines 34/41/48). After a single supported item the reader is sent to
the independent bank.

**Related, not one of the seven questions.** The linter only checks that a
`> **Watch out.**` callout exists (63 of 63 do). Checking whether the callout
actually re-explains "with a check", 34 of the 63 do not contain the word
"check" or an equivalent instruction, e.g. `15.3/Walkthrough/index.md:34`,
`19.3/Walkthrough/index.md:50`, `23.6/Walkthrough/index.md:60`. Several of those
do show a numeric contrast that functions as a check (e.g.
`15.1/Walkthrough/index.md:36` computes both compositions), so this is a weaker
signal than the fade defects above — reported for completeness, not as a
headline.

---

## 5. Q3 — P3: learner-constructed relevance

### 5.1 Is the prompt learner-constructed?

**Yes, in all 12 chapters.** Every opener asks the reader to write their own
example, not merely asserts usefulness:

| Ch | Heading and line | Prompt |
|---|---|---|
| 14 | `index.md:33-35` | "Where might someone need to find two unknown amounts…? Write one example from your life, a job, or a subject you study." |
| 15 | `index.md:37-41` | "Write one example and explain how reversing the stages might help you check the result." |
| 16 | `index.md:37-39` | "Write one sentence about where angle reasoning could help you or someone you know." |
| 17 | `index.md:41-45` | "Write one example. At the end, add how one idea from this chapter could help." |
| 18 | `index.md:29-31` | "Write one example and say which measurement would need to change." |
| 19 | `index.md:30-32` | "Write one example and name the measurement that matters." |
| 20 | `index.md:26-28` | "Write one example and say what information you could measure." |
| 21 | `index.md:39-41` | "Choose one example that matters to you or someone you know. Write one sentence…" |
| 22 | `index.md:43-47` | "Write one example in your own words. You can return to it after the chapter." |
| 23 | `index.md:42-44` | "Write one example and explain what decision it could help with." |
| 24 | `index.md:27-29` | "Write one example and say what question the data could answer." |
| 25 | `index.md:40-44` | "Write one example and name the measure that could help." |

No chapter makes a bare "this is useful" assertion instead. The nearest to an
assertion is the extra application section in Chapters 18, 19, 20 and 24
(`18/index.md:25-27`, `19/index.md:26-28`, `20/index.md:22-24`,
`24/index.md:27-29`), but each sits alongside the reader-written prompt, not in
place of it. Chapters 14–17, 21–23 and 25 do not carry an application section at
all, so the prompt is the only P3 element there.

### 5.2 Is it returned to on the Review page?

**Only 4 of 12 do.** This is the P3 defect.

| Ch | Review heading | Line | Returns to the opener prompt? |
|---|---|---|---|
| 14 | `## Your relevance reflection` | `Review/index.md:69` | yes — "Return to your example from the chapter opener." (`:71`) |
| 15 | `## Reflect` | `Review/index.md:54` | no — asks which method, not the relevance example |
| 16 | `## Reflect` | `Review/index.md:41` | no |
| 17 | `## Your relevance reflection` | `Review/index.md:72` | yes — "Return to your example from the opener." (`:74`) |
| 18 | `## Reflect` | `Review/index.md:41` | no |
| 19 | `## Reflect` | `Review/index.md:32` | no |
| 20 | `Reflection:` inside the answers block | `Review/index.md:38` | no |
| 21 | `## What can you now do?` | `Review/index.md:49` | no |
| 22 | `## Your relevance reflection` | `Review/index.md:56` | yes — "Return to the example you wrote at the start." (`:58`) |
| 23 | `## Reflect` | `Review/index.md:27` | no |
| 24 | `## Reflect` | `Review/index.md:27` | no |
| 25 | `## Your relevance reflection` | `Review/index.md:65` | yes — "Return to your example from the opener." (`:67`) |

The heading itself also drifts: the bundled audit reports the same prompt spread
across five headings book-wide (`relevance-heading-drift`), and within 14–25
alone there are four: "Your turn to connect it" (14, 16, 17, 19, 20, 22, 23,
25), "Your turn to connect" (15), "Make a connection" (21) and "Where this
could connect to your life" (24).

---

## 6. Q4 — P4: retrieval

### 6.1 Does the warm-up come from earlier material?

The `Warm-up: remember` block exists on all 63 Guided pages (the linter enforces
that). Judged on content:

| Ch | Warm-up varies by section? | Comes from earlier material? | Note |
|---|---|---|---|
| 14 | no — identical in 14.1–14.4 | yes | `2x+3=11` and `y=3x-2` repeated verbatim (`14.1`–`14.4/Guided problems/index.md:18-19`); only 14.5 changes item 2 |
| 15 | no — identical in all 5 | yes | `15.1`–`15.5/Guided problems/index.md:18-20` |
| 16 | **yes** | yes — each section recalls the previous one | 16.2 recalls 16.1 facts (`16.2:18-19`); 16.5 recalls triangles and polygons (`16.5:18-19`) |
| 17 | no — identical in all 5 | partly forward | `17.1`–`17.5/Guided problems/index.md:18-20`; item 2 ("What does a scale of $1$ cm to $2$ m mean?") is the content of 17.5 |
| 18 | no — identical in all 6 | partly forward | `18.1`–`18.6/Guided problems/index.md:18-19`; item 2 is translation, which 18.1 itself teaches |
| 19 | **yes** | yes | 19.1 times tables and unit conversion (`19.1:16`); 19.6 recalls cuboid volume and rectangle area (`19.6:16`) |
| 20 | no — identical in all 8 | partly forward | `20.1`–`20.8/Guided problems/index.md:18-19`; item 1 is `3^2+4^2`, the exact calculation 20.1 teaches |
| 21 | **yes** | yes | `21.1:16-17` (segment, perpendicular) … `21.4:16-17` (isosceles, quadrilateral) |
| 22 | **yes** | yes | `22.1:16-17` … `22.3:16-17` |
| 23 | **yes** | yes | `23.1:23-24` … `23.6:21-22` |
| 24 | no — identical in all 5 | yes | `24.1`–`24.5/Guided problems/index.md:16`, "Work out $3+4$ and write $0.25$ as a fraction" — too small to retrieve anything |
| 25 | **yes** | yes | `25.1:18-19` … `25.5:16-17` |

Defects: the same two items are reused in **Ch14 (4 sections), Ch15 (5), Ch17
(5), Ch18 (6), Ch20 (8) and Ch24 (5)**. That is not spaced retrieval — it is a
block on every page. Chapter 24 is the most degenerate: `3+4` is not a
prerequisite of pie-chart angles or line graphs. Chapters 17, 18 and 20 also
include the section's *own* new content in the warm-up, which cannot be
"remembering".

Chapters 16, 19, 21, 22, 23 and 25 do this well: the warm-up changes per
section and recalls the immediately preceding section or a genuine prerequisite.

### 6.2 Does it give corrective feedback?

Mostly **answers only**. Only Chapter 18, 22 and 24 give explanatory feedback.

| Ch | Summary label | Feedback quality |
|---|---|---|
| 14 | `Answers` | answer only: `1. $x=4$. 2. $y=10$.` (`14.1:24`) |
| 15 | `Answers` | answer only (`15.1:25`) |
| 16 | `Check your answers` | answer only (`16.1:24`) |
| 17 | `Answers` | answer only (`17.1:25-27`) |
| 18 | `Answers and feedback` | corrective: "Starting at $-3$ and moving $8$ places right gives $5$." (`18.1:24`) |
| 19 | `Check your answers` | answer only (`19.1:23`) |
| 20 | `Answers` | answer only (`20.1:23`) |
| 21 | `Answers` | answer only (`21.1:22-23`) |
| 22 | `Answers and feedback` | corrective: "$(5,-1)$: add 3 to the horizontal coordinate and subtract 2…" (`22.1:22`) |
| 23 | `Check` | answer only (`23.2:30`) |
| 24 | `Check your answers` | corrective: "If either answer differs, revisit number operations and fractions before continuing." (`24.1:20`) |
| 25 | `Feedback` | answer only (`25.1:24`) |

So the corrective-feedback half of P4 is met in 3 of 12 chapters. The label also
drifts (`Answers`, `Check your answers`, `Answers and feedback`, `Check`,
`Feedback`).

---

## 7. Q5 — P5: interleaving

### 7.1 The Problems page itself

As noted in §1, a Problems page is two markers and nothing else. It cannot ask
"which method applies, and why?" — no text exists. The question must be answered
from the banks.

### 7.2 Do later-section banks mix earlier topics?

Mostly **no**. The banks are blocked by section. Read as statements:

- 14.4 is ten linear-and-quadratic items and nothing else; 14.5 is eight
  iteration items and nothing else (`chapter-14-practice-14.4.yaml`,
  `-14.5.yaml`).
- 15.5 is ten algebraic-proof items and nothing else.
- 20.6–20.8 are sine-rule, cosine-rule and area items respectively, with no
  mixed-method item.
- 23.6 is ten conditional-probability items and nothing else.
- 25.5 is nine IQR/outlier items and nothing else.

Where within-chapter mixing does occur it is good: 16.5 mixes triangles,
quadrilaterals, polygons and parallel lines; 19.6 combines earlier 2D and 3D
results; 21.4 mixes the centre, cyclic-quadrilateral, tangent and alternate-
segment theorems. But these are the exception.

A "which method applies, and why?" prompt appears in only **two bank files** in
the whole range (out of 63):

```bash
grep -rliE "which method|choose a method|name the method" \
  books/gcse-maths/problems/chapter-{14,...,25}-*.yaml | wc -l
# 2
```

- `chapter-18-practice-18.5.yaml:132` — "Which method checks similarity, and
  why?"
- `chapter-18-practice-18.3.yaml:158` — "Which method maps $(4,6)$ to $(2,3)$
  about the origin: translation or enlargement? Give a reason."

Other reason-giving items exist in the banks
(`chapter-16-practice-16.1.yaml:81`, `chapter-16-practice-16.2.yaml:96`,
`chapter-18-practice-18.4.yaml:104`, `chapter-18-practice-18.5.yaml:52`,
`chapter-19-practice-19.4.yaml:42`, `chapter-19-practice-19.6.yaml:85`,
`chapter-21-practice-21.1.yaml:26,53`, `chapter-22-practice-22.3.yaml:70`,
`chapter-25-practice-25.3.yaml:31`) but these ask for a
justification of one method, not for a choice between methods.

### 7.3 The Review pages carry the interleaving

This is where P5 actually lives, and most Reviews do it:

| Ch | Review mixed practice | Earlier-topic items | Method-selection instruction |
|---|---|---|---|
| 14 | `:37-61` | 3 (items 6–8) | "name a method before working" (`:39`) |
| 15 | `:27-52` | 2 explicit ("Chapter 12 revisited", "Chapter 14 revisited") | "Choose a method before working. Say why it fits" (`:29`) |
| 16 | `:14-39` | 1 ("Earlier learning", item 7) | "choose the method and give a reason" (`:16`) |
| 17 | `:27-63` | 1 ("Earlier chapter link", item 8) | "name the method first" (`:29`) |
| 18 | `:15-39` | 2 (items 5–6) | "choose a method and explain why it applies" (`:17`) |
| 19 | `:13-30` | 2 (items 7–8) | "choose a method first. Say why it applies" (`:15`) |
| 20 | `:21-38` | **0** | "name the method and explain why it fits" (`:23`) |
| 21 | `:19-47` | 1 (item 8) | "state which method applies and why" (`:21`) |
| 22 | `:20-47` | 2 (items 8–9) | "name the method before you work it out" (`:22`) |
| 23 | `:15-25` | 2 (items 6–7) | "state which method applies and why" (`:17`) |
| 24 | `:15-25` | 2 (items 6–7) | "choose the method and explain why it fits" (`:17`) |
| 25 | `:28-56` | **0** | "name the method before working" (`:30`) |

Chapters 20 and 25 have no earlier-chapter item at all in the Review. Chapter
20's Review does ask the reader to choose between Pythagoras, SOHCAHTOA, the
sine rule, the cosine rule and the area formula (`Review/index.md:38`), which is
method selection within the chapter rather than spacing of earlier material.

Chapters 15 and 17 are the only ones that name the earlier chapter in the
question itself (`15/Review/index.md:37-39`; "Earlier chapter link",
`17/Review/index.md:45`), which makes the interleaving visible to the reader.
The others label it "earlier learning" or do not label it.

### 7.4 Guided-page interleaving

Only Chapter 16 includes an earlier-section item in the practice set, labelled
in the reader's language: `**3. Earlier learning.** Work out: $7+5\times3$.
Explain which operation you do first.` (`16.1/Guided problems/index.md:88`;
present in all five 16.x pages). No other chapter does. The page contract asks
for "at least one item from an earlier section or chapter" on a Guided page; if
the Warm-up is not counted as that item, 11 of 12 chapters fail it. This is a
genuine ambiguity worth a decision in the next pass.

---

## 8. Q6 — P6: guided figures

There are exactly 12 `:::figure` directives in Chapters 14–25, one per chapter,
and **no `:::tool` directives**.

| Ch | Figure | Predict | Figure | Test | Explain | Order |
|---|---|---|---|---|---|---|
| 14 | `ch14-lines` (`14.3/Walkthrough/index.md:50`) | `:48` | `:50` | `:48` | `:52` | OK |
| 15 | `ch15-functions` (`15.1:38`) | `:40` | `:38` | `:40` | `:40` | **figure before prompt** |
| 16 | `ch16-point` (`16.1:56`) | `:54` | `:56` | `:54` | `:54` | OK |
| 17 | `ch17-construction` (`17.3:48`) | `:50` | `:48` | `:50` | `:50` | **figure before prompt** |
| 18 | `ch18-transform` (`18.2:40`) | `:38` | `:40` | `:42` | `:42` | OK |
| 19 | `ch19-circle-measures` (`19.2:40`) | `:38` | `:40` | `:42` (implicit) | `:42` | OK, Test implicit |
| 20 | `ch20-right-triangle` (`20.1:48`) | `:46` | `:48` | `:46` | `:46` | OK |
| 21 | `ch21-centre-angle` (`21.2:58`) | `:56` | `:58` | `:60` | `:62` | OK |
| 22 | `ch22-vector-translation` (`22.1:45`) | `:47` | `:45` | `:47` | `:47` | **figure before prompt** |
| 23 | `ch23-spinner` (`23.1:56`) | `:54` | `:56` | `:58` | `:60` | OK |
| 24 | `ch24-chart-choice` (`24.2:45`) | `:47` | `:45` | `:47` | `:47` | **figure before prompt** |
| 25 | `ch25-boxplot` (`25.1:46`) | `:48` | `:46` | `:48` | `:48` | **figure before prompt** |

**Five of the twelve figures render above their own Predict prompt.** Because
the `:::figure` directive is replaced in place by the interactive, a reader
meeting `15.1/Walkthrough/index.md` sees the machine before the instruction
"predict the inverse of $f(x)=2x+3$" (`15.1:40`). The same applies to
`17.3:48` vs `:50`, `22.1:45` vs `:47`, `24.2:45` vs `:47` and `25.1:46` vs
`:48`. This is the P6 Predict→Test→Explain sequence in the wrong order: the
prediction is not made before the test.

The remaining seven are correctly ordered, and the best of them separate the
three steps line by line: 21.2 Predict `:56`, figure `:58`, Test `:60`, Explain
`:62`; and 23.1 is the same pattern (`:54`, `:56`, `:58`, `:60`).

**The explanation is prompted, not shown, in all 12.** Every Explain line asks
the reader to produce the explanation ("Write your explanation before reading on"
23.1:60; "write why the centre angle stays twice the circumference angle"
21.2:62; "Enter your explanation in your notes" 14.3:52; "Write one sentence
before reading on" 24.2:47). No figure is followed by its own model answer.

Chapter 19's figure is the only one where Test is not a separate instruction:
"**Explain:** compare the two readouts" (`19.2:42`). That is minor, but it means
the explicit Test step is missing.

---

## 9. Q7 — Budget

Hooks + applications + tools are comfortably under the ~¼ ceiling. There is no
danger of a lively activity substituting for practice; if anything the opposite.

| Ch | Sections | Guided items | Independent bank items | Figures | Tools | Application section |
|---|---|---|---|---|---|---|
| 14 | 5 | 15 | 48 | 1 | 0 | no |
| 15 | 5 | 5 | 50 | 1 | 0 | no |
| 16 | 5 | 15 | 40 | 1 | 0 | no |
| 17 | 5 | 10 | 40 | 1 | 0 | no |
| 18 | 6 | 18 | 61 | 1 | 0 | `18/index.md:25` |
| 19 | 6 | 18 | 48 | 1 | 0 | `19/index.md:26` |
| 20 | 8 | 24 | 65 | 1 | 0 | `20/index.md:22` |
| 21 | 4 | 14 | 40 | 1 | 0 | no |
| 22 | 3 | 18 | 24 | 1 | 0 | no |
| 23 | 6 | 20 | 62 | 1 | 0 | no |
| 24 | 5 | 15 | 45 | 1 | 0 | `24/index.md:27` |
| 25 | 5 | 15 | 45 | 1 | 0 | no |

Every chapter has exactly one hook (the chapter-problem first contact), one
learner-written relevance prompt, one figure and zero tools. Four chapters add
one short application paragraph. Practice (guided + independent) is 55–89 items
per chapter. The extras are a few paragraphs and one interactive against dozens
of practice items and several worked-example Learn pages, so the share is far
below a quarter.

Two observations rather than defects:

- The formula says "guided investigation(s) per chapter". Every chapter has
  exactly one. That meets the minimum, but there is no chapter with two.
- Ch21 has only 4 sections, Ch22 only 3, so their total practice volume is
  smaller; the extras-to-practice ratio there is still low, not high.

**Repository-level context for the budget.** `books/gcse-maths/curriculum.yaml`
declares `anchor:`, `application:`, `relevance_prompt:` and `tools:` for
Chapter 1 only (`:61-69`). Chapters 14–25 have none of those keys — the
`- id: 14` block begins directly at `:214` with `title`, `strand`, `summary`,
`sections`. The anchors do exist, but they are authored directly into each
`index.md` rather than sourced from the curriculum, and there is no per-chapter
`tools:` declaration to reconcile against. This is why Q7's tool count is read
from the pages, not from the curriculum.

---

## 10. Cross-cutting findings the linter cannot see

These do not map cleanly to one of the seven questions, but they came out of the
same scan and belong in the record.

1. **Chapter 16 prints curriculum codes to the reader.** Five Walkthroughs end
   with `**DfE coverage:** G3. Each item is taught above and appears in the
   independent practice set.` — `16.1:62`, `16.2:52`, `16.3:60`, `16.4:52`,
   `16.5:44`. `textbook.lint` maps `DfE refs?` to "(delete)" but does not match
   the phrase `DfE coverage`, so this passes the linter. The bundled audit's
   `covers-in-prose` check looks for `**Covers:**`, not `**DfE coverage:**`, so
   it passes that too.

2. **Internal page names reach the reader twice.**
   `15/index.md:45` — "Each section has **Learn**, **Guided problems**, and
   **Practise** pages." `16/index.md:41` — "The Learn pages teach each fact.
   Guided problems pages fade support…". The reader-facing name is "Practise
   with help"; `Guided problems` is not in `INTERNAL_PHRASES` in
   `engine/src/textbook/lint.py:85-91`, so the linter does not flag it.

3. **Checkpoint heading drift.** Chapters 14–17 and 19–25 use `## Progress
   check`; Chapter 18 uses `### Progress check` (`18.1:75` … `18.6:34`); Chapter
   19 uses an inline `Progress check: …` paragraph rather than a heading
   (`19.2:44` … `19.6:58`); Chapter 21.1 substitutes `## Check your circle
   vocabulary` (`21.1:42`). The reader meets four different rituals for the same
   event.

4. **Opener heading drift.** `18/index.md:17` and `19/index.md:19` carry the
   outcomes as bold text, not as an `##` heading, so the bundled audit reports
   `opener-missing-outcomes` for both even though `textbook.lint` passes them
   (it searches for the substring, not a heading). `21/index.md:26` calls the
   roadmap "Route through the chapter" instead of "Roadmap" — the audit flags it
   as `opener-heading-drift`.

5. **Review heading drift.** The resolution section is called four different
   things within 14–25: "The chapter problem, solved" (14, 17, 22, 25),
   "Resolve the chapter problem" (16, 18, 24), "Return to the chapter problem"
   (21, 23) and one-off variants "Return to the two machines" (15), "Return to
   the pond" (19), "Return to the garden problem" (20). The reflection heading
   drifts too: "What you can now do" (14, 17, 22, 25), "Reflect" (15, 16, 18,
   19, 23, 24), "What can you now do?" (21), and Chapter 20 has none.

6. **Problems pages are identical in shape.** All 63 contain only the two
   markers. No reader-facing prose explains how to use them, which is consistent
   (good) but also means the interleaving and method-selection prompt cannot be
   delivered there without a change either to the page or to every bank.

---

## 11. Chapters that most need work

Ordered by how much of the formula is missing, not by chapter number.

1. **Chapter 19 — the fade collapses and the anchor thread starts late.**
   19.1 has no checkpoint at all (`19.1/Walkthrough/index.md:54-58`); 19.4–19.6
   are generic (`19.4:50`, `19.5:58`, `19.6:58`); and in **all six sections** the
   three "supported" Guided problems are verbatim copies of the first three
   independent bank items. Compare `19.1/Guided problems/index.md:30`
   ("Work out the perimeter of a rectangle with length 8 cm and width 3 cm.")
   with `chapter-19-practice-19.1.yaml` problem 1, which is the same sentence.
   A reader does the same three questions twice, once with support and once
   supposedly independently.

2. **Chapter 23 — the anchor is abandoned and the checks are answers.**
   After the 23.1 spinner figure, nothing returns to the spinner. All six
   Progress checks hand over the working (`23.1:64`, `23.2:44`, `23.3:51`,
   `23.4:46`, `23.5:41`, `23.6:64-66`). The 23.6 review does resolve the problem
   (`Review/index.md:11-13`), so the interest arc survives only as bookends.

3. **Chapter 24 — the fade is not a fade, and the warm-up is empty.**
   The bundled audit finds `Next step` repeating `Full working` in 24.2, 24.3,
   24.4 and 24.5 (e.g. `24.2/Guided problems/index.md:34` and `:39` are the
   same sentence). The warm-up is `3+4` and `0.25 as a fraction` in all five
   sections (`24.1`–`24.5/Guided problems/index.md:16`), which retrieves nothing
   relevant. The anchor thread itself is good.

4. **Chapter 15 — the anchor is returned to once and the support is one item
   deep.** Only 15.1 references the two machines (`15.1:44`); 15.2–15.5 are
   generic. Each Guided page has a single supported problem
   (`15.1/Guided problems/index.md:31-48`), so the reader gets one Hint/First
   step before being sent to ten independent items.

5. **Chapter 20 — eight nominal checkpoints, half of them assertions, and a
   fixed warm-up.** `20.5:46`, `20.6:40`, `20.7:40` and `20.8:60` state a fact
   rather than ask a question, and the same two warm-up items appear in all
   eight sections (`20.1`–`20.8/Guided problems/index.md:18-19`). The Review
   also has no earlier-chapter item (`Review/index.md:21-38`).

Then, as a second tier: **Chapter 14** (no middle fade step at
`14.1/Guided problems/index.md:31,34`; anchor dropped after 14.3; guided item 1
duplicates independent item 1), **Chapter 17** and **Chapter 18** (the anchor is
returned to, but 9 of 11 checks across the two chapters print the answer), and
the **five figures** whose Predict prompt sits below the interactive
(15.1, 17.3, 22.1, 24.2, 25.1), which is a small text move in five files.

---

## 12. Escalations and limitations

- **Q5 cannot be answered from the Problems pages as written.** They contain no
  prose or questions. The finding above is from the banks in
  `books/gcse-maths/problems/`, which are outside the stated docs scope but are
  the rendered content. If the intent is that interleaving should live on the
  Problems page, that requires a page-level change, not a bank change.
- **The "at least one item from an earlier section or chapter" contract for
  Guided pages is ambiguous.** If the `Warm-up: remember` counts, all 63 pages
  satisfy it. If it means an item among the supported problems, only Chapter 16
  does. I have not resolved this; it needs a decision before it is enforced.
- **Fade labels are not standardised.** `First step` (15), `One step` (16),
  `Next step` (17, 18, 24), `Mid` (19, 21, 22, 25) and the full block is
  `Full working` or `Full answer`. I recorded what each page does; I did not
  decide which label is correct.
- **No chapter content was modified.** Every citation was checked against the
  file at the path and line given. Quotes longer than one line are joined with a
  single space where a sentence wrapped in the source.
- **Not measured here:** mathematical correctness of worked examples or bank
  answers, tier accuracy against the AQA columns, and the voice rules already
  enforced by `textbook.lint`. Those are the existing gate's job, not this
  audit's.
