---
title: 13.4 The equation of a circle — Learn
chapter: 13
chapter_title: Coordinate geometry
section: '13.4'
section_title: The equation of a circle
tier: O
refs:
- '2.2'
kind: walkthrough
---

# 13.4 The equation of a circle — Learn

**Prerequisites:** the distance formula; expanding a squared bracket.

**Objectives:** write the equation of a circle from its centre and radius; find
the centre and the radius from an expanded equation; decide whether a point is
inside, on, or outside a circle.

A circle is a set of points, all the same distance from one fixed point. That
description is a rule, and the distance formula turns the rule into an equation.

## The centre-radius form

Let the centre be $C(a, b)$ and the radius be $r$. A point $(x, y)$ is on the
circle when its distance from $C$ is exactly $r$:

$$\sqrt{(x - a)^2 + (y - b)^2} = r$$

Square both sides, and the square root disappears:

$$(x - a)^2 + (y - b)^2 = r^2$$

This is the **centre-radius form**. The right-hand side is $r^2$, not $r$.

**Example 1.** Write the equation of the circle with centre $(3, 4)$ and radius
$5$.

$$(x - 3)^2 + (y - 4)^2 = 25$$

**Example 2.** Expand the equation in Example 1.

$$x^2 - 6x + 9 + y^2 - 8y + 16 = 25 \quad\Rightarrow\quad x^2 + y^2 - 6x - 8y = 0$$

The constant term is zero here because the circle passes through the origin:
$(0 - 3)^2 + (0 - 4)^2 = 25$.

## The expanded form

Expanding the centre-radius form always gives an equation of the shape

$$x^2 + y^2 + 2gx + 2fy + c = 0$$

The centre is $(-g, -f)$ and the radius satisfies $r^2 = g^2 + f^2 - c$.

**Example 3.** Find the centre and the radius of
$x^2 + y^2 - 10x + 4y - 7 = 0$.

Here $2g = -10$, so $g = -5$, and $2f = 4$, so $f = 2$. The centre is
$(-g, -f) = (5, -2)$. Then

$$r^2 = (-5)^2 + 2^2 - (-7) = 25 + 4 + 7 = 36 \quad\Rightarrow\quad r = 6$$

The centre is $(5, -2)$ and the radius is $6$.

## Points on, inside and outside a circle

Substitute the point into $(x - a)^2 + (y - b)^2$ and compare the result with
$r^2$.

- less than $r^2$: the point is **inside** the circle;
- equal to $r^2$: the point is **on** the circle;
- greater than $r^2$: the point is **outside** the circle.

**Example 4.** Decide where $(5, 4)$ lies relative to
$(x - 1)^2 + (y - 2)^2 = 25$.

$$(5 - 1)^2 + (4 - 2)^2 = 16 + 4 = 20$$

Since $20 < 25$, the point is inside the circle.

> **Watch out.** The signs inside the brackets are the opposite of the centre.
> The circle $(x - 3)^2 + (y - 4)^2 = 25$ has centre $(3, 4)$, but
> $(x + 2)^2 + (y - 1)^2 = 25$ has centre $(-2, 1)$, not $(2, 1)$. Read the
> centre as the value that makes each bracket zero. Also, $r^2 = 25$ means the
> radius is $5$, not $25$.

## A guided investigation: the centre and the radius

The figure draws a circle from its centre and radius. Move the centre and change
the radius, and watch the equation change with them.

**Predict first.** Before you touch a control, set the radius to a small value.
What happens to the circle as the radius approaches zero? What would the
equation become?

:::figure circle-centre-radius

**Test.** Move the centre and change the radius. Check your prediction.

**Explain.** Write two or three sentences. Say which part of the equation fixes
the centre and which part fixes the size, and say why the right-hand side is
$r^2$ rather than $r$.

## Progress check

Back to the chapter problem. The roundabout has its centre at the midpoint of
$A(-1, 1)$ and $B(7, 7)$, and both junctions lie on its edge.

1. Write down the centre of the roundabout.
2. Find the radius, using the distance from the centre to $B$.
3. Write the equation of the roundabout in centre-radius form.
4. Expand it to the form $x^2 + y^2 + 2gx + 2fy + c = 0$.

Keep the equation. You will use it in Sections 13.5 and 13.6.

## You should now be able to

- write the equation of a circle from its centre and radius;
- find the centre and the radius from an expanded equation;
- expand a circle equation, and read the centre and radius back;
- decide whether a point is inside, on, or outside a circle.
