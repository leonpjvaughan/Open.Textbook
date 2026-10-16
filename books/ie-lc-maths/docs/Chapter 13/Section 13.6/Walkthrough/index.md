---
title: 13.6 Intersection of a line and a circle — Learn
chapter: 13
chapter_title: Coordinate geometry
section: '13.6'
section_title: Intersection of a line and a circle
tier: H
refs:
- '2.2'
kind: walkthrough
---

# 13.6 Intersection of a line and a circle — Learn

**Prerequisites:** the equation of a circle; the equation of a line; solving a
quadratic equation; the discriminant.

**Objectives:** find the points where a line meets a circle; use the discriminant
to decide whether a line cuts, touches or misses a circle.

A line and a circle can meet in two points, one point, or no points at all. When
the line meets the circle twice it is called a **secant**. When it meets once it
is a tangent. When it misses, there is no point in common.

## Substituting the line into the circle

The intersection points satisfy both equations at once, so solve them as
simultaneous equations. The line is the simpler equation to rearrange, so
substitute it into the circle and solve the resulting quadratic.

**Example 1.** Find where the line $x + y = 12$ meets the circle
$(x - 3)^2 + (y - 4)^2 = 25$.

Rearrange the line: $y = 12 - x$. Substitute into the circle:

$$(x - 3)^2 + (12 - x - 4)^2 = 25$$

$$(x - 3)^2 + (8 - x)^2 = 25$$

$$x^2 - 6x + 9 + 64 - 16x + x^2 = 25$$

$$2x^2 - 22x + 73 = 25 \quad\Rightarrow\quad 2x^2 - 22x + 48 = 0$$

Divide by $2$: $x^2 - 11x + 24 = 0$. Factorise:

$$(x - 3)(x - 8) = 0 \quad\Rightarrow\quad x = 3 \text{ or } x = 8$$

Find $y$ from the line each time: when $x = 3$, $y = 9$; when $x = 8$, $y = 4$.
The points are $(3, 9)$ and $(8, 4)$.

Check both in the circle: $(3 - 3)^2 + (9 - 4)^2 = 25$, and
$(8 - 3)^2 + (4 - 4)^2 = 25$.

## Using the discriminant

You often only need to know how many points there are, not what they are. After
substitution, the quadratic is $ax^2 + bx + c = 0$, and its discriminant
$b^2 - 4ac$ answers the question:

- $b^2 - 4ac > 0$: two distinct real roots, so the line **cuts** the circle twice;
- $b^2 - 4ac = 0$: one repeated root, so the line **touches** the circle and is a
  tangent;
- $b^2 - 4ac < 0$: no real roots, so the line **misses** the circle.

**Example 2.** Decide how many times the line $y = x + 1$ meets the circle
$x^2 + y^2 = 25$.

Substitute: $x^2 + (x + 1)^2 = 25$, so

$$x^2 + x^2 + 2x + 1 = 25 \quad\Rightarrow\quad 2x^2 + 2x - 24 = 0$$

The discriminant is $2^2 - 4 \times 2 \times (-24) = 4 + 192 = 196$. It is
positive, so the line cuts the circle twice.

**Example 3.** Show that $y = 2x + 5$ is a tangent to
$(x - 1)^2 + (y - 2)^2 = 5$.

Substitute: $(x - 1)^2 + (2x + 3)^2 = 5$, so

$$x^2 - 2x + 1 + 4x^2 + 12x + 9 = 5 \quad\Rightarrow\quad 5x^2 + 10x + 5 = 0$$

Divide by $5$: $x^2 + 2x + 1 = 0$. The discriminant is $2^2 - 4 \times 1 \times 1 = 0$,
so there is one repeated root and the line is a tangent.

## The length of a chord

When a line cuts a circle twice, the segment between the two points is a
**chord**. Find the two points first, then use the distance formula.

**Example 4.** The line $x + y = 12$ cuts the circle at $(3, 9)$ and $(8, 4)$.
Find the length of the chord.

$$\sqrt{(8 - 3)^2 + (4 - 9)^2} = \sqrt{25 + 25} = \sqrt{50} = 5\sqrt{2}$$

The chord is $5\sqrt{2}$ units long, about $7.07$ units.

> **Watch out.** After finding the $x$-values, substitute each one back into the
> line to get the matching $y$. Both roots must be used, and a negative root
> counts. Also check that the quadratic you solve really came from the circle; an
> error in expanding the bracket changes the roots silently.

## Progress check

Back to the chapter problem. The bypass is the line $x + y = 12$, and the
roundabout is $(x - 3)^2 + (y - 4)^2 = 25$.

1. Substitute $y = 12 - x$ into the roundabout equation.
2. Solve the quadratic and find both points of intersection.
3. Check one of the points in the roundabout equation.
4. Find the length of the chord between the two points.

## You should now be able to

- find the points where a line meets a circle by substitution;
- use the discriminant to count the points of intersection;
- decide whether a line is a secant, a tangent, or misses the circle;
- find the length of a chord.
