---
title: 4.7 Newton's laws in vector form — Learn
chapter: 4
chapter_title: Forces and Newton's laws
section: '4.7'
section_title: Newton's laws in vector form
tier: H
refs:
- S3
kind: walkthrough
---

# 4.7 Newton's laws in vector form — Learn

**Prerequisites:** Sections 4.1 to 4.3, and the idea of a vector from an earlier
course.

**Objectives:** write a force using $\mathbf{i}$ and $\mathbf{j}$; add and
subtract forces as vectors; use the equilibrium condition in vector form; use
$F = ma$ component by component.

A force has a size and a direction, so it is a vector. Writing forces as vectors
handles the two dimensions at once, and it makes Newton's second law into two
equations that you can solve separately.

## Unit vectors

The unit vector $\mathbf{i}$ points one unit along the positive $x$-axis. The
unit vector $\mathbf{j}$ points one unit along the positive $y$-axis. Any
two-dimensional vector can be written as a combination of them.

$$\mathbf{F} = F_x\mathbf{i} + F_y\mathbf{j}$$

Here $F_x$ is the component along the $x$-axis, and $F_y$ is the component along
the $y$-axis. The same vector can be written as a column:

$$\mathbf{F} = \begin{pmatrix} F_x \\ F_y \end{pmatrix}$$

## Adding and subtracting vectors

To add two vectors, add their matching components. To subtract, subtract the
matching components.

$$(a\mathbf{i} + b\mathbf{j}) + (c\mathbf{i} + d\mathbf{j}) =
(a + c)\mathbf{i} + (b + d)\mathbf{j}$$

**Example 1.** Two forces act on a particle:
$\mathbf{F}_1 = (3\mathbf{i} + 4\mathbf{j})$ N and
$\mathbf{F}_2 = (2\mathbf{i} - \mathbf{j})$ N. Find the resultant.

Add the $\mathbf{i}$ components and the $\mathbf{j}$ components:

$$\mathbf{R} = (3 + 2)\mathbf{i} + (4 - 1)\mathbf{j}$$

$$\mathbf{R} = 5\mathbf{i} + 3\mathbf{j}$$

The resultant is $5\mathbf{i} + 3\mathbf{j}$ N.

## Equilibrium in vector form

A particle is in equilibrium when the resultant force is the zero vector:

$$F_x = 0 \quad\text{and}\quad F_y = 0$$

Both components must be zero. If the two components were not both zero, the
resultant would point somewhere and the particle would accelerate.

**Example 2.** Two forces act on a particle:
$(4\mathbf{i} + 3\mathbf{j})$ N and $(-1\mathbf{i} + 2\mathbf{j})$ N. Find the
third force that keeps the particle in equilibrium.

First find the resultant of the two given forces:

$$\mathbf{R} = (4 - 1)\mathbf{i} + (3 + 2)\mathbf{j} = 3\mathbf{i} + 5\mathbf{j}$$

For equilibrium the third force must be the negative of the resultant:

$$\mathbf{F}_3 = -(3\mathbf{i} + 5\mathbf{j}) = -3\mathbf{i} - 5\mathbf{j}$$

The third force is $(-3\mathbf{i} - 5\mathbf{j})$ N.

## Newton's second law in vector form

Newton's second law works for vectors as it stands:

$$\mathbf{F} = m\mathbf{a}$$

Because vectors are equal only when every component is equal, this single
equation is really two equations:

$$F_x = m a_x \qquad F_y = m a_y$$

The two directions do not mix. You can find the acceleration in the $x$
direction from the forces in the $x$ direction alone, and then do the same for
$y$.

**Example 3.** A force of $(6\mathbf{i} + 9\mathbf{j})$ N acts on a particle of
mass $3$ kg. Find the acceleration.

Divide each component of the force by the mass:

$$\mathbf{a} = \frac{1}{3}(6\mathbf{i} + 9\mathbf{j})$$

$$\mathbf{a} = 2\mathbf{i} + 3\mathbf{j}$$

The acceleration is $(2\mathbf{i} + 3\mathbf{j})$ m/s². Check each component:
$3 \times 2 = 6$ and $3 \times 3 = 9$, which match the force.

## Resolving a force into components

A force of size $F$ at an angle $\theta$ to the positive $x$-axis has components

$$F_x = F\cos\theta \qquad F_y = F\sin\theta$$

This is the same resolution as Section 4.2, written in vector form.

**Example 4.** A force of $10$ N acts at $30^\circ$ above the positive
$x$-axis. Write it in $\mathbf{i}$, $\mathbf{j}$ form, to three significant
figures.

$$F_x = 10\cos 30^\circ = 8.66\,\text{N}$$

$$F_y = 10\sin 30^\circ = 5\,\text{N}$$

So $\mathbf{F} = 8.66\mathbf{i} + 5\mathbf{j}$ N. Check the size:
$\sqrt{8.66^2 + 5^2} = 10$ N, to the accuracy of the data.

> **Watch out.** A vector equation is not a scalar equation. You cannot add the
> components of a force to get its size, and you cannot divide a force vector by
> a mass without dividing **both** components. A common error is to write
> $F = ma$ with $F$ the size of the force and $a$ a vector. Keep the components
> apart: do the $\mathbf{i}$ arithmetic and the $\mathbf{j}$ arithmetic in
> separate lines, and combine them at the end.

## Progress check

Back to the chapter problem. Take the ramp surface as the $x$-axis, pointing up
the ramp. Then:

- the tension on the crate is $T\mathbf{i}$, where $T = 126$ N;
- the component of the crate's weight is $-98\mathbf{i}$ N, because it points
  down the ramp;
- the resultant is $(126 - 98)\mathbf{i} = 28\mathbf{i}$ N.

The crate's mass is 20 kg, so $F_x = m a_x$ gives

$$28 = 20a_x$$

$$a_x = 1.4\,\text{m/s}^2$$

which matches the scalar answer from Section 4.6. The vector form adds nothing
new to this one-dimensional problem, but it is the language you need when the
forces point in two directions at once.

## You should now be able to

- write a force using $\mathbf{i}$ and $\mathbf{j}$, and as a column vector;
- add and subtract forces by adding and subtracting their components;
- state the equilibrium condition in vector form, and find a missing force;
- use $F = ma$ component by component to find an acceleration vector;
- resolve a force at an angle into its $\mathbf{i}$ and $\mathbf{j}$ components.
