---
title: The chain rule
---

# The chain rule

If $y$ is a function of $u$, and $u$ is a function of $x$, then

$$\frac{dy}{dx} = \frac{dy}{du} \times \frac{du}{dx}.$$

The rule says that the two rates multiply. This page shows why, and it is honest
about the one place where the usual short argument hides a case.

## Before you start

You need three facts.

- **The derivative is a rate.** $\dfrac{dy}{dx}$ says how much $y$ changes for
  each unit of $x$, measured as the limit of the fraction
  $\dfrac{\delta y}{\delta x}$.
- **A function of a function.** If $y$ depends on $u$ and $u$ depends on $x$,
  then $y$ depends on $x$. A change in $x$ moves $u$, and the change in $u$ moves
  $y$.
- **Cancelling in a fraction.** For ordinary numbers,
  $\dfrac{a}{b} \times \dfrac{b}{c} = \dfrac{a}{c}$, as long as $b \neq 0$.

## Predict first

Suppose a car travels $12\text{ km}$ for every litre of fuel, and uses $3$ litres
for every hour of driving.

**Before reading on, predict:** how far does the car travel in one hour? Work it
out from the two rates you are given. Then predict what the arithmetic looks like
when the two rates are written as fractions.

## The proof

### The numbers first

In one hour the car uses $3$ litres. Each litre carries the car $12$ kilometres.
So in one hour it travels

$$3 \times 12 = 36\text{ km}.$$

The rate of distance with respect to fuel is $12$, the rate of fuel with respect
to time is $3$, and the rate of distance with respect to time is

$$12 \times 3 = 36.$$

The rates multiply. Everything below is that sentence written with letters.

### The algebra

Now let $y$ be a function of $u$, and $u$ a function of $x$. Let $x$ change by a
small amount $\delta x$. Then $u$ changes by some $\delta u$, and because $y$
depends on $u$, $y$ changes by some $\delta y$.

The three small changes are tied together by ordinary arithmetic. If $\delta u$
is not zero, then

$$\frac{\delta y}{\delta x} = \frac{\delta y}{\delta u} \times \frac{\delta u}{\delta x}.$$

The $\delta u$ on the bottom of the first fraction and the $\delta u$ on the top
of the second are the same nonzero number, so they cancel. This identity is exact
for the small changes. It is not an approximation.

**Be careful with the word cancel.** Here the $\delta$'s are genuine numbers, so
the cancelling is genuine arithmetic. What is not allowed is carrying the same
move over to the derivatives, as if $\dfrac{dy}{du}$ were a fraction of two tiny
numbers called $dy$ and $du$. The symbol $\dfrac{dy}{dx}$ is not a fraction; it is
the limit of one. The next step is what turns the exact identity for small changes
into the rule for derivatives.

### Take the limit

Let $\delta x \to 0$. Because $u$ is continuous, $\delta u$ tends to $0$ as well.
Each fraction tends to a derivative:

$$\frac{\delta y}{\delta u} \to \frac{dy}{du}, \qquad \frac{\delta u}{\delta x} \to \frac{du}{dx}, \qquad \frac{\delta y}{\delta x} \to \frac{dy}{dx}.$$

The identity holds for every $\delta x$ that gives $\delta u \neq 0$, so its two
sides have the same limit:

$$\frac{dy}{dx} = \frac{dy}{du} \times \frac{du}{dx}.$$

That is the chain rule, for the case where $\delta u \neq 0$.

### The case where δu is zero

There is one gap in the argument above, and it is worth naming rather than
hiding.

The identity was written down **because $\delta u \neq 0$**. For a function such
as $u = x^2$ near $x = 0$, or $u = \sin x$ at multiples of $\pi$, there are
arbitrarily small changes $\delta x$ for which $\delta u = 0$. At those values the
fraction $\dfrac{\delta y}{\delta u}$ is $\dfrac{0}{0}$, which has no meaning, so
the identity does not apply there. The limit step above quietly assumed the case
away, and it needs its own argument.

That argument is short, and it is worth seeing once. Do not use the quotient
$\dfrac{\delta y}{\delta u}$ at all — it is the object that fails when
$\delta u = 0$. Instead give the quotient a companion quantity $A$, defined by

$$A = \frac{\delta y}{\delta u} \quad\text{when } \delta u \neq 0,
\qquad
A = \frac{dy}{du} \quad\text{when } \delta u = 0.$$

The value used when $\delta u = 0$ is the **limit** of $\dfrac{\delta y}{\delta u}$
as $\delta u \to 0$, which is $\dfrac{dy}{du}$. It is not the meaningless
$\dfrac{0}{0}$. Now multiply by $\delta u$:

$$\delta y = A \times \delta u.$$

Check the two cases. When $\delta u \neq 0$ this is the definition of $A$, so it
is exact. When $\delta u = 0$, the value $u$ has not moved, and because $y$
depends on $u$, neither has $y$; both sides are then $0$. So the equation holds
for every small $\delta x$, and no division by $\delta u$ appears anywhere.

Divide by $\delta x$:

$$\frac{\delta y}{\delta x} = A \times \frac{\delta u}{\delta x}.$$

Now let $\delta x \to 0$. Because $u$ is continuous, $\delta u \to 0$, so
$A \to \dfrac{dy}{du}$. Meanwhile $\dfrac{\delta u}{\delta x} \to \dfrac{du}{dx}$.
Therefore

$$\frac{dy}{dx} = \frac{dy}{du} \times \frac{du}{dx},$$

with no case left out. The case $\delta u = 0$ was not a small exception to be
patched later. It was a signal that the quotient was the wrong object to add up,
and $A$ is the right one.

### One condition the argument needs

Both versions of the argument use one more fact: $u$ is continuous at $x$. A
small change in $x$ has to make a small change in $u$, or $\delta u$ would not
tend to $0$ and the quantity $A$ would not settle on the value $\dfrac{dy}{du}$.
Every function differentiated in this course is continuous, so a reader never has
to check this in practice. A proof does have to state it.

## Check your understanding

1. $y$ changes by $5$ units for every unit of $u$, and $u$ changes by $0.4$ units
   for every unit of $x$. How fast does $y$ change with respect to $x$?
2. Differentiate $y = (3x + 1)^5$ by taking $u = 3x + 1$. Which factor is
   $\dfrac{dy}{du}$, and which is $\dfrac{du}{dx}$?
3. Why can the identity
   $\dfrac{\delta y}{\delta x} = \dfrac{\delta y}{\delta u} \times \dfrac{\delta u}{\delta x}$
   not be used at every value of $x$ without a check?

<details markdown="1">
<summary>Answers</summary>

1. The rates multiply: $5 \times 0.4 = 2$. So $\dfrac{dy}{dx} = 2$.
2. With $u = 3x + 1$ we have $y = u^5$, so $\dfrac{dy}{du} = 5u^4$ and
   $\dfrac{du}{dx} = 3$. The rule gives $5u^4 \times 3 = 15(3x + 1)^4$.
3. The identity needs $\delta u \neq 0$. For some values of $x$, such as $x = 0$
   when $u = x^2$, there are small changes $\delta x$ with $\delta u = 0$, and
   then $\dfrac{\delta y}{\delta u}$ is $\dfrac{0}{0}$. The rule is still true
   there, but this identity is not the reason.
</details>

## A common error

Written as $\dfrac{dy}{dx} = \dfrac{dy}{du} \times \dfrac{du}{dx}$, the rule
looks as though the $du$'s cancel. They do not. The cancelling in the proof
happened one line earlier, between the **small changes** $\delta u$, which are
ordinary numbers; the derivatives are limits, and a limit is not a fraction of
limits. The shorthand gives the right answer for a single chain, which is why the
mistake survives. It is the small changes that cancel, not the derivatives.
