---
title: 10.3 Vector addition and scalar multiplication — Learn
chapter: 10
chapter_title: Vectors
section: '10.3'
section_title: Vector addition and scalar multiplication
refs:
- J3
kind: walkthrough
---

# 10.3 Vector addition and scalar multiplication — Learn

**Prerequisites:** adding and subtracting directed numbers; multiplying a
number by a bracket; finding the magnitude of a vector (Section 10.2).

**By the end of this section you can:** add two vectors in components, and draw
the sum head to tail; subtract one vector from another; multiply a vector by a
scalar and describe the result; recognise a resultant force or displacement;
find the magnitude and direction of a resultant.

## 1. Adding vectors in components

To add two vectors, add the matching components:

$$
\begin{pmatrix} a_1 \\ a_2 \end{pmatrix} +
\begin{pmatrix} b_1 \\ b_2 \end{pmatrix} =
\begin{pmatrix} a_1 + b_1 \\ a_2 + b_2 \end{pmatrix}.
$$

The same rule holds in three dimensions, with a third row.

**Example 1.** Add $\mathbf{a} = 3\mathbf{i} + 4\mathbf{j}$ and
$\mathbf{b} = 4\mathbf{i} - 3\mathbf{j}$.

$$
\mathbf{a} + \mathbf{b} =
(3 + 4)\mathbf{i} + (4 + (-3))\mathbf{j} =
7\mathbf{i} + \mathbf{j}.
$$

The two vectors do not need to represent the same kind of quantity. A
displacement plus a displacement is a displacement, and two forces add to a
resultant force.

## 2. Adding vectors on a diagram

On a diagram, addition is done **head to tail**. Draw the first vector, then
start the second vector at the head of the first. The sum, called the
**resultant**, runs from the tail of the first vector to the head of the second.

The order does not matter. Drawing $\mathbf{b}$ first and then $\mathbf{a}$
gives the same resultant, which is why the two orders form the sides of a
parallelogram.

**Example 2.** Describe the resultant of Example 1 on a diagram.

Start at the origin and draw $\mathbf{a}$ as the arrow to $(3, 4)$. From that
point, draw $\mathbf{b}$ as $4$ right and $3$ down, ending at $(7, 1)$. The
resultant runs straight from $(0, 0)$ to $(7, 1)$, which is $7\mathbf{i} + \mathbf{j}$.

## 3. Subtraction

Subtracting a vector is the same as adding its negative:

$$
\mathbf{a} - \mathbf{b} = \mathbf{a} + (-\mathbf{b}).
$$

Subtract the matching components. The vector $\mathbf{a} - \mathbf{b}$ runs from
the head of $\mathbf{b}$ to the head of $\mathbf{a}$ when both are drawn from
the same point.

**Example 3.** For $\mathbf{a} = \mathbf{i} + 2\mathbf{j}$ and
$\mathbf{b} = 3\mathbf{i} - \mathbf{j}$, find $2\mathbf{a} - 3\mathbf{b}$.

Multiply first, then subtract:

$$
2\mathbf{a} = 2\mathbf{i} + 4\mathbf{j},
\qquad
3\mathbf{b} = 9\mathbf{i} - 3\mathbf{j}.
$$

$$
2\mathbf{a} - 3\mathbf{b} =
(2 - 9)\mathbf{i} + (4 - (-3))\mathbf{j} =
-7\mathbf{i} + 7\mathbf{j}.
$$

## 4. Scalar multiplication

Multiplying a vector by a scalar changes its length and possibly its direction:

$$
k\begin{pmatrix} a_1 \\ a_2 \end{pmatrix} =
\begin{pmatrix} k a_1 \\ k a_2 \end{pmatrix}.
$$

- If $k > 1$, the vector becomes longer.
- If $0 < k < 1$, it becomes shorter.
- If $k$ is negative, it also reverses.

The direction stays the same when $k$ is positive, so the new vector is
parallel to the original. Every component is multiplied, so the vector stretches
without turning.

## 5. The magnitude of a resultant

To find the magnitude of $\mathbf{a} + \mathbf{b}$, add the vectors first, then
find the magnitude of the sum. The magnitude of a sum is usually **not** the sum
of the magnitudes.

**Example 4.** Two forces $\mathbf{F}_1 = 3\mathbf{i} + 4\mathbf{j}$ N and
$\mathbf{F}_2 = 4\mathbf{i} - 3\mathbf{j}$ N act at a point. Find the resultant
force, its magnitude and its direction.

$$
\mathbf{F}_1 + \mathbf{F}_2 = 7\mathbf{i} + \mathbf{j}.
$$

The magnitude is

$$
|\mathbf{F}_1 + \mathbf{F}_2| = \sqrt{7^2 + 1^2} = \sqrt{50} = 5\sqrt{2} \approx 7.07 \text{ N}.
$$

The direction from the positive $x$-axis is
$\tan^{-1}\left(\frac{1}{7}\right) = 8.1^\circ$ to $1$ d.p.

Each force has magnitude $5$, but the resultant has magnitude about $7.07$, not
$10$. The two forces partly cancel.

## 6. Three vectors in equilibrium

Three vectors are in **equilibrium** when their sum is the zero vector. The
forces balance, so nothing moves.

**Example 5.** Forces $\mathbf{A} = 3\mathbf{i} + 4\mathbf{j}$ N and
$\mathbf{B} = -\mathbf{i} + 2\mathbf{j}$ N act at a point. Find the third force
$\mathbf{C}$ that keeps the point still.

The three forces must sum to zero, so

$$
\mathbf{C} = -(\mathbf{A} + \mathbf{B}) = -\left(2\mathbf{i} + 6\mathbf{j}\right) = -2\mathbf{i} - 6\mathbf{j} \text{ N}.
$$

## 7. Try it: the vector addition explorer

**Predict first.** You will move sliders to set the components of $\mathbf{a}$
and $\mathbf{b}$. Before you touch them, predict what the resultant
$\mathbf{a} + \mathbf{b}$ does when you make $\mathbf{b}$ the negative of
$\mathbf{a}$. Write down the components you expect.

:::figure ch10-vector-addition

**Test.** Move the sliders for $\mathbf{a}$ and $\mathbf{b}$ and watch the
resultant. Then set $k$ to $0.5$, then to $-1$, then to $2$, and watch the arrow
for $k\mathbf{a}$.

**Explain.** Write two sentences. The first says why the dashed arrow is the
same as $\mathbf{b}$. The second says why changing $k$ stretches or reverses
$\mathbf{a}$ without turning it.

> **Watch out.** Three slips are common on this page.
>
> **Adding magnitudes.** The magnitude of $\mathbf{a} + \mathbf{b}$ is not
> $|\mathbf{a}| + |\mathbf{b}|$. Add the components first, then take the square
> root. In Example 4 the two lengths of $5$ give a resultant of $7.07$, not
> $10$.
>
> **A sign lost in subtraction.** Subtracting a negative component turns it into
> a plus. In Example 3 the $y$-component is $4 - (-3) = 7$, not $1$. Write the
> subtraction as adding the negative when the signs look awkward.
>
> **A scalar that touches one component only.** The scalar multiplies every
> component. $3(2\mathbf{i} - \mathbf{j})$ is $6\mathbf{i} - 3\mathbf{j}$, not
> $6\mathbf{i} - \mathbf{j}$. **Re-check:** use the two ends of the arrow. If
> $k\mathbf{a}$ is parallel to $\mathbf{a}$, the ratio of the $x$-components must
> equal the ratio of the $y$-components.

## Progress check

Return to the chapter problem. The drone starts at
$\mathbf{p} = 2\mathbf{i} + \mathbf{j}$ and flies $\mathbf{u} = 3\mathbf{i} + 4\mathbf{j}$,
then $\mathbf{v} = 4\mathbf{i} - 3\mathbf{j}$. The wind adds
$\mathbf{d} = \mathbf{i} + \mathbf{j}$.

1. Add the two legs first. What single displacement do they give?
2. Add the wind drift to that displacement.
3. Add the result to the pad position. Where does the drone finish?
4. The walker is at $13\mathbf{i} + 7\mathbf{j}$. By how much has the drone
   missed the walker?

## You should now be able to

- add two vectors by adding matching components;
- draw a vector sum head to tail and name the resultant;
- subtract a vector by adding its negative;
- multiply a vector by a scalar and describe the stretch or reversal;
- find the magnitude and direction of a resultant;
- recognise three vectors in equilibrium and find the missing one.
