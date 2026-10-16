---
title: 7.9 Curve sketching — Learn
chapter: 7
chapter_title: Differentiation
section: '7.9'
section_title: Curve sketching
tier: O
refs:
- '5.2'
kind: walkthrough
---

# 7.9 Curve sketching — Learn

**Prerequisites:** Sections 7.6 and 7.8 — concavity, stationary points and the second
derivative test.

**Objectives:** find the intercepts, stationary points and inflection of a curve; use the
second derivative to describe its shape; sketch the curve and label its features.

By the end of this section you can draw the graph of a function from its equation and its
derivatives, without plotting many points.

## The features to find

A sketch is not a plot. It shows the features that matter, in the right places. Five
questions find them.

1. **Intercepts.** Put $x = 0$ for the $y$-intercept. Solve $f(x) = 0$ for the
   $x$-intercepts.
2. **Stationary points.** Solve $f'(x) = 0$, and work out the $y$-value at each one.
3. **Classify.** Use $f''$ to decide which stationary points are maxima and which are
   minima.
4. **Concavity.** Use the sign of $f''$ to find where the curve bends up and where it bends
   down.
5. **End behaviour.** Decide what happens to $f(x)$ as $x$ grows large in each direction.

**Example 1.** Sketch $y = x^3 - 3x$.

- **Intercepts.** At $x = 0$, $y = 0$. Solving $x(x^2 - 3) = 0$ gives $x = 0$,
  $x = \sqrt{3} \approx 1.73$ and $x = -\sqrt{3} \approx -1.73$.
- **Stationary points.** $\dfrac{dy}{dx} = 3x^2 - 3 = 0$ gives $x = \pm 1$. Then
  $y(-1) = 2$ and $y(1) = -2$.
- **Classify.** $\dfrac{d^2y}{dx^2} = 6x$. At $x = -1$ it is $-6$, so $(-1, 2)$ is a local
  maximum. At $x = 1$ it is $6$, so $(1, -2)$ is a local minimum.
- **Concavity.** $6x < 0$ for $x < 0$ and $6x > 0$ for $x > 0$, so the origin is a point of
  inflection.
- **End behaviour.** The leading term is $x^3$, so the curve falls to the bottom left and
  rises to the top right.

The sketch shows a rising cubic with a maximum at $(-1, 2)$, an inflection at the origin,
and a minimum at $(1, -2)$.

## Sketching the tank volume

**Example 2.** Sketch $V(t) = 12t^2 - t^3$ for $0 \le t \le 8$.

- **Intercepts.** $V(t) = t^2(12 - t)$, so $t = 0$ is a double root and $t = 12$ is the
  other. On the interval only $t = 0$ is used, and the graph starts there.
- **Stationary points.** $V'(t) = 3t(8 - t) = 0$ gives $t = 0$ and $t = 8$. On the
  interval, $t = 8$ is the turning point, with $V(8) = 256$.
- **Classify.** $V''(8) = -24 < 0$, so $t = 8$ is a maximum.
- **Concavity.** $V''(t) = 24 - 6t$ is positive for $t < 4$ and negative for $t > 4$. The
  curve is concave up at the start and concave down at the end, with an inflection at
  $t = 4$.
- **The shape.** The volume rises from zero, steepening until $t = 4$, then still rising but
  more slowly, until it levels off at $t = 8$.

The rate $V'(t) = 24t - 3t^2$ is greatest at $t = 4$, exactly where the volume graph changes
from concave up to concave down. The steepest part of the volume graph is at the inflection
point.

> **Watch out.** A point of inflection is flat only sometimes, and a flat point is not
> always a turning point. On the tank graph, $t = 4$ is an inflection but the curve is still
> rising steeply there. Mark each feature with its coordinates, and label the axes with the
> variable names and units. An unlabelled sketch loses most of its meaning.

## Progress check

Back to the chapter problem. The tank volume is $V(t) = 12t^2 - t^3$ litres for
$0 \le t \le 8$.

Sketch the graph of $V$ against $t$. Mark the intercept, the maximum at $t = 8$, and the
point of inflection at $t = 4$. Then state what the inflection tells you about the rate.

Keep the sketch. The Review uses it to explain the whole answer.

## You should now be able to

- find the intercepts, stationary points and inflection of a curve;
- use the sign of the second derivative to describe concavity;
- decide the end behaviour from the leading term;
- sketch a curve and label its important features with coordinates and units.
