---
title: 8.8 Comparing a discrete and a continuous model — Practise with help
chapter: 8
chapter_title: Modelling a changing world
section: '8.8'
section_title: Comparing a discrete and a continuous model
tier: H
refs:
- S4
kind: guided-problems
---

# 8.8 Comparing a discrete and a continuous model — Practise with help

## Warm-up: remember

1. Work out $0.95^2$.
2. Work out $1.05^2$.
3. Given $e^{0.05} \approx 1.05127$, is $1.05$ larger or smaller than
   $e^{0.05}$?

<details markdown="1">
<summary>Answers and feedback</summary>

1. $0.95^2 = 0.9025$. A repeated percentage change multiplies by the same factor
   each step.
2. $1.05^2 = 1.1025$.
3. $1.05$ is smaller, because $1.05127 > 1.05$. The gap is small for one step
   and grows over many steps.

</details>

:::figure warm-up-gate


## Practise with help

**1.** A continuous model gives $P = 200e^{0.03t}$, and a discrete model gives
$u_{n+1} = 1.03u_n$ with $u_0 = 200$. Find each value at $t = n = 10$.

<details markdown="1">
<summary>Hint</summary>

Substitute $t = 10$ in the continuous model, and apply the multiplier ten times
in the discrete model.

<details markdown="1">
<summary>Next step</summary>

Continuous: $200e^{0.3}$. Discrete: $200(1.03)^{10}$.

<details markdown="1">
<summary>Full working</summary>

Continuous: $200e^{0.3} \approx 200 \times 1.3499 \approx 270.0$.

Discrete: $200(1.03)^{10} \approx 200 \times 1.3439 \approx 268.8$.

The continuous value is slightly larger, because continuous growth at $3\%$ per
year adds a little more than $3\%$ once a year.

</details>
</details>
</details>

**2.** Use Euler's method with step $h = 1$ on $\dfrac{dy}{dx} = 0.2y$, with
$y = 50$ when $x = 0$. Find the estimate after one step.

<details markdown="1">
<summary>Hint</summary>

The rate at the start is $0.2 \times 50 = 10$.

<details markdown="1">
<summary>Next step</summary>

$y_1 = 50 + 1(10)$.

<details markdown="1">
<summary>Full working</summary>

$$y_1 = 50 + 1(0.2 \times 50) = 50 + 10 = 60.$$

The exact value at $x = 1$ is $50e^{0.2} \approx 61.07$, so the one-step estimate
is a little low.

</details>
</details>
</details>

**3.** Continue the Euler method from $y_1 = 60$, still with $h = 1$ and
$\dfrac{dy}{dx} = 0.2y$. Find the estimate after the second step.

<details markdown="1">
<summary>Hint</summary>

The new rate is $0.2 \times 60 = 12$.

<details markdown="1">
<summary>Next step</summary>

$y_2 = 60 + 1(12)$.

<details markdown="1">
<summary>Full working</summary>

$$y_2 = 60 + 1(0.2 \times 60) = 60 + 12 = 72.$$

The exact value at $x = 2$ is $50e^{0.4} \approx 74.59$, so the estimate is still
below the true value.

</details>
</details>
</details>

**4.** Repeat the first two steps with the smaller step $h = 0.5$ on
$\dfrac{dy}{dx} = 0.2y$, with $y = 50$ when $x = 0$. Find the estimate at
$x = 1$.

<details markdown="1">
<summary>Hint</summary>

The first half-step rate is $0.2 \times 50 = 10$. Then recalculate the rate.

<details markdown="1">
<summary>Next step</summary>

$y_1 = 50 + 0.5(10) = 55$. The next rate is $0.2 \times 55 = 11$.

<details markdown="1">
<summary>Full working</summary>

$$y_1 = 50 + 0.5(10) = 55$$

$$y_2 = 55 + 0.5(11) = 55 + 5.5 = 60.5.$$

The exact value is $50e^{0.2} \approx 61.07$. The estimate $60.5$ is closer than
the $60$ from the single large step.

</details>
</details>
</details>

**5.** For $\dfrac{dy}{dx} = 0.2y$ with $y = 50$ when $x = 0$, the exact solution
is $y = 50e^{0.2x}$. Find the exact value at $x = 1$.

<details markdown="1">
<summary>Hint</summary>

Substitute $x = 1$.

<details markdown="1">
<summary>Next step</summary>

$y = 50e^{0.2}$.

<details markdown="1">
<summary>Full working</summary>

$$y = 50e^{0.2} \approx 50 \times 1.2214 \approx 61.07.$$

All the Euler estimates in questions 2 to 4 fall below this value, because the
method uses the rate at the start of each step and the rate is rising.

</details>
</details>
</details>

**6.** A continuous model has rate $k = 0.1$. Find the exact discrete multiplier
$1 + r$ that matches it.

<details markdown="1">
<summary>Hint</summary>

Use $1 + r = e^k$.

<details markdown="1">
<summary>Next step</summary>

$1 + r = e^{0.1}$.

<details markdown="1">
<summary>Full working</summary>

$$1 + r = e^{0.1} \approx 1.10517, \qquad r \approx 0.10517.$$

A continuous rate of $10\%$ per year matches a discrete multiplier of about
$1.10517$, which is a rate of about $10.517\%$ per year. The two numbers differ
because interest paid continuously starts earning before the year ends.

</details>
</details>
</details>

**7.** Explain why halving the step in Euler's method usually improves the
estimate.

<details markdown="1">
<summary>Hint</summary>

How often is the rate recalculated?

<details markdown="1">
<summary>Next step</summary>

A smaller step recalculates the rate more often, so the estimate follows the
curve more closely.

<details markdown="1">
<summary>Full working</summary>

Euler's method uses one rate for the whole of each step. With a large step the
rate may be badly out of date by the end of the interval. With a small step the
rate is recalculated often, so the estimate tracks the true curve more closely.
Halving the step does not remove the error, but it reduces it, and the estimate
approaches the exact solution as the step tends to zero.

</details>
</details>
</details>

## A question from Section 8.5

**8.** The lake pollutant follows $\dfrac{dP}{dt} = -0.05P$ with $P_0 = 400$ kg.
Compare the exact value after one day with one Euler step of size $h = 1$.

<details markdown="1">
<summary>Hint</summary>

The exact value is $400e^{-0.05}$. One Euler step uses the rate
$-0.05 \times 400 = -20$.

<details markdown="1">
<summary>Next step</summary>

Euler: $P_1 = 400 + 1(-20) = 380$.

<details markdown="1">
<summary>Full working</summary>

Exact: $400e^{-0.05} \approx 400 \times 0.95123 \approx 380.49$ kg.

Euler with $h = 1$: $P_1 = 400 - 20 = 380$ kg.

The Euler estimate is a little low, by about $0.5$ kg. The daily recurrence
$u_{n+1} = 0.95u_n$ gives $380$ kg exactly, so the daily model and the one-step
Euler estimate agree. The continuous model gives $380.49$ kg.

</details>
</details>
</details>
