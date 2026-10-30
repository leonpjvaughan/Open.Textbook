---
title: 7.3 Differentiating x^n, e^kx, a^kx, sin kx, cos kx, tan kx and ln x — Practise with help
chapter: 7
chapter_title: Differentiation
section: '7.3'
section_title: Differentiating x^n, e^kx, a^kx, sin kx, cos kx, tan kx and ln x
refs:
- G2
kind: guided-problems
---

# 7.3 Differentiating powers, exponentials, trigonometric functions and logarithms — Practise with help

Work each question closed book first. Before you differentiate, rewrite every
root and every fraction as a power of $x$.

## Warm-up: remember

1. Write $\sqrt{x}$ as a power of $x$.
2. Write $\dfrac{1}{x^4}$ as a power of $x$.
3. Simplify $\left(x^{1/2}\right)^2$.

<details markdown="1">
<summary>Answers</summary>

1. $\sqrt{x} = x^{1/2}$.
2. $\dfrac{1}{x^4} = x^{-4}$.
3. $\left(x^{1/2}\right)^2 = x^{1} = x$.

If any of these was hard, revise the laws of indices in Chapter 2 before you
continue.
</details>

:::figure warm-up-gate


## Practise with help

**1.** Differentiate $y = 6x^5$.

<details markdown="1">
<summary>Hint</summary>

Multiply by the old power, which is $6 \times 5$, then reduce the power by one.
</details>

<details markdown="1">
<summary>Next step</summary>

Write $\dfrac{dy}{dx} = 6 \times 5x^4$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dy}{dx} = 30x^4.
$$

The power has fallen from $5$ to $4$, and the coefficient has grown from $6$ to
$30$.
</details>

**2.** Differentiate $y = x^{1/3}$.

<details markdown="1">
<summary>Hint</summary>

The power is the fraction $n = \dfrac{1}{3}$. Apply $n x^{n-1}$.
</details>

<details markdown="1">
<summary>Next step</summary>

Write the coefficient as $\dfrac{1}{3}$ and the new power as
$\dfrac{1}{3} - 1 = -\dfrac{2}{3}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dy}{dx} = \tfrac{1}{3}x^{-2/3} = \frac{1}{3x^{2/3}}.
$$

The power is negative, so the derivative can be written as a fraction.
</details>

**3.** Differentiate $y = \dfrac{3}{x^2}$.

<details markdown="1">
<summary>Hint</summary>

First rewrite the expression as $3x^{-2}$. Then differentiate term by term.
</details>

<details markdown="1">
<summary>Next step</summary>

The coefficient is $3 \times (-2) = -6$, and the new power is $-2 - 1 = -3$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
y = 3x^{-2},
\qquad
\frac{dy}{dx} = -6x^{-3} = -\frac{6}{x^3}.
$$

The derivative is negative for every $x \neq 0$, so the curve falls in each of
its two branches.
</details>

**4.** Differentiate $y = 4e^{2x} + \sin 3x$.

<details markdown="1">
<summary>Hint</summary>

Differentiate each term with its own standard result. The constant in the
exponent, and the constant inside the sine, both come to the front.
</details>

<details markdown="1">
<summary>Next step</summary>

For $e^{2x}$ the factor is $2$, giving $8e^{2x}$. For $\sin 3x$ the factor is
$3$, giving $3\cos 3x$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dy}{dx} = 4 \times 2e^{2x} + 3\cos 3x = 8e^{2x} + 3\cos 3x.
$$

</details>

**5.** Differentiate $y = \cos 4x - 2\ln x$.

<details markdown="1">
<summary>Hint</summary>

The derivative of $\cos 4x$ carries a minus sign. The derivative of $\ln x$ is
$\dfrac{1}{x}$, and the $2$ multiplies it.
</details>

<details markdown="1">
<summary>Next step</summary>

The first term gives $-4\sin 4x$. The second gives $-\dfrac{2}{x}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dy}{dx} = -4\sin 4x - \frac{2}{x}.
$$

Both terms are negative here, but for different reasons: one from the cosine
rule, and one from the minus sign already in the expression.
</details>

**6.** A student writes that the derivative of $y = e^{5x}$ is $e^{5x}$. Explain
the mistake and give the correct answer.

<details markdown="1">
<summary>Hint</summary>

Compare $e^{5x}$ with $e^x$. What extra factor appears when the exponent is
$5x$ instead of $x$?
</details>

<details markdown="1">
<summary>Next step</summary>

The derivative keeps the same exponential but gains a factor equal to the
constant in the exponent.
</details>

<details markdown="1">
<summary>Full working</summary>

The student forgot the constant in the exponent. The correct derivative is

$$
\frac{dy}{dx} = 5e^{5x}.
$$

A quick check: the graph of $e^{5x}$ climbs five times as fast as the graph of
$e^x$, so its gradient is five times as large at every $x$.
</details>
