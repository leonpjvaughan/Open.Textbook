---
title: 7.9 Implicit and parametric differentiation — Practise with help
chapter: 7
chapter_title: Differentiation
section: '7.9'
section_title: Implicit and parametric differentiation
refs:
- G5
kind: guided-problems
---

# 7.9 Implicit and parametric differentiation — Practise with help

Work each question closed book first. When you differentiate with respect to
$x$, write $\dfrac{dy}{dx}$ every time a $y$-term appears.

## Warm-up: remember

1. Differentiate $y = x^2\sin x$ with the product rule.
2. Differentiate $y = \sin 2x$ with the chain rule.
3. Differentiate $y = \cos t$ with respect to $t$.

<details markdown="1">
<summary>Answers</summary>

1. $\dfrac{dy}{dx} = 2x\sin x + x^2\cos x$.
2. $\dfrac{dy}{dx} = 2\cos 2x$.
3. $\dfrac{dy}{dt} = -\sin t$.

If question 1 was hard, revise the product rule in Section 7.7.
</details>

:::figure warm-up-gate


## Practise with help

**1.** Find $\dfrac{dy}{dx}$ for the circle $x^2 + y^2 = 16$.

<details markdown="1">
<summary>Hint</summary>

Differentiate both sides with respect to $x$. The $y^2$ term becomes
$2y\dfrac{dy}{dx}$ by the chain rule.
</details>

<details markdown="1">
<summary>Next step</summary>

$2x + 2y\dfrac{dy}{dx} = 0$. Move the $2x$ to the other side and divide by $2y$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
2x + 2y\frac{dy}{dx} = 0
\quad \Rightarrow \quad
\frac{dy}{dx} = -\frac{x}{y}.
$$

The gradient depends on both coordinates. It is undefined where $y = 0$, at the
points $(\pm 4, 0)$, and the tangent is vertical there.
</details>

**2.** Find the gradient of the circle $x^2 + y^2 = 100$ at the point $(6, 8)$.

<details markdown="1">
<summary>Hint</summary>

From the pattern of question 1, $\dfrac{dy}{dx} = -\dfrac{x}{y}$. Substitute the
coordinates of the given point.
</details>

<details markdown="1">
<summary>Next step</summary>

Substitute $x = 6$ and $y = 8$ into $-\dfrac{x}{y}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dy}{dx} = -\frac{6}{8} = -\frac{3}{4}.
$$

The gradient is negative because the circle is falling at that point in the
first quadrant.
</details>

**3.** Find $\dfrac{dy}{dx}$ for $xy = 12$.

<details markdown="1">
<summary>Hint</summary>

The left side is a product, so use the product rule when you differentiate
$xy$ with respect to $x$.
</details>

<details markdown="1">
<summary>Next step</summary>

Differentiating gives $y + x\dfrac{dy}{dx} = 0$, because the derivative of the
constant $12$ is zero.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
y + x\frac{dy}{dx} = 0
\quad \Rightarrow \quad
\frac{dy}{dx} = -\frac{y}{x}.
$$

This matches the derivative of $y = \dfrac{12}{x}$, which is
$-\dfrac{12}{x^2} = -\dfrac{y}{x}$.
</details>

**4.** Find $\dfrac{dy}{dx}$ for $x^2 + xy = 6$.

<details markdown="1">
<summary>Hint</summary>

Differentiate $x^2$ term by term. The $xy$ term needs the product rule, and the
constant $6$ differentiates to zero.
</details>

<details markdown="1">
<summary>Next step</summary>

$2x + y + x\dfrac{dy}{dx} = 0$. Collect the derivative term on its own.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
2x + y + x\frac{dy}{dx} = 0
\quad \Rightarrow \quad
x\frac{dy}{dx} = -(2x + y)
\quad \Rightarrow \quad
\frac{dy}{dx} = -\frac{2x + y}{x}.
$$

</details>

**5.** A curve is given by $x = t^2$, $y = t^4$. Find $\dfrac{dy}{dx}$.

<details markdown="1">
<summary>Hint</summary>

Differentiate $x$ and $y$ separately with respect to $t$, then divide
$\dfrac{dy}{dt}$ by $\dfrac{dx}{dt}$.
</details>

<details markdown="1">
<summary>Next step</summary>

$\dfrac{dx}{dt} = 2t$ and $\dfrac{dy}{dt} = 4t^3$. Write the quotient and cancel
the common factor.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dy}{dx} = \frac{4t^3}{2t} = 2t^2.
$$

Cancelling the common factor $2t$ leaves a tidy expression in $t$.
</details>

**6.** Find the equation of the tangent to $x^2 + y^2 = 25$ at the point
$(4, 3)$.

<details markdown="1">
<summary>Hint</summary>

Find the gradient first with $\dfrac{dy}{dx} = -\dfrac{x}{y}$, then use the
point and the gradient in $y - y_1 = m(x - x_1)$.
</details>

<details markdown="1">
<summary>Next step</summary>

At $(4, 3)$ the gradient is $-\dfrac{4}{3}$. Substitute into the tangent
formula.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
y - 3 = -\tfrac{4}{3}(x - 4),
\qquad
y = -\tfrac{4}{3}x + \tfrac{16}{3} + 3 = -\tfrac{4}{3}x + \tfrac{25}{3}.
$$

The tangent is perpendicular to the radius from the origin to $(4, 3)$, which is
why its gradient is the negative reciprocal of $\dfrac{3}{4}$.
</details>
