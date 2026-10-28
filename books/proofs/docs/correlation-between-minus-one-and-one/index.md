---
title: A correlation coefficient lies between −1 and 1
---

# A correlation coefficient lies between −1 and 1

The product moment correlation coefficient is always between $-1$ and $1$. That is
not a convention about how the number is written. It is a consequence of an
inequality that holds for any two lists of numbers.

## Before you start

Write the two variables as $x_1,\dots,x_n$ and $y_1,\dots,y_n$, with means
$\bar x$ and $\bar y$. The deviations are $a_i=x_i-\bar x$ and $b_i=y_i-\bar y$.

The correlation coefficient is

$$ r = \frac{\sum a_i b_i}{\sqrt{\sum a_i^2}\sqrt{\sum b_i^2}}. $$

The numerator is the covariance and the denominator is the product of the two
standard deviations, so $r$ is the covariance measured in units of both spreads.

## The proof

**Cauchy–Schwarz.** For any real number $t$,

$$ \sum (a_i + t b_i)^2 \ge 0, $$

because every term is a square. Expand the left side:

$$ \sum a_i^2 + 2t\sum a_i b_i + t^2\sum b_i^2 \ge 0. $$

This is a quadratic in $t$ that never goes below zero. Its discriminant is
therefore at most zero:

$$ \left(2\sum a_i b_i\right)^2 - 4\left(\sum a_i^2\right)
\left(\sum b_i^2\right) \le 0. $$

Divide by $4$ and take square roots:

$$ \left|\sum a_i b_i\right| \le
\sqrt{\sum a_i^2}\sqrt{\sum b_i^2}. $$

Divide both sides by the positive denominator of $r$:

$$ |r| \le 1. $$

That is the whole proof. It uses nothing about the data beyond the fact that the
deviations are real numbers.

## When the ends are reached

Equality holds exactly when the quadratic has a double root, which happens when
$b_i = \lambda a_i$ for every $i$. That is the case where every point lies on one
straight line through $(\bar x,\bar y)$.

If $\lambda>0$ the line slopes up and $r=1$. If $\lambda<0$ it slopes down and
$r=-1$. So the two extreme values are not a separate rule; they are the equality
case of the inequality.

## What this does not say

A value of $r$ near $0$ says there is no **linear** pattern. It does not say the
variables are unrelated. A perfect curve can have $r=0$ and still be a perfect
relationship.

The coefficient also does not tell you which variable causes the other, and it does
not survive a change of which points are included. It is a summary of the linear
part of one sample.
