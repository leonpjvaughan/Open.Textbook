---
title: 12.3 Modelling with probability and critiquing assumptions — Practise with help
chapter: 12
chapter_title: Probability
section: '12.3'
section_title: Modelling with probability and critiquing assumptions
refs:
- M3
- OT3
kind: guided-problems
---

# 12.3 Modelling with probability and critiquing assumptions — Practise with help

Work each question closed book first. Before you calculate, write down one
assumption the model makes.

## Warm-up: remember

1. For two events $A$ and $B$, $P(A \text{ and } B) = 0.24$ and $P(B) = 0.6$.
   Find $P(A \mid B)$.
2. Events $A$ and $B$ are independent with $P(A) = 0.5$ and $P(B) = 0.2$. Find
   $P(A \text{ or } B)$.
3. Work out $15\%$ of 240.

<details markdown="1">
<summary>Answers</summary>

1. $P(A \mid B) = \dfrac{0.24}{0.6} = 0.4 = \dfrac{2}{5}$.
2. First $P(A \text{ and } B) = 0.5 \times 0.2 = 0.1$. Then
   $P(A \text{ or } B) = 0.5 + 0.2 - 0.1 = 0.6 = \dfrac{3}{5}$.
3. $0.15 \times 240 = 36$.

If question 2 was hard, revise the general addition rule in Section 12.1.
</details>

:::figure warm-up-gate


## Practise with help

**1.** A model treats a six-sided die as fair. State the probability of a 6
under the model, and give one reason the assumption may fail.

<details markdown="1">
<summary>Hint</summary>

A fair die gives each face the same probability. How many faces are there?
</details>

<details markdown="1">
<summary>Next step</summary>

Count the faces and give each one an equal share: $\dfrac{1}{6}$. For the
criticism, think about the shape of the die or the position of the spots.
</details>

<details markdown="1">
<summary>Full working</summary>

The model gives $P(6) = \dfrac{1}{6}$, because the six faces are assumed to be
equally likely. The assumption may fail if the die is not perfectly balanced, or
if the spots are drilled to different depths on different faces. A real die can
favour one face.

A fair model is still useful as a starting point, because the assumption is
clear and can be tested with data.
</details>

**2.** A model gives the probability of a fault as $0.04$. In 350 items, find
the expected number of faults.

<details markdown="1">
<summary>Hint</summary>

An expected count is a probability multiplied by the number of trials.
</details>

<details markdown="1">
<summary>Next step</summary>

Multiply $0.04$ by $350$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
0.04 \times 350 = 14.
$$

The model expects 14 faults in the batch. The expected count is a long-run
average, so a single batch may differ.
</details>

**3.** Supplier A provides 70% of a factory parts and supplier B provides 30%.
The fault rate is 1% for supplier A and 4% for supplier B. A faulty part is
found. Estimate the probability that it came from supplier B.

<details markdown="1">
<summary>Hint</summary>

Work out the expected number of faults from each supplier in a run of 1000
parts.
</details>

<details markdown="1">
<summary>Next step</summary>

For 1000 parts, supplier A gives $0.7 \times 1000 \times 0.01 = 7$ faults, and
supplier B gives $0.3 \times 1000 \times 0.04 = 12$ faults. Divide the B faults
by the total faults.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\text{supplier A faults} = 0.7 \times 1000 \times 0.01 = 7,
$$

$$
\text{supplier B faults} = 0.3 \times 1000 \times 0.04 = 12.
$$

$$
P(\text{supplier B} \mid \text{faulty}) = \frac{12}{7 + 12} = \frac{12}{19}.
$$

Supplier B provides fewer parts but more of the faults, because its fault rate
is higher.
</details>

**4.** A test has sensitivity $0.9$ and a false-positive rate of $0.06$. The
condition affects 2% of the population. Find the probability that a person has
the condition, given a positive result.

<details markdown="1">
<summary>Hint</summary>

The positive result has two paths: a person with the condition, and a person
without it. Write both path probabilities.
</details>

<details markdown="1">
<summary>Next step</summary>

The two positive paths are $0.02 \times 0.9 = 0.018$ and
$0.98 \times 0.06 = 0.0588$. Add them, then divide the first by the total.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
P(\text{positive}) = 0.02 \times 0.9 + 0.98 \times 0.06
= 0.018 + 0.0588 = 0.0768.
$$

$$
P(\text{condition} \mid \text{positive}) = \frac{0.018}{0.0768}
= \frac{180}{768} = \frac{15}{64} \approx 0.234.
$$

About 23% of positive results are true. The condition is uncommon, so the
false positives dominate the positive results.
</details>

**5.** A model predicts that 25% of 400 customers will use a new service. In
fact 120 do. Find the number the model predicts, the difference from the
observed number, and describe one way to refine the model.

<details markdown="1">
<summary>Hint</summary>

The predicted number is the model probability multiplied by 400.
</details>

<details markdown="1">
<summary>Next step</summary>

Work out $0.25 \times 400 = 100$. Subtract 100 from the observed 120.
</details>

<details markdown="1">
<summary>Full working</summary>

The model predicts

$$
0.25 \times 400 = 100
$$

customers. The observed number is 120, which is 20 more than predicted. One
refinement is to estimate the probability from a larger and more representative
sample of customers, instead of using 25% from an earlier period.
</details>

**6.** A model assumes that two components fail independently. Each fails with
probability $0.01$. The components share a power supply that fails with
probability $0.003$, and both components fail when the supply fails. Show that
the independence model underestimates the chance that both fail.

<details markdown="1">
<summary>Hint</summary>

First find the chance that both fail under the independence assumption, by
multiplying.
</details>

<details markdown="1">
<summary>Next step</summary>

The independence model gives $0.01 \times 0.01 = 0.0001$. Compare this with
$0.003$, the chance that the shared supply fails.
</details>

<details markdown="1">
<summary>Full working</summary>

Under the independence assumption,

$$
P(\text{both fail}) = 0.01 \times 0.01 = 0.0001.
$$

When the shared supply fails, both components fail. The supply fails with
probability $0.003$, so the true chance that both fail is at least $0.003$.

$$
0.003 > 0.0001.
$$

The shared supply makes the failures dependent, so the independence model
underestimates the chance that both fail.
</details>
