---
title: 7.1 The derivative as a gradient and a rate of change — Learn
chapter: 7
chapter_title: Differentiation
section: '7.1'
section_title: The derivative as a gradient and a rate of change
dfe:
- G1
kind: walkthrough
---

# 7.1 The derivative as a gradient and a rate of change — Learn

**Prerequisites:** coordinates and the gradient of a straight line; substituting a
value into a function; function notation such as $f(x)$.

**By the end of this section you can:** estimate the gradient of a curve at a
point; explain the tangent as the limit of a chord; interpret a derivative as a
rate of change; read the notation $f'(x)$ and $\dfrac{dy}{dx}$; and sketch the
gradient function of a simple curve.

## 1. From a chord to a tangent

The gradient of a straight line is the same everywhere. A curve is different: its
gradient changes from point to point.

To measure the gradient of a curve at a point $P$, draw a chord from $P$ to a
nearby point $Q$ and work out the gradient of that chord. Then move $Q$ closer to
$P$ and work it out again. As $Q$ approaches $P$, the chord turns towards the
**tangent** at $P$. The tangent is the straight line that touches the curve at
$P$ and travels in the same direction as the curve there.

The gradient of the tangent is the gradient of the curve at $P$.

**Example 1.** The curve is $y = x^2$ and the point $P$ is $(2, 4)$. Use a chord
from $P$ to $Q(2 + h, (2 + h)^2)$ to estimate the gradient at $P$.

The gradient of the chord is

$$
\frac{(2 + h)^2 - 4}{h}.
$$

| $h$ | $(2 + h)^2$ | gradient of the chord |
|---|---|---|
| $1$ | $9$ | $\dfrac{9 - 4}{1} = 5$ |
| $0.5$ | $6.25$ | $\dfrac{6.25 - 4}{0.5} = 4.5$ |
| $0.1$ | $4.41$ | $\dfrac{4.41 - 4}{0.1} = 4.1$ |
| $0.01$ | $4.0401$ | $\dfrac{4.0401 - 4}{0.01} = 4.01$ |

The gradients close in on $4$. So the gradient of $y = x^2$ at $P(2, 4)$ is $4$.

## 2. The derivative

Write the chord gradient for a general function $f$ from $x$ to $x + h$:

$$
\text{gradient of the chord} = \frac{f(x + h) - f(x)}{h}.
$$

Now let $h$ tend to zero. If the chord gradients settle on one value, that value
is the gradient of the curve at $x$. It is called the **derivative**, written
$f'(x)$:

$$
f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}.
$$

The symbol $\lim$ means "the value approached as". Section 7.2 uses this
definition to differentiate from first principles.

For $y = x^2$ the algebra gives $f'(x) = 2x$, so the gradient at $x = 2$ is
$2 \times 2 = 4$. Example 1 reached the same value by estimation.

Two notations are both used, and they mean the same thing:

$$
f'(x) \quad \text{and} \quad \frac{dy}{dx}.
$$

The notation $\dfrac{dy}{dx}$ says "the rate at which $y$ changes as $x$ changes".
It is a single symbol, not a fraction to cancel.

## 3. The derivative is a rate of change

If $y$ measures one quantity and $x$ measures another, then $\dfrac{dy}{dx}$ is
the **rate of change** of $y$ with respect to $x$.

- If $s$ is the distance travelled in metres and $t$ is the time in seconds, then
  $\dfrac{ds}{dt}$ is the speed in metres per second.
- If $P$ is the population of a town and $t$ is the number of years, then
  $\dfrac{dP}{dt}$ is the change in population per year.
- If $C$ is the cost of making $n$ items, then $\dfrac{dC}{dn}$ is the extra cost
  of making one more item.

**Example 2.** A ball is thrown upwards. Its height after $t$ seconds is
$s = 20t - 5t^2$ metres.

**(a)** Find the average speed between $t = 1$ and $t = 2$ seconds.

The ball is at $s(1) = 20 - 5 = 15$ m and at $s(2) = 40 - 20 = 20$ m. The
change in height is $20 - 15 = 5$ m over $1$ second, so the average speed is
$5$ m/s.

**(b)** Estimate the speed at $t = 1$ second.

Use a chord from $t = 1$ to $t = 1.1$. The height at $t = 1.1$ is

$$
s(1.1) = 20(1.1) - 5(1.1)^2 = 22 - 6.05 = 15.95 \text{ m}.
$$

The speed over this short interval is

$$
\frac{15.95 - 15}{0.1} = 9.5 \text{ m/s}.
$$

A chord to $t = 1.01$ gives $9.95$ m/s. The speed at $t = 1$ is therefore about
$10$ m/s. The derivative gives the exact value, which is $10$ m/s.

The average speed over a whole second is not the same as the speed at one
instant. The chord measures the average; the tangent measures the instantaneous
rate.

## 4. The gradient function

The derivative of $f$ is a function in its own right. For each input $x$ it
returns the gradient of $f$ at that point. Its graph shows at a glance where $f$
rises, where it falls, and where it turns.

- Where $f$ rises, $f'(x) > 0$.
- Where $f$ falls, $f'(x) < 0$.
- Where $f$ is flat, $f'(x) = 0$.

**Example 3.** A curve rises to a peak, falls to a trough, then rises again.
Sketch the graph of its derivative.

On the rising parts the derivative is positive, so the graph of $f'$ sits above
the $x$-axis. At the peak and at the trough the derivative is zero, so the graph
crosses the $x$-axis. On the falling part the derivative is negative, so the
graph sits below the $x$-axis. The graph of $f'$ is a curve that starts positive,
crosses the axis at the peak, stays negative until the trough, and then stays
positive.

## 5. Try it: the tangent explorer

**Predict first.** You will move a point $P$ along a curve and shrink a chord
towards it. Before you touch the controls, predict the gradient of the curve at
the highest point between $x = -2$ and $x = 2$, and predict what happens to the
chord gradient as you slide the chord length down towards zero. Write both
predictions down.

:::figure ch7-gradient-explorer

**Test.** Move the point slider and watch the tangent line. Slide the chord
length down and watch the two numbers in the readout. Check that the chord
gradient moves towards the tangent gradient, and that the tangent gradient is
zero at the two turning points.

**Explain.** Write two sentences. The first explains why the chord gradient
approaches the tangent gradient as the chord gets shorter. The second explains
why the tangent is horizontal at each turning point.

> **Watch out.** Three mistakes are common with gradients.
>
> **Confusing the value of the function with its gradient.** The point $(2, 4)$
> lies on $y = x^2$, so the value is $4$. The gradient there is $4$ as well, but
> that is a coincidence. At $x = 3$ the value is $9$ while the gradient is $6$.
>
> **Treating the average rate as the instantaneous rate.** The average speed
> over a long interval is one number; the speed at a single instant is another.
> A speed camera reads the instantaneous rate, and a journey's average speed
> covers the whole trip.
>
> **Moving $Q$ to the wrong side of $P$.** The chord gradient is the same
> whichever side $Q$ lies on, but the tangent you draw must pass through $P$.
> **Re-check:** after estimating a gradient, draw the tangent and read its rise
> over run by eye. The two values should agree closely.

## You should now be able to

- estimate the gradient of a curve at a point by shrinking a chord;
- explain the tangent as the limit of the chord;
- write and read the definition of the derivative;
- interpret a derivative as a rate of change and give its units;
- sketch the graph of a gradient function from the graph of the function;
- say why the gradient is zero at a turning point.
