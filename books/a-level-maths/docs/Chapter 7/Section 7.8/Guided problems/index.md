---
title: 7.8 Connected rates of change and inverse functions — Practise with help
chapter: 7
chapter_title: Differentiation
section: '7.8'
section_title: Connected rates of change and inverse functions
dfe:
- G4
kind: guided-problems
---

# 7.8 Connected rates of change and inverse functions — Practise with help

Work each question closed book first. Write the chain rule that links the two
rates before you substitute any numbers.

## Warm-up: remember

1. Differentiate $y = (2x + 1)^3$.
2. Differentiate $y = e^{3x}$.
3. Differentiate $y = x^3$.

<details markdown="1">
<summary>Answers</summary>

1. Chain rule: $3(2x + 1)^2 \times 2 = 6(2x + 1)^2$.
2. $\dfrac{dy}{dx} = 3e^{3x}$.
3. $\dfrac{dy}{dx} = 3x^2$.

If question 1 was hard, revise the chain rule in Section 7.7.
</details>

## Practise with help

**1.** A sphere grows so that its volume increases at $36\pi$ cm$^3$ per second.
Find the rate at which the radius grows when $r = 3$ cm.

<details markdown="1">
<summary>Hint</summary>

For a sphere, $V = \dfrac{4}{3}\pi r^3$, so $\dfrac{dV}{dr} = 4\pi r^2$. The
chain rule is $\dfrac{dV}{dt} = \dfrac{dV}{dr} \times \dfrac{dr}{dt}$.
</details>

<details markdown="1">
<summary>Next step</summary>

Substitute $r = 3$ into $\dfrac{dV}{dr}$ to get $36\pi$. Then solve
$36\pi = 36\pi \times \dfrac{dr}{dt}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dV}{dr} = 4\pi r^2 = 4\pi(9) = 36\pi,
\qquad
36\pi = 36\pi \times \frac{dr}{dt},
\qquad
\frac{dr}{dt} = 1 \text{ cm/s}.
$$

The radius grows at $1$ cm/s when the radius is $3$ cm.
</details>

**2.** A cube expands so that each edge grows at $0.2$ cm/s. Find the rate at
which the volume grows when the edge is $5$ cm.

<details markdown="1">
<summary>Hint</summary>

The volume is $V = x^3$, so $\dfrac{dV}{dx} = 3x^2$. The rate you know is
$\dfrac{dx}{dt}$.
</details>

<details markdown="1">
<summary>Next step</summary>

At $x = 5$, $\dfrac{dV}{dx} = 3(25) = 75$. Multiply by
$\dfrac{dx}{dt} = 0.2$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dV}{dt} = \frac{dV}{dx} \times \frac{dx}{dt} = 75 \times 0.2 = 15 \text{ cm}^3\text{/s}.
$$

The volume grows at $15$ cm$^3$ per second.
</details>

**3.** A circle's radius grows at $0.1$ cm/s. Find the rate at which its area
grows when $r = 10$ cm.

<details markdown="1">
<summary>Hint</summary>

The area is $A = \pi r^2$, so $\dfrac{dA}{dr} = 2\pi r$. Use
$\dfrac{dA}{dt} = \dfrac{dA}{dr} \times \dfrac{dr}{dt}$.
</details>

<details markdown="1">
<summary>Next step</summary>

At $r = 10$, $\dfrac{dA}{dr} = 20\pi$. Multiply by $0.1$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dA}{dt} = 20\pi \times 0.1 = 2\pi \approx 6.28 \text{ cm}^2\text{/s}.
$$

The area grows at about $6.28$ cm$^2$ per second.
</details>

**4.** The function $f(x) = x^3 + x$ has an inverse. Find
$\left(f^{-1}\right)'(2)$.

<details markdown="1">
<summary>Hint</summary>

Find the value of $x$ for which $f(x) = 2$. Then use the derivative of $f$ at
that point.
</details>

<details markdown="1">
<summary>Next step</summary>

$f(1) = 1 + 1 = 2$, so the matching point is $x = 1$. The derivative is
$f'(x) = 3x^2 + 1$, so $f'(1) = 4$. Take the reciprocal.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
f'(x) = 3x^2 + 1,
\qquad
f'(1) = 4,
\qquad
\left(f^{-1}\right)'(2) = \frac{1}{4}.
$$
</details>

**5.** The function $f(x) = x^5$ has inverse $f^{-1}(y) = y^{1/5}$. Find
$\left(f^{-1}\right)'(32)$.

<details markdown="1">
<summary>Hint</summary>

Find $x$ such that $x^5 = 32$, then differentiate $f$ at that point.
</details>

<details markdown="1">
<summary>Next step</summary>

$2^5 = 32$, so the matching point is $x = 2$. Also $f'(x) = 5x^4$, so
$f'(2) = 80$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
f'(2) = 5(2)^4 = 80,
\qquad
\left(f^{-1}\right)'(32) = \frac{1}{80}.
$$

A direct check: the derivative of $y^{1/5}$ is $\tfrac{1}{5}y^{-4/5}$, which at
$y = 32$ gives $\tfrac{1}{5}(16) = \tfrac{1}{80}$.
</details>

**6.** Two quantities are linked by $y = x^2$, and $x$ grows at $3$ units per
second. Find the rate at which $y$ grows when $x = 4$.

<details markdown="1">
<summary>Hint</summary>

Differentiate the linking formula to find $\dfrac{dy}{dx}$. Then use
$\dfrac{dy}{dt} = \dfrac{dy}{dx} \times \dfrac{dx}{dt}$.
</details>

<details markdown="1">
<summary>Next step</summary>

$\dfrac{dy}{dx} = 2x$, which is $8$ at $x = 4$. Multiply by $\dfrac{dx}{dt} = 3$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dy}{dt} = 2x \times \frac{dx}{dt} = 8 \times 3 = 24 \text{ units/s}.
$$

The rate depends on $x$, so it changes as $x$ grows even when
$\dfrac{dx}{dt}$ is constant.
</details>
