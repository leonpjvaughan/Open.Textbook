---
title: The area of a triangle is half a b sin C
---

# The area of a triangle is half a b sin C

Two sides of a triangle and the angle between them are enough to find its area:

$$\text{Area}=\tfrac12 ab\sin C$$

Here $a$ and $b$ are the two sides, and $C$ is the angle between them.

## Before you start

You need three things:

- **The area of a triangle is half its base times its perpendicular height.** That
  is $\text{Area}=\frac12\times\text{base}\times\text{height}$, where the height
  is measured at right angles to the base.
- **The sine ratio.** In a right-angled triangle,
  $\sin\theta=\dfrac{\text{opposite}}{\text{hypotenuse}}$.
- **An angle and the angle that takes it up to $180^\circ$ have the same sine:**
  $\sin(180^\circ-\theta)=\sin\theta$. The third fact is needed for one case, and
  this page comes back to it.

## Predict first

The figure shows a triangle with the angle at $C$ changing. A line drops from $B$
at right angles onto the line through $A$ and $C$.

**Before you move the slider, predict:** while $C$ is acute, the foot of that line
lands on the side $AC$. When $C$ becomes obtuse, where does the foot land — on the
side $AC$, on the line beyond $A$, or on the line beyond $C$? Write your
prediction down, then move the slider past $90^\circ$ and test it.

:::figure triangle-area-sinc

## The proof

Take a triangle with corners $A$, $B$ and $C$. Use the usual labels: side $a$ is
opposite $A$, side $b$ is opposite $B$, and side $c$ is opposite $C$. So $a$ is
the length $BC$, $b$ is the length $CA$, and the angle $C$ is the angle between
those two sides.

**Drop a perpendicular from $B$ onto the line $AC$.** Call the point where it
lands $D$, and call the length $BD$ the height $h$. For now, suppose $D$ lands on
the side $AC$ itself. The next section deals with the other case.

**Start from the area you know.** The area of a triangle is half its base times
its height. Take the side $AC$ as the base. It has length $b$, so

$$\text{Area}=\frac12\times b\times h.$$

**Write the height using the sine ratio.** Look at the right-angled triangle
$BCD$.

- Its hypotenuse is $BC$, which has length $a$.
- The side opposite the angle at $C$ is $BD$, which has length $h$.

The sine ratio gives

$$\sin C=\frac{h}{a}\qquad\text{so}\qquad h=a\sin C.$$

**Put the height back into the area.** Substituting $h=a\sin C$ into
$\text{Area}=\frac12 bh$ gives

$$\text{Area}=\frac12 b\,(a\sin C)=\frac12 ab\sin C.$$

That is the rule.

**One step of this proof is done by the figure.** The sine ratio was applied to
the angle at $C$ *inside the right-angled triangle* $BCD$. That angle is the
triangle's own angle $C$ only while $D$ sits on the side $AC$. Move the slider and
watch $D$ leave the side: the figure is showing you the step that needs care.

## When C is obtuse

Move the slider past $90^\circ$. The foot $D$ is now on the line beyond $C$,
outside the side $AC$.

The step that needs care is the sine ratio. In the right-angled triangle $BCD$,
the angle at $C$ is now $180^\circ-C$, not $C$: the two angles lie on a straight
line through $C$ and add to $180^\circ$. So the ratio gives

$$\sin(180^\circ-C)=\frac{h}{a}\qquad\text{so}\qquad h=a\sin(180^\circ-C).$$

An obtuse angle and the angle that takes it up to $180^\circ$ have the same sine,
so $\sin(180^\circ-C)=\sin C$. The height is $h=a\sin C$ after all, and the area
is still $\frac12 ab\sin C$.

This case is worth a section of its own. A proof that handled only acute angles
would have shown the rule for some triangles, not for every triangle.

## Check your understanding

1. A triangle has sides $6\text{ cm}$ and $7\text{ cm}$ with an angle of
   $50^\circ$ between them. Work out its area, to 3 significant figures.
2. In the formula $\frac12 ab\sin C$, which angle is $C$? Explain how to find it
   on a diagram.
3. Explain why an obtuse $C$ still gives a positive area.

<details markdown="1">
<summary>Answers</summary>

1. $\frac12(6)(7)\sin 50^\circ\approx16.1$, so the area is
   $16.1\text{ cm}^2$ to 3 significant figures.
2. $C$ is the angle between the two sides $a$ and $b$. On a diagram, find the two
   lengths you are using and take the angle where they meet. If the angle you
   have is opposite one of those sides, it is the wrong one.
3. $\sin C$ is positive for every angle between $0^\circ$ and $180^\circ$, and
   every angle of a triangle lies in that range. So the product $\frac12 ab\sin C$
   is positive whatever the shape.

</details>

## One more thing

Here is the same rule seen from a different direction. Keep the two sides $a$ and
$b$ fixed and change the angle between them. The area then follows
$\frac12 ab\sin C$, and the sine is largest when $C=90^\circ$. So a triangle with
two fixed sides has its largest area when those sides meet at a right angle. You
can watch that happen in the figure: slide toward $90^\circ$ and the height is at
its longest.
