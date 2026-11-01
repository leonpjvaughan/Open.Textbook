---
title: 13.1 Discrete probability distributions and the binomial distribution — Practise
  with help
chapter: 13
chapter_title: Statistical distributions
section: '13.1'
section_title: Discrete probability distributions and the binomial distribution
refs:
- N1
kind: guided-problems
---

# 13.1 Discrete probability distributions and the binomial distribution — Practise with help

Work each question closed book first. State what a success means before you use
the binomial formula.

## Warm-up: remember

1. The events $A$ and $B$ are independent, with $P(A) = 0.3$ and
   $P(B) = 0.5$. Find $P(A \text{ and } B)$.
2. The probability that it rains on a day is $0.42$. Find the probability that
   it does not rain.
3. Work out $\dbinom{5}{2}$.

<details markdown="1">
<summary>Answers</summary>

1. For independent events, multiply: $P(A \text{ and } B) = 0.3 \times 0.5 =
   0.15$.
2. Use the complement: $1 - 0.42 = 0.58$.
3. $\dbinom{5}{2} = \dfrac{5!}{2!\,3!} = \dfrac{5 \times 4}{2 \times 1} = 10$.

If question 3 was hard, revise the binomial coefficient from Section 4.1.
</details>

:::figure warm-up-gate


## Practise with help

**1.** A fair coin is tossed 8 times. The random variable $X$ is the number of
heads. Write down the distribution of $X$ in the form $X \sim B(n, p)$.

<details markdown="1">
<summary>Hint</summary>

Check the four conditions. Then decide what a success is, and count the trials.
</details>

<details markdown="1">
<summary>Next step</summary>

There are 8 tosses, so $n = 8$. A head is a success, and the coin is fair, so
$p = \tfrac12$.
</details>

<details markdown="1">
<summary>Full working</summary>

Each toss has two outcomes, the probability of a head is the same for every
toss, and the tosses are independent. There are 8 tosses, so

$$
X \sim B\left(8, \tfrac12\right).
$$

</details>

**2.** The probabilities for a discrete random variable $X$ are $0.15$, $0.25$,
$0.35$ and $k$. Find $k$.

<details markdown="1">
<summary>Hint</summary>

The four probabilities cover every possible value, so they add to 1.
</details>

<details markdown="1">
<summary>Next step</summary>

Add the three known probabilities first: $0.15 + 0.25 + 0.35 = 0.75$.
</details>

<details markdown="1">
<summary>Full working</summary>

The probabilities add to 1, so

$$
k = 1 - (0.15 + 0.25 + 0.35) = 1 - 0.75 = 0.25.
$$

</details>

**3.** The random variable $X \sim B(5, 0.3)$. Find $P(X = 3)$.

<details markdown="1">
<summary>Hint</summary>

Write down $n$, $r$, $p$ and $1 - p$ before you substitute.
</details>

<details markdown="1">
<summary>Next step</summary>

Here $n = 5$, $r = 3$, $p = 0.3$ and $1-p = 0.7$. Substitute into
$P(X = r) = \dbinom{n}{r} p^r (1-p)^{n-r}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
P(X = 3) = \binom{5}{3} (0.3)^3 (0.7)^{2}.
$$

Work out each factor:

$$
\binom{5}{3} = 10, \qquad (0.3)^3 = 0.027, \qquad (0.7)^{2} = 0.49.
$$

Multiply:

$$
P(X = 3) = 10 \times 0.027 \times 0.49 = 0.1323.
$$

</details>

**4.** A bag holds 4 red counters and 2 blue counters. Two counters are taken
without replacement. The random variable $X$ is the number of red counters.
Explain why $X$ is not a binomial variable.

<details markdown="1">
<summary>Hint</summary>

Look at the probability of a red counter on the first draw and on the second
draw.
</details>

<details markdown="1">
<summary>Next step</summary>

After one red counter is removed, there are 3 red and 2 blue left, so the
second probability is different from the first.
</details>

<details markdown="1">
<summary>Full working</summary>

The probability of red on the first draw is $\tfrac46 = \tfrac23$. If the first
counter is red, the probability of red on the second draw is $\tfrac35$. The
probability changes between the trials, so $p$ is not constant. The four
binomial conditions are not all met, so $X$ is not a binomial variable. Taking
counters without replacement from a small bag makes the trials dependent.
</details>

**5.** The random variable $X \sim B(4, \tfrac13)$. Find $P(X = 1)$.

<details markdown="1">
<summary>Hint</summary>

Use $p = \tfrac13$ and $1 - p = \tfrac23$. Keep the answer as a fraction.
</details>

<details markdown="1">
<summary>Next step</summary>

Substitute $n = 4$, $r = 1$:
$P(X = 1) = \dbinom{4}{1} \left(\tfrac13\right)^1 \left(\tfrac23\right)^3$.
Work out $\dbinom{4}{1}$ and $\left(\tfrac23\right)^3$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
P(X = 1) = \binom{4}{1} \left(\tfrac13\right) \left(\tfrac23\right)^3
= 4 \times \tfrac13 \times \tfrac{8}{27}.
$$

Multiply the fractions:

$$
P(X = 1) = \tfrac{32}{81} \approx 0.3951.
$$

</details>

**6.** The random variable $X \sim B(6, \tfrac14)$. Find $P(X = 2)$, and explain
the part played by the number 15 in your working.

<details markdown="1">
<summary>Hint</summary>

The number 15 is $\dbinom{6}{2}$. Think about what it counts.
</details>

<details markdown="1">
<summary>Next step</summary>

Substitute $n = 6$, $r = 2$, $p = \tfrac14$ and $1-p = \tfrac34$:
$P(X = 2) = \dbinom{6}{2} \left(\tfrac14\right)^2 \left(\tfrac34\right)^4$.
Work out the coefficient and the two powers.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
P(X = 2) = \binom{6}{2} \left(\tfrac14\right)^2 \left(\tfrac34\right)^4
= 15 \times \tfrac{1}{16} \times \tfrac{81}{256}
= \tfrac{1215}{4096} \approx 0.2966.
$$

The number 15 counts the positions of the two successes among the six trials.
There are 15 different pairs of trials that could hold the two successes, and
each arrangement has the same probability.
</details>
