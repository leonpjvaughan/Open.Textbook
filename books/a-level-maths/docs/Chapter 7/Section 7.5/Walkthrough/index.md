---
title: 7.5 Tangents, normals, maxima, minima and stationary points — Learn
chapter: 7
chapter_title: Differentiation
section: '7.5'
section_title: Tangents, normals, maxima, minima and stationary points
refs:
- G3
kind: walkthrough
---

# 7.5 Tangents, normals, maxima, minima and stationary points — Learn

**Prerequisites:** differentiating standard functions from Section 7.3; the
second derivative and its sign from Section 7.4; the equation of a straight line
and perpendicular gradients from Chapter 3.

**By the end of this section you can:** find the stationary points of a curve;
classify each one as a maximum, a minimum or a point of inflection; find the
equation of the tangent at a point; find the equation of the normal at a point;
and solve an optimisation problem by finding a maximum or a minimum.

## 1. Stationary points

A **stationary point** is a point on a curve where the gradient is zero:

$$
f'(x) = 0.
$$

The tangent there is horizontal. A stationary point is one of three kinds:

- a **maximum**, where the curve turns from rising to falling;
- a **minimum**, where the curve turns from falling to rising;
- a **stationary point of inflection**, where the curve flattens but keeps going
  in the same direction.

To find stationary points, solve $f'(x) = 0$ and work out the $y$-coordinate at
each solution.

**Example 1.** Find and classify the stationary points of $y = x^3 - 3x^2 + 2$.

Differentiate:

$$
\frac{dy}{dx} = 3x^2 - 6x = 3x(x - 2).
$$

Set this to zero: $3x(x - 2) = 0$, so $x = 0$ or $x = 2$.

Find the $y$-coordinates:

$$
y(0) = 2,
\qquad
y(2) = 8 - 12 + 2 = -2.
$$

The stationary points are $(0, 2)$ and $(2, -2)$.

Classify with the second derivative. Here $\dfrac{d^2y}{dx^2} = 6x - 6$.

At $x = 0$: $6(0) - 6 = -6 < 0$, so $(0, 2)$ is a maximum.
At $x = 2$: $6(2) - 6 = 6 > 0$, so $(2, -2)$ is a minimum.

## 2. Tangents and normals

The tangent at a point touches the curve and has the same gradient as the curve
there. If the point is $(x_1, y_1)$ and the gradient is $m = f'(x_1)$, the
equation of the tangent is

$$
y - y_1 = m(x - x_1).
$$

The **normal** at a point is the straight line through the point that is
perpendicular to the tangent. Its gradient is the negative reciprocal of $m$:

$$
m_{\text{normal}} = -\frac{1}{m}, \qquad m \neq 0.
$$

**Example 2.** Find the equation of the tangent and the equation of the normal to
$y = x^2$ at the point $(1, 1)$.

Differentiate: $\dfrac{dy}{dx} = 2x$. At $x = 1$ the gradient is $m = 2$.

Tangent:

$$
y - 1 = 2(x - 1),
\qquad
y = 2x - 1.
$$

Normal: the gradient is $-\dfrac{1}{2}$.

$$
y - 1 = -\tfrac{1}{2}(x - 1),
\qquad
y = -\tfrac{1}{2}x + \tfrac{3}{2}.
$$

## 3. Optimisation: the box problem

Many real problems ask for the largest or smallest value of a quantity. Write
the quantity as a function of one variable, find where its derivative is zero,
and check the kind of stationary point.

**Example 3.** A sheet of card measures $16$ cm by $10$ cm. Four equal squares of
side $x$ cm are cut from the corners, and the sides are folded up to make an open
box. Find the value of $x$ that gives the greatest volume.

The base measures $(16 - 2x)$ cm by $(10 - 2x)$ cm, and the height is $x$ cm, so

$$
V = x(16 - 2x)(10 - 2x).
$$

Expand:

$$
V = x(160 - 52x + 4x^2) = 4x^3 - 52x^2 + 160x.
$$

Differentiate:

$$
\frac{dV}{dx} = 12x^2 - 104x + 160 = 4(3x^2 - 26x + 40).
$$

Set this to zero and solve the quadratic:

$$
3x^2 - 26x + 40 = 0,
\qquad
x = \frac{26 \pm \sqrt{676 - 480}}{6} = \frac{26 \pm 14}{6}.
$$

So $x = \dfrac{40}{6} = \dfrac{20}{3}$ or $x = \dfrac{12}{6} = 2$.

The value $x = \dfrac{20}{3}$ is not possible, because the card is only $10$ cm
wide. So $x = 2$.

Check that it is a maximum with the second derivative:

$$
\frac{d^2V}{dx^2} = 24x - 104.
$$

At $x = 2$: $48 - 104 = -56 < 0$, so the volume is a maximum.

The greatest volume is

$$
V(2) = 4(8) - 52(4) + 160(2) = 32 - 208 + 320 = 144 \text{ cm}^3.
$$

The box is largest when the squares have side $2$ cm, and it then holds
$144$ cm$^3$.

## 4. Try it: the stationary point explorer

**Predict first.** The figure shows a cubic curve and a point you can slide along
it. Before you touch the slider, predict how many stationary points the curve
has, and predict the value of $\dfrac{dy}{dx}$ at each one. Write both
predictions down.

:::figure ch7-stationary-explorer

**Test.** Slide the point along the curve. Watch $\dfrac{dy}{dx}$ in the readout.
Find the two places where it is zero, and check that the tangent line is
horizontal there. Watch the sign of the second derivative as you pass each one.

**Explain.** Write two sentences. The first explains why the gradient is zero at
a maximum and at a minimum. The second explains how the sign of the second
derivative tells the two apart.

> **Watch out.** Three mistakes are common with stationary points.
>
> **Solving $f(x) = 0$ instead of $f'(x) = 0$.** A stationary point is where the
> *gradient* is zero, not the value. Setting $x^3 - 3x^2 + 2 = 0$ finds where the
> curve crosses the $x$-axis.
>
> **Forgetting the normal's negative reciprocal.** The normal is perpendicular
> to the tangent. For a tangent gradient of $2$, the normal gradient is
> $-\dfrac{1}{2}$, not $\dfrac{1}{2}$ and not $-2$.
>
> **Missing the invalid root in an optimisation problem.** The algebra can give
> a value that the context does not allow, such as $x = \dfrac{20}{3}$ when the
> card is only $10$ cm wide. **Re-check:** put each answer back into the context
> and reject the impossible ones before you use the second derivative.

## Progress check

Return to the box in the chapter problem.

1. Write down $\dfrac{dV}{dx}$ and the two values of $x$ that make it zero.
2. Explain why one of the two values is not possible.
3. Use the second derivative to confirm that the other value gives a maximum.
4. Work out the greatest volume.

## You should now be able to

- find stationary points by solving $f'(x) = 0$;
- classify a stationary point with the second derivative;
- find the equation of the tangent at a point;
- find the equation of the normal at a point;
- model a quantity as a function of one variable and find its greatest or least
  value;
- reject a stationary value that the context does not allow.
