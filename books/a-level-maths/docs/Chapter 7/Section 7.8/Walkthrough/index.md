---
title: 7.8 Connected rates of change and inverse functions — Learn
chapter: 7
chapter_title: Differentiation
section: '7.8'
section_title: Connected rates of change and inverse functions
dfe:
- G4
kind: walkthrough
---

# 7.8 Connected rates of change and inverse functions — Learn

**Prerequisites:** the chain rule from Section 7.7; differentiating $x^n$ and
$e^{kx}$; rearranging a formula.

**By the end of this section you can:** connect two rates of change with the chain
rule; find one rate from another by differentiating the linking formula;
differentiate an inverse function using
$\dfrac{dy}{dx} = \dfrac{1}{dx/dy}$; and explain how a rate can change as the
quantity grows.

## 1. Connecting two rates

When two quantities are linked, the chain rule connects their rates. If $V$
depends on $r$, and $r$ depends on $t$, then

$$
\frac{dV}{dt} = \frac{dV}{dr} \times \frac{dr}{dt}.
$$

To use it: write the formula that links the two quantities, differentiate it to
find the middle rate, then multiply by the known rate.

**Example 1.** A spherical balloon is inflated so that its volume increases at
$100$ cm$^3$ per second. Find the rate at which the radius grows when the radius
is $5$ cm.

The volume of a sphere is $V = \dfrac{4}{3}\pi r^3$, so

$$
\frac{dV}{dr} = 4\pi r^2.
$$

The chain rule gives $\dfrac{dV}{dt} = \dfrac{dV}{dr} \times \dfrac{dr}{dt}$.
Substitute $\dfrac{dV}{dt} = 100$ and $r = 5$:

$$
100 = 4\pi(5)^2 \times \frac{dr}{dt} = 100\pi \times \frac{dr}{dt}.
$$

So

$$
\frac{dr}{dt} = \frac{100}{100\pi} = \frac{1}{\pi} \approx 0.318 \text{ cm/s}.
$$

The radius grows at about $0.318$ cm/s when the radius of the balloon is
$5$ cm.

**Example 2.** A cube is heated and each edge grows at $0.5$ cm/s. Find the rate
at which the volume grows when the edge is $4$ cm.

The volume is $V = x^3$, so $\dfrac{dV}{dx} = 3x^2$. Then

$$
\frac{dV}{dt} = \frac{dV}{dx} \times \frac{dx}{dt} = 3x^2 \times 0.5.
$$

At $x = 4$:

$$
\frac{dV}{dt} = 3(16) \times 0.5 = 24 \text{ cm}^3\text{/s}.
$$

**Example 3.** The area of a circle grows at $2$ cm$^2$ per second. Find the rate
at which the radius grows when $r = 3$ cm.

The area is $A = \pi r^2$, so $\dfrac{dA}{dr} = 2\pi r$. The chain rule gives

$$
\frac{dA}{dt} = \frac{dA}{dr} \times \frac{dr}{dt}.
$$

Substitute $\dfrac{dA}{dt} = 2$ and $r = 3$:

$$
2 = 2\pi(3) \times \frac{dr}{dt} = 6\pi \times \frac{dr}{dt},
\qquad
\frac{dr}{dt} = \frac{2}{6\pi} = \frac{1}{3\pi} \approx 0.106 \text{ cm/s}.
$$

## 2. The derivative of an inverse function

If $y = f(x)$ and the inverse function exists, then near a point

$$
\frac{dy}{dx} = \frac{1}{\dfrac{dx}{dy}}.
$$

The gradient of the inverse function is the reciprocal of the gradient of the
original function, measured at the matching point.

**Example 4.** The function $f(x) = x^3$ has inverse $f^{-1}(y) = y^{1/3}$. Find
the gradient of the inverse at $y = 8$.

The original function has $f(2) = 8$, so the matching point is $x = 2$.

$$
f'(x) = 3x^2,
\qquad
f'(2) = 12.
$$

Therefore

$$
\left(f^{-1}\right)'(8) = \frac{1}{12}.
$$

**Example 5.** The function $f(x) = x^3 + 2x$ is increasing, so it has an
inverse. Find $\left(f^{-1}\right)'(0)$.

First find the matching point. $f(0) = 0$, so the point $y = 0$ on the inverse
matches $x = 0$ on the original function.

$$
f'(x) = 3x^2 + 2,
\qquad
f'(0) = 2.
$$

Therefore

$$
\left(f^{-1}\right)'(0) = \frac{1}{2}.
$$

> **Watch out.** Three mistakes are common with connected rates.
>
> **Substituting the value before differentiating.** In Example 1, put the
> expression $4\pi r^2$ into the chain rule first, then substitute $r = 5$. If
> you substitute too early you differentiate a number and get zero.
>
> **Inverting the chain rule the wrong way.** The product is
> $\dfrac{dV}{dt} = \dfrac{dV}{dr} \times \dfrac{dr}{dt}$, so the unknown rate is
> found by dividing, not multiplying: $\dfrac{dr}{dt} =
> \dfrac{dV/dt}{dV/dr}$.
>
> **Expecting the rate to stay constant.** The same volume added to a larger
> balloon spreads over a larger surface, so the radius grows more slowly. In
> Example 1 the rate falls as $r$ grows. **Re-check:** after finding a rate,
> decide whether the answer should grow or shrink as the quantity grows, and
> compare with your expression.

## Progress check

Return to the balloon in the chapter problem. Its volume grows at
$\dfrac{dV}{dt} = 100$ cm$^3$/s.

1. Write down $\dfrac{dV}{dr}$ for $V = \dfrac{4}{3}\pi r^3$.
2. Find $\dfrac{dr}{dt}$ when $r = 5$ cm.
3. Find $\dfrac{dr}{dt}$ when $r = 10$ cm.
4. Explain in one sentence why the radius grows more slowly as the balloon
   gets bigger.

## You should now be able to

- write the chain rule that connects two rates;
- differentiate the formula that links two quantities;
- find an unknown rate by substituting the known rate and the given value;
- use $\dfrac{dy}{dx} = \dfrac{1}{dx/dy}$ to differentiate an inverse function;
- explain how a rate can change as the quantity grows.
