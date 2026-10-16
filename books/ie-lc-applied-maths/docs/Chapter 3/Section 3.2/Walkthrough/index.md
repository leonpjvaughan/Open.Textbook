---
title: 3.2 Motion with constant acceleration — Learn
chapter: 3
chapter_title: Describing motion
section: '3.2'
section_title: Motion with constant acceleration
tier: O
refs:
- S3
kind: walkthrough
---

# 3.2 Motion with constant acceleration — Learn

**Prerequisites:** Section 3.1, displacement, velocity and acceleration, and
choosing a positive direction.

**Objectives:** explain what constant acceleration means; state the four
equations of motion; choose the equation that fits the quantities you know; use
the equations for a falling object.

Section 3.1 found an acceleration from a change in velocity. This section turns
that idea round. When the acceleration is constant, you can predict the velocity
and the position at any later time.

## What constant acceleration means

**Constant acceleration** means the velocity changes at a steady rate. Equal
time intervals bring equal changes in velocity.

A car that gains 2 m/s every second has a constant acceleration of 2 m/s². Many
real motions are close to this for a short time. A car pulling away, a train
braking and a stone falling a short distance all behave this way.

## The four equations of motion

Five quantities describe motion with constant acceleration.

- $u$ is the initial velocity, in m/s;
- $v$ is the final velocity, in m/s;
- $a$ is the acceleration, in m/s²;
- $s$ is the displacement, in m;
- $t$ is the time taken, in s.

Four equations link them.

$$v = u + at$$

$$s = ut + \frac{1}{2}at^2$$

$$v^2 = u^2 + 2as$$

$$s = \frac{1}{2}(u + v)t$$

Each equation contains four of the five quantities and leaves one out. That is
how you choose between them.

| Equation | Leaves out |
|---|---|
| $v = u + at$ | $s$ |
| $s = ut + \frac{1}{2}at^2$ | $v$ |
| $v^2 = u^2 + 2as$ | $t$ |
| $s = \frac{1}{2}(u + v)t$ | $a$ |

**Example 1.** A car has an initial velocity of $8$ m/s and accelerates at
$3$ m/s² for $5$ s. Find its final velocity.

The equation without $s$ is $v = u + at$:

$$v = 8 + 3 \times 5$$

$$v = 8 + 15$$

$$v = 23\,\text{m/s}$$

**Example 2.** A trolley starts from rest and accelerates at $4$ m/s² for
$6$ s. Find the distance it travels.

The equation without $v$ is $s = ut + \frac{1}{2}at^2$:

$$s = 0 \times 6 + \frac{1}{2} \times 4 \times 6^2$$

$$s = 0 + 72$$

$$s = 72\,\text{m}$$

**Example 3.** A cyclist speeds up from $6$ m/s to $18$ m/s with an
acceleration of $2$ m/s². Find the distance travelled.

The equation without $t$ is $v^2 = u^2 + 2as$. Rearranged,

$$s = \frac{v^2 - u^2}{2a}$$

$$s = \frac{324 - 36}{4}$$

$$s = \frac{288}{4}$$

$$s = 72\,\text{m}$$

**Example 4.** A runner accelerates from $4$ m/s to $20$ m/s in $8$ s. Find the
distance covered.

The equation without $a$ is $s = \frac{1}{2}(u + v)t$:

$$s = \frac{1}{2}(4 + 20) \times 8$$

$$s = 12 \times 8$$

$$s = 96\,\text{m}$$

> **Watch out.** These four equations hold only while the acceleration is
> constant, and only when every quantity is measured along the same line. Two
> errors follow. The first is using a distance where the equation needs a
> displacement: if the object turns round, the two are different. The second is
> leaving a deceleration positive. Choose the positive direction first, then put
> a slowing acceleration in with a negative sign. A negative answer for $s$ is a
> signal that a sign went in wrongly.

## Choosing the equation

Write down the five symbols. Mark each one as known, wanted, or not mentioned.
Choose the equation that leaves out the quantity you do not have.

**Example 5.** A train slows from $30$ m/s to $10$ m/s in $8$ s. Find the
distance it travels.

Here $u = 30$, $v = 10$ and $t = 8$ are known, $s$ is wanted, and $a$ is not
mentioned. The equation without $a$ is $s = \frac{1}{2}(u + v)t$:

$$s = \frac{1}{2}(30 + 10) \times 8$$

$$s = 20 \times 8$$

$$s = 160\,\text{m}$$

## Falling under gravity

Near the surface of the Earth, a falling object has a constant acceleration of
about $9.8$ m/s² downwards, when air resistance is small. We write this as
$g = 9.8$ m/s². Choose upwards or downwards as positive, and keep that choice.

**Example 6.** A stone is dropped from rest and falls $20$ m. Find its speed
when it lands. Take downwards as positive, so $a = 9.8$ m/s².

Here $u = 0$, $s = 20$ and $a = 9.8$ are known, $v$ is wanted, and $t$ is not
mentioned. Use $v^2 = u^2 + 2as$:

$$v^2 = 0 + 2 \times 9.8 \times 20$$

$$v^2 = 392$$

$$v = 19.8\,\text{m/s}$$

The stone lands at about 19.8 m/s. The answer is positive, so the velocity
points downwards.

## Progress check

Back to the chapter problem. The ball leaves at $20$ m/s at $30^\circ$ to the
ground. Its vertical component is $10$ m/s upwards. Gravity gives it a constant
acceleration of $9.8$ m/s² downwards. Take upwards as positive, so $a = -9.8$
m/s².

Use the equations of motion to fill in the blanks.

- Use $v = u + at$ to find the time at which the vertical velocity is zero.
  Here $u = 10$, $v = 0$ and $a = -9.8$:
  $$0 = 10 - 9.8t, \qquad t = \underline{\hspace{2cm}}\,\text{s}$$
- Use $v^2 = u^2 + 2as$ to find the greatest height. Here $u = 10$, $v = 0$
  and $a = -9.8$:
  $$0 = 100 - 19.6s, \qquad s = \underline{\hspace{2cm}}\,\text{m}$$

The greatest height is about $5.1$ m. The wall is $3$ m high, so the ball rises
above the wall. Whether it is above $3$ m at the wall itself is a different
question, and Section 3.7 answers it.

## You should now be able to

- explain what constant acceleration means;
- state the four equations of motion and say which quantity each one leaves
  out;
- choose the equation that fits the quantities you know;
- use the equations to find a velocity, a displacement, an acceleration or a
  time;
- use $g = 9.8$ m/s² for an object falling near the Earth.
