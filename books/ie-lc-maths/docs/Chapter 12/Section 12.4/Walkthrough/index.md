---
title: 12.4 The unit circle and trigonometric functions of any angle — Learn
chapter: 12
chapter_title: Trigonometry
section: '12.4'
section_title: The unit circle and trigonometric functions of any angle
tier: O
refs:
- '2.3'
kind: walkthrough
---

# 12.4 The unit circle and trigonometric functions of any angle — Learn

**Prerequisites:** Sections 12.1 to 12.3 — the ratios, Pythagoras' theorem and radians.

**Objectives:** define $\sin\theta$ and $\cos\theta$ for any angle; find the sign of each
in every quadrant; use a reference angle and the exact values.

By the end of this section you can find the sine, cosine and tangent of any angle,
including angles larger than $90^\circ$ and negative angles.

## The unit circle

The **unit circle** is a circle of radius $1$ with its centre at the origin.

Draw a radius from the origin. Measure the angle $\theta$ anticlockwise from the
positive $x$-axis, and let the end of the radius be the point $P$.

> **The definition.** The point $P$ has coordinates
>
>
> $$P = (\cos\theta,\ \sin\theta)$$
>
>
> So $\cos\theta$ is the $x$-coordinate and $\sin\theta$ is the $y$-coordinate.

This definition agrees with the right-triangle one for angles between $0^\circ$ and
$90^\circ$. It also works for every other angle, which the triangle definition cannot do.

:::figure unit-circle

**Predict, then test.** Before you move the angle, write down the signs you expect
$\sin\theta$ and $\cos\theta$ to have in each of the four quadrants. Move the angle into
each quadrant in turn and check. Then find an angle where both are negative, and one
where $\sin\theta$ is negative and $\cos\theta$ is positive. Write down the rule you have
found in one sentence, and say why the circle forces it.

## The signs in each quadrant

The point $P$ moves round the circle as the angle grows. Its coordinates change sign
when it crosses an axis.

| Angle | Quadrant | $\cos\theta$ | $\sin\theta$ |
|---|---|---|---|
| $0^\circ$ to $90^\circ$ | first | positive | positive |
| $90^\circ$ to $180^\circ$ | second | negative | positive |
| $180^\circ$ to $270^\circ$ | third | negative | negative |
| $270^\circ$ to $360^\circ$ | fourth | positive | negative |

**Example 1.** An angle of $150^\circ$ lies in the second quadrant, so $\cos 150^\circ$
is negative and $\sin 150^\circ$ is positive. The reference angle is
$180^\circ - 150^\circ = 30^\circ$, so $\sin 150^\circ = \sin 30^\circ = \dfrac{1}{2}$ and
$\cos 150^\circ = -\cos 30^\circ = -\dfrac{\sqrt{3}}{2}$.

## The reference angle

The **reference angle** is the acute angle between the radius and the $x$-axis. The sine
and cosine of the angle have the same size as those of its reference angle; only the
signs change.

- second quadrant: reference angle is $180^\circ - \theta$;
- third quadrant: reference angle is $\theta - 180^\circ$;
- fourth quadrant: reference angle is $360^\circ - \theta$.

**Example 2.** Find $\sin 210^\circ$ and $\cos 210^\circ$.

$210^\circ$ lies in the third quadrant, where both are negative. The reference angle is
$210^\circ - 180^\circ = 30^\circ$.

$$\sin 210^\circ = -\sin 30^\circ = -\frac{1}{2} \qquad \cos 210^\circ = -\cos 30^\circ = -\frac{\sqrt{3}}{2}$$

**Example 3.** Find $\cos 330^\circ$ and $\sin 330^\circ$.

$330^\circ$ lies in the fourth quadrant, where cosine is positive and sine is negative.
The reference angle is $360^\circ - 330^\circ = 30^\circ$.

$$\cos 330^\circ = \cos 30^\circ = \frac{\sqrt{3}}{2} \qquad \sin 330^\circ = -\sin 30^\circ = -\frac{1}{2}$$

## The tangent

The tangent is the ratio of the two coordinates.

$$\tan\theta = \frac{\sin\theta}{\cos\theta}$$

It is positive in the first and third quadrants, where the two coordinates have the same
sign, and negative in the second and fourth. It is undefined when $\cos\theta = 0$, which
happens at $90^\circ$ and $270^\circ$.

**Example 4.** Find $\tan 120^\circ$.

$120^\circ$ is in the second quadrant, so the tangent is negative, and its reference angle
is $60^\circ$.

$$\tan 120^\circ = -\tan 60^\circ = -\sqrt{3}$$

## Exact values

These values are worth knowing exactly. They come from two triangles: the half-square,
which gives $45^\circ$, and the half-equilateral triangle, which gives $30^\circ$ and
$60^\circ$.

| $\theta$ | $0^\circ$ | $30^\circ$ | $45^\circ$ | $60^\circ$ | $90^\circ$ |
|---|---|---|---|---|---|
| $\sin\theta$ | $0$ | $\dfrac{1}{2}$ | $\dfrac{\sqrt{2}}{2}$ | $\dfrac{\sqrt{3}}{2}$ | $1$ |
| $\cos\theta$ | $1$ | $\dfrac{\sqrt{3}}{2}$ | $\dfrac{\sqrt{2}}{2}$ | $\dfrac{1}{2}$ | $0$ |
| $\tan\theta$ | $0$ | $\dfrac{\sqrt{3}}{3}$ | $1$ | $\sqrt{3}$ | undefined |

> **Watch out.** $\cos\theta$ is the **$x$**-coordinate and $\sin\theta$ is the **$y$**
> coordinate. Swapping them gives $\sin 150^\circ = -\dfrac{\sqrt3}{2}$, which is wrong,
> and the error is common when the angle is past $90^\circ$.
>
> **Re-check:** say the definition out loud — cosine along, sine up — and read the signs
> off the quadrant table.

## Progress check

Back to the chapter problem. The bearing of the yacht from the lighthouse is $330^\circ$.
A bearing is measured clockwise from north. In standard position, measured anticlockwise
from the positive $x$-axis, that is $120^\circ$, because the direction is $30^\circ$ west
of north and north is $90^\circ$.

Write the bearing as a standard angle, then find $\sin 120^\circ$, $\cos 120^\circ$ and
$\tan 120^\circ$ exactly.

The cosine comes out negative. That is the fact the unit circle adds: an angle larger
than $90^\circ$ can have a negative cosine, and it means the point lies to the left of the
origin.

## You should now be able to

- define $\sin\theta$ and $\cos\theta$ as the coordinates of a point on the unit circle;
- say which quadrant an angle lies in, and the sign of each ratio there;
- use a reference angle to find an exact value;
- find a tangent, and say where it is undefined;
- write a bearing as an angle in standard position.
