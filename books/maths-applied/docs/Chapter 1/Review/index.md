---
title: 'Chapter 1: Review'
chapter: 1
kind: review
---

# Chapter 1: Review

## The chapter problem, answered

**A wheel moves 40 mm up and 40 mm down. How far does its camber change, and what
is the simplest model that gives an answer you would trust within a tenth of a
degree?**

The camber moves **1.95°** over that travel: from −1.87° at 40 mm of droop to
+0.08° at 40 mm of bump. Rest is at −1.00°, so a little more of the change happens
above rest than below.

Which model earns the answer depends on the tolerance and on the car:

| Model | Camber change over the travel | Cost | Camber at rest, and its difference from rigid |
|---|---|---|---|
| Rigid triangle | 1.95° | one degree of freedom, no numbers to measure | −1.00° |
| With a bush at 0.2 MN/m | 1.92° | a stiffness to measure | −2.05°, which is 1.05° away |
| With a bush at 1 MN/m | 1.94° | a stiffness to measure | −1.21°, which is 0.21° away |
| With a bush at 100 MN/m | 1.95° | a stiffness to measure | −1.00°, which is 0.002° away |

So the answer has two parts, and the second is the one that matters.

The camber **change** over the travel is almost untouched: even a very soft bush of
0.2 MN/m changes it by three hundredths of a degree, because the bush shifts the
whole curve rather than tilting it. If the question is only about the change, the
rigid model earns its place down to a bush of about 0.15 MN/m.

The camber **itself** is a different matter. A tenth of a degree there needs a bush
of about 2.1 MN/m, fourteen times stiffer. If a designer wants to know where the
wheel actually points, the rigid model is wrong by a degree on a soft car.

The chapter's answer is therefore not "use the simple model" or "use the detailed
one". It is: **measure the effect the simpler model leaves out, compare it with what
the question needs, and check that the comparison is with the quantity the question
is about.**

The compliant rows are this book's model, recomputed by the figures from the same
geometry the exported sweeps use. The package's compliant export is vendored, but it
carries one stiffness rather than a ladder, so this table is the page's evidence; when
the package reports a ladder, these rows are generated from it and the two must
agree.

## The four models, and the numbers where they meet

| From | To | The number |
|---|---|---|
| Closed form | Newton iteration | the same camber curve, to about 10⁻¹⁴° |
| Three-row least squares | §1.2's closed form | the same pose, to 10⁻¹² m |
| Three rows, diagnosed | the two-row system | the same pose, and one row fewer |
| Compliant at 100 MN/m | rigid | 0.002° at rest, and falling as the stiffness rises |
| Compliant at 0.2 MN/m | rigid | 1.05° at rest, 0.034° in the change over the travel |

Every one of those numbers is a comparison between two models of the same
mechanism. None of them is a comparison with the car. That is the honest limit of
this chapter, and it is worth keeping hold of: agreement between models is
evidence about the mathematics, and only measurement is evidence about the
suspension.

## Questions to think with

There are no answers to mark at the end of this chapter, because the questions are
the point.

1. A car's camber curve is measured with the wheels on the ground and again with
   the car jacked up. Which model does each measurement test, and what would a
   disagreement between them tell you?
2. If the bush's stiffness were ten times lower, would the rigid model still answer
   the chapter's question? Which of the chapter's two tolerances comes out worse,
   and why?
3. The front view throws away one dimension, and with it the difference between the
   wishbone's two legs. Name one thing the front view can say, and one thing it
   cannot — using only what the chapter has shown you.
4. A model has a least-squares residual of 10⁻¹² mm and a null vector with
   non-zero entries in every row. What is it telling you, and what would you do
   next?
5. The chapter never let a model be replaced without a number. Which replacement in
   this chapter would be hardest to justify that way, and why?

## Reflection

The chapter's method is one sentence long, and it is worth writing down in your own
words before you leave:

> Take the parameter to the edge and check the model becomes the simpler one it
> should become.

If you can say where that test applies in this chapter, and where it does not, you
have the thing the chapter was for. §1.6 and §1.7 show where the method goes next:
a model with mass, and a model of the whole car, each of which is judged the same
way — by what it agrees with, and by what it can no longer answer.

## Where to read more

Four books, and what each one is for. None of them is needed to read this chapter,
and none of them is the source of a number in it.

- **John C. Dixon, *Suspension Geometry and Computation* (Wiley, 2009)** — the same
  quantities as this chapter, in three dimensions and for a whole car. If you want to
  know what a suspension designer actually computes, this is the book.
- **Milliken and Milliken, *Race Car Vehicle Dynamics* (SAE, 1995)** — why the angle
  matters. Camber is worth computing because of what a tyre does with it, and this is
  where that story starts.
- **McCarthy and Soh, *Geometric Design of Linkages* (Springer, 2011)** — the general
  theory behind §1.2 to §1.4: mobility, branches, and what happens at a singular
  configuration.
- **George E. P. Box, "Science and Statistics" (1976)** — the argument the chapter is
  a worked example of: a model is judged by what it is for.

The solver that goes with this book, with its own tests and the three-dimensional
version of every figure here, is
[`suspension-kinematics`](https://github.com/leonpjvaughan/suspension-kinematics).
