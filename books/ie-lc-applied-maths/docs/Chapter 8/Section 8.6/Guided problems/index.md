---
title: 8.6 The logistic model — Practise with help
chapter: 8
chapter_title: Modelling a changing world
section: '8.6'
section_title: The logistic model
tier: H
refs:
- S4
kind: guided-problems
---

# 8.6 The logistic model — Practise with help

## Warm-up: remember

1. Solve $1 + A = 10$.
2. Solve $0.1P\left(1 - \dfrac{P}{500}\right) = 0$.
3. Work out $\dfrac{500}{1 + 9}$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $A = 9$. This is how the starting value fixes the constant in a logistic
   solution.
2. $P = 0$ or $P = 500$. Set each factor to zero.
3. $\dfrac{500}{10} = 50$. This is the starting value of the logistic solution
   when $t = 0$.

</details>

## Practise with help

**1.** A population follows
$\dfrac{dP}{dt} = 0.3P\left(1 - \dfrac{P}{300}\right)$. Write down the carrying
capacity.

<details markdown="1">
<summary>Hint</summary>

The carrying capacity is the value $M$ in the bracket $1 - \dfrac{P}{M}$.

<details markdown="1">
<summary>Next step</summary>

Compare $1 - \dfrac{P}{300}$ with $1 - \dfrac{P}{M}$.

<details markdown="1">
<summary>Full working</summary>

The carrying capacity is $M = 300$. At $P = 300$ the bracket is zero, so the
population stops growing. Below $300$ it grows, and above $300$ it falls.

</details>
</details>
</details>

**2.** For the population in question 1, find every value of $P$ at which the
rate of change is zero.

<details markdown="1">
<summary>Hint</summary>

Set each factor of $0.3P\left(1 - \dfrac{P}{300}\right)$ to zero.

<details markdown="1">
<summary>Next step</summary>

$P = 0$ or $1 - \dfrac{P}{300} = 0$.

<details markdown="1">
<summary>Full working</summary>

The rate is zero when $P = 0$ or $P = 300$. The value $P = 0$ is unstable, and
$P = 300$ is the stable carrying capacity.

</details>
</details>
</details>

**3.** A population follows
$\dfrac{dP}{dt} = 0.3P\left(1 - \dfrac{P}{300}\right)$, with $P = 30$ when
$t = 0$. Find $P$ in terms of $t$.

<details markdown="1">
<summary>Hint</summary>

Write $P = \dfrac{300}{1 + Ae^{-0.3t}}$ and use $P(0) = 30$.

<details markdown="1">
<summary>Next step</summary>

$30 = \dfrac{300}{1 + A}$, so $1 + A = 10$ and $A = 9$.

<details markdown="1">
<summary>Full working</summary>

$$P = \frac{300}{1 + 9e^{-0.3t}}.$$

Check $t = 0$: $P = \dfrac{300}{10} = 30$. As $t$ grows, $P \to 300$.

</details>
</details>
</details>

**4.** For the population $P = \dfrac{300}{1 + 9e^{-0.3t}}$, find the limit of
$P$ as $t$ grows without limit.

<details markdown="1">
<summary>Hint</summary>

What happens to $e^{-0.3t}$ when $t$ is very large?

<details markdown="1">
<summary>Next step</summary>

$e^{-0.3t}$ tends to $0$.

<details markdown="1">
<summary>Full working</summary>

As $t \to \infty$, $e^{-0.3t} \to 0$, so

$$P \to \frac{300}{1 + 0} = 300.$$

The limit is the carrying capacity, which matches the value found in question 1.

</details>
</details>
</details>

**5.** For the population $P = \dfrac{300}{1 + 9e^{-0.3t}}$, find $P$ when
$t = 0$.

<details markdown="1">
<summary>Hint</summary>

$e^0 = 1$.

<details markdown="1">
<summary>Next step</summary>

$P = \dfrac{300}{1 + 9}$.

<details markdown="1">
<summary>Full working</summary>

$$P = \frac{300}{10} = 30.$$

This is the starting value used to build the model, so the check passes.

</details>
</details>
</details>

**6.** For the population $P = \dfrac{300}{1 + 9e^{-0.3t}}$, find the time at
which the population reaches half the carrying capacity. Give an exact answer.

<details markdown="1">
<summary>Hint</summary>

Half of $300$ is $150$. Set $P = 150$.

<details markdown="1">
<summary>Next step</summary>

$1 + 9e^{-0.3t} = 2$, so $e^{-0.3t} = \dfrac{1}{9}$.

<details markdown="1">
<summary>Full working</summary>

$$-0.3t = -\ln 9, \qquad t = \frac{\ln 9}{0.3} = \frac{10\ln 9}{3} = \frac{20\ln 3}{3}.$$

This is about $7.3$ units of time. At that moment the population is growing
fastest, because it is at the point of inflexion.

</details>
</details>
</details>

**7.** Describe the shape of a logistic curve before and after the point of
inflexion.

<details markdown="1">
<summary>Hint</summary>

Think about the factor $1 - \dfrac{P}{M}$ at small $P$ and at large $P$.

<details markdown="1">
<summary>Next step</summary>

At small $P$ the factor is close to $1$; at $P = \dfrac{M}{2}$ the growth is
fastest; beyond that it shrinks.

<details markdown="1">
<summary>Full working</summary>

Before the point of inflexion the curve is bending upwards, because the factor
$1 - \dfrac{P}{M}$ is still close to $1$ and the growth is almost exponential. At
$P = \dfrac{M}{2}$ the curve is steepest. After that the factor shrinks, the
curve bends downwards, and the population levels off at the carrying capacity
$M$. The whole shape is the S-shaped logistic curve.

</details>
</details>
</details>

## A question from Section 8.5

**8.** The pollutant in the lake follows
$\dfrac{dP}{dt} = 20 - 0.05P$ while the factory is open, and settles at $400$ kg.
Explain one way this model differs from a logistic model.

<details markdown="1">
<summary>Hint</summary>

Where does each model get its limiting value from?

<details markdown="1">
<summary>Next step</summary>

The pollutant level is set by the input and the flush rate. A logistic carrying
capacity is set by the environment.

<details markdown="1">
<summary>Full working</summary>

The pollutant settles at $400$ kg because the constant input $20$ balances the
output $0.05P$ at that level. The limiting value comes from the input and the
flush rate, and if the input stops, the level falls to zero. A logistic model has
a carrying capacity $M$ built into the equation itself, and the population stays
near $M$ rather than falling to zero. The two models share the idea of a stable
level, but they reach it in different ways.

</details>
</details>
</details>
