---
title: 12.10 Bearings and three-dimensional problems — Learn
chapter: 12
chapter_title: Trigonometry
section: '12.10'
section_title: Bearings and three-dimensional problems
tier: O
refs:
- '2.3'
kind: walkthrough
---

# 12.10 Bearings and three-dimensional problems — Learn

**Prerequisites:** Section 12.1 — the ratios; Section 12.2 — Pythagoras' theorem;
Section 12.6 — the sine and cosine rules.

**Objectives:** read and write a three-figure bearing; find a back bearing; solve a
two-dimensional problem that uses bearings.<!-- tier:h --> You can also use the ratios
and Pythagoras' theorem in three dimensions.<!-- /tier:h -->

By the end of this section you can set out a bearing problem and solve it.<!-- tier:h -->
You can also find an angle inside a solid.<!-- /tier:h -->

## What a bearing is

A **bearing** describes a direction. It is measured **clockwise from north**, and it is
written with three figures.

- North is $000^\circ$.
- East is $090^\circ$.
- South is $180^\circ$.
- West is $270^\circ$.

A bearing of $048^\circ$ points north-east. A bearing of $330^\circ$ points
north-west.

Every north line on a diagram points in the same direction, because north is the same
everywhere. Parallel north lines are what let you move an angle from one corner of a
diagram to another.

## Back bearings

The bearing of $B$ from $A$ and the bearing of $A$ from $B$ differ by $180^\circ$. To
find a **back bearing**, add $180^\circ$. If the answer is $360^\circ$ or more, subtract
$360^\circ$.

**Example 1.** The bearing of a boat from a harbour is $065^\circ$. Find the bearing of
the harbour from the boat.

$$065^\circ + 180^\circ = 245^\circ$$

The back bearing is $245^\circ$. The two bearings are opposite directions along the same
line.

## A distance and a bearing from two legs

**Example 2.** A walker goes $5$ km north, then $8$ km east. Find the distance and the
bearing of the walker from the start.

The two legs are perpendicular, so they form a right triangle. The distance is the
hypotenuse:

$$d = \sqrt{5^2 + 8^2} = \sqrt{89} = 9.43 \text{ km}$$

The bearing is measured at the start, from north. The angle inside the triangle is
$\tan^{-1}\!\left(\dfrac{8}{5}\right) = 58.0^\circ$, so the bearing is $058^\circ$.

## A bearing problem with two distances

**Example 3.** Two boats leave the same station. The first is $6$ km away on a bearing of
$070^\circ$. The second is $9$ km away on a bearing of $130^\circ$. Find the distance
between the boats.

The angle between the two bearings is $130^\circ - 70^\circ = 60^\circ$. The station and
the two boats form a triangle with two sides and the angle between them, so use the
cosine rule:

$$d^2 = 6^2 + 9^2 - 2(6)(9)\cos 60^\circ$$

$$d^2 = 36 + 81 - 54 = 63 \qquad d = \sqrt{63} = 7.94 \text{ km}$$

> **Watch out.** A bearing is measured clockwise from north, not from the $x$-axis. A
> bearing of $130^\circ$ is not the same as the angle $130^\circ$ in standard position.
> The difference is a quarter turn.
>
> **Re-check:** draw the north line at the station and mark the bearing clockwise from
> it. If the boat is in the south-east, its bearing is between $090^\circ$ and
> $180^\circ$.

## Progress check

Back to the chapter problem. The bearing of the yacht from the lighthouse is $330^\circ$,
and the bearing of the yacht from the station is $048^\circ$.

Write down the bearing of the lighthouse from the yacht, and the bearing of the station
from the yacht.

The two are back bearings:

$$330^\circ - 180^\circ = 150^\circ \qquad 048^\circ + 180^\circ = 228^\circ$$

Now check the angle at the yacht. The two bearings are $150^\circ$ and $228^\circ$, and
$228^\circ - 150^\circ = 78^\circ$. That is the angle found in Section 12.6 from the
triangle, so the bearings and the triangle agree.

<!-- tier:h -->

## Three-dimensional problems

A solid has no flat triangle to work in, so you must find one inside it. The method is
always the same: identify a right triangle whose sides you can find, then use a ratio.

The **angle between a line and a plane** is the angle between the line and its
**projection** on the plane. Drop a perpendicular from the top of the line to the plane.
The projection joins the foot of that perpendicular to the bottom of the line.

**Example 4.** A cuboid is $5$ cm long, $4$ cm wide and $3$ cm high. Find the angle
between the space diagonal and the base.

The space diagonal runs from a bottom corner to the opposite top corner. Its projection
on the base is the diagonal of the base:

$$\text{base diagonal} = \sqrt{5^2 + 4^2} = \sqrt{41}$$

The right triangle has height $3$ and base $\sqrt{41}$. The angle at the bottom corner is

$$\tan\theta = \frac{3}{\sqrt{41}} \qquad \theta = 25.1^\circ$$

**Example 5.** A square-based pyramid has base side $8$ m and vertical height $6$ m. Find
the angle between a sloping edge and the base.

The apex is directly above the centre of the base. A sloping edge runs from the apex to a
base vertex, and its projection is half the diagonal of the base:

$$\text{half-diagonal} = \frac{8\sqrt{2}}{2} = 4\sqrt{2} = 5.66 \text{ m}$$

$$\tan\theta = \frac{6}{4\sqrt{2}} \qquad \theta = 46.7^\circ$$

**Example 6.** For the same pyramid, find the angle between a sloping face and the base.

A face meets the base along the middle of a side. The horizontal distance from the centre
to that midpoint is $4$ m, half the base side.

$$\tan\phi = \frac{6}{4} \qquad \phi = 56.3^\circ$$

The face is steeper than the edge, because the face's horizontal distance, $4$ m, is
smaller than the edge's, $5.66$ m.

> **Watch out.** Examples 5 and 6 use different horizontal distances. A sloping edge uses
> the half-diagonal, and a sloping face uses the distance to the midpoint of an edge.
> Taking the wrong one gives the wrong angle.
>
> **Re-check:** name the three vertices of the right triangle before you calculate. For a
> sloping edge they are the apex, the centre of the base and a base vertex. For a face
> they are the apex, the centre and the midpoint of a side.

<!-- /tier:h -->

## You should now be able to

- read a three-figure bearing and write one down;
- find a back bearing by adding or subtracting $180^\circ$;
- set out a bearing problem with parallel north lines;
- solve a bearing problem with the cosine rule or the sine rule;
- check the angle at a point against the bearings.

<!-- tier:h -->

- find the angle between a line and a plane in a solid;
- choose the correct right triangle inside a cuboid or a pyramid.

<!-- /tier:h -->
