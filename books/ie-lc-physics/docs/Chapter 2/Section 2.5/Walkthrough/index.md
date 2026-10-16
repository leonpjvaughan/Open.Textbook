---
title: 2.5 Deriving the equations of motion from a graph — Learn
chapter: 2
chapter_title: Describing motion
section: '2.5'
section_title: Deriving the equations of motion from a graph
tier: H
refs:
- '1.1'
kind: walkthrough
---

# 2.5 Deriving the equations of motion from a graph — Learn

**Prerequisites:** reading a velocity-time graph (Section 2.2); using the equations of
motion (Section 2.3).

**Objectives:** derive $v = u + at$, $s = \dfrac{u + v}{2}\,t$, $s = ut +
\frac{1}{2}at^2$ and $v^2 = u^2 + 2as$ from a velocity-time graph.

By the end of this section, you can show where the equations of motion come from, rather
than taking them on trust.

## The graph

For motion with constant acceleration, the velocity-time graph is a straight line. It
starts at velocity $u$ when $t = 0$ and ends at velocity $v$ at time $t$.

Two facts about this graph give the equations.

- The **gradient** of the line is the acceleration $a$.
- The **area** under the line is the displacement $s$.

Every step below uses one of those two facts. Nothing else is needed.

## Deriving v = u + at

The gradient is the change in velocity divided by the time taken:

$$a = \frac{v - u}{t}$$

Multiply both sides by $t$:

$$at = v - u$$

Add $u$ to both sides:

$$v = u + at$$

That is the first equation of motion, and it comes straight from the gradient.

## Deriving s = (u + v) t / 2

The area under the line is the displacement $s$. The shape is a trapezium, with parallel
sides $u$ and $v$ and distance between them $t$.

$$\text{area of a trapezium} = \frac{1}{2}(\text{sum of parallel sides})(\text{distance between them})$$

So

$$s = \frac{u + v}{2}\,t$$

That is the second equation, and it comes straight from the area.

## Deriving s = ut + ½ at²

Start from the second equation and substitute the first one.

$$s = \frac{u + v}{2}\,t$$

Replace $v$ by $u + at$:

$$s = \frac{u + (u + at)}{2}\,t = \frac{2u + at}{2}\,t$$

Multiply out the bracket and divide each term by 2:

$$s = ut + \frac{1}{2}at^2$$

## Deriving v² = u² + 2as

This time, remove the time. Rearrange the first equation for $t$:

$$t = \frac{v - u}{a}$$

Substitute this into the second equation:

$$s = \frac{u + v}{2} \times \frac{v - u}{a} = \frac{(u + v)(v - u)}{2a}$$

The bracket $(u + v)(v - u)$ multiplies out to $v^2 - u^2$, so

$$s = \frac{v^2 - u^2}{2a}$$

Multiply both sides by $2a$ and rearrange:

$$v^2 = u^2 + 2as$$

## Worked example

A velocity-time graph is a straight line from 4.0 m/s at $t = 0$ to 14 m/s at $t = 5.0$ s.
Use the graph to find the acceleration and the displacement.

The gradient gives the acceleration:

$$a = \frac{v - u}{t} = \frac{14 - 4.0}{5.0} = 2.0\,\text{m/s}^2$$

The area gives the displacement:

$$s = \frac{u + v}{2}\,t = \frac{4.0 + 14}{2} \times 5.0 = 45\,\text{m}$$

> **Watch out.** The derivation needs a **straight** velocity-time line, because only then
> is the shape a trapezium with a single gradient. If the line curves, the acceleration is
> changing and none of the four equations applies. The area also gives the **displacement**,
> not the distance travelled. If the velocity changes sign, the two are different, because
> the area below the time axis counts as negative.

## Progress check

Back to the chapter problem. The drone's velocity-time graph rises from $(0, 0)$ to
$(4.0\,\text{s}, 8.0\,\text{m/s})$.

Derive $s = ut + \frac{1}{2}at^2$ from the graph, then use it with $u = 0$,
$a = 2.0\,\text{m/s}^2$ and $t = 4.0\,\text{s}$. You should find a height of $16\,\text{m}$.

Now find the area of the triangle under the line directly, and check that it gives the
same $16\,\text{m}$. The equation and the graph agree, because the equation came from the
graph.

## You should now be able to

- state that the gradient of a velocity-time graph is the acceleration and the area is
  the displacement;
- derive $v = u + at$ from the gradient;
- derive $s = \dfrac{u + v}{2}\,t$ from the area of the trapezium;
- derive $s = ut + \frac{1}{2}at^2$ by substitution;
- derive $v^2 = u^2 + 2as$ by eliminating $t$;
- say why the derivation needs a straight line and why the area gives displacement, not
  distance.
