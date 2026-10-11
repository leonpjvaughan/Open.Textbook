---
title: 'Chapter 3: Coordinate geometry'
chapter: 3
strand: pure
anchor: Does the causeway stay clear of the lake?
---

# Chapter 3: Coordinate geometry

## The chapter problem: does the causeway stay clear of the lake?

A new path is planned past a circular lake. On the survey plan, one unit stands
for $10$ metres.

The rim of the lake is

$$
x^2 + y^2 - 12x - 16y + 75 = 0.
$$

The surveyor has fixed two points on the centre line of the causeway:

$$
(12, 7) \qquad \text{and} \qquad (5, 14).
$$

The causeway must stay clear of the water. Does it?

A survey drone flies around the rim, one lap every $60$ seconds. Its position
$t$ seconds after it passes the easternmost point of the rim is

$$
x = 6 + 5\cos\left(\frac{\pi t}{30}\right), \qquad
y = 8 + 5\sin\left(\frac{\pi t}{30}\right).
$$

By the end of the chapter you will answer all of this exactly. You will find the
centre and the radius of the lake, and decide whether the causeway crosses it.
You will find where the two meet, and how far the causeway runs over water. You
will also find when the drone is above the line of the causeway.

> **First contact — no working needed yet.** The points $(11, 8)$ and $(6, 13)$
> both lie on the rim. Substituting either one into $x^2 + y^2 - 12x - 16y + 75$
> gives $0$. Plot all four points on rough axes. Does the line through
> $(12, 7)$ and $(5, 14)$ pass between $(11, 8)$ and $(6, 13)$? Write one
> sentence saying whether you think the causeway stays clear of the lake.

<details markdown="1">
<summary>If you are not sure where to start</summary>

Draw axes from $0$ to $14$ in both directions. Plot the four points. The line
through $(12, 7)$ and $(5, 14)$ goes down as it moves right, so its gradient is
negative. Join the two rim points with a straight line as well. If the planned
line and the rim line cross, the causeway runs over water.

The centre of the lake is the point you will need most often. Section 3.3 shows
how to find it by completing the square twice.
</details>

## By the end of this chapter you will be able to

- work out the gradient of a line from two points, or from its equation;
- write the equation of a line as $y = mx + c$, as $y - y_1 = m(x - x_1)$, and
  as $ax + by + c = 0$;
- read the gradient and the intercept of a straight-line model, with their
  units;
- use the gradient conditions for parallel and perpendicular lines;
- find the distance from a point to a line;
- write the equation of a circle and find its centre and radius by completing
  the square;
- use the tangent and chord properties of a circle;
- read a curve from its parametric equations and convert between parametric and
  Cartesian forms;
- build a parametric model of motion, and answer "where" and "when" questions
  from it.

## Where it is used

Almost every graph in the rest of the course is a curve or a line in the
$(x, y)$ plane. Mechanics describes motion with coordinates; vectors add
directions to them. Differentiation finds the gradient of a curve, which is the
idea you meet here for a straight line. The circle returns in mechanics and in
vectors, and the parametric form is how calculus tracks a moving point. The
tools in this chapter — find a gradient, name a line, complete the square,
eliminate a parameter — are the tools every later chapter reaches for.

## Your turn to connect it

Think of a circle and a straight edge that meet in your own life. It could be a
roundabout and the road beside it, a clock face and the hands, or a round table
and a straight ruler laid across it. Write down the two shapes, where they meet,
and one measurement about that meeting you would like to know.

## Roadmap

1. [3.1 Straight lines, gradients and straight-line models](Section 3.1/Walkthrough/index.md)
2. [3.2 Parallel and perpendicular lines](Section 3.2/Walkthrough/index.md)
3. [3.3 The equation of a circle and its properties](Section 3.3/Walkthrough/index.md)
4. [3.4 Parametric equations and Cartesian conversion](Section 3.4/Walkthrough/index.md)
5. [3.5 Parametric equations in modelling](Section 3.5/Walkthrough/index.md)
6. [Review](Review/index.md)
