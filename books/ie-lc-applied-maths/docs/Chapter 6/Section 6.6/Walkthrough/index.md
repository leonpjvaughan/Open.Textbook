---
title: 6.6 Collisions in two dimensions — Learn
chapter: 6
chapter_title: Momentum, impulse and collisions
section: '6.6'
section_title: Collisions in two dimensions
tier: H
refs:
- S3
kind: walkthrough
---

# 6.6 Collisions in two dimensions — Learn

**Prerequisites:** Section 6.3, collisions in one dimension; Section 4.7,
Newton's laws in vector form; Section 3.9, resolving a velocity into components.

**Objectives:** conserve momentum in two directions at once; resolve velocities
into components before and after a collision; find an unknown speed and
direction after a glancing collision.

Not every collision happens along a straight line. A snooker ball struck off
centre, a car hit on the corner, a puck glancing off the boards: the bodies move
off in different directions. Momentum is still conserved, but now it is a vector
equation, and the two directions must be handled separately.

## Momentum is a vector

Momentum points in the direction of the velocity, so it has a component in each
direction. Conservation of momentum applies to the components separately:

$$\text{total } x\text{-momentum before} = \text{total } x\text{-momentum after}$$

$$\text{total } y\text{-momentum before} = \text{total } y\text{-momentum after}$$

For two bodies, with $u$ before and $v$ after,

$$m_1u_{1x} + m_2u_{2x} = m_1v_{1x} + m_2v_{2x}$$

$$m_1u_{1y} + m_2u_{2y} = m_1v_{1y} + m_2v_{2y}$$

Two equations, one for each direction. That is usually enough for the two
unknown quantities in a collision problem.

## Resolving the velocities

Take the line of the incoming velocity as the $x$-axis. Then the incoming
momentum has no $y$-component. A velocity of magnitude $v$ at an angle $\theta$
to the $x$-axis has components

$$v_x = v\cos\theta, \qquad v_y = v\sin\theta$$

Resolve every velocity before and after the collision, then conserve each
direction.

## A ball hitting a stationary ball

**Example 1.** A ball of mass $2$ kg moves at $8$ m/s along the $x$-axis and
hits a stationary ball of mass $1$ kg. After the collision the $2$ kg ball moves
at $4$ m/s at $60^\circ$ to the $x$-axis. Find the speed and direction of the
$1$ kg ball.

The total momentum before is $2 \times 8 = 16$ kg m/s along the $x$-axis, and
zero in the $y$-direction.

After the collision, the $2$ kg ball has components

$$2 \times 4\cos 60^\circ = 2 \times 4 \times 0.5 = 4\,\text{kg m/s}$$

$$2 \times 4\sin 60^\circ = 2 \times 4 \times \frac{\sqrt{3}}{2}
= 4\sqrt{3}\,\text{kg m/s}$$

So the $1$ kg ball carries the rest. In the $x$-direction:

$$p_x = 16 - 4 = 12\,\text{kg m/s}$$

In the $y$-direction, the total must stay zero, so the $1$ kg ball carries
$-4\sqrt{3}$ kg m/s.

Its speed is the magnitude of the momentum divided by its mass:

$$v = \sqrt{12^2 + (4\sqrt{3})^2} = \sqrt{144 + 48} = \sqrt{192}
= 8\sqrt{3} \approx 13.86\,\text{m/s}$$

The angle satisfies

$$\tan\theta = \frac{4\sqrt{3}}{12} = \frac{\sqrt{3}}{3}$$

so $\theta = 30^\circ$ below the $x$-axis.

## A glancing blow

**Example 2.** In a glancing version of the crash test, a car of mass $1200$ kg
moves at $15$ m/s along the $x$-axis and hits a stationary car of mass $800$ kg.
After the collision the $1200$ kg car moves at $6$ m/s at $60^\circ$ to the
$x$-axis. Find the speed and direction of the $800$ kg car.

The total momentum before is $1200 \times 15 = 18000$ kg m/s along the
$x$-axis.

After the collision, the $1200$ kg car has components

$$1200 \times 6\cos 60^\circ = 3600\,\text{kg m/s}$$

$$1200 \times 6\sin 60^\circ = 3600\sqrt{3}\,\text{kg m/s}$$

So the $800$ kg car carries $18000 - 3600 = 14400$ kg m/s in the $x$-direction
and $3600\sqrt{3}$ kg m/s in the opposite $y$-direction.

Divide each component by the mass $800$ kg. Its velocity components are
$18$ m/s and $4.5\sqrt{3}$ m/s. Its speed is

$$v = \sqrt{18^2 + (4.5\sqrt{3})^2} = \sqrt{324 + 60.75} = \sqrt{384.75}
\approx 19.62\,\text{m/s}$$

The angle satisfies

$$\tan\theta = \frac{4.5\sqrt{3}}{18} = \frac{\sqrt{3}}{4}$$

so $\theta = \arctan 0.4330 \approx 0.409$ rad, about $23.4^\circ$ below the
$x$-axis.

## Collisions at right angles

When two equal masses collide and one is at rest, they often move off at right
angles. The total momentum is then the hypotenuse of a right-angled triangle
whose other two sides are the final momenta.

**Example 3.** A ball of mass $1$ kg moves at $6$ m/s and hits a stationary ball
of mass $1$ kg. After the collision the two balls move off at right angles. The
first ball moves at $3.6$ m/s. Find the speed of the second ball.

The total momentum has magnitude $1 \times 6 = 6$ kg m/s. The two final momenta
are at right angles, so their magnitudes add in quadrature:

$$p_1^2 + p_2^2 = 6^2$$

With $p_1 = 1 \times 3.6 = 3.6$ kg m/s,

$$p_2 = \sqrt{36 - 12.96} = \sqrt{23.04} = 4.8\,\text{kg m/s}$$

The second ball has mass $1$ kg, so its speed is $4.8$ m/s.

> **Watch out.** Momentum is a vector, so never add speeds directly. Resolve
> every velocity into components first. A common error is to conserve momentum in
> the $x$-direction and forget the $y$-direction, or to put both components into
> the same equation. Write the two equations separately and label them. A second
> error is to forget that a component can be negative: if one body moves up, the
> other must move down to keep the total $y$-momentum at zero.

## Progress check

Back to the chapter problem. The centre also runs a glancing test. The $1200$ kg
car moves at $15$ m/s along the $x$-axis and leaves at $6$ m/s at $60^\circ$.

The total $x$-momentum before is $18000$ kg m/s. The $1200$ kg car carries
$1200 \times 6\cos 60^\circ = 3600$ kg m/s after the collision. Find the
$x$-momentum of the $800$ kg car:

$$p_x = 18000 - 3600 = \underline{\hspace{2cm}}\,\text{kg m/s}$$

Its $y$-momentum is $-3600\sqrt{3}$ kg m/s, equal and opposite to the
$y$-momentum of the $1200$ kg car. Section 6.7 follows what happens when a car
rebounds from a barrier.

## You should now be able to

- explain why momentum is conserved in each direction separately;
- resolve a velocity into an $x$-component and a $y$-component;
- write the conservation of momentum in the $x$-direction and in the
  $y$-direction;
- find the speed of a body from its momentum components;
- find the direction of a body from the tangent of its components;
- use the right-angle property for equal masses to find an unknown speed.
