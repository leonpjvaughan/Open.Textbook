---
title: "10.5 Axioms of probability — Practise with help"
chapter: 10
chapter_title: Counting and probability
section: "10.5"
section_title: Axioms of probability
tier: F
refs:
- '1.2'
kind: guided-problems
---

# 10.5 Axioms of probability — Practise with help

## Warm-up: remember

1. A die is rolled. How many outcomes are in the sample space?
2. How many pairs can be chosen from $8$ objects?

<details markdown="1">
<summary>Answers and feedback</summary>

1. The sample space is $\{1, 2, 3, 4, 5, 6\}$, so there are $6$ outcomes.
2. $\dbinom{8}{2} = \dfrac{8 \times 7}{2} = 28$ pairs.

A probability divides the count of the event by the count of the sample space, so both
counts matter.

</details>

## Practise with help

**1.** A fair die is rolled. Find the probability of an even score.

<details markdown="1">
<summary>Hint</summary>

Count the even scores, then divide by $6$.

<details markdown="1">
<summary>Next step</summary>

The even scores are $2$, $4$ and $6$.

<details markdown="1">
<summary>Full working</summary>

$$P(\text{even}) = \frac{3}{6} = \frac{1}{2}$$

Three outcomes favour the event out of six equally likely outcomes.

</details>
</details>
</details>

**2.** A bag holds $4$ red and $6$ blue counters. One counter is drawn. Find the probability
that it is red.

<details markdown="1">
<summary>Hint</summary>

How many counters are there in total?

<details markdown="1">
<summary>Next step</summary>

$4 + 6 = 10$ counters, of which $4$ are red.

<details markdown="1">
<summary>Full working</summary>

$$P(\text{red}) = \frac{4}{10} = \frac{2}{5}$$

The denominator is the whole sample space, not just the red counters.

</details>
</details>
</details>

**3.** $P(A) = 0.4$. Find $P(A')$.

<details markdown="1">
<summary>Hint</summary>

$A$ and $A'$ together cover every outcome.

<details markdown="1">
<summary>Next step</summary>

$P(A') = 1 - P(A)$.

<details markdown="1">
<summary>Full working</summary>

$$P(A') = 1 - 0.4 = 0.6$$

The two probabilities add to $1$, as the second axiom requires.

</details>
</details>
</details>

**4.** A random variable has probabilities $0.2$, $0.3$, $0.4$ and $k$. Find $k$.

<details markdown="1">
<summary>Hint</summary>

The four probabilities add to $1$.

<details markdown="1">
<summary>Next step</summary>

$k = 1 - (0.2 + 0.3 + 0.4)$.

<details markdown="1">
<summary>Full working</summary>

$$k = 1 - 0.9 = 0.1$$

The missing probability is whatever is needed to reach $1$.

</details>
</details>
</details>

**5.** $A$ and $B$ are mutually exclusive with $P(A) = 0.3$ and $P(B) = 0.5$. Find
$P(A \cup B)$.

<details markdown="1">
<summary>Hint</summary>

Mutually exclusive means they cannot both happen.

<details markdown="1">
<summary>Next step</summary>

$P(A \cap B) = 0$, so add the two probabilities.

<details markdown="1">
<summary>Full working</summary>

$$P(A \cup B) = 0.3 + 0.5 = 0.8$$

There is no overlap to subtract, so the addition rule reduces to a plain sum.

</details>
</details>
</details>

**6.** $P(A) = 0.5$, $P(B) = 0.4$ and $P(A \cap B) = 0.2$. Find $P(A \cup B)$.

<details markdown="1">
<summary>Hint</summary>

Use the full addition rule.

<details markdown="1">
<summary>Next step</summary>

$0.5 + 0.4 - 0.2$.

<details markdown="1">
<summary>Full working</summary>

$$P(A \cup B) = 0.5 + 0.4 - 0.2 = 0.7$$

The subtraction removes the outcomes counted in both events.

</details>
</details>
</details>

**7.** Back to the chapter problem. The lucky dip has $28$ equally likely pairs: $10$ both
red, $15$ different colours and $3$ both blue. Find the probability of the star prize and
the probability of the small prize.

<details markdown="1">
<summary>Hint</summary>

Divide each count by $28$.

<details markdown="1">
<summary>Next step</summary>

Star: $15$ out of $28$. Small: $10$ out of $28$.

<details markdown="1">
<summary>Full working</summary>

$$P(\text{star}) = \frac{15}{28} \qquad P(\text{small}) = \frac{10}{28} = \frac{5}{14}$$

The star prize is more likely, because there are more ways to draw one red and one blue
than two reds. The two probabilities and $P(\text{none}) = \dfrac{3}{28}$ add to $1$.

</details>
</details>
</details>

## A question from Chapter 10.4

**8.** Two events have $n(A) = 5$, $n(B) = 4$ and $n(A \cap B) = 2$. Find $n(A \cup B)$.

<details markdown="1">
<summary>Hint</summary>

Use the addition rule for counts.

<details markdown="1">
<summary>Next step</summary>

$5 + 4 - 2$.

<details markdown="1">
<summary>Full working</summary>

$$n(A \cup B) = 5 + 4 - 2 = 7$$

If this were a probability question with $n(\xi) = 10$, the answer would be
$\dfrac{7}{10}$.

</details>
</details>
</details>
