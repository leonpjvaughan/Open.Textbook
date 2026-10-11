---
title: 10.5 Vectors in pure mathematics and in context — Learn
chapter: 10
chapter_title: Vectors
section: '10.5'
section_title: Vectors in pure mathematics and in context
dfe:
- J5
- OT2
kind: walkthrough
---

# 10.5 Vectors in pure mathematics and in context — Learn

**Prerequisites:** all of Sections 10.1 to 10.4; rearranging a formula;
substituting into an expression; solving a linear equation.

**By the end of this section you can:** use vectors to prove that points are
collinear; prove a quadrilateral is a parallelogram; find a point that divides a
line in a given ratio; find a resultant force and an unknown force in
equilibrium; model motion with a position vector and a velocity.

## 1. Collinearity and equal vectors

Geometry problems are often solved by showing that two vectors are equal, or
that one is a multiple of the other.

- If $\vec{AB} = k\vec{BC}$ and the two vectors share the point $B$, then $A$,
  $B$ and $C$ are **collinear**.
- If the opposite sides of a quadrilateral are equal, such as
  $\vec{AB} = \vec{DC}$, then the quadrilateral is a **parallelogram**.

Parallel on its own is not enough for collinearity. The two vectors must also
run through a shared point. Without that point, the lines could be parallel but
separate.

**Example 1.** Show that $A(1, 2)$, $B(3, 4)$ and $C(5, 6)$ are collinear.

$$
\vec{AB} = (3 - 1)\mathbf{i} + (4 - 2)\mathbf{j} = 2\mathbf{i} + 2\mathbf{j},
$$

$$
\vec{BC} = (5 - 3)\mathbf{i} + (6 - 4)\mathbf{j} = 2\mathbf{i} + 2\mathbf{j}.
$$

So $\vec{AB} = \vec{BC}$, with $k = 1$. The two vectors share the point $B$, so
the three points lie on one straight line. The same step repeats twice.

**Example 2.** The quadrilateral has vertices $A(1, 1)$, $B(4, 2)$, $C(5, 5)$
and $D(2, 4)$. Show that it is a parallelogram.

$$
\vec{AB} = (4 - 1)\mathbf{i} + (2 - 1)\mathbf{j} = 3\mathbf{i} + \mathbf{j},
$$

$$
\vec{DC} = (5 - 2)\mathbf{i} + (5 - 4)\mathbf{j} = 3\mathbf{i} + \mathbf{j}.
$$

Now $\vec{AB} = \vec{DC}$, so the sides $AB$ and $DC$ are equal and parallel. The
quadrilateral is a parallelogram.

## 2. Dividing a line in a ratio

A point $P$ that divides $AB$ in the ratio $AP : PB = m : n$ has position vector

$$
\vec{OP} = \frac{n\mathbf{a} + m\mathbf{b}}{m + n}.
$$

The weight on $\mathbf{a}$ is the part of the ratio nearer $B$. Check the
formula on a simple case: if $m = n$, then $P$ is the midpoint,
$\frac{\mathbf{a} + \mathbf{b}}{2}$.

**Example 3.** The points are $A(1, 2)$ and $B(4, 8)$. Find the point $P$ on
$AB$ with $AP : PB = 1 : 2$.

Here $m = 1$ and $n = 2$:

$$
\vec{OP} = \frac{2\mathbf{a} + \mathbf{b}}{3} =
\frac{1}{3}\left(2(1\mathbf{i} + 2\mathbf{j}) + (4\mathbf{i} + 8\mathbf{j})\right) =
\frac{1}{3}\left(6\mathbf{i} + 12\mathbf{j}\right) =
2\mathbf{i} + 4\mathbf{j}.
$$

So $P$ is $(2, 4)$. Check: $\vec{AP} = \mathbf{i} + 2\mathbf{j}$ and
$\vec{PB} = 2\mathbf{i} + 4\mathbf{j} = 2\vec{AP}$, so $AP : PB = 1 : 2$.

## 3. Forces and equilibrium

A force is a vector, so forces add like vectors. The single force with the same
effect as several forces is the **resultant**. A point with no resultant force
is in **equilibrium**.

Three forces balance when their sum is the zero vector:

$$
\mathbf{F}_1 + \mathbf{F}_2 + \mathbf{F}_3 = \mathbf{0}.
$$

**Example 4.** A point is acted on by $\mathbf{F}_1 = 6\mathbf{i} - 2\mathbf{j}$ N
and $\mathbf{F}_2 = -\mathbf{i} + 5\mathbf{j}$ N. A third force $\mathbf{F}_3$
keeps the point still. Find $\mathbf{F}_3$, its magnitude and its direction.

$$
\mathbf{F}_3 = -(\mathbf{F}_1 + \mathbf{F}_2) = -(5\mathbf{i} + 3\mathbf{j}) = -5\mathbf{i} - 3\mathbf{j} \text{ N}.
$$

$$
|\mathbf{F}_3| = \sqrt{(-5)^2 + (-3)^2} = \sqrt{25 + 9} = \sqrt{34} \approx 5.83 \text{ N}.
$$

The force is in the third quadrant, so its direction from the positive $x$-axis
is $180^\circ + \tan^{-1}\left(\frac{3}{5}\right) = 180^\circ + 31.0^\circ = 211.0^\circ$.

## 4. Motion with constant velocity

A particle that starts at position vector $\mathbf{r}_0$ and moves with constant
velocity $\mathbf{v}$ has position vector

$$
\mathbf{r} = \mathbf{r}_0 + \mathbf{v}t
$$

after time $t$. The velocity $\mathbf{v}$ carries the direction of travel. The
**speed** is $|\mathbf{v}|$, which is a scalar.

The distance travelled is speed multiplied by time. The distance from the start
is speed multiplied by time only while the velocity keeps one direction, because
then the path is straight.

**Example 5.** A boat starts at $2\mathbf{i} + \mathbf{j}$ m and moves with
velocity $3\mathbf{i} - \mathbf{j}$ m/s. Find its position after $4$ s, and its
distance from the origin then.

$$
\mathbf{r} = (2\mathbf{i} + \mathbf{j}) + 4(3\mathbf{i} - \mathbf{j}) =
(2 + 12)\mathbf{i} + (1 - 4)\mathbf{j} =
14\mathbf{i} - 3\mathbf{j}.
$$

The position after $4$ s is $(14, -3)$ m. The distance from the origin is

$$
|\mathbf{r}| = \sqrt{14^2 + (-3)^2} = \sqrt{196 + 9} = \sqrt{205} \approx 14.3 \text{ m}.
$$

## 5. Solving a problem given in words

A problem in context rarely hands you the vectors. The work is to read the
situation, choose a starting point and axes, and write the quantities as
vectors. The steps are the same each time:

1. Draw a sketch and choose the origin and the directions of $\mathbf{i}$,
   $\mathbf{j}$ and, if needed, $\mathbf{k}$.
2. Write each known quantity as a vector, with its units.
3. Decide which operation the question needs: add, subtract, scale, find a
   magnitude or find a direction.
4. Carry out the calculation.
5. Interpret the answer in the situation, and check that its size is sensible.

**Example 6.** A plane flies at $200$ km/h due east. A wind blows at $50$ km/h
from the north, so the wind pushes the plane due south. Find the plane's
resultant velocity over the ground, its speed and its direction.

Take east as $\mathbf{i}$ and north as $\mathbf{j}$. The plane's velocity is
$200\mathbf{i}$ and the wind adds $-50\mathbf{j}$:

$$
\mathbf{v} = 200\mathbf{i} - 50\mathbf{j}.
$$

$$
|\mathbf{v}| = \sqrt{200^2 + 50^2} = \sqrt{40000 + 2500} = \sqrt{42500} \approx 206.2 \text{ km/h}.
$$

The direction is $\tan^{-1}\left(\frac{50}{200}\right) = 14.0^\circ$ south of
east. The wind has made the plane slightly faster and pushed it off its course.

> **Watch out.** Three slips are common on this page.
>
> **Parallel without a shared point.** Two equal vectors in different places do
> not make the points collinear. State the shared point as part of the proof.
>
> **The weights swapped in the ratio.** For $AP : PB = m : n$, the vector
> $\mathbf{a}$ is multiplied by $n$, not by $m$. Test the formula with
> $m = n = 1$: it must give the midpoint.
>
> **A speed used as a vector.** Speed has no direction. To add a velocity to a
> current or a wind, first write it as a column using an angle or a bearing.
> **Re-check:** after any motion calculation, ask whether the answer's size and
> direction match your sketch.

## Progress check

Return to the chapter problem. The wind pushes the drone with a force
$\mathbf{F} = -3\mathbf{i} - 4\mathbf{j}$ N.

1. The drone hovers, so the forces on it balance. Find the thrust needed to
   balance the wind.
2. Find the magnitude of the thrust.
3. Find the direction of the thrust from the positive $x$-axis.
4. The drone's position is $\mathbf{r}_0 = 10\mathbf{i} + 3\mathbf{j}$ km and it
   then flies with velocity $6\mathbf{i} + 8\mathbf{j}$ km/h. Find its position
   after $0.5$ hours.

## You should now be able to

- prove three points are collinear and a quadrilateral is a parallelogram;
- find the point that divides a segment in a given ratio;
- find a resultant force and an unknown force in equilibrium;
- model motion with a starting position and a constant velocity;
- turn a problem in words into vectors, solve it and interpret the answer.
