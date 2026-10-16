---
title: 4.4 Motion on an inclined plane — Learn
chapter: 4
chapter_title: Forces and Newton's laws
section: '4.4'
section_title: Motion on an inclined plane
tier: O
refs:
- S3
kind: walkthrough
---

# 4.4 Motion on an inclined plane — Learn

**Prerequisites:** Section 4.2, resolving a force with sine and cosine; Section
4.3, the two-direction method.

**Objectives:** resolve the weight of a particle on an inclined plane; find the
normal reaction; find the acceleration down a smooth slope.

A **ramp** or **inclined plane** is a flat surface at an angle to the
horizontal. Gravity still pulls straight down, but the surface is tilted, so the
weight now has a part along the slope and a part into the slope. Resolving the
weight is the whole of this section.

## Resolving the weight

Let the plane make an angle $\theta$ with the horizontal, and let the particle
have mass $m$. Its weight $mg$ acts vertically downwards.

Resolve the weight into two perpendicular components.

- The component **down the plane** is $mg\sin\theta$.
- The component **perpendicular to the plane** is $mg\cos\theta$.

The two components together replace the weight. Notice which is which: the
component along the slope uses **sine**, and the component into the slope uses
**cosine**. That is because the angle $\theta$ is measured from the horizontal,
not from the slope.

## The normal reaction

The particle does not move perpendicular to the plane, so the forces in that
direction are in equilibrium:

$$R = mg\cos\theta$$

The normal reaction is smaller than the weight, unless the plane is horizontal.
On a steeper plane, less of the weight pushes into the surface.

## The acceleration down a smooth slope

The only force along a smooth slope is the component of the weight,
$mg\sin\theta$. Write Newton's second law along the slope:

$$ma = mg\sin\theta$$

Divide both sides by $m$:

$$a = g\sin\theta$$

The mass cancels. On a smooth slope, every object accelerates at the same rate,
whatever its mass. The acceleration depends only on $g$ and the angle.

**Example 1.** A block of mass $5$ kg rests on a smooth plane inclined at
$30^\circ$ to the horizontal. Find the component of its weight down the plane,
and the normal reaction. Take $g = 9.8$ m/s².

Down the plane:

$$mg\sin\theta = 5 \times 9.8 \times \sin 30^\circ$$

$$= 49 \times 0.5$$

$$= 24.5\,\text{N}$$

Perpendicular to the plane:

$$mg\cos\theta = 5 \times 9.8 \times \cos 30^\circ$$

$$= 49 \times 0.8660$$

$$= 42.4\,\text{N}$$

So the component down the plane is 24.5 N, and the normal reaction is 42.4 N.
The normal reaction is smaller than the weight of 49 N, as expected on a slope.

**Example 2.** For the same block, find the acceleration down the plane.

Use $a = g\sin\theta$:

$$a = 9.8 \times \sin 30^\circ$$

$$a = 9.8 \times 0.5$$

$$a = 4.9\,\text{m/s}^2$$

The acceleration is 4.9 m/s² down the plane. A block of 50 kg on the same plane
would have the same acceleration, because the mass cancels.

**Example 3.** A block is projected up a smooth plane inclined at $30^\circ$.
Find its deceleration as it rises.

While the block rises, the component of the weight still points down the plane,
against the motion. So the acceleration is $g\sin\theta$ down the plane, which
means a deceleration of

$$g\sin 30^\circ = 9.8 \times 0.5 = 4.9\,\text{m/s}^2$$

The block slows down at 4.9 m/s² on the way up, stops, and then accelerates back
down at the same rate.

> **Watch out.** The component down the plane is $mg\sin\theta$, not
> $mg\cos\theta$. The two swap over if you measure the angle from the slope
> instead of from the horizontal, which is why the question always says where
> the angle is. A check: on a gentle slope the object barely accelerates, so the
> component down the plane must be small. As $\theta$ gets small, $\sin\theta$
> gets small and $\cos\theta$ gets close to 1, so the down-slope component is the
> sine one. If your answer grows as the slope flattens, you have used cosine.

## Progress check

Back to the chapter problem. The crate of mass $20$ kg is on a ramp inclined at
$30^\circ$. Imagine the rope is cut, so only the ramp acts on the crate.

Its acceleration down the ramp would be

$$a = g\sin 30^\circ = 9.8 \times 0.5 = \underline{\hspace{2cm}}\,\text{m/s}^2$$

That is the acceleration the ramp alone would give the crate. In the real
problem the rope pulls the other way, so the actual acceleration is smaller.
Section 4.6 finds it.

## You should now be able to

- resolve the weight on an inclined plane into $mg\sin\theta$ down the plane and
  $mg\cos\theta$ into the plane;
- find the normal reaction on a slope from $R = mg\cos\theta$;
- explain why the acceleration down a smooth slope is $g\sin\theta$, independent
  of the mass;
- find the deceleration of a particle projected up a smooth slope.
