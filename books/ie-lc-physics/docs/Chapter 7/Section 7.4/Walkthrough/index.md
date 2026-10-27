---
title: 7.4 Circular motion problems — Learn
chapter: 7
chapter_title: Circular motion
section: '7.4'
section_title: Circular motion problems
tier: H
refs:
- '1.6'
kind: walkthrough
---

# 7.4 Circular motion problems — Learn

**Prerequisites:** the centripetal force from Section 7.3; weight and $W = mg$ from
Section 6.1; resolving forces from Chapter 3; the orbital speed from Section 6.4.

**Objectives:** solve vertical-circle problems by resolving towards the centre; find the
minimum speed at the top of a vertical circle; find the banking angle of a bend; use
gravity as the centripetal force for a satellite.

By the end of this section, you can choose the forces that act towards the centre, write
one equation, and solve it.

## The method

Every circular-motion problem uses the same three steps.

1. Decide which forces act on the object.
2. Decide which of them point towards the centre, and which point away.
3. Set the resultant force towards the centre equal to $\dfrac{mv^2}{r}$.

The last step is the whole method. It is Newton's second law along the line to the
centre. The centripetal force is not a separate force to be added; it is the resultant
of the forces that already act.

## Vertical circles

A ball on a string swung in a vertical circle is a standard problem, because the weight
points towards the centre at the top and away from it at the bottom.

**At the top.** The weight and the tension both point downwards, towards the centre:

$$T + mg = \frac{mv^2}{r}$$

where $T$ is the tension, $m$ the mass, $v$ the speed, $g$ the gravitational field
strength and $r$ the radius of the circle.

**At the bottom.** The tension points upwards, towards the centre, and the weight points
downwards, away from it:

$$T - mg = \frac{mv^2}{r}$$

**The minimum speed at the top.** If the string goes slack, the tension is zero. The
weight alone must supply the centripetal force:

$$mg = \frac{mv^2}{r}$$

The mass cancels, so

$$v = \sqrt{gr}$$

This is the slowest the object can move at the top and stay on its circular path. At a
lower speed it leaves the circle.

**Example 1.** A bucket of water is swung in a vertical circle of radius 0.80 m.
Calculate the minimum speed at the top.

$$
v = \sqrt{gr}
$$

$$
v = \sqrt{9.8 \times 0.80} = \sqrt{7.84} = 2.8\,\text{m/s}
$$

**Example 2.** A 0.30 kg ball on a string of length 0.50 m moves at 5.0 m/s at the top
of a vertical circle. Calculate the tension in the string.

$$
T + mg = \frac{mv^2}{r}
$$

$$
T = \frac{mv^2}{r} - mg = m\left(\frac{v^2}{r} - g\right)
$$

$$
T = 0.30 \times \left(\frac{25}{0.50} - 9.8\right) = 0.30 \times 40.2 = 12\,\text{N}
$$

**Example 3.** The same ball moves at 5.0 m/s at the bottom of the same circle.
Calculate the tension there.

$$
T = m\left(\frac{v^2}{r} + g\right)
$$

$$
T = 0.30 \times (50 + 9.8) = 18\,\text{N}
$$

The tension is larger at the bottom, because it must also support the weight.

## Banked bends

On a flat bend, friction supplies the centripetal force. A banked bend tilts the road,
so the normal force has a horizontal component towards the centre.

For a bend banked so that no friction is needed, the vertical forces balance and the
horizontal component of the normal force supplies the centripetal force:

$$N\cos\theta = mg \qquad N\sin\theta = \frac{mv^2}{r}$$

where $N$ is the normal force and $\theta$ the angle at which the road is banked.

Dividing the second equation by the first gives

$$\tan\theta = \frac{v^2}{rg}$$

**Example 4.** A bend of radius 50 m is banked so that no friction is needed at 20 m/s.
Calculate the banking angle.

$$
\tan\theta = \frac{v^2}{rg}
$$

$$
\tan\theta = \frac{20^2}{50 \times 9.8} = 0.816
$$

$$
\theta = 39^\circ
$$

## Gravity as the centripetal force

For a satellite, gravity supplies the centripetal force. Setting the two equal gives the
result you met in Section 6.4:

$$\frac{GMm}{r^2} = \frac{mv^2}{r} \qquad\Rightarrow\qquad v = \sqrt{\frac{GM}{r}}$$

The mass of the satellite cancels. A heavy satellite and a light one at the same radius
travel at the same speed.

> **Watch out.** A common error at the top of a vertical circle is to write
> $T - mg = \dfrac{mv^2}{r}$. The weight points towards the centre there, so the tension
> and the weight add. Check the direction of each force before you choose a sign.

## Progress check

Back to the chapter problem, and this is where it is answered. The drum has a radius of
0.24 m and turns at 1400 revolutions per minute. The towel has a mass of 0.20 kg.

1. Calculate the minimum speed the towel needs at the top of the drum to stay against
   the wall.
2. Calculate the angular velocity that goes with that speed.
3. Convert that angular velocity into revolutions per minute.
4. Explain what happens to the towel at a lower spin speed.

Keep this. The Review brings it together with the period, the acceleration and the force
from the earlier sections.

## You should now be able to

- write the three steps that solve any circular-motion problem;
- write $T + mg = \dfrac{mv^2}{r}$ at the top of a vertical circle and
  $T - mg = \dfrac{mv^2}{r}$ at the bottom;
- find the minimum speed at the top of a vertical circle from $v = \sqrt{gr}$;
- find the banking angle of a bend from $\tan\theta = \dfrac{v^2}{rg}$;
- set gravity equal to the centripetal force and recover $v = \sqrt{\dfrac{GM}{r}}$;
- check the direction of each force before you choose a sign in the equation.
