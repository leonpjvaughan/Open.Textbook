---
title: 5.4 Statics on a rough plane — Learn
chapter: 5
chapter_title: Friction and resistance
section: '5.4'
section_title: Statics on a rough plane
tier: H
refs:
- S3
kind: walkthrough
---

# 5.4 Statics on a rough plane — Learn

**Prerequisites:** Sections 5.1 to 5.3, friction, the coefficient and motion on
a rough plane; Section 4.2, equilibrium and resolving.

**Objectives:** solve equilibrium problems on a rough plane; find the greatest
angle at which a body stays at rest; find the range of a force that holds a body
at rest; handle an extra force acting at an angle to the plane.

So far friction has been limiting, because the body was sliding. In a statics
problem the body is at rest, and friction takes whatever value is needed. The
skill is to work out which value that is.

## Equilibrium with friction

A body at rest on a rough plane is in equilibrium. Two equations hold.

- Perpendicular to the plane, the normal reaction balances the components of
  the forces into the plane.
- Along the plane, the forces balance, with friction supplying the difference.

Friction can point either way along the plane. Its value lies between $-\mu R$
and $+\mu R$. At the two ends of that range, the body is on the point of
sliding, and friction is limiting.

## The greatest angle for rest

Tilt a plane slowly. The body stays at rest until the angle is large enough.
At the critical angle, the body is on the point of sliding, so friction is
limiting:

$$mg\sin\theta = \mu mg\cos\theta$$

Divide both sides by $mg\cos\theta$:

$$\tan\theta = \mu$$

So the body stays at rest while $\tan\theta \le \mu$. The greatest angle is

$$\theta = \arctan\mu$$

The mass of the body does not appear, so it does not matter. A heavy crate and
a light one slide at the same angle.

## A force holding the body at rest

Suppose a force $P$ acts up the plane, parallel to the surface. There is a
range of values of $P$ that keeps the body at rest.

- **Least force.** With the smallest force, the body is on the point of sliding
  down. Friction acts up the plane and is limiting:

$$P = mg\sin\theta - \mu mg\cos\theta$$

- **Greatest force.** With the largest force, the body is on the point of
  moving up. Friction acts down the plane and is limiting:

$$P = mg\sin\theta + \mu mg\cos\theta$$

Any force between these two values holds the body at rest. Friction takes the
value needed.

## A force at an angle

If the force acts at an angle to the plane, resolve it first. The component
perpendicular to the plane changes the normal reaction, and a changed normal
reaction changes the limiting friction.

Take a force $P$ at an angle $\phi$ above a horizontal floor, on the point of
moving the body. Perpendicular to the floor:

$$R = mg - P\sin\phi$$

Along the floor, with friction limiting:

$$P\cos\phi = \mu R$$

Substituting for $R$ and solving gives

$$P = \frac{\mu mg}{\cos\phi + \mu\sin\phi}$$

The upward part of the force reduces the normal reaction, so it reduces the
friction. A pull at an angle can move a body with less force than a horizontal
push.

**Example 1.** A block of mass $10$ kg rests on a rough plane inclined at
$30^\circ$. The coefficient of friction is $0.4$. Find the smallest force up
the plane that holds the block at rest, and the force needed to just start it
moving up the plane. Take $g = 9.8$ m/s².

The weight component down the plane is

$$mg\sin 30^\circ = 10 \times 9.8 \times 0.5 = 49\,\text{N}$$

The limiting friction is

$$\mu mg\cos 30^\circ = 0.4 \times 10 \times 9.8 \times 0.8660 = 33.95\,\text{N}$$

With the smallest force, friction acts up the plane:

$$P = 49 - 33.95 = 15.05\,\text{N}$$

With the force about to move the block up, friction acts down the plane:

$$P = 49 + 33.95 = 82.95\,\text{N}$$

Any force between 15.05 N and 82.95 N holds the block at rest.

**Example 2.** A block rests on a rough plane. The coefficient of friction is
$0.5$. Find the greatest angle at which the block stays at rest.

$$\tan\theta = \mu = 0.5$$

$$\theta = \arctan 0.5 = 26.6^\circ$$

The block stays at rest on any slope up to $26.6^\circ$. On a steeper slope it
slides.

**Example 3.** A block of mass $8$ kg rests on a rough horizontal floor. The
coefficient of friction is $0.5$. A force acts at $30^\circ$ above the
horizontal. Find the smallest force that just starts the block moving, to four
significant figures. Take $g = 9.8$ m/s².

Use the formula, with $\phi = 30^\circ$:

$$P = \frac{\mu mg}{\cos 30^\circ + \mu\sin 30^\circ}$$

$$P = \frac{0.5 \times 8 \times 9.8}{0.8660 + 0.5 \times 0.5}$$

$$P = \frac{39.2}{1.1160}$$

$$P = 35.12\,\text{N}$$

The force needed is 35.12 N. A horizontal push would need
$\mu mg = 39.2$ N, so pulling at an angle is more efficient.

> **Watch out.** The limiting friction is $\mu R$, not $\mu mg\cos\theta$, once
> an extra force acts. The extra force changes the normal reaction, so it
> changes the friction as well. A common error is to keep $R = mg\cos\theta$
> from Section 5.3 while an extra force presses on or lifts the body. A second
> error is to pick the direction of friction at random. Decide first which way
> the body is about to slide, then put friction the other way. Sliding down
> means friction up; sliding up means friction down.

## Progress check

Back to the chapter problem. The skier wants to stand still on the slope. On a
gentler slope, friction can hold the skier without being limiting.

The greatest angle for rest comes from the point of sliding, where
$\tan\theta = \mu$ and $\mu = 0.20$:

$$\theta = \arctan 0.20 = \underline{\hspace{2cm}}^\circ$$

Keep that angle. On the $30^\circ$ slope of the chapter problem, the skier
cannot stand still, so the answer also tells you why the skier slides.

## You should now be able to

- write the two equilibrium equations for a body at rest on a rough plane;
- explain why friction can take a range of values when a body is at rest;
- find the greatest angle at which a body stays at rest, from $\tan\theta = \mu$;
- find the least force and the greatest force that hold a body at rest on a
  rough slope;
- resolve a force acting at an angle, and show how it changes the normal
  reaction and the friction.
