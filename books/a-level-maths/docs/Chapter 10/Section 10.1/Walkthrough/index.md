---
title: 10.1 Vectors in two and three dimensions — Learn
chapter: 10
chapter_title: Vectors
section: '10.1'
section_title: Vectors in two and three dimensions
dfe:
- J1
kind: walkthrough
---

# 10.1 Vectors in two and three dimensions — Learn

**Prerequisites:** plotting points on axes; subtracting whole numbers and
negative numbers; using Pythagoras' theorem.

**By the end of this section you can:** explain what a vector is; write a vector
as a directed line segment, as a column and in $\mathbf{i}$, $\mathbf{j}$,
$\mathbf{k}$ form; recognise equal, negative and parallel vectors; work with
vectors in two dimensions and in three dimensions.

## 1. Scalars and vectors

Some quantities are fixed by a single number. A mass of $5$ kg and a
temperature of $20$°C are examples. A number of this kind is called a **scalar**.

Other quantities need a direction as well as a size. A force of $5$ N pushes
somewhere. A velocity of $5$ m/s points somewhere. A quantity with both a size
and a direction is called a **vector**. The size of a vector is its
**magnitude**.

Displacement is a vector. "Walk $3$ km" and "walk $3$ km north" are different
instructions.

## 2. Directed line segments and notation

A vector is drawn as an arrow. The length of the arrow is the magnitude. The
head of the arrow shows the direction. The arrow can be moved anywhere on the
page without changing the vector, because a free vector is fixed only by its
length and direction.

Several notations describe the same vector:

- a bold letter, such as $\mathbf{a}$;
- an arrow with a start and an end, such as $\vec{AB}$;
- a column, such as $\begin{pmatrix} 3 \\ 4 \end{pmatrix}$;
- a combination of the unit vectors, such as $3\mathbf{i} + 4\mathbf{j}$.

The unit vectors $\mathbf{i}$ and $\mathbf{j}$ have length $1$. The vector
$\mathbf{i}$ points along the positive $x$-axis. The vector $\mathbf{j}$ points
along the positive $y$-axis.

In the column $\begin{pmatrix} 3 \\ 4 \end{pmatrix}$, the top number is the
$x$-component and the bottom number is the $y$-component. The column
$\begin{pmatrix} 3 \\ 4 \end{pmatrix}$ and the vector $3\mathbf{i} + 4\mathbf{j}$
are the same vector.

**Example 1.** Write the displacement from $A(1, 2)$ to $B(4, 6)$ as a column
and in $\mathbf{i}$, $\mathbf{j}$ form.

Subtract the coordinates of $A$ from those of $B$:

$$
\vec{AB} =
\begin{pmatrix} 4 - 1 \\ 6 - 2 \end{pmatrix} =
\begin{pmatrix} 3 \\ 4 \end{pmatrix} = 3\mathbf{i} + 4\mathbf{j}.
$$

The vector moves $3$ units in the $x$-direction and $4$ units in the
$y$-direction.

**Example 2.** Write the displacement from $B(4, 6)$ to $A(1, 2)$.

$$
\vec{BA} =
\begin{pmatrix} 1 - 4 \\ 2 - 6 \end{pmatrix} =
\begin{pmatrix} -3 \\ -4 \end{pmatrix} = -3\mathbf{i} - 4\mathbf{j}.
$$

Changing the order of the letters reverses every sign: $\vec{BA} = -\vec{AB}$.

## 3. Equal, negative and parallel vectors

Two vectors are **equal** when they have the same magnitude and the same
direction. They do not need to start at the same point. In components, every
component must match.

The vector $-\mathbf{a}$ has the same magnitude as $\mathbf{a}$ but the opposite
direction.

Two vectors are **parallel** when one is a scalar multiple of the other. If
$\mathbf{b} = k\mathbf{a}$ for some number $k$, then $\mathbf{b}$ is parallel to
$\mathbf{a}$. A positive $k$ keeps the direction. A negative $k$ reverses it.

**Example 3.** Show that $\mathbf{a} = 3\mathbf{i} - 2\mathbf{j}$ and
$\vec{PQ}$, where $P(1, 5)$ and $Q(4, 3)$, are equal.

$$
\vec{PQ} =
\begin{pmatrix} 4 - 1 \\ 3 - 5 \end{pmatrix} =
\begin{pmatrix} 3 \\ -2 \end{pmatrix} = 3\mathbf{i} - 2\mathbf{j} = \mathbf{a}.
$$

Both components match, so the two vectors are equal.

**Example 4.** Show that $\mathbf{u} = 2\mathbf{i} - \mathbf{j}$ and
$\mathbf{v} = 6\mathbf{i} - 3\mathbf{j}$ are parallel.

Compare the components. Each component of $\mathbf{v}$ is $3$ times the matching
component of $\mathbf{u}$:

$$
\mathbf{v} = 6\mathbf{i} - 3\mathbf{j} = 3(2\mathbf{i} - \mathbf{j}) = 3\mathbf{u}.
$$

The multiplier is $3$, which is positive, so $\mathbf{v}$ is parallel to
$\mathbf{u}$ and points the same way.

## 4. Vectors in three dimensions

A point in three dimensions has three coordinates, written $(x, y, z)$. A vector
in three dimensions has three components:

$$
\mathbf{a} = a_1\mathbf{i} + a_2\mathbf{j} + a_3\mathbf{k} =
\begin{pmatrix} a_1 \\ a_2 \\ a_3 \end{pmatrix}.
$$

The unit vector $\mathbf{k}$ points along the positive $z$-axis. Its direction
is often called upwards.

**Example 5.** Write the displacement from $A(1, 2, -1)$ to $B(4, -1, 3)$.

$$
\vec{AB} =
\begin{pmatrix} 4 - 1 \\ -1 - 2 \\ 3 - (-1) \end{pmatrix} =
\begin{pmatrix} 3 \\ -3 \\ 4 \end{pmatrix} = 3\mathbf{i} - 3\mathbf{j} + 4\mathbf{k}.
$$

**Example 6.** A vector is $\mathbf{a} = 2\mathbf{i} + \mathbf{j} - 5\mathbf{k}$.
Write down $-2\mathbf{a}$.

Multiply each component by $-2$:

$$
-2\mathbf{a} = -4\mathbf{i} - 2\mathbf{j} + 10\mathbf{k}.
$$

The new vector is parallel to $\mathbf{a}$ and points the opposite way.

## 5. Try it: one vector, drawn anywhere

The sliders set the two components of $\mathbf{a}$ and the point where
$\mathbf{a}$ starts. The second arrow is the multiple $k\mathbf{a}$, drawn
from the origin.

**Predict first.** Before you touch a control, predict what happens to the
column vector of $\mathbf{a}$ when you move its starting point across the grid.
Then predict which value of $k$ makes the second arrow equal to $\mathbf{a}$.
Write down both answers.

:::figure ch10-vector-components

**Test.** Move the two start sliders and watch the column vector and the length.
Then set the components to $3$ and $4$, and set $k$ to $1$, then to $-1$, then
to $2$. Watch the second arrow each time.

**Explain.** Write two sentences. The first says why two arrows that start at
different points are still the same vector. The second says why a negative $k$
gives an arrow that is parallel to $\mathbf{a}$ and points the other way.

> **Watch out.** Three slips are common on this page.
>
> **A point is not a vector.** The pair $(3, 4)$ is a place when it names a
> point, and a displacement when it names a vector. Read the sentence to decide
> which meaning is wanted.
>
> **The order of the components.** A column vector keeps $x$ on top, $y$ below
> it, and $z$ at the bottom. Writing the components in the wrong order changes
> the vector, even though the numbers look the same.
>
> **The direction of the subtraction.** To find $\vec{AB}$, subtract the
> coordinates of $A$ from the coordinates of $B$. Subtracting the other way
> gives $\vec{BA}$, which points the opposite way. **Re-check:** substitute the
> first point back. If you add your answer to $A$, you must reach $B$.

## You should now be able to

- explain the difference between a scalar and a vector;
- write a displacement from one point to another as a column vector;
- move between column form and $\mathbf{i}$, $\mathbf{j}$, $\mathbf{k}$ form;
- decide when two vectors are equal or parallel;
- read and write vectors in three dimensions.
