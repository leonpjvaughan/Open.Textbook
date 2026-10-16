---
title: 5.2 The coefficient of friction — Learn
chapter: 5
chapter_title: Friction and resistance
section: '5.2'
section_title: The coefficient of friction
tier: O
refs:
- S3
kind: walkthrough
---

# 5.2 The coefficient of friction — Learn

**Prerequisites:** Section 5.1, friction and the normal reaction; Section 4.4,
the normal reaction on a slope.

**Objectives:** define the coefficient of friction; use $F = \mu R$ for the
limiting friction; find the coefficient from the angle at which a block starts
to slide; explain why the coefficient has no unit.

Section 5.1 left one question open. The maximum friction depends on the normal
reaction and on how rough the surfaces are. The coefficient of friction is the
number that measures the roughness.

## The coefficient of friction

The **coefficient of friction** is the ratio of the limiting friction to the
normal reaction:

$$\mu = \frac{F}{R}$$

The Greek letter $\mu$ is pronounced *mew*. Once you know $\mu$, the greatest
friction the two surfaces can provide is

$$F = \mu R$$

This value is called the **limiting friction**, because it is the limit of what
the surfaces can do. While the object is sliding, friction sits at this value.
While the object is at rest and not about to move, friction is smaller.

## What the coefficient tells you

The coefficient depends on the two surfaces in contact. It does not depend on
the mass of the object, and it does not depend on the area of contact, in this
model.

Some typical values show how wide the range is.

| Surfaces | Coefficient of friction |
|---|---|
| Rubber on dry tarmac | 0.7 to 0.9 |
| Rubber on wet tarmac | 0.4 to 0.6 |
| Ski on snow | 0.05 to 0.2 |
| Steel on steel, dry | 0.5 to 0.8 |
| Ice on ice | 0.03 to 0.1 |

A large coefficient means a strong grip. A small coefficient means the surfaces
slide over each other without much resistance. The table is a guide, not a promise: real
surfaces vary with temperature, damp and wear.

## The coefficient has no unit

The coefficient is one force divided by another force:

$$\mu = \frac{F}{R}$$

The unit of $F$ is the newton, and the unit of $R$ is the newton. The two units
cancel, so $\mu$ is a pure number. It is never written with a unit.

## Finding the coefficient from a slope

A slope gives a quick way to measure the coefficient. Tilt the plane until the
block is on the point of sliding.

Along the plane, the component of the weight is $mg\sin\theta$. Perpendicular
to the plane, the normal reaction is $mg\cos\theta$. At the point of sliding,
friction is limiting, so $F = \mu R$:

$$mg\sin\theta = \mu mg\cos\theta$$

Divide both sides by $mg\cos\theta$. The mass and $g$ cancel:

$$\tan\theta = \mu$$

So the tangent of the angle at which sliding starts is the coefficient. This is
why a block on a gentle slope stays put, and the same block on a steep slope
slides.

**Example 1.** A block of mass $20$ kg on a rough horizontal floor just begins
to slide when pushed with a horizontal force of $49$ N. Find the coefficient of
friction. Take $g = 9.8$ m/s².

The normal reaction is

$$R = mg = 20 \times 9.8 = 196\,\text{N}$$

At the point of sliding, $F = \mu R$. Rearranging gives

$$\mu = \frac{F}{R}$$

$$\mu = \frac{49}{196}$$

$$\mu = 0.25$$

The coefficient is 0.25, with no unit.

**Example 2.** A block rests on a rough plane inclined at $30^\circ$ and is on
the point of sliding. Find the coefficient of friction.

At the point of sliding, $\mu = \tan\theta$:

$$\mu = \tan 30^\circ$$

$$\mu = 0.577$$

The coefficient is 0.577, to three significant figures. The mass of the block
did not matter.

**Example 3.** A crate of mass $15$ kg rests on a rough horizontal floor. The
coefficient of friction is $0.4$. Find the greatest friction force the floor
can provide. Take $g = 9.8$ m/s².

$$R = mg = 15 \times 9.8 = 147\,\text{N}$$

$$F = \mu R = 0.4 \times 147 = 58.8\,\text{N}$$

The greatest friction is 58.8 N. A push smaller than this leaves the crate at
rest, with friction matching the push.

> **Watch out.** Two errors are common. The first is to give $\mu$ a unit. It
> is a ratio of two forces, so it has none. The second is to use $R = mg$ on a
> slope. On a slope the normal reaction is $mg\cos\theta$, which is smaller than
> the weight. Using $mg$ there makes both the friction and the coefficient too
> large. Write the perpendicular equation first, and use the $R$ you find.

## Progress check

Back to the chapter problem. The skier has a normal reaction of $594.1$ N, and
the coefficient of friction between the skis and the snow is $0.20$.

The skier is sliding, so friction is limiting. Find the friction force:

$$F = \mu R = 0.20 \times 594.1 = \underline{\hspace{2cm}}\,\text{N}$$

Keep that number. Section 5.3 uses it in $F = ma$ to find the acceleration, and
Section 5.6 uses it in the terminal-speed calculation.

## You should now be able to

- define the coefficient of friction as $\mu = \dfrac{F}{R}$;
- use $F = \mu R$ to find the limiting friction;
- find the coefficient from a force and a normal reaction;
- show that the coefficient equals $\tan\theta$ at the angle where sliding
  starts;
- explain why the coefficient has no unit, and what it depends on.
