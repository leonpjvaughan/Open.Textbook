---
title: 'Chapter 3: Review'
chapter: 3
kind: review
---

# Chapter 3: Review

## The chapter problem, solved

A new path is planned past a circular lake. On the survey plan, one unit stands
for $10$ metres. The rim of the lake is

$$
x^2 + y^2 - 12x - 16y + 75 = 0,
$$

and the centre line of the causeway runs through $(12, 7)$ and $(5, 14)$.

**Step 1. Find the centre and the radius of the lake.** Complete the square
twice:

$$
(x^2 - 12x) + (y^2 - 16y) + 75 = 0,
$$

$$
(x - 6)^2 - 36 + (y - 8)^2 - 64 + 75 = 0,
$$

$$
(x - 6)^2 + (y - 8)^2 = 25.
$$

The centre is $(6, 8)$ and the radius is $5$ units, which is $50$ m. The lake is
$100$ m across.

**Step 2. Find the equation of the causeway.** The gradient is

$$
m = \frac{14 - 7}{5 - 12} = \frac{7}{-7} = -1.
$$

Use the point $(12, 7)$:

$$
y - 7 = -(x - 12), \qquad y = -x + 19, \qquad x + y = 19.
$$

**Step 3. Decide whether the causeway crosses the lake.** The shortest distance
from the centre to the line is measured along the perpendicular. Using the
distance formula, with $x + y - 19 = 0$, the distance $d$ is

$$
d = \frac{|6 + 8 - 19|}{\sqrt{1^2 + 1^2}} = \frac{5}{\sqrt{2}} = \frac{5\sqrt{2}}{2} \approx 3.54 \text{ units}.
$$

This is less than the radius $5$, so **the causeway does cross the lake**. The
plan does not stay clear of the water.

**Step 4. Find where the causeway meets the rim.** Substitute $y = 19 - x$ into
the circle:

$$
(x - 6)^2 + (11 - x)^2 = 25,
$$

$$
2x^2 - 34x + 157 = 25, \qquad x^2 - 17x + 66 = 0, \qquad (x - 6)(x - 11) = 0.
$$

So $x = 6$ or $x = 11$, giving the points $(6, 13)$ and $(11, 8)$.

**Step 5. Find the length over water.** The distance between the two points is

$$
\sqrt{(11 - 6)^2 + (8 - 13)^2} = \sqrt{25 + 25} = \sqrt{50} = 5\sqrt{2} \approx 7.07 \text{ units}.
$$

One unit stands for $10$ m, so the causeway runs about $71$ m over water. That
is the length of bridge the plan would need.

**Step 6. The drone.** The drone's position after $t$ seconds is

$$
x = 6 + 5\cos\left(\frac{\pi t}{30}\right), \qquad
y = 8 + 5\sin\left(\frac{\pi t}{30}\right).
$$

Eliminating the parameter gives $(x - 6)^2 + (y - 8)^2 = 25$, so the drone
follows the rim. It is above the causeway when its point is on the line
$x + y = 19$, which happens at $(11, 8)$ and $(6, 13)$. At $(11, 8)$,
$\cos\left(\frac{\pi t}{30}\right) = 1$, so $t = 0$ or $t = 60$ s. At $(6, 13)$,
$\sin\left(\frac{\pi t}{30}\right) = 1$, so $t = 15$ s. In one lap of $60$
seconds, the drone is above the causeway at $t = 0$, $t = 15$ and $t = 60$.

**Step 7. Refine the plan.** The causeway may be shifted to a parallel line
$x + y = k$. The perpendicular distance from $(6, 8)$ to that line is

$$
\frac{|6 + 8 - k|}{\sqrt{2}} = \frac{|14 - k|}{\sqrt{2}}.
$$

The line clears the lake when this distance is greater than $5$:

$$
|14 - k| > 5\sqrt{2}.
$$

The causeway has $k = 19$, which is larger than $14$, so it moves outward. The
smallest outward shift is to $k = 14 + 5\sqrt{2} \approx 21.07$. Any
$x + y = k$ with $k > 14 + 5\sqrt{2}$ stays clear of the water. The refinement
changes the design and not the mathematics: the same distance test decides it.

**The chapter's answer.** The causeway crosses the lake. It meets the rim at
$(6, 13)$ and $(11, 8)$, and runs about $71$ m over water. Shifting it outward to
$x + y = 14 + 5\sqrt{2}$ is the smallest change that clears the lake. The drone
is above the planned line at $t = 0$, $15$ and $60$ seconds.

## Mixed practice — choose the method first

For each question, say which method you will use and why before you calculate.
The items mix this chapter with Chapters 1 and 2, so the choice is not always
obvious.

:::problems chapter-03-review

:::answers chapter-03-review

## What you can now do

- work out a gradient and write the equation of a line in all three forms;
- read the gradient and the intercept of a straight-line model, with units;
- decide whether two lines are parallel or perpendicular;
- find the midpoint of a segment and the distance from a point to a line;
- write the equation of a circle, and find its centre and radius by completing
  the square;
- use the tangent and chord properties of a circle;
- find where a line meets a circle, and count the solutions with the
  discriminant;
- convert between parametric and Cartesian forms, and keep the range of the
  parameter;
- build a parametric model of motion, and answer "where" and "when" questions
  from it;
- state the assumptions of a model and refine one when the answer needs it.

## Your relevance reflection

Return to the prompt in the chapter opener: *a circle and a straight edge that
meet in your own life*. Write down the two shapes again. Now add three things
you could not have said before this chapter: where the circle's centre is, how
you would decide whether the straight edge crosses the circle, and what the
distance from the centre to the edge tells you. Finish with one sentence about a
time when a distance you measured turned out to matter.
