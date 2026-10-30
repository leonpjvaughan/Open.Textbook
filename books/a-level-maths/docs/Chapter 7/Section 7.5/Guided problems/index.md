---
title: 7.5 Tangents, normals, maxima, minima and stationary points — Practise with help
chapter: 7
chapter_title: Differentiation
section: '7.5'
section_title: Tangents, normals, maxima, minima and stationary points
refs:
- G3
kind: guided-problems
---

# 7.5 Tangents, normals, maxima, minima and stationary points — Practise with help

Work each question closed book first. For every optimisation, write the quantity
as a function of one variable before you differentiate.

## Warm-up: remember

1. Solve $x^2 - 5x + 6 = 0$.
2. A line has gradient $3$. Work out the gradient of any line perpendicular to
   it.
3. Write the equation of the straight line through $(2, 5)$ with gradient $-1$.

<details markdown="1">
<summary>Answers</summary>

1. Factorise: $(x - 2)(x - 3) = 0$, so $x = 2$ or $x = 3$.
2. The perpendicular gradient is $-\dfrac{1}{3}$.
3. $y - 5 = -1(x - 2)$, which is $y = -x + 7$.

If question 2 was hard, revise perpendicular gradients in Chapter 3.
</details>

:::figure warm-up-gate


## Practise with help

**1.** Find and classify the stationary points of $y = x^3 - 12x$.

<details markdown="1">
<summary>Hint</summary>

Differentiate and solve $\dfrac{dy}{dx} = 0$. Then use the second derivative to
classify each answer.
</details>

<details markdown="1">
<summary>Next step</summary>

$\dfrac{dy}{dx} = 3x^2 - 12$, which is zero when $x^2 = 4$. So $x = 2$ or
$x = -2$. Find the $y$-coordinates next.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dy}{dx} = 3x^2 - 12 = 3(x - 2)(x + 2),
\qquad
\frac{d^2y}{dx^2} = 6x.
$$

The stationary points are at $x = 2$ and $x = -2$.

$y(2) = 8 - 24 = -16$ and $y(-2) = -8 + 24 = 16$.

At $x = 2$, the second derivative is $12 > 0$, so $(2, -16)$ is a minimum.
At $x = -2$, the second derivative is $-12 < 0$, so $(-2, 16)$ is a maximum.
</details>

**2.** Find and classify the stationary point of $y = x^2 - 6x + 5$.

<details markdown="1">
<summary>Hint</summary>

This is a quadratic, so it has one stationary point. Differentiate and solve.
</details>

<details markdown="1">
<summary>Next step</summary>

$\dfrac{dy}{dx} = 2x - 6$, which is zero at $x = 3$. The second derivative is
the constant $2$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dy}{dx} = 2x - 6 = 0
\quad \Rightarrow \quad x = 3.
$$

The $y$-coordinate is $y(3) = 9 - 18 + 5 = -4$. The second derivative is
$\dfrac{d^2y}{dx^2} = 2 > 0$, so the curve is convex and the stationary point
$(3, -4)$ is a minimum.
</details>

**3.** Find the equation of the tangent to $y = x^3 - 2x$ at the point where
$x = 1$.

<details markdown="1">
<summary>Hint</summary>

Work out the $y$-coordinate, then the gradient. Put both into
$y - y_1 = m(x - x_1)$.
</details>

<details markdown="1">
<summary>Next step</summary>

$y(1) = 1 - 2 = -1$. The gradient is $\dfrac{dy}{dx} = 3x^2 - 2$, which equals
$1$ at $x = 1$. Now substitute into the line formula.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dy}{dx} = 3x^2 - 2,
\qquad
m = 3(1)^2 - 2 = 1.
$$

The point is $(1, -1)$ and the gradient is $1$, so

$$
y - (-1) = 1(x - 1),
\qquad
y = x - 2.
$$

</details>

**4.** Find the equation of the normal to $y = x^2$ at the point where $x = 2$.

<details markdown="1">
<summary>Hint</summary>

Find the tangent gradient first, then take its negative reciprocal. The normal
passes through the same point on the curve.
</details>

<details markdown="1">
<summary>Next step</summary>

$y(2) = 4$ and $\dfrac{dy}{dx} = 2x = 4$ at $x = 2$. The normal gradient is
$-\dfrac{1}{4}$.
</details>

<details markdown="1">
<summary>Full working</summary>

The point is $(2, 4)$ and the tangent gradient is $4$, so the normal gradient is
$-\dfrac{1}{4}$:

$$
y - 4 = -\tfrac{1}{4}(x - 2),
\qquad
y = -\tfrac{1}{4}x + \tfrac{9}{2}.
$$

</details>

**5.** A rectangle has a perimeter of $20$ cm. Let one side be $x$ cm. Write the
area $A$ as a function of $x$, and find the value of $x$ that gives the greatest
area.

<details markdown="1">
<summary>Hint</summary>

If one side is $x$, the other side is $10 - x$, because the two sides add to half
the perimeter. Multiply them for the area.
</details>

<details markdown="1">
<summary>Next step</summary>

$A = x(10 - x) = 10x - x^2$. Differentiate and solve $\dfrac{dA}{dx} = 0$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
A = x(10 - x) = 10x - x^2,
\qquad
\frac{dA}{dx} = 10 - 2x.
$$

Set $10 - 2x = 0$, so $x = 5$. The second derivative is
$\dfrac{d^2A}{dx^2} = -2 < 0$, so the area is a maximum at $x = 5$.

The rectangle is a square of side $5$ cm, with area $25$ cm$^2$.
</details>

**6.** The volume of a box is $V = x(16 - 2x)(10 - 2x)$ for $0 < x < 5$. Use
$\dfrac{dV}{dx} = 12x^2 - 104x + 160$ to find the value of $x$ that makes
$\dfrac{dV}{dx} = 0$, and confirm that it gives a maximum.

<details markdown="1">
<summary>Hint</summary>

Divide the quadratic by $4$ before solving. Only one root lies between $0$ and
$5$.
</details>

<details markdown="1">
<summary>Next step</summary>

Solve $3x^2 - 26x + 40 = 0$. The quadratic factorises as
$(3x - 20)(x - 2) = 0$. Reject the root that is too large for the card.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
3x^2 - 26x + 40 = (3x - 20)(x - 2) = 0.
$$

The roots are $x = \dfrac{20}{3}$ and $x = 2$. The first root gives
$2x = \dfrac{40}{3} > 10$, so the card is not wide enough. Only $x = 2$
remains.

$$
\frac{d^2V}{dx^2} = 24x - 104,
\qquad
\text{at } x = 2: \quad 48 - 104 = -56 < 0.
$$

The second derivative is negative, so $x = 2$ gives a maximum.
</details>
