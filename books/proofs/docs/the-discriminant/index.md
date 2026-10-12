---
title: The discriminant decides how many roots there are
---

# The discriminant decides how many roots there are

A quadratic equation $ax^2 + bx + c = 0$ has real solutions that depend on one
number, the **discriminant**

$$\Delta = b^2 - 4ac.$$

Its sign decides how many real roots there are:

| Value of $\Delta$ | Number of real roots |
|---|---|
| $\Delta > 0$ | two distinct real roots |
| $\Delta = 0$ | one repeated real root |
| $\Delta < 0$ | no real roots |

This page reads that rule off the completed square. It takes the completed-square
identity as given — you can read
[why half the coefficient squared is the number to add](../completing-the-square/index.md)
— and it does not repeat the derivation of the
[quadratic formula](../quadratic-formula/index.md). Instead it shows *why the sign
decides the count*, and why the graph and the algebra are saying the same thing.

## Before you start

You need three facts.

- **The completed square:** $x^2 + bx + \left(\frac{b}{2}\right)^2 =
  \left(x + \frac{b}{2}\right)^2$. The full version, for a leading coefficient
  $a \neq 0$, is on the [completing the square](../completing-the-square/index.md)
  page.
- **A square is never negative.** For every real number, the square is $0$ or
  positive.
- **Dividing by $a$ is allowed**, because a quadratic has $a \neq 0$.

## Predict first

The figure draws $y = x^2 + bx + c$ and marks the points where the curve meets
the $x$-axis. It starts with $b = -2$ and $c = -3$.

**Before you read on, predict:** keep $b = -2$ and change $c$. At which value of
$c$ does the curve touch the $x$-axis exactly once? Write your prediction down.
Then read the argument, and use the figure to test it.

:::figure discriminant-graph

## What the completed square says

Start with the general quadratic, with $a \neq 0$. Take out the factor $a$ from
the $x^2$ and $x$ terms:

$$ax^2 + bx + c = a\left(x^2 + \frac{b}{a}x\right) + c.$$

Complete the square inside the bracket. Half of $\frac{b}{a}$ is $\frac{b}{2a}$,
and its square is $\frac{b^2}{4a^2}$:

$$x^2 + \frac{b}{a}x = \left(x + \frac{b}{2a}\right)^2 - \frac{b^2}{4a^2}.$$

Substitute that back. The $- \frac{b^2}{4a^2}$ is inside the bracket, so it is
multiplied by $a$:

$$ax^2 + bx + c
= a\left(x + \frac{b}{2a}\right)^2 - \frac{b^2}{4a} + c.$$

Put the last two terms over the common denominator $4a$:

$$ax^2 + bx + c
= a\left(x + \frac{b}{2a}\right)^2 - \frac{b^2 - 4ac}{4a}
= a\left(x + \frac{b}{2a}\right)^2 - \frac{\Delta}{4a}.$$

That line is the whole proof. Every quadratic can be written in it, for exactly the
same $a$, $b$ and $c$ it started with.

## Setting it to zero

Now solve $ax^2 + bx + c = 0$ using that form:

$$a\left(x + \frac{b}{2a}\right)^2 - \frac{\Delta}{4a} = 0.$$

Move the constant across and divide by $a$, which is allowed because $a \neq 0$:

$$\left(x + \frac{b}{2a}\right)^2 = \frac{\Delta}{4a^2}.$$

Look at the two sides. The left side is a square of a real number, so it is $0$ or
positive. The right side is a fixed number, because $a$, $b$ and $c$ are fixed. The
number of solutions is decided by whether that fixed number can be a square:

- **$\Delta > 0$:** the right side is positive, so the bracket has two values, one
  positive and one negative. The equation has two distinct real roots.
- **$\Delta = 0$:** the right side is zero, so the bracket must be zero. The
  equation has one repeated real root.
- **$\Delta < 0$:** the right side is negative, and no real number squares to a
  negative number. The equation has no real root.

When $\Delta > 0$, solving for $x$ gives the two roots. They are the
[quadratic formula](../quadratic-formula/index.md):

$$x = \frac{-b \pm \sqrt{\Delta}}{2a}.$$

The $\pm$ is the two values of the bracket; the $\sqrt{\Delta}$ only has a real
value when $\Delta > 0$, which is the same condition.

## The graph is doing the same thing

The completed-square form is also the vertex form. Reading
$y = a\left(x + \frac{b}{2a}\right)^2 - \frac{\Delta}{4a}$ as a graph, the smallest
or largest value of $y$ happens when the bracket is zero, at
$x = -\frac{b}{2a}$. So the vertex is

$$\left(-\frac{b}{2a}, -\frac{\Delta}{4a}\right).$$

The height of the vertex is $-\frac{\Delta}{4a}$. That number carries the sign of
$\Delta$, so the discriminant is telling you where the vertex sits compared with
the $x$-axis.

Take $a > 0$, so the parabola opens upwards and the vertex is the lowest point.

- **$\Delta > 0$:** the vertex is below the axis. The curve starts high, comes
  down to the vertex below the axis, and rises again, so it must cross the axis
  twice. Two roots.
- **$\Delta = 0$:** the vertex is on the axis. The curve touches the axis at the
  vertex and turns back, so there is one crossing, counted twice as a root. One
  repeated root.
- **$\Delta < 0$:** the vertex is above the axis. The vertex is the lowest point,
  so the whole curve stays above the axis. It never crosses. No real root.

**When $a < 0$.** The parabola opens downwards. Multiplying the whole equation by
$-1$ gives a quadratic with a positive leading coefficient and exactly the same
roots, because a product is zero when its factors are zero. So the three cases
above apply, and the discriminant decides the count in the same way.

The graph and the algebra agree because they are the same line of algebra. The
algebra asks whether a square can equal $\frac{\Delta}{4a^2}$. The graph asks
whether the curve reaches the axis. Those are the same question, and the answer is
the sign of $\Delta$ in each case.

## The boundary cases

**A perfect square.** When $a$, $b$ and $c$ are whole numbers and $\Delta$ is a
perfect square, the roots are whole numbers or fractions, so the quadratic
factorises with whole numbers. For $x^2 - 5x + 6$, $\Delta = 25 - 24 = 1$, and the
roots are $x = 2$ and $x = 3$, giving $(x - 2)(x - 3)$.

**A repeated root.** When $\Delta = 0$, the two roots merge into one. For
$x^2 - 4x + 4$, $\Delta = 16 - 16 = 0$, and the form is
$\left(x - 2\right)^2$. The root $x = 2$ is repeated, and the curve touches the
axis there.

**No real root.** When $\Delta < 0$, the square would have to be negative. For
$x^2 + x + 1$, $\Delta = 1 - 4 = -3$, and the curve stays above the axis. There
is no real solution, and no amount of factorising will find one.

**Test the figure.** Move the sliders for $b$ and $c$. Watch the crossings appear
and disappear, and read the discriminant and the vertex height in the panel.

**Explain.** In your own words, why does a negative discriminant mean there is no
real root? Answer in terms of the square, not by quoting the table.

## Check your understanding

1. Work out the discriminant of $2x^2 - 7x + 3 = 0$ and say how many real roots
   the equation has.
2. For which value of $k$ does $x^2 + 6x + k = 0$ have one repeated root?
3. A parabola has its vertex at $(3, 2)$ and opens upwards. How many times does it
   meet the $x$-axis? What is the sign of its discriminant?

<details markdown="1">
<summary>Answers</summary>

1. $a = 2$, $b = -7$ and $c = 3$, so
   $\Delta = (-7)^2 - 4 \times 2 \times 3 = 49 - 24 = 25$. The discriminant is
   positive, so there are two distinct real roots.
2. $\Delta = 6^2 - 4 \times 1 \times k = 36 - 4k$. One repeated root needs
   $\Delta = 0$, so $36 - 4k = 0$ and $k = 9$. The form is $(x + 3)^2$.
3. The vertex is the lowest point, because the parabola opens upwards, and it sits
   at height $2$ above the axis. The curve never reaches the axis, so it meets it
   zero times and the discriminant is negative.
</details>

## A common error

The discriminant is $\Delta = b^2 - 4ac$, and the sign of $c$ matters. For
$x^2 + x - 1$, $a = 1$, $b = 1$ and $c = -1$, so

$$\Delta = 1^2 - 4 \times 1 \times (-1) = 1 + 4 = 5,$$

which is positive. Substituting a negative $c$ into $-4ac$ makes that term
positive, and the two terms add.

A repeated root is a root. When $\Delta = 0$, the equation has the solution
$x = -\frac{b}{2a}$, counted twice. It does not mean "no solution".
