---
title: 16.4 Proportionality and ratios in triangles — Practise with help
chapter: 16
chapter_title: 'Synthetic geometry: quadrilaterals, similarity and area'
section: '16.4'
section_title: Proportionality and ratios in triangles
tier: H
refs:
- '2.1'
kind: guided-problems
---

# 16.4 Proportionality and ratios in triangles — Practise with help

## Warm-up: remember

1. A segment $[AB]$ is $20$ cm long. A point $C$ divides it in the ratio $3 : 2$. Find
   $|AC|$.
2. Two similar triangles have corresponding sides of $5$ cm and $15$ cm. Find the scale
   factor from the smaller to the larger.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $|AC| = 12$ cm. There are $3 + 2 = 5$ parts, each $20 \div 5 = 4$ cm, and $AC$ takes
   three of them.
2. The scale factor is $\frac{15}{5} = 3$. Every side of the larger triangle is three
   times the matching side of the smaller.

If either answer felt uncertain, look again at Section 16.3 before you carry on.

</details>

## Practise with help

**1.** In $\triangle ABC$, a line parallel to $BC$ cuts $[AB]$ at $D$ with
$|AD| : |DB| = 3 : 2$. Given $|AC| = 15$ cm, find $|AE|$ and $|EC|$, where $E$ is on
$[AC]$.

<details markdown="1">
<summary>Hint</summary>

The line cuts both sides in the same ratio.

<details markdown="1">
<summary>Next step</summary>

There are $5$ equal parts in the whole side of $15$ cm.

<details markdown="1">
<summary>Full working</summary>

$$|AE| : |EC| = 3 : 2, \qquad 15 \div 5 = 3 \text{ cm per part}$$

$$|AE| = 9 \text{ cm}, \qquad |EC| = 6 \text{ cm}$$

Check: $9 + 6 = 15$ and $\frac{9}{6} = \frac{3}{2}$.

</details>
</details>
</details>

**2.** In $\triangle ABC$, $D$ is on $[AB]$ and $E$ is on $[AC]$, with $|AD| = 4$ cm,
$|DB| = 6$ cm, $|AE| = 6$ cm and $|EC| = 9$ cm. Is $DE$ parallel to $BC$?

<details markdown="1">
<summary>Hint</summary>

Compare the two ratios of the parts of each side.

<details markdown="1">
<summary>Next step</summary>

$\frac{4}{6}$ and $\frac{6}{9}$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{|AD|}{|DB|} = \frac{4}{6} = \frac{2}{3}, \qquad \frac{|AE|}{|EC|} = \frac{6}{9} = \frac{2}{3}$$

The ratios are equal, so $DE \parallel BC$ by the converse of Theorem 12.

</details>
</details>
</details>

**3.** $\triangle ABC \sim \triangle A'B'C'$, with $|AB| = 8$ cm, $|BC| = 10$ cm and
$|A'B'| = 6$ cm. Find $|B'C'|$.

<details markdown="1">
<summary>Hint</summary>

Theorem 13 makes the corresponding sides proportional.

<details markdown="1">
<summary>Next step</summary>

The scale factor is $\frac{|A'B'|}{|AB|} = \frac{6}{8}$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{|B'C'|}{|BC|} = \frac{6}{8} = \frac{3}{4}$$

$$|B'C'| = \frac{3}{4} \times 10 = 7.5 \text{ cm}$$

</details>
</details>
</details>

**4.** In $\triangle ABC$, the line $DE$ cuts $[AB]$ at $D$ and $[AC]$ at $E$, with
$|AD| = 5$ cm, $|DB| = 3$ cm and $|AE| = 7.5$ cm. Find $|EC|$, and decide whether
$DE \parallel BC$.

<details markdown="1">
<summary>Hint</summary>

First use the ratio rule to find $|EC|$, then compare the two ratios.

<details markdown="1">
<summary>Next step</summary>

Write $\frac{5}{3} = \frac{7.5}{|EC|}$.

<details markdown="1">
<summary>Full working</summary>

$$5|EC| = 22.5, \qquad |EC| = 4.5 \text{ cm}$$

Now $\frac{|AE|}{|EC|} = \frac{7.5}{4.5} = \frac{5}{3}$, which equals
$\frac{|AD|}{|DB|}$. So the ratios are equal and $DE \parallel BC$ by the converse of
Theorem 12.

</details>
</details>
</details>

**5.** Prove the case of Theorem 12 where the ratio of the two parts of the side is a
ratio of whole numbers.

<details markdown="1">
<summary>Hint</summary>

Mark off equal segments along the side, and draw parallels through each mark.

<details markdown="1">
<summary>Next step</summary>

Use Theorem 11 to show that the other side is also cut into equal segments.

<details markdown="1">
<summary>Full working</summary>

Let the line $l$ be parallel to $BC$ and meet $[AB]$ at $D$, with
$\frac{|AD|}{|DB|} = \frac{m}{n}$ for natural numbers $m$ and $n$.

Mark the points $D_0 = A$, $D_1$, $D_2$, $\ldots$, $D_{m+n} = B$ along $[AB]$ so that
the segments are all equal. Then $D_m = D$.

Through each $D_i$, draw the line parallel to $BC$, meeting $[AC]$ at $E_i$. The parallel
lines cut off equal segments on $AB$, so by Theorem 11 they cut off equal segments on
$AC$:

$$|AE_1| = |E_1E_2| = \cdots = |E_{m+n-1}C|.$$

The point $E = E_m$ has $m$ equal segments before it and $n$ after it, so

$$\frac{|AE|}{|EC|} = \frac{m}{n} = \frac{|AD|}{|DB|}.$$

</details>
</details>
</details>

**6.** Prove the converse of Theorem 12: if a line cuts two sides of a triangle in the
same ratio, then it is parallel to the third side.

<details markdown="1">
<summary>Hint</summary>

Use the uniqueness of the point that divides a segment in a given ratio.

<details markdown="1">
<summary>Next step</summary>

Draw the parallel line through the first point, and compare where it meets the second
side.

<details markdown="1">
<summary>Full working</summary>

Let the line meet $AB$ at $D$ and $AC$ at $E$, with
$\frac{|AD|}{|DB|} = \frac{|AE|}{|EC|}$.

Draw the line through $D$ parallel to $BC$, and let it meet $AC$ at $E'$. By Theorem 12,

$$\frac{|AD|}{|DB|} = \frac{|AE'|}{|E'C|}.$$

So $E$ and $E'$ divide $[AC]$ in the same ratio. The Ruler Axiom gives exactly one point
that divides a segment in a given ratio, so $E = E'$. Therefore the line through $D$ and
$E$ is parallel to $BC$.

</details>
</details>
</details>

## A question from Chapter 13

**7.** The points $A(0,0)$ and $B(10,0)$ are the ends of a segment. Find the point $C$ on
$[AB]$ that divides it in the ratio $3 : 2$.

<details markdown="1">
<summary>Hint</summary>

The ratio gives the fraction of the whole segment that lies before $C$.

<details markdown="1">
<summary>Next step</summary>

$C$ is $\frac{3}{3+2} = \frac{3}{5}$ of the way from $A$ to $B$.

<details markdown="1">
<summary>Full working</summary>

The fraction of the way from $A$ to $B$ is
$$\frac{3}{3 + 2} = \frac{3}{5}.$$

So
$$x_C = 0 + \frac{3}{5} \times 10 = 6.$$

The point is $C(6,0)$. Check: $|AC| = 6$ and $|CB| = 4$, and
$\frac{6}{4} = \frac{3}{2}$.

</details>
</details>
</details>
