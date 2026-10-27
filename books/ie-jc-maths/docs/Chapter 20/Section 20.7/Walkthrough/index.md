---
title: 20.7 Similar triangles and proportionality — Learn
chapter: 20
chapter_title: Synthetic geometry, constructions and proof
section: '20.7'
section_title: Similar triangles and proportionality
tier: O
refs:
- GT.3
kind: walkthrough
---

# 20.7 Similar triangles and proportionality — Learn

**Prerequisites:** the triangle angle sum from Section 20.3, the area of a
triangle from Chapter 16, and ratio from Chapter 6.

**Objectives:** decide when two triangles are similar; find a missing side using
the scale factor or a ratio; prove that the sides of similar triangles are
proportional; use the area ratio.

By the end of this section you can tell similar triangles from congruent ones, and
you can find a missing side from a ratio.

## Similar means the same shape

Two triangles are **similar** when one is an enlargement of the other. Their three
angles are equal, and their matching sides are in the same ratio. The triangles
have the same shape, but they may have different sizes.

Congruent triangles are a special case of similar triangles, with a scale factor
of 1.

The **scale factor** is the number you multiply each side of the first triangle by
to get the matching side of the second. If a side of 4 cm matches a side of 12 cm,
the scale factor is $12\div4=3$.

## Two equal angles are enough

You do not need all six parts to know two triangles are similar. Two angles are
enough.

**Theorem.** If two angles of one triangle equal two angles of another, the
triangles are similar.

Why? The angles of a triangle add to 180°. Subtract the two equal angles from
180° in each triangle, and the two third angles are equal. So all three angles
match. That is the test, and it is called the **AA test**.

**Example 1.** Triangle $P$ has angles 40°, 60° and 80°. Triangle $Q$ has angles
40°, 70° and 70°. Work out whether the triangles are similar.

Both angle sums are 180°, so both are valid triangles. But the angle sets are
different: 40°, 60°, 80° against 40°, 70°, 70°. The triangles are **not** similar.
Similar triangles need all three angles to match.

## A line parallel to one side

Here is the result that makes the ratios work.

**Theorem.** In a triangle $ABC$, a line parallel to $BC$ cuts $AB$ and $AC$ in
the same ratio.

**Proof.** Let the line meet $AB$ at $D$ and $AC$ at $E$, with $DE$ parallel to
$BC$.

Triangles $BDE$ and $CDE$ have the same base $DE$. Because $DE$ is parallel to
$BC$, they have the same height, so their areas are equal.

Now compare triangle $ADE$ with triangle $BDE$. They have the same height from
$E$ to the line $AB$, so the ratio of their areas is the ratio of their bases:

$$\frac{\text{area of }ADE}{\text{area of }BDE}=\frac{|AD|}{|DB|}$$

In the same way, triangles $ADE$ and $CDE$ have the same height from $D$ to the
line $AC$, so

$$\frac{\text{area of }ADE}{\text{area of }CDE}=\frac{|AE|}{|EC|}$$

The two equal areas are $BDE$ and $CDE$, so the two ratios are equal:

$$\frac{|AD|}{|DB|}=\frac{|AE|}{|EC|}$$

The parallel line cuts the two sides in the same ratio.

**Example 2.** In triangle $ABC$, a line parallel to $BC$ cuts $AB$ at $D$ and
$AC$ at $E$. If $|AD|=4$ cm, $|DB|=6$ cm and $|AE|=6$ cm, find $|EC|$.

$$\frac{4}{6}=\frac{6}{|EC|}$$

Cross-multiply: $4\times|EC|=36$, so $|EC|=9$ cm.

## The sides of similar triangles are proportional

**Theorem.** If two triangles are similar, their matching sides are in the same
ratio, in order.

**Proof.** Place the smaller triangle on the larger one so that one corner and one
side match. The matching angles are equal, so the third side of the small triangle
is parallel to the matching side of the large one.

By the result above, the parallel line cuts the other two sides in the same ratio.
So every pair of matching sides is in the same ratio. The sides are proportional
in order.

**Example 3.** Two triangles are similar. In the small triangle a side is 3 cm and
the matching side in the large triangle is 9 cm. Another side of the small
triangle is 4 cm. Find the matching side in the large triangle.

The scale factor is $9\div3=3$, so the matching side is $4\times3=12$ cm.

**Example 4.** Two similar triangles have matching sides in the ratio $2:3$. A
side of the small triangle is 8 cm. Find the matching side of the large one.

The scale factor is $\dfrac{3}{2}=1.5$, so the side is $8\times1.5=12$ cm.

## Areas and the scale factor

When two shapes are similar with scale factor $k$, every length is multiplied by
$k$. An area is a length times a length, so every area is multiplied by
$k\times k=k^2$.

**Example 5.** Two triangles are similar with scale factor 3. The area of the
small triangle is 5 cm². Work out the area of the large one.

$$5\times3^2=5\times9=45$$

The area of the large triangle is **45 cm²**.

**Example 6.** A vertical stick 1.5 m tall casts a shadow 2 m long. At the same
time a tree casts a shadow 8 m long. Find the height $h$ of the tree.

The two triangles are similar, so

$$\frac{1.5}{2}=\frac{h}{8}$$

Then $h=8\times1.5\div2=6$ m. The tree is 6 m tall.

> **Watch out.** Match the sides in the right order. If $|AB|$ matches $|DE|$,
> then $|BC|$ matches $|EF|$, not $|FD|$. Write the ratio with the small triangle
> on top in both fractions, and keep the matching sides in the same position.
> Remember also that areas scale by $k^2$, not by $k$.

## Progress check

Back to the chapter problem. The triangle angle sum proves that two equal angles
are enough for similarity. That is why a stick and its shadow give the height of
a tree.

Write down the two triangles in the shadow example, and say which two angles are
equal in them. Then say what makes the third pair equal. Keep your answer for the
Review.

## You should now be able to

- say what similar means, and tell similar from congruent;
- use the AA test, and explain why two equal angles are enough;
- find a missing side from a scale factor or a ratio;
- prove that a parallel line cuts two sides in the same ratio;
- use the area ratio for similar triangles.
