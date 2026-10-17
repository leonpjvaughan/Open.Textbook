---
title: 12.1 Mutually exclusive and independent events — Practise with help
chapter: 12
chapter_title: Probability
section: '12.1'
section_title: Mutually exclusive and independent events
refs:
- M1
kind: guided-problems
---

# 12.1 Mutually exclusive and independent events — Practise with help

Work each question closed book first. Before you calculate, decide whether the
events can overlap.

## Warm-up: remember

1. A fair six-sided die is rolled. Find the probability of rolling a 3.
2. Write $0.35$ as a fraction in its simplest form.
3. A bag has 3 red counters and 7 blue counters. One counter is taken at random.
   Find the probability that it is red.

<details markdown="1">
<summary>Answers</summary>

1. One outcome out of six is a 3, so $P(3) = \dfrac{1}{6}$.
2. $0.35 = \dfrac{35}{100} = \dfrac{7}{20}$.
3. There are 3 red counters out of 10, so $P(\text{red}) = \dfrac{3}{10}$.

If question 2 was hard, revise simplifying fractions before you start.
</details>

:::figure warm-up-gate


## Practise with help

**1.** A fair six-sided die is rolled once. Find the probability of an even
number or a 1.

<details markdown="1">
<summary>Hint</summary>

Ask whether the two events can happen together. An even number is never 1, so
the events cannot overlap.
</details>

<details markdown="1">
<summary>Next step</summary>

The events are mutually exclusive, so add the two probabilities:
$P(\text{even}) = \dfrac{3}{6}$ and $P(1) = \dfrac{1}{6}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
P(\text{even or } 1) = \frac{3}{6} + \frac{1}{6} = \frac{4}{6} = \frac{2}{3}.
$$

The events cannot both happen, so no overlap is subtracted.
</details>

**2.** A fair six-sided die is rolled once. Find the probability of an odd
number or a prime number.

<details markdown="1">
<summary>Hint</summary>

List each event. The odd numbers are $1, 3, 5$ and the primes are $2, 3, 5$.
Which numbers are in both lists?
</details>

<details markdown="1">
<summary>Next step</summary>

The overlap is $\{3, 5\}$, so $P(\text{odd and prime}) = \dfrac{2}{6}$. Use the
general addition rule and subtract this overlap once.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
P(\text{odd}) = \frac{3}{6}, \qquad
P(\text{prime}) = \frac{3}{6}, \qquad
P(\text{odd and prime}) = \frac{2}{6}.
$$

$$
P(\text{odd or prime}) = \frac{3}{6} + \frac{3}{6} - \frac{2}{6}
= \frac{4}{6} = \frac{2}{3}.
$$

The union is $\{1, 2, 3, 5\}$, which has four outcomes, so the answer checks.
</details>

**3.** A fair four-sided spinner is numbered 1, 2, 3 and 4. The spinner is spun
and a fair coin is tossed. Find the probability of an even number and a head.

<details markdown="1">
<summary>Hint</summary>

The spinner and the coin do not affect each other, so the two results are
independent.
</details>

<details markdown="1">
<summary>Next step</summary>

Find $P(\text{even}) = \dfrac{2}{4}$ and $P(\text{head}) = \dfrac{1}{2}$, then
multiply them.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
P(\text{even and head}) = P(\text{even}) \times P(\text{head})
= \frac{2}{4} \times \frac{1}{2} = \frac{2}{8} = \frac{1}{4}.
$$

The events are independent, so the multiplication rule applies.
</details>

**4.** A survey of 120 students finds that 70 study Chemistry, 50 study Biology,
and 30 study both. A student is chosen at random. Show that studying Chemistry
and studying Biology are not independent.

<details markdown="1">
<summary>Hint</summary>

For independence, compare $P(\text{both})$ with
$P(\text{Chemistry}) \times P(\text{Biology})$.
</details>

<details markdown="1">
<summary>Next step</summary>

Work out $\dfrac{70}{120}$, $\dfrac{50}{120}$ and $\dfrac{30}{120}$. Multiply the
first two fractions, then compare with the third.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
P(\text{Chemistry}) = \frac{70}{120}, \qquad
P(\text{Biology}) = \frac{50}{120}.
$$

$$
P(\text{Chemistry}) \times P(\text{Biology})
= \frac{70}{120} \times \frac{50}{120} = \frac{3500}{14400} = \frac{35}{144}.
$$

The joint probability from the data is

$$
P(\text{both}) = \frac{30}{120} = \frac{1}{4} = \frac{36}{144}.
$$

The values $\dfrac{35}{144}$ and $\dfrac{36}{144}$ differ, so the two events are
not independent.
</details>

**5.** In a class of 40 students, 25 walk to school, 10 cycle, and 5 both walk
and cycle. A student is chosen at random. Find the probability that the student
walks or cycles.

<details markdown="1">
<summary>Hint</summary>

The two groups overlap. The 5 students who do both have been counted twice.
</details>

<details markdown="1">
<summary>Next step</summary>

Add $\dfrac{25}{40}$ and $\dfrac{10}{40}$, then subtract the overlap
$\dfrac{5}{40}$ once.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
P(\text{walk or cycle}) = \frac{25}{40} + \frac{10}{40} - \frac{5}{40}
= \frac{30}{40} = \frac{3}{4}.
$$

The 5 students who do both belong to either group, so they are counted once.
</details>

**6.** Two events $A$ and $B$ have $P(A) = 0.4$ and $P(B) = 0.5$, and they are
independent. Work out $P(A \text{ and } B)$ and $P(A \text{ or } B)$. Explain
why $A$ and $B$ are not mutually exclusive.

<details markdown="1">
<summary>Hint</summary>

Independence gives the overlap. Mutually exclusive events have an overlap of
zero.
</details>

<details markdown="1">
<summary>Next step</summary>

Multiply to find $P(A \text{ and } B) = 0.4 \times 0.5$. Then use the general
addition rule with that overlap.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
P(A \text{ and } B) = 0.4 \times 0.5 = 0.2.
$$

$$
P(A \text{ or } B) = 0.4 + 0.5 - 0.2 = 0.7.
$$

The overlap is $0.2$, which is not zero. The events can happen together, so they
are not mutually exclusive. A non-zero overlap also rules out mutually exclusive
events, because those have $P(A \text{ and } B) = 0$.
</details>
