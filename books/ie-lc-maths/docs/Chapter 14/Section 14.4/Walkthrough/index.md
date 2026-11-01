---
title: 14.4 Enlargements and the scale factor — Learn
chapter: 14
chapter_title: Transformation geometry
section: '14.4'
section_title: Enlargements and the scale factor
tier: O
refs:
- '2.4'
kind: walkthrough
---

# 14.4 Enlargements and the scale factor — Learn

**Prerequisites:** coordinates; multiplying by a fraction; the area of a triangle.

**Objectives:** enlarge a point or a shape about a centre with a scale factor; find the
image; work out how the enlargement changes the area.

By the end of this section you can enlarge any shape about a centre, and you can say
exactly how much larger the area becomes.

## Changing size, keeping shape

An **enlargement** changes the size of a shape but not its shape. Every length in the
image is the same multiple of the matching length in the object. That multiple is called
the **scale factor**, written $k$.

The shape does not turn and it does not flip. So the object and the image are **similar**:
their angles match and their lengths are in a fixed ratio. They are not congruent unless
$k = 1$.

The fixed point that the enlargement is measured from is the **centre of enlargement**.
Every image point lies on the ray from the centre through the object point.

> **Enlargement about the origin.**
>
>
> $$(x,y) \to (kx,\; ky).$$

Multiply both coordinates by the scale factor.

**Example 1.** Enlarge the point $(2,3)$ by scale factor $2$ about the origin.

$$(2,3) \to (2 \times 2,\; 2 \times 3) = (4,6)$$

The image is twice as far from the origin as the object, in the same direction.

**Example 2.** Enlarge the point $(6,3)$ by scale factor $\frac{1}{2}$ about the origin.

$$(6,3) \to \left(6 \times \tfrac{1}{2},\; 3 \times \tfrac{1}{2}\right) = (3,1.5)$$

A scale factor between 0 and 1 makes the image smaller. The image lies between the centre
and the object.

## The effect of the scale factor

| Scale factor $k$ | The image is |
|---|---|
| $k > 1$ | larger than the object |
| $k = 1$ | the same size as the object |
| $0 < k < 1$ | smaller than the object |

The centre of enlargement is the one point that does not move.

## Enlargement about any centre

When the centre is $C(a,b)$, first find how far the point is from the centre, then
multiply that distance by $k$, then add it back on.

> **Enlargement about $C(a,b)$.**
>
>
> $$(x,y) \to \bigl(a + k(x - a),\; b + k(y - b)\bigr).$$

**Example 3.** Enlarge $(5,4)$ by scale factor $2$ about the centre $C(1,1)$.

Find the displacement from the centre, multiply it, then add the centre back.

$$(5,4) \to (1 + 2(5 - 1),\; 1 + 2(4 - 1)) = (1 + 8,\; 1 + 6) = (9,7)$$

The image is $(9,7)$.

**Example 4.** Enlarge $(3,7)$ by scale factor $\frac{1}{2}$ about the centre $C(1,3)$.

$$(3,7) \to \left(1 + \tfrac{1}{2}(3 - 1),\; 3 + \tfrac{1}{2}(7 - 3)\right) = (2,5)$$

## The effect on area

An enlargement multiplies every length by $k$. A length has one dimension, so it scales
once. An area has two dimensions, so it scales twice.

> **The area rule.** If the scale factor is $k$, then
>
>
> $$\text{area of image} = k^2 \times \text{area of object}.$$

**Example 5.** A shape has area $3$ square units. Find the area of its image after an
enlargement by scale factor $3$.

$$\text{area} = 3^2 \times 3 = 9 \times 3 = 27$$

The image has area $27$ square units. The width is three times as large, but the area is
nine times as large.

## Guided investigation: how fast does the area grow?

:::figure enlargement-grid

Predict first. Set the scale factor to $2$ in your head. The sides double, so by what
factor do you think the area grows? Write down a number before you touch the figure.

Now move the scale factor and watch the readout. Test $k = 0.5$, $k = 1$ and $k = 3$ as
well as $k = 2$.

Then write your explanation, in your own words: when $k$ doubles, what happens to the
area? Compare the area factor with $k^2$ and say why the two dimensions both scale.

<!-- tier:h -->

## Negative scale factors

A **negative** scale factor places the image on the opposite side of the centre. The size
is $|k|$ times the object size, and the image is turned through a half-turn about the
centre.

**Example 6.** Enlarge $(4,2)$ by scale factor $-1$ about the origin.

$$(4,2) \to (-4,-2)$$

The rule $(x,y) \to (kx, ky)$ still applies. Here $k = -1$, so both coordinates change
sign: the image is the half-turn image of the object.

**Example 7.** Enlarge $(3,1)$ by scale factor $-2$ about the origin.

$$(3,1) \to (-6,-2)$$

The image is twice as far from the origin as the object, and on the other side of it.
The area factor is $k^2 = (-2)^2 = 4$.

<!-- /tier:h -->

> **Watch out.** The common mistake is to multiply the area by $k$ instead of by $k^2$.
> For $k = 3$, a shape of area $5$ has an image of area $45$, not $15$. The length grows
> by 3, but the area grows by 9.
>
> **Re-check:** draw a $1$ by $1$ square and enlarge it by $3$. The image is $3$ by $3$,
> and it contains 9 of the original squares. The count of unit squares is the area
> factor.

## Progress check

Back to the chapter problem. The centre of the panel is the tile enlarged by scale
factor $3$ about the origin. The tile has corners $A(1,1)$, $B(4,1)$ and $C(1,3)$.

Multiply each coordinate by 3 to find the three image corners. Then work out the area
factor $k^2$, and use it to find how many original tiles fit inside the enlarged one.
Compare the answer with the prediction you made at the start of the chapter.

## You should now be able to

- enlarge a point about the origin by multiplying both coordinates by $k$;
- enlarge a point about any centre, using $a + k(x - a)$ and $b + k(y - b)$;
- say whether a scale factor makes the image larger or smaller;
- find the area of an image by multiplying the object area by $k^2$;
- explain why the area factor is $k^2$ and not $k$.
