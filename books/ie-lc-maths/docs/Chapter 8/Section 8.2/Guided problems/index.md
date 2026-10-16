---
title: 8.2 The definite integral and area — Practise with help
chapter: 8
chapter_title: Integration
section: '8.2'
section_title: The definite integral and area
tier: O
refs:
- '5.2'
kind: guided-problems
---

# 8.2 The definite integral and area — Practise with help

## Warm-up: remember

1. Find an antiderivative of $6x^2$.
2. For $V(t) = 6t^2 - t^3$, work out $V(4)$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $2x^3 + C$. The power rises by one and the $6$ divides by the new power $3$.
2. $V(4) = 6(16) - 64 = 96 - 64 = 32$.

Both answers are used again below. The first is the antiderivative a definite integral
needs; the second is the volume the chapter problem is looking for.

</details>

## Practise with help

**1.** Evaluate $\displaystyle\int_0^2 x^2\,dx$.

<details markdown="1">
<summary>Hint</summary>

An antiderivative of $x^2$ is $\dfrac{x^3}{3}$. Evaluate it at $2$ and at $0$.

<details markdown="1">
<summary>Next step</summary>

$\left[\dfrac{x^3}{3}\right]_0^2 = \dfrac{8}{3} - 0$.

<details markdown="1">
<summary>Full working</summary>

$$\int_0^2 x^2\,dx = \left[\frac{x^3}{3}\right]_0^2 = \frac{8}{3} - 0 = \frac{8}{3}$$

This is the area under $y = x^2$ from $x = 0$ to $x = 2$.

</details>
</details>
</details>

**2.** Evaluate $\displaystyle\int_1^3 (2x + 1)\,dx$.

<details markdown="1">
<summary>Hint</summary>

An antiderivative of $2x + 1$ is $x^2 + x$.

<details markdown="1">
<summary>Next step</summary>

Substitute $x = 3$, then $x = 1$, then subtract.

<details markdown="1">
<summary>Full working</summary>

$$\int_1^3 (2x + 1)\,dx = \Big[x^2 + x\Big]_1^3 = (9 + 3) - (1 + 1) = 12 - 2 = 10$$

</details>
</details>
</details>

**3.** Evaluate $\displaystyle\int_0^1 (3x^2 - 2x + 1)\,dx$.

<details markdown="1">
<summary>Hint</summary>

Integrate each term: $x^3 - x^2 + x$.

<details markdown="1">
<summary>Next step</summary>

At the top limit $x = 1$, the value is $1 - 1 + 1 = 1$. At the bottom limit $x = 0$, it is
$0$.

<details markdown="1">
<summary>Full working</summary>

$$\int_0^1 (3x^2 - 2x + 1)\,dx = \Big[x^3 - x^2 + x\Big]_0^1 = 1 - 0 = 1$$

</details>
</details>
</details>

**4.** Evaluate $\displaystyle\int_0^3 (x^2 - 4)\,dx$ and explain the sign of your answer.

<details markdown="1">
<summary>Hint</summary>

An antiderivative is $\dfrac{x^3}{3} - 4x$.

<details markdown="1">
<summary>Next step</summary>

At $x = 3$ the value is $9 - 12 = -3$. At $x = 0$ it is $0$.

<details markdown="1">
<summary>Full working</summary>

$$\int_0^3 (x^2 - 4)\,dx = \left[\frac{x^3}{3} - 4x\right]_0^3 = -3 - 0 = -3$$

The value is negative because the curve lies below the axis between $x = 0$ and $x = 2$.
Signed area below the axis counts as negative.

</details>
</details>
</details>

**5.** Evaluate $\displaystyle\int_{-1}^{1} x^3\,dx$.

<details markdown="1">
<summary>Hint</summary>

An antiderivative is $\dfrac{x^4}{4}$. Be careful with the negative limit.

<details markdown="1">
<summary>Next step</summary>

At $x = 1$ the value is $\dfrac{1}{4}$. At $x = -1$ it is also $\dfrac{1}{4}$, because
$(-1)^4 = 1$.

<details markdown="1">
<summary>Full working</summary>

$$\int_{-1}^{1} x^3\,dx = \left[\frac{x^4}{4}\right]_{-1}^{1}
= \frac{1}{4} - \frac{1}{4} = 0$$

The region below the axis on the left cancels the region above it on the right.

</details>
</details>
</details>

**6.** Evaluate $\displaystyle\int_1^2 \frac{1}{x^2}\,dx$.

<details markdown="1">
<summary>Hint</summary>

Write $\dfrac{1}{x^2} = x^{-2}$. An antiderivative is $-\dfrac{1}{x}$.

<details markdown="1">
<summary>Next step</summary>

At $x = 2$ the value is $-\dfrac{1}{2}$. At $x = 1$ it is $-1$.

<details markdown="1">
<summary>Full working</summary>

$$\int_1^2 x^{-2}\,dx = \left[-\frac{1}{x}\right]_1^2
= -\frac{1}{2} - (-1) = \frac{1}{2}$$

</details>
</details>
</details>

**7.** Find the area of the region bounded by the curve $y = x^2$, the $x$-axis and the line
$x = 3$.

<details markdown="1">
<summary>Hint</summary>

The region runs from $x = 0$ to $x = 3$, and the curve is above the axis there.

<details markdown="1">
<summary>Next step</summary>

The area is $\displaystyle\int_0^3 x^2\,dx$.

<details markdown="1">
<summary>Full working</summary>

$$\text{Area} = \int_0^3 x^2\,dx = \left[\frac{x^3}{3}\right]_0^3 = 9$$

The area is $9$ square units.

</details>
</details>
</details>

**8.** The chapter problem's tank fills at $r(t) = 12t - 3t^2$ litres per minute. Work out
$\displaystyle\int_0^4 r(t)\,dt$ and say what it means.

<details markdown="1">
<summary>Hint</summary>

An antiderivative of $r$ is $6t^2 - t^3$.

<details markdown="1">
<summary>Next step</summary>

Substitute $t = 4$ and $t = 0$, then subtract.

<details markdown="1">
<summary>Full working</summary>

$$\int_0^4 (12t - 3t^2)\,dt = \Big[6t^2 - t^3\Big]_0^4 = (96 - 64) - 0 = 32$$

The value is $32$ litres. It is the volume of water that entered the tank over the four
minutes, and it is the area under the graph of $r$.

</details>
</details>
</details>

## A question from Chapter 7

**9.** The height of a ball after $t$ seconds is $h(t) = 20t - 5t^2$ metres. Find the
greatest height and say when it is reached.

<details markdown="1">
<summary>Hint</summary>

Differentiate and set the derivative equal to zero.

<details markdown="1">
<summary>Next step</summary>

$h'(t) = 20 - 10t$, so $h'(t) = 0$ at $t = 2$.

<details markdown="1">
<summary>Full working</summary>

$$h'(t) = 20 - 10t = 0 \quad\Rightarrow\quad t = 2$$

$$h(2) = 20(2) - 5(4) = 40 - 20 = 20 \text{ metres}$$

The ball reaches $20$ metres at $t = 2$ seconds. Notice the difference from this chapter:
Chapter 7 asks for the rate, and this chapter asks for the total.

</details>
</details>
</details>
