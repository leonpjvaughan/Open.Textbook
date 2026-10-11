---
title: 8.7 Separable first-order differential equations — Practise with help
chapter: 8
chapter_title: Integration
section: '8.7'
section_title: Separable first-order differential equations
dfe:
- H7
kind: guided-problems
---

# 8.7 Separable first-order differential equations — Practise with help

Work each question closed book first. Separate the variables before you
integrate, and keep one constant of integration. Substitute the initial
condition at the end.

## Warm-up: remember

1. Solve $e^{2x} = 5$ for $x$, giving an exact answer.
2. Write $\ln a + \ln b$ as a single logarithm.
3. Find $\displaystyle\int \frac{1}{y}dy$ for $y > 0$.

<details markdown="1">
<summary>Answers</summary>

1. $2x = \ln 5$, so $x = \dfrac{1}{2}\ln 5$.
2. $\ln(ab)$.
3. $\ln y + C$.

If question 1 was hard, revise solving exponential equations in Section 6.4.
</details>

## Practise with help

**1.** Solve $\dfrac{dy}{dx} = 3xy$, giving the general solution.

<details markdown="1">
<summary>Hint</summary>

Divide both sides by $y$, then integrate. The right-hand side becomes
$\displaystyle\int 3xdx$.
</details>

<details markdown="1">
<summary>Next step</summary>

$\ln|y| = \dfrac{3x^2}{2} + C$. Exponentiate both sides and replace $e^C$ by a
constant $A$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
y = Ae^{3x^2/2}.
$$

Different values of $A$ give the different curves in the family. Check by
differentiating: $\dfrac{dy}{dx} = 3xAe^{3x^2/2} = 3xy$.
</details>

**2.** Solve $\dfrac{dy}{dx} = \dfrac{x}{y}$ for which $y = 2$ when $x = 0$.

<details markdown="1">
<summary>Hint</summary>

Multiply both sides by $y$ and integrate. The general solution is
$y^2 = x^2 + K$.
</details>

<details markdown="1">
<summary>Next step</summary>

Substitute $x = 0$ and $y = 2$ into $y^2 = x^2 + K$: $4 = 0 + K$, so $K = 4$.
Choose the positive root because the initial value is positive.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
y^2 = x^2 + 4,
\qquad
y = \sqrt{x^2 + 4}.
$$

The initial value $y(0) = 2$ is positive, so the positive square root is the
correct branch.
</details>

**3.** Solve $\dfrac{dy}{dx} = \dfrac{e^x}{y}$, giving the general solution.

<details markdown="1">
<summary>Hint</summary>

Multiply both sides by $y$. Both sides are then standard integrals.
</details>

<details markdown="1">
<summary>Next step</summary>

$ydy = e^xdx$, so $\dfrac{y^2}{2} = e^x + C$. Multiply by $2$ and rename the
constant.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
y^2 = 2e^x + K.
$$

The constant $K = 2C$ absorbs the factor of $2$. The general solution can be
written as $y = \pm\sqrt{2e^x + K}$.
</details>

**4.** Solve $\dfrac{dy}{dx} = x(y - 1)$ for which $y = 3$ when $x = 0$.

<details markdown="1">
<summary>Hint</summary>

The right-hand side is already factorised. Divide by $y - 1$ and integrate.
</details>

<details markdown="1">
<summary>Next step</summary>

$\ln|y - 1| = \dfrac{x^2}{2} + C$, so $y = 1 + Ae^{x^2/2}$. Substitute the
initial condition.
</details>

<details markdown="1">
<summary>Full working</summary>

Substitute $x = 0$ and $y = 3$:

$$
3 = 1 + A, \qquad A = 2.
$$

The particular solution is

$$
y = 1 + 2e^{x^2/2}.
$$

The constant term $1$ is the value that makes $\dfrac{dy}{dx}$ zero when
$y = 1$.
</details>

**5.** Solve $\dfrac{dy}{dx} = \dfrac{y}{x}$ for $x > 0$.

<details markdown="1">
<summary>Hint</summary>

Divide by $y$, then integrate both sides. On the right, use the standard
integral of $\dfrac{1}{x}$.
</details>

<details markdown="1">
<summary>Next step</summary>

$\ln|y| = \ln x + C$. Exponentiate to turn the sum of logarithms into a product.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
y = Ax.
$$

Every straight line through the origin with $x > 0$ is a solution. Check:
$\dfrac{dy}{dx} = A = \dfrac{Ax}{x} = \dfrac{y}{x}$.
</details>

**6.** A body moves so that its velocity $v$ satisfies
$\dfrac{dv}{dt} = 2 - v$, and $v = 0$ when $t = 0$. Find $v$ in terms of $t$.

<details markdown="1">
<summary>Hint</summary>

Rearrange to $\displaystyle\int \frac{1}{2 - v}dv = \int 1dt$. The left side
gives $-\ln|2 - v|$.
</details>

<details markdown="1">
<summary>Next step</summary>

$-\ln|2 - v| = t + C$, so $\ln|2 - v| = -t - C$ and
$2 - v = Ae^{-t}$. Substitute $t = 0$, $v = 0$.
</details>

<details markdown="1">
<summary>Full working</summary>

At $t = 0$: $2 - 0 = A$, so $A = 2$. Then

$$
2 - v = 2e^{-t},
\qquad
v = 2 - 2e^{-t}.
$$

As $t$ grows, $e^{-t}$ tends to zero and $v$ approaches $2$. The value $2$ is
the terminal velocity, where $\dfrac{dv}{dt} = 0$.
</details>
