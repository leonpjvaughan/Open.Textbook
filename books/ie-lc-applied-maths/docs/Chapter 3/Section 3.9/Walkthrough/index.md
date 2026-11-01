---
title: 3.9 Projectiles launched at an angle — Learn
chapter: 3
chapter_title: Describing motion
section: '3.9'
section_title: Projectiles launched at an angle
tier: H
refs:
- S3
kind: walkthrough
---

# 3.9 Projectiles launched at an angle — Learn

**Prerequisites:** Section 3.7, resolving a launch velocity; Section 3.8, the
time of flight and the range.

**Objectives:** use the range formula for any launch angle; explain why
$45^\circ$ gives the greatest range on level ground; find the two angles that
give a stated range; find the range when the projectile lands at a different
height from its launch.

Section 3.8 found the range at a few angles. This section treats the angle as
the variable, and shows what changes and what stays the same.

## The range at any angle

For a projectile launched at speed $u$ and angle $\theta$ on level ground, the
range is

$$R = \frac{u^2\sin 2\theta}{g}.$$

Here $g$ is the acceleration of free fall, about 9.8 m/s² near the ground.

Everything except the angle is fixed once the launch speed is fixed. So the
angle alone decides the range.

## Why 45 degrees is the greatest

The range depends on $\sin 2\theta$. The sine of an angle never exceeds $1$, and
it equals $1$ when the angle is $90^\circ$. So the greatest range comes from

$$2\theta = 90^\circ, \qquad \theta = 45^\circ.$$

At that angle the greatest range is

$$R_{\max} = \frac{u^2}{g}.$$

## Two angles, one range

Two angles have the same sine when they add to $180^\circ$, because
$\sin(180^\circ - A) = \sin A$. For the range, the angle is $2\theta$, so two
launch angles give the same range when their doubles add to $180^\circ$. That
is, when the launch angles add to $90^\circ$.

Angles that add to $90^\circ$ are called **complementary** angles. So
$\theta$ and $90^\circ - \theta$ give the same range.

**Example 1.** A ball is kicked at $20$ m/s at $60^\circ$. Find its range, and
state another angle that gives the same range.

$$R = \frac{u^2\sin 2\theta}{g} = \frac{400 \times \sin 120^\circ}{9.8}$$

$$\sin 120^\circ = \sin 60^\circ = 0.8660$$

$$R = \frac{400 \times 0.8660}{9.8} = 35.35\,\text{m}$$

The other angle is $90^\circ - 60^\circ = 30^\circ$. Section 3.8 found the same
range for $30^\circ$.

## Finding an angle from a range

Rearrange the range formula to find the angle when the range and the speed are
known. There are usually two answers.

**Example 2.** A ball is kicked at $15$ m/s and lands $20$ m away on level
ground. Find the two possible launch angles.

$$20 = \frac{225\sin 2\theta}{9.8}$$

$$\sin 2\theta = \frac{20 \times 9.8}{225} = 0.8711$$

$$2\theta = 60.57^\circ \quad \text{or} \quad 2\theta = 180^\circ - 60.57^\circ
= 119.43^\circ$$

$$\theta = 30.29^\circ \quad \text{or} \quad \theta = 59.71^\circ$$

Both angles give a range of 20 m, because they are complementary.

## Landing at a different height

When the projectile lands at a different height from its launch, the range
formula does not apply. Find the time of flight from the vertical motion, then
multiply by the horizontal component.

**Example 3.** A ball is thrown at $15$ m/s at $30^\circ$ from the top of a
cliff $10$ m high. Find the horizontal distance it travels before it lands.

The components are $u_x = 12.99$ m/s and $u_y = 7.5$ m/s. Take the top of the
cliff as $y = 0$, so the ball lands at $y = -10$.

$$y = 7.5t - 4.9t^2 = -10$$

Here $t$ is the time in seconds.

$$4.9t^2 - 7.5t - 10 = 0$$

The quadratic formula gives the positive root:

$$t = \frac{7.5 + \sqrt{7.5^2 + 4 \times 4.9 \times 10}}{9.8}
= \frac{7.5 + 15.88}{9.8} = 2.386\,\text{s}$$

$$R = u_x t = 12.99 \times 2.386 = 30.99\,\text{m}$$

The ball travels about 31 m horizontally.

> **Watch out.** The range formula $R = \dfrac{u^2\sin 2\theta}{g}$ holds only
> when the projectile lands at the height it started from. A ball thrown from a
> cliff lands further away, so use the vertical motion to find the time instead.
> A second trap is the claim that $45^\circ$ always gives the greatest range.
> That is true on level ground. When the landing point is below the launch
> point, the best angle is less than $45^\circ$.

## Progress check

Back to the chapter problem. The ball is kicked at $20$ m/s at $30^\circ$, and
it lands about $35.35$ m away.

Answer two questions about other angles.

- At what other angle does the ball have the same range?

$$90^\circ - 30^\circ = \underline{\hspace{2cm}}$$

- At what angle is the range greatest, and what is that range?

$$R_{\max} = \frac{u^2}{g} = \frac{400}{9.8} = \underline{\hspace{2cm}}\,\text{m}$$

The other angle is $60^\circ$, and the greatest range is about $40.82$ m at
$45^\circ$. The Review brings the whole problem together.

## You should now be able to

- use the range formula for any launch angle on level ground;
- explain why $45^\circ$ gives the greatest range;
- find the two angles that give a stated range, and say why they are
  complementary;
- find the time of flight and the range when the projectile lands at a
  different height;
- say when the range formula does not apply.
