---
title: 8.5 Integration by substitution and by parts — Practise with help
chapter: 8
chapter_title: Integration
section: '8.5'
section_title: Integration by substitution and by parts
refs:
- H5
kind: guided-problems
---

# 8.5 Integration by substitution and by parts — Practise with help

Work each question closed book first. For a substitution, write $u$ and $du$
before you change the integral. For parts, write $u$ and $\dfrac{dv}{dx}$.

## Warm-up: remember

1. Differentiate $y = (x^2 + 1)^4$.
2. Differentiate $y = xe^{2x}$.
3. Find $\displaystyle\int e^{3x}dx$.

<details markdown="1">
<summary>Answers</summary>

1. $\dfrac{dy}{dx} = 4(x^2 + 1)^3 \times 2x = 8x(x^2 + 1)^3$.
2. $\dfrac{dy}{dx} = e^{2x} + 2xe^{2x} = e^{2x}(1 + 2x)$.
3. $\dfrac{1}{3}e^{3x} + C$.

Here $C$ is the constant of integration.

If question 1 was hard, revise the chain rule in Section 7.7.
</details>

:::figure warm-up-gate


## Practise with help

**1.** Find $\displaystyle\int 2x(x^2 + 1)^4dx$.

<details markdown="1">
<summary>Hint</summary>

Let $u = x^2 + 1$. What is $du$? Look for $2xdx$ in the integral.
</details>

<details markdown="1">
<summary>Next step</summary>

With $u = x^2 + 1$, $du = 2xdx$. The integral becomes
$\displaystyle\int u^4du$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\int u^4du = \frac{u^5}{5} + C.
$$

Substitute back:

$$
\int 2x(x^2 + 1)^4dx = \frac{(x^2 + 1)^5}{5} + C.
$$

Check by differentiating the answer with the chain rule.
</details>

**2.** Find $\displaystyle\int 3x^2e^{x^3}dx$.

<details markdown="1">
<summary>Hint</summary>

The derivative of $x^3$ is $3x^2$, which appears in the integral. Let $u = x^3$.
</details>

<details markdown="1">
<summary>Next step</summary>

$du = 3x^2dx$, so the integral becomes $\displaystyle\int e^udu$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\int e^udu = e^u + C = e^{x^3} + C.
$$

The substitution removes the $3x^2$ and leaves the standard exponential
integral.
</details>

**3.** Find $\displaystyle\int \frac{2x}{x^2 + 1}dx$.

<details markdown="1">
<summary>Hint</summary>

Let $u = x^2 + 1$. The top is the derivative of the bottom, which points to a
logarithm.
</details>

<details markdown="1">
<summary>Next step</summary>

$du = 2xdx$, so the integral becomes $\displaystyle\int \frac{1}{u}du$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\int \frac{1}{u}du = \ln u + C = \ln(x^2 + 1) + C.
$$

The quadratic is always positive, so the logarithm is defined for every $x$.
</details>

**4.** Find $\displaystyle\int xe^{2x}dx$ using integration by parts.

<details markdown="1">
<summary>Hint</summary>

Take $u = x$, so that differentiating removes the $x$. Take
$\dfrac{dv}{dx} = e^{2x}$.
</details>

<details markdown="1">
<summary>Next step</summary>

$\dfrac{du}{dx} = 1$ and $v = \dfrac{1}{2}e^{2x}$. Write
$uv - \displaystyle\int v\frac{du}{dx}dx$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\int xe^{2x}dx = x \times \frac{1}{2}e^{2x} - \int \frac{1}{2}e^{2x}dx
= \frac{1}{2}xe^{2x} - \frac{1}{4}e^{2x} + C
= \frac{e^{2x}(2x - 1)}{4} + C.
$$

The second integral is simpler than the first because the $x$ is gone.
</details>

**5.** Find $\displaystyle\int x\cos xdx$ using integration by parts.

<details markdown="1">
<summary>Hint</summary>

Take $u = x$ and $\dfrac{dv}{dx} = \cos x$. The integral of cosine is sine.
</details>

<details markdown="1">
<summary>Next step</summary>

$\dfrac{du}{dx} = 1$ and $v = \sin x$. Write
$uv - \displaystyle\int vdu$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\int x\cos xdx = x\sin x - \int \sin xdx = x\sin x + \cos x + C.
$$

The minus sign in the formula turns $-\sin x$ into $+\cos x$ after integration.
</details>

**6.** Find $\displaystyle\int x^2e^xdx$.

<details markdown="1">
<summary>Hint</summary>

Apply integration by parts with $u = x^2$. The new integral still contains $x$,
so parts is needed a second time.
</details>

<details markdown="1">
<summary>Next step</summary>

With $u = x^2$ and $v = e^x$,
$\displaystyle\int x^2e^xdx = x^2e^x - 2\int xe^xdx$. Now find
$\displaystyle\int xe^xdx$.
</details>

<details markdown="1">
<summary>Full working</summary>

The second integral is

$$
\int xe^xdx = xe^x - \int e^xdx = xe^x - e^x.
$$

Substitute this back:

$$
\int x^2e^xdx = x^2e^x - 2\left(xe^x - e^x\right) + C
= e^x\left(x^2 - 2x + 2\right) + C.
$$

Apply parts twice whenever the power of $x$ is greater than one.
</details>
