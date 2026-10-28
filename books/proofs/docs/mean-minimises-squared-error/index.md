---
title: The mean minimises the squared error
---

# The mean minimises the squared error

The mean is not only a convenient average. It is the one number closest to a list
in the squared sense: no other value has a smaller total of squared distances to
the data. That is why the variance is built from deviations about the mean, and why
the mean appears in every least-squares calculation.

The same algebra has two consequences that are used without proof in the statistics
chapters: the deviations from the mean add to zero, and a confidence interval and a
two-sided test are the same calculation read two ways.

## Before you start

Let the data be $x_1,\dots,x_n$ and let $c$ be any candidate for the centre. The
total squared distance from $c$ is

$$ S(c) = \sum_{i=1}^n (x_i - c)^2. $$

The mean is $\bar x = \frac1n\sum x_i$. The claim is that $S(c)$ is smallest when
$c=\bar x$.

## The proof

Differentiate $S$ with respect to $c$:

$$ S'(c) = \sum_{i=1}^n 2(x_i - c)(-1) = -2\sum_{i=1}^n (x_i - c). $$

Set the derivative to zero:

$$ -2\sum x_i + 2nc = 0, \qquad c = \frac1n\sum x_i = \bar x. $$

The second derivative is $S''(c)=2n$, which is positive, so this stationary point
is a minimum. There is only one, because $S$ is a quadratic in $c$.

Substituting $c=\bar x$ into the derivative gives

$$ \sum_{i=1}^n (x_i - \bar x) = 0, $$

so the deviations from the mean add to zero. That is the fact the standard
deviation relies on: without it, the positive and negative deviations would cancel
and the average deviation would always be zero.

## The confidence interval and the test

A two-sided $z$-test of $H_0\colon \mu=\mu_0$ rejects when

$$ |z| = \left|\frac{\bar x-\mu_0}{\sigma/\sqrt n}\right| > z_{\alpha/2}. $$

The right side is a fixed number for a given confidence level. Rearranging the
inequality gives

$$ \mu_0 < \bar x - z_{\alpha/2}\frac{\sigma}{\sqrt n}
\quad\text{or}\quad
\mu_0 > \bar x + z_{\alpha/2}\frac{\sigma}{\sqrt n}. $$

Those are exactly the values outside the interval

$$ \bar x \pm z_{\alpha/2}\frac{\sigma}{\sqrt n}. $$

So the test rejects precisely when the hypothesised mean lies outside the
confidence interval. The two procedures are one calculation, not two that happen to
agree. The same rearrangement works for the one-sample $t$-test with $t$ in place
of $z$.

## What this does not say

The mean minimises the **squared** error. A different loss gives a different centre:
the median minimises the absolute error, and the mode minimises the error counted as
a hit or a miss. Which centre is right depends on which loss matches the question.

The interval and the test agree only when both are two-sided and use the same
standard error. A one-sided test corresponds to a one-sided interval, and a test
with a different variance assumption corresponds to a different interval.
