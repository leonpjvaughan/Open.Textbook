---
title: 16.7 Friction and the F <= mu R model — Learn
chapter: 16
chapter_title: Forces, Newton's laws and moments
section: '16.7'
section_title: Friction and the F <= mu R model
dfe:
- R6
kind: walkthrough
---

# 16.7 Friction and the F <= mu R model — Learn

**Prerequisites:** resolving forces and coplanar equilibrium (Section 16.5);
Newton's second law (Section 16.2).

**By the end of this section you can:** describe how friction acts; use the
model $F \leq \mu R$; find the normal reaction on a rough surface; decide
whether a body stays at rest or slides; and find a coefficient of friction at
limiting equilibrium.

## 1. What friction is

**Friction** is a force between two surfaces that opposes sliding, or the
tendency to slide. It acts along the contact surface, in the direction that
opposes the motion.

Friction is a **contact force**. It is not a fixed force. Static friction is
**variable**: it takes whatever value is needed to stop the surfaces sliding,
up to a limit.

- A small push gives a small friction, and the body stays still.
- A larger push gives a larger friction, and the body still stays still.
- At the **limiting** value the body is about to move. This is called
  **limiting equilibrium**.
- A push larger than the limit makes the body slide, and friction then stays at
  the limiting value.

## 2. The model F ≤ μR

The limit on friction depends on how hard the surfaces are pressed together,
which is the normal reaction $R$. The model is

$$
F \leq \mu R,
$$

where $\mu$ is the **coefficient of friction** between the two surfaces. The
coefficient has no unit, because it is a ratio of two forces. It depends on the
two surfaces, not on the mass of the body.

- If the body stays at rest, friction takes a value **below** the limit, and it
  equals the driving force.
- If the body slides, friction takes its greatest value, $F = \mu R$.

The normal reaction $R$ is not always the weight.

- On a horizontal surface with only vertical forces, $R = mg$.
- On a slope of angle $\theta$, $R = mg\cos\theta$.
- If another force has a component perpendicular to the surface, resolve in
  that direction to find $R$.

**Example 1.** A block of mass $10$ kg rests on a rough horizontal floor. The
coefficient of friction is $0.3$. A horizontal push of $20$ N is applied. Find
the friction force. Take $g = 9.8$ m s$^{-2}$.

The vertical forces balance, so

$$
R = 10 \times 9.8 = 98 \text{ N}.
$$

The limit on friction is

$$
\mu R = 0.3 \times 98 = 29.4 \text{ N}.
$$

The push is $20$ N, which is below $29.4$ N, so the block stays at rest. Static
friction takes the value needed, so

$$
F = 20 \text{ N}
$$

backwards, exactly balancing the push.

**Example 2.** The same block is pushed with $40$ N instead. Find the friction
force and the acceleration.

The limit is still $29.4$ N. Now $40 > 29.4$, so the block slides and friction
takes its greatest value:

$$
F = \mu R = 29.4 \text{ N}.
$$

The resultant along the floor is

$$
40 - 29.4 = 10.6 \text{ N},
$$

so

$$
a = \frac{10.6}{10} = 1.06 \text{ m s}^{-2}.
$$

**Example 3.** A crate of mass $45$ kg is placed on a rough ramp inclined at
$18^\circ$. The coefficient of friction is $0.4$. The crate is released from
rest. Show that the crate stays at rest, and find the friction force. Take
$g = 9.8$ m s$^{-2}$.

The weight is $441$ N. Resolve perpendicular to the ramp:

$$
R = 441\cos 18^\circ \approx 419.4 \text{ N}.
$$

The limit on friction is

$$
\mu R = 0.4 \times 419.4 \approx 167.8 \text{ N}.
$$

The component of the weight down the ramp is

$$
441\sin 18^\circ \approx 136.3 \text{ N}.
$$

Since $136.3 \leq 167.8$, the downhill component is within the limit, so the
crate stays at rest. Friction matches that component and is $136.3$ N up the
ramp.

**Example 4.** A block on a rough slope of $30^\circ$ is in limiting
equilibrium. Find the coefficient of friction.

At limiting equilibrium the downhill component equals the greatest friction:

$$
mg\sin 30^\circ = \mu\,mg\cos 30^\circ.
$$

Divide both sides by $mg\cos 30^\circ$:

$$
\mu = \frac{\sin 30^\circ}{\cos 30^\circ} = \tan 30^\circ \approx 0.577.
$$

The mass cancels, so the answer does not depend on the mass.

## 3. Try it: the friction explorer

**Predict first.** A block of mass $30$ kg rests on a rough floor. Before you
touch anything, predict what happens to the friction force as the push grows
from zero to the limit, and what happens after the limit is passed.

:::figure ch16-friction

**Test.** Move the push slider slowly and watch the friction arrow. Find the push
at which the block changes from staying still to sliding. Then change the
coefficient of friction and find the new limit.

**Explain.** Write two sentences. The first says why the friction force equals
the push while the block stays still. The second says why the friction stops
growing once the block is sliding.

> **Watch out.** Three mistakes are common.
>
> **Using $F = \mu R$ when the body is not sliding.** The model is an
> inequality: $F \leq \mu R$. A body at rest uses only as much friction as it
> needs. **Re-check:** find the driving force and the limit separately, then
> compare them.
>
> **Assuming the normal reaction is the weight.** On a slope,
> $R = mg\cos\theta$, which is smaller than $mg$. A pull with an upward
> component also makes $R$ smaller. Resolve perpendicular to the surface every
> time.
>
> **Letting friction act the wrong way.** Friction opposes the sliding. On a
> slope, a block that is about to slide down has friction up the slope. If you
> draw friction down the slope, the block can never be in equilibrium.

## Progress check

Return to the chapter problem. The crate of mass $45$ kg is now on a rough ramp
at $18^\circ$, with a coefficient of friction of $0.4$. The rope is slack.

1. Find the component of the crate's weight down the ramp.
2. Find the normal reaction from the ramp.
3. Find the greatest friction available.
4. Decide whether the crate slides. Explain your answer, and give the friction
   force if the crate stays at rest.

## You should now be able to

- describe friction and the direction in which it acts;
- use the model $F \leq \mu R$ and say when equality holds;
- find the normal reaction on a rough horizontal surface and on a rough slope;
- compare a driving force with the limit on friction;
- decide whether a body stays at rest or slides;
- find the friction force and the acceleration once a body slides;
- find a coefficient of friction at limiting equilibrium.
