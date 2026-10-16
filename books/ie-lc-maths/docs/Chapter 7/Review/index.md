---
title: 'Chapter 7: Review'
chapter: 7
kind: review
---

# Chapter 7: Review

## The chapter problem, solved

**When is the tank filling fastest?** Water flows into a tank. After $t$ minutes the volume
is

$$V(t) = 12t^2 - t^3 \text{ litres}, \qquad 0 \le t \le 8.$$

**The rate.** Differentiate term by term:

$$V'(t) = 24t - 3t^2 = 3t(8 - t) \text{ litres per minute}.$$

The same rate comes from the product form $V = t^2(12 - t)$ and from the quotient form
$V = \dfrac{12t^3 - t^4}{t}$. All three routes agree, which is a good check on the algebra.

**The greatest volume.** Set $V'(t) = 0$: $3t(8 - t) = 0$, so $t = 0$ or $t = 8$. At
$t = 8$,

$$V(8) = 12(64) - 512 = 256 \text{ litres}.$$

Since $V''(8) = 24 - 48 = -24 < 0$, this is a maximum. The tank holds $256$ litres and is
full at $t = 8$ minutes.

**When the tank fills fastest.** The rate is itself a function, and its greatest value is
where its derivative is zero:

$$V''(t) = 24 - 6t = 0 \quad\Rightarrow\quad t = 4.$$

The rate there is

$$V'(4) = 24(4) - 3(16) = 96 - 48 = 48 \text{ litres per minute}.$$

Since $V''(t)$ is positive before $t = 4$ and negative after, the rate rises to $48$ and
then falls. The tank fills fastest at $t = 4$ minutes, at a rate of $48$ litres per minute.

**Average against instantaneous.** The average rate over the first four minutes is
$\dfrac{V(4)}{4} = \dfrac{128}{4} = 32$ litres per minute. The instantaneous rate at
$t = 4$ is $48$, so the tank is filling more quickly at that moment than on average.

**The shape.** $V(t) = t^2(12 - t)$, so the graph starts at the origin with a double root
and rises to a maximum at $t = 8$. The second derivative $V''(t) = 24 - 6t$ is positive for
$t < 4$ and negative for $t > 4$, so the curve is concave up at first and concave down
afterwards. The point $(4, 128)$ is the inflection, and it is exactly where the rate is
greatest. The steepest part of the volume graph is the moment the tank fills fastest.

**The answer.** The tank fills fastest at $t = 4$ minutes, when water is entering at
$48$ litres per minute. The tank is full at $t = 8$ minutes, holding $256$ litres.

## Mixed practice — choose the method first

Work through these without notes. For each one, decide **what is being asked** and say why,
before you calculate. Two of them come from earlier chapters, and two are deliberately
questions where the obvious first move is wrong.

1. Differentiate $f(x) = x^2$ from first principles.
2. Differentiate $y = 4x^3 - 2x^2 + 7x - 3$.
3. Differentiate $y = (3x + 1)(x^2 - 2)$.
4. Differentiate $y = \dfrac{2x + 1}{x - 3}$.
5. Differentiate $y = (3x - 4)^5$.
6. Find $\dfrac{d^2y}{dx^2}$ for $y = x^4 - 3x^2$ and say where the curve is concave up.
7. A ball is thrown so that its height after $t$ seconds is $h(t) = 20t - 5t^2$ metres.
   Find the velocity and the time at which the height is greatest.
8. Find and classify the stationary points of $y = x^3 - 12x$.
9. Sketch $y = x^3 - 6x^2 + 9x$, marking the intercepts, the turning points and the point of
   inflection.
10. Differentiate $y = e^{4x}$, $y = 3^x$, $y = \sin 5x$ and $y = \cos 2x$.

## What you can now do

- find a derivative from first principles, using the limit of an average gradient;
- use the power rule on whole, negative and fractional powers;
- differentiate a product with the product rule;
- differentiate a quotient with the quotient rule;
- differentiate a function of a function with the chain rule;
- find a second derivative and use it to describe concavity;
- read a derivative as a rate of change and write its units;
- find and classify stationary points, and answer a maximum or minimum question;
- sketch a curve from its equation and its derivatives;
- differentiate exponential and trigonometric functions.

## Thinking back

Look at the quantity you chose at the start of the chapter — the water level, the queue, the
phone charge, the room temperature.

Write down its value and its rate of change. Say which one the decision you wrote down
needs. If the rate is what matters, describe what the derivative would tell you: is it
rising or falling, how fast, and does it ever turn?

Then answer this: in your example, would the rate be greatest at the start, at the end, or
somewhere in between? Say why. If the rate is constant, say that instead, and explain what
that would mean for the quantity. Saying why a model is simple is part of the mathematics,
and it is often more useful than forcing a complicated answer.
