---
title: 6.5 Elastic and inelastic collisions — Learn
chapter: 6
chapter_title: Momentum, impulse and collisions
section: '6.5'
section_title: Elastic and inelastic collisions
tier: O
refs:
- S3
kind: walkthrough
---

# 6.5 Elastic and inelastic collisions — Learn

**Prerequisites:** Section 6.4, the coefficient of restitution; Section 6.2,
conservation of momentum; Section 3.2, the equations of motion.

**Objectives:** tell an elastic collision from an inelastic one; calculate the
kinetic energy of a body; find the kinetic energy lost in a collision; compare
models of the same collision.

Momentum is conserved in every collision. Kinetic energy is not. A collision
that keeps its kinetic energy is called elastic, and one that loses some is
called inelastic. This section measures the difference.

## Kinetic energy

The **kinetic energy** of a body is the energy it has because it is moving:

$$E_k = \frac{1}{2}mv^2$$

where $E_k$ is the kinetic energy, $m$ is the mass and $v$ is the speed.

The unit is the joule, J. Kinetic energy is a scalar, so it has no sign. A body
moving in either direction has the same kinetic energy.

**Example 1.** The test car of mass $1200$ kg moves at $15$ m/s. Find its
kinetic energy.

$$E_k = \frac{1}{2} \times 1200 \times 15^2 = 0.5 \times 1200 \times 225
= 135000\,\text{J}$$

That is the energy the moving car brings into the collision.

## Elastic and inelastic collisions

- An **elastic collision** has $e = 1$. The kinetic energy after the collision
  equals the kinetic energy before it.
- An **inelastic collision** has $e < 1$. Some kinetic energy is changed into
  other forms, such as heat, sound and deformation.
- A **perfectly inelastic collision** has $e = 0$. The bodies lock together and
  move as one, and the kinetic energy lost is as large as the collision allows.

Momentum is conserved in all three cases. Only kinetic energy is lost.

## Comparing the three crash tests

The chapter problem runs the same crash three times. The car of mass $1200$ kg
at $15$ m/s hits the stationary car of mass $800$ kg, so the momentum before is
$18000$ kg m/s and the kinetic energy before is $135000$ J.

**Test A, $e = 0$.** The cars move together at $9$ m/s. The kinetic energy after
is

$$E_k = \frac{1}{2} \times 2000 \times 9^2 = 0.5 \times 2000 \times 81
= 81000\,\text{J}$$

The energy lost is $135000 - 81000 = 54000$ J.

**Test B, $e = 0.5$.** The cars move at $6$ m/s and $13.5$ m/s. The kinetic
energy after is

$$E_k = 0.5 \times 1200 \times 36 + 0.5 \times 800 \times 182.25
= 21600 + 72900 = 94500\,\text{J}$$

The energy lost is $135000 - 94500 = 40500$ J.

**Test C, $e = 1$.** The cars move at $3$ m/s and $18$ m/s. The kinetic energy
after is

$$E_k = 0.5 \times 1200 \times 9 + 0.5 \times 800 \times 324
= 5400 + 129600 = 135000\,\text{J}$$

No energy is lost, because the collision is elastic.

| Test | $e$ | Velocities after | Energy lost |
|---|---|---|---|
| A | $0$ | $9$, $9$ m/s | $54000$ J |
| B | $0.5$ | $6$, $13.5$ m/s | $40500$ J |
| C | $1$ | $3$, $18$ m/s | $0$ J |

The table shows the pattern. A bouncier collision separates the cars faster and
loses less energy.

## Elastic collisions

For an elastic collision with $e = 1$ and one body at rest, the final velocities
have simple forms:

$$v_1 = \frac{(m_1 - m_2)u_1}{m_1 + m_2}, \qquad
v_2 = \frac{2m_1u_1}{m_1 + m_2}$$

**Example 2.** A ball of mass $2$ kg moving at $6$ m/s collides elastically with
a stationary ball of the same mass. Find the velocity of each ball.

With $m_1 = m_2$, the first formula gives $v_1 = 0$, and the second gives
$v_2 = 6$ m/s. Equal masses exchange velocities: the moving ball stops and the
stationary ball moves off at the original speed.

**Example 3.** A ball of mass $3$ kg moving at $4$ m/s collides elastically with
a stationary ball of mass $1$ kg. Find the velocity of each ball.

$$v_1 = \frac{(3 - 1) \times 4}{4} = 2\,\text{m/s}, \qquad
v_2 = \frac{2 \times 3 \times 4}{4} = 6\,\text{m/s}$$

Check the kinetic energy: before, $0.5 \times 3 \times 16 = 24$ J; after,
$0.5 \times 3 \times 4 + 0.5 \times 1 \times 36 = 6 + 18 = 24$ J. The kinetic
energy is conserved, so the collision is elastic.

## The energy lost in a general collision

For two bodies with masses $m_1$ and $m_2$, relative speed $u$ and coefficient
of restitution $e$, the kinetic energy lost is

$$E_{\text{lost}} = \frac{1}{2}\,\frac{m_1m_2}{m_1 + m_2}\,(1 - e^2)u^2$$

**Example 4.** Use the formula to check test B.

$$E_{\text{lost}} = \frac{1}{2} \times \frac{1200 \times 800}{2000}
\times (1 - 0.5^2) \times 15^2$$

$$= 0.5 \times 480 \times 0.75 \times 225 = 40500\,\text{J}$$

This matches the value found by subtracting the kinetic energies.

> **Watch out.** Momentum is conserved in every collision, elastic or not.
> Kinetic energy is conserved only when $e = 1$. A common error is to say that
> energy is lost, so momentum is lost too. That is wrong: the two quantities are
> different. Momentum is a vector and the internal forces cancel; kinetic energy
> is a scalar and some of it changes form. A second error is to give kinetic
> energy a sign. It is a scalar, so a body moving backwards has the same kinetic
> energy as one moving forwards at the same speed.

## Progress check

Back to the chapter problem. The kinetic energy before the crash is
$135000$ J. In test A the cars move at $9$ m/s, so the kinetic energy after is

$$E_k = 0.5 \times 2000 \times 9^2 = \underline{\hspace{2cm}}\,\text{J}$$

The energy lost is $135000$ minus that answer. Compare the loss in test A with
the loss in test B ($40500$ J) and test C ($0$ J). Which model fits a real
crash better?

## You should now be able to

- calculate a kinetic energy from a mass and a speed;
- tell an elastic collision from an inelastic one using the coefficient $e$;
- find the kinetic energy before and after a collision;
- find the kinetic energy lost in a collision;
- use the elastic formulas for the final velocities when one body is at rest;
- use $E_{\text{lost}} = \dfrac{1}{2}\dfrac{m_1m_2}{m_1 + m_2}(1 - e^2)u^2$;
- explain why momentum is conserved but kinetic energy need not be.
