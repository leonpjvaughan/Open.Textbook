---
title: 2.8 Rational expressions and partial fractions — Practise with help
chapter: 2
chapter_title: Algebra and functions
section: '2.8'
section_title: Rational expressions and partial fractions
dfe:
- B6
- B10
kind: guided-problems
---

# 2.8 Rational expressions and partial fractions — Practise with help

Work each one first, closed book. Before you cancel anything, write the
factorised form of the top and the bottom. Factoring first makes the common
factor visible.

## Warm-up: remember

1. Factorise $x^2 - 5x + 6$.
2. Factorise $x^2 - 16$.
3. Write $\dfrac{1}{2} + \dfrac{1}{3}$ as a single fraction.

<details markdown="1">
<summary>Answers</summary>

1. $x^2 - 5x + 6 = (x - 2)(x - 3)$.
2. $x^2 - 16 = (x - 4)(x + 4)$.
3. $\dfrac{1}{2} + \dfrac{1}{3} = \dfrac{3 + 2}{6} = \dfrac{5}{6}$.

If question 3 was hard, revisit the common denominator: it is the smallest
number that both denominators divide.
</details>

## Practise with help

**1.** Simplify $\dfrac{x^2 - 4}{x^2 + 5x + 6}$.

<details markdown="1">
<summary>Hint</summary>

Factorise the top as a difference of two squares, and factorise the bottom as a
quadratic with two whole-number roots.
</details>

<details markdown="1">
<summary>Next step</summary>

$x^2 - 4 = (x - 2)(x + 2)$ and $x^2 + 5x + 6 = (x + 2)(x + 3)$. Cancel the common
factor.
</details>

<details markdown="1">
<summary>Full working</summary>

Factorise:

$$
\frac{x^2 - 4}{x^2 + 5x + 6} = \frac{(x - 2)(x + 2)}{(x + 2)(x + 3)}.
$$

Cancel $x + 2$:

$$
\frac{x - 2}{x + 3}.
$$

The original expression is excluded at $x = -2$ and $x = -3$.
</details>

**2.** Write $\dfrac{3}{x + 2} + \dfrac{4}{x - 1}$ as a single fraction.

<details markdown="1">
<summary>Hint</summary>

The common denominator is the product $(x + 2)(x - 1)$.
</details>

<details markdown="1">
<summary>Next step</summary>

Put both fractions over the common denominator:
$\dfrac{3(x - 1) + 4(x + 2)}{(x + 2)(x - 1)}$.
</details>

<details markdown="1">
<summary>Full working</summary>

Put both fractions over a common denominator:

$$
\frac{3(x - 1) + 4(x + 2)}{(x + 2)(x - 1)} = \frac{3x - 3 + 4x + 8}{(x + 2)(x - 1)} = \frac{7x + 5}{(x + 2)(x - 1)}.
$$

The expression is excluded at $x = -2$ and $x = 1$.
</details>

**3.** Express $\dfrac{5x + 1}{(x - 2)(x + 1)}$ in partial fractions.

<details markdown="1">
<summary>Hint</summary>

Write $\dfrac{A}{x - 2} + \dfrac{B}{x + 1}$, then multiply both sides by
$(x - 2)(x + 1)$.
</details>

<details markdown="1">
<summary>Next step</summary>

$5x + 1 = A(x + 1) + B(x - 2)$. Substitute $x = 2$, then $x = -1$.
</details>

<details markdown="1">
<summary>Full working</summary>

Write

$$
\frac{5x + 1}{(x - 2)(x + 1)} = \frac{A}{x - 2} + \frac{B}{x + 1}.
$$

Multiply through:

$$
5x + 1 = A(x + 1) + B(x - 2).
$$

At $x = 2$: $11 = 3A$, so $A = \frac{11}{3}$. At $x = -1$: $-4 = -3B$, so
$B = \frac{4}{3}$. Therefore

$$
\frac{5x + 1}{(x - 2)(x + 1)} = \frac{11}{3(x - 2)} + \frac{4}{3(x + 1)}.
$$
</details>

**4.** Express $\dfrac{4x - 1}{(x + 2)^2}$ in partial fractions.

<details markdown="1">
<summary>Hint</summary>

A squared denominator needs two terms: one with $x + 2$ and one with
$(x + 2)^2$.
</details>

<details markdown="1">
<summary>Next step</summary>

Write $\dfrac{A}{x + 2} + \dfrac{B}{(x + 2)^2}$, so that
$4x - 1 = A(x + 2) + B$.
</details>

<details markdown="1">
<summary>Full working</summary>

Write

$$
\frac{4x - 1}{(x + 2)^2} = \frac{A}{x + 2} + \frac{B}{(x + 2)^2}.
$$

Then

$$
4x - 1 = A(x + 2) + B.
$$

The $x$ terms give $A = 4$. Both sides must agree at every $x$; at $x = -2$,
$-9 = B$. So

$$
\frac{4x - 1}{(x + 2)^2} = \frac{4}{x + 2} - \frac{9}{(x + 2)^2}.
$$
</details>

**5.** Express $\dfrac{2x^2 - x + 3}{(x - 1)(x + 2)}$ in partial fractions.

<details markdown="1">
<summary>Hint</summary>

Check the degree first. The numerator has degree $2$, the same as the
denominator, so divide before you split.
</details>

<details markdown="1">
<summary>Next step</summary>

Divide: $2x^2 - x + 3 = 2(x - 1)(x + 2) + \ldots$. Work out the remainder.
</details>

<details markdown="1">
<summary>Full working</summary>

First divide, since the fraction is improper. Expand
$(x - 1)(x + 2) = x^2 + x - 2$, and compare leading terms: $2(x^2 + x - 2) = 2x^2 + 2x - 4$. Subtract from the numerator:

$$
(2x^2 - x + 3) - (2x^2 + 2x - 4) = -3x + 7.
$$

So

$$
\frac{2x^2 - x + 3}{(x - 1)(x + 2)} = 2 + \frac{-3x + 7}{(x - 1)(x + 2)}.
$$

Now split the proper part: $-3x + 7 = A(x + 2) + B(x - 1)$. At $x = 1$: $4 = 3A$,
so $A = \frac{4}{3}$. At $x = -2$: $13 = -3B$, so $B = -\frac{13}{3}$. Therefore

$$
\frac{2x^2 - x + 3}{(x - 1)(x + 2)} = 2 + \frac{4}{3(x - 1)} - \frac{13}{3(x + 2)}.
$$
</details>

**6.** The fraction $\dfrac{1}{x - a} - \dfrac{1}{x + a}$ can be written as a
single fraction. Work it out, and state the excluded values.

<details markdown="1">
<summary>Hint</summary>

The common denominator is $(x - a)(x + a)$, which is $x^2 - a^2$.
</details>

<details markdown="1">
<summary>Next step</summary>

The numerator is $(x + a) - (x - a) = 2a$.
</details>

<details markdown="1">
<summary>Full working</summary>

Put over the common denominator:

$$
\frac{1}{x - a} - \frac{1}{x + a} = \frac{(x + a) - (x - a)}{(x - a)(x + a)} = \frac{2a}{x^2 - a^2}.
$$

The expression is excluded where $x^2 - a^2 = 0$, so $x = a$ and $x = -a$ are not
allowed.
</details>
