---
title: 13.1 Distance, midpoint and slope — Learn
chapter: 13
chapter_title: Coordinate geometry
section: '13.1'
section_title: Distance, midpoint and slope
tier: F
refs:
- '2.2'
kind: walkthrough
---

# 13.1 Distance, midpoint and slope — Learn

**Prerequisites:** plotting points on the coordinate plane; Pythagoras' theorem.

**Objectives:** use the distance formula; find the midpoint of a segment; find
the slope of the line through two points.

A point in the plane is named by two numbers, $(x, y)$. This section turns that
naming into measurement. You will find how far apart two points are, where the
middle of the segment between them lies, and how steeply the line through them
rises.

## The distance between two points

Draw the segment from $A(x_1, y_1)$ to $B(x_2, y_2)$. Add a horizontal line from
$A$ and a vertical line from $B$, and they meet at a right angle. That right
angle is the key to everything in this section.

The horizontal side has length $x_2 - x_1$. The vertical side has length
$y_2 - y_1$. The segment $AB$ is the hypotenuse, so Pythagoras' theorem gives

$$AB = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$

This is the **distance formula**. The two differences are squared, so the order
of subtraction does not matter.

**Example 1.** Find the distance from $A(-1, 1)$ to $B(7, 7)$.

$$AB = \sqrt{(7 - (-1))^2 + (7 - 1)^2} = \sqrt{8^2 + 6^2} = \sqrt{64 + 36} = \sqrt{100} = 10$$

The distance is $10$ units.

## The midpoint of a segment

The **midpoint** is the point exactly halfway along the segment. Its coordinates
are the averages of the two endpoints:

$$M = \left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right)$$

**Example 2.** Find the midpoint of $A(-1, 1)$ and $B(7, 7)$.

$$M = \left(\frac{-1 + 7}{2}, \frac{1 + 7}{2}\right) = \left(\frac{6}{2}, \frac{8}{2}\right) = (3, 4)$$

The midpoint is $(3, 4)$. It is the average of the endpoints, so it sits halfway
along the segment in both directions at once.

## The slope of a line

The **slope** of a line measures how steeply it rises. It is the rise divided by
the run:

$$m = \frac{y_2 - y_1}{x_2 - x_1}$$

A line that rises as you move right has a positive slope. A line that falls has
a negative slope. A horizontal line has slope $0$.

**Example 3.** Find the slope of the line through $A(-1, 1)$ and $B(7, 7)$.

$$m = \frac{7 - 1}{7 - (-1)} = \frac{6}{8} = \frac{3}{4}$$

For every $4$ units you move right, the line rises $3$ units.

> **Watch out.** In the slope formula the two subtractions must run in the same
> direction. Taking $y_2 - y_1$ on the top and $x_1 - x_2$ on the bottom flips
> the sign of the answer. Write the points in the same order on both lines, then
> check that a line rising to the right has come out positive.

A vertical line is a special case. Both points have the same $x$-coordinate, so
the run is zero and the slope is undefined. You cannot divide by zero. A vertical
line is not "slope zero"; it has no slope at all.

## A guided investigation: two points on a line

The figure below draws two points and the line through them. Move the points and
watch the distance, the midpoint and the slope change together.

**Predict first.** Before you touch a control, move point $B$ directly above
point $A$, so the line is vertical. What will happen to the slope? What will
happen to the distance?

:::figure line-two-points

**Test.** Move the points and check your prediction. Then make the segment
horizontal and watch the slope.

**Explain.** Write two or three sentences. Say what the slope becomes when the
line is vertical, and say why the distance formula still gives an answer. Use
the words *run* and *Pythagoras*.

## Progress check

Back to the chapter problem. The main road runs from $A(-1, 1)$ to $B(7, 7)$.

1. Find the length of the main road in units, then in metres.
2. Find the midpoint of $AB$.
3. Find the slope of the main road.

Keep your three answers. The midpoint is the centre of the roundabout, and you
will use it in Section 13.4. The slope is the slope of the main road, and you
will use it in Sections 13.2 and 13.3.

## You should now be able to

- find the distance between two points with the distance formula;
- find the midpoint of a segment;
- find the slope of a line through two points;
- explain what happens to the slope of a vertical line, and why.
