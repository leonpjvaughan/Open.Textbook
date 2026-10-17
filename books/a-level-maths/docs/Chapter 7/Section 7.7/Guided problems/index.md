---
title: 7.7 The product, quotient and chain rules — Practise with help
chapter: 7
chapter_title: Differentiation
section: '7.7'
section_title: The product, quotient and chain rules
refs:
- G4
kind: guided-problems
---

# 7.7 The product, quotient and chain rules — Practise with help

Work each question closed book first. Name the two parts $u$ and $v$ in writing
before you substitute into a rule.

## Warm-up: remember

1. Differentiate $y = \sin 2x$.
2. Differentiate $y = e^{5x}$.
3. Differentiate $y = x^4$.

<details markdown="1">
<summary>Answers</summary>

1. $\dfrac{dy}{dx} = 2\cos 2x$.
2. $\dfrac{dy}{dx} = 5e^{5x}$.
3. $\dfrac{dy}{dx} = 4x^3$.

If question 2 was hard, revise the standard derivatives in Section 7.3.
</details>

:::figure warm-up-gate


## Practise with help

**1.** Differentiate $y = x^3\cos x$ with the product rule.

<details markdown="1">
<summary>Hint</summary>

Take $u = x^3$ and $v = \cos x$, so $\dfrac{du}{dx} = 3x^2$ and
$\dfrac{dv}{dx} = -\sin x$.
</details>

<details markdown="1">
<summary>Next step</summary>

Write $u\dfrac{dv}{dx} + v\dfrac{du}{dx} = x^3(-\sin x) + (\cos x)(3x^2)$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dy}{dx} = -x^3\sin x + 3x^2\cos x.
$$

The first term keeps the power and the second keeps the cosine. Both terms
appear, because the product rule has two parts.
</details>

**2.** Differentiate $y = x^2e^{2x}$ with the product rule.

<details markdown="1">
<summary>Hint</summary>

Take $u = x^2$ and $v = e^{2x}$. The derivative of $v$ is $2e^{2x}$, from the
standard result for $e^{kx}$.
</details>

<details markdown="1">
<summary>Next step</summary>

Write $x^2(2e^{2x}) + e^{2x}(2x)$, then take out the common factor $2xe^{2x}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dy}{dx} = 2x^2e^{2x} + 2xe^{2x} = 2xe^{2x}(x + 1).
$$

Taking out the common factor makes the answer tidy, and shows the derivative is
zero only at $x = 0$ and $x = -1$ where the exponential is never zero.
</details>

**3.** Differentiate $y = \dfrac{x}{x + 1}$ with the quotient rule.

<details markdown="1">
<summary>Hint</summary>

Take $u = x$ and $v = x + 1$, so $\dfrac{du}{dx} = 1$ and $\dfrac{dv}{dx} = 1$.
</details>

<details markdown="1">
<summary>Next step</summary>

Write $\dfrac{(x + 1)(1) - x(1)}{(x + 1)^2}$, then simplify the numerator.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dy}{dx} = \frac{(x + 1) - x}{(x + 1)^2} = \frac{1}{(x + 1)^2}.
$$

The numerator simplifies to $1$, so the derivative is always positive and the
curve rises on each side of the break at $x = -1$.
</details>

**4.** Differentiate $y = \dfrac{e^x}{x}$ with the quotient rule.

<details markdown="1">
<summary>Hint</summary>

Take $u = e^x$ and $v = x$. Both derivatives are simple, but the order in the
numerator matters.
</details>

<details markdown="1">
<summary>Next step</summary>

Write $\dfrac{x \times e^x - e^x \times 1}{x^2}$, then take out the common factor
$e^x$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dy}{dx} = \frac{xe^x - e^x}{x^2} = \frac{e^x(x - 1)}{x^2}.
$$

The derivative is zero where $x = 1$, so the curve has a stationary point there.
</details>

**5.** Differentiate $y = (2x - 3)^4$ with the chain rule.

<details markdown="1">
<summary>Hint</summary>

Let $u = 2x - 3$, so $y = u^4$. Then multiply the derivative of the outside by
the derivative of the inside.
</details>

<details markdown="1">
<summary>Next step</summary>

$\dfrac{dy}{du} = 4u^3$ and $\dfrac{du}{dx} = 2$, so the product is
$4(2x - 3)^3 \times 2$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dy}{dx} = 4(2x - 3)^3 \times 2 = 8(2x - 3)^3.
$$

The inside derivative $2$ appears in front. Leaving it out would give an answer
that is too small by a factor of $2$.
</details>

**6.** Differentiate $y = \cos(3x^2)$ with the chain rule.

<details markdown="1">
<summary>Hint</summary>

The outside function is cosine and the inside function is $3x^2$. Remember the
minus sign in the derivative of cosine.
</details>

<details markdown="1">
<summary>Next step</summary>

$\dfrac{dy}{dx} = -\sin(3x^2) \times \dfrac{d}{dx}(3x^2)$. Differentiate the
inside next.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dy}{dx} = -\sin(3x^2) \times 6x = -6x\sin(3x^2).
$$

Both the minus sign from the cosine and the inside derivative $6x$ appear in the
answer.
</details>
