---
title: 8.2 Exponential growth and decay — Learn
chapter: 8
chapter_title: Modelling a changing world
section: '8.2'
section_title: Exponential growth and decay
tier: O
refs:
- S4
kind: walkthrough
---

# 8.2 Exponential growth and decay — Learn

**Prerequisites:** Section 8.1, rates of change and differential equations;
indices from Junior Cycle.

**Objectives:** solve $\dfrac{dP}{dt} = kP$; use the solution
$P = P_0e^{kt}$; find a value at a chosen time; find a doubling time or a
half-life.

By the end of this section you can turn the simplest growth model into a formula
and use it to answer questions about time.

## The number e

Compound interest gives a way in. If €1 earns $100\%$ interest once a year, it
becomes €2. If the same rate is paid in two halves, it becomes
$\left(1 + \dfrac{1}{2}\right)^2 = 2.25$ euro. In four quarters it becomes
$\left(1 + \dfrac{1}{4}\right)^4 \approx 2.441$ euro. The more often the interest
is added, the closer the result moves to a fixed number:

$$e = 2.71828\ldots$$

The number $e$ is the base that makes growth at a constant continuous rate come
out exactly. It is irrational, like $\pi$, so $2.71828\ldots$ is an approximation
and $e$ is the exact name.

## The solution of the growth equation

The model for a quantity that changes at a rate proportional to itself is

$$\frac{dP}{dt} = kP.$$

Its **general solution** is

$$P = P_0e^{kt},$$

where $P_0$ is the value of $P$ when $t = 0$. You can check this by
differentiating: the derivative of $P_0e^{kt}$ is $kP_0e^{kt} = kP$, which is
exactly the equation.

The constant $k$ is the **growth rate** when it is positive, and the **decay
rate** when it is negative. Its unit is "per unit of time". The value $P_0$ is
the **initial value**.

**Example 1.** A population grows so that $\dfrac{dP}{dt} = 0.04P$, and $P = 250$
when $t = 0$. Find $P$ in terms of $t$.

Here $k = 0.04$ and $P_0 = 250$, so

$$P = 250e^{0.04t}.$$

**Example 2.** A radioactive mass decays so that $\dfrac{dm}{dt} = -0.02m$, and
$m = 500$ g when $t = 0$. Find $m$ in terms of $t$.

Here $k = -0.02$ and $m_0 = 500$, so

$$m = 500e^{-0.02t}.$$

The negative exponent makes the mass fall. It never quite reaches zero, but it
gets as close as you like given enough time.

## Finding a value at a chosen time

Substitute the time into the solution.

**Example 3.** For the mass $m = 500e^{-0.02t}$, find the mass after $25$ years.

Substitute $t = 25$:

$$m = 500e^{-0.02 \times 25} = 500e^{-0.5} \approx 303\ \text{g}.$$

The value $e^{-0.5}$ is about $0.6065$, so the mass has fallen to about $61\%$ of
its starting value.

## Doubling time and half-life

The **doubling time** is the time taken for a growing quantity to double. The
**half-life** is the time taken for a decaying quantity to fall to half.

Both are found by substituting the target value and solving for $t$. Because the
exponential is involved, the answer is a logarithm.

**Example 4.** For the population $P = 250e^{0.04t}$, find the doubling time.

Set $P = 500$ and divide by $250$:

$$e^{0.04t} = 2.$$

Take logarithms:

$$0.04t = \ln 2, \qquad t = \frac{\ln 2}{0.04} = 25\ln 2 \approx 17.3\ \text{years}.$$

**Example 5.** For the mass $m = 500e^{-0.02t}$, find the half-life.

Set $m = 250$ and divide by $500$:

$$e^{-0.02t} = \frac{1}{2}, \qquad -0.02t = -\ln 2, \qquad t = \frac{\ln 2}{0.02} = 50\ln 2 \approx 34.7\ \text{years}.$$

Notice that the starting amount cancelled. The half-life does not depend on how
much you started with; it is a property of the decay rate alone.

> **Watch out.** The rate $k$ and the amount $P$ are different quantities, and
> mixing them up is the most common error. In $\dfrac{dP}{dt} = 0.04P$, the
> number $0.04$ is a rate per year, not an amount. A second trap is the sign of
> $k$: a positive $k$ grows and a negative $k$ decays, so a decay model must
> carry the minus sign. A third trap is the difference between the percentage
> added each year and the continuous rate $k$. **Re-check:** at $t = 0$ your
> solution must return the starting value, because $e^0 = 1$.

## Progress check

Back to the chapter problem. The factory has closed, and the lake now clears
according to

$$\frac{dP}{dt} = -0.05P,$$

with $P = 400$ kg at the moment the factory closes.

1. Write down the solution for $P$ in terms of $t$.
2. Find the amount of pollutant after $20$ days.
3. The safe level is $50$ kg. Write down the equation you would solve to find the
   time taken to reach it. (You do not need to solve it yet.)

Keep your answers. Section 8.5 solves this same equation and finds the time.

## You should now be able to

- explain what the number $e$ is;
- solve $\dfrac{dP}{dt} = kP$ as $P = P_0e^{kt}$;
- check a solution by differentiating it;
- use a positive $k$ for growth and a negative $k$ for decay;
- find the value of $P$ at a chosen time;
- find a doubling time or a half-life by solving an exponential equation.
