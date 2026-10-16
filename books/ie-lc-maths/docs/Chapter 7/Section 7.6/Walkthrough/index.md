---
title: 7.6 The second derivative and concavity — Learn
chapter: 7
chapter_title: Differentiation
section: '7.6'
section_title: The second derivative and concavity
tier: O
refs:
- '5.2'
kind: walkthrough
---

# 7.6 The second derivative and concavity — Learn

**Prerequisites:** Sections 7.1 to 7.2 — the derivative and the power rule.

**Objectives:** find a second derivative; explain what its sign says about a curve; identify
a point of inflection.

By the end of this section you can differentiate a function twice and use the result to
describe the shape of its graph.

## Differentiating twice

The derivative $f'(x)$ is itself a function, so it can be differentiated again. The result
is the **second derivative**, written $f''(x)$ or $\dfrac{d^2y}{dx^2}$.

> **The second derivative.** $f''(x)$ is the derivative of $f'(x)$, found by
> differentiating twice.

**Example 1.** Find $\dfrac{d^2y}{dx^2}$ for $y = x^4 - 2x^2$.

Differentiate once: $\dfrac{dy}{dx} = 4x^3 - 4x$. Differentiate again:

$$\frac{d^2y}{dx^2} = 12x^2 - 4.$$

**Example 2.** Find $\dfrac{d^2y}{dx^2}$ for $y = 2x^3 - 3x^2 + 5$.

$$\frac{dy}{dx} = 6x^2 - 6x \qquad \frac{d^2y}{dx^2} = 12x - 6.$$

## What the second derivative means

The first derivative measures how fast $f$ changes. The second derivative measures how fast
**the gradient** changes.

- When $f''(x) > 0$, the gradient is increasing. The curve bends upwards, like a cup.
- When $f''(x) < 0$, the gradient is decreasing. The curve bends downwards, like a cap.

A curve that bends upwards is **concave up**. A curve that bends downwards is **concave
down**. A point where the concavity changes is a **point of inflection**.

**Example 3.** Describe the concavity of $y = x^3 - 3x$.

The second derivative is $\dfrac{d^2y}{dx^2} = 6x$. This is negative for $x < 0$ and
positive for $x > 0$. So the curve is concave down to the left of the origin and concave up
to the right. The origin is a point of inflection, because the concavity changes there.

**Example 4.** For the tank volume $V(t) = 12t^2 - t^3$, the rate is
$V'(t) = 24t - 3t^2$. Differentiate the rate:

$$V''(t) = 24 - 6t.$$

The rate itself changes fastest where $V''$ is largest in size, and the rate stops rising
where $V''(t) = 0$, at $t = 4$.

> **Watch out.** The second derivative is not the square of the first derivative.
> $\dfrac{d^2y}{dx^2}$ means "differentiate twice", and it is written with a small $2$ in
> the top and the bottom for that reason. Also, the sign of $f''$ does not say whether $f$
> is rising or falling. A curve can rise while bending downwards, as $y = -x^2$ does for
> $x < 0$. The sign of $f'$ decides rising or falling, and the sign of $f''$ decides the
> bending.

## Progress check

Back to the chapter problem. The tank volume is $V(t) = 12t^2 - t^3$, the rate is
$V'(t) = 24t - 3t^2$, and the second derivative is $V''(t) = 24 - 6t$.

Work out $V''(4)$. Then say what $V''(4) = 0$ means for the rate, and use the fact that
$V''(t)$ changes from positive to negative at $t = 4$ to explain why the rate is greatest
there.

Keep this reasoning. Section 7.8 turns it into the answer to the chapter problem.

## You should now be able to

- find a second derivative by differentiating twice;
- say whether a curve is concave up or concave down from the sign of $f''$;
- identify a point of inflection where the concavity changes;
- explain why $f''$ is not the square of $f'$, and why its sign does not decide rising or
  falling.
