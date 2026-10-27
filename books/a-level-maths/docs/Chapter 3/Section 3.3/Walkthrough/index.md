---
title: 3.3 The equation of a circle and its properties — Learn
chapter: 3
chapter_title: Coordinate geometry
section: '3.3'
section_title: The equation of a circle and its properties
refs:
- C2
kind: walkthrough
---

# 3.3 The equation of a circle and its properties — Learn

**Prerequisites:** completing the square from 2.3; the distance between two
points; perpendicular gradients from 3.2; solving simultaneous equations from
2.5.

**By the end of this section you can:** write the equation of a circle from its
centre and radius; find the centre and the radius of a circle by completing the
square; decide whether a point lies inside, on, or outside a circle; use the
tangent and chord properties of a circle; find where a line meets a circle.

## 1. The equation of a circle

A **circle** is the set of points at a fixed distance from a fixed point. The
fixed point is the **centre** and the fixed distance is the **radius**.

Let the centre be $(a, b)$ and the radius be $r$. A point $(x, y)$ is on the
circle when its distance from the centre is $r$. That distance is the hypotenuse
of a right-angled triangle with sides $x - a$ and $y - b$, so by Pythagoras

$$
(x - a)^2 + (y - b)^2 = r^2.
$$

This is the standard equation of a circle.

**Example 1.** Write the equation of the circle with centre $(3, -2)$ and
radius $4$.

The centre gives $a = 3$ and $b = -2$, and the radius gives $r = 4$:

$$
(x - 3)^2 + (y - (-2))^2 = 4^2, \qquad (x - 3)^2 + (y + 2)^2 = 16.
$$

Expanding gives the equivalent form

$$
x^2 + y^2 - 6x + 4y - 3 = 0.
$$

## 2. Finding the centre and the radius

Many questions give the circle in an expanded form:

$$
x^2 + y^2 + Dx + Ey + F = 0,
$$

where $D$, $E$ and $F$ are constants.

To read the centre and the radius, **complete the square** twice, once in $x$ and
once in $y$.

**Example 2.** Find the centre and the radius of

$$
x^2 + y^2 - 12x - 16y + 75 = 0.
$$

Collect the $x$ terms and the $y$ terms, and complete the square in each:

$$
(x^2 - 12x) + (y^2 - 16y) + 75 = 0,
$$

$$
(x - 6)^2 - 36 + (y - 8)^2 - 64 + 75 = 0.
$$

Add the numbers:

$$
(x - 6)^2 + (y - 8)^2 - 25 = 0,
$$

$$
(x - 6)^2 + (y - 8)^2 = 25.
$$

Compare with $(x - a)^2 + (y - b)^2 = r^2$. The centre is $(6, 8)$ and
$r^2 = 25$, so the radius is $5$. This is the rim of the lake in the chapter
problem.

**Example 3.** Find the centre and the radius of
$x^2 + y^2 + 4x - 6y - 12 = 0$.

$$
(x^2 + 4x) + (y^2 - 6y) - 12 = 0,
$$

$$
(x + 2)^2 - 4 + (y - 3)^2 - 9 - 12 = 0,
$$

$$
(x + 2)^2 + (y - 3)^2 = 25.
$$

The centre is $(-2, 3)$ and the radius is $5$. Notice the signs: $(x + 2)^2$
means $a = -2$, and $(y - 3)^2$ means $b = 3$.

## 3. Inside, on, or outside

For a circle with centre $(a, b)$ and radius $r$, and a point $P$:

- if $(x - a)^2 + (y - b)^2 < r^2$, then $P$ is inside the circle;
- if $(x - a)^2 + (y - b)^2 = r^2$, then $P$ is on the circle;
- if $(x - a)^2 + (y - b)^2 > r^2$, then $P$ is outside the circle.

**Example 4.** For the circle $(x - 1)^2 + (y - 2)^2 = 25$, decide whether
$(5, 4)$ is inside, on, or outside.

$$
(5 - 1)^2 + (4 - 2)^2 = 16 + 4 = 20.
$$

This is less than $25$, so $(5, 4)$ is inside the circle. The distance from the
centre is $\sqrt{20} \approx 4.47$, which is less than the radius $5$.

## 4. Three properties of a circle

Three facts about circles carry most of the marks. Each one is about a right
angle.

1. **The radius meets the tangent at a right angle.** A **tangent** touches the
   circle at exactly one point. The radius drawn to that point is perpendicular
   to the tangent.
2. **The perpendicular from the centre to a chord bisects the chord.** A
   **chord** is a line segment with both ends on the circle. Drop a
   perpendicular from the centre to the chord, and it cuts the chord into two
   equal halves.
3. **The angle in a semicircle is a right angle.** If $AB$ is a diameter and $C$
   is any other point on the circle, then angle $ACB$ is $90^\circ$.

**Example 5.** Find the tangent to the circle $x^2 + y^2 = 25$ at the point
$(3, 4)$.

The centre is $(0, 0)$. The gradient of the radius from $(0, 0)$ to $(3, 4)$,
written $m_r$, is

$$
m_r = \frac{4 - 0}{3 - 0} = \frac{4}{3}.
$$

The tangent is perpendicular to the radius, so its gradient, written $m_t$, is the
negative reciprocal:

$$
m_t = -\frac{3}{4}.
$$

Use the point $(3, 4)$:

$$
y - 4 = -\frac{3}{4}(x - 3).
$$

Multiply by $4$ and simplify:

$$
4y - 16 = -3x + 9, \qquad 3x + 4y = 25.
$$

Check: $3 \times 3 + 4 \times 4 = 25$, so the point is on the tangent. The
distance from the centre to the line is $\frac{25}{\sqrt{3^2 + 4^2}} = 5$, which
is the radius, so the line is a tangent.

**Example 6.** The chord of the circle $(x - 6)^2 + (y - 8)^2 = 25$ lies on the
line $x + y = 19$. Show that the perpendicular from the centre bisects the
chord.

The circle meets the line at $(11, 8)$ and $(6, 13)$, found in Example 7 below. The
midpoint of the chord is

$$
\left(\frac{11 + 6}{2}, \frac{8 + 13}{2}\right) = \left(\frac{17}{2}, \frac{21}{2}\right).
$$

The chord has gradient $-1$, so the perpendicular from the centre has gradient
$1$. The line through $(6, 8)$ with gradient $1$ is $y = x + 2$. Substitute the
midpoint: $\frac{21}{2} = \frac{17}{2} + 2$, which is true. So the perpendicular
from the centre passes through the midpoint, and it bisects the chord.

## 5. Where a line meets a circle

A line and a circle can meet twice, once, or not at all. To find the points,
substitute the equation of the line into the equation of the circle. The result
is a quadratic, and the discriminant counts the solutions.

| The quadratic | The line and the circle |
|---|---|
| two distinct real roots | two points of intersection, a **secant** |
| one repeated root | exactly one point, a **tangent** |
| no real roots | no points of intersection |

**Example 7.** Find where the line $x + y = 19$ meets the circle
$(x - 6)^2 + (y - 8)^2 = 25$.

Rearrange the line: $y = 19 - x$. Substitute into the circle:

$$
(x - 6)^2 + (19 - x - 8)^2 = 25,
$$

$$
(x - 6)^2 + (11 - x)^2 = 25.
$$

Expand both squares:

$$
x^2 - 12x + 36 + 121 - 22x + x^2 = 25.
$$

Collect the terms:

$$
2x^2 - 34x + 157 = 25, \qquad x^2 - 17x + 66 = 0.
$$

Factorise:

$$
(x - 6)(x - 11) = 0, \qquad x = 6 \quad \text{or} \quad x = 11.
$$

Substitute back into $y = 19 - x$: when $x = 6$, $y = 13$; when $x = 11$,
$y = 8$. The two points are $(6, 13)$ and $(11, 8)$.

## 6. Try it: the circle explorer

**Predict first.** You will change the centre and the radius of a circle, and
watch a chord and its perpendicular from the centre. Predict what happens to the
two halves of the chord when you move the centre but keep the circle the same
size. Write your prediction down.

:::figure ch3-circle-explorer

**Test.** Move the sliders for the centre's coordinates $a$ and $b$ and for the
radius $r$. The readout gives the equation of the circle and the distance from
the centre to the chord's midpoint. Watch the two halves of the chord as you
move the controls.

**Explain.** The readout shows the two halves of the chord and the perpendicular
distance from the centre. Write two sentences explaining why the perpendicular
from the centre always cuts the chord into two equal parts.

> **Watch out.** Three traps appear with circles.
>
> **Forgetting to subtract.** Completing $x^2 - 12x$ gives $(x - 6)^2 - 36$, not
> $(x - 6)^2$. The $36$ is the price of making a perfect square, and it must be
> taken off again or the equation changes.
>
> **The radius and the square of the radius.** The equation gives $r^2$ on the
> right. For $(x - 6)^2 + (y - 8)^2 = 25$ the radius is $5$, not $25$. Take the
> square root at the end.
>
> **The sign of the centre.** The bracket is $(x - a)$, so a circle written
> $(x + 2)^2 + (y - 3)^2 = 25$ has centre $(-2, 3)$. The coordinate is the
> opposite of the number inside the bracket.
>
> **Re-check:** find the distance from your centre to one point you know is on
> the circle, and confirm that it equals the radius.

## Progress check

Return to the chapter problem. The rim of the lake is
$x^2 + y^2 - 12x - 16y + 75 = 0$, and the centre line of the causeway is
$x + y = 19$.

1. Complete the square to find the centre and the radius of the lake.
2. Use the distance from the centre to the causeway, from Section 3.2, and the
   radius, to decide whether the causeway crosses the water.
3. Find the two points where the causeway meets the rim.
4. Work out the length of the causeway that lies over water.

## You should now be able to

- write the equation of a circle from its centre and radius;
- find the centre and the radius by completing the square twice;
- decide whether a point is inside, on, or outside a circle;
- find the tangent at a point using the negative reciprocal of the radius;
- use the perpendicular from the centre to a chord;
- use the right angle in a semicircle;
- find where a line meets a circle, and use the discriminant to count the
  points.
