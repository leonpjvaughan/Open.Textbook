---
title: 22.3 Vectors in geometric problems and proofs — Learn
chapter: 22
chapter_title: Vectors
section: '22.3'
section_title: Vectors in geometric problems and proofs
tier: H
dfe: [G25]
kind: walkthrough
---

# 22.3 Vectors in geometric problems and proofs — Learn

**Prerequisites:** vector notation, addition, subtraction and scalar multiplication.

**Objectives:** express routes between points using vectors; construct a geometric argument and prove a midpoint result.

## Choose a route between points

In a diagram, a route from one point to another can pass through other points.
Add the vectors along the route. Reversing a route changes the sign of its vector.
A **position vector** is the vector from a chosen origin to a point.

**Example 1.** In triangle $ABC$, let $\overrightarrow{AB}=\mathbf{u}$ and
$\overrightarrow{BC}=\mathbf{v}$. Find $\overrightarrow{AC}$ and $\overrightarrow{CA}$.

$$
\begin{aligned}
\overrightarrow{AC} &= \overrightarrow{AB}+\overrightarrow{BC} \\
&=\mathbf{u}+\mathbf{v} \\
\overrightarrow{CA} &=-\overrightarrow{AC} \\
&=-\mathbf{u}-\mathbf{v}
\end{aligned}
$$

## Build a proof from the definition

A **midpoint** divides a line segment into two equal parts. Let $ABCD$ be a
parallelogram with $\overrightarrow{AB}=\mathbf{u}$ and
$\overrightarrow{AD}=\mathbf{v}$. Opposite sides have equal directed vectors,
so $\overrightarrow{BC}=\mathbf{v}$ and $\overrightarrow{DC}=\mathbf{u}$.

**Example 2.** Show that the diagonals of a parallelogram bisect each other.

Choose $A$ as the origin. Then the position vectors of $B$, $D$ and $C$ are
$\mathbf{u}$, $\mathbf{v}$ and $\mathbf{u}+\mathbf{v}$.

$$
\begin{aligned}
\text{midpoint of }AC &= \frac{\mathbf{0}+\mathbf{u}+\mathbf{v}}{2} \\
&=\frac{1}{2}\mathbf{u}+\frac{1}{2}\mathbf{v} \\
\text{midpoint of }BD &= \frac{\mathbf{u}+\mathbf{v}}{2} \\
&=\frac{1}{2}\mathbf{u}+\frac{1}{2}\mathbf{v}
\end{aligned}
$$

The diagonals have the same midpoint, so they bisect each other. Each midpoint
step follows from adding the endpoint position vectors and halving.

> **Watch out.** Equal lengths alone do not prove two segments have the same
> midpoint. Compare both midpoint position vectors, including both components.

## Progress check

For the chapter problem, both diagonal midpoints are
$\frac12\mathbf{u}+\frac12\mathbf{v}$. The prediction is true for every
parallelogram, whatever side vectors you choose.

## You should now be able to

- find a vector by adding the vectors along a route;
- reverse a route by changing the vector's sign;
- express points in terms of position vectors from a chosen origin;
- construct a vector proof by comparing expressions for the same geometric point.
