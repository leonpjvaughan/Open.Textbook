---
title: 5.11 Proofs with trigonometric functions and identities — Practise with help
chapter: 5
chapter_title: Trigonometry
section: '5.11'
section_title: Proofs with trigonometric functions and identities
refs:
- E8
kind: guided-problems
---

# 5.11 Proofs with trigonometric functions and identities — Practise with help

Choose one side to work on and stay with it. At each line, name the formula you
used. Finish with the two sides identical.

## Warm-up: remember

1. Expand $(x + y)(x - y)$.
2. Write $\sin 2A$ in terms of $\sin A$ and $\cos A$.
3. Write $\cos 2A$ in each of its three forms.

<details markdown="1">
<summary>Answers</summary>

1. $(x + y)(x - y) = x^2 - y^2$.
2. $\sin 2A = 2\sin A\cos A$.
3. $\cos 2A = \cos^2 A - \sin^2 A = 1 - 2\sin^2 A = 2\cos^2 A - 1$.

If question 3 was hard, revisit the double-angle formulae before you continue.
</details>

## Practise with help

**1.** Prove that $(\sin A + \cos A)^2 \equiv 1 + \sin 2A$.

<details markdown="1">
<summary>Hint</summary>

Expand the square on the left. Look for $\sin^2 A + \cos^2 A$ and for
$2\sin A\cos A$.
</details>

<details markdown="1">
<summary>Next step</summary>

$(\sin A + \cos A)^2 = \sin^2 A + 2\sin A\cos A + \cos^2 A$. Group the two
squares, then replace $2\sin A\cos A$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
(\sin A + \cos A)^2
= \sin^2 A + 2\sin A\cos A + \cos^2 A
= (\sin^2 A + \cos^2 A) + 2\sin A\cos A
= 1 + \sin 2A.
$$
</details>

**2.** Prove that $\sin(A + B)\sin(A - B) \equiv \sin^2 A - \sin^2 B$.

<details markdown="1">
<summary>Hint</summary>

Use the two addition formulae, then recognise a difference of two squares.
</details>

<details markdown="1">
<summary>Next step</summary>

The product is $(\sin A\cos B + \cos A\sin B)(\sin A\cos B - \cos A\sin B)$,
which equals $\sin^2 A\cos^2 B - \cos^2 A\sin^2 B$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\sin(A + B)\sin(A - B)
= \sin^2 A\cos^2 B - \cos^2 A\sin^2 B.
$$

Replace the cosines with $1 - \sin^2$:

$$
= \sin^2 A(1 - \sin^2 B) - (1 - \sin^2 A)\sin^2 B
= \sin^2 A - \sin^2 A\sin^2 B - \sin^2 B + \sin^2 A\sin^2 B
= \sin^2 A - \sin^2 B.
$$
</details>

**3.** Prove that $\cos 2A \equiv \dfrac{1 - \tan^2 A}{1 + \tan^2 A}$.

<details markdown="1">
<summary>Hint</summary>

Work on the right-hand side. Replace tangent with sine over cosine.
</details>

<details markdown="1">
<summary>Next step</summary>

Multiply the top and the bottom of the fraction by $\cos^2 A$. The denominator
becomes $\cos^2 A + \sin^2 A$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{1 - \tan^2 A}{1 + \tan^2 A}
= \frac{\cos^2 A - \sin^2 A}{\cos^2 A + \sin^2 A}
= \frac{\cos^2 A - \sin^2 A}{1}
= \cos 2A.
$$
</details>

**4.** Prove that $\tan A + \cot A \equiv 2\operatorname{cosec} 2A$ for
$\sin A\cos A \neq 0$.

<details markdown="1">
<summary>Hint</summary>

Write both terms as fractions over the common denominator $\sin A\cos A$.
</details>

<details markdown="1">
<summary>Next step</summary>

$\dfrac{\sin A}{\cos A} + \dfrac{\cos A}{\sin A} =
\dfrac{\sin^2 A + \cos^2 A}{\sin A\cos A} = \dfrac{1}{\sin A\cos A}$. Now use
$\sin 2A = 2\sin A\cos A$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\tan A + \cot A
= \frac{\sin^2 A + \cos^2 A}{\sin A\cos A}
= \frac{1}{\sin A\cos A}
= \frac{2}{2\sin A\cos A}
= \frac{2}{\sin 2A}
= 2\operatorname{cosec} 2A.
$$
</details>

**5.** Prove that $\cos^4 A - \sin^4 A \equiv \cos 2A$.

<details markdown="1">
<summary>Hint</summary>

The left-hand side is a difference of two squares.
</details>

<details markdown="1">
<summary>Next step</summary>

$\cos^4 A - \sin^4 A = (\cos^2 A - \sin^2 A)(\cos^2 A + \sin^2 A)$. Replace both
brackets.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\cos^4 A - \sin^4 A
= (\cos^2 A - \sin^2 A)(\cos^2 A + \sin^2 A)
= (\cos 2A)(1)
= \cos 2A.
$$
</details>

**6.** Prove that $\sin 3A \equiv 3\sin A - 4\sin^3 A$.

<details markdown="1">
<summary>Hint</summary>

Write $3A = 2A + A$ and use the addition formula for sine, then the double-angle
formulae.
</details>

<details markdown="1">
<summary>Next step</summary>

$\sin 3A = \sin(2A + A) = \sin 2A\cos A + \cos 2A\sin A$. Replace
$\sin 2A = 2\sin A\cos A$ and $\cos 2A = 1 - 2\sin^2 A$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\sin 3A
= \sin 2A\cos A + \cos 2A\sin A
= (2\sin A\cos A)\cos A + (1 - 2\sin^2 A)\sin A.
$$

$$
= 2\sin A\cos^2 A + \sin A - 2\sin^3 A.
$$

Replace $\cos^2 A = 1 - \sin^2 A$:

$$
= 2\sin A(1 - \sin^2 A) + \sin A - 2\sin^3 A
= 2\sin A - 2\sin^3 A + \sin A - 2\sin^3 A
= 3\sin A - 4\sin^3 A.
$$
</details>
