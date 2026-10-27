---
title: 7.9 Implicit and parametric differentiation — Learn
chapter: 7
chapter_title: Differentiation
section: '7.9'
section_title: Implicit and parametric differentiation
refs:
- G5
kind: walkthrough
---

# 7.9 Implicit and parametric differentiation — Learn

**Prerequisites:** the chain rule and the product rule from Section 7.7;
differentiating $\sin t$ and $\cos t$; the equation of a circle from Chapter 3.

**By the end of this section you can:** differentiate a relation written
implicitly in $x$ and $y$; find $\dfrac{dy}{dx}$ from a relation such as
$x^2 + y^2 = 25$; find the equation of a tangent to a curve given implicitly; and
differentiate a curve given parametrically using
$\dfrac{dy}{dx} = \dfrac{dy/dt}{dx/dt}$.

## 1. Differentiating an implicit relation

So far every curve has been written as $y = $ something. Some curves are easier
to write as a relation between $x$ and $y$, such as $x^2 + y^2 = 25$.

When $y$ depends on $x$, differentiate both sides with respect to $x$. Every
time you differentiate a $y$-term, the chain rule adds a factor of
$\dfrac{dy}{dx}$.

$$
\frac{d}{dx}\left(y^2\right) = 2y\frac{dy}{dx}.
$$

Here $\frac{d}{dx}$ means the derivative with respect to $x$.

The derivative of $x^2$ is $2x$, as usual.

**Example 1.** Find $\dfrac{dy}{dx}$ for the circle $x^2 + y^2 = 25$.

Differentiate both sides:

$$
2x + 2y\frac{dy}{dx} = 0.
$$

Solve for the derivative:

$$
2y\frac{dy}{dx} = -2x,
\qquad
\frac{dy}{dx} = -\frac{x}{y}.
$$

The gradient depends on both coordinates, not on $x$ alone.

**Example 2.** Find $\dfrac{dy}{dx}$ for $x^2 + 3xy - y^2 = 5$.

The middle term is a product, so it needs the product rule. Differentiate each
term with respect to $x$:

$$
2x + 3\left(y + x\frac{dy}{dx}\right) - 2y\frac{dy}{dx} = 0.
$$

Collect the $\dfrac{dy}{dx}$ terms on one side:

$$
2x + 3y + \frac{dy}{dx}(3x - 2y) = 0.
$$

Therefore

$$
\frac{dy}{dx} = -\frac{2x + 3y}{3x - 2y} = \frac{2x + 3y}{2y - 3x}.
$$

**Example 3.** Find the equation of the tangent to $x^2 + y^2 = 25$ at the point
$(3, 4)$.

From Example 1, $\dfrac{dy}{dx} = -\dfrac{x}{y}$. At $(3, 4)$ the gradient $m$ is

$$
m = -\frac{3}{4}.
$$

The tangent through $(3, 4)$ is

$$
y - 4 = -\tfrac{3}{4}(x - 3),
\qquad
y = -\tfrac{3}{4}x + \tfrac{25}{4}.
$$

## 2. Differentiating a parametric curve

Sometimes $x$ and $y$ are each written in terms of a third variable, called a
parameter. For example,

$$
x = t^2,
\qquad
y = t^3.
$$

The gradient is still $\dfrac{dy}{dx}$, and the chain rule connects the three
derivatives:

$$
\frac{dy}{dx} = \frac{dy}{dt} \div \frac{dx}{dt} = \frac{dy/dt}{dx/dt}.
$$

**Example 4.** Find $\dfrac{dy}{dx}$ for $x = t^2$, $y = t^3$.

Differentiate each with respect to $t$:

$$
\frac{dx}{dt} = 2t,
\qquad
\frac{dy}{dt} = 3t^2.
$$

Then

$$
\frac{dy}{dx} = \frac{3t^2}{2t} = \frac{3t}{2}.
$$

**Example 5.** Find $\dfrac{dy}{dx}$ for $x = 2\cos t$, $y = 3\sin t$.

$$
\frac{dx}{dt} = -2\sin t,
\qquad
\frac{dy}{dt} = 3\cos t,
$$

so

$$
\frac{dy}{dx} = \frac{3\cos t}{-2\sin t} = -\frac{3}{2}\cot t.
$$

## 3. Try it: the implicit tangent explorer

**Predict first.** The figure shows the circle $x^2 + y^2 = 25$ with a point you
can slide around it. Before you touch the slider, predict the gradient of the
tangent at $(5, 0)$ and at $(0, 5)$, and predict the sign of the gradient in the
first quadrant. Write your predictions down.

:::figure ch7-implicit-tangent

**Test.** Slide the point around the circle and watch the tangent line and the
readout. Compare the gradient with $-\dfrac{x}{y}$. Check the two points where the
tangent is vertical, and explain what the formula does there.

**Explain.** Write two sentences. The first explains why $\dfrac{dy}{dx}$ depends
on both $x$ and $y$ for this curve. The second explains why the tangent is
vertical at the points $(5, 0)$ and $(-5, 0)$.

> **Watch out.** Three mistakes are common with these methods.
>
> **Forgetting the chain rule on a $y$-term.** The derivative of $y^2$ is
> $2y\dfrac{dy}{dx}$, not $2y$. Every $y$ is a function of $x$ when you
> differentiate with respect to $x$.
>
> **Leaving out the product rule on $xy$.** The derivative of $xy$ is
> $y + x\dfrac{dy}{dx}$. Treating it as $1 \times \dfrac{dy}{dx}$ loses a term.
>
> **Inverting the parametric derivative.** The gradient is
> $\dfrac{dy/dt}{dx/dt}$, with $\dfrac{dy}{dt}$ on top. Writing
> $\dfrac{dx/dt}{dy/dt}$ gives the reciprocal, which is the gradient of the
> inverse relation, not of the curve. **Re-check:** for a rising curve both
> derivatives have the same sign, so the gradient must be positive.

## You should now be able to

- differentiate both sides of an implicit relation;
- apply the chain rule to $y$-terms and the product rule to $xy$;
- find $\dfrac{dy}{dx}$ from a relation and evaluate it at a point;
- find the equation of a tangent to a curve given implicitly;
- find $\dfrac{dy}{dx}$ for a curve given parametrically;
- simplify a parametric derivative by cancelling the common factor.
