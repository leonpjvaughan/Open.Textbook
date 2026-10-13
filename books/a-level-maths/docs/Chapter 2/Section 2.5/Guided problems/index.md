---
title: 2.5 Simultaneous equations by elimination and substitution — Practise with help
chapter: 2
chapter_title: Algebra and functions
section: '2.5'
section_title: Simultaneous equations by elimination and substitution
refs:
- B4
kind: guided-problems
---

# 2.5 Simultaneous equations by elimination and substitution — Practise with help

Work each one first, closed book. Before you start, look at the two equations and
decide: are they both linear, or is one of them a curve? That choice decides your
method.

## Warm-up: remember

1. Solve $2x + 1 = 9$.
2. Expand $(x + 3)^2$.
3. Factorise $x^2 - 4x - 12$.

<details markdown="1">
<summary>Answers</summary>

1. $2x = 8$, so $x = 4$.
2. $(x + 3)^2 = x^2 + 6x + 9$.
3. $x^2 - 4x - 12 = (x - 6)(x + 2)$.

If question 3 was hard, revisit factor pairs: you need two numbers that multiply
to $-12$ and add to $-4$.
</details>

## Practise with help

**1.** Solve $x + y = 7$ and $x - y = 3$ by elimination.

<details markdown="1">
<summary>Hint</summary>

The coefficients of $y$ are $+1$ and $-1$, so adding the equations removes $y$.
</details>

<details markdown="1">
<summary>Next step</summary>

Add the two equations to get $2x = 10$.
</details>

<details markdown="1">
<summary>Full working</summary>

Add the equations:

$$
(x + y) + (x - y) = 7 + 3, \qquad 2x = 10, \qquad x = 5.
$$

Substitute into $x + y = 7$:

$$
5 + y = 7, \qquad y = 2.
$$

The solution is $(5, 2)$.
</details>

**2.** Solve $4x + 3y = 18$ and $2x - y = 4$ by elimination.

<details markdown="1">
<summary>Hint</summary>

Scale the second equation so that the $y$ terms match in size. Multiplying by
$3$ gives $6x - 3y = 12$.
</details>

<details markdown="1">
<summary>Next step</summary>

Add $4x + 3y = 18$ and $6x - 3y = 12$ to remove $y$.
</details>

<details markdown="1">
<summary>Full working</summary>

Multiply the second equation by $3$:

$$
6x - 3y = 12.
$$

Add the two equations:

$$
(4x + 3y) + (6x - 3y) = 18 + 12, \qquad 10x = 30, \qquad x = 3.
$$

Substitute into $2x - y = 4$:

$$
6 - y = 4, \qquad y = 2.
$$

The solution is $(3, 2)$.
</details>

**3.** Solve $y = x - 1$ and $x^2 + y^2 = 25$ by substitution.

<details markdown="1">
<summary>Hint</summary>

The first equation already gives $y$ in terms of $x$. Replace $y$ in the second
equation with $x - 1$.
</details>

<details markdown="1">
<summary>Next step</summary>

Substitute to get $x^2 + (x - 1)^2 = 25$, expand, and collect everything on the
left.
</details>

<details markdown="1">
<summary>Full working</summary>

Substitute:

$$
x^2 + (x - 1)^2 = 25.
$$

Expand and collect:

$$
2x^2 - 2x + 1 = 25, \qquad 2x^2 - 2x - 24 = 0, \qquad x^2 - x - 12 = 0.
$$

Factorise:

$$
(x - 4)(x + 3) = 0,
$$

so $x = 4$ or $x = -3$. Then $y = x - 1$ gives $y = 3$ or $y = -4$. The solutions
are $(4, 3)$ and $(-3, -4)$.
</details>

**4.** Solve $y = x^2 + 1$ and $y = 3x - 1$.

<details markdown="1">
<summary>Hint</summary>

Both expressions equal $y$, so set them equal to each other and rearrange.
</details>

<details markdown="1">
<summary>Next step</summary>

Write $x^2 + 1 = 3x - 1$, then move every term to the left to get
$x^2 - 3x + 2 = 0$.
</details>

<details markdown="1">
<summary>Full working</summary>

Set the right sides equal:

$$
x^2 + 1 = 3x - 1, \qquad x^2 - 3x + 2 = 0, \qquad (x - 1)(x - 2) = 0.
$$

So $x = 1$ or $x = 2$. Use $y = 3x - 1$ to find each $y$: when $x = 1$, $y = 2$;
when $x = 2$, $y = 5$. The solutions are $(1, 2)$ and $(2, 5)$.
</details>

**5.** Solve $x + y = 6$ and $xy = 8$.

<details markdown="1">
<summary>Hint</summary>

Make $y$ the subject of the linear equation, then substitute into $xy = 8$.
</details>

<details markdown="1">
<summary>Next step</summary>

With $y = 6 - x$, substitute to get $x(6 - x) = 8$ and rearrange to a quadratic
in $x$.
</details>

<details markdown="1">
<summary>Full working</summary>

From $x + y = 6$, $y = 6 - x$. Substitute:

$$
x(6 - x) = 8, \qquad 6x - x^2 = 8, \qquad x^2 - 6x + 8 = 0.
$$

Factorise:

$$
(x - 2)(x - 4) = 0,
$$

so $x = 2$ or $x = 4$. Then $y = 6 - x$ gives $(2, 4)$ and $(4, 2)$.
</details>

**6.** The line $y = 3x - 2$ and the curve $y = x^2$ may meet twice, once, or not
at all. Solve the equations and state what happens.

<details markdown="1">
<summary>Hint</summary>

Set $x^2 = 3x - 2$ and look at the discriminant of the resulting quadratic.
</details>

<details markdown="1">
<summary>Next step</summary>

Rearrange to $x^2 - 3x + 2 = 0$ and work out $b^2 - 4ac$.
</details>

<details markdown="1">
<summary>Full working</summary>

Set the expressions equal:

$$
x^2 = 3x - 2, \qquad x^2 - 3x + 2 = 0.
$$

The discriminant is $(-3)^2 - 4 \times 1 \times 2 = 1 > 0$, so there are two
distinct solutions. Factorise as $(x - 1)(x - 2) = 0$, so $x = 1$ or $x = 2$,
giving the points $(1, 1)$ and $(2, 4)$. The line and the curve meet twice.
</details>
