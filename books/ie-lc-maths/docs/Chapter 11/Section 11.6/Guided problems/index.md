---
title: "11.6 The normal distribution — Practise with help"
chapter: 11
chapter_title: Statistics
section: "11.6"
section_title: The normal distribution
tier: O
refs:
- '1.7'
kind: guided-problems
---

# 11.6 The normal distribution — Practise with help

## Warm-up: remember

1. Work out $70 - 8$ and $70 + 8$.
2. Find $16\%$ of $1000$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $70 - 8 = 62$ and $70 + 8 = 78$.
2. $0.16 \times 1000 = 160$.

The two values $62$ and $78$ are one standard deviation either side of the mean $70$. The
empirical rule turns that band into a proportion, and the proportion turns into a count.

</details>

:::figure warm-up-gate


## Practise with help

**1.** A normal distribution has mean $70$ and standard deviation $8$. Find the $z$-score
of $78$.

<details markdown="1">
<summary>Hint</summary>

Use $z = \dfrac{x - \mu}{\sigma}$.

<details markdown="1">
<summary>Next step</summary>

$$z = \frac{78 - 70}{8}$$

<details markdown="1">
<summary>Full working</summary>

$$z = \frac{8}{8} = 1$$

So $78$ lies one standard deviation above the mean. A $z$-score counts standard
deviations, so it has no units.

</details>
</details>
</details>

**2.** The random variable $Z$ has the standard normal distribution. Use the table to find
$P(Z < 1.5)$.

<details markdown="1">
<summary>Hint</summary>

The table gives $P(Z \le z)$ directly for $z = 1.5$.

<details markdown="1">
<summary>Next step</summary>

Read the row for $1.5$ and the column for $0.00$.

<details markdown="1">
<summary>Full working</summary>

From the table, $P(Z < 1.5) = 0.9332$.

The table gives the area to the left of $z$. Because the curve is symmetric and the total
area is $1$, the area to the right is $1 - 0.9332 = 0.0668$.

</details>
</details>
</details>

**3.** $X$ is normally distributed with mean $70$ and standard deviation $8$. Find
$P(62 < X < 78)$.

<details markdown="1">
<summary>Hint</summary>

Standardise both ends first.

<details markdown="1">
<summary>Next step</summary>

The $z$-scores are $-1$ and $1$.

<details markdown="1">
<summary>Full working</summary>

$P(Z \le 1) = 0.8413$ and $P(Z \le -1) = 1 - 0.8413 = 0.1587$, so

$$P(62 < X < 78) = 0.8413 - 0.1587 = 0.6826$$

The answer is about $0.68$, which is the empirical rule's $68\%$ band.

</details>
</details>
</details>

**4.** The times of $1000$ runners are normally distributed with mean $50$ minutes and
standard deviation $6$ minutes. About how many runners finish in under $44$ minutes?

<details markdown="1">
<summary>Hint</summary>

How many standard deviations is $44$ below the mean?

<details markdown="1">
<summary>Next step</summary>

$44 = 50 - 6$, so it is one standard deviation below the mean.

<details markdown="1">
<summary>Full working</summary>

About $68\%$ of runners finish between $44$ and $56$ minutes, so about $32\%$ finish
outside the band. By symmetry, $16\%$ finish in under $44$ minutes:

$$0.16 \times 1000 = 160 \text{ runners}$$

</details>
</details>
</details>

**5.** The random variable $X$ is normally distributed with mean $100$ and standard
deviation $15$. Find the value $a$ such that $P(X < a) = 0.90$.

<details markdown="1">
<summary>Hint</summary>

First find the $z$-score with $P(Z \le z) = 0.90$.

<details markdown="1">
<summary>Next step</summary>

The table gives $z = 1.28$, so $a = \mu + z\sigma$.

<details markdown="1">
<summary>Full working</summary>

$$a = 100 + 1.28 \times 15 = 119.2$$

So $a \approx 119.2$ to one decimal place. Working backwards from a proportion to a value
uses the same formula, rearranged.

</details>
</details>
</details>

**6.** Back to the chapter problem. The ages of the voters are approximately normal with
mean $41$ years and standard deviation $18$ years. Between which two ages do about $95\%$
of the voters lie?

<details markdown="1">
<summary>Hint</summary>

The $95\%$ band is two standard deviations either side of the mean.

<details markdown="1">
<summary>Next step</summary>

$$41 - 2(18) \quad \text{and} \quad 41 + 2(18)$$

<details markdown="1">
<summary>Full working</summary>

$$41 - 36 = 5, \qquad 41 + 36 = 77$$

About $95\%$ of the voters are between $5$ and $77$ years old. The sample mean and
standard deviation are used here as estimates of the population values.

</details>
</details>
</details>

## A question from Chapter 6

**7.** A function is defined by $f(x) = 2x + 3$. Find $f(5)$.

<details markdown="1">
<summary>Hint</summary>

Substitute $5$ for $x$.

<details markdown="1">
<summary>Next step</summary>

$$f(5) = 2(5) + 3$$

<details markdown="1">
<summary>Full working</summary>

$$f(5) = 10 + 3 = 13$$

Substituting into a formula is exactly what the standardising formula does: the $z$-score
is the value $x$ put through $z = \dfrac{x - \mu}{\sigma}$.

</details>
</details>
</details>
