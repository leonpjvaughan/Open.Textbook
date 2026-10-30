---
title: 16.6 Area and the area of a triangle — Learn
chapter: 16
chapter_title: 'Synthetic geometry: quadrilaterals, similarity and area'
section: '16.6'
section_title: Area and the area of a triangle
tier: O
refs:
- '2.1'
kind: walkthrough
---

# 16.6 Area and the area of a triangle — Learn

**Prerequisites:** Sections 16.1 to 16.5 — the parallelogram theorems, similar triangles
and Pythagoras. The area formulae from Chapter 3.

**Objectives:** choose a base and the corresponding height; use the area of a triangle, a
parallelogram, a rectangle and a trapezium; explain why base times height does not depend
on the base chosen.

By the end of this section you can find the area of any straight-sided shape in this
chapter, and you can say why the formulae are correct.

## Base, apex and height

Choose one side of a triangle as the **base**. The opposite vertex is the **apex**
corresponding to that base. The **height** is the length of the perpendicular from the
apex to the line of the base. That perpendicular segment is called an **altitude**.

A triangle has three sides, so it has three choices of base, and three corresponding
heights.

> **Theorem 16.** For a triangle, base times height does not depend on the choice of base.

**Proof.** Let $\triangle ABC$ have the altitude $AD$ from $A$ to $BC$, and the altitude
$BE$ from $B$ to $AC$.

The triangles $BCE$ and $ACD$ are both right-angled. They also share the angle at $C$, so
they are similar by the AA rule:

$$\triangle BCE \sim \triangle ACD.$$

The corresponding sides are proportional:

$$\frac{|AD|}{|BE|} = \frac{|AC|}{|BC|}.$$

Multiply both sides by $|BE| \times |BC|$:

$$|AD| \times |BC| = |BE| \times |AC|.$$

The left-hand side is the base $BC$ times its height $AD$. The right-hand side is the base
$AC$ times its height $BE$. The two products are equal, so the product of base and height
is the same whichever base is chosen. $\blacksquare$

## The area of a triangle

> **Definition.** The **area** of a triangle is half the base by the height:
>
>
> $$\text{area} = \frac{1}{2} \times \text{base} \times \text{height}.$$

Theorem 16 is what makes the definition safe. If the product of base and height did not
depend on the base, the definition would give different answers for the same triangle.

Two more facts about area follow from the definition.

> **Proposition 12.** Congruent triangles have equal areas.

The areas are equal because the corresponding bases and heights are equal.

> **Proposition 13.** If a triangle $ABC$ is cut into two by a line from $A$ to a point
> $D$ on $[BC]$, then
>
>
> $$\text{area of } \triangle ABC = \text{area of } \triangle ABD + \text{area of } \triangle ADC.$$

**Proof.** All three triangles have the same height, the perpendicular distance from $A$
to the line $BC$. Call it $h$. Then

$$\frac{|BC| \times h}{2} = \frac{|BD| \times h}{2} + \frac{|DC| \times h}{2},$$

because $|BC| = |BD| + |DC|$. $\blacksquare$

## The area of a rectangle and a parallelogram

> **Proposition 14.** The area of a rectangle with sides of length $a$ and $b$ is $ab$.

**Proof.** Draw a diagonal. It cuts the rectangle into two congruent triangles, each with
base $a$ and height $b$. Each triangle has area $\frac{1}{2}ab$. The two triangles
together make the rectangle, so its area is

$$2 \times \frac{1}{2}ab = ab. \quad \blacksquare$$

> **Theorem 17.** A diagonal of a parallelogram bisects the area.

**Proof.** A diagonal cuts the parallelogram into two congruent triangles, by Corollary 1
of Section 16.1. Congruent triangles have equal areas, by Proposition 12. So the diagonal
splits the parallelogram into two equal areas. $\blacksquare$

> **Theorem 18.** The area of a parallelogram is the base by the height.

**Proof.** Let the parallelogram be $ABCD$, with base $AB$ and height $h$. Draw the
diagonal $BD$. It splits the parallelogram into the triangles $ABD$ and $CDB$, which have
equal areas by Theorem 17.

The triangle $ABD$ has base $AB$ and height $h$, so its area is $\frac{1}{2} |AB| h$. The
two triangles together have twice that area:

$$\text{area of } ABCD = 2 \times \frac{1}{2} |AB| h = |AB| \times h. \quad \blacksquare$$

## Two more area formulae

The area of a trapezium is the average of the two parallel sides, times the height.

> **Area of a trapezium.** A trapezium has parallel sides of length $a$ and $b$, and the
> perpendicular distance between them is $h$. Its area is
>
>
> $$\frac{a + b}{2} \times h.$$

:::prove trapezium-area

When you know two sides of a triangle and the angle between them, the height is not given.
Trigonometry gives the area directly.

> **Area of a triangle from two sides and the included angle.** The area of a triangle is
>
>
> $$\frac{1}{2}ab \sin C,$$
>
>
> where $a$ and $b$ are two sides and $C$ is the angle between them.

:::prove triangle-area-sinc

## Worked examples

**Example 1.** A triangle has base $10$ cm and height $6$ cm. Find its area.

$$\text{area} = \frac{1}{2} \times 10 \times 6 = 30 \text{ cm}^2.$$

**Example 2.** A parallelogram has base $9$ m and height $4$ m. Find its area.

$$\text{area} = 9 \times 4 = 36 \text{ m}^2.$$

**Example 3.** A trapezium has parallel sides of $8$ cm and $12$ cm, and the distance
between them is $5$ cm. Find its area.

$$\text{area} = \frac{8 + 12}{2} \times 5 = 10 \times 5 = 50 \text{ cm}^2.$$

**Example 4.** A triangle has sides of $8$ cm and $11$ cm, and the angle between them is
$30^\circ$. Find its area.

$$\text{area} = \frac{1}{2} \times 8 \times 11 \times \sin 30^\circ = 44 \times 0.5 = 22 \text{ cm}^2.$$

**Example 5.** A rectangle is $60$ m long and $25$ m wide. Find its area.

$$\text{area} = 60 \times 25 = 1500 \text{ m}^2.$$

This is the field from the chapter problem. The area is $1500$ square metres.

**Example 6.** The field is cut by a fence parallel to the short side, $24$ m from one
end. Find the area of each part.

Each part is a rectangle. The first is $24$ m by $25$ m:

$$24 \times 25 = 600 \text{ m}^2.$$

The second is $36$ m by $25$ m:

$$36 \times 25 = 900 \text{ m}^2.$$

Check: $600 + 900 = 1500$, which is the area of the whole field.

> **Watch out.** The height must be perpendicular to the base. A slanted side of a
> parallelogram is not its height. A student who multiplies the base by a slanted side
> gets an answer that is too large.
>
> **Re-check:** look for the right-angle mark between the base and the height. If there
> is no right angle, the length you are using is not the height.

## Progress check

Back to the chapter problem. This is where the second prediction is checked.

The field is the rectangle $ABCD$ with $|AB| = 60$ m, $|BC| = 25$ m, and a right angle at
$B$.

1. Find the area of the field, using the area of a rectangle.
2. Compare your answer with the area you predicted at the start of the chapter.
3. The gate is $24$ m along $AB$, and the dividing fence is parallel to $BC$. Find the
   area of the part next to $A$, and the area of the part next to $B$.
4. Write the two areas as a ratio in its simplest form, and check that it matches the
   ratio of the two parts of the side $AB$ from Section 16.4.
5. The farmer needs $50$ g of grass seed for each square metre. Find the mass of seed
   needed for the whole field.

Keep the area. The Review uses it.

## You should now be able to

- choose a base and name the corresponding apex and height;
- explain why base times height does not depend on the base chosen;
- find the area of a triangle, a rectangle, a parallelogram and a trapezium;
- find the area of a triangle from two sides and the included angle;
- split a shape into parts and add the areas;
- use the right angle to check that a length really is a height.
