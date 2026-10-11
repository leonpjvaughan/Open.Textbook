---
title: '5.12 Trigonometry in context: vectors, kinematics and forces — Learn'
chapter: 5
chapter_title: Trigonometry
section: '5.12'
section_title: 'Trigonometry in context: vectors, kinematics and forces'
dfe:
- E9
- OT3
kind: walkthrough
---

# 5.12 Trigonometry in context: vectors, kinematics and forces — Learn

**Prerequisites:** the sine and cosine rules; right-angled trigonometry;
Pythagoras' theorem; the idea of a vector as a magnitude and a direction.

**By the end of this section you can:** resolve a force or velocity into two
perpendicular components; find the resultant of two vectors at an angle; model a
velocity in a current; resolve a weight on a slope.

## 1. Resolving a vector

A **vector** has a magnitude and a direction. Splitting a vector into two
perpendicular parts is called **resolving**. For a vector of magnitude $F$ at an
angle $\theta$ to the horizontal:

$$
\text{horizontal component} = F\cos\theta, \qquad
\text{vertical component} = F\sin\theta.
$$

The component in a direction is the magnitude times the cosine of the angle
between the vector and that direction. The perpendicular component uses the
sine.

**Example 1.** A force of $50$ N acts at $30^\circ$ above the horizontal.
Resolve it horizontally and vertically.

$$
\text{horizontal} = 50\cos 30^\circ = 50 \times \frac{\sqrt{3}}{2} = 25\sqrt{3} \approx 43.3 \text{ N}.
$$

$$
\text{vertical} = 50\sin 30^\circ = 50 \times \frac{1}{2} = 25 \text{ N}.
$$

## 2. The resultant of two vectors

When two vectors act at a point, the single vector with the same effect is the
**resultant**. Draw the two vectors nose to tail to form a triangle, then use
the cosine rule and the sine rule.

If two vectors of magnitudes $p$ and $q$ have an angle $\theta$ between them, the
resultant $R$ satisfies

$$
R^2 = p^2 + q^2 + 2pq\cos\theta.
$$

The plus sign appears because the triangle's internal angle is
$180^\circ - \theta$, and $\cos(180^\circ - \theta) = -\cos\theta$.

**Example 2.** Two forces of $6$ N and $8$ N act at $60^\circ$ to each other.
Find the magnitude of the resultant.

$$
R^2 = 6^2 + 8^2 + 2 \times 6 \times 8 \times \cos 60^\circ
= 36 + 64 + 48 = 148.
$$

$$
R = \sqrt{148} = 2\sqrt{37} \approx 12.2 \text{ N}.
$$

To find the direction, use the sine rule in the same triangle. Let $\alpha$ be
the angle between the resultant and the $8$ N force. Then

$$
\frac{\sin\alpha}{6} = \frac{\sin 60^\circ}{2\sqrt{37}},
\qquad
\alpha \approx 25.3^\circ.
$$

## 3. Velocity in a current

The same triangle method works for velocities. The velocity through the water
and the velocity of the current add as vectors.

**Example 3.** A boat travels at $4$ m s$^{-1}$ due east. A current flows at
$3$ m s$^{-1}$ due north. Find the size and the direction of the boat's
resultant velocity.

The two velocities are perpendicular, so Pythagoras' theorem gives the size:

$$
v = \sqrt{4^2 + 3^2} = \sqrt{25} = 5 \text{ m s}^{-1}.
$$

The angle north of east satisfies

$$
\tan\theta = \frac{3}{4}, \qquad \theta \approx 36.9^\circ.
$$

The boat moves at $5$ m s$^{-1}$ at $36.9^\circ$ north of east.

## 4. Forces on a slope

A weight of magnitude $W$ on a slope of angle $\theta$ to the horizontal resolves
into two perpendicular parts:

- down the slope: $W\sin\theta$;
- into the slope: $W\cos\theta$.

**Example 4.** A block of weight $200$ N rests on a slope of $25^\circ$. Find the
components of the weight down the slope and into the slope.

$$
\text{down the slope} = 200\sin 25^\circ \approx 200 \times 0.4226 = 84.5 \text{ N}.
$$

$$
\text{into the slope} = 200\cos 25^\circ \approx 200 \times 0.9063 = 181.3 \text{ N}.
$$

> **Watch out.** Three mistakes are common when resolving.
>
> **Measuring the angle from the wrong direction.** The component in a direction
> uses the angle between the vector and that direction. A force at $30^\circ$ to
> the horizontal has horizontal component $F\cos 30^\circ$. If the angle given is
> to the vertical, the two components swap. Draw the triangle and mark the
> angle.
>
> **Using the wrong sign in the resultant.** For two vectors at an angle
> $\theta$ to each other, the resultant uses $+2pq\cos\theta$. For two sides of a
> triangle with included angle $\theta$, the cosine rule uses
> $-2pq\cos\theta$. Decide which picture you are drawing before you choose.
>
> **Forgetting that components are signed.** When a vector points left or down,
> its component in the positive direction is negative. Add the signed
> components, not the sizes. **Re-check:** the resultant must be at least as
> large as the larger component and no larger than the sum of the magnitudes.

## You should now be able to

- resolve a force or velocity into two perpendicular components;
- find the resultant of two vectors at an angle with the cosine rule;
- find the direction of a resultant with the sine rule or with a tangent;
- model a velocity in a current;
- resolve a weight on a slope;
- check a resultant against the sizes of the two vectors.
