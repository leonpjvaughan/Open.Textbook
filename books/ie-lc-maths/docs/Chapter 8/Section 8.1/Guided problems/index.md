---
title: 8.1 Antiderivatives — Practise with help
chapter: 8
chapter_title: Integration
section: '8.1'
section_title: Antiderivatives
tier: O
refs:
- '5.2'
kind: guided-problems
---

# 8.1 Antiderivatives — Practise with help

## Warm-up: remember

1. Differentiate $y = x^6$.
2. Differentiate $y = 4x^3 - 2x$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $\dfrac{dy}{dx} = 6x^5$. The power comes down in front and drops by one.
2. $\dfrac{dy}{dx} = 12x^2 - 2$. The constant $-2$ came from $-2x$, and the derivative of
   the $4x^3$ term is $12x^2$.

Integration reverses exactly these moves, so keep both answers.

</details>

:::figure warm-up-gate


## Practise with help

**1.** Find $\displaystyle\int x^4\,dx$.

<details markdown="1">
<summary>Hint</summary>

Raise the power by one, then divide by the new power.

<details markdown="1">
<summary>Next step</summary>

The new power is $5$, so divide by $5$.

<details markdown="1">
<summary>Full working</summary>

$$\int x^4\,dx = \frac{x^5}{5} + C$$

Check by differentiating: the derivative of $\dfrac{x^5}{5}$ is $x^4$. Correct.

</details>
</details>
</details>

**2.** Find $\displaystyle\int 6x^2\,dx$.

<details markdown="1">
<summary>Hint</summary>

The constant $6$ stays outside the integral.

<details markdown="1">
<summary>Next step</summary>

$\displaystyle\int x^2\,dx = \frac{x^3}{3}$, so multiply by $6$.

<details markdown="1">
<summary>Full working</summary>

$$\int 6x^2\,dx = 6 \times \frac{x^3}{3} + C = 2x^3 + C$$

</details>
</details>
</details>

**3.** Find $\displaystyle\int (3x^2 + 2x - 1)\,dx$.

<details markdown="1">
<summary>Hint</summary>

Integrate each of the three terms separately.

<details markdown="1">
<summary>Next step</summary>

The terms integrate to $x^3$, $x^2$ and $-x$.

<details markdown="1">
<summary>Full working</summary>

$$\int (3x^2 + 2x - 1)\,dx = 3 \times \frac{x^3}{3} + 2 \times \frac{x^2}{2} - x + C
= x^3 + x^2 - x + C$$

One constant covers the whole sum. Three separate constants would only combine into one.

</details>
</details>
</details>

**4.** Find $\displaystyle\int \frac{1}{x^3}\,dx$.

<details markdown="1">
<summary>Hint</summary>

Write the fraction as a power first.

<details markdown="1">
<summary>Next step</summary>

$\dfrac{1}{x^3} = x^{-3}$, so the new power is $-2$.

<details markdown="1">
<summary>Full working</summary>

$$\int x^{-3}\,dx = \frac{x^{-2}}{-2} + C = -\frac{1}{2x^2} + C$$

Dividing by $-2$ puts the $2$ under the fraction. The answer is negative because the
original power was below $-1$.

</details>
</details>
</details>

**5.** Find $\displaystyle\int \frac{1}{\sqrt{x}}\,dx$.

<details markdown="1">
<summary>Hint</summary>

Write the root as a power: $\dfrac{1}{\sqrt{x}} = x^{-1/2}$.

<details markdown="1">
<summary>Next step</summary>

Add one to $-\dfrac{1}{2}$ to get $\dfrac{1}{2}$, then divide by $\dfrac{1}{2}$.

<details markdown="1">
<summary>Full working</summary>

$$\int x^{-1/2}\,dx = \frac{x^{1/2}}{1/2} + C = 2x^{1/2} + C = 2\sqrt{x} + C$$

Dividing by $\dfrac{1}{2}$ multiplies by $2$.

</details>
</details>
</details>

**6.** The gradient of a curve is $\dfrac{dy}{dx} = 4x^3$, and the curve passes through
$(1, 2)$. Find the equation of the curve.

<details markdown="1">
<summary>Hint</summary>

Integrate to get $y$, then use the point to find $C$.

<details markdown="1">
<summary>Next step</summary>

$y = x^4 + C$. Substitute $x = 1$ and $y = 2$.

<details markdown="1">
<summary>Full working</summary>

$$y = \int 4x^3\,dx = x^4 + C$$

At $(1, 2)$: $2 = 1 + C$, so $C = 1$. The curve is $y = x^4 + 1$.

</details>
</details>
</details>

**7.** Show that $F(x) = x^3 - x^2 + 5x$ is an antiderivative of
$f(x) = 3x^2 - 2x + 5$.

<details markdown="1">
<summary>Hint</summary>

Differentiate $F$ and see whether you get $f$.

<details markdown="1">
<summary>Next step</summary>

Differentiate term by term: $3x^2$, then $-2x$, then $5$.

<details markdown="1">
<summary>Full working</summary>

$$F'(x) = 3x^2 - 2x + 5 = f(x)$$

So $F$ is an antiderivative of $f$. Differentiating is the check for every integral in this
chapter.

</details>
</details>
</details>

**8.** The chapter problem's tank fills at $r(t) = 12t - 3t^2$ litres per minute, and it is
empty at $t = 0$. Find $V(t)$ and then $V(4)$.

<details markdown="1">
<summary>Hint</summary>

Integrate the rate, then use $V(0) = 0$ to find the constant.

<details markdown="1">
<summary>Next step</summary>

$V(t) = 6t^2 - t^3 + C$, and $V(0) = 0$ gives $C = 0$.

<details markdown="1">
<summary>Full working</summary>

$$V(t) = \int (12t - 3t^2)\,dt = 6t^2 - t^3 + C$$

Since $V(0) = 0$, the constant is zero, so $V(t) = 6t^2 - t^3$. At $t = 4$:

$$V(4) = 6(16) - 64 = 96 - 64 = 32 \text{ litres}$$

The tank holds $32$ litres after four minutes. Section 8.2 gets the same number as the area
under the graph of $r$.

</details>
</details>
</details>

## A question from Chapter 7

**9.** Differentiate $y = (2x + 1)^4$ with the chain rule.

<details markdown="1">
<summary>Hint</summary>

Let $u = 2x + 1$, so $\dfrac{du}{dx} = 2$.

<details markdown="1">
<summary>Next step</summary>

$\dfrac{dy}{du} = 4u^3$, and the chain rule multiplies by $\dfrac{du}{dx}$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{dy}{dx} = 4(2x + 1)^3 \times 2 = 8(2x + 1)^3$$

Read this backwards and you have an integral:

$$\int 8(2x + 1)^3\,dx = (2x + 1)^4 + C$$

Section 8.5 makes that move carefully, and calls it substitution.

</details>
</details>
</details>
