---
title: 7.5 The chain rule — Practise with help
chapter: 7
chapter_title: Differentiation
section: '7.5'
section_title: The chain rule
tier: O
refs:
- '5.2'
kind: guided-problems
---

# 7.5 The chain rule — Practise with help

## Warm-up: remember

1. Differentiate $y = x^4$.
2. Differentiate $y = 3x + 1$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $\dfrac{dy}{dx} = 4x^3$.
2. $\dfrac{dy}{dx} = 3$.

These are the two pieces of every chain-rule calculation on a power of a linear
expression: the outer power and the inner gradient.

</details>

## Practise with help

**1.** Differentiate $y = (x + 1)^4$.

<details markdown="1">
<summary>Hint</summary>

Let $u = x + 1$, so $\dfrac{du}{dx} = 1$.

<details markdown="1">
<summary>Next step</summary>

The outer derivative is $4(x + 1)^3$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{dy}{dx} = 4(x + 1)^3 \times 1 = 4(x + 1)^3$$

Here the inner derivative is $1$, so the answer looks like the power rule alone.

</details>
</details>
</details>

**2.** Differentiate $y = (2x + 1)^3$.

<details markdown="1">
<summary>Hint</summary>

The inner derivative is $2$.

<details markdown="1">
<summary>Next step</summary>

$3(2x + 1)^2 \times 2$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{dy}{dx} = 6(2x + 1)^2$$

Expanding first gives $8x^3 + 12x^2 + 6x + 1$, whose derivative is
$24x^2 + 24x + 6 = 6(2x + 1)^2$, the same answer.

</details>
</details>
</details>

**3.** Differentiate $y = (3x - 2)^4$.

<details markdown="1">
<summary>Hint</summary>

The inner derivative is $3$.

<details markdown="1">
<summary>Next step</summary>

$4(3x - 2)^3 \times 3$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{dy}{dx} = 12(3x - 2)^3$$

</details>
</details>
</details>

**4.** Differentiate $y = (x^2 + 3)^2$.

<details markdown="1">
<summary>Hint</summary>

The inner function is $x^2 + 3$, so $\dfrac{du}{dx} = 2x$.

<details markdown="1">
<summary>Next step</summary>

$2(x^2 + 3) \times 2x$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{dy}{dx} = 4x(x^2 + 3) = 4x^3 + 12x$$

Expanding first gives $x^4 + 6x^2 + 9$, whose derivative is $4x^3 + 12x$.

</details>
</details>
</details>

**5.** Differentiate $y = \sqrt{2x + 5}$.

<details markdown="1">
<summary>Hint</summary>

Write $y = (2x + 5)^{1/2}$.

<details markdown="1">
<summary>Next step</summary>

$\tfrac{1}{2}(2x + 5)^{-1/2} \times 2$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{dy}{dx} = \frac{1}{\sqrt{2x + 5}}$$

The $\tfrac{1}{2}$ and the inner derivative $2$ cancel.

</details>
</details>
</details>

**6.** Differentiate $y = (1 - 5x)^3$.

<details markdown="1">
<summary>Hint</summary>

The inner derivative is $-5$. Keep the sign.

<details markdown="1">
<summary>Next step</summary>

$3(1 - 5x)^2 \times (-5)$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{dy}{dx} = -15(1 - 5x)^2$$

The negative inner derivative makes the whole derivative negative.

</details>
</details>
</details>

**7.** The tank is a cylinder with $V = 4\pi h$. At $t = 4$ minutes the volume is rising at
$48$ litres per minute. Work out $\dfrac{dh}{dt}$ at that instant.

<details markdown="1">
<summary>Hint</summary>

Use $\dfrac{dV}{dt} = \dfrac{dV}{dh} \times \dfrac{dh}{dt}$ with $\dfrac{dV}{dh} = 4\pi$.

<details markdown="1">
<summary>Next step</summary>

$48 = 4\pi \times \dfrac{dh}{dt}$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{dh}{dt} = \frac{48}{4\pi} = \frac{12}{\pi}$$

The height rises at about $3.82$ units per minute at that instant.

</details>
</details>
</details>

## A question from Chapter 6

**8.** For $f(x) = x^2 + 1$ and $g(x) = 3x - 2$, work out $f(g(x))$ and then differentiate
it with respect to $x$.

<details markdown="1">
<summary>Hint</summary>

Substitute $g(x)$ into $f$ first, then differentiate.

<details markdown="1">
<summary>Next step</summary>

$f(g(x)) = (3x - 2)^2 + 1 = 9x^2 - 12x + 5$.

<details markdown="1">
<summary>Full working</summary>

The composite is $f(g(x)) = (3x - 2)^2 + 1 = 9x^2 - 12x + 4 + 1 = 9x^2 - 12x + 5$. Its
derivative is

$$\frac{d}{dx}\left(9x^2 - 12x + 5\right) = 18x - 12$$

The chain rule gives the same value: $2(3x - 2) \times 3 = 18x - 12$. Chapter 6 built the
composite, and this section differentiates it.

</details>
</details>
</details>
