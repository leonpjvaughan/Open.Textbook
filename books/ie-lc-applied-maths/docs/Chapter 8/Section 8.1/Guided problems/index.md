---
title: 8.1 Rates of change and differential equations — Practise with help
chapter: 8
chapter_title: Modelling a changing world
section: '8.1'
section_title: Rates of change and differential equations
tier: O
refs:
- S4
kind: guided-problems
---

# 8.1 Rates of change and differential equations — Practise with help

## Warm-up: remember

1. Differentiate $y = 4t^3 - 2t$.
2. A quantity is $P = 100 \times 2^t$. Find $P$ when $t = 3$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $\dfrac{dy}{dt} = 12t^2 - 2$. Bring the power down and reduce it by one, term
   by term.
2. $P = 100 \times 2^3 = 100 \times 8 = 800$. Repeated multiplication is the
   discrete version of the growth you meet in Section 8.2.

</details>

:::figure warm-up-gate


## Practise with help

**1.** A quantity is $Q = 5t^2 - 3t$. Find $\dfrac{dQ}{dt}$ and its value when
$t = 4$.

<details markdown="1">
<summary>Hint</summary>

Differentiate each term, then substitute $t = 4$ into the derivative.

<details markdown="1">
<summary>Next step</summary>

The derivative is $10t - 3$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{dQ}{dt} = 10t - 3$$

At $t = 4$,

$$\frac{dQ}{dt} = 10(4) - 3 = 37.$$

The quantity is rising at $37$ units per unit of time.

</details>
</details>
</details>

**2.** A population grows at a rate proportional to the population $P$. Write
down a differential equation for $P$.

<details markdown="1">
<summary>Hint</summary>

"Proportional" means multiplied by a constant. Growth makes the constant
positive.

<details markdown="1">
<summary>Next step</summary>

The rate is $\dfrac{dP}{dt}$, and it equals a constant times $P$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{dP}{dt} = kP, \qquad k > 0.$$

The value of $k$ sets how fast the population grows. A larger $k$ gives faster
growth.

</details>
</details>
</details>

**3.** Show that $y = 4e^{3x}$ is a solution of $\dfrac{dy}{dx} = 3y$.

<details markdown="1">
<summary>Hint</summary>

Differentiate the claim, then work out the right-hand side separately.

<details markdown="1">
<summary>Next step</summary>

$\dfrac{dy}{dx} = 12e^{3x}$, and $3y = 3 \times 4e^{3x}$.

<details markdown="1">
<summary>Full working</summary>

Differentiate:

$$\frac{dy}{dx} = 12e^{3x}.$$

The right-hand side is

$$3y = 3 \times 4e^{3x} = 12e^{3x}.$$

The two sides agree for every $x$, so $y = 4e^{3x}$ is a solution.

</details>
</details>
</details>

**4.** Show that $P = 60e^{-0.2t}$ is a solution of
$\dfrac{dP}{dt} = -0.2P$.

<details markdown="1">
<summary>Hint</summary>

The derivative of $e^{-0.2t}$ brings down the factor $-0.2$.

<details markdown="1">
<summary>Next step</summary>

$\dfrac{dP}{dt} = -12e^{-0.2t}$, and $-0.2P = -0.2 \times 60e^{-0.2t}$.

<details markdown="1">
<summary>Full working</summary>

Differentiate:

$$\frac{dP}{dt} = -0.2 \times 60e^{-0.2t} = -12e^{-0.2t}.$$

The right-hand side is

$$-0.2P = -0.2 \times 60e^{-0.2t} = -12e^{-0.2t}.$$

The two sides agree, so the claim is a solution.

</details>
</details>
</details>

**5.** A quantity obeys $\dfrac{dP}{dt} = 4 - 0.2P$. Find the value at which the
rate of change is zero.

<details markdown="1">
<summary>Hint</summary>

Set the right-hand side to zero and solve for $P$.

<details markdown="1">
<summary>Next step</summary>

$4 - 0.2P = 0$.

<details markdown="1">
<summary>Full working</summary>

$$4 - 0.2P = 0, \qquad 0.2P = 4, \qquad P = 20.$$

At $P = 20$ the quantity is steady. This is the level the model settles at, and
Section 8.5 finds how it gets there.

</details>
</details>
</details>

**6.** A tank loses water at a rate proportional to the volume $V$ present.
Write down a differential equation for $V$, and say what the sign of the constant
means.

<details markdown="1">
<summary>Hint</summary>

The volume is falling, so the rate is negative.

<details markdown="1">
<summary>Next step</summary>

$\dfrac{dV}{dt}$ equals a constant times $V$, and the constant is negative.

<details markdown="1">
<summary>Full working</summary>

$$\frac{dV}{dt} = -kV, \qquad k > 0.$$

The negative constant makes the rate negative whenever $V$ is positive, so the
volume falls. The size of $k$ sets how quickly it falls.

</details>
</details>
</details>

**7.** A student writes: "Since $\dfrac{dP}{dt} = 5$, the value of $P$ is $5$."
Explain what is wrong, and what $\dfrac{dP}{dt} = 5$ actually says.

<details markdown="1">
<summary>Hint</summary>

The derivative is a rate, not the amount.

<details markdown="1">
<summary>Next step</summary>

$\dfrac{dP}{dt} = 5$ fixes how fast $P$ changes, not what $P$ is.

<details markdown="1">
<summary>Full working</summary>

The derivative gives the rate of change, so $\dfrac{dP}{dt} = 5$ says that $P$
rises by $5$ units every unit of time. It does not say that $P = 5$. The amount
itself could be any value, and it depends on where $P$ started. For example,
$P = 5t$ and $P = 5t + 100$ both have $\dfrac{dP}{dt} = 5$.

</details>
</details>
</details>

## A question from Section 3.5

**8.** In Section 3.5 a displacement was found by integrating a velocity. A
particle has velocity $v = 6 - 2t$ m/s. Find its displacement between $t = 0$ and
$t = 3$ s.

<details markdown="1">
<summary>Hint</summary>

Integrate the velocity, then evaluate at the two limits and subtract.

<details markdown="1">
<summary>Next step</summary>

An antiderivative of $6 - 2t$ is $6t - t^2$.

<details markdown="1">
<summary>Full working</summary>

$$\int_0^3 (6 - 2t)\,dt = \left[6t - t^2\right]_0^3 = (18 - 9) - 0 = 9.$$

The displacement is $9$ m. Integration reverses differentiation, and that is the
tool Section 8.7 uses to solve differential equations.

</details>
</details>
</details>
