---
title: 14.5 Transformations and symmetry in the plane — Learn
chapter: 14
chapter_title: Transformation geometry
section: '14.5'
section_title: Transformations and symmetry in the plane
tier: O
refs:
- '2.4'
kind: walkthrough
---

# 14.5 Transformations and symmetry in the plane — Learn

**Prerequisites:** all of Sections 14.1 to 14.4.

**Objectives:** say what each transformation preserves; decide whether two shapes are
congruent or only similar; find the axes of symmetry and the order of rotational symmetry
of a shape.

By the end of this section you can look at two shapes and say exactly how they are
related, and you can describe the symmetry of a shape completely.

## What each transformation preserves

A transformation takes an object to an image. The transformations differ in what they do
to the object, so the first question to ask is what stays the same.

An **isometry** is a transformation that preserves every distance. Translation,
reflection and rotation are all isometries. An enlargement is not, unless the scale
factor is $1$ or $-1$.

| Transformation | Lengths | Angles | Area | Orientation |
|---|---|---|---|---|
| Translation | unchanged | unchanged | unchanged | unchanged |
| Reflection | unchanged | unchanged | unchanged | reversed |
| Rotation | unchanged | unchanged | unchanged | unchanged |
| Enlargement, factor $k$ | multiplied by $k$ | unchanged | multiplied by $k^2$ | unchanged |

Read the table as a set of promises. A reflection keeps every length and every angle, so
it can only turn a shape over. An enlargement keeps every angle but changes every length
by the same factor, so it can only change the size.

## Congruent and similar

Two shapes are **congruent** when one can be moved onto the other by a sequence of
isometries. Congruent shapes have exactly the same size and shape. Their matching lengths
are equal and their matching angles are equal.

Two shapes are **similar** when one is an enlargement of the other. Similar shapes have
the same shape but not the same size. Their matching angles are equal and their matching
lengths are in a fixed ratio, which is the scale factor.

So a translation, a reflection or a rotation produces a **congruent** image. An
enlargement with $k \neq 1$ produces a **similar** image that is not congruent to the
object.

**Example 1.** A triangle has sides $3$, $4$ and $5$ cm. A second triangle has sides
$6$, $8$ and $10$ cm. Are the two triangles congruent, similar, or neither?

Every side of the second triangle is twice the matching side of the first, and the ratio
is the same for all three sides.

$$\frac{6}{3} = \frac{8}{4} = \frac{10}{5} = 2$$

So the second triangle is an enlargement of the first with scale factor $2$. The triangles
are **similar** but not congruent.

## Symmetry of a shape

A shape's symmetry is what you can do to it and leave it looking unchanged.

- An **axis of symmetry** is a line such that reflecting the shape in that line maps it
  onto itself.
- The **order of rotational symmetry** is the number of positions in a full turn that
  look the same. It is $360^\circ$ divided by the smallest fitting turn.

**Example 2.** Describe the symmetry of a square.

A square has four axes of symmetry: two through the midpoints of opposite sides, and two
along the diagonals. It fits onto itself after a quarter-turn, so its order of rotational
symmetry is $4$.

**Example 3.** Describe the symmetry of a parallelogram that is not a rectangle.

A parallelogram has no axis of symmetry. It fits onto itself after a half-turn, so its
order of rotational symmetry is $2$. Turning it a quarter-turn does not fit.

## The symmetry of the common shapes

| Shape | Axes of symmetry | Order of rotational symmetry |
|---|---|---|
| Equilateral triangle | 3 | 3 |
| Square | 4 | 4 |
| Rectangle | 2 | 2 |
| Rhombus | 2 | 2 |
| Parallelogram (not a rectangle) | 0 | 2 |
| Regular hexagon | 6 | 6 |
| Isosceles triangle | 1 | 1 |
| Circle | infinitely many | infinitely many |

A regular polygon with $n$ sides has $n$ axes of symmetry and rotational symmetry of
order $n$. That single rule covers the equilateral triangle, the square and the regular
hexagon in the table.

> **Watch out.** A shape can have rotational symmetry and no axis of symmetry. A
> parallelogram that is not a rectangle is the standard example: a half-turn fits, but no
> reflection does. The reverse is also possible: an isosceles triangle has one axis of
> symmetry and no rotational symmetry at all, because no turn smaller than a full circle
> fits.
>
> **Re-check:** count the two properties separately. Do not assume that a shape with one
> has the other.

## Progress check

Back to the chapter problem. You now have the four border copies and the enlarged centre
copy of the tile. The tile has corners $A(1,1)$, $B(4,1)$ and $C(1,3)$.

Sort the five copies into two groups:

- the copies that are **congruent** to the original tile;
- the copies that are **similar** to the original tile but not congruent.

The translated copy, the reflected copy and the half-turn copy all come from isometries,
so they belong in the first group. The enlarged copy has scale factor $3$, so it belongs
in the second group. Write one sentence for each copy to say which transformation made
it and why that puts it in its group.

## You should now be able to

- say which of length, angle, area and orientation each transformation preserves;
- decide whether two shapes are congruent, similar, or neither;
- find the axes of symmetry of a shape;
- find the order of rotational symmetry of a shape;
- use the rule that a regular polygon with $n$ sides has $n$ axes and order $n$.
