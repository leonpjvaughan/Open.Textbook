---
title: 15.5 Calculus in kinematics — Learn
chapter: 15
chapter_title: Quantities, units and kinematics
section: '15.5'
section_title: Calculus in kinematics
dfe:
- Q4
kind: walkthrough
---

# 15.5 Calculus in kinematics — Learn

**Prerequisites:** differentiating polynomials; integrating polynomials;
finding a constant of integration from an initial condition; the
constant-acceleration formulae from Section 15.4.

**By the end of this section you can:** find a velocity by differentiating a
displacement; find an acceleration by differentiating a velocity; recover a
velocity and a displacement by integrating an acceleration; use $v = 0$ to find
when an object is at rest; tell a displacement apart from a distance when the
object turns around.

## 1. Differentiating displacement

Suppose the displacement of a particle along a straight line is a function of
time,

$$
s = s(t).
$$

The velocity is the rate of change of displacement, so

$$
v = \frac{ds}{dt}.
$$

The acceleration is the rate of change of velocity:

$$
a = \frac{dv}{dt} = \frac{d^2s}{dt^2}.
$$

The unit of $v$ is m/s and the unit of $a$ is m/s$^2$, because $t$ is in
seconds and $s$ is in metres.

**Example 1.** The displacement of a particle is $s = t^3 - 6t^2 + 9t$ metres
at time $t$ seconds. Find its velocity and its acceleration.

Differentiate once for the velocity:

$$
v = \frac{ds}{dt} = 3t^2 - 12t + 9.
$$

Differentiate again for the acceleration:

$$
a = \frac{dv}{dt} = 6t - 12.
$$

## 2. Going backwards with integration

If you know the acceleration, integrate to find the velocity. If you know the
velocity, integrate to find the displacement.

$$
v = \int a \, dt,
\qquad
s = \int v \, dt.
$$

Each integration brings a constant of integration. The initial conditions, such
as a starting velocity or a starting position, fix the constants.

**Example 2.** A particle moves with acceleration $a = 6t$ m/s$^2$. Its
velocity is $4$ m/s when $t = 0$, and its displacement is $0$ m when $t = 0$.
Find the velocity and the displacement.

Integrate the acceleration:

$$
v = \int 6t \, dt = 3t^2 + C.
$$

At $t = 0$, $v = 4$, so $C = 4$ and

$$
v = 3t^2 + 4.
$$

Now integrate the velocity:

$$
s = \int (3t^2 + 4) \, dt = t^3 + 4t + K.
$$

At $t = 0$, $s = 0$, so $K = 0$ and

$$
s = t^3 + 4t.
$$

## 3. Constant acceleration from calculus

For a particle with constant acceleration $a$, integrating once gives

$$
v = u + at,
$$

where $u$ is the velocity at $t = 0$. Integrating again gives

$$
s = ut + \frac{1}{2}at^2,
$$

where the displacement is measured from the position at $t = 0$. So the
calculus method and the constant-acceleration formulae are two views of the
same motion. The calculus method works even when the acceleration is not
constant.

## 4. At rest, and turning around

The particle is at rest when $v = 0$. Solving this equation gives the times when
the particle stops. If the sign of the velocity changes, the particle turns
around at that time.

To find a distance travelled, split the time interval at each moment when
$v = 0$. Add the sizes of the displacements on the separate parts. The
displacement over the whole interval is the sum with signs.

**Example 3.** A particle has displacement $s = 4t - t^2$ metres. Find when it
is at rest, and find its displacement and distance travelled from $t = 0$ to
$t = 5$ s.

The velocity is

$$
v = \frac{ds}{dt} = 4 - 2t.
$$

Set $v = 0$: $4 - 2t = 0$, so the particle is at rest at $t = 2$ s.

At $t = 0$, $s = 0$. At $t = 2$, $s = 8 - 4 = 4$ m. At $t = 5$,
$s = 20 - 25 = -5$ m.

The displacement over the whole interval is $s(5) - s(0) = -5$ m. The particle
moves forward $4$ m and then backward $9$ m, so the distance travelled is

$$
4 + 9 = 13 \text{ m}.
$$

## Progress check

Return to the free kick. For the vertical motion, take upwards as positive and
let $y$ be the height in metres after $t$ seconds. The acceleration is constant,
$a = -9.8$ m/s$^2$. The initial vertical velocity is $u = 10\sqrt{2}$ m/s, and
the ball starts at $y = 0$.

1. Integrate the acceleration to find $v$ as a function of $t$.
2. Integrate the velocity to find $y$ as a function of $t$.
3. Substitute $t = 2\sqrt{2}$ and work out the height, using
   $10\sqrt{2} \times 2\sqrt{2} = 40$ and $(2\sqrt{2})^2 = 8$.
4. Compare the height with the crossbar at $2.44$ m.

> **Watch out.** Three mistakes are common with this calculus.
>
> **A derivative used where an integral is needed.** Velocity is the derivative
> of displacement, so going from displacement to velocity is a differentiation.
> Going from acceleration to velocity is the opposite move, an integration. Read
> which quantities you are given before you choose.
>
> **The constant of integration dropped.** Without the initial condition,
> $\int 6t\,dt$ can be any of $3t^2 + C$. In Example 2 the condition $v = 4$ at
> $t = 0$ fixes $C = 4$ and gives $v = 3t^2 + 4$. A velocity left as
> $3t^2 + C$ is not an answer.
>
> **Displacement used as distance.** When the particle turns around, the
> displacement for the whole interval can be smaller than the distance, or even
> negative. In Example 3 the displacement is $-5$ m and the distance is $13$ m.
> **Re-check:** find every time when $v = 0$, split the interval there, and add
> the sizes of the separate displacements to get the distance.

## You should now be able to

- find a velocity by differentiating a displacement function;
- find an acceleration by differentiating a velocity function;
- find a velocity or a displacement by integrating and using an initial
  condition;
- derive $v = u + at$ and $s = ut + \frac{1}{2}at^2$ from a constant
  acceleration;
- find the times when a particle is at rest;
- split an interval at a turning point and find a total distance.
