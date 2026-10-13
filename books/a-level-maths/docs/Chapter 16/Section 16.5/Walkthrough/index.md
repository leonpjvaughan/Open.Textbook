---
title: 16.5 Resolving forces and coplanar equilibrium — Learn
chapter: 16
chapter_title: Forces, Newton's laws and moments
section: '16.5'
section_title: Resolving forces and coplanar equilibrium
refs:
- R4
kind: walkthrough
---

# 16.5 Resolving forces and coplanar equilibrium — Learn

**Prerequisites:** resolving a vector into components (Section 10.2); the sine
and cosine ratios; Newton's first law (Section 16.1); weight, $W = mg$
(Section 16.3).

**By the end of this section you can:** resolve a force into two perpendicular
components; choose a pair of axes that makes the algebra easy; write the
equilibrium equations in two directions; and find unknown forces and reactions,
including on a slope.

## 1. Resolving a force

To **resolve** a force is to replace it with two perpendicular components that
together have the same effect. If a force of size $F$ acts at an angle $\theta$
to a chosen direction, then

$$
\text{component along that direction} = F\cos\theta,
$$

$$
\text{component at right angles to it} = F\sin\theta.
$$

The angle is always measured from the direction that takes the cosine. Get the
angle in the right place and the components follow.

The two components are perpendicular, so they are independent. Two components at
right angles do not affect each other.

## 2. Choosing axes

You may choose any two perpendicular directions. A good choice makes most of the
forces point along one axis.

- On a horizontal surface, take the horizontal and the vertical.
- On a slope, take one axis along the slope and one perpendicular to the slope.
  Then the normal reaction has no component along the slope, and the friction has
  no component perpendicular to the slope.

Hint: to use components in both directions, always take one direction along the
acceleration, or along the slope when there is no acceleration.

## 3. Equilibrium in two directions

A particle is in equilibrium when the resultant force is zero. Resolve every
force into two perpendicular directions. Then both of these must hold:

$$
\text{sum of components in one direction} = 0,
$$

$$
\text{sum of components at right angles} = 0.
$$

This gives two equations. They are usually enough to find two unknown forces.

## 4. Weight on a slope

A weight $W$ on a slope of angle $\theta$ has two useful components:

$$
\text{down the slope} = W\sin\theta,
$$

$$
\text{perpendicular to the slope} = W\cos\theta.
$$

On a **smooth** slope the normal reaction balances the perpendicular component,
so $R = W\cos\theta$. That is not $W$, unless the slope is flat. On a rough slope
there is also friction along the slope, and the normal reaction is still
$W\cos\theta$.

**Example 1.** Resolve a force of $60$ N acting at $40^\circ$ above the
horizontal.

The horizontal component is

$$
60\cos 40^\circ \approx 45.96 \text{ N}.
$$

The vertical component is

$$
60\sin 40^\circ \approx 38.57 \text{ N}.
$$

**Example 2.** A crate of mass $45$ kg rests on a smooth slope of $18^\circ$. A
light rope parallel to the slope holds it in equilibrium. Find the tension in
the rope and the normal reaction. Take $g = 9.8$ m s$^{-2}$.

The weight is

$$
W = 45 \times 9.8 = 441 \text{ N}.
$$

Take one axis along the slope and one perpendicular to it.

Along the slope, the tension balances the weight component down the slope:

$$
T = 441\sin 18^\circ \approx 136.3 \text{ N}.
$$

Perpendicular to the slope, the normal reaction balances the other component:

$$
R = 441\cos 18^\circ \approx 419.4 \text{ N}.
$$

The normal reaction is less than the weight, because the slope carries only the
perpendicular part.

**Example 3.** A particle of weight $50$ N hangs in equilibrium from two light
strings. One string makes $60^\circ$ with the horizontal and the other makes
$30^\circ$ with the horizontal. Find the tension in each string.

Let the tensions be $T_1$ in the $60^\circ$ string and $T_2$ in the $30^\circ$
string. Resolve vertically:

$$
T_1 \sin 60^\circ + T_2 \sin 30^\circ = 50.
$$

Resolve horizontally:

$$
T_1 \cos 60^\circ = T_2 \cos 30^\circ.
$$

The second equation gives $T_1 = \sqrt{3}\,T_2$. Substitute into the first:

$$
\sqrt{3}\,T_2 \times \frac{\sqrt{3}}{2} + T_2 \times \frac{1}{2} = 50,
$$

$$
\frac{3}{2}T_2 + \frac{1}{2}T_2 = 50, \qquad 2T_2 = 50, \qquad T_2 = 25 \text{ N}.
$$

Then $T_1 = 25\sqrt{3} \approx 43.30$ N.

**Example 4.** A body of weight $392$ N is held in equilibrium on a smooth
slope of $30^\circ$ by a horizontal force $P$. Find $P$ and the normal reaction.

Resolve along the slope. The horizontal force has a component up the slope,
$P\cos 30^\circ$, and the weight has a component down the slope,
$392\sin 30^\circ$:

$$
P\cos 30^\circ = 392\sin 30^\circ, \qquad P = 392\tan 30^\circ \approx 226.3 \text{ N}.
$$

Resolve perpendicular to the slope. Both $P$ and the weight push into the slope:

$$
R = 392\cos 30^\circ + P\sin 30^\circ \approx 339.5 + 113.2 = 452.6 \text{ N}.
$$

## 5. Try it: the inclined plane explorer

**Predict first.** A block of mass $60$ kg sits on a slope. Before you move the
slider, predict the angle at which the component down the slope equals the
component into the slope. Write down the angle you expect.

:::figure ch16-inclined-plane

**Test.** Change the angle and watch the two components. Change the mass and
watch how both components grow. Find the angle at which the two components are
equal, and check your prediction.

**Explain.** Write two sentences. The first says which component uses the cosine
and which uses the sine, and why. The second says what happens to the normal
reaction on a smooth slope as the angle grows.

> **Watch out.** Three mistakes are common.
>
> **Swapping the sine and the cosine.** The component that uses the cosine lies
> along the direction the angle is measured from. On a slope of $18^\circ$ the
> component down the slope is $W\sin 18^\circ$ and the component into the slope
> is $W\cos 18^\circ$. **Re-check:** at a small angle, almost all the weight
> pushes into the slope, so the cosine component must be the large one.
>
> **Assuming the normal reaction equals the weight on a slope.** On a slope,
> $R = W\cos\theta$, which is smaller than $W$. In Example 2 the normal reaction
> is $419.4$ N, not $441$ N. A horizontal pull can make $R$ larger than $W$.
>
> **Resolving in only one direction.** Equilibrium needs both sums to be zero.
> One equation cannot find two unknown tensions. Write one equation along each
> axis, then solve them together.

## Progress check

Return to the chapter problem. The crate of mass $45$ kg rests on the smooth
ramp at $18^\circ$, held by a rope parallel to the ramp.

1. Write down the weight of the crate.
2. Resolve the weight along the ramp and perpendicular to the ramp.
3. The rope holds the crate in equilibrium. Find the tension and the normal
   reaction.
4. The angle is increased to $30^\circ$. Explain what happens to the tension and
   to the normal reaction.

## You should now be able to

- resolve a force into two perpendicular components;
- choose axes along and perpendicular to a slope;
- write the two equilibrium equations for a particle in a plane;
- find the components of a weight on a slope;
- find a tension or a normal reaction on a smooth slope;
- solve two force equations together for two unknown forces.
