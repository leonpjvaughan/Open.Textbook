---
title: 3.4 Differentiation and the chain rule — Practise with help
chapter: 3
chapter_title: Describing motion
section: '3.4'
section_title: Differentiation and the chain rule
tier: O
refs:
- S3
kind: guided-problems
---

# 3.4 Differentiation and the chain rule — Practise with help

## Warm-up: remember

1. Expand $(2t + 1)^2$.
2. Differentiate $y = t^3$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $(2t + 1)^2 = 4t^2 + 4t + 1$. Expanding is one way to differentiate a
   bracket, and the chain rule is the quicker way.
2. $\dfrac{dy}{dt} = 3t^2$. Multiply by the power and reduce it by one.

</details>

## Practise with help

**1.** Differentiate $y = 5t^3$ with respect to $t$.

<details markdown="1">
<summary>Hint</summary>

Multiply by the power, then reduce the power by one.

<details markdown="1">
<summary>Next step</summary>

$$\frac{dy}{dt} = 5 \times 3t^2$$

<details markdown="1">
<summary>Full working</summary>

$$\frac{dy}{dt} = 5 \times 3t^2 = 15t^2$$

The constant $5$ stays in front, and the power falls from $3$ to $2$.

</details>
</details>
</details>

**2.** Differentiate $y = 4t^2 + 3t$ with respect to $t$.

<details markdown="1">
<summary>Hint</summary>

Differentiate each term on its own.

<details markdown="1">
<summary>Next step</summary>

$$\frac{dy}{dt} = 4 \times 2t + 3$$

<details markdown="1">
<summary>Full working</summary>

$$\frac{dy}{dt} = 8t + 3$$

The derivative of $4t^2$ is $8t$, and the derivative of $3t$ is $3$.

</details>
</details>
</details>

**3.** Differentiate $y = (2t + 1)^3$ with respect to $t$.

<details markdown="1">
<summary>Hint</summary>

Use the chain rule. Take the inside as $u = 2t + 1$.

<details markdown="1">
<summary>Next step</summary>

$$\frac{dy}{du} = 3u^2 \qquad \frac{du}{dt} = 2$$

<details markdown="1">
<summary>Full working</summary>

$$\frac{dy}{dt} = 3u^2 \times 2 = 6u^2 = 6(2t + 1)^2$$

The factor $2$ comes from the inside function. Leaving it out is the common
error.

</details>
</details>
</details>

**4.** Differentiate $y = (3t - 2)^4$ with respect to $t$.

<details markdown="1">
<summary>Hint</summary>

Take the inside as $u = 3t - 2$.

<details markdown="1">
<summary>Next step</summary>

$$\frac{dy}{du} = 4u^3 \qquad \frac{du}{dt} = 3$$

<details markdown="1">
<summary>Full working</summary>

$$\frac{dy}{dt} = 4u^3 \times 3 = 12(3t - 2)^3$$

The outside gives $4u^3$ and the inside gives $3$, so the factors multiply.

</details>
</details>
</details>

**5.** Differentiate $y = (t^2 + 1)^3$ with respect to $t$.

<details markdown="1">
<summary>Hint</summary>

Take the inside as $u = t^2 + 1$. Its derivative is not a constant.

<details markdown="1">
<summary>Next step</summary>

$$\frac{dy}{du} = 3u^2 \qquad \frac{du}{dt} = 2t$$

<details markdown="1">
<summary>Full working</summary>

$$\frac{dy}{dt} = 3u^2 \times 2t = 6t(t^2 + 1)^2$$

The derivative still contains $t$, because the inside function does.

</details>
</details>
</details>

**6.** Differentiate $y = \sqrt{4t + 1}$ with respect to $t$.

<details markdown="1">
<summary>Hint</summary>

Write the root as a power: $y = (4t + 1)^{1/2}$.

<details markdown="1">
<summary>Next step</summary>

$$\frac{dy}{du} = \frac{1}{2}u^{-1/2} \qquad \frac{du}{dt} = 4$$

<details markdown="1">
<summary>Full working</summary>

$$\frac{dy}{dt} = \frac{1}{2}u^{-1/2} \times 4 = \frac{2}{\sqrt{4t + 1}}$$

A negative power in the working becomes a root in the answer.

</details>
</details>
</details>

**7.** A ball has height $y = 10t - 4.9t^2$ metres after $t$ seconds.
Differentiate to find the vertical velocity, then find the time at which it is
zero.

<details markdown="1">
<summary>Hint</summary>

The velocity is $\dfrac{dy}{dt}$. Set it to zero and solve for $t$.

<details markdown="1">
<summary>Next step</summary>

$$v = 10 - 9.8t, \qquad 0 = 10 - 9.8t$$

<details markdown="1">
<summary>Full working</summary>

$$v = \frac{dy}{dt} = 10 - 9.8t$$

Setting $v = 0$ gives $t = \dfrac{10}{9.8} = 1.02$ s, to three significant
figures. At that moment the ball is at its highest point.

</details>
</details>
</details>

## A question from Chapter 1

**8.** In Chapter 1 a model was judged by what it leaves out. The height
$y = 10t - 4.9t^2$ is a model of a thrown ball. State one thing this model
leaves out, and one question it can still answer well.

<details markdown="1">
<summary>Hint</summary>

Think about the air, and about how small the ball is.

<details markdown="1">
<summary>Next step</summary>

The model has only gravity acting on the ball.

<details markdown="1">
<summary>Full working</summary>

The model leaves out air resistance, the spin of the ball and any wind. It also
treats gravity as exactly $9.8$ m/s², which is an average value near the ground.

The model still answers a useful question well: the height of a heavy, compact
ball over a short time, such as a shot put or a cricket ball. For those, the
effect of the air is small compared with the pull of gravity.

</details>
</details>
</details>
