---
title: 13.5 Tangents to a circle — Learn
chapter: 13
chapter_title: Coordinate geometry
section: '13.5'
section_title: Tangents to a circle
tier: O
refs:
- '2.2'
kind: walkthrough
---

# 13.5 Tangents to a circle — Learn

**Prerequisites:** the equation of a circle; perpendicular slopes; the distance
formula.

**Objectives:** find the tangent to a circle at a point on it; show that a line
is a tangent; find the length of a tangent from a point outside the circle.

A **tangent** is a line that touches a circle at exactly one point. That single
point is called the **point of contact**. A tangent is not a chord and it does
not cut the circle; it grazes it.

## The radius and the tangent

The key fact is this: the radius to the point of contact is perpendicular to the
tangent.

Why? The radius is the shortest distance from the centre to the line, and the
shortest distance from a point to a line is the perpendicular distance. So the
radius and the tangent meet at a right angle.

That gives a method. To find the tangent at a point:

1. find the slope of the radius from the centre to the point;
2. take its negative reciprocal to get the tangent slope;
3. use the point-slope form with the point of contact.

**Example 1.** Find the tangent to $x^2 + y^2 = 25$ at $(3, 4)$.

The centre is the origin. The radius slope is $\frac{4 - 0}{3 - 0} = \frac{4}{3}$.
The tangent slope is $-\frac{3}{4}$:

$$y - 4 = -\frac{3}{4}(x - 3) \quad\Rightarrow\quad 4y - 16 = -3x + 9
\quad\Rightarrow\quad 3x + 4y = 25$$

## The tangent from the chapter problem

**Example 2.** The roundabout has centre $C(3, 4)$ and radius $5$. The side road
leaves $B(7, 7)$ at a right angle to the main road. Find the tangent at $B$.

The radius $CB$ has slope $\frac{7 - 4}{7 - 3} = \frac{3}{4}$. The tangent slope
is $-\frac{4}{3}$:

$$y - 7 = -\frac{4}{3}(x - 7) \quad\Rightarrow\quad 4x + 3y = 49$$

This is exactly the side road from Section 13.3. So the side road is the tangent
to the roundabout at $B$.

## Showing that a line is a tangent

A line is a tangent when the distance from the centre to the line equals the
radius. This is often quicker than solving equations.

For the line $ax + by + c = 0$ and the centre $(a_1, b_1)$, the distance is

$$d = \frac{|a a_1 + b b_1 + c|}{\sqrt{a^2 + b^2}}$$

**Example 3.** Show that $4x + 3y = 49$ is a tangent to the circle with centre
$(3, 4)$ and radius $5$.

Write the line as $4x + 3y - 49 = 0$. Then

$$d = \frac{|4 \times 3 + 3 \times 4 - 49|}{\sqrt{4^2 + 3^2}} = \frac{|12 + 12 - 49|}{5} = \frac{25}{5} = 5$$

The distance equals the radius, so the line touches the circle once and is a
tangent.

## The length of a tangent from an outside point

Let $Q$ be a point outside the circle, and let $T$ be the point of contact. The
triangle $CQT$ has a right angle at $T$, because the radius $CT$ is
perpendicular to the tangent. Pythagoras gives

$$QT^2 = CQ^2 - r^2$$

**Example 4.** From $Q(6, 9)$, a tangent is drawn to the circle with centre
$C(3, 4)$ and radius $5$. Find the length of the tangent.

$$CQ^2 = (6 - 3)^2 + (9 - 4)^2 = 9 + 25 = 34$$

$$QT^2 = 34 - 25 = 9 \quad\Rightarrow\quad QT = 3$$

> **Watch out.** The tangent slope is the negative reciprocal of the radius
> slope, not the radius slope itself. You might also mistake the point of contact
> for the centre. The tangent never passes through the centre; if your line does,
> something has gone wrong.

## A guided investigation: the tangent at a point

The figure draws a circle, the radius to a point on it, and the tangent at that
point. Move the point and watch the two lines stay at a right angle.

**Predict first.** Before you move anything, predict the tangent when the point
is at the top of the circle. Will it be horizontal, vertical or slanted?

:::figure circle-tangent

**Test.** Move the point around the circle and check your prediction.

**Explain.** Write two or three sentences. Say what happens to the tangent when
the radius is vertical, and say how the right angle shows up in the two slopes.

## Progress check

Back to the chapter problem. The side road is $4x + 3y = 49$ and the roundabout
has centre $C(3, 4)$ and radius $5$.

1. Show that the distance from $C$ to the side road is $5$.
2. Say what that distance proves about the side road.
3. A maintenance point lies at $Q(6, 9)$. Find the length of the tangent from $Q$
   to the roundabout.

## You should now be able to

- explain why the radius and the tangent are perpendicular;
- find the tangent to a circle at a point on it;
- show that a line is a tangent by comparing a distance with the radius;
- find the length of a tangent from a point outside the circle.
