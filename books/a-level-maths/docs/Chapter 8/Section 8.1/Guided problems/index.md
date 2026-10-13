---
title: 8.1 The Fundamental Theorem of Calculus and standard integrals — Practise with
  help
chapter: 8
chapter_title: Integration
section: '8.1'
section_title: The Fundamental Theorem of Calculus and standard integrals
refs:
- H1
- H2
kind: guided-problems
---

# 8.1 The Fundamental Theorem of Calculus and standard integrals — Practise with help

Work each question closed book first. Check every indefinite integral by
differentiating your answer.

## Warm-up: remember

1. Differentiate $y = x^5$.
2. Differentiate $y = e^{4x}$.
3. Differentiate $y = \sin 3x$.

<details markdown="1">
<summary>Answers</summary>

1. $\dfrac{dy}{dx} = 5x^4$.
2. $\dfrac{dy}{dx} = 4e^{4x}$.
3. $\dfrac{dy}{dx} = 3\cos 3x$.

If question 3 was hard, revise the standard derivatives in Section 7.3.
</details>

## Practise with help

**1.** Find $\displaystyle\int x^4dx$.

<details markdown="1">
<summary>Hint</summary>

Use the power rule for integration. The new power is one more than $4$.
</details>

<details markdown="1">
<summary>Next step</summary>

Write $\dfrac{x^5}{5}$, then add the constant of integration.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\int x^4dx = \frac{x^5}{5} + C.
$$

Check by differentiating: the derivative of $\dfrac{x^5}{5}$ is $x^4$.
</details>

**2.** Find $\displaystyle\int \left(3x^2 + 2x\right)dx$.

<details markdown="1">
<summary>Hint</summary>

Integrate each term separately. The constant of integration is added once, at
the end.
</details>

<details markdown="1">
<summary>Next step</summary>

The first term gives $3 \times \dfrac{x^3}{3} = x^3$, and the second gives
$2 \times \dfrac{x^2}{2} = x^2$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\int \left(3x^2 + 2x\right)dx = x^3 + x^2 + C.
$$

Check by differentiating: $3x^2 + 2x$, which matches the original expression.
</details>

**3.** Find $\displaystyle\int \frac{1}{x^3}dx$.

<details markdown="1">
<summary>Hint</summary>

Write the fraction as a power of $x$ before you integrate.
</details>

<details markdown="1">
<summary>Next step</summary>

$\dfrac{1}{x^3} = x^{-3}$. Raise the power to $-2$ and divide by $-2$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\int x^{-3}dx = \frac{x^{-2}}{-2} + C = -\frac{1}{2x^2} + C.
$$

Leaving the answer as $x^{-3}$ integrated without changing the sign gives a
function whose derivative is wrong. Check the sign by differentiating.
</details>

**4.** Find $\displaystyle\int \left(e^{5x} - \sin 2x\right)dx$.

<details markdown="1">
<summary>Hint</summary>

Each term needs a factor of $\dfrac{1}{k}$. Here $k = 5$ for the exponential and
$k = 2$ for the sine.
</details>

<details markdown="1">
<summary>Next step</summary>

The exponential integrates to $\dfrac{1}{5}e^{5x}$. The sine integrates to
$-\dfrac{1}{2}\cos 2x$, keeping the minus sign from the original expression.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\int \left(e^{5x} - \sin 2x\right)dx
= \frac{1}{5}e^{5x} + \frac{1}{2}\cos 2x + C.
$$

The integral of $-\sin 2x$ is $+\dfrac{1}{2}\cos 2x$. Check the sign by
differentiating the answer.
</details>

**5.** Find $\displaystyle\int \left(6\sqrt{x} + \frac{2}{x}\right)dx$.

<details markdown="1">
<summary>Hint</summary>

Write $\sqrt{x}$ as $x^{1/2}$. The second term matches the standard integral of
$\dfrac{1}{x}$.
</details>

<details markdown="1">
<summary>Next step</summary>

$6x^{1/2}$ integrates to $6 \times \dfrac{x^{3/2}}{3/2} = 6 \times
\dfrac{2}{3}x^{3/2}$, which simplifies to $4x^{3/2}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\int \left(6x^{1/2} + \frac{2}{x}\right)dx = 4x^{3/2} + 2\ln x + C.
$$

The constant multiple $2$ stays with the logarithm. You can also write
$4x\sqrt{x}$ for the first term.
</details>

**6.** The gradient of a curve is $\dfrac{dy}{dx} = 4x - 3$, and the curve
passes through the point $(2, 5)$. Find the equation of the curve.

<details markdown="1">
<summary>Hint</summary>

Integrate to get $y$ with a constant $C$, then substitute the coordinates of the
given point.
</details>

<details markdown="1">
<summary>Next step</summary>

$y = 2x^2 - 3x + C$. Substitute $x = 2$ and $y = 5$ to find $C$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
y = \int (4x - 3)dx = 2x^2 - 3x + C.
$$

At the point $(2, 5)$:

$$
5 = 2(2)^2 - 3(2) + C = 8 - 6 + C = 2 + C,
\qquad
C = 3.
$$

The curve is $y = 2x^2 - 3x + 3$.
</details>
