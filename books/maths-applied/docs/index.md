---
title: Maths Applied
---

# Maths Applied

How a car's suspension moves, and how little model you can get away with. One
mechanism, four models, and the number where each pair of them agrees.

- 1 chapter, 7 sections
- No syllabus, no tiers, no answers to mark

## What this is

A car's front suspension is a linkage of two wishbones, an upright and a wheel. As
the wheel moves up and down, its angles change, and the change is small enough to
be small enough to ignore and large enough to matter.

This book works out those angles with four models of the same mechanism, each one
introduced only when the one before it has stopped answering the question. Every
replacement is checked against the last by a number the book shows.

It is not a course, and nothing here is examined. You need trigonometry and not
much else; each piece of mathematics is introduced where it is used.

## Chapter 1: Suspension kinematics

The chapter is a single argument, in five parts, with two drafted sections
sketching what lies beyond it.

1. **The question** — the parts, the two angles, and where the chapter is going.
2. **One rigid triangle** — one degree of freedom, two circles, a closed-form
   answer.
3. **Two legs, one contradiction** — what happens when a model has a spare
   equation, and what least squares does about it.
4. **The redundancy was ours** — which equation was spare, and how a singular
   value decomposition says so.
5. **Bushes are not rigid** — a spring instead of a joint, and the number where the
   two models meet.

Then, drafted: **mass and dampers**, where the problem stops being algebra, and
**the full vehicle**, where these models are used many times over.

[Start at §1.1](Chapter 1/Section 1.1/Walkthrough/index.md)

## How to read it

Straight through, in order, is the intended way. Each section offers one optional
page marked **Going deeper**; the main thread is complete without any of them.

If a figure has a control, it has a still frame as well — every value is reachable
without moving anything, and the drawing already carries the idea before you touch
it.

## Where the numbers come from

Every number a figure shows is computed in the figure, by the model the page
describes. The same model, in three dimensions and with its tests, is
[`suspension-kinematics`](https://github.com/leonpjvaughan/suspension-kinematics).

:::disclaimer
