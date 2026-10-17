---
title: 16.2 Corollaries of the parallelogram theorems — Practise with help
chapter: 16
chapter_title: 'Synthetic geometry: quadrilaterals, similarity and area'
section: '16.2'
section_title: Corollaries of the parallelogram theorems
tier: O
refs:
- '2.1'
kind: guided-problems
---

# 16.2 Corollaries of the parallelogram theorems — Practise with help

## Warm-up: remember

1. Work out $360 - 100 - 80 - 100$.
2. The diagonals of a parallelogram meet at $E$. Given $|AE| = 6$ cm, find $|EC|$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $360 - 100 - 80 - 100 = 80$. The four angles of a quadrilateral add to $360^\circ$.
2. $|EC| = 6$ cm. The diagonals of a parallelogram bisect one another, so $E$ is the
   midpoint of $AC$.

If either answer felt uncertain, look again at Section 16.1 before you carry on.

</details>

:::figure warm-up-gate


## Practise with help

**1.** A quadrilateral $ABCD$ has $|\angle A| = |\angle C| = 100^\circ$ and
$|\angle B| = |\angle D| = 80^\circ$. Is it a parallelogram?

<details markdown="1">
<summary>Hint</summary>

Look at the two pairs of opposite angles.

<details markdown="1">
<summary>Next step</summary>

Converse 1 of Theorem 9 says equal opposite angles make a parallelogram.

<details markdown="1">
<summary>Full working</summary>

The opposite angles are equal, so the quadrilateral is a parallelogram by Converse 1 of
Theorem 9.

Check the consecutive angles: $100 + 80 = 180$, so the sides are parallel.

</details>
</details>
</details>

**2.** A quadrilateral has sides of $7$, $9$, $7$ and $9$ cm, in order. Is it a
parallelogram?

<details markdown="1">
<summary>Hint</summary>

The sides repeat, so each side has an opposite side of the same length.

<details markdown="1">
<summary>Next step</summary>

Converse 2 of Theorem 9 says equal opposite sides make a parallelogram.

<details markdown="1">
<summary>Full working</summary>

The opposite sides are equal: $7$ cm and $7$ cm, then $9$ cm and $9$ cm. So the
quadrilateral is a parallelogram by Converse 2 of Theorem 9.

</details>
</details>
</details>

**3.** A quadrilateral $ABCD$ has $|AB| = |DC| = 12$ cm, and $AB \parallel DC$. Is it a
parallelogram?

<details markdown="1">
<summary>Hint</summary>

One pair of opposite sides has both properties at once.

<details markdown="1">
<summary>Next step</summary>

Equal and parallel is Proposition 4.

<details markdown="1">
<summary>Full working</summary>

One pair of opposite sides is equal and parallel, so the quadrilateral is a parallelogram
by Proposition 4. By Theorem 9, the other pair of opposite sides is also equal and
parallel.

</details>
</details>
</details>

**4.** The diagonals of a parallelogram meet at $E$. Given $|AE| = 5$ cm and
$|BE| = 4$ cm, find $|EC|$ and $|ED|$.

<details markdown="1">
<summary>Hint</summary>

Theorem 10 says the diagonals bisect one another.

<details markdown="1">
<summary>Next step</summary>

$E$ is the midpoint of both diagonals.

<details markdown="1">
<summary>Full working</summary>

$$|EC| = |AE| = 5 \text{ cm}, \qquad |ED| = |BE| = 4 \text{ cm}$$

So the diagonals are $10$ cm and $8$ cm long, and each is cut into two equal halves at
$E$.

</details>
</details>
</details>

**5.** Prove that the diagonals of a parallelogram bisect one another.

<details markdown="1">
<summary>Hint</summary>

Let the diagonals meet at $E$, and compare two triangles.

<details markdown="1">
<summary>Next step</summary>

Use alternate angles and the opposite sides of the parallelogram, then ASA.

<details markdown="1">
<summary>Full working</summary>

Let $ABCD$ be a parallelogram, and let the diagonals $AC$ and $BD$ meet at $E$.

- $|\angle EAD| = |\angle ECB|$, by alternate angles at $AD \parallel BC$.
- $|\angle EDA| = |\angle EBC|$, by alternate angles at $AD \parallel BC$.
- $|AD| = |BC|$, by Theorem 9.

So $\triangle ADE \cong \triangle CBE$ by ASA. Therefore $|AE| = |EC|$ and
$|DE| = |EB|$. The diagonals bisect one another.

</details>
</details>
</details>

**6.** Prove that the diagonals of a rhombus are perpendicular.

<details markdown="1">
<summary>Hint</summary>

A rhombus is a parallelogram, so its diagonals bisect one another.

<details markdown="1">
<summary>Next step</summary>

Compare the two triangles on either side of one diagonal.

<details markdown="1">
<summary>Full working</summary>

A rhombus is a parallelogram by Proposition 5, so its diagonals bisect one another at a
point $E$, by Theorem 10. Let the rhombus be $ABCD$.

In the triangles $ABE$ and $ADE$: $|AB| = |AD|$, because all four sides are equal;
$|BE| = |DE|$, because the diagonals bisect one another; and $AE$ is common. So
$\triangle ABE \cong \triangle ADE$ by SSS.

Therefore $|\angle AEB| = |\angle AED|$. These two angles sit on the straight line $BD$,
so they add to $180^\circ$. Equal angles that add to $180^\circ$ are each $90^\circ$. So
the diagonals are perpendicular.

</details>
</details>
</details>

## A question from Chapter 13

**7.** A quadrilateral has vertices $A(1,1)$, $B(5,2)$, $C(4,6)$ and $D(0,5)$. Find the
midpoint of $AC$ and the midpoint of $BD$. What does your answer tell you about the
quadrilateral?

<details markdown="1">
<summary>Hint</summary>

Use the midpoint formula from Chapter 13.

<details markdown="1">
<summary>Next step</summary>

If the two diagonals have the same midpoint, they bisect one another.

<details markdown="1">
<summary>Full working</summary>

Midpoint of $AC$:
$$\left(\frac{1 + 4}{2}, \frac{1 + 6}{2}\right) = (2.5, 3.5).$$

Midpoint of $BD$:
$$\left(\frac{5 + 0}{2}, \frac{2 + 5}{2}\right) = (2.5, 3.5).$$

The two diagonals have the same midpoint, so they bisect one another. By Proposition 6,
the quadrilateral is a parallelogram.

</details>
</details>
</details>
