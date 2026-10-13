---
title: 7.10 Constructing differential equations — Practise with help
chapter: 7
chapter_title: Differentiation
section: '7.10'
section_title: Constructing differential equations
refs:
- G6
- OT3
kind: guided-problems
---

# 7.10 Constructing differential equations — Practise with help

Work each question closed book first. Read the sentence twice: once to find the
rate, and once to find the sign.

## Warm-up: remember

1. Write " $y$ is proportional to $x^2$ " as an equation.
2. Make $k$ the subject of $5 = 2k$.
3. Differentiate $y = Ae^{3x}$ with respect to $x$.

<details markdown="1">
<summary>Answers</summary>

1. $y = kx^2$, where $k$ is a constant.
2. $k = \dfrac{5}{2} = 2.5$.
3. $\dfrac{dy}{dx} = 3Ae^{3x}$.

If question 1 was hard, revise proportionality in Chapter 2.
</details>

## Practise with help

**1.** A population $P$ of insects grows at a rate proportional to $P$. Write a
differential equation relating $\dfrac{dP}{dt}$ to $P$.

<details markdown="1">
<summary>Hint</summary>

"Proportional to $P$" introduces a constant $k$. The population grows, so the
sign is positive.
</details>

<details markdown="1">
<summary>Next step</summary>

Write the rate on the left and the proportional expression on the right:
$\dfrac{dP}{dt}$ equals a constant times $P$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dP}{dt} = kP, \qquad k > 0.
$$

The larger the population, the faster it grows, because both sides grow with
$P$.
</details>

**2.** A radioactive sample of mass $m$ grams decays at a rate proportional to
its mass. Write a differential equation for $m$ after $t$ years.

<details markdown="1">
<summary>Hint</summary>

Decay means the mass is falling, so the rate is negative. "Proportional to its
mass" introduces a constant $k$.
</details>

<details markdown="1">
<summary>Next step</summary>

Write $\dfrac{dm}{dt}$ equal to minus a constant times $m$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dm}{dt} = -km, \qquad k > 0.
$$

The minus sign says the mass decreases. The constant $k$ is the decay constant,
and a larger $k$ means faster decay.
</details>

**3.** A metal block cools in air at $15^\circ$C. Its temperature $\theta$ falls
at a rate proportional to the difference between $\theta$ and the air
temperature. Write a differential equation for $\theta$ after $t$ minutes.

<details markdown="1">
<summary>Hint</summary>

The temperature difference is $\theta - 15$. The block cools, so the rate is
negative while $\theta > 15$.
</details>

<details markdown="1">
<summary>Next step</summary>

Write $\dfrac{d\theta}{dt} = -k(\theta - 15)$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{d\theta}{dt} = -k(\theta - 15), \qquad k > 0.
$$

When $\theta > 15$ the right side is negative, so the temperature falls. As
$\theta$ approaches $15$ the right side approaches zero, so the cooling slows
down.
</details>

**4.** A car accelerates at a constant rate $a$. Its velocity is $v$ after $t$
seconds. Write a differential equation for $v$.

<details markdown="1">
<summary>Hint</summary>

Acceleration is the rate of change of velocity.
</details>

<details markdown="1">
<summary>Next step</summary>

Write the rate of change of $v$ equal to the constant $a$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dv}{dt} = a.
$$

A constant acceleration means the velocity changes at a steady rate, so the
graph of $v$ against $t$ is a straight line of gradient $a$.
</details>

**5.** The curve $y = A\sin 2x$ contains a constant $A$. Form a differential
equation that does not contain $A$.

<details markdown="1">
<summary>Hint</summary>

Differentiate twice. The second derivative brings back $-\sin 2x$, which is
proportional to $y$.
</details>

<details markdown="1">
<summary>Next step</summary>

$\dfrac{dy}{dx} = 2A\cos 2x$, so $\dfrac{d^2y}{dx^2} = -4A\sin 2x$. Now replace
$A\sin 2x$ with $y$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dy}{dx} = 2A\cos 2x,
\qquad
\frac{d^2y}{dx^2} = -4A\sin 2x = -4y.
$$

The differential equation is $\dfrac{d^2y}{dx^2} = -4y$. Every curve in the
family satisfies it, whatever the value of $A$.
</details>

**6.** The curve $y = x^2 + C$ contains a constant $C$. Form a differential
equation that does not contain $C$.

<details markdown="1">
<summary>Hint</summary>

Differentiate once and see whether the constant survives.
</details>

<details markdown="1">
<summary>Next step</summary>

$\dfrac{dy}{dx} = 2x$. The constant $C$ has already gone.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dy}{dx} = 2x.
$$

Every curve $y = x^2 + C$ has the same gradient at a given $x$, because adding a
constant moves the curve up or down without changing its slope.
</details>
