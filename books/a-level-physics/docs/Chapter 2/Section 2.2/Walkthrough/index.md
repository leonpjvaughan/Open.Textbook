---
title: 2.2 Resolving and adding vectors — Learn
chapter: 2
chapter_title: Vectors and scalars
section: '2.2'
section_title: Resolving and adding vectors
refs:
- AP2
kind: walkthrough
---

# 2.2 Resolving and adding vectors — Learn

**Prerequisites:** scalars and vectors from Section 2.1; Pythagoras' theorem;
the sine, cosine and tangent ratios; rearranging a formula; finding an angle from
a tangent.

**By the end of this section you can:** resolve a vector into two perpendicular
components; choose the component that is the cosine and the component that is the
sine; add two perpendicular vectors to find the resultant; find the direction of
a resultant with the tangent; and describe how a scale drawing adds vectors that
are not at right angles.

## 1. Why resolve a vector

A vector at an angle is awkward to add to anything. Two perpendicular components
are easier to work with, because each component acts along one axis.

**Resolving** a vector means replacing it by two perpendicular components that
have the same combined effect. The vector is the **resultant** of its two
components. Replacing the vector by the components changes nothing about the
physics; it only changes how the vector is written.

The two components are found with the sine and cosine ratios. Take the vector as
the hypotenuse of a right-angled triangle, with the components as the two
shorter sides.

$$ v_x = v\cos\theta \qquad v_y = v\sin\theta $$

Here $v$ is the magnitude of the vector and $\theta$ is the angle measured from
the $x$-axis.

## 2. Which component is the cosine

The rule follows from the triangle, and it is quick to apply once you know the
pattern.

- The component **along the direction the angle is measured from** is
  $v\cos\theta$.
- The component **perpendicular to that direction** is $v\sin\theta$.

So if an angle is measured from the horizontal, the horizontal component uses the
cosine. If the angle is measured from the vertical, the component along the
vertical uses the cosine. The two components swap over when the angle is measured
from the other axis.

**Worked example 1.** A velocity of $25\,\text{m}\,\text{s}^{-1}$ acts at 30°
above the horizontal. Find its components.

$$
\begin{aligned}
v_x &= v\cos\theta = 25\cos 30^\circ = 21.7\,\text{m}\,\text{s}^{-1} \\
v_y &= v\sin\theta = 25\sin 30^\circ = 12.5\,\text{m}\,\text{s}^{-1}
\end{aligned}
$$

The angle is measured from the horizontal, so the horizontal component is the
cosine.

**Worked example 2.** A force of 200 N acts at 120° from the positive $x$-axis.
Find its $x$- and $y$-components.

$$
\begin{aligned}
F_x &= 200\cos 120^\circ = -100\,\text{N} \\
F_y &= 200\sin 120^\circ = +173.2\,\text{N}
\end{aligned}
$$

The force points into the second quadrant. The negative sign on $F_x$ records
that the component acts back along the $x$-axis.

> **Watch out.** The sine and cosine are often swapped. A student resolving a
> force at 40° above the horizontal might write $F_x = F\sin 40^\circ$ instead of
> $F\cos 40^\circ$. Check with the two extreme angles. At 0° the vector lies along
> the $x$-axis, so the $x$-component must be the whole vector and the
> $y$-component must be zero: $\cos 0^\circ = 1$ and $\sin 0^\circ = 0$. At 90°,
> the reverse must hold. If your formula fails those cases, the sine and cosine
> are the wrong way round.

## 3. Try it: the two components of a vector

The figure shows a vector and its two perpendicular components. Change the
magnitude and the angle and watch how the components depend on each.

**Predict first.** Do not move the sliders yet. Write down your answers.

1. At an angle of 0°, what is the $y$-component?
2. At an angle of 90°, what is the $x$-component?
3. At what angle are the two components equal?

**Test.** Set the magnitude to 10 and move the angle slider through 0°, 45° and
90°. Read the two components at each angle. Then set the angle back to 40° and
change the magnitude.

**Explain.** Why is one component the cosine and the other the sine? Write two or
three sentences. Use the idea that the vector is the hypotenuse of a right-angled
triangle.

:::figure vector-components

## 4. Adding two perpendicular vectors

Two perpendicular vectors are already two components of their resultant. Put the
tail of the second vector at the tip of the first, and draw the resultant from the
first tail to the second tip. The three vectors form a right-angled triangle.

- The magnitude of the resultant comes from **Pythagoras**, where $x$ and $y$
  are the two perpendicular components:

$$ R = \sqrt{x^2 + y^2} $$

- The direction comes from the tangent:

$$ \tan\theta = \frac{\text{opposite}}{\text{adjacent}} $$

The angle $\theta$ is measured from the vector that you chose as the adjacent
side.

**Worked example 3.** Two forces of 6.0 N and 8.0 N act at right angles. Find the
magnitude and direction of the resultant.

$$
\begin{aligned}
R &= \sqrt{6.0^2 + 8.0^2} \\
  &= \sqrt{36 + 64} \\
  &= \sqrt{100} = 10\,\text{N}
\end{aligned}
$$

For the direction, take the 6.0 N force as the adjacent side.

$$
\begin{aligned}
\tan\theta &= \frac{8.0}{6.0} \\
\theta &= \tan^{-1}\!\left(\frac{8.0}{6.0}\right) = 53.1^\circ
\end{aligned}
$$

The resultant is 10 N at 53.1° to the 6.0 N force, on the side of the 8.0 N
force.

## 5. Resolving on a slope

A weight $W$ on a slope is a common resolution. The weight acts vertically down.
The slope makes an angle $\theta$ with the horizontal, so the weight makes the
same angle with the perpendicular to the slope.

The component of the weight **along the slope** is

$$ W_{\parallel} = W\sin\theta $$

and the component **perpendicular to the slope** is

$$ W_{\perp} = W\cos\theta $$

**Worked example 4.** A block of weight 500 N rests on a slope at 25° to the
horizontal. Find the two components of the weight.

$$
\begin{aligned}
W_{\parallel} &= 500\sin 25^\circ = 211.3\,\text{N} \\
W_{\perp} &= 500\cos 25^\circ = 453.2\,\text{N}
\end{aligned}
$$

The perpendicular component pushes the block into the slope. The along-slope
component pulls it down the slope. On a shallow slope the perpendicular component
is the larger of the two.

## 6. Adding vectors that are not at right angles

When two vectors are not at right angles, the triangle they form has no right
angle, so Pythagoras does not apply. Two methods work.

- **A scale drawing.** Choose a scale such as 1 cm to 10 N. Draw the first vector
  as an arrow to scale in its direction. Draw the second vector head to tail from
  the tip of the first. Draw the resultant from the tail of the first to the tip
  of the second. Measure the resultant with a ruler, convert the length with the
  scale, and measure its angle with a protractor.
- **Resolving into components.** Put both vectors along the same pair of axes,
  add the components in each direction, and combine the two totals. When the
  vectors are already perpendicular, their components are the vectors themselves,
  so this reduces to the Pythagoras method of Section 4.

**Worked example 5.** A displacement of 120 m east is followed by a displacement
of 50 m north. Find the resultant displacement $s$.

The two displacements are already perpendicular components.

$$
\begin{aligned}
s &= \sqrt{120^2 + 50^2} \\
  &= \sqrt{14400 + 2500} \\
  &= \sqrt{16900} = 130\,\text{m}
\end{aligned}
$$

$$
\tan\theta = \frac{50}{120}, \qquad \theta = 22.6^\circ
$$

The resultant displacement is 130 m at 22.6° north of east.

## Progress check

Return to the chapter problem. The ferry points straight across at
$4.0\,\text{m}\,\text{s}^{-1}$ and the current is $3.0\,\text{m}\,\text{s}^{-1}$
downstream. Their resultant is $5.0\,\text{m}\,\text{s}^{-1}$ at 36.9° to the
straight-across direction.

1. Resolve the $5.0\,\text{m}\,\text{s}^{-1}$ resultant into a component straight
   across and a component downstream. Check that you recover 4.0 and 3.0.
2. The river is 120 m wide. Use the across component to find the crossing time.
3. Use the downstream component and the crossing time to find how far downstream
   the ferry lands.

If question 1 goes wrong, the angle is measured from the straight-across
direction, so that component uses the cosine. If question 3 goes wrong, the
downstream distance is the downstream speed multiplied by the crossing time.

## You should now be able to

- resolve a vector into two perpendicular components using the sine and cosine;
- decide which component uses the cosine from the direction the angle is measured
  from;
- add two perpendicular vectors with Pythagoras and find the direction with the
  tangent;
- resolve a weight into components along and perpendicular to a slope;
- describe how a scale drawing adds two vectors that are not at right angles;
- explain why two perpendicular vectors are already the components of their
  resultant.
