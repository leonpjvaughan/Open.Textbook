---
title: 7.10 Differentiating exponential and trigonometric functions — Practise with help
chapter: 7
chapter_title: Differentiation
section: '7.10'
section_title: Differentiating exponential and trigonometric functions
tier: H
refs:
- '5.2'
kind: guided-problems
---

# 7.10 Differentiating exponential and trigonometric functions — Practise with help

## Warm-up: remember

1. Differentiate $y = e^x$.
2. Differentiate $y = \sin x$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $\dfrac{dy}{dx} = e^x$. The exponential is its own derivative.
2. $\dfrac{dy}{dx} = \cos x$. The gradient of the sine curve follows the cosine curve.

Both are the starting point for every question in this section.

</details>

:::figure warm-up-gate


## Practise with help

**1.** Differentiate $y = e^{2x}$.

<details markdown="1">
<summary>Hint</summary>

Use $\dfrac{d}{dx}\left(e^{kx}\right) = ke^{kx}$ with $k = 2$.

<details markdown="1">
<summary>Next step</summary>

$2e^{2x}$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{dy}{dx} = 2e^{2x}$$

</details>
</details>
</details>

**2.** Differentiate $y = e^{-x}$.

<details markdown="1">
<summary>Hint</summary>

Here $k = -1$. Keep the negative sign.

<details markdown="1">
<summary>Next step</summary>

$-1 \times e^{-x}$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{dy}{dx} = -e^{-x}$$

The derivative is negative, so the curve falls.

</details>
</details>
</details>

**3.** Differentiate $y = 4e^{3x}$.

<details markdown="1">
<summary>Hint</summary>

The constant $4$ stays in front.

<details markdown="1">
<summary>Next step</summary>

$4 \times 3e^{3x}$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{dy}{dx} = 12e^{3x}$$

</details>
</details>
</details>

**4.** Differentiate $y = 3^x$.

<details markdown="1">
<summary>Hint</summary>

Use $\dfrac{d}{dx}\left(a^x\right) = a^x \ln a$.

<details markdown="1">
<summary>Next step</summary>

$3^x \ln 3$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{dy}{dx} = 3^x \ln 3$$

The factor $\ln 3 \approx 1.099$ is a constant.

</details>
</details>
</details>

**5.** Differentiate $y = \cos x$.

<details markdown="1">
<summary>Hint</summary>

The derivative of cosine carries a minus sign.

<details markdown="1">
<summary>Next step</summary>

$-\sin x$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{dy}{dx} = -\sin x$$

At $x = 0$ the gradient is $0$, and just after $0$ it is negative, because the cosine curve
is falling there.

</details>
</details>
</details>

**6.** Differentiate $y = \sin 3x$.

<details markdown="1">
<summary>Hint</summary>

The constant $3$ inside the angle comes out in front.

<details markdown="1">
<summary>Next step</summary>

$3\cos 3x$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{dy}{dx} = 3\cos 3x$$

</details>
</details>
</details>

**7.** Differentiate $y = 2\cos 5x$.

<details markdown="1">
<summary>Hint</summary>

Keep both the $2$ and the $5$, and the minus sign.

<details markdown="1">
<summary>Next step</summary>

$2 \times (-5\sin 5x)$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{dy}{dx} = -10\sin 5x$$

</details>
</details>
</details>

**8.** A tank fills so that its volume after $t$ minutes is $W(t) = 50e^{0.1t}$ litres.
Find $\dfrac{dW}{dt}$ and its value at $t = 4$ minutes.

<details markdown="1">
<summary>Hint</summary>

Here $k = 0.1$, so the derivative is $50 \times 0.1 \times e^{0.1t}$.

<details markdown="1">
<summary>Next step</summary>

$\dfrac{dW}{dt} = 5e^{0.1t}$, so at $t = 4$ the rate is $5e^{0.4}$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{dW}{dt} = 5e^{0.1t} \qquad \left.\frac{dW}{dt}\right|_{t=4} = 5e^{0.4} \approx 7.46
\text{ litres per minute}$$

The rate grows with the volume, so this tank fills faster and faster. The polynomial tank in
the chapter problem had a greatest rate, because its rate curve turned over.

</details>
</details>
</details>

## A question from Chapter 12

**9.** Write down the value of $\sin 0$, $\cos 0$ and $\sin\frac{\pi}{2}$.

<details markdown="1">
<summary>Hint</summary>

Use the unit circle.

<details markdown="1">
<summary>Next step</summary>

At angle $0$ the point on the unit circle is $(1, 0)$.

<details markdown="1">
<summary>Full working</summary>

$\sin 0 = 0$, $\cos 0 = 1$ and $\sin\frac{\pi}{2} = 1$.

These values check the derivatives at the origin. The gradient of $y = \sin x$ at $x = 0$ is
$\cos 0 = 1$, and the gradient of $y = \cos x$ at $x = 0$ is $-\sin 0 = 0$.

</details>
</details>
</details>
