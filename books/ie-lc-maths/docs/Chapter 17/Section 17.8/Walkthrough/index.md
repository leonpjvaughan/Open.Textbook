---
title: 17.8 Enlargements and similar triangles in the circle — Learn
chapter: 17
chapter_title: 'Synthetic geometry: circles'
section: '17.8'
section_title: Enlargements and similar triangles in the circle
tier: H
refs:
- '2.1'
kind: walkthrough
---

# 17.8 Enlargements and similar triangles in the circle — Learn

**Prerequisites:** Section 17.2 — the angles in the same segment; Section 16.3 — similar
triangles; Section 14.4 — enlargements and scale factors.

**Objectives:** find two similar triangles formed by two chords that cross; use the ratio
of corresponding sides; connect the two triangles by an enlargement.

By the end of this section you can find a missing length inside a circle from the two
chords that cross, and you can say why the two triangles are similar.

## Two chords that cross inside a circle

Let two chords $AB$ and $CD$ of a circle cross at a point $P$ inside the circle. The two
chords make four segments: $PA$, $PB$, $PC$ and $PD$.

Two triangles appear, and they are similar. This is the result of the section.

> **Two chords that cross.** If two chords $AB$ and $CD$ cross at a point $P$ inside a
> circle, then the triangles $APC$ and $DPB$ are similar.

**Proof.** The two triangles have two pairs of equal angles.

1. $|\angle APC| = |\angle DPB|$. [The angles are vertically opposite, by Theorem 1.]
2. $|\angle PAC| = |\angle PDB|$. [The point $P$ lies on the line $AB$, so the angle
   $\angle PAC$ is the angle $\angle BAC$. The point $P$ also lies on the line $CD$, so
   $\angle PDB$ is the angle $\angle CDB$. Both stand on the arc $BC$ and lie in the same
   segment, so they are equal by Corollary 2.]
3. The triangles $APC$ and $DPB$ are similar. [Two pairs of equal angles, so the triangles
   are similar by AA. $\blacksquare$]

The matching vertices are $A$ with $D$, $P$ with $P$, and $C$ with $B$.

## The ratio of the sides

Similar triangles have the same ratio of corresponding sides. From the matching order,

$$\frac{|PA|}{|PD|} = \frac{|PC|}{|PB|}.$$

Multiply both sides by $|PD| \times |PB|$:

$$|PA| \times |PB| = |PC| \times |PD|.$$

> **The crossing-chords rule.** The product of the two parts of one chord equals the
> product of the two parts of the other.

$$|PA| \times |PB| = |PC| \times |PD|.$$

## The enlargement

The two similar triangles are not only the same shape. One is the image of the other under
an enlargement centred at $P$.

The centre of the enlargement is the crossing point $P$, and the scale factor is the ratio
of a pair of corresponding sides. The triangles lie on opposite sides of $P$, so the scale
factor is negative, and the image is turned through a half-turn about $P$.

For the matching order $A \to D$, the scale factor is
$$k = -\frac{|PD|}{|PA|}.$$

The same factor takes $C$ to $B$, because
$$\frac{|PB|}{|PC|} = \frac{|PD|}{|PA|},$$

which is the crossing-chords rule rearranged. That is the enlargement link between the two
results: the equal products are the equal scale factors.

## Worked examples

**Example 1.** Two chords $AB$ and $CD$ cross at $P$ inside a circle. Given $|PA| = 6$ cm,
$|PB| = 8$ cm and $|PC| = 4$ cm, find $|PD|$.

Use the crossing-chords rule:
$$6 \times 8 = 4 \times |PD|$$

$$48 = 4|PD|$$

$$|PD| = 12 \text{ cm}.$$

**Example 2.** Two chords cross at $P$, with $|PA| = 5$ cm, $|PB| = 12$ cm and
$|PC| = 4$ cm. Find $|PD|$.

$$5 \times 12 = 4 \times |PD|$$

$$60 = 4|PD|$$

$$|PD| = 15 \text{ cm}.$$

**Example 3.** A chord $AB$ of length $13$ cm is cut by another chord at the point $P$,
with $|PA| = 4$ cm. The other chord has one part $|PC| = 6$ cm. Find its other part
$|PD|$.

The two parts of $AB$ are $4$ cm and $13 - 4 = 9$ cm.
$$4 \times 9 = 6 \times |PD|$$

$$36 = 6|PD|$$

$$|PD| = 6 \text{ cm}.$$

**Example 4.** In Example 1, find the scale factor of the enlargement centred at $P$ that
takes the triangle $APC$ to the triangle $DPB$.

The matching vertex of $A$ is $D$, so the scale factor is
$$k = -\frac{|PD|}{|PA|} = -\frac{12}{6} = -2.$$

The image is twice as far from $P$ as the object, and on the other side of $P$. The side
$PC$ maps to $PB$, and $4 \times 2 = 8$ cm, which agrees with Example 1.

> **Watch out.** The products pair the two parts of the **same** chord. A student who pairs
> $|PA|$ with $|PC|$ writes $|PA| \times |PC| = |PB| \times |PD|$, which is the wrong rule.
>
> **Re-check:** write the similar triangles with their vertices in matching order first.
> The order $A \to D$, $P \to P$, $C \to B$ gives the ratio $|PA|/|PD| = |PC|/|PB|$, and
> the products follow from it.

## Progress check

Back to the chapter problem. Two straight lead bars $AB$ and $CD$ cross at a point $P$
inside the window. The mason measures three of the four parts:
$$|PA| = 6 \text{ cm}, \qquad |PB| = 8 \text{ cm}, \qquad |PC| = 4 \text{ cm}.$$

1. Name the two similar triangles, and give the two pairs of equal angles that make them
   similar.
2. Find $|PD|$.
3. Find the scale factor of the enlargement centred at $P$ that takes the smaller triangle
   to the larger one.

## You should now be able to

- find the two similar triangles formed by two crossing chords;
- prove that they are similar, using vertically opposite angles and the angles in the same
  segment;
- use the crossing-chords rule to find a missing length;
- connect the two triangles by an enlargement centred at the crossing point.
