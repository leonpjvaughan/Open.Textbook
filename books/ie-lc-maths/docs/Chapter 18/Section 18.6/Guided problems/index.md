---
title: 18.6 Geometric applications of vectors — Practise with help
chapter: 18
chapter_title: Vectors
section: '18.6'
section_title: Geometric applications of vectors
tier: H
refs:
- '2.2'
kind: guided-problems
---

# 18.6 Geometric applications of vectors — Practise with help

## Warm-up: remember

1. Work out $\begin{pmatrix} 4 \\ 1 \end{pmatrix} \cdot \begin{pmatrix} 1 \\ -4 \end{pmatrix}$.
2. Find the midpoint of $A(2, 3)$ and $B(6, 9)$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $4 \times 1 + 1 \times (-4) = 4 - 4 = 0$, so the vectors are perpendicular.
2. $\dfrac{1}{2}\begin{pmatrix} 2 + 6 \\ 3 + 9 \end{pmatrix} = \dfrac{1}{2}\begin{pmatrix} 8 \\ 12 \end{pmatrix} = \begin{pmatrix} 4 \\ 6 \end{pmatrix}$,
   which is the point $(4, 6)$.

</details>

:::figure warm-up-gate


## Practise with help

**1.** Find the midpoint of $A(1, 2)$ and $B(7, 8)$.

<details markdown="1">
<summary>Hint</summary>

Average the two position vectors.

<details markdown="1">
<summary>Next step</summary>

$\dfrac{1}{2}\begin{pmatrix} 1 + 7 \\ 2 + 8 \end{pmatrix}$.

<details markdown="1">
<summary>Full working</summary>

$$\vec{OM} = \frac{1}{2}\begin{pmatrix} 8 \\ 10 \end{pmatrix} = \begin{pmatrix} 4 \\ 5 \end{pmatrix}$$

The midpoint is the point $(4, 5)$.

</details>
</details>
</details>

**2.** Show that $A(0, 0)$, $B(3, 1)$, $C(4, 4)$ and $D(1, 3)$ form a parallelogram.

<details markdown="1">
<summary>Hint</summary>

Compare $\vec{AB}$ with $\vec{DC}$.

<details markdown="1">
<summary>Next step</summary>

$\vec{AB} = \begin{pmatrix} 3 \\ 1 \end{pmatrix}$ and
$\vec{DC} = \begin{pmatrix} 4 - 1 \\ 4 - 3 \end{pmatrix} = \begin{pmatrix} 3 \\ 1 \end{pmatrix}$.

<details markdown="1">
<summary>Full working</summary>

$$\vec{AB} = \begin{pmatrix} 3 - 0 \\ 1 - 0 \end{pmatrix} = \begin{pmatrix} 3 \\ 1 \end{pmatrix} \qquad \vec{DC} = \begin{pmatrix} 4 - 1 \\ 4 - 3 \end{pmatrix} = \begin{pmatrix} 3 \\ 1 \end{pmatrix}$$

The two opposite sides are equal as vectors, so they are equal and parallel. One such pair
makes $ABCD$ a parallelogram.

</details>
</details>
</details>

**3.** Show that $A(1, 1)$, $B(3, 5)$ and $C(5, 9)$ lie on one straight line.

<details markdown="1">
<summary>Hint</summary>

Compare $\vec{AB}$ with $\vec{BC}$.

<details markdown="1">
<summary>Next step</summary>

$\vec{AB} = \begin{pmatrix} 2 \\ 4 \end{pmatrix}$ and
$\vec{BC} = \begin{pmatrix} 2 \\ 4 \end{pmatrix}$.

<details markdown="1">
<summary>Full working</summary>

$$\vec{AB} = \begin{pmatrix} 3 - 1 \\ 5 - 1 \end{pmatrix} = \begin{pmatrix} 2 \\ 4 \end{pmatrix} \qquad \vec{BC} = \begin{pmatrix} 5 - 3 \\ 9 - 5 \end{pmatrix} = \begin{pmatrix} 2 \\ 4 \end{pmatrix}$$

The displacements are equal, so they are parallel and they share the point $B$. The three
points lie on one straight line.

</details>
</details>
</details>

**4.** Show that the angle at $B$ is a right angle, where $A(1, 1)$, $B(4, 5)$ and
$C(8, 2)$.

<details markdown="1">
<summary>Hint</summary>

Write $\vec{BA}$ and $\vec{BC}$, then take their dot product.

<details markdown="1">
<summary>Next step</summary>

$\vec{BA} = \begin{pmatrix} -3 \\ -4 \end{pmatrix}$ and
$\vec{BC} = \begin{pmatrix} 4 \\ -3 \end{pmatrix}$.

<details markdown="1">
<summary>Full working</summary>

$$\vec{BA} = \begin{pmatrix} 1 - 4 \\ 1 - 5 \end{pmatrix} = \begin{pmatrix} -3 \\ -4 \end{pmatrix} \qquad \vec{BC} = \begin{pmatrix} 8 - 4 \\ 2 - 5 \end{pmatrix} = \begin{pmatrix} 4 \\ -3 \end{pmatrix}$$

$$\vec{BA} \cdot \vec{BC} = (-3) \times 4 + (-4) \times (-3) = -12 + 12 = 0$$

The dot product is zero, so the angle at $B$ is a right angle.

</details>
</details>
</details>

**5.** The vectors are $\mathbf{a} = \begin{pmatrix} 4 \\ 3 \end{pmatrix}$ and
$\mathbf{b} = \begin{pmatrix} -3 \\ 4 \end{pmatrix}$. Show that the triangle they form
with their sum is right-angled and isosceles, and find its area.

<details markdown="1">
<summary>Hint</summary>

Check the dot product for the right angle and the two lengths for the equal sides.

<details markdown="1">
<summary>Next step</summary>

$\mathbf{a} \cdot \mathbf{b} = -12 + 12 = 0$, and both lengths are $\sqrt{25} = 5$.

<details markdown="1">
<summary>Full working</summary>

$$\mathbf{a} \cdot \mathbf{b} = 4 \times (-3) + 3 \times 4 = -12 + 12 = 0$$

so the two vectors meet at a right angle. Their lengths are

$$|\mathbf{a}| = \sqrt{4^2 + 3^2} = 5 \qquad |\mathbf{b}| = \sqrt{(-3)^2 + 4^2} = 5$$

so the triangle is isosceles. The area is

$$\frac{1}{2} \times 5 \times 5 = 12.5$$

</details>
</details>
</details>

**6.** A quadrilateral has $A(0, 0)$, $B(4, 0)$, $C(4, 3)$ and $D(0, 3)$. Show that it is
a rectangle by checking one pair of opposite sides and one angle.

<details markdown="1">
<summary>Hint</summary>

A rectangle is a parallelogram with a right angle.

<details markdown="1">
<summary>Next step</summary>

$\vec{AB} = \begin{pmatrix} 4 \\ 0 \end{pmatrix}$ and
$\vec{DC} = \begin{pmatrix} 4 \\ 0 \end{pmatrix}$, and
$\vec{AB} \cdot \vec{AD} = 0$.

<details markdown="1">
<summary>Full working</summary>

$$\vec{AB} = \begin{pmatrix} 4 \\ 0 \end{pmatrix} \qquad \vec{DC} = \begin{pmatrix} 4 - 0 \\ 3 - 3 \end{pmatrix} = \begin{pmatrix} 4 \\ 0 \end{pmatrix}$$

so the opposite sides are equal and parallel, and the shape is a parallelogram. Also

$$\vec{AB} \cdot \vec{AD} = \begin{pmatrix} 4 \\ 0 \end{pmatrix} \cdot \begin{pmatrix} 0 \\ 3 \end{pmatrix} = 4 \times 0 + 0 \times 3 = 0$$

so the angle at $A$ is a right angle. A parallelogram with a right angle is a rectangle.

</details>
</details>
</details>

## A question from Chapter 15

**7.** In the chapter problem, the drone's two legs have equal length and meet at a right
angle. Explain why the two angles at the other corners of the triangle must be equal, and
find them.

<details markdown="1">
<summary>Hint</summary>

The triangle is isosceles, so two angles are equal. The angles add to $180^\circ$.

<details markdown="1">
<summary>Next step</summary>

The right angle is $90^\circ$, leaving $90^\circ$ to share between the two equal angles.

<details markdown="1">
<summary>Full working</summary>

The two equal sides make the triangle isosceles, so the angles opposite them are equal.
The third angle is the right angle, $90^\circ$. The remaining two angles add to
$180^\circ - 90^\circ = 90^\circ$, and since they are equal, each is $45^\circ$. The
triangle has angles $90^\circ$, $45^\circ$ and $45^\circ$.

</details>
</details>
</details>
