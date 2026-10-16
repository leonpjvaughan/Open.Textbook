---
title: "10.4 Sample spaces and set theory — Practise with help"
chapter: 10
chapter_title: Counting and probability
section: "10.4"
section_title: Sample spaces and set theory
tier: O
refs:
- '1.2'
kind: guided-problems
---

# 10.4 Sample spaces and set theory — Practise with help

## Warm-up: remember

1. How many pairs can be chosen from $5$ objects?
2. Write down the even numbers from $1$ to $6$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $\dbinom{5}{2} = \dfrac{5 \times 4}{2} = 10$ pairs.
2. The even numbers are $2$, $4$ and $6$.

The second answer is the event "an even score" on a die, which is a set of three outcomes.

</details>

## Practise with help

**1.** Two coins are tossed. How many outcomes are in the sample space?

<details markdown="1">
<summary>Hint</summary>

Each coin has $2$ outcomes.

<details markdown="1">
<summary>Next step</summary>

Multiply $2 \times 2$.

<details markdown="1">
<summary>Full working</summary>

$$\xi = \{\text{HH}, \text{HT}, \text{TH}, \text{TT}\}$$

The sample space has $4$ outcomes. Order matters, so HT and TH are different outcomes.

</details>
</details>
</details>

**2.** A die is rolled. The event $A$ is an even score. Write $A$ as a set and state $n(A)$.

<details markdown="1">
<summary>Hint</summary>

Which scores are even?

<details markdown="1">
<summary>Next step</summary>

The even scores are $2$, $4$ and $6$.

<details markdown="1">
<summary>Full working</summary>

$$A = \{2, 4, 6\}, \qquad n(A) = 3$$

The sample space is $\{1, 2, 3, 4, 5, 6\}$, so $A$ contains half of the outcomes.

</details>
</details>
</details>

**3.** A die is rolled. Let $A = \{2, 4, 6\}$ and $B = \{5, 6\}$. Find $A \cup B$ and
$n(A \cup B)$.

<details markdown="1">
<summary>Hint</summary>

The union takes the outcomes in either set.

<details markdown="1">
<summary>Next step</summary>

List every outcome from $A$ and from $B$, without repeating.

<details markdown="1">
<summary>Full working</summary>

$$A \cup B = \{2, 4, 5, 6\}, \qquad n(A \cup B) = 4$$

The outcome $6$ is in both sets but appears once in the union.

</details>
</details>
</details>

**4.** With the same events, find $A \cap B$ and $n(A \cap B)$.

<details markdown="1">
<summary>Hint</summary>

The intersection takes only the outcomes in both sets.

<details markdown="1">
<summary>Next step</summary>

Which score is even **and** greater than $4$?

<details markdown="1">
<summary>Full working</summary>

$$A \cap B = \{6\}, \qquad n(A \cap B) = 1$$

The score $6$ is the only outcome in both events.

</details>
</details>
</details>

**5.** Use the addition rule to find $n(A \cup B)$ for $n(A) = 3$, $n(B) = 2$ and
$n(A \cap B) = 1$.

<details markdown="1">
<summary>Hint</summary>

$n(A \cup B) = n(A) + n(B) - n(A \cap B)$.

<details markdown="1">
<summary>Next step</summary>

$3 + 2 - 1$.

<details markdown="1">
<summary>Full working</summary>

$$n(A \cup B) = 3 + 2 - 1 = 4$$

The subtraction removes the outcome counted in both events, so it is not counted twice.

</details>
</details>
</details>

**6.** Back to the chapter problem. The lucky dip bag has $5$ red and $3$ blue counters. Two
counters are drawn together, so the order does not matter. How many pairs are in the
sample space, and how many give the star prize?

<details markdown="1">
<summary>Hint</summary>

The star prize is one red and one blue.

<details markdown="1">
<summary>Next step</summary>

Total pairs: $\dbinom{8}{2}$. Star pairs: $5 \times 3$.

<details markdown="1">
<summary>Full working</summary>

$$\binom{8}{2} = 28 \text{ pairs in the sample space}$$

$$5 \times 3 = 15 \text{ star-prize pairs}$$

So $n(S) = 15$ out of $28$ pairs.

</details>
</details>
</details>

## A question from Chapter 10.3

**7.** How many ways can a committee of $4$ be chosen from $9$ people?

<details markdown="1">
<summary>Hint</summary>

A committee is a set, so the order does not matter.

<details markdown="1">
<summary>Next step</summary>

Use $\dbinom{9}{4}$.

<details markdown="1">
<summary>Full working</summary>

$$\binom{9}{4} = \frac{9 \times 8 \times 7 \times 6}{4 \times 3 \times 2 \times 1} = 126 \text{ committees}$$

This count of subsets is exactly what a sample space is built from.

</details>
</details>
</details>
