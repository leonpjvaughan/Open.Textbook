---
title: The angles in a polygon add to (n − 2) × 180°
---

# The angles in a polygon add to (n − 2) × 180°

A quadrilateral's angles add to $360^\circ$. A pentagon's add to $540^\circ$. A
hexagon's add to $720^\circ$. There is a pattern, and it holds for a polygon with
any number of sides:

$$\text{sum of the interior angles} = (n - 2) \times 180^\circ$$

where $n$ is the number of sides.

## Before you start

You need **[the angles in a triangle add to 180°](../angles-in-a-triangle/index.md)**.
This proof does nothing except use it several times.

## Predict first

Here is a hexagon, cut into triangles by drawing lines from one corner.

**Before you look closely, predict:** how many triangles do you think it takes?
Then count them in the figure.

:::figure polygon-triangulation

## The proof

Pick one corner of the polygon. Draw a straight line from it to **every corner it
is not already joined to**.

Those lines are called diagonals, and they cut the polygon into triangles. Nothing
overlaps and nothing is left over: the polygon is exactly a collection of triangles
that share no interior.

**How many triangles?** Count the corners that receive a line. Starting at the
corner you chose, the polygon has $n$ corners. Three of them cannot receive a
diagonal:

- the corner you started from;
- the two corners next to it, which are already joined by a side.

That leaves $n - 3$ diagonals, and each one adds one triangle. You start with no
triangles, so the number of triangles is:

$$n - 3 + 1 = n - 2$$

**Now add up the angles.** Every triangle's angles add to $180^\circ$, so all the
triangles together contribute

$$(n - 2) \times 180^\circ$$

But look at what those angles are. Each angle of each triangle sits inside the
polygon at one of its corners, and the triangles fit together without overlapping.
So the triangle angles *are* the polygon's interior angles, counted once each.

Therefore the polygon's interior angles add to $(n - 2) \times 180^\circ$.

**Check it on the shapes you know.**

| Polygon | $n$ | $(n - 2) \times 180^\circ$ |
|---|---|---|
| Triangle | 3 | $180^\circ$ |
| Quadrilateral | 4 | $360^\circ$ |
| Pentagon | 5 | $540^\circ$ |
| Hexagon | 6 | $720^\circ$ |

The first row is the triangle fact again, which is what you would hope: the
triangle is the case $n = 3$.

## Check your understanding

1. What do the interior angles of a decagon (10 sides) add to?
2. A polygon's interior angles add to $1260^\circ$. How many sides does it have?
3. Explain why the rule cannot be used for a shape with a curved side.

<details markdown="1">
<summary>Answers</summary>

1. $(10 - 2) \times 180^\circ = 1440^\circ$.
2. $(n - 2) \times 180 = 1260$, so $n - 2 = 7$ and $n = 9$. It is a nonagon.
3. The proof cuts the shape into triangles by joining corners with straight lines.
   A curved side has no corners to join to, so there is nothing to cut along, and
   the count of triangles does not apply.
</details>

## One more thing

This is why a regular polygon has the interior angle it does. If all $n$ angles are
equal, each one is

$$\frac{(n - 2) \times 180^\circ}{n}$$

For a regular hexagon that is $\dfrac{4 \times 180^\circ}{6} = 120^\circ$. You can
check that against the hexagon at the top of the page.
