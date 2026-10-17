---
title: 6.4 Newton's experimental law of restitution — Learn
chapter: 6
chapter_title: Momentum, impulse and collisions
section: '6.4'
section_title: Newton's experimental law of restitution
tier: O
refs:
- S3
kind: walkthrough
---

# 6.4 Newton's experimental law of restitution — Learn

**Prerequisites:** Section 6.3, collisions in one dimension; Section 6.1,
impulse; Section 6.2, conservation of momentum.

**Objectives:** state Newton's experimental law of restitution; calculate the
coefficient of restitution from speeds or from heights; use the law with
conservation of momentum to find two unknown velocities; interpret the values
$e = 1$ and $e = 0$.

Some collisions bounce and some do not. A steel ball bounces high; a lump of
putty does not bounce at all. Newton's experimental law measures the bounce in a
single number, and it gives the second equation that a collision needs.

## The law

> **Newton's experimental law of restitution.** For two bodies colliding along a
> line, the speed of separation is a fixed fraction of the speed of approach.
>
> $$e = \frac{v_2 - v_1}{u_1 - u_2}$$

Here $u_1$ and $u_2$ are the velocities before the collision, $v_1$ and $v_2$
are the velocities after, and the bodies are numbered so that body $1$ is behind
body $2$. The number $e$ is the **coefficient of restitution**.

The numerator is the speed at which the bodies move apart, and the denominator
is the speed at which they approached. Both are measured along the line of
impact. The coefficient has no unit, because it is a ratio of two speeds.

The coefficient always lies between $0$ and $1$:

$$0 \le e \le 1$$

## Using the law with momentum

A collision along a line has two equations: conservation of momentum, and
restitution. Together they give both final velocities.

**Example 1.** A test car of mass $1200$ kg moving at $15$ m/s collides with a
stationary car of mass $800$ kg. The coefficient of restitution is $0.5$. Find
the velocity of each car after the collision.

Number the moving car as body $1$ and the stationary car as body $2$. Momentum
gives

$$1200v_1 + 800v_2 = 1200 \times 15 = 18000$$

Restitution gives

$$v_2 - v_1 = 0.5 \times (15 - 0) = 7.5$$

So $v_2 = v_1 + 7.5$. Substitute into the momentum equation:

$$1200v_1 + 800(v_1 + 7.5) = 18000$$

$$2000v_1 + 6000 = 18000$$

$$v_1 = \frac{12000}{2000} = 6\,\text{m/s}$$

$$v_2 = 6 + 7.5 = 13.5\,\text{m/s}$$

Both cars continue forwards, the struck car faster.

**Example 2.** A ball of mass $3$ kg moving at $4$ m/s hits a stationary ball
of mass $1$ kg. The coefficient of restitution is $0.5$. Find the velocity of
each ball.

Momentum:

$$3v_1 + v_2 = 12$$

Restitution:

$$v_2 - v_1 = 0.5 \times 4 = 2$$

So $v_2 = v_1 + 2$. Substitute:

$$3v_1 + v_1 + 2 = 12$$

$$4v_1 = 10 \qquad v_1 = 2.5\,\text{m/s}$$

$$v_2 = 4.5\,\text{m/s}$$

## Finding e from a bounce

For a ball bouncing on a fixed floor, the floor does not move, so the approach
speed is the ball's speed before the bounce and the separation speed is its
speed after. Then

$$e = \frac{\text{rebound speed}}{\text{approach speed}}$$

The heights are easier to measure than the speeds. Since $v^2 = 2gh$, the ratio
of speeds is the square root of the ratio of heights:

$$e = \sqrt{\frac{h_2}{h_1}}$$

where $h_1$ is the drop height and $h_2$ is the rebound height.

**Example 3.** A ball is dropped from a height of $2$ m and rebounds to $1.28$ m.
Find the coefficient of restitution.

$$e = \sqrt{\frac{1.28}{2}} = \sqrt{0.64} = 0.8$$

**Example 4.** A ball hits the floor at $5$ m/s and rebounds at $4$ m/s. Find
the coefficient of restitution.

$$e = \frac{4}{5} = 0.8$$

## What the value of e means

- $e = 1$: the bodies separate as fast as they approached. The collision is
  **perfectly elastic**, and no kinetic energy is lost.
- $e = 0$: the bodies do not separate at all. They move off together, and the
  collision is **perfectly inelastic**.
- $0 < e < 1$: the collision is **inelastic**. Some kinetic energy is lost, but
  the bodies still separate.

A value of $e$ greater than $1$ would mean the bodies separate faster than they
approached, which would create energy. That is impossible.

> **Watch out.** The law uses velocities with signs, but the numerator and the
> denominator are the approach and separation speeds along the line of impact.
> The order of subtraction matters: $u_1 - u_2$ is the approach, with body $1$
> behind body $2$. When one body is at rest, $e = \dfrac{v_2 - v_1}{u_1}$. A
> common error is to write $e = \dfrac{v_1}{v_2}$ or to mix up which body is
> which. Number the bodies on your diagram before you substitute.

## A guided investigation: the heights of the bounces

:::figure restitution

**Predict.** The ball is dropped from $2$ m. Before you move the slider, predict what
happens to the first rebound height when you halve the coefficient of restitution.
Write your prediction down.

**Test.** Set $e$ to $0.6$ and note the rebound height. Now set $e$ to $0.3$ and note
it again. Move the slider slowly and watch the whole sequence of heights in the
readout.

**Explain.** Write two sentences that explain why halving $e$ does more than halve the
rebound height. Use the ratio $e^2$ in your explanation.

## Progress check

Back to the chapter problem. In test B the coefficient of restitution is $0.5$.

The cars approach with a relative speed of $15$ m/s, so the restitution equation
is

$$v_2 - v_1 = 0.5 \times 15 = \underline{\hspace{2cm}}\,\text{m/s}$$

Combine that with conservation of momentum,
$1200v_1 + 800v_2 = 18000$, and solve for $v_1$ and $v_2$. Section 6.5 uses
those velocities to find the kinetic energy lost.

## You should now be able to

- state Newton's experimental law of restitution and define the coefficient $e$;
- calculate $e$ from the speeds of approach and separation;
- calculate $e$ from a drop height and a rebound height;
- use restitution with conservation of momentum to find two unknown velocities;
- say what $e = 1$, $e = 0$ and a value in between mean for a collision.
