---
title: Why two circles meet twice
chapter: 1
chapter_title: Suspension kinematics
section: '1.2'
section_title: One rigid triangle
kind: deeper
---

# Why two circles meet twice

This page is for a reader who wants to know what the second solution is, and why a
program has to be told which one it is looking at. The main thread only needs the
first half of the first sentence.

## Two answers, both true

The upper ball joint must be a distance $R_B$ from the upper arm's pivot and a
distance $L$ from the lower ball joint. Two circles, so two meeting points — unless
they miss, or touch, in which case there is none or one.

At the rest position of this chapter's geometry, the two answers are:

| Solution | Upper ball joint |
|---|---|
| the one the car is built on | (0.68, 0.52) m |
| the other one | (0.35, 0.14) m |

Both satisfy the equations exactly. Both are the same parts, rigid, in a valid
arrangement. The second has the upright folded down and inwards, past the lower
arm: a position the mechanism can reach mathematically and cannot reach with the
wheel attached, because the wheel would be inside the car.

So the equations do not have one answer, and no amount of care with the algebra
will make them. **Which assembly the mechanism is in is a fact about the object,
not about the equations.**

## How a program decides

Two habits, and both are needed.

**Seed every solve from the last one.** Consecutive positions of a wheel are close
together, so the previous answer is the best possible starting guess: it converges
in two or three steps instead of ten, and — more importantly — it converges to the
same branch.

**Record the branch.** When a solve ends on a different solution from the one it
started near, that is worth knowing. Not worth stopping for: the answer is still an
answer. Worth recording, because a curve that changes branch has a jump in it.

A camber curve with a jump in it looks exactly like a physics bug, and it is not
one. It is the solver finding the other assembly, and the first time it happens the
temptation is to look for a mistake in the equations. There is none. The mistake is
in the seeding.

## When the two circles stop meeting

The circles meet when the distance $d$ between their centres satisfies

$$ \left|R_B - L\right| \le d \le R_B + L. $$

Outside that range the model has **no** answer, and a solver that returns one
anyway is returning something it did not solve. A physical mechanism would have
reached a bump stop, or bent a part, or torn a bush — three things this model does
not contain.

So the honest behaviour is to fail: name the frame, say the mechanism has run out of
travel, and stop. That is far more useful than a number, because the number would
be used.

## What three dimensions adds

In the front view the upright is a line, and the two circles fix its upper end in
two ways. In three dimensions the upright is a body and the arm is a plane of
motion, so the same mechanism still has two assemblies, reached by the upright
swinging about the line between the ball joints.

The count of solutions does not change. What changes is that the second one is
harder to see, which makes the seeding and the recording more valuable rather than
less.
