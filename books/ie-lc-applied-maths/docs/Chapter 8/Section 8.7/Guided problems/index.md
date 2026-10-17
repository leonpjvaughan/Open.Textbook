---
title: 8.7 Solving separable differential equations — Practise with help
chapter: 8
chapter_title: Modelling a changing world
section: '8.7'
section_title: Solving separable differential equations
tier: H
refs:
- S4
kind: guided-problems
---

# 8.7 Solving separable differential equations — Practise with help

## Warm-up: remember

1. Find $\displaystyle\int 6t\,dt$.
2. Find $\displaystyle\int \frac{1}{y}\,dy$.
3. Differentiate $e^{3x}$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $3t^2 + C$. Raise the power and divide by the new power.
2. $\ln|y| + C$. This is the integral that produces the logarithm in a
   separable solution.
3. $3e^{3x}$. The derivative brings down the constant, which is what makes
   $\dfrac{e^{kt}}{k}$ the integral of $e^{kt}$.

</details>

:::figure warm-up-gate


## Practise with help

**1.** Solve $\dfrac{dy}{dx} = 4xy$, giving the general solution.

<details markdown="1">
<summary>Hint</summary>

Divide by $y$ and integrate both sides.

<details markdown="1">
<summary>Next step</summary>

$\displaystyle\int \frac{1}{y}\,dy = \int 4x\,dx$, so
$\ln|y| = 2x^2 + C$.

<details markdown="1">
<summary>Full working</summary>

Raise $e$ to both sides and write $A = e^C$:

$$y = Ae^{2x^2}.$$

Check by differentiating: $\dfrac{dy}{dx} = 4xAe^{2x^2} = 4xy$.

</details>
</details>
</details>

**2.** Solve $\dfrac{dy}{dx} = \dfrac{x^2}{y}$, giving the general solution.

<details markdown="1">
<summary>Hint</summary>

Multiply by $y$ to get $y\,dy = x^2\,dx$.

<details markdown="1">
<summary>Next step</summary>

$\dfrac{y^2}{2} = \dfrac{x^3}{3} + C$.

<details markdown="1">
<summary>Full working</summary>

Multiply by $2$ and rename the constant:

$$y^2 = \frac{2x^3}{3} + K, \qquad y = \pm\sqrt{\frac{2x^3}{3} + K}.$$

The initial condition fixes the sign.

</details>
</details>
</details>

**3.** Solve $\dfrac{dy}{dx} = \dfrac{y}{2}$, giving the general solution.

<details markdown="1">
<summary>Hint</summary>

Divide by $y$ and integrate.

<details markdown="1">
<summary>Next step</summary>

$\ln|y| = \dfrac{x}{2} + C$.

<details markdown="1">
<summary>Full working</summary>

$$y = Ae^{x/2}.$$

This is exponential growth with rate $\dfrac{1}{2}$, matching Section 8.2.

</details>
</details>
</details>

**4.** Find the particular solution of $\dfrac{dy}{dx} = 3xy$ for which $y = 2$
when $x = 0$.

<details markdown="1">
<summary>Hint</summary>

Find the general solution first, then substitute the initial condition.

<details markdown="1">
<summary>Next step</summary>

The general solution is $y = Ae^{3x^2/2}$.

<details markdown="1">
<summary>Full working</summary>

At $x = 0$, $y = 2$:

$$2 = Ae^0 = A, \qquad y = 2e^{3x^2/2}.$$

Check $x = 0$: $y = 2$, as required.

</details>
</details>
</details>

**5.** A liquid cools so that $\dfrac{dT}{dt} = -0.05(T - 25)$, with $T = 85$°C
when $t = 0$. Find $T$ in terms of $t$.

<details markdown="1">
<summary>Hint</summary>

Separate with $\dfrac{1}{T - 25}$ on the left.

<details markdown="1">
<summary>Next step</summary>

$\ln|T - 25| = -0.05t + C$, so $T = 25 + Ae^{-0.05t}$.

<details markdown="1">
<summary>Full working</summary>

$$T = 25 + Ae^{-0.05t}.$$

At $t = 0$, $T = 85$:

$$85 = 25 + A, \qquad A = 60, \qquad T = 25 + 60e^{-0.05t}.$$

The temperature falls towards the room temperature of $25$°C.

</details>
</details>
</details>

**6.** A body falls so that $\dfrac{dv}{dt} = 10 - 2v$, with $v = 0$ when
$t = 0$. Find $v$ in terms of $t$.

<details markdown="1">
<summary>Hint</summary>

Divide by $10 - 2v$ and integrate.

<details markdown="1">
<summary>Next step</summary>

$-\dfrac{1}{2}\ln|10 - 2v| = t + C$, so $10 - 2v = Ae^{-2t}$.

<details markdown="1">
<summary>Full working</summary>

At $t = 0$, $v = 0$ gives $10 = A$, so

$$10 - 2v = 10e^{-2t}, \qquad v = 5\left(1 - e^{-2t}\right).$$

The velocity approaches the terminal value $5$ m/s.

</details>
</details>
</details>

**7.** A student solves $\dfrac{dy}{dx} = xy$ and writes $y = e^{x^2/2} + C$.
Explain the mistake.

<details markdown="1">
<summary>Hint</summary>

What happens to the constant when you exponentiate both sides?

<details markdown="1">
<summary>Next step</summary>

From $\ln|y| = \dfrac{x^2}{2} + C$, exponentiating gives
$|y| = e^C e^{x^2/2}$.

<details markdown="1">
<summary>Full working</summary>

The constant of integration is added **before** exponentiating, so it becomes a
multiplier, not a term added to the answer. Writing $A = e^C$ gives

$$y = Ae^{x^2/2}.$$

The student's expression $e^{x^2/2} + C$ is not a solution: its derivative is
$xe^{x^2/2}$, which is not $xy$ for that expression.

</details>
</details>
</details>

## A question from Section 8.5

**8.** Solve $\dfrac{dP}{dt} = 30 - 0.1P$ with $P = 0$ when $t = 0$, by
separating the variables.

<details markdown="1">
<summary>Hint</summary>

Rewrite the right-hand side as $-0.1(P - 300)$.

<details markdown="1">
<summary>Next step</summary>

$\displaystyle\int \frac{1}{P - 300}\,dP = \int -0.1\,dt$, so
$\ln|P - 300| = -0.1t + C$.

<details markdown="1">
<summary>Full working</summary>

$$P - 300 = Ae^{-0.1t}, \qquad P = 300 + Ae^{-0.1t}.$$

At $t = 0$, $P = 0$:

$$0 = 300 + A, \qquad A = -300, \qquad P = 300\left(1 - e^{-0.1t}\right).$$

The amount rises towards the equilibrium $300$, which is
$\dfrac{30}{0.1}$ as Section 8.5 predicted.

</details>
</details>
</details>
