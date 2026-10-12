---
title: The angles in a triangle add to 180°
---

# The angles in a triangle add to 180°

Take any triangle, draw it as awkwardly as you like, and measure its three angles.
They add to $180^\circ$. Every time.

You have probably used this fact for years without being shown why it is true. Here
is why.

## Before you start

Two things you already know are enough:

- **Angles on a straight line add to $180^\circ$.**
- **Alternate angles are equal.** When a line crosses two parallel lines, the
  angles in a Z shape are equal. These two marked angles are the same size:

  ```
      A ______
       \
        \  a
  _______\_\______
        b
  ```

  The angle $a$ above the crossing line and the angle $b$ below it are equal.

## Predict first

Look at the triangle below. The line through the top corner is parallel to the
bottom side.

**Before you move anything, predict:** if you make the top corner wider, what
happens to the two angles at the bottom? Do they get bigger, smaller, or does one
of them change and not the other?

Write your prediction down, then test it.

:::figure angles-on-a-line

## The proof

Name the triangle's corners $A$, $B$ and $C$, with the angles at each corner
written as $\angle A$, $\angle B$ and $\angle C$.

Draw a line through $A$ that is parallel to the side $BC$.

That line does three things at $A$:

1. It makes an angle with the side $AB$. Call it $x$.
2. It makes an angle with the side $AC$. Call it $y$.
3. Between those two, it makes the triangle's own angle $\angle A$.

Because the line is straight, those three angles fill it exactly:

$$x + \angle A + y = 180^\circ$$

Now use the parallel line. The side $AB$ cuts across two parallel lines, so the
angle $x$ and the angle $\angle B$ are alternating angles — the Z shape. They are
equal:

$$x = \angle B$$

The same argument with the side $AC$ gives:

$$y = \angle C$$

Put those two facts into the first equation:

$$\angle B + \angle A + \angle C = 180^\circ$$

So the three angles of the triangle add to $180^\circ$. That is the proof, and it
works for every triangle, because nothing in it depended on the triangle being any
particular shape.

## Check your understanding

1. In a triangle, two of the angles are $37^\circ$ and $68^\circ$. What is the
   third?
2. A triangle has a right angle. What do the other two angles add to?
3. Explain why a triangle cannot have two obtuse angles. Use the fact you have
   just proved, and give a reason for each step.

<details markdown="1">
<summary>Answers</summary>

1. $180^\circ - 37^\circ - 68^\circ = 75^\circ$.
2. $90^\circ$ — the right angle uses half of the $180^\circ$ and leaves the rest
   for the other two.
3. An obtuse angle is bigger than $90^\circ$. Two of them would already add to more
   than $180^\circ$, before the third angle is counted at all. But the three angles
   add to exactly $180^\circ$, so there is nothing left for the third angle. A
   triangle cannot have a corner with no angle.
</details>

## Where this goes next

Once you can split a shape into triangles, this fact does a great deal of work.
The next proof uses it to say what the angles inside a polygon add to, however many
sides the polygon has — see
**[the angles in a polygon add to (n − 2) × 180°](../angles-in-a-polygon/index.md)**.
