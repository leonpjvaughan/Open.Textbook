---
title: 16.3 Similar triangles — Learn
chapter: 16
chapter_title: 'Synthetic geometry: quadrilaterals, similarity and area'
section: '16.3'
section_title: Similar triangles
tier: O
refs:
- '2.1'
kind: walkthrough
---

# 16.3 Similar triangles — Learn

**Prerequisites:** Sections 16.1 and 16.2 — parallelograms and their converses. The area
of a triangle from Chapter 3.

**Objectives:** say what makes two triangles similar; use the AA rule; find a missing side
from the ratio of the corresponding sides.

By the end of this section you can find the height of a tree from its shadow, and the
width of a river from two similar triangles on the bank.

## The same shape at a different size

Two triangles are **similar** when the three angles of one are equal to the three angles
of the other. The two triangles have the same shape. One is a scaled copy of the other.

We write
$$\triangle ABC \sim \triangle A'B'C'.$$

The order of the letters carries meaning, just as it does for congruence. The vertex $A$
matches $A'$, the vertex $B$ matches $B'$, and the vertex $C$ matches $C'$.

In similar triangles, the matching sides are called **corresponding sides**. The ratio of a
side of the second triangle to the matching side of the first is the **scale factor**.

## The AA rule

To prove two triangles similar from the definition, you would check all three angles. The
third angle is free.

> **The AA rule.** If two angles of one triangle are equal to two angles of another, then
> the two triangles are similar.

**Proof.** Let the two given angles of the first triangle be $A$ and $B$, and let the two
matching angles of the second be $A'$ and $B'$, with $|\angle A| = |\angle A'|$ and
$|\angle B| = |\angle B'|$.

The angles of a triangle add to $180^\circ$, by Theorem 4. So
$$|\angle C| = 180^\circ - |\angle A| - |\angle B| = 180^\circ - |\angle A'| - |\angle B'| = |\angle C'|.$$

The third angles are equal as well. All three angles of one triangle equal the three
angles of the other, so the triangles are similar. $\blacksquare$

Two right-angled triangles are similar when they share one more angle. The right angles
are equal, and the common angle is the second pair.

## Corresponding sides are proportional

> **Similar triangles have proportional sides.** In similar triangles, the corresponding
> sides are in the same ratio:
> $$\frac{|AB|}{|A'B'|} = \frac{|BC|}{|B'C'|} = \frac{|CA|}{|C'A'|}.$$

### Why the rule is true

Draw the smaller triangle inside the larger one, so that the equal angles at $A$ and
$A'$ sit on top of each other and the sides $A'B'$ and $A'C'$ lie along $AB$ and $AC$.
Then the third side $B'C'$ is parallel to $BC$, because the corresponding angles at $B$
and $B'$ are equal.

So the problem becomes this. In a triangle $ABC$, a line $DE$ parallel to $BC$ cuts
$AB$ at $D$ and $AC$ at $E$. We show that the two sides are cut in the same ratio.

The two triangles $BDE$ and $CDE$ have the same base $DE$. They also have the same
height, because $DE \parallel BC$, so the two apexes $B$ and $C$ are the same distance
from the line $DE$. Two triangles with the same base and the same height have equal
areas, so
$$\text{area of } \triangle BDE = \text{area of } \triangle CDE.$$

The triangles $ADE$ and $BDE$ have the same height from $E$ to the line $AB$. Their areas
are in the ratio of their bases, so
$$\frac{\text{area of } \triangle ADE}{\text{area of } \triangle BDE} = \frac{|AD|}{|DB|}.$$

In the same way, the triangles $ADE$ and $CDE$ have the same height from $D$ to the line
$AC$, so
$$\frac{\text{area of } \triangle ADE}{\text{area of } \triangle CDE} = \frac{|AE|}{|EC|}.$$

The two denominators are equal, so the two fractions are equal:
$$\frac{|AD|}{|DB|} = \frac{|AE|}{|EC|}.$$

This is the ratio rule. The full formal proof, including the ratio for the third pair of
sides, is in Section 16.4.

## Worked examples

**Example 1.** $\triangle ABC \sim \triangle PQR$. Given $|AB| = 6$ cm, $|BC| = 9$ cm and
$|PQ| = 4$ cm, find $|QR|$.

The matching sides are $AB$ with $PQ$, and $BC$ with $QR$. The scale factor from
$\triangle ABC$ to $\triangle PQR$ is
$$\frac{|PQ|}{|AB|} = \frac{4}{6} = \frac{2}{3}.$$

So
$$|QR| = \frac{2}{3} \times 9 = 6 \text{ cm}.$$

**Example 2.** In $\triangle ABC$, the point $D$ is on $AB$ and the point $E$ is on $AC$,
with $DE \parallel BC$. Given $|AD| = 3$ cm, $|DB| = 2$ cm and $|AE| = 4.5$ cm, find
$|EC|$.

Because $DE \parallel BC$, the two triangles $ADE$ and $ABC$ are similar. The two sides
are cut in the same ratio:
$$\frac{|AD|}{|DB|} = \frac{|AE|}{|EC|}.$$

Substitute the known lengths:
$$\frac{3}{2} = \frac{4.5}{|EC|}.$$

Multiply both sides by $|EC|$ and by $2$:
$$3|EC| = 9, \qquad |EC| = 3 \text{ cm}.$$

**Example 3.** A vertical post $2$ m tall casts a shadow $3$ m long. At the same time a
tree casts a shadow $12$ m long. Find the height of the tree.

The post and its shadow make a right-angled triangle. The tree and its shadow make a
second right-angled triangle. The Sun is at the same angle for both, so the two triangles
share the angle at the top of each shadow. The right angles are equal, so the triangles
are similar by the AA rule.

Let the height of the tree be $h$ metres. The matching sides are the heights and the
shadows:
$$\frac{h}{2} = \frac{12}{3}.$$

$$h = 2 \times \frac{12}{3} = 8 \text{ m}.$$

The tree is $8$ m tall.

**Example 4.** $\triangle ABC \sim \triangle A'B'C'$, with $|AB| = 5$ cm and
$|AC| = 7$ cm. Given $|A'B'| = 15$ cm, find $|A'C'|$.

The scale factor is
$$\frac{|A'B'|}{|AB|} = \frac{15}{5} = 3.$$

So
$$|A'C'| = 3 \times 7 = 21 \text{ cm}.$$

**Example 5.** Two similar triangles have corresponding sides of $8$ cm and $12$ cm. A
second side of the smaller triangle is $10$ cm. Find the matching side of the larger
triangle.

The scale factor is $\frac{12}{8} = 1.5$. So the matching side is
$$1.5 \times 10 = 15 \text{ cm}.$$

> **Watch out.** The ratio must pair each side with its **corresponding** side. A student
> who writes $\frac{|AB|}{|A'C'|} = \frac{|BC|}{|B'C'|}$ has paired $AB$ with the wrong
> side of the second triangle, and the answer will be wrong.
>
> **Re-check:** write the matching pairs under the similarity statement before you form
> any ratio: $A \leftrightarrow A'$, $B \leftrightarrow B'$, $C \leftrightarrow C'$. Then
> each ratio pairs the first letter with the first letter.

## Progress check

Back to the chapter problem. The field has a tall tree at one corner. The farmer needs the
height of the tree, and cannot climb it.

1. A post $1.5$ m tall casts a shadow $2$ m long. At the same time the tree casts a
   shadow $10$ m long. Draw the two triangles, and say why they are similar.
2. Write the ratio of the heights equal to the ratio of the shadows.
3. Find the height of the tree.
4. The farmer's map of the field is a scale drawing. The field is $60$ m long on the
   ground and $12$ cm long on the map. Find the scale factor from the map to the ground.

Keep the height of the tree and the scale factor. Section 16.4 uses the scale factor
again.

## You should now be able to

- say what it means for two triangles to be similar, and write the statement in matching
  order;
- use the AA rule, and say why the third angle is free;
- find a missing side from the ratio of corresponding sides;
- use the ratio rule for a line parallel to one side of a triangle;
- find the height of a tall object from its shadow;
- find the scale factor of a scale drawing.
