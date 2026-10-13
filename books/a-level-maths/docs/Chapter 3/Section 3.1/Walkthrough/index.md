---
title: 3.1 Straight lines, gradients and straight-line models — Learn
chapter: 3
chapter_title: Coordinate geometry
section: '3.1'
section_title: Straight lines, gradients and straight-line models
refs:
- C1
kind: walkthrough
---

# 3.1 Straight lines, gradients and straight-line models — Learn

**Prerequisites:** plotting coordinates; reading a gradient as rise over run;
rearranging a formula; solving a linear equation.

**By the end of this section you can:** work out the gradient of a line from two
points; write the equation of a line from a gradient and a point, and from two
points; move between the forms $y = mx + c$, $y - y_1 = m(x - x_1)$ and
$ax + by + c = 0$; read the gradient and the intercept of a straight-line model
with their units.

## 1. The gradient of a line

The **gradient** of a line measures how steeply it rises. It is the change in
$y$ for each unit of change in $x$. You can read it as **rise over run**.

For two points $(x_1, y_1)$ and $(x_2, y_2)$ on a line,

$$
m = \frac{y_2 - y_1}{x_2 - x_1}.
$$

The order matters. Subtract the first coordinates from the second, on the top
and on the bottom, or the sign comes out wrong.

A line that rises from left to right has a positive gradient. A line that falls
from left to right has a negative gradient. A horizontal line has gradient $0$.
A vertical line has no gradient: dividing by a zero change in $x$ is not
allowed.

**Example 1.** Work out the gradient of the line through $(2, 5)$ and $(7, 11)$.

Subtract the coordinates of the first point from the second:

$$
m = \frac{11 - 5}{7 - 2} = \frac{6}{5}.
$$

The line rises $6$ units for every $5$ units across, so the gradient is
$\frac{6}{5}$.

**Example 2.** Work out the gradient of the line through $(-3, 4)$ and
$(5, -2)$.

$$
m = \frac{-2 - 4}{5 - (-3)} = \frac{-6}{8} = -\frac{3}{4}.
$$

The gradient is negative, so the line falls as it moves right.

## 2. The equation of a line

Two facts fix a straight line: one point on it, and its gradient. The equation
of the line through $(x_1, y_1)$ with gradient $m$ is

$$
y - y_1 = m(x - x_1).
$$

You can also write every non-vertical line in the form

$$
y = mx + c.
$$

Here $m$ is the gradient and $c$ is the **intercept** on the $y$-axis, the value
of $y$ where the line crosses it.

**Example 3.** Find the equation of the line with gradient $4$ through
$(3, -2)$.

Substitute the point and the gradient into $y - y_1 = m(x - x_1)$:

$$
y - (-2) = 4(x - 3).
$$

The subtraction of a negative gives a plus on the left. Expand the bracket:

$$
y + 2 = 4x - 12.
$$

Subtract $2$ from both sides:

$$
y = 4x - 14.
$$

The line cuts the $y$-axis at $(0, -14)$.

**Example 4.** Find the equation of the line through $(2, 5)$ and $(7, 11)$.

The gradient is $\frac{6}{5}$, from Example 1. Substitute one point, here
$(2, 5)$:

$$
y - 5 = \frac{6}{5}(x - 2).
$$

Expand the bracket:

$$
y - 5 = \frac{6}{5}x - \frac{12}{5}.
$$

Add $5$, which is $\frac{25}{5}$, to both sides:

$$
y = \frac{6}{5}x + \frac{13}{5}.
$$

So $c = \frac{13}{5}$. Check the answer by substituting the other point,
$(7, 11)$: $\frac{6}{5} \times 7 + \frac{13}{5} = \frac{42 + 13}{5} = 11$. Both
points fit, so the equation is right.

## 3. The form $ax + by + c = 0$

A line can also be written with all the terms on one side:

$$
ax + by + c = 0.
$$

This form handles vertical lines as well, and marks often ask for it with whole
numbers. Clear the fractions by multiplying every term.

Take Example 4 and multiply by $5$:

$$
5y = 6x + 13.
$$

Collect everything on the left:

$$
6x - 5y + 13 = 0.
$$

To find where a line crosses the axes, substitute $y = 0$ for the $x$-intercept
and $x = 0$ for the $y$-intercept.

**Example 5.** Find where $2x + 3y = 12$ crosses the axes.

Put $y = 0$:

$$
2x = 12, \qquad x = 6.
$$

Put $x = 0$:

$$
3y = 12, \qquad y = 4.
$$

The line crosses the $x$-axis at $(6, 0)$ and the $y$-axis at $(0, 4)$.

## 4. Straight-line models

Many real quantities are linked by a straight line. The equation then carries
meaning:

- the **gradient** is the rate of change, in units of the vertical quantity per
  unit of the horizontal quantity;
- the **intercept** is the starting value, when the horizontal quantity is $0$.

**Example 6.** A taxi charges a fixed £3 plus £2 for each kilometre. Write a
model for the cost, and say what the gradient and the intercept mean.

Let $d$ be the distance in kilometres and $C$ the cost in pounds:

$$
C = 3 + 2d.
$$

The gradient is $2$. It costs £2 for each extra kilometre. The intercept is
$3$. It is the fixed charge, paid before the taxi moves. For a journey of $8$ km,

$$
C = 3 + 2 \times 8 = 19.
$$

The fare is £19.

The units of a gradient are the units of $y$ divided by the units of $x$. Here
the gradient is $2$ pounds per kilometre.

## 5. Try it: the line explorer

**Predict first.** You will change the gradient $m$ and the intercept $c$ in
$y = mx + c$. Before you touch the controls, predict what happens to the line
when $m$ is negative, and what happens when $c$ changes but $m$ stays the same.
Write both predictions down.

:::figure ch3-line-explorer

**Test.** Move the slider for $m$ and watch the direction of the line. Then keep
$m$ fixed and move the slider for $c$. The readout names the gradient, the
intercept, and the equation in the form $ax + by + c = 0$.

**Explain.** For one setting, read the step drawn on the graph: across $1$ and
up by the gradient. Write two sentences saying why changing $c$ moves the whole
line up or down without tilting it.

> **Watch out.** Three slips are common on this page.
>
> **The sign of the gradient.** A line that falls as it moves right has a
> negative gradient. Read the direction before you calculate, and expect a minus
> sign.
>
> **The sign inside the bracket.** The form $y - y_1 = m(x - x_1)$ subtracts
> both coordinates. For the point $(2, 5)$ the left side is $y - 5$, not
> $y + 5$. A quick substitution of the point back into your answer catches this
> at once.
>
> **The two intercepts.** The $y$-intercept is $c$ in $y = mx + c$, at the point
> $(0, c)$. The $x$-intercept is where $y = 0$, and it is a different number.
> **Re-check:** after finding an equation, substitute both given points, and
> confirm that each one makes the two sides equal.

## Progress check

Return to the chapter problem. The centre line of the causeway runs through
$(12, 7)$ and $(5, 14)$.

1. Work out the gradient of the causeway.
2. Write the equation of the causeway in the form $y = mx + c$.
3. Rewrite it in the form $x + y = k$.
4. The lake's rim passes through $(11, 8)$ and $(6, 13)$. Substitute each point
   into your equation to check that both lie on the causeway.

## You should now be able to

- work out the gradient of a line from two points, with the correct sign;
- find the equation of a line from a gradient and a point, and from two points;
- move between $y = mx + c$, $y - y_1 = m(x - x_1)$ and $ax + by + c = 0$;
- find where a line crosses each axis;
- read the gradient and the intercept of a straight-line model and give their
  units;
- check a line equation by substituting a point back into it.
