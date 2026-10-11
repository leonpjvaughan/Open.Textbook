---
title: 3.1 Kinematics and motion graphs — Learn
chapter: 3
chapter_title: Mechanics
section: '3.1'
section_title: Kinematics and motion graphs
dfe:
- AP3
kind: walkthrough
---

# 3.1 Kinematics and motion graphs — Learn

**Prerequisites:** scalars and vectors from Section 2.1; resolving a vector into
components from Section 2.2; changing the subject of a formula; reading a
straight-line graph.

**By the end of this section you can:** define displacement, velocity and
acceleration; use the four equations of motion for constant acceleration; read a
displacement–time graph and a velocity–time graph using the gradient and the
area; and use $g$ to analyse motion under gravity.

## 1. Displacement, velocity and acceleration

**Displacement** is the change in position, with a direction. It is a vector, so
a displacement of $-3.0\,\text{m}$ along a line means 3.0 m in the negative
direction. **Velocity** is the rate of change of displacement. It is also a
vector. **Acceleration** is the rate of change of velocity, and it is a vector
too.

$$ a = \frac{\Delta v}{\Delta t} $$

A negative acceleration does not always mean slowing down. It means the
acceleration points in the negative direction. A car moving in the negative
direction and speeding up has a negative acceleration as well.

An **average** velocity is the total displacement divided by the total time. An
**instantaneous** velocity is the velocity at one moment. On a straight motorway
run the average and instantaneous speeds may be almost equal. In a town centre
they are different, because the car stops and starts.

## 2. The equations of motion

When the acceleration is **constant**, four equations connect the five
quantities: displacement $s$, initial velocity $u$, final velocity $v$,
acceleration $a$ and time $t$.

$$
\begin{aligned}
v &= u + at \\
s &= \frac{(u + v)t}{2} \\
s &= ut + \tfrac{1}{2}at^2 \\
v^2 &= u^2 + 2as
\end{aligned}
$$

Each equation leaves out one quantity. The first leaves out $s$, the second
leaves out $a$, the third leaves out $v$, and the fourth leaves out $t$. Choose
the equation that omits the quantity you neither know nor want.

These equations come from the definitions of velocity and acceleration, so you
do not have to remember them as separate facts.

- From $a = \dfrac{v - u}{t}$, multiplying by $t$ and rearranging gives
  $v = u + at$.
- On a velocity–time graph with constant acceleration the line is straight. The
  area under it is a trapezium, so $s = \dfrac{(u + v)t}{2}$.
- Substituting $v = u + at$ into $s = \dfrac{(u + v)t}{2}$ gives
  $s = ut + \tfrac{1}{2}at^2$.
- Eliminating $t$ between the first two equations gives $v^2 = u^2 + 2as$.

**Worked example 1.** A car accelerates uniformly from
$8.0\,\text{m}\,\text{s}^{-1}$ to $20\,\text{m}\,\text{s}^{-1}$ in 4.0 s. Find
its acceleration and the distance it travels in that time.

$$
\begin{aligned}
a &= \frac{v - u}{t} = \frac{20 - 8.0}{4.0} = 3.0\,\text{m}\,\text{s}^{-2} \\
s &= \frac{(u + v)t}{2} = \frac{(8.0 + 20) \times 4.0}{2} = 56\,\text{m}
\end{aligned}
$$

The second equation is the quick one here, because the acceleration is not
needed for the distance.

**Worked example 2.** A train slows from $30\,\text{m}\,\text{s}^{-1}$ to rest
over a distance of 450 m. Find its deceleration.

Take the direction of travel as positive, so $u = 30$, $v = 0$ and $s = 450$.
The time is not given and is not wanted, so use $v^2 = u^2 + 2as$.

$$
\begin{aligned}
0 &= 30^2 + 2a(450) \\
a &= \frac{-900}{900} = -1.0\,\text{m}\,\text{s}^{-2}
\end{aligned}
$$

The acceleration is $-1.0\,\text{m}\,\text{s}^{-2}$, so the train slows at
1.0 m s⁻².

## 3. Reading a motion graph

A graph of motion carries the same information as the equations, in a different
form.

- On a **displacement–time** graph, the **gradient** is the velocity. A straight
  line means a constant velocity. A curve means the velocity is changing, and
  the gradient at a point gives the instantaneous velocity.
- On a **velocity–time** graph, the **gradient** is the acceleration, and the
  **area** between the line and the time axis is the displacement.
- On an **acceleration–time** graph, the area is the change in velocity.

A negative gradient on a displacement–time graph means the object is moving back
towards its starting point. On a velocity–time graph, a line below the time axis
means motion in the negative direction, and the area below the axis counts as
negative displacement.

**Worked example 3.** A van's velocity rises uniformly from 0 to
$12\,\text{m}\,\text{s}^{-1}$ in 6.0 s. It then travels at
$12\,\text{m}\,\text{s}^{-1}$ for 10 s, and finally slows uniformly to rest in
5.0 s. Find the acceleration in the first stage and the total displacement.

$$
\begin{aligned}
a &= \frac{12 - 0}{6.0} = 2.0\,\text{m}\,\text{s}^{-2} \\
s &= \text{area under the graph} \\
  &= \tfrac{1}{2}(6.0)(12) + (10)(12) + \tfrac{1}{2}(5.0)(12) \\
  &= 36 + 120 + 30 = 186\,\text{m}
\end{aligned}
$$

The area is split into a triangle, a rectangle and a triangle, so each part has
the shape of the motion in that stage.

## 4. Motion under gravity

An object in **free fall** moves under the pull of gravity alone. Air resistance
is taken as negligible. Near the Earth's surface the acceleration is
$g = 9.81\,\text{m}\,\text{s}^{-2}$, downwards, and it is the same for every
object when air resistance is small.

The equations of motion apply to free fall with $a = g$ or $a = -g$, depending
on which direction you chose as positive. Choose the positive direction first,
then keep it for the whole calculation.

**Worked example 4.** A stone is dropped from rest and falls for 2.5 s. Find its
speed and the distance it falls.

Take downwards as positive, so $u = 0$, $a = g = 9.81$ and $t = 2.5$.

$$
\begin{aligned}
v &= u + at = 0 + 9.81 \times 2.5 = 24.5\,\text{m}\,\text{s}^{-1} \\
s &= ut + \tfrac{1}{2}at^2 = 0 + \tfrac{1}{2} \times 9.81 \times 2.5^2 \\
  &= 30.7\,\text{m}
\end{aligned}
$$

> **Watch out.** The equations of motion hold only while the acceleration is
> **constant**. A car that is accelerating, cruising and then braking does not
> have one acceleration, so you cannot apply one equation to the whole journey.
> Split the journey into stages, and use the final velocity of one stage as the
> initial velocity of the next. Also fix the positive direction before you
> substitute: mixing a positive upward velocity with a positive downward
> acceleration is the most common sign error here.

## 5. Try it: the velocity–time graph

The figure draws the velocity–time graph for a motion with constant
acceleration. Two sliders set the initial velocity and the acceleration.

**Predict first.** Do not move the sliders yet. Write down your answers.

1. If the acceleration is zero, what is the shape of the graph, and what is the
   area under it?
2. If the initial velocity is zero, what is the shape of the area under the
   graph?
3. If the acceleration is negative but the initial velocity is positive, when
   does the object come to rest?

**Test.** Set the initial velocity to 8 and the acceleration to 3. Read the
gradient and the equation shown. Then set the acceleration to $-2$ and watch the
line cross the time axis. Check that the area changes sign after the crossing.

**Explain.** Why does the gradient of the graph give the acceleration, and why
does the area give the displacement? Write two or three sentences. Use the idea
that acceleration is the rate of change of velocity, and that displacement is
velocity multiplied by time.

:::figure motion-graphs

## Progress check

Return to the chapter problem. The car is released from rest and goes down a
straight section of track at 60° to the horizontal. It descends 45 m vertically.

1. Find the acceleration of the car down the slope. The component of $g$ along
   the slope is $g\sin\theta$.
2. Find the length of track the car travels along the slope.
3. Use $v^2 = u^2 + 2as$ to find the speed at the bottom of the drop.

If question 1 goes wrong, resolve the weight into a component along the slope.
If question 2 goes wrong, the vertical drop and the slope length are the
opposite and hypotenuse sides of a right-angled triangle. If question 3 goes
wrong, start from rest, so $u = 0$.

## You should now be able to

- define displacement, velocity and acceleration, and state that each is a
  vector;
- state the four equations of motion and say which quantity each one omits;
- derive the equations of motion from the definitions of velocity and
  acceleration;
- read the gradient of a displacement–time graph and the gradient and area of a
  velocity–time graph;
- split a journey into stages of constant acceleration;
- analyse free fall with $a = g$;
- choose the positive direction and keep it through a calculation.
