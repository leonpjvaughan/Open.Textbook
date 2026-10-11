---
title: 10.2 Magnitude and direction; component and magnitude/direction form — Learn
chapter: 10
chapter_title: Vectors
section: '10.2'
section_title: Magnitude and direction; component and magnitude/direction form
dfe:
- J2
kind: walkthrough
---

# 10.2 Magnitude and direction; component and magnitude/direction form — Learn

**Prerequisites:** Pythagoras' theorem; the trigonometric ratios $\sin$,
$\cos$ and $\tan$; finding an angle from a tangent; bearings from GCSE.

**By the end of this section you can:** find the magnitude of a vector in two
and three dimensions; find the direction of a two-dimensional vector as an angle
or a bearing; convert a vector from component form to magnitude/direction form
and back; write a unit vector in the direction of a given vector.

## 1. The magnitude of a vector

The **magnitude** of a vector is its length. The magnitude of $\mathbf{a}$ is
written $|\mathbf{a}|$. The magnitude is a scalar, so it is never negative.

The components of a vector are the two sides of a right-angled triangle. The
vector itself is the hypotenuse. Pythagoras' theorem gives the length.

For a two-dimensional vector,

$$
\mathbf{a} = a_1\mathbf{i} + a_2\mathbf{j},
\qquad
|\mathbf{a}| = \sqrt{a_1^2 + a_2^2}.
$$

For a three-dimensional vector, the same idea extends by one more square:

$$
\mathbf{a} = a_1\mathbf{i} + a_2\mathbf{j} + a_3\mathbf{k},
\qquad
|\mathbf{a}| = \sqrt{a_1^2 + a_2^2 + a_3^2}.
$$

**Example 1.** Find the magnitude of $\mathbf{a} = 3\mathbf{i} + 4\mathbf{j}$.

$$
|\mathbf{a}| = \sqrt{3^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25} = 5.
$$

The vector has length $5$.

**Example 2.** Find the magnitude of $\mathbf{b} = 2\mathbf{i} - 3\mathbf{j} + 6\mathbf{k}$.

Square every component, add, then take the square root:

$$
|\mathbf{b}| = \sqrt{2^2 + (-3)^2 + 6^2} = \sqrt{4 + 9 + 36} = \sqrt{49} = 7.
$$

The sign of a component disappears when it is squared. A vector pointing down
or backwards is not "negative" in length.

## 2. The direction of a two-dimensional vector

The **direction** of a vector is the angle it makes with a fixed line. Two
conventions are common.

- The angle measured anticlockwise from the positive $x$-axis.
- A **bearing**, measured clockwise from north.

At A level you must read which convention a question uses. If the question says
"from the positive $x$-axis", use the first. If it gives a direction such as
"on a bearing of $120$°", use the second.

For a vector $a_1\mathbf{i} + a_2\mathbf{j}$ with $a_1 \neq 0$, the angle
$\theta$ from the positive $x$-axis satisfies

$$
\tan\theta = \frac{a_2}{a_1}.
$$

The inverse tangent gives only one angle. Use the signs of $a_1$ and $a_2$ to
place the vector in the correct quadrant, then adjust the angle.

**Example 3.** Find the direction of $\mathbf{a} = 3\mathbf{i} + 4\mathbf{j}$,
as an angle from the positive $x$-axis.

Both components are positive, so the vector is in the first quadrant. Then

$$
\theta = \tan^{-1}\left(\frac{4}{3}\right) = 53.1^\circ \text{ to } 1 \text{ d.p.}
$$

**Example 4.** Find the direction of $\mathbf{c} = -3\mathbf{i} + 4\mathbf{j}$
from the positive $x$-axis.

The $x$-component is negative and the $y$-component is positive, so the vector
is in the second quadrant. The inverse tangent gives the angle to the negative
$x$-axis:

$$
\tan^{-1}\left(\frac{4}{3}\right) = 53.1^\circ.
$$

Subtract this from $180^\circ$:

$$
\theta = 180^\circ - 53.1^\circ = 126.9^\circ.
$$

The angle is $126.9^\circ$ anticlockwise from the positive $x$-axis.

## 3. From magnitude and direction to components

If a vector has magnitude $r$ and makes an angle $\theta$ with the positive
$x$-axis, its components are

$$
a_1 = r\cos\theta,
\qquad
a_2 = r\sin\theta.
$$

**Example 5.** A force of $10$ N acts at $30^\circ$ above the horizontal. Write
the force in component form.

$$
F_x = 10\cos 30^\circ = 10 \times \frac{\sqrt{3}}{2} = 5\sqrt{3},
\qquad
F_y = 10\sin 30^\circ = 10 \times \frac{1}{2} = 5.
$$

The force is $5\sqrt{3}\mathbf{i} + 5\mathbf{j}$ newtons, or about
$8.66\mathbf{i} + 5\mathbf{j}$ N.

For a bearing, the angle is measured clockwise from north. The east component
uses sine and the north component uses cosine:

$$
a_{\text{east}} = r\sin\theta,
\qquad
a_{\text{north}} = r\cos\theta.
$$

**Example 6.** A ship sails $20$ km on a bearing of $120^\circ$. Find its
displacement from the start, with east as $\mathbf{i}$ and north as $\mathbf{j}$.

$$
\text{east} = 20\sin 120^\circ = 20 \times \frac{\sqrt{3}}{2} = 10\sqrt{3},
\qquad
\text{north} = 20\cos 120^\circ = 20 \times \left(-\frac{1}{2}\right) = -10.
$$

The displacement is $10\sqrt{3}\mathbf{i} - 10\mathbf{j}$ km. The negative north
component means the ship finishes $10$ km south of its starting line.

## 4. Unit vectors

A **unit vector** has magnitude $1$. It records a direction only. The unit
vector in the direction of $\mathbf{a}$ is

$$
\hat{\mathbf{a}} = \frac{\mathbf{a}}{|\mathbf{a}|}.
$$

**Example 7.** Find the unit vector in the direction of $\mathbf{a} = 3\mathbf{i} + 4\mathbf{j}$.

From Example 1, $|\mathbf{a}| = 5$, so

$$
\hat{\mathbf{a}} = \frac{1}{5}(3\mathbf{i} + 4\mathbf{j}) = \frac{3}{5}\mathbf{i} + \frac{4}{5}\mathbf{j}.
$$

Check the length: $\sqrt{(3/5)^2 + (4/5)^2} = \sqrt{9/25 + 16/25} = 1$. The unit
vector has magnitude $1$, as it must.

> **Watch out.** Three slips are common on this page.
>
> **Adding magnitudes.** The magnitude of a sum is not the sum of the
> magnitudes. Two vectors of length $3$ and $4$ can have a sum of any length from
> $1$ to $7$, depending on their directions. Find the sum first, then its
> magnitude.
>
> **The blind inverse tangent.** $\tan^{-1}(4/3)$ is always $53.1^\circ$, but the
> vector $(-3, 4)$ points into the second quadrant, so its direction is
> $126.9^\circ$. Always place the vector with the signs of its components before
> you quote an angle.
>
> **Mixing the two conventions.** An angle of $30^\circ$ from the $x$-axis and a
> bearing of $30^\circ$ point in different directions. A bearing of $30^\circ$
> is $60^\circ$ from the positive $x$-axis. **Re-check:** sketch the vector in
> the correct quadrant, then ask whether the angle you found matches the sketch.

## You should now be able to

- find the magnitude of a vector in two or three dimensions;
- find the direction of a two-dimensional vector as an angle or a bearing;
- keep the correct quadrant when you use an inverse tangent;
- convert from magnitude and direction to components, including with bearings;
- write and check a unit vector.
