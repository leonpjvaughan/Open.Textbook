---
title: 8.3 The fundamental theorem of calculus — Learn
chapter: 8
chapter_title: Integration
section: '8.3'
section_title: The fundamental theorem of calculus
tier: H
refs:
- '5.2'
kind: walkthrough
---

# 8.3 The fundamental theorem of calculus — Learn

**Prerequisites:** Sections 8.1 and 8.2 — antiderivatives and definite integrals; Section
7.10 — differentiating $e^{kx}$, $\sin kx$ and $\cos kx$.

**Objectives:** explain why the area under a curve is an antiderivative; state the
fundamental theorem of calculus; integrate the standard functions; evaluate a definite
integral of any of them.

By the end of this section you can connect the two meanings of integration, and integrate
the standard functions.

## The area function

Fix a starting value $a$ and let $x$ move. The area under the graph of $f$ from $a$ to $x$
is a function of $x$:

$$A(x) = \int_a^x f(t)\,dt.$$

Now increase $x$ by a small amount $h$. The extra region is a thin strip of height $f(x)$
and width $h$, so its area is about $f(x)h$. Dividing by $h$,

$$\frac{A(x + h) - A(x)}{h} \approx f(x).$$

Let $h$ shrink to zero. The left side is the derivative of $A$, so

$$A'(x) = f(x).$$

**The area function is an antiderivative of the curve.** That is the link between area and
the reverse of differentiation, and it is the whole content of the next result.

## The fundamental theorem of calculus

> **The fundamental theorem of calculus.** If $F$ is any antiderivative of $f$, then
> $$\int_a^b f(x)\,dx = F(b) - F(a).$$

The theorem says that to find an area, you do not need to add strips. You find an
antiderivative and evaluate it at the two ends. The constant of integration does not
appear, because it is added at the top and subtracted at the bottom.

**Example 1.** Evaluate $\displaystyle\int_1^2 2x\,dx$ using the theorem.

An antiderivative of $2x$ is $x^2$, so

$$\int_1^2 2x\,dx = \Big[x^2\Big]_1^2 = 4 - 1 = 3.$$

## Standard integrals

The functions from Chapter 7 have standard integrals. For a constant $k \ne 0$,

$$\int e^{kx}\,dx = \frac{1}{k}e^{kx} + C, \qquad
\int \sin kx\,dx = -\frac{1}{k}\cos kx + C, \qquad
\int \cos kx\,dx = \frac{1}{k}\sin kx + C.$$

The factor $\dfrac{1}{k}$ appears because differentiating $e^{kx}$ multiplies by $k$, and
integration undoes that. Two more standard results complete the list:

$$\int \frac{1}{x}\,dx = \ln x + C \quad (x > 0), \qquad
\int a^x\,dx = \frac{a^x}{\ln a} + C \quad (a > 0, a \ne 1).$$

The power rule does not cover $n = -1$, because dividing by $n + 1$ would divide by zero.
The logarithm fills that gap.

**Example 2.** Find $\displaystyle\int (3e^{2x} + \cos 3x)\,dx$.

Integrate each term with its own factor:

$$\int (3e^{2x} + \cos 3x)\,dx = 3 \times \frac{1}{2}e^{2x} + \frac{1}{3}\sin 3x + C
= \frac{3}{2}e^{2x} + \frac{1}{3}\sin 3x + C.$$

**Example 3.** Evaluate $\displaystyle\int_0^{\pi/2} \cos x\,dx$.

$$\int_0^{\pi/2} \cos x\,dx = \Big[\sin x\Big]_0^{\pi/2} = 1 - 0 = 1.$$

**Example 4.** Evaluate $\displaystyle\int_1^2 \frac{1}{x}\,dx$, giving an exact answer.

$$\int_1^2 \frac{1}{x}\,dx = \Big[\ln x\Big]_1^2 = \ln 2 - \ln 1 = \ln 2.$$

**Example 5.** Evaluate $\displaystyle\int_0^1 e^{2x}\,dx$, giving an exact answer.

$$\int_0^1 e^{2x}\,dx = \left[\frac{1}{2}e^{2x}\right]_0^1
= \frac{1}{2}e^2 - \frac{1}{2} = \frac{e^2 - 1}{2}.$$

## The chapter problem

The tank's rate is $r(t) = 12t - 3t^2$ litres per minute, and an antiderivative is
$V(t) = 6t^2 - t^3$. The theorem gives the volume collected:

$$\int_0^4 r(t)\,dt = V(4) - V(0) = (96 - 64) - 0 = 32 \text{ litres}.$$

> **Watch out.** Three mistakes are common.
>
> **Dropping the factor for $e^{kx}$ or $\sin kx$.** The factor is $\dfrac{1}{k}$, not $k$.
> Check with a derivative: the derivative of $\dfrac{1}{2}e^{2x}$ is $e^{2x}$, so the
> integral of $e^{2x}$ is $\dfrac{1}{2}e^{2x} + C$.
>
> **Using the power rule on $\dfrac{1}{x}$.** The power rule fails at $n = -1$, so
> $\displaystyle\int \frac{1}{x}\,dx$ is not $\dfrac{x^0}{0}$. It is $\ln x + C$.
>
> **Forgetting to subtract.** $F(b) - F(a)$ needs both values. Substituting only the top
> limit gives an answer that is too large.
>
> **Re-check:** after integrating, differentiate your answer and compare it with the
> function you started with.

## Progress check

Back to the chapter problem. The tank's rate is $r(t) = 12t - 3t^2$ litres per minute.

Use the fundamental theorem of calculus to work out $\displaystyle\int_0^4 r(t)\,dt$. State
the antiderivative you used, the value at each limit, and the final volume.

Keep your answer. Section 8.4 asks what happens when the same model runs past $t = 4$ and
the rate turns negative.

## You should now be able to

- explain why the area under a curve is an antiderivative of the curve;
- state the fundamental theorem of calculus and use it;
- integrate $e^{kx}$, $\sin kx$, $\cos kx$, $\dfrac{1}{x}$ and $a^x$;
- evaluate a definite integral of any of these functions;
- explain why the constant of integration cancels in a definite integral.
