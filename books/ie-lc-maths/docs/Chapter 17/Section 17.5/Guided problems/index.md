---
title: 17.5 The special points of a triangle — Practise with help
chapter: 17
chapter_title: 'Synthetic geometry: circles'
section: '17.5'
section_title: The special points of a triangle
tier: O
refs:
- '2.1'
kind: guided-problems
---

# 17.5 The special points of a triangle — Practise with help

## Warm-up: remember

1. Find the midpoint of the segment joining $(2,1)$ and $(8,7)$.
2. In an isosceles triangle, the median from the apex meets the base at its midpoint. The
   median is also perpendicular to the base. What does this say about that median?

<details markdown="1">
<summary>Answers and feedback</summary>

1. $\left(\frac{2+8}{2}, \frac{1+7}{2}\right) = (5,4)$.
2. The median is the perpendicular bisector of the base. It passes through the midpoint
   and it is at right angles to the base, so it satisfies both parts of the definition.

Question 2 is the link to this section. The perpendicular bisectors of the sides meet at
the circumcentre, and the median is one of them only in a special triangle.

</details>

:::figure warm-up-gate


## Practise with help

**1.** A triangle has a right angle at $A$, and the hypotenuse $BC$ is $26$ cm. Find the
circumradius.

<details markdown="1">
<summary>Hint</summary>

The circumcentre of a right-angled triangle is the midpoint of the hypotenuse.

<details markdown="1">
<summary>Next step</summary>

The circumradius $r$ is half the hypotenuse.

<details markdown="1">
<summary>Full working</summary>

$$r = 26 \div 2 = 13 \text{ cm}.$$

Every vertex is one radius from the circumcentre, so the circumcircle passes through all
three vertices.

</details>
</details>
</details>

**2.** A triangle has sides $9$ cm, $12$ cm and $15$ cm. Find the circumradius.

<details markdown="1">
<summary>Hint</summary>

Check whether the triangle is right-angled.

<details markdown="1">
<summary>Next step</summary>

$9^2 + 12^2 = 81 + 144 = 225 = 15^2$, so the right angle is opposite the $15$ cm side.

<details markdown="1">
<summary>Full working</summary>

The hypotenuse is $15$ cm, so the circumradius is

$$15 \div 2 = 7.5 \text{ cm}.$$

</details>
</details>
</details>

**3.** A median of a triangle is $21$ cm long. The centroid divides it in the ratio $2:1$,
with the longer part next to the vertex. Find the distance from the vertex to the
centroid.

<details markdown="1">
<summary>Hint</summary>

The median is split into $2 + 1 = 3$ equal parts.

<details markdown="1">
<summary>Next step</summary>

The longer part is two of those parts.

<details markdown="1">
<summary>Full working</summary>

One part is $21 \div 3 = 7$ cm, and the longer part is $2 \times 7 = 14$ cm.

So the distance from the vertex to the centroid is $14$ cm, and the distance from the
centroid to the midpoint of the opposite side is $7$ cm.

</details>
</details>
</details>

**4.** A triangle has sides $5$ cm, $12$ cm and $13$ cm. Find the radius of its incircle.

<details markdown="1">
<summary>Hint</summary>

The triangle is right-angled. Find its area first, then use the three triangles that meet
at the incentre.

<details markdown="1">
<summary>Next step</summary>

The area is $\tfrac12 \times 5 \times 12 = 30$ cm², and the semiperimeter is
$(5 + 12 + 13) \div 2 = 15$ cm.

<details markdown="1">
<summary>Full working</summary>

Join the incentre to each vertex. The triangle splits into three triangles, each with
height $r$ and base one side. Their areas add to the whole area:

$$\tfrac12 r (5 + 12 + 13) = 30.$$

$$15r = 30$$

$$r = 2 \text{ cm}.$$

The incircle has radius $2$ cm.

</details>
</details>
</details>

**5.** Name the point where each set of lines meets: the perpendicular bisectors, the angle
bisectors, the medians and the altitudes.

<details markdown="1">
<summary>Hint</summary>

Each set of lines gives one of the four special points.

<details markdown="1">
<summary>Next step</summary>

The circumcircle passes through the vertices, and the incircle touches the sides.

<details markdown="1">
<summary>Full working</summary>

- The perpendicular bisectors meet at the circumcentre.
- The angle bisectors meet at the incentre.
- The medians meet at the centroid.
- The altitudes meet at the orthocentre.

</details>
</details>
</details>

**6.** Explain why the three perpendicular bisectors of a triangle meet at one point.

<details markdown="1">
<summary>Hint</summary>

Start with two of them, and show the third passes through the same point.

<details markdown="1">
<summary>Next step</summary>

Use the fact that the perpendicular bisector of a segment is the set of points the same
distance from its two ends.

<details markdown="1">
<summary>Full working</summary>

Let the perpendicular bisectors of $AB$ and $AC$ meet at $O$. Then $|OA| = |OB|$, because
$O$ is on the perpendicular bisector of $AB$, and $|OA| = |OC|$, because $O$ is on the
perpendicular bisector of $AC$.

So $|OB| = |OC|$, which makes $O$ a point on the perpendicular bisector of $BC$. Therefore
all three perpendicular bisectors pass through $O$, and they are concurrent.

</details>
</details>
</details>

## A question from Section 17.2

**7.** A triangle has a right angle at $A$. Use Corollary 4 to explain why the
circumcentre is the midpoint of the hypotenuse.

<details markdown="1">
<summary>Hint</summary>

The angle at $A$ is a right angle, and it stands on the chord $BC$.

<details markdown="1">
<summary>Next step</summary>

A right angle standing on a chord makes the chord a diameter.

<details markdown="1">
<summary>Full working</summary>

The angle $\angle BAC$ is a right angle, and it stands on the chord $BC$. By Corollary 4,
the chord $BC$ is a diameter of the circumcircle.

The centre of a circle is the midpoint of every diameter, so the circumcentre is the
midpoint of $BC$. That also shows that the median from $A$ to $BC$ is half of $BC$.

</details>
</details>
</details>
