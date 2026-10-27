---
title: 8.7 Solving separable differential equations — Learn
chapter: 8
chapter_title: Modelling a changing world
section: '8.7'
section_title: Solving separable differential equations
tier: H
refs:
- S4
kind: walkthrough
---

# 8.7 Solving separable differential equations — Learn

**Prerequisites:** Section 3.5, integration reverses differentiation; Section
8.2, exponential growth and decay.

**Objectives:** recognise a separable differential equation; separate the
variables; integrate both sides; find a general solution and a particular
solution.

By the end of this section you can solve the growth and decay equations of the
chapter from first principles, rather than reading the answer off a formula.

## Separable equations

A differential equation is **separable** when it can be rearranged so that all
the $y$ terms are on one side and all the $x$ terms are on the other:

$$\frac{dy}{dx} = f(x)g(y).$$

Here $f$ is a function of $x$ alone and $g$ is a function of $y$ alone.

The equation $\dfrac{dy}{dx} = xy$ is separable, because it is $x$ times $y$. So
is $\dfrac{dy}{dx} = \dfrac{x}{y}$, and so is every equation in this chapter.

To solve a separable equation, divide both sides by $g(y)$ and integrate with
respect to $x$:

$$\int \frac{1}{g(y)}\,\frac{dy}{dx}\,dx = \int f(x)\,dx,$$

which is usually written in the shorter form

$$\int \frac{1}{g(y)}\,dy = \int f(x)\,dx.$$

## Two standard integrals

Chapter 3 integrated powers of $t$. Two more standard results are needed here,
and both come from reversing a derivative you already know.

$$\int \frac{1}{y}\,dy = \ln|y| + C$$

because the derivative of $\ln y$ is $\dfrac{1}{y}$.

$$\int e^{kt}\,dt = \frac{e^{kt}}{k} + C$$

because the derivative of $\dfrac{e^{kt}}{k}$ is $e^{kt}$.

The first of these is why the solutions in this chapter contain logarithms before
they contain exponentials. The two operations undo each other.

## The general solution

Integrate each side, then tidy the constant. The constant from the left and the
constant from the right combine into one.

**Example 1.** Solve $\dfrac{dy}{dx} = xy$.

Divide by $y$ and integrate:

$$\int \frac{1}{y}\,dy = \int x\,dx, \qquad \ln|y| = \frac{x^2}{2} + C.$$

Raise $e$ to both sides. The constant becomes a multiplier, written $A = e^C$:

$$y = Ae^{x^2/2}.$$

This is the **general solution**. Different values of $A$ give different curves,
and every one of them obeys the equation.

:::figure slope-field

The short segments show the gradient the equation gives at each point. Choose the
starting point and the curve through it appears, so you can see that the constant is
nothing more than which point you started from.

**Example 2.** Solve $\dfrac{dy}{dx} = \dfrac{x}{y}$.

Multiply both sides by $y$:

$$y\,dy = x\,dx, \qquad \frac{y^2}{2} = \frac{x^2}{2} + C.$$

Multiply by $2$ and rename the constant, $K = 2C$:

$$y^2 = x^2 + K, \qquad y = \pm\sqrt{x^2 + K}.$$

The sign is fixed later by an initial condition.

**Example 3.** Solve $\dfrac{dy}{dx} = e^{x-y}$.

Use the index law $e^{x-y} = e^xe^{-y}$, then separate:

$$e^y\,dy = e^x\,dx, \qquad e^y = e^x + C.$$

Take logarithms:

$$y = \ln(e^x + C).$$

The constant stays inside the logarithm, because $e^y$ is the quantity that was
integrated.

## Particular solutions

An **initial condition** gives the value of $y$ at one value of $x$. It fixes the
constant and turns the general solution into a **particular solution**.

**Example 4.** Find the particular solution of $\dfrac{dy}{dx} = 2xy$ for which
$y = 3$ when $x = 0$.

The general solution is $y = Ae^{x^2}$. Substitute $x = 0$, $y = 3$:

$$3 = Ae^0 = A, \qquad y = 3e^{x^2}.$$

**Example 5.** A body falls through a fluid so that
$\dfrac{dv}{dt} = 9.8 - 2v$, with $v = 0$ when $t = 0$. Find $v$ in terms of $t$.

Separate. Divide by $9.8 - 2v$:

$$\int \frac{1}{9.8 - 2v}\,dv = \int dt, \qquad -\frac{1}{2}\ln|9.8 - 2v| = t + C.$$

Rearrange:

$$\ln|9.8 - 2v| = -2t + C', \qquad 9.8 - 2v = Ae^{-2t}.$$

The condition $v = 0$ at $t = 0$ gives $9.8 = A$, so

$$v = 4.9\left(1 - e^{-2t}\right).$$

The velocity approaches $4.9$ m/s, the terminal velocity, where the drag balances
gravity.

> **Watch out.** When you divide by $g(y)$, check whether $g(y) = 0$ gives a
> constant solution. For $\dfrac{dy}{dx} = xy$ the value $y = 0$ is a solution,
> and it is included in $y = Ae^{x^2/2}$ with $A = 0$. A second trap is
> integrating only one side: after separating, both sides need an integral. A
> third trap is the constant: when you exponentiate, the constant of integration
> becomes a multiplier, so write $A = e^C$ and allow $A$ to be negative.
> **Re-check:** substitute your solution back into the original equation and
> confirm both sides match.

## Progress check

Back to the chapter problem. The lake clears according to

$$\frac{dP}{dt} = -0.05P, \qquad P = 400\ \text{kg when } t = 0.$$

1. Separate the equation and integrate both sides to find the general solution.
2. Use the initial condition to find the particular solution.
3. Set $P = 50$ and solve for $t$, the time to reach the safe level.

This is the same answer that Section 8.5 found from the equilibrium formula. The
separation method shows where the exponential comes from.

## You should now be able to

- recognise a separable differential equation;
- use the standard integrals $\displaystyle\int \frac{1}{y}\,dy = \ln|y|$ and
  $\displaystyle\int e^{kt}\,dt = \frac{e^{kt}}{k}$;
- separate the variables and integrate both sides;
- tidy the constant of integration;
- use an initial condition to find a particular solution;
- solve the growth, decay and cooling equations from first principles.
