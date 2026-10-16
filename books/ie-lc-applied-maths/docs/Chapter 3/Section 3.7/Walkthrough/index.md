---
title: 3.7 Projectile motion — Learn
chapter: 3
chapter_title: Describing motion
section: '3.7'
section_title: Projectile motion
tier: O
refs:
- S3
kind: walkthrough
---

# 3.7 Projectile motion — Learn

**Prerequisites:** Section 3.2, the equations of motion; Section 3.3, reading a
velocity–time graph; Section 3.6, deriving the equations by calculus.

**Objectives:** resolve a launch velocity into a horizontal and a vertical
component; treat the two directions separately; find the position of a
projectile at a given time; find the height of a projectile at a given
horizontal distance.

A ball kicked into the air follows a curve. This section shows that the curve is
two simple straight-line stories told at the same time.

## What a projectile is

A **projectile** is an object that moves under gravity alone after it is
launched. We ignore air resistance, so the only force on it is its weight. The
only acceleration is $g = 9.8$ m/s² downwards.

A projectile does not have to be thrown upwards. A ball rolled off a table is a
projectile too, because gravity alone acts on it once it leaves the table.

## Two independent motions

The launch velocity is split into two parts.

- The **horizontal** velocity is constant, because no force acts horizontally.
- The **vertical** velocity changes at $9.8$ m/s each second, because gravity
  acts downwards.

The two motions share one quantity: the time $t$. That shared time is the only
link between them.

For a launch at speed $u$ and angle $\theta$ above the horizontal:

$$u_x = u\cos\theta \qquad u_y = u\sin\theta.$$

The horizontal motion is then

$$x = u_x t,$$

and the vertical motion is

$$v_y = u_y - gt, \qquad y = u_y t - \frac{1}{2}gt^2, \qquad
v_y^2 = u_y^2 - 2gy.$$

**Example 1.** A ball is kicked at $20$ m/s at $30^\circ$ above the horizontal.
Find the two components of its velocity.

$$u_x = 20\cos 30^\circ = 17.32\,\text{m/s}$$

$$u_y = 20\sin 30^\circ = 10\,\text{m/s}$$

The horizontal component is 17.32 m/s and the vertical component is 10 m/s.

## Position at a time

Substitute the same time into both directions.

**Example 2.** The same ball is in flight. Find its position after $1$ s.

The horizontal distance is

$$x = u_x t = 17.32 \times 1 = 17.32\,\text{m}.$$

The height is

$$y = u_y t - \frac{1}{2}gt^2 = 10 \times 1 - 4.9 \times 1^2 = 5.1\,\text{m}.$$

After 1 s the ball is 17.32 m along and 5.1 m up.

## Height at a given distance

Sometimes you know how far away something is, not how long the ball has been in
the air. Find the time from the horizontal motion, then use it vertically.

**Example 3.** A wall stands $15$ m away. Find the height of the ball when it
reaches the wall.

First find the time from the horizontal motion:

$$t = \frac{x}{u_x} = \frac{15}{17.32} = 0.866\,\text{s}.$$

Now use that time in the vertical motion:

$$y = 10 \times 0.866 - 4.9 \times 0.866^2$$

$$y = 8.66 - 3.675 = 4.99\,\text{m}.$$

The ball is about 4.99 m high when it passes the wall.

> **Watch out.** The common error is to use the full launch speed in the
> horizontal direction. At $20$ m/s and $30^\circ$, the horizontal component is
> $17.32$ m/s, not $20$ m/s. A second error is to put $g$ into the horizontal
> motion: gravity acts downwards only, so the horizontal velocity never changes.
> A third is to forget that the two directions share the time. Write $t$ in the
> middle of your working, find it from one direction, and use it in the other.

## Progress check

Back to the chapter problem. The ball is kicked at $20$ m/s at $30^\circ$. Its
components are $u_x = 17.32$ m/s and $u_y = 10$ m/s. The wall is $15$ m away
and $3$ m high.

Find the time to reach the wall:

$$t = \frac{15}{17.32} = \underline{\hspace{2cm}}\,\text{s}$$

Now find the height at that time:

$$y = 10t - 4.9t^2 = \underline{\hspace{2cm}}\,\text{m}$$

The time is about $0.866$ s and the height is about $4.99$ m. The wall is $3$ m
high, so the ball clears it by about $2$ m. Section 3.8 finds where the ball
lands.

## You should now be able to

- explain what a projectile is, and what force acts on it;
- resolve a launch velocity into a horizontal and a vertical component;
- write the horizontal motion as a constant velocity and the vertical motion as
  a constant acceleration;
- find the position of a projectile at a given time;
- find the time from the horizontal motion and use it to find a height.
