---
title: 3.6 Deriving the equations of motion by calculus — Learn
chapter: 3
chapter_title: Describing motion
section: '3.6'
section_title: Deriving the equations of motion by calculus
tier: O
refs:
- S3
kind: walkthrough
---

# 3.6 Deriving the equations of motion by calculus — Learn

**Prerequisites:** Section 3.2, the four equations of motion; Section 3.4,
differentiation and the chain rule; Section 3.5, integration.

**Objectives:** derive $v = u + at$ by integrating a constant acceleration;
derive $s = ut + \frac{1}{2}at^2$ by integrating the velocity; derive
$v^2 = u^2 + 2as$ using $a = v\dfrac{dv}{ds}$; apply the derivations to a
falling or thrown object.

Section 3.2 gave four equations to use. This section shows where they come from.
Nothing new is assumed about motion: the equations follow from the definitions
of velocity and acceleration, plus one integration.

## From acceleration to velocity

Acceleration is the derivative of velocity:

$$a = \frac{dv}{dt}.$$

When $a$ is constant, integrate both sides from time $0$ to time $t$. The
velocity at time $0$ is the initial velocity $u$, and at time $t$ it is $v$.

$$\int_u^v dv = \int_0^t a\,dt$$

$$v - u = at$$

$$v = u + at$$

That is the first equation of motion. The constant of integration is the initial
velocity $u$.

## From velocity to displacement

Velocity is the derivative of displacement:

$$v = \frac{ds}{dt}.$$

Substitute $v = u + at$ and integrate from $0$ to $t$:

$$\int_0^s ds = \int_0^t (u + at)\,dt$$

$$s = ut + \frac{1}{2}at^2$$

That is the second equation. Here the constant of integration is the initial
displacement, which is zero when we measure from the start.

## The chain rule gives the third equation

The first two equations involve time. The third links velocity, acceleration and
displacement, and the chain rule produces it.

Write the acceleration with the chain rule:

$$a = \frac{dv}{dt} = \frac{dv}{ds} \times \frac{ds}{dt} = v\frac{dv}{ds}.$$

The step $\dfrac{ds}{dt} = v$ turns the derivative with respect to time into a
derivative with respect to displacement. Now integrate with respect to $s$:

$$\int_u^v v\,dv = \int_0^s a\,ds$$

$$\frac{v^2}{2} - \frac{u^2}{2} = as$$

$$v^2 = u^2 + 2as$$

That is the third equation. It is the one to use when the time is not mentioned,
which is why Section 3.2 chose it for those questions.

> **Watch out.** Every integration brings a constant, and in this derivation the
> constant is the starting value. Leaving it out gives $v = at$ instead of
> $v = u + at$, which is wrong whenever the object does not start from rest. The
> second trap is the sign of $a$ in $a = v\dfrac{dv}{ds}$: the displacement $s$
> is measured along the direction of motion, so a deceleration enters with a
> negative sign. Check the derivation against one example you can do by
> arithmetic before you trust it.

## Applying the derivations

**Example 1.** A ball is thrown upwards at $10$ m/s. Gravity gives it a constant
acceleration of $-9.8$ m/s². Find its velocity and its height after $t$ seconds.

Integrate the acceleration once, with the constant $10$:

$$v = 10 + \int (-9.8)\,dt = 10 - 9.8t$$

Integrate again, with the height starting at zero:

$$y = \int (10 - 9.8t)\,dt = 10t - 4.9t^2$$

The velocity is $10 - 9.8t$ m/s and the height is $10t - 4.9t^2$ m.

**Example 2.** Use the height formula to find when the ball lands.

Set $y = 0$:

$$10t - 4.9t^2 = 0$$

$$t(10 - 4.9t) = 0$$

The root $t = 0$ is the throw. The other root is
$t = \dfrac{10}{4.9} = 2.04$ s, so the ball lands about 2.04 s after it is
thrown.

## Progress check

Back to the chapter problem. The ball leaves at $20$ m/s at $30^\circ$ to the
ground, so its vertical component is $10$ m/s upwards. Gravity gives it a
constant acceleration of $-9.8$ m/s².

Integrate once to find the velocity, then again to find the height.

$$v = 10 - 9.8t, \qquad y = \underline{\hspace{2cm}}$$

Now set $y = 0$ and find the positive time:

$$t(10 - 4.9t) = 0, \qquad t = \underline{\hspace{2cm}}\,\text{s}$$

The positive time is about $2.04$ s. That is the ball's time of flight, and
Section 3.8 turns it into the range.

## You should now be able to

- derive $v = u + at$ by integrating a constant acceleration;
- derive $s = ut + \frac{1}{2}at^2$ by integrating the velocity;
- derive $v^2 = u^2 + 2as$ using $a = v\dfrac{dv}{ds}$;
- explain where the constant of integration goes in each derivation;
- use the derived formulas for a falling or thrown object.
