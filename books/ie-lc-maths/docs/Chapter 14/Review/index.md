---
title: 'Chapter 14: Review'
chapter: 14
kind: review
---

# Chapter 14: Review

## The chapter problem, solved

**The tiled floor.** The tile has corners $A(1,1)$, $B(4,1)$ and $C(1,3)$.

**The original tile.** Its base $AB$ is 3 units long and its height is 2 units, so its
area is

$$\frac{1}{2} \times 3 \times 2 = 3 \text{ square units}.$$

**The translated copy.** Add $\binom{5}{0}$ to each corner:

$$(6,1), \quad (9,1), \quad (6,3).$$

**The reflected copy.** Change the sign of each $x$-coordinate:

$$(-1,1), \quad (-4,1), \quad (-1,3).$$

**The central symmetry copy.** Apply the half-turn $(x,y) \to (-x,-y)$:

$$(-1,-1), \quad (-4,-1), \quad (-1,-3).$$

**The rotated copy.** Apply the quarter-turn anticlockwise $(x,y) \to (-y,x)$:

$$(-1,1), \quad (-1,4), \quad (-3,1).$$

**The enlarged copy.** Multiply each corner by 3:

$$(3,3), \quad (12,3), \quad (3,9).$$

Its area is $3^2 \times 3 = 27$ square units. Since $27 \div 3 = 9$, exactly **nine**
original tiles fit inside the enlarged one. The sides are three times as long, so the
area is nine times as large.

**Which copies are congruent.** The translated, reflected, central symmetry and rotated
copies all come from isometries, so each is congruent to the original tile. The enlarged
copy is similar to the original but not congruent, because its sides are three times as
long.

**The check on the prediction.** At the start of the chapter you predicted how many tiles
would cover the enlarged one. If you wrote 9, your picture of area as two-dimensional was
already right. If you wrote 3, the working above shows where the extra factor of 3 came
from: the area scales by $k^2$, not by $k$.

## Mixed practice — choose the method first

Work through these without notes. For each one, say which transformation is involved and
why, before you calculate. Two of them need two transformations in order.

1. Translate the point $(3,-2)$ by the vector $\binom{-4}{5}$.
2. Reflect the point $(5,-1)$ in the $x$-axis.
3. Reflect the point $(2,7)$ in the line $y = x$.
4. Rotate the point $(-3,2)$ by $90^\circ$ anticlockwise about the origin.
5. Rotate the point $(4,-1)$ by $180^\circ$ about the origin.
6. Enlarge the point $(3,5)$ by scale factor $2$ about the origin.
7. A shape has area $7$ cm². It is enlarged by scale factor $4$. Find the area of the
   image.
8. Find the order of rotational symmetry of a regular decagon.
9. A single transformation takes $(2,3)$ to $(-2,-3)$. Name it.
10. Translate the point $(1,3)$ by $\binom{2}{-1}$, then reflect the image in the
    $y$-axis. Give the final image.

<details markdown="1">
<summary>Answers and reasons</summary>

1. $(-1,3)$: add $-4$ to the $x$-coordinate and 5 to the $y$-coordinate.
2. $(5,1)$: the $x$-coordinate stays and the $y$-coordinate changes sign.
3. $(7,2)$: reflection in $y = x$ swaps the two coordinates.
4. $(-2,-3)$: the quarter-turn anticlockwise rule is $(x,y) \to (-y,x)$.
5. $(-4,1)$: a half-turn changes the sign of both coordinates.
6. $(6,10)$: multiply both coordinates by 2.
7. $7 \times 4^2 = 112$ cm²: the area factor is $k^2$.
8. $360 \div 36 = 10$: a regular decagon has 10 equal sides.
9. A rotation of $180^\circ$ about the origin, which is central symmetry about the
   origin.
10. $(1,3) \to (3,2) \to (-3,2)$: translate first, then reflect.

</details>

## What you can now do

- describe a translation by its vector and find the image of a point or a shape;
- reflect a point in the $x$-axis, the $y$-axis, the line $y = x$ or a line such as
  $x = 3$;
- rotate a point by $90^\circ$ or $180^\circ$ about the origin, and find the image under
  central symmetry about any point;
- enlarge a shape about a centre with a scale factor, and find the effect on the area
  with $k^2$;
- say which of length, angle, area and orientation each transformation preserves;
- decide whether two shapes are congruent, similar, or neither;
- find the axes of symmetry and the order of rotational symmetry of a shape;
- compose two transformations in order, and replace the composition with a single
  transformation where the table allows.

## Thinking back

Look at the pattern you chose at the start of the chapter — a tiled floor, a wallpaper, a
fabric, or a logo.

You can now describe it precisely. Name the transformation that repeats the motif: a
translation, a reflection, a rotation, or an enlargement. If the pattern repeats in more
than one way, name each one and say what it preserves. A wallpaper pattern, for example,
usually repeats by a translation and also has a reflection or a rotation built in.

Write down one transformation of your pattern that leaves it looking unchanged. That
statement is a symmetry of the pattern, and it is the same language a crystallographer or
a designer would use.
