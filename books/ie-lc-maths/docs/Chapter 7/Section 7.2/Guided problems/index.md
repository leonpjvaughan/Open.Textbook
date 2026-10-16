---
title: 7.2 Differentiating powers and polynomials — Practise with help
chapter: 7
chapter_title: Differentiation
section: '7.2'
section_title: Differentiating powers and polynomials
tier: O
refs:
- '5.2'
kind: guided-problems
---

# 7.2 Differentiating powers and polynomials — Practise with help

## Warm-up: remember

1. Write $\dfrac{1}{x^3}$ as a power of $x$.
2. Write $\sqrt[3]{x}$ as a power of $x$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $\dfrac{1}{x^3} = x^{-3}$. A fraction turns a positive power into a negative one.
2. $\sqrt[3]{x} = x^{1/3}$. A root turns into a fractional power, with the root on the
   bottom of the fraction.

</details>

## Practise with help

**1.** Differentiate $y = x^5$.

<details markdown="1">
<summary>Hint</summary>

Multiply by the power and reduce it by one.

<details markdown="1">
<summary>Next step</summary>

$5x^{5 - 1}$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{dy}{dx} = 5x^4$$

The new power is one less than the old power, not the same power.

</details>
</details>
</details>

**2.** Differentiate $y = 4x^3$.

<details markdown="1">
<summary>Hint</summary>

The constant $4$ stays in front.

<details markdown="1">
<summary>Next step</summary>

$4 \times 3x^2$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{dy}{dx} = 12x^2$$

</details>
</details>
</details>

**3.** Differentiate $y = 2x^4 - 3x^2 + 5$.

<details markdown="1">
<summary>Hint</summary>

Differentiate term by term.

<details markdown="1">
<summary>Next step</summary>

The terms give $8x^3$, $-6x$ and $0$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{dy}{dx} = 8x^3 - 6x$$

The constant $5$ has derivative $0$, so it does not appear in the answer.

</details>
</details>
</details>

**4.** Differentiate $y = 7x^2 + x - 9$.

<details markdown="1">
<summary>Hint</summary>

The term $x$ is $x^1$. Use the power rule on it too.

<details markdown="1">
<summary>Next step</summary>

$\dfrac{d}{dx}(7x^2) = 14x$ and $\dfrac{d}{dx}(x) = 1$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{dy}{dx} = 14x + 1$$

The derivative of $-9$ is $0$.

</details>
</details>
</details>

**5.** Differentiate $y = \dfrac{3}{x}$.

<details markdown="1">
<summary>Hint</summary>

Write the fraction as a power first: $\dfrac{3}{x} = 3x^{-1}$.

<details markdown="1">
<summary>Next step</summary>

$3 \times (-1)x^{-2}$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{dy}{dx} = -3x^{-2} = -\frac{3}{x^2}$$

The derivative is negative everywhere, so each branch of the curve falls.

</details>
</details>
</details>

**6.** Differentiate $y = 2\sqrt{x}$.

<details markdown="1">
<summary>Hint</summary>

Write the root as a power: $2x^{1/2}$.

<details markdown="1">
<summary>Next step</summary>

$2 \times \tfrac{1}{2}x^{-1/2}$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{dy}{dx} = x^{-1/2} = \frac{1}{\sqrt{x}}$$

The $2$ and the $\tfrac{1}{2}$ cancel, leaving a neat answer.

</details>
</details>
</details>

**7.** The tank volume is $V(t) = 12t^2 - t^3$ litres. Find $V'(t)$ and work out $V'(4)$.

<details markdown="1">
<summary>Hint</summary>

Differentiate term by term, then substitute $t = 4$.

<details markdown="1">
<summary>Next step</summary>

$V'(t) = 24t - 3t^2$, so $V'(4) = 24(4) - 3(16)$.

<details markdown="1">
<summary>Full working</summary>

$$V'(t) = 24t - 3t^2 \qquad V'(4) = 96 - 48 = 48$$

The rate is $48$ litres per minute at $t = 4$. This matches the estimate of $47.99$ from
Section 7.1.

</details>
</details>
</details>

## A question from Chapter 6

**8.** The number of bacteria in a dish after $t$ hours is modelled by
$N(t) = 200(1.5)^t$. Work out the number at $t = 2$ and at $t = 3$.

<details markdown="1">
<summary>Hint</summary>

Substitute the two values of $t$ into the rule.

<details markdown="1">
<summary>Next step</summary>

$N(2) = 200(1.5)^2$ and $N(3) = 200(1.5)^3$.

<details markdown="1">
<summary>Full working</summary>

$$N(2) = 200(2.25) = 450 \qquad N(3) = 200(3.375) = 675$$

The number grew by $225$ in the third hour, an average of $225$ per hour. That is a rate of
change, and differentiating the rule would give the instantaneous rate instead.

</details>
</details>
</details>
