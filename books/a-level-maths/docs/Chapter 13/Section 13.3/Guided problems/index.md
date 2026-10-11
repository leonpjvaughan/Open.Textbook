---
title: 13.3 The Normal distribution as a model — Practise with help
chapter: 13
chapter_title: Statistical distributions
section: '13.3'
section_title: The Normal distribution as a model
dfe:
- N2
kind: guided-problems
---

# 13.3 The Normal distribution as a model — Practise with help

Work each question closed book first. Sketch the curve and shade the region
before you read the table. Check that your probability lies between 0 and 1.

## Warm-up: remember

1. The random variable $X \sim B(8, 0.5)$. Find $P(X \le 1)$.
2. A data set has mean 40 and standard deviation 5. A value is 47. How many
   standard deviations above the mean is it?
3. The random variable $X$ has mean 20 and standard deviation 4. Standardise
   the value $x = 26$.

<details markdown="1">
<summary>Answers</summary>

1. $P(X \le 1) = \dfrac{1 + 8}{256} = \dfrac{9}{256} \approx 0.0352$.
2. $\dfrac{47 - 40}{5} = 1.4$, so the value is 1.4 standard deviations above the
   mean.
3. $z = \dfrac{26 - 20}{4} = 1.5$.

If question 1 was hard, revise the binomial from Section 13.1.
</details>

## Practise with help

**1.** The random variable $Z \sim N(0, 1)$. Find $P(Z < 1.2)$.

<details markdown="1">
<summary>Hint</summary>

This is the value the table gives directly. Read the row for $z = 1.2$.
</details>

<details markdown="1">
<summary>Next step</summary>

Find $z = 1.2$ in the standard Normal table and read $\Phi(1.2)$.
</details>

<details markdown="1">
<summary>Full working</summary>

From the table,

$$
P(Z < 1.2) = \Phi(1.2) = 0.8849.
$$

So about 88.5% of the area lies to the left of 1.2.
</details>

**2.** The random variable $Z \sim N(0, 1)$. Find $P(Z > 1.5)$.

<details markdown="1">
<summary>Hint</summary>

The table gives the area to the left. The area to the right is the complement.
</details>

<details markdown="1">
<summary>Next step</summary>

Use $P(Z > 1.5) = 1 - \Phi(1.5)$, and read $\Phi(1.5)$ from the table.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
P(Z > 1.5) = 1 - \Phi(1.5) = 1 - 0.9332 = 0.0668.
$$

So about 6.7% of the area lies to the right of 1.5.
</details>

**3.** The random variable $Z \sim N(0, 1)$. Find $P(-1 < Z < 2)$.

<details markdown="1">
<summary>Hint</summary>

Subtract the area to the left of $-1$ from the area to the left of 2.
</details>

<details markdown="1">
<summary>Next step</summary>

Use $\Phi(-1) = 1 - \Phi(1) = 1 - 0.8413 = 0.1587$. Then subtract.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
P(-1 < Z < 2) = \Phi(2) - \Phi(-1) = 0.9772 - 0.1587 = 0.8185.
$$

So about 81.9% of the area lies between $-1$ and 2.
</details>

**4.** The random variable $X \sim N(30, 4^2)$. Find $P(X < 36)$.

<details markdown="1">
<summary>Hint</summary>

Standardise $x = 36$ first. The standard deviation is 4.
</details>

<details markdown="1">
<summary>Next step</summary>

$z = \dfrac{36 - 30}{4} = 1.5$. Now read $\Phi(1.5)$ from the table.
</details>

<details markdown="1">
<summary>Full working</summary>

Standardise:

$$
z = \frac{36 - 30}{4} = 1.5.
$$

Then

$$
P(X < 36) = P(Z < 1.5) = \Phi(1.5) = 0.9332.
$$
</details>

**5.** The random variable $X \sim N(200, 10^2)$. Find $P(X > 215)$.

<details markdown="1">
<summary>Hint</summary>

Standardise $x = 215$, then use the complement.
</details>

<details markdown="1">
<summary>Next step</summary>

$z = \dfrac{215 - 200}{10} = 1.5$. The table gives the area to the left, so use
$P(X > 215) = 1 - \Phi(1.5)$.
</details>

<details markdown="1">
<summary>Full working</summary>

Standardise:

$$
z = \frac{215 - 200}{10} = 1.5.
$$

Then

$$
P(X > 215) = 1 - \Phi(1.5) = 1 - 0.9332 = 0.0668.
$$
</details>

**6.** The random variable $X \sim N(50, 6^2)$. Find the value $a$ such that
$P(X < a) = 0.95$.

<details markdown="1">
<summary>Hint</summary>

Start from the probability and find $z$ first. The table of common
probabilities gives $z = 1.6449$ for $p = 0.95$.
</details>

<details markdown="1">
<summary>Next step</summary>

Unstandardise with $a = \mu + z\sigma = 50 + 1.6449 \times 6$.
</details>

<details markdown="1">
<summary>Full working</summary>

The value of $z$ with $\Phi(z) = 0.95$ is $z = 1.6449$. Then

$$
a = \mu + z\sigma = 50 + 1.6449 \times 6 = 50 + 9.8694 = 59.87
\ (2 \text{ d.p.}).
$$

So 95% of the values lie below 59.87.
</details>
