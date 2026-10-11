---
title: 15.3 Displacement–time and velocity–time graphs — Learn
chapter: 15
chapter_title: Quantities, units and kinematics
section: '15.3'
section_title: Displacement–time and velocity–time graphs
dfe:
- Q2
kind: walkthrough
---

# 15.3 Displacement–time and velocity–time graphs — Learn

**Prerequisites:** plotting coordinates; finding the gradient of a straight line;
the area of a rectangle, a triangle and a trapezium; the vocabulary of distance,
displacement, velocity and acceleration from Section 15.2.

**By the end of this section you can:** read a velocity from the gradient of a
displacement–time graph; read an acceleration from the gradient of a
velocity–time graph; find a displacement from the area under a velocity–time
graph; handle areas below the horizontal axis with the correct sign.

## 1. Displacement–time graphs

On a **displacement–time graph**, the horizontal axis is time and the vertical
axis is displacement from the origin. The graph shows where the object is at
each moment.

The gradient of the graph is the velocity. For a straight line,

$$
\text{velocity} = \frac{\text{change in displacement}}{\text{change in time}}.
$$

A horizontal line means the displacement does not change, so the object is at
rest. A straight line with a positive gradient means motion in the positive
direction at a steady velocity. A negative gradient means motion in the negative
direction.

If the graph is curved, the velocity is changing. The gradient of the tangent at
a point gives the velocity at that instant.

**Example 1.** A cyclist's displacement–time graph is a straight line through
$(0, 0)$ and $(4, 20)$, with $s$ in metres and $t$ in seconds. Find the velocity.

$$
v = \frac{20 - 0}{4 - 0} = 5 \text{ m/s}.
$$

The cyclist moves at a steady $5$ m/s in the positive direction.

**Example 2.** A displacement–time graph is horizontal from $t = 3$ s to
$t = 7$ s. What is the object doing?

The displacement is constant, so the gradient is zero. The object is at rest for
those four seconds.

## 2. Velocity–time graphs

On a **velocity–time graph**, the horizontal axis is time and the vertical axis
is velocity. Two facts carry all the information you need:

- the gradient is the acceleration;
- the area between the graph and the time axis is the displacement.

For a straight line from $(t_1, u)$ to $(t_2, v)$,

$$
a = \frac{v - u}{t_2 - t_1}.
$$

The displacement for that line is the area of the trapezium, which is

$$
s = \frac{u + v}{2}(t_2 - t_1).
$$

That is the formula used again in Section 15.4.

**Example 3.** A car's velocity rises steadily from $4$ m/s to $16$ m/s in
$6$ s. Find its acceleration and the distance travelled.

The gradient gives the acceleration:

$$
a = \frac{16 - 4}{6} = 2 \text{ m/s}^2.
$$

The area is a trapezium with parallel sides $4$ and $16$ and height $6$:

$$
s = \frac{4 + 16}{2} \times 6 = 10 \times 6 = 60 \text{ m}.
$$

## 3. Areas below the axis

The area below the time axis counts as negative. This matches the sign of the
displacement, because a negative velocity moves the object in the negative
direction.

To find the distance travelled, add the sizes of the areas, whether they lie
above or below the axis. To find the displacement, add the areas with their
signs.

**Example 4.** A ball is thrown upwards. Its velocity–time graph is a straight
line from $(0, 10)$ to $(2, -10)$, with $v$ in m/s and $t$ in s. Find the
distance travelled and the displacement over the two seconds.

The areas are two triangles. The triangle above the axis has area

$$
\frac{1}{2} \times 1 \times 10 = 5,
$$

and the triangle below the axis has the same size, $5$, but a negative sign.

So the displacement is $5 - 5 = 0$ m, and the distance travelled is
$5 + 5 = 10$ m. The ball returns to its starting point.

## 4. A journey in three parts

A velocity–time graph is often made of straight segments. Treat each segment on
its own: use the gradient for the acceleration, and the area for the
displacement. Then add.

**Example 5.** A train accelerates from rest to $12$ m/s in $8$ s, travels at
$12$ m/s for $20$ s, then brakes to rest in $6$ s. Find the total distance
travelled.

The first stage is a triangle: $\frac{1}{2} \times 8 \times 12 = 48$ m. The
second stage is a rectangle: $20 \times 12 = 240$ m. The third stage is a
triangle: $\frac{1}{2} \times 6 \times 12 = 36$ m. The total is

$$
48 + 240 + 36 = 324 \text{ m}.
$$

## 5. Try it: the velocity–time explorer

**Predict first.** The figure draws a velocity–time graph from an initial
velocity $u$ and a constant acceleration $a$ over a time $T$. Before you move
the sliders, predict what the graph looks like when $a$ is negative. Write down
what happens to the shaded area and to the displacement.

:::figure ch15-velocity-time

**Test.** Set $a$ to a positive value, then to zero, then to a negative value.
Watch the gradient of the line, the shaded area and the two readouts.

**Explain.** Write two sentences. The first says how the gradient of the line
tells you the acceleration. The second says how the shaded area gives the
displacement, including the sign when the line drops below the axis.

## Progress check

Return to the free kick. The ball starts with a vertical velocity of
$10\sqrt{2} \approx 14.1$ m/s upwards, and gravity gives it an acceleration of
$-9.8$ m/s$^2$.

1. Sketch the velocity–time graph for the vertical motion, from the kick to the
   moment the ball reaches the goal line at $t = 2\sqrt{2} \approx 2.83$ s.
2. What is the gradient of your line?
3. What does the area under your line represent?
4. Estimate the height of the ball when it reaches the goal line from the area
   under the graph.

> **Watch out.** Three mistakes are common with these graphs.
>
> **The two graphs mixed up.** The gradient of a displacement–time graph is a
> velocity, and the gradient of a velocity–time graph is an acceleration. In
> Example 1 the graph rises $20$ m in $4$ s, so its gradient $5$ is a velocity,
> not an acceleration.
>
> **A gradient used where an area is needed.** To find a displacement from a
> velocity–time graph, use the area under the line, not its gradient. In
> Example 3 the gradient gives the acceleration $2$ m/s$^2$, and the area gives
> the distance $60$ m.
>
> **An area below the axis given a positive sign.** Below the axis the velocity
> is negative, so the displacement in that time is negative. In Example 4 the
> two areas cancel and the displacement is zero. **Re-check:** a graph that
> returns to its starting value has equal positive and negative areas.

## You should now be able to

- read a velocity from the gradient of a displacement–time graph;
- read an acceleration from the gradient of a velocity–time graph;
- find a displacement from the area under a velocity–time graph;
- treat an area below the time axis as a negative displacement;
- find a distance travelled by adding the sizes of the areas;
- break a velocity–time graph into straight segments and use each one.
