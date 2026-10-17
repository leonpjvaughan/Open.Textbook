---
title: 18.3 The dot product — Practise with help
chapter: 18
chapter_title: Vectors
section: '18.3'
section_title: The dot product
tier: O
refs:
- '2.2'
kind: guided-problems
---

# 18.3 The dot product — Practise with help

## Warm-up: remember

1. Find the length of $\begin{pmatrix} 3 \\ 4 \end{pmatrix}$.
2. Add $\begin{pmatrix} 2 \\ -1 \end{pmatrix}$ and $\begin{pmatrix} 5 \\ 3 \end{pmatrix}$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $\sqrt{3^2 + 4^2} = \sqrt{25} = 5$.
2. $\begin{pmatrix} 2 + 5 \\ -1 + 3 \end{pmatrix} = \begin{pmatrix} 7 \\ 2 \end{pmatrix}$.

</details>

:::figure warm-up-gate


## Practise with help

**1.** Work out $\begin{pmatrix} 2 \\ 3 \end{pmatrix} \cdot \begin{pmatrix} 4 \\ 1 \end{pmatrix}$.

<details markdown="1">
<summary>Hint</summary>

Multiply the across components, multiply the up components, then add.

<details markdown="1">
<summary>Next step</summary>

$2 \times 4 + 3 \times 1$.

<details markdown="1">
<summary>Full working</summary>

$$\begin{pmatrix} 2 \\ 3 \end{pmatrix} \cdot \begin{pmatrix} 4 \\ 1 \end{pmatrix} = 2 \times 4 + 3 \times 1 = 8 + 3 = 11$$

</details>
</details>
</details>

**2.** Work out $\begin{pmatrix} 5 \\ -2 \end{pmatrix} \cdot \begin{pmatrix} 1 \\ 3 \end{pmatrix}$.

<details markdown="1">
<summary>Hint</summary>

Watch the sign of the second product.

<details markdown="1">
<summary>Next step</summary>

$5 \times 1 + (-2) \times 3$.

<details markdown="1">
<summary>Full working</summary>

$$5 \times 1 + (-2) \times 3 = 5 - 6 = -1$$

The answer is negative, so the angle between the two vectors is obtuse.

</details>
</details>
</details>

**3.** For $\mathbf{a} = \begin{pmatrix} 2 \\ 5 \end{pmatrix}$, work out
$\mathbf{a} \cdot \mathbf{a}$ and $|\mathbf{a}|^2$.

<details markdown="1">
<summary>Hint</summary>

Do the dot product first, then find the length and square it.

<details markdown="1">
<summary>Next step</summary>

$\mathbf{a} \cdot \mathbf{a} = 4 + 25$.

<details markdown="1">
<summary>Full working</summary>

$$\mathbf{a} \cdot \mathbf{a} = 2^2 + 5^2 = 4 + 25 = 29$$

The length is $|\mathbf{a}| = \sqrt{29}$, so $|\mathbf{a}|^2 = 29$. The two answers agree,
as they must.

</details>
</details>
</details>

**4.** Work out $\begin{pmatrix} 1 \\ 4 \end{pmatrix} \cdot \begin{pmatrix} 4 \\ -1 \end{pmatrix}$,
and say what the answer shows about the two vectors.

<details markdown="1">
<summary>Hint</summary>

A zero answer is special.

<details markdown="1">
<summary>Next step</summary>

$1 \times 4 + 4 \times (-1)$.

<details markdown="1">
<summary>Full working</summary>

$$1 \times 4 + 4 \times (-1) = 4 - 4 = 0$$

A dot product of zero means the two vectors are perpendicular.

</details>
</details>
</details>

**5.** Find $k$ so that $\begin{pmatrix} k \\ 3 \end{pmatrix}$ is perpendicular to
$\begin{pmatrix} 2 \\ 1 \end{pmatrix}$.

<details markdown="1">
<summary>Hint</summary>

Set the dot product equal to zero.

<details markdown="1">
<summary>Next step</summary>

$2k + 3 = 0$.

<details markdown="1">
<summary>Full working</summary>

For perpendicular vectors, $\begin{pmatrix} k \\ 3 \end{pmatrix} \cdot \begin{pmatrix} 2 \\ 1 \end{pmatrix} = 2k + 3 = 0$.
So $k = -\dfrac{3}{2}$.

Check: $2\left(-\dfrac{3}{2}\right) + 3 = -3 + 3 = 0$.

</details>
</details>
</details>

**6.** The dot product of two non-zero vectors is $7$. State whether the angle between
them is acute, right or obtuse, and give the reason.

<details markdown="1">
<summary>Hint</summary>

Use the angle formula and the sign of $\cos\theta$.

<details markdown="1">
<summary>Next step</summary>

$7 = |\mathbf{a}||\mathbf{b}|\cos\theta$, and the lengths are positive.

<details markdown="1">
<summary>Full working</summary>

Since the lengths are positive, $\cos\theta$ must be positive. A positive cosine belongs
to an **acute** angle, so the angle is between $0^\circ$ and $90^\circ$.

</details>
</details>
</details>

## A question from Chapter 12

**7.** A triangle has sides $3$, $4$ and $5$ cm. Explain how a dot product could be used
to check the right angle, and work out the dot product of the two shorter sides written
as vectors.

<details markdown="1">
<summary>Hint</summary>

Place the right angle at the origin, along the two axes.

<details markdown="1">
<summary>Next step</summary>

The two sides can be written as $\begin{pmatrix} 3 \\ 0 \end{pmatrix}$ and
$\begin{pmatrix} 0 \\ 4 \end{pmatrix}$.

<details markdown="1">
<summary>Full working</summary>

Place the triangle with the right angle at the origin, one side of length $3$ along the
across direction and one side of length $4$ along the up direction. The two sides are
then $\begin{pmatrix} 3 \\ 0 \end{pmatrix}$ and $\begin{pmatrix} 0 \\ 4 \end{pmatrix}$.
Their dot product is

$$3 \times 0 + 0 \times 4 = 0$$

A zero dot product confirms the right angle. This is the converse of the test in the
next section, and it agrees with the $3$-$4$-$5$ triangle you already know.

</details>
</details>
</details>
