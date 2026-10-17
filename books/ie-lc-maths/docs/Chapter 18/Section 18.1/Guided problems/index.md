---
title: 18.1 Vectors and their representation — Practise with help
chapter: 18
chapter_title: Vectors
section: '18.1'
section_title: Vectors and their representation
tier: O
refs:
- '2.2'
kind: guided-problems
---

# 18.1 Vectors and their representation — Practise with help

## Warm-up: remember

1. A right-angled triangle has shorter sides $5$ and $12$. Find its hypotenuse.
2. Simplify $\sqrt{50}$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $5^2 + 12^2 = 25 + 144 = 169$, and $\sqrt{169} = 13$.
2. $\sqrt{50} = \sqrt{25 \times 2} = 5\sqrt{2}$. Take out the largest square factor.

</details>

:::figure warm-up-gate


## Practise with help

**1.** Write the displacement from $A(2, 1)$ to $B(6, 4)$ as a column vector.

<details markdown="1">
<summary>Hint</summary>

Subtract the coordinates of $A$ from those of $B$.

<details markdown="1">
<summary>Next step</summary>

The across component is $6 - 2$ and the up component is $4 - 1$.

<details markdown="1">
<summary>Full working</summary>

$$\vec{AB} = \begin{pmatrix} 6 - 2 \\ 4 - 1 \end{pmatrix} = \begin{pmatrix} 4 \\ 3 \end{pmatrix}$$

The vector moves $4$ across and $3$ up.

</details>
</details>
</details>

**2.** Write $-3\mathbf{i} + 2\mathbf{j}$ as a column vector.

<details markdown="1">
<summary>Hint</summary>

The number multiplying $\mathbf{i}$ goes on top.

<details markdown="1">
<summary>Next step</summary>

The number multiplying $\mathbf{j}$ goes below, and it keeps its sign.

<details markdown="1">
<summary>Full working</summary>

$$-3\mathbf{i} + 2\mathbf{j} = \begin{pmatrix} -3 \\ 2 \end{pmatrix}$$

The across component is $-3$ and the up component is $2$.

</details>
</details>
</details>

**3.** Find the length of $\begin{pmatrix} 5 \\ 12 \end{pmatrix}$.

<details markdown="1">
<summary>Hint</summary>

Use Pythagoras' theorem on the two components.

<details markdown="1">
<summary>Next step</summary>

$|\mathbf{a}| = \sqrt{5^2 + 12^2}$.

<details markdown="1">
<summary>Full working</summary>

$$|\mathbf{a}| = \sqrt{25 + 144} = \sqrt{169} = 13$$

The length is a whole number, so there is no surd to simplify.

</details>
</details>
</details>

**4.** Find the length of $\begin{pmatrix} 2 \\ 3 \end{pmatrix}$, leaving your answer as a surd.

<details markdown="1">
<summary>Hint</summary>

Square each component, add, then take the square root.

<details markdown="1">
<summary>Next step</summary>

$|\mathbf{a}| = \sqrt{4 + 9}$.

<details markdown="1">
<summary>Full working</summary>

$$|\mathbf{a}| = \sqrt{2^2 + 3^2} = \sqrt{13}$$

$13$ has no square factor, so $\sqrt{13}$ is already in its simplest form. Do not round
it.

</details>
</details>
</details>

**5.** Find the unit vector in the direction of $\begin{pmatrix} 3 \\ 4 \end{pmatrix}$.

<details markdown="1">
<summary>Hint</summary>

First find the length, then divide each component by it.

<details markdown="1">
<summary>Next step</summary>

The length is $\sqrt{9 + 16} = 5$.

<details markdown="1">
<summary>Full working</summary>

$$\hat{\mathbf{a}} = \frac{1}{5}\begin{pmatrix} 3 \\ 4 \end{pmatrix} = \begin{pmatrix} \frac{3}{5} \\ \frac{4}{5} \end{pmatrix}$$

Check: $\left(\frac{3}{5}\right)^2 + \left(\frac{4}{5}\right)^2 = \frac{9}{25} + \frac{16}{25} = 1$, so the vector has length $1$.

</details>
</details>
</details>

**6.** Show that $\begin{pmatrix} 4 \\ -2 \end{pmatrix}$ is parallel to
$\begin{pmatrix} 2 \\ -1 \end{pmatrix}$, and state the multiplier.

<details markdown="1">
<summary>Hint</summary>

Divide each component of the first vector by the matching component of the second.

<details markdown="1">
<summary>Next step</summary>

$4 \div 2 = 2$ and $-2 \div (-1) = 2$.

<details markdown="1">
<summary>Full working</summary>

Both components give the same multiplier, $2$, so

$$\begin{pmatrix} 4 \\ -2 \end{pmatrix} = 2\begin{pmatrix} 2 \\ -1 \end{pmatrix}$$

The multiplier is positive, so the two vectors point the same way.

</details>
</details>
</details>

## A question from Chapter 12

**7.** The points are $A(1, 1)$ and $B(4, 5)$. Find the distance $AB$, and say how that
distance relates to the vector $\vec{AB}$.

<details markdown="1">
<summary>Hint</summary>

Find the displacement first, then its length.

<details markdown="1">
<summary>Next step</summary>

$\vec{AB} = \begin{pmatrix} 3 \\ 4 \end{pmatrix}$.

<details markdown="1">
<summary>Full working</summary>

$$\vec{AB} = \begin{pmatrix} 4 - 1 \\ 5 - 1 \end{pmatrix} = \begin{pmatrix} 3 \\ 4 \end{pmatrix}$$

The distance is the length of that displacement:
$AB = \sqrt{3^2 + 4^2} = \sqrt{25} = 5$. The distance between two points is the length of
the vector that joins them, which is the same as the distance formula from coordinate
geometry.

</details>
</details>
</details>
