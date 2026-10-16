---
title: 4.10 Inequalities and the modulus — Learn
chapter: 4
chapter_title: 'Algebra: expressions and equations'
section: '4.10'
section_title: Inequalities and the modulus
tier: H
refs:
- '4.3'
kind: walkthrough
---

# 4.10 Inequalities and the modulus — Learn

**Prerequisites:** Section 4.8 — quadratic equations; Section 4.9 — linear
inequalities.

**Objectives:** solve a quadratic inequality; solve an inequality with a modulus;
read the solution set off a sketch.

By the end of this section you can solve an inequality whose expression is a
quadratic or contains a modulus, and describe the answer as a range or a pair of
ranges.

## A quadratic inequality

A **quadratic inequality** compares a quadratic expression with a number. The
method has three steps:

1. solve the matching equation to find the boundary values;
2. sketch the parabola, or decide which way it opens;
3. read off the region that satisfies the inequality.

**Example 1.** Solve $x^2 - 4 < 0$.

First solve $x^2 - 4 = 0$: $(x - 2)(x + 2) = 0$, so $x = 2$ or $x = -2$.

The parabola $y = x^2 - 4$ opens upward and crosses the axis at $-2$ and $2$.
Between those two points it is below the axis, so $y < 0$ there.

$$-2 < x < 2$$

**Example 2.** Solve $x^2 - 5x + 6 > 0$.

The matching equation gives $x = 2$ or $x = 3$. The parabola opens upward, so it
is above the axis on the outside of the two roots and below it in between.

$$x < 2 \quad\text{or}\quad x > 3$$

The answer is two separate ranges. A single interval would miss one of them.

## The modulus

The **modulus** of a number, written $|x|$, is its distance from $0$ on the number
line. A distance is never negative, so $|x| \geq 0$ always.

$$|5| = 5 \qquad |-5| = 5 \qquad |0| = 0$$

More usefully, $|x - a|$ is the distance between $x$ and $a$.

$$|x - 3| = 2 \quad\text{means } x \text{ is } 2 \text{ units from } 3$$

That gives $x = 1$ or $x = 5$. Reading a modulus as a distance turns an algebraic
inequality into a statement about the number line.

## Inequalities with a modulus

The direction of the sign decides the shape of the answer.

$$|x - a| < b \quad\Rightarrow\quad a - b < x < a + b$$

The values within $b$ of $a$ form one interval around $a$.

$$|x - a| > b \quad\Rightarrow\quad x < a - b \quad\text{or}\quad x > a + b$$

The values more than $b$ from $a$ form two ranges, one on each side.

**Example 3.** Solve $|x - 3| < 2$.

$$1 < x < 5$$

The solutions are the numbers between $1$ and $5$. The endpoints are not
included, because the inequality is strict.

**Example 4.** Solve $|x - 1| > 3$.

$$x < -2 \quad\text{or}\quad x > 4$$

The solutions are the numbers more than $3$ from $1$. There are two ranges, and
the gap between $-2$ and $4$ is not part of the answer.

## The profitable region with the discount

With the discount, the profit is a quadratic:

$$P = 14n - 0.1n^2 - (240 + 4n) = -0.1n^2 + 10n - 240$$

The business makes a profit when $P > 0$. Multiply by $-10$, which reverses the
sign:

$$n^2 - 100n + 2400 < 0$$

The matching equation has roots $40$ and $60$, and the parabola opens upward, so
the expression is negative between the roots:

$$40 < n < 60$$

The business makes a profit when it sells more than $40$ and fewer than $60$
candles. This is the exact form of the two break-even points found in Section
4.8.

> **Watch out.** $|x - a| > b$ has two ranges, not one. Writing
> $a - b < x < a + b$ for a greater-than sign answers a different question and
> gives every wrong value. Check one number from each range in the original
> inequality.

## Progress check

Back to the chapter problem. Solve the profit inequality

$$-0.1n^2 + 10n - 240 > 0$$

for $n$, and write the answer as a single interval. Then say, in one sentence,
what the two endpoints mean for the business, and what happens outside the
interval.

## You should now be able to

- solve a quadratic inequality by finding the roots and reading the region;
- read a modulus as a distance on the number line;
- solve $|x - a| < b$ as one interval and $|x - a| > b$ as two ranges;
- turn a profit condition into an inequality and solve it.
