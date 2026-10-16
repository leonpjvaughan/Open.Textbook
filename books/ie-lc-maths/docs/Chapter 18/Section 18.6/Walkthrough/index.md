---
title: 18.6 Geometric applications of vectors — Learn
chapter: 18
chapter_title: Vectors
section: '18.6'
section_title: Geometric applications of vectors
tier: H
refs:
- '2.2'
kind: walkthrough
---

# 18.6 Geometric applications of vectors — Learn

**Prerequisites:** Sections 18.1 to 18.5 — all the vector operations and their properties.

**Objectives:** use vectors to prove facts about shapes; find a midpoint; prove a
parallelogram; prove collinearity; prove a right angle; find the area of a right triangle.

By the end of this section you can turn a geometry question into a vector calculation, and
prove a shape property without measuring anything.

## Position vectors and midpoints

The **position vector** of a point is the vector from the origin to the point. For points
$A$ and $B$, the displacement between them is

$$\vec{AB} = \vec{OB} - \vec{OA}$$

The midpoint $M$ of $AB$ is halfway along, so its position vector is the average of the
two:

$$\vec{OM} = \frac{1}{2}\left(\vec{OA} + \vec{OB}\right)$$

**Example 1.** Find the midpoint of $A(-1, 4)$ and $B(5, -2)$.

$$\vec{OM} = \frac{1}{2}\left(\begin{pmatrix} -1 \\ 4 \end{pmatrix} + \begin{pmatrix} 5 \\ -2 \end{pmatrix}\right) = \frac{1}{2}\begin{pmatrix} 4 \\ 2 \end{pmatrix} = \begin{pmatrix} 2 \\ 1 \end{pmatrix}$$

The midpoint is the point $(2, 1)$.

## Proving a parallelogram

A quadrilateral is a **parallelogram** when both pairs of opposite sides are parallel and
equal. In vector language, the opposite sides are equal vectors.

For $ABCD$ in order, one pair of opposite sides is $\vec{AB}$ and $\vec{DC}$. If
$\vec{AB} = \vec{DC}$, the two sides are equal and parallel, and that is enough to make the
shape a parallelogram.

**Example 2.** Show that $A(1, 1)$, $B(4, 2)$, $C(5, 5)$ and $D(2, 4)$ form a
parallelogram.

$$\vec{AB} = \begin{pmatrix} 4 - 1 \\ 2 - 1 \end{pmatrix} = \begin{pmatrix} 3 \\ 1 \end{pmatrix} \qquad \vec{DC} = \begin{pmatrix} 5 - 2 \\ 5 - 4 \end{pmatrix} = \begin{pmatrix} 3 \\ 1 \end{pmatrix}$$

The two vectors are equal, so $AB$ and $DC$ are equal and parallel. One such pair is
enough, so $ABCD$ is a parallelogram.

## Proving collinearity

Three points are **collinear** when they lie on one straight line. In vector language, the
displacement from the first to the second is a scalar multiple of the displacement from the
second to the third, and the two displacements share a point.

**Example 3.** Show that $A(1, 2)$, $B(4, 6)$ and $C(7, 10)$ lie on one straight line.

$$\vec{AB} = \begin{pmatrix} 3 \\ 4 \end{pmatrix} \qquad \vec{BC} = \begin{pmatrix} 3 \\ 4 \end{pmatrix}$$

The two displacements are equal, so they are parallel, and they share the point $B$. The
three points lie on one straight line.

## Proving a right angle

A right angle at a point is proved with the dot product. Write the two sides that meet at
the point as vectors, and show that their dot product is zero.

**Example 4.** The vectors are $\mathbf{a} = \begin{pmatrix} 6 \\ 2 \end{pmatrix}$ and
$\mathbf{b} = \begin{pmatrix} -2 \\ 6 \end{pmatrix}$. Show that they meet at a right angle.

$$\mathbf{a} \cdot \mathbf{b} = 6 \times (-2) + 2 \times 6 = -12 + 12 = 0$$

The dot product is zero, so the angle between the vectors is a right angle.

## Isosceles and right-angled triangles

Two equal lengths make a triangle isosceles. Find the length of each side with the length
formula and compare.

**Example 5.** For the vectors in Example 4, show that the triangle formed with their sum
is isosceles.

$$|\mathbf{a}| = \sqrt{6^2 + 2^2} = \sqrt{40} = 2\sqrt{10} \qquad |\mathbf{b}| = \sqrt{(-2)^2 + 6^2} = \sqrt{40} = 2\sqrt{10}$$

The two lengths are equal, so the triangle is isosceles. With the right angle from
Example 4, it is a right-angled isosceles triangle.

## The area of a right-angled triangle

For a triangle with a right angle, the two sides that meet at the right angle are the base
and the height.

$$\text{Area} = \frac{1}{2} \times \text{base} \times \text{height}$$

**Example 6.** The two sides meeting at a right angle both have length $2\sqrt{10}$. Find
the area of the triangle.

$$\text{Area} = \frac{1}{2} \times 2\sqrt{10} \times 2\sqrt{10} = \frac{1}{2} \times 40 = 20$$

The area is $20$ square units.

> **Watch out.** To prove a parallelogram, show that a pair of **opposite** sides are equal
> as vectors, not a pair of neighbouring sides. To prove collinearity, show that the
> displacements are parallel **and** that they share a point; two parallel displacements
> with no common point describe two separate lines. And when you write a side as a vector,
> take the coordinates in the order that matches the direction you mean.
>
> **Re-check:** after proving a parallelogram, check the other pair of opposite sides too.
> If the shape really is a parallelogram, the second pair must come out equal as well.

## Progress check

Back to the chapter problem, which you can now resolve. The drone's two legs are
$\mathbf{a} = \begin{pmatrix} 6 \\ 2 \end{pmatrix}$ km and
$\mathbf{b} = \begin{pmatrix} -2 \\ 6 \end{pmatrix}$ km.

Show that the two legs have equal length, and that they meet at a right angle. Then find
the area of the triangle the route encloses, and the length of the return leg. Say what
kind of triangle the route is. The Review finishes the calculation and checks the total
distance.

## You should now be able to

- find a midpoint using the average of two position vectors;
- prove that a quadrilateral is a parallelogram;
- prove that three points are collinear;
- prove that a triangle has a right angle, using the dot product;
- prove that a triangle is isosceles by comparing two lengths;
- find the area of a right-angled triangle from its two shorter sides.
