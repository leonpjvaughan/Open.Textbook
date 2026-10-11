---
title: 6.2 The gradient of e^kx and the exponential model — Learn
chapter: 6
chapter_title: Exponentials and logarithms
section: '6.2'
section_title: The gradient of e^kx and the exponential model
dfe:
- F2
- G2
kind: walkthrough
---

# 6.2 The gradient of e^kx and the exponential model — Learn

**Prerequisites:** the graphs of $a^x$ and $e^x$ from Section 6.1; the gradient
of a straight line from Chapter 3; the idea that the gradient of a curve at a
point is the gradient of the tangent there. Chapter 7 develops that idea fully.

**By the end of this section you can:** differentiate $e^{kx}$; differentiate
$a^{kx}$ for a positive base $a$; find the gradient of an exponential curve at a
given point; explain why an exponential model suits a quantity whose rate of
change is proportional to its size; and read a rate of change from a growth or
decay model.

## 1. The derivative of e^{kx}

The **derivative** of a function gives its gradient. For the exponential
function the result is remarkably simple:

$$
\frac{d}{dx}\left(e^{kx}\right) = k e^{kx}.
$$

The derivative has the same shape as the original function, and the constant $k$
appears in front. When $k = 1$ the derivative of $e^x$ is $e^x$. That is the
special property of the base $e$: at every point, the gradient equals the value
of the function. A curve that is climbing steeply has a large gradient. The
larger the value of $e^{kx}$, the larger the gradient.

For a positive base $a$, write $a = e^{\ln a}$ and use the result above. Then

$$
\frac{d}{dx}\left(a^{kx}\right) = k a^{kx} \ln a.
$$

The extra factor $\ln a$ appears because the base $a$ is not $e$. Section 6.3
explains the logarithm $\ln a$ in full; for now you can evaluate it on a
calculator.

**Example 1.** Differentiate $y = e^{4x}$.

Here $k = 4$, so

$$
\frac{dy}{dx} = 4e^{4x}.
$$

**Example 2.** Differentiate $y = 3e^{-2x}$.

The constant $3$ stays in front, and $k = -2$:

$$
\frac{dy}{dx} = 3 \times (-2)e^{-2x} = -6e^{-2x}.
$$

The derivative is negative for every $x$, which matches the falling curve.

**Example 3.** Differentiate $y = 2^{3x}$.

Here $a = 2$ and $k = 3$, so

$$
\frac{dy}{dx} = 3 \times 2^{3x}\ln 2.
$$

**Example 4.** Find the gradient of $y = e^{2x}$ at the point where $x = 0$.

Differentiate first: $\dfrac{dy}{dx} = 2e^{2x}$. At $x = 0$,

$$
2e^{0} = 2 \times 1 = 2.
$$

The curve passes through $(0, 1)$, and the tangent there has gradient $2$.

## 2. The exponential model

Many quantities change at a rate proportional to their current size. A
population of bacteria doubles when there is enough food, and the more bacteria
there are, the faster the number grows. A radioactive sample decays, and the
more atoms there are, the more decay each second. In each case the rate of
change is a constant multiple of the amount:

$$
\frac{dy}{dt} = ky.
$$

The function that satisfies this equation is the exponential

$$
y = Ae^{kt},
$$

where $A$ is the value at $t = 0$. Differentiate and check:

$$
\frac{dy}{dt} = kAe^{kt} = ky.
$$

- When $k > 0$ the quantity grows. The larger $k$ is, the faster it grows.
- When $k < 0$ the quantity decays. The larger $|k|$ is, the faster it falls.
- The constant $A$ is the starting value, because $e^0 = 1$.

This is why the exponential model suits so many applications. The assumption
"the rate is proportional to the amount" is a single, testable statement about
the process. It also explains the shape: a growing quantity grows faster as it
gets larger, so the curve steepens.

**Example 5.** A colony of bacteria has $900$ cells at $t = 0$ and grows with
constant $k = 0.4$ per hour. Write the model and find the growth rate at
$t = 0$.

The model is $N = 900e^{0.4t}$. Differentiate:

$$
\frac{dN}{dt} = 360e^{0.4t}.
$$

At $t = 0$ the rate is $360e^0 = 360$ cells per hour.

## Progress check

Return to the cooling coffee in the chapter problem. Its excess temperature is

$$
E = 60e^{-kt}.
$$

1. Differentiate $E$ with respect to $t$.
2. Find the value of $\dfrac{dE}{dt}$ at $t = 0$.
3. Explain why the negative sign is expected, and why the coffee cools more
   slowly as time goes on.

Section 6.4 finds the value of $k$ from the measurement, and then the time for
the coffee to cool.

> **Watch out.** These mistakes are common.
>
> **Forgetting the constant in the exponent.** The derivative of $e^{4x}$ is
> $4e^{4x}$, not $e^{4x}$. The factor $4$ is what makes a steeper curve have a
> larger gradient.
>
> **Losing the minus sign.** The derivative of $e^{-2x}$ is $-2e^{-2x}$. Check
> the sign against the graph: if the curve is falling, the gradient must be
> negative.
>
> **Dropping $\ln a$ for a base other than $e$.** The derivative of $2^{3x}$ is
> $3 \times 2^{3x}\ln 2$, not $3 \times 2^{3x}$. The factor $\ln 2$ is roughly
> $0.693$, so the curve is a little less steep than $e^{3x}$.
>
> **Mixing up $e^{kx}$ and $x^k$.** The first is an exponential and its
> derivative keeps an exponential. The second is a power, and Chapter 7 shows
> that its derivative is $kx^{k-1}$. The two rules are different.

## You should now be able to

- differentiate $e^{kx}$, keeping the constant $k$ in front;
- differentiate $a^{kx}$ for a positive base $a$, including the factor $\ln a$;
- find the gradient of an exponential curve at a given point;
- write down the model $y = Ae^{kt}$ and say what $A$ and $k$ mean;
- explain why a rate proportional to the amount gives an exponential model;
- find a rate of change from a growth or decay model.
