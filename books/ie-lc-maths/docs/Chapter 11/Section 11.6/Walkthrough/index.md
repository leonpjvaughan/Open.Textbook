---
title: 11.6 The normal distribution — Learn
chapter: 11
chapter_title: Statistics
section: '11.6'
section_title: The normal distribution
tier: O
refs:
- '1.7'
kind: walkthrough
---

# 11.6 The normal distribution — Learn

**Prerequisites:** Section 11.4 — the mean; Section 11.5 — the standard deviation.

**Objectives:** describe the shape of a normal distribution; use the empirical rule;
standardise a value with $z = \dfrac{x - \mu}{\sigma}$; read a probability from the
standard normal table.

By the end of this section you can model a set of measurements with a smooth curve, and
use a table to find the proportion of values in any interval.

## The shape of the normal distribution

Many measurements have the same shape: most values sit near the middle, and the values
become rarer as you move away from it. Heights, measurement errors and the times of a
race all behave this way. The smooth curve that describes this shape is the **normal
distribution**, or bell curve.

A normal distribution is described by two numbers:

- the **mean** $\mu$, which sets where the curve is centred;
- the **standard deviation** $\sigma$, which sets how wide the curve is.

The curve is symmetric about the mean, so the mean, the median and the mode all sit at
the centre. The total area under the curve is $1$, and the area above an interval is the
proportion of values in that interval. The booklet prints the equation of the curve,
$f(X) = \dfrac{1}{\sigma\sqrt{2\pi}}e^{-\frac{(X-\mu)^2}{2\sigma^2}}$.

## The empirical rule

For any normal distribution, the areas under the curve follow a fixed pattern. This
pattern is called the **empirical rule**, or the $68$-$95$-$99.7$ rule.

| Interval | Proportion of values |
|---|---|
| $\mu - \sigma$ to $\mu + \sigma$ | about $68\%$ |
| $\mu - 2\sigma$ to $\mu + 2\sigma$ | about $95\%$ |
| $\mu - 3\sigma$ to $\mu + 3\sigma$ | about $99.7\%$ |

Because the curve is symmetric, half of the remaining values lie below
$\mu - \sigma$ and half lie above $\mu + \sigma$. So about $16\%$ of values lie below
$\mu - \sigma$, and about $2.5\%$ lie above $\mu + 2\sigma$.

**Example 1.** The times of $1000$ runners are normally distributed with mean $50$
minutes and standard deviation $6$ minutes. About how many runners finish in under $44$
minutes?

The value $44$ is one standard deviation below the mean, because $50 - 6 = 44$. About
$68\%$ of runners finish between $44$ and $56$ minutes, so about $32\%$ finish outside
that band. By symmetry, half of that $32\%$, which is $16\%$, finish in under $44$
minutes.

$$0.16 \times 1000 = 160 \text{ runners}$$

## Standardising

To use the table, we turn any normal value into a **$z$-score**, which counts how many
standard deviations the value lies from the mean.

> **The standardising formula.**
> $$z = \frac{x - \mu}{\sigma}$$
> A $z$-score of $2$ means the value lies two standard deviations above the mean.

A $z$-score has no units, because the units cancel in the division. A standardised normal
distribution has mean $0$ and standard deviation $1$.

**Example 2.** A normal distribution has mean $70$ and standard deviation $8$. Find the
$z$-score of $78$.

$$z = \frac{78 - 70}{8} = \frac{8}{8} = 1$$

So $78$ lies one standard deviation above the mean.

## Reading the table

The standard normal table in the booklet gives $P(Z \le z)$, the area to the left of
$z$. For a negative $z$, use the symmetry of the curve:

$$P(Z \le -z) = 1 - P(Z \le z)$$

**Example 3.** $X$ is normally distributed with mean $70$ and standard deviation $8$.
Find $P(X < 85)$.

Standardise first:

$$z = \frac{85 - 70}{8} = 1.875 \approx 1.88$$

From the table, $P(Z \le 1.88) = 0.9699$. So $P(X < 85) \approx 0.970$, which is about
$97\%$.

**Example 4.** Find $P(62 < X < 78)$ for the same distribution.

$$z = \frac{62 - 70}{8} = -1, \qquad z = \frac{78 - 70}{8} = 1$$

The table gives $P(Z \le 1) = 0.8413$ and $P(Z \le -1) = 1 - 0.8413 = 0.1587$. Subtract:

$$P(62 < X < 78) = 0.8413 - 0.1587 = 0.6826$$

The answer is about $0.68$, which is the empirical rule's $68\%$ for the one-standard-
deviation band. The table gives the same pattern with more precision.

> **Watch out.** Standardise before you use the table. A value of $85$ with mean $70$ and
> standard deviation $8$ is not a $z$-score; the $z$-score is $1.875$. Looking up $85$ in
> the table gives a number for a completely different question.

## Progress check

Back to the chapter problem. Suppose the ages of the voters in the population are
approximately normal with mean $41$ years and standard deviation $18$ years.

Between which two ages do about $95\%$ of the voters lie?

The interval is $\mu - 2\sigma$ to $\mu + 2\sigma$:

$$41 - 2(18) = 5, \qquad 41 + 2(18) = 77$$

So about $95\%$ of the voters are between $5$ and $77$ years old. The sample mean of $41$
and the sample standard deviation of $18$ are used here as if they were the population
values. Section 11.7 is about how much those estimates can be trusted.

## You should now be able to

- describe a normal distribution by its mean and standard deviation;
- use the empirical rule to find proportions and counts;
- standardise a value with $z = \dfrac{x - \mu}{\sigma}$;
- read $P(Z \le z)$ from the standard normal table;
- use symmetry to handle a negative $z$-score.
