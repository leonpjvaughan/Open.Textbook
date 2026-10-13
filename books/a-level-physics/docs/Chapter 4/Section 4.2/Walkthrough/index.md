---
title: 4.2 Force-extension graphs and stored energy — Learn
chapter: 4
chapter_title: Materials
section: '4.2'
section_title: Force-extension graphs and stored energy
refs:
- AP4
kind: walkthrough
---

# 4.2 Force-extension graphs and stored energy — Learn

**Prerequisites:** stress, strain and the Young modulus from Section 4.1; the
equation of a straight line; the area of a triangle and a trapezium; the idea
that work done is energy transferred.

**By the end of this section you can:** state Hooke's law and use it; find the
spring constant from a force-extension graph; explain the limit of
proportionality, the elastic limit and plastic deformation; find the energy
stored in a stretched material from the area under its graph; and use
$E = \tfrac{1}{2}F\Delta L$ when the graph is a straight line through the
origin.

## 1. Hooke's law

Stretch a spring and it pulls back. For a spring that has not been stretched too
far, the force needed is proportional to the extension. This is **Hooke's law**.

$$ F = k\Delta L $$

The constant $k$ is the **spring constant**. It is the force needed for unit
extension, and its unit is $\text{N}\,\text{m}^{-1}$. A stiff spring has a large
spring constant.

**Worked example 1.** A spring extends by $0.040\,\text{m}$ when a force of
$8.0\,\text{N}$ acts on it. Find its spring constant.

$$ k = \frac{F}{\Delta L} = \frac{8.0}{0.040} = 200\,\text{N}\,\text{m}^{-1} $$

The spring constant is $200\,\text{N}\,\text{m}^{-1}$.

## 2. The force-extension graph

Plot the force on the vertical axis and the extension on the horizontal axis.
For a spring that obeys Hooke's law, the graph is a straight line through the
origin. The **gradient** of the line is the spring constant.

$$ k = \frac{\text{change in force}}{\text{change in extension}} $$

A steeper line means a larger spring constant, so a stiffer spring.

The same idea works for a wire. The gradient of a wire's force-extension graph
is

$$ k = \frac{EA}{L} $$

so a wire of larger area or shorter length is stiffer. This links the graph to
the stress and the Young modulus from Section 4.1.

**Worked example 2.** A force-extension graph for a spring is a straight line
through the origin. The line passes through $(0.010\,\text{m}, 4.0\,\text{N})$
and $(0.040\,\text{m}, 16\,\text{N})$. Find the spring constant.

$$
\begin{aligned}
k &= \frac{\text{change in force}}{\text{change in extension}} \\
  &= \frac{16 - 4.0}{0.040 - 0.010} = \frac{12}{0.030} \\
  &= 400\,\text{N}\,\text{m}^{-1}
\end{aligned}
$$

The gradient is the spring constant, so $k = 400\,\text{N}\,\text{m}^{-1}$.

## 3. The limit of proportionality and the elastic limit

Hooke's law does not hold forever.

- The **limit of proportionality** is the point on the graph where the line
  stops being straight. Below it the extension is proportional to the force.
- The **elastic limit** is the point beyond which the material does not return
  to its original length when the load is removed. The change of shape that
  remains is **plastic deformation**.

For many materials the limit of proportionality comes just before the elastic
limit. Between the two points the graph is no longer straight, but the material
still springs back when the load is removed.

> **Watch out.** A spring that has been stretched past its elastic limit does
> not return to its original length. If you use it again, the extension for a
> given force is larger than before, and $F = k\Delta L$ no longer describes it.
> Check a spring by comparing its length before and after a heavy load. If the
> length has changed, the elastic limit has been passed.

## 4. The energy stored in a stretched material

Stretching a wire does work on it. That work is stored as **elastic potential
energy**. The work done equals the area under the force-extension graph.

The force does not stay at its final value while the wire stretches. It rises
from zero to $F$. For a straight-line graph the average force is $\tfrac{1}{2}F$.
The distance moved is the extension $\Delta L$. So the energy stored is the
average force multiplied by the extension.

$$ \text{energy stored} = \frac{1}{2}F\Delta L = \frac{1}{2}k(\Delta L)^2 $$

**Worked example 3.** A spring of spring constant $200\,\text{N}\,\text{m}^{-1}$
is stretched by $0.040\,\text{m}$. Find the force and the energy stored.

$$
\begin{aligned}
F &= k\Delta L = 200 \times 0.040 = 8.0\,\text{N} \\
E &= \frac{1}{2}F\Delta L = \frac{1}{2} \times 8.0 \times 0.040 = 0.16\,\text{J}
\end{aligned}
$$

The energy stored is $0.16\,\text{J}$.

## 5. When the graph is not a straight line

If the graph bends, the area is not a triangle, and $\tfrac{1}{2}F\Delta L$ is
not the energy. Find the area by counting squares, or by splitting the area into
strips and adding them.

**Worked example 4.** A rubber cord gives the forces in the table.

| Extension / m | 0 | 0.020 | 0.040 | 0.060 | 0.080 |
|---|---|---|---|---|---|
| Force / N | 0 | 3.5 | 7.5 | 13 | 20 |

Find the energy stored when the extension is $0.080\,\text{m}$.

Each strip is a trapezium. The area of a trapezium is half the sum of the two
parallel sides, multiplied by the width.

$$
\begin{aligned}
E &= \tfrac{1}{2}(0 + 3.5)(0.020) + \tfrac{1}{2}(3.5 + 7.5)(0.020) \\
  &\quad + \tfrac{1}{2}(7.5 + 13)(0.020) + \tfrac{1}{2}(13 + 20)(0.020) \\
  &= 0.035 + 0.11 + 0.205 + 0.33 \\
  &= 0.68\,\text{J}
\end{aligned}
$$

The energy stored is $0.68\,\text{J}$. The formula $\tfrac{1}{2}F\Delta L$ would
give $\tfrac{1}{2} \times 20 \times 0.080 = 0.80\,\text{J}$, which is too
large, because the graph is below the straight line.

## 6. Try it: shape of a force-extension graph

The figure draws a force-extension graph for a spring. Change the stiffness and
the force and watch the line, its gradient and the shaded area.

**Predict first.** Do not move the sliders yet. Write down your answers.

1. If you double the force on the same spring, what happens to the extension?
2. If you double the force, what happens to the energy stored?
3. If you make the spring stiffer, does the line get steeper or shallower?

**Test.** Set the stiffness to $200\,\text{N}\,\text{m}^{-1}$ and move the force
slider through $10\,\text{N}$, $20\,\text{N}$ and $40\,\text{N}$. Then keep the
force at $20\,\text{N}$ and change the stiffness.

**Explain.** Why is the energy stored equal to the area under the line, and why
is it $\tfrac{1}{2}F\Delta L$ rather than $F\Delta L$? Write two or three
sentences. Use the idea that the force grows from zero to its final value.

:::figure force-extension

## Progress check

Return to the chapter problem. The cable has Young modulus
$2.0 \times 10^{11}\,\text{Pa}$, cross-sectional area
$1.5 \times 10^{-4}\,\text{m}^2$ and unstretched length $20.0\,\text{m}$.

1. Find the stiffness $k = \dfrac{EA}{L}$ of the cable.
2. Under the beam the cable extends by $1.635 \times 10^{-2}\,\text{m}$. Find
   the energy stored in the cable.
3. The working stress is $3.0 \times 10^{8}\,\text{Pa}$. Find the greatest force
   the cable may carry, and then the greatest mass.

If question 1 goes wrong, multiply the Young modulus by the area and divide by
the length. If question 2 goes wrong, use $\tfrac{1}{2}k(\Delta L)^2$ or
$\tfrac{1}{2}F\Delta L$. If question 3 goes wrong, the greatest force is the
working stress multiplied by the area, and the mass is the force divided by
$9.81\,\text{N}\,\text{kg}^{-1}$.

## You should now be able to

- state Hooke's law and use it to find a force, an extension or a spring
  constant;
- find the spring constant from the gradient of a force-extension graph;
- describe the limit of proportionality, the elastic limit and plastic
  deformation;
- find the energy stored in a stretched material from the area under its graph;
- use $E = \tfrac{1}{2}F\Delta L = \tfrac{1}{2}k(\Delta L)^2$ for a straight-line
  graph, and find the area by strips when the graph bends;
- relate the gradient of a wire's force-extension graph to the Young modulus.
