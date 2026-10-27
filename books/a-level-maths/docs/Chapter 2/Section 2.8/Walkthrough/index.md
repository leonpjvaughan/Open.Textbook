---
title: 2.8 Rational expressions and partial fractions — Learn
chapter: 2
chapter_title: Algebra and functions
section: '2.8'
section_title: Rational expressions and partial fractions
refs:
- B6
- B10
kind: walkthrough
---

# 2.8 Rational expressions and partial fractions — Learn

**Prerequisites:** factorising from 2.3 and 2.4; algebraic division and the
factor theorem from 2.7; adding numerical fractions.

**By the end of this section you can:** simplify a rational expression by
factorising and cancelling; add and subtract rational expressions; express a
rational function as partial fractions with distinct or repeated linear factors;
and state the values of $x$ that are excluded.

## 1. Rational expressions and their domain

A **rational expression** is a fraction of polynomials, such as

$$
\frac{x + 1}{x^2 - 4}.
$$

The expression is defined only where the denominator is not zero. The values that
make the denominator zero are **excluded values**, and they stay excluded whatever
simplification you make. This is the **domain**: the set of values the variable is
allowed to take.

## 2. Simplifying by cancelling

To simplify, factorise the top and the bottom, then cancel a common factor. The
cancellation is a division by the same expression, so it is valid wherever that
factor is not zero.

**Example 1.** Simplify $\dfrac{x^2 - 1}{x^2 + 3x + 2}$.

Factorise both parts:

$$
x^2 - 1 = (x - 1)(x + 1), \qquad x^2 + 3x + 2 = (x + 1)(x + 2).
$$

Cancel the common factor $x + 1$:

$$
\frac{x^2 - 1}{x^2 + 3x + 2} = \frac{(x - 1)(x + 1)}{(x + 1)(x + 2)} = \frac{x - 1}{x + 2}.
$$

The simplified form is defined at $x = -1$, but the original expression is not:
its denominator was zero there. Keep the excluded values $x = -1$ and $x = -2$
with the answer.

## 3. Adding and subtracting

A sum of rational expressions is put over a common denominator, exactly as with
numbers.

**Example 2.** Write $\dfrac{2}{x} + \dfrac{3}{x + 1}$ as a single fraction.

The common denominator is the product $x(x + 1)$. Multiply the top and the
bottom of each fraction to reach it:

$$
\frac{2}{x} + \frac{3}{x + 1} = \frac{2(x + 1) + 3x}{x(x + 1)}.
$$

Expand the numerator and collect terms:

$$
\frac{2(x + 1) + 3x}{x(x + 1)} = \frac{2x + 2 + 3x}{x(x + 1)} = \frac{5x + 2}{x(x + 1)}.
$$

## 4. Partial fractions

Partial fractions reverse the addition. A rational function is split into a sum
of simpler fractions, each with one linear factor as its denominator. This is the
form needed later for integration.

**Example 3.** Express $\dfrac{3x + 2}{(x - 1)(x + 2)}$ in partial fractions.

Write the unknown fractions with constant numerators:

$$
\frac{3x + 2}{(x - 1)(x + 2)} = \frac{A}{x - 1} + \frac{B}{x + 2}.
$$

Multiply both sides by the denominator:

$$
3x + 2 = A(x + 2) + B(x - 1).
$$

Substitute the value of $x$ that makes each factor zero. At $x = 1$:

$$
3(1) + 2 = 5 = A(3), \qquad A = \frac{5}{3}.
$$

At $x = -2$:

$$
3(-2) + 2 = -4 = B(-3), \qquad B = \frac{4}{3}.
$$

So

$$
\frac{3x + 2}{(x - 1)(x + 2)} = \frac{5}{3(x - 1)} + \frac{4}{3(x + 2)}.
$$

**Example 4.** Express $\dfrac{2x + 3}{(x - 1)^2}$ in partial fractions.

A repeated factor needs a term for each power, up to the repeat:

$$
\frac{2x + 3}{(x - 1)^2} = \frac{A}{x - 1} + \frac{B}{(x - 1)^2}.
$$

Multiply through:

$$
2x + 3 = A(x - 1) + B.
$$

The two sides agree for every $x$, so the coefficients of like terms must match.
The constant terms give $3 = -A + B$, and the $x$ terms give $2 = A$. So $A = 2$
and $B = 3 + A = 5$:

$$
\frac{2x + 3}{(x - 1)^2} = \frac{2}{x - 1} + \frac{5}{(x - 1)^2}.
$$

**Example 5.** Express $\dfrac{6x^2 + 5x - 5}{(x - 1)(x + 1)(x + 2)}$ in partial
fractions.

Three distinct factors give three fractions, with constants $A$, $B$ and $C$:

$$
\frac{6x^2 + 5x - 5}{(x - 1)(x + 1)(x + 2)} = \frac{A}{x - 1} + \frac{B}{x + 1} + \frac{C}{x + 2}.
$$

Multiply through:

$$
6x^2 + 5x - 5 = A(x + 1)(x + 2) + B(x - 1)(x + 2) + C(x - 1)(x + 1).
$$

Substitute each root in turn. At $x = 1$, only $A$ survives:

$$
6 + 5 - 5 = 6 = A(2)(3) = 6A, \qquad A = 1.
$$

At $x = -1$:

$$
6 - 5 - 5 = -4 = B(-2)(1) = -2B, \qquad B = 2.
$$

At $x = -2$:

$$
24 - 10 - 5 = 9 = C(-3)(-1) = 3C, \qquad C = 3.
$$

So

$$
\frac{6x^2 + 5x - 5}{(x - 1)(x + 1)(x + 2)} = \frac{1}{x - 1} + \frac{2}{x + 1} + \frac{3}{x + 2}.
$$

> **Watch out.** Two traps sit in partial fractions.
>
> **An improper fraction.** If the degree of the numerator is not less than the
> degree of the denominator, divide first and split the remainder. For example,
> $\dfrac{x^2 + 1}{x - 1} = x + 1 + \dfrac{2}{x - 1}$.
>
> **A repeated factor given one term.** For a denominator $(x - 1)^2$, one term
> $\dfrac{A}{x - 1}$ is not enough; you need $\dfrac{A}{x - 1} + \dfrac{B}{(x - 1)^2}$.
>
> **Re-check:** add your partial fractions back over a common denominator and
> confirm you recover the original numerator. Check at one value of $x$ as well.

## Progress check

1. Simplify $\dfrac{x^2 - 9}{x^2 - x - 6}$ and state the excluded values.
2. Write $\dfrac{1}{x - 1} - \dfrac{1}{x + 1}$ as a single fraction.
3. Express $\dfrac{3x + 2}{(x - 1)(x + 2)}$ in partial fractions.
4. Explain why a denominator of $(x + 2)^2$ needs two terms, not one.

## You should now be able to

- state the excluded values of a rational expression;
- simplify by factorising and cancelling a common factor;
- add and subtract rational expressions over a common denominator;
- split a rational function into partial fractions with distinct linear factors;
- handle a repeated linear factor with one term for each power;
- divide first when the fraction is improper.
