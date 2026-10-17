---
title: 12.2 Conditional probability and the conditional probability formula — Practise with help
chapter: 12
chapter_title: Probability
section: '12.2'
section_title: Conditional probability and the conditional probability formula
refs:
- M2
kind: guided-problems
---

# 12.2 Conditional probability and the conditional probability formula — Practise with help

Work each question closed book first. Name the group that comes after the word
"given", because that group is the denominator.

## Warm-up: remember

1. Events $A$ and $B$ are independent with $P(A) = 0.3$ and $P(B) = 0.6$. Find
   $P(A \text{ and } B)$.
2. A fair six-sided die is rolled. Find the probability of an odd number or a 2.
3. Write $0.45$ as a fraction in its simplest form.

<details markdown="1">
<summary>Answers</summary>

1. Multiply the probabilities: $0.3 \times 0.6 = 0.18 = \dfrac{9}{50}$.
2. The events cannot overlap, so add: $\dfrac{3}{6} + \dfrac{1}{6} = \dfrac{4}{6}
   = \dfrac{2}{3}$.
3. $0.45 = \dfrac{45}{100} = \dfrac{9}{20}$.

If question 1 was hard, revise the multiplication rule in Section 12.1.
</details>

:::figure warm-up-gate


## Practise with help

**1.** A survey of 180 students finds that 90 study History, 60 study Geography,
and 40 study both. A student is chosen at random from those who study History.
Find the probability that the student studies Geography.

<details markdown="1">
<summary>Hint</summary>

The condition is "studies History", so the 90 History students are the new
total. Look at how many of them study Geography.
</details>

<details markdown="1">
<summary>Next step</summary>

The overlap is 40 students, out of the 90 in the condition. Form the fraction
$\dfrac{40}{90}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
P(\text{Geography} \mid \text{History}) = \frac{40}{90} = \frac{4}{9}.
$$

The formula gives the same value:
$\dfrac{40/180}{90/180} = \dfrac{40}{90} = \dfrac{4}{9}$.
</details>

**2.** For two events $A$ and $B$, $P(A \text{ and } B) = 0.15$ and
$P(B) = 0.3$. Find $P(A \mid B)$.

<details markdown="1">
<summary>Hint</summary>

Use $P(A \mid B) = \dfrac{P(A \text{ and } B)}{P(B)}$.
</details>

<details markdown="1">
<summary>Next step</summary>

Substitute the two values: the numerator is $0.15$ and the denominator is
$0.3$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
P(A \mid B) = \frac{0.15}{0.3} = 0.5 = \frac{1}{2}.
$$

The condition "given $B$" restricts the sample space to $B$, and the overlap
takes up half of it.
</details>

**3.** A bag contains 6 red counters and 4 green counters. Two counters are
taken at random, one after the other, without replacement. Find the probability
that the first counter is red and the second is green.

<details markdown="1">
<summary>Hint</summary>

Draw the first two branches of a tree. The second branch is conditional on the
first, so the total number of counters has dropped by one.
</details>

<details markdown="1">
<summary>Next step</summary>

The first is red with probability $\dfrac{6}{10}$. With a red counter gone, 9
counters remain and 4 are green. Multiply $\dfrac{6}{10}$ by $\dfrac{4}{9}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
P(\text{red then green}) = \frac{6}{10} \times \frac{4}{9}
= \frac{24}{90} = \frac{4}{15}.
$$

The counters are taken without replacement, so the two draws are not
independent.
</details>

**4.** Use the same bag. Find the probability that the second counter is green.

<details markdown="1">
<summary>Hint</summary>

The second counter is green on two paths: red then green, and green then green.
</details>

<details markdown="1">
<summary>Next step</summary>

Work out each path separately. For red then green the value is
$\dfrac{6}{10} \times \dfrac{4}{9}$. For green then green it is
$\dfrac{4}{10} \times \dfrac{3}{9}$. Then add the two path probabilities.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
P(\text{red then green}) = \frac{6}{10} \times \frac{4}{9} = \frac{24}{90},
$$

$$
P(\text{green then green}) = \frac{4}{10} \times \frac{3}{9} = \frac{12}{90}.
$$

$$
P(\text{second green}) = \frac{24}{90} + \frac{12}{90}
= \frac{36}{90} = \frac{2}{5}.
$$

The two paths do not overlap, so adding them is allowed.
</details>

**5.** A test for a condition has sensitivity $0.8$ and a false-positive rate of
$0.1$. The condition affects 2% of the population. Find the probability that a
person has the condition, given a positive result.

<details markdown="1">
<summary>Hint</summary>

Draw the tree with the condition on the first branch. A positive result can
happen for a person with the condition and for a person without it.
</details>

<details markdown="1">
<summary>Next step</summary>

Find the two positive paths: $0.02 \times 0.8$ and $0.98 \times 0.1$. Add them
to get $P(\text{positive})$, then divide the first path by that total.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
P(\text{condition and positive}) = 0.02 \times 0.8 = 0.016,
$$

$$
P(\text{no condition and positive}) = 0.98 \times 0.1 = 0.098.
$$

$$
P(\text{positive}) = 0.016 + 0.098 = 0.114.
$$

$$
P(\text{condition} \mid \text{positive}) = \frac{0.016}{0.114}
= \frac{16}{114} = \frac{8}{57} \approx 0.140.
$$

The condition is rare, so most positive results come from people who do not have
it.
</details>

**6.** For two events $A$ and $B$, $P(A \text{ and } B) = 0.18$, $P(B) = 0.3$
and $P(A) = 0.6$. Find $P(A \mid B)$ and decide whether the events are
independent.

<details markdown="1">
<summary>Hint</summary>

Find $P(A \mid B)$ first. Then compare it with $P(A)$.
</details>

<details markdown="1">
<summary>Next step</summary>

Work out $\dfrac{0.18}{0.3}$. Compare the result with the given $P(A) = 0.6$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
P(A \mid B) = \frac{0.18}{0.3} = 0.6.
$$

This equals $P(A) = 0.6$, so knowing that $B$ happened does not change the
probability of $A$. The events are independent. The multiplication rule confirms
it: $0.6 \times 0.3 = 0.18$.
</details>
