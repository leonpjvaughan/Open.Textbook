---
title: 'Chapter 10: Review'
chapter: 10
kind: review
---

# Chapter 10: Review

## The chapter problem, solved

The rescue base is the origin $O$ of a map grid, with one unit to a kilometre.
East is $\mathbf{i}$ and north is $\mathbf{j}$.

**Step 1. Write the data as vectors.** The pad and the walker are at

$$
\mathbf{p} = 2\mathbf{i} + \mathbf{j},
\qquad
\mathbf{w} = 13\mathbf{i} + 7\mathbf{j}.
$$

The two legs and the wind drift are

$$
\mathbf{u} = 3\mathbf{i} + 4\mathbf{j},
\qquad
\mathbf{v} = 4\mathbf{i} - 3\mathbf{j},
\qquad
\mathbf{d} = \mathbf{i} + \mathbf{j}.
$$

**Step 2. Add the movements.** Add the two legs first:

$$
\mathbf{u} + \mathbf{v} = (3 + 4)\mathbf{i} + (4 - 3)\mathbf{j} = 7\mathbf{i} + \mathbf{j}.
$$

Now add the wind drift:

$$
\mathbf{u} + \mathbf{v} + \mathbf{d} = 8\mathbf{i} + 2\mathbf{j}.
$$

**Step 3. Find the final position.** Add this total displacement to the pad:

$$
\mathbf{f} = \mathbf{p} + 8\mathbf{i} + 2\mathbf{j} =
(2 + 8)\mathbf{i} + (1 + 2)\mathbf{j} =
10\mathbf{i} + 3\mathbf{j}.
$$

The drone finishes at $(10, 3)$ km. That is not the walker at $(13, 7)$ km.

**Step 4. Find how far short the drone lands.** The shortfall is the vector
from the drone to the walker:

$$
\vec{FW} = \mathbf{w} - \mathbf{f} =
(13 - 10)\mathbf{i} + (7 - 3)\mathbf{j} =
3\mathbf{i} + 4\mathbf{j}.
$$

Its magnitude is

$$
|\vec{FW}| = \sqrt{3^2 + 4^2} = \sqrt{25} = 5 \text{ km}.
$$

The drone lands $5$ km from the walker.

**Step 5. Find the direction of the walker from the drone.** Both components of
the shortfall are positive, so the walker is north-east of the drone. The angle
from the positive $x$-axis (east) is

$$
\tan^{-1}\left(\frac{4}{3}\right) = 53.1^\circ,
$$

so the walker lies $53.1^\circ$ north of east. As a bearing, measured clockwise
from north, that is $90^\circ - 53.1^\circ = 36.9^\circ$, a bearing of $037^\circ$
to the nearest degree.

**Step 6. The final leg.** The drone flies with velocity
$\mathbf{v} = 6\mathbf{i} + 8\mathbf{j}$ km/h. Its speed is
$\sqrt{6^2 + 8^2} = 10$ km/h. In half an hour it travels
$0.5(6\mathbf{i} + 8\mathbf{j}) = 3\mathbf{i} + 4\mathbf{j}$ km, which is exactly
the shortfall. So the drone reaches the walker after half an hour on this
heading.

**Step 7. The thrust against the wind.** The wind force is
$\mathbf{F} = -3\mathbf{i} - 4\mathbf{j}$ N. To hover, the thrust $\mathbf{T}$
must balance it:

$$
\mathbf{T} = -\mathbf{F} = 3\mathbf{i} + 4\mathbf{j} \text{ N}.
$$

The thrust has magnitude $5$ N and points $53.1^\circ$ north of east.

**The chapter's answer.** The drone finishes at $(10, 3)$ km, which is $5$ km
south-west of the walker at $(13, 7)$ km. The walker lies $53.1^\circ$ north of
east from the drone. A final leg of $3\mathbf{i} + 4\mathbf{j}$ km, flown at
$10$ km/h, reaches the walker in half an hour. The thrust needed to hover against
the wind is $5$ N at $53.1^\circ$ north of east.

## Mixed practice — choose the method first

For each question, say which method you will use and why before you calculate.
The items mix this chapter with earlier chapters, so the choice is not always
obvious.

:::problems chapter-10-review

:::answers chapter-10-review

## What you can now do

- write a vector in column form and in $\mathbf{i}$, $\mathbf{j}$, $\mathbf{k}$
  form, and recognise equal and parallel vectors;
- find the magnitude and the direction of a vector, and keep the correct
  quadrant;
- convert between component form and magnitude/direction form, including
  bearings;
- add vectors, subtract them and multiply them by a scalar;
- use position vectors to find a displacement, a distance and a midpoint;
- prove that points are collinear, that a quadrilateral is a parallelogram and
  that two diagonals bisect each other;
- divide a segment in a given ratio;
- find a resultant force and an unknown force in equilibrium;
- model motion with a starting position and a constant velocity.

## Your relevance reflection

Return to the prompt in the chapter opener: *a journey with more than one stage,
and something that pushes you along the way*. Write the stages and the push
again. Now add three things you could not have said before this chapter: how to
combine the stages into one displacement, how to find the distance and direction
of the result, and how a vector keeps a size and a direction in the same
calculation. Finish with one sentence about a journey where the push mattered
more than the stage you chose.
