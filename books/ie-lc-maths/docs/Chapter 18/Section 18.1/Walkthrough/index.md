---
title: 18.1 Vectors and their representation — Learn
chapter: 18
chapter_title: Vectors
section: '18.1'
section_title: Vectors and their representation
tier: O
refs:
- '2.2'
kind: walkthrough
---

# 18.1 Vectors and their representation — Learn

**Prerequisites:** coordinates in the plane; Pythagoras' theorem; simplifying a surd.

**Objectives:** say what a vector is; write one as a column and with $\mathbf{i}$ and
$\mathbf{j}$; find its length; find the unit vector in its direction.

By the end of this section you can write down a displacement, name its two components,
and measure its length.

## Scalars and vectors

A **scalar** is a quantity that has size only. A temperature of $20$ degrees and a mass
of $5$ kg are scalars. You add them, subtract them and compare them as ordinary numbers.

A **vector** is a quantity that has size **and** direction. A displacement of $4$ km east
is a vector, and so is a force of $10$ N downwards. Two vectors are equal only when they
have the same size and the same direction.

> **Vector.** A quantity with both size and direction, drawn as an arrow. The length of
> the arrow is the size, and the way it points is the direction.

The vector from a point $A$ to a point $B$ is written $\vec{AB}$. The same vector drawn
anywhere else, with the same length and direction, is the same vector.

## Writing a vector as a column

In the plane, a vector is fixed by two numbers: how far it moves across, and how far it
moves up. Write them in a column.

$$\vec{AB} = \begin{pmatrix} \text{across} \\ \text{up} \end{pmatrix}$$

The two numbers are the **components** of the vector. A vector can also be written with
the two unit vectors $\mathbf{i}$ and $\mathbf{j}$, where $\mathbf{i}$ is one unit across
and $\mathbf{j}$ is one unit up.

$$\begin{pmatrix} 3 \\ -4 \end{pmatrix} = 3\mathbf{i} - 4\mathbf{j}$$

To find the displacement from $A(x_1, y_1)$ to $B(x_2, y_2)$, subtract the coordinates of
the start from those of the finish:

$$\vec{AB} = \begin{pmatrix} x_2 - x_1 \\ y_2 - y_1 \end{pmatrix}$$

The **position vector** of a point $P$ is the vector from the origin $O$ to $P$, written
$\vec{OP}$. Its components are just the coordinates of $P$.

**Example 1.** Write the displacement from $A(1, 2)$ to $B(5, 7)$ as a column vector.

$$\vec{AB} = \begin{pmatrix} 5 - 1 \\ 7 - 2 \end{pmatrix} = \begin{pmatrix} 4 \\ 5 \end{pmatrix}$$

The vector moves $4$ units across and $5$ units up. The reverse displacement is

$$\vec{BA} = \begin{pmatrix} 1 - 5 \\ 2 - 7 \end{pmatrix} = \begin{pmatrix} -4 \\ -5 \end{pmatrix} = -\vec{AB}$$

## The length of a vector

The **length**, or **magnitude**, of a vector is written with vertical bars, $|\mathbf{a}|$.
It is the length of the arrow.

The two components are at right angles, so they are the two shorter sides of a right
triangle. Pythagoras' theorem gives the length.

> **Length of a vector.** For $\mathbf{a} = \begin{pmatrix} x \\ y \end{pmatrix}$,
>
>
> $$|\mathbf{a}| = \sqrt{x^2 + y^2}$$

The length is never negative, and it is zero only for the **zero vector**
$\begin{pmatrix} 0 \\ 0 \end{pmatrix}$.

**Example 2.** Find the length of $\begin{pmatrix} 6 \\ 8 \end{pmatrix}$.

$$|\mathbf{a}| = \sqrt{6^2 + 8^2} = \sqrt{36 + 64} = \sqrt{100} = 10$$

**Example 3.** Find the length of $\begin{pmatrix} 1 \\ 2 \end{pmatrix}$.

$$|\mathbf{a}| = \sqrt{1^2 + 2^2} = \sqrt{1 + 4} = \sqrt{5}$$

The answer is not a whole number. Keep it as the surd $\sqrt{5}$ unless the question asks
for a decimal.

## Unit vectors

A **unit vector** has length $1$. It keeps the direction of the original vector and
throws away the length.

To find the unit vector in the direction of $\mathbf{a}$, divide $\mathbf{a}$ by its own
length:

$$\hat{\mathbf{a}} = \frac{1}{|\mathbf{a}|}\mathbf{a}$$

**Example 4.** Find the unit vector in the direction of $\begin{pmatrix} 6 \\ 8 \end{pmatrix}$.

The length is $10$, so

$$\hat{\mathbf{a}} = \frac{1}{10}\begin{pmatrix} 6 \\ 8 \end{pmatrix} = \begin{pmatrix} \frac{3}{5} \\ \frac{4}{5} \end{pmatrix}$$

Check: $\sqrt{\left(\frac{3}{5}\right)^2 + \left(\frac{4}{5}\right)^2} = \sqrt{\frac{9}{25} + \frac{16}{25}} = 1$.

The two basis vectors $\mathbf{i}$ and $\mathbf{j}$ are themselves unit vectors, which is
why they are the natural way to write components.

## Equal, negative and parallel vectors

Two vectors are equal when their matching components are equal. So
$\begin{pmatrix} 3 \\ 1 \end{pmatrix}$ and $\begin{pmatrix} 3 \\ 1 \end{pmatrix}$ are
equal, however far apart the two arrows are drawn.

The **negative** of a vector reverses its direction. It changes the sign of every
component:

$$-\begin{pmatrix} 3 \\ -1 \end{pmatrix} = \begin{pmatrix} -3 \\ 1 \end{pmatrix}$$

A vector is **parallel** to another when it is a scalar multiple of it. So
$\begin{pmatrix} 6 \\ -3 \end{pmatrix}$ is parallel to
$\begin{pmatrix} 2 \\ -1 \end{pmatrix}$, because it is $3$ times it. The scalar is the
**multiplier**. A positive multiplier keeps the direction, and a negative multiplier
reverses it.

> **Watch out.** A vector is not a point. The point $(4, 5)$ is a place, and
> $\begin{pmatrix} 4 \\ 5 \end{pmatrix}$ is a movement. The position vector $\vec{OP}$
> happens to share its components with the coordinates of $P$, but a vector drawn
> elsewhere has the same components and is the same vector. Also, $|\mathbf{a}|$ is a
> length, so it is never negative, even when a component is.
>
> **Re-check:** after finding a length, square your answer and see whether you get the
> sum of the squared components back. For $|\mathbf{a}| = 2\sqrt{10}$, the square is
> $40$, and $6^2 + 2^2 = 40$, so the length is right.

## Progress check

Back to the chapter problem. The drone's first leg is
$\mathbf{a} = \begin{pmatrix} 6 \\ 2 \end{pmatrix}$ km and its second is
$\mathbf{b} = \begin{pmatrix} -2 \\ 6 \end{pmatrix}$ km.

Draw both arrows from the depot, then find the length of each leg. Leave each answer as a
surd, and check that the two lengths are equal. Keep that result: the Review uses it to
show that the route is isosceles.

## You should now be able to

- say what a vector is, and how it differs from a scalar;
- write a displacement as a column and with $\mathbf{i}$ and $\mathbf{j}$;
- find the length of a vector, and simplify the surd;
- find the unit vector in the direction of a vector;
- decide when two vectors are equal, negative or parallel.
