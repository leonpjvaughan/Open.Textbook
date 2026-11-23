---
title: 'Chapter 18: Review'
chapter: 18
kind: review
---

# Chapter 18: Review

## The chapter problem, solved

**The drone's three legs.** The drone leaves the depot at $O$ with displacement
$\mathbf{a} = \begin{pmatrix} 6 \\ 2 \end{pmatrix}$ km, then flies
$\mathbf{b} = \begin{pmatrix} -2 \\ 6 \end{pmatrix}$ km, and returns straight to the depot.

**Where it is after two legs.** Add the legs:

$$\mathbf{a} + \mathbf{b} = \begin{pmatrix} 6 - 2 \\ 2 + 6 \end{pmatrix} = \begin{pmatrix} 4 \\ 8 \end{pmatrix} \text{ km}$$

**The return leg.** The return is the opposite of that displacement:

$$-\begin{pmatrix} 4 \\ 8 \end{pmatrix} = \begin{pmatrix} -4 \\ -8 \end{pmatrix} \text{ km}$$

Its length is $\sqrt{4^2 + 8^2} = \sqrt{80} = 4\sqrt{5}$ km, which is about $8.94$ km.

**The two outbound legs.** Their lengths are

$$|\mathbf{a}| = \sqrt{6^2 + 2^2} = \sqrt{40} = 2\sqrt{10} \qquad |\mathbf{b}| = \sqrt{(-2)^2 + 6^2} = \sqrt{40} = 2\sqrt{10}$$

The two lengths are equal, so the route is isosceles.

**The right angle.** The dot product of the two legs is

$$\mathbf{a} \cdot \mathbf{b} = 6 \times (-2) + 2 \times 6 = -12 + 12 = 0$$

The dot product is zero, so the two legs meet at a right angle. The route is a
**right-angled isosceles triangle**.

**The angle at the depot.** The displacement from the depot is
$\mathbf{a} + \mathbf{b} = \begin{pmatrix} 4 \\ 8 \end{pmatrix}$. The angle between
$\mathbf{a}$ and $\mathbf{a} + \mathbf{b}$ is found from

$$\cos\theta = \frac{\mathbf{a} \cdot (\mathbf{a} + \mathbf{b})}{|\mathbf{a}||\mathbf{a} + \mathbf{b}|} = \frac{24 + 16}{2\sqrt{10} \times 4\sqrt{5}} = \frac{40}{40\sqrt{2}} = \frac{1}{\sqrt{2}}$$

So $\theta = 45^\circ$. This is the angle you expected at the depot of an isosceles right
triangle.

<!-- tier:h -->

**The area.** The two sides meeting at the right angle both have length $2\sqrt{10}$, so

$$\text{Area} = \frac{1}{2} \times 2\sqrt{10} \times 2\sqrt{10} = \frac{1}{2} \times 40 = 20 \text{ km}^2$$

<!-- /tier:h -->

**The total distance flown.** Add the three legs:

$$2\sqrt{10} + 2\sqrt{10} + 4\sqrt{5} = 4\sqrt{10} + 4\sqrt{5} \approx 12.65 + 8.94 = 21.59 \text{ km}$$

**The check.** The return leg of a right isosceles triangle is $\sqrt{2}$ times each
shorter leg: $2\sqrt{10} \times \sqrt{2} = 2\sqrt{20} = 4\sqrt{5}$. That matches the
return leg found above.

## Mixed practice — choose the method first

Work through these without notes. For each one, decide **what is being asked** and say why,
before you calculate. Some questions want a length, some want an angle, and some want a
proof. Two of them can be answered with a dot product or with an older method, and
comparing the two routes is the point.

:::problems chapter-18-review

:::answers chapter-18-review

## What you can now do

- describe a vector and write it as a column, or with $\mathbf{i}$, $\mathbf{j}$ and
  $\mathbf{k}$;
- find the length of a vector and the unit vector in its direction;
- add, subtract and scale vectors, and find a resultant;
- work out a dot product and use its properties;
- test two vectors for perpendicularity and find the angle between them;
- prove that a triangle has a right angle with vectors.

<!-- tier:h -->

- carry every one of these ideas into three dimensions;
- prove a parallelogram, and a collinear set of points, with vectors;
- find the area of a right-angled triangle from its two shorter sides.

<!-- /tier:h -->

## Thinking back

Look at the journey or the force you chose at the start of the chapter. You wrote down
what its two parts are and what combining two of them would mean.

You can now make that precise. If the quantity is a displacement or a force, write it as a
vector with two components and combine two of them by adding. To measure how far, take the
length. To measure the angle between two directions, use the dot product. To decide whether
two directions meet at a right angle, check whether the dot product is zero.

If the quantity you chose does not behave this way, that is worth writing down too. Some
two-part quantities combine with a different rule, and saying why a model does not fit is
part of the mathematics. The vectors in this chapter are the ones that add like
displacements, and that is exactly why they describe so many physical quantities.
