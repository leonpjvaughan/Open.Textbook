---
title: 3.5 Parametric equations in modelling — Learn
chapter: 3
chapter_title: Coordinate geometry
section: '3.5'
section_title: Parametric equations in modelling
dfe:
- C4
- OT3
kind: walkthrough
---

# 3.5 Parametric equations in modelling — Learn

**Prerequisites:** converting between parametric and Cartesian forms from 3.4;
the equation of a circle from 3.3; solving a quadratic from 2.4; modelling,
assumptions and refinements from 2.12.

**By the end of this section you can:** set up parametric equations to model a
moving object; eliminate the parameter to find the path; use the parameter as
time and state its domain; answer a "where" question from the path and a "when"
question from the parameter; state the assumptions and the limitations of a
parametric model.

## 1. The parameter as time

Many parametric curves describe something that moves. When $t$ is time, the
equations give the position at each moment:

$$
x = f(t), \qquad y = g(t).
$$

The curve is the **path** of the object. The parameter carries the **timing**.
The two are different pieces of information, and a good answer keeps them apart.

- A **where** question asks for a position. Read it from the curve, or from the
  Cartesian equation.
- A **when** question asks for a time. Read it from the parameter.

Two different objects can share one path. A slow walk and a fast run along the
same straight road have the same path and different timings, so they need
different parametric equations.

## 2. A projectile model

A ball is kicked from the ground. It starts with a horizontal speed of $8$ m/s,
and the vertical motion is governed by gravity. A standard model is

$$
x = 8t, \qquad y = 20t - 5t^2,
$$

where $x$ and $y$ are metres and $t$ is seconds after the kick. The term $-5t^2$
is the effect of gravity, and the coefficient $20$ is the initial upward speed.

**Example 1.** Find the greatest height of the ball, and where it lands.

The height $y = 20t - 5t^2$ is a quadratic in $t$. Complete the square:

$$
y = -5(t^2 - 4t) = -5\left((t - 2)^2 - 4\right) = -5(t - 2)^2 + 20.
$$

The squared term is subtracted, so $y$ is greatest when $t = 2$. The greatest
height is

$$
y = 20 \text{ m}.
$$

The ball lands when $y = 0$:

$$
20t - 5t^2 = 0, \qquad 5t(4 - t) = 0, \qquad t = 0 \text{ or } t = 4.
$$

The value $t = 0$ is the kick, so the ball lands at $t = 4$ s. Substitute that
into $x = 8t$:

$$
x = 8 \times 4 = 32 \text{ m}.
$$

The ball travels $32$ m.

**Example 2.** Find the Cartesian equation of the path.

The first equation gives $t = \frac{x}{8}$. Substitute into the second:

$$
y = 20\left(\frac{x}{8}\right) - 5\left(\frac{x}{8}\right)^2
= \frac{5}{2}x - \frac{5}{64}x^2.
$$

The path is a parabola. The Cartesian equation says where the ball goes, but not
when it is there. To answer a "when" question, go back to the parameter.

## 3. A circular model

An object moving at a steady speed around a circle has a natural parametric
description. With centre $(a, b)$, radius $r$ and a steady turn, the position at
time $t$ is

$$
x = a + r\cos(\omega t), \qquad y = b + r\sin(\omega t).
$$

**Example 3.** The survey drone flies around the rim of the lake, one lap every
$60$ seconds. Its position $t$ seconds after passing the easternmost point is

$$
x = 6 + 5\cos\left(\frac{\pi t}{30}\right), \qquad
y = 8 + 5\sin\left(\frac{\pi t}{30}\right).
$$

Find the path, and find when the drone is above the causeway.

Eliminate the parameter. Rearrange each equation, then square and add:

$$
\cos\left(\frac{\pi t}{30}\right) = \frac{x - 6}{5}, \qquad
\sin\left(\frac{\pi t}{30}\right) = \frac{y - 8}{5},
$$

$$
\left(\frac{x - 6}{5}\right)^2 + \left(\frac{y - 8}{5}\right)^2 = 1,
$$

$$
(x - 6)^2 + (y - 8)^2 = 25.
$$

The path is the rim of the lake, as expected: the drone keeps a constant
distance of $5$ units from the centre $(6, 8)$.

Now the "when" question. The causeway lies on $x + y = 19$, and from Section 3.3
it meets the rim at $(11, 8)$ and $(6, 13)$. The drone is above the causeway
when it is at one of those two points.

At $(11, 8)$: $x - 6 = 5$, so $\cos\left(\frac{\pi t}{30}\right) = 1$. The first
times are $t = 0$ and $t = 60$ s.

At $(6, 13)$: $y - 8 = 5$, so $\sin\left(\frac{\pi t}{30}\right) = 1$, which
first happens at $t = 15$ s, and again at $t = 75$ s.

So in the first lap the drone is above the causeway at $t = 0$, $t = 15$ and
$t = 60$ seconds. The answers at $0$ and $60$ are the same point on the rim, at
the start and the end of one lap.

## 4. Assumptions and limitations

Every model in this section rests on assumptions. State them, because they are
also the model's limitations.

| Assumption | What it leaves out |
|---|---|
| The drone keeps a constant speed | a change of speed while turning |
| The lake is a perfect circle | an irregular shoreline |
| The ball has no air resistance | drag, spin and wind |
| The ground is flat and horizontal | a slope, or a change in height |
| Gravity is the same everywhere | the very small change with height |

A model answers the question it was built for. The drone model predicts where
the drone is, and nothing about the battery or the wind. When a measurement
disagrees, refine one assumption and rebuild, exactly as in Section 2.12.

## 5. Try it

No new figure is needed here. Return to the parametric explorer in Section 3.4
and select the circle. The slider is time, and the point is the object. Move the
slider to $t = 0$ and read the point. Then decide which single value of $t$ gives
the opposite point on the circle.

> **Watch out.** Two traps come with parametric models.
>
> **Losing the timing.** The Cartesian equation $y = \frac{5}{2}x - \frac{5}{64}x^2$
> tells you the ball passes through a height of $15$ m at two horizontal
> distances. It cannot tell you the times, and it cannot tell you which distance
> comes first. For a "when" question, always return to the parameter.
>
> **Forgetting the domain.** The model runs from $t = 0$ until the ball lands or
> the lap ends. Substituting a time outside that range gives a number that the
> model does not claim. **Re-check:** for each answer, ask whether the value of
> $t$ lies inside the domain, and turn the position back into a sentence about
> the situation.

## Progress check

Return to the chapter problem. The drone's position after $t$ seconds is

$$
x = 6 + 5\cos\left(\frac{\pi t}{30}\right), \qquad
y = 8 + 5\sin\left(\frac{\pi t}{30}\right).
$$

1. Convert the drone's path to Cartesian form.
2. State the centre and the radius the path shows.
3. Find the two points where the causeway meets the rim, from your answer to the
   Progress check in Section 3.3.
4. Find every time in the first $60$ seconds at which the drone is above the
   causeway.
5. Write one sentence saying what the model assumes about the drone's speed.

## You should now be able to

- write parametric equations for an object moving in time;
- use the direction and speed of the motion to choose the equations;
- eliminate the parameter to find the path;
- answer a "where" question from the path and a "when" question from the
  parameter;
- state the domain of the parameter and check each answer against it;
- list the assumptions of a parametric model, and say what each one leaves out.
