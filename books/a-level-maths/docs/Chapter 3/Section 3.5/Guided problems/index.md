---
title: 3.5 Parametric equations in modelling — Practise with help
chapter: 3
chapter_title: Coordinate geometry
section: '3.5'
section_title: Parametric equations in modelling
dfe:
- C4
- OT3
kind: guided-problems
---

# 3.5 Parametric equations in modelling — Practise with help

Work each one first, closed book. Before you calculate, decide what the question
wants: a position, a time, or the path itself. Write down the domain of the
parameter as well.

## Warm-up: remember

1. Solve $12t - 3t^2 = 0$.
2. Complete the square on $y = 10t - t^2$ and state its greatest value.
3. Write the equation of the circle with centre $(3, -1)$ and radius $4$.

<details markdown="1">
<summary>Answers</summary>

1. $3t(4 - t) = 0$, so $t = 0$ or $t = 4$.
2. $y = -(t^2 - 10t) = -((t - 5)^2 - 25) = -(t - 5)^2 + 25$. The greatest value
   is $25$, at $t = 5$.
3. $(x - 3)^2 + (y + 1)^2 = 16$.

If question 1 was hard, revisit solving a quadratic by factorising before you
continue.
</details>

## Practise with help

**1.** A ball is modelled by $x = 10t$, $y = 15t - 5t^2$. Find the greatest
height of the ball and the time at which it occurs.

<details markdown="1">
<summary>Hint</summary>

The height is the $y$ equation. It is a quadratic in $t$, so complete the square
or read off the vertex.
</details>

<details markdown="1">
<summary>Next step</summary>

Write $y = -5(t^2 - 3t)$, then complete the square inside the bracket.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
y = -5(t^2 - 3t) = -5\left(\left(t - \frac{3}{2}\right)^2 - \frac{9}{4}\right)
= -5\left(t - \frac{3}{2}\right)^2 + \frac{45}{4}.
$$

The squared term is subtracted, so the greatest height is $\frac{45}{4} = 11.25$
m, reached at $t = \frac{3}{2} = 1.5$ s.
</details>

**2.** For the model $x = 10t$, $y = 15t - 5t^2$, find the Cartesian equation of
the path.

<details markdown="1">
<summary>Hint</summary>

Make $t$ the subject of the simpler equation, $x = 10t$, then substitute.
</details>

<details markdown="1">
<summary>Next step</summary>

$t = \dfrac{x}{10}$. Substitute that into $y = 15t - 5t^2$ and simplify.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
y = 15\left(\frac{x}{10}\right) - 5\left(\frac{x}{10}\right)^2
= \frac{3}{2}x - 5 \times \frac{x^2}{100}
= \frac{3}{2}x - \frac{x^2}{20}.
$$

The path is a parabola. The equation says where the ball goes; the parameter
says when.
</details>

**3.** For the model $x = 10t$, $y = 15t - 5t^2$, find where the ball lands.

<details markdown="1">
<summary>Hint</summary>

The ball lands when its height is $0$, so solve $y = 0$ for $t$. Then find $x$.
</details>

<details markdown="1">
<summary>Next step</summary>

$15t - 5t^2 = 5t(3 - t) = 0$, so $t = 0$ or $t = 3$. Reject $t = 0$ as the kick.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
5t(3 - t) = 0, \qquad t = 0 \text{ or } t = 3.
$$

The ball lands at $t = 3$ s. Substitute into $x = 10t$:

$$
x = 10 \times 3 = 30.
$$

The ball lands $30$ m from the kick. The domain of the model is
$0 \le t \le 3$.
</details>

**4.** A wheel cabin is modelled by $x = 7\cos t$, $y = 9 + 7\sin t$. Find the
path of the cabin and its greatest height.

<details markdown="1">
<summary>Hint</summary>

For the path, rearrange each equation so the trigonometric function stands alone,
then square and add. For the greatest height, use the largest value of
$\sin t$.
</details>

<details markdown="1">
<summary>Next step</summary>

$\cos t = \dfrac{x}{7}$ and $\sin t = \dfrac{y - 9}{7}$. The largest value of
$\sin t$ is $1$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\left(\frac{x}{7}\right)^2 + \left(\frac{y - 9}{7}\right)^2 = 1,
$$

$$
x^2 + (y - 9)^2 = 49.
$$

The path is a circle with centre $(0, 9)$ and radius $7$. The greatest height is
where $\sin t = 1$:

$$
y = 9 + 7 \times 1 = 16.
$$

The cabin rises to $16$ m.
</details>

**5.** A point moves on $x = 3 + 2\cos t$, $y = 1 + 2\sin t$. Find its position
at $t = \frac{\pi}{2}$ and at $t = \pi$.

<details markdown="1">
<summary>Hint</summary>

Substitute each value of $t$ into both equations. Use
$\cos\frac{\pi}{2} = 0$, $\sin\frac{\pi}{2} = 1$, $\cos\pi = -1$ and
$\sin\pi = 0$.
</details>

<details markdown="1">
<summary>Next step</summary>

At $t = \frac{\pi}{2}$: $x = 3 + 2 \times 0$ and $y = 1 + 2 \times 1$.
</details>

<details markdown="1">
<summary>Full working</summary>

At $t = \frac{\pi}{2}$:

$$
x = 3 + 2 \times 0 = 3, \qquad y = 1 + 2 \times 1 = 3.
$$

The point is $(3, 3)$.

At $t = \pi$:

$$
x = 3 + 2 \times (-1) = 1, \qquad y = 1 + 2 \times 0 = 1.
$$

The point is $(1, 1)$.
</details>

**6.** An object moves around the circle $(x - 4)^2 + (y - 6)^2 = 9$. It starts
at the easternmost point and travels anticlockwise at a steady speed, one lap
every $20$ seconds. Write parametric equations for its position after $t$
seconds.

<details markdown="1">
<summary>Hint</summary>

Read the centre and the radius from the circle. The easternmost point is where
the angle is $0$. One lap is a full turn, so the angle after $t$ seconds is
$\frac{2\pi t}{20}$.
</details>

<details markdown="1">
<summary>Next step</summary>

The centre is $(4, 6)$ and the radius is $3$, so start from
$x = 4 + 3\cos(\theta)$ and $y = 6 + 3\sin(\theta)$ with
$\theta = \frac{2\pi t}{20}$.
</details>

<details markdown="1">
<summary>Full working</summary>

The circle has centre $(4, 6)$ and radius $3$, so

$$
x = 4 + 3\cos\left(\frac{\pi t}{10}\right), \qquad
y = 6 + 3\sin\left(\frac{\pi t}{10}\right),
$$

since $\frac{2\pi}{20} = \frac{\pi}{10}$. At $t = 0$ the point is
$(4 + 3, 6) = (7, 6)$, which is the easternmost point. After $20$ seconds the
angle is a full turn and the point returns to $(7, 6)$, so one lap takes $20$
seconds as required.
</details>
