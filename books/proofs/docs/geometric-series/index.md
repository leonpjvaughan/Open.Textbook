---
title: The sum of a geometric series
---

# The sum of a geometric series

A geometric sequence multiplies by the same number each time. Its sum is

$$S_n = \frac{a(1 - r^n)}{1 - r} \qquad (r \neq 1)$$

where $S_n$ is the sum of the first $n$ terms, $a$ is the first term, $r$ is the
common ratio and $n$ is the number of terms.

## The proof

Write the sum out and then multiply the whole thing by $r$:

$$S_n = a + ar + ar^2 + \dots + ar^{n-1}$$

$$rS_n = ar + ar^2 + ar^3 + \dots + ar^{n}$$

**Subtract the second line from the first**, term by term. Almost everything
cancels: the $ar$ in the first line meets the $ar$ in the second, and likewise for
every term except the first of the first line and the last of the second.

$$S_n - rS_n = a - ar^n$$

**Factorise both sides.** On the left, $S_n$ is common. On the right, $a$ is.

$$S_n(1 - r) = a(1 - r^n)$$

**Divide by $1 - r$**, which is allowed because $r \neq 1$:

$$S_n = \frac{a(1 - r^n)}{1 - r}$$

## Why $r = 1$ is excluded

If $r = 1$ every term is the same, so the sum is $n \times a$. The formula would ask
you to divide by $1 - 1 = 0$, and that is the proof telling you the case was never
covered: the step that cancels the terms cancels *everything* when $r = 1$, leaving
$0 = 0$, which says nothing.

## The sum to infinity

When $|r| < 1$, each term is smaller than the one before and $r^n$ shrinks towards
zero as $n$ grows. So for a large number of terms the $r^n$ in the formula
contributes nothing:

$$S_\infty = \frac{a(1 - 0)}{1 - r} = \frac{a}{1 - r}$$

This is a genuine limiting statement rather than a rounding: the sum does not
merely get close to $\dfrac{a}{1-r}$, it is the value the partial sums approach,
and they get as close as you like.

## Check your understanding

1. Find $S_6$ for $2 + 6 + 18 + \dots$
2. Find $S_\infty$ for $8 + 4 + 2 + \dots$
3. Explain why $S_\infty$ does not exist for $r = 2$.

<details markdown="1">
<summary>Answers</summary>

1. $a = 2$, $r = 3$, so $S_6 = \dfrac{2(1 - 729)}{1 - 3} = \dfrac{-1456}{-2} = 728$.
2. $a = 8$, $r = \tfrac{1}{2}$, so $S_\infty = \dfrac{8}{1 - \frac12} = 16$.
3. With $r = 2$ the terms grow without limit, so the partial sums do too. The
   formula's derivation needs $r^n \to 0$, which is false here.
</details>

## A common error

The error is to use the sum to infinity for a series that does not have one. The
formula $S_\infty = \dfrac{a}{1-r}$ needs $|r| < 1$, so that $r^n$ shrinks
towards zero. If $|r| \ge 1$ the terms do not shrink and the partial sums do not
settle. Check the size of $r$ before using the infinite formula.
