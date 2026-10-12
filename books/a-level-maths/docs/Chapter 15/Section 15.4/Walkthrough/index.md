---
title: 15.4 The constant-acceleration formulae — Learn
chapter: 15
chapter_title: Quantities, units and kinematics
section: '15.4'
section_title: The constant-acceleration formulae
dfe:
- Q3
kind: walkthrough
---

# 15.4 The constant-acceleration formulae — Learn

**Prerequisites:** rearranging a formula; solving a linear equation; solving a
quadratic equation; the gradient and area of a velocity–time graph from
Section 15.3.

**By the end of this section you can:** list the five constant-acceleration
quantities; derive the four formulae from a velocity–time graph; choose the
formula that contains the quantities you know; use the formulae with a sign
convention.

## 1. The five quantities

When an object moves in a straight line with **constant acceleration**, its
motion is fixed by five quantities.

| Symbol | Quantity | Unit |
|---|---|---|
| $u$ | initial velocity | m/s |
| $v$ | final velocity | m/s |
| $a$ | acceleration | m/s$^2$ |
| $s$ | displacement | m |
| $t$ | time | s |

The word "initial" means at the start of the interval you are studying, and
"final" means at the end of it. Each of $u$, $v$, $a$ and $s$ can be negative,
because each is a vector along the line.

## 2. Where the formulae come from

The formulae all follow from the velocity–time graph. With constant
acceleration, the graph is a straight line from $(0, u)$ to $(t, v)$.

The gradient of the line gives the acceleration:

$$
a = \frac{v - u}{t}.
$$

Rearranging gives the first formula:

$$
v = u + at.
$$

The area under the line is the displacement. The area is a trapezium with
parallel sides $u$ and $v$ and height $t$, so

$$
s = \frac{u + v}{2}t.
$$

Substituting $v = u + at$ into that formula and simplifying gives

$$
s = ut + \frac{1}{2}at^2.
$$

Eliminating $t$ between the first two formulae gives a fourth:

$$
v^2 = u^2 + 2as.
$$

Rearranging $s = ut + \frac{1}{2}at^2$ for $ut$ and substituting gives a fifth
form, $s = vt - \frac{1}{2}at^2$.

## 3. Choosing the formula

Each formula omits one of the five quantities. Find the quantity you do not
know, and use the formula that omits it.

| Formula | Missing quantity |
|---|---|
| $v = u + at$ | $s$ |
| $s = \dfrac{u + v}{2}t$ | $a$ |
| $s = ut + \dfrac{1}{2}at^2$ | $v$ |
| $v^2 = u^2 + 2as$ | $t$ |
| $s = vt - \dfrac{1}{2}at^2$ | $u$ |

**Example 1.** A cyclist moves at $6$ m/s and accelerates at $3$ m/s$^2$ for
$4$ s. Find the final velocity and the displacement.

The known quantities are $u = 6$, $a = 3$ and $t = 4$. Use $v = u + at$:

$$
v = 6 + 3 \times 4 = 18 \text{ m/s}.
$$

Now use $s = ut + \frac{1}{2}at^2$ with the same values:

$$
s = 6 \times 4 + \frac{1}{2} \times 3 \times 4^2 = 24 + 24 = 48 \text{ m}.
$$

**Example 2.** A car starts from rest and accelerates at $2.5$ m/s$^2$ over a
distance of $45$ m. Find its final velocity and the time taken.

Here $u = 0$, $a = 2.5$ and $s = 45$. The time is not wanted yet, so use
$v^2 = u^2 + 2as$:

$$
v^2 = 0 + 2 \times 2.5 \times 45 = 225,
\qquad
v = 15 \text{ m/s}.
$$

Now use $v = u + at$ with $v = 15$:

$$
15 = 0 + 2.5t,
\qquad
t = \frac{15}{2.5} = 6 \text{ s}.
$$

**Example 3.** A train travelling at $30$ m/s brakes uniformly and stops in
$90$ m. Find the acceleration and the time.

Here $u = 30$, $v = 0$ and $s = 90$. Use $v^2 = u^2 + 2as$:

$$
0 = 30^2 + 2a \times 90,
\qquad
180a = -900,
\qquad
a = -5 \text{ m/s}^2.
$$

Then use $v = u + at$:

$$
0 = 30 - 5t,
\qquad
t = 6 \text{ s}.
$$

## 4. A sign convention for vertical motion

For an object moving vertically, choose upwards or downwards as positive. Then
give $u$, $v$, $a$ and $s$ their signs before you substitute. Gravity acts
downwards, so if upwards is positive, $a = -9.8$ m/s$^2$.

**Example 4.** A ball is thrown vertically upwards at $14$ m/s. Find the
greatest height it reaches. Take $g = 9.8$ m/s$^2$.

Take upwards as positive. At the greatest height the ball is instantaneously at
rest, so $v = 0$. Use $v^2 = u^2 + 2as$ with $u = 14$ and $a = -9.8$:

$$
0 = 14^2 + 2(-9.8)s,
\qquad
19.6s = 196,
\qquad
s = 10 \text{ m}.
$$

The greatest height is $10$ m.

## 5. Try it: a ball thrown upwards

The two sliders set the launch speed $u$ and the time $t$ since the throw. The
figure draws the ball at its height above the launch point, with the greatest
height marked.

**Predict first.** Take $u = 14$ m/s and $a = -9.8$ m/s$^2$. Before you move
the time slider, predict the greatest height the ball reaches and the velocity
at that highest point. Write down both predictions.

:::figure ch15-thrown-ball

**Test.** Move the time slider from $t = 0$ to the end of the flight and watch
the ball, the velocity arrow and the height. Then set the launch speed to
$20$ m/s and run the flight again.

**Explain.** Write two sentences. The first says why the velocity is zero at the
greatest height while the acceleration stays at $-9.8$ m/s$^2$. The second says
why the ball is at the same height at two different times.

## Progress check

Return to the free kick. For the vertical motion, take upwards as positive. The
ball leaves the ground with vertical velocity $u = 10\sqrt{2} \approx 14.1$ m/s,
and the acceleration is $a = -9.8$ m/s$^2$. The ball reaches the goal line
$t = 2\sqrt{2} \approx 2.83$ s after the kick.

1. Write down the formula that gives the height from $u$, $a$ and $t$.
2. Substitute the values and work out the height of the ball at the goal line.
3. Compare your answer with $2.44$ m, the height of the crossbar.
4. Use $v = u + at$ to find the vertical velocity of the ball at the goal line.
   Is the ball still rising or now falling?

> **Watch out.** Three mistakes are common with these formulae.
>
> **The formula that contains the unknown.** If the question asks for the time
> and the given values are $u$, $a$ and $s$, then $v^2 = u^2 + 2as$ cannot
> help, because it has no $t$ in it. List the quantities first, then pick the
> formula that omits the one you were not given. In Example 2 the first formula
> used was $v^2 = u^2 + 2as$, which omits $t$.
>
> **$u$ and $v$ swapped.** $u$ is the velocity at the start and $v$ is the
> velocity at the end. In Example 3 the train starts at $30$ m/s, so $u = 30$
> and $v = 0$. Swapping them makes the acceleration positive and the answer
> wrong.
>
> **A sign lost in a deceleration.** With upwards or forwards positive, a
> deceleration is negative. In Example 3 the acceleration is $-5$ m/s$^2$, not
> $5$ m/s$^2$. **Re-check:** a positive $a$ with a positive $u$ must make $v$
> larger, and a negative $a$ must make it smaller.

## You should now be able to

- list the five constant-acceleration quantities and their units;
- derive $v = u + at$ and $s = \dfrac{u + v}{2}t$ from a velocity–time graph;
- choose the formula that omits the quantity you do not know;
- use the formulae with a sign convention;
- find a greatest height or a braking distance in a vertical or horizontal
  problem.
