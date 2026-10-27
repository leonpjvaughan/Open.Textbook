---
title: 8.7 Separable first-order differential equations — Learn
chapter: 8
chapter_title: Integration
section: '8.7'
section_title: Separable first-order differential equations
refs:
- H7
kind: walkthrough
---

# 8.7 Separable first-order differential equations — Learn

**Prerequisites:** integration by substitution and standard integrals from
Sections 8.1 and 8.5; factorising algebraic expressions from Section 2.8.

**By the end of this section you can:** recognise a separable first-order
differential equation; separate the variables and integrate both sides; find a
general solution; and use an initial condition to find a particular solution.

## 1. Separating the variables

A **differential equation** is an equation involving a derivative. It is
**separable** when it can be written with all the $y$ terms on one side and all
the $x$ terms on the other:

$$
\frac{dy}{dx} = f(x)g(y).
$$

Here $f$ is a function of $x$ and $g$ is a function of $y$.

To solve it, divide by $g(y)$ and integrate both sides with respect to $x$:

$$
\int \frac{1}{g(y)}\frac{dy}{dx}dx = \int f(x)dx,
$$

which is usually written in the shorter form

$$
\int \frac{1}{g(y)}dy = \int f(x)dx.
$$

Then integrate each side and add one constant of integration.

**Example 1.** Solve $\dfrac{dy}{dx} = xy$.

Divide by $y$ and integrate:

$$
\int \frac{1}{y}dy = \int xdx,
$$

so

$$
\ln|y| = \frac{x^2}{2} + C.
$$

Raise $e$ to both sides. The constant $C$ becomes a multiplier $A = e^C$:

$$
y = Ae^{x^2/2}.
$$

This is the general solution. Different values of $A$ give different curves in
the family.

## 2. A constant of integration on each side

When you integrate both sides, a constant appears on each. Subtract one from the
other to leave a single constant. In Example 1 the right-hand constant absorbs
the left-hand one.

**Example 2.** Solve $\dfrac{dy}{dx} = \dfrac{x}{y}$.

Multiply both sides by $y$ and by $dx$:

$$
ydy = xdx.
$$

Integrate:

$$
\frac{y^2}{2} = \frac{x^2}{2} + C.
$$

Multiply by $2$ and rename the constant $K = 2C$:

$$
y^2 = x^2 + K.
$$

Taking a square root gives $y = \pm\sqrt{x^2 + K}$. A particular solution keeps
the sign fixed by the initial condition.

**Example 3.** Solve $\dfrac{dy}{dx} = e^{x-y}$.

Use the index law $e^{x-y} = e^x e^{-y}$, then separate:

$$
e^ydy = e^xdx.
$$

Integrate:

$$
e^y = e^x + C,
\qquad
y = \ln(e^x + C).
$$

The constant stays inside the logarithm because $e^y$ is the quantity that was
integrated.

## 3. Particular solutions

An **initial condition** fixes the constant. It gives a value of $y$ at a value
of $x$, such as $y = 3$ when $x = 0$.

**Example 4.** Find the particular solution of $\dfrac{dy}{dx} = 2xy$ for which
$y = 3$ when $x = 0$.

Separate and integrate:

$$
\int \frac{1}{y}dy = \int 2xdx,
\qquad
\ln|y| = x^2 + C,
\qquad
y = Ae^{x^2}.
$$

Substitute $x = 0$ and $y = 3$: $3 = Ae^0 = A$, so the particular solution is

$$
y = 3e^{x^2}.
$$

## 4. Factorising before separating

Sometimes a common factor hides the separation. Factorise it out first.

**Example 5.** Solve $\dfrac{dy}{dx} = xy - x$.

Take out the common factor $x$:

$$
\frac{dy}{dx} = x(y - 1).
$$

The equation is now separable. Divide by $y - 1$:

$$
\int \frac{1}{y - 1}dy = \int xdx,
\qquad
\ln|y - 1| = \frac{x^2}{2} + C.
$$

Exponentiate both sides:

$$
y - 1 = Ae^{x^2/2},
\qquad
y = 1 + Ae^{x^2/2}.
$$

> **Watch out.** Four mistakes are common.
>
> **Dividing by zero.** When you divide by $g(y)$, check whether $g(y) = 0$
> gives a constant solution. For $\dfrac{dy}{dx} = xy$, the value $y = 0$ is a
> solution, and it is included in $y = Ae^{x^2/2}$ with $A = 0$.
>
> **Forgetting to integrate both sides.** After separating, both sides need an
> integral. Writing $\ln|y| = x$ instead of $\ln|y| = \dfrac{x^2}{2}$ skips the
> integration.
>
> **Losing the sign of the constant.** The constant of integration becomes a
> multiplier when you exponentiate. Write $A = e^C$ so that $A$ can be positive
> or negative.
>
> **Not factorising first.** An expression such as $xy - x$ separates only after
> you take out $x$. **Re-check:** substitute your answer back into the original
> equation and confirm both sides match.

## 5. Try it: the family of solutions

**Predict first.** The figure shows the family of solutions of
$\dfrac{dy}{dx} = ky$ for different starting values, with a slider for $k$.
Before you move the slider, predict what happens to the curves when $k$ changes
from positive to negative. Write your prediction down.

:::figure ch8-solution-curves

**Test.** Move the slider for $k$ and watch the curves. Then move the starting
value and watch which curve is highlighted.

**Explain.** Write two sentences. The first explains why every curve is an
exponential. The second explains why a negative value of $k$ gives a curve that
falls.

## You should now be able to

- recognise a separable first-order differential equation;
- separate the variables and integrate both sides;
- add one constant of integration and tidy the general solution;
- use an initial condition to find a particular solution;
- factorise a common factor before separating;
- check a solution by substituting it into the differential equation.
