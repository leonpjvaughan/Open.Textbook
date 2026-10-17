---
title: "10.8 Bernoulli trials and the binomial distribution — Practise with help"
chapter: 10
chapter_title: Counting and probability
section: "10.8"
section_title: Bernoulli trials and the binomial distribution
tier: H
refs:
- '1.3'
kind: guided-problems
---

# 10.8 Bernoulli trials and the binomial distribution — Practise with help

## Warm-up: remember

1. A fair die is rolled twice. Find the probability of two sixes.
2. Find the value of $\dbinom{6}{4}$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $\dfrac{1}{6} \times \dfrac{1}{6} = \dfrac{1}{36}$.
2. $\dbinom{6}{4} = \dbinom{6}{2} = 15$.

The binomial formula multiplies a combination like the second answer by powers like the
first.

</details>

:::figure warm-up-gate


## Practise with help

**1.** A biased coin lands on a head with probability $0.3$. It is tossed $10$ times. Write
down the distribution of the number of heads.

<details markdown="1">
<summary>Hint</summary>

Identify $n$ and $p$.

<details markdown="1">
<summary>Next step</summary>

There are $10$ tosses, and the probability of a head is $0.3$ each time.

<details markdown="1">
<summary>Full working</summary>

$$X \sim B(10, 0.3)$$

The trials are independent, and $p = 0.3$ is constant, so the binomial model applies.

</details>
</details>
</details>

**2.** $X \sim B(5, 0.3)$. Find $P(X = 2)$.

<details markdown="1">
<summary>Hint</summary>

Use $P(X = r) = \dbinom{n}{r}p^r(1-p)^{n-r}$.

<details markdown="1">
<summary>Next step</summary>

$\dbinom{5}{2}(0.3)^2(0.7)^3$.

<details markdown="1">
<summary>Full working</summary>

$$P(X = 2) = 10 \times 0.09 \times 0.343 = 0.3087$$

The exponents $2$ and $3$ add to $5$, which is $n$.

</details>
</details>
</details>

**3.** $X \sim B\left(6, \tfrac14\right)$. Find $P(X = 2)$.

<details markdown="1">
<summary>Hint</summary>

The failure probability is $\dfrac34$.

<details markdown="1">
<summary>Next step</summary>

$\dbinom{6}{2}\left(\dfrac14\right)^2\left(\dfrac34\right)^4$.

<details markdown="1">
<summary>Full working</summary>

$$P(X = 2) = 15 \times \frac{1}{16} \times \frac{81}{256} = \frac{1215}{4096} \approx 0.2966$$

The exponent of $\dfrac14$ is $2$ and the exponent of $\dfrac34$ is $4$.

</details>
</details>
</details>

**4.** $X \sim B\left(8, \tfrac12\right)$. Find $P(X = 5)$.

<details markdown="1">
<summary>Hint</summary>

Both $p$ and $1-p$ are $\dfrac12$.

<details markdown="1">
<summary>Next step</summary>

$\dbinom{8}{5}\left(\dfrac12\right)^8$.

<details markdown="1">
<summary>Full working</summary>

$$P(X = 5) = 56 \times \frac{1}{256} = \frac{56}{256} = \frac{7}{32} \approx 0.2188$$

When $p = \dfrac12$, the powers combine into a single power of $\dfrac12$.

</details>
</details>
</details>

**5.** $X \sim B\left(8, \tfrac14\right)$. Find $P(X \ge 1)$.

<details markdown="1">
<summary>Hint</summary>

Use the complement: $P(X \ge 1) = 1 - P(X = 0)$.

<details markdown="1">
<summary>Next step</summary>

$P(X = 0) = \left(\dfrac34\right)^8$.

<details markdown="1">
<summary>Full working</summary>

$$P(X \ge 1) = 1 - \left(\frac34\right)^8 = 1 - \frac{6561}{65536}
= \frac{58975}{65536} \approx 0.8999$$

The complement is much quicker than adding eight separate probabilities.

</details>
</details>
</details>

**6.** Back to the chapter problem. The lucky dip counter is replaced, so the probability of
red is $\dfrac58$ each time. The game is played $6$ times. Find the probability of exactly
$4$ red counters.

<details markdown="1">
<summary>Hint</summary>

$X \sim B\left(6, \dfrac58\right)$.

<details markdown="1">
<summary>Next step</summary>

$\dbinom{6}{4}\left(\dfrac58\right)^4\left(\dfrac38\right)^2$.

<details markdown="1">
<summary>Full working</summary>

$$P(X = 4) = 15 \times \frac{625}{4096} \times \frac{9}{64} = \frac{84375}{262144} \approx 0.3219$$

Replacing the counter keeps the trials independent and $p$ constant, so the binomial model
applies.

</details>
</details>
</details>

## A question from Chapter 10.7

**7.** $A$ and $B$ are independent with $P(A) = 0.3$ and $P(B) = 0.6$. Find $P(A \cap B)$.

<details markdown="1">
<summary>Hint</summary>

Multiply the two probabilities.

<details markdown="1">
<summary>Next step</summary>

$0.3 \times 0.6$.

<details markdown="1">
<summary>Full working</summary>

$$P(A \cap B) = 0.3 \times 0.6 = 0.18$$

Independence is the same condition that lets the binomial formula multiply the trial
probabilities together.

</details>
</details>
</details>
