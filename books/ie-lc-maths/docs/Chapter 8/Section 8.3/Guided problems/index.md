---
title: 8.3 The fundamental theorem of calculus — Practise with help
chapter: 8
chapter_title: Integration
section: '8.3'
section_title: The fundamental theorem of calculus
tier: H
refs:
- '5.2'
kind: guided-problems
---

# 8.3 The fundamental theorem of calculus — Practise with help

## Warm-up: remember

1. Differentiate $y = e^{3x}$.
2. Differentiate $y = \sin 2x$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $\dfrac{dy}{dx} = 3e^{3x}$. The factor $3$ appears because the exponent is $3x$.
2. $\dfrac{dy}{dx} = 2\cos 2x$. The chain rule brings down the $2$.

Both factors come back in this section, but upside down. When you integrate, the same factor
divides instead of multiplying.

</details>

:::figure warm-up-gate


## Practise with help

**1.** Find $\displaystyle\int e^{3x}\,dx$.

<details markdown="1">
<summary>Hint</summary>

Differentiating $e^{3x}$ multiplies by $3$, so integrating divides by $3$.

<details markdown="1">
<summary>Next step</summary>

Write $\dfrac{1}{3}e^{3x}$ and add the constant.

<details markdown="1">
<summary>Full working</summary>

$$\int e^{3x}\,dx = \frac{1}{3}e^{3x} + C$$

Check: the derivative of $\dfrac{1}{3}e^{3x}$ is $\dfrac{1}{3} \times 3e^{3x} = e^{3x}$.

</details>
</details>
</details>

**2.** Find $\displaystyle\int \sin 2x\,dx$.

<details markdown="1">
<summary>Hint</summary>

The derivative of $\cos 2x$ is $-2\sin 2x$.

<details markdown="1">
<summary>Next step</summary>

So the integral is negative and divided by $2$.

<details markdown="1">
<summary>Full working</summary>

$$\int \sin 2x\,dx = -\frac{1}{2}\cos 2x + C$$

</details>
</details>
</details>

**3.** Find $\displaystyle\int \cos 4x\,dx$.

<details markdown="1">
<summary>Hint</summary>

The derivative of $\sin 4x$ is $4\cos 4x$.

<details markdown="1">
<summary>Next step</summary>

Divide by $4$.

<details markdown="1">
<summary>Full working</summary>

$$\int \cos 4x\,dx = \frac{1}{4}\sin 4x + C$$

</details>
</details>
</details>

**4.** Find $\displaystyle\int 2^x\,dx$.

<details markdown="1">
<summary>Hint</summary>

The standard result is $\displaystyle\int a^x\,dx = \frac{a^x}{\ln a} + C$.

<details markdown="1">
<summary>Next step</summary>

Substitute $a = 2$.

<details markdown="1">
<summary>Full working</summary>

$$\int 2^x\,dx = \frac{2^x}{\ln 2} + C$$

The logarithm appears because differentiating $2^x$ brings down $\ln 2$.

</details>
</details>
</details>

**5.** Evaluate $\displaystyle\int_0^{\pi/2} \cos x\,dx$.

<details markdown="1">
<summary>Hint</summary>

An antiderivative of $\cos x$ is $\sin x$.

<details markdown="1">
<summary>Next step</summary>

$\Big[\sin x\Big]_0^{\pi/2} = \sin\dfrac{\pi}{2} - \sin 0$.

<details markdown="1">
<summary>Full working</summary>

$$\int_0^{\pi/2} \cos x\,dx = \Big[\sin x\Big]_0^{\pi/2} = 1 - 0 = 1$$

</details>
</details>
</details>

**6.** Evaluate $\displaystyle\int_1^2 \frac{1}{x}\,dx$, giving an exact answer.

<details markdown="1">
<summary>Hint</summary>

An antiderivative of $\dfrac{1}{x}$ is $\ln x$.

<details markdown="1">
<summary>Next step</summary>

$\Big[\ln x\Big]_1^2 = \ln 2 - \ln 1$.

<details markdown="1">
<summary>Full working</summary>

$$\int_1^2 \frac{1}{x}\,dx = \Big[\ln x\Big]_1^2 = \ln 2 - 0 = \ln 2$$

Leave the answer as $\ln 2$. A decimal would only be an approximation.

</details>
</details>
</details>

**7.** Evaluate $\displaystyle\int_0^1 e^{2x}\,dx$, giving an exact answer.

<details markdown="1">
<summary>Hint</summary>

An antiderivative of $e^{2x}$ is $\dfrac{1}{2}e^{2x}$.

<details markdown="1">
<summary>Next step</summary>

Evaluate at $1$ and at $0$, then subtract.

<details markdown="1">
<summary>Full working</summary>

$$\int_0^1 e^{2x}\,dx = \left[\frac{1}{2}e^{2x}\right]_0^1
= \frac{1}{2}e^2 - \frac{1}{2} = \frac{e^2 - 1}{2}$$

</details>
</details>
</details>

**8.** State the fundamental theorem of calculus, then use it on the chapter problem's tank,
where $r(t) = 12t - 3t^2$ litres per minute.

<details markdown="1">
<summary>Hint</summary>

The theorem says the definite integral is $F(b) - F(a)$ for any antiderivative $F$.

<details markdown="1">
<summary>Next step</summary>

An antiderivative of $r$ is $V(t) = 6t^2 - t^3$.

<details markdown="1">
<summary>Full working</summary>

If $F$ is any antiderivative of $f$, then
$\displaystyle\int_a^b f(x)\,dx = F(b) - F(a)$.

For the tank:

$$\int_0^4 r(t)\,dt = V(4) - V(0) = (96 - 64) - 0 = 32$$

The tank collects $32$ litres. The theorem turns an area problem into two substitutions.

</details>
</details>
</details>

## A question from Chapter 7

**9.** Differentiate $y = \dfrac{1}{2}e^{2x} + \dfrac{1}{3}\sin 3x$.

<details markdown="1">
<summary>Hint</summary>

Differentiate each term with the chain rule.

<details markdown="1">
<summary>Next step</summary>

The derivative of $\dfrac{1}{2}e^{2x}$ is $e^{2x}$. The derivative of $\dfrac{1}{3}\sin 3x$
is $\cos 3x$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{dy}{dx} = e^{2x} + \cos 3x$$

Read it backwards and you have Example 2 of the Learn page. Checking an integral by
differentiating is the habit this section depends on.

</details>
</details>
</details>
