---
title: 3.2 Dynamics and Newton's laws of motion — Learn
chapter: 3
chapter_title: Mechanics
section: '3.2'
section_title: Dynamics and Newton's laws of motion
refs:
- AP3
kind: walkthrough
---

# 3.2 Dynamics and Newton's laws of motion — Learn

**Prerequisites:** the equations of motion and their graphs from Section 3.1;
resolving a vector into components from Section 2.2; the difference between mass
and weight from Section 2.1.

**By the end of this section you can:** state Newton's three laws; draw a
free-body diagram and find the resultant force; apply $F = ma$; find the
apparent weight of an object in a lift; analyse projectile motion as a constant
horizontal velocity and a constant vertical acceleration; and explain terminal
velocity.

## 1. Newton's first law

**Newton's first law** says that an object stays at rest, or keeps moving in a
straight line at constant velocity, unless a **resultant force** acts on it.

A resultant force is the single force that has the same effect as all the forces
added together. When the forces on an object balance, the resultant is zero, and
the velocity does not change. The object may still be moving, but it moves in a
straight line at constant speed.

The tendency of an object to keep its velocity is called **inertia**. A larger
mass has more inertia, so a larger force is needed to change its motion.

A book resting on a table has two forces on it: its weight downwards and the
normal reaction upwards. The two forces balance, so the resultant is zero and the
book stays at rest. A car travelling at a steady speed on a straight road also
has a zero resultant: the driving force balances the drag and friction.

## 2. Newton's second law

**Newton's second law** says that the resultant force on an object equals its
mass multiplied by its acceleration.

$$ F = ma $$

Here $F$ is the **resultant** force in newtons, $m$ is the mass in kilograms and
$a$ is the acceleration in metres per second squared. The acceleration is always
in the same direction as the resultant force.

The equation also shows that the same force gives a smaller acceleration to a
larger mass. Doubling the mass halves the acceleration.

**Worked example 1.** A car of mass 1200 kg accelerates at
$2.0\,\text{m}\,\text{s}^{-2}$. Find the resultant force on it.

$$
F = ma = 1200 \times 2.0 = 2400\,\text{N}
$$

**Worked example 2.** A crate of mass 25 kg is pulled along a floor with a
horizontal force of 90 N. A friction force of 40 N acts against the motion. Find
the acceleration.

The resultant force is the pull minus the friction.

$$
\begin{aligned}
F &= 90 - 40 = 50\,\text{N} \\
a &= \frac{F}{m} = \frac{50}{25} = 2.0\,\text{m}\,\text{s}^{-2}
\end{aligned}
$$

The 90 N pull does not give an acceleration of $90/25$, because the friction is
part of the resultant.

## 3. Newton's third law

**Newton's third law** says that if object A exerts a force on object B, then
object B exerts an equal and opposite force on object A.

The two forces are always of the same type, equal in size, opposite in
direction, and **on two different objects**. This last point is the one that
matters. The weight of a book and the normal reaction from the table are equal
and opposite, but they are not a third-law pair, because both act on the same
object, the book. The third-law partner of the book's weight is the gravitational
pull of the book on the Earth.

## 4. Free-body diagrams and the common forces

A **free-body diagram** shows one object on its own with every force acting on
it. Draw the forces as arrows from the object, and label each one. Then find the
resultant.

| Force | Acts | Notes |
|---|---|---|
| Weight | downwards, from the centre of mass | $W = mg$ |
| Normal reaction | perpendicular to a surface | prevents the object sinking in |
| Tension | along a rope or cable, away from the object | pulls |
| Friction | along a surface, opposing sliding | opposes relative motion |
| Drag | opposite to the velocity through a fluid | grows with speed |

Weight is a force, measured in newtons. Mass is measured in kilograms and does
not change with position. On the Moon the mass of an astronaut is unchanged, but
the weight is smaller because $g$ is smaller.

**Worked example 3.** A crate of mass 30 kg rests on a slope at 20° to the
horizontal. Find the normal reaction and the component of the weight along the
slope.

$$
\begin{aligned}
W &= mg = 30 \times 9.81 = 294\,\text{N} \\
W_{\perp} &= W\cos 20^\circ = 294 \times 0.940 = 276\,\text{N} \\
W_{\parallel} &= W\sin 20^\circ = 294 \times 0.342 = 101\,\text{N}
\end{aligned}
$$

The normal reaction is $276\,\text{N}$, perpendicular to the slope. The
component along the slope is $101\,\text{N}$.

## 5. Motion under a constant force

When the resultant force is constant, the acceleration is constant, and the
equations of motion from Section 3.1 apply.

**A lift.** A person standing in a lift feels a normal reaction $N$ from the
floor. When the lift accelerates upwards, Newton's second law gives
$N - mg = ma$, so $N = m(g + a)$. The person feels heavier. When the lift
accelerates downwards, $mg - N = ma$, so $N = m(g - a)$, and the person feels
lighter. If the cable breaks, $a = g$ and $N = 0$: the person and the floor fall
together.

**A slope.** On a frictionless slope at angle $\theta$, the only force along the
slope is the component of the weight, so

$$ a = g\sin\theta $$

The angle changes how the weight is shared between the two components, but the
total weight is unchanged.

**Worked example 4.** A passenger of mass 70 kg stands in a lift that accelerates
upwards at $1.2\,\text{m}\,\text{s}^{-2}$. Find the normal reaction on the
passenger.

$$
\begin{aligned}
N &= m(g + a) \\
  &= 70(9.81 + 1.2) \\
  &= 771\,\text{N}
\end{aligned}
$$

The passenger's weight is $687\,\text{N}$, so the floor pushes up with a larger
force than gravity pulls down. The extra force provides the upward acceleration
and makes the passenger feel heavier.

## 6. Projectile motion

A **projectile** is an object moving under gravity alone. Air resistance is
taken as negligible. The object may be thrown at any angle, but once it is in
flight the only force on it is its weight, which acts downwards.

The key idea is that the horizontal and vertical motions are independent.

- **Horizontally** there is no force, so the horizontal velocity is constant:
  $x = u_x t$.
- **Vertically** the acceleration is $g$ downwards, so the equations of motion
  apply: $v_y = u_y - gt$ and $y = u_y t - \tfrac{1}{2}gt^2$.

Resolve the initial velocity into components first:
$u_x = u\cos\theta$ and $u_y = u\sin\theta$, where $\theta$ is measured from the
horizontal.

At the highest point the vertical velocity is zero, but the horizontal velocity
is unchanged. The time to the highest point is $t = \dfrac{u_y}{g}$, and the
total time of flight is twice that, if the projectile lands at the same height it
started from.

**Worked example 5.** A ball is kicked at $20\,\text{m}\,\text{s}^{-1}$ at 30°
above the horizontal. Find the time of flight, the range and the maximum height.
Take $g = 9.81\,\text{m}\,\text{s}^{-2}$.

$$
\begin{aligned}
u_x &= 20\cos 30^\circ = 17.3\,\text{m}\,\text{s}^{-1} \\
u_y &= 20\sin 30^\circ = 10.0\,\text{m}\,\text{s}^{-1} \\
t_{\text{top}} &= \frac{u_y}{g} = \frac{10.0}{9.81} = 1.02\,\text{s} \\
t_{\text{flight}} &= 2 \times 1.02 = 2.04\,\text{s} \\
\text{range} &= u_x \times t_{\text{flight}} = 17.3 \times 2.04 = 35.3\,\text{m} \\
h_{\max} &= \frac{u_y^2}{2g} = \frac{10.0^2}{2 \times 9.81} = 5.10\,\text{m}
\end{aligned}
$$

> **Watch out.** The horizontal motion has **no acceleration**, so the horizontal
> velocity must not be made to decrease with time. A common error is to write
> $v_x = u\cos\theta - gt$, borrowing the vertical acceleration for the
> horizontal direction. Check by asking which direction the weight points: it is
> vertical, so it can change only the vertical velocity.

## 7. Try it: a projectile

The figure launches a projectile from ground level. Two sliders set the launch
speed and the launch angle.

**Predict first.** Do not move the sliders yet. Write down your answers.

1. Which angle gives the greatest range, for a fixed launch speed?
2. If you increase the launch speed and keep the angle fixed, what happens to
   the time of flight?
3. At the highest point of the path, which velocity component is zero?

**Test.** Set the speed to 20 and move the angle from 15° to 75°. Watch the
range and the height. Then set the angle to 45° and increase the speed.

**Explain.** Why can the two components be treated separately when the only
force is vertical? Write two or three sentences. Use the idea that a vertical
force cannot change a horizontal velocity.

:::figure projectile-motion

## 8. Terminal velocity

In a fluid, the **drag** force on a moving object grows as the object moves
faster. A falling object has two forces on it: its weight downwards and the drag
upwards.

- At the start the object is slow, so the drag is small and the resultant is
  almost the whole weight. The acceleration is close to $g$.
- As the speed rises, the drag rises, so the resultant force falls and the
  acceleration falls.
- When the drag equals the weight, the resultant is zero. The object stops
  accelerating and falls at a constant **terminal velocity**.

**Worked example 6.** A skydiver of mass 80 kg falls at terminal velocity. Find
the drag force. At one instant during the fall the drag is 600 N. Find the
acceleration at that instant.

At terminal velocity the resultant is zero, so the drag equals the weight.

$$ D = mg = 80 \times 9.81 = 785\,\text{N} $$

When the drag is 600 N, the resultant is

$$
\begin{aligned}
F &= mg - D = 785 - 600 = 185\,\text{N} \\
a &= \frac{F}{m} = \frac{185}{80} = 2.3\,\text{m}\,\text{s}^{-2}
\end{aligned}
$$

The skydiver is still accelerating, because the drag has not yet grown to match
the weight.

## Progress check

Return to the chapter problem. The car and riders have a mass of 500 kg and the
first drop is at 60° to the horizontal.

1. Find the weight of the car and riders.
2. Find the component of the weight along the slope and the component
   perpendicular to the slope.
3. Use $F = ma$ along the slope to find the acceleration. Compare it with
   $g\sin 60^\circ$.

If question 1 goes wrong, weight is $mg$. If question 3 goes wrong, the only
force along the slope is the component you found in question 2.

## You should now be able to

- state Newton's first law and explain inertia;
- state Newton's second law and apply $F = ma$ to a resultant force;
- state Newton's third law and say why its two forces act on different objects;
- draw a free-body diagram and identify weight, normal reaction, tension,
  friction and drag;
- find the apparent weight of an object in an accelerating lift;
- find the acceleration on a frictionless slope;
- resolve a projectile's velocity and analyse its horizontal and vertical motion
  separately;
- explain terminal velocity in terms of the drag and the weight.
