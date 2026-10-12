---
title: The angle in a semicircle is 90°
---

# The angle in a semicircle is 90°

Draw a circle. Draw a diameter across it. Pick any point on the circle and join it
to both ends of the diameter. The angle you have made at that point is a right
angle — wherever on the circle you picked.

That is surprising enough to be worth proving, and the proof is short.

## Before you start

Two facts:

- **Every point on a circle is the same distance from the centre.** That distance
  is the radius.
- **The angles of a triangle add to $180^\circ$**, and in an isosceles triangle the
  two angles at the base are equal.

## Predict first

Below, the point can slide around the circle while the diameter stays where it is.

**Before you move it, predict:** the angle at the moving point — does it get bigger
near the top of the circle, smaller near the ends, or does it not change? Guess
first, then test it.

:::figure semicircle-angle

## The proof

Name the ends of the diameter $A$ and $B$, the centre $O$, and the point on the
circle $P$. Write the angle you are interested in — the one at $P$ — as $\angle APB$.

**Join $P$ to the centre.** Draw the line $OP$. This is the whole trick: it cuts the
triangle $APB$ into two smaller triangles, $AOP$ and $BOP$.

Both of those are isosceles, and for the same reason in each case: $OA$, $OB$ and
$OP$ are all radii of the same circle, so they are all the same length. In triangle
$AOP$ the equal sides are $OA$ and $OP$; in triangle $BOP$ they are $OB$ and $OP$.

**Use the equal angles.** In an isosceles triangle the angles opposite the equal
sides are equal. So:

- in triangle $AOP$: $\angle OAP = \angle OPA$. Call that angle $x$.
- in triangle $BOP$: $\angle OBP = \angle OPB$. Call that angle $y$.

**Now look at the whole triangle $APB$.** Its three angles are:

- $\angle PAB$, which is the same angle as $\angle OAP$, so it is $x$;
- $\angle PBA$, which is the same as $\angle OBP$, so it is $y$;
- $\angle APB$, which is where the line $OP$ splits it into $\angle OPA$ and
  $\angle OPB$ — that is, into $x$ and $y$.

The three angles add to $180^\circ$:

$$x + y + (x + y) = 180^\circ$$

$$2(x + y) = 180^\circ$$

$$x + y = 90^\circ$$

And $x + y$ is exactly $\angle APB$. So the angle in the semicircle is $90^\circ$.

## Why the proof does not depend on where $P$ is

Nothing in the argument used the position of $P$. The only facts used were that
$OA$, $OB$ and $OP$ are radii — which is true wherever $P$ is — and that a
triangle's angles add to $180^\circ$. So the result holds for every point on the
circle, which is why the slider never changes the answer.

That is also what makes it a proof rather than a check: measuring the angle at a
few positions would only ever be evidence, however many you chose.

## Check your understanding

1. In the proof, why are $OA$ and $OP$ the same length?
2. A triangle is drawn inside a circle with one side a diameter. If one of the
   other angles is $35^\circ$, what is the third angle?
3. Explain why the angle at $P$ cannot be obtuse.

<details markdown="1">
<summary>Answers</summary>

1. Both are radii of the same circle, and every radius has the same length.
2. $180^\circ - 90^\circ - 35^\circ = 55^\circ$. The angle at the third point is
   $90^\circ$ because it stands in a semicircle.
3. The angle is $x + y$ where $x$ and $y$ are angles of triangles, so both are
   greater than zero and their sum is exactly $90^\circ$. An obtuse angle is
   greater than $90^\circ$, so it is impossible.
</details>

## Where this goes next

The same argument, with the diameter replaced by a chord, proves the more general
result that the angle at the centre is twice the angle at the circumference. The
semicircle case is the one to understand first, because the two isosceles triangles
are visible in the picture.
