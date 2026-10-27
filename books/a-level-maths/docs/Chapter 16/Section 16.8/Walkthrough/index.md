---
title: 16.8 Moments in static contexts — Learn
chapter: 16
chapter_title: Forces, Newton's laws and moments
section: '16.8'
section_title: Moments in static contexts
refs:
- S1
kind: walkthrough
---

# 16.8 Moments in static contexts — Learn

**Prerequisites:** multiplying decimals; solving a linear equation; weight,
$W = mg$ (Section 16.3); resolving a force into components (Section 16.5).

**By the end of this section you can:** find the moment of a force about a
point; use the principle of moments for a body in equilibrium; treat the weight
of a uniform rod as acting at its midpoint; and find an unknown force or
distance in a static problem.

## 1. The moment of a force

A **moment** measures the turning effect of a force about a point. It is the
force $F$ multiplied by the **perpendicular** distance $d$ from the point to the
line of the force:

$$
\text{moment} = F \times d.
$$

The unit is the newton metre (N m). The point is called the **pivot**.

The distance must be perpendicular to the force. If a force of size $F$ makes an
angle $\theta$ with a rod of length $L$, the perpendicular distance from the far
end is $L\sin\theta$, so the moment is $FL\sin\theta$.

A moment turns either **clockwise** or **anticlockwise**. Always say which one.

## 2. The principle of moments

A body in equilibrium does not turn. So

$$
\text{sum of clockwise moments} = \text{sum of anticlockwise moments}
$$

about any point. This is the **principle of moments**. You may take moments about
whichever point you choose, and a good choice removes an unknown force from the
equation.

## 3. Weight and the centre of mass

The weight of a body acts at its **centre of mass**.

- A **uniform rod** or **uniform plank** has its centre of mass at its midpoint.
  So its weight acts halfway along.
- A **non-uniform** rod has its centre of mass somewhere else, and a moments
  equation can find where.
- A **particle** placed on a plank has its weight acting where it stands.

Always include the weight of the beam or rod. Leaving it out is the most common
error in a moments problem.

**Example 1.** A force of $20$ N acts at right angles to a spanner, $0.5$ m from
the nut. Find the moment of the force about the nut.

$$
\text{moment} = F \times d = 20 \times 0.5 = 10 \text{ N m}.
$$

The force is at right angles, so the given distance is the perpendicular
distance.

**Example 2.** A child of mass $30$ kg sits $2$ m from the pivot of a seesaw. A
second child of mass $60$ kg sits on the other side. How far from the pivot must
the second child sit to balance the seesaw? Take $g = 9.8$ m s$^{-2}$.

Take moments about the pivot. For balance, the moments are equal:

$$
30g \times 2 = 60g \times d.
$$

The $g$ cancels from both sides:

$$
60 = 60d, \qquad d = 1 \text{ m}.
$$

The heavier child sits closer to the pivot.

**Example 3.** A uniform plank $AB$ has length $4.0$ m and mass $20$ kg. It rests
on two supports at $A$ and $B$. A crate of mass $45$ kg rests on the plank
$1.5$ m from $A$. Find the reaction at each support. Take $g = 9.8$ m s$^{-2}$.

The plank is uniform, so its weight of $20 \times 9.8 = 196$ N acts at its
midpoint, $2$ m from $A$. The crate weighs $45 \times 9.8 = 441$ N and acts
$1.5$ m from $A$.

Take moments about $A$. The reaction $R_B$ acts $4$ m from $A$:

$$
4R_B = 196 \times 2 + 441 \times 1.5.
$$

$$
4R_B = 392 + 661.5 = 1053.5, \qquad R_B = 263.375 \text{ N}.
$$

The total load is $196 + 441 = 637$ N, and the two reactions must carry it:

$$
R_A = 637 - 263.375 = 373.625 \text{ N}.
$$

So $R_A \approx 373.6$ N and $R_B \approx 263.4$ N. The support nearer the crate
carries more.

**Example 4.** A uniform rod $AB$ has mass $8$ kg and length $2.5$ m. It is hinged
at $A$ and held horizontal by a vertical string at $B$. Find the tension in the
string. Take $g = 9.8$ m s$^{-2}$.

The weight is $8 \times 9.8 = 78.4$ N and acts at the midpoint, $1.25$ m from
$A$. Take moments about $A$:

$$
2.5T = 78.4 \times 1.25 = 98.
$$

$$
T = \frac{98}{2.5} = 39.2 \text{ N}.
$$

The hinge carries the rest of the load.

## 4. Try it: the beam explorer

**Predict first.** A uniform beam rests on two supports, $4$ m apart. A load is
placed near one end. Before you touch anything, predict which support reads
larger, and what happens to the two readings when the load is moved to the
middle.

:::figure ch16-moments

**Test.** Move the load along the beam and watch the two reaction readings. Then
change the load mass and watch both reactions change. Find the position at which
the two reactions are equal.

**Explain.** Write two sentences. The first says why moving the load towards $A$
increases the reaction at $A$. The second says why the two reactions always add
up to the same total, whatever the load does.

> **Watch out.** Three mistakes are common.
>
> **Using a distance that is not perpendicular.** The moment uses the
> perpendicular distance from the pivot to the line of the force. A force at
> $30^\circ$ to a rod of length $2$ m has a moment of $2F\sin 30^\circ$, not
> $2F$. **Re-check:** drop a perpendicular from the pivot to the line of the
> force and measure that.
>
> **Leaving out the weight of the beam.** A uniform beam has weight, acting at
> its midpoint. In Example 3 the two reactions carry $637$ N, not just the
> crate's $441$ N. Always mark the beam's own weight on the diagram.
>
> **Adding moments instead of setting them equal.** A body in equilibrium has
> the clockwise total equal to the anticlockwise total. Keep the two directions
> apart, and say which force produces which.

## Progress check

Return to the chapter problem. The uniform plank $AB$ has length $4.0$ m and mass
$20$ kg. It rests on trestles at $A$ and $B$. The crate of mass $45$ kg is
$1.5$ m from $A$.

1. State where the weight of the plank acts, and give its size.
2. Write the moments equation about $A$.
3. Find the reaction at $B$.
4. Find the reaction at $A$, and say which trestle carries more and why.

## You should now be able to

- find the moment of a force about a point, including a force at an angle;
- state and use the principle of moments;
- treat the weight of a uniform rod as acting at its midpoint;
- find the centre of mass of a non-uniform rod from a balance;
- find the reactions at two supports of a beam carrying a load;
- find an unknown tension or distance in a static problem.
