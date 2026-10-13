---
title: 15.6 Motion under gravity and projectiles using vectors — Learn
chapter: 15
chapter_title: Quantities, units and kinematics
section: '15.6'
section_title: Motion under gravity and projectiles using vectors
refs:
- Q5
- J5
kind: walkthrough
---

# 15.6 Motion under gravity and projectiles using vectors — Learn

**Prerequisites:** vectors in two dimensions and their components from
Chapter 10; resolving a vector with an angle from Section 5.12; the
constant-acceleration formulae from Section 15.4; calculus in kinematics from
Section 15.5.

**By the end of this section you can:** write the position, velocity and
acceleration of a projectile as vectors; resolve an initial velocity into
horizontal and vertical components; use the constant-acceleration formulae
separately in the two directions; find a time of flight, a greatest height and a
range; find the height at a given horizontal distance.

## 1. Motion in a plane as vectors

A projectile is an object moving under gravity alone, with no air resistance.
Choose axes with $\mathbf{i}$ horizontal and $\mathbf{j}$ vertical. The position
of the object is a vector

$$
\mathbf{r} = x\mathbf{i} + y\mathbf{j}.
$$

The velocity is $\mathbf{v} = \dfrac{d\mathbf{r}}{dt}$ and the acceleration is
$\mathbf{a} = \dfrac{d\mathbf{v}}{dt}$. Gravity gives the whole acceleration, and
it acts downwards. Taking upwards as positive,

$$
\mathbf{a} = -g\,\mathbf{j},
$$

with $g = 9.8$ m/s$^2$. There is no horizontal acceleration, so the horizontal
velocity stays constant throughout the flight.

## 2. Resolving the initial velocity

Suppose the object leaves the origin with speed $U$ at an angle $\theta$ above
the horizontal. Its initial velocity is a vector of magnitude $U$ in that
direction. Resolve it:

$$
u_x = U\cos\theta,
\qquad
u_y = U\sin\theta.
$$

The two components then move independently. The horizontal motion has constant
velocity $u_x$, and the vertical motion has constant acceleration $-g$.

**Example 1.** A ball is kicked at $25$ m/s at $30^\circ$ to the horizontal.
Find the horizontal and vertical components of its initial velocity.

$$
u_x = 25\cos 30^\circ = 25 \times \frac{\sqrt{3}}{2} = \frac{25\sqrt{3}}{2}
\approx 21.7 \text{ m/s},
$$

$$
u_y = 25\sin 30^\circ = 25 \times \frac{1}{2} = 12.5 \text{ m/s}.
$$

## 3. The two sets of equations

There is no horizontal acceleration, so the horizontal velocity is constant:

$$
v_x = U\cos\theta,
\qquad
x = (U\cos\theta)t.
$$

The vertical motion has the constant acceleration $-g$:

$$
v_y = U\sin\theta - gt,
\qquad
y = (U\sin\theta)t - \frac{1}{2}gt^2.
$$

For an object that starts at the origin, these give the position vector

$$
\mathbf{r} = \left( (U\cos\theta)t \right)\mathbf{i} +
\left( (U\sin\theta)t - \frac{1}{2}gt^2 \right)\mathbf{j}.
$$

**Example 2.** A ball is kicked from the ground at $20$ m/s at $45^\circ$. Find
its greatest height, its time of flight and its range. Take $g = 9.8$ m/s$^2$.

Here $U = 20$ and $\theta = 45^\circ$, so

$$
u_x = 20\cos 45^\circ = 10\sqrt{2},
\qquad
u_y = 20\sin 45^\circ = 10\sqrt{2}.
$$

At the greatest height the vertical velocity is zero. Use $v_y = u_y - gt$:

$$
0 = 10\sqrt{2} - 9.8t,
\qquad
t = \frac{10\sqrt{2}}{9.8} = \frac{50\sqrt{2}}{49} \approx 1.44 \text{ s}.
$$

That time is the time to the top. The time of flight to the same level is twice
as long:

$$
T = \frac{100\sqrt{2}}{49} \approx 2.89 \text{ s}.
$$

The range is the horizontal distance in that time:

$$
R = u_x T = 10\sqrt{2} \times \frac{100\sqrt{2}}{49} =
\frac{2000}{49} \approx 40.8 \text{ m}.
$$

The greatest height is the vertical distance covered in half the flight time, or
use $v_y^2 = u_y^2 - 2gy$ with $v_y = 0$:

$$
H = \frac{u_y^2}{2g} = \frac{200}{19.6} = \frac{500}{49} \approx 10.2 \text{ m}.
$$

## 4. Finding the height at a distance

To find the height when the object has travelled a given horizontal distance,
first find the time from the horizontal equation, then substitute that time into
the vertical equation.

**Example 3.** For the ball in Example 2, find its height when it has travelled
$20$ m horizontally.

The horizontal distance is $x = 20$, and $u_x = 10\sqrt{2}$, so

$$
20 = 10\sqrt{2} t,
\qquad
t = \frac{20}{10\sqrt{2}} = \sqrt{2}.
$$

Now substitute $t = \sqrt{2}$ into the vertical equation:

$$
y = 10\sqrt{2} \times \sqrt{2} - \frac{1}{2} \times 9.8 \times (\sqrt{2})^2
= 20 - 9.8 = 10.2 \text{ m}.
$$

The ball is $10.2$ m high after $20$ m of horizontal travel. This is the
greatest height, and it matches the value in Example 2.

## 5. Projection from a height

When the object starts above the ground, the vertical displacement at landing is
negative (taking upwards as positive), or the starting height is added to $y$.
Then the time of flight comes from a quadratic equation.

**Example 4.** A ball is hit horizontally at $15$ m/s from the top of a cliff
$20$ m high. Find the time it takes to reach the ground and the horizontal
distance travelled. Take $g = 9.8$ m/s$^2$.

The initial vertical velocity is $0$, because the ball is hit horizontally.
Taking downwards as positive for this part, the ball falls $20$ m:

$$
20 = \frac{1}{2} \times 9.8 \times t^2,
\qquad
t^2 = \frac{40}{9.8} = \frac{200}{49}.
$$

So

$$
t = \frac{10\sqrt{2}}{7} \approx 2.02 \text{ s}.
$$

The horizontal velocity is unchanged at $15$ m/s, so the horizontal distance is

$$
x = 15 \times \frac{10\sqrt{2}}{7} = \frac{150\sqrt{2}}{7} \approx 30.3 \text{ m}.
$$

## 6. Try it: the projectile explorer

**Predict first.** The figure launches a particle at a chosen speed and angle,
and draws its path. Before you move the controls, predict what happens to the
range when you keep the speed fixed and change the angle from $30^\circ$ to
$60^\circ$. Write down your prediction.

:::figure ch15-projectile

**Test.** Set the angle to $30^\circ$, then $45^\circ$, then $60^\circ$, keeping
the speed fixed. Watch the range, the greatest height and the time of flight.

**Explain.** Write two sentences. The first says why the horizontal velocity
never changes. The second says why the greatest height depends on the vertical
component of the launch velocity and not on the horizontal component.

## Progress check

Return to the free kick. The ball leaves the ground at $20$ m/s at $45^\circ$
and the goal line is $40$ m away. Take upwards as positive.

1. Write down $u_x = 20\cos 45^\circ$ and $u_y = 20\sin 45^\circ$ as exact
   surds.
2. Use $x = u_x t$ to find the time when the ball reaches the goal line.
3. Use $y = u_y t - \frac{1}{2}gt^2$ to find the height of the ball at that
   time.
4. The crossbar is at $2.44$ m. Does the ball pass under the bar or over it?

> **Watch out.** Three mistakes are common with projectiles.
>
> **The launch speed used for the vertical motion.** The vertical motion uses
> $u_y = U\sin\theta$, not $U$. In Example 2 the ball leaves at $20$ m/s, but
> the vertical component is $10\sqrt{2} \approx 14.1$ m/s. Substituting $20$
> gives too great a height.
>
> **A sign lost on gravity.** Taking upwards as positive makes the acceleration
> $-g$, so $v_y = u_y - gt$ and $y = u_y t - \frac{1}{2}gt^2$. With downwards
> positive the signs flip. Choose one direction and keep it for the whole
> question.
>
> **The horizontal velocity treated as changing.** With no air resistance there
> is no horizontal force, so $v_x = u_x$ at every moment. Only the vertical
> velocity changes. **Re-check:** the two components share the same time $t$, so
> find $t$ from one direction and use it in the other.

## You should now be able to

- write a position, a velocity and an acceleration in a plane as vectors;
- resolve an initial velocity into horizontal and vertical components;
- use the constant-acceleration formulae separately in the two directions;
- find a time of flight, a greatest height and a range;
- find the height at a given horizontal distance;
- model a projection from a height with a quadratic in the time.
