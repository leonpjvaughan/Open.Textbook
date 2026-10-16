---
title: 1.5 Graphs, gradients and the language of data — Learn
chapter: 1
chapter_title: Measuring, modelling and investigating
section: '1.5'
section_title: Graphs, gradients and the language of data
tier: O
refs:
- '1.1'
- '1.4'
kind: walkthrough
---

# 1.5 Graphs, gradients and the language of data — Learn

**Prerequisites:** measurement and uncertainty from Sections 1.1 and 1.2, and the
investigation plan from Section 1.4.

**Objectives:** label the axes of a graph with a quantity and a unit; draw a line of
best fit; find a gradient with its unit; read an intercept and an area; straighten a
curve into a line whose gradient gives a constant.

By the end of this section, you can read a graph for what it says about the physics.

## Axes, scales and labels

A graph is a way of writing data so that a pattern becomes visible. Two rules make it
readable.

- Each axis carries the **quantity** and its **unit**, in the form **Fall time / s**.
- Each axis has a **scale** that uses the paper well, with equal steps.

The independent variable goes on the horizontal axis. The dependent variable goes on
the vertical axis. The units on the two axes also give the unit of the gradient, which
is what makes a graph a measuring instrument.

## The line of best fit

The points will not lie exactly on a line, because every measurement has an
uncertainty. Draw the single straight line that passes as close as possible to all of
them. Leave roughly as many points above the line as below it.

Do not join the points dot to dot. That would make the graph follow every random
error and would hide the pattern. The line of best fit is a summary, not a
connect-the-dots picture.

## Gradient

The **gradient** of a straight line is its rise divided by its run.

$$\text{gradient} = \frac{\text{change in the vertical quantity}}{\text{change in the horizontal quantity}} = \frac{\Delta y}{\Delta x}$$

Choose two points **far apart on the line**, not two data points, and read them off
the line. The wider the run, the smaller the effect of a reading error on the
gradient.

**Example 1.** A distance-time graph is a straight line through the origin, passing
through (4.0 s, 12 m). Find the gradient and state what it represents.

$$\text{gradient} = \frac{12\,\text{m}}{4.0\,\text{s}} = 3.0\,\text{m/s}$$

The gradient of a distance-time graph is the speed, so the object moves at
$3.0\,\text{m/s}$.

The unit of the gradient is the unit of the vertical axis divided by the unit of the
horizontal axis. Getting the unit right is part of reading the graph.

## Intercept

The **intercept** is where the line crosses an axis. The intercept on the vertical
axis is the value of the vertical quantity when the horizontal quantity is zero.

A line through the origin has an intercept of zero. That matters in physics, because
proportionality gives a line through the origin. A straight line with a non-zero
intercept often means the axes are offset, or that a second effect is present.

## Area under a graph

The **area under a line** on a graph often has a physical meaning. When the line is
straight, the area is a triangle or a trapezium, and you can calculate it.

**Example 2.** A force-extension graph for a spring is a straight line through (0, 0)
and (0.20 m, 10 N). Find the area under the graph up to 0.20 m.

$$\text{area} = \frac{1}{2} \times \text{base} \times \text{height} = \frac{1}{2} \times 0.20 \times 10 = 1.0\,\text{J}$$

The area under a force-extension graph is the energy stored in the spring, so the
spring stores $1.0\,\text{J}$.

## Straightening a graph

Sometimes the graph of the two quantities is a curve, and a curve is hard to read for
a constant. The trick is to plot a different pair of quantities that gives a straight
line.

The falling-ball model is the example that answers the chapter problem:

$$s = \frac{1}{2}gt^2$$

Plot $s$ against $t^2$, and the equation becomes $s = \left(\frac{1}{2}g\right)t^2$.
That is a straight line through the origin, with gradient $\frac{1}{2}g$.

So a graph of $s$ against $t^2$ turns the falling-ball model into a straight line, and
the gradient gives $g$.

> **Watch out.** A gradient is not a bare number. The gradient of a force-extension
> graph is in N/m, and the gradient of a distance-time graph is in m/s. Divide the
> units along with the numbers, or the answer means nothing. The same applies to the
> area: its unit is the product of the two axis units.

## Progress check

Back to the chapter problem. You have drop heights and mean fall times.

Plot $s$ against $t^2$. If the falling-ball model holds, the points lie on a straight
line through the origin. Find the gradient of that line, with its unit. Then double
the gradient to get $g$. Write down your value of $g$ and compare it with
$9.8\,\text{m/s}^2$.

Keep this graph. The Review uses it to decide how much of the difference between your
measurement and the model is the model's fault.

## You should now be able to

- label the axes of a graph with a quantity and its unit;
- draw a line of best fit and say why joining the points dot to dot is wrong;
- find the gradient of a straight line, with its unit, using two points far apart;
- read an intercept and say what a non-zero intercept means;
- find the area under a straight line and say what it represents;
- straighten a curve by plotting the right pair of quantities.
