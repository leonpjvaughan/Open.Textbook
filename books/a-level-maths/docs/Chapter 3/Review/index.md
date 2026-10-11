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
formula with $x + y - 19 = 0$:

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

1. Work out the gradient of the line through $(3, -1)$ and $(7, 11)$.

2. Find the equation of the line through $(4, -2)$ perpendicular to
   $3x - y = 5$.

3. Find the centre and the radius of the circle
   $x^2 + y^2 - 4x + 10y + 13 = 0$.

4. Find where the line $x + y = 3$ meets the circle $x^2 + y^2 = 5$.

5. A curve is given by $x = t^2 - 1$, $y = 2t$. Find its Cartesian equation.

6. Find the Cartesian equation of $x = 3 + 2\cos t$, $y = 1 + 2\sin t$.

7. A ball is modelled by $x = 6t$, $y = 12t - 5t^2$. Find its greatest height
   and where it lands.

8. Work out the shortest distance from $(2, 5)$ to the line
   $4x - 3y + 6 = 0$.

9. Solve the simultaneous equations $y = x + 1$ and $x^2 + y^2 = 25$.

10. Solve $2x^2 + 5x - 3 = 0$.

11. Prove that the sum of two even numbers is even.

12. The drone model assumes a constant speed and a perfectly circular lake.
    State one further assumption and say what it leaves out.

<details markdown="1">
<summary>Answers</summary>

1. **Gradient from two points.** $\dfrac{11 - (-1)}{7 - 3} = \dfrac{12}{4} = 3$.

2. **Perpendicular gradient, then a point.** The gradient of $3x - y = 5$ is
   $3$, so the perpendicular gradient is $-\frac{1}{3}$. Then
   $y + 2 = -\frac{1}{3}(x - 4)$, so $y = -\frac{1}{3}x - \frac{2}{3}$, which is
   $x + 3y + 2 = 0$.

3. **Complete the square twice.** $(x - 2)^2 - 4 + (y + 5)^2 - 25 + 13 = 0$, so
   $(x - 2)^2 + (y + 5)^2 = 16$. The centre is $(2, -5)$ and the radius is $4$.

4. **Substitute the line into the circle.** With $y = 3 - x$:
   $x^2 + (3 - x)^2 = 5$, so $2x^2 - 6x + 4 = 0$ and $x^2 - 3x + 2 = 0$. Then
   $(x - 1)(x - 2) = 0$, so $x = 1$ or $x = 2$. The points are $(1, 2)$ and
   $(2, 1)$.

5. **Eliminate the parameter from the simpler equation.** From $y = 2t$,
   $t = \frac{y}{2}$, so $x = \left(\frac{y}{2}\right)^2 - 1 = \frac{y^2}{4} - 1$.
   That is $y^2 = 4(x + 1)$.

6. **Rearrange, square and add, using $\cos^2 t + \sin^2 t = 1$.**
   $\cos t = \frac{x - 3}{2}$ and $\sin t = \frac{y - 1}{2}$, so
   $(x - 3)^2 + (y - 1)^2 = 4$.

7. **Complete the square on the height, then set $y = 0$.** $y = -5(t^2 - \frac{12}{5}t)$
   $= -5\left(t - \frac{6}{5}\right)^2 + \frac{36}{5}$. The greatest height is
   $\frac{36}{5} = 7.2$ m. The ball lands when $y = 0$: $t(12 - 5t) = 0$, so
   $t = \frac{12}{5}$ and $x = 6 \times \frac{12}{5} = \frac{72}{5} = 14.4$ m.

8. **Distance from a point to a line.** Write the line as $4x - 3y + 6 = 0$.
   Then $\dfrac{|4 \times 2 - 3 \times 5 + 6|}{\sqrt{4^2 + 3^2}} = \dfrac{|8 - 15 + 6|}{5} = \dfrac{1}{5}$.

9. **Substitute the linear equation.** $x^2 + (x + 1)^2 = 25$, so
   $2x^2 + 2x + 1 = 25$ and $x^2 + x - 12 = 0$. Then $(x + 4)(x - 3) = 0$, so
   $x = -4$ or $x = 3$, giving $(-4, -3)$ and $(3, 4)$.

10. **Factorise.** $(2x - 1)(x + 3) = 0$, so $x = \frac{1}{2}$ or $x = -3$.

11. **Deduce with a general letter.** Let the numbers be $2m$ and $2n$ for whole
    numbers $m$ and $n$. Their sum is $2m + 2n = 2(m + n)$, which has a factor
    $2$. So the sum is even.

12. **State an assumption and its limitation.** For example, the model assumes
    the drone's height is constant, which leaves out any climb or descent during
    the flight. It also assumes the drone starts exactly at the easternmost
    point, which a real flight would not.

</details>

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
