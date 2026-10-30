---
title: 13.2 Calculating binomial probabilities — Practise with help
chapter: 13
chapter_title: Statistical distributions
section: '13.2'
section_title: Calculating binomial probabilities
refs:
- N1
kind: guided-problems
---

# 13.2 Calculating binomial probabilities — Practise with help

Work each question closed book first. Say the inequality in words before you
calculate. Keep every term to four decimal places or more, and round once.

## Warm-up: remember

1. The random variable $X \sim B\left(5, \tfrac12\right)$. Find $P(X = 2)$.
2. The probability that a bus is late is $0.35$. Find the probability that it is
   not late.
3. Write $P(X \ge 4)$ in terms of an at-most probability.

<details markdown="1">
<summary>Answers</summary>

1. $P(X = 2) = \dbinom{5}{2}\left(\tfrac12\right)^5 = 10 \times \tfrac{1}{32}
   = \tfrac{10}{32} = \tfrac{5}{16}$.
2. Use the complement: $1 - 0.35 = 0.65$.
3. $P(X \ge 4) = 1 - P(X \le 3)$.

If question 3 was hard, revise the complement from Section 12.1.
</details>

:::figure warm-up-gate


## Practise with help

**1.** The random variable $X \sim B\left(8, \tfrac12\right)$. Find
$P(X \le 2)$.

<details markdown="1">
<summary>Hint</summary>

"At most 2" means 0, 1 or 2. Work out three terms and add them.
</details>

<details markdown="1">
<summary>Next step</summary>

Use $p = \tfrac12$, so both $p^r$ and $(1-p)^{n-r}$ are powers of $\tfrac12$,
and every term has denominator $2^8 = 256$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
P(X = 0) = \binom{8}{0}\left(\tfrac12\right)^8 = \tfrac{1}{256},
\qquad
P(X = 1) = \binom{8}{1}\left(\tfrac12\right)^8 = \tfrac{8}{256},
$$

$$
P(X = 2) = \binom{8}{2}\left(\tfrac12\right)^8 = \tfrac{28}{256}.
$$

Add the three terms:

$$
P(X \le 2) = \tfrac{1 + 8 + 28}{256} = \tfrac{37}{256} \approx 0.1445.
$$

</details>

**2.** The random variable $X \sim B(10, 0.2)$. Find $P(X \ge 3)$.

<details markdown="1">
<summary>Hint</summary>

Adding the terms from 3 to 10 uses eight terms. The complement uses three.
</details>

<details markdown="1">
<summary>Next step</summary>

Use $P(X \ge 3) = 1 - P(X \le 2)$, and work out the three terms for 0, 1 and 2.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
P(X = 0) = (0.8)^{10} = 0.1073742 \ (4 \text{ d.p.}),
$$

$$
P(X = 1) = 10(0.2)(0.8)^9 = 0.2684355 \ (4 \text{ d.p.}),
$$

$$
P(X = 2) = 45(0.2)^2(0.8)^8 = 0.3019899 \ (4 \text{ d.p.}).
$$

Add and subtract from 1:

$$
P(X \ge 3) = 1 - (0.1073742 + 0.2684355 + 0.3019899)
= 1 - 0.6777996 = 0.3222 \ (4 \text{ d.p.}).
$$

</details>

**3.** The random variable $X \sim B\left(6, \tfrac12\right)$. Find
$P(2 \le X \le 4)$.

<details markdown="1">
<summary>Hint</summary>

The values are 2, 3 and 4. Include both ends.
</details>

<details markdown="1">
<summary>Next step</summary>

Every term has denominator $2^6 = 64$. The binomial coefficients for $r = 2, 3
\text{ and } 4$ are 15, 20 and 15.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
P(2 \le X \le 4) = \frac{\binom{6}{2} + \binom{6}{3} + \binom{6}{4}}{64}
= \frac{15 + 20 + 15}{64} = \frac{50}{64} = \frac{25}{32} = 0.78125.
$$

</details>

**4.** The random variable $X \sim B(15, 0.4)$. Find $P(X < 5)$.

<details markdown="1">
<summary>Hint</summary>

$X$ takes whole-number values, so $X < 5$ is the same as $X \le 4$.
</details>

<details markdown="1">
<summary>Next step</summary>

Work out the five terms for 0, 1, 2, 3 and 4, then add them.
</details>

<details markdown="1">
<summary>Full working</summary>

Keep four decimal places in each term.

$$
P(X = 0) = (0.6)^{15} = 0.0004702,
\qquad
P(X = 1) = 15(0.4)(0.6)^{14} = 0.0047018,
$$

$$
P(X = 2) = 105(0.4)^2(0.6)^{13} = 0.0219418,
\qquad
P(X = 3) = 455(0.4)^3(0.6)^{12} = 0.0633874,
$$

$$
P(X = 4) = 1365(0.4)^4(0.6)^{11} = 0.1267748.
$$

Add:

$$
P(X < 5) = 0.0004702 + 0.0047018 + 0.0219418 + 0.0633874 + 0.1267748
= 0.2173 \ (4 \text{ d.p.}).
$$

</details>

**5.** The random variable $X \sim B(20, 0.3)$. Find $P(X > 12)$.

<details markdown="1">
<summary>Hint</summary>

$X > 12$ is the same as $X \ge 13$. That is a long tail, so use the complement.
</details>

<details markdown="1">
<summary>Next step</summary>

$P(X > 12) = 1 - P(X \le 12)$. Work out the sum from 0 to 12 with a calculator,
then subtract.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
P(X > 12) = 1 - P(X \le 12).
$$

The cumulative probability is $P(X \le 12) = 0.9987 \ (4 \text{ d.p.})$, so

$$
P(X > 12) = 1 - 0.9987 = 0.0013 \ (4 \text{ d.p.}).
$$

A value as high as 13 is very unlikely when $p = 0.3$ and $n = 20$.
</details>

**6.** A machine makes parts, and 10% of them are faulty. A quality inspector
picks 12 parts at random. Let $X$ be the number of faulty parts. Find the
probability that at least one part is faulty.

<details markdown="1">
<summary>Hint</summary>

"At least one" is the complement of "none". It is shorter to work out the
probability that no part is faulty.
</details>

<details markdown="1">
<summary>Next step</summary>

Model $X \sim B(12, 0.1)$. Then $P(X = 0) = (0.9)^{12}$, and
$P(X \ge 1) = 1 - P(X = 0)$.
</details>

<details markdown="1">
<summary>Full working</summary>

The parts are chosen at random, so the trials are independent and $p = 0.1$ is
constant. Model $X \sim B(12, 0.1)$.

$$
P(X = 0) = (0.9)^{12} = 0.2824 \ (4 \text{ d.p.}).
$$

$$
P(X \ge 1) = 1 - 0.2824 = 0.7176 \ (4 \text{ d.p.}).
$$

So at least one faulty part appears in about 71.8% of samples of 12.
</details>
