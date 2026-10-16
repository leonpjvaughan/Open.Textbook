---
title: 5.3 Motion on rough planes — Learn
chapter: 5
chapter_title: Friction and resistance
section: '5.3'
section_title: Motion on rough planes
tier: O
refs:
- S3
kind: walkthrough
---

# 5.3 Motion on rough planes — Learn

**Prerequisites:** Sections 5.1 and 5.2, the normal reaction and the coefficient
of friction; Section 4.4, motion on a smooth inclined plane.

**Objectives:** find the acceleration of a particle on a rough plane, both down
and up; decide whether a particle on a rough plane slides or stays at rest.

On a smooth plane the only force along the slope is the weight component. On a
rough plane, friction joins in. The method is the same as Chapter 4, with one
extra force.

## The forces on a rough slope

Take a particle on a plane inclined at $\theta$ to the horizontal, and suppose
it slides down the plane. Three forces matter.

- The component of the weight **down the plane** is $mg\sin\theta$.
- The component of the weight **into the plane** is $mg\cos\theta$.
- Friction acts **up the plane**, against the sliding.

The particle does not move perpendicular to the plane, so the normal reaction
balances the component into the plane:

$$R = mg\cos\theta$$

Because the particle is sliding, friction is limiting:

$$F = \mu R = \mu mg\cos\theta$$

## Acceleration down a rough plane

Write Newton's second law along the plane. The weight component drives the
particle down, and friction opposes it, so

$$ma = mg\sin\theta - \mu mg\cos\theta$$

Divide both sides by $m$. The mass cancels:

$$a = g(\sin\theta - \mu\cos\theta)$$

The acceleration is down the plane. It depends on $g$, on the angle and on the
coefficient, but not on the mass.

## Does the particle slide?

The particle slides down when the weight component beats the limiting friction:

$$mg\sin\theta > \mu mg\cos\theta$$

Divide both sides by $mg\cos\theta$:

$$\tan\theta > \mu$$

If $\tan\theta \le \mu$, the particle stays at rest. Friction then takes the
smaller value $mg\sin\theta$ that is needed to hold it, and the acceleration is
zero.

## Moving up a rough plane

Now suppose the particle is projected up the plane. While it rises, the weight
component points down the plane, and friction also points down the plane,
because it opposes the motion. Both act against the particle:

$$ma = -mg\sin\theta - \mu mg\cos\theta$$

$$a = -g(\sin\theta + \mu\cos\theta)$$

The particle decelerates at $g(\sin\theta + \mu\cos\theta)$. This is larger than
the acceleration down the same plane, because on the way up both forces pull the
same way.

**Example 1.** A block of mass $5$ kg slides down a rough plane inclined at
$30^\circ$. The coefficient of friction is $0.2$. Find its acceleration, to
three significant figures. Take $g = 9.8$ m/s².

Use $a = g(\sin\theta - \mu\cos\theta)$:

$$a = 9.8(\sin 30^\circ - 0.2 \times \cos 30^\circ)$$

$$a = 9.8(0.5 - 0.2 \times 0.8660)$$

$$a = 9.8 \times 0.3268$$

$$a = 3.20\,\text{m/s}^2$$

The acceleration is 3.20 m/s² down the plane. A block of any mass on the same
plane has the same acceleration.

**Example 2.** A crate of mass $20$ kg slides down a rough plane inclined at
$30^\circ$. The coefficient of friction is $0.25$. Find the normal reaction,
the friction force and the acceleration. Take $g = 9.8$ m/s².

Perpendicular to the plane:

$$R = mg\cos 30^\circ = 20 \times 9.8 \times 0.8660 = 169.74\,\text{N}$$

The crate is sliding, so friction is limiting:

$$F = \mu R = 0.25 \times 169.74 = 42.44\,\text{N}$$

Along the plane, the weight component is

$$mg\sin 30^\circ = 20 \times 9.8 \times 0.5 = 98\,\text{N}$$

The resultant along the plane is $98 - 42.44 = 55.56$ N, so

$$a = \frac{55.56}{20} = 2.78\,\text{m/s}^2$$

The acceleration is 2.78 m/s² down the plane.

**Example 3.** A block is projected up a rough plane inclined at $30^\circ$.
The coefficient of friction is $0.2$. Find its deceleration, to three
significant figures. Take $g = 9.8$ m/s².

Use $a = g(\sin\theta + \mu\cos\theta)$:

$$a = 9.8(0.5 + 0.2 \times 0.8660)$$

$$a = 9.8 \times 0.6732$$

$$a = 6.60\,\text{m/s}^2$$

The block slows down at 6.60 m/s² on the way up. On the way down, friction
reverses, and the acceleration falls to $3.20$ m/s².

> **Watch out.** Friction always opposes the motion, so its direction depends on
> which way the particle is moving. On the way up a slope, friction acts down
> the slope. On the way down, it acts up the slope. If you fix the direction
> once and keep it, one of the two answers will have the wrong sign. A second
> error is to use $mg$ for the normal reaction on a slope; it is
> $mg\cos\theta$. Write the perpendicular equation first, and use the friction
> that follows from it.

## Progress check

Back to the chapter problem. The skier of mass $70$ kg slides down the
$30^\circ$ slope. The weight component down the slope is $343$ N, and friction
is $118.8$ N up the slope. At low speed the air resistance is small enough to
ignore.

Find the resultant force along the slope, and then the acceleration:

$$ma = 343 - 118.8 = \underline{\hspace{2cm}}\,\text{N}$$

$$a = \frac{\underline{\hspace{2cm}}}{70} = \underline{\hspace{2cm}}\,\text{m/s}^2$$

Keep both numbers. Section 5.6 uses the resultant to find the terminal speed.

## You should now be able to

- list the forces on a particle sliding down a rough plane;
- find the normal reaction on a rough plane from $R = mg\cos\theta$;
- find the limiting friction from $F = \mu R$;
- use $a = g(\sin\theta - \mu\cos\theta)$ for motion down a rough plane;
- use $\tan\theta > \mu$ to decide whether a particle slides;
- find the deceleration of a particle projected up a rough plane, and explain
  why it is larger than the acceleration down.
