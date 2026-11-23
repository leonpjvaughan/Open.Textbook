---
title: 'Chapter 12: Review'
chapter: 12
kind: review
---

# Chapter 12: Review

## The chapter problem, solved

**The stranded yacht.** A yacht has gone aground on a sandbank. The rescue needs two
answers: where the yacht is, and when the water will be deep enough to float it.

### Where the yacht is

The Coast Guard station $C$ and the lighthouse $L$ are $8$ km apart, with $L$ due east of
$C$. From $C$ the bearing of the yacht $Y$ is $048^\circ$, and from $L$ it is
$330^\circ$.

The direction from $C$ to $L$ is due east, a bearing of $090^\circ$. So the angle at the
station is

$$\angle LCY = 90^\circ - 48^\circ = 42^\circ$$

The direction from $L$ to $C$ is due west, a bearing of $270^\circ$. So the angle at the
lighthouse is

$$\angle CLY = 330^\circ - 270^\circ = 60^\circ$$

The third angle is $180^\circ - 42^\circ - 60^\circ = 78^\circ$, at the yacht. Now use
the sine rule, which the booklet gives:

$$\frac{CY}{\sin 60^\circ} = \frac{8}{\sin 78^\circ}$$

$$CY = \frac{8 \times 0.8660}{0.9781} = 7.08 \text{ km}$$

$$\frac{LY}{\sin 42^\circ} = \frac{8}{\sin 78^\circ}$$

$$LY = \frac{8 \times 0.6691}{0.9781} = 5.47 \text{ km}$$

So the yacht is $5.47$ km from the lighthouse and $7.08$ km from the station. **The yacht
is nearer the lighthouse.** That answers the prediction made at the start of the chapter.

The angle at the lighthouse was estimated before any calculation. The exact value is
$60^\circ$.

**The search area.** The area of the triangle $CLY$ is

$$A = \tfrac12 \times 8 \times 5.47 \times \sin 60^\circ = 18.9 \text{ km}^2$$

**The bearings from the yacht.** The bearing of the lighthouse from the yacht is the back
bearing of $330^\circ$:

$$330^\circ - 180^\circ = 150^\circ$$

The bearing of the station from the yacht is the back bearing of $048^\circ$:

$$048^\circ + 180^\circ = 228^\circ$$

The angle between them at the yacht is $228^\circ - 150^\circ = 78^\circ$, which matches
the angle found from the triangle. The two methods agree.

**The cliff.** The station stands $60$ m above the sea. The angle of depression to a buoy
at sea level is $9^\circ$. The angle of depression equals the angle inside the triangle
at the top of the cliff. The horizontal distance is

$$x = \frac{60}{\tan 9^\circ} = 378.8 \text{ m}$$

and the direct distance from the station to the buoy is

$$d = \sqrt{60^2 + 378.8^2} = 383.5 \text{ m}$$

### When the yacht floats

The depth of water $d$ over the sandbank, $t$ hours after low water, is

$$d = 1.4 + 1.2\sin(30^\circ t)$$

metres. The yacht floats once the depth reaches $2.0$ m. Set $d = 2.0$:

$$1.4 + 1.2\sin(30^\circ t) = 2.0$$

$$1.2\sin(30^\circ t) = 0.6$$

$$\sin(30^\circ t) = 0.5$$

The reference angle is $30^\circ$, and the sine is positive, so $30^\circ t = 30^\circ$ or
$30^\circ t = 150^\circ$:

$$t = 1 \text{ hour} \quad\text{or}\quad t = 5 \text{ hours}$$

The depth is $2.0$ m on the way up at $t = 1$ and on the way down at $t = 5$. High water
is at $t = 3$ hours, with a depth of $2.6$ m. **The yacht floats between $t = 1$ hour and
$t = 5$ hours**, a window of four hours around high water.

## Mixed practice — choose the method first

Work through these without notes. For each one, say **which method** you will use, and
why, before you calculate. Some need a ratio, some the sine rule, some the cosine rule,
some an identity, and some an equation.

:::problems chapter-12-review

:::answers chapter-12-review

## What you can now do

- name the opposite, the adjacent and the hypotenuse, and choose the right ratio;
- find a side or an angle of a right triangle, and use Pythagoras' theorem;
- convert between degrees and radians, and find an arc length and a sector area;
- find the sine, cosine and tangent of any angle from the unit circle;
- sketch a trigonometric graph and read its period, amplitude and range;
- solve a triangle with the sine rule or the cosine rule, including the two-answer case;
- find the area of a triangle, a parallelogram and a search region;
- use the identities, including the addition and double angle formulae;
- solve a trigonometric equation and give every solution in a range;
- work with bearings and back bearings.

<!-- tier:h -->

- find an angle inside a solid.

<!-- /tier:h -->

## Thinking back

Return to the connection you wrote at the start of the chapter. You chose a length you
could not measure directly and said what you would measure instead.

Write down which method from this chapter would answer it. If you know one side and one
angle, choose a ratio. If you know two sides and the angle between them, or all three
sides, choose the cosine rule. If you know a side and its opposite angle, choose the sine
rule. If the quantity repeats, model it with a sine function and solve the equation.

Then answer the question you started with. If you need a time rather than a length, the
work is a trigonometric equation, and the answer is every solution in the range.
