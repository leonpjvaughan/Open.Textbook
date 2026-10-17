---
title: 13.4 Links to the binomial, histograms and points of inflection — Practise
  with help
chapter: 13
chapter_title: Statistical distributions
section: '13.4'
section_title: Links to the binomial, histograms and points of inflection
refs:
- N2
kind: guided-problems
---

# 13.4 Links to the binomial, histograms and points of inflection — Practise with help

Work each question closed book first. Check the conditions $np > 5$ and
$n(1-p) > 5$ before you approximate. Apply the continuity correction before you
standardise.

## Warm-up: remember

1. The random variable $Z \sim N(0, 1)$. Find $P(Z < 1)$.
2. A data set has mean 40 and standard deviation 5. How many standard
   deviations above the mean is the value 47?
3. Find $f''(x)$ for $f(x) = x^3 - 3x^2$, and state the value of $x$ where
   $f''(x) = 0$.

<details markdown="1">
<summary>Answers</summary>

1. From the table, $\Phi(1) = 0.8413$.
2. $\dfrac{47 - 40}{5} = 1.4$ standard deviations.
3. $f'(x) = 3x^2 - 6x$, so $f''(x) = 6x - 6$. Then $6x - 6 = 0$ gives
   $x = 1$.

If question 3 was hard, revise the second derivative from Section 7.4.
</details>

:::figure warm-up-gate


## Practise with help

**1.** The random variable $X \sim B(20, 0.5)$. Find the mean and the standard
deviation of the matching Normal variable.

<details markdown="1">
<summary>Hint</summary>

Use $\mu = np$ and $\sigma = \sqrt{np(1-p)}$.
</details>

<details markdown="1">
<summary>Next step</summary>

Here $n = 20$ and $p = 0.5$, so $np = 10$ and $n(1-p) = 10$. Substitute into
the formula for $\sigma$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\mu = np = 20 \times 0.5 = 10,
\qquad
\sigma = \sqrt{np(1-p)} = \sqrt{20 \times 0.5 \times 0.5} = \sqrt{5}
\approx 2.236.
$$

Both $np$ and $n(1-p)$ equal 10, so the approximation conditions hold.
</details>

**2.** Use the matching Normal variable from question 1 to estimate
$P(X \le 7)$ for $X \sim B(20, 0.5)$.

<details markdown="1">
<summary>Hint</summary>

Apply the continuity correction first: $X \le 7$ becomes $Y \le 7.5$.
</details>

<details markdown="1">
<summary>Next step</summary>

Standardise with $\mu = 10$ and $\sigma = \sqrt5$:
$z = \dfrac{7.5 - 10}{\sqrt5} \approx -1.118$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
z = \frac{7.5 - 10}{\sqrt5} \approx -1.118.
$$

Then

$$
P(X \le 7) \approx \Phi(-1.118) \approx 0.1318.
$$

The exact binomial probability is $0.1316$, so the estimate is close.
</details>

**3.** Use the same Normal variable to estimate $P(X \ge 13)$ for
$X \sim B(20, 0.5)$.

<details markdown="1">
<summary>Hint</summary>

Apply the continuity correction: $X \ge 13$ becomes $Y \ge 12.5$.
</details>

<details markdown="1">
<summary>Next step</summary>

Standardise:
$z = \dfrac{12.5 - 10}{\sqrt5} \approx 1.118$. Then use the complement.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
z = \frac{12.5 - 10}{\sqrt5} \approx 1.118.
$$

$$
P(X \ge 13) \approx 1 - \Phi(1.118) \approx 1 - 0.8682 = 0.1318.
$$

The answer equals the answer to question 2. The distribution is symmetric
because $p = 0.5$, and the two boundaries 7.5 and 12.5 are the same distance
from the mean 10.
</details>

**4.** The random variable $X \sim B(100, 0.3)$. Find the mean and the standard
deviation of the matching Normal variable.

<details markdown="1">
<summary>Hint</summary>

Use $\mu = np$ and $\sigma = \sqrt{np(1-p)}$, with $n = 100$ and $p = 0.3$.
</details>

<details markdown="1">
<summary>Next step</summary>

$np = 30$ and $n(1-p) = 70$. Substitute into the formula for $\sigma$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\mu = np = 100 \times 0.3 = 30,
\qquad
\sigma = \sqrt{100 \times 0.3 \times 0.7} = \sqrt{21} \approx 4.583.
$$

Both $np = 30$ and $n(1-p) = 70$ are greater than 5, so the approximation is
reasonable.
</details>

**5.** Use the matching Normal variable to estimate $P(X \le 25)$ for
$X \sim B(100, 0.3)$.

<details markdown="1">
<summary>Hint</summary>

Apply the continuity correction: $X \le 25$ becomes $Y \le 25.5$.
</details>

<details markdown="1">
<summary>Next step</summary>

Standardise:
$z = \dfrac{25.5 - 30}{4.583} \approx -0.982$. Then read the table.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
z = \frac{25.5 - 30}{4.583} \approx -0.982.
$$

$$
P(X \le 25) \approx \Phi(-0.982) \approx 0.1631.
$$

The exact binomial probability is $0.1631$ to four decimal places, so the
approximation is very close.
</details>

**6.** The random variable $X \sim B(10, 0.1)$. Explain why a Normal
approximation is not appropriate here.

<details markdown="1">
<summary>Hint</summary>

Check the two conditions $np > 5$ and $n(1-p) > 5$.
</details>

<details markdown="1">
<summary>Next step</summary>

Work out $np$ and $n(1-p)$ and compare each with 5.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
np = 10 \times 0.1 = 1, \qquad n(1-p) = 10 \times 0.9 = 9.
$$

The value $np = 1$ is not greater than 5. The distribution is strongly skewed
to the right: the bar for 0 is much taller than the bar for 1, which is taller
than the bar for 2. A symmetric Normal curve fits these bars badly. Use the
binomial formula instead.
</details>
