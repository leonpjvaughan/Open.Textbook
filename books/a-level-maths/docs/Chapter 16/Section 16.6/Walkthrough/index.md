---
title: 16.6 Resultant forces and dynamics in a plane — Learn
chapter: 16
chapter_title: Forces, Newton's laws and moments
section: '16.6'
section_title: Resultant forces and dynamics in a plane
dfe:
- R5
kind: walkthrough
---

# 16.6 Resultant forces and dynamics in a plane — Learn

**Prerequisites:** resolving forces and coplanar equilibrium (Section 16.5);
Newton's second law (Section 16.2). A friction or resistance force is given as
data in this section; the model is Section 16.7.

**By the end of this section you can:** find the resultant of forces that are not
at right angles; choose one axis along the acceleration; use Newton's second law
in two directions; and find the acceleration of a body pulled at an angle or
sliding on a slope.

## 1. The resultant of forces in a plane

Forces in a plane add by their components. Write each force as a column vector
of its $x$- and $y$-components, then add the columns. The resultant has size

$$
R = \sqrt{(\text{sum of } x)^2 + (\text{sum of } y)^2}
$$

and a direction you can find with the tangent ratio. Only when the forces are
all in one line, or at right angles, can you add their sizes directly.

## 2. Newton's second law in two directions

A body can accelerate along only one line at a time. Choose that line as one
axis, so

$$
\text{resultant along the motion} = ma,
$$

and at right angles to the motion there is no acceleration, so

$$
\text{resultant at right angles} = 0.
$$

The second equation is usually what finds the normal reaction. The first is what
finds the acceleration. Both are needed when a force acts at an angle.

**Example 1.** A force of $60$ N acts at $30^\circ$ above the horizontal and a
force of $100$ N acts at $120^\circ$. Find the size of the resultant and its
direction from the positive $x$-axis.

Take components.

$$
x = 60\cos 30^\circ + 100\cos 120^\circ = 51.96 - 50.00 = 1.96 \text{ N},
$$

$$
y = 60\sin 30^\circ + 100\sin 120^\circ = 30.00 + 86.60 = 116.60 \text{ N}.
$$

The size is

$$
R = \sqrt{1.96^2 + 116.60^2} \approx 116.62 \text{ N}.
$$

The direction is

$$
\tan^{-1}\left(\frac{116.60}{1.96}\right) \approx 89.04^\circ
$$

from the positive $x$-axis, which is almost straight up.

**Example 2.** A crate of mass $45$ kg is pulled along a horizontal floor by a
rope that makes $25^\circ$ with the horizontal. The tension is $200$ N and a
resistance of $80$ N opposes the motion. Find the acceleration and the normal
reaction. Take $g = 9.8$ m s$^{-2}$.

The weight is

$$
W = 45 \times 9.8 = 441 \text{ N}.
$$

Resolve vertically. There is no vertical acceleration, so the vertical forces
balance:

$$
R + 200\sin 25^\circ = 441.
$$

$$
R = 441 - 84.52 = 356.48 \text{ N}.
$$

The rope lifts the crate a little, so the floor pushes with less than the full
weight.

Resolve horizontally. The horizontal component of the tension moves the crate:

$$
200\cos 25^\circ = 181.26 \text{ N}.
$$

The resultant along the floor is

$$
181.26 - 80 = 101.26 \text{ N},
$$

so

$$
a = \frac{101.26}{45} \approx 2.25 \text{ m s}^{-2}.
$$

**Example 3.** A block of mass $10$ kg slides down a slope of $30^\circ$. A
friction force of $17$ N acts up the slope. Find the acceleration. Take
$g = 9.8$ m s$^{-2}$.

The weight is $98$ N. Take one axis down the slope and one perpendicular to it.

The component of the weight down the slope is

$$
98\sin 30^\circ = 49 \text{ N}.
$$

The friction opposes the sliding, so it acts up the slope. Newton's second law
along the slope gives

$$
49 - 17 = 10a,
$$

$$
32 = 10a, \qquad a = 3.2 \text{ m s}^{-2}.
$$

**Example 4.** A block of mass $6$ kg rests on a horizontal table. It is joined
by a light inextensible string over a smooth pulley at the table edge to a
hanging mass of $4$ kg. A friction force of $14.7$ N acts on the block. Find the
acceleration. Take $g = 9.8$ m s$^{-2}$.

The hanging weight is $4 \times 9.8 = 39.2$ N and drives the system. The
resultant along the motion is

$$
39.2 - 14.7 = 24.5 \text{ N},
$$

on a total mass of $6 + 4 = 10$ kg, so

$$
a = \frac{24.5}{10} = 2.45 \text{ m s}^{-2}.
$$

> **Watch out.** Three mistakes are common.
>
> **Writing $R = mg$ when a force has a vertical component.** In Example 2 the
> rope's vertical component is $84.52$ N upwards, so $R = 356.48$ N, not
> $441$ N. Always resolve vertically before you write down the normal reaction.
>
> **Putting friction the wrong way.** Friction always opposes sliding. In
> Example 3 the block slides down the slope, so friction acts up the slope.
> **Re-check:** the acceleration must come out in the direction the body
> actually moves.
>
> **Using the wrong sign for a downhill component.** On the slope, the weight
> component $mg\sin\theta$ acts down the slope. If the motion is up the slope,
> that component is a negative term in the equation along the slope.

## You should now be able to

- add forces in a plane by their components;
- find the size and direction of a resultant that is not along an axis;
- choose one axis along the acceleration and one perpendicular to it;
- write two equations, one for the motion and one for the balance;
- find the normal reaction when an applied force has a vertical component;
- find the acceleration of a body pulled at an angle or sliding on a slope;
- solve a connected-particles problem when a resistance acts on one body.
