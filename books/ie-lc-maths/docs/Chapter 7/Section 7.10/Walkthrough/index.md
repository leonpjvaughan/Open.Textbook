---
title: 7.10 Differentiating exponential and trigonometric functions — Learn
chapter: 7
chapter_title: Differentiation
section: '7.10'
section_title: Differentiating exponential and trigonometric functions
tier: H
refs:
- '5.2'
kind: walkthrough
---

# 7.10 Differentiating exponential and trigonometric functions — Learn

**Prerequisites:** Section 7.5 — the chain rule; Section 6.6 — exponential functions;
Chapter 12 — the graphs of $\sin x$ and $\cos x$.

**Objectives:** differentiate $e^x$, $e^{kx}$ and $a^x$; differentiate $\sin x$, $\cos x$,
$\sin kx$ and $\cos kx$.

By the end of this section you can differentiate the two families of functions that describe
growth, decay and waves.

## The exponential function

The number $e \approx 2.718$ is chosen so that the exponential curve $y = e^x$ has a special
property: its gradient at every point equals its height there.

> **The exponential derivative.** $$\frac{d}{dx}\left(e^x\right) = e^x.$$

The chain rule extends this to any constant multiple of $x$ in the exponent.

$$\frac{d}{dx}\left(e^{kx}\right) = ke^{kx}$$

Here $k$ is a constant.

**Example 1.** Differentiate $y = e^{3x}$.

$$\frac{dy}{dx} = 3e^{3x}.$$

The $3$ appears because the inner function is $3x$, whose derivative is $3$.

**Example 2.** Differentiate $y = 5e^{-2x}$.

$$\frac{dy}{dx} = 5 \times (-2)e^{-2x} = -10e^{-2x}.$$

The derivative is negative, so the curve falls, which matches the negative exponent.

## Other bases

For a base $a$ that is not $e$, the derivative brings a logarithm of the base.

> **Base $a$.** $$\frac{d}{dx}\left(a^x\right) = a^x \ln a.$$

**Example 3.** Differentiate $y = 2^x$.

$$\frac{dy}{dx} = 2^x \ln 2 \approx 0.693 \times 2^x.$$

The factor $\ln 2$ is a constant, so the curve has the same shape as $2^x$ but is scaled
down slightly.

## Sine and cosine

The derivatives of sine and cosine follow from their graphs. As you move along $y = \sin x$,
the gradient follows the shape of $\cos x$. As you move along $y = \cos x$, the gradient
follows the shape of $-\sin x$.

> **Trigonometric derivatives.**
> $$\frac{d}{dx}\left(\sin x\right) = \cos x, \qquad
> \frac{d}{dx}\left(\cos x\right) = -\sin x.$$

**Example 4.** Check the sine derivative at $x = 0$. The gradient of $y = \sin x$ at the
origin is $1$, and $\cos 0 = 1$, so the values agree.

**Example 5.** Check the cosine derivative at $x = 0$. The gradient of $y = \cos x$ at the
origin is $0$, and $-\sin 0 = 0$. Just after $x = 0$ the cosine curve is falling, and
$-\sin x$ is negative there, so the sign agrees too.

With the chain rule, a constant inside the angle brings a factor.

$$\frac{d}{dx}\left(\sin kx\right) = k\cos kx, \qquad
\frac{d}{dx}\left(\cos kx\right) = -k\sin kx.$$

**Example 6.** Differentiate $y = \sin 4x$ and $y = \cos 3x$.

$$\frac{dy}{dx} = 4\cos 4x \quad \text{and} \quad \frac{dy}{dx} = -3\sin 3x.$$

> **Watch out.** The derivative of $\cos x$ carries a minus sign, and it is the most common
> error in this section. Write the minus before you simplify. Two other traps: a constant
> inside the angle must be multiplied in, so $\sin 4x$ gives $4\cos 4x$ and not $\cos 4x$;
> and a base other than $e$ brings $\ln a$, so $2^x$ gives $2^x \ln 2$ and not $2^x$.

## Progress check

Back to the chapter problem. A second tank fills so that the volume after $t$ minutes is

$$W(t) = 50e^{0.1t} \text{ litres}.$$

Find $\dfrac{dW}{dt}$, then work out the rate at $t = 4$ minutes, leaving your answer in
exact form.

Compare this with the polynomial tank. The exponential rate grows with the volume, so this
tank fills faster and faster. The polynomial tank had a greatest rate at $t = 4$, because
its rate curve turned over.

## You should now be able to

- differentiate $e^x$ and explain why it is its own derivative;
- differentiate $e^{kx}$ and $a^x$, including the factor $\ln a$;
- differentiate $\sin x$ and $\cos x$, with the correct sign;
- differentiate $\sin kx$ and $\cos kx$ using the chain rule.
