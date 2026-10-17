---
title: 8.5 Integration by substitution — Practise with help
chapter: 8
chapter_title: Integration
section: '8.5'
section_title: Integration by substitution
tier: H
refs:
- '5.2'
kind: guided-problems
---

# 8.5 Integration by substitution — Practise with help

## Warm-up: remember

1. Differentiate $y = (x^2 + 1)^4$.
2. Differentiate $y = \sin 3x$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $\dfrac{dy}{dx} = 4(x^2 + 1)^3 \times 2x = 8x(x^2 + 1)^3$. The chain rule multiplies by
   the derivative of the inside.
2. $\dfrac{dy}{dx} = 3\cos 3x$.

Both derivatives are the integrands you are about to meet. Reading a chain-rule result
backwards is what a substitution does.

</details>

:::figure warm-up-gate


## Practise with help

**1.** Find $\displaystyle\int 2x(x^2 + 1)^3\,dx$.

<details markdown="1">
<summary>Hint</summary>

Let $u = x^2 + 1$, because its derivative $2x$ is already in the integrand.

<details markdown="1">
<summary>Next step</summary>

$du = 2x\,dx$, so the integral becomes $\displaystyle\int u^3\,du$.

<details markdown="1">
<summary>Full working</summary>

$$\int 2x(x^2 + 1)^3\,dx = \int u^3\,du = \frac{u^4}{4} + C
= \frac{(x^2 + 1)^4}{4} + C$$

</details>
</details>
</details>

**2.** Find $\displaystyle\int 6x(3x^2 + 1)^2\,dx$.

<details markdown="1">
<summary>Hint</summary>

Let $u = 3x^2 + 1$. Its derivative is $6x$.

<details markdown="1">
<summary>Next step</summary>

$du = 6x\,dx$, so the integral becomes $\displaystyle\int u^2\,du$.

<details markdown="1">
<summary>Full working</summary>

$$\int 6x(3x^2 + 1)^2\,dx = \int u^2\,du = \frac{u^3}{3} + C
= \frac{(3x^2 + 1)^3}{3} + C$$

</details>
</details>
</details>

**3.** Find $\displaystyle\int (2x + 1)^5\,dx$.

<details markdown="1">
<summary>Hint</summary>

Let $u = 2x + 1$, so $du = 2\,dx$ and $dx = \dfrac{1}{2}du$.

<details markdown="1">
<summary>Next step</summary>

The integral becomes $\dfrac{1}{2}\displaystyle\int u^5\,du$.

<details markdown="1">
<summary>Full working</summary>

$$\int (2x + 1)^5\,dx = \frac{1}{2} \times \frac{u^6}{6} + C
= \frac{(2x + 1)^6}{12} + C$$

The factor $\dfrac{1}{2}$ comes from $du = 2\,dx$. Do not leave it out.

</details>
</details>
</details>

**4.** Find $\displaystyle\int x\sqrt{x^2 + 4}\,dx$.

<details markdown="1">
<summary>Hint</summary>

Let $u = x^2 + 4$, so $du = 2x\,dx$ and $x\,dx = \dfrac{1}{2}du$.

<details markdown="1">
<summary>Next step</summary>

$\sqrt{x^2 + 4} = u^{1/2}$, so the integral becomes
$\dfrac{1}{2}\displaystyle\int u^{1/2}\,du$.

<details markdown="1">
<summary>Full working</summary>

$$\int x\sqrt{x^2 + 4}\,dx = \frac{1}{2} \times \frac{2}{3}u^{3/2} + C
= \frac{1}{3}(x^2 + 4)^{3/2} + C$$

</details>
</details>
</details>

**5.** Find $\displaystyle\int \sin 3x\,dx$ by substituting $u = 3x$.

<details markdown="1">
<summary>Hint</summary>

$du = 3\,dx$, so $dx = \dfrac{1}{3}du$.

<details markdown="1">
<summary>Next step</summary>

The integral becomes $\dfrac{1}{3}\displaystyle\int \sin u\,du$.

<details markdown="1">
<summary>Full working</summary>

$$\int \sin 3x\,dx = \frac{1}{3}(-\cos u) + C = -\frac{1}{3}\cos 3x + C$$

</details>
</details>
</details>

**6.** Evaluate $\displaystyle\int_0^1 2x(x^2 + 1)^3\,dx$.

<details markdown="1">
<summary>Hint</summary>

Let $u = x^2 + 1$. The limits change: $x = 0$ gives $u = 1$, and $x = 1$ gives $u = 2$.

<details markdown="1">
<summary>Next step</summary>

The integral becomes $\displaystyle\int_1^2 u^3\,du$.

<details markdown="1">
<summary>Full working</summary>

$$\int_0^1 2x(x^2 + 1)^3\,dx = \int_1^2 u^3\,du
= \left[\frac{u^4}{4}\right]_1^2 = 4 - \frac{1}{4} = \frac{15}{4}$$

Changing the limits means you never substitute back to $x$.

</details>
</details>
</details>

**7.** A second tank fills at $r(t) = 4t(t^2 + 1)^3$ litres per minute. Find the volume that
enters between $t = 0$ and $t = 1$ minute.

<details markdown="1">
<summary>Hint</summary>

Let $u = t^2 + 1$. Then $du = 2t\,dt$, so $4t\,dt = 2\,du$.

<details markdown="1">
<summary>Next step</summary>

The limits become $u = 1$ at $t = 0$ and $u = 2$ at $t = 1$.

<details markdown="1">
<summary>Full working</summary>

$$\int_0^1 4t(t^2 + 1)^3\,dt = 2\int_1^2 u^3\,du
= 2\left[\frac{u^4}{4}\right]_1^2 = 2\left(4 - \frac{1}{4}\right) = \frac{15}{2}$$

The second tank collects $7.5$ litres.

</details>
</details>
</details>

**8.** Explain how you choose the substitution for an integral.

<details markdown="1">
<summary>Hint</summary>

Look for a function inside another function, and for its derivative.

<details markdown="1">
<summary>Next step</summary>

The inner function becomes $u$, and its derivative becomes part of $du$.

<details markdown="1">
<summary>Full working</summary>

Look for an inner function whose derivative also appears in the integrand, up to a constant
multiple. Let that inner function be $u$.

Work out $du$, replace the whole integrand and $dx$ with expressions in $u$, and integrate
in $u$. If the result is simpler than the integral you started with, the choice was good.

</details>
</details>
</details>

## A question from Chapter 7

**9.** Differentiate $y = (3x^2 + 1)^3$.

<details markdown="1">
<summary>Hint</summary>

Use the chain rule with $u = 3x^2 + 1$.

<details markdown="1">
<summary>Next step</summary>

$\dfrac{dy}{du} = 3u^2$ and $\dfrac{du}{dx} = 6x$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{dy}{dx} = 3(3x^2 + 1)^2 \times 6x = 18x(3x^2 + 1)^2$$

Read backwards, this says $\displaystyle\int 18x(3x^2 + 1)^2\,dx = (3x^2 + 1)^3 + C$. The
substitution in question 2 is the same move with a different constant.

</details>
</details>
</details>
