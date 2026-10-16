---
title: 17.5 The equation of a line — Learn
chapter: 17
chapter_title: Coordinate geometry
section: '17.5'
section_title: The equation of a line
tier: O
refs:
- GT.5
kind: walkthrough
---

# 17.5 The equation of a line — Learn

**Prerequisites:** the slope of a line from Section 17.3, solving a linear
equation from Section 12.1, and substituting into an expression from Section 10.2.

**Objectives:** write the equation of a line as $y=mx+c$; find the equation from a
slope and a point; find the equation from two points; use the form
$y-y_1=m(x-x_1)$; find where two lines meet.

By the end of this section, you can write the equation of a straight line and use
it.

## The form y = mx + c

Every straight line that is not vertical can be written as

$$y = mx + c$$

- $m$ is the **slope** of the line.
- $c$ is the **$y$-intercept**, the value of $y$ where the line crosses the
  $y$-axis.

The $y$-intercept is the output when $x=0$, because the $y$-axis is the line
$x=0$.

**Example 1.** A line has slope 2 and passes through $(0,3)$. Write its equation.

The point $(0,3)$ is on the $y$-axis, so the intercept is 3. Put $m=2$ and $c=3$.

$$y = 2x + 3$$

## Finding c from any point

When the point is not on the $y$-axis, you find $c$ by substituting the point into
$y=mx+c$.

$$c = y - mx$$

**Example 2.** A line has slope 3 and passes through $(1,5)$. Write its equation.

Put the slope and the point into $c=y-mx$.

$$c = 5 - 3 \times 1 = 2$$

So the equation is $y=3x+2$. Check it with the point: $3 \times 1 + 2 = 5$.

**Example 3.** A line has slope $-2$ and passes through $(2,1)$. Write its
equation.

Substitute the slope and the point.

$$c = 1 - (-2) \times 2 = 1 + 4 = 5$$

The equation is $y=-2x+5$. Subtracting a negative slope adds.

## The form y - y₁ = m(x - x₁)

The **point-slope form** uses one point $(x_1,y_1)$ and the slope $m$ directly.

$$y - y_1 = m(x - x_1)$$

**Example 4.** A line passes through $(2,3)$ with slope 4. Write its equation in
point-slope form, and then in the form $y=mx+c$.

The point is $(2,3)$ and the slope is 4.

$$y - 3 = 4(x - 2)$$

Expand the bracket and simplify.

$$y - 3 = 4x - 8$$

$$y = 4x - 5$$

Both forms describe the same line. The intercept is $-5$.

## From two points

When you are given two points, first find the slope, then find the intercept.

**Example 5.** A line passes through $(1,2)$ and $(3,8)$. Find its equation.

Find the slope first.

$$m = \frac{8-2}{3-1} = \frac{6}{2} = 3$$

Use the point $(1,2)$ to find the intercept.

$$c = 2 - 3 \times 1 = -1$$

The equation is $y=3x-1$. Check with the other point: $3 \times 3 - 1 = 8$.

## Where two lines meet

Two straight lines meet at one point, unless they are parallel. At that point the
two equations give the same $y$. Set them equal and solve.

**Example 6.** Find where $y=2x+1$ meets $y=x+4$.

At the crossing point the two $y$-values are equal.

$$2x + 1 = x + 4$$

Subtract $x$ from both sides.

$$x + 1 = 4$$

$$x = 3$$

Substitute back to find $y$.

$$y = 2 \times 3 + 1 = 7$$

The lines meet at $(3,7)$. Check with the other line: $3+4=7$.

## Horizontal and vertical lines

- A horizontal line has slope 0, so its equation is $y=c$. The line $y=4$ passes
  through every point with $y=4$.
- A vertical line has an undefined slope, so it cannot be written as $y=mx+c$. Its
  equation is $x=a$. The line $x=3$ passes through every point with $x=3$.

## Watch out

The $y$-coordinate of a point is not the intercept.

> **Watch out.** A line has slope 2 and passes through $(3,5)$. The common error
> is to write $y=2x+5$, using the 5 as the intercept.
>
> The intercept is the value of $y$ when $x=0$. Use $c=y-mx$:
> $c=5-2 \times 3=-1$. The equation is $y=2x-1$.
>
> **Re-check:** substitute the point into your equation. For $y=2x+5$ at $x=3$,
> $y=11$, not 5, so that equation is wrong. For $y=2x-1$, $y=5$, which is right.

## Progress check

Return to the chapter problem. The main path passes through the gate $G(1,2)$ with
slope $\tfrac{3}{4}$.

1. Find the $y$-intercept of the main path.
2. Write the equation of the main path in the form $y=mx+c$.
3. Check that the kiosk $K(9,8)$ lies on your line.

In Section 17.6 you will write the same line in general form.

## You should now be able to

- write a line as $y=mx+c$, naming the slope $m$ and the intercept $c$;
- find the intercept from a slope and any point, using $c=y-mx$;
- write a line in the form $y-y_1=m(x-x_1)$;
- find the equation of a line through two points;
- find where two lines meet by solving their equations together;
- write the equation of a horizontal line as $y=c$ and a vertical line as $x=a$.
