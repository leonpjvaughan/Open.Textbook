---
title: 18.2 Vector arithmetic — Practise with help
chapter: 18
chapter_title: Vectors
section: '18.2'
section_title: Vector arithmetic
tier: O
refs:
- '2.2'
kind: guided-problems
---

# 18.2 Vector arithmetic — Practise with help

## Warm-up: remember

1. Find the length of $\begin{pmatrix} 6 \\ 8 \end{pmatrix}$.
2. Write the displacement from $A(2, 3)$ to $B(5, 9)$ as a column vector.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $\sqrt{6^2 + 8^2} = \sqrt{100} = 10$.
2. $\begin{pmatrix} 5 - 2 \\ 9 - 3 \end{pmatrix} = \begin{pmatrix} 3 \\ 6 \end{pmatrix}$.
   The finish comes first in the subtraction.

</details>

:::figure warm-up-gate


## Practise with help

**1.** Add $\begin{pmatrix} 3 \\ 1 \end{pmatrix}$ and
$\begin{pmatrix} 2 \\ 5 \end{pmatrix}$.

<details markdown="1">
<summary>Hint</summary>

Add the matching components: across with across, up with up.

<details markdown="1">
<summary>Next step</summary>

The across component is $3 + 2$ and the up component is $1 + 5$.

<details markdown="1">
<summary>Full working</summary>

$$\begin{pmatrix} 3 \\ 1 \end{pmatrix} + \begin{pmatrix} 2 \\ 5 \end{pmatrix} = \begin{pmatrix} 3 + 2 \\ 1 + 5 \end{pmatrix} = \begin{pmatrix} 5 \\ 6 \end{pmatrix}$$

</details>
</details>
</details>

**2.** Work out $\begin{pmatrix} 4 \\ -1 \end{pmatrix} - \begin{pmatrix} 1 \\ 3 \end{pmatrix}$.

<details markdown="1">
<summary>Hint</summary>

Subtract the matching components, and watch the signs.

<details markdown="1">
<summary>Next step</summary>

The up component is $-1 - 3$.

<details markdown="1">
<summary>Full working</summary>

$$\begin{pmatrix} 4 \\ -1 \end{pmatrix} - \begin{pmatrix} 1 \\ 3 \end{pmatrix} = \begin{pmatrix} 4 - 1 \\ -1 - 3 \end{pmatrix} = \begin{pmatrix} 3 \\ -4 \end{pmatrix}$$

</details>
</details>
</details>

**3.** Work out $4\begin{pmatrix} 2 \\ -3 \end{pmatrix}$.

<details markdown="1">
<summary>Hint</summary>

Multiply each component by $4$.

<details markdown="1">
<summary>Next step</summary>

The scalar keeps the sign of each component.

<details markdown="1">
<summary>Full working</summary>

$$4\begin{pmatrix} 2 \\ -3 \end{pmatrix} = \begin{pmatrix} 8 \\ -12 \end{pmatrix}$$

The new vector is parallel to the original and four times as long.

</details>
</details>
</details>

**4.** For $\mathbf{a} = \begin{pmatrix} 2 \\ 1 \end{pmatrix}$ and
$\mathbf{b} = \begin{pmatrix} -1 \\ 3 \end{pmatrix}$, find $\mathbf{a} + 2\mathbf{b}$.

<details markdown="1">
<summary>Hint</summary>

Work out $2\mathbf{b}$ first, then add.

<details markdown="1">
<summary>Next step</summary>

$2\mathbf{b} = \begin{pmatrix} -2 \\ 6 \end{pmatrix}$.

<details markdown="1">
<summary>Full working</summary>

$$\mathbf{a} + 2\mathbf{b} = \begin{pmatrix} 2 \\ 1 \end{pmatrix} + \begin{pmatrix} -2 \\ 6 \end{pmatrix} = \begin{pmatrix} 2 - 2 \\ 1 + 6 \end{pmatrix} = \begin{pmatrix} 0 \\ 7 \end{pmatrix}$$

The across components cancel, so the result points straight up.

</details>
</details>
</details>

**5.** A ship has displacements $4\mathbf{i} - \mathbf{j}$ km and
$-2\mathbf{i} + 5\mathbf{j}$ km. Find the single displacement from the start and the
distance from the start.

<details markdown="1">
<summary>Hint</summary>

Add the vectors, then take the length of the answer.

<details markdown="1">
<summary>Next step</summary>

$(4 - 2)\mathbf{i} + (-1 + 5)\mathbf{j} = 2\mathbf{i} + 4\mathbf{j}$.

<details markdown="1">
<summary>Full working</summary>

The total displacement is $2\mathbf{i} + 4\mathbf{j}$ km. The distance from the start is

$$\sqrt{2^2 + 4^2} = \sqrt{4 + 16} = \sqrt{20} = 2\sqrt{5} \text{ km}$$

</details>
</details>
</details>

**6.** Two forces $\mathbf{A} = \begin{pmatrix} 4 \\ -3 \end{pmatrix}$ N and
$\mathbf{B} = \begin{pmatrix} -1 \\ 5 \end{pmatrix}$ N act at a point. Find the force
$\mathbf{C}$ that keeps the point still.

<details markdown="1">
<summary>Hint</summary>

The three forces must add to the zero vector.

<details markdown="1">
<summary>Next step</summary>

First find $\mathbf{A} + \mathbf{B}$.

<details markdown="1">
<summary>Full working</summary>

$$\mathbf{A} + \mathbf{B} = \begin{pmatrix} 4 - 1 \\ -3 + 5 \end{pmatrix} = \begin{pmatrix} 3 \\ 2 \end{pmatrix} \text{ N}$$

For the point to stay still, $\mathbf{C} = -(\mathbf{A} + \mathbf{B}) = \begin{pmatrix} -3 \\ -2 \end{pmatrix}$ N.

</details>
</details>
</details>

## A question from Chapter 4

**7.** The points are $A(1, 1)$, $B(4, 5)$ and $C(7, 9)$. Find $\vec{AB}$ and $\vec{BC}$,
and explain what the two answers show about the three points.

<details markdown="1">
<summary>Hint</summary>

Find each displacement by subtracting coordinates.

<details markdown="1">
<summary>Next step</summary>

$\vec{AB} = \begin{pmatrix} 3 \\ 4 \end{pmatrix}$ and $\vec{BC} = \begin{pmatrix} 3 \\ 4 \end{pmatrix}$.

<details markdown="1">
<summary>Full working</summary>

$$\vec{AB} = \begin{pmatrix} 4 - 1 \\ 5 - 1 \end{pmatrix} = \begin{pmatrix} 3 \\ 4 \end{pmatrix} \qquad \vec{BC} = \begin{pmatrix} 7 - 4 \\ 9 - 5 \end{pmatrix} = \begin{pmatrix} 3 \\ 4 \end{pmatrix}$$

The two displacements are equal, so the same step repeats. The three points lie on one
straight line, and $B$ is the midpoint of $AC$ in the sense that $\vec{AB} = \vec{BC}$.

</details>
</details>
</details>
