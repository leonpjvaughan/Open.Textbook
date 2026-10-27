---
title: 10.4 Position vectors and the distance between two points — Learn
chapter: 10
chapter_title: Vectors
section: '10.4'
section_title: Position vectors and the distance between two points
refs:
- J4
kind: walkthrough
---

# 10.4 Position vectors and the distance between two points — Learn

**Prerequisites:** plotting coordinates in two and three dimensions; subtracting
directed numbers; finding the magnitude of a vector (Section 10.2); adding
vectors (Section 10.3).

**By the end of this section you can:** write the position vector of a point;
find the displacement between two points from their position vectors; find the
distance between two points in two and three dimensions; find the midpoint of
two points.

## 1. Position vectors

Choose an origin $O$. The **position vector** of a point $A$ is the vector from
$O$ to $A$. It is written $\vec{OA}$ or $\mathbf{a}$.

The position vector of $A(x, y)$ is

$$
\vec{OA} = x\mathbf{i} + y\mathbf{j} =
\begin{pmatrix} x \\ y \end{pmatrix}.
$$

In three dimensions, the position vector of $A(x, y, z)$ has a third component.
The position vector tells you where the point is, so it depends on the origin.
A free vector does not.

**Example 1.** Write the position vectors of $A(1, 2)$ and $B(5, 7)$.

$$
\mathbf{a} = \vec{OA} = \mathbf{i} + 2\mathbf{j},
\qquad
\mathbf{b} = \vec{OB} = 5\mathbf{i} + 7\mathbf{j}.
$$

## 2. The displacement between two points

To travel from $A$ to $B$, first go from $A$ back to the origin, then from the
origin out to $B$. In vectors,

$$
\vec{AB} = \vec{AO} + \vec{OB} = -\mathbf{a} + \mathbf{b} = \mathbf{b} - \mathbf{a}.
$$

So the displacement from $A$ to $B$ is the position vector of $B$ minus the
position vector of $A$.

**Example 2.** Find $\vec{AB}$ for $A(1, 2)$ and $B(5, 7)$.

$$
\vec{AB} = \mathbf{b} - \mathbf{a} =
(5 - 1)\mathbf{i} + (7 - 2)\mathbf{j} =
4\mathbf{i} + 5\mathbf{j}.
$$

**Example 3.** For $A(1, 2, -1)$ and $B(4, -2, 3)$, find $\vec{AB}$.

$$
\vec{AB} = \mathbf{b} - \mathbf{a} =
(4 - 1)\mathbf{i} + (-2 - 2)\mathbf{j} + (3 - (-1))\mathbf{k} =
3\mathbf{i} - 4\mathbf{j} + 4\mathbf{k}.
$$

## 3. The distance between two points

The distance between $A$ and $B$ is the magnitude of $\vec{AB}$:

$$
AB = |\vec{AB}| = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}
$$

in two dimensions, with a third square for the $z$-coordinates in three
dimensions. Here $(x_1, y_1)$ are the coordinates of $A$ and $(x_2, y_2)$ are the
coordinates of $B$. This is the same formula as the distance between two points
from coordinate geometry, now written with vectors.

**Example 4.** Find the distance between $A(1, 2)$ and $B(5, 7)$.

From Example 2, $\vec{AB} = 4\mathbf{i} + 5\mathbf{j}$, so

$$
AB = \sqrt{4^2 + 5^2} = \sqrt{16 + 25} = \sqrt{41} \approx 6.40.
$$

**Example 5.** Find the distance between $A(1, 2, -1)$ and $B(4, -2, 3)$.

From Example 3, $\vec{AB} = 3\mathbf{i} - 4\mathbf{j} + 4\mathbf{k}$, so

$$
AB = \sqrt{3^2 + (-4)^2 + 4^2} = \sqrt{9 + 16 + 16} = \sqrt{41} \approx 6.40.
$$

The two distances are equal here, which is a coincidence of these coordinates.

**Example 6.** Find the distance of $P(3, 4, 12)$ from the origin.

The position vector of $P$ is $3\mathbf{i} + 4\mathbf{j} + 12\mathbf{k}$, so

$$
OP = \sqrt{3^2 + 4^2 + 12^2} = \sqrt{9 + 16 + 144} = \sqrt{169} = 13.
$$

## 4. The midpoint of two points

The midpoint $M$ of $A$ and $B$ has position vector

$$
\mathbf{m} = \frac{\mathbf{a} + \mathbf{b}}{2}.
$$

This is the average of the two position vectors, taken component by component.

**Example 7.** Find the midpoint of $A(1, 2)$ and $B(5, 7)$.

$$
\mathbf{m} = \frac{1}{2}\left((1 + 5)\mathbf{i} + (2 + 7)\mathbf{j}\right) =
\frac{1}{2}\left(6\mathbf{i} + 9\mathbf{j}\right) =
3\mathbf{i} + \frac{9}{2}\mathbf{j}.
$$

The midpoint is $\left(3, \frac{9}{2}\right)$.

> **Watch out.** Three slips are common on this page.
>
> **The subtraction in the wrong order.** $\vec{AB} = \mathbf{b} - \mathbf{a}$,
> not $\mathbf{a} - \mathbf{b}$. The wrong order gives $\vec{BA}$, which points
> the opposite way. The distance is unaffected, because squaring removes the
> signs, but the displacement vector is wrong.
>
> **A vector answer to a distance question.** The distance is a single number,
> not a column. Read the question: "find $\vec{AB}$" wants a vector, and "find
> the distance" wants a magnitude.
>
> **The origin left out.** A position vector is measured from a stated origin.
> If the origin changes, the position vectors change, even though the distance
> between the two points does not. **Re-check:** for a distance, subtract the
> coordinates first, then square. Do not add the two position vectors by
> mistake.

## Progress check

Return to the chapter problem. The drone finishes at $10\mathbf{i} + 3\mathbf{j}$
and the walker is at $\mathbf{w} = 13\mathbf{i} + 7\mathbf{j}$.

1. Find the displacement from the drone to the walker.
2. Find the distance between the drone and the walker.
3. Find the midpoint of the drone and the walker.

## You should now be able to

- write the position vector of a point in two or three dimensions;
- find the displacement between two points from their position vectors;
- find the distance between two points, using the correct formula;
- find the midpoint of two points from their position vectors.
