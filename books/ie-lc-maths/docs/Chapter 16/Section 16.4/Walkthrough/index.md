---
title: 16.4 Proportionality and ratios in triangles — Learn
chapter: 16
chapter_title: 'Synthetic geometry: quadrilaterals, similarity and area'
section: '16.4'
section_title: Proportionality and ratios in triangles
tier: H
refs:
- '2.1'
kind: walkthrough
---

# 16.4 Proportionality and ratios in triangles — Learn

**Prerequisites:** Sections 16.1 to 16.3 — parallelograms, similar triangles and the AA
rule.

**Objectives:** divide a segment in a given ratio; prove the equal intercepts theorem;
prove that a line parallel to one side of a triangle cuts the other two sides in the same
ratio, and prove the converse; prove that similar triangles have proportional sides.

By the end of this section you can prove the ratio rule you used in Section 16.3, and you
can decide from two ratios whether two lines are parallel.

## Dividing a segment in a ratio

Let $s$ and $t$ be positive numbers. A point $C$ **divides the segment** $[AB]$ in the
ratio $s : t$ when $C$ lies between $A$ and $B$ and
$$\frac{|AC|}{|CB|} = \frac{s}{t}.$$

A line **cuts** $[AB]$ in the ratio $s : t$ when it meets $AB$ at a point that divides
$[AB]$ in that ratio.

The Ruler Axiom gives the important extra fact. For two points $A$ and $B$ and a ratio
$s : t$, there is exactly **one** point that divides $[AB]$ in that ratio. The ratio
determines the point.

## Theorem 11: equal intercepts

> **Theorem 11.** If three parallel lines cut off equal segments on one transversal, then
> they cut off equal segments on any other transversal.

**Proof.** Let the three parallel lines be $l_1 \parallel l_2 \parallel l_3$. Let the
transversal $t_1$ meet them at $A$, $B$ and $C$, with $|AB| = |BC|$. Let a second
transversal $t_2$ meet them at $D$, $E$ and $F$. We prove $|DE| = |EF|$.

Draw the line through $A$ parallel to $DE$. It meets $l_2$ at $E'$ and $l_3$ at $F'$. Draw
the line through $F'$ parallel to $AB$. It meets $l_2$ at $B'$.

Now read off three parallelograms.

- $ADEE'$ has $AD \parallel EE'$, because $l_1 \parallel l_2$, and $AE' \parallel DE$ by
  construction. So $|AE'| = |DE|$.
- $EE'F'F$ has $EE' \parallel FF'$, because $l_2 \parallel l_3$, and $E'F' \parallel EF$,
  because both lie along $t_2$. So $|E'F'| = |EF|$.
- $B'BCF'$ has $B'B \parallel F'C$, because $l_2 \parallel l_3$, and $B'F' \parallel BC$,
  because both are parallel to $t_1$. So $|B'F'| = |BC|$.

The hypothesis gives $|AB| = |BC|$, so $|B'F'| = |AB|$.

Now compare the triangles $ABE'$ and $F'B'E'$.

- $|\angle BAE'| = |\angle B'F'E'|$, by alternate angles at $AB \parallel B'F'$.
- $|\angle AE'B| = |\angle F'E'B'|$, by vertically opposite angles at $E'$.
- $|AB| = |B'F'|$, from the line above.

So $\triangle ABE' \cong \triangle F'B'E'$ by AAS, and therefore $|AE'| = |F'E'|$.

Put the pieces together:
$$|DE| = |AE'| = |F'E'| = |EF|.$$

The three parallel lines cut off equal segments on $t_2$ as well. $\blacksquare$

## Theorem 12: a line parallel to one side

> **Theorem 12.** Let $\triangle ABC$ be a triangle. If a line $l$ is parallel to $BC$ and
> cuts $[AB]$ in the ratio $s : t$, then it also cuts $[AC]$ in the same ratio.

**Proof (the case where the ratio is a ratio of whole numbers).** Suppose the line $l$
meets $[AB]$ at $D$, and
$$\frac{|AD|}{|DB|} = \frac{m}{n}$$
for natural numbers $m$ and $n$.

Mark the points $D_0 = A$, $D_1$, $D_2$, $\ldots$, $D_{m+n} = B$ along $[AB]$ so that the
segments $[D_0D_1]$, $[D_1D_2]$, $\ldots$ are all equal. Then $D_m = D$, because the
ratio is $m : n$.

Through each point $D_i$, draw the line parallel to $BC$. It meets $[AC]$ at $E_i$. The
parallel lines cut off equal segments on the transversal $AB$, so by Theorem 11 they cut
off equal segments on the transversal $AC$:
$$|AE_1| = |E_1E_2| = |E_2E_3| = \cdots = |E_{m+n-1}C|.$$

The point $E = E_m$ is the one where $l$ meets $[AC]$. There are $m$ equal segments from
$A$ to $E$, and $n$ equal segments from $E$ to $C$. So
$$\frac{|AE|}{|EC|} = \frac{m}{n} = \frac{|AD|}{|DB|}.$$

The line cuts the two sides in the same ratio. $\blacksquare$

The same result holds when the ratio is not a ratio of whole numbers. The argument then
needs a limiting step, which is beyond this course. The statement is the one we use.

> **The converse.** Let $\triangle ABC$ be a triangle. If a line cuts the sides $AB$ and
> $AC$ in the same ratio, then it is parallel to $BC$.

**Proof.** Let the line meet $AB$ at $D$ and $AC$ at $E$, with
$$\frac{|AD|}{|DB|} = \frac{|AE|}{|EC|}.$$

Draw the line through $D$ parallel to $BC$, and let it meet $AC$ at $E'$. By Theorem 12,
$$\frac{|AD|}{|DB|} = \frac{|AE'|}{|E'C|}.$$

The two fractions on the right are equal, so $E$ and $E'$ divide $[AC]$ in the same ratio.
The ratio determines the point, so $E = E'$. Therefore the line through $D$ and $E$ is the
line through $D$ parallel to $BC$, and it is parallel to $BC$. $\blacksquare$

## Theorem 13: similar triangles have proportional sides

> **Theorem 13.** If two triangles are similar, then their corresponding sides are
> proportional:
> $$\frac{|AB|}{|A'B'|} = \frac{|BC|}{|B'C'|} = \frac{|CA|}{|C'A'|}.$$

**Proof.** Let $\triangle ABC \sim \triangle A'B'C'$. Suppose $|A'B'| \le |AB|$. Choose the
point $B''$ on $[AB]$ with $|AB''| = |A'B'|$, and the point $C''$ on $[AC]$ with
$|AC''| = |A'C'|$.

The triangles $AB''C''$ and $A'B'C'$ have $|AB''| = |A'B'|$, the equal angle at $A$, and
$|AC''| = |A'C'|$. So $\triangle AB''C'' \cong \triangle A'B'C'$ by SAS.

Therefore $|\angle AB''C''| = |\angle A'B'C'| = |\angle ABC|$, because the triangles are
similar. The angles $\angle AB''C''$ and $\angle ABC$ are corresponding angles at the
transversal $AB$, so they are equal exactly when $B''C'' \parallel BC$. By Theorem 3
part 1, $B''C'' \parallel BC$.

Now apply Theorem 12 to the triangle $ABC$ with the line $B''C''$ parallel to $BC$:
$$\frac{|AB''|}{|AC''|} = \frac{|AB|}{|AC|}.$$

Substitute $|AB''| = |A'B'|$ and $|AC''| = |A'C'|$, and rearrange:
$$\frac{|A'B'|}{|A'C'|} = \frac{|AB|}{|AC|}, \qquad \frac{|AB|}{|A'B'|} = \frac{|AC|}{|A'C'|}.$$

The same argument with the vertices $B$ and $B'$ gives
$$\frac{|BC|}{|B'C'|} = \frac{|AB|}{|A'B'|}.$$

The three ratios are equal. $\blacksquare$

## Two criteria for similarity

Theorem 13 turns similarity into a statement about sides. Two more criteria follow.

> **Proposition 7 (SAS similarity).** If $|\angle A| = |\angle A'|$ and
> $\dfrac{|A'B'|}{|AB|} = \dfrac{|A'C'|}{|AC|}$, then the two triangles are similar.

**Proof.** Suppose $|A'B'| \le |AB|$. If $|A'B'| = |AB|$, then $|A'C'| = |AC|$ as well,
and the triangles are congruent by SAS. Congruent triangles are similar.

Otherwise $|A'B'| < |AB|$ and $|A'C'| < |AC|$. Choose $B''$ on $[AB]$ with
$|AB''| = |A'B'|$, and $C''$ on $[AC]$ with $|AC''| = |A'C'|$. By SAS,
$$\triangle AB''C'' \cong \triangle A'B'C'.$$

Draw the line through $B''$ parallel to $BC$, meeting $AC$ at $D$. By Theorem 12,
$$\frac{|AB''|}{|AB|} = \frac{|AD|}{|AC|}.$$

The hypothesis says $\dfrac{|AB''|}{|AB|} = \dfrac{|AC''|}{|AC|}$, so $|AD| = |AC''|$ and
$D = C''$. Therefore $B''C'' \parallel BC$, and the corresponding angles give
$$|\angle B''| = |\angle B|, \qquad |\angle C''| = |\angle C|.$$

The congruence carries these angles across to $\triangle A'B'C'$, so all three angles of
the two triangles are equal. The triangles are similar. $\blacksquare$

> **Proposition 8 (SSS similarity).** If
> $\dfrac{|AB|}{|A'B'|} = \dfrac{|BC|}{|B'C'|} = \dfrac{|CA|}{|C'A'|}$, then the two
> triangles are similar.

**Proof.** If $|A'B'| = |AB|$, then all three pairs of sides are equal, and the triangles
are congruent by SSS. Congruent triangles are similar.

Otherwise suppose $|A'B'| < |AB|$. Choose $B''$ on $[AB]$ and $C''$ on $[AC]$ with
$|AB''| = |A'B'|$ and $|AC''| = |A'C'|$. By Proposition 7, $\triangle AB''C''$ is similar
to $\triangle ABC$. So
$$|B''C''| = |AB''| \times \frac{|BC|}{|AB|} = |A'B'| \times \frac{|BC|}{|AB|}.$$

The hypothesis says $\dfrac{|BC|}{|AB|} = \dfrac{|B'C'|}{|A'B'|}$, so $|B''C''| = |B'C'|$.

Now $\triangle A'B'C'$ and $\triangle AB''C''$ have all three pairs of sides equal, so they
are congruent by SSS. Therefore $\triangle A'B'C'$ is similar to $\triangle ABC$.
$\blacksquare$

## Worked examples

**Example 1.** In $\triangle ABC$, a line parallel to $BC$ cuts $[AB]$ at $D$ with
$|AD| : |DB| = 3 : 2$. Given $|AC| = 15$ cm, find $|AE|$ and $|EC|$, where $E$ is on
$[AC]$.

By Theorem 12, the line cuts $[AC]$ in the same ratio:
$$|AE| : |EC| = 3 : 2.$$

The whole side is $15$ cm, and $3 + 2 = 5$ parts. So each part is $15 \div 5 = 3$ cm.
$$|AE| = 3 \times 3 = 9 \text{ cm}, \qquad |EC| = 2 \times 3 = 6 \text{ cm}.$$

Check: $9 + 6 = 15$, and $\frac{9}{6} = \frac{3}{2}$.

**Example 2.** In $\triangle ABC$, $D$ is on $[AB]$ and $E$ is on $[AC]$, with
$|AD| = 4$ cm, $|DB| = 6$ cm, $|AE| = 6$ cm and $|EC| = 9$ cm. Is $DE$ parallel to $BC$?

Compare the two ratios:
$$\frac{|AD|}{|DB|} = \frac{4}{6} = \frac{2}{3}, \qquad \frac{|AE|}{|EC|} = \frac{6}{9} = \frac{2}{3}.$$

The ratios are equal, so $DE \parallel BC$ by the converse of Theorem 12.

**Example 3.** $\triangle ABC \sim \triangle A'B'C'$, with $|AB| = 8$ cm, $|BC| = 10$ cm
and $|A'B'| = 6$ cm. Find $|B'C'|$.

By Theorem 13, the corresponding sides are proportional:
$$\frac{|B'C'|}{|BC|} = \frac{|A'B'|}{|AB|} = \frac{6}{8} = \frac{3}{4}.$$

$$|B'C'| = \frac{3}{4} \times 10 = 7.5 \text{ cm}.$$

**Example 4.** In $\triangle ABC$, the line $DE$ cuts $[AB]$ at $D$ and $[AC]$ at $E$, with
$|AD| = 5$ cm, $|DB| = 3$ cm and $|AE| = 7.5$ cm. Find $|EC|$, and decide whether
$DE \parallel BC$.

By the converse of Theorem 12, if the ratios are equal then $DE \parallel BC$. First find
$|EC|$ from the ratio:
$$\frac{5}{3} = \frac{7.5}{|EC|}, \qquad 5|EC| = 22.5, \qquad |EC| = 4.5 \text{ cm}.$$

The two ratios are $\frac{5}{3}$ and $\frac{7.5}{4.5} = \frac{5}{3}$, so they are equal and
$DE \parallel BC$.

> **Watch out.** The ratio in Theorem 12 compares the two parts of one side, not a part
> with the whole side. A student who writes $\frac{|AD|}{|AB|} = \frac{|AE|}{|EC|}$ has
> mixed the two kinds of ratio.
>
> **Re-check:** write the ratio of the parts on the left and the ratio of the parts on the
> right, so the two fractions have the same shape. Then check that each denominator is the
> second part of its side.

## Progress check

Back to the chapter problem. The gate is placed $24$ m along the $60$ m side $AB$ of the
field, so $|AG| = 24$ m and $|GB| = 36$ m. A dividing fence runs from the gate, parallel
to the side $BC$.

1. Write the ratio $|AG| : |GB|$ in its simplest form.
2. The dividing fence meets the opposite side $DC$ at $H$. Write the ratio
   $|DH| : |HC|$, using Theorem 12.
3. Find $|DH|$ and $|HC|$.
4. The fence is parallel to $BC$, and $|BC| = 25$ m. Write down $|GH|$, and say which
   theorem of Section 16.1 you used.
5. The two parts of the field are rectangles. Find the area of each part, and check that
   the two areas are in the ratio $2 : 3$.

Keep the two areas. Section 16.6 uses them.

## You should now be able to

- say what it means for a point to divide a segment in a given ratio;
- prove the equal intercepts theorem;
- prove that a line parallel to one side of a triangle cuts the other two sides in the
  same ratio;
- prove the converse, and use it to decide whether two lines are parallel;
- prove that similar triangles have proportional sides;
- use the SAS and SSS criteria for similar triangles.
