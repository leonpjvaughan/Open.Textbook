---
title: 18.2 Vector arithmetic — Learn
chapter: 18
chapter_title: Vectors
section: '18.2'
section_title: Vector arithmetic
tier: O
refs:
- '2.2'
kind: walkthrough
---

# 18.2 Vector arithmetic — Learn

**Prerequisites:** Section 18.1 — columns, components and length.

**Objectives:** add and subtract vectors; multiply a vector by a scalar; find a resultant;
recognise the triangle and parallelogram laws.

By the end of this section you can combine any two vectors, and say what the combination
means as a movement.

## Adding vectors

To add two vectors, follow one arrow and then the other. The single arrow from the start
to the finish is the sum. This is the **triangle law**.

$$\vec{AB} + \vec{BC} = \vec{AC}$$

The order does not matter: $\mathbf{a} + \mathbf{b} = \mathbf{b} + \mathbf{a}$. Following
$\mathbf{b}$ and then $\mathbf{a}$ lands at the same point, because the two routes are
opposite sides of the same parallelogram. That picture is the **parallelogram law**.

When you add two vectors, add the matching components:

$$\begin{pmatrix} a_1 \\ a_2 \end{pmatrix} + \begin{pmatrix} b_1 \\ b_2 \end{pmatrix} = \begin{pmatrix} a_1 + b_1 \\ a_2 + b_2 \end{pmatrix}$$

where $a_1$ and $a_2$ are the components of $\mathbf{a}$, and $b_1$ and $b_2$ are the
components of $\mathbf{b}$.

The sum of two or more vectors is called their **resultant**.

:::figure vector-addition

**Predict, then test.** Before you move anything, predict where the sum of the two vectors
will land when both point the same way. Move the sliders to make that happen and check.
Then make the two vectors point in opposite directions and predict the length of the sum.
Write down the rule you have found in one sentence, then test it on a pair that points in
neither of those directions.

## Subtracting vectors

Subtracting is adding the opposite. To work out $\mathbf{a} - \mathbf{b}$, reverse
$\mathbf{b}$ and add it to $\mathbf{a}$.

$$\mathbf{a} - \mathbf{b} = \mathbf{a} + (-\mathbf{b})$$

Subtract the matching components:

$$\begin{pmatrix} a_1 \\ a_2 \end{pmatrix} - \begin{pmatrix} b_1 \\ b_2 \end{pmatrix} = \begin{pmatrix} a_1 - b_1 \\ a_2 - b_2 \end{pmatrix}$$

The displacement from $A$ to $B$ is the position vector of $B$ minus the position vector of
$A$: $\vec{AB} = \vec{OB} - \vec{OA}$. That is the same subtraction rule you met in
Section 18.1, written with vectors.

## Multiplying by a scalar

A **scalar** is an ordinary number. Multiplying a vector by a scalar changes its length
and, if the scalar is negative, its direction. Multiply each component by the scalar. For
a vector with components $x$ and $y$:

$$k\begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} kx \\ ky \end{pmatrix}$$

The result is parallel to the original vector, with the scalar as the multiplier. A scalar
of $2$ doubles the length, and a scalar of $-1$ reverses the direction and keeps the
length.

## The rules of vector arithmetic

These hold for all vectors $\mathbf{a}$, $\mathbf{b}$, $\mathbf{c}$ and all scalars $k$
and $m$:

- $\mathbf{a} + \mathbf{b} = \mathbf{b} + \mathbf{a}$ (addition is commutative);
- $(\mathbf{a} + \mathbf{b}) + \mathbf{c} = \mathbf{a} + (\mathbf{b} + \mathbf{c})$
  (addition is associative);
- $k(\mathbf{a} + \mathbf{b}) = k\mathbf{a} + k\mathbf{b}$ (scalars distribute);
- $(k + m)\mathbf{a} = k\mathbf{a} + m\mathbf{a}$.

They are the same rules as for ordinary numbers. That is why vector arithmetic feels
familiar: nothing new has to be learned beyond the two components.

## Worked examples

**Example 1.** Add $\begin{pmatrix} 2 \\ 5 \end{pmatrix}$ and
$\begin{pmatrix} 3 \\ -4 \end{pmatrix}$.

$$\begin{pmatrix} 2 \\ 5 \end{pmatrix} + \begin{pmatrix} 3 \\ -4 \end{pmatrix} = \begin{pmatrix} 2 + 3 \\ 5 + (-4) \end{pmatrix} = \begin{pmatrix} 5 \\ 1 \end{pmatrix}$$

**Example 2.** For $\mathbf{a} = \begin{pmatrix} 3 \\ -1 \end{pmatrix}$ and
$\mathbf{b} = \begin{pmatrix} 1 \\ 4 \end{pmatrix}$, find $2\mathbf{a} + 3\mathbf{b}$.

$$2\mathbf{a} = \begin{pmatrix} 6 \\ -2 \end{pmatrix} \qquad 3\mathbf{b} = \begin{pmatrix} 3 \\ 12 \end{pmatrix}$$

$$2\mathbf{a} + 3\mathbf{b} = \begin{pmatrix} 6 + 3 \\ -2 + 12 \end{pmatrix} = \begin{pmatrix} 9 \\ 10 \end{pmatrix}$$

**Example 3.** A walker has displacements $3\mathbf{i} - 4\mathbf{j}$ km and
$-\mathbf{i} + 2\mathbf{j}$ km. Find the displacement from the start and the distance from
the start.

$$(3 - 1)\mathbf{i} + (-4 + 2)\mathbf{j} = 2\mathbf{i} - 2\mathbf{j} \text{ km}$$

The distance is the length of that displacement:

$$\sqrt{2^2 + (-2)^2} = \sqrt{8} = 2\sqrt{2} \text{ km}$$

> **Watch out.** You cannot add the lengths of two vectors unless they point the same way.
> The length of $\mathbf{a} + \mathbf{b}$ is **not** usually $|\mathbf{a}| + |\mathbf{b}|$.
> For example, $\begin{pmatrix} 3 \\ 4 \end{pmatrix}$ and
> $\begin{pmatrix} -3 \\ -4 \end{pmatrix}$ each have length $5$, but their sum is the zero
> vector, with length $0$.
>
> **Re-check:** after adding, draw the triangle. The sum is the third side, and it is
> shorter than the other two sides added together, unless the vectors point the same way.

## Progress check

Back to the chapter problem. The drone's two legs are
$\mathbf{a} = \begin{pmatrix} 6 \\ 2 \end{pmatrix}$ km and
$\mathbf{b} = \begin{pmatrix} -2 \\ 6 \end{pmatrix}$ km.

Add the two legs to find the drone's displacement from the depot. Then write down the
single vector that returns it to the depot, and say how it relates to the displacement you
found. Keep both results: the Review measures the return leg.

## You should now be able to

- add two vectors using the triangle law, and add their components;
- subtract a vector by adding its opposite;
- multiply a vector by a scalar, and say how the length and direction change;
- state the commutative, associative and distributive rules;
- find a resultant displacement, and explain why lengths do not add up directly.
