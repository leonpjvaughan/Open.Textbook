---
title: The angle at the centre is twice the angle at the circumference
---

# The angle at the centre is twice the angle at the circumference

Draw a circle with centre $O$. Mark two points $A$ and $B$ on the circle, and mark
a third point $P$ on the circle as well. Join $P$ to $A$ and to $B$, and join $O$
to $A$ and to $B$.

The angle $\angle APB$ at the circumference and the angle at the centre stand on
the same arc of the circle — the arc that $P$ is not on. When they do, the angle
at the centre is twice the angle at the circumference:

$$\angle AOB=2\,\angle APB$$

If $P$ lies on the arc between $A$ and $B$, the angle at the centre that doubles
it is the reflex angle, the one greater than $180^\circ$. This page proves both
cases.

## Before you start

You need three things:

- **Angles in a triangle add to $180^\circ$.**
- **An isosceles triangle has two equal base angles.** The angles opposite the two
  equal sides are equal.
- **The exterior angle of a triangle equals the sum of the two opposite interior
  angles.** The three angles of the triangle add to $180^\circ$, and so do the
  angles on the straight line at the corner, which leaves the exterior angle equal
  to the sum of the other two.

You also need one fact about circles: **every radius of a circle has the same
length.** So $OA$, $OB$, $OP$ and $OQ$ are all equal.

## Predict first

The figure marks the angle at $P$ and the angle at the centre that stands on the
same arc. At the start $P$ is on the far arc, away from the arc between $A$ and
$B$, and the angle at $P$ is acute.

**Before you move $P$, predict:** slide $P$ onto the near arc between $A$ and $B$.
The angle at $P$ becomes obtuse. What happens to the angle at the centre that
doubles it — is it still the ordinary angle between $OA$ and $OB$, or does the
doubling use the reflex angle round the other side of $O$? Write your prediction
down, then move $P$ and test it.

:::figure angle-at-the-centre

## The proof

Name the centre $O$. Join $P$ to $O$, and continue that line in a straight line to
the far side of the circle at $Q$. So $PQ$ is a diameter, and it passes through
$O$.

The line $PQ$ cuts the figure into two triangles, $AOP$ and $BOP$. Both are
isosceles. In triangle $AOP$ the equal sides are $OA$ and $OP$, because both are
radii of the same circle. In triangle $BOP$ the equal sides are $OB$ and $OP$, for
the same reason.

**The first isosceles triangle.** In triangle $AOP$, the equal sides $OA$ and $OP$
are opposite the angles at $P$ and at $A$. Equal sides give equal angles, so

$$\angle OAP=\angle OPA.$$

Call that angle $x$. Now look at the angle $\angle AOQ$ at $O$. It is the exterior
angle of triangle $AOP$ at $O$, made by continuing $PO$ to $Q$. The exterior angle
equals the sum of the two opposite interior angles, so

$$\angle AOQ=x+x=2x.$$

**The second isosceles triangle.** In the same way, in triangle $BOP$ the equal
sides are $OB$ and $OP$, so $\angle OBP=\angle OPB$. Call that angle $y$. Then

$$\angle QOB=2y.$$

**The angle at $P$.** The diameter $PQ$ passes through the angle at $P$ and splits
it into $\angle OPA$ and $\angle OPB$. So

$$\angle APB=x+y.$$

**Put the two halves together.** The angles $\angle AOQ=2x$ and $\angle QOB=2y$
meet at $O$. Together they make up the angle at the centre that stands on the same
arc $AB$ as the angle at $P$:

$$\text{angle at the centre}=2x+2y=2(x+y)=2\,\angle APB.$$

That is the rule, for a point $P$ on the far arc.

**One step here is done by the figure.** The words "the angle at the centre that
stands on the same arc" hide a choice. Which angle at $O$ that is depends on where
$P$ is, and no calculation in this proof decides it. Watch the coloured arc at $O$
as you move $P$: the figure chooses the angle for you, and the next section shows
why the choice sometimes lands on the reflex angle.

## The case a diagram usually leaves out

Now slide $P$ onto the near arc, between $A$ and $B$. The angle at $P$ becomes
obtuse. Something else happens too, and it is the part that is missed: $Q$ is now
on the far arc, so the rays $OA$ and $OB$ lie on the *same side* of the line $PQ$.
The angles $\angle AOQ$ and $\angle QOB$ overlap, and they no longer fit inside
the ordinary angle between the two radii.

The angle at the centre that stands on the same arc $AB$ is now the *reflex* angle
at $O$, the one greater than $180^\circ$. That reflex angle and the ordinary angle
between $OA$ and $OB$ add to $360^\circ$, because together they go once round the
point $O$:

$$\text{ordinary angle }AOB+\text{reflex angle }AOB=360^\circ.$$

The two angles $\angle AOQ=2x$ and $\angle QOB=2y$ sweep the reflex angle exactly:

$$\text{reflex angle }AOB=2x+2y=2(x+y)=2\,\angle APB.$$

So the angle at the centre is twice the angle at the circumference in this case as
well. The algebra never changed; only the picture did. A proof that stopped after
the far arc would have left the obtuse case unproved, and that is the case a
textbook diagram rarely shows.

## Check your understanding

1. In the proof, why are $OA$ and $OP$ the same length?
2. An angle at the circumference is $47^\circ$ and stands on the same arc as an
   angle at the centre. Work out the angle at the centre.
3. A reader measures an angle at the centre as $100^\circ$ and the angle at the
   circumference as $40^\circ$. Explain what has gone wrong.

<details markdown="1">
<summary>Answers</summary>

1. Both are radii of the same circle, and every radius of a circle has the same
   length.
2. $2\times47^\circ=94^\circ$.
3. The two angles do not stand on the same arc, or one measurement is wrong. When
   both stand on the same arc, the centre angle is exactly twice the circumference
   angle, and $100^\circ$ is not $2\times40^\circ$.

</details>

## One more thing

When $A$ and $B$ are the ends of a diameter, the arc between them is a semicircle
and the angle at the centre is $180^\circ$. Twice the angle at the circumference
is $180^\circ$, so the angle at the circumference is $90^\circ$. That is
**[the angle in a semicircle](../angle-in-a-semicircle/index.md)**, and it is this
rule with one number filled in.

There is a second consequence. If two points $P$ and $P'$ both lie on the same arc
$AB$, then each of $\angle APB$ and $\angle AP'B$ is half of the same angle at the
centre, so the two angles are equal. That is the **same segment** rule.
