---
title: 5.7 Trigonometric identities — Practise with help
chapter: 5
chapter_title: Trigonometry
section: '5.7'
section_title: Trigonometric identities
dfe:
- E5
kind: guided-problems
---

# 5.7 Trigonometric identities — Practise with help

Start every proof on one side. Write the chain of equals signs downwards, and
change only the side you started with.

## Warm-up: remember

1. Expand $(a + b)^2$.
2. Write $\tan\theta$ as a fraction in terms of sine and cosine.
3. Simplify $\dfrac{x^2}{x}$ for $x \neq 0$.

<details markdown="1">
<summary>Answers</summary>

1. $(a + b)^2 = a^2 + 2ab + b^2$.
2. $\tan\theta = \dfrac{\sin\theta}{\cos\theta}$.
3. $\dfrac{x^2}{x} = x$.

If question 2 was hard, revisit the definition of tangent before you continue.
</details>

## Practise with help

**1.** Prove that $\dfrac{\sin^2\theta}{\sin\theta} \equiv \sin\theta$ for
$\sin\theta \neq 0$.

<details markdown="1">
<summary>Hint</summary>

Cancel one factor of sine from the top and the bottom.
</details>

<details markdown="1">
<summary>Next step</summary>

Write $\dfrac{\sin^2\theta}{\sin\theta} = \dfrac{\sin\theta \times
\sin\theta}{\sin\theta}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{\sin^2\theta}{\sin\theta}
= \frac{\sin\theta \times \sin\theta}{\sin\theta}
= \sin\theta.
$$

The left-hand side becomes the right-hand side, so the identity holds wherever
$\sin\theta \neq 0$.
</details>

**2.** Prove that $\cos\theta\tan\theta \equiv \sin\theta$ for
$\cos\theta \neq 0$.

<details markdown="1">
<summary>Hint</summary>

Replace tangent with $\dfrac{\sin\theta}{\cos\theta}$, then cancel cosine.
</details>

<details markdown="1">
<summary>Next step</summary>

Write $\cos\theta \times \dfrac{\sin\theta}{\cos\theta}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\cos\theta\tan\theta
= \cos\theta \times \frac{\sin\theta}{\cos\theta}
= \sin\theta.
$$
</details>

**3.** Prove that $1 + \tan^2\theta \equiv \sec^2\theta$.

<details markdown="1">
<summary>Hint</summary>

Write the left-hand side in sines and cosines over a common denominator.
</details>

<details markdown="1">
<summary>Next step</summary>

$1 + \dfrac{\sin^2\theta}{\cos^2\theta} =
\dfrac{\cos^2\theta + \sin^2\theta}{\cos^2\theta}$. Now use the first identity
on the numerator.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
1 + \tan^2\theta
= 1 + \frac{\sin^2\theta}{\cos^2\theta}
= \frac{\cos^2\theta + \sin^2\theta}{\cos^2\theta}
= \frac{1}{\cos^2\theta}
= \sec^2\theta.
$$
</details>

**4.** Prove that $(\sin\theta - \cos\theta)^2 \equiv 1 - 2\sin\theta\cos\theta$.

<details markdown="1">
<summary>Hint</summary>

Expand the square, then look for $\sin^2\theta + \cos^2\theta$.
</details>

<details markdown="1">
<summary>Next step</summary>

$(\sin\theta - \cos\theta)^2 = \sin^2\theta - 2\sin\theta\cos\theta +
\cos^2\theta$. Group the two squares.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
(\sin\theta - \cos\theta)^2
= \sin^2\theta - 2\sin\theta\cos\theta + \cos^2\theta
= (\sin^2\theta + \cos^2\theta) - 2\sin\theta\cos\theta
= 1 - 2\sin\theta\cos\theta.
$$
</details>

**5.** Prove that $\dfrac{\cos^2\theta}{1 - \sin\theta} \equiv 1 + \sin\theta$
for $\sin\theta \neq 1$.

<details markdown="1">
<summary>Hint</summary>

Replace $\cos^2\theta$ with $1 - \sin^2\theta$, then factorise the top as a
difference of two squares.
</details>

<details markdown="1">
<summary>Next step</summary>

$1 - \sin^2\theta = (1 - \sin\theta)(1 + \sin\theta)$. Cancel one factor of
$1 - \sin\theta$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{\cos^2\theta}{1 - \sin\theta}
= \frac{1 - \sin^2\theta}{1 - \sin\theta}
= \frac{(1 - \sin\theta)(1 + \sin\theta)}{1 - \sin\theta}
= 1 + \sin\theta.
$$
</details>

**6.** Prove that $\sec^2\theta + \operatorname{cosec}^2\theta \equiv
\sec^2\theta\,\operatorname{cosec}^2\theta$ for $\sin\theta\cos\theta \neq 0$.

<details markdown="1">
<summary>Hint</summary>

Write both sides in sines and cosines. The right-hand side is simpler than it
looks.
</details>

<details markdown="1">
<summary>Next step</summary>

The right-hand side is $\dfrac{1}{\cos^2\theta\sin^2\theta}$. On the left, put
the two fractions over the common denominator $\cos^2\theta\sin^2\theta$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\sec^2\theta + \operatorname{cosec}^2\theta
= \frac{1}{\cos^2\theta} + \frac{1}{\sin^2\theta}
= \frac{\sin^2\theta + \cos^2\theta}{\cos^2\theta\sin^2\theta}
= \frac{1}{\cos^2\theta\sin^2\theta}
= \sec^2\theta\,\operatorname{cosec}^2\theta.
$$
</details>
