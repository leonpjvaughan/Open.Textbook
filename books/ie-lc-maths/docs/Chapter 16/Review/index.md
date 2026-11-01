---
title: 'Chapter 16: Review'
chapter: 16
kind: review
---

# Chapter 16: Review

## The chapter problem, solved

**The new field.** The field is a rectangle $ABCD$ with $|AB| = 60$ m, $|BC| = 25$ m, and
a right angle at $B$. The farmer needed the diagonal, the area, and the position of the
gate.

### The shape of the field

Both pairs of opposite sides are parallel, so the field is a parallelogram by definition.
It has a right angle at $B$, and every rectangle is a parallelogram by Proposition 3.

Theorem 9 gives the opposite sides and the opposite angles:

- $|DC| = |AB| = 60$ m and $|AD| = |BC| = 25$ m;
- $|\angle D| = |\angle B| = 90^\circ$ and $|\angle C| = |\angle A| = 90^\circ$.

The prediction you made at the start is confirmed here. A parallelogram with one right
angle is a rectangle, because the consecutive angles are supplementary and the opposite
angles are equal.

### The diagonal

The triangle $ABC$ has a right angle at $B$, so Pythagoras' theorem applies:

$$|AC|^2 = 60^2 + 25^2 = 3600 + 625 = 4225.$$

$$|AC| = \sqrt{4225} = 65 \text{ m}.$$

The diagonal fence is $65$ m long. This is the first prediction, and the theorem behind it
was proved in Section 16.5 from similar triangles.

### The area

The field is a rectangle, so its area is length times width:

$$60 \times 25 = 1500 \text{ m}^2.$$

This is the second prediction. The area of a rectangle rests on the area of a triangle,
which rests on Theorem 16, that base times height does not depend on the base chosen.

### The gate and the dividing fence

The gate is $24$ m along $AB$, so $|AG| = 24$ m and $|GB| = 36$ m. The dividing fence from
the gate is parallel to $BC$.

By Theorem 12, it cuts the opposite side $DC$ in the same ratio:

$$|DH| : |HC| = 24 : 36 = 2 : 3.$$

So $|DH| = 24$ m and $|HC| = 36$ m. The fence is parallel to $BC$, and the two parallel
sides $BC$ and $GH$ are equal by Theorem 9, so $|GH| = 25$ m.

The two parts are rectangles:

$$24 \times 25 = 600 \text{ m}^2, \qquad 36 \times 25 = 900 \text{ m}^2.$$

The ratio of the two areas is

$$\frac{600}{900} = \frac{2}{3},$$

which is the same as the ratio of the two parts of the side. That is the check the chapter
problem asked for.

### What each proof rests on

This is the sentence the chapter has been building towards.

- **Theorem 9**, the opposite sides and angles of a parallelogram, rests on the alternate
  angles theorem and the ASA congruence test.
- **Theorem 10**, the diagonals of a parallelogram, rests on Theorem 9 and ASA.
- **Theorem 13**, the proportional sides of similar triangles, rests on Theorem 12, which
  rests on Theorem 11, the equal intercepts theorem.
- **Theorem 14**, Pythagoras, rests on similar triangles and the proportionality of their
  sides.
- **Theorem 18**, the area of a parallelogram, rests on the congruent triangles made by a
  diagonal.

The chain reaches back through Chapter 15 to the axioms. Every link is an accepted
statement or a proof.

## Mixed practice — choose the method first

Work through these without notes. For each one, say **which fact or theorem** you will
use, and why, before you calculate. Some need a parallelogram fact, some a ratio, some
Pythagoras, some an area formula, and some come from an earlier chapter.

1. In a parallelogram $ABCD$, $|\angle A| = 72^\circ$. Find $|\angle C|$ and
   $|\angle B|$.
2. The diagonals of a parallelogram meet at $E$, with $|AE| = 7$ cm. Find $|AC|$.
3. $\triangle ABC \sim \triangle PQR$, with $|AB| = 6$ cm, $|BC| = 8$ cm and
   $|PQ| = 9$ cm. Find $|QR|$.
4. In $\triangle ABC$, a line parallel to $BC$ cuts $[AB]$ at $D$ with
   $|AD| : |DB| = 4 : 5$. Given $|AC| = 18$ cm, find $|AE|$.
5. A right-angled triangle has legs of $8$ cm and $15$ cm. Find the hypotenuse.
6. A triangle has sides of $9$ cm, $12$ cm and $15$ cm. Is it right-angled? Give a
   reason.
7. A triangle has base $14$ cm and height $9$ cm. Find its area.
8. A trapezium has parallel sides of $6$ m and $10$ m, and the distance between them is
   $4$ m. Find its area.
9. From Chapter 12: a triangle has sides of $7$ cm and $9$ cm, and the angle between them
   is $30^\circ$. Find its area.
10. From Chapter 13: find the distance between $(2,3)$ and $(5,7)$.
11. From Chapter 14: a triangle has sides of $3$, $4$ and $5$ cm. It is enlarged by a
    scale factor of $2$. Find the sides of the image, and say whether the image is
    similar to the original.
12. From Chapter 3: a circle has radius $5$ cm. Find its area, leaving your answer in
    terms of $\pi$.

<details markdown="1">
<summary>Answers and reasons</summary>

1. $|\angle C| = 72^\circ$ and $|\angle B| = 108^\circ$. Opposite angles are equal, and
   consecutive angles are supplementary.
2. $|AC| = 14$ cm. The diagonals bisect one another, so $|AE| = |EC| = 7$ cm.
3. $|QR| = 12$ cm. The scale factor is $\frac{9}{6} = 1.5$, and $BC$ matches $QR$.
4. $|AE| = 8$ cm. The line cuts $[AC]$ in the same ratio $4 : 5$, and there are $9$ parts
   in $18$ cm.
5. $\sqrt{8^2 + 15^2} = \sqrt{289} = 17$ cm.
6. Yes. $9^2 + 12^2 = 81 + 144 = 225 = 15^2$, so the converse of Pythagoras gives a right
   angle opposite the $15$ cm side.
7. $\frac{1}{2} \times 14 \times 9 = 63$ cm$^2$.
8. $\frac{6 + 10}{2} \times 4 = 32$ m$^2$.
9. $\frac{1}{2} \times 7 \times 9 \times \sin 30^\circ = 31.5 \times 0.5 = 15.75$ cm$^2$.
10. $\sqrt{(5 - 2)^2 + (7 - 3)^2} = \sqrt{9 + 16} = 5$ units.
11. The sides are $6$, $8$ and $10$ cm. The image is similar, because an enlargement keeps
    every angle and multiplies every length by the same factor.
12. $25\pi$ cm$^2$. The area of a circle is $\pi r^2$.

</details>

## What you can now do

- name the quadrilaterals, and say what makes a parallelogram, a rectangle, a rhombus and
  a square;
- prove that the opposite sides and opposite angles of a parallelogram are equal;
- use the converses, and decide from the sides, the angles or the diagonals whether a
  quadrilateral is a parallelogram;
- prove that the diagonals of a parallelogram bisect one another, and that the diagonals
  of a rhombus are perpendicular;
- recognise similar triangles, and find a missing side from the ratio of the sides;
- divide a segment in a given ratio, and use a line parallel to one side of a triangle;
- prove Pythagoras' theorem and its converse, and use the RHS test;
- find the area of a rectangle, a parallelogram, a triangle and a trapezium;
- carry out constructions 7 to 15 with a straight edge and compass.

## Thinking back

Return to the check you wrote at the start of the chapter. You chose a way that a builder,
a tiler or a gardener checks a shape without measuring the whole of it.

You can now prove why the check works. Find yours in the list below.

- If it is **the $3$, $4$, $5$ triangle**, the check is the converse of Pythagoras'
  theorem. The square of the longest side equals the sum of the other two squares exactly
  when the angle opposite is a right angle.
- If it is **comparing the diagonals of a rectangle**, the check rests on Theorem 10 and
  Theorem 9. The diagonals of a parallelogram bisect one another, and the two triangles
  they make are congruent, so the diagonals of a rectangle are equal.
- If it is **checking that opposite sides of a bed are equal and parallel**, the check is
  Proposition 4, which makes the shape a parallelogram.
- If it is **checking that two opposite angles are equal**, the check is Converse 1 of
  Theorem 9.

Write the sentence in the same shape as the one above the mixed practice: the check, then
what it rests on. That sentence is what this chapter was for. Every result in the course
rests on a chain of earlier results, and you can now trace the chain for the shapes you
meet on site and on the page.
